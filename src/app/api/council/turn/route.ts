import { auth } from "@/auth";
import {
  buildCouncilTurnRules,
  buildSynthesisMessages,
  buildSynthesisSystemPrompt,
  buildTurnMessages,
  parseThread,
  speakersThisRound,
  type CouncilMember,
} from "@/lib/councilThread";
import { AI_CONFIG, getFigure } from "@/lib/figures";
import { personVoiceRules } from "@/lib/guideContract";
import { buildGuideGrounding } from "@/lib/guideRetrieval";
import { devDemoUserId, seatModelFor } from "@/lib/councilModels";
import { isLifeContextBrief, LIFE_CONTEXT_RULES, MAX_LIFE_CONTEXT_CHARS } from "@/lib/lifeContext";
import { authenticateMcpToken, consumeGuideSession, licenseError } from "@/lib/membership";
import { streamOpenRouter } from "@/lib/openrouter";
import { NextRequest } from "next/server";

// POST /api/council/turn
//
// Body: {
//   brief: string,                      "# Personal context" brief
//   members: [{ slug, name, role? }],   the seated council, in speaking order
//   thread: ThreadEntry[],              everything said so far
//   speaker: "<slug>" | "synthesis",
// }
//
// Streams one voice in the shared council thread, in the same SSE format as
// /api/chat. A guide turn uses that guide's own prompt and retrieved notes
// plus the council rules; the synthesis closes the round. One membership
// session is consumed per round, on the first guide's turn.

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId =
    session?.user?.id ?? (await authenticateMcpToken(req.headers.get("authorization"))) ?? devDemoUserId();
  if (!userId) return Response.json({ error: "Sign in to convene the council" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const brief = typeof body.brief === "string" ? body.brief.trim() : "";
  if (!isLifeContextBrief(brief) || brief.length > MAX_LIFE_CONTEXT_CHARS) {
    return Response.json({ error: "A reviewed '# Personal context' brief is required" }, { status: 400 });
  }
  const thread = parseThread(body.thread);
  if (!thread || !thread.some((entry) => entry.kind === "user")) {
    return Response.json({ error: "Ask the council a question first" }, { status: 400 });
  }
  const members: CouncilMember[] = [];
  for (const raw of Array.isArray(body.members) ? (body.members as Array<Record<string, unknown>>) : []) {
    const figure = getFigure(String(raw?.slug ?? ""));
    if (!figure || members.some((m) => m.slug === figure.slug)) continue;
    members.push({ slug: figure.slug, name: figure.name, role: typeof raw.role === "string" ? raw.role.slice(0, 80) : undefined });
    if (members.length === 5) break;
  }
  if (members.length < 2) return Response.json({ error: "Seat at least two guides" }, { status: 400 });

  const speaker = String(body.speaker ?? "");
  // With COUNCIL_SEAT_MODELS=on each seat answers on its own model and the
  // stream ends with its stats; otherwise the shared waterfall, unchanged.
  const seatModel = seatModelFor(speaker, members.map((m) => m.slug));
  const seatOptions = seatModel
    ? { models: [seatModel.primary, seatModel.fallback], stats: true, ...(seatModel.reasoning ? { reasoning: seatModel.reasoning } : {}) }
    : {};

  if (speaker === "synthesis") {
    return streamOpenRouter({
      system: buildSynthesisSystemPrompt(members),
      messages: buildSynthesisMessages(brief, thread),
      maxTokens: 900,
      logLabel: "council/synthesis",
      ...seatOptions,
    });
  }

  const member = members.find((m) => m.slug === speaker);
  const figure = member && getFigure(member.slug);
  if (!member || !figure) return Response.json({ error: "Speaker is not seated" }, { status: 400 });

  // Count a round once: on its first guide, before anyone in it has spoken.
  let lastUser = -1;
  thread.forEach((entry, i) => { if (entry.kind === "user") lastUser = i; });
  if (!thread.slice(lastUser + 1).some((entry) => entry.kind === "guide")) {
    const license = await consumeGuideSession(userId);
    if (!license.ok) return licenseError(license);
  }

  const query = thread.filter((e) => e.kind === "user").slice(-2).map((e) => e.content).concat(brief).join("\n").slice(-8000);
  const grounding = buildGuideGrounding(figure.slug, query);
  const system = [
    figure.systemPrompt,
    grounding,
    LIFE_CONTEXT_RULES,
    buildCouncilTurnRules(member, members, speakersThisRound(thread)),
    // Same first-person voice as the guide's own chat page.
    personVoiceRules(figure.name, /present|contemporary|living/i.test(figure.era), figure.members),
  ].filter(Boolean).join("\n\n");

  return streamOpenRouter({
    system,
    messages: buildTurnMessages(brief, thread, member.slug),
    maxTokens: AI_CONFIG.maxTokens,
    logLabel: "council/turn",
    ...seatOptions,
    // Which source notes guideRetrieval chose for this seat, for the demo view.
    ...(seatModel ? { statsExtra: { retrieved: citedTitles(grounding) } } : {}),
  });
}

function citedTitles(grounding: string): string[] {
  return [...grounding.matchAll(/Cite as: \[Source: "([^"]+)"\]/g)].map((m) => m[1]).slice(0, 8);
}
