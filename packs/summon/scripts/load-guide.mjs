import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function normalize(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function resolveGuide(input, guides) {
  const query = normalize(input);
  if (!query) return { status: 'missing', candidates: [] };
  const matches = guides.flatMap(guide => {
    const names = [guide.slug, guide.name, ...(guide.aliases || [])];
    const aliases = [...names.map(normalize), ...names.map(name => normalize(name).replaceAll(" ", ""))];
    const matched = aliases.filter(alias => alias && (query === alias || query.startsWith(alias + ' ')));
    return matched.length ? [{ guide, length: Math.max(...matched.map(alias => alias.length)) }] : [];
  });
  const longest = Math.max(0, ...matches.map(match => match.length));
  let best = matches.filter(match => match.length === longest);
  // A person's name can also be a biography title. A named summon defaults
  // to the person; an exact book slug still resolves to that book.
  const exact = best.filter(match => normalize(match.guide.slug) === query || normalize(match.guide.slug).replaceAll(' ', '') === query.replaceAll(' ', ''));
  if (exact.length === 1) best = exact;
  else if (best.filter(match => match.guide.kind === 'person').length === 1) best = best.filter(match => match.guide.kind === 'person');
  if (best.length === 1) return { status: 'found', guide: best[0].guide, request: input };
  const candidates = (best.length ? best.map(match => match.guide) : guides.filter(guide =>
    [guide.slug, guide.name, ...(guide.aliases || [])].some(alias => normalize(alias).includes(query))
  )).slice(0, 8).map(({ slug, name, availability }) => ({ slug, name, availability }));
  return { status: candidates.length ? 'ambiguous' : 'not-found', candidates };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const registry = JSON.parse(readFileSync(new URL('../registry.json', import.meta.url), 'utf8'));
  const local = process.argv.includes('--local');
  const args = process.argv.slice(2).filter(arg => arg !== '--local');
  if (args[0] === '--list') {
    console.log(JSON.stringify(registry.guides, null, 2));
  } else {
    const result = resolveGuide(args.join(' '), registry.guides);
    if (result.status === 'found') {
      const slug = result.guide.slug;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid registry slug');
      const material = JSON.parse(readFileSync(new URL(`../guides/${slug}.json`, import.meta.url), 'utf8'));
      const { localPrompt, grounding, ...metadata } = material;
      console.log(JSON.stringify({ ...result, ...metadata, mode: local ? material.mode : "production-handoff", handoffUrl: "https://summon.guide/handoff", ...(local ? { localPrompt, grounding } : {}), snapshot: registry.snapshot }, null, 2));
    } else {
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = 2;
    }
  }
}
