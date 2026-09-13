import assert from 'node:assert/strict';
import test from 'node:test';
import { figures } from '../src/lib/figures.ts';
import { buildGuideGrounding, getGuideEpisodes } from '../src/lib/guideRetrieval.ts';

test('all guides have bounded, attributable grounding without raw file access', () => {
  for (const guide of figures) {
    const episodes = getGuideEpisodes(guide.slug);
    assert.equal(new Set(episodes.map(e => e.file)).size, episodes.length);
    assert.ok(episodes.every(e => !e.file.includes('/_raw/')));
    const prompt = buildGuideGrounding(guide.slug, 'How should I hire and allocate capital?');
    assert.ok(prompt.length <= 24000, guide.slug);
    if (!episodes.length) assert.match(prompt, /No retrievable corpus/);
    for (const match of prompt.matchAll(/Cite as: \[Source: "([^"]+)"\]/g)) assert.ok(episodes.some(e => e.title.replace(/["\r\n]/g, ' ') === match[1]));
  }
});

test('an exact episode question changes selection instead of fixed first notes', () => {
  const guide = figures.find(g => getGuideEpisodes(g.slug).length > 20);
  assert.ok(guide);
  const episodes = getGuideEpisodes(guide.slug);
  const target = episodes.at(-1);
  const prompt = buildGuideGrounding(guide.slug, target.title);
  assert.ok(prompt.includes(target.title.replace(/["\r\n]/g, ' ')));
  assert.notEqual(prompt, buildGuideGrounding(guide.slug, episodes[0].title));
});
