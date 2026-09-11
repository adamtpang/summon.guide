import fs from 'node:fs';
import path from 'node:path';
import { load, search, OUT, normalize, validateCitations } from './pilot.mjs';
import { getSourceCorpus } from '../../src/lib/sourceCorpus.ts';
import { retrieveSourceEpisodes } from '../../src/lib/sourceRetrieval.ts';

const fixtures = JSON.parse(fs.readFileSync(new URL('./questions.json', import.meta.url), 'utf8'));
const store = load(); const syntheses = getSourceCorpus('founders-podcast').episodes;
const results = [];
const video = url => String(url || '').match(/[?&]v=([^&]+)/)?.[1];
for (const test of fixtures.cases) {
  const packet = await search(store, test.question);
  const baseline = retrieveSourceEpisodes(syntheses, test.question, 8);
  const actualIds = packet.hits.map(h => video(h.url));
  const baselineIds = baseline.map(h => video(h.episode.youtube));
  const rank = actualIds.findIndex(id => test.expectedVideoIds.includes(id)) + 1;
  const baselineRank = baselineIds.findIndex(id => test.expectedVideoIds.includes(id)) + 1;
  const details = test.detailAnchor ? {
    anchor: test.detailAnchor,
    inRetrievedTranscript: packet.hits.some(h => test.expectedVideoIds.includes(video(h.url)) && normalize(h.text + ' ' + h.neighbors.map(n => n.text).join(' ')).includes(test.detailAnchor)),
    inRetrievedSynthesis: baseline.some(h => test.expectedVideoIds.includes(video(h.episode.youtube)) && normalize(h.episode.principle + ' ' + h.episode.keyLessons.join(' ')).includes(test.detailAnchor)),
  } : null;
  results.push({ ...test, rank: rank || null, synthesisRank: baselineRank || null, details, latencyMs: packet.latencyMs, evidence: packet.hits, synthesisSources: baseline.map(h => ({ title: h.episode.title, url: h.episode.youtube })) });
  console.log(`${test.id}: transcript=${rank || '-'} synthesis=${baselineRank || '-'}${!test.expectedVideoIds.length ? ' (requires abstention review)' : ''}`);
}
const supported = results.filter(r => r.expectedVideoIds.length);
const summary = { fixtureStatus: fixtures.status, fingerprint: store.fingerprint, queries: results.length, positiveHypotheses: supported.length, transcriptHitAt8: supported.filter(r => r.rank).length, synthesisHitAt8: supported.filter(r => r.synthesisRank).length, transcriptMRR: supported.reduce((s, r) => s + (r.rank ? 1 / r.rank : 0), 0) / supported.length, synthesisMRR: supported.reduce((s, r) => s + (r.synthesisRank ? 1 / r.synthesisRank : 0), 0) / supported.length, generatedAnswerQuality: 'Not measured in this retrieval benchmark; local generation smoke test is separate.', unsupportedQuestions: 'Retrieval candidates are not answers; abstention requires generation and human review.', citationUnitChecks: [validateCitations('Claim [E1]', { hits: [{ evidenceId: 'E1' }] }).valid, !validateCitations('Claim [E99]', { hits: [{ evidenceId: 'E1' }] }).valid] };
fs.writeFileSync(path.join(OUT, 'evaluation.json'), JSON.stringify({ summary, results }, null, 2));
fs.writeFileSync(path.join(OUT, 'evaluation-summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
