// Books are the second axis of summon.guide.
// A guide is a person we summon. A book is a primary source we drew from.
// Every skill in src/lib/skills.ts is grounded in one or more books here.
//
// Three roles:
//   "by": the figure wrote it themselves (Franklin's Autobiography,
//                  Lee Kuan Yew's From Third World to First, Deutsch's
//                  The Beginning of Infinity)
//   "about": biography by another author (Chernow's Titan, Isaacson's
//                  Elon Musk, Plutarch on Alexander)
//   "compiled": anthology compiled by another author from the figure's
//                  own writings, interviews, and talks (Jorgenson's
//                  The Almanack of Naval Ravikant, The Book of Elon)
//
// PDFs are not committed to the repo, see /sources/ and /sources/README.md
// for the ingestion workflow. The `pdfPath` field is for local Claude
// sessions to find the file; it is never served from the website.

export interface Book {
  /** stable kebab-case slug, used as the URL fragment if we ever add /books/<slug> */
  slug: string;
  title: string;
  /** author of THIS book (not necessarily the figure, see `role`) */
  author: string;
  /** publication year of the edition we ingested */
  year: number;
  /** how the book relates to the figure */
  role: "by" | "about" | "compiled";
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
}

export const books: Book[] = [
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
    status: "partial",
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
    status: "partial",
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
    skillSlugs: ["lead-from-front"],
    status: "partial",
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
    skillSlugs: ["good-explanations", "principle-of-optimism"],
    status: "complete",
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
    skillSlugs: ["four-strands"],
    status: "partial",
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
    status: "partial",
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
    status: "partial",
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
    status: "partial",
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
