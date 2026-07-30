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
// The umbrella skill for each plugin shares the plugin's name, 
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
  /** which figure (figures.ts slug) this skill belongs to, also the plugin name */
  figureSlug: string;
  /** human title shown on the website */
  title: string;
  /** one-line "what this skill does", the long form of the frontmatter description */
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
  /** life-problem themes this skill answers, most relevant first. The first
   *  entry is the skill's primary home in the library. See THEMES. */
  themes?: Theme[];
  /** one line in the USER's voice describing the moment they'd need this.
   *  Feeds the router, and reads better than a feature description. */
  problemHint?: string;
}

/**
 * The life-problem taxonomy. A person arrives with a problem, not with the
 * name of a framework, so the library is organised by what is wrong rather
 * than by who said it.
 */
export const THEMES = {
  deciding: "hard calls, decisions under uncertainty, choosing between options",
  starting: "beginning something, validating an idea, the first version",
  focus: "attention, saying no, cutting scope, prioritization",
  money: "pricing, capital, unit economics, cost discipline",
  selling: "persuasion, customers, deals, negotiation",
  building: "product, craft, engineering, making the thing",
  marketing: "positioning, brand, attention, messaging",
  leading: "teams, hiring, culture, managing people",
  persisting: "failure, setbacks, endurance, rejection",
  thinking: "mental models, first principles, learning, clear reasoning",
  risk: "fragility, downside, ruin, protecting yourself",
  growth: "scaling, distribution, compounding, going bigger",
  meaning: "purpose, happiness, life direction, what matters",
  conflict: "adversaries, criticism, hard conversations, standing your ground",
  self: "discipline, habits, character, self-command",
} as const;

export type Theme = keyof typeof THEMES;

export const ALL_THEMES = Object.keys(THEMES) as Theme[];

export const skills: Skill[] = [
  // ───── Rockefeller ─────
  {
    slug: "rockefeller",
    themes: ["money","self","risk"],
    problemHint:
      "Money keeps coming in but I have no system and no idea if any of it is actually profit.",
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
    themes: ["money","self"],
    problemHint:
      "I have no idea where my money actually goes each month.",
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
    themes: ["risk","money","growth"],
    problemHint:
      "Everything is crashing and I cannot tell if I should hide or start buying.",
    figureSlug: "rockefeller",
    title: "Crisis as Opportunity",
    tagline:
      "Buy when blood runs in the streets. Pre-commit your buy list. Move generously, execute ruthlessly.",
    whenToUse:
      "A market panic, downturn, layoff wave, or competitor collapse, and you have cash, conviction, or both.",
    source: "Titan by Ron Chernow",
    sourceAnchor: "Chapter 12 (Panic of 1873) and Chapter 6 (Cleveland Massacre)",
    command: "/rockefeller:crisis",
  },

  // ───── Franklin ─────
  {
    slug: "franklin",
    themes: ["self","selling","leading"],
    problemHint:
      "I keep saying I will get my act together and then nothing actually changes.",
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
    themes: ["self"],
    problemHint:
      "I know exactly which habit is wrecking me and I still cannot make the fix stick.",
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
    themes: ["leading","self"],
    problemHint:
      "Nobody around me pushes me and I want a real circle of people who do.",
    figureSlug: "franklin",
    title: "Build a Junto",
    tagline:
      "12 people, Friday evenings, fixed agenda, one tangible artifact. Compounds for life.",
    whenToUse:
      "Starting a mastermind, founders circle, weekly dinner, study group, or any structured peer-improvement society.",
    source: "Benjamin Franklin: An American Life by Walter Isaacson",
    sourceAnchor: "Chapter 5: Franklin's Junto society, founded 1727",
    command: "/franklin:junto",
  },

  // ───── Elon ─────
  {
    slug: "elon",
    themes: ["building","thinking","focus"],
    problemHint:
      "I was told this takes a year and costs a fortune and I do not believe it.",
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
    themes: ["thinking","money"],
    problemHint:
      "The vendor says this is just what it costs and I want to know if that is true.",
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
    themes: ["building","focus"],
    problemHint:
      "Our process has grown into a monster and everything takes three times longer than it should.",
    figureSlug: "elon",
    title: "Five-Step Algorithm",
    tagline:
      "Question, delete, simplify, accelerate, automate, in that order. The order is the algorithm.",
    whenToUse:
      "Simplifying a workflow, killing process bloat, speeding up cycle time, or rebuilding an operation from scratch.",
    source: "Elon Musk by Walter Isaacson",
    sourceAnchor: "Chapter 30 (Musk's manufacturing algorithm, articulated to Tesla and SpaceX teams)",
    command: "/elon:five-step-algorithm",
  },
  {
    slug: "idiot-index",
    themes: ["money","deciding"],
    problemHint:
      "This part costs way more than the material inside it and I want to know why.",
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
    themes: ["leading","focus","conflict"],
    problemHint:
      "I am leading people into something genuinely hard and I am not sure they will follow me.",
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
    themes: ["leading"],
    problemHint:
      "I am about to ask my team for a big sacrifice and I know it will sound hollow coming from me.",
    figureSlug: "alexander",
    title: "Lead From the Front",
    tagline:
      "Share the privation you ask of your team. Find your helmet-of-water gesture. Be wounded in their direction.",
    whenToUse:
      "You are asking the team to absorb something hard (late nights, a pay cut, a risky pivot) and you need them to follow.",
    source: "Life of Alexander by Plutarch and The Campaigns of Alexander by Arrian",
    sourceAnchor:
      "Plutarch on the Gedrosian Desert; Arrian on Alexander leading the cavalry charge at Granicus",
    command: "/alexander:lead-from-front",
  },
  {
    slug: "decisive-point",
    themes: ["focus","conflict"],
    problemHint:
      "I am fighting on five fronts at once and slowly losing all of them.",
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
    themes: ["thinking","persisting"],
    problemHint:
      "Someone gave me an explanation that sounds smart and I cannot tell if it is real.",
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
    themes: ["thinking","deciding"],
    problemHint:
      "Two people gave me opposite theories and both of them sound convincing.",
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
    themes: ["persisting","thinking"],
    problemHint:
      "Everyone keeps telling me this problem is just unsolvable and I am starting to believe them.",
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
    themes: ["leading","thinking","deciding"],
    problemHint:
      "We are arguing about principles when I just want to know what will actually work.",
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
    themes: ["thinking","deciding"],
    problemHint:
      "This debate turned into ideology and nobody is asking whether the thing works.",
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
    themes: ["leading","risk"],
    problemHint:
      "People here quietly bend the rules and I do not know how to stop it without a witch hunt.",
    figureSlug: "lee-kuan-yew",
    title: "The Incorruptibility Lock",
    tagline:
      "Pay competitively AND prosecute without exception. One lock without the other fails.",
    whenToUse:
      "Designing incentives, hiring senior leadership, setting conflict-of-interest policy, or fixing a culture where rules get bent quietly.",
    source: "From Third World to First by Lee Kuan Yew",
    sourceAnchor: "Chapters 13–15: the Corrupt Practices Investigation Bureau",
    command: "/lee-kuan-yew:incorruptibility",
  },

  // ───── Marcus Aurelius ─────
  {
    slug: "marcus-aurelius",
    themes: ["self","meaning","persisting"],
    problemHint:
      "I am anxious about things I cannot control and it is eating my whole day.",
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
    themes: ["self","persisting"],
    problemHint:
      "I keep replaying something in my head that I cannot do anything about.",
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
    themes: ["self","meaning"],
    problemHint:
      "Something small happened and it feels like the end of the world.",
    figureSlug: "marcus-aurelius",
    title: "The View From Above",
    tagline:
      "Zoom out to the scale of a life, a species, an age: until the emergency is one dot in a vast ordered thing.",
    whenToUse:
      "Catastrophizing, status panic, an offense that feels enormous, or a decision distorted by being too close to it.",
    source: "Meditations by Marcus Aurelius",
    sourceAnchor: "Book 7.48 and Book 9.30 (the cosmic perspective)",
    command: "/marcus-aurelius:view-from-above",
  },
  {
    slug: "memento-mori",
    themes: ["focus","meaning"],
    problemHint:
      "I am spending my best hours on things that will not matter in a year.",
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

  // ───── Marc Andreessen ─────
  {
    slug: "marc-andreessen",
    themes: ["building","starting","thinking"],
    problemHint:
      "I want to build something big and I cannot decide where to point it.",
    figureSlug: "marc-andreessen",
    title: "Channel Marc Andreessen",
    tagline:
      "Software is eating the world. It's time to build. Strong opinions, loosely held. Read the wave you're in and push faster.",
    whenToUse:
      "Deciding what to build, evaluating a startup or investment thesis, choosing how to think about a regulated incumbent industry, or fighting the pessimism that says technology can't make things better.",
    source: "Marc's essays at a16z.com (2011–2023)",
    command: "/marc-andreessen:marc-andreessen",
    umbrella: true,
  },
  {
    slug: "software-eats-the-world",
    themes: ["starting","thinking","growth"],
    problemHint:
      "This industry feels ancient and slow and I want to know if it is actually takeable.",
    figureSlug: "marc-andreessen",
    title: "Software Eats the World",
    tagline:
      "Identify the industries where the durable winner will be a software company. The incumbents' advantages are in the wrong currency.",
    whenToUse:
      "Picking what to build, evaluating an incumbent industry for disruption, or assessing whether your own company is the new-wave or old-wave entrant in your category.",
    source:
      "“Why Software Is Eating the World” by Marc Andreessen (WSJ, August 20, 2011)",
    command: "/marc-andreessen:software-eats-the-world",
  },
  {
    slug: "its-time-to-build",
    themes: ["starting","building"],
    problemHint:
      "I have been researching and complaining for months and I still have not built anything.",
    figureSlug: "marc-andreessen",
    title: "It's Time to Build",
    tagline:
      "Replace “what's wrong” with “what do we build to fix it, and what is stopping the build?” Bias to action against analysis paralysis.",
    whenToUse:
      "Stuck in analysis, complaining about a problem, or watching an institution fail to do something obvious. Especially in regulated or “mature” sectors that have stopped shipping.",
    source: "“It's Time to Build” by Marc Andreessen (a16z.com, April 18, 2020)",
    command: "/marc-andreessen:its-time-to-build",
  },
  {
    slug: "techno-optimism",
    themes: ["deciding","thinking"],
    problemHint:
      "Everyone around me says this is too risky to try and I think they are just scared.",
    figureSlug: "marc-andreessen",
    title: "Techno-Optimism as an Operating Philosophy",
    tagline:
      "Treat capability as the goal. Distrust framings that lower capability under the pretense of safety. Pessimism is fashionable and almost always wrong about technology over a 10-year window.",
    whenToUse:
      "When pessimism, doom narratives, or institutional caution are framing a decision that should be evaluated on whether it raises or lowers capability.",
    source:
      "“The Techno-Optimist Manifesto” by Marc Andreessen (a16z.com, October 16, 2023)",
    command: "/marc-andreessen:techno-optimism",
  },

  // ───── Adam Neumann ─────
  {
    slug: "adam-neumann",
    themes: ["marketing","money","risk"],
    problemHint:
      "My story is way ahead of my numbers and I am not sure how long that can last.",
    figureSlug: "adam-neumann",
    title: "Channel Adam Neumann",
    tagline:
      "Mission compresses the round. Tribe before scale. Make the feeling of the product as carefully as the function. Watch unit economics or the story turns on you.",
    whenToUse:
      "Building a brand, raising a story-led round, designing a community product, or stress-testing whether your narrative is a moat or a hallucination.",
    source:
      "Billion Dollar Loser (Wiedeman) + The Cult of We (Brown & Farrell)",
    command: "/adam-neumann:adam-neumann",
    umbrella: true,
  },
  {
    slug: "mission-as-moat",
    themes: ["marketing","selling"],
    problemHint:
      "My product is basically the same as everyone else's and I need a reason people pick me.",
    figureSlug: "adam-neumann",
    title: "Mission as Moat",
    tagline:
      "A commodity product wrapped in a real mission becomes a brand. The framing is the moat. Anti-pattern: a fake mission wrapped in marketing gloss is not.",
    whenToUse:
      "When your product is commoditized on paper and you need a defensible differentiator, or when you suspect competitors are out-narrating you.",
    source: "Billion Dollar Loser by Reeves Wiedeman",
    sourceAnchor: "Chapters 3–6 (the early WeWork pitch)",
    command: "/adam-neumann:mission-as-moat",
  },
  {
    slug: "narrative-arbitrage",
    themes: ["money","selling","risk"],
    problemHint:
      "I am raising on a vision because the numbers are not there yet.",
    figureSlug: "adam-neumann",
    title: "Narrative Arbitrage in Fundraising",
    tagline:
      "Story compresses the round, a great narrative does the work a hundred meetings would. Anti-pattern: every dollar raised on narrative carries an IOU to the next round. If economics don't catch up, the lever you pulled becomes the lever pulled on you.",
    whenToUse:
      "Raising a round where the unit economics are nascent and you need to sell the future, or evaluating a competitor's pitch you suspect is narrative-only.",
    source: "The Cult of We by Eliot Brown and Maureen Farrell",
    sourceAnchor: "Chapters 8–11 (Masayoshi Son and the WeWork raise)",
    command: "/adam-neumann:narrative-arbitrage",
  },
  {
    slug: "s1-reality-check",
    themes: ["money","risk"],
    problemHint:
      "If a stranger read my actual numbers I do not think the story would survive.",
    figureSlug: "adam-neumann",
    title: "The S-1 Reality Check",
    tagline:
      "Run the test on your company today: if a stranger had to read your numbers in an S-1, would the story survive? Public reading is a different lens than private storytelling.",
    whenToUse:
      "Pre-IPO companies, late-stage startups raising on private narratives, or any company whose growth has outrun its ability to explain unit economics to a hostile reader.",
    source:
      "The Cult of We by Eliot Brown and Maureen Farrell; WeWork S-1 (Aug 14, 2019)",
    sourceAnchor: "Chapters 12–15 (the six weeks between filing and ouster)",
    command: "/adam-neumann:s1-reality-check",
  },

  // ───── Seneca ─────
  {
    slug: "seneca",
    themes: ["self","meaning"],
    problemHint:
      "I am busy every single day and somehow have nothing to show for the year.",
    figureSlug: "seneca",
    title: "Channel Seneca",
    tagline:
      "Time is the one currency you cannot earn back. Anger is a brief madness, delay is the cure. Withdraw to find yourself. Recover the time you call lost. Begin at once to live.",
    whenToUse:
      "Wrestling with how time is being spent, working through anger you don't want to be governed by, navigating a court (corporate or political) where flattery is expected, or designing a personal practice you can sustain.",
    source: "Letters from a Stoic + On the Shortness of Life + On Anger",
    command: "/seneca:seneca",
    umbrella: true,
  },
  {
    slug: "on-the-shortness-of-life",
    themes: ["meaning","focus"],
    problemHint:
      "Another year went by and I cannot say what I spent it on.",
    figureSlug: "seneca",
    title: "On the Shortness of Life",
    tagline:
      "Life is long enough if well invested. We make it short by selling it cheaply, hour by hour, to projects we have not chosen. Audit the hours.",
    whenToUse:
      "Stuck in a routine you didn't pick, postponing the real work until 'later,' or watching a year pass without being able to say what you spent it on.",
    source: "De Brevitate Vitae (On the Shortness of Life) by Seneca",
    sourceAnchor: "§§ 1–3 and 7–10 (the audit of how time is wasted)",
    command: "/seneca:on-the-shortness-of-life",
  },
  {
    slug: "letters-from-a-stoic",
    themes: ["self","thinking"],
    problemHint:
      "I want a daily practice that sticks instead of another journal I abandon in a week.",
    figureSlug: "seneca",
    title: "Letters from a Stoic: Daily Practice",
    tagline:
      "One letter a day to yourself: pick one idea, work it out in writing, and end with what you will actually do about it. The Stoic technology Seneca used for three years on Lucilius works on you.",
    whenToUse:
      "Designing a personal philosophy practice that survives more than a week, building a journaling habit that produces decisions instead of feelings, or wanting to study a tradition by walking it daily instead of reading about it.",
    source: "Epistulae Morales ad Lucilium (Letters to Lucilius) by Seneca",
    sourceAnchor: "Letters 1, 7, 16, 26, 47 (representative practical letters)",
    command: "/seneca:letters-from-a-stoic",
  },
  {
    slug: "on-anger",
    themes: ["self","conflict"],
    problemHint:
      "I am furious and about to send something I will regret.",
    figureSlug: "seneca",
    title: "On Anger, The Cool Path",
    tagline:
      "Anger is brief madness. The best remedy is delay. Beg yourself this favor: do not execute what your anger urges. Do something else first.",
    whenToUse:
      "Triggered by a message, a meeting, or a person, and about to respond from the trigger rather than from your considered judgment. Or designing protocols (for yourself or a team) that put time between provocation and reaction.",
    source: "De Ira (On Anger) by Seneca",
    sourceAnchor: "Book I §§ 1–7 and Book II §§ 28–29 (the daily examination)",
    command: "/seneca:on-anger",
  },
  {
    "slug": "ricky-gervais",
    "themes": ["building","conflict"],
    "problemHint":
      "I am trying to be funny about something real and I do not know how far I can push it.",
    "figureSlug": "ricky-gervais",
    "title": "Ricky Gervais",
    "tagline": "Find the funny in the true, commit to the character, and take the hit for a joke you'd make again.",
    "whenToUse": "Summon Ricky Gervais's full comedic operating system: making something funny without making it false, building a character whose blind spot is the joke, deciding whether an offensive bit should be cut or kept, wrestling with cringe and awkward-comedy premises, workshopping stand-up toward a tight hour, or defending a joke that got a reaction you didn't intend.",
    "source": "The Office, After Life, and the Netflix stand-up specials (Humanity, SuperNature, Armageddon, Mortality)",
    "command": "/ricky-gervais:ricky-gervais",
    "umbrella": true
  },
  {
    "slug": "stand-up-writing",
    "themes": ["building","focus"],
    "problemHint":
      "I have a pile of funny observations and no idea how to turn them into a set.",
    "figureSlug": "ricky-gervais",
    "title": "Stand-Up Writing",
    "tagline": "Write stand-up from honest observation: premise, act-out, tag, tested live.",
    "whenToUse": "Use when the user has a rough idea, a bit that isn't landing, a pile of observations that won't cohere, a set that runs long or sags, or a taboo subject they want to be funny about without being merely shocking. Also for finding a persona and point of view, structuring a tight hour, deciding what to cut, and editing lines down to the laugh.",
    "source": "Ricky Gervais's stand-up specials and stated method (Animals, Politics, Fame, Science, Humanity, SuperNature, Armageddon, Mortality) plus interviews on writing by incubation and touring a work-in-progress hour to iron out the kinks before taping.",
    "sourceAnchor": "the-talks.com/interview/ricky-gervais/ ; nofilmschool.com/screenwriting-tips-ricky-gervais ; en.wikipedia.org/wiki/Ricky_Gervais",
    "command": "/ricky-gervais:stand-up-writing"
  },
  {
    "slug": "the-offence-principle",
    "themes": ["conflict","building"],
    "problemHint":
      "People called my joke offensive and I cannot tell if they are right or just reacting.",
    "figureSlug": "ricky-gervais",
    "title": "The Offence Principle: Writing Taboo & Handling Offence",
    "tagline": "Offence is the collateral damage of free speech, so the question is never whether it offends, but what the joke is actually about and what it actually attacks.",
    "whenToUse": "Use when writing a joke, bit, sketch, or satire that touches a taboo or sensitive subject and you want to know whether it holds up, or when something's been called 'offensive' and you need to tell a real craft fault from a mere reaction. Covers subject vs. target, irony vs. endorsement, the comedian's voice vs. a character's, intent and defensibility, and edgy-for-shock vs. edgy-with-a-point.",
    "source": "Ricky Gervais's stated positions on free speech and offence: 'Offence is the collateral damage of free speech' (Twitter/X, 1 Sep 2014), the subject-vs-target distinction and irony defence of SuperNature (BBC The One Show, Deadline, The Spectator, May 2022), and 'the truth is more devastating than a lie' (The Talks).",
    "sourceAnchor": "'Most offence comes from when people mistake the subject of a joke with the actual target': SuperNature defence, 2022",
    "command": "/ricky-gervais:the-offence-principle"
  },
  {
    "slug": "cringe-and-character",
    "themes": ["building"],
    "problemHint":
      "The jokes land but nobody cares about the people in my story.",
    "figureSlug": "ricky-gervais",
    "title": "Cringe & Character: The David Brent Method",
    "tagline": "Make them laugh at someone they love, comedy from the gap between how a character sees themselves and how the world sees them.",
    "whenToUse": "Use when writing a comedy character, sitcom, mockumentary, or cringe scene that lives on someone deluding themselves in public. Also when jokes land but no one cares about the people, when a show gets laughs but has no heart, or when a 'cringe' scene reads as cruelty instead of funny-and-sad.",
    "source": "Ricky Gervais's work on The Office (2001–2003), Extras, Derek, and After Life (2019–2022), and his stated craft: make the ordinary extraordinary, find the funny in the true, and pair pathos with a character's blind spot.",
    "sourceAnchor": "David Brent, The Office (UK); Tony Johnson, After Life",
    "command": "/ricky-gervais:cringe-and-character"
  },
  {
    "slug": "marie-curie",
    "themes": ["persisting","thinking","self"],
    "problemHint":
      "The problem in front of me is huge and boring and honestly it scares me.",
    "figureSlug": "marie-curie",
    "title": "Marie Curie",
    "tagline": "Understand rather than fear: measure it, grind it, weigh it, give it away.",
    "whenToUse": "Summon Marie Skłodowska-Curie's full operating mindset into the current chat. Use whenever the user is standing before something they do not understand and are tempted to fear it, facing an intractable problem that will yield only to years of unglamorous physical work, drowning in qualitative impressions where an exact measurement would cut through, or deciding what to do with recognition, credit, or money that the work has produced. Channels her method (replace fear with comprehension, grind the problem into a physical process, let measurement lead, give the work away) as one operating philosophy, addressed to a peer at the bench rather than a student in a lecture hall.",
    "source": "Marie Curie, Pierre Curie (1923) and Autobiographical Notes; her 1903 doctoral thesis Recherches sur les substances radioactives; and Ève Curie, Madame Curie: A Biography (1937).",
    "command": "/marie-curie:marie-curie",
    "umbrella": true
  },
  {
    "slug": "the-isolation-method",
    "themes": ["thinking","persisting"],
    "problemHint":
      "There is one real signal buried in all this noise and I cannot get to it.",
    "figureSlug": "marie-curie",
    "title": "The Isolation Method",
    "tagline": "Turn an intractable question into a relentless, well-instrumented physical process, and grind it, measuring every batch, until the thing is in your hand and can be weighed.",
    "whenToUse": "Use for a hard extraction, purification, or long-horizon problem: finding the one real signal buried in a mountain of noise, isolating a single true cause from a confounded mess, separating what matters from what merely surrounds it, any task where the answer exists but is dilute, and the only path is a repeatable process measured batch by batch until the target is isolated, weighed, and in hand.",
    "source": "Marie Curie's isolation of radium (1898–1902); her doctoral thesis Recherches sur les substances radioactives (1903); Ève Curie, Madame Curie: A Biography (1937).",
    "sourceAnchor": "Isolation of ~0.1 g pure radium chloride from several tons of pitchblende via the piezoelectric-quartz electrometer and fractional crystallization; radium-isolation method published without patent.",
    "command": "/marie-curie:the-isolation-method"
  },
  {
    "slug": "nothing-to-be-feared",
    "themes": ["persisting","self"],
    "problemHint":
      "I keep avoiding something because I am scared to look at it properly.",
    "figureSlug": "marie-curie",
    "title": "Nothing to Be Feared",
    "tagline": "Convert fear into understanding, then into the next small step.",
    "whenToUse": "When the user is frozen by something they have not yet looked at squarely (a diagnosis, a scary technical problem, a decision, a confrontation, a grief) and is reacting to the vague shape of it rather than the thing itself. Also when they need to keep working through genuine adversity or grief without drama.",
    "source": "Theme most associated with Marie Curie ('Nothing in life is to be feared, it is only to be understood...'), grounded in her verified method and life; see Ève Curie, Madame Curie: A Biography (1937).",
    "sourceAnchor": "On fear, understanding, and endurance",
    "command": "/marie-curie:nothing-to-be-feared"
  },
  {
    "slug": "science-not-self",
    "themes": ["self","meaning"],
    "problemHint":
      "I am starting to care more about getting credit than about the work itself.",
    "figureSlug": "marie-curie",
    "title": "Science, Not Self",
    "tagline": "Keep ego, credit, and money from corrupting the work: optimize for the truth, not your standing.",
    "whenToUse": "When deciding whether to patent, protect, or freely give away work; when status, credit, or recognition start steering decisions that should be steered by the truth; when public noise, scandal, or reputation-management pulls attention off the actual problem; or when measuring yourself by what you have done rather than what remains to be done.",
    "source": "Marie Curie's and Pierre's deliberate refusal to patent the radium-isolation process (published freely so any lab could produce radium), her recorded reasoning that radium 'belongs to all people,' and her documented indifference to fame and money through the 1911 press scandal.",
    "sourceAnchor": "Marie Curie, letter to her brother Józef (1894); Ève Curie, Madame Curie: A Biography (1937).",
    "command": "/marie-curie:science-not-self"
  },
  {
    "slug": "bob-marley",
    "themes": ["persisting","meaning","conflict"],
    "problemHint":
      "I got knocked down hard and I am trying not to turn bitter about it.",
    "figureSlug": "bob-marley",
    "title": "Channel Bob Marley",
    "tagline": "Turn suffering into a reason to show up. Free your own mind first. Stand up for what's right now, not someday. Answer division with one love, not revenge. Give your one gift to something bigger. Meet hardship with faith, not bitterness.",
    "whenToUse": "Knocked down by a setback and tempted to quit, caged by a limiting belief or someone else's definition of you, sitting on an injustice you keep meaning to act on, caught in a conflict or rivalry you could escalate or heal, or searching for the one gift that is yours to give in service of something bigger than yourself.",
    "source": "Bob Marley's songs, life, and documented interviews: Redemption Song, Get Up Stand Up, and One Love; the December 1976 assassination attempt and Smile Jamaica; the 1978 One Love Peace Concert",
    "command": "/bob-marley:bob-marley",
    "umbrella": true
  },
  {
    "slug": "redemption-song",
    "themes": ["self","meaning"],
    "problemHint":
      "I keep telling myself I am not the kind of person who does things like this.",
    "figureSlug": "bob-marley",
    "title": "Redemption Song, Free Your Own Mind",
    "tagline": "Emancipate yourself from mental slavery. The first prison to break is the one in your own head. Name the mental chain, find whose voice it really is, reject the borrowed definition, and choose your own ground.",
    "whenToUse": "You're held back not by an outside obstacle but by an inside one: a limiting belief, someone else's definition of you, a box you never chose ('people like me don't,' 'I could never,' 'I'm not that kind of person'). Also when you're fighting an external battle while still wearing an internal chain.",
    "source": "Bob Marley, 'Redemption Song' (Uprising, 1980), adapting Marcus Garvey's 1937 speech",
    "sourceAnchor": "'Emancipate yourselves from mental slavery; none but ourselves can free our minds', recorded when Marley was already terminally ill, stripped to voice and acoustic guitar; the line adapts Marcus Garvey's speech at Menelik Hall, Nova Scotia, 31 October 1937",
    "command": "/bob-marley:redemption-song"
  },
  {
    "slug": "get-up-stand-up",
    "themes": ["conflict","starting"],
    "problemHint":
      "Something wrong is happening and I keep waiting for a better time to say it.",
    "figureSlug": "bob-marley",
    "title": "Get Up, Stand Up: Act Now",
    "tagline": "Stand up for what's right, and act now: not someday, not when it's safe, not when someone else moves first. Name the wrong, refuse the 'someday,' use the gift you already have, and take the first public step today.",
    "whenToUse": "You see an injustice or a wrong (at work, in your community, in your own life) and you keep waiting: for a better time, for more authority, for someone else to go first, or for a reward that never comes. Turn conviction into action today.",
    "source": "Bob Marley & Peter Tosh, 'Get Up, Stand Up' (Burnin', 1973); Marley playing Smile Jamaica two days after being shot, December 1976",
    "sourceAnchor": "'Get up, stand up, stand up for your right', the song's rejection of waiting for a reward 'someday'; and 'the people who are trying to make this world worse aren't taking a day off, how can I?' on performing at Smile Jamaica, 5 December 1976",
    "command": "/bob-marley:get-up-stand-up"
  },
  {
    "slug": "one-love",
    "themes": ["conflict","leading"],
    "problemHint":
      "This feud keeps escalating and part of me wants revenge more than peace.",
    "figureSlug": "bob-marley",
    "title": "One Love: Unity Over Revenge",
    "tagline": "Answer division with the one thing you still share, not with revenge. Take retaliation off the table, find the shared ground, make the first gesture, hold both the wrong and the unity, and build a together that lasts.",
    "whenToUse": "De-escalating a conflict, rivalry, or feud (family, team, business, community) that you could either escalate or heal. Especially when you've been wronged and revenge is tempting.",
    "source": "Bob Marley, 'One Love / People Get Ready' (Exodus, 1977); the One Love Peace Concert, Kingston, 22 April 1978",
    "sourceAnchor": "After surviving the December 1976 assassination attempt, Marley joined the hands of rival leaders Michael Manley (PNP) and Edward Seaga (JLP) on stage during 'Jamming' at the One Love Peace Concert, 22 April 1978",
    "command": "/bob-marley:one-love"
  },
  // ----- Tobi Lütke -----
  {
    slug: "own-axioms",
    themes: ["thinking","building"],
    problemHint:
      "I am running a competitor's playbook and it does not even fit my business.",
    figureSlug: "tobi-lutke",
    title: "Build From Your Own Axioms",
    tagline:
      "Rederive a company, product, or decision from your own axioms instead of copying an industry playbook.",
    whenToUse:
      "When the user is imitating a competitor, running a borrowed playbook, or performing the role their title is supposed to require.",
    source: "Tobi Lütke: 21 Years of Building Shopify, his conversation with David Senra on the Founders interview show, plus his own essays.",
    sourceAnchor: "content/knowledge/interviews/011-tobi-l-tke-21-years-of-building-shopify.md",
    command: "/tobi-lutke:own-axioms",
  },
  // ----- Todd Graves -----
  {
    slug: "one-thing-well",
    themes: ["focus","building","money"],
    problemHint:
      "I want to add more products when the one I already have is not great yet.",
    figureSlug: "todd-graves",
    title: "One Thing Well",
    tagline:
      "Do one thing better than anyone alive, keep control of it, and let service pull the money in behind you.",
    whenToUse:
      "Use when the user is tempted to add a second product line, expand the menu, take a dilutive round, franchise or sell the company, chase margin over service, or diversify instead of getting devastatingly good at the one thing customers actually come back for. Also use when deciding what to refuse, what detail to obsess over next, or how to keep ownership and control through a downturn.",
    source: "Todd Graves in conversation with David Senra on the Founders interview show, published 2025-11-09.",
    sourceAnchor: "content/knowledge/interviews/019-how-todd-graves-built-raising-canes.md",
    command: "/todd-graves:one-thing-well",
  },
  // ----- John Mackey -----
  {
    slug: "missionary-not-mercenary",
    themes: ["money","meaning","growth"],
    problemHint:
      "A bigger rival is undercutting my price and I am about to race them to the bottom.",
    figureSlug: "john-mackey",
    title: "Missionary, Not Mercenary",
    tagline:
      "Build for the mission, refuse the price war, compound in a niche nobody is watching, and turn rivals into allies.",
    whenToUse:
      "Use when the user is about to fight a bigger, lower-cost rival on price, when a co-founder or investor wants to harvest a comfortable business instead of build a mission, when the user needs to pick a niche defensible enough to compound in quietly, or when they treat every peer in their category as a threat rather than a potential ally.",
    source: "John Mackey in conversation with David Senra on the Founders interview show (44 Years of Building Whole Foods), and his book \"Conscious Capitalism\" (2013).",
    sourceAnchor: "content/knowledge/interviews/023-john-mackey-44-years-of-building-whole-foods.md",
    command: "/john-mackey:missionary-not-mercenary",
  },
  // ----- Jimmy Iovine -----
  {
    slug: "empathy-at-scale",
    themes: ["marketing","selling","conflict"],
    problemHint:
      "My copy lists features and nobody feels anything when they read it.",
    figureSlug: "jimmy-iovine",
    title: "Empathy at Scale",
    tagline:
      "Marketing is empathy at scale. Attach yourself to the very best people, then earn the room by telling them the brutal truth.",
    whenToUse:
      "Use when positioning or launching a product, writing copy that lists features instead of feelings, deciding who to work with or for, sitting in a room where everyone agrees with you, or holding back hard feedback you are afraid to deliver.",
    source: "Jimmy Iovine's conversation with David Senra on the Founders interview show",
    sourceAnchor: "content/knowledge/interviews/006-jimmy-iovine-building-interscope-records-beats-by-dre.md",
    command: "/jimmy-iovine:empathy-at-scale",
  },
  // ----- Daniel Ek -----
  {
    slug: "impact-over-happiness",
    themes: ["meaning","deciding"],
    problemHint:
      "I keep asking which path would make me happy and getting nowhere.",
    figureSlug: "daniel-ek",
    title: "Impact Over Happiness",
    tagline:
      "Aim at the biggest problem worth a decade of your life. Happiness is the readout, not the lever.",
    whenToUse:
      "Use when choosing between career paths or projects, when the question has become 'what would make me happy', when the work is easy but small, or when someone is copying another founder's playbook instead of building something true to who they actually are.",
    source: "Daniel Ek in conversation with David Senra on the Founders interview show, 2025",
    sourceAnchor: "content/knowledge/interviews/009-daniel-ek-spotify-david-senra.md",
    command: "/daniel-ek:impact-over-happiness",
  },
  // ----- Evan Spiegel -----
  {
    slug: "hard-to-copy",
    themes: ["building","conflict","growth"],
    problemHint:
      "A much bigger competitor just cloned my main feature.",
    figureSlug: "evan-spiegel",
    title: "Hard to Copy",
    tagline:
      "There is no moat in software, so invest only in what a competitor cannot clone in a quarter.",
    whenToUse:
      "Use when a bigger competitor is copying you or about to, when deciding where the next quarter of engineering goes, when defending a feature list as if it were a moat, or when the roadmap is full of surface polish and nothing durable. Runs a ninety day clone test over every feature and asset, sorts what survives into network effects, owned hardware, distribution and ecosystem, or vision plus delivery record, then moves budget and headcount into the hard column.",
    source: "Evan Spiegel in conversation with David Senra on the Founders interview show, \"Evan Spiegel, Snapchat: Building a Multi-Billion Dollar Company\"",
    sourceAnchor: "content/knowledge/interviews/018-evan-spiegel-snapchat-building-a-multi-billion-dollar-compan.md",
    command: "/evan-spiegel:hard-to-copy",
  },
  // ----- James Dyson -----
  {
    slug: "dogged-iteration",
    themes: ["persisting","building"],
    problemHint:
      "I have failed at this the same way a dozen times and I am ready to quit.",
    figureSlug: "james-dyson",
    title: "Dogged Iteration",
    tagline:
      "Out-persist the problem instead of trying to out-think it: one variable per prototype, every failure logged as a fact.",
    whenToUse:
      "Use when a hard technical or product problem has already resisted your first few clever attempts, when experts have told you it cannot work, when you keep changing several things at once and can no longer tell what helped, when a run of failures has you ready to quit, or when you are hunting for one brilliant insight to skip the grind.",
    source: "James Dyson's autobiographies, Against the Odds and Invention: A Life of Learning Through Failure, plus his conversation with David Senra on Founders.",
    sourceAnchor: "content/knowledge/founders/014-the-stubborn-genius-of-james-dyson.md",
    command: "/james-dyson:dogged-iteration",
  },
  // ----- Brian Armstrong -----
  {
    slug: "mission-simplifies",
    themes: ["deciding","meaning","leading"],
    problemHint:
      "I am frozen on a huge decision because every option upsets someone important.",
    figureSlug: "brian-armstrong",
    title: "Mission Simplifies the Hardest Calls",
    tagline:
      "Write the long-term mission down explicitly, then use it to collapse decisions that look impossible, backed by the founder's calm of knowing you could rebuild from zero.",
    whenToUse:
      "Use when the user is frozen on a high-stakes decision, is optimizing for short-term approval, is being pulled off-course by whatever is loudest this quarter, or is so afraid of losing what they built that they cannot act. Also use when a team has no written mission and every stakeholder effectively gets a veto.",
    source: "Brian Armstrong in conversation with David Senra on the Founders interview show, plus Armstrong's 2020 Coinbase mission post.",
    sourceAnchor: "content/knowledge/interviews/024-brian-armstrong-when-washington-tried-to-kill-coinbase.md",
    command: "/brian-armstrong:mission-simplifies",
  },
  // ----- Nassim Nicholas Taleb -----
  {
    slug: "via-negativa",
    themes: ["risk","deciding","focus"],
    problemHint:
      "I keep piling on new tactics and I have never once named what could actually wipe me out.",
    figureSlug: "nassim-taleb",
    title: "Via Negativa: Remove the Ruin Before You Add Anything",
    tagline:
      "Stop asking what to add. Find the exposure that can end you, close it, subtract everything else that is quietly harming you, then barbell what is left so the downside is capped and the upside stays open.",
    whenToUse:
      "Use when the user is about to make a decision whose worst case they have never actually named, is asking for a forecast instead of a position, is stacking on new habits, tools, tactics or advice when the real problem is something they should stop, is over concentrated in one job, one client, one relationship or one bet, or is taking advice from people who pay nothing if they turn out to be wrong. Also use when someone frames a risk as an average, as in a project that works out on average, without noticing that one bad draw removes them from the game entirely.",
    source: "The Incerto by Nassim Nicholas Taleb: Fooled by Randomness (2001), The Black Swan (2007), The Bed of Procrustes (2010), Antifragile (2012), and Skin in the Game (2018). Via negativa, the barbell strategy and the Lindy effect are developed in Antifragile. Ruin, ergodicity and the four feet deep river rule come from Skin in the Game.",
    command: "/nassim-taleb:via-negativa",
  },
  // ----- Ray Dalio -----
  {
    slug: "pain-plus-reflection",
    themes: ["persisting","thinking"],
    problemHint:
      "I just blew something badly and I do not want to make the same mistake a fourth time.",
    figureSlug: "ray-dalio",
    title: "Pain Plus Reflection",
    tagline:
      "Turn your worst recent mistake into a written principle you can reuse, the way Dalio turned 1982 into a system.",
    whenToUse:
      "Use this after something has gone badly and the sting is still fresh: a failed launch, a blown deadline, a relationship that broke, a decision you got publicly wrong, a pattern of mistakes you keep repeating without naming. Also use it when you are stuck between a goal and a problem and cannot tell which is which, when you need to reach the root cause instead of the excuse, or when you are about to make a big call and want to weight the opinions around you by believability rather than by volume. Runs the 5-Step Process on the situation, forces the diagnosis down to a root cause stated as something about a person rather than an event, checks for the ego barrier and the blind spot barrier, and ends by handing you one written principle for the next time this shape of problem shows up. Not for investment or allocation questions, which Dalio refuses.",
    source: "Principles: Life and Work by Ray Dalio (Simon and Schuster, 2017), Life Principle 1.7 and the 5-Step Process, together with the principles Dalio publishes himself at principles.com and his 2017 TED talk on building an idea meritocracy.",
    command: "/ray-dalio:pain-plus-reflection",
  },
];

/** Get all skills attached to a particular figure (by figure slug). */
export function getSkillsForFigure(figureSlug: string): Skill[] {
  return skills.filter((s) => s.figureSlug === figureSlug);
}

/** Get a single skill by its slug + figureSlug, slugs can now repeat across plugins. */
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

/** Every skill that answers a given life-problem theme. */
export function getSkillsByTheme(theme: Theme): Skill[] {
  return skills.filter((s) => s.themes?.includes(theme));
}

/**
 * The library grouped by theme, primary-home first within each group, and
 * themes with no skills omitted. This is what the browse-by-problem view
 * renders, so a person can arrive with "I keep procrastinating" rather than
 * with the name of a framework.
 */
export function skillsByTheme(): { theme: Theme; label: string; skills: Skill[] }[] {
  return ALL_THEMES.map((theme) => ({
    theme,
    label: THEMES[theme],
    skills: getSkillsByTheme(theme).sort((a, b) => {
      // a skill whose PRIMARY theme is this one leads the group
      const ap = a.themes?.[0] === theme ? 0 : 1;
      const bp = b.themes?.[0] === theme ? 0 : 1;
      return ap - bp || a.title.localeCompare(b.title);
    }),
  })).filter((g) => g.skills.length > 0);
}

/**
 * Compact catalog for the router's prompt. One line per skill carrying the
 * command, its themes, and the user-voice problem hint, which is what the
 * model actually matches a stated problem against.
 */
export function skillCatalogForRouting(): string {
  return skills
    .map((s) => {
      const themes = s.themes?.length ? ` [${s.themes.join(", ")}]` : "";
      const hint = s.problemHint ? ` Use when: ${s.problemHint}` : ` Use when: ${s.whenToUse}`;
      return `- ${s.command}${themes} ${s.title}.${hint}`;
    })
    .join("\n");
}
