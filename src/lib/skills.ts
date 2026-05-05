// Index of Claude Code skills derived from each guide's primary biographies.
// Source of truth for the SKILL.md content lives at /skills/<slug>/SKILL.md
// in this same repo, distributed as a Claude Code plugin via .claude-plugin/.
//
// To add a new skill:
//   1. Create /skills/<slug>/SKILL.md with frontmatter (name, description) and body
//   2. Add an entry below pointing to the same slug, with figureSlug, source book, etc.
//
// The website indexes this file to show skills on each guide's profile page
// and on /skills.

export interface Skill {
  /** matches the folder under /skills/ and the `name:` in SKILL.md frontmatter */
  slug: string;
  /** which figure (figures.ts slug) this skill belongs to */
  figureSlug: string;
  /** human title shown on the website */
  title: string;
  /** one-line "what this skill does" — the long form of the frontmatter description */
  tagline: string;
  /** when Claude should reach for this skill */
  whenToUse: string;
  /** the primary book(s) that grounded this skill */
  source: string;
  /** chapters or specific anchors within the source */
  sourceAnchor?: string;
  /** the claudeOps slash command Claude exposes once installed */
  command: string;
}

export const skills: Skill[] = [
  // John D. Rockefeller — Titan by Ron Chernow
  {
    slug: "rockefeller-ledger",
    figureSlug: "john-d-rockefeller",
    title: "Ledger A Discipline",
    tagline:
      "Track every penny. Find your drop of solder. Tithe before anything else.",
    whenToUse:
      "Setting up bookkeeping habits, auditing recurring spend, looking for unit-economic waste, or imposing financial discipline on a chaotic operation.",
    source: "Titan by Ron Chernow",
    sourceAnchor: "Chapter 3 (Ledger A) and Chapter 25 (the dimes and daily habits)",
    command: "/rockefeller-ledger",
  },
  {
    slug: "rockefeller-crisis",
    figureSlug: "john-d-rockefeller",
    title: "Crisis as Opportunity",
    tagline:
      "Buy when blood runs in the streets. Pre-commit your buy list. Move generously, execute ruthlessly.",
    whenToUse:
      "A market panic, downturn, layoff wave, or competitor collapse — and you have cash, conviction, or both.",
    source: "Titan by Ron Chernow",
    sourceAnchor: "Chapter 12 (Panic of 1873) and Chapter 6 (Cleveland Massacre)",
    command: "/rockefeller-crisis",
  },

  // Benjamin Franklin — Autobiography + Isaacson
  {
    slug: "franklin-thirteen-virtues",
    figureSlug: "benjamin-franklin",
    title: "13 Virtues System",
    tagline:
      "One virtue per week, on rotation. Mark every failure. Run 4 cycles a year.",
    whenToUse:
      "Building self-discipline, fixing a recurring personal flaw, designing a habit tracker, or operationalizing 'becoming a better person.'",
    source: "The Autobiography of Benjamin Franklin",
    sourceAnchor: "Part 2 (the bold and arduous project of arriving at moral perfection)",
    command: "/franklin-thirteen-virtues",
  },
  {
    slug: "franklin-junto",
    figureSlug: "benjamin-franklin",
    title: "Build a Junto",
    tagline:
      "12 people, Friday evenings, fixed agenda, one tangible artifact. Compounds for life.",
    whenToUse:
      "Starting a mastermind, founders circle, weekly dinner, study group, or any structured peer-improvement society.",
    source: "Benjamin Franklin: An American Life by Walter Isaacson",
    sourceAnchor:
      "Chapter 5 — Franklin's Junto society, founded 1727",
    command: "/franklin-junto",
  },

  // Elon Musk — Isaacson + The Anthology of Elon (Eric Jorgenson, et al.)
  {
    slug: "musk-first-principles",
    figureSlug: "elon-musk",
    title: "First-Principles Reasoning",
    tagline:
      "Decompose to physics, materials, and hours. Compute the irreducible floor. Attack the process around the constraint.",
    whenToUse:
      "You are quoted an 'industry standard' cost, told a long timeline, or stuck behind 'this is how it has always been done.'",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 2 (the rocket-cost decomposition that founded SpaceX)",
    command: "/musk-first-principles",
  },
  {
    slug: "musk-five-step-algorithm",
    figureSlug: "elon-musk",
    title: "Five-Step Algorithm",
    tagline:
      "Question, delete, simplify, accelerate, automate — in that order. The order is the algorithm.",
    whenToUse:
      "Simplifying a workflow, killing process bloat, speeding up cycle time, or rebuilding an operation from scratch.",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 30 (Musk's manufacturing algorithm, articulated to Tesla and SpaceX teams)",
    command: "/musk-five-step-algorithm",
  },
  {
    slug: "musk-idiot-index",
    figureSlug: "elon-musk",
    title: "The Idiot Index",
    tagline:
      "Finished cost / raw material cost. Above 10x means you are paying for inefficiency, not value.",
    whenToUse:
      "Auditing supplier prices, vendor contracts, build-vs-buy decisions, or any 'why does this cost so much' question.",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 47 (Musk asks engineers for the idiot index on every part)",
    command: "/musk-idiot-index",
  },

  // Alexander the Great — Plutarch, Arrian, Robin Lane Fox
  {
    slug: "alexander-lead-from-front",
    figureSlug: "alexander-the-great",
    title: "Lead From the Front",
    tagline:
      "Share the privation you ask of your team. Find your helmet-of-water gesture. Be wounded in their direction.",
    whenToUse:
      "You are asking the team to absorb something hard — late nights, a pay cut, a risky pivot — and you need them to follow.",
    source: "Life of Alexander by Plutarch and The Campaigns of Alexander by Arrian",
    sourceAnchor:
      "Plutarch on the Gedrosian Desert; Arrian on Alexander leading the cavalry charge at Granicus",
    command: "/alexander-lead-from-front",
  },
  {
    slug: "alexander-decisive-point",
    figureSlug: "alexander-the-great",
    title: "Concentrate at the Decisive Point",
    tagline:
      "List every front. Identify the one whose win makes the rest moot. Concentrate force. Strike before they react. Refuse the diversion.",
    whenToUse:
      "You are spread across too many fronts, facing a competitor with more raw power, or struggling to focus.",
    source: "The Campaigns of Alexander by Arrian",
    sourceAnchor: "The Battle of Gaugamela, 331 BC",
    command: "/alexander-decisive-point",
  },

  // David Deutsch — The Beginning of Infinity
  {
    slug: "deutsch-good-explanations",
    figureSlug: "david-deutsch",
    title: "Hard-to-Vary Explanations",
    tagline:
      "A good explanation is hard to vary while still accounting for what it explains. Test every detail by trying to swap it.",
    whenToUse:
      "Evaluating a theory, debating an interpretation, choosing between competing hypotheses, or detecting bullshit.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 1 (the seasons example: Persephone vs axial tilt)",
    command: "/deutsch-good-explanations",
  },
  {
    slug: "deutsch-principle-of-optimism",
    figureSlug: "david-deutsch",
    title: "The Principle of Optimism",
    tagline:
      "All evils are caused by insufficient knowledge. All problems are soluble unless forbidden by physics.",
    whenToUse:
      "Paralysis from 'this is just how it is,' a problem someone declared impossible, or a moment of strategic pessimism.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 9 (Optimism)",
    command: "/deutsch-principle-of-optimism",
  },

  // Lee Kuan Yew — From Third World to First, The Singapore Story
  {
    slug: "lky-pragmatist-test",
    figureSlug: "lee-kuan-yew",
    title: "The Pragmatist Test",
    tagline:
      "Strip ideology. Ask only: does it work? Define 'works' with measurable specificity. Kill what isn't producing.",
    whenToUse:
      "You are debating a policy or strategy through an ideological lens (left/right, agile/waterfall, B2B/B2C orthodoxy) instead of through results.",
    source: "From Third World to First by Lee Kuan Yew",
    sourceAnchor: "The pragmatist doctrine across his three decades as Prime Minister",
    command: "/lky-pragmatist-test",
  },
  {
    slug: "lky-incorruptibility",
    figureSlug: "lee-kuan-yew",
    title: "The Incorruptibility Lock",
    tagline:
      "Pay competitively AND prosecute without exception. One lock without the other fails.",
    whenToUse:
      "Designing incentives, hiring senior leadership, setting conflict-of-interest policy, or fixing a culture where rules get bent quietly.",
    source: "From Third World to First by Lee Kuan Yew",
    sourceAnchor: "Chapters 13–15 — the Corrupt Practices Investigation Bureau",
    command: "/lky-incorruptibility",
  },
];

/** Get all skills attached to a particular figure (by figure slug). */
export function getSkillsForFigure(figureSlug: string): Skill[] {
  return skills.filter((s) => s.figureSlug === figureSlug);
}

/** Get a single skill by its slug. */
export function getSkill(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

/** Public GitHub URL where Claude Code resolves the plugin's SKILL.md. */
export function skillGithubUrl(slug: string): string {
  return `https://github.com/adamtpang/summon.guide/blob/main/skills/${slug}/SKILL.md`;
}
