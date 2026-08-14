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

  // The Fabric of Reality
  {
    slug: "four-strands",
    figureSlug: "deutsch",
    title: "The Four Strands",
    tagline:
      "Quantum physics, epistemology, evolution, and computation are one theory, not four.",
    whenToUse:
      "A problem looks unsolvable inside one discipline and you suspect the explanation lives across several.",
    source: "The Fabric of Reality by David Deutsch",
    sourceAnchor: "Chapter 1",
    command: "/deutsch:four-strands",
    themes: ["thinking"],
    problemHint:
      "I keep going in circles because I am only looking at this from one angle.",
  },

  // Zombies in Western Culture: A Twenty-First Century Crisis
  {
    slug: "vervaeke",
    figureSlug: "vervaeke",
    title: "Channel Vervaeke",
    tagline:
      "Work out which of the four kinds of knowing your problem actually lives in, then train what becomes salient rather than trying harder.",
    whenToUse:
      "You understand a problem intellectually and still cannot act on it, nothing feels meaningful, or more information keeps failing to help.",
    source: "Awakening from the Meaning Crisis (lecture series) by John Vervaeke",
    sourceAnchor: "Awakening from the Meaning Crisis, lecture series",
    command: "/vervaeke:vervaeke",
    umbrella: true,
    themes: ["meaning","thinking","self"],
    problemHint:
      "I understand my problem perfectly and I still cannot do anything about it.",
  },
  {
    slug: "four-kinds-of-knowing",
    figureSlug: "vervaeke",
    title: "The Four Kinds of Knowing",
    tagline:
      "Propositional, procedural, perspectival, participatory. Naming which one a problem lives in explains why the advice you were given does not work.",
    whenToUse:
      "Advice keeps failing, you have read everything and changed nothing, or you can explain the solution perfectly and still cannot perform it.",
    source: "Awakening from the Meaning Crisis (lecture series) by John Vervaeke",
    sourceAnchor: "Awakening from the Meaning Crisis, lecture series",
    command: "/vervaeke:four-kinds-of-knowing",
    themes: ["thinking","self"],
    problemHint:
      "I can explain exactly what I should do and I still do not do it.",
  },
  {
    slug: "relevance-realization",
    figureSlug: "vervaeke",
    title: "Relevance Realization",
    tagline:
      "You cannot check every option and no rule tells you which rules to use. What you notice is a trainable process, not a fixed fact about you.",
    whenToUse:
      "You are overwhelmed by options, cannot tell what matters, or keep attending to the wrong thing despite knowing better.",
    source: "Awakening from the Meaning Crisis (lecture series) by John Vervaeke",
    sourceAnchor: "Awakening from the Meaning Crisis, lecture series",
    command: "/vervaeke:relevance-realization",
    themes: ["focus","thinking","deciding"],
    problemHint:
      "There is too much to pay attention to and I keep focusing on the wrong things.",
  },
  {
    slug: "ecology-of-practices",
    figureSlug: "vervaeke",
    title: "Build an Ecology of Practices",
    tagline:
      "Every practice has a failure mode. Choose a small set that correct each other rather than one technique you hope is sufficient.",
    whenToUse:
      "You are choosing habits or practices, a practice that used to work has curdled, or you want change that lasts beyond enthusiasm.",
    source: "Awakening from the Meaning Crisis (lecture series) by John Vervaeke",
    sourceAnchor: "Awakening from the Meaning Crisis, lecture series",
    command: "/vervaeke:ecology-of-practices",
    themes: ["self","meaning"],
    problemHint:
      "I keep picking up practices and they either stop working or make me strange.",
  },

  // Berkshire Hathaway Shareholder Letters, 1977-2024
  {
    slug: "warren-buffett",
    figureSlug: "warren-buffett",
    title: "The Buffett Owner's Lens",
    tagline:
      "Turn a business or capital decision into owner economics, opportunity cost, downside protection, and a clear action.",
    whenToUse:
      "Use when a consequential business, investment, acquisition, hiring, or resource-allocation decision needs a patient owner-oriented analysis.",
    source: "Berkshire Hathaway shareholder letters, 1977-2024, by Warren E. Buffett",
    sourceAnchor: "Full official archive, especially 1977, 1986, 1989, 1996, 2014, and 2024",
    command: "/warren-buffett:warren-buffett",
    umbrella: true,
    themes: ["money","risk","deciding","thinking","leading"],
    problemHint:
      "Describe the decision, the underlying economics, the available alternatives, the people involved, and what could cause permanent loss.",
  },
  {
    slug: "owner-earnings",
    figureSlug: "warren-buffett",
    title: "Owner Earnings",
    tagline:
      "Convert reported accounting results into the cash an owner can take out without weakening the business.",
    whenToUse:
      "Use when evaluating a business model, budget, acquisition, project, or financial statement whose reported profit may differ from economic cash generation.",
    source: "Berkshire Hathaway 1986 shareholder letter by Warren E. Buffett",
    sourceAnchor: "1986 letter, purchase-price accounting and owner earnings discussion",
    command: "/warren-buffett:owner-earnings",
    themes: ["money","thinking","deciding"],
    problemHint:
      "Provide reported earnings, non-cash charges, working-capital needs, maintenance spending, and any growth spending you can separate.",
  },
  {
    slug: "circle-of-competence",
    figureSlug: "warren-buffett",
    title: "Circle of Competence",
    tagline:
      "Draw the boundary between what can be evaluated, what must be learned, and what should simply be passed.",
    whenToUse:
      "Use when a decision feels exciting but depends on unfamiliar technology, economics, regulation, behavior, or forecasting.",
    source: "Berkshire Hathaway 1996 shareholder letter by Warren E. Buffett",
    sourceAnchor: "1996 letter, common stock investments section",
    command: "/warren-buffett:circle-of-competence",
    themes: ["thinking","deciding","risk"],
    problemHint:
      "Describe the opportunity, your direct experience, the variables you can estimate, and the assumptions supplied by other people.",
  },
  {
    slug: "retained-earnings-test",
    figureSlug: "warren-buffett",
    title: "The Retained Earnings Test",
    tagline:
      "Make every retained dollar compete against distribution and the best alternative use of capital.",
    whenToUse:
      "Use when deciding whether to reinvest profits, fund a new initiative, acquire a company, repay debt, hold cash, or return capital.",
    source: "Berkshire Hathaway shareholder letters by Warren E. Buffett",
    sourceAnchor: "1980, 1982, and 1984 letters, retained earnings and capital allocation",
    command: "/warren-buffett:retained-earnings-test",
    themes: ["money","deciding","building","growth"],
    problemHint:
      "Provide the amount available, each candidate use, expected incremental economics, time horizon, downside, and evidence from prior allocations.",
  },
  {
    slug: "financial-fortress",
    figureSlug: "warren-buffett",
    title: "Build a Financial Fortress",
    tagline:
      "Stress obligations, counterparties, and liquidity so no ordinary shock can force a permanent loss.",
    whenToUse:
      "Use before taking debt, signing guarantees or long-duration contracts, setting cash reserves, or evaluating whether a plan can survive a severe interruption.",
    source: "Berkshire Hathaway shareholder letters by Warren E. Buffett",
    sourceAnchor: "1989, 2001, 2002, 2018, and 2023 letters",
    command: "/warren-buffett:financial-fortress",
    themes: ["risk","money","persisting"],
    problemHint:
      "List cash, recurring inflows, fixed obligations, maturities, covenants, collateral, counterparties, and the worst plausible interruption.",
  },
  {
    slug: "acquisition-filter",
    figureSlug: "warren-buffett",
    title: "The Berkshire Acquisition Filter",
    tagline:
      "Screen an acquisition for understandable economics, durable advantage, trustworthy management, price, financing, and fit before deal momentum takes over.",
    whenToUse:
      "Use when evaluating a company acquisition, strategic partnership, major vendor commitment, or other transaction that can become emotionally difficult to stop.",
    source: "Berkshire Hathaway shareholder letters by Warren E. Buffett",
    sourceAnchor: "1989 acquisition criteria and 2014 fiftieth-anniversary letter",
    command: "/warren-buffett:acquisition-filter",
    themes: ["building","money","risk","deciding"],
    problemHint:
      "Provide the target's economics, management, moat, price, financing, integration assumptions, alternatives, and the incentives of everyone advocating the deal.",
  },

  // Poor Charlie's Almanack
  {
    slug: "charlie-munger",
    figureSlug: "charlie-munger",
    title: "The Munger Rationality Checklist",
    tagline:
      "Invert the problem, remove ruin, follow incentives, use several mental models, and compare the best alternatives.",
    whenToUse:
      "Use when a decision is emotionally charged, politically distorted, complex across disciplines, or vulnerable to avoidable stupidity.",
    source: "Poor Charlie's Almanack and Charles T. Munger's 2014 Berkshire Hathaway shareholder-letter essay",
    sourceAnchor: "Elementary Worldly Wisdom, Psychology of Human Misjudgment, USC 2007 address, and Vice Chairman's Thoughts",
    command: "/charlie-munger:charlie-munger",
    umbrella: true,
    themes: ["thinking","deciding","risk","leading"],
    problemHint:
      "Describe the desired outcome, the feared failure, the people and incentives involved, and the best alternatives currently available.",
  },
  {
    slug: "invert-the-problem",
    figureSlug: "charlie-munger",
    title: "Invert the Problem",
    tagline:
      "Solve forward by first identifying the conditions that guarantee failure and systematically avoiding them.",
    whenToUse:
      "Use when the path to success is vague, a plan has too many moving parts, or preventing failure is more tractable than predicting a winner.",
    source: "Poor Charlie's Almanack by Charles T. Munger, edited by Peter D. Kaufman",
    sourceAnchor: "Talks on elementary worldly wisdom and inversion, with explicit credit to Carl Gustav Jacob Jacobi",
    command: "/charlie-munger:invert-the-problem",
    themes: ["thinking","deciding","risk"],
    problemHint:
      "State the desired outcome, time horizon, constraints, and the failures that would make recovery difficult or impossible.",
  },
  {
    slug: "incentive-audit",
    figureSlug: "charlie-munger",
    title: "Incentive Audit",
    tagline:
      "Predict behavior by mapping what the system rewards, punishes, measures, and allows people to rationalize.",
    whenToUse:
      "Use when stated goals and actual behavior diverge, a metric is being gamed, advice may be conflicted, or an organization keeps producing the same unwanted result.",
    source: "Poor Charlie's Almanack by Charles T. Munger, edited by Peter D. Kaufman",
    sourceAnchor: "The Psychology of Human Misjudgment, reward and punishment superresponse tendency",
    command: "/charlie-munger:incentive-audit",
    themes: ["thinking","leading","deciding","conflict"],
    problemHint:
      "List the participants, stated objective, metrics, compensation, status rewards, penalties, information each person controls, and current behaviors.",
  },
  {
    slug: "lollapalooza-check",
    figureSlug: "charlie-munger",
    title: "Lollapalooza Bias Check",
    tagline:
      "Detect when several ordinary psychological tendencies combine to produce an extreme and irrational result.",
    whenToUse:
      "Use before a high-pressure sale, crowd-driven decision, escalation of commitment, charismatic pitch, crisis response, or unanimous meeting.",
    source: "Poor Charlie's Almanack by Charles T. Munger, edited by Peter D. Kaufman",
    sourceAnchor: "The Psychology of Human Misjudgment",
    command: "/charlie-munger:lollapalooza-check",
    themes: ["thinking","deciding","risk"],
    problemHint:
      "Describe the decision environment, timing pressure, authority figures, group behavior, prior commitments, rewards, losses, and how the choice is framed.",
  },
  {
    slug: "berkshire-system",
    figureSlug: "charlie-munger",
    title: "The Berkshire System",
    tagline:
      "Design a low-bureaucracy organization where autonomy, trust, capital discipline, and reputation reinforce one another.",
    whenToUse:
      "Use when designing a holding company, multi-business organization, acquisition operating model, headquarters, delegation system, or succession plan.",
    source: "Charles T. Munger, Vice Chairman's Thoughts: Past and Future, Berkshire Hathaway 2014 shareholder letter",
    sourceAnchor: "2014 fiftieth-anniversary letter, Munger's first-person essay",
    command: "/charlie-munger:berkshire-system",
    themes: ["building","leading","money","persisting"],
    problemHint:
      "Describe the operating units, headquarters roles, managers, capital flows, reporting burden, acquisition process, debt, culture, and succession risks.",
  },
  {
    slug: "deserved-trust",
    figureSlug: "charlie-munger",
    title: "Deserved Trust",
    tagline:
      "Build relationships and systems by becoming the kind of partner whose promises, incentives, and conduct deserve trust.",
    whenToUse:
      "Use when choosing a partner, repairing a relationship, designing delegation, negotiating a long-term agreement, or evaluating a culture that claims to value trust.",
    source: "Poor Charlie's Almanack and Charles T. Munger's USC Law School commencement address",
    sourceAnchor: "USC Law School commencement address, May 13, 2007",
    command: "/charlie-munger:deserved-trust",
    themes: ["leading","conflict","self","meaning"],
    problemHint:
      "Describe the parties, promises, incentives, information asymmetries, history, vulnerabilities, and what each side needs to entrust to the other.",
  },

  // Fooled by Randomness
  {
    slug: "alternative-histories",
    figureSlug: "nassim-taleb",
    title: "Judge the Decision, Not the Outcome",
    tagline:
      "Score choices by the full spread of histories they could have produced, not the one that happened to occur.",
    whenToUse:
      "Before crediting a big win (yours or someone else's) as proof of skill, or before making a bet where a rare bad outcome would be catastrophic.",
    source: "Fooled by Randomness by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter Two, A Bizarre Accounting Method (Russian Roulette, Alternative History)",
    command: "/nassim-taleb:alternative-histories",
    themes: ["risk","deciding","thinking"],
    problemHint:
      "I just made a huge amount of money on one bet and I am tempted to think I am good at this.",
  },
  {
    slug: "count-the-monkeys",
    figureSlug: "nassim-taleb",
    title: "Count the Monkeys Before You Trust a Track Record",
    tagline:
      "A great track record only means something once you know how many others tried and quietly failed.",
    whenToUse:
      "When you are about to trust someone's, or your own, run of success: a fund manager's returns, a trading rule that backtested beautifully, or a bestselling how-they-did-it book.",
    source: "Fooled by Randomness by Nassim Nicholas Taleb",
    sourceAnchor: "Part Two, Monkeys on Typewriters, Chapters Eight and Nine (Too Many Millionaires Next Door, It Is Easier to Buy and Sell Than Fry an Egg)",
    command: "/nassim-taleb:count-the-monkeys",
    themes: ["money","thinking","deciding"],
    problemHint:
      "Someone just showed me an impressive track record and wants me to invest, hire them, or copy their exact method.",
  },
  {
    slug: "match-the-observation-window",
    figureSlug: "nassim-taleb",
    title: "Match Your Observation Window to Your Real Signal to Noise Ratio",
    tagline:
      "How often you check a number determines how much noise you mistake for meaning.",
    whenToUse:
      "When you are checking a portfolio, a metric, or a project's progress far more often than the true rate of change in the underlying reality justifies, and it is costing you emotional energy or bad decisions.",
    source: "Fooled by Randomness by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter Three, Philostratus in Monte Carlo: On the Difference Between Noise and Information, reinforced in Chapter Twelve, Gamblers' Ticks and Pigeons in a Box",
    command: "/nassim-taleb:match-the-observation-window",
    themes: ["focus","self","thinking"],
    problemHint:
      "I keep checking my portfolio, or my metrics, every few minutes and it is wrecking my mood even though nothing has really changed.",
  },
  {
    slug: "weight-the-magnitude",
    figureSlug: "nassim-taleb",
    title: "Weight the Magnitude, Not Just the Odds",
    tagline:
      "A bet is not bullish or bearish, it is a probability times a payoff; compute the second number, not just the first.",
    whenToUse:
      "When you are about to make a bet, forecast, or decision and you catch yourself, or someone else, stating only how likely an outcome is without stating how large that outcome would be.",
    source: "Fooled by Randomness by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter Six, Skewness and Asymmetry",
    command: "/nassim-taleb:weight-the-magnitude",
    themes: ["money","deciding","thinking"],
    problemHint:
      "I keep hearing that something is very likely to work out and I want to know if that alone is a good enough reason to do it.",
  },
  {
    slug: "distrust-the-hot-streak",
    figureSlug: "nassim-taleb",
    title: "Distrust the Track Record That Fits the Current Regime Too Well",
    tagline:
      "The best performer in any given market moment is often just the trait that matched this cycle, not the most skilled.",
    whenToUse:
      "When you are evaluating the current top performer in a field, a trader, a strategy, a company, a hire, and you are tempted to treat their recent dominance as proof of superior skill.",
    source: "Fooled by Randomness by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter Five, Survival of the Least Fit, A Review of Market Fools of Randomness Constants",
    command: "/nassim-taleb:distrust-the-hot-streak",
    themes: ["risk","thinking","deciding"],
    problemHint:
      "Someone at work, or in the market, is on an incredible streak right now and everyone wants to copy exactly what they do.",
  },
  {
    slug: "falsify-before-you-commit",
    figureSlug: "nassim-taleb",
    title: "Set Your Falsification Point Before You Act",
    tagline:
      "Decide in advance what evidence would prove you wrong, and use data only to reject ideas, never to confirm them.",
    whenToUse:
      "Before entering a position, launching a bet on a belief, or committing capital or time to a thesis, when you have not yet named what would prove the thesis false.",
    source: "Fooled by Randomness by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter Seven, The Problem of Induction, Popper's Answer, Pascal's Wager",
    command: "/nassim-taleb:falsify-before-you-commit",
    themes: ["deciding","thinking","risk"],
    problemHint:
      "I have a strong thesis and I am about to commit real money or time to it without knowing what would make me change my mind.",
  },

  // The Black Swan
  {
    slug: "black-swan-triplet-test",
    figureSlug: "nassim-taleb",
    title: "The Black Swan Triplet Test",
    tagline:
      "Before you call something a Black Swan or claim you saw it coming, run the event through the three tests that actually define one: rarity, extreme impact, retrospective predictability.",
    whenToUse:
      "Use when a surprising event just happened and people (including the user) are rushing to say either it could never have been predicted or, worse, that everyone saw it coming all along. Also use when the user labels an ordinary bad surprise a Black Swan to excuse a failure, or wants to know whether a risk is worth specifically preparing for versus generically preparing for the unknown.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Prologue: On the Plumage of Birds",
    command: "/nassim-taleb:black-swan-triplet-test",
    themes: ["risk","thinking","deciding"],
    problemHint:
      "Something blindsided us and now everyone in the room is arguing about whether it was obvious in hindsight or completely unforeseeable, and I cannot tell which camp is right.",
  },
  {
    slug: "mediocristan-extremistan-map",
    figureSlug: "nassim-taleb",
    title: "Mediocristan or Extremistan",
    tagline:
      "Classify the domain you are measuring before you trust an average, a sample size, or a track record, because the two provinces of randomness obey opposite rules.",
    whenToUse:
      "Use before trusting a sample average, a historical track record, a risk model, or a forecast in any domain, especially finance, careers, product sales, or company size. Use it whenever someone says a large sample settles the question, or that a single event could not possibly matter much to the total.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 3: The Speculator and the Prostitute",
    command: "/nassim-taleb:mediocristan-extremistan-map",
    themes: ["risk","deciding","thinking"],
    problemHint:
      "I have years of data and a large sample size and I feel confident, but I cannot shake the worry that one single outcome could blow up everything I think I know.",
  },
  {
    slug: "turkey-problem",
    figureSlug: "nassim-taleb",
    title: "The Turkey Problem",
    tagline:
      "Treat a long, comfortable track record as a warning sign, not a guarantee, because the turkey's confidence peaks the day before its confidence is proven wrong.",
    whenToUse:
      "Use when someone points to years of steady results, a clean safety record, or a pattern that has never broken as the reason to keep doing what they are doing. Use it to pressure-test any claim of the form this has always worked, especially from a bank, an institution, or anyone whose good years have all come from the same untested source.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 4: One Thousand and One Days, or How Not to Be a Sucker",
    command: "/nassim-taleb:turkey-problem",
    themes: ["risk","thinking","deciding"],
    problemHint:
      "Everything has gone fine for years, the track record is spotless, and that is exactly what is making me nervous even though I cannot point to a specific reason.",
  },
  {
    slug: "narrative-fallacy-guard",
    figureSlug: "nassim-taleb",
    title: "Guard Against the Narrative Fallacy",
    tagline:
      "Notice the moment a sequence of facts gets welded into a tidy cause and effect story, because the story always feels more true than the facts alone, and that feeling is the danger.",
    whenToUse:
      "Use whenever a clean, satisfying explanation for a success, a failure, or a historical event is being accepted mainly because it is easy to remember and tell, not because it was tested. Especially useful before writing a postmortem, a case study, a biography-style success story, or any after the fact account of why something happened.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 6: The Narrative Fallacy",
    command: "/nassim-taleb:narrative-fallacy-guard",
    themes: ["thinking","deciding"],
    problemHint:
      "I just heard a really compelling explanation for why this succeeded or failed, and I want to believe it, which is exactly why I am suspicious of it.",
  },
  {
    slug: "silent-evidence-audit",
    figureSlug: "nassim-taleb",
    title: "The Silent Evidence Audit",
    tagline:
      "Before you learn a lesson from a success story or a track record, go find the graveyard of people who did the exact same thing and are not around to tell you about it.",
    whenToUse:
      "Use before adopting advice from a successful person, a case study, a bestselling book, a fund manager's track record, or any story of the form here is what the winners had in common. Also use when evaluating whether a practice, treatment, or strategy is safe based only on the visible survivors of it.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 8: Giacomo Casanova's Unfailing Luck: The Problem of Silent Evidence",
    command: "/nassim-taleb:silent-evidence-audit",
    themes: ["thinking","deciding","risk"],
    problemHint:
      "I keep hearing about people who did this one thing and it worked out brilliantly for them, and I am about to copy them without asking who did the same thing and vanished.",
  },
  {
    slug: "ludic-fallacy-check",
    figureSlug: "nassim-taleb",
    title: "The Ludic Fallacy Check",
    tagline:
      "Before you trust a probability, a model, or a game-derived intuition about risk, check whether real life actually shares the closed, known rules of the game you learned it from.",
    whenToUse:
      "Use whenever someone reasons about a real-world risk using odds, dice, coin flips, casino logic, or a model with known, fixed rules, especially in finance, insurance, or any domain where the true rules of the game are not fully known. Also use when a credentialed, exam-trained expert is confidently applying textbook probability to an open-ended real situation.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 9: The Ludic Fallacy, or The Uncertainty of the Nerd",
    command: "/nassim-taleb:ludic-fallacy-check",
    themes: ["risk","thinking","deciding"],
    problemHint:
      "Someone just gave me a confident probability or a clean model for a real situation, and it reminds me of a classroom exercise more than of the messy thing it is supposed to describe.",
  },
  {
    slug: "fourth-quadrant-map",
    figureSlug: "nassim-taleb",
    title: "The Fourth Quadrant Map",
    tagline:
      "Sort any risky decision by two questions, is the payoff simple or open-ended, and does this domain allow extreme outcomes, then apply the specific set of rules that survive the one dangerous quadrant.",
    whenToUse:
      "Use when deciding how much to trust a forecast, a risk model, or a statistical measure before acting on it, especially in finance, policy, health, or any decision with an open-ended payoff in a domain capable of extreme outcomes. Use it to decide whether more modeling effort will help or whether the honest answer is to change your exposure instead.",
    source: "The Black Swan by Nassim Nicholas Taleb",
    sourceAnchor: "Postscript Essay: VI, The Fourth Quadrant, and VII, What to Do with the Fourth Quadrant",
    command: "/nassim-taleb:fourth-quadrant-map",
    themes: ["risk","deciding","thinking"],
    problemHint:
      "I have a forecast or a risk model in front of me and I cannot tell whether it is trustworthy enough to act on or whether I am about to trust a number that cannot actually be known.",
  },

  // Skin in the Game
  {
    slug: "portfolio-not-opinion",
    figureSlug: "nassim-taleb",
    title: "Don't Tell Me What You Think, Tell Me What's in Your Portfolio",
    tagline:
      "Before you act on anyone's opinion (including your own), find out what they actually have exposed to it, because unexposed advice is a sales pitch wearing the costume of counsel.",
    whenToUse:
      "Use when someone offers you advice, a recommendation, or a strong opinion (a stock tip, a pundit's forecast, a consultant's plan, a friend's certainty about a decision) and you have not yet checked what that person stands to lose if they are wrong. Also use before you publish your own strong opinion, to check whether you would say it if it cost you something.",
    source: "Skin in the Game by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 1, Why Each One Should Eat His Own Turtles: Equality in Uncertainty (A Customer Is Born Every Day, Talking One's Book)",
    command: "/nassim-taleb:portfolio-not-opinion",
    themes: ["selling","deciding","thinking"],
    problemHint:
      "Someone keeps telling me what I should do and I have no idea if they'd bear any cost if they turned out to be wrong.",
  },
  {
    slug: "minority-rule",
    figureSlug: "nassim-taleb",
    title: "The Minority Rule: How a Stubborn Few Set the Terms for Everyone",
    tagline:
      "Find the smallest, most inflexible group in a market or population, because a rigid minority as small as three or four percent can force the flexible majority to conform to it, not the other way around.",
    whenToUse:
      "Use when you are trying to predict or shape a market, a menu, a policy default, or a cultural shift, and you find yourself counting heads to find the majority preference. Also use when a small, intense, uncompromising group of customers, employees, or critics seems to have influence wildly out of proportion to its size.",
    source: "Skin in the Game by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 2, The Most Intolerant Wins: The Dominance of the Stubborn Minority",
    command: "/nassim-taleb:minority-rule",
    themes: ["marketing","thinking","deciding"],
    problemHint:
      "I keep sizing up a market by the average preference and I keep getting blindsided by a small group that refuses to bend.",
  },
  {
    slug: "intellectual-yet-idiot",
    figureSlug: "nassim-taleb",
    title: "The Intellectual Yet Idiot Check",
    tagline:
      "Before you follow someone's confident advice about how you should live, eat, vote, or run your business, check whether they have ever had to survive the consequences of being wrong about it.",
    whenToUse:
      "Use when you are about to accept guidance from someone with impressive credentials (a think tank report, a pundit's column, a consultant's deck, a policy paper) on a matter that touches real, concrete life, and you have not yet checked whether that person has firsthand, costly experience with the thing they are pronouncing on.",
    source: "Skin in the Game by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 6, The Intellectual Yet Idiot",
    command: "/nassim-taleb:intellectual-yet-idiot",
    themes: ["thinking","deciding","self"],
    problemHint:
      "Someone with great credentials is telling me exactly what to do and something about it feels off, but I can't articulate why.",
  },
  {
    slug: "skin-of-others-audit",
    figureSlug: "nassim-taleb",
    title: "The Skin of Others Audit",
    tagline:
      "Before you trust someone's public stance, or take one yourself, map out who else's downside is riding on it (a mortgage, a child's tuition, an employer, a reputation), because that hidden leverage predicts when the stance will bend.",
    whenToUse:
      "Use when you are deciding how much to trust an activist's, whistleblower's, journalist's, or employee's public position, or when you yourself are weighing whether to take an unpopular stand and want an honest picture of what you actually have to lose.",
    source: "Skin in the Game by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 4, The Skin of Others in Your Game (A Mortgage and Two Cats, Finding Hidden Vulnerabilities)",
    command: "/nassim-taleb:skin-of-others-audit",
    themes: ["self","risk","deciding"],
    problemHint:
      "I want to know whether this person will actually hold their position under pressure, or whether they have too much to lose to stay honest.",
  },
  {
    slug: "green-lumber-test",
    figureSlug: "nassim-taleb",
    title: "The Green Lumber Test for Hiring and Trusting Experts",
    tagline:
      "When vetting an expert, trader, or consultant, weight their track record under real consequences over how polished, credentialed, or articulate they sound, because the skills that produce results and the skills that produce a convincing presentation are usually different skills.",
    whenToUse:
      "Use when you are choosing between candidates for a hire, a manager, an advisor, or a service provider, and you notice yourself favoring the more articulate, better dressed, or more credentialed option without having checked their actual track record under real stakes.",
    source: "Skin in the Game by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 9, Surgeons Should Not Look Like Surgeons (Looking the Part, The Green Lumber Fallacy, A BS Detection Heuristic)",
    command: "/nassim-taleb:green-lumber-test",
    themes: ["deciding","thinking","risk"],
    problemHint:
      "I keep hiring the person who interviews the best and explains things the most clearly, and it keeps not working out.",
  },
  {
    slug: "merchandising-of-virtue",
    figureSlug: "nassim-taleb",
    title: "The Merchandising of Virtue Test",
    tagline:
      "Before you credit, or claim, a virtuous stance, check whether it actually costs the holder something, because virtue that is free to hold and advertises itself is a status purchase, not virtue.",
    whenToUse:
      "Use when evaluating a company's, cause's, or person's publicly advertised ethical stance (an environmental campaign, a charity pitch, a values statement, your own urge to publicly announce a good deed), or when someone asks how to actually do good in the world.",
    source: "Skin in the Game by Nassim Nicholas Taleb",
    sourceAnchor: "Chapter 13, The Merchandising of Virtue (The Virtue Merchants, Unpopular Virtue, Take Risk)",
    command: "/nassim-taleb:merchandising-of-virtue",
    themes: ["meaning","self","risk"],
    problemHint:
      "I keep seeing loud public displays of doing good and I can't tell which ones are real and which ones are just marketing.",
  },

  // The Fabric of Reality
  {
    slug: "problem-solving-cycle",
    figureSlug: "deutsch",
    title: "The Problem-Solving Cycle",
    tagline:
      "A problem is not solved by piling up data, it is solved by conjecturing rival explanations and letting criticism eliminate the weak ones.",
    whenToUse:
      "You have a plan or belief that just failed in some specific way and you are deciding whether to scrap the whole thing or fix the part that broke.",
    source: "The Fabric of Reality by David Deutsch",
    sourceAnchor: "Chapter 3 (Problem-solving)",
    command: "/deutsch:problem-solving-cycle",
    themes: ["thinking","deciding","persisting"],
    problemHint:
      "I have a plan that just failed and I do not know if I should scrap the whole thing or fix one part of it.",
  },
  {
    slug: "kicked-rock-test",
    figureSlug: "deutsch",
    title: "The Kicked Rock Test",
    tagline:
      "Treat something as real when denying it costs more complexity than accepting it, and refute a doctrine by following it all the way to its own conclusion.",
    whenToUse:
      "Someone dismisses a pattern, motive, or claim you noticed as not real or just a coincidence, or asks you to take a fringe idea seriously enough to argue against it properly.",
    source: "The Fabric of Reality by David Deutsch",
    sourceAnchor: "Chapter 4 (Criteria for Reality)",
    command: "/deutsch:kicked-rock-test",
    themes: ["thinking","deciding"],
    problemHint:
      "Someone just told me the pattern I noticed is not real, it is just a coincidence, and I cannot tell if they are right.",
  },
  {
    slug: "universal-version",
    figureSlug: "deutsch",
    title: "Build the Universal Version",
    tagline:
      "A rule built for the whole class of a situation keeps working on cases you have not met yet. A rule built for one case has to be rebuilt every time.",
    whenToUse:
      "You are about to hard code a fix for the one case in front of you, or write a rule that only covers the situations you have already thought of.",
    source: "The Fabric of Reality by David Deutsch",
    sourceAnchor: "Chapter 6 (Universality and the Limits of Computation)",
    command: "/deutsch:universal-version",
    themes: ["building","thinking"],
    problemHint:
      "I keep bolting another special case onto this rule and it is starting to break under its own weight.",
  },
  {
    slug: "certainty-audit",
    figureSlug: "deutsch",
    title: "The Certainty Audit",
    tagline:
      "A proof is a physical process resting on an assumption, not a separate category of truth above ordinary explanation.",
    whenToUse:
      "Someone ends a debate by saying the math proves it, the model is rigorous, or the numbers do not lie.",
    source: "The Fabric of Reality by David Deutsch",
    sourceAnchor: "Chapter 10 (The Nature of Mathematics)",
    command: "/deutsch:certainty-audit",
    themes: ["thinking","risk","deciding"],
    problemHint:
      "Someone ended the argument by saying the spreadsheet proves it and I do not know how to push back.",
  },
  {
    slug: "seminar-room-rule",
    figureSlug: "deutsch",
    title: "The Seminar Room Rule",
    tagline:
      "In a real critical tradition rank is not an allowed rebuttal, and everyone present knows exactly when that rule is and is not in effect.",
    whenToUse:
      "You are setting up how a team gives feedback, or you notice people softening real objections because of who they are talking to.",
    source: "The Fabric of Reality by David Deutsch",
    sourceAnchor: "Chapter 13 (The Four Strands), the critique of Kuhn's paradigms",
    command: "/deutsch:seminar-room-rule",
    themes: ["leading","conflict"],
    problemHint:
      "My team keeps deferring to whoever is most senior in the room instead of actually stress testing the idea.",
  },

  // The Beginning of Infinity
  {
    slug: "jump-to-universality",
    figureSlug: "deutsch",
    title: "The Jump to Universality",
    tagline:
      "A narrow tool built for specific cases can gain unlimited reach through one small rule change. Look for the arbitrary limit you can remove.",
    whenToUse:
      "You are improving a tool, template, process, or system that only handles the specific cases you built it for, and you are deciding whether to bolt on another special case or change the underlying rule.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 6, The Jump to Universality (the alphabet, positional numerals, Babbage's Analytical Engine, the genetic code)",
    command: "/deutsch:jump-to-universality",
    themes: ["building","thinking"],
    problemHint:
      "I keep bolting another special case onto this system and it is turning into a pile of exceptions.",
  },
  {
    slug: "replicator-interest",
    figureSlug: "deutsch",
    title: "Who The Replicator Actually Serves",
    tagline:
      "Selection favors whatever spreads best, not whatever is good for you. Ask who benefits before you keep feeding it.",
    whenToUse:
      "A habit, ritual, tool, or idea has spread and persisted inside your team, product, or life, and you have never actually checked whether it survives because it helps people or because it is simply good at getting copied.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 4, Creation (the neo-Darwinian selection argument, extended from genes to memes)",
    command: "/deutsch:replicator-interest",
    themes: ["thinking","deciding"],
    problemHint:
      "This practice keeps spreading through my team but I am not sure it is actually good for us.",
  },
  {
    slug: "spot-bad-philosophy",
    figureSlug: "deutsch",
    title: "Spotting Bad Philosophy",
    tagline:
      "Bad philosophy is not just wrong, it is built to make the next question illegitimate. Test any claim by asking what happens when you keep asking why.",
    whenToUse:
      "Someone hands you a rule, policy, methodology, or dismissal presented as beyond question, such as that is just how the market works, that is above your pay grade, or shut up and calculate, and you want to know whether it is a real answer or a stop sign.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 12, A Physicist's History of Bad Philosophy (the Copenhagen interpretation, logical positivism)",
    command: "/deutsch:spot-bad-philosophy",
    themes: ["thinking","conflict"],
    problemHint:
      "Every time I ask why this is the rule, I get told to stop asking instead of getting an answer.",
  },
  {
    slug: "choice-as-explanation",
    figureSlug: "deutsch",
    title: "A Choice Is An Explanation, Not A Weighing",
    tagline:
      "When every option on the table looks bad, that is a sign your explanation is missing, not a signal to compute harder among bad options.",
    whenToUse:
      "You are stuck between options that all feel like compromises, and you are tempted to weigh the pros and cons harder instead of asking whether a better option exists that nobody on the list has thought of yet.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 13, Choices (the critique of social choice theory and Arrow's impossibility theorem, extended to personal decisions)",
    command: "/deutsch:choice-as-explanation",
    themes: ["deciding","thinking"],
    problemHint:
      "I keep going back and forth weighing the same two bad options and neither one feels right.",
  },
  {
    slug: "rational-vs-anti-rational-memes",
    figureSlug: "deutsch",
    title: "Rational Versus Anti-Rational Memes",
    tagline:
      "A belief that survives scrutiny is a rational meme. A belief that survives by disabling scrutiny is an anti-rational one. Test which kind you are holding.",
    whenToUse:
      "You notice you are not allowed to question a belief, rule, or piece of advice you hold or were given, or you catch yourself enforcing a rule with because I said so instead of a reason.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 15, The Evolution of Culture (rational memes, anti-rational memes, static society thinking)",
    command: "/deutsch:rational-vs-anti-rational-memes",
    themes: ["thinking","self"],
    problemHint:
      "I feel like I am not allowed to question this rule and I do not know why.",
  },
  {
    slug: "unsustainable-by-design",
    figureSlug: "deutsch",
    title: "Build Problem-Solving Capacity, Not A Sustainable Steady State",
    tagline:
      "Every closed, fixed plan meets an unforeseen problem eventually. Judge a plan by how well it can create new solutions, not by whether it claims to need none.",
    whenToUse:
      "You are planning something for the long term, such as a budget, a career path, a company roadmap, or a resource plan, and the plan's main selling point is that it is stable, self sufficient, or will not need to change.",
    source: "The Beginning of Infinity by David Deutsch",
    sourceAnchor: "Chapter 17, Unsustainable (Easter Island's static culture, the falsified Ehrlich resource-collapse predictions)",
    command: "/deutsch:unsustainable-by-design",
    themes: ["persisting","risk"],
    problemHint:
      "This plan is supposed to be self sufficient forever but I have no idea what happens when something we did not expect goes wrong.",
  },

  // Founders Podcast
  {
    slug: "senra",
    figureSlug: "senra",
    title: "The Senra Reading",
    tagline:
      "Run a decision through the same four tests Senra runs on every founder he studies: primary sources, belief before ability, control over money, and money as a byproduct of service.",
    whenToUse:
      "Use when you need to size up a founder, a business decision, or your own situation the way Senra sizes up a subject before he will trust a lesson from it.",
    source: "Founders Podcast by David Senra",
    sourceAnchor: "Recurring pattern across the full catalog, especially the Rockefeller, Elon Musk, Daniel Ek, James Dyson, and Todd Graves episodes",
    command: "/senra:senra",
    umbrella: true,
    themes: ["deciding","starting","thinking"],
    problemHint:
      "I want to know if this founder, this deal, or this plan of mine actually holds up, not just whether the story sounds good.",
  },
  {
    slug: "primary-source-first",
    figureSlug: "senra",
    title: "Read the Primary Source First",
    tagline:
      "Before trusting what anyone says about a person's methods, including a summary like this one, go to their own letters, autobiography, or collected words first.",
    whenToUse:
      "You are about to base a decision on what someone said a founder, a competitor, or an expert believes or did, and you have not gone to that person's own words yet.",
    source: "Founders Podcast by David Senra",
    sourceAnchor: "Reading pattern across the catalog: Steve Jobs in His Own Words, 38 Letters John D. Rockefeller Wrote to His Son, 400 Pages of Warren Buffett and Charlie Munger in Their Own Words, Lessons from Jeff Bezos's Shareholder Letters, Napoleon: His Written and Spoken Words",
    command: "/senra:primary-source-first",
    themes: ["thinking","deciding"],
    problemHint:
      "I keep forming an opinion of someone from what other people say about them and I have never actually read their own words.",
  },
  {
    slug: "belief-before-ability",
    figureSlug: "senra",
    title: "Belief Before Ability",
    tagline:
      "Check whether conviction showed up before any evidence justified it. That order, not talent, is what actually predicts who builds the thing.",
    whenToUse:
      "You or someone you are evaluating is waiting to feel qualified, waiting for proof, or asking whether they are good enough before they start or commit further.",
    source: "Founders Podcast by David Senra",
    sourceAnchor: "38 Letters John D. Rockefeller Wrote to His Son, and the interview episodes with Daniel Ek (Spotify) and Michael Dell",
    command: "/senra:belief-before-ability",
    themes: ["self","starting","risk"],
    problemHint:
      "I do not feel ready and I am waiting to feel more confident before I actually commit to this.",
  },
  {
    slug: "control-not-money",
    figureSlug: "senra",
    title: "Control and Creation, Not Money",
    tagline:
      "Look at what a founder refuses to sell, not what they say they want. Control of the thing they are building predicts their choices better than a stated price ever will.",
    whenToUse:
      "You are deciding whether to sell, dilute, partner, or hand off control of something you built, or you are trying to understand why someone else made a decision that did not maximize money.",
    source: "Founders Podcast by David Senra",
    sourceAnchor: "The Stubborn Genius of James Dyson, and the interview episodes with Evan Spiegel, Todd Graves (Raising Cane's), and Jason Fried",
    command: "/senra:control-not-money",
    themes: ["deciding","building"],
    problemHint:
      "Someone is offering to buy or take over part of what I built and I cannot tell if I should say yes.",
  },
  {
    slug: "money-follows-service",
    figureSlug: "senra",
    title: "Money Follows Service",
    tagline:
      "Aim at the service, not the money. Across every industry Senra has studied, from oil to streaming to fried chicken, the founders who chased money directly did worse than the ones treating it as the byproduct of a job done well.",
    whenToUse:
      "You are making a pricing, product, or growth decision by asking what makes the most money right now, instead of what serves the customer best.",
    source: "Founders Podcast by David Senra",
    sourceAnchor: "Rockefeller's Autobiography, and the interview episodes with Daniel Ek (Spotify) and Todd Graves (Raising Cane's), each independently citing Henry Ford's line that money comes as a result of service",
    command: "/senra:money-follows-service",
    themes: ["money","selling"],
    problemHint:
      "I am optimizing every decision for revenue right now and I think it is making the actual product worse.",
  },
  {
    slug: "reread-the-source",
    figureSlug: "senra",
    title: "Reread the Source You Already Trust",
    tagline:
      "A book, a mentor, or a body of work you have already learned from once still has more in it. Go back to it from your current problem instead of searching for something new.",
    whenToUse:
      "You are hunting for new advice, a new book, or a new expert for a problem, when a source you already trust and have not revisited in years likely already has the answer.",
    source: "Founders Podcast by David Senra",
    sourceAnchor: "Rockefeller covered three separate times across the catalog (How Rockefeller Worked, 38 Letters, Rockefeller's Autobiography), and Steve Jobs covered twice (Make Something Wonderful, How Steve Jobs Kept Things Simple)",
    command: "/senra:reread-the-source",
    themes: ["growth","persisting"],
    problemHint:
      "I am looking for a new book or a new guru for this problem instead of going back to the one I already know has the answer.",
  },

  // Derek Sivers
  {
    slug: "sivers",
    figureSlug: "sivers",
    title: "The Sivers Filter",
    tagline:
      "Run a decision, an idea, or a belief through the same short tests Sivers built out of founding and selling CD Baby: is it a hell yeah, is it actually useful, and have you executed on it at all.",
    whenToUse:
      "Use when you have an idea, an opportunity, or a belief you are holding onto, and you want the compressed, no filler version of whether it is actually worth your time.",
    source: "Derek Sivers, across Anything You Want, Hell Yeah or No, How to Live, and Useful Not True",
    sourceAnchor: "Recurring across all five books",
    command: "/sivers:sivers",
    umbrella: true,
    themes: ["deciding", "starting", "self"],
    problemHint:
      "I have too many half considered options and I want the fast, blunt version of which ones actually matter.",
  },
  {
    slug: "hell-yeah-or-no",
    figureSlug: "sivers",
    title: "Hell Yeah or No",
    tagline:
      "If the honest answer to a decision is not a hell yeah, the answer is no. Most overcommitment comes from saying yes out of fear, not desire.",
    whenToUse:
      "You are deciding whether to take on a commitment, opportunity, or request, and you notice you are talking yourself into a lukewarm yes.",
    source: "Hell Yeah or No by Derek Sivers",
    sourceAnchor: "Title essay, originally published August 26, 2009, expanded into the 2020 book",
    command: "/sivers:hell-yeah-or-no",
    themes: ["deciding", "focus"],
    problemHint:
      "I keep saying yes to things I am not actually excited about and my calendar is full of obligations I resent.",
  },
  {
    slug: "obvious-to-you-amazing-to-others",
    figureSlug: "sivers",
    title: "Obvious to You, Amazing to Others",
    tagline:
      "You are a bad judge of your own ideas, because what you already know feels too obvious to be worth saying. Put it out and let other people decide.",
    whenToUse:
      "You have an idea, a skill, or a piece of knowledge you are dismissing as too basic or too obvious to share, teach, or build something around.",
    source: "Derek Sivers, essay Obvious to You. Amazing to Others.",
    sourceAnchor: "sive.rs/obvious",
    command: "/sivers:obvious-to-you-amazing-to-others",
    themes: ["self", "starting"],
    problemHint:
      "I have knowledge or a skill that feels too basic to be worth anything, but people keep asking me about it.",
  },
  {
    slug: "execution-multiplier",
    figureSlug: "sivers",
    title: "Ideas Are Just a Multiplier of Execution",
    tagline:
      "A brilliant idea with no execution is worth nothing. Build to solve your own problem first, and let the next problem, not a plan, decide what you build next.",
    whenToUse:
      "You are stuck rating or protecting an idea instead of building anything, or you are looking for a business idea instead of noticing the problem already in front of you.",
    source: "Anything You Want by Derek Sivers",
    sourceAnchor: "The CD Baby origin story, built to sell his own CD before anyone else asked",
    command: "/sivers:execution-multiplier",
    themes: ["starting", "building"],
    problemHint:
      "I have an idea I think is great and I am protecting it instead of actually building anything.",
  },
  {
    slug: "hold-the-contradiction",
    figureSlug: "sivers",
    title: "Hold the Contradiction",
    tagline:
      "Two fully opposite ways of living can both be true. Argue each side completely on its own terms instead of collapsing into one rule too early.",
    whenToUse:
      "You are stuck between two approaches that seem to contradict each other, such as independence versus commitment, or mastering one thing versus staying a beginner, and you are trying to resolve it into a single correct answer.",
    source: "How to Live by Derek Sivers",
    sourceAnchor: "27 chapters, each fully convinced of a different way to live",
    command: "/sivers:hold-the-contradiction",
    themes: ["thinking", "self"],
    problemHint:
      "I feel torn between two completely opposite pieces of advice and I want to know which one is actually right.",
  },
  {
    slug: "earn-what-cant-be-given",
    figureSlug: "sivers",
    title: "Earn What Can't Be Given",
    tagline:
      "Mastery is the one goal the rich cannot buy, the impatient cannot rush, and the privileged cannot inherit. Aim at it specifically because nobody can hand it to you.",
    whenToUse:
      "You are choosing between goals and one option is status, money, or connections that could be given to you, while another is a skill that can only be earned.",
    source: "How to Live by Derek Sivers",
    sourceAnchor: "Chapter, Master something",
    command: "/sivers:earn-what-cant-be-given",
    themes: ["growth", "persisting"],
    problemHint:
      "I am chasing something that other people could just hand me instead of building the one thing that has to be earned.",
  },
  {
    slug: "useful-not-true",
    figureSlug: "sivers",
    title: "Useful, Not True",
    tagline:
      "Ask whether a belief is useful to hold right now, not whether it is objectively true. Treat beliefs as tools you pick up and put down, not as claims you must defend.",
    whenToUse:
      "You are stuck defending or attacking a belief as factually correct, when the real question is whether holding it is actually helping you act.",
    source: "Useful Not True by Derek Sivers",
    sourceAnchor: "The book's central argument",
    command: "/sivers:useful-not-true",
    themes: ["thinking", "meaning"],
    problemHint:
      "I am arguing about whether something is true when what actually matters is whether believing it helps me do anything.",
  },

  // Visakan Veerasamy
  {
    slug: "visakan",
    figureSlug: "visakan",
    title: "The Friendly Ambitious Nerd Method",
    tagline:
      "Give the smart, striving, slightly awkward part of yourself permission to want things out loud, and treat writing about it, unedited, as a real way of figuring yourself out.",
    whenToUse:
      "Use when you are stuck between wanting to achieve something and wanting to be liked, as if you have to choose, or when you need to think through something messy by writing it out rather than solving it in your head.",
    source: "Visakan Veerasamy, Friendly Ambitious Nerd and the visakanv.com essay archive",
    sourceAnchor: "Recurring across the essay archive",
    command: "/visakan:visakan",
    umbrella: true,
    themes: ["self", "meaning"],
    problemHint:
      "I feel like I have to choose between being ambitious and being likable, and I do not know how to want things out loud.",
  },
  {
    slug: "greatness-is-deviance",
    figureSlug: "visakan",
    title: "Greatness Is Deviance",
    tagline:
      "Nobody does something nobody else can yet see without passing through cringe. If you want to do something great, you have to behave differently than most people first.",
    whenToUse:
      "You have an ambition or a piece of work you are holding back on because it would look strange, embarrassing, or premature to the people around you.",
    source: "Visakan Veerasamy, essay Greatness is Deviance",
    sourceAnchor: "visakanv.com/blog/greatness-is-deviance",
    command: "/visakan:greatness-is-deviance",
    themes: ["starting", "self"],
    problemHint:
      "I have an idea that would look strange or embarrassing to the people around me and that is the only thing stopping me.",
  },
  {
    slug: "word-magic",
    figureSlug: "visakan",
    title: "Word Magic",
    tagline:
      "Write to figure yourself out, not to perform an already finished thought. Experiment with the phrasing until you find the handful of words that actually carry weight.",
    whenToUse:
      "You are trying to think through something confusing or emotionally loaded and you keep waiting until you understand it before writing anything down.",
    source: "Visakan Veerasamy, essay Word Magic",
    sourceAnchor: "visakanv.com/blog/word-magic, and the 1000wordvomits project begun 2012",
    command: "/visakan:word-magic",
    themes: ["thinking", "meaning"],
    problemHint:
      "I have a confusing feeling or situation I cannot think through until I already understand it, which means I never start writing about it.",
  },
  {
    slug: "write-for-outliers",
    figureSlug: "visakan",
    title: "Write for the Outliers, Not Most People",
    tagline:
      "Aim at the 0.1 percent outliers in optimism, thoughtfulness, and drive, not the average reader. Optimizing for the median produces nothing worth reading or becoming.",
    whenToUse:
      "You are diluting a piece of work, a message, or a standard for yourself to make it acceptable to the average person, instead of aiming it at the people it is actually for.",
    source: "Visakan Veerasamy, essay Most People",
    sourceAnchor: "visakanv.com/blog/most-people",
    command: "/visakan:write-for-outliers",
    themes: ["focus", "growth"],
    problemHint:
      "I am watering down my work or my standards to not alienate anyone, and I think it is making the work worse.",
  },
  {
    slug: "claim-the-identity",
    figureSlug: "visakan",
    title: "Claim the Identity",
    tagline:
      "Name the identity you have been living without permission to claim. A named identity, like friendly ambitious nerd, gives you somewhere to stand instead of feeling alone in a contradiction.",
    whenToUse:
      "You feel like a contradiction, too ambitious to fit in, too nerdy to be taken seriously, too sensitive to compete, and you have not yet found a name for what you actually are.",
    source: "Visakan Veerasamy, essay Friendly Ambitious Nerd",
    sourceAnchor: "visakanv.com/blog/friendly-ambitious-nerd",
    command: "/visakan:claim-the-identity",
    themes: ["self", "meaning"],
    problemHint:
      "I feel like a contradiction, too much of one thing and not enough of another, and I do not have a name for what I actually am.",
  },

  // ───── Brad Jacobs ─────
  {
    slug: "brad-jacobs",
    themes: ["deciding", "money", "growth"],
    problemHint:
      "I'm sitting on a boring, fragmented industry that nobody wants to touch and I can't tell if it's an opportunity or a trap.",
    figureSlug: "brad-jacobs",
    title: "Channel Brad Jacobs",
    tagline:
      "Pick a big, fragmented, growing industry. Find the bingo quadrant. Hire for intelligence, hunger, integrity, and kindness. Integrate fast and radically accept what goes wrong.",
    whenToUse:
      "Evaluating a fragmented industry for a roll-up, sizing up a big and messy deal, deciding whether to keep or cut an executive, planning the first 100 days after an acquisition, or absorbing a loss without spiraling.",
    source: "How to Make a Few Billion Dollars by Brad Jacobs (2024)",
    command: "/brad-jacobs:brad-jacobs",
    umbrella: true,
  },
  {
    slug: "bingo-quadrant",
    themes: ["deciding", "money", "growth"],
    problemHint:
      "Everyone tells me this deal or this market is too big and too messy to touch, and I want to know if that's actually true.",
    figureSlug: "brad-jacobs",
    title: "Find the Bingo Quadrant",
    tagline:
      "Screen a fragmented industry the way Jacobs screens one before committing a dollar: big enough, growing faster than GDP, and a real technology or data lever the incumbents don't have.",
    whenToUse:
      "You're sizing up whether to enter a fragmented industry or chase a large, complicated deal, and you need a real test instead of a gut feeling.",
    source: "How to Make a Few Billion Dollars by Brad Jacobs (2024)",
    sourceAnchor: "The industry-research method behind United Waste Systems, United Rentals, XPO, and QXO",
    command: "/brad-jacobs:bingo-quadrant",
  },
  {
    slug: "hundred-day-integration",
    themes: ["building", "leading", "growth"],
    problemHint:
      "I just closed a deal (or a merger, or a big hire) and I don't have a real plan for the first few months, just good intentions.",
    figureSlug: "brad-jacobs",
    title: "The First 100 Days",
    tagline:
      "Assign individual ownership, not committees. Ask the frontline two blunt questions. Push good practices out fast. Integration, not the signing, is where the value is won or lost.",
    whenToUse:
      "Planning or running the first 100 days after an acquisition, merger, or major reorg, when the deal is done and the real work of combining two organizations is about to start.",
    source: "How to Make a Few Billion Dollars by Brad Jacobs (2024)",
    sourceAnchor: "The post-acquisition integration playbook behind United Rentals and XPO",
    command: "/brad-jacobs:hundred-day-integration",
  },
  {
    slug: "resignation-test",
    themes: ["leading", "deciding"],
    problemHint:
      "I have a senior hire or an existing team member and I genuinely can't tell if I should be worried about losing them or relieved.",
    figureSlug: "brad-jacobs",
    title: "The Resignation Test",
    tagline:
      "Screen for intelligence, hunger, integrity, and kindness. Run 7-8 real interviews. Then imagine they just quit: panic means an A-player, relief means you already know the answer.",
    whenToUse:
      "Deciding whether to hire, keep, promote, or let go of an executive or key team member, or designing a hiring process that filters harder than a resume review.",
    source: "How to Make a Few Billion Dollars by Brad Jacobs (2024)",
    sourceAnchor: "The four-quality hiring filter and the resignation test",
    command: "/brad-jacobs:resignation-test",
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
