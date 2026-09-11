#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith("--"));
const discoverOnly = args.includes("--discover-only");
const limitArg = args.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const concurrencyArg = args.find((arg) => arg.startsWith("--concurrency="));
const concurrency = concurrencyArg ? Math.max(1, Math.min(6, Number(concurrencyArg.split("=")[1]))) : 1;

if (!slug) {
  console.error("Usage: node scripts/sync-web-corpus.mjs <source-slug> [--discover-only] [--limit=N] [--concurrency=1..6]");
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync("data/corpus-sources.json", "utf8"));
const source = catalog[slug];
if (!source) {
  console.error(`Unknown source '${slug}'. Available: ${Object.keys(catalog).join(", ")}`);
  process.exit(1);
}

const root = path.join("sources", "web", slug);
const rawDir = path.join(root, "_raw");
const manifestPath = path.join(root, "manifest.json");
fs.mkdirSync(rawDir, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeHtml(value) {
  const named = {
    amp: "&",
    apos: "'",
    quot: '"',
    lt: "<",
    gt: ">",
    nbsp: " ",
    ndash: "-",
    mdash: "-",
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    hellip: "...",
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()] ?? `&${entity};`;
  });
}

function slugify(value) {
  return decodeHtml(value)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90) || "untitled";
}

function allowed(urlString) {
  const url = new URL(urlString);
  if (!source.allowedHosts.includes(url.hostname)) return false;
  if (source.includePath && !new RegExp(source.includePath, "i").test(url.pathname)) return false;
  if (source.excludePath && new RegExp(source.excludePath, "i").test(url.pathname)) return false;
  return true;
}

async function fetchText(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "summon.guide corpus sync (source-backed educational synthesis)" },
      });
      if (response.ok) return response.text();

      const error = new Error(`${response.status} ${response.statusText} for ${url}`);
      error.retryable = response.status === 429 || response.status >= 500;
      throw error;
    } catch (error) {
      lastError = error;
      if (error.retryable === false || attempt === 3) throw error;
      await sleep(500 * attempt);
    }
  }
  throw lastError;
}

function linksFromHtml(html, baseUrl) {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => {
      try {
        const url = new URL(match[1], baseUrl);
        url.hash = "";
        url.search = "";
        return url.toString();
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

async function discover() {
  let links = [];

  if (source.discovery === "sitemap") {
    const visited = new Set();

    async function readSitemap(url) {
      if (visited.has(url)) return [];
      visited.add(url);

      const xml = await fetchText(url);
      const locations = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
        .map((match) => decodeHtml(match[1].trim()));

      if (!/<sitemapindex\b/i.test(xml)) return locations;

      const nested = [];
      for (const location of locations) {
        const parsed = new URL(location);
        if (!source.allowedHosts.includes(parsed.hostname) || !parsed.pathname.endsWith(".xml")) continue;
        nested.push(...await readSitemap(location));
      }
      return nested;
    }

    links = await readSitemap(source.indexUrl);
  } else {
    const index = await fetchText(source.indexUrl);
    links = linksFromHtml(index, source.indexUrl);
  }

  return [...new Set(links.filter(allowed))].slice(0, limit);
}

function htmlToMarkdown(html, fallbackTitle) {
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  const title = decodeHtml((h1Match?.[1] || titleMatch?.[1] || fallbackTitle).replace(/<[^>]+>/g, "").trim());
  const article = /<article\b[^>]*>([\s\S]*?)<\/article>/i.exec(html)?.[1];
  let body = article || /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html)?.[1] || html;

  body = body
    .replace(/<(script|style|noscript|svg|nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, "")
    .replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n\n> $1\n\n")
    .replace(/<(?:p|div|section|br)\b[^>]*>/gi, "\n")
    .replace(/<\/p>|<\/div>|<\/section>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  const markdown = decodeHtml(body)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { title, markdown };
}

const links = await discover();
console.log(`${source.label}: discovered ${links.length} pages`);

if (discoverOnly) process.exit(0);

const previous = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { pages: [] };
const priorByUrl = new Map(previous.pages.map((page) => [page.url, page]));
const pages = new Array(links.length);
let written = 0;
let unchanged = 0;
let failed = 0;
const failures = [];
let cursor = 0;
let completed = 0;

async function syncWorker() {
  while (true) {
    const index = cursor++;
    if (index >= links.length) return;

    const url = links[index];
    try {
      const html = await fetchText(url);
      const { title, markdown } = htmlToMarkdown(html, new URL(url).pathname);
      const hash = crypto.createHash("sha256").update(markdown).digest("hex");
      const old = priorByUrl.get(url);
      const file = old?.file || `${String(index + 1).padStart(3, "0")}-${slugify(title)}.md`;
      const record = { rank: index + 1, title, url, file, sha256: hash, fetchedAt: new Date().toISOString() };

      if (old?.sha256 === hash && fs.existsSync(path.join(rawDir, file))) {
        unchanged++;
      } else {
        const document = [
          "---",
          `title: ${JSON.stringify(title)}`,
          `source_url: ${JSON.stringify(url)}`,
          `source_site: ${JSON.stringify(source.label)}`,
          `fetched_at: ${JSON.stringify(record.fetchedAt)}`,
          'visibility: "private-source"',
          "---",
          "",
          `# ${title}`,
          "",
          markdown,
          "",
        ].join("\n");
        fs.writeFileSync(path.join(rawDir, file), document, "utf8");
        written++;
      }
      pages[index] = record;
    } catch (error) {
      failed++;
      failures.push({ rank: index + 1, url, error: error.message });
      console.warn(`\nWARNING: ${url}: ${error.message}`);
    }
    completed++;
    process.stdout.write(`\r${completed}/${links.length} synced`);
    await sleep(200);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, links.length) }, () => syncWorker()));

const syncedPages = pages.filter(Boolean);

fs.writeFileSync(
  manifestPath,
  `${JSON.stringify({ source: slug, label: source.label, indexUrl: source.indexUrl, syncedAt: new Date().toISOString(), pages: syncedPages, failures }, null, 2)}\n`,
  "utf8"
);
console.log(`\nDone: ${written} written, ${unchanged} unchanged, ${failed} failed`);
console.log(`Private Markdown: ${rawDir}`);
console.log("Publish only original synthesis under content/knowledge, never these full source pages.");
