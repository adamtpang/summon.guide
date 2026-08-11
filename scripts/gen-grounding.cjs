// Generic figureSources.ts entry generator. Reads pre-synthesized episode .md files
// (frontmatter: title, principle, series/show, youtube_id + a "## Key lessons" bulleted
// list) and produces a paste-ready TS object for the figureSources registry.
//
// Usage: node _gen_grounding.cjs <slug> <corpusDir> <file1.md> [file2.md ...]
const fs = require("fs");
const path = require("path");

function esc(s) {
  return s.split("\\").join("\\\\").split('"').join('\\"');
}

function parseFile(dir, fname) {
  const raw = fs.readFileSync(path.join(dir, fname), "utf8").replace(/\r\n/g, "\n");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) throw new Error(`${fname}: no frontmatter block found`);
  const fm = {};
  for (const line of fmMatch[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    fm[key] = val;
  }
  const afterHeader = raw.split("## Key lessons")[1];
  if (!afterHeader) throw new Error(`${fname}: no "## Key lessons" section`);
  const lessonsBlock = afterHeader.split("\n---\n")[0];
  const lessons = lessonsBlock
    .split("\n")
    .filter((l) => l.trim().indexOf("- ") === 0)
    .map((l) => l.trim().slice(2).trim());
  if (!lessons.length) throw new Error(`${fname}: parsed 0 key lessons`);
  return { fm, lessons };
}

const args = process.argv.slice(2);
let subjectOverride = null;
const subjectIdx = args.indexOf("--subject");
if (subjectIdx !== -1) {
  subjectOverride = args[subjectIdx + 1];
  args.splice(subjectIdx, 2);
}
const [slug, corpusDirArg, ...files] = args;
if (!slug || !corpusDirArg || !files.length) {
  console.error("Usage: node gen-grounding.cjs <slug> <corpusDirRelativeToRepo> <file1.md> [...] [--subject \"Name\"]");
  process.exit(1);
}
const DIR = path.join(__dirname, "..", corpusDirArg); // scripts/ is one level under repo root

let out = `  "${slug}": {\n    coverage: "partial",\n    sources: [\n`;
for (const f of files) {
  const { fm, lessons } = parseFile(DIR, f);
  const show = fm.series || fm.show || "";
  const sourceBook = show && !fm.title.startsWith(show) ? `${show}: ${fm.title}` : fm.title;
  const youtubeUrl = fm.youtube_url || (fm.youtube_id ? `https://www.youtube.com/watch?v=${fm.youtube_id}` : "");
  out += "      {\n";
  out += `        file: "${corpusDirArg}/${f}",\n`;
  out += `        title: "${esc(fm.title)}",\n`;
  out += `        show: "${esc(show)}",\n`;
  out += `        subject: "${esc(subjectOverride || fm.subject || fm.guest || "")}",\n`;
  out += `        sourceBook: "${esc(sourceBook)}",\n`;
  out += `        youtube: "${youtubeUrl}",\n`;
  out += `        principle: "${esc(fm.principle)}",\n`;
  out += "        keyLessons: [\n";
  for (const l of lessons) out += `          "${esc(l)}",\n`;
  out += "        ],\n";
  out += "      },\n";
}
out += "    ],\n  },\n";

const outPath = path.join(__dirname, `_grounding_${slug}.txt`);
fs.writeFileSync(outPath, out);
console.log(`wrote ${outPath}, ${out.length} chars, ${files.length} sources`);
