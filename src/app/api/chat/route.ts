import { auth } from "@/auth";
import type { ChatMessageInput } from "@/lib/aiTypes";
import { buildGroundingBlock } from "@/lib/figureSources";
import { AI_CONFIG, getFigure } from "@/lib/figures";
import {
  authenticateMcpToken,
  consumeGuideSession,
  licenseError,
} from "@/lib/membership";
import { isLifeContextBrief } from "@/lib/lifeContext";
import { streamOpenRouter } from "@/lib/openrouter";
import { NextRequest } from "next/server";

// Added when a "# Personal context" brief is in the thread, whether it came
// from themain.quest through the council or was pasted by hand. The persona
// rules above still apply; this only tells the guide what the brief is for.
const LIFE_CONTEXT_RULES = `LIFE CONTEXT:
A "# Personal context" brief in this conversation is this person's real current life, exported from their own quest log. Treat it as ground truth about their situation, not as a hypothetical.
- Speak to the specific quest, deadline, fork, or condition it names. Never answer as if the brief were not there.
- Do not recite the brief back. They wrote it. Reference the one or two lines that matter for your answer.
- Take one position on the fork or the bottleneck. Hedging across every path wastes the session.
- If the brief lists open questions or things it does not state, ask rather than assume.
- Names of other people inside the brief are context only. Do not speculate about them.`;

export async function POST(req: NextRequest) {
  const session = await auth();
  const mcpUserId = session?.user?.id
    ? null
    : await authenticateMcpToken(req.headers.get("authorization"));
  const license = await consumeGuideSession(
    session?.user?.id ?? mcpUserId ?? undefined,
  );
  if (!license.ok) return licenseError(license);

  const { figure: figureSlug, messages } = (await req.json()) as {
    figure?: string;
    messages?: ChatMessageInput[];
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
  const grounding = buildGroundingBlock(figure.slug);
  const hasLifeContext = messages.some(
    (message) => message.role === "user" && isLifeContextBrief(message.content),
  );
  const systemText = [
    figure.systemPrompt,
    grounding,
    hasLifeContext ? LIFE_CONTEXT_RULES : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return streamOpenRouter({
    system: systemText,
    messages,
    maxTokens: AI_CONFIG.maxTokens,
    logLabel: "chat",
  });
}
