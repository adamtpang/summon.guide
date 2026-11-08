// Per-seat models for the council: each guide answers on its own OpenRouter
// model, with one fallback when that model is rate-limited or unavailable.
//
// Off by default. With COUNCIL_SEAT_MODELS unset, every council turn uses the
// shared waterfall in openrouter.ts exactly as before. Set
// COUNCIL_SEAT_MODELS=on to use the lineup below. Model ids are real
// OpenRouter catalog ids, checked against /api/v1/models on 2026-11-07.

export type SeatModel = {
  primary: string;
  fallback: string;
  /**
   * Reasoning override for this seat. Grok 4.7 at the default budget spent
   * 5,898 output tokens and 89 s before its first visible word in rehearsal;
   * minimal effort answered in about 13 s.
   */
  reasoning?: { effort: "minimal" | "low"; exclude: true };
};

/** Named seats for the demo council. Any other guide takes a seat model by position. */
export const SEAT_MODELS_BY_GUIDE: Record<string, SeatModel> = {
  "abraham-lincoln": { primary: "anthropic/claude-sonnet-5.5", fallback: "anthropic/claude-haiku-5.5" },
  franklin: { primary: "openai/gpt-5.6-terra", fallback: "openai/gpt-5.6-luna" },
  "lee-kuan-yew": { primary: "google/gemini-3.8-flash", fallback: "google/gemini-3.7-flash" },
  elon: { primary: "x-ai/grok-4.7", fallback: "x-ai/grok-4.6", reasoning: { effort: "minimal", exclude: true } },
};

/** Seat models by speaking order, for councils seated from a brief. */
export const SEAT_MODELS_BY_POSITION: SeatModel[] = [
  SEAT_MODELS_BY_GUIDE["abraham-lincoln"],
  SEAT_MODELS_BY_GUIDE.franklin,
  SEAT_MODELS_BY_GUIDE["lee-kuan-yew"],
  SEAT_MODELS_BY_GUIDE.elon,
  { primary: "mistralai/mistral-large-4-0", fallback: "qwen/qwen3.8-flash" },
];

export const SYNTHESIS_MODEL: SeatModel = {
  primary: "meta-llama/llama-4-maverick",
  fallback: "deepseek/deepseek-v4.1-flash",
};

/** The demo council: four guides, each on a different model family. */
export const DEMO_COUNCIL_SLUGS = ["abraham-lincoln", "franklin", "lee-kuan-yew", "elon"];

export function seatModelsEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.COUNCIL_SEAT_MODELS === "on";
}

/** The model pair for one speaker, or null to use the shared waterfall. */
export function seatModelFor(
  speaker: string,
  memberSlugs: string[],
  env: Record<string, string | undefined> = process.env,
): SeatModel | null {
  if (!seatModelsEnabled(env)) return null;
  if (speaker === "synthesis") return SYNTHESIS_MODEL;
  const named = SEAT_MODELS_BY_GUIDE[speaker];
  if (named) return named;
  const position = memberSlugs.indexOf(speaker);
  return position >= 0 ? SEAT_MODELS_BY_POSITION[position % SEAT_MODELS_BY_POSITION.length] : null;
}

/**
 * A development-only identity for rehearsing the council on a local machine,
 * where Google sign-in cannot complete (localhost callbacks are not
 * registered). It never applies in a production build.
 */
export function devDemoUserId(env: Record<string, string | undefined> = process.env): string | null {
  if (env.NODE_ENV !== "development") return null;
  const id = env.COUNCIL_DEMO_USER?.trim();
  return id ? id : null;
}

/** A synthetic brief for demos and rehearsals. It describes no real person. */
export const DEMO_BRIEF = `# Personal context

## Situation
A first-time founder with a working product, a handful of users, and six months of savings.

## Problems
Growth has stalled. The founder keeps adding features instead of talking to users.

## Goals
Reach 100 paying users before the savings run out.

## Constraints
Solo, no outside funding, limited time each week.

## Open questions
Whether to keep building alone, raise money, or take a part-time job to extend the runway.`;
