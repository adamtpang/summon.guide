// Opt-in real provider probe with synthetic contexts; no database mutations.
import { figures } from '../src/lib/figures.ts';
import { getGuideEpisodes } from '../src/lib/guideRetrieval.ts';
import { completeOpenRouter } from '../src/lib/openrouter.ts';
import { extractJsonObject } from '../src/lib/jsonExtract.ts';
import { matchPrompt, validateMatches } from '../src/lib/summonMatch.ts';
if (!process.argv.includes('--live')) throw new Error('Pass --live to run two real provider requests.');
const catalog = figures.map(f => ({ id: 'person:' + f.slug, name: f.name, domains: f.domains, description: f.knownFor, sourceCount: getGuideEpisodes(f.slug).length }));
for (const [name, context] of [
  ['startup', 'I am building my first software company. I have no users and keep polishing the product instead of talking to customers. I need a practical way to find the first ten users without paid advertising.'],
  ['gap', 'I need a specialist in deciphering Linear B inscriptions to critique my epigraphic methodology and proposed phonetic readings. General business or life advice is not relevant.'],
]) {
  const response = await completeOpenRouter({ system: matchPrompt(catalog), messages: [{ role: 'user', content: context }], maxTokens: 1600, temperature: 0.1 });
  const result = validateMatches(JSON.parse(extractJsonObject(response.text)), catalog, 3);
  console.log(JSON.stringify({ case: name, status: result.status, matches: result.matches.map(m => ({ name: m.name, score: m.compatibility })), model: response.meta.model }));
  if (name === 'gap' && result.status !== 'research_required') throw new Error('Forced match on specialist gap');
  if (name === 'startup' && result.status !== 'matched') throw new Error('Failed obvious roster fit');
}
