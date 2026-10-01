import assert from 'node:assert/strict';
import { getGuideEpisodes, buildGuideGrounding } from '../src/lib/guideRetrieval.ts';
import { figures } from '../src/lib/figures.ts';
import { GUIDE_STARTERS } from '../src/lib/guidePrompts.ts';
for (const slug of ['gottmans', 'buffettmunger']) {
  assert.equal(figures.find(f => f.slug === slug)?.members?.length, 2);
  assert.equal(new Set(GUIDE_STARTERS[slug]).size, 3);
  assert.ok(getGuideEpisodes(slug).length > 0);
  assert.equal(new Set(getGuideEpisodes(slug).map(e => e.file)).size, getGuideEpisodes(slug).length);
}
const combined = buildGuideGrounding('buffettmunger', 'capital allocation incentives risk');
for (const member of ['warren-buffett', 'charlie-munger']) {
  assert.ok(getGuideEpisodes(member).some(e => combined.includes(`### ${e.title.replace(/["\r\n]/g, ' ')}`)), `${member} contributes evidence`);
}
assert.ok(combined.length <= 24000);
for (const note of getGuideEpisodes('gottmans')) assert.equal(new URL(note.youtube).hostname, 'www.gottman.com');
console.log('Duo registry, prompts, evidence union, both-member retrieval and source provenance passed.');
