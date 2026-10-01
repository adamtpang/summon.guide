#!/usr/bin/env node
// Generates one thin "summon handle" skill per guide agent, so any guide can be
// summoned into a Claude Code or Codex chat as /<slug>.
//
//   node --experimental-strip-types scripts/gen-summon-handles.mjs          # write
//   node --experimental-strip-types scripts/gen-summon-handles.mjs --check  # verify parity
//
// A handle is deliberately small. The guide's brain (persona, corpus, citations)
// lives in the public retrieval API; the handle only routes the user's
// question to the right tool with the identity boundary attached. That keeps
// one source of truth for 111 guides instead of 111 drifting local personas.
//
// Output: packs/handles/<slug>/SKILL.md and packs/handles/index.json, which
// scripts/summon.mjs reads to install handles into a project.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { registerHooks } from 'node:module';

const root = process.cwd();
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) specifier = pathToFileURL(path.join(root, 'src', specifier.slice(2) + '.ts')).href;
    try { return next(specifier, context); }
    catch (error) {
      if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) return next(specifier + '.ts', context);
      throw error;
    }
  },
  load(url, context, next) {
    if (url.startsWith(pathToFileURL(path.join(root, 'data')).href) && url.endsWith('.json')) {
      return { format: 'module', source: `export default ${fs.readFileSync(new URL(url), 'utf8')}`, shortCircuit: true };
    }
    return next(url, context);
  },
});
const { guideAgents } = await import('../src/lib/guideAgents.ts');
hooks.deregister();

const base = path.join(root, 'packs', 'handles');
const verify = process.argv.includes('--check');

// The house style forbids em and en dashes in any artifact. Registry text may
// carry them, so normalize before emitting and refuse to write if any survive.
function clean(text) {
  return String(text ?? '')
    .replace(/\s*[‒–—―−]+\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

function render(guide) {
  const tool = guide.capabilities.includes('chat') ? 'public_notes' : 'none';
  const workflow = path.join(root, 'packs', 'guide-workflows', `${guide.kind}-${guide.slug}`, 'SKILL.md');
  if (!fs.existsSync(workflow)) throw new Error(`Generate guide standards first: ${workflow}`);
  const body = fs.readFileSync(workflow, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
  const description = clean(`Use ${guide.name}'s documented source notes when the user asks to summon ${guide.name} or uses /${guide.slug}. Fetch public retrieval without login or MCP; keep personal context in this chat.`);
  const contents = `---\nname: ${guide.slug}\ndescription: ${JSON.stringify(description)}\n---\n\n${body}\n`;
  return {tool, contents};
}

// Uniqueness matters: handles install to .claude/skills/<slug>, so two guides
// sharing a slug would silently overwrite each other.
const seen = new Map();
for (const guide of guideAgents) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(guide.slug)) throw new Error(`slug is not skill-safe: ${guide.slug}`);
  if (seen.has(guide.slug)) throw new Error(`duplicate slug across kinds: ${guide.slug} (${seen.get(guide.slug)} and ${guide.id})`);
  seen.set(guide.slug, guide.id);
}

const order = { person: 0, channel: 1, book: 2 };
const sorted = [...guideAgents].sort((a, b) => order[a.kind] - order[b.kind] || a.slug.localeCompare(b.slug));

let written = 0;
let stale = [];
const index = [];
function emit(relative, contents) {
  const target = path.join(base, relative);
  if (verify) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) stale.push(relative);
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, contents);
    written += 1;
  }
}

for (const guide of sorted) {
  const { tool, contents } = render(guide);
  emit(`${guide.slug}/SKILL.md`, contents);
  index.push({
    slug: guide.slug,
    kind: guide.kind,
    name: clean(guide.name),
    availability: guide.availability,
    runtime: guide.runtime?.kind ?? 'pending',
    tool,
  });
}
emit('index.json', `${JSON.stringify({ generated: 'scripts/gen-summon-handles.mjs', count: index.length, handles: index }, null, 2)}\n`);

// Report directories that no longer correspond to a registered guide, so a
// renamed slug cannot leave a zombie handle behind.
const known = new Set(index.map((h) => h.slug));
const extras = fs.existsSync(base)
  ? fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory() && !known.has(d.name)).map((d) => d.name)
  : [];

const counts = index.reduce((acc, h) => ((acc[h.tool] = (acc[h.tool] ?? 0) + 1), acc), {});
const byKind = index.reduce((acc, h) => ((acc[h.kind] = (acc[h.kind] ?? 0) + 1), acc), {});
if (verify) {
  if (stale.length || extras.length) {
    for (const s of stale) console.error(`stale handle: ${s}`);
    for (const e of extras) console.error(`unregistered handle directory: ${e}`);
    process.exit(1);
  }
  console.log(`handles verified: ${index.length} (${JSON.stringify(byKind)}), tools ${JSON.stringify(counts)}`);
} else {
  console.log(`wrote ${written} files under packs/handles for ${index.length} guides (${JSON.stringify(byKind)}), tools ${JSON.stringify(counts)}`);
  if (extras.length) console.warn(`unregistered handle directories left in place: ${extras.join(', ')}`);
}
