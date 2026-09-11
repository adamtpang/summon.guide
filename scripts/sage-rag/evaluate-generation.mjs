// Paired local-only generation evaluation over frozen retrieval packets.
// Results require evidence review: citation syntax alone is not an answer score.
import fs from 'node:fs';
import path from 'node:path';
import { OUT, localAnswer } from './pilot.mjs';

const label = process.argv[2];
if (!label || !/^[a-z0-9-]+$/.test(label)) throw new Error('Provide a safe model label');
const source = JSON.parse(fs.readFileSync(path.join(OUT, 'evaluation.json'), 'utf8'));
const chosen = new Set(['sony-order', 'sony-walkman', 'dyson-prototypes', 'walton-lease', 'jensen-emails', 'munger-inversion', 'zach-power', 'compare-financing']);
const cases = source.results.filter(r => chosen.has(r.id) || !r.expectedVideoIds.length);
if (cases.length !== 12) throw new Error(`Expected 12 frozen cases, found ${cases.length}; inspect IDs before proceeding.`);
const filename = path.join(OUT, `generation-${label}.json`);
const results = [];
for (const test of cases) {
  const packet = { question: test.question, fingerprint: source.summary.fingerprint, hits: test.evidence.slice(0, 4) };
  const start = Date.now();
  let generated;
  let raw = null;
  try { generated = await localAnswer(packet); }
  catch (error) { generated = { error: error.message, reviewRequired: true }; }
  const rawPath = path.join(OUT, 'latest-generation-raw.json');
  if (fs.existsSync(rawPath)) {
    const candidate = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
    if (candidate.question === test.question) raw = candidate;
  }
  results.push({ id: test.id, question: test.question, expectedVideoIds: test.expectedVideoIds, latencyMs: Date.now() - start, generated, raw, packet });
  fs.writeFileSync(filename, JSON.stringify({ model: label, strategy: process.env.SAGE_GENERATION_STRATEGY || 'baseline', maxTokens: process.env.SAGE_GENERATION_STRATEGY === 'evidence-first' ? 550 : 300, fingerprint: source.summary.fingerprint, evaluation: '12 preselected cases from frozen 30-case provisional set; paired identical top-4 evidence, temperature 0, JSON schema. Agent review required, no automatic accuracy score.', results }, null, 2));
  console.log(JSON.stringify({ model: label, case: test.id, latencyMs: Date.now() - start, abstained: !!generated.abstained, error: generated.error || null }));
}
