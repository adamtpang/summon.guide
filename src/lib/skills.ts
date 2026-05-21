// Index of Claude Code skills derived from each guide's primary biographies.
//
// Skills live in /plugins/<figureSlug>/skills/<skillSlug>/SKILL.md.
// The repo's /.claude-plugin/marketplace.json exposes one plugin per guide,
// so users can pick exactly who to summon into their Claude chats:
//
//     /plugin marketplace add adamtpang/summon.guide
//     /plugin install elon              ← gets ONLY Elon's skills
//     /plugin install marcus-aurelius   ← gets ONLY Marcus's skills
//
// After install, slash commands are namespaced: /<plugin>:<skill>.
// The umbrella skill for each plugin shares the plugin's name —
// /elon:elon channels Elon's full mindset; /elon:first-principles is
// the specific framework.
//
// To add a new skill:
//   1. Create /plugins/<figureSlug>/skills/<skillSlug>/SKILL.md
//   2. Add an entry below with the matching slug + figureSlug
//   3. Cross-link the skill slug in src/lib/books.ts under the source book
//   4. Add the plugin entry to /.claude-plugin/marketplace.json if the
//      guide is brand new

export interface Skill {
  /** matches the directory name under /plugins/<figureSlug>/skills/<slug> */
  slug: string;
  /** which figure (figures.ts slug) this skill belongs to — also the plugin name */
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
  /** the namespaced slash command Claude exposes once installed */
  command: string;
  /** marks the per-guide umbrella skill (slug === figureSlug). The umbrella
   *  channels the full mindset; non-umbrella skills are specific frameworks. */
  umbrella?: boolean;
}

export const skills: Skill[] = [
  // ───── Rockefeller ─────
  {
    slug: "rockefeller",
    figureSlug: "rockefeller",
    title: "Channel Rockefeller",
    tagline:
      "Open Ledger A. Find the drop of solder. Tithe before anything else. Move generously, execute ruthlessly.",
    whenToUse:
      "Working through money discipline, recurring spend, unit economics, a market panic, or any moment where iron patience beats aggression.",
    source: "Titan by Ron Chernow",
    command: "/rockefeller:rockefeller",
    umbrella: true,
  },
  {
    slug: "ledger",
    figureSlug: "rockefeller",
    title: "Ledger A Discipline",
    tagline:
      "Track every penny. Find your drop of solder. Tithe before anything else.",
    whenToUse:
      "Setting up bookkeeping habits, auditing recurring spend, looking for unit-economic waste, or imposing financial discipline on a chaotic operation.",
    source: "Titan by Ron Chernow",
    sourceAnchor: "Chapter 3 (Ledger A) and Chapter 25 (the dimes and daily habits)",
    command: "/rockefeller:ledger",
  },
  {
    slug: "crisis",
    figureSlug: "rockefeller",
    title: "Crisis as Opportunity",
    tagline:
      "Buy when blood runs in the streets. Pre-commit your buy list. Move generously, execute ruthlessly.",
    whenToUse:
      "A market panic, downturn, layoff wave, or competitor collapse — and you have cash, conviction, or both.",
    source: "Titan by Ron Chernow",
    sourceAnchor: "Chapter 12 (Panic of 1873) and Chapter 6 (Cleveland Massacre)",
    command: "/rockefeller:crisis",
  },

  // ───── Franklin ─────
  {
    slug: "franklin",
    figureSlug: "franklin",
    title: "Channel Franklin",
    tagline:
      "Track behavior, not intent. Build structures, not just resolutions. Persuade through charm. Make the project useful.",
    whenToUse:
      "Self-improvement, building a habit-tracking system, starting a mastermind, drafting a public letter, or any decision where persuasion beats force.",
    source: "The Autobiography of Benjamin Franklin",
    command: "/franklin:franklin",
    umbrella: true,
  },
  {
    slug: "thirteen-virtues",
    figureSlug: "franklin",
    title: "13 Virtues System",
    tagline:
      "One virtue per week, on rotation. Mark every failure. Run 4 cycles a year.",
    whenToUse:
      "Building self-discipline, fixing a recurring personal flaw, designing a habit tracker, or operationalizing 'becoming a better person.'",
    source: "The Autobiography of Benjamin Franklin",
    sourceAnchor: "Part 2 (the bold and arduous project of arriving at moral perfection)",
    command: "/franklin:thirteen-virtues",
  },
  {
    slug: "junto",
    figureSlug: "franklin",
    title: "Build a Junto",
    tagline:
      "12 people, Friday evenings, fixed agenda, one tangible artifact. Compounds for life.",
    whenToUse:
      "Starting a mastermind, founders circle, weekly dinner, study group, or any structured peer-improvement society.",
    source: "Benjamin Franklin: An American Life by Walter Isaacson",
    sourceAnchor: "Chapter 5 — Franklin's Junto society, founded 1727",
    command: "/franklin:junto",
  },

  // ───── Elon ─────
  {
    slug: "elon",
    figureSlug: "elon",
    title: "Channel Elon",
    tagline:
      "Question every requirement. Decompose to first principles. Run the five-step algorithm in order. Apply schedule pressure. The best part is no part.",
    whenToUse:
      "Engineering problems, 'this is impossible' claims, long quoted timelines, manufacturing or process bloat, supplier cost audits, or any moment needing bias-to-action under pressure.",
    source: "Elon Musk by Walter Isaacson",
    command: "/elon:elon",
    umbrella: true,
  },
  {
    slug: "first-principles",
    figureSlug: "elon",
    title: "First-Principles Reasoning",
    tagline:
      "Decompose to physics, materials, and hours. Compute the irreducible floor. Attack the process around the constraint.",
    whenToUse:
      "You are quoted an 'industry standard' cost, told a long timeline, or stuck behind 'this is how it has always been done.'",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 2 (the rocket-cost decomposition that founded SpaceX)",
    command: "/elon:first-principles",
  },
  {
    slug: "five-step-algorithm",
    figureSlug: "elon",
    title: "Five-Step Algorithm",
    tagline:
      "Question, delete, simplify, accelerate, automate — in that order. The order is the algorithm.",
    whenToUse:
      "Simplifying a workflow, killing process bloat, speeding up cycle time, or rebuilding an operation from scratch.",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 30 (Musk's manufacturing algorithm, articulated to Tesla and SpaceX teams)",
    command: "/elon:five-step-algorithm",
  },
  {
    slug: "idiot-index",
    figureSlug: "elon",
    title: "The Idiot Index",
    tagline:
      "Finished cost / raw material cost. Above 10x means you are paying for inefficiency, not value.",
    whenToUse:
      "Auditing supplier prices, vendor contracts, build-vs-buy decisions, or any 'why does this cost so much' question.",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 47 (Musk asks engineers for the idiot index on every part)",
    command: "/elon:idiot-index",
  },

  // ───── Alexander ─────
  {
    slug: "alexander",
    figureSlug: "alexander",
    title: "Channel Alexander",
    tagline:
      "Lead from the front. Concentrate at the decisive point. Strike before they react. Refuse the diversion. Magnanimous in victory, ruthless about the line.",
    whenToUse:
      "Leading a team into something hard, deciding where to concentrate scarce resource, facing a competitor with more raw power, or wondering whether to delegate what the team needs to see you personally absorb.",
    source: "Plutarch's Life of Alexander and Arrian's Anabasis Alexandri",
    command: "/alexander:alexander",
    umbrella: true,
  },
  {
    slug: "lead-from-front",
    figureSlug: "alexander",
    title: "Lead From the Front",
    tagline:
      "Share the privation you ask of your team. Find your helmet-of-water gesture. Be wounded in their direction.",
    whenToUse:
      "You are asking the team to absorb something hard — late nights, a pay cut, a risky pivot — and you need them to follow.",
    source: "Life of Alexander by Plutarch and The Campaigns of Alexander by Arrian",
    sourceAnchor:
      "Plutarch on the Gedrosian Desert; Arrian on Alexander leading the cavalry charge at Granicus",
    command: "/alexander:lead-from-front",
  },
  {
    slug: "decisive-point",
    figureSlug: "alexander",
    title: "Concentrate at the Decisive Point",
    tagline:
      "List every front. Identify the one whose win makes the rest moot. Concentrate force. Strike before they react. Refuse the diversion.",
    whenToUse:
      "You are spread across too many fronts, facing a competitor with more raw power, or struggling to focus.",
    source: "The Campaigns of Alexander by Arrian",
    sourceAnchor: "The Battle of Gaugamela, 331 BC",
    command: "/alexander:decisive-point",
  },

  // ───── Deutsch ─────
  {
    slug: "deutsch",
    figureSlug: "deutsch",
    title: "Channel Deutsch",
    tagline:
      "Examine the question's hidden assumptions. Test explanations by trying to vary them. Reject 'just so' stories. Apply the Principle of Optimism.",
    whenToUse:
      "Evaluating a theory, debating an interpretation, detecting bullshit, or paralyzed by the claim that something is just the way things are.",
    source: "The Beginning of Infinity by David Deutsch",
    command: "/deutsch:deutsch",
    umbrella: true,
  },
  {
    slug: "good-explanations",
    figureSlug: "deutsch",
    title: "Hard-to-Vary Explanations",
    tagline:
      "A good explanation is hard to vary while still accounting for what it explains. Test every detail by trying to swap it.",
    whenToUse:
      "Evaluating a theory, debating an interpretation, choosing between competing hypotheses, or detecting bullshit.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 1 (the seasons example: Persephone vs axial tilt)",
    command: "/deutsch:good-explanations",
  },
  {
    slug: "principle-of-optimism",
    figureSlug: "deutsch",
    title: "The Principle of Optimism",
    tagline:
      "All evils are caused by insufficient knowledge. All problems are soluble unless forbidden by physics.",
    whenToUse:
      "Paralysis from 'this is just how it is,' a problem someone declared impossible, or a moment of strategic pessimism.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 9 (Optimism)",
    command: "/deutsch:principle-of-optimism",
  },

  // ───── Lee Kuan Yew ─────
  {
    slug: "lee-kuan-yew",
    figureSlug: "lee-kuan-yew",
    title: "Channel Lee Kuan Yew",
    tagline:
      "Strip ideology. Run small reversible experiments. Steal what works. Pay competitively AND prosecute without exception. Think in decades.",
    whenToUse:
      "Making a decision through an ideological lens, designing incentives, hiring senior leadership, or fixing a culture where rules get bent quietly.",
    source: "From Third World to First by Lee Kuan Yew",
    command: "/lee-kuan-yew:lee-kuan-yew",
    umbrella: true,
  },
  {
    slug: "pragmatist-test",
    figureSlug: "lee-kuan-yew",
    title: "The Pragmatist Test",
    tagline:
      "Strip ideology. Ask only: does it work? Define 'works' with measurable specificity. Kill what isn't producing.",
    whenToUse:
      "You are debating a policy or strategy through an ideological lens (left/right, agile/waterfall, B2B/B2C orthodoxy) instead of through results.",
    source: "From Third World to First by Lee Kuan Yew",
    sourceAnchor: "The pragmatist doctrine across his three decades as Prime Minister",
    command: "/lee-kuan-yew:pragmatist-test",
  },
  {
    slug: "incorruptibility",
    figureSlug: "lee-kuan-yew",
    title: "The Incorruptibility Lock",
    tagline:
      "Pay competitively AND prosecute without exception. One lock without the other fails.",
    whenToUse:
      "Designing incentives, hiring senior leadership, setting conflict-of-interest policy, or fixing a culture where rules get bent quietly.",
    source: "From Third World to First by Lee Kuan Yew",
    sourceAnchor: "Chapters 13–15 — the Corrupt Practices Investigation Bureau",
    command: "/lee-kuan-yew:incorruptibility",
  },

  // ───── Marcus Aurelius ─────
  {
    slug: "marcus-aurelius",
    figureSlug: "marcus-aurelius",
    title: "Channel Marcus Aurelius",
    tagline:
      "Apply the dichotomy of control. Take the view from above. Hold mortality close. The body is not you. Premeditate the friction of the day.",
    whenToUse:
      "Anxious, stuck in resentment, wrestling with mortality or vanity, ruminating about what others think, troubled by the body, or asking what to do today.",
    source: "Meditations by Marcus Aurelius",
    command: "/marcus-aurelius:marcus-aurelius",
    umbrella: true,
  },
  {
    slug: "dichotomy-of-control",
    figureSlug: "marcus-aurelius",
    title: "The Dichotomy of Control",
    tagline:
      "Split the situation into what's up to you (judgments, intentions, responses) and what isn't (everything else). Withdraw your peace from the second pile.",
    whenToUse:
      "Anxiety, resentment, or spiraling about an outcome, another person, the past, or anything you can't directly move.",
    source: "Meditations by Marcus Aurelius",
    sourceAnchor: "Book 9.6 and Book 12.26 (the dichotomy, from Epictetus)",
    command: "/marcus-aurelius:dichotomy-of-control",
  },
  {
    slug: "view-from-above",
    figureSlug: "marcus-aurelius",
    title: "The View From Above",
    tagline:
      "Zoom out to the scale of a life, a species, an age — until the emergency is one dot in a vast ordered thing.",
    whenToUse:
      "Catastrophizing, status panic, an offense that feels enormous, or a decision distorted by being too close to it.",
    source: "Meditations by Marcus Aurelius",
    sourceAnchor: "Book 7.48 and Book 9.30 (the cosmic perspective)",
    command: "/marcus-aurelius:view-from-above",
  },
  {
    slug: "memento-mori",
    figureSlug: "marcus-aurelius",
    title: "Memento Mori as a Priority Filter",
    tagline:
      "If I might be dead by evening, does this still deserve this much of me? Most grievances don't survive the question.",
    whenToUse:
      "Procrastination, trivial grievances, over-investing in things that won't matter, or losing the thread of what's important.",
    source: "Meditations by Marcus Aurelius",
    sourceAnchor: "Book 2.11 and Book 4.17",
    command: "/marcus-aurelius:memento-mori",
  },
];

/** Get all skills attached to a particular figure (by figure slug). */
export function getSkillsForFigure(figureSlug: string): Skill[] {
  return skills.filter((s) => s.figureSlug === figureSlug);
}

/** Get a single skill by its slug + figureSlug — slugs can now repeat across plugins. */
export function getSkill(figureSlug: string, slug: string): Skill | undefined {
  return skills.find((s) => s.figureSlug === figureSlug && s.slug === slug);
}

/** Public GitHub URL where Claude Code resolves the plugin's SKILL.md. */
export function skillGithubUrl(figureSlug: string, slug: string): string {
  return `https://github.com/adamtpang/summon.guide/blob/main/plugins/${figureSlug}/skills/${slug}/SKILL.md`;
}

/** Plugin install command for a guide. */
export function pluginInstallCommands(figureSlug: string): string[] {
  return [
    "/plugin marketplace add adamtpang/summon.guide",
    `/plugin install ${figureSlug}`,
  ];
}
