// Books are the second axis of summon.guide.
// A guide is a person we summon. A book is a primary source we drew from.
// Every skill in src/lib/skills.ts is grounded in one or more books here.
//
// Four roles:
//   "by": the figure wrote it themselves (Franklin's Autobiography,
//                  Lee Kuan Yew's From Third World to First, Deutsch's
//                  The Beginning of Infinity)
//   "about": biography by another author (Chernow's Titan, Isaacson's
//                  Elon Musk, Plutarch on Alexander)
//   "compiled": anthology compiled by another author from the figure's
//                  own writings, interviews, and talks (Jorgenson's
//                  The Almanack of Naval Ravikant, The Book of Elon)
//   "channel": a podcast or YouTube channel is the figure's own primary
//                  source, the way a book is for everyone else (Founders
//                  Podcast for David Senra). `year` is the year the channel
//                  started rather than a publication year.
//
// PDFs are not committed to the repo, see /sources/ and /sources/README.md
// for the ingestion workflow. The `pdfPath` field is for local Claude
// sessions to find the file; it is never served from the website.

export interface Book {
  /** stable kebab-case slug, used as the URL fragment if we ever add /books/<slug> */
  slug: string;
  title: string;
  /** author of THIS book (not necessarily the figure, see `role`); for a
   *  channel, the host */
  author: string;
  /** publication year of the edition we ingested, or the year a channel started */
  year: number;
  /** how the book relates to the figure */
  role: "by" | "about" | "compiled" | "channel";
  /** matches a slug in src/lib/figures.ts */
  figureSlug: string;
  /** one-paragraph description shown on the profile page */
  description?: string;
  /** external link for "buy / read more" */
  amazonUrl?: string;
  /** path under /sources/ if we have a PDF locally (gitignored) */
  pdfPath?: string;
  /** skill slugs (from src/lib/skills.ts) derived from this book */
  skillSlugs?: string[];
  /** ingestion status of this book in our skills pipeline */
  status: "pending" | "partial" | "complete";
  /** content/knowledge/ subdirectories holding this source's synthesis
   *  files (episode digests for a channel, chapter digests for a book via
   *  book-to-knowledge). Presence of this field, not `role`, is what makes
   *  a book chat-eligible. Read by scripts/gen-source-corpus.mjs to build
   *  src/lib/sourceCorpus.ts, which grounds /chat/source/<slug>. */
  corpusPaths?: string[];
}

export const books: Book[] = [
  // Buffett and Munger
  {
    slug: "berkshire-shareholder-letters",
    title: "Berkshire Hathaway Shareholder Letters, 1977-2024",
    author: "Warren E. Buffett",
    year: 2024,
    role: "by",
    figureSlug: "warren-buffett",
    description:
      "The official Berkshire Hathaway archive of Warren Buffett's annual shareholder letters, 1977 through 2024: primary-source lessons in owner economics, capital allocation, business quality, management, risk, mistakes, and compounding. This corpus is a curated selection of the most substantive letters (34 of the ~48 years), not every single year digested in full.",
    amazonUrl: "https://www.berkshirehathaway.com/letters/letters.html",
    skillSlugs: ["warren-buffett", "owner-earnings", "circle-of-competence", "retained-earnings-test", "financial-fortress", "acquisition-filter"],
    status: "partial",
    corpusPaths: ["content/knowledge/berkshire-shareholder-letters"],
  },
  {
    slug: "poor-charlies-almanack",
    title: "Poor Charlie's Almanack",
    author: "Charles T. Munger, edited by Peter D. Kaufman",
    year: 2005,
    role: "compiled",
    figureSlug: "charlie-munger",
    description:
      "Munger's talks, speeches, and practical maxims on multidisciplinary thinking, incentives, human misjudgment, inversion, opportunity cost, and becoming a learning machine, supplemented here by his first-person account of the Berkshire system in the 2014 shareholder letter.",
    amazonUrl: "https://www.stripe.press/poor-charlies-almanack",
    skillSlugs: ["charlie-munger", "invert-the-problem", "incentive-audit", "lollapalooza-check", "berkshire-system", "deserved-trust"],
    status: "partial",
    corpusPaths: ["content/knowledge/poor-charlies-almanack"],
  },

  // Rockefeller
  {
    slug: "titan-chernow",
    title: "Titan: The Life of John D. Rockefeller, Sr.",
    author: "Ron Chernow",
    year: 1998,
    role: "about",
    figureSlug: "rockefeller",
    description:
      "The definitive 800-page biography. The source of every framework we attribute to Rockefeller: Ledger A, the Cleveland Massacre, the dimes, the systematic philanthropy.",
    amazonUrl: "https://www.amazon.com/Titan-Life-John-Rockefeller-Sr/dp/1400077303",
    skillSlugs: ["ledger", "crisis"],
    corpusPaths: ["content/knowledge/titan-chernow"],
    status: "complete",
  },

  // Franklin
  {
    slug: "autobiography-of-benjamin-franklin",
    title: "The Autobiography of Benjamin Franklin",
    author: "Benjamin Franklin",
    year: 1791,
    role: "by",
    figureSlug: "franklin",
    description:
      "Franklin's own account, begun 1771, published posthumously. The 13 Virtues, the Junto, his approach to self-education and reinvention all come from here.",
    amazonUrl: "https://www.amazon.com/Autobiography-Benjamin-Franklin/dp/0486290735",
    skillSlugs: ["thirteen-virtues"],
    status: "partial",
    corpusPaths: ["content/knowledge/autobiography-of-benjamin-franklin"],
  },
  {
    slug: "benjamin-franklin-an-american-life",
    title: "Benjamin Franklin: An American Life",
    author: "Walter Isaacson",
    year: 2003,
    role: "about",
    figureSlug: "franklin",
    description:
      "Isaacson's biography. Best modern source for Franklin's diplomatic work in France, the Junto's institutional legacy, and his reinventions across seven careers.",
    amazonUrl: "https://www.amazon.com/Benjamin-Franklin-American-Walter-Isaacson/dp/074325807X",
    skillSlugs: ["junto"],
    status: "partial",
  },

  // Jobs
  {
    slug: "steve-jobs-isaacson",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    year: 2011,
    role: "about",
    figureSlug: "steve-jobs",
    description:
      "Isaacson's authorized biography, based on more than forty interviews with Jobs over two years plus interviews with over a hundred family members, friends, adversaries, and colleagues. The definitive account of the garage founding, the 1985 ouster, the NeXT and Pixar wilderness years, the 1997 return and turnaround, and the product decisions behind the iMac, iPod, iPhone, and iPad, in Jobs's own words as well as those who worked with him.",
    amazonUrl: "https://www.amazon.com/Steve-Jobs-Walter-Isaacson/dp/1451648537",
    status: "partial",
    corpusPaths: ["content/knowledge/steve-jobs-isaacson"],
  },

  // Elon
  {
    slug: "elon-musk-isaacson",
    title: "Elon Musk",
    author: "Walter Isaacson",
    year: 2023,
    role: "about",
    figureSlug: "elon",
    description:
      "Isaacson's authorized biography after two years of shadowing Musk. Source for the manufacturing algorithm, the idiot index, and the 2008 crucible.",
    amazonUrl: "https://www.amazon.com/Elon-Musk-Walter-Isaacson/dp/1982181281",
    skillSlugs: ["first-principles", "five-step-algorithm", "idiot-index"],
    status: "complete",
  },
  {
    slug: "elon-musk-vance",
    title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    author: "Ashlee Vance",
    year: 2015,
    role: "about",
    figureSlug: "elon",
    description:
      "The earlier biography. Best on Musk's South African childhood, Zip2, PayPal, and the SpaceX startup years before Falcon 1 reached orbit.",
    amazonUrl: "https://www.amazon.com/Elon-Musk-SpaceX-Fantastic-Future/dp/006230125X",
    skillSlugs: [],
    status: "complete",
    corpusPaths: ["content/knowledge/elon-musk-vance"],
  },
  {
    slug: "the-book-of-elon",
    title: "The Book of Elon",
    author: "Eric Jorgenson",
    year: 2025,
    role: "compiled",
    figureSlug: "elon",
    description:
      "Jorgenson's anthology of Musk's own words: interviews, transcripts, talks. Same compiler as The Almanack of Naval Ravikant. Pending ingestion: drop the PDF in sources/elon/the-book-of-elon.pdf and we'll extract a fresh set of skills.",
    pdfPath: "sources/elon/the-book-of-elon.pdf",
    skillSlugs: [],
    status: "pending",
  },

  // Jensen Huang
  {
    slug: "the-nvidia-way",
    title: "The Nvidia Way",
    author: "Tae Kim",
    year: 2024,
    role: "about",
    figureSlug: "jensen-huang",
    description:
      "The first full account of Nvidia's thirty-year history, built on more than one hundred interviews including Jensen Huang himself. Traces the Denny's founding with cofounders Curtis Priem and Chris Malachowsky, three separate near-death experiences (the NV1, the RIVA production crisis, the NV30), the coining of the term GPU, the two-decade CUDA bet, and the culture of 'Speed of Light' standards and public criticism that Kim calls the Nvidia Way.",
    amazonUrl: "https://www.amazon.com/Nvidia-Way-Jensen-Huangs-Silicon/dp/1324086712",
    pdfPath: "sources/jensen-huang/the-nvidia-way.pdf",
    skillSlugs: [],
    status: "complete",
    corpusPaths: ["content/knowledge/the-nvidia-way"],
  },

  // Peter Thiel
  {
    slug: "zero-to-one",
    title: "Zero to One: Notes on Startups, or How to Build the Future",
    author: "Peter Thiel with Blake Masters",
    year: 2014,
    role: "by",
    figureSlug: "peter-thiel",
    description:
      "Thiel's own primer on startups, expanded from a 2012 Stanford class Blake Masters took notes on. Argues that competition destroys profits and every valuable company is some kind of monopoly; lays out the definite-optimist 2x2 for thinking about the future, the power law that governs venture returns, the 'Thiel's law' foundations every founder gets one shot at, why distribution is as important as product, and the seven questions every business must answer, illustrated by the cleantech bubble and Tesla's escape from it.",
    amazonUrl: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
    pdfPath: "sources/peter-thiel/zero-to-one.pdf",
    skillSlugs: [],
    status: "complete",
    corpusPaths: ["content/knowledge/zero-to-one"],
  },

  // Alexander
  {
    slug: "life-of-alexander-plutarch",
    title: "Life of Alexander",
    author: "Plutarch",
    year: 100,
    role: "about",
    figureSlug: "alexander",
    description:
      "Roman-era biography written ~AD 100. Source for the taming of Bucephalus, the helmet of water in the Gedrosian Desert, and Alexander's character.",
    amazonUrl: "https://www.gutenberg.org/ebooks/674",
    skillSlugs: ["lead-from-front"],
    status: "complete",
    corpusPaths: ["content/knowledge/life-of-alexander-plutarch"],
  },
  {
    slug: "campaigns-of-alexander-arrian",
    title: "The Campaigns of Alexander (Anabasis Alexandri)",
    author: "Arrian",
    year: 145,
    role: "about",
    figureSlug: "alexander",
    description:
      "The most reliable ancient military account, drawing on Ptolemy I's lost memoirs. Source for Granicus, Issus, Gaugamela, and the siege of Tyre.",
    skillSlugs: ["decisive-point"],
    status: "partial",
  },
  {
    slug: "alexander-the-great-fox",
    title: "Alexander the Great",
    author: "Robin Lane Fox",
    year: 1973,
    role: "about",
    figureSlug: "alexander",
    description:
      "Modern scholarly biography. Best for synthesizing the ancient sources and assessing strategy, leadership, and the campaign's geography.",
    amazonUrl: "https://www.amazon.com/Alexander-Great-Robin-Lane-Fox/dp/0140088784",
    skillSlugs: [],
    status: "partial",
  },

  // Deutsch
  {
    slug: "the-beginning-of-infinity",
    title: "The Beginning of Infinity",
    author: "David Deutsch",
    year: 2011,
    role: "by",
    figureSlug: "deutsch",
    description:
      "Deutsch's argument that good explanations, ones that are hard to vary while still accounting for what they explain, are the engine of unbounded human progress.",
    amazonUrl: "https://www.amazon.com/Beginning-Infinity-Explanations-Transform-World/dp/0143121359",
    skillSlugs: ["jump-to-universality", "replicator-interest", "spot-bad-philosophy", "choice-as-explanation", "rational-vs-anti-rational-memes", "unsustainable-by-design"],
    status: "partial",
    corpusPaths: ["content/knowledge/the-beginning-of-infinity"],
  },
  {
    slug: "the-fabric-of-reality",
    title: "The Fabric of Reality",
    author: "David Deutsch",
    year: 1997,
    role: "by",
    figureSlug: "deutsch",
    description:
      "Deutsch's first book. Argues that quantum physics, epistemology, evolution, and computation are deeply intertwined strands of a single theory of reality.",
    amazonUrl: "https://www.amazon.com/Fabric-Reality-Parallel-Universes-Implications/dp/014027541X",
    skillSlugs: ["problem-solving-cycle", "kicked-rock-test", "universal-version", "certainty-audit", "seminar-room-rule"],
    status: "partial",
    corpusPaths: ["content/knowledge/the-fabric-of-reality"],
  },

  // Taleb, the Incerto. Registered here as separate books because each one
  // stands alone; "via-negativa" cites the whole collection and is not
  // reattached to a single title. Antifragile and The Bed of Procrustes are
  // not registered yet: the only local PDFs found for them are third-party
  // Bookey chapter-quiz summaries, not Taleb's own text.
  {
    slug: "fooled-by-randomness",
    title: "Fooled by Randomness",
    author: "Nassim Nicholas Taleb",
    year: 2001,
    role: "by",
    figureSlug: "nassim-taleb",
    description:
      "The first Incerto book. On the difference between skill and luck, why rare, unseen events dominate outcomes people attribute to competence, and how a trader survives long enough for competence to matter.",
    amazonUrl: "https://www.amazon.com/Fooled-Randomness-Hidden-Markets-Incerto/dp/0812975219",
    skillSlugs: ["alternative-histories", "count-the-monkeys", "match-the-observation-window", "weight-the-magnitude", "distrust-the-hot-streak", "falsify-before-you-commit"],
    status: "partial",
    corpusPaths: ["content/knowledge/fooled-by-randomness"],
  },
  {
    slug: "the-black-swan",
    title: "The Black Swan",
    author: "Nassim Nicholas Taleb",
    year: 2007,
    role: "by",
    figureSlug: "nassim-taleb",
    description:
      "Rare, high-impact, retrospectively-rationalized events, and why forecasting and expert prediction routinely miss them. The book that made Taleb's name.",
    amazonUrl: "https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X",
    skillSlugs: ["black-swan-triplet-test", "mediocristan-extremistan-map", "turkey-problem", "narrative-fallacy-guard", "silent-evidence-audit", "ludic-fallacy-check", "fourth-quadrant-map"],
    status: "partial",
    corpusPaths: ["content/knowledge/the-black-swan"],
  },
  {
    slug: "skin-in-the-game",
    title: "Skin in the Game",
    author: "Nassim Nicholas Taleb",
    year: 2018,
    role: "by",
    figureSlug: "nassim-taleb",
    description:
      "Hidden asymmetries in daily life: who bears the downside of a decision, why symmetry of risk is the precondition for trust, and how removing skin in the game corrupts a system.",
    amazonUrl: "https://www.amazon.com/Skin-Game-Hidden-Asymmetries-Daily/dp/0425284639",
    skillSlugs: ["portfolio-not-opinion", "minority-rule", "intellectual-yet-idiot", "skin-of-others-audit", "green-lumber-test", "merchandising-of-virtue"],
    status: "partial",
    corpusPaths: ["content/knowledge/skin-in-the-game"],
  },

  // Lee Kuan Yew
  {
    slug: "the-singapore-story",
    title: "The Singapore Story: Memoirs of Lee Kuan Yew",
    author: "Lee Kuan Yew",
    year: 1998,
    role: "by",
    figureSlug: "lee-kuan-yew",
    description:
      "Lee's account of Singapore's founding through 1965: the British colonial years, the Japanese Occupation, merger with Malaysia, and the traumatic separation.",
    amazonUrl: "https://www.amazon.com/Singapore-Story-Memoirs-Lee-Kuan/dp/0130208035",
    skillSlugs: [],
    status: "partial",
  },
  {
    slug: "from-third-world-to-first",
    title: "From Third World to First: The Singapore Story 1965–2000",
    author: "Lee Kuan Yew",
    year: 2000,
    role: "by",
    figureSlug: "lee-kuan-yew",
    description:
      "The sequel covering 1965 onward. Source for the HDB housing program, the Corrupt Practices Investigation Bureau, and the pragmatist doctrine.",
    amazonUrl: "https://www.amazon.com/Third-World-First-Singapore-1965-2000/dp/0060957514",
    skillSlugs: ["pragmatist-test", "incorruptibility"],
    status: "partial",
  },
  {
    slug: "one-mans-view-of-the-world",
    title: "One Man's View of the World",
    author: "Lee Kuan Yew",
    year: 2013,
    role: "by",
    figureSlug: "lee-kuan-yew",
    description:
      "Lee's late-life assessment of geopolitics and Singapore's place in it: the U.S., China, Japan, Europe, Southeast Asia, and small-state survival.",
    amazonUrl: "https://www.amazon.com/One-Mans-View-World/dp/9814342564",
    skillSlugs: [],
    status: "partial",
  },

  // Marcus Aurelius
  {
    slug: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    role: "by",
    figureSlug: "marcus-aurelius",
    description:
      "Twelve books of private notes written in Greek on the northern frontier, never meant for publication. The most enduring practical-philosophy text ever written: the dichotomy of control, the view from above, memento mori, and the obstacle becoming the way. Public domain.",
    amazonUrl:
      "https://www.amazon.com/Meditations-New-Translation-Marcus-Aurelius/dp/0812968255",
    skillSlugs: ["dichotomy-of-control", "view-from-above", "memento-mori"],
    status: "complete",
    corpusPaths: ["content/knowledge/meditations"],
  },

  // Marc Andreessen: his own essays
  {
    slug: "why-software-is-eating-the-world",
    title: "Why Software Is Eating the World",
    author: "Marc Andreessen",
    year: 2011,
    role: "by",
    figureSlug: "marc-andreessen",
    description:
      "The 2011 Wall Street Journal essay that named the era. The argument that software companies were poised to take over industry after industry, framed years before it was conventional wisdom.",
    amazonUrl: "https://a16z.com/why-software-is-eating-the-world/",
    skillSlugs: ["software-eats-the-world"],
    status: "complete",
    corpusPaths: ["content/knowledge/why-software-is-eating-the-world"],
  },
  {
    slug: "its-time-to-build",
    title: "It's Time to Build",
    author: "Marc Andreessen",
    year: 2020,
    role: "by",
    figureSlug: "marc-andreessen",
    description:
      "The April 2020 essay written in the early weeks of the pandemic. A direct argument that Western institutions had stopped building, and that the right response to any problem is to ask “what do we build to fix it, and what is stopping the build?”",
    amazonUrl: "https://a16z.com/its-time-to-build/",
    skillSlugs: ["its-time-to-build"],
    status: "complete",
    corpusPaths: ["content/knowledge/its-time-to-build"],
  },
  {
    slug: "techno-optimist-manifesto",
    title: "The Techno-Optimist Manifesto",
    author: "Marc Andreessen",
    year: 2023,
    role: "by",
    figureSlug: "marc-andreessen",
    description:
      "The October 2023 manifesto. Marc's most fully articulated worldview: capability over caution, abundance over scarcity, building over critique. The operating philosophy underneath the other two essays.",
    amazonUrl: "https://a16z.com/the-techno-optimist-manifesto/",
    skillSlugs: ["techno-optimism"],
    status: "complete",
    corpusPaths: ["content/knowledge/techno-optimist-manifesto"],
  },

  // Adam Neumann, books ABOUT him (he has not written one)
  {
    slug: "billion-dollar-loser",
    title:
      "Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork",
    author: "Reeves Wiedeman",
    year: 2020,
    role: "about",
    figureSlug: "adam-neumann",
    description:
      "The first major book on WeWork, by a New York magazine writer who had been reporting on the company throughout the run. Best on the mission-as-moat technique, the cultural details of the WeWork floor, and how the narrative compressed the early rounds.",
    amazonUrl:
      "https://www.amazon.com/Billion-Dollar-Loser-Spectacular-Neumann/dp/0316461342",
    skillSlugs: ["mission-as-moat", "narrative-arbitrage"],
    status: "partial",
  },
  {
    slug: "the-cult-of-we",
    title:
      "The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion",
    author: "Eliot Brown and Maureen Farrell",
    year: 2021,
    role: "about",
    figureSlug: "adam-neumann",
    description:
      "The deeply reported Wall Street Journal account of the SoftBank dynamics, the S-1 disaster, and the six weeks between filing and ouster. The clearest source on what the public-market scrutiny actually exposed.",
    amazonUrl:
      "https://www.amazon.com/Cult-We-WeWork-Neumann-Startup/dp/0593237145",
    skillSlugs: ["s1-reality-check"],
    status: "partial",
  },

  // Seneca: his own works, all public domain
  {
    slug: "letters-from-a-stoic",
    title: "Letters from a Stoic (Epistulae Morales ad Lucilium)",
    author: "Seneca",
    year: 65,
    role: "by",
    figureSlug: "seneca",
    description:
      "124 letters written to Seneca's friend Lucilius, governor of Sicily, in the last three years of Seneca's life. Each letter takes one practical idea (time, friendship, anger, crowds, death) and works it down to something you can do today. The single most readable Stoic text ever written.",
    amazonUrl: "https://www.amazon.com/Letters-Stoic-Penguin-Classics-Seneca/dp/0140442103",
    skillSlugs: ["letters-from-a-stoic"],
    status: "partial",
    corpusPaths: ["content/knowledge/letters-from-a-stoic"],
  },
  {
    slug: "on-the-shortness-of-life",
    title: "On the Shortness of Life (De Brevitate Vitae)",
    author: "Seneca",
    year: 49,
    role: "by",
    figureSlug: "seneca",
    description:
      "A short essay addressed to Seneca's friend Paulinus on the use of time. The core argument: life is long enough if well invested; we make it short by selling it cheaply, hour by hour, to projects we have not chosen.",
    amazonUrl: "https://www.amazon.com/Shortness-Life-Penguin-Great-Ideas/dp/0143036327",
    skillSlugs: ["on-the-shortness-of-life"],
    status: "partial",
  },
  {
    slug: "on-anger",
    title: "On Anger (De Ira)",
    author: "Seneca",
    year: 45,
    role: "by",
    figureSlug: "seneca",
    description:
      "Three books on anger as a vice: its physiology, its destructiveness, and the practical techniques for not being governed by it. The clearest pre-modern account of what to do between the trigger and the response.",
    amazonUrl: "https://www.amazon.com/Dialogues-Essays-Oxford-Worlds-Classics/dp/0199552401",
    skillSlugs: ["on-anger"],
    status: "partial",
  },
  {
    slug: "zombies-in-western-culture",
    title: "Zombies in Western Culture: A Twenty-First Century Crisis",
    author: "John Vervaeke, Christopher Mastropietro and Filip Miscevic",
    year: 2017,
    role: "by",
    figureSlug: "vervaeke",
    description:
      "An open access study that reads the zombie figure as a diagnosis of cultural alienation: a body without inner life, moving without meaning. The authors use it to describe the loss of the shared frameworks that connect people to each other and to the world.",
    amazonUrl: "https://www.openbookpublishers.com/books/10.11647/obp.0113",
    skillSlugs: ["vervaeke", "four-kinds-of-knowing", "relevance-realization", "ecology-of-practices"],
    status: "partial",
  },
  {
    slug: "the-war-of-art",
    title: "The War of Art",
    author: "Steven Pressfield",
    year: 2002,
    role: "by",
    figureSlug: "pressfield",
    description:
      "Pressfield's account of Resistance, the impersonal force that opposes any work that matters, and of turning pro as the only reliable defence against it. Written in very short chapters, arranged in three parts: defining the enemy, combating it, and what shows up once you are working.",
    amazonUrl: "https://www.amazon.com/War-Art-Through-Creative-Battles/dp/1936891026",
    pdfPath: "sources/pressfield/the-war-of-art.pdf",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/the-war-of-art"],
  },
  {
    slug: "siddhartha",
    title: "Siddhartha",
    author: "Hermann Hesse",
    year: 1922,
    role: "by",
    figureSlug: "hesse",
    description:
      "A Brahman's son leaves everything arranged for him, tries asceticism, meets the Buddha and refuses to follow him, falls into wealth and self-disgust, and finally learns to listen to a river. Its argument is that wisdom cannot be transmitted, only arrived at, and that the ruin on the way was not a detour.",
    amazonUrl: "https://www.gutenberg.org/ebooks/2500",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/siddhartha"],
  },

  // Senra: a channel, not a book. See the "channel" role note above.
  {
    slug: "founders-podcast",
    title: "Founders Podcast",
    author: "David Senra",
    year: 2016,
    role: "channel",
    figureSlug: "senra",
    description:
      "Since 2016, Senra has read and narrated over four hundred founder biographies alone, no co-host, no outline, reading from his own pen and ruler annotations. A companion interview feed, under the same banner, talks with living founders and operators directly.",
    amazonUrl: "https://www.founderspodcast.com",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/founders", "content/knowledge/interviews"],
  },

  // Starter Story: an interview library, not a single narrator. See the
  // "channel" role note above.
  {
    slug: "starter-story",
    title: "Starter Story",
    author: "Pat Walls",
    year: 2017,
    role: "channel",
    figureSlug: "unattributed",
    description:
      "Pat Walls's YouTube show interviewing founders about exactly how they built a specific business: real revenue numbers, real customer-acquisition tactics, real pricing and unit economics, not generic advice. This corpus is a curated selection of 28 of the channel's highest-signal episodes out of roughly 170 long-form interviews, weighted toward substantive case studies over thin clip-show entries, digested as a text to chat with directly rather than through any single persona.",
    amazonUrl: "https://www.youtube.com/@starterstory",
    status: "partial",
    corpusPaths: ["content/knowledge/starter-story"],
  },

  // Sivers: five short, self published books
  {
    slug: "anything-you-want",
    title: "Anything You Want",
    author: "Derek Sivers",
    year: 2011,
    role: "by",
    figureSlug: "sivers",
    description:
      "Forty short lessons from founding and selling CD Baby: business as accidental problem solving, ideas as a multiplier of execution rather than a substitute for it, and staying small and controlled on purpose rather than chasing growth.",
    amazonUrl: "https://sive.rs/a",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/anything-you-want"],
  },
  {
    slug: "your-music-and-people",
    title: "Your Music and People",
    author: "Derek Sivers",
    year: 2020,
    role: "by",
    figureSlug: "sivers",
    description:
      "Marketing and reputation lessons drawn from CD Baby, reframed for any creator: marketing as an extension of the art itself, being considerate as a form of being memorable, and proudly excluding most people to matter more to the few.",
    amazonUrl: "https://sive.rs/m",
    skillSlugs: [],
    status: "pending",
  },
  {
    slug: "hell-yeah-or-no",
    title: "Hell Yeah or No",
    author: "Derek Sivers",
    year: 2020,
    role: "by",
    figureSlug: "sivers",
    description:
      "The expansion of a 2009 essay into a full decision filter: if it is not a hell yeah, it is a no. Argues most overcommitment comes from saying yes to too many medium options out of fear rather than genuine desire.",
    amazonUrl: "https://sive.rs/n",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/hell-yeah-or-no"],
  },
  {
    slug: "how-to-live",
    title: "How to Live",
    author: "Derek Sivers",
    year: 2021,
    role: "by",
    figureSlug: "sivers",
    description:
      "Twenty seven short chapters, each fully convinced of a different and often contradictory way to live. Independence and commitment, mastery and always staying a beginner, are each argued completely on their own terms rather than resolved into one rule.",
    amazonUrl: "https://sive.rs/h",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/how-to-live"],
  },
  {
    slug: "useful-not-true",
    title: "Useful Not True",
    author: "Derek Sivers",
    year: 2024,
    role: "by",
    figureSlug: "sivers",
    description:
      "Argues that a belief is worth holding not because it is objectively true but because holding it is useful right now. A short, deliberately uncomfortable case for treating beliefs as tools rather than as claims about reality.",
    amazonUrl: "https://sive.rs/u",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/useful-not-true"],
  },

  // Visakan: self published, no traditional book beyond this one
  {
    slug: "friendly-ambitious-nerd",
    title: "Friendly Ambitious Nerd",
    author: "Visakan Veerasamy",
    year: 2020,
    role: "by",
    figureSlug: "visakan",
    description:
      "A self compiled, self published collection of Veerasamy's best essays and threads from over a decade of writing, naming and defending the identity of the title: smart, striving, a little awkward, and allowed to want things in public.",
    amazonUrl: "https://visakanv.gumroad.com/l/FANbook",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/friendly-ambitious-nerd"],
  },

  // James Clear, Cal Newport, Tim Ferriss, Annie Duke, Carol Dweck,
  // Paul Millerd, Napoleon Hill: digested via the book-to-knowledge
  // pipeline, corpusPaths set on each entry below.
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    role: "by",
    figureSlug: "james-clear",
    description:
      "A practical guide to building good habits and breaking bad ones through the Four Laws of Behavior Change: make it obvious, make it attractive, make it easy, make it satisfying, built on the claim that habits are the compound interest of self improvement.",
    amazonUrl: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/atomic-habits"],
  },
  {
    slug: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    year: 2016,
    role: "by",
    figureSlug: "cal-newport",
    description:
      "A case for distraction free, cognitively demanding work as an increasingly rare and valuable skill, distinguishing deep work from shallow, logistical busywork and laying out rules for cultivating it in a fragmented attention economy.",
    amazonUrl: "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/deep-work"],
  },
  {
    slug: "tools-of-titans",
    title: "Tools of Titans",
    author: "Timothy Ferriss",
    year: 2016,
    role: "by",
    figureSlug: "tim-ferriss",
    description:
      "A distilled playbook of the tactics, routines, and habits of hundreds of world class performers interviewed on The Tim Ferriss Show, organized around health, wealth, and wisdom.",
    amazonUrl: "https://www.amazon.com/Tools-Titans-Billionaires-World-Class-Performers/dp/1328683788",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/tools-of-titans"],
  },
  {
    slug: "tribe-of-mentors",
    title: "Tribe of Mentors",
    author: "Timothy Ferriss",
    year: 2017,
    role: "by",
    figureSlug: "tim-ferriss",
    description:
      "A collection of short, high density interviews with over 100 world class performers, each answering the same compact set of questions on failure, habits, and what they would tell their younger selves.",
    amazonUrl: "https://www.amazon.com/Tribe-Mentors-Short-Life-Changing-Prescriptions/dp/1328995947",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/tribe-of-mentors"],
  },
  {
    slug: "thinking-in-bets",
    title: "Thinking in Bets",
    author: "Annie Duke",
    year: 2018,
    role: "by",
    figureSlug: "annie-duke",
    description:
      "A former professional poker player's case for thinking in probabilities rather than certainties, naming 'resulting', the error of judging a decision's quality by its outcome, and arguing life is more like poker than chess.",
    amazonUrl: "https://www.amazon.com/Thinking-Bets-Making-Smarter-Decisions/dp/0735216355",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/thinking-in-bets"],
  },
  {
    slug: "mindset",
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    year: 2006,
    role: "by",
    figureSlug: "carol-dweck",
    description:
      "A Stanford psychologist's research based case for the distinction between a fixed mindset, believing ability is a static trait, and a growth mindset, believing ability develops through effort and strategy, and how that belief shapes achievement.",
    amazonUrl: "https://www.amazon.com/Mindset-Psychology-Carol-S-Dweck/dp/0345472322",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/mindset"],
  },
  {
    slug: "the-pathless-path",
    title: "The Pathless Path",
    author: "Paul Millerd",
    year: 2022,
    role: "by",
    figureSlug: "paul-millerd",
    description:
      "A former strategy consultant's argument against the default script of school, career ladder, and retirement, drawn from his own extended, unstructured period he calls the void, and a case for building identity from more than a job title.",
    amazonUrl: "https://www.amazon.com/Pathless-Path-Paul-Millerd/dp/B09KYZ8B4C",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/the-pathless-path"],
  },
  {
    slug: "think-and-grow-rich",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    year: 1937,
    role: "by",
    figureSlug: "napoleon-hill",
    description:
      "Hill's claimed twenty year distillation of interviews with leading industrialists of his era into thirteen principles of success: definiteness of purpose, the mastermind principle, persistence, and the transmutation of desire into achievement.",
    amazonUrl: "https://www.amazon.com/Think-Grow-Rich-Landmark-Bestseller/dp/1585424331",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/think-and-grow-rich"],
  },

  // Ray Dalio: his own free-distributed PDFs, the direct precursors to his
  // retail books. "Principles" (2011) is the original free document Life
  // and Work Principles later expanded into. "Principles for Dealing with
  // the Changing World Order" is Dalio's own free chart-and-table companion
  // to the 2021 retail hardcover, not the prose edition, corpusPaths
  // reflects that: real frameworks/timelines/data, not narrative chapters.
  {
    slug: "principles",
    title: "Principles",
    author: "Ray Dalio",
    year: 2011,
    role: "by",
    figureSlug: "ray-dalio",
    description:
      "Dalio's original free PDF, the direct precursor to Principles: Life and Work. Three parts: why principles matter, his most fundamental life principles, and his management principles as lived out at Bridgewater, roughly 200 principles covering culture, hiring, and decision-making.",
    amazonUrl: "https://www.amazon.com/Principles-Life-Work-Ray-Dalio/dp/1501124021",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/principles"],
  },
  {
    slug: "principles-for-dealing-with-the-changing-world-order",
    title: "Principles for Dealing with the Changing World Order",
    author: "Ray Dalio",
    year: 2021,
    role: "by",
    figureSlug: "ray-dalio",
    description:
      "Dalio's framework for reading empires rising and falling through a repeating Big Cycle of money, credit, debt, and power, tested against the Dutch, British, American, and Chinese empires. This source is Dalio's own free chart-and-table companion PDF, not the prose edition, so the grounding here draws on real frameworks, historical timelines, and data tables rather than extended narrative.",
    amazonUrl: "https://www.amazon.com/Principles-Dealing-Changing-World-Order/dp/1982160272",
    skillSlugs: [],
    status: "partial",
    corpusPaths: ["content/knowledge/principles-for-dealing-with-the-changing-world-order"],
  },

  // Tao Te Ching: a pure-text corpus, deliberately with no guide persona.
  // Traditional attribution to "Lao Tzu" is semi-legendary and historically
  // disputed, so figureSlug points at no entry in figures.ts on purpose,
  // this book grounds /chat/source/tao-te-ching only, chat with the text
  // itself rather than with a claimed author.
  {
    slug: "tao-te-ching",
    title: "Tao Te Ching",
    author: "Laozi",
    year: 1891,
    role: "by",
    figureSlug: "unattributed",
    description:
      "Eighty-one short chapters traditionally split into the Tao Ching and the Teh Ching, teaching government and self-cultivation by yielding, emptiness, and non-action (wu wei). This is James Legge's 1891 scholarly translation, the widely cited public-domain edition. Authorship is traditionally credited to Lao Tzu, a semi-legendary figure with no settled historical record, so this source is registered as a text to chat with directly, not a guide.",
    amazonUrl: "https://www.gutenberg.org/ebooks/216",
    skillSlugs: [],
    status: "complete",
    corpusPaths: ["content/knowledge/tao-te-ching"],
  },

  // The Bible: Wisdom & Teaching. Same pure-text pattern as Tao Te Ching,
  // deliberately no guide persona, figureSlug points at no entry in
  // figures.ts on purpose. Scripture has no single human author in the
  // sense this schema otherwise assumes, and this project's own
  // notability/onboarding docs already flag religious founders as a
  // landmine to handle with care, so this grounds /chat/source/bible
  // only, chat with the text itself, never a persona claiming to speak
  // as God, Jesus, Solomon, or David. Scoped deliberately to the
  // wisdom/advice-oriented books (Proverbs, Ecclesiastes, selected
  // Psalms, the Sermon on the Mount) rather than the full 66-book canon,
  // most of which (genealogies, ritual law, historical narrative) doesn't
  // serve "ask this book for advice." Source is the King James Version,
  // public domain, via Project Gutenberg.
  {
    slug: "bible",
    title: "The Bible: Wisdom & Teaching",
    author: "the biblical authors",
    year: 1611,
    role: "compiled",
    figureSlug: "unattributed",
    description:
      "A scoped selection from the King James Version covering the Bible's advice-oriented core: Proverbs (aphorisms on speech, wealth, discipline, and character), Ecclesiastes (a sustained meditation on mortality and meaning), a selection of wisdom and reflection Psalms, and the Sermon on the Mount (Matthew 5-7). Not the full 66-book canon, this is the material people actually turn to for guidance, digested as a text to chat with directly rather than through any persona.",
    amazonUrl: "https://www.gutenberg.org/ebooks/10",
    skillSlugs: [],
    status: "complete",
    corpusPaths: [
      "content/knowledge/bible-proverbs",
      "content/knowledge/bible-ecclesiastes",
      "content/knowledge/bible-psalms-wisdom",
      "content/knowledge/bible-sermon-on-the-mount",
    ],
  },

  // Lulie Tanett: her own essays, published at lulie.co.uk. Self-educated
  // Oxford-based writer working in the Popper/Deutsch epistemic tradition
  // (fallibilism, anti-coercion, Taking Children Seriously). Living author,
  // still actively publishing, so this corpus is a snapshot of her essays
  // as of August 2026, not a closed canon.
  {
    slug: "reason-is-fun-essays",
    title: "Reason Is Fun: Selected Essays",
    author: "Lulie Tanett",
    year: 2024,
    role: "by",
    figureSlug: "lulie-tanett",
    description:
      "A curated set of essays from Lulie Tanett's blog, lulie.co.uk, working in the Popper/Deutsch tradition of fallibilist epistemology applied to personal life: why discipline is usually internal conflict, why coercion (including self-coercion) can't manufacture new thoughts, how knowledge actually grows, and her open research questions.",
    amazonUrl: "https://www.lulie.co.uk/",
    skillSlugs: [],
    status: "complete",
    corpusPaths: ["content/knowledge/reason-is-fun-essays"],
  },
];

/** All books for a single figure. */
export function getBooksForFigure(figureSlug: string): Book[] {
  return books.filter((b) => b.figureSlug === figureSlug);
}

/** A single book by slug. */
export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
