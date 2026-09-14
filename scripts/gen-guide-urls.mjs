import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { registerHooks } from 'node:module';

// guideAgents.ts uses the @/ alias and imports data JSON, so resolve those the
// same way the other generators do before importing the registries.
const root = process.cwd();
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) specifier = pathToFileURL(path.join(root, 'src', specifier.slice(2) + '.ts')).href;
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.startsWith(pathToFileURL(path.join(root, 'data')).href) && url.endsWith('.json')) {
      return { format: 'module', source: `export default ${fs.readFileSync(new URL(url), 'utf8')}`, shortCircuit: true };
    }
    return next(url, context);
  },
});
const { figures } = await import('../src/lib/figures.ts');
const { books } = await import('../src/lib/books.ts');
const { guideAgents } = await import('../src/lib/guideAgents.ts');
hooks.deregister();

const compact = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const overrides = { elon: 'elonmusk', 'founders-podcast': 'sage' };
const reserved = new Set(['sage', 'summon', 'handoff', 'council', 'connect', 'books', 'skills', 'library', 'onboarding', 'compare', 'watch', 'speak', 'distillations', 'api']);
const seen = new Map();
// Every registered person gets a URL, including people with no conversation
// runtime yet (still onboarding, or shipped as a framework pack); the route
// renders an honest status page for those instead of a 404.
const figureSlugs = new Set(figures.map(f => f.slug));
const registryPeople = guideAgents
  .filter(a => a.kind === 'person' && !figureSlugs.has(a.slug))
  .map(a => ({ slug: a.slug, name: a.name }));
const rows = [...figures.map(f => ({ slug: f.slug, name: f.name })), ...registryPeople, ...books.map(b => ({ slug: b.slug, name: b.slug }))]
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
console.log(`Verified ${rows.length} dashless guide URLs and unique aliases (${registryPeople.length} registry-only people included).`);
