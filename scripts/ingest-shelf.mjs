#!/usr/bin/env node
// Dedupe the local library, extract every PDF to markdown, and write a catalog.
//
//   node scripts/ingest-shelf.mjs --dry        inventory only, extract nothing
//   node scripts/ingest-shelf.mjs              extract everything not yet done
//   node scripts/ingest-shelf.mjs --limit 20   extract the next 20 only
//
// Extraction output goes to sources/_md/, which is gitignored. That text is the
// book in another format and is exactly as copyrighted as the PDF, so it stays
// local and feeds the pipeline. What ships is the catalog: title, author guess,
// shelf, size, word count, and processing status, which is what is needed to
// decide what to build next.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const LIB = 'C:/Users/adamp/Desktop/win/Library/Books';
const MD = 'sources/_md';
const CATALOG = 'data/library.json';
const DRY = process.argv.includes('--dry');
const limitFlag = process.argv.indexOf('--limit');
const LIMIT = limitFlag >= 0 ? Number(process.argv[limitFlag + 1]) : Infinity;

const slugify = (s) =>
  s
    .replace(/\.(pdf|epub|mobi|azw3)$/i, '')
    .replace(/^_?OceanofPDF\.com_?/i, '')
    .replace(/^\d{2}-\d{2}-\d{4}-?\d*/, '')
    .replace(/\(\d+\)\s*$/, '')
    .replace(/[_]+/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 70);

const titleize = (s) =>
  s
    .replace(/\.(pdf|epub|mobi|azw3)$/i, '')
    .replace(/^_?OceanofPDF\.com_?/i, '')
    .replace(/^\d{2}-\d{2}-\d{4}-?\d*/, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// ── gather and dedupe ────────────────────────────────────────────────────────
const found = [];
if (!fs.existsSync(LIB)) { console.error('library not found: ' + LIB); process.exit(1); }
for (const shelf of fs.readdirSync(LIB)) {
  const p = path.join(LIB, shelf);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f of fs.readdirSync(p)) {
    if (!/\.pdf$/i.test(f)) continue;
    const full = path.join(p, f);
    const size = fs.statSync(full).size;
    found.push({ shelf, file: f, full, size, slug: slugify(f), title: titleize(f) });
  }
}

// keep the largest copy of each slug, which is almost always the better scan
const byslug = new Map();
let dupes = 0;
for (const b of found) {
  if (!b.slug) continue;
  const prev = byslug.get(b.slug);
  if (!prev) byslug.set(b.slug, b);
  else { dupes++; if (b.size > prev.size) byslug.set(b.slug, b); }
}
// drop things too small to be a book
const books = [...byslug.values()].filter((b) => b.size > 40 * 1024);
const tiny = [...byslug.values()].length - books.length;

console.log('found ' + found.length + ' pdfs');
console.log('  duplicates collapsed: ' + dupes);
console.log('  too small to be books: ' + tiny);
console.log('  unique books: ' + books.length);

// ── extract ──────────────────────────────────────────────────────────────────
fs.mkdirSync(MD, { recursive: true });
const done = new Set(fs.readdirSync(MD).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')));
const todo = books.filter((b) => !done.has(b.slug));
console.log('  already extracted: ' + (books.length - todo.length));
console.log('  to extract: ' + Math.min(todo.length, LIMIT));

const catalog = [];
let okN = 0, scannedN = 0, failN = 0;

for (const b of books) {
  const mdPath = path.join(MD, b.slug + '.md');
  let status = 'pending';
  let words = 0;
  let pages = 0;

  if (fs.existsSync(mdPath)) {
    const t = fs.readFileSync(mdPath, 'utf8');
    words = (/^words:\s*(\d+)/m.exec(t) || [])[1] ? Number(/^words:\s*(\d+)/m.exec(t)[1]) : t.split(/\s+/).length;
    pages = Number((/^pages:\s*(\d+)/m.exec(t) || [])[1] || 0);
    status = words < (pages || 1) * 50 ? 'scanned' : 'extracted';
  } else if (!DRY && okN + scannedN + failN < LIMIT) {
    try {
      execSync(`node scripts/pdf-to-md.mjs "${b.full}" --out "${mdPath}"`, { stdio: 'pipe', timeout: 120000 });
      const t = fs.readFileSync(mdPath, 'utf8');
      words = Number((/^words:\s*(\d+)/m.exec(t) || [])[1] || 0);
      pages = Number((/^pages:\s*(\d+)/m.exec(t) || [])[1] || 0);
      status = words < (pages || 1) * 50 ? 'scanned' : 'extracted';
      process.stdout.write('.');
    } catch {
      status = 'failed';
      process.stdout.write('x');
    }
  }

  if (status === 'extracted') okN++;
  else if (status === 'scanned') scannedN++;
  else if (status === 'failed') failN++;

  catalog.push({
    slug: b.slug,
    title: b.title,
    shelf: b.shelf,
    sizeKb: Math.round(b.size / 1024),
    pages,
    words,
    status,
  });
}

catalog.sort((a, b) => a.title.localeCompare(b.title));
fs.mkdirSync(path.dirname(CATALOG), { recursive: true });
if (!DRY) fs.writeFileSync(CATALOG, JSON.stringify({ generated: catalog.length, books: catalog }, null, 2) + '\n');

console.log('\n\nextracted: ' + okN);
console.log('scanned (images, needs OCR): ' + scannedN);
console.log('failed: ' + failN);
console.log('pending: ' + catalog.filter((c) => c.status === 'pending').length);
if (!DRY) console.log('wrote ' + CATALOG + ' with ' + catalog.length + ' books');
