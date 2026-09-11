import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_MODEL, getModel, generateAnswer } from './models.mjs';
const packet = { question: 'What helps?', hits: [{ evidenceId: 'E1', title: 'Test source', citationUrl: 'https://example.com', text: 'Focus helps.', neighbors: [] }] };
test('Luna is default and model selection is allowlisted', () => {
  assert.equal(getModel(DEFAULT_MODEL).model, 'openai/gpt-5.6-luna');
  assert.throws(() => getModel('https://attacker.example'));
});
test('hosted request pins selected model and reports actual model with citations', async () => {
  const result = await generateAnswer(packet, { apiKey: 'test', fetchImpl: async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    const body = JSON.parse(options.body);
    assert.equal(body.model, 'openai/gpt-5.6-luna');
    assert.equal(body.provider.data_collection, 'deny');
    assert.equal(body.provider.allow_fallbacks, false);
    return Response.json({ model: 'openai/gpt-5.6-luna', choices: [{ message: { content: JSON.stringify({ supported: true, answer: 'Focus helps. [E1]', evidence_ids: ['E1'] }) } }] });
  } });
  assert.equal(result.answer, 'Focus helps. [E1]');
  assert.equal(result.model, 'openai/gpt-5.6-luna');
});
test('unknown references are rejected; upstream failure does not silently change model', async () => {
  await assert.rejects(generateAnswer(packet, { apiKey: 'test', fetchImpl: async () => Response.json({ choices: [{ message: { content: JSON.stringify({ supported: true, answer: 'Focus [E99]', evidence_ids: ['E99'] }) } }] }) }), /unknown source/);
  await assert.rejects(generateAnswer(packet, { apiKey: 'test', fetchImpl: async () => new Response('', { status: 503 }) }), /unavailable/);
});

function modelResponse(result) {
  return { apiKey: 'test', fetchImpl: async () => Response.json({ model: 'test-model', choices: [{ message: { content: JSON.stringify(result) } }] }) };
}

for (const evidenceIds of [['NOT_A_SOURCE'], ['E1', 'NOT_A_SOURCE'], [1], [null], [false], [{}], [['E1']]]) {
  test(`rejects declared IDs outside the packet string allowlist: ${JSON.stringify(evidenceIds)}`, async () => {
    await assert.rejects(generateAnswer(packet, modelResponse({ supported: true, answer: 'Focus helps. [E1]', evidence_ids: evidenceIds })), /unknown source/);
  });
}

test('valid declared sources are appended once when missing inline', async () => {
  const result = await generateAnswer(packet, modelResponse({ supported: true, answer: 'Focus helps.', evidence_ids: ['E1', 'E1'] }));
  assert.equal(result.answer, 'Focus helps. [E1]');
  assert.equal(result.citations.valid, true);
  assert.deepEqual(result.citations.cited, ['E1']);
  assert.deepEqual(result.citations.unknown, []);
  assert.equal(result.reviewRequired, true);
});

test('unsupported response retains the standard abstention', async () => {
  const result = await generateAnswer(packet, modelResponse({ supported: false, answer: 'Insufficient evidence.', evidence_ids: [] }));
  assert.equal(result.answer, 'I don\u2019t have enough evidence in these passages to answer that reliably.');
  assert.equal(result.abstained, true);
  assert.equal(result.model, 'test-model');
  assert.equal(result.reviewRequired, true);
  assert.equal(result.citations, undefined);
});
