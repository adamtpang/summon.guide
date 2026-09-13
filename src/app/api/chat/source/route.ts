import type { ChatMessageInput } from "@/lib/aiTypes";
import { AI_CONFIG } from "@/lib/figures";
import { streamOpenRouter } from "@/lib/openrouter";
import { buildSourceSystemPrompt, getSourceCorpus } from "@/lib/sourceCorpus";
import {
  applySourceRuntimePolicy,
  getSourceRuntimePolicy,
} from "@/lib/sourcePolicy";
import { retrieveSourceEpisodes } from "@/lib/sourceRetrieval";
import { NextRequest } from "next/server";

// Grounds a channel or book corpus directly instead of simulating a person.
export async function POST(req: NextRequest) {
  const { source: sourceSlug, messages } = (await req.json()) as {
    source?: string;
    messages?: ChatMessageInput[];
  };
  if (!Array.isArray(messages) || !messages.length) {
    return Response.json({ error: "Messages required" }, { status: 400 });
  }
  const corpus = sourceSlug ? getSourceCorpus(sourceSlug) : null;
  if (!corpus) {
    return Response.json({ error: "Source not found" }, { status: 404 });
  }

  const policy = getSourceRuntimePolicy(sourceSlug!);
  const eligibleEpisodes = applySourceRuntimePolicy(sourceSlug!, corpus.episodes);
  const query = messages
    .filter((message) => message.role === "user")
    .slice(-3)
    .map((message) => message.content)
    .join("\n")
    .slice(0, 8_000);
  const limit = policy.maxRetrievedEpisodes;
  const retrieved = retrieveSourceEpisodes(eligibleEpisodes, query, limit);
  const selectedEpisodes = retrieved.map((result) => result.episode);
  const systemText = buildSourceSystemPrompt(sourceSlug!, selectedEpisodes);
  if (!systemText) {
    return Response.json({ error: "Source not found" }, { status: 404 });
  }
  console.info(
    `[chat/source] retrieved ${selectedEpisodes.length}/${eligibleEpisodes.length} policy-eligible episodes for ${sourceSlug}`,
  );

  return streamOpenRouter({
    system: systemText,
    messages,
    maxTokens: AI_CONFIG.maxTokens,
    logLabel: "chat/source",
  });
}
