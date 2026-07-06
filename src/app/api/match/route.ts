import { anthropicClient } from "@/lib/anthropic";
import { figures, AI_CONFIG } from "@/lib/figures";
import { NextRequest } from "next/server";

const anthropic = anthropicClient();

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
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    // The model sometimes wraps its JSON in ```json fences or prefaces it
    // with prose. Extract the first {...} block before parsing so a slightly
    // chatty response doesn't bail us to the fallback.
    const parsed = JSON.parse(extractJsonObject(text));

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

    // matched (or any response carrying a slug) — validate the slug exists.
    // Be tolerant: if the model abbreviates ("marcus" instead of
    // "marcus-aurelius", "elon" exact match, "seneca" exact match), try a
    // prefix/contains fallback before giving up.
    const proposed = String(parsed.slug || "").toLowerCase();
    let valid = figures.find((f) => f.slug === proposed);
    if (!valid && proposed) {
      valid =
        figures.find((f) => f.slug.startsWith(proposed + "-")) ||
        figures.find((f) => f.slug.includes(proposed)) ||
        undefined;
    }
    if (!valid) {
      console.error(
        "[match] no figure for slug:",
        proposed,
        "available:",
        figures.map((f) => f.slug).join(",")
      );
      throw new Error(`Invalid slug "${proposed}"`);
    }

    return Response.json({
      type: "matched",
      slug: valid.slug,
      reason: parsed.reason || "Let's begin.",
    });
  } catch (e) {
    // Capture the actual failure so we can fix it instead of silently
    // falling back forever.
    console.error("[match] fell to fallback:", e instanceof Error ? e.message : e);
    return Response.json({
      type: "matched",
      slug: figures[0].slug,
      reason: "Let's start with a conversation.",
    });
  }
}

/**
 * Pull the first balanced {…} block out of a string. Tolerates code fences
 * (```json … ```), leading prose, and trailing prose. Throws if no balanced
 * object is found, which the caller catches into the fallback.
 */
function extractJsonObject(text: string): string {
  const cleaned = text.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  if (start === -1) throw new Error("No JSON object in response");
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return cleaned.slice(start, i + 1);
    }
  }
  throw new Error("Unbalanced JSON in response");
}
