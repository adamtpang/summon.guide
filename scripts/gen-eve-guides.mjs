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
const { figures } = await import('../src/lib/figures.ts');
hooks.deregister();

const base = path.join(root, 'eve-guides');
const skill = fs.readFileSync(path.join(root, '.agents/skills/eve/SKILL.md'), 'utf8');
const eveVersion = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/eve/package.json'), 'utf8')).version;
const manifest = [];
const verify = process.argv.includes('--check');
function emit(relative, contents) {
  const target = path.join(base, relative);
  if (verify) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== contents) throw new Error(`Stale Eve artifact: ${relative}`);
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, contents);
  }
}
for (const guide of guideAgents) {
  const directory = guide.id.replace(':', '-');
  const figure = figures.find(f => guide.kind === 'person' && f.slug === guide.slug);
  const sourceText = figure?.systemPrompt || guide.description;
  const instructions = `# ${guide.name}\n\nSummon agent ID: ${guide.id}\nRegistry status: ${guide.availability}\n\n${sourceText}\n\n## Summon identity and source boundary\nThese rules override conflicting identity instructions above. You are an AI guide inspired by documented public work, never the actual person or author. Do not claim endorsement, private memories, or real contact. Distinguish source evidence from your interpretation. Never invent citations. Reference-only links and source IDs do not prove that full text is available. If the source needed to answer is absent, say so.\n\nSource registry IDs: ${guide.sourceSlugs.join(', ') || 'none registered'}\nSpecialist skill IDs: ${guide.skillSlugs.join(', ') || 'none registered'}\n\n## Assignments\nKeep every user's project context and session isolated. Do not claim cross-project memory unless the runtime supplied authorized memory. Never send messages as a user or publish their private information.\n\n## Runtime readiness\nThis is an authored Eve package, not a launched service. The Eve runtime adapter, entitlement check, session authorization, and source retrieval must be verified before enabling it. Building agents stay disabled until onboarding evidence passes. The Eve skill is engineering guidance, not a method attributed to this guide.\n`;
  emit(`${directory}/package.json`, JSON.stringify({ name: `summon-${directory}`, private: true, type: 'module', dependencies: { eve: eveVersion }, scripts: { build: 'eve build --skip-sandbox-prewarm' } }, null, 2) + '\n');
  emit(`${directory}/agent/instructions.md`, instructions);
  emit(`${directory}/agent/skills/eve/SKILL.md`, skill);
  emit(`${directory}/agent/agent.ts`, `import { defineAgent, defineDynamic } from 'eve';\n\nexport default defineAgent({\n  defaultTools: false,\n  model: defineDynamic({\n    events: {\n      'session.started': () => {\n        throw new Error(${JSON.stringify(`Eve runtime not enabled for ${guide.id}: verify source grounding, auth, entitlement and approved model routing before activation.`)});\n      },\n    },\n  }),\n});\n`);
  manifest.push({ id: guide.id, name: guide.name, availability: guide.availability, directory, framework: 'eve', runtimeEnabled: false, sourceSlugs: guide.sourceSlugs, skillSlugs: guide.skillSlugs });
}
emit('manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`${verify ? 'Verified' : 'Generated'} ${manifest.length} independent Eve agent packages; runtime activation remains gated.`);
