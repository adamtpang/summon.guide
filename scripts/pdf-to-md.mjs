#!/usr/bin/env node
// Stage 1 of the book-to-skills pipeline: a book PDF becomes a clean book.md.
//
//   node scripts/pdf-to-md.mjs sources/deutsch/the-beginning-of-infinity.pdf
//   node scripts/pdf-to-md.mjs <in.pdf> --out sources/_md/my-book.md
//
// Raw PDF text extraction is not usable as a corpus on its own. Every book
// carries per-page furniture that becomes noise once the page boundaries are
// gone: a running header on each spread, a page number, words hyphenated across
// a line break, and hard line wraps mid-sentence. This pass removes those and
// keeps what carries meaning, so the output reads as prose and chapter headings
// survive as markdown.
//
// Output: frontmatter (source file, page count, extraction date, word count)
// followed by the cleaned text, one blank line between paragraphs.

import fs from 'fs';
import path from 'path';
import { extractText, getDocumentProxy } from 'unpdf';

const args = process.argv.slice(2);
const input = args.find((a) => !a.startsWith('--'));
const outFlag = args.indexOf('--out');
const explicitOut = outFlag >= 0 ? args[outFlag + 1] : null;
const keepPageMarks = args.includes('--page-marks');

if (!input) {
  console.error('usage: node scripts/pdf-to-md.mjs <book.pdf> [--out path.md] [--page-marks]');
  process.exit(1);
}
if (!fs.existsSync(input)) {
  console.error('not found: ' + input);
  process.exit(1);
}

const buf = new Uint8Array(fs.readFileSync(input));
const pdf = await getDocumentProxy(buf);
const { totalPages, text } = await extractText(pdf, { mergePages: false });
const pages = Array.isArray(text) ? text : [text];

// ── strip repeated page furniture ─────────────────────────────────────────────
// A line that appears on many pages in the same position is furniture, not
// content. Counting occurrences across pages finds running heads and footers
// without needing to know the book's layout.
// Structural headings are identified FIRST, because they must be protected from
// furniture removal. Normalising digits to '#' to catch varying page numbers
// also makes "CHAPTER 1", "CHAPTER 2", "CHAPTER 3" collapse into one repeated
// string, and an earlier version duly deleted every chapter heading in the book.
const HEADING_WORD = /^(chapter|part|book|section|appendix|introduction|preface|epilogue|conclusion|prologue)\b/i;
const isHeading = (line) => {
  const t = line.trim();
  if (t.length < 3 || t.length > 70) return false;
  if (/[.,;:]$/.test(t)) return false;
  if (HEADING_WORD.test(t)) return true;
  if (t === t.toUpperCase() && /[A-Z]{3}/.test(t) && t.split(/\s+/).length <= 8) return true;
  return false;
};

// A running head is the same TEXT repeated at the top of most pages, but many
// books append the current chapter title to it, so the full line differs page to
// page. Comparing a leading window instead of the whole line catches those.
function findFurniture(pages) {
  const exact = new Map();
  const prefixes = new Map();
  for (const p of pages) {
    const lines = p.split('\n').map((l) => l.trim()).filter(Boolean);
    const edges = [...lines.slice(0, 2), ...lines.slice(-2)];
    for (const l of new Set(edges)) {
      if (isHeading(l)) continue; // never let a heading count as furniture
      exact.set(l, (exact.get(l) || 0) + 1);
      const pre = l.slice(0, 24);
      if (pre.length >= 12) prefixes.set(pre, (prefixes.get(pre) || 0) + 1);
    }
  }
  const threshold = Math.max(2, Math.ceil(pages.length * 0.5));
  return {
    exact: new Set([...exact].filter(([, n]) => n >= threshold).map(([k]) => k)),
    prefixes: new Set([...prefixes].filter(([, n]) => n >= threshold).map(([k]) => k)),
  };
}

const furniture = findFurniture(pages);
const isFurniture = (line) => {
  const t = line.trim();
  if (!t) return false;
  if (isHeading(t)) return false;
  if (/^\d{1,4}$/.test(t)) return true; // bare page number
  if (/^[ivxlc]{1,7}$/i.test(t) && t.length <= 5) return true; // roman numeral
  if (furniture.exact.has(t)) return true;
  return furniture.prefixes.has(t.slice(0, 24));
};

let cleanedPages = [];
for (const raw of pages) {
  const kept = raw
    .split('\n')
    .filter((l) => !isFurniture(l))
    .join('\n');
  cleanedPages.push(kept);
}

let body = cleanedPages.join(keepPageMarks ? '\n\n<!-- page -->\n\n' : '\n');

// rejoin words split by a hyphen at a line break: "obser-\nvation" -> "observation"
body = body.replace(/([A-Za-z])[-‐‑]\s*\n\s*([a-z])/g, '$1$2');

// Unwrap hard line breaks so sentences are contiguous. PDFs wrap text at the
// column width, which leaves a newline every ~10 words; left in place those
// breaks split sentences and make the corpus harder to read and to quote.
//
// A blank line or a heading ends the current block; everything else accumulates.
// PDF extraction usually loses real paragraph breaks entirely, so a block can be
// a whole page of prose. That is acceptable here: the output exists to be read
// and quoted, and intact sentences matter far more than exact paragraphing.
const blocks = [];
let cur = '';
const flush = () => { if (cur.trim()) blocks.push(cur.trim()); cur = ''; };

let lastWasChapterMark = false;
for (const raw of body.split('\n')) {
  const t = raw.trim();
  if (!t) { flush(); continue; }
  if (t === '<!-- page -->') { flush(); blocks.push(t); lastWasChapterMark = false; continue; }
  if (isHeading(t)) {
    flush();
    blocks.push('## ' + t.replace(/\s+/g, ' '));
    // "CHAPTER 7" on its own line is a marker, and the line after it is usually
    // the chapter's actual title. Promote that too, or the title ends up glued
    // to the first sentence of the chapter.
    lastWasChapterMark = /^(chapter|part|book)\s+[\divxlc]+$/i.test(t);
    continue;
  }
  if (lastWasChapterMark && t.length <= 70 && !/[.!?]$/.test(t)) {
    blocks.push('### ' + t.replace(/\s+/g, ' '));
    lastWasChapterMark = false;
    continue;
  }
  lastWasChapterMark = false;
  cur = cur ? cur + ' ' + t : t;
}
flush();
body = blocks.join('\n\n');

// collapse runs of blank lines and stray double spaces
body = body.replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim();

const words = body.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
const base = path.basename(input, path.extname(input));
const outPath = explicitOut || path.join('sources', '_md', base + '.md');

const frontmatter = [
  '---',
  'source_pdf: ' + input.replace(/\\/g, '/'),
  'pages: ' + totalPages,
  'words: ' + words,
  'extracted_by: scripts/pdf-to-md.mjs',
  '---',
  '',
].join('\n');

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, frontmatter + body + '\n');

const headings = (body.match(/^#{2,3} /gm) || []).length;
console.log('wrote ' + outPath);
console.log('  pages: ' + totalPages + '  words: ' + words + '  headings: ' + headings);
console.log(
  '  furniture patterns removed: ' +
    (furniture.exact.size + furniture.prefixes.size) +
    ' (' + furniture.exact.size + ' exact, ' + furniture.prefixes.size + ' running heads)'
);
if (words < totalPages * 50) {
  console.log('  NOTE: low word-per-page ratio. This PDF may be scanned images rather than');
  console.log('        text. Run it through OCR first; this script does not do OCR.');
}
