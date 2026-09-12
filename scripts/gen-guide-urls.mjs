import fs from 'node:fs';
import { figures } from '../src/lib/figures.ts';
import { books } from '../src/lib/books.ts';
const compact = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const overrides = { elon: 'elonmusk', 'founders-podcast': 'sage' };
const reserved = new Set(['sage', 'summon', 'handoff', 'council', 'connect', 'books', 'skills', 'library', 'onboarding', 'compare', 'watch', 'speak', 'distillations', 'api']);
const seen = new Map();
const rows = [...figures.map(f => ({ slug: f.slug, name: f.name })), ...books.map(b => ({ slug: b.slug, name: b.slug }))]
  .filter(r => r.slug !== 'founders-podcast')
  .map(r => {
    const publicSlug = overrides[r.slug] || compact(r.slug);
    if (reserved.has(publicSlug) && publicSlug !== r.slug) throw new Error(`Reserved URL ${publicSlug}`);
    const aliases = [...new Set([r.slug, compact(r.slug), compact(r.name), publicSlug])].filter(a => a === publicSlug || !reserved.has(a));
    for (const alias of aliases) {
      if (seen.has(alias) && seen.get(alias) !== r.slug) throw new Error(`Alias collision: ${alias}`);
      seen.set(alias, r.slug);
    }
    return { slug: r.slug, publicSlug, aliases };
  });
const file = new URL('../data/guide-urls.json', import.meta.url);
const contents = JSON.stringify(rows, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(file, 'utf8') !== contents) throw new Error('Guide URLs need regeneration');
} else fs.writeFileSync(file, contents);
console.log(`Verified ${rows.length} dashless guide URLs and unique aliases.`);
