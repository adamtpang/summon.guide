import { books } from "./books";
import { getFigureSources } from "./figureSources";
import { sourceCorpus, type SourceEpisode } from "./sourceCorpus";
import { applySourceRuntimePolicy } from "./sourcePolicy";
import { retrieveSourceEpisodes } from "./sourceRetrieval";

/** Only published synthesis registries; never read private transcript files. */
export function getGuideEpisodes(slug: string): SourceEpisode[] {
  const entries = new Map<string, SourceEpisode>();
  for (const book of books.filter(book => book.figureSlug === slug)) {
    for (const episode of applySourceRuntimePolicy(book.slug, sourceCorpus[book.slug]?.episodes || [])) entries.set(episode.file, episode);
  }
  for (const episode of getFigureSources(slug).sources) entries.set(episode.file, episode);
  return [...entries.values()].filter(episode => !episode.file.split(/[\\/]/).includes("_raw"));
}

export function buildGuideGrounding(slug: string, query: string): string {
  const episodes = getGuideEpisodes(slug);
  if (!episodes.length) return "SOURCE COVERAGE: No retrievable corpus is connected for this guide. Be explicit about this if asked. Do not claim to have searched transcripts or invent source citations.";
  const selected = retrieveSourceEpisodes(episodes, query, 16);
  let result = "## Retrieved source notes\nThese are original syntheses, not full transcripts. Use relevant evidence; cite supported claims with the exact citation below. Do not force irrelevant evidence, invent quotations, or imply access to the person's private thoughts. Distinguish your inference from documented evidence. If these notes do not answer the question, say so.\n";
  for (const { episode } of selected) {
    const title = episode.title.replace(/["\r\n]/g, " ");
    const block = `\n### ${title}\nCite as: [Source: "${title}"]\nPrinciple: ${episode.principle}\n${episode.keyLessons.map(lesson => `- ${lesson}`).join("\n")}\n`;
    // Preserve complete chunks and citations. Skip long entries, never cut mid-evidence.
    if (result.length + block.length <= 24000) result += block;
  }
  return result;
}
