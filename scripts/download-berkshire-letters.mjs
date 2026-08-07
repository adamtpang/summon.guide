#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { extractText, getDocumentProxy } from "unpdf";

const ARCHIVE_URL = "https://www.berkshirehathaway.com/letters/letters.html";
const FIRST_YEAR = 1977;
const LAST_YEAR = 2024;
const EXPECTED_COUNT = LAST_YEAR - FIRST_YEAR + 1;
const ROOT = path.resolve(
  "sources",
  "warren-buffett",
  "berkshire-shareholder-letters",
);
const RAW_DIR = path.join(ROOT, "raw");
const TEXT_DIR = path.join(ROOT, "text");

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const hex = entity[1]?.toLowerCase() === "x";
      const digits = entity.slice(hex ? 2 : 1);
      const codePoint = Number.parseInt(digits, hex ? 16 : 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

function normalizeText(value) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/([A-Za-z])[-\u2010\u2011]\s*\n\s*([a-z])/g, "$1$2")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function htmlToText(bytes) {
  const html = new TextDecoder("windows-1252").decode(bytes);
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const source = body?.[1] ?? html;
  return normalizeText(
    decodeEntities(
      source
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|tr|h[1-6])>/gi, "\n")
        .replace(/<li\b[^>]*>/gi, "\n- ")
        .replace(/<[^>]+>/g, ""),
    ),
  );
}

async function pdfToText(bytes) {
  const pdf = await getDocumentProxy(new Uint8Array(bytes));
  const { totalPages, text } = await extractText(pdf, { mergePages: false });
  const pages = Array.isArray(text) ? text : [text];
  const body = pages
    .map((page, index) => `## Page ${index + 1}\n\n${normalizeText(page)}`)
    .join("\n\n");
  return { body, pages: totalPages };
}

function parseArchive(html) {
  const entries = [];
  const seen = new Set();
  const anchor = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>\s*((?:19|20)\d{2})\s*<\/a>/gi;
  for (const match of html.matchAll(anchor)) {
    const year = Number(match[2]);
    const href = match[1];
    if (
      year < FIRST_YEAR ||
      year > LAST_YEAR ||
      !/\.(?:html|pdf)$/i.test(href) ||
      seen.has(year)
    ) {
      continue;
    }
    seen.add(year);
    entries.push({ year, href });
  }
  return entries.sort((a, b) => a.year - b.year);
}

async function fetchBytes(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "summon.guide corpus downloader" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function downloadEntry(entry, downloadedAt) {
  const archiveUrl = new URL(entry.href, ARCHIVE_URL).href;
  let url = archiveUrl;
  let format = entry.href.toLowerCase().endsWith(".pdf") ? "pdf" : "html";
  let bytes = await fetchBytes(url);

  // The archive entries for 2000 through 2003 are small HTML interstitials
  // that point at the actual letter. Follow the official PDF link so the local
  // corpus contains the letter rather than the download instructions.
  if (format === "html" && htmlToText(bytes).split(/\s+/).length < 500) {
    const html = new TextDecoder("windows-1252").decode(bytes);
    const hrefs = [...html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi)].map(
      (match) => match[1],
    );
    const yearPdf = new RegExp(`${entry.year}[^/]*\\.pdf$`, "i");
    const alternate =
      hrefs.find((href) => yearPdf.test(href)) ??
      hrefs.find((href) => /letter\.html$/i.test(href));
    if (alternate) {
      url = new URL(alternate, archiveUrl).href;
      format = url.toLowerCase().endsWith(".pdf") ? "pdf" : "html";
      bytes = await fetchBytes(url);
    }
  }

  const rawName = path.basename(new URL(url).pathname);
  const rawPath = path.join(RAW_DIR, rawName);
  const textPath = path.join(TEXT_DIR, `${entry.year}.md`);

  await fs.writeFile(rawPath, bytes);

  let body;
  let pages = null;
  if (format === "pdf") {
    const extracted = await pdfToText(bytes);
    body = extracted.body;
    pages = extracted.pages;
  } else {
    body = htmlToText(bytes);
  }

  const words = body.split(/\s+/).filter((word) => /[a-z0-9]/i.test(word)).length;
  const frontmatter = [
    "---",
    `year: ${entry.year}`,
    `source_url: ${url}`,
    `source_format: ${format}`,
    `pages: ${pages ?? "null"}`,
    `words: ${words}`,
    `downloaded_at: ${downloadedAt}`,
    "---",
    "",
    `# Berkshire Hathaway shareholder letter, ${entry.year}`,
    "",
  ].join("\n");
  await fs.writeFile(textPath, `${frontmatter}${body}\n`, "utf8");

  process.stdout.write(`${entry.year} `);
  return {
    year: entry.year,
    archiveUrl,
    url,
    format,
    rawPath: path.relative(process.cwd(), rawPath).replaceAll("\\", "/"),
    textPath: path.relative(process.cwd(), textPath).replaceAll("\\", "/"),
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    pages,
    words,
  };
}

const archiveResponse = await fetch(ARCHIVE_URL, {
  headers: { "user-agent": "summon.guide corpus downloader" },
});
if (!archiveResponse.ok) {
  throw new Error(
    `${archiveResponse.status} ${archiveResponse.statusText}: ${ARCHIVE_URL}`,
  );
}

const entries = parseArchive(await archiveResponse.text());
const years = entries.map(({ year }) => year);
const expectedYears = Array.from(
  { length: EXPECTED_COUNT },
  (_, index) => FIRST_YEAR + index,
);
if (
  entries.length !== EXPECTED_COUNT ||
  years.some((year, index) => year !== expectedYears[index])
) {
  throw new Error(
    `Archive shape changed. Expected ${EXPECTED_COUNT} consecutive letters from ${FIRST_YEAR} through ${LAST_YEAR}; found ${years.join(
      ", ",
    )}`,
  );
}

if (path.dirname(RAW_DIR) !== ROOT || path.dirname(TEXT_DIR) !== ROOT) {
  throw new Error("Refusing to clear source directories outside the corpus root.");
}
await Promise.all([
  fs.rm(RAW_DIR, { recursive: true, force: true }),
  fs.rm(TEXT_DIR, { recursive: true, force: true }),
]);
await fs.mkdir(RAW_DIR, { recursive: true });
await fs.mkdir(TEXT_DIR, { recursive: true });

const downloadedAt = new Date().toISOString();
const manifestEntries = [];
const concurrency = 6;
for (let index = 0; index < entries.length; index += concurrency) {
  const batch = entries.slice(index, index + concurrency);
  manifestEntries.push(
    ...(await Promise.all(
      batch.map((entry) => downloadEntry(entry, downloadedAt)),
    )),
  );
}
process.stdout.write("\n");

manifestEntries.sort((a, b) => a.year - b.year);
const manifest = {
  sourceArchive: ARCHIVE_URL,
  downloadedAt,
  firstYear: FIRST_YEAR,
  lastYear: LAST_YEAR,
  count: manifestEntries.length,
  totalBytes: manifestEntries.reduce((sum, entry) => sum + entry.bytes, 0),
  totalWords: manifestEntries.reduce((sum, entry) => sum + entry.words, 0),
  entries: manifestEntries,
};
await fs.writeFile(
  path.join(ROOT, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(
  `Downloaded ${manifest.count} letters (${manifest.firstYear}-${manifest.lastYear}), ` +
    `${manifest.totalBytes.toLocaleString("en-US")} bytes, ` +
    `${manifest.totalWords.toLocaleString("en-US")} extracted words.`,
);
