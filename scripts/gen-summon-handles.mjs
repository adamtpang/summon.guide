#!/usr/bin/env node
// Generates one thin "summon handle" skill per guide agent, so any guide can be
// summoned into a Claude Code or Codex chat as /<slug>.
//
//   node --experimental-strip-types scripts/gen-summon-handles.mjs          # write
//   node --experimental-strip-types scripts/gen-summon-handles.mjs --check  # verify parity
//
// A handle is deliberately small. The guide's brain (persona, corpus, citations)
// lives on the summon.guide MCP server; the handle only routes the user's
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
hooks.deregister();

const base = path.join(root, 'packs', 'handles');
const verify = process.argv.includes('--check');
const SITE = 'https://summon.guide';
const INSTALL = 'npx --yes github:adamtpang/summon.guide summon install';

// The house style forbids em and en dashes in any artifact. Registry text may
// carry them, so normalize before emitting and refuse to write if any survive.
const DASHES = /[‒–—―−]/g;
function clean(text) {
  return String(text ?? '')
    .replace(/\s*[‒–—―−]+\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

function kindLabel(guide) {
  return guide.kind === 'person' ? 'guide' : guide.kind === 'channel' ? 'channel' : 'book';
}

function toolFor(guide) {
  const runtime = guide.runtime?.kind;
  if (runtime === 'figure') return 'chat_with_guide';
  if (runtime === 'source') return 'chat_with_book';
  if (runtime === 'pack') return 'pack';
  return 'none';
}

function playbooks(guide) {
  if (!guide.skillSlugs?.length) return 'none registered';
  return guide.skillSlugs.map((s) => `\`/${s}\``).join(', ');
}

function sources(guide) {
  return guide.sourceSlugs?.length ? guide.sourceSlugs.map((s) => `\`${s}\``).join(', ') : 'none registered';
}

function frontmatter(guide, tool) {
  const name = clean(guide.name);
  const byline = clean(guide.byline);
  const domains = (guide.domains ?? []).map(clean).filter(Boolean);
  const topics = domains.length ? domains.join(', ') : 'their documented work';
  const routing =
    tool === 'chat_with_guide'
      ? `Routes every answer through the live summon.guide corpus and never simulates ${name} locally.`
      : tool === 'chat_with_book'
        ? `Answers only from what ${name} actually says, through the live summon.guide corpus, with no invented persona.`
        : tool === 'pack'
          ? `Points to the full ${name} pack, which carries the persona and playbooks.`
          : `${name} is still being onboarded; this handle reports status honestly instead of improvising.`;
  const description = `Summon ${name} into this chat.${byline ? ` ${byline}.` : ''} Use when the user types /${guide.slug}, says "summon ${name}" or "ask ${name}", or wants ${name} on ${topics}. ${routing}`;
  return `---\nname: ${guide.slug}\ndescription: ${description.replace(/\n/g, ' ')}\n---\n`;
}

function bodyForGuide(guide) {
  const name = clean(guide.name);
  return `# /${guide.slug}: summon ${name}

${clean(guide.description)}

## What to do

1. Take the user's question: everything after \`/${guide.slug}\`. If it is empty, ask what they want to bring to ${name}.
2. Call the \`summon-guide\` MCP tool \`chat_with_guide\` with \`slug: "${guide.slug}"\` and \`message\` set to the question in the user's own words, plus any context they attached.
3. Present the reply as ${name}'s answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as ${name} from your own knowledge. If the \`summon-guide\` MCP server is not connected, say so plainly and point the user to ${SITE}/${guide.slug}. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.
`;
}

function bodyForSource(guide) {
  const name = clean(guide.name);
  const label = kindLabel(guide);
  return `# /${guide.slug}: summon ${name}

${clean(guide.description)}

This ${label} answers from its own corpus only: what ${name} actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after \`/${guide.slug}\`. If it is empty, ask what they want to look up in ${name}.
2. Call the \`summon-guide\` MCP tool \`chat_with_book\` with \`slug: "${guide.slug}"\` and \`message\` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what ${name} says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of ${name}. If the \`summon-guide\` MCP server is not connected, say so plainly and point the user to ${SITE}/${guide.slug}. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.
`;
}

function bodyForPack(guide) {
  const name = clean(guide.name);
  return `# /${guide.slug}: summon ${name}

${clean(guide.description)}

${name} ships as a full Summon pack with a persona and playbooks, not as a thin handle. If \`/${guide.slug}\` is already installed as a pack skill in this project, that pack takes precedence and this file is only a pointer.

## What to do

1. If the pack skill is present, follow it. It carries the persona and the frameworks.
2. If only this handle is present, tell the user the full pack is one command away and give it verbatim:

\`\`\`bash
${INSTALL} ${guide.slug}
\`\`\`

3. Do not improvise ${name}'s persona from your own knowledge in the meantime. Point to ${SITE}/${guide.slug} for the live conversation.

## Never

- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.
`;
}

function bodyForPending(guide) {
  const name = clean(guide.name);
  return `# /${guide.slug}: ${name} (still being onboarded)

${clean(guide.description)}

${name} is registered but not yet live. There is no corpus-grounded tool to call, so this handle exists to report status honestly rather than to answer.

## What to do

1. Tell the user plainly that ${name} is still being onboarded and cannot answer yet.
2. Point them to ${SITE}/onboarding for the current gate status, and to ${SITE}/summon to request or follow the guide.
3. Offer \`match_guide\` on the \`summon-guide\` MCP server to find a live guide for the same problem.

## Never

- Never improvise an answer as ${name}. No corpus, no reply.
- Never present any future version as the real person. Summon guides are AI guides grounded in documented public work: no endorsement, no private memories, no real contact.
`;
}

function registryFooter(guide, tool) {
  return `
## Registry

- Agent: \`${guide.id}\`
- Kind: ${guide.kind}
- Tool: ${tool === 'pack' ? 'full pack' : tool === 'none' ? 'none yet' : `\`${tool}\``}
- Sources: ${sources(guide)}
- Playbooks: ${playbooks(guide)}
- Status: ${guide.availability}
- Live at: ${SITE}/${guide.slug}
`;
}

function render(guide) {
  const tool = toolFor(guide);
  const body =
    tool === 'chat_with_guide'
      ? bodyForGuide(guide)
      : tool === 'chat_with_book'
        ? bodyForSource(guide)
        : tool === 'pack'
          ? bodyForPack(guide)
          : bodyForPending(guide);
  const contents = frontmatter(guide, tool) + '\n' + body + registryFooter(guide, tool);
  if (DASHES.test(contents)) {
    DASHES.lastIndex = 0;
    throw new Error(`em or en dash survived normalization in handle for ${guide.slug}`);
  }
  DASHES.lastIndex = 0;
  return { tool, contents };
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
