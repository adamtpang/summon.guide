import { FOLLOWUP_RULE } from "@/lib/guidePrompts";
import type { ChatMessageInput } from "@/lib/aiTypes";
import { AI_CONFIG } from "@/lib/figures";
import { streamOpenRouter } from "@/lib/openrouter";
import { buildSourceSystemPrompt, getSourceCorpus } from "@/lib/sourceCorpus";
import {
  applySourceRuntimePolicy,
  getSourceRuntimePolicy,
} from "@/lib/sourcePolicy";
import { retrieveSourceEpisodes } from "@/lib/sourceRetrieval";
import { buildSagePrompt } from "@/lib/sagePrompt";
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
  // Sage is the Founders corpus taught in the style of the Founders podcast;
  // every other source keeps the neutral corpus-guide prompt.
  const systemText = sourceSlug === "founders-podcast"
    ? buildSagePrompt(selectedEpisodes)
    : buildSourceSystemPrompt(sourceSlug!, selectedEpisodes);
  if (!systemText) {
    return Response.json({ error: "Source not found" }, { status: 404 });
  }
  console.info(
    `[chat/source] retrieved ${selectedEpisodes.length}/${eligibleEpisodes.length} policy-eligible episodes for ${sourceSlug}`,
  );

  // Sage maps several precedents onto a user's own project, so reasoning models
  // think harder before writing. Measured on 2026-09-14 with Sage's prompt,
  // DeepSeek V4.1 Flash spent 711 to 2,843 reasoning tokens per answer; at the
  // shared 1,600 budget most answers ended with no visible text, which the
  // waterfall reports as every model returning an empty response. A reasoning
  // bound plus a higher ceiling left the answer room in 8 of 8 probes.
  const isSage = sourceSlug === "founders-podcast";
  return streamOpenRouter({
    system: `${systemText}\n\n${FOLLOWUP_RULE}`,
    messages,
    maxTokens: isSage ? Math.max(AI_CONFIG.maxTokens, 6_000) : AI_CONFIG.maxTokens,
    ...(isSage ? { reasoning: { max_tokens: 1_000 }, retryEmpty: 2 } : {}),
    logLabel: "chat/source",
  });
}
