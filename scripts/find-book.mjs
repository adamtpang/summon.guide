#!/usr/bin/env node
// Finds legally ingestible sources for a book.
//
//   node scripts/find-book.mjs "The Beginning of Infinity"
//   node scripts/find-book.mjs "Meditations" --json
//   node scripts/find-book.mjs --backlog "C:/path/to/Library/Books/no-pdfs"
//
// Scope, stated plainly: this searches sources you can legally read and ingest.
// Public domain (Project Gutenberg, Standard Ebooks), open access (DOAB),
// library scans and lending (Internet Archive, Open Library), and your own
// local library. It does not search shadow libraries, and adding one would
// defeat the point, since the corpus is meant to be citable.
//
// Design note: most of this needs no browser at all. Gutenberg, Open Library,
// the Internet Archive and DOAB all have public APIs that answer in one request
// and do not break when a page is restyled. A browser harness is the right tool
// for the tail that has no API, which is author sites and publisher pages, and
// that escalation is described in .claude/skills/find-book/SKILL.md rather than
// done here.

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const backlogFlag = args.indexOf('--backlog');
const BACKLOG = backlogFlag >= 0 ? args[backlogFlag + 1] : null;
const title = args.filter((a) => !a.startsWith('--')).filter((a) => a !== BACKLOG).join(' ').trim();

if (!title && !BACKLOG) {
  console.error('usage: node scripts/find-book.mjs "<book title>" [--json]');
  console.error('       node scripts/find-book.mjs --backlog <dir>');
  process.exit(1);
}

const LOCAL_LIBRARY = 'C:/Users/adamp/Desktop/win/Library/Books';

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/\.(pdf|epub|mobi|azw3|txt|md)$/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const jget = async (url) => {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'summon.guide book finder' } });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
};

// ── 0. the local shelf, checked first so nothing is hunted twice ─────────────
function findLocal(t) {
  const want = norm(t);
  const hits = [];
  if (!fs.existsSync(LOCAL_LIBRARY)) return hits;
  const stack = [LOCAL_LIBRARY];
  while (stack.length) {
    const d = stack.pop();
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { continue; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { stack.push(p); continue; }
      if (!/\.(pdf|epub|mobi|azw3)$/i.test(e.name)) continue;
      const n = norm(e.name);
      if (n.includes(want) || want.includes(n)) {
        hits.push({ source: 'your library', title: e.name, url: p.replace(/\\/g, '/'), format: path.extname(e.name).slice(1), license: 'owned' });
      }
    }
  }
  return hits;
}

// ── 1. Project Gutenberg, via the Gutendex API. Public domain. ───────────────
async function findGutenberg(t) {
  const j = await jget('https://gutendex.com/books?search=' + encodeURIComponent(t));
  if (!j?.results?.length) return [];
  return j.results.slice(0, 3).map((b) => {
    const f = b.formats || {};
    const url =
      f['application/epub+zip'] ||
      f['text/plain; charset=utf-8'] ||
      f['text/plain'] ||
      f['text/html'] ||
      ('https://www.gutenberg.org/ebooks/' + b.id);
    return {
      source: 'Project Gutenberg',
      title: b.title,
      author: (b.authors || []).map((a) => a.name).join(', '),
      url,
      format: f['application/epub+zip'] ? 'epub' : 'txt',
      license: 'public domain',
      downloads: b.download_count,
    };
  });
}

// ── 2. Open Library, for editions and whether the Archive can lend it ────────
async function findOpenLibrary(t) {
  const j = await jget(
    'https://openlibrary.org/search.json?limit=3&fields=title,author_name,first_publish_year,ia,public_scan_b,lending_edition_s,key&q=' +
      encodeURIComponent(t)
  );
  if (!j?.docs?.length) return [];
  return j.docs
    .map((d) => {
      const scan = Array.isArray(d.ia) ? d.ia[0] : null;
      if (!scan) return null;
      return {
        source: d.public_scan_b ? 'Internet Archive (full view)' : 'Internet Archive (lending)',
        title: d.title,
        author: (d.author_name || []).join(', '),
        year: d.first_publish_year,
        url: 'https://archive.org/details/' + scan,
        format: d.public_scan_b ? 'pdf, epub, txt' : 'borrow',
        license: d.public_scan_b ? 'public domain scan' : 'controlled digital lending',
      };
    })
    .filter(Boolean);
}

// ── 3. DOAB, peer-reviewed open access books ─────────────────────────────────
async function findDOAB(t) {
  const j = await jget(
    'https://directory.doabooks.org/rest/search?query=' + encodeURIComponent(t) + '&expand=metadata'
  );
  if (!Array.isArray(j) || !j.length) return [];
  return j.slice(0, 2).map((b) => ({
    source: 'DOAB (open access)',
    title: b.name || t,
    url: b.handle ? 'https://directory.doabooks.org/handle/' + b.handle : 'https://directory.doabooks.org',
    format: 'pdf',
    license: 'open access',
  }));
}

async function findAll(t) {
  const local = findLocal(t);
  const [g, ol, doab] = await Promise.all([findGutenberg(t), findOpenLibrary(t), findDOAB(t)]);
  return [...local, ...g, ...doab, ...ol];
}

// ── backlog mode: work a whole folder of wanted titles ───────────────────────
if (BACKLOG) {
  if (!fs.existsSync(BACKLOG)) { console.error('not found: ' + BACKLOG); process.exit(1); }
  const wanted = fs
    .readdirSync(BACKLOG)
    .filter((f) => /\.(pdf|epub|txt|md)$/i.test(f))
    .map((f) => f.replace(/\.(pdf|epub|txt|md)$/i, ''))
    .map((f) => f.replace(/^_?OceanofPDF\.com_?/i, '').replace(/[_-]+/g, ' ').trim());

  console.log('backlog: ' + wanted.length + ' titles in ' + BACKLOG + '\n');
  const results = [];
  for (const w of wanted.slice(0, 40)) {
    const hits = await findAll(w);
    const legal = hits.filter((h) => h.license !== 'controlled digital lending');
    results.push({ title: w, hits: hits.length, best: hits[0] || null });
    const mark = legal.length ? 'FREE ' : hits.length ? 'lend ' : '  .  ';
    console.log('  ' + mark + w.slice(0, 52).padEnd(54) + (hits[0] ? hits[0].source : 'no legal source found'));
  }
  const free = results.filter((r) => r.best && r.best.license !== 'controlled digital lending').length;
  console.log('\n' + free + ' of ' + results.length + ' have a freely ingestible source.');
  process.exit(0);
}

// ── single title ─────────────────────────────────────────────────────────────
const hits = await findAll(title);

if (JSON_OUT) {
  console.log(JSON.stringify({ query: title, results: hits }, null, 2));
} else if (!hits.length) {
  console.log('No legal source found for "' + title + '".');
  console.log('');
  console.log('Next steps, in order of likelihood:');
  console.log('  1. The author may host it. Many do, and it is always worth one look.');
  console.log('  2. The publisher may have an open access edition.');
  console.log('  3. Buy it, then run scripts/pdf-to-md.mjs on your own copy.');
  console.log('');
  console.log('Steps 1 and 2 have no API. That is what the browser harness is for,');
  console.log('see .claude/skills/find-book/SKILL.md.');
} else {
  console.log('"' + title + '"\n');
  for (const h of hits) {
    console.log('  ' + h.source);
    console.log('    ' + h.title + (h.author ? ' — ' + h.author : '').replace(' — ', ', '));
    console.log('    ' + h.url);
    console.log('    ' + h.format + ', ' + h.license);
    console.log('');
  }
  const ingestible = hits.filter((h) => h.license !== 'controlled digital lending');
  if (ingestible.length) {
    console.log('Ingestible now: ' + ingestible.length + ' of ' + hits.length + '.');
    console.log('  node scripts/pdf-to-md.mjs <downloaded file>');
  } else {
    console.log('Only lending copies found. Borrowable to read, not ingestible.');
  }
}
