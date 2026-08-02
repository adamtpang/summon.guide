#!/usr/bin/env node
// Download every hotlinked portrait into public/portraits/ and rewrite
// figures.ts to point at the local copy.
//
//   node scripts/fetch-portraits.mjs --dry
//   node scripts/fetch-portraits.mjs
//
// Two problems this solves, both seen in the dev log.
//
// Wikimedia throttles anonymous bulk fetching, and Next's image optimizer pulls
// every portrait on a page render, so a cold load of the home page can trip 429
// on most of the roster at once. Nothing is wrong with the URLs; we are simply
// not entitled to hammer them.
//
// And hotlinks rot. Four had already gone to 404 because the file was renamed or
// replaced on Commons, which is normal there and invisible until a page renders
// a broken image.
//
// The current image is resolved through the Wikipedia REST summary for the
// figure's own article, taken from profiles.ts, so a renamed file heals itself
// rather than needing a hand-found replacement URL.
//
// Attribution is preserved in public/portraits/CREDITS.json. These are freely
// licensed but not unattributed, and hosting a copy does not change that.

import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const OUT = 'public/portraits';
const CREDITS = path.join(OUT, 'CREDITS.json');
const UA = 'summon.guide/1.0 (https://summon.guide; portrait fetch)';

const figuresSrc = fs.readFileSync('src/lib/figures.ts', 'utf8');
const profilesSrc = fs.readFileSync('src/lib/profiles.ts', 'utf8');

// slug -> current portrait value, in file order
const figures = [];
{
  const positions = [];
  const re = /\bslug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(figuresSrc)) !== null) positions.push({ slug: m[1], at: m.index });
  for (let i = 0; i < positions.length; i++) {
    const block = figuresSrc.slice(positions[i].at, i + 1 < positions.length ? positions[i + 1].at : figuresSrc.length);
    const p = /portrait:\s*\n?\s*"([^"]+)"/.exec(block);
    figures.push({ slug: positions[i].slug, portrait: p ? p[1] : null });
  }
}

// slug -> wikipedia article title, from profiles.ts
// profiles.ts carries two generations of formatting: newer entries use bare
// keys, older ones went through JSON.stringify and are fully quoted. Both the
// object key and the field name have to be matched either way, or the older
// half of the roster silently resolves to nothing. This has now caught out
// three separate scripts in this repo.
function wikiTitle(slug) {
  let at = profilesSrc.indexOf('\n  ' + slug + ': {');
  if (at < 0) at = profilesSrc.indexOf('\n  "' + slug + '": {');
  if (at < 0) return null;
  const block = profilesSrc.slice(at, at + 2500);
  const u = /"?wikipediaUrl"?:\s*"([^"]+)"/.exec(block);
  if (!u) return null;
  const m = /\/wiki\/([^"#?]+)/.exec(u[1]);
  return m ? decodeURIComponent(m[1]) : null;
}

const targets = figures.filter((f) => f.portrait && /^https?:/.test(f.portrait));
console.log('figures: ' + figures.length + '  hotlinked portraits: ' + targets.length);

const credits = fs.existsSync(CREDITS) ? JSON.parse(fs.readFileSync(CREDITS, 'utf8')) : {};
const rewrites = [];
let ok = 0, failed = 0;

for (const f of targets) {
  const title = wikiTitle(f.slug);
  let imageUrl = null;
  let sourcePage = null;

  // Candidates in preference order. Asking for a 640px thumbnail of an image
  // whose original is narrower is an upscale, and Wikimedia answers 400 rather
  // than obliging, so a widened URL can never be the only candidate.
  const candidates = [];
  if (title) {
    try {
      const r = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title), {
        headers: { 'User-Agent': UA },
      });
      if (r.ok) {
        const j = await r.json();
        sourcePage = j.content_urls?.desktop?.page || null;
        const thumb = j.thumbnail?.source || null;
        if (thumb && /\/\d+px-/.test(thumb)) candidates.push(thumb.replace(/\/\d+px-/, '/640px-'));
        if (thumb) candidates.push(thumb);
        if (j.originalimage?.source) candidates.push(j.originalimage.source);
      }
    } catch {
      /* fall through to whatever is configured */
    }
  }
  if (f.portrait) candidates.push(f.portrait);

  const file = f.slug + '.jpg';
  const dest = path.join(OUT, file);

  let buf = null;
  let lastStatus = 'none';
  for (const url of candidates) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) { lastStatus = r.status; await new Promise((s) => setTimeout(s, 250)); continue; }
      const b = Buffer.from(await r.arrayBuffer());
      if (b.length < 2000) { lastStatus = 'tiny'; continue; }
      buf = b;
      imageUrl = url;
      break;
    } catch (e) {
      lastStatus = e.message.slice(0, 24);
    }
  }

  if (!buf) {
    console.log('  FAIL  ' + String(lastStatus).padEnd(5) + f.slug + '  (' + candidates.length + ' candidates)');
    failed++;
  } else {
    if (!DRY) {
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(dest, buf);
    }
    credits[f.slug] = { file, source: imageUrl, article: sourcePage, note: 'via Wikimedia Commons' };
    rewrites.push({ slug: f.slug, from: f.portrait, to: '/portraits/' + file });
    ok++;
    console.log('  ok    ' + f.slug.padEnd(18) + (buf.length / 1024).toFixed(0) + 'KB');
  }
  // deliberately unhurried. This is the behaviour that got us throttled.
  await new Promise((s) => setTimeout(s, 400));
}

console.log('\ndownloaded ' + ok + ', failed ' + failed);

if (!DRY && rewrites.length) {
  let src = figuresSrc;
  for (const r of rewrites) {
    // replace only within the block for this slug, so identical URLs shared by
    // two figures do not cross-contaminate
    const at = src.indexOf('slug: "' + r.slug + '"');
    if (at < 0) continue;
    const nextAt = src.indexOf('slug: "', at + 10);
    const end = nextAt < 0 ? src.length : nextAt;
    const block = src.slice(at, end);
    const next = block.replace(/portrait:\s*\n?\s*"[^"]+"/, 'portrait: "' + r.to + '"');
    src = src.slice(0, at) + next + src.slice(end);
  }
  fs.writeFileSync('src/lib/figures.ts', src);
  fs.writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + '\n');
  console.log('rewrote figures.ts to local paths, wrote ' + CREDITS);
} else if (DRY) {
  console.log('dry run, nothing written');
}
