import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMatches, researchedGuideInput } from '../src/lib/summonMatch.ts';
import { callSummon } from '../packs/summon-guide/scripts/client.mjs';

const catalog = [{ id: 'person:one', name: 'One', domains: [], description: '', sourceCount: 2 }, { id: 'person:two', name: 'Two', domains: [], description: '', sourceCount: 0 }];
const match = (id, problem = 40) => ({ id, dimensions: { problem, constraints: 20, approach: 10, evidence: 10 }, reason: 'Relevant experience', limitation: 'Different era', role: 'Execution' });
test('scores are summed, scoped to roster, deduplicated and corrected for no corpus', () => {
  const result = validateMatches({ matches: [match('invented'), match('person:one'), match('person:one'), match('person:two')] }, catalog, 3);
  assert.deepEqual(result.matches.map(m => [m.id, m.compatibility]), [['person:one', 80], ['person:two', 70]]);
  assert.equal(result.matches[1].dimensions.evidence, 0);
  assert.equal(result.status, 'matched');
});
test('weak evidence does not force a guide and unknown ids cannot win', () => {
  const result = validateMatches({ matches: [match('person:one', 5), match('invented')] }, catalog, 1);
  assert.equal(result.status, 'research_required'); assert.deepEqual(result.selectedIds, []);
  assert.throws(() => validateMatches({ matches: [match('person:one', 100)] }, catalog, 1));
});
test('malformed routing fails instead of silently picking a guide', () => {
  assert.throws(() => validateMatches({ matches: 'garbage' }, catalog, 3));
  assert.throws(() => validateMatches({ matches: [match('invented')] }, catalog, 3));
});
test('research requires two HTTPS source hosts and bounded original notes', () => {
  const note = { title: 'Source', url: 'https://example.org/a', summary: 'Original source summary with grounded relevant claims and limitations. '.repeat(2) };
  const input = { name: 'Research guide', context: 'A sufficiently detailed synthetic question', fit: 'Relevant documented experience', sources: [note, { ...note, url: 'https://example.net/b' }] };
  assert.equal(researchedGuideInput.safeParse(input).success, true);
  assert.equal(researchedGuideInput.safeParse({ ...input, sources: [note, { ...note, url: 'https://www.example.org/b' }] }).success, false);
  assert.equal(researchedGuideInput.safeParse({ ...input, sources: [note, { ...note, url: 'http://example.net' }] }).success, false);
});
test('helper sends private context in POST body only and refuses missing auth', async () => {
  await assert.rejects(callSummon({ action: 'match', input: {} }, { token: '' }), /Connect Summon/);
  const result = await callSummon({ action: 'match', input: { context: 'Synthetic private brief' } }, { token: 'test', fetcher: async (url, options) => {
    assert.equal(url, 'https://summon.guide/api/summon/match'); assert.equal(options.method, 'POST'); assert.match(options.body, /Synthetic private brief/); assert.equal(options.redirect, 'error');
    return Response.json({ status: 'research_required' });
  } });
  assert.equal(result.status, 'research_required');
});
test('helper decodes split Unicode SSE and rejects incomplete or failed answers', async () => {
  const bytes = new TextEncoder().encode('data: {"text":"Café"}\r\n\r\ndata: [DONE]');
  const envelope = { action: 'guide', input: { slug: 'one', message: 'Synthetic question' } };
  const fetcher = async () => new Response(new ReadableStream({ start(controller) { for (const byte of bytes) controller.enqueue(new Uint8Array([byte])); controller.close(); } }));
  assert.equal((await callSummon(envelope, { token: 'test', fetcher })).advice, 'Café');
  for (const body of ['data: {"text":"unfinished"}\n', 'data: {"error":"fail"}\n', 'data: [DONE]\n']) await assert.rejects(callSummon(envelope, { token: 'test', fetcher: async () => new Response(body) }));
  await assert.rejects(callSummon(envelope, { token: 'test', fetcher: async () => new Response('{}', { status: 401 }) }), /HTTP 401/);
});
