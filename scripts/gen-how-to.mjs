#!/usr/bin/env node
// Generates src/lib/howTo.ts from content/how-to/*.md.
//
// Generated at build time on purpose, NOT read at runtime. A runtime
// fs.readFile with a non-literal path defeats Next's static file tracer,
// which is what previously bundled the entire repo into the /library
// serverless function and broke deploys at 256MB. See src/lib/ranking.ts
// for the fix that pattern needed.
//
// Usage: node scripts/gen-how-to.mjs

import fs from "fs";
import path from "path";

const SRC_DIR = "content/how-to";
const OUT = "src/lib/howTo.ts";

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Escape first, then apply a small closed set of inline transforms, so the
// generated HTML can only ever contain markup this function chose to emit.
function inline(s) {
  return escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let para = [];
  let inList = false;

  const flushPara = () => {
    if (para.length) {
      html += `<p>${inline(para.join(" "))}</p>`;
      para = [];
    }
  };
  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    const bullet = /^\s*[-*]\s+(.*)$/.exec(line);

    if (heading) {
      flushPara();
      closeList();
      const level = Math.min(heading[1].length + 1, 6); // h1 in body becomes h2
      html += `<h${level}>${inline(heading[2])}</h${level}>`;
    } else if (bullet) {
      flushPara();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(bullet[1])}</li>`;
    } else if (line.trim() === "") {
      flushPara();
      closeList();
    } else {
      closeList();
      para.push(line.trim());
    }
  }
  flushPara();
  closeList();
  return html;
}

function parseFrontmatter(raw) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw.replace(/\r\n/g, "\n"));
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([a-zA-Z]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      fm[kv[1]] = [...v.slice(1, -1).matchAll(/"([^"]+)"|'([^']+)'|([^,\s]+)/g)]
        .map((x) => x[1] || x[2] || x[3])
        .filter(Boolean);
    } else {
      fm[kv[1]] = v.replace(/^["']|["']$/g, "");
    }
  }
  return { fm, body: m[2] };
}

if (!fs.existsSync(SRC_DIR)) {
  console.error(`No ${SRC_DIR} directory. Nothing to generate.`);
  process.exit(1);
}

const articles = [];
for (const file of fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".md")).sort()) {
  const raw = fs.readFileSync(path.join(SRC_DIR, file), "utf8");
  const parsed = parseFrontmatter(raw);
  if (!parsed) {
    console.warn(`WARNING: ${file} has no frontmatter, skipping`);
    continue;
  }
  const { fm, body } = parsed;
  const slug = fm.slug || file.replace(/\.md$/, "");
  if (!fm.title) {
    console.warn(`WARNING: ${file} has no title, skipping`);
    continue;
  }
  // Drop the leading H1: the page renders the title from frontmatter.
  // Also drop a trailing "Talk to the guide" section: the page renders that
  // as a structured aside from guideSlug/guideReason, so keeping the prose
  // version too would show the same call to action twice.
  const bodyNoH1 = body
    .replace(/^\s*#\s+.*\n/, "")
    .replace(/\n#{2,3}\s+talk to the guide[\s\S]*$/i, "\n");
  articles.push({
    slug,
    title: fm.title,
    problem: fm.problem || "",
    maslowLevel: fm.maslowLevel || "",
    guideSlug: fm.guideSlug || "",
    guideReason: fm.guideReason || "",
    sourceSlugs: fm.sourceSlugs || [],
    description: fm.description || "",
    html: renderMarkdown(bodyNoH1),
  });
  console.log(`${slug}: ${fm.maslowLevel || "?"} -> guide ${fm.guideSlug || "?"}`);
}

const out = `// GENERATED FILE, do not edit by hand.
// Regenerate with: node scripts/gen-how-to.mjs
// Source: content/how-to/*.md

export interface HowToArticle {
  slug: string;
  title: string;
  problem: string;
  maslowLevel: string;
  guideSlug: string;
  guideReason: string;
  sourceSlugs: string[];
  description: string;
  /** Pre-rendered HTML. Generated from our own markdown, never user input. */
  html: string;
}

export const howToArticles: HowToArticle[] = ${JSON.stringify(articles, null, 2)};

export function getHowTo(slug: string): HowToArticle | undefined {
  return howToArticles.find((a) => a.slug === slug);
}
`;

fs.writeFileSync(OUT, out);
console.log(`\nwrote ${OUT} (${articles.length} articles)`);
