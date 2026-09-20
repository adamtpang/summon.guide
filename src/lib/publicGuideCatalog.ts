import { guideAgents } from "@/lib/guideAgents";
import { getGuideEpisodes } from "@/lib/guideRetrieval";
import { sourceCorpus } from "@/lib/sourceCorpus";
import { applySourceRuntimePolicy } from "@/lib/sourcePolicy";
import { isPublishableNote } from "@/lib/publicGuideNotes";
import { guidePath } from "@/lib/guideUrls";

export function publicGuideEpisodes(id: string) {
  const guide = guideAgents.find(guide => guide.id === id);
  if (!guide) return null;
  if (guide.availability !== "ready") return [];
  return (guide.kind === "person" ? getGuideEpisodes(guide.slug) : applySourceRuntimePolicy(guide.slug, sourceCorpus[guide.slug]?.episodes || [])).filter(isPublishableNote);
}

export const publicGuideCatalog = guideAgents.map(guide => ({
  id: guide.id, name: guide.name, kind: guide.kind, domains: guide.domains,
  description: guide.description.slice(0, 1200), availability: guide.availability,
  sourceCount: publicGuideEpisodes(guide.id)?.length || 0,
  url: guide.availability !== "ready" ? null : `https://summon.guide${guide.slug === "founders-podcast" ? "/sage" : guidePath(guide.slug)}`,
}));
