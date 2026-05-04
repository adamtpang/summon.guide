// Wiki-style profile data per figure. Keyed by figure slug.
// Used by /[figure] profile pages. Kept separate from figures.ts so the
// large system prompts and the readable bio prose live in different files.

export interface Profile {
  slug: string;
  occupation: string; // short, comma-separated (shown under name)
  birthplace?: string;
  bio: string[]; // 2-4 paragraphs of clean prose
  notableQuotes: string[]; // 4-6 famous quotes
  wikipediaUrl: string;
  primarySources: string[]; // books that grounded this guide's training
}

export const profiles: Record<string, Profile> = {
  "john-d-rockefeller": {
    slug: "john-d-rockefeller",
    occupation: "Industrialist, philanthropist, founder of Standard Oil",
    birthplace: "Richford, New York",
    bio: [
      "John Davison Rockefeller (1839–1937) built Standard Oil into the most profitable company in history and became the richest American who ever lived. Born to a con-man father and a devout Baptist mother, he started as a 16-year-old bookkeeper making 50 cents a day and celebrated “Job Day” every September 26 for the rest of his life.",
      "Entering the oil business in 1863, he recognized that refining — not drilling — was where the real money was. He incorporated Standard Oil in 1870 and through the Cleveland Massacre of 1872 bought 22 of 26 competing refiners in six weeks. By 1879 he controlled 90% of American oil refining. At his peak he was worth roughly $400 billion in today's dollars.",
      "After a nervous breakdown in his 50s, he retired at 57 and gave away $540 million through systematic philanthropy guided by Frederick T. Gates. He founded the University of Chicago, Rockefeller University, and the General Education Board, and he lived to 97 — handing out shiny dimes to everyone he met as a lesson on the value of saving.",
    ],
    notableQuotes: [
      "The secret of success is to do the common things uncommonly well.",
      "Don't be afraid to give up the good to go for the great.",
      "Singleness of purpose is one of the chief essentials for success in life.",
      "I believe the power to make money is a gift from God.",
      "Competition is a sin.",
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/John_D._Rockefeller",
    primarySources: ["Titan: The Life of John D. Rockefeller, Sr. by Ron Chernow"],
  },

  "benjamin-franklin": {
    slug: "benjamin-franklin",
    occupation: "Printer, scientist, diplomat, founding father",
    birthplace: "Boston, Massachusetts",
    bio: [
      "Benjamin Franklin (1706–1790) was the original self-made American — a printer, scientist, diplomat, and founding father who reinvented himself across seven careers. The 15th of 17 children of a Boston candle maker, he had only two years of formal schooling and apprenticed in his brother's print shop at 12.",
      "He ran away to Philadelphia at 17 and built the most successful printing operation in the colonies. By 30 he was publishing the Pennsylvania Gazette and Poor Richard's Almanack. He retired from active business at 42, financially independent enough to never work again — and used that freedom to prove lightning was electricity, invent the lightning rod, bifocals, and the Franklin stove.",
      "He helped draft the Declaration of Independence, served as ambassador to France where he secured the alliance that won American independence, and was the oldest delegate to the Constitutional Convention at 81. He died in 1790 at age 84, having shaped a nation through charm, persuasion, and 13 carefully tracked virtues.",
    ],
    notableQuotes: [
      "An investment in knowledge pays the best interest.",
      "Well done is better than well said.",
      "By failing to prepare, you are preparing to fail.",
      "Either write something worth reading or do something worth writing.",
      "Energy and persistence conquer all things.",
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
    primarySources: [
      "The Autobiography of Benjamin Franklin",
      "Benjamin Franklin: An American Life by Walter Isaacson",
    ],
  },

  "elon-musk": {
    slug: "elon-musk",
    occupation: "Engineer, entrepreneur, CEO of Tesla, SpaceX, and xAI",
    birthplace: "Pretoria, South Africa",
    bio: [
      "Elon Musk (b. 1971) runs Tesla, SpaceX, and xAI simultaneously and reasons about engineering problems from first principles rather than analogy. He taught himself programming at 10, sold a video game at 12, and left South Africa at 17 to escape compulsory military service.",
      "After dropping out of Stanford's PhD program after two days, he co-founded Zip2 (sold for $307M) and X.com/PayPal (sold to eBay for $1.5B). He poured almost all of his $180M after-tax proceeds into SpaceX and Tesla. Between 2006 and 2008 — three failed Falcon 1 launches, Tesla near bankruptcy, marriage falling apart, borrowing money for rent — he came within days of total ruin. The fourth Falcon 1 reached orbit on September 28, 2008. Tesla closed funding on Christmas Eve.",
      "He has since reduced space launch costs by an order of magnitude, built the world's most valuable automaker, and articulated a five-step manufacturing algorithm: question every requirement, delete any part you can, simplify, accelerate cycle time, automate last. His stated goal is making humanity a multiplanetary species.",
    ],
    notableQuotes: [
      "When something is important enough, you do it even if the odds are not in your favor.",
      "The most common error of a smart engineer is to optimize a thing that should not exist.",
      "If the schedule is long, it's wrong. If it's tight, it's right.",
      "The best part is no part. The best process is no process.",
      "Failure is an option here. If things are not failing, you are not innovating enough.",
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Elon_Musk",
    primarySources: [
      "Elon Musk by Walter Isaacson",
      "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future by Ashlee Vance",
    ],
  },

  "alexander-the-great": {
    slug: "alexander-the-great",
    occupation: "King of Macedon, conqueror, founder of cities",
    birthplace: "Pella, Macedon",
    bio: [
      "Alexander III of Macedon (356–323 BC), known to history as Alexander the Great, built the largest empire the ancient world had ever seen — stretching from Greece to the borders of India — and died at 32 having never lost a battle. He carried an annotated copy of the Iliad with him on every campaign, sleeping with it under his pillow alongside a dagger.",
      "Tutored by Aristotle from age 13 to 16, he commanded the cavalry at the Battle of Chaeronea at 18 and seized the throne of Macedon at 20 after his father Philip II was assassinated. He crossed into Asia with 48,000 infantry and 6,000 cavalry, defeated Darius III at Issus and Gaugamela, built a causeway to take the island fortress of Tyre, and pushed through Afghanistan and across the Indus before his army refused to march further at the Hyphasis.",
      "He founded over twenty cities including Alexandria, was wounded in nearly every major campaign, and led from the front — once pouring out a helmet of water onto the desert sand because his thirsty men had none. He died in Babylon on June 10, 323 BC. When asked to whom he left his empire, he replied: “To the strongest.”",
    ],
    notableQuotes: [
      "There is nothing impossible to him who will try.",
      "I am not afraid of an army of lions led by a sheep; I am afraid of an army of sheep led by a lion.",
      "I would rather live a short life of glory than a long one of obscurity.",
      "Remember, upon the conduct of each depends the fate of all.",
      "I do not steal my victories.",
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Alexander_the_Great",
    primarySources: [
      "Life of Alexander by Plutarch",
      "The Campaigns of Alexander by Arrian",
      "Alexander the Great by Robin Lane Fox",
    ],
  },

  "david-deutsch": {
    slug: "david-deutsch",
    occupation: "Physicist, pioneer of quantum computation, philosopher",
    birthplace: "Haifa, Israel",
    bio: [
      "David Deutsch (b. 1953) is a physicist at the University of Oxford who founded the field of quantum computation and argues that all progress comes from the quest for good explanations. He was born in Haifa, studied at Cambridge and Oxford, and published the foundational paper on the quantum Turing machine in 1985.",
      "With Richard Jozsa he produced the Deutsch–Jozsa algorithm — one of the first quantum algorithms exponentially faster than any classical counterpart. His first book, The Fabric of Reality (1997), proposed that quantum physics, epistemology (Popper), evolution (Darwin), and computation (Turing) are deeply intertwined strands of a single theory of reality.",
      "His second book, The Beginning of Infinity (2011), argues that good explanations — ones that are hard to vary while still accounting for what they explain — are the engine of unbounded human progress. He proposed constructor theory with Chiara Marletto in 2012, is a Fellow of the Royal Society, and won the Breakthrough Prize in Fundamental Physics in 2022.",
    ],
    notableQuotes: [
      "Problems are inevitable. Problems are soluble.",
      "Optimism is, in the first instance, a way of explaining failure, not prophesying success.",
      "All evils are caused by insufficient knowledge.",
      "The universe is not there to overwhelm us; it is our home, and our resource. The bigger the better.",
      "An unproblematic state is a state without creative thought. Its other name is death.",
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/David_Deutsch",
    primarySources: [
      "The Beginning of Infinity by David Deutsch",
      "The Fabric of Reality by David Deutsch",
    ],
  },

  "lee-kuan-yew": {
    slug: "lee-kuan-yew",
    occupation: "Statesman, founding Prime Minister of Singapore",
    birthplace: "Singapore",
    bio: [
      "Lee Kuan Yew (1923–2015) transformed Singapore from a third-world port city with no natural resources into a first-world nation in a single generation. He served as Prime Minister for 31 years and led the city-state from a GDP per capita of $516 to over $80,000 today.",
      "Born into a Peranakan family, he read law at Cambridge and graduated with a starred First-Class Honours. The Japanese Occupation of 1942–1945 — he narrowly escaped the Sook Ching massacre — taught him that power, not law, decides who lives and dies. He co-founded the People's Action Party in 1954 and became Prime Minister in 1959 at age 35.",
      "When Singapore was expelled from Malaysia on August 9, 1965, he wept on television. Over the next three decades he attracted multinationals, built corruption-free government, created mass homeownership through HDB housing and the Central Provident Fund, and enforced multiracialism and meritocracy. He died on March 23, 2015, at age 91. Over a million Singaporeans lined the funeral route in the rain.",
    ],
    notableQuotes: [
      "We are pragmatists. Does it work? Let's try it, and if it does work, fine. If it doesn't work, toss it out.",
      "I was never a prisoner of any theory. What guided me were reason and reality.",
      "A man who owns his home has a stake in the stability of his country.",
      "If you can't think because you can't chew, try a banana.",
      "Democracy is a means to good governance, not an end in itself.",
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Lee_Kuan_Yew",
    primarySources: [
      "The Singapore Story by Lee Kuan Yew",
      "From Third World to First by Lee Kuan Yew",
      "One Man's View of the World by Lee Kuan Yew",
    ],
  },
};

export function getProfile(slug: string): Profile | undefined {
  return profiles[slug];
}
