import type { Figure } from "@/lib/figures";
import { extractJsonObject } from "./jsonExtract";
import type { Skill } from "@/lib/skills";

// The council: given one person's life-context brief, seat the few guides
// whose own lives most directly answer it, each with a role, a reason, and
// the first question worth asking them. Aang did not summon every past
// Avatar at once; Roku spoke to one problem, Kyoshi to another. Same here.
//
// Everything in this file is pure so it can run without a model: the
// domain ranking is the no-model fallback and also the sanity check on
// whatever the model proposes.

export const COUNCIL_SIZE = 3;

export type CouncilSeat = {
  slug: string;
  name: string;
  era: string;
  portrait?: string;
  role: string;
  reason: string;
  ask: string;
  skill?: {
    figureSlug: string;
    slug: string;
    command: string;
    title: string;
    why: string;
  };
};

export type CouncilSource = "model" | "domains";

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "into", "your", "you",
  "are", "not", "but", "one", "now", "when", "what", "who", "how", "then",
  "than", "have", "has", "had", "was", "were", "will", "can", "all", "any",
  "about", "before", "after", "still", "only", "also", "more", "most", "its",
]);

function tokens(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < 3 || STOP_WORDS.has(raw)) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  return counts;
}

/**
 * Scores every guide by how often its declared domains occur in the brief.
 * Multi-word domains match on each word, so "first principles" credits both
 * "first" and "principles". Ties break on the catalog order, which is the
 * order the guides were added, so long-standing guides win ties.
 */
export function rankGuidesByDomains(brief: string, catalog: Figure[]): Array<{ figure: Figure; score: number }> {
  const counts = tokens(brief);
  return catalog
    .map((figure, index) => {
      let score = 0;
      for (const domain of figure.domains) {
        for (const word of domain.toLowerCase().split(/[^a-z0-9]+/)) {
          if (word.length < 3 || STOP_WORDS.has(word)) continue;
          score += counts.get(word) ?? 0;
        }
      }
      return { figure, score, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ figure, score }) => ({ figure, score }));
}

export function seatFromFigure(figure: Figure, seat: Partial<Pick<CouncilSeat, "role" | "reason" | "ask">>): CouncilSeat {
  return {
    slug: figure.slug,
    name: figure.name,
    era: figure.era,
    portrait: figure.portrait,
    role: seat.role?.trim() || `On ${figure.domains.slice(0, 2).join(" and ")}`,
    reason: seat.reason?.trim() || figure.knownFor,
    ask: seat.ask?.trim() || `Given my brief, what is the one move you would make this week, and what did you do in your own life when you faced something like it?`,
  };
}

/** The no-model council: the top guides by domain overlap with the brief. */
export function councilByDomains(brief: string, catalog: Figure[], size = COUNCIL_SIZE): CouncilSeat[] {
  return rankGuidesByDomains(brief, catalog)
    .slice(0, size)
    .map(({ figure }) => seatFromFigure(figure, {}));
}

export function buildCouncilPrompt(catalog: Figure[], skillCatalog: string, size = COUNCIL_SIZE): string {
  const guides = catalog
    .map((f) => `- ${f.slug}: ${f.name} (${f.era}), domains: ${f.domains.join(", ")}. ${f.knownFor}`)
    .join("\n");

  return `You seat the council for summon.guide. The user sends a personal context brief: current situation, problems, goals, priorities, constraints, patterns, and what guidance works for them. Choose the ${size} guides on the platform whose own lives most directly answer this person's highest-leverage bottleneck right now.

Guides on the platform:
${guides}

How to choose:
- Read the brief for the single decision or bottleneck that matters most in the next few weeks. Weight explicit priorities, deadlines, and constraints above background.
- Seat ${size} DIFFERENT guides. Each seat must answer a different facet of the bottleneck (for example: the decision itself, the money or survival constraint, the pattern that keeps blocking action). No two seats for the same facet.
- Prefer a guide whose documented life contains a concrete moment that matches. Fame is not a reason.
- The first seat is the primary guide, the one to talk to first.

For each seat produce:
- "role": under 40 characters, what this guide is on the council for (for example "The one who faced this exact fork").
- "reason": under 120 characters, the specific thing this guide actually did that fits the brief.
- "ask": under 180 characters, the first question the user should put to this guide, written in the user's own first-person voice, specific to the brief.

For the primary seat only, you may add "command": the ONE playbook from the skill library that most directly attacks the bottleneck, copied verbatim, plus "why" under 90 characters. Omit both if nothing fits.

Skill library:
${skillCatalog}

Respond with ONLY valid JSON:
{"council":[{"slug":"<slug>","role":"...","reason":"...","ask":"...","command":"<optional>","why":"<optional>"}, ...]}

Rules:
- Every slug must come from the guide list above. Never invent one.
- Never invent a command. It must appear verbatim in the skill library.
- Never mention that you are an AI or a routing system. Never use em dashes.`;
}

/**
 * Turns the model's JSON into validated seats. Unknown slugs are dropped,
 * duplicates collapse, invented commands are ignored, and any gap left is
 * filled from the domain ranking so the council is always full.
 */
export function parseCouncilResponse(
  text: string,
  brief: string,
  catalog: Figure[],
  skillLibrary: Skill[],
  size = COUNCIL_SIZE,
): CouncilSeat[] {
  const parsed = JSON.parse(extractJsonObject(text)) as {
    council?: Array<{ slug?: string; role?: string; reason?: string; ask?: string; command?: string; why?: string }>;
  };
  const proposed = Array.isArray(parsed.council) ? parsed.council : [];
  const seats: CouncilSeat[] = [];

  for (const entry of proposed) {
    const slug = String(entry.slug || "").toLowerCase();
    if (!slug) continue;
    const figure =
      catalog.find((f) => f.slug === slug) ||
      catalog.find((f) => f.slug.startsWith(`${slug}-`)) ||
      catalog.find((f) => f.slug.includes(slug));
    if (!figure || seats.some((seat) => seat.slug === figure.slug)) continue;

    const seat = seatFromFigure(figure, entry);
    const command = String(entry.command || "").trim();
    if (command && seats.length === 0) {
      const hit = skillLibrary.find((skill) => skill.command === command);
      if (hit) {
        seat.skill = {
          figureSlug: hit.figureSlug,
          slug: hit.slug,
          command: hit.command,
          title: hit.title,
          why: String(entry.why || hit.tagline).slice(0, 140),
        };
      }
    }
    seats.push(seat);
    if (seats.length === size) break;
  }

  if (seats.length < size) {
    for (const { figure } of rankGuidesByDomains(brief, catalog)) {
      if (seats.length === size) break;
      if (seats.some((seat) => seat.slug === figure.slug)) continue;
      seats.push(seatFromFigure(figure, {}));
    }
  }

  return seats;
}
