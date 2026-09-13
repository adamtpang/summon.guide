import fs from 'node:fs';
import { figures } from '../src/lib/figures.ts';
import { getGuideEpisodes } from '../src/lib/guideRetrieval.ts';
import { books } from '../src/lib/books.ts';
import { sourceCorpus } from '../src/lib/sourceCorpus.ts';
import { applySourceRuntimePolicy } from '../src/lib/sourcePolicy.ts';
import { VOICE_MAP } from '../src/lib/voices.ts';

const rows = figures.map(guide => {
  const episodes = getGuideEpisodes(guide.slug);
  return { slug: guide.slug, name: guide.name, portrait: Boolean(guide.portrait), voice: VOICE_MAP[guide.slug] ? 'library casting' : 'default casting', synthesisCount: episodes.length, retrieval: episodes.length ? 'question-ranked syntheses' : 'no retrievable corpus', fullTranscriptRetrieval: false, next: episodes.length ? 'Evaluate answers; deepen verified source coverage' : 'Acquire authorized sources, synthesize, index, evaluate' };
});
const sources = books.map(book => ({ slug: book.slug, name: book.title, kind: book.role === 'channel' ? 'channel' : 'book', synthesisCount: applySourceRuntimePolicy(book.slug, sourceCorpus[book.slug]?.episodes || []).length, fullTranscriptRetrieval: false }));
fs.writeFileSync('data/guide-retrieval-audit.json', JSON.stringify({ scope: 'Active person guides; local registries, not a production probe. No corpus quality inferred from quantity.', rows, sources }, null, 2) + '\n');
console.log(JSON.stringify({ guides: rows.length, withRetrieval: rows.filter(r => r.synthesisCount).length, withoutRetrieval: rows.filter(r => !r.synthesisCount).map(r => r.slug), withoutPortrait: rows.filter(r => !r.portrait).map(r => r.slug), defaultVoice: rows.filter(r => r.voice === 'default casting').map(r => r.slug) }));
