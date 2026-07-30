#!/usr/bin/env node
// Stage 3 of the book-to-skills pipeline: register a set of skills everywhere the
// repo tracks them, from a plan file.
//
//   node scripts/scaffold-skills.mjs plan.json --dry
//   node scripts/scaffold-skills.mjs plan.json
//
// A new skill has to appear in four places or it is invisible somewhere: the
// plugin directory Claude Code reads, skills.ts which the website renders,
// books.ts so the source book links to it, and marketplace.json if the plugin is
// new. Doing that by hand is where entries get missed, so this does all four and
// refuses to write anything if the plan does not line up with existing data.
//
// plan.json shape:
// {
//   "figureSlug": "hormozi",
//   "bookSlug": "100m-offers",
//   "skills": [
//     { "slug": "grand-slam-offer", "title": "The Grand Slam Offer",
//       "tagline": "...", "whenToUse": "...", "sourceAnchor": "Section III",
//       "themes": ["selling","money"], "problemHint": "...",
//       "corePrinciple": "...", "framework": ["step 1","step 2"],
//       "antiPatterns": ["..."], "outputShape": "...", "closingQuote": "..." }
//   ]
// }

import fs from 'fs';
import path from 'path';

const planPath = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!planPath || !fs.existsSync(planPath)) {
  console.error('usage: node scripts/scaffold-skills.mjs <plan.json> [--dry]');
  process.exit(1);
}
const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const { figureSlug, bookSlug, skills: planned } = plan;

const fail = (m) => { console.error('REFUSING: ' + m); process.exit(1); };
if (!figureSlug || !bookSlug || !Array.isArray(planned) || !planned.length) {
  fail('plan needs figureSlug, bookSlug, and a non-empty skills array');
}

// ── preflight: the plan must match reality before anything is written ─────────
const figuresSrc = fs.readFileSync('src/lib/figures.ts', 'utf8');
const booksSrc = fs.readFileSync('src/lib/books.ts', 'utf8');
const skillsSrc = fs.readFileSync('src/lib/skills.ts', 'utf8');

if (!new RegExp('slug:\\s*"' + figureSlug + '"').test(figuresSrc)) {
  fail('figure "' + figureSlug + '" is not in figures.ts. Onboard the guide first.');
}
if (!new RegExp('slug:\\s*"' + bookSlug + '"').test(booksSrc)) {
  fail('book "' + bookSlug + '" is not in books.ts. Add the book entry first.');
}
for (const s of planned) {
  if (!s.slug || !s.title || !s.tagline || !s.whenToUse) {
    fail('skill "' + (s.slug || '?') + '" needs slug, title, tagline, whenToUse');
  }
  if (/—|–/.test(JSON.stringify(s))) {
    fail('skill "' + s.slug + '" contains an em or en dash. The repo forbids them.');
  }
  const dir = path.join('plugins', figureSlug, 'skills', s.slug);
  if (fs.existsSync(path.join(dir, 'SKILL.md'))) {
    fail('SKILL.md already exists at ' + dir + '. Delete it or rename the skill.');
  }
  if (new RegExp('slug:\\s*"' + s.slug + '"[\\s\\S]{0,200}?figureSlug:\\s*"' + figureSlug + '"').test(skillsSrc)) {
    fail('skills.ts already has ' + figureSlug + ':' + s.slug);
  }
}

const J = (v) => JSON.stringify(v);
const writes = [];

// ── 1. SKILL.md per skill ────────────────────────────────────────────────────
function skillMd(s, book) {
  const L = [];
  L.push('---');
  L.push('name: ' + s.slug);
  L.push('description: ' + s.tagline.replace(/\n/g, ' ') + ' Use when: ' + s.whenToUse.replace(/\n/g, ' '));
  L.push('---');
  L.push('');
  L.push('# ' + s.title);
  L.push('');
  L.push('Derived from *' + book.title + '* by ' + book.author + (s.sourceAnchor ? ' (' + s.sourceAnchor + ')' : '') + '.');
  L.push('');
  L.push('## Core Principle');
  L.push('');
  L.push(s.corePrinciple || s.tagline);
  L.push('');
  if (Array.isArray(s.framework) && s.framework.length) {
    L.push('## Framework');
    L.push('');
    s.framework.forEach((step, i) => {
      L.push('### Step ' + (i + 1) + ': ' + (step.title || step));
      L.push('');
      if (step.body) { L.push(step.body); L.push(''); }
    });
  }
  if (Array.isArray(s.antiPatterns) && s.antiPatterns.length) {
    L.push('## Anti-patterns');
    L.push('');
    s.antiPatterns.forEach((a) => L.push('- ' + a));
    L.push('');
  }
  if (s.outputShape) {
    L.push('## Output shape');
    L.push('');
    L.push(s.outputShape);
    L.push('');
  }
  if (s.closingQuote) {
    L.push('---');
    L.push('');
    L.push('*"' + s.closingQuote + '"* ' + book.author + '.');
    L.push('');
  }
  return L.join('\n');
}

// pull the book's title and author out of books.ts for attribution
const bookBlock = booksSrc.slice(booksSrc.indexOf('slug: "' + bookSlug + '"'));
const bookTitle = (/title:\s*"([^"]+)"/.exec(bookBlock) || [])[1] || bookSlug;
const bookAuthor = (/author:\s*"([^"]+)"/.exec(bookBlock) || [])[1] || 'the author';
const book = { title: bookTitle, author: bookAuthor };

for (const s of planned) {
  const dir = path.join('plugins', figureSlug, 'skills', s.slug);
  writes.push({ file: path.join(dir, 'SKILL.md'), content: skillMd(s, book) });
}

// ── 2. skills.ts entries ─────────────────────────────────────────────────────
const entries = planned
  .map((s) => {
    const L = ['  {'];
    L.push('    slug: ' + J(s.slug) + ',');
    L.push('    figureSlug: ' + J(figureSlug) + ',');
    L.push('    title: ' + J(s.title) + ',');
    L.push('    tagline:\n      ' + J(s.tagline) + ',');
    L.push('    whenToUse:\n      ' + J(s.whenToUse) + ',');
    L.push('    source: ' + J(bookTitle + ' by ' + bookAuthor) + ',');
    if (s.sourceAnchor) L.push('    sourceAnchor: ' + J(s.sourceAnchor) + ',');
    L.push('    command: ' + J('/' + figureSlug + ':' + s.slug) + ',');
    if (s.themes) L.push('    themes: ' + J(s.themes) + ',');
    if (s.problemHint) L.push('    problemHint:\n      ' + J(s.problemHint) + ',');
    L.push('  },');
    return L.join('\n');
  })
  .join('\n');

const marker = '\n];';
const closeIdx = skillsSrc.indexOf(marker, skillsSrc.indexOf('export const skills: Skill[] = ['));
if (closeIdx < 0) fail('could not find the end of the skills array in skills.ts');
const newSkillsSrc =
  skillsSrc.slice(0, closeIdx) +
  '\n\n  // ' + bookTitle + '\n' + entries +
  skillsSrc.slice(closeIdx);
writes.push({ file: 'src/lib/skills.ts', content: newSkillsSrc });

// ── 3. books.ts: attach the new skill slugs and bump status ──────────────────
{
  const at = booksSrc.indexOf('slug: "' + bookSlug + '"');
  const objEnd = booksSrc.indexOf('\n  },', at);
  const block = booksSrc.slice(at, objEnd);
  const slugsJson = J(planned.map((s) => s.slug)).replace(/","/g, '", "');
  let nextBlock;
  if (/skillSlugs:\s*\[/.test(block)) {
    nextBlock = block.replace(/skillSlugs:\s*\[[^\]]*\]/, 'skillSlugs: ' + slugsJson);
  } else {
    nextBlock = block.replace(/(command:[^\n]*\n|amazonUrl:[^\n]*\n)/, '$1    skillSlugs: ' + slugsJson + ',\n');
    if (nextBlock === block) nextBlock = block + '\n    skillSlugs: ' + slugsJson + ',';
  }
  nextBlock = /status:\s*"[^"]*"/.test(nextBlock)
    ? nextBlock.replace(/status:\s*"[^"]*"/, 'status: "partial"')
    : nextBlock + '\n    status: "partial",';
  writes.push({ file: 'src/lib/books.ts', content: booksSrc.slice(0, at) + nextBlock + booksSrc.slice(objEnd) });
}

// ── 4. marketplace.json if the plugin is new ─────────────────────────────────
const mkPath = '.claude-plugin/marketplace.json';
if (fs.existsSync(mkPath)) {
  const mk = JSON.parse(fs.readFileSync(mkPath, 'utf8'));
  const list = mk.plugins || [];
  if (!list.some((p) => p.name === figureSlug)) {
    list.push({
      name: figureSlug,
      source: './plugins/' + figureSlug,
      description: 'Frameworks from ' + bookTitle + ' by ' + bookAuthor + '.',
    });
    mk.plugins = list;
    writes.push({ file: mkPath, content: JSON.stringify(mk, null, 2) + '\n' });
  }
}

// ── apply ────────────────────────────────────────────────────────────────────
console.log((DRY ? '[DRY RUN] ' : '') + 'plan: ' + figureSlug + ' / ' + bookSlug + ' / ' + planned.length + ' skills');
for (const w of writes) {
  console.log('  ' + (DRY ? 'would write' : 'wrote') + '  ' + w.file.replace(/\\/g, '/'));
  if (!DRY) {
    fs.mkdirSync(path.dirname(w.file), { recursive: true });
    fs.writeFileSync(w.file, w.content);
  }
}
console.log('');
console.log(planned.map((s) => '  /' + figureSlug + ':' + s.slug).join('\n'));
if (DRY) console.log('\nnothing written. Re-run without --dry to apply.');
else console.log('\nNow run: npx tsc --noEmit && npm run build');
