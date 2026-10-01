import { createHash } from "node:crypto";
import type { SourceEpisode } from "./sourceCorpus";
import { rankSourceEpisodes } from "./sourceRetrieval";

export function isPublishableNote(episode: SourceEpisode) {
  return episode.file.startsWith("content/knowledge/") && !episode.file.split(/[\\/]/).some(part => part === "_raw" || part === "..");
}

function excerpt(text: string, limit: number) {
  const clean = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
  return clean.length <= limit ? clean : clean.slice(0, limit - 1).trimEnd() + "…";
}

function sourceUrl(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

/** Projection only of generated, public synthesis registries. No filesystem reads. */
export function retrievePublicNotes(episodes: SourceEpisode[], query: string, limit = 4) {
  const eligible = [...new Map(episodes.filter(isPublishableNote).map(episode => [episode.file, episode])).values()];
  const notes = rankSourceEpisodes(eligible, query).filter(result => result.score > 0).slice(0, Math.min(6, Math.max(1, limit))).map(({ episode }) => ({
    id: createHash("sha256").update(episode.file).digest("hex").slice(0, 16),
    title: excerpt(episode.title, 300),
    principle: excerpt(episode.principle, 600),
    lessons: episode.keyLessons.slice(0, 3).map(lesson => excerpt(lesson, 900)),
    sourceUrl: sourceUrl(episode.youtube),
    kind: "synthesis_excerpt" as const,
  }));
  return { status: !eligible.length ? "no_corpus" : notes.length ? "ok" : "no_relevant_notes", sourceCount: eligible.length, notes };
}
