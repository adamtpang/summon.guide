import Anthropic from "@anthropic-ai/sdk";
import { figures, AI_CONFIG } from "@/lib/figures";
import { NextRequest } from "next/server";

const anthropic = new Anthropic();

// The router has two jobs now:
//
//  1. Problem-based request ("I can't stop procrastinating") → pick the
//     existing guide whose life best addresses it.
//  2. Person-named request ("carnivore aurelius advice for X") → normalize
//     the name (tolerate typos and nicknames), and either route to that
//     guide if they're on the platform, or return a `not_found` signal with
//     the canonical name so the UI can offer to onboard them.
//
// Response shapes:
//   { type: "matched",   slug, reason }
//   { type: "not_found", person, suggestedSlug, reason }

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Message required" }, { status: 400 });
  }

  const catalog = figures
    .map(
      (f) =>
        `- ${f.slug}: ${f.name} (${f.era}) — domains: ${f.domains.join(", ")}. ${f.knownFor}`
    )
    .join("\n");

  const systemPrompt = `You are the routing intelligence for summon.guide. The user wants mentorship. Decide how to route them.

Guides currently on the platform:
${catalog}

STEP 1 — Classify the request:
- "named": the user is explicitly asking for a SPECIFIC named person ("Marcus Aurelius advice on X", "what would Steve Jobs do", "channel Naval"). Tolerate typos, nicknames, and misspellings — "carnivore aurelius" means Marcus Aurelius; "the PayPal guy who does rockets" means Elon Musk.
- "problem": the user is describing a situation or problem with no specific person named ("I keep procrastinating", "how do I price my product").

STEP 2 — Resolve:
- If "named": normalize to the person's canonical full name. Check if that person is a guide above (match on who they ARE, not exact string — "Elon" = the elon slug).
  - If they ARE on the platform → route to them.
  - If they are NOT → return not_found with their canonical name and a suggested kebab-case slug (e.g. "Steve Jobs" → "steve-jobs").
- If "problem": pick the single guide above whose life most directly addresses it.

Respond with ONLY valid JSON, one of:
{"type":"matched","slug":"<slug from the list>","reason":"<one compelling sentence, under 120 chars, referencing what this guide actually did that fits the user's need>"}
{"type":"not_found","person":"<canonical full name>","suggestedSlug":"<kebab-case-slug>","reason":"<one sentence: who they are and that they aren't summoned yet, under 140 chars>"}

Rules:
- Never invent a slug that is not in the list for a "matched" response.
- For "named" requests where the person clearly exists in the list, always prefer "matched".
- Never mention you are an AI or a routing system. Never use em dashes.`;

  try {
    const response = await anthropic.messages.create({
      model: AI_CONFIG.model,
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = JSON.parse(text);

    if (parsed.type === "not_found" && parsed.person) {
      return Response.json({
        type: "not_found",
        person: String(parsed.person),
        suggestedSlug: String(parsed.suggestedSlug || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        reason: String(parsed.reason || ""),
      });
    }

    // matched (or any response carrying a slug) — validate the slug exists
    const valid = figures.find((f) => f.slug === parsed.slug);
    if (!valid) throw new Error("Invalid slug");

    return Response.json({
      type: "matched",
      slug: parsed.slug,
      reason: parsed.reason || "Let's begin.",
    });
  } catch {
    // Fallback: never hard-fail the user — start a conversation with the
    // first guide rather than 500.
    return Response.json({
      type: "matched",
      slug: figures[0].slug,
      reason: "Let's start with a conversation.",
    });
  }
}
