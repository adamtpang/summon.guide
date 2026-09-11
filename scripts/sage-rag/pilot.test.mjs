import test from 'node:test';
import assert from 'node:assert/strict';
import { chunk, alignTimestamp, validateCitations, localAnswer, load, search } from './pilot.mjs';

test('chunking preserves an unfinished caption tail and bounds long run-on captions', () => {
  const text = 'This is a complete sentence. '.repeat(12) + 'The important ending has no punctuation';
  assert.ok(chunk(text).at(-1).endsWith('The important ending has no punctuation'));
  const long = chunk('captions without sentence punctuation '.repeat(180));
  assert.ok(long.length > 1);
  assert.ok(long.every(c => c.length <= 1800));
});

test('timestamps require an exact unambiguous caption anchor', () => {
  const words = 'one two three four five six seven eight nine ten'.split(' ');
  assert.equal(alignTimestamp(words.join(' '), { words, seconds: words.map(() => 42) }), 42);
  assert.equal(alignTimestamp('entirely unrelated text with several words none of which match', { words, seconds: words.map(() => 42) }), null);
  assert.equal(alignTimestamp(words.join(' '), { words: [...words, ...words], seconds: [...words, ...words].map(() => 42) }), null);
});

test('invented citation IDs are rejected', () => {
  const packet = { hits: [{ evidenceId: 'E1' }] };
  assert.equal(validateCitations('Claim [E1]', packet).valid, true);
  assert.equal(validateCitations('Claim [E99]', packet).valid, false);
  assert.equal(validateCitations('No evidence references', packet).valid, false);
});

test('private generation rejects non-loopback destinations before sending anything', async () => {
  await assert.rejects(localAnswer({ hits: [] }, 'https://example.com/v1/chat/completions'), /loopback/);
});

test('excluding a source removes both hits and neighboring passages', async () => {
  const store = load();
  const packet = await search(store, 'Zach Dell Base Power fifty years', { excludedSources: ['david-senra-conversations'] });
  assert.ok(packet.hits.length > 0);
  for (const hit of packet.hits) {
    assert.equal(hit.source, 'founders-podcast');
    assert.ok(hit.neighbors.every(n => n.id.startsWith('founders-podcast:')));
  }
  const empty = await search(store, 'founder focus', { excludedSources: ['founders-podcast', 'david-senra-conversations'] });
  assert.equal(empty.hits.length, 0);
});
