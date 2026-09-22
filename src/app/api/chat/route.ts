import { FOLLOWUP_RULE } from "@/lib/guidePrompts";
import { auth } from "@/auth";
import type { ChatMessageInput } from "@/lib/aiTypes";
import { buildGuideGrounding } from "@/lib/guideRetrieval";
import { AI_CONFIG, getFigure } from "@/lib/figures";
import {
  authenticateMcpToken,
  consumeGuideSession,
  licenseError,
} from "@/lib/membership";
import { isLifeContextBrief, LIFE_CONTEXT_RULES } from "@/lib/lifeContext";
import { streamOpenRouter } from "@/lib/openrouter";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const mcpUserId = session?.user?.id
    ? null
    : await authenticateMcpToken(req.headers.get("authorization"));
  const license = await consumeGuideSession(
    session?.user?.id ?? mcpUserId ?? undefined,
  );
  if (!license.ok) return licenseError(license);

  const { figure: figureSlug, messages, mode } = (await req.json()) as {
    figure?: string;
    messages?: ChatMessageInput[];
    mode?: string;
  };
  const figure = figureSlug ? getFigure(figureSlug) : undefined;
  if (!figure) {
    return Response.json({ error: "Figure not found" }, { status: 404 });
  }
  if (!Array.isArray(messages) || !messages.length) {
    return Response.json({ error: "Messages required" }, { status: 400 });
  }

  // Keep the persona and its documented corpus together in one system
  // message. OpenRouter tries the current free-quality queue first and then
  // automatically falls through to capped-cost models when needed.
  const query = messages.filter(message => message.role === "user").slice(-3).map(message => message.content).join("\n").slice(-8000);
  const grounding = buildGuideGrounding(figure.slug, query);
  const hasLifeContext = messages.some(
    (message) => message.role === "user" && isLifeContextBrief(message.content),
  );
  const systemText = [
    figure.systemPrompt,
    grounding,
    hasLifeContext ? LIFE_CONTEXT_RULES : "",
    mode === "voice" ? "VOICE CONVERSATION: Give a natural spoken response, usually 2-4 short sentences. Make one useful point, then ask one thoughtful question if needed. Avoid lists, headings, and long monologues. Keep source citations at the end for the transcript. You are an AI guide inspired by public works; never claim to be the actual person or imply a real phone connection." : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return streamOpenRouter({
    system: `${systemText}\n\n${FOLLOWUP_RULE}`,
    messages,
    maxTokens: AI_CONFIG.maxTokens,
    logLabel: "chat",
  });
}
