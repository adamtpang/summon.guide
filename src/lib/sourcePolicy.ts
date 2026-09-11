import type { SourceEpisode } from "@/lib/sourceCorpus";

export type SourceRuntimePolicy = {
  maxRetrievedEpisodes: number;
  excludedEpisodeFiles: string[];
  citationsRequired: boolean;
  rawTranscriptsAllowedInRuntime: boolean;
  providerInputRetention: "deny";
};

const DEFAULT_POLICY: SourceRuntimePolicy = {
  maxRetrievedEpisodes: 16,
  excludedEpisodeFiles: [],
  citationsRequired: true,
  rawTranscriptsAllowedInRuntime: false,
  providerInputRetention: "deny",
};

const SOURCE_POLICIES: Record<string, SourceRuntimePolicy> = {
  "founders-podcast": DEFAULT_POLICY,
};

export function getSourceRuntimePolicy(sourceSlug: string): SourceRuntimePolicy {
  return SOURCE_POLICIES[sourceSlug] || DEFAULT_POLICY;
}

export function applySourceRuntimePolicy(
  sourceSlug: string,
  episodes: readonly SourceEpisode[],
): SourceEpisode[] {
  const policy = getSourceRuntimePolicy(sourceSlug);
  const excluded = new Set(policy.excludedEpisodeFiles);
  return episodes.filter((episode) => !excluded.has(episode.file));
}
