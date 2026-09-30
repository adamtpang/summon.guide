import { figures } from "@/lib/figures";
import { CRISIS_RESPONSE, isCrisisMessage } from "@/lib/crisis";
import { extractJsonObject } from "@/lib/jsonExtract";
import { completeOpenRouter } from "@/lib/openrouter";
import { skills, skillCatalogForRouting } from "@/lib/skills";
import { NextRequest } from "next/server";

// The router has three jobs now:
//
//  1. Problem-based request ("I can't stop procrastinating") → pick the
//     existing guide whose life best addresses it, AND the single skill in
//     the library that most directly attacks that problem.
//  2. Person-named request ("carnivore aurelius advice for X") → normalize
//     the name (tolerate typos and nicknames), and either route to that
//     guide if they're on the platform, or return a `not_found` signal with
//     the canonical name so the UI can offer to onboard them.
//  3. Skill routing, a person arrives with a problem, not with the name of
//     a framework. The skill is the thing they can actually run, so a match
//     without one leaves them on a chat page wondering what to type.
//
// Response shapes (the `skill` field is additive; older callers ignore it):
//   { type: "matched",   slug, reason, skill?: { figureSlug, slug, command, title, why } }
//   { type: "not_found", person, suggestedSlug, reason }
//   { type: "no_fit", topic, reason }      no guide has lived this problem yet
//   { type: "crisis", message, links }      danger signal, checked before any model call
//   { type: "unavailable" } (503)           routing failed; never a silent default guide

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "Message required" }, { status: 400 });
  }

  const catalog = figures
    .map(
      (f) =>
        `- ${f.slug}: ${f.name} (${f.era}), domains: ${f.domains.join(", ")}. ${f.knownFor}`
    )
    .join("\n");

  const skillCatalog = skillCatalogForRouting();
  const routingMessage = message.slice(0, 12_000);

  if (isCrisisMessage(routingMessage)) {
    return Response.json(CRISIS_RESPONSE);
  }

  const systemPrompt = `You are the routing intelligence for summon.guide. The user wants mentorship. Decide how to route them.

Guides currently on the platform:
${catalog}

The user may send either a short request or a structured personal context brief with current situation, problems, goals, priorities, constraints, and patterns. For a context brief, identify the highest-leverage current bottleneck. Weight explicit priorities and constraints more heavily than background details.

STEP 1, Classify the request:
- "named": the user is explicitly asking for a SPECIFIC named person ("Marcus Aurelius advice on X", "what would Steve Jobs do", "channel Naval"). Tolerate typos, nicknames, and misspellings, "carnivore aurelius" means Marcus Aurelius; "the PayPal guy who does rockets" means Elon Musk.
- "problem": the user is describing a situation, problem, goal, decision, pattern, or personal context with no explicit request for a specific person ("I keep procrastinating", "how do I price my product"). A person's name appearing only as background context does not make the request "named".

STEP 2, Resolve:
- If "named": normalize to the person's canonical full name. Check if that person is a guide above (match on who they ARE, not exact string, "Elon" = the elon slug).
  - If they ARE on the platform → route to them.
  - If they are NOT → return not_found with their canonical name and a suggested kebab-case slug (e.g. "Steve Jobs" → "steve-jobs").
- If "problem": pick the single guide above whose own documented life or work most directly addresses the user's highest-priority bottleneck. Use goals, priorities, and constraints to break ties. Do not simply choose the most famous guide.
  - Be strict. A guide fits only if they personally faced this kind of problem or their documented work is directly about it. A founder is not a fit for grief, illness, marriage, addiction, depression, parenting, or loneliness just because they showed resilience in business.
  - If no guide genuinely fits, return no_fit with a short plain topic (for example "grief after losing a parent"). An honest no_fit is better than a forced match.

STEP 3, Pick the playbook (only for "matched" responses):
From the skill library below, choose the ONE skill that most directly attacks the user's stated problem. Match on the problem, not on the guide: it is fine, and often better, to return a skill belonging to a different guide than the one you matched. If nothing in the library genuinely fits, omit the skill rather than forcing one.

Skill library:
${skillCatalog}

Respond with ONLY valid JSON, one of:
{"type":"matched","slug":"<slug from the guide list>","reason":"<one compelling sentence, under 120 chars, referencing what this guide actually did that fits the user's need>","command":"<the /plugin:skill command from the library, or omit>","why":"<under 90 chars: what this playbook will do for them, or omit>"}
{"type":"not_found","person":"<canonical full name>","suggestedSlug":"<kebab-case-slug>","reason":"<one sentence: who they are and that they aren't summoned yet, under 140 chars>"}
{"type":"no_fit","topic":"<the problem in 3 to 8 plain words>","reason":"<one kind sentence, under 140 chars, saying no guide here has lived this yet>"}

Rules:
- Never invent a slug that is not in the list for a "matched" response.
- Never invent a command. It must appear verbatim in the skill library above.
- For "named" requests where the person clearly exists in the list, always prefer "matched".
- Never mention you are an AI or a routing system. Never use em dashes.`;

  try {
    const response = await completeOpenRouter({
      system: systemPrompt,
      messages: [{ role: "user", content: routingMessage }],
      maxTokens: 800,
      temperature: 0.2,
    });

    const text = response.text;

    // The model sometimes wraps its JSON in ```json fences or prefaces it
    // with prose. Extract the first {...} block before parsing so a slightly
    // chatty response doesn't bail us to the fallback.
    const parsed = JSON.parse(extractJsonObject(text));

    if (parsed.type === "no_fit") {
      return Response.json({
        type: "no_fit",
        topic: String(parsed.topic || "").slice(0, 80),
        reason: String(parsed.reason || "No guide here has lived this problem yet."),
      });
    }

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

    // matched (or any response carrying a slug), validate the slug exists.
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

    // Resolve the proposed command against the real library. The model is
    // told never to invent one, but an invented command would send someone
    // to a plugin that does not exist, so it is verified rather than trusted.
    let matchedSkill: {
      figureSlug: string;
      slug: string;
      command: string;
      title: string;
      why: string;
    } | undefined;
    const proposedCmd = String(parsed.command || "").trim();
    if (proposedCmd) {
      const hit = skills.find((s) => s.command === proposedCmd);
      if (hit) {
        matchedSkill = {
          figureSlug: hit.figureSlug,
          slug: hit.slug,
          command: hit.command,
          title: hit.title,
          why: String(parsed.why || hit.tagline).slice(0, 140),
        };
      } else {
        console.error("[match] invented command ignored:", proposedCmd);
      }
    }

    return Response.json({
      type: "matched",
      slug: valid.slug,
      reason: parsed.reason || "Let's begin.",
      ...(matchedSkill ? { skill: matchedSkill } : {}),
    });
  } catch (e) {
    // Capture the actual failure so we can fix it instead of silently
    // falling back forever.
    console.error("[match] fell to fallback:", e instanceof Error ? e.message : e);
    // Never hand someone a default guide that has nothing to do with their
    // problem. Say plainly that matching failed so they can retry.
    return Response.json({ type: "unavailable", error: "Could not find a guide right now. Try again." }, { status: 503 });
  }
}
