#!/usr/bin/env node
// Rebuilds the hand-kept INDEX.md tables for the Founders Podcast and David
// Senra interview corpora from each synthesis file's frontmatter, so the index
// never drifts from the directory again.
//
//   node scripts/gen-knowledge-index.mjs          # write both INDEX.md files
//   node scripts/gen-knowledge-index.mjs --check  # exit 1 if either is stale
//
// Only frontmatter is read (subject or guest, principle, source_book or
// company, word_count). Synthesis bodies are never copied into the index.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const check = process.argv.includes("--check");

const targets = [
  {
    dir: path.join(root, "content", "knowledge", "founders"),
    title: "# Founders Podcast, Knowledge Base Index",
    headline: (n, words) =>
      `**${n} original episode syntheses** · ${words.toLocaleString("en-US")} source-transcript words · David Senra's [Founders Podcast](https://www.youtube.com/@founderspodcast1)`,
    note: "Files are numbered sequentially in the order syntheses were added; each file's frontmatter `rank` carries the channel's popularity rank at extraction time.",
    columns: "| # | Founder / subject | The principle it teaches | Source book | File |",
    who: (fm) => fm.subject,
    source: (fm) => fm.source_book,
    agentNote:
      "> For Summon agents: each file's frontmatter carries `subject`, `source_book`, and a one-line `principle`; the body contains original **Key lessons** grounded in the private transcript.",
  },
  {
    dir: path.join(root, "content", "knowledge", "interviews"),
    title: "# David Senra, Interview Show (Knowledge Base Index)",
    headline: (n, words) =>
      `**${n} original episode syntheses** · ${words.toLocaleString("en-US")} source-transcript words · David Senra's interview show [@DavidSenra](https://www.youtube.com/@DavidSenra); long-form talks with living founders`,
    note: "Files are numbered sequentially in the order syntheses were added; each file's frontmatter `rank` carries the channel's popularity rank at extraction time.",
    columns: "| # | Guest founder | The principle it teaches | Source | File |",
    who: (fm) => fm.guest || fm.subject,
    source: (fm) => fm.company || fm.source_book,
    agentNote:
      "> For Summon agents: each file's frontmatter carries the subject/guest, source, and a one-line `principle`; the body contains original **Key lessons** grounded in the private transcript.",
  },
];

// House style forbids em and en dashes in Markdown artifacts. Older synthesis
// frontmatter predates that rule, so normalize when copying into the index.
const clean = (text) =>
  String(text ?? "")
    .replace(/\s*[‒–—―−]+\s*/g, ", ")
    .replace(/\|/g, "/")
    .replace(/\s+/g, " ")
    .trim();

function frontmatter(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---/.exec(raw);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fm[m[1]] = value;
  }
  return fm;
}

let stale = 0;
for (const t of targets) {
  if (!fs.existsSync(t.dir)) continue;
  const files = fs
    .readdirSync(t.dir)
    .filter((f) => f.endsWith(".md") && f.toUpperCase() !== "INDEX.MD")
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const rows = [];
  let words = 0;
  for (const f of files) {
    const fm = frontmatter(path.join(t.dir, f));
    if (!fm || !fm.principle) {
      console.warn(`skipping ${path.basename(t.dir)}/${f}: no parseable frontmatter principle`);
      continue;
    }
    words += Number(fm.word_count || 0);
    rows.push(
      `| ${rows.length + 1} | **${clean(t.who(fm)) || "Unknown"}** | ${clean(fm.principle)} | ${clean(t.source(fm)) || "Not named in the episode"} | [${f}](${f}) |`,
    );
  }
  const out = [
    t.title,
    "",
    t.headline(rows.length, words),
    "Synced via [youchop.app/extract](https://youchop.app/extract). Full transcripts remain in Summon's private corpus; this directory contains publishable original synthesis only.",
    t.note,
    "",
    t.agentNote,
    "",
    t.columns,
    "|---|---|---|---|---|",
    ...rows,
    "",
  ].join("\n");
  const target = path.join(t.dir, "INDEX.md");
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n") : "";
  if (check) {
    if (current !== out) {
      stale += 1;
      console.error(`stale index: ${path.relative(root, target)}`);
    }
  } else {
    fs.writeFileSync(target, out);
    console.log(`wrote ${path.relative(root, target)}: ${rows.length} syntheses, ${words.toLocaleString("en-US")} words`);
  }
}
if (check) {
  if (stale) process.exit(1);
  console.log("knowledge indexes are current");
}
