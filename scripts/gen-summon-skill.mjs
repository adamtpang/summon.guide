// Export only material already used by public guide chat. Never read private corpora.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { registerHooks } from 'node:module';
const root = path.resolve(import.meta.dirname, '..');
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
const { guideAgents } = await import('../src/lib/guideAgents.ts');
const { figures } = await import('../src/lib/figures.ts');
const { buildGroundingBlock } = await import('../src/lib/figureSources.ts');
hooks.deregister();
const urls = JSON.parse(fs.readFileSync(path.join(root, 'data/guide-urls.json'), 'utf8'));
const base = path.join(root, 'packs/summon');
const verify = process.argv.includes('--check');
function emit(relative, data) {
  const file = path.join(base, relative);
  const contents = JSON.stringify(data, null, 2) + '\n';
  if (verify) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== contents) throw new Error(`Stale summon skill: ${relative}`);
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, contents);
  }
}
const guides = guideAgents.map(guide => {
  const figure = figures.find(item => guide.kind === 'person' && item.slug === guide.slug);
  emit(`guides/${guide.slug}.json`, {
    mode: figure ? 'local-material-available' : 'live-connection-required',
    localPrompt: figure?.systemPrompt || null,
    grounding: figure ? buildGroundingBlock(guide.slug) : null,
    sourceSlugs: guide.sourceSlugs,
    skillSlugs: guide.skillSlugs,
    url: `https://summon.guide/${guide.slug === 'founders-podcast' ? 'sage' : urls.find(row => row.slug === guide.slug)?.publicSlug || guide.slug.replaceAll('-', '')}`,
    sourceLimit: 'Installed public guide prompt and selected synthesis only; no private transcript access. Source IDs alone do not establish full-text coverage.',
  });
  return { slug: guide.slug, name: guide.name, kind: guide.kind, availability: guide.availability };
});
if (new Set(guides.map(guide => guide.slug)).size !== guides.length) throw new Error('Duplicate guide slugs');
emit('registry.json', { snapshot: 'generated from summon.guide public registries; update by reinstalling', guides });
console.log(`${verify ? 'Verified' : 'Generated'} universal summon skill for ${guides.length} guides.`);
