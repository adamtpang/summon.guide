#!/usr/bin/env node
// Turns a plan of episode scripts into the files /speak and book.movie consume.
//
//   node scripts/episodes-from-plan.mjs plan-episodes.json --dry
//   node scripts/episodes-from-plan.mjs plan-episodes.json
//
// This closes the one gap in the book-to-media chain. The rest already exists:
//
//   PDF  ->  book.md          scripts/pdf-to-md.mjs
//   book.md -> episode script THIS SCRIPT (plus the judgment skill that writes the plan)
//   script -> audio           /speak and POST /api/tts (ElevenLabs)
//   audio -> video            book.movie / Remotion, per BOOK_MOVIE_HANDOFF.md
//
// Length is the thing that silently ruins an episode. The format targets 90 to
// 120 spoken seconds, and a script that runs 400 words does not fit no matter how
// good it reads. Every episode is measured here and rejected if it will not fit,
// the same way a stand-up set is timed before it is performed.

import fs from 'fs';
import path from 'path';

const planPath = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!planPath || !fs.existsSync(planPath)) {
  console.error('usage: node scripts/episodes-from-plan.mjs <plan-episodes.json> [--dry]');
  process.exit(1);
}

const fail = (m) => { console.error('REFUSING: ' + m); process.exit(1); };

// ── keep in step with src/lib/episode.ts ─────────────────────────────────────
// Those values are the source of truth because /speak renders against them. They
// are asserted rather than imported so this stays a plain .mjs script with no
// build step, and it fails loudly instead of drifting.
const WPM = 145;
const TARGET = { minWords: 200, maxWords: 300, minSeconds: 90, maxSeconds: 120 };
{
  const src = fs.readFileSync('src/lib/episode.ts', 'utf8');
  const got = {
    WPM: Number((/export const WPM = (\d+)/.exec(src) || [])[1]),
    minWords: Number((/minWords:\s*(\d+)/.exec(src) || [])[1]),
    maxWords: Number((/maxWords:\s*(\d+)/.exec(src) || [])[1]),
    minSeconds: Number((/minSeconds:\s*(\d+)/.exec(src) || [])[1]),
    maxSeconds: Number((/maxSeconds:\s*(\d+)/.exec(src) || [])[1]),
  };
  if (
    got.WPM !== WPM ||
    got.minWords !== TARGET.minWords ||
    got.maxWords !== TARGET.maxWords ||
    got.minSeconds !== TARGET.minSeconds ||
    got.maxSeconds !== TARGET.maxSeconds
  ) {
    fail(
      'episode constants drifted from src/lib/episode.ts. This script says ' +
        JSON.stringify({ WPM, ...TARGET }) + ' and episode.ts says ' + JSON.stringify(got) +
        '. Update this script so the timing model matches what /speak renders.'
    );
  }
}

const countWords = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const estimateSeconds = (t) => Math.round((countWords(t) / WPM) * 60);

const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const { figureSlug, bookSlug, episodes } = plan;
if (!figureSlug || !bookSlug || !Array.isArray(episodes) || !episodes.length) {
  fail('plan needs figureSlug, bookSlug, and a non-empty episodes array');
}

// ── preflight ────────────────────────────────────────────────────────────────
const figuresSrc = fs.readFileSync('src/lib/figures.ts', 'utf8');
const booksSrc = fs.readFileSync('src/lib/books.ts', 'utf8');
const voicesSrc = fs.readFileSync('src/lib/voices.ts', 'utf8');

if (!new RegExp('slug:\\s*"' + figureSlug + '"').test(figuresSrc)) {
  fail('figure "' + figureSlug + '" is not in figures.ts');
}
if (!new RegExp('slug:\\s*"' + bookSlug + '"').test(booksSrc)) {
  fail('book "' + bookSlug + '" is not in books.ts');
}

const figureBlock = figuresSrc.slice(figuresSrc.indexOf('slug: "' + figureSlug + '"'));
const figureName = (/name:\s*"([^"]+)"/.exec(figureBlock) || [])[1] || figureSlug;
// Read the portrait path rather than deriving it. The files are named after the
// full name ("benjamin-franklin.jpg"), not the figure slug ("franklin"), so
// constructing "/portraits/<slug>.jpg" produces a 404 for most guides.
const portrait = (/portrait:\s*"([^"]+)"/.exec(figureBlock) || [])[1] || null;
if (!portrait) {
  console.error('WARNING: no portrait found for "' + figureSlug + '" in figures.ts.');
}
const bookBlock = booksSrc.slice(booksSrc.indexOf('slug: "' + bookSlug + '"'));
const bookTitle = (/title:\s*"([^"]+)"/.exec(bookBlock) || [])[1] || bookSlug;

// A guide with no ElevenLabs voice cannot produce audio, so say so now rather
// than after someone writes five scripts.
const hasVoice = new RegExp('(^|[\\s{,"])"?' + figureSlug + '"?\\s*:').test(voicesSrc);

// ── validate every episode before writing any of them ────────────────────────
const rows = [];
for (const ep of episodes) {
  if (!ep.slug || !ep.title || !ep.hook || !Array.isArray(ep.points) || !ep.close) {
    fail('episode "' + (ep.slug || '?') + '" needs slug, title, hook, points[], close');
  }
  if (ep.points.length !== 3) {
    fail('episode "' + ep.slug + '" has ' + ep.points.length + ' points. The format is exactly 3.');
  }
  if (/—|–/.test(JSON.stringify(ep))) {
    fail('episode "' + ep.slug + '" contains an em or en dash. The repo forbids them.');
  }
  const spoken = [ep.hook, ...ep.points, ep.close].join('\n\n');
  const words = countWords(spoken);
  const secs = estimateSeconds(spoken);
  const fits = words >= TARGET.minWords && words <= TARGET.maxWords;
  rows.push({ ep, words, secs, fits, spoken });
}

const tooLong = rows.filter((r) => r.words > TARGET.maxWords);
const tooShort = rows.filter((r) => r.words < TARGET.minWords);
if (tooLong.length || tooShort.length) {
  console.error('Episode length is out of range. The format is ' + TARGET.minWords + ' to ' +
    TARGET.maxWords + ' words (' + TARGET.minSeconds + ' to ' + TARGET.maxSeconds + 's at ' + WPM + ' wpm).');
  for (const r of [...tooLong, ...tooShort]) {
    const dir = r.words > TARGET.maxWords ? 'CUT ' + (r.words - TARGET.maxWords) : 'ADD ' + (TARGET.minWords - r.words);
    console.error('  ' + r.ep.slug + ': ' + r.words + ' words, ' + r.secs + 's  ->  ' + dir + ' words');
  }
  fail('fix the lengths in the plan and re-run. Nothing was written.');
}

// ── build the files ──────────────────────────────────────────────────────────
const outDir = path.join('content', 'episodes', figureSlug);
const writes = [];

for (const { ep, words, secs, spoken } of rows) {
  const md = [
    '# ' + ep.title,
    '',
    '**Guide:** ' + figureName + ' (`' + figureSlug + '`)  ',
    '**Source:** ' + bookTitle + (ep.sourceAnchor ? ' (' + ep.sourceAnchor + ')' : '') + '  ',
    '**Path:** `/speak` -> paste this script -> Generate and play / Download mp3  ',
    '**Length:** ' + words + ' words, about ' + secs + 's spoken at ' + WPM + ' wpm  ',
    '**Style:** Hook, 3 points, close',
    '',
    '---',
    '',
    '## Hook',
    '',
    ep.hook,
    '',
    '## Point 1',
    '',
    ep.points[0],
    '',
    '## Point 2',
    '',
    ep.points[1],
    '',
    '## Point 3',
    '',
    ep.points[2],
    '',
    '## Close',
    '',
    ep.close,
    '',
  ].join('\n');
  writes.push({ file: path.join(outDir, ep.slug + '.md'), content: md });

  // the stable contract from BOOK_MOVIE_HANDOFF.md, so visuals can be produced
  // without anyone re-deriving it per episode
  const handoff = {
    source: 'summon.guide',
    guideSlug: figureSlug,
    guideName: figureName,
    episodeSlug: ep.slug,
    title: ep.title,
    sourceBook: bookTitle,
    sourceAnchor: ep.sourceAnchor || null,
    audio: figureSlug + '-' + ep.slug + '-voiceover.mp3',
    format: 'audio/mpeg',
    scriptPath: path.join(outDir, ep.slug + '.md').replace(/\\/g, '/'),
    words,
    estimatedSeconds: secs,
    targetSeconds: [TARGET.minSeconds, TARGET.maxSeconds],
    structure: ['hook', 'point1', 'point2', 'point3', 'close'],
    beats: [ep.hook, ...ep.points, ep.close].map((t, i) => ({
      index: i,
      role: ['hook', 'point1', 'point2', 'point3', 'close'][i],
      seconds: estimateSeconds(t),
      text: t,
    })),
    portrait,
    aesthetic: 'editorial-print',
  };
  writes.push({
    file: path.join(outDir, ep.slug + '.handoff.json'),
    content: JSON.stringify(handoff, null, 2) + '\n',
  });
}

// a series manifest, so a book reads as a body of work rather than loose files
const series = {
  source: 'summon.guide',
  guideSlug: figureSlug,
  guideName: figureName,
  bookSlug,
  bookTitle,
  episodeCount: rows.length,
  totalWords: rows.reduce((n, r) => n + r.words, 0),
  totalSeconds: rows.reduce((n, r) => n + r.secs, 0),
  hasMappedVoice: hasVoice,
  episodes: rows.map(({ ep, words, secs }) => ({
    slug: ep.slug,
    title: ep.title,
    words,
    estimatedSeconds: secs,
    script: path.join(outDir, ep.slug + '.md').replace(/\\/g, '/'),
    handoff: path.join(outDir, ep.slug + '.handoff.json').replace(/\\/g, '/'),
  })),
};
writes.push({
  file: path.join(outDir, bookSlug + '.series.json'),
  content: JSON.stringify(series, null, 2) + '\n',
});

// ── apply ────────────────────────────────────────────────────────────────────
console.log((DRY ? '[DRY RUN] ' : '') + figureName + ' / ' + bookTitle);
console.log('');
console.log('  episode'.padEnd(30) + 'words'.padStart(6) + 'secs'.padStart(6));
for (const { ep, words, secs } of rows) {
  console.log('  ' + ep.slug.slice(0, 28).padEnd(30) + String(words).padStart(6) + String(secs).padStart(6));
}
const mins = Math.floor(series.totalSeconds / 60);
console.log('  ' + '-'.repeat(40));
console.log('  ' + String(rows.length + ' episodes').padEnd(30) +
  String(series.totalWords).padStart(6) + String(series.totalSeconds).padStart(6) +
  '  (' + mins + 'm ' + (series.totalSeconds % 60) + 's of finished media)');
console.log('');

for (const w of writes) {
  console.log('  ' + (DRY ? 'would write' : 'wrote') + '  ' + w.file.replace(/\\/g, '/'));
  if (!DRY) {
    fs.mkdirSync(path.dirname(w.file), { recursive: true });
    fs.writeFileSync(w.file, w.content);
  }
}

console.log('');
if (!hasVoice) {
  console.log('  WARNING: "' + figureSlug + '" has no voice in src/lib/voices.ts, so /api/tts');
  console.log('  will fall back to the default voice. Add a mapping for a guide-accurate read.');
}
if (DRY) console.log('  nothing written. Re-run without --dry to apply.');
else {
  console.log('  Next: open /speak, paste a script, generate the mp3, then hand the');
  console.log('  .handoff.json to book.movie for visuals.');
}
