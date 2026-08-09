// Wikipedia-style profile data per figure. Keyed by figure slug.
// Used by /[figure] profile pages. Kept separate from figures.ts so the
// large system prompts and the readable bio prose live in different files.

export interface InfoboxRow {
  label: string;
  /** array so we can render multi-line values like spouses or notable works */
  values: string[];
}

export interface Profile {
  slug: string;

  // Header
  /** short, comma-separated occupation summary shown under the name */
  occupation: string;
  /** Wikipedia article URL for further reading */
  /** Wikipedia article URL, when one exists. Not every notable living person
   *  has an article; the profile page hides the link when absent. */
  wikipediaUrl?: string;

  // Wikipedia-style infobox (rendered as a table on the right)
  /** the natural, full birth name (e.g., "John Davison Rockefeller Sr.") */
  fullName?: string;
  birthDate?: string; // e.g., "July 8, 1839"
  birthPlace?: string; // e.g., "Richford, New York, U.S."
  deathDate?: string; // e.g., "May 23, 1937 (aged 97)"
  deathPlace?: string;
  nationality?: string;
  education?: string[]; // ["Cambridge University", "Stanford Law"]
  occupations?: string[]; // bullet form for infobox
  yearsActive?: string; // e.g., "1855–1911"
  notableWorks?: string[]; // books, companies, achievements (max ~5)
  spouses?: string[];
  children?: string; // e.g., "5"
  parents?: string[];
  awards?: string[];
  netWorth?: string; // peak

  // Body sections (Wikipedia-style: each renders as its own h2 section)
  earlyLife: string; // 1–2 paragraphs covering childhood + education
  career: string; // 2–3 paragraphs covering main work
  legacy?: string; // 1–2 paragraphs covering impact / death / influence

  // Quotes & sources
  notableQuotes: string[]; // 4–6 famous quotes
  primarySources: string[]; // books that grounded this guide's training

  // Legacy fields (kept for back-compat with previous v0 of the page)
  /** @deprecated prefer earlyLife/career/legacy */
  bio?: string[];
  /** @deprecated prefer birthPlace */
  birthplace?: string;
}

export const profiles: Record<string, Profile> = {
  rockefeller: {
    slug: "rockefeller",
    occupation: "Industrialist, philanthropist, founder of Standard Oil",
    wikipediaUrl: "https://en.wikipedia.org/wiki/John_D._Rockefeller",

    fullName: "John Davison Rockefeller Sr.",
    birthDate: "July 8, 1839",
    birthPlace: "Richford, New York, U.S.",
    deathDate: "May 23, 1937 (aged 97)",
    deathPlace: "Ormond Beach, Florida, U.S.",
    nationality: "American",
    education: ["Folsom's Commercial College, Cleveland (bookkeeping, 1855)"],
    occupations: ["Industrialist", "Philanthropist", "Bookkeeper (1855–1859)"],
    yearsActive: "1855–1937",
    notableWorks: [
      "Standard Oil (founded 1870)",
      "University of Chicago (founded 1890)",
      "Rockefeller University (founded 1901)",
      "General Education Board (founded 1903)",
      "Rockefeller Foundation (founded 1913)",
    ],
    spouses: ["Laura “Cettie” Spelman (m. 1864)"],
    children: "5",
    parents: ["William Avery “Devil Bill” Rockefeller", "Eliza Davison"],
    netWorth: "≈$418 billion (peak, inflation-adjusted to 2025 USD)",

    earlyLife:
      "Rockefeller was born July 8, 1839, in Richford, New York, the second of six children. His father William “Devil Bill” Rockefeller was a traveling con man and bigamist who once boasted, “I cheat my boys every chance I get.” His mother Eliza was a devout Baptist who insisted he tithe from his very first paycheck. He blended both parents: her thrift and discipline with his cunning. At sixteen he completed a ten-week course in bookkeeping at Folsom's Commercial College in Cleveland and took his first job at Hewitt & Tuttle for fifty cents a day. From that paycheck onward he kept a personal ledger he called Ledger A, recording every penny earned and spent. He celebrated “Job Day” every September 26 for the rest of his life.",

    career:
      "In 1863 Rockefeller and partners entered the oil refining business in Cleveland, recognizing that refining, not drilling, was where the durable margins lived. He incorporated Standard Oil on January 10, 1870. Through what became known as the Cleveland Massacre of February 1872, he acquired 22 of 26 competing refiners in six weeks, paying generously in Standard Oil stock and cash. By 1879 his company refined 90% of all American oil. He built the first true vertical-and-horizontal industrial monopoly: pipelines, tankers, barrels, and retail. The Sherman Antitrust Act of 1890 was passed largely in response to him, and the U.S. Supreme Court ordered Standard Oil dissolved in 1911, but the breakup multiplied his wealth, since he held stock in every successor company.",

    legacy:
      "After a nervous breakdown in his fifties left him with alopecia and the appearance of a much older man, Rockefeller retired from active management at 57 and devoted the rest of his life to systematic philanthropy guided by Frederick T. Gates. He gave away approximately $540 million (roughly $11 billion in 2025 USD), founding the University of Chicago, Rockefeller University (the first U.S. biomedical research institute), the General Education Board which helped end hookworm in the American South, and the Rockefeller Foundation, which played a central role in the Green Revolution. He died May 23, 1937, just two months short of his 98th birthday. He had spent the last decades of his life handing out shiny new dimes to children and adults he met as a teaching gesture about the value of saving.",

    notableQuotes: [
      "The secret of success is to do the common things uncommonly well.",
      "Don't be afraid to give up the good to go for the great.",
      "Singleness of purpose is one of the chief essentials for success in life.",
      "I believe the power to make money is a gift from God.",
      "Competition is a sin.",
      "I always tried to turn every disaster into an opportunity.",
    ],
    primarySources: [
      "Titan: The Life of John D. Rockefeller, Sr. by Ron Chernow (1998)",
    ],
  },

  franklin: {
    slug: "franklin",
    occupation: "Printer, scientist, diplomat, founding father",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Benjamin_Franklin",

    fullName: "Benjamin Franklin",
    birthDate: "January 17, 1706",
    birthPlace: "Boston, Massachusetts Bay, British America",
    deathDate: "April 17, 1790 (aged 84)",
    deathPlace: "Philadelphia, Pennsylvania, U.S.",
    nationality: "American (formerly British)",
    education: [
      "Boston Latin School (left at 10)",
      "Self-educated thereafter",
      "Honorary doctorates: St. Andrews (1759), Oxford (1762)",
    ],
    occupations: [
      "Printer",
      "Author",
      "Inventor",
      "Scientist",
      "Diplomat",
      "Statesman",
      "Postmaster",
    ],
    yearsActive: "1718–1790",
    notableWorks: [
      "Pennsylvania Gazette (publisher, 1728–1748)",
      "Poor Richard's Almanack (1733–1758)",
      "The Autobiography of Benjamin Franklin (begun 1771)",
      "Lightning rod, bifocals, Franklin stove",
      "Declaration of Independence (signer, 1776)",
      "U.S. Constitution (signer, 1787)",
    ],
    spouses: ["Deborah Read (common-law, 1730–1774)"],
    children: "3 (William, Francis, Sarah)",
    parents: ["Josiah Franklin", "Abiah Folger"],
    awards: [
      "Copley Medal of the Royal Society (1753)",
      "Fellow of the Royal Society (1756)",
    ],

    earlyLife:
      "Franklin was born in Boston on January 17, 1706, the fifteenth of seventeen children of Josiah Franklin, a candle and soap maker. He attended Boston Latin School for two years before leaving school at age ten to work in his father's shop. At twelve he was apprenticed to his older brother James, a printer. He taught himself to write by dissecting essays in The Spectator: he would read a piece, make brief notes, set it aside for several days, then try to reconstruct the original from his notes, and compare the result to the model. He read voraciously and at sixteen began submitting essays to his brother's newspaper under the pseudonym Silence Dogood. After clashing with James, he ran away to Philadelphia at seventeen with almost nothing in his pockets.",

    career:
      "By age thirty Franklin owned the most successful printing operation in the colonies, publishing the Pennsylvania Gazette and the wildly popular Poor Richard's Almanack. He retired from the print business at forty-two, financially independent enough never to need to work again, and used that freedom for the rest of his life. He proved that lightning is electricity with the famous kite experiment of 1752, invented the lightning rod, bifocals, and the Franklin stove, founded the first lending library in America, the first volunteer fire company, the first public hospital, and what became the University of Pennsylvania. As ambassador to France from 1776 to 1785, he secured the alliance that won American independence, charming the French court while wearing a simple fur cap instead of powdered wigs. He helped draft the Declaration of Independence and was the oldest delegate to the Constitutional Convention at age 81.",

    legacy:
      "Franklin died in Philadelphia on April 17, 1790, at age 84. Twenty thousand people attended his funeral. He had reinvented himself across at least seven distinct careers (printer, author, scientist, postmaster, philanthropist, diplomat, statesman) and produced one of the most influential autobiographies ever written. The 13 Virtues system he designed at twenty became the template for modern habit tracking; the Junto society he founded at twenty-one became the template for the modern peer-improvement group. His face appears on the U.S. $100 bill.",

    notableQuotes: [
      "An investment in knowledge pays the best interest.",
      "Well done is better than well said.",
      "By failing to prepare, you are preparing to fail.",
      "Either write something worth reading or do something worth writing.",
      "Energy and persistence conquer all things.",
      "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    ],
    primarySources: [
      "The Autobiography of Benjamin Franklin (1771–1790, published 1791)",
      "Benjamin Franklin: An American Life by Walter Isaacson (2003)",
    ],
  },

  elon: {
    slug: "elon",
    occupation: "Engineer, entrepreneur, CEO of Tesla, SpaceX, and xAI",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Elon_Musk",

    fullName: "Elon Reeve Musk",
    birthDate: "June 28, 1971",
    birthPlace: "Pretoria, Transvaal, South Africa",
    nationality: "South African, Canadian, American",
    education: [
      "Pretoria Boys High School (1988)",
      "Queen's University, Ontario (transferred)",
      "University of Pennsylvania (B.S. Economics, B.A. Physics, 1997)",
      "Stanford University (PhD program, dropped out after 2 days, 1995)",
    ],
    occupations: [
      "Engineer",
      "Entrepreneur",
      "CEO of Tesla, SpaceX, xAI",
      "Owner of X (formerly Twitter)",
    ],
    yearsActive: "1995–present",
    notableWorks: [
      "Zip2 (co-founder, sold for $307M in 1999)",
      "X.com / PayPal (co-founder, sold to eBay for $1.5B in 2002)",
      "SpaceX (founder, 2002)",
      "Tesla, Inc. (joined 2004, CEO since 2008)",
      "Neuralink (co-founder, 2016)",
      "The Boring Company (founder, 2017)",
      "xAI (founder, 2023)",
    ],
    spouses: [
      "Justine Wilson (m. 2000; div. 2008)",
      "Talulah Riley (m. 2010; div. 2012)",
      "Talulah Riley (m. 2013; div. 2016)",
    ],
    children: "12+",
    parents: ["Errol Musk", "Maye Musk"],
    netWorth: "≈$400 billion (one of the richest people in modern history)",

    earlyLife:
      "Musk was born June 28, 1971, in Pretoria, South Africa, to engineer Errol Musk and model Maye Musk. He has been described as a withdrawn, intensely bookish child who taught himself programming at ten and sold a video game called Blastar for about $500 at twelve. His parents divorced when he was eight; the years that followed were difficult, including periods of severe bullying. At seventeen, partly to avoid compulsory South African military service, he emigrated to Canada, then transferred to the University of Pennsylvania. He earned bachelor's degrees in physics and economics in 1997, was accepted into a Stanford applied physics PhD program, and dropped out after two days to start a company in the dot-com boom.",

    career:
      "Musk's first company, Zip2, an online city-guide service, sold to Compaq for $307 million in 1999. He immediately founded X.com, an online bank that merged with Confinity to become PayPal; eBay acquired PayPal for $1.5 billion in 2002. He poured almost all of his $180M after-tax proceeds into SpaceX (2002) and Tesla (joined 2004). The years 2006–2008 nearly destroyed him: three consecutive failed Falcon 1 launches, Tesla's near-bankruptcy, a public divorce, and a stretch of borrowing money from friends to pay rent. The fourth Falcon 1 reached orbit on September 28, 2008. Tesla closed an emergency funding round on Christmas Eve 2008. He has since reduced space launch costs by an order of magnitude with the Falcon 9 and Starship programs, taken Tesla to a $1+ trillion market cap, founded Neuralink, The Boring Company, and xAI, and acquired Twitter for $44 billion in 2022 (now X).",

    legacy:
      "Musk has articulated a five-step manufacturing algorithm (question every requirement, delete any part you can, simplify, accelerate cycle time, automate last) that has become an influential industrial framework outside Tesla and SpaceX. His stated goal of making humanity a multiplanetary species has driven Starship development. He remains one of the most controversial public figures of his era: admired as the most aggressive engineering executive of the twenty-first century, criticized for labor practices, his behavior on X, and his political pronouncements.",

    notableQuotes: [
      "When something is important enough, you do it even if the odds are not in your favor.",
      "The most common error of a smart engineer is to optimize a thing that should not exist.",
      "If the schedule is long, it's wrong. If it's tight, it's right.",
      "The best part is no part. The best process is no process.",
      "Failure is an option here. If things are not failing, you are not innovating enough.",
      "I think it's very important to have a feedback loop.",
    ],
    primarySources: [
      "Elon Musk by Walter Isaacson (2023)",
      "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future by Ashlee Vance (2015)",
    ],
  },

  alexander: {
    slug: "alexander",
    occupation: "King of Macedon, conqueror, founder of cities",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Alexander_the_Great",

    fullName: "Alexander III of Macedon (Ἀλέξανδρος, Aléxandros)",
    birthDate: "20 or 21 July 356 BC",
    birthPlace: "Pella, Kingdom of Macedon",
    deathDate: "10 or 11 June 323 BC (aged 32)",
    deathPlace: "Babylon",
    nationality: "Macedonian (Greek)",
    education: [
      "Tutored by Aristotle at the Temple of the Nymphs at Mieza (343–340 BC)",
    ],
    occupations: [
      "King of Macedon (336–323 BC)",
      "Hegemon of the League of Corinth",
      "Pharaoh of Egypt",
      "King of Persia",
      "Lord of Asia",
    ],
    yearsActive: "338–323 BC (military career)",
    notableWorks: [
      "Conquest of the Persian Empire (334–330 BC)",
      "Founding of 20+ cities, including Alexandria, Egypt (331 BC)",
      "Battle of Issus (333 BC) and Gaugamela (331 BC)",
      "Siege of Tyre (332 BC)",
    ],
    spouses: [
      "Roxana of Bactria (m. 327 BC)",
      "Stateira II of Persia (m. 324 BC)",
      "Parysatis II of Persia (m. 324 BC)",
    ],
    children: "Alexander IV (posthumous, with Roxana)",
    parents: ["Philip II of Macedon", "Olympias of Epirus"],

    earlyLife:
      "Alexander was born in Pella, the capital of the Kingdom of Macedon, in late July 356 BC, the son of King Philip II and Queen Olympias of Epirus, who claimed descent from Achilles. Plutarch records that on the night of his birth the Temple of Artemis at Ephesus burned down, an omen the priests interpreted as the birth of a destroyer. From age thirteen to sixteen he was tutored by Aristotle at the Temple of the Nymphs at Mieza, where he studied philosophy, medicine, and scientific inquiry, and developed the lifelong love of Homer that led him to carry an annotated copy of the Iliad on every campaign. At twelve he tamed the wild stallion Bucephalus by realizing the horse was afraid of his own shadow; the horse carried him through every major battle for the next twenty years. At eighteen, commanding the Macedonian cavalry at the Battle of Chaeronea (338 BC), he shattered the elite Theban Sacred Band.",

    career:
      "When Philip II was assassinated in 336 BC, Alexander seized the throne at age twenty and consolidated control of Greece. In 334 BC he crossed the Hellespont into Asia with roughly 48,000 infantry and 6,000 cavalry, beginning the campaign that would destroy the Persian Empire. He defeated Darius III at the Battle of the Granicus (334 BC), the Battle of Issus (333 BC), and finally at Gaugamela (331 BC), where outnumbered roughly four to one he led the Companion Cavalry directly at the Persian king. He took Tyre after a seven-month siege by building a causeway across the strait, the mole still stands today as a peninsula. He founded Alexandria in Egypt in 331 BC, was crowned Pharaoh, then pushed across the Hindu Kush, defeated King Porus on the banks of the Hydaspes despite war elephants, and reached the Beas River in modern Punjab. There, after eight years and 11,000 miles, his troops refused to march further. He turned back through the Gedrosian Desert in one of the most catastrophic marches in military history.",

    legacy:
      "Alexander died in Babylon on the evening of 10 or 11 June 323 BC at age 32, after a fever following heavy drinking: possibly typhoid, possibly malaria, possibly poisoning, the question is still debated. When asked to whom he left his empire, he reportedly replied: “To the strongest.” His generals immediately fought a series of wars (the Wars of the Diadochi) that broke the empire into the Hellenistic kingdoms (Ptolemaic Egypt, the Seleucid Empire, Antigonid Macedon) which spread Greek language, philosophy, and civic institutions from the Mediterranean to the borders of India for the next three centuries. Twenty cities he founded survive in some form, including Alexandria, Egypt: still the second-largest city in Egypt today.",

    notableQuotes: [
      "There is nothing impossible to him who will try.",
      "I am not afraid of an army of lions led by a sheep; I am afraid of an army of sheep led by a lion.",
      "I would rather live a short life of glory than a long one of obscurity.",
      "Remember, upon the conduct of each depends the fate of all.",
      "I do not steal my victories.",
      "Heaven cannot brook two suns, nor earth two masters.",
    ],
    primarySources: [
      "Life of Alexander by Plutarch (c. 100 AD)",
      "The Campaigns of Alexander (Anabasis Alexandri) by Arrian (c. 145 AD)",
      "Alexander the Great by Robin Lane Fox (1973)",
    ],
  },

  deutsch: {
    slug: "deutsch",
    occupation: "Physicist, pioneer of quantum computation, philosopher",
    wikipediaUrl: "https://en.wikipedia.org/wiki/David_Deutsch",

    fullName: "David Elieser Deutsch",
    birthDate: "May 18, 1953",
    birthPlace: "Haifa, Israel",
    nationality: "British",
    education: [
      "Clare College, Cambridge (B.A. Natural Sciences)",
      "Wolfson College, Oxford (D.Phil. Theoretical Physics, 1978)",
    ],
    occupations: [
      "Theoretical physicist",
      "Visiting Professor, University of Oxford",
      "Author",
    ],
    yearsActive: "1978–present",
    notableWorks: [
      "“Quantum theory, the Church-Turing principle and the universal quantum computer” (1985)",
      "Deutsch–Jozsa algorithm (1992, with Richard Jozsa)",
      "The Fabric of Reality (1997)",
      "The Beginning of Infinity (2011)",
      "Constructor theory (2012, with Chiara Marletto)",
    ],
    awards: [
      "Dirac Prize (1998)",
      "Edge of Computation Science Prize (2005)",
      "Fellow of the Royal Society (2008)",
      "Isaac Newton Medal (2017)",
      "Breakthrough Prize in Fundamental Physics (2022)",
    ],

    earlyLife:
      "Deutsch was born in Haifa, Israel, on May 18, 1953, to Holocaust survivors Oskar and Tikva Deutsch. The family later moved to London. He read natural sciences at Clare College, Cambridge, and completed his doctorate at Wolfson College, Oxford in 1978 under Dennis Sciama, with a thesis on quantum field theory in curved space-time. He has remained at Oxford ever since, holding a position at the Centre for Quantum Computation at the Clarendon Laboratory.",

    career:
      "In 1985 Deutsch published “Quantum theory, the Church-Turing principle and the universal quantum computer”, the foundational paper that defined the quantum Turing machine and effectively founded the field of quantum computation. With Richard Jozsa he produced the Deutsch–Jozsa algorithm in 1992, one of the first quantum algorithms exponentially faster than any classical counterpart. His first book, The Fabric of Reality (1997), argued that four strands, quantum physics (the multiverse), epistemology (Popper's conjecture-and-criticism), evolution (Darwin), and computation (Turing), are deeply intertwined. His second book, The Beginning of Infinity (2011), argues that good explanations, ones that are hard to vary while still accounting for what they explain, are the engine of unbounded human progress. In 2012, with Chiara Marletto, he proposed constructor theory, an attempt to reformulate physics in terms of which transformations are possible and which are not.",

    legacy:
      "Deutsch is a Fellow of the Royal Society, won the Isaac Newton Medal in 2017, and shared the 2022 Breakthrough Prize in Fundamental Physics for foundational work on quantum information. The Beginning of Infinity has become a touchstone text for a generation of technologists and entrepreneurs as a defense of definite optimism: the view that all problems are soluble unless forbidden by the laws of physics, and that pessimism is bad epistemology, not realism.",

    notableQuotes: [
      "Problems are inevitable. Problems are soluble.",
      "Optimism is, in the first instance, a way of explaining failure, not prophesying success.",
      "All evils are caused by insufficient knowledge.",
      "The universe is not there to overwhelm us; it is our home, and our resource. The bigger the better.",
      "An unproblematic state is a state without creative thought. Its other name is death.",
      "Experience is essential to science, but its role is different from that supposed by empiricism. It is not the source from which theories are derived.",
    ],
    primarySources: [
      "The Beginning of Infinity by David Deutsch (2011)",
      "The Fabric of Reality by David Deutsch (1997)",
    ],
  },

  "lee-kuan-yew": {
    slug: "lee-kuan-yew",
    occupation: "Statesman, founding Prime Minister of Singapore",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Lee_Kuan_Yew",

    fullName: "Lee Kuan Yew (李光耀)",
    birthDate: "September 16, 1923",
    birthPlace: "Singapore, Straits Settlements (British Malaya)",
    deathDate: "March 23, 2015 (aged 91)",
    deathPlace: "Singapore General Hospital, Singapore",
    nationality: "Singaporean (formerly British)",
    education: [
      "Raffles Institution, Singapore",
      "Raffles College, Singapore (1940–1942)",
      "Fitzwilliam College, Cambridge (Law, 1946–1949, starred First-Class Honours)",
      "Middle Temple, London (called to the Bar, 1950)",
    ],
    occupations: [
      "Lawyer (1950–1959)",
      "Prime Minister of Singapore (1959–1990)",
      "Senior Minister (1990–2004)",
      "Minister Mentor (2004–2011)",
    ],
    yearsActive: "1954–2011 (political career)",
    notableWorks: [
      "Co-founder, People's Action Party (1954)",
      "The Singapore Story: Memoirs of Lee Kuan Yew (1998)",
      "From Third World to First (2000)",
      "One Man's View of the World (2013)",
    ],
    spouses: ["Kwa Geok Choo (m. 1950; d. 2010)"],
    children: "3 (Lee Hsien Loong, Lee Wei Ling, Lee Hsien Yang)",
    parents: ["Lee Chin Koon", "Chua Jim Neo"],
    awards: [
      "Order of the Companions of Honour (1970)",
      "Presidential Medal of Freedom (USA, 2009)",
      "Order of the Rising Sun (Japan, 1967)",
    ],

    earlyLife:
      "Lee was born in Singapore on September 16, 1923, into a wealthy English-educated Peranakan family of Hakka Chinese descent. English was his first language. He attended Raffles Institution and was top of his class in the 1940 Senior Cambridge examinations. He had begun studies at Raffles College when the Japanese invasion of Malaya halted everything. The Japanese Occupation of 1942–1945 was the defining trauma of his youth: he narrowly escaped the Sook Ching massacre of ethnic Chinese and watched the British surrender 130,000 troops to a numerically smaller Japanese force. He later wrote that the experience taught him that power, not law, decides who lives and who dies. After the war he sailed to Britain, studied law at Fitzwilliam College, Cambridge, graduated with a starred First-Class Honours, and was called to the bar at the Middle Temple in 1950.",

    career:
      "Lee co-founded the People's Action Party (PAP) in 1954 and led it to victory in the 1959 election, becoming Prime Minister of Singapore at age 35, the youngest in the Commonwealth. Singapore merged with Malaysia in 1963 but was expelled on August 9, 1965; Lee broke down in tears on television. He was 42 years old, leading a tiny island of 1.9 million with no natural resources, no army, and uncertain water supply. Over the next three decades he attracted multinationals through low taxes, English-language education, and rule of law; built corruption-free government via the Corrupt Practices Investigation Bureau; created mass homeownership through the Housing & Development Board (HDB) and Central Provident Fund (CPF); and enforced multiracialism and meritocracy. Singapore went from a GDP per capita of $516 in 1965 to over $80,000 today, one of the highest in the world. He stepped down as Prime Minister in 1990 after 31 years and continued as Senior Minister and Minister Mentor.",

    legacy:
      "Lee's wife Geok Choo, his partner of sixty years, died in 2010. He died on March 23, 2015, at age 91. Over a million Singaporeans lined the funeral route in the rain. He is among the most studied and emulated nation-builders of the twentieth century: Deng Xiaoping sent successive Chinese delegations to Singapore to study his model, and figures from Henry Kissinger to Margaret Thatcher to Bill Clinton sought his counsel. His doctrine of pragmatic, results-tested governance, “Does it work? Let's try it. If it doesn't work, toss it out.”, remains influential in policy circles and in private-sector leadership alike.",

    notableQuotes: [
      "We are pragmatists. Does it work? Let's try it, and if it does work, fine. If it doesn't work, toss it out.",
      "I was never a prisoner of any theory. What guided me were reason and reality.",
      "A man who owns his home has a stake in the stability of his country.",
      "If you can't think because you can't chew, try a banana.",
      "Democracy is a means to good governance, not an end in itself.",
      "I have never been over-concerned or obsessed with opinion polls or popularity polls.",
    ],
    primarySources: [
      "The Singapore Story: Memoirs of Lee Kuan Yew (1998)",
      "From Third World to First by Lee Kuan Yew (2000)",
      "One Man's View of the World by Lee Kuan Yew (2013)",
    ],
  },

  "marcus-aurelius": {
    slug: "marcus-aurelius",
    occupation: "Roman emperor, Stoic philosopher",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Marcus_Aurelius",

    fullName: "Marcus Aurelius Antoninus (born Marcus Annius Verus)",
    birthDate: "April 26, 121 AD",
    birthPlace: "Rome, Italia, Roman Empire",
    deathDate: "March 17, 180 AD (aged 58)",
    deathPlace: "Vindobona (Vienna) or Sirmium, on the northern frontier",
    nationality: "Roman",
    education: [
      "Tutored privately in Rome (rhetoric under Fronto)",
      "Converted to philosophy by Junius Rusticus, who gave him Epictetus' Discourses",
    ],
    occupations: [
      "Roman Emperor (161–180 AD)",
      "Stoic philosopher",
      "Military commander",
    ],
    yearsActive: "161–180 AD (reign)",
    notableWorks: [
      "Meditations (Ta eis heauton, “To Himself”), 12 books",
      "Held the empire through the Antonine Plague",
      "Led the Marcomannic Wars on the Danube frontier",
    ],
    spouses: ["Faustina the Younger (m. 145 AD; d. 175 AD)"],
    children: "13 (including Commodus, his successor)",
    parents: ["Marcus Annius Verus (father)", "Domitia Lucilla (mother)"],

    earlyLife:
      "Marcus was born in Rome on April 26, 121 AD, into a prominent senatorial family, originally named Marcus Annius Verus. The emperor Hadrian noticed him as a serious, honest boy and set in motion the succession that would eventually bring him to the throne, arranging his adoption into the family of Antoninus Pius. He was given the finest education in Rome, rhetoric under the famous orator Fronto, but the decisive influence was philosophy. His tutor Junius Rusticus put into his hands the Discourses of Epictetus, a former slave whose Stoicism became the foundation of Marcus's thought. He reportedly wore the rough cloak of a philosopher and slept on the ground as a young man, to the alarm of his mother.",

    career:
      "Marcus became emperor in 161 AD on the death of Antoninus Pius, and immediately did something unusual: he insisted on ruling jointly with his adoptive brother, Lucius Verus, until Verus died in 169. His reign was defined by crisis rather than triumph. The Antonine Plague, likely smallpox, brought back by returning legions, killed an estimated five million people across the empire. The Marcomannic Wars kept him for years on the cold Danube frontier, personally directing campaigns against the Germanic Quadi and Marcomanni. It was there, in military camp, writing in Greek and for no audience but himself, that he composed the twelve books we call the Meditations, private reminders on how to keep a just and undisturbed mind while carrying the heaviest responsibility in the world.",

    legacy:
      "Marcus died on March 17, 180 AD, aged 58, still on campaign. He is counted the last of the “Five Good Emperors,” and his death is often marked as the end of the Pax Romana. His one clear failure was his succession: he was followed by his son Commodus, whose unstable, tyrannical reign broke the long tradition of adoptive emperors and is conventionally treated as the beginning of Rome's decline. But the Meditations, never intended for publication, survived, and became the most widely read and practically applied work of philosophy ever written, the operating manual for anyone trying to stay sane, ethical, and undefeated under pressure.",

    notableQuotes: [
      "You have power over your mind, not outside events. Realize this, and you will find strength.",
      "The impediment to action advances action. What stands in the way becomes the way.",
      "Waste no more time arguing what a good man should be. Be one.",
      "If it is not right, do not do it; if it is not true, do not say it.",
      "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",
      "The best revenge is to be unlike him who performed the injury.",
    ],
    primarySources: [
      "Meditations by Marcus Aurelius (c. 170–180 AD; Gregory Hays translation, 2002)",
      "The Inner Citadel: The Meditations of Marcus Aurelius by Pierre Hadot (1998)",
    ],
  },

  "marc-andreessen": {
    slug: "marc-andreessen",
    occupation: "Software engineer, entrepreneur, co-founder of Andreessen Horowitz",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Marc_Andreessen",

    fullName: "Marc Lowell Andreessen",
    birthDate: "July 9, 1971",
    birthPlace: "Cedar Falls, Iowa, U.S.",
    nationality: "American",
    education: [
      "New Lisbon High School, Wisconsin",
      "University of Illinois Urbana-Champaign (B.S. Computer Science, 1993)",
    ],
    occupations: [
      "Software engineer",
      "Entrepreneur",
      "Venture capitalist",
      "Co-founder and General Partner, Andreessen Horowitz",
      "Board member, Meta Platforms",
    ],
    yearsActive: "1992–present",
    notableWorks: [
      "Mosaic (co-creator, 1993)",
      "Netscape Navigator (co-founder, Netscape Communications, 1994)",
      "Opsware (founder, sold to HP for $1.6B, 2007)",
      "Andreessen Horowitz / a16z (co-founder, 2009)",
      "“Why Software Is Eating the World” (essay, WSJ, 2011)",
      "“It's Time to Build” (essay, 2020)",
      "“The Techno-Optimist Manifesto” (essay, 2023)",
    ],
    spouses: ["Laura Arrillaga-Andreessen (m. 2006)"],
    children: "1",
    parents: ["Lowell Andreessen", "Patricia Andreessen"],

    earlyLife:
      "Marc Andreessen was born July 9, 1971, in Cedar Falls, Iowa, and grew up in New Lisbon, Wisconsin, a town of about a thousand people. He taught himself BASIC on a Radio Shack TRS-80 in elementary school. He enrolled at the University of Illinois at Urbana-Champaign as an undergraduate computer science major, where he worked at the National Center for Supercomputing Applications (NCSA). In 1992–1993, working with Eric Bina, he co-created Mosaic, the first graphical web browser to display images inline with text and to run on common consumer operating systems. Mosaic, more than any other single piece of software, was the moment the World Wide Web became something ordinary people could see and use.",

    career:
      "In 1994, fresh out of college, Andreessen partnered with Jim Clark, the founder of Silicon Graphics, to start Mosaic Communications Corporation, soon renamed Netscape Communications. Netscape Navigator became the dominant web browser of the mid-1990s. The company's IPO on August 9, 1995, the stock opened at $28 and closed at $58.25 the same day, valuing Netscape at $2.9 billion despite having only modest revenue, is widely cited as the catalyst of the dot-com era. After the U.S. v. Microsoft antitrust suit and the bundling of Internet Explorer with Windows crushed Netscape's market share, AOL acquired Netscape in 1999 for $4.2 billion. Andreessen co-founded Loudcloud in 1999 (one of the earliest commercial cloud-services companies); after the dot-com bust, the company pivoted into Opsware and sold to Hewlett-Packard in 2007 for $1.6 billion. In 2009, Andreessen and Ben Horowitz founded Andreessen Horowitz (a16z) on the contrarian thesis that technical founders should be supported as CEOs of their own companies rather than replaced by professional managers. a16z grew into one of the largest venture firms in the world, with notable early investments in Facebook, Coinbase, Airbnb, GitHub, Lyft, Instagram, Skype, Slack, and Stripe.",

    legacy:
      "Andreessen's three signature essays, “Why Software Is Eating the World” (2011), “It's Time to Build” (2020), and “The Techno-Optimist Manifesto” (2023), have each defined the discourse of their moment. He sits on the board of Meta (since 2008) and has remained one of the most public voices in technology and venture capital, prolific on Twitter / X and on the a16z podcast. He is married to Laura Arrillaga-Andreessen, a Stanford professor and philanthropist; they have one son.",

    notableQuotes: [
      "Software is eating the world.",
      "It's time to build.",
      "Strong opinions, loosely held.",
      "I'm a relentless optimist about the future.",
      "The world will be made of bits and atoms. We need a lot more of both.",
      "Every Western institution was unprepared for the coronavirus pandemic… The problem is desire. We need to want these things.",
    ],
    primarySources: [
      "“Why Software Is Eating the World” by Marc Andreessen (Wall Street Journal, August 20, 2011)",
      "“It's Time to Build” by Marc Andreessen (a16z.com, April 18, 2020)",
      "“The Techno-Optimist Manifesto” by Marc Andreessen (a16z.com, October 16, 2023)",
      "a16z podcast and Marc's Substack essays",
    ],
  },

  "adam-neumann": {
    slug: "adam-neumann",
    occupation: "Entrepreneur, founder of WeWork and Flow",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Adam_Neumann",

    fullName: "Adam Neumann",
    birthDate: "April 22, 1979",
    birthPlace: "Tel Aviv, Israel",
    nationality: "Israeli–American",
    education: [
      "Israeli Defense Forces: Naval officer, 5 years",
      "Baruch College, City University of New York (attended; did not graduate)",
    ],
    occupations: [
      "Entrepreneur",
      "Co-founder, GreenDesk (2008)",
      "Co-founder and former CEO, WeWork / The We Company (2010–2019)",
      "Founder and CEO, Flow (2022–present)",
    ],
    yearsActive: "2006–present",
    notableWorks: [
      "GreenDesk (co-founder, 2008)",
      "WeWork (co-founder, 2010; sold control 2019)",
      "Flow (founder, 2022)",
    ],
    spouses: ["Rebekah Paltrow Neumann (m. 2008)"],
    children: "6",

    earlyLife:
      "Adam Neumann was born April 22, 1979, in Tel Aviv, Israel. His parents, both physicians, divorced when he was seven. He spent parts of his childhood in Indianapolis and then on Kibbutz Nir Am in southern Israel, where the communal model of living and shared infrastructure later became part of the WeWork pitch. After high school he served five years as an officer in the Israeli Navy. In 2001 he moved to New York City to live with his sister, the model Adi Neumann, and enrolled at Baruch College's Zicklin School of Business, leaving before completing his degree. His earliest entrepreneurial attempts (collapsible high-heeled shoes, and Egg Baby, a line of baby clothing with built-in knee pads) did not scale.",

    career:
      "In 2008 Neumann co-founded GreenDesk, an environmentally conscious co-working space in Brooklyn, with the architect Miguel McKelvey. They sold GreenDesk and in 2010 launched WeWork at 154 Grand Street in SoHo. WeWork's pitch was distinctive from day one: it sold workspaces not as real estate but as membership in a community: a curated aesthetic, free beer, member events, and the stated mission of “elevating the world's consciousness.” The model attracted aggressive growth capital. By 2014 WeWork was a unicorn; by 2017 SoftBank's Masayoshi Son committed billions through the Vision Fund. By January 2019 the private valuation reached $47 billion, among the highest in the world for a private company. In August 2019 WeWork filed an S-1 to go public. The S-1 made public for the first time the company's unit economics, governance entanglements, and the non-GAAP metric “Community-Adjusted EBITDA.” Public investors rejected the offering; the IPO was withdrawn; within six weeks of the filing Neumann was ousted as CEO. SoftBank paid him approximately $1.7 billion to exit. WeWork eventually went public via SPAC at a fraction of the peak valuation, and filed for Chapter 11 bankruptcy protection in November 2023.",

    legacy:
      "In 2022 Neumann founded Flow, a residential real estate company applying community-driven design to apartment living; Andreessen Horowitz led the seed round with $350 million, the largest single check in a16z's history. Neumann's career is widely studied, in business schools, in books such as Reeves Wiedeman's *Billion Dollar Loser* (2020) and Eliot Brown and Maureen Farrell's *The Cult of We* (2021), and in Apple TV+'s *WeCrashed* (2022), as both an exemplar of narrative-driven valuation building and a cautionary tale about what happens when story outruns unit economics. He is married to Rebekah Paltrow Neumann; the couple has six children and lives primarily in Miami.",

    notableQuotes: [
      "We are here to elevate the world's consciousness.",
      "The “We” in WeWork stands for the community we are building together.",
      "Our mission is to create a world where people work to make a life, not just a living.",
      "Energy and intention are what set the great founders apart from the good ones.",
    ],
    primarySources: [
      "Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork by Reeves Wiedeman (2020)",
      "The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion by Eliot Brown and Maureen Farrell (2021)",
      "WeWork S-1 (filed August 14, 2019)",
      "WeCrashed (Apple TV+ documentary series, 2022)",
    ],
  },

  seneca: {
    slug: "seneca",
    occupation: "Stoic philosopher, dramatist, statesman, advisor to Nero",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Seneca_the_Younger",

    fullName: "Lucius Annaeus Seneca",
    birthDate: "c. 4 BC",
    birthPlace: "Corduba (modern Córdoba), Hispania Baetica, Roman Empire",
    deathDate: "AD 65 (aged approximately 69)",
    deathPlace: "Rome: forced suicide by order of Emperor Nero",
    nationality: "Roman",
    education: [
      "Rhetoric in Rome under his father, Seneca the Elder",
      "Philosophy under the Stoic Attalus, the Sextian Sotion, and Papirius Fabianus",
    ],
    occupations: [
      "Stoic philosopher",
      "Tragedian (Roman drama)",
      "Statesman, Roman Senate",
      "Tutor (AD 49–54) and chief advisor (AD 54–62) to Emperor Nero",
    ],
    yearsActive: "c. AD 20 – 65",
    notableWorks: [
      "Epistulae Morales ad Lucilium (Letters to Lucilius / Letters from a Stoic): 124 surviving letters",
      "De Brevitate Vitae (On the Shortness of Life)",
      "De Ira (On Anger)",
      "De Vita Beata (On the Happy Life)",
      "De Providentia (On Providence)",
      "Naturales Quaestiones (Natural Questions)",
      "Tragedies: Thyestes, Medea, Phaedra, Oedipus, Hercules Furens, Troades",
    ],
    spouses: ["Pompeia Paulina"],
    parents: ["Lucius Annaeus Seneca the Elder", "Helvia"],

    earlyLife:
      "Seneca was born around 4 BC in Corduba, the chief city of the Roman province of Hispania Baetica, into the wealthy equestrian Annaeus family. His father, Seneca the Elder, was a celebrated teacher of rhetoric whose textbooks have partly survived; his mother, Helvia, came from a respected provincial family. He was brought to Rome as a child by his aunt and educated in the city: first in rhetoric in the family tradition, then in philosophy under the Stoic Attalus, the Sextian school philosopher Sotion (whose teaching of Pythagorean vegetarianism Seneca followed for a time), and Papirius Fabianus. He suffered from respiratory illness, almost certainly asthma, from his youth and credited philosophy with helping him survive it. His brothers were Junius Gallio (proconsul of Achaea, mentioned in the New Testament Acts of the Apostles for declining to hear charges against the apostle Paul) and Mela, father of the poet Lucan.",

    career:
      "Seneca entered the Roman Senate under Tiberius or Caligula and was a successful advocate when Claudius came to power in AD 41 and exiled him to Corsica on charges (probably trumped up) of adultery with Julia Livilla. He spent eight years in exile, writing the *Consolations* (to his mother Helvia, to Polybius, to Marcia). In AD 49 Agrippina the Younger arranged his recall to Rome to tutor her twelve-year-old son Lucius Domitius Ahenobarbus, soon to become Emperor Nero. After Nero's accession in AD 54, Seneca and the Praetorian prefect Sextus Afranius Burrus effectively co-managed the state through what later historians called the *Quinquennium Neronis*, the five-good-years of Nero's reign. Seneca composed Nero's first speech to the Senate, drafted policy, and authored most of his surviving moral and philosophical works during these years, including the *Letters to Lucilius* and *On the Shortness of Life*. He also accumulated extraordinary personal wealth, perhaps the largest private fortune of his era, which his enemies (Suillius Rufus, then later Cassius Dio) used to charge him with hypocrisy.",

    legacy:
      "By AD 62 Burrus was dead and Seneca had effectively retired, though he could not extract himself fully. In AD 65, Nero accused him of complicity in the Pisonian conspiracy on thin evidence and ordered him to take his own life. Tacitus's *Annals* describes the death in detail: Seneca opened his veins, then took hemlock when blood loss was too slow, and finally was carried into a steam bath where he suffocated, dictating final words to scribes. His wife Pompeia Paulina attempted to die with him but was kept alive on Nero's order. Seneca's letters became the most-read philosophical text in the medieval European tradition; Augustine, Erasmus, Montaigne, and Petrarch each treated him as a near-Christian moralist. His prose style (short, paradoxical, aphoristic) shaped European essay-writing through Bacon. The *Epistulae Morales* and *On the Shortness of Life* remain the most accessible Stoic texts ever produced and the entry point most modern readers take into the school.",

    notableQuotes: [
      "It is not that we have a short time to live, but that we waste much of it.",
      "While we are postponing, life speeds by.",
      "Begin at once to live, and count each separate day as a separate life.",
      "Anger, if not restrained, is frequently more hurtful to us than the injury that provokes it.",
      "He who is brave is free.",
      "No servitude is more disgraceful than that which is self-imposed.",
    ],
    primarySources: [
      "Letters from a Stoic (Epistulae Morales ad Lucilium) by Seneca: Robin Campbell translation (Penguin, 1969) and the Loeb Classical Library three-volume edition",
      "On the Shortness of Life (De Brevitate Vitae) by Seneca, C. D. N. Costa translation (Penguin Great Ideas, 2004)",
      "Dialogues and Essays by Seneca: John Davie translation (Oxford World's Classics, 2007)",
      "Tacitus, Annals XV (the contemporary account of Seneca's death)",
    ],
  },
  "ricky-gervais": {
    "slug": "ricky-gervais",
    "occupation": "Comedian, actor, writer, director, and producer",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Ricky_Gervais",
    "fullName": "Ricky Dene Gervais",
    "birthDate": "25 June 1961",
    "birthPlace": "Reading, Berkshire, England",
    "nationality": "British",
    "education": [
      "Whitley Park Infants and Junior Schools, Reading",
      "Ashmead Comprehensive School, Reading",
      "University College London (UCL), 1980–1983: enrolled to read biology, switched to philosophy after about two weeks, graduating with a lower-second-class (2:2) honours degree in philosophy"
    ],
    "occupations": [
      "Stand-up comedian",
      "Actor",
      "Writer",
      "Director",
      "Producer"
    ],
    "yearsActive": "1998–present",
    "notableWorks": [
      "The Office (BBC, 2001–2003): co-created and co-written with Stephen Merchant; Gervais played David Brent",
      "Extras (BBC/HBO, 2005–2007): co-created with Stephen Merchant; Gervais played Andy Millman",
      "After Life (Netflix, 2019–2022): created, written, directed by and starring Gervais",
      "Derek (Channel 4, 2012–2014): written, directed by and starring Gervais",
      "The Ricky Gervais Show (2005 podcast; HBO animated series, 2010–2012): with Stephen Merchant and Karl Pilkington",
      "Netflix stand-up specials: Humanity (2018), SuperNature (2022), Armageddon (2023), Mortality (2025)"
    ],
    "spouses": [
      "Jane Fallon (partner, 1982–present)"
    ],
    "netWorth": "Estimated at roughly US$160 million as of 2025 (Celebrity Net Worth); figures vary by source, currency, and year and should be treated as approximate",
    "earlyLife": "Ricky Dene Gervais was born on 25 June 1961 in Reading, Berkshire, the youngest of four children. His father, Lawrence Raymond \"Jerry\" Gervais (1919–2002), was a labourer of Franco-Ontarian (French-Canadian) descent who met Gervais's mother while stationed in England during the Second World War; his mother, Eva Sophia (née House; 1925–2000), was English. He grew up on a council estate and attended Whitley Park Infants and Junior Schools and Ashmead Comprehensive School in Reading. In 1980 he went to University College London, initially to read biology but switching to philosophy after about two weeks, and graduated in 1983 with a lower-second-class honours degree. An atheist and humanist, Gervais has cited his philosophical education and scientific outlook as central to his comedy and public persona.",
    "career": "Before his breakthrough, Gervais worked a variety of jobs, including a brief pre-fame stint managing the band Suede and roughly seven years in an office administrative role that later fed his observational comedy. His major success came with The Office, a mockumentary sitcom co-created and co-written with Stephen Merchant for BBC Two, which ran for two series and two Christmas specials between 2001 and 2003. Gervais starred as the self-deluded middle manager David Brent, a character whose comedy derives from the gap between his self-perception and how others see him. The series won multiple BAFTA Awards and a Golden Globe, and its format was adapted internationally, most successfully as the American version of The Office, for which Gervais served as an executive producer.\n\nGervais and Merchant followed with Extras (2005–2007), in which Gervais played struggling actor Andy Millman, and Life's Too Short (2011–2013). Gervais then wrote, directed and starred in Derek (2012–2014) and created the Netflix series After Life (2019–2022), a solo project about a grieving widower that he wrote, directed, executive-produced and starred in across three series. Alongside television, The Ricky Gervais Show began in 2005 as a podcast with Merchant and Karl Pilkington, certified by Guinness World Records as the most-downloaded podcast in 2006, and was later adapted into an animated HBO series (2010–2012).\n\nGervais built a parallel career in stand-up comedy, touring shows including Animals (2003), Politics (2004), Fame (2007) and Science (2010) before a series of Netflix specials: Humanity (2018), SuperNature (2022), Armageddon (2023) and Mortality (2025). He also hosted the Golden Globe Awards five times (2010, 2011, 2012, 2016 and 2020), where his acerbic monologues drew wide attention. His accolades include seven BAFTA Television Awards, two Primetime Emmy Awards, and Golden Globe wins, including consecutive awards for Best Performance in Stand-Up Comedy on Television for Armageddon (2024) and Mortality (2026).",
    "legacy": "Gervais is widely regarded as one of the most influential figures in modern British comedy, credited with popularising the mockumentary sitcom format through The Office, whose David Brent became a defining example of cringe comedy built on a character's blind spots and naturalistic performance. His work has been recognised with BAFTA, Emmy and Golden Globe awards, and formats he co-created have been remade around the world. He has also become a prominent and frequently controversial public voice on free speech and the limits of comedy, arguing that offence is \"the collateral damage of free speech\" and distinguishing the subject of a joke from its target. His later projects, particularly After Life, broadened his reputation to include more openly emotional and reflective work, while his Netflix stand-up specials and Golden Globes hosting cemented his standing as a global comedic figure.",
    "notableQuotes": [
      "Offence is the collateral damage of free speech.",
      "Most offence comes from when people mistake the subject of a joke with the actual target.",
      "The truth is more devastating than a lie."
    ],
    "primarySources": [
      "The Office (BBC Two, 2001–2003): series co-created, co-written and co-directed by Ricky Gervais and Stephen Merchant",
      "Extras (BBC/HBO, 2005–2007): series co-created by Ricky Gervais and Stephen Merchant",
      "After Life (Netflix, 2019–2022): series created, written and directed by Ricky Gervais",
      "Ricky Gervais: Humanity (Netflix, 2018), SuperNature (2022), Armageddon (2023) and Mortality (2025): stand-up specials",
      "Wikipedia, \"Ricky Gervais\" (https://en.wikipedia.org/wiki/Ricky_Gervais)",
      "Golden Globes official profile (https://goldenglobes.com/person/ricky-gervais/) and Television Academy biography (https://www.televisionacademy.com/bios/ricky-gervais)"
    ]
  },
  "marie-curie": {
    "slug": "marie-curie",
    "occupation": "Physicist and chemist; pioneer of radioactivity, two-time Nobel laureate",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Marie_Curie",
    "fullName": "Maria Salomea Skłodowska-Curie",
    "birthDate": "7 November 1867",
    "birthPlace": "Warsaw, Congress Poland (then part of the Russian Empire)",
    "deathDate": "4 July 1934 (aged 66)",
    "deathPlace": "Sancellemoz sanatorium, Passy, Haute-Savoie, France: aplastic anaemia attributed to prolonged ionizing-radiation exposure",
    "nationality": "Polish and French",
    "education": [
      "Clandestine 'Flying University' (Uniwersytet Latający), Warsaw, which admitted women barred from formal Polish higher education under Russian rule (c. 1885–1889)",
      "Licence in physics, University of Paris (the Sorbonne), 1893: ranked first in her class",
      "Licence in mathematics, University of Paris, 1894",
      "Doctorate in physics, University of Paris, defended June 1903 (supervised by Gabriel Lippmann)"
    ],
    "occupations": [
      "Physicist",
      "Chemist",
      "Professor at the University of Paris (Sorbonne)",
      "Director of the Radium Institute (Institut du Radium), Paris"
    ],
    "yearsActive": "c. 1894 – 1934",
    "notableWorks": [
      "Recherches sur les substances radioactives (doctoral thesis, 1903): established radioactivity as an atomic property",
      "Discovery of the elements polonium (July 1898) and radium (December 1898)",
      "Isolation of pure radium chloride and determination of radium's atomic weight (1902)",
      "Pierre Curie (1923): her biography of her husband, containing autobiographical reflection",
      "Autobiographical Notes (1923), first-person memoir published with the American editions",
      "Founding and direction of the Radium Institute; wartime mobile X-ray units, the 'petites Curies' (World War I)"
    ],
    "spouses": [
      "Pierre Curie (m. 1895; d. 1906)"
    ],
    "children": "2: Irène and Ève",
    "parents": [
      "Władysław Skłodowski (physics and mathematics teacher)",
      "Bronisława Skłodowska (née Boguska; teacher and school director)"
    ],
    "awards": [
      "Nobel Prize in Physics, 1903: shared with Pierre Curie and Antoine Henri Becquerel; first woman to win a Nobel Prize",
      "Nobel Prize in Chemistry, 1911, sole laureate, for the discovery of radium and polonium and the isolation and study of radium; first person to win two Nobel Prizes and the only person to win Nobels in two different sciences",
      "Davy Medal, Royal Society (London), 1903: jointly with Pierre Curie",
      "Matteucci Medal, 1904: shared with Pierre Curie",
      "Elliott Cresson Medal, Franklin Institute (Philadelphia), 1909",
      "First woman professor at the University of Paris (Sorbonne), appointed 1906; first woman interred in the Panthéon on her own merits (reburial, 1995)"
    ],
    "earlyLife": "Maria Salomea Skłodowska was born on 7 November 1867 in Warsaw, then part of Congress Poland under Russian rule, the youngest of five children in a family of teachers. Her father, Władysław Skłodowski, taught physics and mathematics, and her mother, Bronisława, ran a girls' boarding school; the family's Polish patriotism and financial hardship shaped a childhood marked by both learning and loss. Barred as a woman from Poland's formal universities, she attended the clandestine, movable 'Flying University' in Warsaw and worked for several years as a governess to fund her sister Bronisława's medical studies in Paris, on a reciprocal pact by which Bronisława would later support her in turn.",
    "career": "In 1891 Skłodowska moved to Paris and enrolled at the Sorbonne, earning a licence in physics in 1893 (ranked first in her class) and one in mathematics in 1894. She met the physicist Pierre Curie, whom she married in a civil ceremony in 1895, and together they turned to the study of the rays recently observed by Henri Becquerel. Replacing Becquerel's fogged photographic plates with a sensitive piezoelectric-quartz electrometer, she measured radiation as an electric current and showed the effect to be an atomic property, coining the term 'radioactivity.' Finding that the mineral pitchblende was far more active than its uranium content could explain, she inferred, and then chased through fraction-by-fraction chemical separation, two previously unknown elements: polonium (named for her occupied homeland, Poland) and radium, both announced in 1898.\n\nOver roughly four years the Curies processed several tons of pitchblende residue by hand to isolate a decigram of pure radium chloride and determine radium's atomic weight, work that earned Marie her 1903 doctorate. That same year she, Pierre, and Becquerel shared the Nobel Prize in Physics, making her the first woman to receive a Nobel. The Curies declined to patent the radium-isolation process, publishing it freely so that radium, and the new medicine of radiotherapy, could be produced by anyone. After Pierre was killed in a Paris street accident in 1906, Marie took over his chair at the Sorbonne, becoming the first woman to hold a professorship there.\n\nIn 1911 she was awarded the Nobel Prize in Chemistry, for the discovery of radium and polonium and the isolation and study of radium, becoming the first person to win two Nobel Prizes and the only person to win them in two distinct sciences. She directed the newly founded Radium Institute in Paris, and during the First World War she organized France's first military radiology service, equipping and often personally driving mobile X-ray units, the 'petites Curies', to the front. She continued to lead the Radium Institute until her death.",
    "legacy": "Marie Curie died on 4 July 1934 of aplastic anaemia, a blood disease attributed to her decades of unprotected exposure to ionizing radiation; her notebooks remain radioactive to this day. She was the first woman to win a Nobel Prize, the first person to win two, and the only person to win Nobel Prizes in two different sciences, and her work established radioactivity as a field, opened the way to nuclear physics, and gave medicine the tools of radiotherapy and diagnostic radiology.\n\nReserved, intensely private, and indifferent to wealth and celebrity, she came to embody the ideal of the disinterested scientist working for humanity rather than profit. In 1995 she became the first woman interred in the Panthéon in Paris on the strength of her own achievements, her remains sealed in a lead-lined coffin because of their radioactivity. The Radium Institute she founded endures as the Institut Curie, and her elder daughter, Irène Joliot-Curie, went on to share a Nobel Prize of her own, extending a scientific legacy that made 'Curie' synonymous with rigor, endurance, and discovery.",
    "notableQuotes": [
      "One never notices what has been done; one can only see what remains to be done.",
      "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves. We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
      "I am among those who think that science has great beauty. A scientist in his laboratory is not only a technician: he is also a child placed before natural phenomena which impress him like a fairy tale.",
      "You cannot hope to build a better world without improving the individuals. To that end, each of us must work for his own improvement and, at the same time, share a general responsibility for all humanity.",
      "I am working in the laboratory all day long, it is all I can do: I am better off there than anywhere else.",
      "There is nothing in this but pure science... I believe there is no connection between my scientific work and the facts of private life."
    ],
    "primarySources": [
      "Marie Curie, Pierre Curie (1923), trans. Charlotte & Vernon Kellogg: includes her Autobiographical Notes",
      "Marie Curie, Recherches sur les substances radioactives (doctoral thesis, 1903)",
      "The Nobel Prize official records and citations for the 1903 Physics and 1911 Chemistry prizes (NobelPrize.org)",
      "Ève Curie, Madame Curie: A Biography (1937): the principal early biography, by her daughter",
      "Susan Quinn, Marie Curie: A Life (1995): reputable modern scholarly biography"
    ]
  },
  "bob-marley": {
    "slug": "bob-marley",
    "occupation": "Reggae singer-songwriter, guitarist, and Rastafari icon who took Jamaican music worldwide",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Bob_Marley",
    "fullName": "Robert Nesta Marley",
    "birthDate": "6 February 1945",
    "birthPlace": "Nine Mile, Saint Ann Parish, Jamaica",
    "deathDate": "11 May 1981 (aged 36)",
    "deathPlace": "Miami, Florida, U.S.: acral lentiginous melanoma",
    "nationality": "Jamaican",
    "occupations": [
      "Singer-songwriter",
      "Guitarist",
      "Bandleader: Bob Marley and the Wailers",
      "Reggae, ska and rocksteady musician",
      "Rastafari spokesman and activist"
    ],
    "yearsActive": "1962–1981",
    "notableWorks": [
      "Catch a Fire (1973): the Wailers' international debut on Island Records",
      "Burnin' (1973): includes 'Get Up, Stand Up' and 'I Shot the Sheriff'",
      "Exodus (1977): 56 consecutive weeks on the UK albums chart",
      "Survival (1979): Pan-African album including 'Zimbabwe' and 'Africa Unite'",
      "Uprising (1980): his last studio album released in his lifetime, closing with 'Redemption Song'",
      "Legend (1984, posthumous), the best-selling reggae album of all time"
    ],
    "spouses": [
      "Rita Anderson (m. 1966)"
    ],
    "children": "11 acknowledged",
    "awards": [
      "United Nations Peace Medal of the Third World (1978)",
      "Jamaican Order of Merit (1981): the nation's third-highest honour",
      "Rock and Roll Hall of Fame (inducted 1994)",
      "Grammy Lifetime Achievement Award (2001)"
    ],
    "earlyLife": "Robert Nesta Marley was born on 6 February 1945 at his maternal grandfather's farm in Nine Mile, Saint Ann Parish, in the then-Colony of Jamaica. His father, Norval Sinclair Marley, was a white man of British descent who worked as a rural overseer; he was decades older than Marley's mother, was largely absent, and died when Bob was about ten. His mother, Cedella Malcolm (later Cedella Booker), was a Black Afro-Jamaican, only eighteen when she married.\n\nAround the age of twelve, Marley moved with his mother to Trench Town, a poor government-yard neighbourhood of Kingston that became the crucible of his music and identity, later memorialised in 'No Woman, No Cry' and 'Trench Town Rock'. Growing up mixed-race in the impoverished, all-Black district, he was taunted as a 'half-caste' and wrestled with belonging, a wound he turned into a lifelong refusal to pick a racial side. In Trench Town the musician Joe Higgs taught him guitar and vocal harmony, and he formed a lasting bond with his boyhood friend Bunny Wailer.",
    "career": "Marley made his first solo recordings in 1962 for producer Leslie Kong, including 'Judge Not'. In 1963 he formed a vocal group with Peter Tosh and Bunny Wailer that became the Wailers, and their 1964 single 'Simmer Down' reached number one in Jamaica. Over the 1960s he embraced Rastafari, grew dreadlocks, and became its first global public face, calling God 'Jah' and revering the Ethiopian emperor Haile Selassie I. He married Rita Anderson in 1966.\n\nThe turning point came in 1972, when the Wailers signed with Chris Blackwell of Island Records, who packaged Jamaican reggae for a worldwide rock audience. Catch a Fire (1973) launched them internationally, and Burnin' (1973) carried 'Get Up, Stand Up' and 'I Shot the Sheriff', a song Eric Clapton took to number one in the United States in 1974. After Tosh and Bunny left in 1974 the group became Bob Marley and the Wailers, with the I-Threes (including Rita) on backing vocals, and the live 'No Woman, No Cry' broke Marley worldwide in 1975.\n\nOn 3 December 1976, amid near-civil-war between Jamaica's rival political parties, gunmen raided his home at 56 Hope Road and wounded Bob, Rita, and manager Don Taylor; all survived, and two days later, still injured, Marley performed at the free Smile Jamaica concert. He then spent roughly two years in exile in London, where he recorded Exodus (1977), which stayed on the UK chart for 56 consecutive weeks. At the One Love Peace Concert on 22 April 1978 he brought the rival leaders Michael Manley and Edward Seaga onstage and joined their hands above his head. In April 1980 he played Zimbabwe's official independence celebrations at Rufaro Stadium, paying his own way, and released Uprising, whose closing track 'Redemption Song' he recorded stripped to voice and acoustic guitar while already gravely ill.",
    "legacy": "Bob Marley is the artist who took reggae from Jamaica to the world and made it a global language of resistance and unity. As the genre's first international superstar and the first global face of Rastafari, he sold an estimated 75 million or more records, and the posthumous compilation Legend (1984) remains the best-selling reggae album of all time. His songs held two things together at once, militant demands for justice ('Get Up, Stand Up') and radical calls for unity and love ('One Love'), a synthesis he embodied by joining the hands of political enemies and by playing a nation's liberation.\n\nMarley had been diagnosed in 1977 with acral lentiginous melanoma, which began under the nail of his right big toe. Citing his Rastafari beliefs, he declined amputation; the cancer spread to his lungs, liver, and brain, and he died in Miami on 11 May 1981, aged 36. He received the Jamaican Order of Merit that year and was given a state funeral blending Ethiopian Orthodox and Rastafari rites before burial at Nine Mile. He was inducted into the Rock and Roll Hall of Fame in 1994.",
    "notableQuotes": [
      "Emancipate yourselves from mental slavery; none but ourselves can free our minds.",
      "Get up, stand up: stand up for your right! Don't give up the fight!",
      "One love, one heart, let's get together and feel all right.",
      "Don't worry about a thing, 'cause every little thing is gonna be all right.",
      "One good thing about music, when it hits you feel no pain.",
      "Money can't buy life."
    ],
    "primarySources": [
      "Bob Marley: Wikipedia (https://en.wikipedia.org/wiki/Bob_Marley)",
      "Bob Marley: Wikiquote, for sourced song lyrics and documented interview quotes (https://en.wikiquote.org/wiki/Bob_Marley)",
      "Bob Marley, Encyclopaedia Britannica (https://www.britannica.com/biography/Bob-Marley)",
      "One Love Peace Concert: Wikipedia (https://en.wikipedia.org/wiki/One_Love_Peace_Concert)",
      "Portrait photograph by Eddie Mallin (Dublin, 6 July 1980), CC BY 2.0, via Wikimedia Commons"
    ]
  },
  "warren-buffett": {
    slug: "warren-buffett",
    occupation: "Investor and philanthropist; chairman and former CEO of Berkshire Hathaway",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Warren_Buffett",
    fullName: "Warren Edward Buffett",
    birthDate: "August 30, 1930",
    birthPlace: "Omaha, Nebraska, U.S.",
    nationality: "American",
    education: [
      "Wharton School of the University of Pennsylvania (1947 to 1949)",
      "University of Nebraska, B.S. in business administration (1950)",
      "Columbia University, M.S. in economics (1951)",
      "New York Institute of Finance",
    ],
    occupations: [
      "Investor",
      "Chairman of Berkshire Hathaway",
      "CEO of Berkshire Hathaway, 1970 to 2025",
      "Philanthropist",
    ],
    yearsActive: "1951-present",
    notableWorks: [
      "Buffett Partnership Ltd., founded in 1956 and dissolved in 1969",
      "Berkshire Hathaway, controlled since 1965 and chaired since 1970",
      "Berkshire Hathaway annual shareholder letters, 1977 to 2024",
      "The Giving Pledge, co-founded with Bill and Melinda Gates in 2010",
    ],
    spouses: [
      "Susan Thompson (m. 1952; d. 2004)",
      "Astrid Menks (m. 2006)",
    ],
    children: "3: Susan Alice, Howard Graham, and Peter Andrew",
    parents: ["Howard Homan Buffett", "Leila Stahl Buffett"],
    awards: ["Presidential Medal of Freedom (2011)"],
    earlyLife: "Warren Edward Buffett was born in Omaha, Nebraska, on August 30, 1930, the second of three children of Leila Stahl Buffett and Howard Buffett, a stockbroker who later served in Congress. Fascinated by numbers and business, he sold chewing gum and Coca-Cola door to door, delivered newspapers, bought his first shares at eleven, and filed his first tax return at thirteen. He attended the Wharton School before transferring to the University of Nebraska, then earned a master's degree in economics at Columbia, where Benjamin Graham and David Dodd taught him to treat a share as ownership in a business and to demand a margin of safety.\n\nAfter Columbia, Buffett studied public speaking with Dale Carnegie and taught an investment class in Omaha. Graham initially declined to hire him, but Buffett joined Graham-Newman in New York in 1954. When Graham retired two years later, Buffett returned to Omaha and formed Buffett Partnership Ltd. with capital from family and friends. His partnership letters already emphasized alignment, measured performance, independent judgment, and avoiding permanent loss rather than predicting markets.",
    career: "Buffett took control of the struggling textile manufacturer Berkshire Hathaway in 1965 after a dispute over a tender offer. He later called the purchase a major mistake, but used the corporate shell to build a radically different enterprise. The acquisition of National Indemnity in 1967 gave Berkshire insurance float that could be invested until claims came due. Subsequent purchases, including See's Candies, GEICO, Nebraska Furniture Mart, BNSF, and a collection of large public-company holdings, turned Berkshire into a decentralized conglomerate with capital allocation and manager selection concentrated at its tiny Omaha headquarters.\n\nCharlie Munger, whom Buffett met in 1959, persuaded him to move beyond Benjamin Graham's bargain-priced cigar butts and pay sensible prices for exceptional businesses. Buffett described See's as the decisive lesson: a company with pricing power, low incremental capital needs, loyal customers, and managers who could operate autonomously. The Berkshire partnership combined Buffett's capital allocation and communication with Munger's insistence on business quality, opportunity cost, incentives, and avoiding obvious folly.\n\nBuffett served as Berkshire's chief executive from 1970 through 2025. Greg Abel became CEO on January 1, 2026, while Buffett remained chairman. From 1977 through 2024 Buffett's annual letters explained Berkshire's results and operating principles to shareholders in unusually plain language, including owner earnings, the retained-earnings test, economic moats, the institutional imperative, acquisition discipline, liquidity, reputation, and the prompt correction of mistakes.",
    legacy: "Buffett is among the most influential investors and business writers of the modern era. His distinctive contribution was not merely buying underpriced securities, but joining disciplined valuation to a permanent-capital company designed around trust, decentralized authority, conservative financing, and patient ownership. The shareholder letters became a practical course in accounting, capital allocation, management, psychology, and stewardship because they exposed errors as well as successes and addressed shareholders as partners.\n\nHe has pledged to give away more than 99 percent of his wealth and, with Bill and Melinda Gates, created the Giving Pledge to encourage other wealthy people to commit most of their fortunes to philanthropy. His most durable lesson is temperamental: stay inside what you can understand, wait for a favorable opportunity, avoid risks that can end the game, choose trustworthy partners, and let sound economics compound for a very long time.",
    notableQuotes: [
      "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price.",
      "Time is the friend of the wonderful business, the enemy of the mediocre.",
      "Our favorite holding period is forever.",
      "Mr. Market is there to serve you, not to guide you.",
      "The size of that circle is not very important; knowing its boundaries, however, is vital.",
      "A small chance of distress or disgrace cannot, in our view, be offset by a large chance of extra returns.",
    ],
    primarySources: [
      "Berkshire Hathaway shareholder letters, 1977 to 2024 (official archive)",
      "Buffett Partnership letters, 1959 to 1969",
      "Berkshire Hathaway 2014 shareholder letter, fiftieth-anniversary reflections by Buffett and Munger",
      "Berkshire Hathaway 2024 shareholder letter",
      "Warren Buffett's November 2025 Thanksgiving message to shareholders",
      "The Snowball: Warren Buffett and the Business of Life by Alice Schroeder (2008)",
    ],
  },

  "charlie-munger": {
    "slug": "charlie-munger",
    "occupation": "Investor, lawyer, and vice chairman of Berkshire Hathaway; Warren Buffett's partner for more than sixty years",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Charlie_Munger",
    "fullName": "Charles Thomas Munger",
    "birthDate": "January 1, 1924",
    "birthPlace": "Omaha, Nebraska, U.S.",
    "deathDate": "November 28, 2023 (aged 99)",
    "deathPlace": "Santa Barbara, California, U.S.",
    "nationality": "American",
    "education": [
      "University of Michigan (mathematics, 1941 to 1943, left to enlist, no undergraduate degree)",
      "California Institute of Technology (meteorology, U.S. Army Air Corps program, 1943 to 1946)",
      "Harvard Law School (J.D., magna cum laude, 1948)"
    ],
    "occupations": [
      "Investor",
      "Lawyer, co-founder of Munger, Tolles and Olson",
      "Vice chairman of Berkshire Hathaway, 1978 to 2023",
      "Chairman of Wesco Financial and of the Daily Journal Corporation",
      "Philanthropist and self-taught architect"
    ],
    "yearsActive": "1948–2023",
    "notableWorks": [
      "Munger, Tolles and Olson, Los Angeles law firm co-founded in 1962",
      "Wheeler, Munger and Company, investment partnership run from 1962 to 1976, compounding at about 19.8 percent a year versus 5.0 percent for the Dow",
      "Berkshire Hathaway, vice chairman from 1978 until his death in 2023",
      "Wesco Financial Corporation, chairman from 1984 to 2011",
      "Daily Journal Corporation, chairman from 1977 until he stepped down in 2022",
      "Poor Charlie's Almanack (2005), his collected talks edited by Peter D. Kaufman"
    ],
    "spouses": [
      "Nancy Huggins (m. 1945; div. 1953)",
      "Nancy Barry Borthwick (m. 1956; d. 2010)"
    ],
    "children": "8 surviving (6 biological children plus 2 stepsons); his first son, Teddy, died of leukemia in 1955 at age nine",
    "parents": [
      "Alfred Case Munger, a lawyer",
      "Florence \"Toody\" Russell Munger"
    ],
    "awards": [
      "Named the architect of Berkshire Hathaway's modern philosophy by Warren Buffett",
      "Buildings named in his honor at Stanford University, the University of Michigan, the University of California, Santa Barbara, and Harvard-Westlake School, each funded by his own gifts"
    ],
    "netWorth": "About $2.6 billion at his peak and at his death in 2023, after decades of gifts to universities and transfers to his family",
    "earlyLife": "Charles Thomas Munger was born on January 1, 1924, in Omaha, Nebraska, the son of Alfred Case Munger, a lawyer, and the grandson of Thomas Charles Munger, a United States federal district judge. As a teenager he worked at Buffett and Son, an Omaha grocery store owned by Warren Buffett's grandfather Ernest, though the two future partners did not actually meet until 1959. He enrolled at the University of Michigan to study mathematics, then dropped out at nineteen, shortly after the attack on Pearl Harbor, to enlist in the United States Army Air Corps. The Army scored his aptitude tests, made him a second lieutenant, and sent him to the California Institute of Technology to train as a meteorologist.\n\nMunger never completed a bachelor's degree. He applied to Harvard Law School anyway, and the school initially rejected him precisely because he had no undergraduate diploma. The decision was reversed after Roscoe Pound, a former dean of Harvard Law and a longtime friend of the Munger family, put in a word on his behalf. Munger graduated in 1948, magna cum laude, near the top of his class. He had married Nancy Huggins in 1945, but the marriage ended in divorce in 1953, and in 1955 their young son Teddy died of leukemia at the age of nine. Friends recalled Munger walking the streets of Pasadena weeping after hospital visits, and he later described the loss as the most agonizing experience of his life.",
    "career": "Munger settled in the Los Angeles area to practice law, and in 1962 he co-founded the firm now known as Munger, Tolles and Olson. He had already concluded that billing hours would never buy the independence he wanted, so in that same year he launched an investment partnership, Wheeler, Munger and Company. From 1962 to 1975 it compounded at roughly 19.8 percent a year against 5.0 percent for the Dow Jones Industrial Average, an extraordinary record achieved through a highly concentrated portfolio. It came at a cost in volatility. The partnership fell about 31.9 percent in 1973 and 31.5 percent in 1974, recovered with a gain of more than 70 percent in 1975, and Munger, worn down and having lost some large investors, wound it up in 1976.\n\nHe met Warren Buffett at an Omaha dinner in 1959, and the two found an intellectual kinship that lasted more than sixty years. Munger's decisive contribution was to pull Buffett away from the strict cigar-butt bargain hunting he had learned from Benjamin Graham and toward paying fair prices for genuinely great businesses, a shift crystallized by the 1972 purchase of See's Candies through Blue Chip Stamps. In 1978 Munger became vice chairman of Berkshire Hathaway, a post he held until his death forty-five years later. He was also chairman of Wesco Financial from 1984 until Berkshire absorbed it in 2011, chairman of the Daily Journal Corporation, whose annual meetings became a pilgrimage for value investors, and a director of Costco from 1997.\n\nAdversity ran alongside the success. In his mid-fifties a cataract operation on his left eye went badly wrong, leaving him in severe pain and blind on that side, and the eye was ultimately removed. Fearing he would lose his sight entirely, he began taking lessons in Braille. His remaining eye held for the rest of his life. He answered such blows with a plain stoicism he pressed on others, arguing that a person should fix what can be fixed and calmly endure what cannot, and that self-pity is never of any use. Alongside investing he worked as a largely self-taught architect, drawing dormitory and library plans himself and giving universities large sums on the condition that they build to his designs.",
    "legacy": "Munger is remembered as the intellectual architect of modern Berkshire Hathaway and as one of the most quoted minds in the history of investing. His doctrine of elementary worldly wisdom, in which a thinker assembles a latticework of the big ideas from many disciplines rather than relying on a single specialty, and his talk on the psychology of human misjudgment, which catalogued the standard causes of human error, reshaped how a generation of investors thought about their own reasoning. Those talks were collected in Poor Charlie's Almanack (2005), a book that became a cult object among founders and investors and was reissued by Stripe Press in 2023. His giving reshaped campuses at Stanford, the University of Michigan, and the University of California, Santa Barbara, though his conviction that windowless bedrooms were an acceptable trade for social common space made the proposed Munger Hall at UCSB a national controversy, and the project was abandoned in August 2023.\n\nMunger died on November 28, 2023, at a hospital in Santa Barbara, California, thirty four days short of his hundredth birthday. Buffett, who had described him as part older brother and part loving father, said that Berkshire Hathaway could not have been built to its present state without Munger's inspiration, wisdom, and participation. He had spent roughly seventy years in the same Pasadena house, refused to sign the Giving Pledge on the grounds that he had already given away so much to his children that he had violated it, and remained, until weeks before his death, the sharpest and least sentimental voice in American business.",
    "notableQuotes": [
      "It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent.",
      "Show me the incentive and I will show you the outcome.",
      "The big money is not in the buying and the selling, but in the waiting.",
      "A great business at a fair price is superior to a fair business at a great price.",
      "The safest way to try to get what you want is to try to deserve what you want.",
      "I constantly see people rise in life who were not the smartest, sometimes not even the most diligent, but they are learning machines."
    ],
    "primarySources": [
      "Poor Charlie's Almanack: The Wit and Wisdom of Charles T. Munger, edited by Peter D. Kaufman (2005; expanded editions 2006 and 2008; Stripe Press edition 2023)",
      "Charlie Munger, letters to Wesco Financial shareholders, 1983 to 2010",
      "Charlie Munger, USC Law School commencement address, May 13, 2007",
      "Charlie Munger, A Lesson on Elementary, Worldly Wisdom as It Relates to Investment Management and Business, USC Marshall School of Business, 1994",
      "Daily Journal Corporation and Berkshire Hathaway annual meeting transcripts, 1997 to 2023",
      "Charlie Munger, Wikipedia (https://en.wikipedia.org/wiki/Charlie_Munger)"
    ]
  },
  "jeff-bezos": {
    "slug": "jeff-bezos",
    "occupation": "Entrepreneur and investor; founder of Amazon and Blue Origin, owner of The Washington Post",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Jeff_Bezos",
    "fullName": "Jeffrey Preston Bezos (born Jeffrey Preston Jorgensen)",
    "birthDate": "January 12, 1964",
    "birthPlace": "Albuquerque, New Mexico, U.S.",
    "nationality": "American",
    "education": [
      "Miami Palmetto Senior High School, Pinecrest, Florida; graduated 1982 as class valedictorian and a National Merit Scholar",
      "Student Science Training Program, University of Florida (summer 1982), where he won a Silver Knight Award",
      "Princeton University, Bachelor of Science in Engineering, 1986, summa cum laude, majoring in electrical engineering and computer science; elected to Phi Beta Kappa and Tau Beta Pi"
    ],
    "occupations": [
      "Entrepreneur and company founder",
      "Business executive; founder and executive chairman of Amazon",
      "Aerospace founder; owner of Blue Origin",
      "Media proprietor; owner of The Washington Post through Nash Holdings",
      "Investor and philanthropist through Bezos Expeditions, the Bezos Day One Fund and the Bezos Earth Fund"
    ],
    "yearsActive": "1986–present",
    "notableWorks": [
      "Amazon (founded July 5, 1994; website launched July 16, 1995), the online bookstore that became the world's largest e-commerce company",
      "Amazon Web Services (Amazon EC2 launched August 25, 2006), the cloud computing business that became Amazon's main profit engine",
      "Blue Origin (founded September 8, 2000), his private spaceflight company, builder of the New Shepard and New Glenn rockets",
      "The Washington Post (agreed August 5, 2013, closed October 1, 2013), bought personally for $250 million through Nash Holdings",
      "Amazon annual letters to shareholders (1997 to 2020), the essays that introduced Day 1 thinking, long-term investment and high-velocity decision making",
      "Invent and Wander: The Collected Writings of Jeff Bezos (2020), with an introduction by Walter Isaacson"
    ],
    "spouses": [
      "MacKenzie Tuttle, later MacKenzie Scott (m. 1993; divorce finalized July 5, 2019)",
      "Lauren Sánchez (m. June 27, 2025, in Venice, Italy)"
    ],
    "children": "4 with MacKenzie Scott: three sons and a daughter adopted from China",
    "parents": [
      "Jacklyn Gise Bezos (mother, 1946 to 2025), who was seventeen and still in high school when he was born",
      "Ted Jorgensen (biological father, 1944 to 2015), a circus unicyclist and later a bicycle shop owner",
      "Miguel \"Mike\" Bezos (adoptive father), a Cuban immigrant who married Jacklyn in 1968 and adopted Jeff at age four"
    ],
    "awards": [
      "Time Person of the Year, 1999",
      "The Economist Innovation Award, 2011, shared with Gregg Zehr for the Amazon Kindle",
      "Businessperson of the Year, Fortune, 2012",
      "Heinlein Prize for Advances in Space Commercialization, 2016",
      "Elected to the National Academy of Engineering, 2018; Axel Springer Award, Germany, 2018",
      "Chevalier of the Légion d'honneur, presented by President Emmanuel Macron in a private ceremony in February 2023"
    ],
    "netWorth": "About $254.5 billion as of July 23, 2026, per the Forbes Real-Time Billionaires list, which ranked him fourth in the world and put his stake in Amazon at roughly 8 percent. Estimates vary by tracker and by trading day because most of his wealth is Amazon stock; the Bloomberg Billionaires Index tracked a figure closer to $267 billion in the same month.",
    "earlyLife": "Jeffrey Preston Jorgensen was born in Albuquerque, New Mexico, on January 12, 1964, to Jacklyn Gise, a seventeen year old high school student, and Ted Jorgensen, a circus unicyclist. The marriage lasted little more than a year. In 1968 Jacklyn married Miguel \"Mike\" Bezos, a Cuban immigrant who had arrived in the United States alone at sixteen through Operation Pedro Pan and worked his way through the University of Albuquerque; he adopted Jeff, who took the Bezos name and did not learn Jorgensen's identity until he was about ten. The family moved to Houston and later to Miami as Mike built a career as an engineer at Exxon.\n\nThe formative influence of his childhood was his maternal grandfather, Lawrence Preston Gise, a former regional director of the U.S. Atomic Energy Commission in Albuquerque who retired early to a ranch near Cotulla, Texas. Bezos spent summers there from roughly age four to sixteen, castrating cattle, laying pipe and repairing windmills, and has said his grandfather taught him self reliance and that it is harder to be kind than clever. He was a compulsive tinkerer who rigged an alarm to keep his younger siblings out of his room and turned the family garage into a laboratory. He graduated as valedictorian of Miami Palmetto Senior High School in 1982, spent that summer in a science training program at the University of Florida, and went on to Princeton, where he abandoned an ambition to become a theoretical physicist after concluding that classmates understood problems more intuitively than he did. He graduated summa cum laude in 1986 with a degree in electrical engineering and computer science.",
    "career": "Bezos turned down offers from Intel, Bell Labs and Andersen Consulting and joined Fitel, a fintech telecommunications startup, then moved to Bankers Trust and in 1990 to the quantitative hedge fund D. E. Shaw & Co., where he became one of its youngest senior vice presidents. In 1994 he came across a statistic that web usage was growing at 2,300 percent a year, drew up a list of roughly twenty products that could be sold online, and settled on books because the catalog was vast and no physical store could stock it all. He left D. E. Shaw and drove west with his wife MacKenzie, writing the business plan on the way. The company was incorporated in Washington State on July 5, 1994, first under the name Cadabra, Inc., renamed Amazon.com within months after the world's largest river, and run out of the garage of a rented house in Bellevue. The site opened to the public on July 16, 1995. Amazon went public on the NASDAQ on May 15, 1997 at $18 a share, raising about $54 million.\n\nHis first letter to shareholders, attached to every annual letter for the next two decades, laid out the doctrine the company still runs on: optimize for long-term market leadership rather than quarterly profit, take cash flows over the appearance of GAAP earnings, and treat every day as Day 1. Amazon expanded from books into music, electronics and toys, opened its store to third party sellers, launched Prime in 2005, released the Kindle in 2007, and in 2006 began selling its own computing infrastructure as Amazon Web Services, which became the company's largest source of operating income. The 1999 Time Person of the Year cover was followed by a collapse in which Amazon's stock fell roughly 90 percent in the dot-com crash, a period Bezos survived by insisting the underlying business metrics were improving. Amazon bought Whole Foods for about $13.7 billion in 2017 and became the second American company to touch a $1 trillion market capitalization on September 4, 2018.\n\nOutside Amazon, Bezos founded the spaceflight company Blue Origin on September 8, 2000, under the motto Gradatim Ferociter, or step by step, ferociously. Its New Shepard suborbital vehicle carried Bezos himself, his brother Mark, aviator Wally Funk and student Oliver Daemen past the Kármán line on July 20, 2021, and its orbital New Glenn rocket first flew in January 2025. He agreed to buy The Washington Post on August 5, 2013 for $250 million in a personal capacity through Nash Holdings, with the sale closing that October. He stepped down as chief executive of Amazon on July 5, 2021, exactly twenty seven years after founding it, handing the job to AWS head Andy Jassy while remaining executive chairman and the company's largest individual shareholder. In November 2025 he took his first operating role since leaving the Amazon chief executive job, co-founding the artificial intelligence company Project Prometheus with the former Google X and Verily scientist Vik Bajaj and serving as its co-chief executive, focused on AI for engineering and manufacturing in computing, aerospace and automobiles.",
    "legacy": "Bezos built one of the most consequential companies of the internet era. Amazon reshaped retail by making near infinite selection, low prices and fast delivery the default consumer expectation, and through AWS it effectively created the public cloud industry, becoming the utility layer beneath a large share of the modern web. His management vocabulary has been widely copied by other founders: Day 1 versus Day 2, customer obsession over competitor obsession, two pizza teams, the six page narrative memo in place of slide decks, one way and two way doors, disagree and commit, and deciding at roughly 70 percent of the information you wish you had. The 1997 shareholder letter and its successors are read as a canonical text on building for the long term.\n\nHe is also one of the most contested figures in modern business. Amazon has drawn sustained criticism and regulatory action over warehouse injury rates and productivity quotas, opposition to unionization, its tax posture, and its dual role as both marketplace operator and competing seller, including a monopoly lawsuit brought by the U.S. Federal Trade Commission in 2023. His ownership of The Washington Post became a flashpoint in October 2024, when the paper ended its practice of endorsing presidential candidates at his direction and reportedly lost more than 250,000 subscriptions, and again in February 2025, when he narrowed the opinion section to the defense of personal liberties and free markets and its editor resigned. His philanthropy has scaled alongside the criticism: a $2 billion Bezos Day One Fund for homeless families and preschools announced in September 2018, a $10 billion Bezos Earth Fund for climate work announced in February 2020, and the Courage and Civility Awards. Since stepping back from running Amazon he has concentrated on Blue Origin, climate funding and, most recently, artificial intelligence.",
    "notableQuotes": [
      "But this is Day 1 for the Internet and, if we execute well, for Amazon.com.",
      "We will continue to make investment decisions in light of long-term market leadership considerations rather than short-term profitability considerations or short-term Wall Street reactions.",
      "Day 2 is stasis. Followed by irrelevance. Followed by excruciating, painful decline. Followed by death. And that is why it is always Day 1.",
      "I believe we are the best place in the world to fail (we have plenty of practice!), and failure and invention are inseparable twins.",
      "I knew that if I failed I wouldn't regret that, but I knew the one thing I might regret is not ever having tried.",
      "Cleverness is a gift, kindness is a choice."
    ],
    "primarySources": [
      "Jeff Bezos, 1997 Letter to Shareholders, Amazon.com, Inc. (reprinted by Amazon at https://www.aboutamazon.com/news/company-news/amazons-original-1997-letter-to-shareholders and attached to every subsequent annual letter)",
      "Jeff Bezos, 2015 Letter to Shareholders, Amazon.com, Inc. (https://s2.q4cdn.com/299287126/files/doc_financials/annual/2015-Letter-to-Shareholders.PDF)",
      "Jeff Bezos, 2016 Letter to Shareholders, Amazon.com, Inc. (https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders)",
      "Jeff Bezos, \"We Are What We Choose,\" Baccalaureate address to the Princeton University Class of 2010, May 30, 2010 (https://www.princeton.edu/news/2010/05/30/2010-baccalaureate-remarks)",
      "Jeff Bezos, interview with the Academy of Achievement, San Antonio, Texas, May 4, 2001 (https://achievement.org/achiever/jeffrey-p-bezos/)",
      "Jeff Bezos, Invent and Wander: The Collected Writings of Jeff Bezos, With an Introduction by Walter Isaacson (Harvard Business Review Press and PublicAffairs, November 17, 2020)"
    ]
  },
  "jensen-huang": {
    "slug": "jensen-huang",
    "occupation": "Electrical engineer and semiconductor executive, co-founder and CEO of Nvidia, who turned the graphics chip into the engine of the AI era",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Jensen_Huang",
    "fullName": "Jen-Hsun \"Jensen\" Huang",
    "birthDate": "17 February 1963",
    "birthPlace": "Tainan, Taiwan",
    "nationality": "American, born in Taiwan",
    "education": [
      "Aloha High School, Beaverton, Oregon (skipped two grades, graduated at 16)",
      "Oregon State University (BS, electrical engineering, 1984)",
      "Stanford University (MS, electrical engineering, 1992, earned part time at night while working full time)"
    ],
    "occupations": [
      "Co-founder, president and CEO of Nvidia",
      "Electrical engineer and microprocessor designer",
      "Semiconductor and computing executive",
      "Philanthropist"
    ],
    "yearsActive": "1984–present (Nvidia, 1993–present)",
    "notableWorks": [
      "Nvidia (co-founded 5 April 1993), the company he has run as president and CEO since its first day",
      "RIVA 128 (1997), the graphics chip shipped with roughly one month of payroll left in the bank, which sold about a million units in four months and saved the company",
      "GeForce 256 (1999), the first product Nvidia marketed as a GPU, popularizing the term",
      "CUDA (unveiled November 2006), the parallel computing platform that made GPUs programmable for general purpose work and, later, for deep learning",
      "DGX-1 (2016), Nvidia's first purpose built AI supercomputer, the initial unit hand delivered by Huang to OpenAI",
      "Blackwell architecture (announced at GTC, 18 March 2024), the data center GPU platform built for large scale generative AI"
    ],
    "spouses": [
      "Lori Mills Huang (m. 1985), his engineering lab partner at Oregon State"
    ],
    "children": "2 (Spencer and Madison, both of whom now work at Nvidia)",
    "awards": [
      "IEEE Founders Medal (2020)",
      "Robert N. Noyce Award, Semiconductor Industry Association (2021)",
      "Elected to the National Academy of Engineering (2024)",
      "Queen Elizabeth Prize for Engineering (2025), shared with Yoshua Bengio, Bill Dally, Geoffrey Hinton, John Hopfield, Yann LeCun and Fei-Fei Li",
      "Time Person of the Year (2025) as one of the Architects of AI, and Financial Times Person of the Year (2025)",
      "IEEE Medal of Honor (2026)"
    ],
    "netWorth": "US$183.2 billion as of 23 July 2026 (Forbes real time list, ranked seventh in the world). Almost all of it is Nvidia stock, a stake of roughly 3 percent, so the figure moves daily with the share price.",
    "earlyLife": "Jen-Hsun Huang was born on 17 February 1963 in Tainan, Taiwan, the son of a chemical engineer and a schoolteacher. Sources disagree on the city: Britannica and most Taiwanese accounts give Tainan, while his English Wikipedia entry gives Taipei. When he was about five the family followed his father's refinery work to Thailand. Political unrest there led his parents to send Jensen and his older brother to relatives in Tacoma, Washington, in 1973, when he was nine. The relatives enrolled him at the Oneida Baptist Institute in Oneida, Kentucky, apparently believing it was a prestigious boarding school. In practice it was a rural reform academy for troubled teenagers. Huang, one of the youngest boys on campus, was assigned to clean the dormitory bathrooms for a hundred older students, and his roommate was a seventeen year old covered in knife scars whom Huang taught to read and who in return taught him to lift weights. He was bullied and he excelled academically, and he has spent forty years telling audiences that no task is beneath him because of it.\n\nHis parents eventually reached the United States and the family settled in Beaverton, Oregon, where Huang attended Aloha High School, skipped two grades and graduated at sixteen. At fifteen he took his first job at a Denny's in Portland, working as a dishwasher, busboy and then waiter. He was also a serious table tennis player who scrubbed floors at the Paddle Palace club to fund tournament travel, finished third in junior doubles at the U.S. Open, and was described in a reader's letter published by Sports Illustrated in January 1978 as perhaps the most promising junior ever to play table tennis in the Northwest. He entered Oregon State University at sixteen and earned a BS in electrical engineering in 1984. He was the youngest student in a class he has described as 250 people and three women, and in an electrical fundamentals lab he was paired with one of them, Lori Mills. They married in 1985. He went to work as a chip designer while completing a master's in electrical engineering at Stanford in 1992, taking night classes over roughly eight years.",
    "career": "Huang began at Advanced Micro Devices in 1984 as a microprocessor designer, then moved to LSI Logic, where he shifted from engineering into marketing and management and ran the Coreware business. There he worked with two Sun Microsystems engineers, Chris Malachowsky and Curtis Priem, who were frustrated with the state of PC graphics. The three met repeatedly at a Denny's on Berryessa Road in East San Jose, the same chain Huang had bussed tables for, because the coffee was bottomless and nobody moved them along. Nvidia was incorporated on 5 April 1993, with Huang as president and CEO from the first day, at age 30. The name derives from the Latin invidia. Sequoia Capital and Sutter Hill Ventures backed the company, and in 2023 Denny's fixed a plaque to the founding booth.\n\nThe first decade nearly killed it. The NV1 (1995) bet on a graphics approach the industry did not adopt, and a Sega console contract collapsed when Huang concluded mid project that Nvidia's architecture was wrong. He told Sega's president Shoichiro Irimajiri the truth and asked to be paid anyway; the resulting $5 million, Huang later said, gave the company six months to live. In 1996 he cut headcount from about 100 to roughly 40 and put everything into one chip. The RIVA 128 shipped in August 1997 with about one month of payroll remaining and sold roughly a million units in four months. Nvidia went public on 22 January 1999 and released the GeForce 256 later that year, the first part it marketed as a graphics processing unit. The decisive bet came in November 2006, when Huang unveiled CUDA and began spending billions to make GPUs programmable for general purpose computing, a move that crushed margins and baffled investors for years. It paid off in 2012, when AlexNet showed that GPUs could train deep neural networks, and again in 2016, when Huang personally delivered Nvidia's first DGX-1 AI supercomputer to OpenAI.\n\nThe generative AI boom that followed made Nvidia the most valuable company on earth. It crossed $1 trillion in market capitalization in May 2023, passed Microsoft and Apple in June 2024 at about $3.3 trillion, became the first company to close above $4 trillion in July 2025, and reached $5 trillion in October 2025, trading at roughly that level in July 2026. Huang runs it with a deliberately flat structure: no personal office, about 60 direct reports, almost no one on one meetings, status delivered by short written updates he calls the top five things, and criticism given in front of the group so everyone learns at once. He has opened internal presentations for decades with the line that the company is thirty days from going out of business, and he has become a geopolitical figure as well as a corporate one, negotiating around U.S. export controls on China and promoting the idea of sovereign AI to national governments.",
    "legacy": "Jensen Huang is the longest tenured founder chief executive in the semiconductor industry, having led one company for more than thirty years, and he is the person most responsible for the fact that the machinery of artificial intelligence runs on graphics chips. The insight that made him was not a product but a category error he refused to accept: that a processor built to draw triangles was only good for drawing triangles. CUDA turned the GPU into a general purpose parallel computer roughly six years before deep learning needed one, an investment made without a market and defended through years of poor stock performance. The pace of improvement in his accelerators has been dubbed Huang's Law. His public philosophy is unusually bleak for a technology executive and unusually specific: he does not preach vision or genius, he preaches endurance, low expectations, and the usefulness of humiliation, arguing that resilience rather than intelligence separates people who finish from people who quit.\n\nHe and Lori established the Jen-Hsun and Lori Huang Foundation in 2007, which by late 2025 held assets in excess of $12 billion, making it one of the largest private foundations in the United States. Their named gifts include $50 million to Oregon State University toward the Huang Collaborative Innovation Complex and $30 million to Stanford for the Huang Engineering Center. Scrutiny has followed the scale: a December 2024 New York Times investigation reported that Huang's estate planning, using grantor trusts, is positioned to avoid roughly $8 billion in future estate taxes, and critics note that a large share of the foundation's grants have flowed into donor advised funds rather than to operating charities. As of 23 July 2026 Forbes estimated his net worth at $183.2 billion, seventh in the world, essentially all of it Nvidia stock. He still wears the black leather jacket, and he still tells graduating classes that he hopes they suffer.",
    "notableQuotes": [
      "Either you are running for food, or you are running from becoming food. And oftentimes, you can't tell which. Either way, run.",
      "For all of you Stanford students, I wish upon you ample doses of pain and suffering.",
      "Greatness comes from character, and character isn't formed out of smart people. It's formed out of people who suffered.",
      "Your pain and suffering will strengthen your character, your resilience and agility, and they are the ultimate superpowers.",
      "Our company is thirty days from going out of business.",
      "Building a company and building Nvidia turned out to have been a million times harder than I expected it to be."
    ],
    "primarySources": [
      "Tae Kim, The Nvidia Way: Jensen Huang and the Making of a Tech Giant (W. W. Norton, 2024), reported from more than one hundred interviews including with Huang, his co-founders and early employees",
      "Jensen Huang, commencement address, National Taiwan University, 26 May 2023, published by NVIDIA (https://blogs.nvidia.com/blog/2023/05/26/huang-ntu-commencement/)",
      "Jensen Huang, keynote address, Caltech 130th Annual Commencement, 14 June 2024",
      "Jensen Huang, View From The Top, Stanford Graduate School of Business, 1 March 2024",
      "Acquired podcast, NVIDIA CEO Jensen Huang, October 2023 (https://www.acquired.fm/episodes/jensen-huang)",
      "Jensen Huang, Wikipedia (https://en.wikipedia.org/wiki/Jensen_Huang) and Britannica Money (https://www.britannica.com/money/Jensen-Huang)"
    ]
  },
  "naval-ravikant": {
    "slug": "naval-ravikant",
    "occupation": "Entrepreneur, angel investor and writer; co-founder of Epinions and AngelList",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Naval_Ravikant",
    "fullName": "Naval Ravikant",
    "birthDate": "November 5, 1974",
    "birthPlace": "Delhi, India",
    "nationality": "Indian-born American",
    "education": [
      "Stuyvesant High School, New York City (graduated 1991), entered by competitive examination",
      "Dartmouth College (1995), degrees in computer science and economics",
      "Undergraduate internship at the law firm Davis Polk & Wardwell"
    ],
    "occupations": [
      "Entrepreneur",
      "Angel investor",
      "Co-founder and chairman of AngelList",
      "Writer and podcaster"
    ],
    "yearsActive": "1999–present",
    "notableWorks": [
      "Epinions (co-founded 1999), the consumer review site that merged into Shopping.com",
      "Venture Hacks (2007), the startup financing blog he wrote with Babak Nivi",
      "AngelList (2010), co-founded with Babak Nivi; parent of Product Hunt, CoinList and Wellfound",
      "How to Get Rich (Without Getting Lucky) (2018), his 30-plus post thread on wealth, leverage and judgment",
      "Naval (2019), his podcast and essay archive at nav.al",
      "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness (2020), curated by Eric Jorgenson and released free online"
    ],
    "children": "At least one. Ravikant keeps his family life private and refers to his child only in passing in interviews.",
    "awards": [
      "Angel Investor of the Year, 10th Annual Crunchies (TechCrunch), February 2017"
    ],
    "earlyLife": "Naval Ravikant was born on November 5, 1974 in Delhi, India, and moved to New York City as a child, around the age of nine, settling in Queens with his mother and his younger brother Kamal. His father had been a pharmacist in India, but the degree was not recognized in the United States and he worked in a hardware store instead; the family soon split up. In Ravikant's own account, he grew up in a single-parent household with his mother working, going to school and raising the two boys as latchkey kids. He has described the arrangement plainly: they were poor immigrants, there was a lot of hardship, and the children became self-sufficient very early. He also credits his mother with the one thing that made the hardship survivable, saying she gave unconditional and unfailing love, and with being the first person to notice what he was actually good at.\n\nThe neighbourhood was not safe, so the public library became his after-school center; he would go straight there and stay until it closed. He had a paper route, washed dishes in a school cafeteria, and at fifteen worked out of the back of a van for an unlicensed catering company delivering Indian food. The turn came when he passed the entrance exam for Stuyvesant High School, the selective New York public school, which he has called the thing that saved his life because it gave an unknown kid from a struggling immigrant family a credential that opened the next door. He graduated from Stuyvesant in 1991 and from Dartmouth College in 1995 with degrees in computer science and economics, having interned along the way at the law firm Davis Polk & Wardwell.",
    "career": "In 1999 Ravikant co-founded Epinions, a consumer product review site, with Nirav Tolia, Ramanathan Guha, Mike Speiser and Dion Lim, backed by Benchmark Capital and August Capital. The company survived the dot-com crash and in 2003 was combined with DealTime to form Shopping.com. Several founders had already left and were given to understand their equity was worthless. Shopping.com went public on October 30, 2004 and closed its first day valued at roughly 750 million dollars; eBay agreed to buy it for 634 million dollars in June 2005. In January 2005 Ravikant and three co-founders sued Benchmark, August Capital and Tolia, alleging they had not been told material facts about Epinions' finances, including a Google deal expected to raise 2003 profits enormously. The case settled in December 2005. Suing his own venture backers made him, by his own description, radioactive mud in Silicon Valley for years.\n\nHe served as a venture partner at August Capital from 2001, founded the classifieds marketplace Vast.com in 2003, and in 2007 started a small fund called The Hit Forge while launching the Venture Hacks blog with Babak Nivi to explain startup financing terms to founders. The blog's readership became the raw material for AngelList, which Ravikant and Nivi launched in April 2010 as a curated list of angel investors and quickly turned into online infrastructure for early-stage funding: syndicates, rolling funds, fund administration and startup recruiting. AngelList grew to encompass Product Hunt, CoinList and Wellfound, and Ravikant lobbied Congress in support of the JOBS Act, which loosened rules on private fundraising. His own angel portfolio, made largely before AngelList existed, included Twitter, Uber, Yammer, Stack Overflow, Postmates, Notion, OpenDoor, Wish and Thumbtack, and in February 2017 TechCrunch named him Angel Investor of the Year at the Crunchies. He co-founded the cryptocurrency hedge fund MetaStable Capital in 2014, spun CoinList out of AngelList in 2017 with Protocol Labs to run compliant token sales, and launched Spearhead the same year to bankroll founders as angel investors. He handed the AngelList chief executive role to Avlok Kohli in 2019 and stayed on as chairman.\n\nOn May 31, 2018 he published a thread titled How to Get Rich (Without Getting Lucky), which compressed a decade of thinking into roughly forty short posts and became one of the most widely circulated pieces of writing in startup culture. Its argument runs from wealth as assets that earn while you sleep, through specific knowledge and accountability, to the four forms of leverage: labor, capital, code and media. He followed it with the Naval podcast in February 2019 and a stream of essays at nav.al, moving steadily from company building toward questions of happiness, desire, reading and attention. In 2020 Eric Jorgenson curated a decade of his tweets, essays and interview transcripts into The Almanack of Naval Ravikant, published with a foreword by Tim Ferriss and given away free online, with Ravikant taking no money from it. In 2023 he co-founded Airchat with the former Tinder product chief Brian Norgard, a social app in which posts and replies are voice recordings that the app transcribes; the team rebuilt it and relaunched publicly on iOS and Android in April 2024.",
    "legacy": "Ravikant's lasting contribution to founders is twofold: he rebuilt the plumbing of early-stage investing, and he wrote down a theory of how ordinary people accumulate wealth without a lottery ticket. AngelList moved angel investing from private dinners to an open marketplace and made syndicates and small funds practical, which widened who gets to write checks and who gets to raise them. The How to Get Rich thread and the Almanack that grew out of it turned a set of ideas into common vocabulary: specific knowledge, accountability, permissionless leverage, judgment, productize yourself, play long-term games with long-term people. Those terms now circulate far beyond Silicon Valley, quoted by people who have never heard of Epinions.\n\nHe is also, by a wide margin, one of the most quote-farmed people on the internet, and that is part of the record. Hundreds of accounts recycle aphorisms under his name, many of them paraphrases, reorderings or lines that were never his; the Almanack's free full text and his own tweet archive exist in part as a check on that. His critics argue the philosophy flattens into slogans and that a body of aphorisms is easier to admire than to apply. What is not in dispute is the through line from a Queens library card to a public argument that wealth is created rather than transferred, and that the tools for creating it are now, for the first time, available without anyone's permission.",
    "notableQuotes": [
      "Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.",
      "You will get rich by giving society what it wants but does not yet know how to get. At scale.",
      "Pick an industry where you can play long-term games with long-term people.",
      "Specific knowledge is knowledge you cannot be trained for. If society can train you, it can train someone else and replace you.",
      "Escape competition through authenticity.",
      "A fit body, a calm mind, a house full of love. These things cannot be bought - they must be earned."
    ],
    "primarySources": [
      "Naval Ravikant, How to Get Rich (Without Getting Lucky), thread posted on Twitter/X, May 31, 2018 (https://x.com/naval/status/1002103360646823936), collected at https://nav.al/rich",
      "Eric Jorgenson, The Almanack of Naval Ravikant: A Guide to Wealth and Happiness (2020), foreword by Tim Ferriss, full text free at https://www.navalmanack.com",
      "nav.al, Ravikant's own essay archive and the Naval podcast, launched February 2019 (https://nav.al)",
      "Naval Ravikant, Wikipedia (https://en.wikipedia.org/wiki/Naval_Ravikant)",
      "Epinions, Wikipedia, for the 1999 founding, the DealTime merger and the January 2005 shareholder lawsuit and its December 2005 settlement (https://en.wikipedia.org/wiki/Epinions)",
      "Naval Ravikant, The Angel Philosopher, The Knowledge Project podcast with Shane Parrish, Farnam Street (https://fs.blog/knowledge-project-podcast/naval-ravikant/)"
    ]
  },
  "peter-thiel": {
    "slug": "peter-thiel",
    "occupation": "Entrepreneur, venture capitalist, and author; cofounder of PayPal and Palantir, first outside investor in Facebook, and coauthor of Zero to One",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Peter_Thiel",
    "fullName": "Peter Andreas Thiel",
    "birthDate": "October 11, 1967",
    "birthPlace": "Frankfurt am Main, West Germany (now Germany)",
    "nationality": "German and American; also granted New Zealand citizenship in 2011",
    "education": [
      "San Mateo High School, San Mateo, California; valedictorian, class of 1985",
      "Stanford University, BA in philosophy, 1989",
      "Stanford Law School, JD, 1992"
    ],
    "occupations": [
      "Entrepreneur and company cofounder",
      "Venture capitalist",
      "Hedge fund manager",
      "Author",
      "Philanthropist and grantmaker"
    ],
    "yearsActive": "1996–present",
    "notableWorks": [
      "The Diversity Myth (1995), a book on Stanford's speech and curriculum policies, coauthored with David O. Sacks",
      "Confinity, later PayPal (cofounded 1998), the payments company he ran as CEO through its 2002 sale to eBay",
      "Palantir Technologies (cofounded 2003), the data analytics company he still chairs",
      "Founders Fund (cofounded 2005), the venture firm that was first institutional investor in both SpaceX and Palantir",
      "Thiel Fellowship (launched 2010), grants paid to young people to leave or skip university and build instead",
      "Zero to One: Notes on Startups, or How to Build the Future (2014), coauthored with Blake Masters"
    ],
    "spouses": [
      "Matt Danzeisen (married October 2017)"
    ],
    "children": "Two, according to press reports; Thiel does not discuss his family publicly and Wikipedia lists no children",
    "awards": [
      "Herman Lay Award for Entrepreneurship (2006)",
      "World Economic Forum Young Global Leader (2007)",
      "Edmund Burke Award for Service to Culture and Society, The New Criterion (2023)",
      "TIME 100 Most Influential People in AI (2025)",
      "Axel Springer Award (2026); the ceremony in Berlin is scheduled for September 24, 2026"
    ],
    "netWorth": "US$27.2 billion as of July 23, 2026, per the Forbes real-time billionaires list, where he ranks roughly 88th in the world. Estimates vary widely between trackers because most of the total sits in Palantir stock, carried interest, and illiquid private stakes such as SpaceX and Stripe, so the figure moves week to week. The New York Times put it at about $27.5 billion in December 2025.",
    "earlyLife": "Peter Andreas Thiel was born on October 11, 1967 in Frankfurt am Main, the elder son of Klaus Friedrich Thiel, a chemical engineer, and Susanne Thiel. The family emigrated to the United States when he was one year old and settled first in Cleveland, Ohio. His father's work took them abroad again in the 1970s, including stretches in South Africa and in South West Africa, now Namibia, where Thiel attended a German language school in Swakopmund that used corporal punishment. They finally settled in Foster City, California, in 1977, after he had passed through roughly seven schools. He took up chess at six, was ranked among the strongest juniors in the country, and went on to hold a master rating with the United States Chess Federation.\n\nThiel was valedictorian of San Mateo High School in 1985 and went to Stanford to study philosophy. There he encountered the literary theorist René Girard, whose account of mimetic desire, the idea that human wants are copied from other people rather than generated independently, became the organizing idea of his adult thinking; Thiel later funded Imitatio, a foundation devoted to Girard's work. In 1987 he cofounded The Stanford Review, a libertarian and conservative campus paper whose alumni network later supplied several of his business partners, David O. Sacks and Keith Rabois among them. He took his BA in philosophy in 1989 and a JD from Stanford Law School in 1992. In 1995 he and Sacks published The Diversity Myth, a critique of Stanford's speech codes and Western culture curriculum of that period. After law school he clerked on the United States Court of Appeals for the Eleventh Circuit, spent under a year as a securities lawyer at Sullivan & Cromwell in New York, and then traded derivatives at Credit Suisse.",
    "career": "In 1996 Thiel raised money from friends and family to start Thiel Capital Management in the San Francisco Bay Area. In December 1998 he cofounded Confinity with the engineer Max Levchin, along with Luke Nosek and Ken Howery, to build cryptography software for handheld devices. The product that took hold was a way to send money by email, which became PayPal. In March 2000 Confinity merged with X.com, the online bank founded by Elon Musk, and the combined company adopted the PayPal name in June 2001 with Thiel as chief executive. PayPal listed on Nasdaq in February 2002 and was acquired by eBay in a stock transaction valued at about $1.5 billion that closed on October 3, 2002. Thiel's stake, reported at roughly 3.7 percent, was worth about $55 million. The PayPal alumni who went on to found or fund Tesla, SpaceX, YouTube, LinkedIn, Yelp, and Affirm became known as the PayPal Mafia.\n\nAfter the sale he started Clarium Capital, a global macro hedge fund, in 2002; its assets peaked near $8 billion in 2008 before losses and redemptions cut it to a few hundred million dollars by 2011. In 2003 he cofounded Palantir Technologies with Alex Karp, Joe Lonsdale, Stephen Cohen, and Nathan Gettings, naming it after the seeing stones in J. R. R. Tolkien's fiction, with the premise that the fraud detection methods built at PayPal could be turned on intelligence and law enforcement data. Thiel largely bankrolled the early development, the CIA affiliated fund In-Q-Tel was an early outside investor, and he remains chairman; Palantir went public through a direct listing on the New York Stock Exchange on September 30, 2020. In August 2004 he became Facebook's first outside investor, putting in $500,000 for 10.2 percent of the company, structured as a convertible note that was to convert if Facebook hit 1.5 million users by year end. The company narrowly missed the target and Thiel converted anyway. He took a board seat and held it until 2022, and sold most of his shares around the 2012 initial public offering for roughly $1 billion. In 2005 he cofounded Founders Fund with Nosek and Howery, which became the first institutional investor in both SpaceX and Palantir and backed Stripe and Airbnb among others, and which managed about $17 billion as of 2025. He later added Valar Ventures in 2010 and Mithril Capital Management in 2012. In June 2021 ProPublica reported that he held a Roth retirement account worth about $5 billion, built from founder shares originally purchased at a fraction of a cent each.\n\nIn the spring of 2012 Thiel taught a Stanford course, CS183: Startup. A student, Blake Masters, published his class notes online, they circulated widely, and the two reworked them into Zero to One: Notes on Startups, or How to Build the Future, published by Crown Business on September 16, 2014. Its argument is that valuable companies go from zero to one by making something genuinely new rather than copying what already works, that competition erodes profit while a durable monopoly is the normal condition of a successful business, and that founders should look for secrets, important truths that few people agree with. Around the ideas he built institutions. The Thiel Foundation funds work on life extension, artificial intelligence safety, seasteading, and Girard studies, and the Thiel Fellowship, announced at TechCrunch Disrupt in September 2010, pays people in their late teens and early twenties to leave or skip university and work on companies or research instead. The grant was $100,000 over two years at launch and has since been raised. Fellows have included Vitalik Buterin, who created Ethereum, Dylan Field of Figma, Austin Russell of Luminar, and Ritesh Agarwal of OYO.",
    "legacy": "Thiel's influence runs through both the companies and the vocabulary. The PayPal cohort he assembled seeded an unusual share of the next two decades of American technology firms. Palantir became one of the largest publicly traded software companies. Founders Fund helped normalize venture backing for capital intensive, technically ambitious, long horizon companies that conventional funds had avoided, starting with SpaceX. Zero to One became a standard text in startup circles, and its terms, going from zero to one, secrets, definite optimism, last mover advantage, and competition as something to escape rather than embrace, entered everyday founder usage. The line about flying cars and 140 characters, which came from the 2011 Founders Fund manifesto and which he has repeated in talks, became shorthand for his broader claim that technological progress outside computing and finance slowed after about 1970.\n\nHe has also been the subject of sustained public controversy, and several chapters remain contested. In 2007 the website Gawker published a post identifying him as gay. Beginning around 2012 he financed litigation against Gawker Media without public disclosure at the time, including the invasion of privacy suit brought by the wrestler Terry Bollea, known professionally as Hulk Hogan, over a published sex tape. A Florida jury awarded Bollea $140 million in March 2016, Forbes reported in May 2016 that Thiel had put roughly $10 million into the cases, Gawker Media filed for Chapter 11 bankruptcy in June 2016, gawker.com stopped publishing that August, and the case settled for $31 million in November 2016. The episode drew wide commentary on third party litigation funding and press freedom. In politics, Thiel spoke at the 2016 Republican National Convention, donated to Donald Trump's campaign and served on the presidential transition team, and in the 2022 midterm elections funded super PACs supporting the Senate candidacies of JD Vance and Blake Masters. His 2011 grant of New Zealand citizenship became a subject of debate there when it was reported in 2017. He left the Meta board in 2022.",
    "notableQuotes": [
      "Every moment in business happens only once. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won't make a search engine. And the next Mark Zuckerberg won't create a social network. If you are copying these guys, you aren't learning from them.",
      "What important truth do very few people agree with you on?",
      "All happy companies are different: each one earns a monopoly by solving a unique problem. All failed companies are the same: they failed to escape competition.",
      "Monopoly is the condition of every successful business.",
      "Brilliant thinking is rare, but courage is in even shorter supply than genius.",
      "We wanted flying cars, instead we got 140 characters."
    ],
    "primarySources": [
      "Peter Thiel with Blake Masters, Zero to One: Notes on Startups, or How to Build the Future (Crown Business, September 16, 2014)",
      "Blake Masters, class notes and essays from Peter Thiel's CS183: Startup, Stanford University, Spring 2012 (https://blakemasters.tumblr.com/peter-thiels-cs183-startup)",
      "Peter Thiel, \"Competition Is for Losers,\" The Wall Street Journal, September 12, 2014, adapted from Zero to One",
      "Peter Thiel, \"The Education of a Libertarian,\" Cato Unbound, April 13, 2009",
      "Founders Fund, \"What Happened to the Future?\" (firm manifesto, 2011, https://foundersfund.com/2017/01/manifesto/)",
      "Peter Thiel and David O. Sacks, The Diversity Myth (The Independent Institute, 1995)"
    ]
  },
  "sam-walton": {
    "slug": "sam-walton",
    "occupation": "American retailer and entrepreneur, founder of Walmart and Sam's Club",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Sam_Walton",
    "fullName": "Samuel Moore Walton",
    "birthDate": "March 29, 1918",
    "birthPlace": "Kingfisher, Oklahoma, U.S.",
    "deathDate": "April 5, 1992 (aged 74)",
    "deathPlace": "Little Rock, Arkansas, U.S. Cause of death: multiple myeloma, a cancer of the bone marrow.",
    "nationality": "American",
    "education": [
      "David H. Hickman High School, Columbia, Missouri",
      "University of Missouri, Columbia (B.A. Economics, 1940; Beta Theta Pi; ROTC cadet officer)",
      "University of Missouri, honorary Doctor of Laws (1984)"
    ],
    "occupations": [
      "Retailer and merchant",
      "Founder and chairman of Walmart",
      "Founder of Sam's Club",
      "Businessman",
      "Author"
    ],
    "yearsActive": "1940–1992",
    "notableWorks": [
      "Ben Franklin franchise store, Newport, Arkansas (operated 1945 to 1950)",
      "Walton's 5 & 10, Bentonville, Arkansas (opened May 9, 1950)",
      "Walmart, first store, Rogers, Arkansas (opened July 2, 1962)",
      "Wal-Mart Stores, Inc. initial public offering (October 1, 1970)",
      "Sam's Club, first warehouse club, Midwest City, Oklahoma (April 1983)",
      "Sam Walton: Made in America, My Story, autobiography with John Huey (1992)"
    ],
    "spouses": [
      "Helen Robson (m. February 14, 1943, until his death in 1992)"
    ],
    "children": "4 (Samuel Robson 'Rob', John Thomas, James Carr 'Jim', Alice Louise)",
    "parents": [
      "Thomas Gibson Walton",
      "Nancy Lee Lawrence Walton"
    ],
    "awards": [
      "Presidential Medal of Freedom, presented by President George H. W. Bush in Bentonville, Arkansas (March 17, 1992)",
      "Honorary Doctor of Laws, University of Missouri (1984)",
      "Distinguished Eagle Scout Award (he had been the youngest Eagle Scout in Missouri history to that point)",
      "Junior Achievement U.S. Business Hall of Fame (1992)",
      "Time 100: The Most Important People of the 20th Century (1998, posthumous)"
    ],
    "netWorth": "Forbes ranked him the richest person in the United States from 1982 to 1988, valuing him at about $2.8 billion in 1985. At his death in April 1992 the Walton family's Walmart holdings were estimated at roughly $23 to $25 billion.",
    "earlyLife": "Samuel Moore Walton was born on March 29, 1918, in Kingfisher, Oklahoma, the elder son of Thomas Gibson Walton and Nancy Lee Lawrence Walton. His father worked in turn as a farmer, banker, farm loan appraiser, and insurance and real estate agent, and the Depression moved the family repeatedly through Oklahoma and Missouri before they settled in Columbia. Money was tight, and Walton worked from childhood: he milked the family cow and sold the surplus milk, built a newspaper route into a small business employing other boys, and sold magazine subscriptions. In the eighth grade he became the youngest Eagle Scout in Missouri's history to that date.\n\nAt David H. Hickman High School in Columbia he quarterbacked the state championship football team and was voted Most Versatile Boy by his classmates. He paid his own way through the University of Missouri, waiting tables in exchange for meals and keeping his paper route, joined Beta Theta Pi, served as an ROTC cadet officer, and graduated in 1940 with a bachelor's degree in economics. Days later he joined J. C. Penney as a management trainee in Des Moines, Iowa, at $75 a month, and picked up the company habit of calling store workers associates rather than employees. He entered the Army in 1942, married Helen Robson on February 14, 1943, served stateside in the Army Intelligence Corps supervising security at aircraft plants and other defense facilities, and was discharged as a captain in 1945.",
    "career": "With $5,000 he had saved and $20,000 borrowed from his father in law, Leland Robson, Walton bought a Ben Franklin variety store franchise in Newport, Arkansas, on September 1, 1945. He cut prices below what the franchisor recommended, bought stock directly from jobbers to widen his margin, and drove annual sales from roughly $80,000 to $225,000 in five years, making it the best performing Ben Franklin in a six state region. Then came the lesson that shaped everything after it. His lease carried no renewal option, and in 1950 the landlord, P. K. Holmes, refused to renew so that his own son could take the store. Walton sold the inventory and fixtures for about $50,000 and started over in Bentonville, Arkansas, opening Walton's 5 & 10 on the town square on May 9, 1950, this time making certain of his hold on the real estate first.\n\nThrough the 1950s Walton and his brother Bud built a chain of variety stores across Arkansas, Missouri, Kansas, and Oklahoma. He learned to fly and bought a small plane so he could scout towns and store sites from the air. Convinced that deep discounting would work in the small towns the national chains ignored, and unable to persuade Ben Franklin's management to fund the idea, he risked his own money and opened Wal-Mart Discount City at 719 West Walnut Street in Rogers, Arkansas, on July 2, 1962. He was 44 years old. Expansion followed the warehouse rather than the map: Walmart saturated the territory within a day's drive of each distribution center before jumping to the next, which let a rural retailer build national scale on unusually low overhead. The company incorporated as Wal-Mart Stores, Inc. in 1969 and went public on October 1, 1970, offering 300,000 shares at $16.50 apiece, largely to retire the debt Walton had personally guaranteed.\n\nGoing public did not change the culture, which stayed recognisably his. He called the workforce associates, extended profit sharing to them from 1971 and later stock purchase plans, opened store level numbers to managers, and ran a Saturday morning meeting at headquarters every week for decades. He drove a battered pickup around Bentonville, visited stores constantly, and copied good ideas from competitors without a trace of embarrassment. When associates beat his pretax profit target for 1983 he paid off a bet by dancing the hula in a grass skirt on Wall Street. He added the warehouse club format with the first Sam's Club in Midwest City, Oklahoma, in April 1983, and the combined grocery and general merchandise Supercenter in Washington, Missouri, in 1988, the same year he handed the chief executive role to David Glass and stayed on as chairman. By 1990 Walmart was the largest retailer in the United States.",
    "legacy": "Walton was treated for hairy cell leukemia in the 1980s and was later diagnosed with multiple myeloma, a cancer of the bone marrow. On March 17, 1992, President George H. W. Bush traveled to Bentonville rather than summon him to Washington and presented him with the Presidential Medal of Freedom in front of his associates; Walton called it the highlight of his entire career. Nineteen days later, on April 5, 1992, he died at University Hospital in Little Rock, Arkansas, aged 74, and was buried in Bentonville. He left 1,735 Walmart stores, 212 Sam's Clubs, and 13 Supercenters, some 380,000 associates, and annual sales approaching $50 billion. His autobiography, written with the journalist John Huey and finished in his final months, reached bookstores within weeks of his death.\n\nThe company he started on a town square kept compounding after him, becoming the largest company in the world by revenue and the largest private employer on earth, and the fortune it generated made his heirs one of the wealthiest families in history. His method, everyday low prices funded by relentless expense control, logistics treated as the core product, ownership shared with front line workers, and a bias toward copying whatever worked, became the template for modern mass retail. Critics argue with equal force that the same method hollowed out main street merchants and held retail wages down. Walton himself always insisted the answer was plainer than either his admirers or his detractors made it: buy well, keep costs below the competition's, give the customer more than they expect, and stay close enough to the sales floor to hear what is actually happening.",
    "notableQuotes": [
      "There is only one boss. The customer. And he can fire everybody in the company from the chairman on down, simply by spending his money somewhere else.",
      "The secret of successful retailing is to give your customers what they want.",
      "Every time Wal-Mart spends one dollar foolishly, it comes right out of our customers' pockets.",
      "If I had to single out one element in my life that has made a difference for me, it would be a passion to compete.",
      "I have always been driven to buck the system, to innovate, to take things beyond where they've been.",
      "Swim upstream. Go the other way. Ignore the conventional wisdom. If everybody else is doing it one way, there's a good chance you can find your niche by going in exactly the opposite direction."
    ],
    "primarySources": [
      "Sam Walton with John Huey, Sam Walton: Made in America, My Story (Doubleday, 1992). His autobiography, completed in his last months and published just after his death. The primary source for his own voice, the Ten Rules for Building a Business, and the Newport lease story.",
      "Sam Walton's Ten Rules for Building a Business, published verbatim by Walmart (https://corporate.walmart.com/about/sam-walton/10-rules-for-building-a-better-business)",
      "Sam Walton (1918 to 1992), Encyclopedia of Arkansas (https://encyclopediaofarkansas.net/entries/samuel-moore-walton-1792/)",
      "Remarks on Presenting the Presidential Medal of Freedom to Samuel M. Walton in Bentonville, Arkansas, March 17, 1992, The American Presidency Project (https://www.presidency.ucsb.edu/documents/remarks-presenting-the-presidential-medal-freedom-samuel-m-walton-bentonville-arkansas)",
      "Sam Walton, Encyclopaedia Britannica (https://www.britannica.com/money/Sam-Walton)",
      "Sam Walton, Wikipedia (https://en.wikipedia.org/wiki/Sam_Walton)"
    ]
  },
  "steve-jobs": {
    "slug": "steve-jobs",
    "occupation": "Co-founder and CEO of Apple, founder of NeXT, majority owner of Pixar, and the product mind behind the Macintosh, iPod, and iPhone",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Steve_Jobs",
    "fullName": "Steven Paul Jobs",
    "birthDate": "February 24, 1955",
    "birthPlace": "San Francisco, California, U.S.",
    "deathDate": "October 5, 2011 (aged 56)",
    "deathPlace": "Palo Alto, California, U.S. Cause of death was respiratory arrest, with a metastatic pancreatic neuroendocrine tumor recorded as the underlying condition.",
    "nationality": "American",
    "education": [
      "Homestead High School, Cupertino, California (graduated 1972)",
      "Reed College, Portland, Oregon (enrolled fall 1972, withdrew after one semester, then audited classes including calligraphy for roughly 18 months)"
    ],
    "occupations": [
      "Entrepreneur and business magnate",
      "Co-founder, chairman and chief executive officer of Apple",
      "Founder and chief executive officer of NeXT",
      "Majority owner and chairman of Pixar, later the largest individual shareholder and a director of The Walt Disney Company",
      "Inventor and designer, named on more than 450 patents"
    ],
    "yearsActive": "1971–2011",
    "notableWorks": [
      "Apple II (1977), the machine that turned personal computing into a mass market",
      "Macintosh (1984), the first commercially successful computer built around a graphical interface and a mouse",
      "Toy Story (1995), Pixar's debut feature and the first fully computer-animated film",
      "iMac (1998) and iPod (2001), the products that pulled Apple back from near bankruptcy and remade the music business",
      "iPhone (2007), which redefined the mobile phone and, with the App Store in 2008, created the modern app economy",
      "iPad (2010), which established the modern tablet category"
    ],
    "spouses": [
      "Laurene Powell (m. 1991)"
    ],
    "children": "4 (Lisa Brennan-Jobs, born 1978, with Chrisann Brennan; Reed, Erin and Eve Jobs, with Laurene Powell Jobs)",
    "parents": [
      "Paul Reinhold Jobs, adoptive father, a machinist and mechanic",
      "Clara Jobs, born Clara Hagopian, adoptive mother, a payroll clerk",
      "Abdulfattah John Jandali, biological father, a Syrian-born political science lecturer",
      "Joanne Carole Schieble, later Simpson, biological mother; her daughter, the novelist Mona Simpson, was Jobs's biological sister"
    ],
    "awards": [
      "National Medal of Technology (1985), presented by President Ronald Reagan alongside Steve Wozniak",
      "Jefferson Award for Public Service (1987)",
      "California Hall of Fame (inducted 2007)",
      "Grammy Trustees Award (2012, posthumous)",
      "Disney Legend (2013, posthumous)",
      "Presidential Medal of Freedom (2022, posthumous)"
    ],
    "netWorth": "Estimated at $8.3 billion by Forbes in March 2011, ranking him 110th in the world, the highest figure published in his lifetime. Roughly 72 percent of it was Walt Disney stock received for Pixar and only about 24 percent was Apple stock. Estimates of his holdings at death in October 2011 ran higher, near $10 billion, but were never confirmed by his estate.",
    "earlyLife": "Steven Paul Jobs was born in San Francisco on February 24, 1955 to two unmarried graduate students, Joanne Carole Schieble and Abdulfattah John Jandali, a Syrian-born political science lecturer, and was placed for adoption at birth. Paul Reinhold Jobs, a machinist and mechanic who had not finished high school, and his wife Clara, a payroll clerk born to Armenian immigrants, adopted him. Jobs later said his birth mother refused to sign the final papers until the couple promised the boy would go to college. He grew up in Mountain View and then Los Altos, in the orchards that were becoming Silicon Valley, and learned careful work at his father's workbench, where Paul insisted the back of a cabinet be built as well as the front. Jobs never called Paul and Clara anything but his parents, and he had little interest in Jandali, whom he met by chance and never acknowledged. He did build a lifelong bond with his biological sister, the novelist Mona Simpson.\n\nAt Homestead High School in Cupertino he fell in with Bill Fernandez and, through him, met Steve Wozniak in 1971. Their first venture was not a computer but the blue box, an illegal tone generator that let a user place free long distance calls. Jobs enrolled at Reed College in Portland in the fall of 1972, dropped out after a single semester because he could not justify spending his parents' savings, and then spent about eighteen months sleeping on friends' floors and auditing whatever interested him, including a calligraphy course that he later credited for the Macintosh's typography. He took a job at Atari in 1974, traveled to India in search of enlightenment with his friend Daniel Kottke, returned with a shaved head and a lasting attachment to Zen Buddhism, and began attending the Homebrew Computer Club in Menlo Park, where Wozniak was designing a computer of his own.",
    "career": "On April 1, 1976, Jobs, Wozniak and Atari engineer Ronald Wayne founded Apple Computer Company to sell Wozniak's hand-built Apple I. Wayne sold his 10 percent stake back for $800 twelve days later. Apple was incorporated on January 3, 1977, and the Apple II, released that year in a plastic case with color graphics, made it one of the fastest-growing companies in American history. The December 12, 1980 initial public offering created hundreds of millionaires and left Jobs, at 25, worth roughly $250 million. He recruited PepsiCo executive John Sculley as chief executive in 1983, took over the Macintosh project, and launched the machine on January 24, 1984 with the Ridley Scott directed 1984 commercial. The Macintosh sold poorly against its forecasts, Jobs's management of the division drew open revolt, and in May 1985 the board backed Sculley in stripping him of operational control. Jobs submitted his resignation on September 17, 1985 and left with five senior Apple employees.\n\nHe put $7 million into NeXT, a workstation company aimed at higher education, and later took investment from Ross Perot. The NeXT Computer was unveiled at a theatrical launch in San Francisco on October 12, 1988, drew admiration for its software and almost no buyers at prices near $10,000, and the company eventually abandoned hardware to sell its object-oriented operating system. Tim Berners-Lee wrote the first web browser and server on a NeXT machine. In 1986 Jobs paid roughly $10 million for the computer graphics division of Lucasfilm and renamed it Pixar, expecting to sell high-end imaging hardware. That business failed too, and he spent years and tens of millions of his own dollars funding a small animation group that kept making award-winning shorts. The bet turned in November 1995, when Toy Story opened as the first fully computer-animated feature and Pixar's public offering days later made his stake worth more than a billion dollars. Disney bought Pixar in an all-stock deal announced on January 24, 2006 and valued at about $7.4 billion, which made Jobs Disney's largest individual shareholder with roughly 7 percent and put him on its board.\n\nApple, meanwhile, was close to failing. It bought NeXT in December 1996 for about $400 million to get a modern operating system, and brought Jobs back as an adviser. After chief executive Gil Amelio was forced out, Jobs was named interim chief executive on September 16, 1997, a title he kept until becoming permanent CEO in January 2000. He cut the product line to four machines, settled with Microsoft in August 1997 in exchange for a $150 million investment and a commitment to keep making Office for the Mac, and relaunched the brand with the Think Different campaign. The iMac arrived in 1998, the first Apple Stores in 2001, the iPod in October 2001, the iTunes Music Store in 2003, the iPhone on January 9, 2007, the App Store in 2008, and the iPad in 2010. Apple dropped Computer from its name the day the iPhone was announced. By August 2011 it was briefly the most valuable publicly traded company in the United States.",
    "legacy": "Jobs was not the most gifted engineer in any room he entered, and he is the rare business figure whose reputation rests on taste, editing and refusal. He insisted that hardware, software and services be designed together, that a product be judged by what it is like to use rather than by its specifications, and that a company's most important decisions are the projects it kills. Under his second tenure Apple went from weeks of cash on hand to the most valuable company in the world, and it reordered four industries along the way: personal computing, music, mobile phones and, through Pixar, feature animation. He was also a difficult and often cruel manager, denied paternity of his eldest daughter for years, and left almost no public philanthropy under his own name, facts his admirers tend to skip. He is named on more than 450 patents.\n\nJobs was diagnosed in October 2003 with a pancreatic neuroendocrine tumor, an uncommon and comparatively slow-growing cancer that is often treatable by surgery. He delayed an operation for about nine months while trying diet and alternative therapies, a decision he later told his biographer Walter Isaacson that he regretted, and had a modified Whipple procedure at Stanford in July 2004. The disease returned, he received a liver transplant in Memphis in April 2009, and he took an indefinite medical leave on January 17, 2011. He resigned as chief executive on August 24, 2011, naming Tim Cook his successor, and stayed on as chairman. He died at his Palo Alto home on October 5, 2011, aged 56. His sister Mona Simpson, in a eulogy published by The New York Times, reported his final words as \"OH WOW. OH WOW. OH WOW.\" Isaacson's authorized biography, based on more than forty interviews with Jobs and published weeks after his death, became the best-selling book in the United States that year.",
    "notableQuotes": [
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.",
      "Your time is limited, so don't waste it living someone else's life.",
      "It's not just what it looks like and feels like. Design is how it works.",
      "A lot of times, people don't know what they want until you show it to them.",
      "Focusing is about saying no.",
      "Being the richest man in the cemetery doesn't matter to me ... Going to bed at night saying we've done something wonderful ... that's what matters to me."
    ],
    "primarySources": [
      "Walter Isaacson, Steve Jobs (Simon and Schuster, 2011), the authorized biography drawn from more than forty interviews with Jobs and hundreds with family, colleagues and rivals",
      "Steve Jobs, commencement address at Stanford University, June 12, 2005, official Stanford transcript and video (https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says)",
      "Playboy interview with Steve Jobs, February 1985, the fullest long-form interview from the Macintosh era",
      "Rob Walker, \"The Guts of a New Machine,\" The New York Times Magazine, November 30, 2003, the source of the design quote",
      "Apple keynote and conference video, including the WWDC 1997 closing session and the Macworld iPhone introduction of January 9, 2007",
      "Steve Jobs on Wikipedia and the sourced-quotations section of Wikiquote (https://en.wikiquote.org/wiki/Steve_Jobs)"
    ]
  },
  "tobi-lutke": {
    "slug": "tobi-lutke",
    "occupation": "Cofounder and CEO of Shopify; software engineer, open-source contributor, and self-described toolmaker",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Tobias_L%C3%BCtke",
    "fullName": "Tobias Lütke",
    "birthDate": "July 16, 1980",
    "birthPlace": "Koblenz, West Germany (now Germany)",
    "nationality": "German-Canadian (holds both Canadian and German citizenship)",
    "education": [
      "Carl-Benz-School, Koblenz, vocational schooling within the German dual-education system",
      "Apprenticeship as a Fachinformatiker (computer programmer) at BOG Koblenz, a Siemens subsidiary; left secondary school at 16 and holds no university degree"
    ],
    "occupations": [
      "Cofounder and CEO of Shopify",
      "Software developer",
      "Open-source contributor (Ruby on Rails core team, Active Merchant)",
      "Amateur endurance racing driver"
    ],
    "yearsActive": "2004–present",
    "notableWorks": [
      "Snowdevil (2004), the online snowboard shop whose custom store software became Shopify",
      "Shopify (relaunched 2006), the commerce platform he has led as CEO since 2008",
      "Active Merchant (2008), an open-source Ruby payment-gateway library still used across the industry",
      "Ruby on Rails core team, contributor to the open-source web framework",
      "Shopify's 2015 IPO on the NYSE and TSX under the ticker SHOP",
      "\"The Apprentice Programmer\" (2013), his widely cited essay on learning by doing"
    ],
    "spouses": [
      "Fiona McKean (married early 2000s), a former Canadian diplomat"
    ],
    "children": "3",
    "awards": [
      "Meritorious Service Cross (2018), for contribution to the growth of the Canadian technology industry",
      "CEO of the Year, The Globe and Mail (2014)"
    ],
    "netWorth": "≈US$12.3 billion (as of August 2025); Forbes 2026 world billionaires list, No. 302. Almost all of it is his roughly 7 percent stake in Shopify, which carries about 40 percent of the voting power.",
    "earlyLife": "Tobias Lütke was born on July 16, 1980, in Koblenz, in what was then West Germany. By his own account he struggled in a conventional classroom, was diagnosed with learning difficulties, and was medicated for them, an experience he later reframed as being a hands-on, kinesthetic learner rather than a broken student. He gravitated to computers young, teaching himself to program by tinkering, and by his teens was far more engaged by code than by school.\n\nAt sixteen he left secondary school and entered Germany's dual-education system, apprenticing as a Fachinformatiker, a computer programmer, at BOG Koblenz, a subsidiary of Siemens, with classroom training at the Carl-Benz-School in Koblenz. There a senior engineer he calls Jürgen became his master teacher, running a small skunkworks out of a basement room and covering his printouts in red marker until Lütke learned, in his words, not to tangle his ego up in the code he writes. He has said the apprenticeship let him move through ten years of career development every year, and that degrees no longer matter but experience does. During a holiday in Canada he met Fiona McKean, whose parents were diplomats, and in the early 2000s he moved to her hometown of Ottawa, Ontario.",
    "career": "In 2004 Lütke set out to sell snowboards online, launching a shop called Snowdevil with Daniel Weinand and Scott Lake. Finding the available e-commerce software inadequate, he wrote his own storefront on a very early version of Ruby on Rails. The software quickly proved more valuable than the snowboards, and in 2006 the team relaunched the underlying platform as Shopify. In these years Lütke joined the Ruby on Rails core team and released Active Merchant, an open-source payments library still in wide use. He built much of the early company from an Ikea desk in his wife's childhood bedroom while his father-in-law helped cover payroll. Scott Lake served as the first chief executive, and Lütke took over as CEO in 2008.\n\nShopify grew into the leading commerce platform for independent merchants, positioning itself as the arms dealer to businesses competing against Amazon. On May 21, 2015, the company went public, pricing its IPO at 17 dollars a share, raising about 131 million dollars, and listing on both the New York Stock Exchange and the Toronto Stock Exchange under the ticker SHOP. The stock jumped 51 percent on its first day, valuing Shopify above 1.2 billion dollars and making Lütke a billionaire on paper.\n\nLütke has said that after the IPO he spent years cosplaying a conventional public-company CEO before the COVID-19 pandemic forced a reset. He threw out the company's plans, personally reviewed its projects, cancelled a large share of them, and rebuilt his executive team, later modeling the whole organization from first principles in a version-controlled system he treats like software. He told staff in a 2020 memo that Shopify is a team, not a family, and in an April 2025 memo he made reflexive AI usage a baseline expectation for every employee. By fiscal 2025 Shopify processed 378.4 billion dollars in merchant sales and reported about 11.6 billion dollars in revenue, each up roughly 30 percent year over year. Lütke has served on the board of Coinbase since 2022 and races sports cars as an amateur in his spare time.",
    "legacy": "Tobi Lütke is the engineer who turned a failing online snowboard shop into the software that millions of merchants in more than 175 countries sell through, and one of the defining figures of Canadian technology. By arming small and independent businesses with tools once reserved for the largest retailers, Shopify became a genuine counterweight to Amazon and one of Canada's most valuable public companies, and Lütke built it while keeping the mindset of a toolmaker rather than a conventional executive. He is widely read for his first-principles approach to company building, his insistence on differentiation over imitation, and his early, aggressive embrace of AI as a baseline skill.\n\nHe holds Canadian and German citizenship, having regained the latter in 2022. Canada awarded him the Meritorious Service Cross in 2018 for his contribution to the growth of the Canadian technology industry, and he had earlier been named CEO of the Year by The Globe and Mail in 2014. As of August 2025 his net worth was estimated near 12.3 billion dollars, almost all of it tied to his roughly 7 percent stake in Shopify, through which he retains about 40 percent of the company's voting power.",
    "notableQuotes": [
      "You earn your job not by knowing what to do. You earn your job by making great decisions when you don't know what to do.",
      "Experiencing and learning things quickly is the ultimate life skill.",
      "This taught me not to tangle my ego up in the code I write.",
      "We like the constraint of being human, and seeing what's possible from within those boundaries.",
      "Reflexive AI usage is now a baseline expectation at Shopify.",
      "Shopify is a team, not a family."
    ],
    "primarySources": [
      "Tobias Lütke, Wikipedia (https://en.wikipedia.org/wiki/Tobias_L%C3%BCtke)",
      "Tobi Lütke's personal blog, tobi.lutke.com (\"Too-biased\"), including \"The Apprentice Programmer\" (March 3, 2013), \"Good at making decisions\" (October 30, 2013), and \"The Future Role of Human Excellence\" (July 17, 2018)",
      "Shopify Inc. Form 10-K and Q4/full-year 2025 financial results (SEC filings and shopify.com/news)",
      "Shopify's 2015 IPO prospectus, pricing announcement, and founder letter to shareholders",
      "\"Reflexive AI usage is now a baseline expectation at Shopify,\" internal memo Lütke published on X, April 7, 2025",
      "The Knowledge Project with Shane Parrish, Ep. 41 \"The Trust Battery\" (2019)"
    ]
  },
  "daniel-ek": {
    "slug": "daniel-ek",
    "occupation": "Swedish entrepreneur and technologist; co-founder of Spotify, its chief executive from 2006 to 2025 and its executive chairman since 2026",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Daniel_Ek",
    "fullName": "Daniel Georg Ek",
    "birthDate": "21 February 1983",
    "birthPlace": "Stockholm, Sweden",
    "nationality": "Swedish",
    "education": [
      "IT-Gymnasiet, Sundbyberg Municipality, Stockholm; graduated 2002",
      "KTH Royal Institute of Technology, Stockholm; enrolled to study engineering in 2002 and left after about eight weeks, with no degree",
      "Largely self taught as a programmer, writing websites and open source software from roughly the age of fourteen"
    ],
    "occupations": [
      "Entrepreneur and company founder",
      "Technologist and self taught software engineer",
      "Business executive; founder of Spotify, chief executive 2006 to 2025, executive chairman from 1 January 2026",
      "Investor through Prima Materia, the vehicle he co-founded with Shakil Khan",
      "Chairman of Neko Health and of the European defence technology company Helsing"
    ],
    "yearsActive": "2006–present",
    "notableWorks": [
      "Advertigo (sold to TradeDoubler in March 2006), the online advertising company whose sale made him wealthy in his early twenties and introduced him to Martin Lorentzon",
      "Spotify (incorporated with Lorentzon in Stockholm in 2006; service launched 7 October 2008), the streaming platform built on the premise that the only way to beat piracy was to make something better than piracy",
      "Spotify's direct listing on the New York Stock Exchange (3 April 2018), executed with no underwriters, no new shares and no offering price",
      "\"Our Path: A Note from Daniel Ek\" (Spotify Form F-1, filed with the SEC on 28 February 2018), the founder letter that is the fullest statement of what he believes the company is for",
      "Neko Health (co-founded 2018 with Hjalmar Nilsonne), the preventive body scanning company he chairs, which raised a $700 million Series C in July 2026",
      "Prima Materia (co-founded February 2021 with Shakil Khan), the investment company behind his stake in and chairmanship of the defence technology firm Helsing"
    ],
    "spouses": [
      "Sofia Levander (m. 2016, at Lake Como, Italy)"
    ],
    "children": "2 daughters",
    "awards": [
      "TIME 100 most influential people in the world, 2012 (profiled by Ashton Kutcher) and 2017 (profiled by Ed Sheeran)",
      "MIT Technology Review Innovators Under 35, 2012",
      "Forbes 30 Under 30 in 2011, 2012 and 2013, across the technology, consumer technology and music categories; inducted into the Forbes 30 Under 30 Hall of Fame in 2022",
      "Billboard Power 100 number one, 2017, named the most powerful person in the music business, after ranking number 10 in 2016 and number 3 in 2018"
    ],
    "netWorth": "Estimates vary widely and should be treated as approximate rather than as fact. Forbes valued him at about $8.7 billion in December 2025 and ranked him number 346 on its 2026 World's Billionaires list, with real time trackers publishing figures in the $8 billion to $9.4 billion range during July 2026. Consumer net worth aggregators run far below that, in some cases under $3 billion, because they disagree about how his Spotify shares are held. Almost all of the wealth is Spotify stock held through Luxembourg holding entities, plus illiquid private stakes in Neko Health and Helsing, so any figure moves with the share price and with private marks.",
    "earlyLife": "Daniel Georg Ek was born on 21 February 1983 in Stockholm and grew up in Rågsved, a working class housing estate on the southern edge of the city. His biological father was not part of his childhood; he was raised by his mother, alongside a stepfather and a younger brother, in a household he has described as ordinary Swedish and short of money. Music was the constant. In the founder letter he wrote for Spotify's 2018 prospectus he put it plainly: from the age of four his life was about music and technology, never one without the other. He learned guitar as a small child and was good enough as a singer and player that his school music teacher remembered him.\n\nThe technology half turned into income early. From about fourteen he was building websites, first for schoolmates and then for businesses, and running a small web hosting operation out of his bedroom, making real money before he had any concept of what a company was. He graduated from IT-Gymnasiet in Sundbyberg in 2002, enrolled in engineering at the KTH Royal Institute of Technology, and left after roughly eight weeks. What followed was a compressed apprenticeship across the early Swedish internet: the search marketing firm Jajja, a senior role at the Nordic auction site Tradera, which eBay acquired in 2006, and the job of chief technology officer at the browser based fashion community Stardoll. He then founded Advertigo, an online advertising company that TradeDoubler acquired in March 2006, and briefly served as chief executive of the file sharing client µTorrent, working with its creator Ludvig Strigeus until BitTorrent bought it in December 2006. Strigeus later joined him as a Spotify engineer. The Advertigo sale and the work behind it left Ek rich enough in his early twenties to retire, and for a few months he did, before concluding that retirement at that age was empty and that what he actually wanted was a problem worth a decade.",
    "career": "Ek had been circling the same problem since about 2002, when Napster was shut down and Kazaa took its place. His conclusion was that piracy could not be legislated away, and that the only workable answer was a legal service that was simply better than stealing while still paying the industry. In 2006 he incorporated Spotify AB in Stockholm with Martin Lorentzon, the TradeDoubler co-founder he had met through the Advertigo sale, and spent two years negotiating licences with rights holders who had every reason to distrust him. The service launched on 7 October 2008, invitation only, in Sweden, Finland, Norway, France, the United Kingdom and Spain, and reached the United States in July 2011. Early versions used a peer to peer architecture borrowed from the file sharing world, which Spotify replaced with a server client model in 2014. Ek spent years defending the free, ad supported tier against label executives who wanted everything behind a paywall, arguing that free was how you reached scale and scale was how you produced subscribers. In October 2016 Lorentzon stepped down as chairman of the board and Ek took that role alongside the chief executive job.\n\nSpotify Technology S.A., incorporated in Luxembourg, filed its Form F-1 with the United States Securities and Exchange Commission on 28 February 2018, a 256 page document that carried an unusually personal founder letter at its centre, and listed on the New York Stock Exchange under the ticker SPOT on 3 April 2018. It was a direct listing rather than an underwritten initial public offering: no bank underwrote the deal, the company issued no new shares and raised no money, and there was no offering price, only a reference price of $132 set by the exchange. The stock opened at $165.90, touched $169 and closed its first day at $149.01. Ek and Lorentzon retained control through beneficiary certificates that carry votes but no economic rights. In the years after, Ek pushed the company beyond music into podcasts, buying Gimlet Media and Anchor in 2019 and signing Joe Rogan to an exclusive deal in 2020, and later into audiobooks. The expansion was expensive, and in December 2023 he cut roughly 1,500 jobs, about 17 percent of the company, in the third round of layoffs that year, later conceding that the cuts disrupted day to day operations more than he had anticipated. The discipline showed up in the accounts: 2024 was, in his own words, the first full year of profitability in the company's history. As of the first quarter of 2026, reported on 28 April 2026, Spotify had 761 million monthly active users and 293 million Premium subscribers.\n\nOn 30 September 2025 Ek announced that he would give up the chief executive job. From 1 January 2026 he became executive chairman, with co-presidents Gustav Söderström and Alex Norström promoted to co-chief executives, both still reporting to him. He described the arrangement as a European chairman setup rather than an American one, more hands on than the title usually implies, with his own time going to long term strategy, capital allocation, regulatory work and the decisions that shape the next decade. Outside Spotify he co-founded the preventive health company Neko Health with the engineer Hjalmar Nilsonne in 2018, seeding it himself with about 30 million euros and chairing it without running it; in July 2026 Neko raised a $700 million Series C at a valuation approaching $7 billion. In February 2021 he set up the investment company Prima Materia with Shakil Khan, pledging $1 billion to European moonshots, and through it became an early backer and then chairman of the German defence technology company Helsing, leading a 600 million euro round in it in June 2025. A lifelong Arsenal supporter, he made an offer of roughly 1.8 billion pounds for the club in May 2021, which its owners rejected.",
    "legacy": "Ek's central achievement is that he beat piracy by out-building it rather than by suing it. Global recorded music revenue had been shrinking for most of a decade when Spotify launched, and streaming, which Spotify did more than any other company to normalise, became the industry's main revenue engine and returned it to growth. Spotify's Loud & Clear 2026 report put payouts to the music industry at about $11 billion for 2025 and roughly $70 billion in total, with independent artists and labels generating about half of all royalties on the platform. His 2018 direct listing was equally consequential in a narrower world: by proving a large company could go public with no underwriters, no new shares and no offering price, it created the template later used by Slack, Palantir, Coinbase and others. He is also the most visible argument that a global technology company can be built outside Silicon Valley, and he has spent his post-CEO capital deliberately on European bets in health and defence.\n\nHe remains one of the most contested figures in music. Artists and producers have attacked Spotify's per stream economics for over a decade, and Ek personally after a 2020 interview in which he said artists could no longer record once every three or four years and expect that to be enough, and again after a 2024 post in which he described the cost of creating content as close to zero, a phrasing he later admitted was clumsy and reductive. Liz Pelly's book Mood Machine (2025) became the standard critical account of what playlist driven streaming did to musicians. Prima Materia's investment in Helsing opened a second front: bands including Deerhoof, Xiu Xiu, King Gizzard and the Lizard Wizard, Godspeed You! Black Emperor, Sylvan Esso and Massive Attack pulled catalogue from Spotify in protest at their streams helping fund military AI. Spotify's answer to the transparency complaint has been the annual Loud & Clear royalty reports, first published in 2021, which put the payout data in public. The tension is unresolved, and it is the shape of his legacy: he made music universally available and durably profitable as an industry, while the question of who inside that industry gets paid remains an argument he has not won.",
    "notableQuotes": [
      "Music was too important to me to let piracy take down the industry.",
      "We start with human creativity, augment it with our expertise and understanding, and then leverage with the efficiency of algorithms.",
      "We really do believe that we can improve the world, one song at a time.",
      "I have always thought about roles as missions. At Spotify, I have had about nine missions while keeping the same title.",
      "I think happiness is a trailing indicator of impact.",
      "Advice is useless unless it's tied to who you are as a person."
    ],
    "primarySources": [
      "Spotify Technology S.A., Form F-1 registration statement filed with the U.S. Securities and Exchange Commission on 28 February 2018, including the founder letter on pages 92 to 93 headed \"Our Path: A Note from Daniel Ek, Co-Founder, Chief Executive Officer, and Chairman\" (https://www.sec.gov/Archives/edgar/data/1639920/000119312518063434/d494294df1.htm)",
      "Daniel Ek, \"Evolving How We Lead\", note to all Spotify employees, Spotify Newsroom, 30 September 2025 (https://newsroom.spotify.com/2025-09-30/daniel-ek-letter-evolving-how-we-lead/), published alongside the company press release announcing his move to executive chairman",
      "Spotify Technology S.A., \"Spotify Reports First Quarter 2026 Earnings\", 28 April 2026 (https://newsroom.spotify.com/2026-04-28/spotify-q1-2026-earnings/), the source for all user and subscriber figures cited here",
      "Spotify, Loud & Clear 2026 royalty transparency report (https://loudandclear.byspotify.com/), the source for 2025 and lifetime payout figures",
      "Daniel Ek in conversation with David Senra, published 28 September 2025, the long form interview that is the source for his remarks on impact, self-knowledge and advice",
      "Daniel Ek, Wikipedia (https://en.wikipedia.org/wiki/Daniel_Ek), used for dates, education, early employers and personal life"
    ]
  },
  "evan-spiegel": {
    "slug": "evan-spiegel",
    "occupation": "Co-founder and chief executive officer of Snap Inc., the company behind Snapchat and Specs",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Evan_Spiegel",
    "fullName": "Evan Thomas Spiegel",
    "birthDate": "June 4, 1990",
    "birthPlace": "Los Angeles, California, U.S.",
    "nationality": "American and French (naturalized as a French citizen in 2018)",
    "education": [
      "Crossroads School for Arts and Sciences, Santa Monica",
      "Otis College of Art and Design (design classes taken while in high school)",
      "Art Center College of Design, Pasadena (summer course before university)",
      "Stanford University (product design; left in 2012 to run Snapchat and completed the degree in 2018)"
    ],
    "occupations": [
      "Entrepreneur",
      "Technology executive",
      "Product designer",
      "Philanthropist"
    ],
    "yearsActive": "2011–present",
    "notableWorks": [
      "Picaboo (2011), the disappearing photo app built with Bobby Murphy and Reggie Brown, relaunched as Snapchat in September 2011",
      "Snapchat Stories (2013), the 24 hour chronological format later copied across the industry",
      "Snapchat Lenses and the Lens Studio creator platform (2015 onward), Snap's augmented reality layer",
      "Spectacles (2016), Snap's first camera glasses, sold at $129.99 from Snapbot vending machines",
      "Snap Inc.'s initial public offering (2017), a $3.4 billion listing on the New York Stock Exchange",
      "Specs (2026), Snap's standalone consumer augmented reality glasses, priced at $2,195"
    ],
    "spouses": [
      "Miranda Kerr (m. May 27, 2017)"
    ],
    "children": "Three sons with Miranda Kerr: Hart (born 2018), Myles (born 2019), and Pierre (born 2024). He is also stepfather to Kerr's son Flynn.",
    "awards": [
      "TIME 100 Most Influential People (2014 and 2017)",
      "Named the world's youngest billionaire by Forbes (2015)",
      "Honorary Doctorate of Fine Arts, Otis College of Art and Design (2022)"
    ],
    "netWorth": "About $2.1 billion (Forbes real time billionaires list, July 23, 2026), down from a peak of $13.8 billion on the 2021 Forbes 400",
    "earlyLife": "Evan Thomas Spiegel was born on June 4, 1990 in Los Angeles, California, the son of two attorneys, John W. Spiegel and Melissa Ann Thomas. He grew up on the affluent west side of the city and attended Crossroads School for Arts and Sciences in Santa Monica, a progressive private school whose name doubles as a fair description of the territory he has worked in ever since. Design, not code, was his first serious training. While still in high school he took classes at Otis College of Art and Design, and he spent a summer before university studying at Art Center College of Design in Pasadena. His parents divorced during his teenage years, and the household split became one of the more publicly documented parts of his adolescence.\n\nHe enrolled at Stanford University to study product design and joined the Kappa Sigma fraternity, where he met the two classmates who would define the rest of his life: Bobby Murphy, a mathematical and computational science student who could build, and Reggie Brown. In April 2011 Spiegel pitched an app for photographs that delete themselves as a product design class project. The room was unimpressed. He left Stanford in 2012 without finishing, then quietly completed the remaining requirements and took his degree in 2018, at which point he was already running a public company.",
    "career": "The first version shipped on July 8, 2011 as Picaboo, built for iPhone out of Spiegel's father's Los Angeles living room. Brown had brought the idea of a photo that vanishes, Spiegel shaped the product and the business, and Murphy wrote the code. The app was relaunched under the name Snapchat in September 2011 and found its first real audience among high school students. Brown was pushed out within months. He sued Spiegel and Murphy in 2013, claiming he had originated the concept and was owed as much as a third of the company, and in September 2014 the parties settled: Snap paid him $157.5 million, in installments later disclosed in the company's IPO filing, and formally credited him as a co-founder. Stories, the format that turned Snapchat from a messaging toy into a media product, arrived in October 2013. That November, Facebook offered roughly $3 billion in cash for the company. Spiegel, then 23, said no.\n\nOn September 24, 2016 the company renamed itself Snap Inc., described itself as a camera company rather than a social network, and unveiled Spectacles, $129.99 sunglasses with a built in camera that were sold from bright yellow vending machines placed in unannounced locations. Snap went public on March 2, 2017, selling 200 million Class A shares at $17 apiece for a total of $3.4 billion at a valuation near $24 billion. The stock opened at $24 and closed its first day at $24.48, and Spiegel, at 26, became one of the youngest chief executives of a United States public company. It was also the first American IPO to sell the public shares carrying no votes at all, a structure that kept Spiegel and Murphy in permanent control and prompted S&P Dow Jones Indices to bar new multiple class companies from the S&P Composite 1500 later that year. The decade after was punishing. Instagram cloned Stories, a 2018 app redesign triggered a user revolt, and Apple's 2022 App Tracking Transparency changes gutted the targeting that Snap's advertising business depended on, taking roughly 80 percent off the stock in a single year.\n\nThrough all of it Spiegel kept spending on glasses. Spectacles went through camera only, dual camera, and developer only augmented reality versions across the 2010s and early 2020s. On June 10, 2025, at Augmented World Expo, Snap committed publicly to shipping consumer Specs the following year. In an annual letter published on September 8, 2025 marking fourteen years at the company, Spiegel called the period ahead a crucible moment and restructured Snap into small single leader squads running on ninety day cycles. On June 16, 2026 he took the stage at Augmented World Expo in Long Beach, California to unveil Specs, standalone augmented reality glasses with no tether, priced at $2,195 and slated to ship in the United States, the United Kingdom and France. For the quarter ended March 31, 2026, Snap reported 483 million daily active users and 956 million monthly active users on quarterly revenue of $1.53 billion.",
    "legacy": "Spiegel's lasting contribution is a set of design choices that the rest of the industry first mocked and then adopted. Ephemerality as a default rather than a feature, the phone camera as the home screen instead of a feed, video shot vertically because that is how a hand holds a phone, and the Stories format, which was copied into Instagram, WhatsApp, Facebook, YouTube and LinkedIn within a few years of its debut. His refusal of Facebook's roughly $3 billion cash offer at 23 became the canonical reference case for founder control, and the non voting share structure he took public in 2017 turned Snap into the test case that pushed the major index providers to write rules about who gets to vote in a public company.\n\nThe record is genuinely mixed, and he is unusual among celebrated founders in that the scoreboard has often run against him. Snap has never approached Meta's scale, the stock has spent long stretches below its $17 offering price, and his own paper fortune fell from $13.8 billion in 2021 to about $2.1 billion by July 2026. What the control bought him was time: more than a decade of Snapchat cash flow poured into head worn computing that no outside board would have funded that long, ending in the 2026 consumer launch of Specs. Alongside it he has given at scale and locally. He pledged upwards of 13 million Class A shares to the Snap Foundation over 15 to 20 years at the time of the IPO, and in 2022 he and Miranda Kerr made the largest single gift in the history of Otis College of Art and Design, more than $10 million through the Spiegel Family Fund, erasing the student loan debt of all 285 graduating seniors at a school where he had once taken summer classes.",
    "notableQuotes": [
      "The things that make us human are those times we listen to the whispers of our soul and allow ourselves to be pulled in another direction.",
      "I am now convinced that the fastest way to figure out if you are doing something truly important to you is to have someone offer you a bunch of money to part with it.",
      "Someone will always have an opinion about you. Whatever you do won't ever be enough. So find something important to you. Find something that you love.",
      "Squeezed between the tech giants and smaller competitors, on the verge of greatness, we find ourselves in a crucible moment.",
      "The crucible is where strength is forged.",
      "We believe the time is right for a revolution in computing that naturally integrates our digital experiences with the physical world, and we can't wait to publicly launch our new Specs next year."
    ],
    "primarySources": [
      "Evan Spiegel, USC Marshall School of Business undergraduate commencement address, Los Angeles, May 15, 2015 (full text archived publicly; excerpts carried verbatim by TIME and Fox News in May 2015)",
      "Evan Spiegel, '14 Years at Snap Inc.', annual letter, Snap Newsroom, September 8, 2025 (https://newsroom.snap.com/14-year-letter)",
      "Snap Inc., Form S-1 registration statement (February 2017) and quarterly investor letters and results releases, including Q1 2026 (https://investor.snap.com)",
      "Snap Inc., 'Snap to Launch New Lightweight, Immersive Specs in 2026', press release, June 10, 2025 (https://investor.snap.com)",
      "Evan Spiegel, Wikipedia (https://en.wikipedia.org/wiki/Evan_Spiegel) and Snapchat, Wikipedia (https://en.wikipedia.org/wiki/Snapchat)",
      "Billy Gallagher, How to Turn Down a Billion Dollars: The Snapchat Story (2018), a journalist's account used for background context only"
    ]
  },
  "jimmy-iovine": {
    "slug": "jimmy-iovine",
    "occupation": "Recording engineer and record producer turned executive: co-founder of Interscope Records and, with Dr. Dre, of Beats, which Apple bought in 2014 for $3 billion",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Jimmy_Iovine",
    "fullName": "James Iovine",
    "birthDate": "March 11, 1953",
    "birthPlace": "Brooklyn, New York City, U.S.",
    "nationality": "American",
    "education": [
      "Bishop Ford Central Catholic High School, Brooklyn, New York",
      "John Jay College of Criminal Justice, City University of New York (enrolled, left at nineteen without a degree)",
      "Honorary Doctor of Music, University of Southern California, conferred May 17, 2013, the day he gave the commencement address"
    ],
    "occupations": [
      "Recording engineer and record producer",
      "Record executive, co-founder of Interscope Records and chairman and chief executive of Interscope Geffen A&M from 1999 to 2014",
      "Entrepreneur, co-founder of Beats Electronics and Beats Music, later an Apple executive and consultant",
      "Film and television producer, including 8 Mile (2002) and the HBO documentary series The Defiant Ones (2017)",
      "Philanthropist and education founder, USC Jimmy Iovine and Andre Young Academy"
    ],
    "yearsActive": "1972–present",
    "notableWorks": [
      "John Lennon, Walls and Bridges (1974), and Bruce Springsteen, Born to Run (1975), both engineered at New York's Record Plant while Iovine was in his early twenties",
      "Patti Smith, Easter (1978), produced by Iovine and carrying Because the Night, the unfinished Springsteen song he carried across the hall to her",
      "Tom Petty and the Heartbreakers, Damn the Torpedoes (1979), Dire Straits, Making Movies (1980), and Stevie Nicks, Bella Donna (1981), the run that made his name as a producer",
      "A Very Special Christmas (1987), the charity album series he created for Special Olympics, and U2, Rattle and Hum (1988)",
      "Interscope Records, co-founded in 1990, the label behind Dr. Dre, Snoop Dogg, Tupac Shakur, Eminem, No Doubt and Lady Gaga",
      "Beats by Dr. Dre headphones (2008) and Beats Music (2014), sold together to Apple in 2014 for $3 billion"
    ],
    "spouses": [
      "Vicki Iovine (m. 1985; div. 2009)",
      "Liberty Ross (m. February 14, 2016)"
    ],
    "children": "4, all with Vicki Iovine",
    "awards": [
      "Honored by the Recording Academy's Producers and Engineers Wing at its fifth annual Grammy Week celebration, held at The Village in Los Angeles on February 8, 2012",
      "Honorary Doctor of Music, University of Southern California, May 17, 2013",
      "Rock and Roll Hall of Fame, Ahmet Ertegun Award, class of 2022, presented at the November 5, 2022 ceremony at the Microsoft Theater in Los Angeles, where Bruce Springsteen delivered the induction",
      "No competitive Grammy Award. His only nomination came at the 65th Grammy Awards in 2023, for best boxed or special limited edition package, for Artists Inspired by Music: Interscope Reimagined"
    ],
    "netWorth": "Forbes valued him at $800 million in August 2015, placing him 13th on its inaugural list of Hollywood's Richest Power Brokers, and that remains the last figure the magazine published for him. His Forbes profile page carried no current valuation as of July 2026, and he has never appeared on the Forbes World's Billionaires list. Estimates of $600 million to $1.1 billion circulate widely but trace only to net worth aggregator sites and are not sourced.",
    "earlyLife": "James Iovine was born in Brooklyn on March 11, 1953 and grew up in Red Hook, then a working waterfront neighborhood. His father, Vincent Iovine, was a longshoreman who carried cargo in the holds of ships; his mother worked as a secretary; he had one older sister, born in 1946. He was sent to Bishop Ford Central Catholic High School and was, by his own repeated account, a poor student with no standing in a neighborhood that measured boys by size and toughness. What changed him was the Beatles on The Ed Sullivan Show in February 1964, when he was ten, and the discovery that records were a world he might be able to enter without being an athlete or a fighter. He enrolled at John Jay College of Criminal Justice in Manhattan and left at nineteen.\n\nIn 1972 he took a job at the bottom of a recording studio, sweeping floors and running tape, and in 1973 landed at the Record Plant in New York under chief engineer Roy Cicala. The apprenticeship was extraordinarily compressed. At twenty he was in sessions with John Lennon, working on Mind Games and then engineering Walls and Bridges in 1974. In 1975 he engineered Bruce Springsteen's Born to Run, and he stayed on through Darkness on the Edge of Town in 1978. That same year he produced Patti Smith's Easter, whose hit single Because the Night came from a Springsteen outtake Iovine talked him into giving away. He has always described that stretch, Lennon through Springsteen through Smith, as the education he never got in a classroom.",
    "career": "Through the late 1970s and 1980s Iovine became one of the most reliable producers in American rock. He made Damn the Torpedoes with Tom Petty and the Heartbreakers in 1979, Making Movies with Dire Straits in 1980, and Bella Donna with Stevie Nicks in 1981, the album that produced Stop Draggin' My Heart Around. He went on to work with U2 on Rattle and Hum in 1988. After his father died in 1985 he set out to make a record in his memory, and with his wife Vicki and Bobby Shriver turned the idea into A Very Special Christmas, released on A&M in 1987. The series has since raised more than $100 million for Special Olympics, with later tallies reported at $131 million and above, and it supported programs in more than a hundred communities.\n\nIn 1990, at thirty seven, Iovine co-founded Interscope Records with the film producer Ted Field as a joint venture with Warner Music's Atlantic Group. It was profitable within three years. In 1992 Interscope took on distribution for Dr. Dre and Suge Knight's Death Row Records, a decision that produced enormous hits and a political firestorm; Time Warner sold its stake in 1995 under pressure over lyrics, and Interscope moved to MCA, later Universal. Iovine became chairman and chief executive of Interscope Geffen A&M in 1999 and stayed for fifteen years, signing or shepherding Tupac Shakur, Snoop Dogg, Eminem, No Doubt, 50 Cent and Lady Gaga, and co-producing the Eminem film 8 Mile in 2002. He also spent three seasons, from 2011 to 2013, as the in house mentor on American Idol.\n\nHis second act began with hardware. Convinced that file sharing had gutted the value of recorded music and that cheap earbuds were destroying the sound of it, Iovine and Dr. Dre formally established Beats in 2008 and shipped their first headphones that year, initially manufactured with Monster. Beats treated headphones as fashion rather than equipment, seeded them through athletes and musicians, and at its peak took a reported sixty percent of the market for headphones priced above $99. HTC bought a controlling stake in 2011 and later sold most of it back; Carlyle invested in 2013; the acquisition of the streaming service MOG became Beats Music, which launched in January 2014. On May 28, 2014 Apple announced it was buying Beats Music and Beats Electronics for $3 billion, roughly $2.6 billion in cash plus about $400 million vesting over time, the largest acquisition in Apple's history to that point. Iovine left Interscope the same day, joined Apple with Dr. Dre, helped launch Apple Music in June 2015, moved to a consulting role and departed in August 2018 at sixty five.",
    "legacy": "Iovine is the rare figure who crossed from the studio floor to the executive suite to consumer hardware without losing the instincts of the first job. His method was consistent across forty years: attach himself to the most talented person in the room, tell that person the truth in one sentence, and build the business around what the artist actually needed rather than what the industry was set up to sell. Interscope's willingness to release hip hop that radio and MTV would not touch made it the most commercially potent label of its generation and also made it a target of congressional hearings and boycott campaigns, a fight Iovine never disavowed. Beats applied the same reading of culture to a product category that had been sold on specifications, and its sale to Apple stands as one of the largest returns any musician or producer has taken out of the business. He has been candid that the achievements did not settle him, that he spent decades seeing only what was wrong with the work, and he has never won a competitive Grammy.\n\nHis most durable project may be a school. In May 2013 Iovine and Dr. Dre gave the University of Southern California $70 million to found the Jimmy Iovine and Andre Young Academy for Arts, Technology and the Business of Innovation, built to produce the multidisciplinary graduates they could not find while building Beats. The first class of about thirty students enrolled in the autumn of 2014, Iovine and Young Hall opened on October 2, 2019, and the pair extended the idea downward in August 2022 with the Iovine and Young Center, a magnet high school in Los Angeles. Their partnership was documented at length in Allen Hughes's four part HBO series The Defiant Ones in 2017. In 2022 Iovine received the Rock and Roll Hall of Fame's Ahmet Ertegun Award, given to non performers who shaped the music, and was inducted by Bruce Springsteen, the artist whose record he had helped engineer forty seven years earlier.",
    "notableQuotes": [
      "Everything you know could already be wrong.",
      "I was once fired from two jobs within 90 days. I felt as if the sidewalk was collapsing behind me, but that insecure feeling always kept me moving forward.",
      "Rather than stop me in my tracks like a headwind, I began to learn how to make those same insecurities the tailwinds to propel me forward.",
      "I never met a great artist who wasn't afraid of not living up to people's expectations.",
      "When you learn to harness the power of your fears, it can take you places beyond your wildest dreams.",
      "I've always known in my heart that Beats belonged with Apple."
    ],
    "primarySources": [
      "Jimmy Iovine, commencement address at the University of Southern California, May 17, 2013, where he also received an honorary Doctor of Music. Full transcripts published by The Hollywood Reporter (https://www.hollywoodreporter.com/music/music-news/read-jimmy-iovines-usc-commencement-525328/) and Billboard, plus the independent transcript archive at https://whatrocks.github.io/commencement-db/2013-jimmy-iovine-university-of-southern-california/",
      "Apple newsroom release, Apple to Acquire Beats Music and Beats Electronics, May 28, 2014 (https://www.apple.com/newsroom/2014/05/28Apple-to-Acquire-Beats-Music-Beats-Electronics/), the authoritative source for the $3 billion price and its breakdown",
      "The Defiant Ones, four part HBO documentary series directed by Allen Hughes, first broadcast July 9 to 12, 2017, the fullest filmed account of the Iovine and Dr. Dre partnership",
      "Rock and Roll Hall of Fame inductee record for Jimmy Iovine, Ahmet Ertegun Award, class of 2022 (https://rockhall.com/inductees/jimmy-iovine/), and Rolling Stone's report on Bruce Springsteen's induction speech of November 5, 2022",
      "Zack O'Malley Greenburg, Jimmy Iovine's Net Worth in 2015: $800 Million, Forbes, August 19, 2015, and the accompanying Hollywood's Richest Power Brokers list",
      "Jimmy Iovine on Wikipedia (https://en.wikipedia.org/wiki/Jimmy_Iovine) and Interscope Records on Wikipedia, used for dates, discography and institutional detail"
    ]
  },
  "john-mackey": {
    "slug": "john-mackey",
    "occupation": "Entrepreneur and retailer, co-founder of Whole Foods Market and its chief executive for 44 years, author of Conscious Capitalism",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/John_Mackey_(businessman)",
    "fullName": "John Powell Mackey",
    "birthDate": "August 15, 1953",
    "birthPlace": "Houston, Texas, U.S.",
    "nationality": "American",
    "education": [
      "University of Texas at Austin (philosophy and religion, 1970s, no degree)",
      "Trinity University, San Antonio (philosophy and religion, 1970s, no degree)",
      "Roughly six years enrolled across both schools without completing a degree, and never a single business class",
      "Honorary bachelor's degree, Bentley College, 2008"
    ],
    "occupations": [
      "Entrepreneur and grocery retailer",
      "Co-founder of Whole Foods Market, 1980",
      "Chief executive officer of Whole Foods Market, 1980 to 2022",
      "Author and co-founder of the Conscious Capitalism movement",
      "Co-founder and chief executive officer of Love.Life"
    ],
    "yearsActive": "1978–present",
    "notableWorks": [
      "SaferWay (1978), the Austin natural foods store he co-founded with Renee Lawson that became Whole Foods Market",
      "Whole Foods Market (1980), grown from a single Austin storefront to more than 500 stores in the United States, Canada and the United Kingdom",
      "Conscious Capitalism: Liberating the Heroic Spirit of Business (2013), written with Raj Sisodia",
      "The Whole Foods Diet (2017) and The Whole Foods Cookbook (2018)",
      "Conscious Leadership: Elevating Humanity Through Business (2020)",
      "The Whole Story: Adventures in Love, Life, and Capitalism (2024), his memoir"
    ],
    "spouses": [
      "Deborah Morin (m. 1991)"
    ],
    "children": "None",
    "parents": [
      "William Sturges \"Bill\" Mackey Jr., accounting professor and later chief executive of the healthcare company LifeMark, who served on the Whole Foods Market board (d. 2004)",
      "Margaret Wescott Powell (d. 1987)"
    ],
    "awards": [
      "Ernst & Young Entrepreneur of the Year, United States overall winner, 2003",
      "Named one of the 30 best chief executives by Barron's, 2007",
      "Honorary bachelor's degree, Bentley College, 2008",
      "Named to Fortune's World's 50 Greatest Leaders",
      "World Retail Congress Hall of Fame, inducted 2022"
    ],
    "netWorth": "About $76 million as estimated by Forbes on June 16, 2017, the day the Amazon deal was announced, when he held close to one million Whole Foods shares. He had taken a $1 salary and no bonus or stock grants since 2007. Later public estimates vary widely and none are authoritative.",
    "earlyLife": "John Powell Mackey was born on August 15, 1953, in Houston, Texas, one of three children. His father, William Sturges Mackey Jr., known as Bill, was an accounting professor who became chief executive of the healthcare company LifeMark, and he would later sit on the Whole Foods Market board and serve as his son's closest business mentor. His mother, Margaret Wescott Powell, wanted a conventional profession for him and died in 1987 still unpersuaded that running a grocery store was a worthy use of his gifts.\n\nMackey spent the 1970s as a self-described hippie, moving between the University of Texas at Austin and Trinity University in San Antonio while studying philosophy, religion, history and world literature. He stayed enrolled for roughly six years without ever finishing a degree, and he never took a business class. In 1976 he moved into Prana House, a vegetarian housing co-op in Austin, where he became the house food buyer, discovered natural foods, and met Renee Lawson, a fellow resident who became his girlfriend and, two years later, his first business partner.",
    "career": "In 1978 Mackey and Lawson borrowed about $45,000 from family and friends and opened SaferWay, a small vegetarian natural foods store in an old house in Austin, its name a joke at the expense of Safeway. It was too small and too doctrinaire to make real money. In 1980 the pair merged it with Clarksville Natural Grocery, run by Craig Weller and Mark Skiles, and on September 20, 1980, the four of them opened the first Whole Foods Market in the 900 block of North Lamar Boulevard in Austin with a staff of 19. All four are recognized as co-founders. The store broke with health food orthodoxy by carrying meat, beer, coffee and a serious produce department, which is exactly what let it take customers from conventional supermarkets. On Memorial Day of 1981 a flood swept through the store, destroying the inventory and most of the equipment. The company carried no insurance and lost roughly $400,000. Customers and neighbors showed up unpaid to help the staff shovel out, creditors and suppliers granted time, and investors put in fresh money. Whole Foods reopened 28 days later, and Mackey afterward dated his stakeholder philosophy to that month.\n\nWhole Foods Market went public on the Nasdaq on January 23, 1992 under the ticker WFM, raising about $23.4 million, and Mackey used the public currency to buy regional natural foods chains rather than build every store from scratch. Wellspring Grocery in North Carolina came in 1991, Bread & Circus in New England in 1992 for about $26.2 million, Mrs. Gooch's in Los Angeles in 1993 for about $56 million, Fresh Fields in 1996, Allegro Coffee in 1997, and Wild Oats Markets in 2007 for about $565 million. Throughout, he refused to fight conventional supermarkets on price, competing instead on quality standards, perishables, service and the experience of the store itself, and he later described his venture capital backers in his memoir as \"hitchhikers with credit cards\" who would help pay for gas only while the car was headed where they wanted to go. In a letter to team members dated November 2, 2006, he cut his own salary to $1 a year and gave up bonuses and stock grants permanently, pledged his remaining stock options to charity, and seeded a Global Team Member Emergency Fund. He shared the chief executive title with Walter Robb as co-CEO from 2010 until the end of 2016, then returned to sole CEO.\n\nBy 2017, with growth slowing and the activist investor Jana Partners pressing for a sale, Mackey went looking for a buyer he could live with. On June 16, 2017, Amazon agreed to acquire Whole Foods Market for $42 per share in cash, a transaction valued at approximately $13.7 billion including net debt. Whole Foods had more than 460 stores in the United States, Canada and the United Kingdom at the time, and the deal closed on August 28, 2017. Mackey stayed on as chief executive under Amazon and retired on September 1, 2022, 44 years after opening SaferWay, handing the company to Jason Buechel. He is now co-founder and chief executive of Love.Life, a health and wellness company whose flagship medical and wellness center opened in El Segundo, California in 2024.",
    "legacy": "Mackey is the operator who moved natural and organic food from the fringe to the center of American grocery. He ran Whole Foods Market for 44 years, from one Austin storefront to more than 500 stores across three countries and annual sales above $20 billion, and in doing so forced conventional supermarkets to stock organic produce, to label ingredients honestly, and to treat perishables as a competitive weapon rather than a cost center. His second contribution is intellectual. In Conscious Capitalism (2013), written with Raj Sisodia, he set out four tenets, higher purpose, stakeholder integration, conscious leadership and conscious culture, and argued that a company creates the most value for its investors precisely when it stops treating them as the only party that counts. The book became a bestseller and the seed of a movement with its own nonprofit, followed by Conscious Leadership (2020) and the memoir The Whole Story (2024). He also created the Whole Planet Foundation, the Whole Kids Foundation, the Local Producer Loan Program and the Global Animal Partnership.\n\nHe was named Ernst & Young Entrepreneur of the Year for the United States in 2003, was given an honorary bachelor's degree by Bentley College in 2008 after leaving university without one, and was inducted into the World Retail Congress Hall of Fame in 2022. He is a self-described libertarian who serves on the boards of Conscious Capitalism, the Cato Institute and Students for Liberty, and his outspoken public commentary has at times drawn controversy separate from his record as an operator.",
    "notableQuotes": [
      "We believe that business is good because it creates value, it is ethical because it is based on voluntary exchange, it is noble because it can elevate our existence, and it is heroic because it lifts people out of poverty and creates prosperity.",
      "When businesses operate with higher purpose beyond profits and create value for all stakeholders, tradeoffs are largely eliminated, performance is elevated and the entire system flourishes. Everyone wins.",
      "I am now 53 years old and I have reached a place in my life where I no longer want to work for money, but simply for the joy of the work itself and to better answer the call to service that I feel so clearly in my own heart.",
      "The ability to innovate is your only real lasting competitive advantage.",
      "I think profits are an indirect result of creating value for other people.",
      "As a parent, I have always loved Whole Foods with all my heart."
    ],
    "primarySources": [
      "John Mackey and Raj Sisodia, Conscious Capitalism: Liberating the Heroic Spirit of Business (Harvard Business Review Press, 2013), including the Conscious Capitalism Credo published as its afterword",
      "John Mackey, The Whole Story: Adventures in Love, Life, and Capitalism (Matt Holt Books, May 21, 2024)",
      "John Mackey, letter to Whole Foods Market team members, November 2, 2006, published by the company as Compensation at Whole Foods Market",
      "John Mackey, My Goodbye to Whole Foods, johnpmackey.com, September 2022 (https://johnpmackey.com/my-goodbye-to-whole-foods/)",
      "Amazon and Whole Foods Market merger announcement of June 16, 2017 and completion announcement of August 28, 2017, with the accompanying Whole Foods Market SEC filings",
      "John Mackey (businessman), Wikipedia (https://en.wikipedia.org/wiki/John_Mackey_(businessman))"
    ]
  },
  "brian-armstrong": {
    "slug": "brian-armstrong",
    "occupation": "Software engineer turned entrepreneur; co-founder, chairman, and chief executive officer of Coinbase, the first crypto-native company added to the S&P 500",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Brian_Armstrong_(businessman)",
    "fullName": "Brian Armstrong",
    "birthDate": "January 25, 1983",
    "birthPlace": "San Jose, California, U.S.",
    "nationality": "American",
    "education": [
      "Bellarmine College Preparatory, San Jose, California",
      "Rice University (B.A. in economics and computer science, 2005)",
      "Rice University (M.S. in computer science, 2006)"
    ],
    "occupations": [
      "Software engineer",
      "Co-founder, chairman, and chief executive officer of Coinbase",
      "Startup founder and investor, including ResearchHub and NewLimit",
      "Philanthropist"
    ],
    "yearsActive": "2003–present",
    "notableWorks": [
      "Coinbase (2012), the cryptocurrency exchange he co-founded with Fred Ehrsam and still leads",
      "UniversityTutor.com (2003 to 2012), the online tutoring directory he founded as a student and ran until Coinbase",
      "'Coinbase is a mission focused company' (2020), the blog post that set the company's apolitical workplace policy",
      "ResearchHub (2020), a self-funded open platform for scientific papers, modeled on GitHub",
      "NewLimit (2021), the epigenetic reprogramming company he co-founded with Blake Byers to extend human healthspan",
      "Base (2023), Coinbase's Ethereum layer 2 network, opened to the public in August 2023"
    ],
    "spouses": [
      "Angela Meng (m. 2024)"
    ],
    "children": "None publicly reported as of July 2026",
    "awards": [
      "Fortune 40 Under 40, ranked No. 10 (2017)",
      "Time 100 Next (2019)",
      "Forbes 400 list of the richest people in America, ranked No. 145 (2024)",
      "Coinbase named to the TIME100 Most Influential Companies list (2025), the year it entered the S&P 500"
    ],
    "netWorth": "About $8 billion as of July 23, 2026, per the Forbes real time billionaires list, which ranked him No. 455 in the world. The figure is dominated by his Coinbase stake and moves with the share price, and other trackers published materially different estimates during 2026.",
    "earlyLife": "Brian Armstrong was born on January 25, 1983, near San Jose, California, to two engineer parents. He attended Bellarmine College Preparatory, a Catholic all-male private high school in San Jose, and then went to Rice University in Houston, where he earned a dual bachelor's degree in economics and computer science in 2005 and a master's degree in computer science in 2006. In August 2003, while still a student, he started an online tutoring directory called UniversityTutor.com, and he stayed its founder and chief executive until May 2012, the month Coinbase was incorporated.\n\nHis first jobs were conventional. He worked as a developer at IBM and, from July to November 2005, as a consultant in the enterprise risk management practice at Deloitte & Touche. He then spent about a year in Buenos Aires working for an education company, and watching high inflation erode what ordinary Argentines had earned stayed with him as a problem worth solving. In 2010 he read the Bitcoin white paper published under the name Satoshi Nakamoto, which described a way to move value over the internet without a bank or a government in the middle.",
    "career": "In May 2011 Armstrong joined Airbnb as a software engineer, where he saw payments running through the roughly 190 countries the company then served, including how expensive it was to get money into South America. He wrote code on nights and weekends, in Ruby and JavaScript, to buy and store cryptocurrency, and in May 2012 he posted on Hacker News looking for a co-founder so he could apply to Y Combinator. He was accepted into the summer 2012 batch with a $150,000 investment and left Airbnb in June 2012. Coinbase's SEC filings date the company's inception to May 2012, and it is commonly dated to June 2012, when it launched publicly. Armstrong met Fred Ehrsam, a former Goldman Sachs foreign exchange trader, through a Reddit community, and Ehrsam joined as co-founder. Union Square Ventures led a roughly $5 million Series A in May 2013, Andreessen Horowitz led a $25 million Series B that December with Union Square Ventures and Ribbit Capital participating, and a 2018 round valued Coinbase at $8.1 billion.\n\nOn September 27, 2020, Armstrong published a post titled 'Coinbase is a mission focused company', stating that the company would not take positions on broader social and political questions unrelated to its mission, and offering a severance package to any employee who preferred to leave over it. About 60 employees, roughly 5 percent of the company, took it. Coinbase filed its Form S-1 publicly on February 25, 2021, and its Class A shares began trading on the Nasdaq Global Select Market under the ticker COIN on April 14, 2021 through a direct listing rather than an underwritten offering. Nasdaq set a reference price of $250, the stock traded as high as about $429, and it closed its first day at $328.28, a valuation reported at roughly $85 billion. Armstrong has been chairman of the board since February 2021, and because he controls a majority of the voting power, Coinbase qualifies as a controlled company under Nasdaq rules. Outside Coinbase he founded the open science platform ResearchHub in January 2020 and co-founded NewLimit, an epigenetic reprogramming company, with the investor Blake Byers in December 2021. He launched the nonprofit GiveCrypto.org in 2018, which wound down in 2023, and signed the Giving Pledge in 2018, though Bloomberg reported in July 2024 that he was no longer listed as a signatory.\n\nCoinbase's regulatory record runs on two separate tracks that are frequently collapsed into one. On the rulemaking track, the company petitioned the U.S. Securities and Exchange Commission in July 2022 to write rules clarifying how the federal securities laws apply to digital assets; the SEC denied that petition in December 2023; Coinbase challenged the denial; and on January 13, 2025 the U.S. Court of Appeals for the Third Circuit, in Coinbase, Inc. v. SEC, held the denial conclusory and insufficiently reasoned, and therefore arbitrary and capricious, remanding it to the agency for a reasoned explanation. The court did not order the SEC to write rules. On the separate enforcement track, the SEC issued Coinbase a Wells notice on March 22, 2023 and filed a civil enforcement action on June 6, 2023 in the Southern District of New York, alleging that Coinbase operated as an unregistered exchange, broker, and clearing agency; Coinbase contested the claims. More than six weeks after the appellate ruling, on February 27, 2025, the SEC announced it had agreed to dismiss that enforcement action, and the parties stipulated to dismissal with prejudice, with no penalty paid and no changes required to the business. Coinbase joined the S&P 500 on May 19, 2025, replacing Discover Financial Services and becoming the first crypto-native company in the index. In the surrounding period the company also became one of the largest corporate donors to Fairshake, a crypto industry super political action committee, contributing more than $75 million across the 2024 cycle and its affiliated committees.",
    "legacy": "Armstrong's central achievement is institutional. He took something that in 2012 looked to most people like an internet curiosity and built the company that made buying and holding cryptocurrency ordinary in the United States, then carried it through a Nasdaq direct listing and into the S&P 500. The stated purpose moved with him, from creating an open financial system for the world, the mission written into the 2020 blog posts and the 2021 S-1, to increasing economic freedom in the world, the formulation Coinbase uses today. He is also unusual among large-cap chief executives in having litigated rather than settled with his principal regulator, and in remaining founder, chairman, and controlling shareholder throughout.\n\nHis 2020 mission post had reach well beyond crypto. It became one of the most cited documents in the argument over whether employers should take public positions on social and political questions, treated as a template by some founders and as an abdication by other observers, and it put the phrase 'mission focused company' into common use in Silicon Valley. Armstrong remains a contested figure, credited with conviction and long time horizons, and criticized for the scale of crypto political spending that followed and for the concentration of voting control at Coinbase. He is in his early forties and still running the company, so any assessment of the record is provisional.",
    "notableQuotes": [
      "In short, I want Coinbase to be laser focused on achieving its mission, because I believe that this is the way that we can have the biggest impact on the world.",
      "Change happens in the world only when a smart, talented, group of people come together to focus on a hard problem for a decade or more.",
      "There is never enough time to do everything, so companies need to choose what change they want to see in the world and focus there.",
      "I recognize that our approach is not for everyone, and may be controversial. I know that many people may not agree, and some employees may resign.",
      "Technology is the longest lever we can pull to improve the human condition.",
      "Our core thesis is that greater adoption and usage of cryptocurrency will increase economic freedom in the world."
    ],
    "primarySources": [
      "Brian Armstrong, 'Coinbase is a mission focused company', The Coinbase Blog, September 27, 2020 (author's Medium mirror: https://medium.com/the-coinbase-blog/coinbase-is-a-mission-focused-company-af882df8804)",
      "Brian Armstrong, 'How crypto enables economic freedom', The Coinbase Blog, September 23, 2021, an internal memo he republished publicly under his own byline",
      "Coinbase Global, Inc., Form S-1 registration statement, filed with the U.S. Securities and Exchange Commission on February 25, 2021, for his biography, dates of employment, and the company's stated mission",
      "Coinbase Global, Inc., 2026 definitive proxy statement (Schedule 14A), for his roles as chairman since February 2021 and chief executive since inception, and for the 2020 CEO Performance Award",
      "Coinbase, Inc. v. Securities and Exchange Commission, No. 23-3202 (3d Cir. January 13, 2025) (https://law.justia.com/cases/federal/appellate-courts/ca3/23-3202/23-3202-2025-01-13.html)",
      "Statement of SEC Commissioner Hester M. Peirce on the dismissal of the civil enforcement action against Coinbase, February 27, 2025 (https://www.sec.gov/newsroom/speeches-statements/peirce-statement-coinbase-022725)"
    ]
  },
  "james-dyson": {
    "slug": "james-dyson",
    "occupation": "Inventor, industrial designer and engineer; founder and chairman of Dyson, and the creator of the dual cyclone bagless vacuum cleaner",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/James_Dyson",
    "fullName": "Sir James Dyson OM CBE FRS FREng",
    "birthDate": "2 May 1947",
    "birthPlace": "Cromer, Norfolk, England",
    "nationality": "British",
    "education": [
      "Gresham's School, Holt, Norfolk, as a boarder from 1956 to 1965",
      "Byam Shaw School of Art, London, 1965 to 1966",
      "Royal College of Art, London, 1966 to 1970, furniture and interior design, then industrial design"
    ],
    "occupations": [
      "Inventor and engineer",
      "Industrial designer",
      "Founder and chairman of Dyson",
      "Farmer and landowner, Dyson Farming",
      "Philanthropist and founder of the Dyson Institute of Engineering and Technology"
    ],
    "yearsActive": "1970–present",
    "notableWorks": [
      "Sea Truck (1970), the fast flat hulled landing craft he engineered and then sold worldwide for Jeremy Fry's Rotork",
      "Ballbarrow (1974), the wheelbarrow that replaced the wheel with a plastic ball, and the venture whose loss taught him never to give up patents or control",
      "G-Force (1986), the reworked cyclonic cleaner put into production in Japan by Apex, whose royalties funded everything that followed",
      "Dyson Appliances (incorporated July 1991), the manufacturing company he built at Malmesbury, Wiltshire, still wholly owned by the family",
      "DC01 (1993), the first Dyson Dual Cyclone, Britain's best selling upright cleaner within about eighteen months",
      "Against the Odds: An Autobiography (1997) and Invention: A Life (2021), his two accounts of the work"
    ],
    "spouses": [
      "Deirdre Hindmarsh (m. 1968), painter and art teacher"
    ],
    "children": "3 (Emily, Jake and Sam)",
    "awards": [
      "Prince Philip Designers Prize (1997)",
      "Commander of the Order of the British Empire, CBE (1998 New Year Honours)",
      "Royal Designer for Industry and Fellow of the Royal Academy of Engineering (2005)",
      "Knight Bachelor (2007 New Year Honours)",
      "Fellow of the Royal Society (2015)",
      "Member of the Order of Merit (2016 New Year Honours), one of only twenty four living members, in the personal gift of the sovereign",
      "Honorary Membership of the IEEE (2017)"
    ],
    "netWorth": "About 12 billion pounds for Dyson and his family in the Sunday Times Rich List published on 15 May 2026, ranking thirteenth in the United Kingdom. That list valued the business itself at about 8 billion pounds on profits of some 600 million, and put a further 4 billion in assets held outside the company, including at least 36,000 acres of farmland. Earlier editions estimated 20.8 billion pounds in 2025 and a peak of 23 billion pounds in 2023.",
    "earlyLife": "James Dyson was born on 2 May 1947 in Cromer, Norfolk, the youngest of three children. Both his parents taught at Gresham's School in Holt, where his father, Alec Dyson, was head of classics, and James entered the school as a boarder in 1956 at the age of nine. That same year his father died of cancer. Dyson has said that the generosity of the school, and of the headmaster Logie Bruce-Lockhart in particular, was what allowed him to continue there afterwards. He was the youngest boy in almost every room he was put in, and he took up long distance running, going out before school and again at night, in large part because nobody else was doing it. Running taught him that the point where everyone else is exhausted is the point where the advantage lies, and in Against the Odds he writes that difference itself was making him come first.\n\nHe left Gresham's in 1965, spent a year at the Byam Shaw School of Art in London, and went on to the Royal College of Art from 1966 to 1970, studying furniture and interior design before moving into industrial design. The Royal College is where he crossed from art into engineering, and where he met Jeremy Fry, founder of the pump and valve maker Rotork, who hired him while he was still a student. Fry offered almost no instruction beyond showing him where the workshop was, and handed him the Sea Truck, a fast flat hulled landing craft that Dyson engineered and then went out and sold around the world. That combination, designing the thing and then having to sell it himself, set the pattern for everything after. He married Deirdre Hindmarsh, a painter he met at art school, in 1968, and they have three children, Emily, Jake and Sam.",
    "career": "Dyson stayed with Fry at Rotork for several years, latterly running the marine division, then left to work for himself. In 1974 he invented the Ballbarrow, a wheelbarrow with a wide plastic ball in place of the wheel so it would not sink into wet ground. It sold well, and it taught him the most expensive lesson of his life. He had financed the company with outside shareholders and had assigned the patent to the company rather than holding it himself, and at the end of the decade, aged thirty two, the board voted him out of his own business. He left without the product, without the patent and without the years he had put in. From then on the rules were fixed: never assign a patent, never take on outside shareholders, and hold the whole line yourself, from invention through engineering and manufacturing to the customer.\n\nThe cyclone came out of that same factory, where a powder coating filter kept clogging and Dyson built a thirty foot industrial cyclone over two weekends to spin the powder out of the air. At home his Hoover Junior kept losing suction. He emptied the bag, found no improvement, cut it open, and saw that a fine layer of dust had sealed the pores from the inside. A bag does not fill up so much as clog up. He tore it off, taped a cardboard cyclone in its place and pushed the first bagless vacuum cleaner around his own house. What followed is the number everyone quotes. Working alone in the coach house behind his home at Bathford, near Bath, from roughly 1979 into the early 1980s, he hand built 5,127 prototypes, one or two a day, changing a single variable at a time so that each failure told him something specific. Deirdre's teaching salary carried the family, the house was remortgaged repeatedly, and every established vacuum manufacturer he approached turned him down, which he took as encouragement rather than a verdict, because not one of them ever gave him a good reason. The first machines of his design to reach the public were the Kleeneze Rotork Cyclon, about 500 of which sold through 1983 and 1984, and then the G-Force, a reworked version that Apex put into production in Japan in March 1986 and sold for roughly two thousand dollars.\n\nJapanese royalties, American licensing and the proceeds of a patent action finally gave him capital of his own. In July 1991 he incorporated his own manufacturing company, which became Dyson Appliances, and built it at Malmesbury in Wiltshire, borrowing 600,000 pounds against his house to pay for tooling. In Against the Odds he records the moment it was done. On 2 May 1992, his forty fifth birthday, he looked at the first fully operational and visually perfect Dyson Dual Cyclone. That was fourteen years after he had first torn the bag off the Hoover at the age of thirty one. The two numbers belong to different clocks and are constantly merged into a single claim of 5,127 prototypes over fifteen years, which is wrong on both counts. The 5,127 hand built prototypes belong to the coach house years; the fourteen years is the arc from the torn bag to the finished machine. The DC01 came off the line in 1993, became Britain's best selling upright cleaner within about eighteen months, and by 2001 accounted for 47 percent of the United Kingdom upright market. In October 2000 the High Court found that Hoover's Triple Vortex infringed his patent, and Hoover eventually paid 4 million pounds. Dyson went on to digital motors, the Airblade hand dryer in 2006, the Air Multiplier bladeless fan in 2009 and the Supersonic hair dryer in 2016. He moved vacuum production to Malaysia in 2002 and the company headquarters to Singapore in 2019, and he put about 500 million pounds of his own money into an electric car, the N526, before cancelling it in October 2019 on the grounds that it could not be sold at a profit.",
    "legacy": "Dyson's lasting argument to founders is about ownership at least as much as invention. He has never sold a share: the company is 100 percent owned by him and his family, with no outside investors, no flotation and no private equity, which is the direct and deliberate consequence of losing the Ballbarrow. That structure lets Dyson put hundreds of millions of pounds a year into research without explaining itself to anyone, and it made him one of the wealthiest people in Britain. It also made engineering visible again in a country that had largely stopped noticing it. The clear bin on the DC01 was not a manufacturing convenience but a decision to show people the dust they had been collecting invisibly for a century, and with it he turned a commodity appliance into a design object people were willing to pay four times the going rate for. He was appointed CBE in the 1998 New Year Honours, knighted in 2007, elected a Fellow of the Royal Society in 2015 and appointed to the Order of Merit in 2016. He served as Provost of the Royal College of Art from 2011 to 2017.\n\nThe second half of his career has been spent trying to manufacture engineers rather than only products. The James Dyson Foundation, established in 2002, runs the international James Dyson Award for student inventors, and the Dyson Institute of Engineering and Technology, opened on the Malmesbury campus in September 2017, takes undergraduates who pay no tuition fees, draw a salary, and spend three days a week working alongside Dyson engineers; it was granted full taught degree awarding powers in 2024, the first provider to receive them under the Office for Students' new approach. He gave a reported 35 million pounds to Gresham's in 2023. The record is not free of contradiction. He was among the most prominent business backers of Brexit, then announced in January 2019 that the headquarters would move to Singapore, which drew widespread accusations of hypocrisy; he answered that the decision was commercial, driven by proximity to Asian markets and manufacturing. The Sunday Times Rich List published in May 2026 put the family fortune at 12 billion pounds, down from 20.8 billion a year earlier, with at least 36,000 acres of farmland among the assets held outside the company. His son Jake is now Dyson's chief engineer and his expected successor, which is the whole point of never having sold the shares.",
    "notableQuotes": [
      "I aim not to be clever, but to be dogged.",
      "There is no such thing as a quantum leap. There is only dogged persistence, and in the end you make it look like a quantum leap.",
      "I am claiming nothing but the virtues of a mule.",
      "Misfits are not born or made; they make themselves.",
      "Invention is often more about endurance and patient observation than brainwaves.",
      "Failure is interesting. It's part of making progress. You never learn from success, but you do learn from failure."
    ],
    "primarySources": [
      "James Dyson, Against the Odds: An Autobiography (Orion Business Books, 1997, written with Giles Coren; Texere edition 2003), the source of the 5,127 prototypes, the coach house years and the first working Dual Cyclone on 2 May 1992",
      "James Dyson, Invention: A Life (Simon and Schuster, 2021), his second autobiography, covering the company, the Institute and the electric car",
      "James Dyson on Using Failure to Drive Success, interview by Nadia Goodman, Entrepreneur, November 2012 (https://www.entrepreneur.com/growing-a-business/james-dyson-on-using-failure-to-drive-success/224855)",
      "James Dyson, Wikipedia, for dates, education, honours and the Royal College of Art provostship (https://en.wikipedia.org/wiki/James_Dyson)",
      "Dyson (company), Wikipedia, for the Kleeneze Rotork Cyclon, the March 1986 G-Force, the 1991 incorporation, the DC01 and the ownership structure (https://en.wikipedia.org/wiki/Dyson_(company))",
      "Sunday Times Rich List 2026, as reported by ITV News West Country, 15 May 2026 (https://www.itv.com/news/westcountry/2026-05-15/sir-james-dyson-named-richest-man-in-south-west)"
    ]
  },
  "todd-graves": {
    "slug": "todd-graves",
    "occupation": "American restaurateur and entrepreneur, founder of Raising Cane's Chicken Fingers, which he built to more than 1,000 restaurants without ever selling a stake",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Todd_Graves_(entrepreneur)",
    "fullName": "Todd Bartlett Graves",
    "birthDate": "1972 (age 54 as of July 2026; no public source gives an exact day)",
    "birthPlace": "New Orleans, Louisiana, U.S., raised in Baton Rouge",
    "nationality": "American",
    "education": [
      "Episcopal School of Baton Rouge, Baton Rouge, Louisiana",
      "University of Georgia (Bachelor of Arts)",
      "Note on a common error: Graves is not an LSU graduate. The Raising Cane's business plan was submitted through a business plan course at Louisiana State University in which his friend and co founder Craig Silvey was enrolled, and the first restaurant opened at the LSU North Gates, which is the source of the confusion."
    ],
    "occupations": [
      "Restaurateur",
      "Founder, chairman and chief executive of Raising Cane's Chicken Fingers",
      "Entrepreneur and private company owner",
      "Television producer and host, Restaurant Recovery",
      "Philanthropist"
    ],
    "yearsActive": "1996–present",
    "notableWorks": [
      "Raising Cane's Chicken Fingers, first restaurant at the North Gates of LSU on Highland Road, Baton Rouge (opened August 28, 1996), still called the Mothership inside the company",
      "Secret Millionaire, Fox, premiere episode with his wife Gwen in a Louisiana community recovering from Hurricane Katrina (2008)",
      "First international Raising Cane's, Kuwait (2014), the start of a franchise partner model used only outside the United States",
      "Restaurant Recovery, docuseries he created and hosted for discovery+, backed by $2 million of his own money for independent restaurants hurt by the pandemic (2021)",
      "Raising Cane's Times Square, New York City (2023)",
      "Raising Cane's 1,000th restaurant, a two story flagship at Hollywood and Highland, Los Angeles (March 2026)"
    ],
    "spouses": [
      "Gwen Drain (m. 2000), a former McDonald's franchisee he had known since high school"
    ],
    "children": "2 daughters",
    "awards": [
      "Glassdoor Employees' Choice Award, Top CEOs in the United States, No. 28 on a 95 percent approval rating from his own crew members (2019)",
      "Ernst & Young Entrepreneur of the Year",
      "Restaurateur of the Year, Louisiana Restaurant Association",
      "Forbes 400, No. 46 (2025)"
    ],
    "netWorth": "Forbes estimated his fortune at $22 billion as of July 23, 2026, ranking him No. 119 in the world and the richest restaurateur in the United States. Almost all of it is his roughly 92 percent stake in a private company, so the number moves with revenue estimates rather than a share price: Forbes had him near $9.5 billion in October 2024, and record sales in 2025 roughly doubled the figure. Other wealth trackers using different methods have published materially lower estimates over the same period.",
    "earlyLife": "Todd Bartlett Graves was born in 1972 in New Orleans, Louisiana, and grew up in Baton Rouge. He graduated from the Episcopal School of Baton Rouge and earned a bachelor's degree from the University of Georgia. The idea that became his life's work started as a class assignment. With his friend Craig Silvey he wrote a business plan for a restaurant that would sell one thing, chicken fingers, and the plan went in through the business plan course Silvey was taking at Louisiana State University. It was exhaustive, priced out down to the smallest operating costs, and the instructor still marked it the lowest grade in the class. Graves has said on the record that the grade was a B minus, and that the objection was not the plan but the concept, since conventional wisdom held that a fast food restaurant needed a wide menu to survive. The more dramatic version of the story that circulates online, in which he was given a failing grade, is a myth he has corrected himself.\n\nEvery bank he approached agreed with the instructor. He had no restaurant experience and no money, and the answer was consistently no. Rather than abandon the idea or wait for permission, Graves decided to earn the capital with his hands. He moved to Southern California and worked roughly ninety hour weeks as a boilermaker at oil refineries in El Segundo and Torrance, handling welding equipment and torches. A coworker told him the real money was in commercial fishing, so he went to Alaska, camped on the tundra for about a month asking boat to boat for a job, and eventually got a spot fishing sockeye salmon in Bristol Bay, working twenty hour days in heavy seas. He has described the entire stretch, refinery and gillnetter alike, as time spent thinking about a chicken finger restaurant.",
    "career": "Graves came home to Baton Rouge and assembled the money from three places: the savings he had earned in the refineries and in Alaska, an investment round raised from friends, family and local backers, and a Small Business Administration loan. Published accounts differ on the exact amounts. He rebuilt a small building at the North Gates of LSU on Highland Road largely by hand and named the restaurant after his yellow Labrador, Raising Cane. It opened on August 28, 1996, and is still called the Mothership inside the company. The menu was chicken fingers, crinkle cut fries, coleslaw, Texas toast and Cane's Sauce. The first month cleared a profit of thirty dollars, which he has said thrilled him, because the crew, the rent and the vendors had all been paid. A second restaurant followed roughly eighteen months later, and that was the point at which he stopped thinking of it as a college town concept.\n\nThe next decade nearly ended the company. To expand without giving up equity, Graves borrowed from private investors at 15 percent interest and presented that subordinated debt to community banks in a way that let them count it as equity, which in turn unlocked larger loans. In August 2005, Hurricane Katrina closed 21 of his 28 restaurants and cut off the cash flow the whole structure depended on. He has since described the strategy bluntly as stupid, and the company now holds its debt to equity ratio below three to one. He reversed course on franchising as well. Having sold franchises in a handful of markets, he concluded that no franchisee would ever run a restaurant with the intensity an owner does, and he bought them back. Only a small number of franchised restaurants remain in the United States, and international growth runs through franchise partners instead, starting with Kuwait in 2014. In place of domestic franchising the company built a partner program that ties restaurant leaders' earnings to the results of the business.\n\nThe refusal to sell has been just as firm. Graves has never taken the company public and has never sold a stake to private equity, and he still owns roughly 92 percent of it. His title reads Founder, Chairman, CEO, Fry Cook and Cashier, and it is not a joke: everyone hired into an office role spends time working the fryer and the register before settling into the job. The menu has not meaningfully changed in thirty years. Raising Cane's posted about $6.0 billion in systemwide sales in 2025, passed KFC to become the third largest chicken chain in the United States behind Chick-fil-A and Popeyes, and averaged roughly $6.6 million per restaurant, among the highest unit volumes in quick service, on a crew of about 70,000 people. In March 2026 the company opened its 1,000th restaurant at Hollywood and Highland in Los Angeles, a short drive from the refineries where he once welded to fund the first one, with roughly 100 more restaurants planned for 2026 and entries into Mexico and the United Kingdom ahead.",
    "legacy": "Graves is the rare modern restaurant founder who scaled without the two instruments the industry normally uses to scale, franchising and outside capital, and the result is an unusual concentration of both control and wealth in one person. Forbes valued his fortune at $22 billion as of July 23, 2026, essentially all of it a stake in a private company he says he will never sell. For founders, the more transferable lesson is the one buried in that business plan grade. The objection that killed the concept on paper, that the menu was too narrow, turned out to be the reason it worked. A five item menu held for thirty years is precisely what buys the company room to obsess over the specification of the chicken, the length of the marinade and the clock on the drive through, and that obsession is what shows up in the unit economics.\n\nHe has stayed conspicuously local. The headquarters is still in Baton Rouge, the workforce is called crew members, and the internal shorthand for the culture is One Love. He appeared with his wife Gwen on the premiere of the Fox series Secret Millionaire in 2008, living on a small daily allowance in a Louisiana community still recovering from Katrina and giving away more than $100,000 at the end of it, and in 2021 he created and hosted Restaurant Recovery for discovery+, putting $2 million into independent restaurants hurt by the pandemic. Glassdoor's Employees' Choice list named him one of the top chief executives in the country in 2019 on a 95 percent approval rating from his own crew. He lends a 66 million year old triceratops skull to the Louisiana Arts and Science Museum and the hearse that carried Martin Luther King Jr. to exhibitions around the country, and he lives in Baton Rouge with Gwen, their two daughters, and the third yellow Labrador to carry the name Raising Cane.",
    "notableQuotes": [
      "Nothing ever happens unless someone pursues a vision fanatically.",
      "When you're an entrepreneur and you believe in something to your core, you use every no and every 'it's not going to work' as fuel.",
      "If you try to be all things to all people, you won't be special.",
      "I profited $30 my first month, and I was thrilled.",
      "There is not a balance of life at a startup. You have to put 100% into it.",
      "I'm gonna grow old and die with this business, and the kids are gonna take it on and keep those values going."
    ],
    "primarySources": [
      "Todd Graves (entrepreneur), Wikipedia (https://en.wikipedia.org/wiki/Todd_Graves_(entrepreneur)), used for the infobox facts: birth name, birth year and place, Episcopal School of Baton Rouge, University of Georgia degree, marriage to Gwen Drain in 2000, two daughters, and the Craig Silvey LSU business plan course.",
      "inRegister Magazine (Baton Rouge), 'Todd Graves, Founder and CEO, Raising Cane's Chicken Fingers,' April 30, 2013 (https://www.inregister.com/article/todd-graves-founder-and-ceo-raising-canes-chicken-fingers). A first person profile and the earliest published attestation of his signature line about pursuing a vision fanatically.",
      "Chase Withorn, 'Billionaire Raising Cane's Founder Todd Graves Used Chicken Tenders To Become America's Richest Restaurateur,' Forbes, September 24, 2025. Source for the 92 percent ownership stake, the $6.6 million average unit volume, the El Segundo and Torrance boilermaker work, Bristol Bay salmon fishing, the crew count near 70,000, and two of the quotes below.",
      "Forbes real time billionaires profile for Todd Graves (https://www.forbes.com/profile/todd-graves/), read July 23, 2026: $22 billion, No. 119 in the world, age 54, Baton Rouge, two children.",
      "CNBC Make It reporting on Graves, October and November 2024, including 'How Raising Cane's founder Todd Graves became an unlikely billionaire' (October 5, 2024) and 'Raising Cane's Todd Graves: Stupid strategy nearly cost me my business' (October 12, 2024). Source for the 15 percent subordinated debt, the 21 of 28 restaurants closed by Hurricane Katrina, the debt to equity discipline afterwards, and his refusal to go public or sell.",
      "Entrepreneur, 'How to Develop the Mindset for a Billion-Dollar Success, According to Raising Cane's Founder,' July 29, 2025, drawn from his interview on The Playbook. Source for the thirty dollar first month, the startup balance line, and the succession line."
    ]
  },
  "nassim-taleb": {
    "slug": "nassim-taleb",
    "occupation": "Essayist, probabilist and former options trader; author of the five volume Incerto and the man who put black swan and antifragile into ordinary language",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Nassim_Nicholas_Taleb",
    "fullName": "Nassim Nicholas Taleb",
    "birthDate": "12 September 1960",
    "birthPlace": "Amioun, Lebanon",
    "nationality": "Lebanese-American",
    "education": [
      "Grand Lycee Franco-Libanais, Beirut",
      "University of Paris, bachelor's and master's degrees",
      "The Wharton School, University of Pennsylvania, MBA, 1983",
      "University of Paris (Paris Dauphine), PhD in management science, 1998, supervised by Helyette Geman, with a dissertation on the mathematics of derivatives pricing"
    ],
    "occupations": [
      "Essayist and author of the Incerto",
      "Probabilist and applied statistician",
      "Former options and derivatives trader",
      "Risk analyst and scientific adviser on tail risk",
      "University professor, retired"
    ],
    "yearsActive": "1984–present",
    "notableWorks": [
      "Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets (2001), the first Incerto volume",
      "The Black Swan: The Impact of the Highly Improbable (2007), the second Incerto volume",
      "The Bed of Procrustes: Philosophical and Practical Aphorisms (2010), the third Incerto volume",
      "Antifragile: Things That Gain from Disorder (2012), the fourth Incerto volume",
      "Skin in the Game: Hidden Asymmetries in Daily Life (2018), the fifth Incerto volume"
    ],
    "awards": [
      "Named to Forbes's list of the most influential management gurus (2009)",
      "Named to Bloomberg's 50 Most Influential people in global finance (2011)",
      "Listed by the Gottlieb Duttweiler Institute among the 100 most influential thought leaders in the world (2013, 2014 and 2015)",
      "Honorary doctorate from the American University of Beirut (2016), where he also delivered the commencement address",
      "Wolfram Innovator Award (2018), for work on decision making under complicated and less idealized probabilistic structures"
    ],
    "earlyLife": "Nassim Nicholas Taleb was born on 12 September 1960 in Amioun, a town in the Koura district of northern Lebanon, to Nagib Taleb, a physician, oncologist and researcher in anthropology, and Minerva Ghosn. The family was Greek Orthodox of Antiochian Greek descent, part of the Levantine Christian establishment, and politically prominent across generations. His paternal grandfather, also named Nassim Taleb, sat as a supreme court judge, and both a grandfather and a great grandfather served as deputy prime ministers of Lebanon between the 1940s and the 1970s. An ancestor, Ibrahim Taleb, was a governor of Mount Lebanon in 1866. His parents held French citizenship, and he was sent to the Grand Lycee Franco-Libanais in Beirut, growing up multilingual in a country that appeared to him permanent and legible.\n\nIn 1975 the Lebanese civil war broke out. Almost everyone expected it to be settled in days or weeks. It lasted fifteen years, ended Lebanon's standing as a stable Levantine centre, and stripped the family of much of its wealth and position. Taleb has returned to that experience repeatedly as the root of everything he later wrote: the experts had been confident, the experts had been wrong, and afterward their confidence was quietly revised into a tidy story that made the war look inevitable all along. He left for higher education in France, taking bachelor's and master's degrees at the University of Paris, then an MBA from the Wharton School at the University of Pennsylvania in 1983. Much later, in 1998, while already a working trader, he took a PhD in management science from Paris Dauphine under Helyette Geman, with a dissertation on the mathematics of derivatives pricing.",
    "career": "Taleb began as a derivatives trader in December 1984 at First Boston, and spent roughly two decades in the options business across a run of institutions: Banque Indosuez, where he was chief currency derivatives trader, CIBC Wood Gundy, Bankers Trust, BNP Paribas and UBS, together with a stint as an independent pit trader on the floor of the Chicago Mercantile Exchange. He has estimated that he executed several hundred thousand options transactions over that period. The defining episode came on Black Monday, 19 October 1987, when a hedged position that the standard pricing models treated as effectively impossible paid out and made him financially independent at twenty seven. The lesson he drew was not that he had predicted the crash, which he denies, but that he had been positioned so that prediction was unnecessary. His first book, Dynamic Hedging (1997), was a technical manual for practitioners and preceded the popular work by years.\n\nIn 1999 he founded the hedge fund Empirica Capital, built on the inversion of the prevailing approach: rather than collect small steady gains while carrying a hidden risk of catastrophic loss, buy cheap far out of the money options, bleed slowly and survive to collect when a crash arrives. He closed Empirica in 2004. Since 2007 he has been Distinguished Scientific Advisor to Universa Investments, the tail hedging firm founded by his former Empirica partner Mark Spitznagel, a role he describes as deliberately passive. He does not run Universa, manage its capital or trade for it. He is also a co-founder of the Real World Risk Institute, which teaches practitioners rather than academics.\n\nHis academic career ran alongside and then past the trading. He joined the NYU Tandon School of Engineering in September 2008 as Distinguished Professor of Risk Engineering; NYU Tandon now lists him as Retired Distinguished Professor in the Department of Finance and Risk Engineering, with research interests in risk, tail risk, quantitative finance and applied probability. He was Distinguished Research Scholar at Oxford's Said Business School from 2009 to 2013, and has held or taught positions at the University of Massachusetts Amherst, the London Business School and NYU's Courant Institute. The technical work continued in parallel with the essays, culminating in Statistical Consequences of Fat Tails (2020), which he posted free on arXiv. The five volumes of the Incerto appeared across seventeen years: Fooled by Randomness (2001), The Black Swan (2007), The Bed of Procrustes (2010), Antifragile (2012) and Skin in the Game (2018).",
    "legacy": "The Incerto is a single argument in five parts, and its terms have escaped into ordinary speech. The Black Swan sold more than three million copies and was named by the Sunday Times, in a line the publisher has quoted ever since, as one of the twelve most influential books written since the Second World War; black swan is now the standard shorthand for a rare, high consequence event that only looks predictable afterward. Antifragile supplied a word that did not exist for the thing that gains from disorder rather than merely surviving it, along with the barbell strategy, via negativa and a popular account of the Lindy effect. Skin in the Game gave a name to asymmetric accountability, the condition in which one party takes the decision and another bears the consequence. Taleb is careful to note that the black swan metaphor itself is not his invention, since it goes back to the Roman satirist Juvenal and was a standing European figure of speech; what is his is the repurposing.\n\nHis standing is genuinely contested, which is close to a design goal. He has spent decades attacking Gaussian risk models and the people who use them, including a long running and public dispute with Myron Scholes, and he coined the term Intellectual Yet Idiot for the credentialed class that prescribes what others should do, eat, think and vote for while bearing none of the consequences. Critics find the manner insufferable and the mathematics contested at the edges. What has proved durable is a shift of attention rather than a forecast. Taleb does not predict, and says so; his contribution is to move the question from what is going to happen to what you are exposed to if you are wrong, to insist that survival precedes optimisation because a ruinous outcome removes you from the sample, and to demand that anyone giving advice be made to pay for being wrong. That framing is now standard vocabulary in risk management, in epidemiology and public health argument, and among founders and investors who have never opened any of the books.",
    "notableQuotes": [
      "Mild success can be explainable by skills and labor. Wild success is attributable to variance.",
      "Missing a train is only painful if you run after it!",
      "The three most harmful addictions are heroin, carbohydrates, and a monthly salary.",
      "Wind extinguishes a candle and energizes fire.",
      "If you see fraud and do not say fraud, you are a fraud.",
      "Never cross a river if it is on average four feet deep."
    ],
    "primarySources": [
      "Nassim Nicholas Taleb, the Incerto: Fooled by Randomness (2001), The Black Swan (2007), The Bed of Procrustes (2010), Antifragile (2012) and Skin in the Game (2018), all Random House",
      "Nassim Nicholas Taleb, Antifragile: Things That Gain from Disorder (Random House, 2012). Taleb publishes the complete prologue in the publisher's typeset form on his own site at https://www.fooledbyrandomness.com/prologue.pdf, which was read directly and used as the source for two quotations here",
      "Nassim Nicholas Taleb, The Logic of Risk Taking, published by the author on Medium's Incerto publication, 25 August 2017 (https://medium.com/incerto/the-logic-of-risk-taking-107bf41029d3), the on record source for the river crossing rule later carried into Skin in the Game",
      "NYU Tandon School of Engineering faculty page for Nassim Nicholas Taleb (https://engineering.nyu.edu/faculty/nassim-nicholas-taleb), the source for the Retired Distinguished Professor title in the Department of Finance and Risk Engineering",
      "Wikipedia, Nassim Nicholas Taleb (https://en.wikipedia.org/wiki/Nassim_Nicholas_Taleb), for dates, family lineage, degrees, employers, academic posts and honours",
      "Open Library full text search inside the scanned trade editions (https://openlibrary.org/search/inside), used to confirm that three of the quotations below occur in the named books rather than only on quotation sites"
    ]
  },
  "ray-dalio": {
    "slug": "ray-dalio",
    "occupation": "Investor and author who founded Bridgewater Associates in 1975 and built it into the largest hedge fund in the world, then wrote down the decision rules he used as Principles",
    "wikipediaUrl": "https://en.wikipedia.org/wiki/Ray_Dalio",
    "fullName": "Raymond Thomas Dalio",
    "birthDate": "August 8, 1949",
    "birthPlace": "Jackson Heights, Queens, New York, U.S.",
    "nationality": "American",
    "education": [
      "Herricks High School, New Hyde Park, New York",
      "C.W. Post College, Long Island University (B.S. in finance, 1971)",
      "Harvard Business School (M.B.A., 1973)"
    ],
    "occupations": [
      "Hedge fund manager and founder of Bridgewater Associates",
      "Author of the Principles books",
      "Macroeconomic researcher and writer on debt cycles",
      "Philanthropist, Dalio Philanthropies and the Giving Pledge",
      "Public educator on how economies and world orders work"
    ],
    "yearsActive": "1975–present",
    "notableWorks": [
      "Bridgewater Associates (founded 1975), the firm he built into the largest hedge fund in the world",
      "Pure Alpha (launched 1991), Bridgewater's flagship actively managed macro strategy",
      "All Weather (launched 1996), the fund that popularized the risk parity approach to portfolio construction",
      "How the Economic Machine Works (2013), a thirty minute animated video he wrote and narrated, published free online",
      "Principles: Life and Work (2017), his collected decision rules and the book that made him widely read outside finance",
      "Principles for Navigating Big Debt Crises (2018) and Principles for Dealing with the Changing World Order (2021), both released free as PDFs alongside print editions"
    ],
    "spouses": [
      "Barbara Dalio (m. 1977)"
    ],
    "children": "Four sons. The eldest, Devon Dalio, died on December 17, 2020, at the age of 42, in a car crash in Greenwich, Connecticut. The second, Paul Dalio, is a film director.",
    "parents": [
      "Marino Dallolio (1911 to 2002), a jazz clarinetist and saxophonist who played Manhattan clubs",
      "Ann Dallolio, a homemaker"
    ],
    "awards": [
      "Named to the Time 100 list of the most influential people in the world (2012)",
      "Named to Bloomberg Markets' list of the 50 Most Influential people in global finance (2012)",
      "Signatory of the Giving Pledge (2011), through which he and Barbara Dalio have committed the majority of their wealth to philanthropy",
      "Principles: Life and Work reached number one on the New York Times business bestseller list (2017)",
      "Honored by Long Island University, his undergraduate alma mater, as one of its most prominent alumni"
    ],
    "netWorth": "Estimated at $15.4 billion by Forbes as of July 23, 2026, placing him around 196th in the world. Bloomberg's Billionaires Index carried a higher figure of roughly $21.5 billion in June 2026. The estimates differ because the two publications value his private holdings and past distributions differently, and because he sold his remaining Bridgewater stake in July 2025.",
    "earlyLife": "Raymond Thomas Dalio was born on August 8, 1949, in Jackson Heights, Queens, the only child of Marino Dallolio, a jazz clarinetist and saxophonist who worked Manhattan clubs, and Ann, a homemaker. The family was Italian American and middle class, and when Dalio was eight they moved out to Manhasset on Long Island. He was, by his own repeated account, a poor and unmotivated student who disliked memorizing what he was told to memorize. What he did like was earning money, and from around the age of twelve he caddied at the Links Golf Club, an exclusive course on Long Island whose members included Wall Street professionals. He carried bags and listened to them talk about markets during the bull market of the early 1960s.\n\nWith about three hundred dollars saved from caddying he bought his first stock, Northeast Airlines, on a rationale he has since described as stupid but lucky. It was the only company he had heard of trading for less than five dollars a share, and he assumed that cheaper shares meant more shares and therefore more money. The airline was taken over in a merger and his stake roughly tripled, which hooked him. He read annual reports, kept trading through high school, and barely got into college. At C.W. Post College, part of Long Island University, he found that being allowed to choose his own subjects changed everything, and he earned a bachelor's degree in finance in 1971 with grades good enough for Harvard Business School, where he took an M.B.A. in 1973. Between terms he clerked on the floor of the New York Stock Exchange in the summer of 1971, the summer the United States severed the dollar's link to gold, and traded commodities at Merrill Lynch the following summer. He also learned Transcendental Meditation in 1969 and has practiced it since.",
    "career": "After Harvard, Dalio worked briefly at Dominick and Dominick and then at Shearson Hayden Stone as a futures trader, a job that ended after he punched his boss at a New Year's Eve party. In 1975, at twenty six, he started Bridgewater Associates out of his two bedroom Manhattan apartment. The early business was not a hedge fund at all. It sold research and risk consulting, helping corporate clients hedge their currency and interest rate exposures, and Dalio wrote a daily commentary called Daily Observations that became the firm's calling card. The operation moved to Connecticut in 1981, working for a period out of a converted barn, and in 1985 it landed its first large institutional mandate, a five million dollar allocation from the World Bank's pension fund.\n\nThe episode Dalio returns to more than any other came in 1982. Mexico defaulted on its debt that August, other countries followed, and he concluded that the United States was headed for a depression. He said so publicly, testifying before Congress and appearing that November on Wall Street Week with Louis Rukeyser, then the most watched program in American financial television. He was emphatically wrong. The Federal Reserve's easing set off one of the longest bull markets in history. Dalio lost his own money and his clients' money, had to let go of nearly everyone he had hired until he was effectively alone, and borrowed four thousand dollars from his father to cover family bills. He has called it the most painful and most valuable experience of his career, the thing that replaced the question of whether he was right with the question of how he knew he was right. Out of it came the habits that defined the firm: writing down every decision rule so it could be tested against outcomes, actively hunting for the smartest people who disagreed with him, and diversifying across genuinely uncorrelated bets rather than concentrating on a single view.\n\nThe rebuilt firm ran on those systematized rules. Pure Alpha, launched in 1991, separated active macro bets from market exposure and became Bridgewater's flagship. All Weather, launched in 1996 and originally built to hold Dalio's own family trust assets, balanced risk rather than capital across asset classes and popularized what the industry now calls risk parity. Bridgewater grew into the largest hedge fund in the world by assets under management by the mid 2000s, at its peak overseeing well above one hundred and fifty billion dollars for pension funds, sovereign wealth funds, endowments and central banks. Dalio stepped out of the operating business in stages. He gave up the chief executive title in 2011 and left the co chief executive role in 2017. On September 30, 2022, he transferred his voting rights to Bridgewater's board and stepped down as a co chief investment officer, ending his control of the firm. In July 2025 he sold his remaining equity stake and separated entirely, staying on as a mentor and an investor in the firm's strategies while running the Dalio Family Office. Bridgewater's hedge fund assets stood at about ninety two billion dollars as of the end of September 2025, a figure Forbes still carried in July 2026, and the firm has said it deliberately capped its size to preserve flexibility rather than gather assets.",
    "legacy": "Dalio's largest effect outside finance came from writing down how he decides. Principles: Life and Work, published in 2017 after a free self published version had circulated for years, set out several hundred numbered rules covering how to face reality, how to learn from pain, and how to run an organization. It reached number one on the New York Times business list and became a fixture on founders' shelves. Bridgewater's operating model is built on what Dalio calls an idea meritocracy, which he defines as radical truth plus radical transparency plus believability weighted decision making. In practice that meant taping almost every meeting, rating colleagues on visible scorecards, and expecting people to criticize each other, including the founder, to their faces. He has argued for four decades that this is the only reliable way to find out what is actually true. The culture is genuinely contested. Admirers, including many chief executives who have copied parts of it, describe it as the most honest workplace they have encountered. Critics describe something harsher. A former employee's complaint characterized the firm as a place of fear and intimidation, outside observers have compared its confrontational meetings to struggle sessions, and the journalist Rob Copeland's 2023 book The Fund argued that the transparency system produced surveillance and fear rather than truth. Dalio rejected the book as fiction presented as fact and Bridgewater called it a false depiction of its past. No lawsuit followed. Both accounts are on the public record and neither has been settled.\n\nHis second lasting contribution is public economic education. In 2013 he published How the Economic Machine Works, a thirty minute animated video that reduces an economy to productivity growth, a short term debt cycle and a long term debt cycle, and released it free in many languages. He followed the same pattern with Principles for Navigating Big Debt Crises in 2018, a study of forty eight debt crises released as a free PDF on the tenth anniversary of the 2008 collapse, and with Principles for Dealing with the Changing World Order in 2021, which traced the rise and decline of the Dutch, British and American reserve currency empires across five hundred years and argued that the period ahead would look unlike anything in living memory though familiar from history. How Countries Go Broke followed in 2025. Taken together the books, the video and the essays he publishes directly to his own channels made a hedge fund founder into one of the most widely read popular explainers of debt, currencies and the mechanics of national decline, a role he now occupies full time.",
    "notableQuotes": [
      "Pain + Reflection = Progress.",
      "The two biggest barriers to good decision making are your ego and your blind spots.",
      "Rather than thinking, 'I'm right,' I started to ask myself, 'How do I know I'm right?'",
      "I gained a humility that I needed in order to balance my audacity.",
      "If you're not failing, you're not pushing your limits, and if you're not pushing your limits, you're not maximizing your potential.",
      "Radical truth and radical transparency are fundamental to having a real idea meritocracy."
    ],
    "primarySources": [
      "Ray Dalio, Principles: Life and Work (Simon and Schuster, 2017). The complete numbered text is published by Dalio himself at https://www.principles.com/principles/, which was read directly and used to verify four of the quotations here",
      "Ray Dalio, Principles for Dealing with the Changing World Order: Why Nations Succeed and Fail (Avid Reader Press, 2021), and Principles for Navigating Big Debt Crises (Bridgewater, 2018), both also released free by the author",
      "Ray Dalio, How to build a company where the best ideas win, TED2017, April 2017, the on record source for his account of the 1982 failure and for two quotations here (https://www.ted.com/talks/ray_dalio_how_to_build_a_company_where_the_best_ideas_win)",
      "Ray Dalio, How the Economic Machine Works (2013), published by the author at https://www.economicprinciples.org, the source for his three force model of an economy",
      "Bridgewater Associates, Our Founder (https://www.bridgewater.com/our-founder), the firm's own account of the 1975 founding from a two bedroom New York apartment, the 1981 move to Connecticut, the 1985 World Bank mandate, and his role transitions",
      "Wikipedia, Ray Dalio (https://en.wikipedia.org/wiki/Ray_Dalio) and Bridgewater Associates (https://en.wikipedia.org/wiki/Bridgewater_Associates), for dates, fund launch years, assets under management figures, family details and the documented criticism of the firm's culture"
    ]
  },
  vervaeke: {
    slug: "vervaeke",
    occupation:
      "Cognitive scientist, psychologist, lecturer at the University of Toronto",

    fullName: "John Vervaeke",
    nationality: "Canadian",
    occupations: ["Cognitive scientist", "Psychologist", "Lecturer"],
    yearsActive: "1994 to present",
    notableWorks: [
      "Awakening from the Meaning Crisis (lecture series, 50 episodes)",
      "After Socrates (lecture series)",
      "Zombies in Western Culture: A Twenty-First Century Crisis (2017)",
      "Relevance realization (research programme)",
    ],

    earlyLife:
      "Vervaeke is Canadian and has spent his academic career at the University of Toronto, where he has taught in the Psychology department and the Cognitive Science programme since 1994. His scholarly work sits at the meeting point of cognitive science, philosophy, and the psychology of religion, and he has been recognised repeatedly for teaching rather than only for research, including the Students' Administrative Council and Association of Part-time Undergraduate Students Teaching Award in 2001 and the Ranjini Ghosh Excellence in Teaching Award in 2012.",

    career:
      "His research programme centres on relevance realization, an account of how a finite mind selects what matters from a combinatorially explosive world. The problem is a version of what artificial intelligence calls the frame problem: no rule can specify which rules to apply, yet human beings navigate open situations continuously. Vervaeke argues that relevance realization is not a rule or an algorithm but a self-organizing process that shapes a person's salience landscape, and that it can be trained. Around this he has built related work on general intelligence, mindfulness, metaphor, and wisdom.\n\nIn 2019 he released Awakening from the Meaning Crisis, a fifty part lecture series published free on YouTube, which traces the historical and cognitive roots of what he calls the meaning crisis, from the axial age through Christianity, the scientific revolution, and the collapse of the frameworks that connected people to meaning. It reached an audience far outside the university and is the work he is best known for. A second series, After Socrates, followed, focused on moving from dialectic into dialogos and on the cultivation of wisdom through practice. He co-authored the open access book Zombies in Western Culture with Christopher Mastropietro and Filip Miscevic in 2017, using the zombie figure to examine cultural alienation and the loss of shared frameworks.",

    legacy:
      "Vervaeke's contribution is to treat wisdom as a subject for cognitive science rather than for sentiment. By defining the meaning crisis in terms of specific cognitive machinery, and by distinguishing four irreducible kinds of knowing, he gave a generation of readers a vocabulary for a problem they could feel but not name. His insistence on an ecology of practices, where practices are chosen so they correct each other's failure modes, has been widely adopted by people building contemplative and educational programmes.",

    notableQuotes: [
      "We are suffering from a wisdom famine in the West.",
    ],
    primarySources: [
      "Awakening from the Meaning Crisis (lecture series, 2019)",
      "After Socrates (lecture series)",
      "Zombies in Western Culture: A Twenty-First Century Crisis (2017)",
    ],
  },
  pressfield: {
    slug: "pressfield",
    occupation: "Author of historical fiction, nonfiction, and screenplays",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Steven_Pressfield",

    fullName: "Steven Pressfield",
    birthDate: "1943",
    nationality: "American",
    occupations: ["Author", "Screenwriter"],
    notableWorks: [
      "The War of Art (2002)",
      "The Legend of Bagger Vance (1995)",
      "Gates of Fire (1998)",
      "Turning Pro (2012)",
      "Do the Work (2011)",
    ],

    earlyLife:
      "Pressfield served in the United States Marine Corps and then spent a long stretch of years working ordinary jobs while trying to write. He has been candid that this period lasted about seventeen years before he sold anything, and that the failure was not a shortage of ideas but an inability to sit down and finish. That experience is the source of everything he later wrote about Resistance, and it is why he writes about the subject as a survivor rather than as an expert.",

    career:
      "His first published novel, The Legend of Bagger Vance, appeared in 1995 and was adapted into a film. Gates of Fire, his 1998 novel about the Spartans at Thermopylae, became required or recommended reading at several military institutions. He has continued to write historical fiction alongside his nonfiction.\n\nThe War of Art, published in 2002, is the book he is best known for. It is organised in three parts: a definition of Resistance as the force that opposes creative work, an argument that the cure is to stop behaving as an amateur and turn professional, and a final section on the sources people draw on once the work is underway. Its form is unusual, a sequence of very short chapters, some only a paragraph long, which makes it read less like an argument than like a series of blows. He extended the case in Do the Work and Turning Pro.",

    legacy:
      "The War of Art gave a name to something people had felt without being able to describe, and Resistance has passed into general use among writers, founders, and artists well beyond readers of the book. Its central move, treating fear and self-doubt as navigational instruments rather than as verdicts, is now a common piece of creative advice, usually repeated without attribution.",

    notableQuotes: [
      "The more important a call or action is to our soul's evolution, the more Resistance we will feel toward pursuing it.",
      "Resistance is not out to get you personally.",
      "The amateur plays for fun. The professional plays for keeps.",
      "Nothing else matters except sitting down every day and trying.",
    ],
    primarySources: ["The War of Art (2002)", "Turning Pro (2012)", "Do the Work (2011)"],
  },
  hesse: {
    slug: "hesse",
    occupation: "Novelist, poet, Nobel laureate in Literature",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Hermann_Hesse",

    fullName: "Hermann Karl Hesse",
    birthDate: "2 July 1877",
    birthPlace: "Calw, Germany",
    deathDate: "9 August 1962 (aged 85)",
    deathPlace: "Montagnola, Switzerland",
    nationality: "German-Swiss",
    occupations: ["Novelist", "Poet", "Painter"],
    yearsActive: "1904 to 1962",
    notableWorks: [
      "Siddhartha (1922)",
      "Steppenwolf (1927)",
      "Demian (1919)",
      "Narcissus and Goldmund (1930)",
      "The Glass Bead Game (1943)",
    ],
    awards: ["Nobel Prize in Literature (1946)"],

    earlyLife:
      "Hesse was born in Calw in 1877 into a family of missionaries and scholars, and was expected to enter the clergy. He rebelled against that expectation early and painfully, fleeing a seminary, and spent his adolescence in conflict with the institutions arranged around him. He worked as a bookseller before he was able to write full time. That early collision between an inherited vocation and an unwilling temperament is the pattern his novels return to repeatedly.",

    career:
      "His early novels found an audience in Germany, but the First World War and a series of personal collapses, including the illness of his wife and the death of his father, brought him to a breakdown. He entered psychoanalysis with a student of Jung, and the work that followed was different in kind: inward, mythic, and concerned with individuation rather than with social life.\n\nSiddhartha, published in 1922 and dedicated to Romain Rolland, came out of that period and out of a long interest in Indian religious thought, which he had grown up around and travelled to see. It follows a Brahman's son through asceticism, sensuality, wealth, despair, and finally a life as a ferryman, and it turns on a refusal: its seeker meets the Buddha, judges the teaching perfect, and declines to become a follower. Hesse continued in this vein with Steppenwolf and Narcissus and Goldmund, and completed The Glass Bead Game in 1943. He was awarded the Nobel Prize in Literature in 1946 and lived his last decades quietly in Switzerland.",

    legacy:
      "Siddhartha found its largest audience decades after publication, among readers in the 1960s and after who took its argument about self-discovery as permission to leave the paths arranged for them. That reception has been both its fortune and its distortion: the book is frequently read as a licence to wander, when its actual claim is stricter and less comfortable, that wisdom cannot be received from anyone and that the years a person writes off as failure may be the ones that did the work.",

    notableQuotes: [
      "Knowledge can be conveyed, but not wisdom.",
      "I can think. I can wait. I can fast.",
    ],
    primarySources: ["Siddhartha (1922)", "Steppenwolf (1927)", "Demian (1919)"],
  },
  senra: {
    slug: "senra",
    occupation: "Podcast host, creator of Founders Podcast",

    fullName: "David Senra",
    nationality: "American",
    occupations: ["Podcast host", "Writer"],
    yearsActive: "2016 to present",
    notableWorks: [
      "Founders Podcast (2016 to present, 400+ episodes)",
      "David Senra interview series, a companion long form interview feed",
    ],

    earlyLife:
      "Senra is the son of a Cuban immigrant family and grew up in Florida. He was the first in his family to graduate college, attending the University of Central Florida at night while working full time. Before podcasting he ran small businesses, including boat and car detailing and a startup that traced the origin of robocalls.",

    career:
      "Senra started Founders Podcast in 2016, recording alone in his Miami kitchen with a hundred dollar microphone. For roughly five and a half years the show had almost no audience. His method has stayed the same throughout: he reads one founder biography at a time, annotates the physical book by hand with a pen and a six inch ruler, photographs the annotated pages, and records his synthesis from those highlights with no outline and no co-host, a format he has described as sashimi style, no intro music, starting cold. He has read and narrated more than four hundred founder biographies this way. He later added a second, interview format feed under the same Founders Podcast banner, in which he talks with living founders and operators rather than reading about historical ones. He has said he turned down a reported eight figure acquisition offer, and that he does not want the show to reach the scale of the largest interview podcasts, preferring a dense audience of working founders over mass reach.",

    legacy:
      "Founders Podcast has become a fixture in the daily routine of a number of well known operators and investors, several of whom have appeared as guests on the interview feed. Its central contribution is less any single idea than a method: reading a founder's own words instead of secondhand accounts of them, testing every subject against the same handful of questions regardless of era or industry, chiefly whether belief preceded any evidence that justified it, and whether the founder was actually chasing control rather than money.",

    notableQuotes: [
      "Mute the world and then build your own.",
      "I don't think of it as a business. I think of it as an obsession that just happens to generate money.",
    ],
    primarySources: [
      "Founders Podcast (2016 to present)",
      "David Senra interview series",
    ],
  },
  sivers: {
    slug: "sivers",
    occupation: "Writer, founder of CD Baby",

    fullName: "Derek Sivers",
    birthDate: "1969",
    birthPlace: "Berkeley, California",
    nationality: "American",
    occupations: ["Writer", "Entrepreneur", "Musician", "Programmer"],
    yearsActive: "1990 to present",
    notableWorks: [
      "Anything You Want (2011, expanded 2022)",
      "Your Music and People (2020)",
      "Hell Yeah or No (2020)",
      "How to Live (2021)",
      "Useful Not True (2024)",
    ],

    earlyLife:
      "Sivers was born in 1969 in Berkeley, California, and moved almost every year for his first six years following his physicist father's work. He began music training at seven and programming at nine, and decided at fourteen he wanted to be a professional musician. He studied at Berklee College of Music in Boston, graduating in 1990, and spent a decade as a circus ringleader and musician alongside his early music career, including a 1992 tour of Japan and Europe as Ryuichi Sakamoto's guitarist.",

    career:
      "In 1998 Sivers built a webpage to sell his own CD, and when friends asked him to sell theirs too, CD Baby grew almost by accident into the largest online seller of independent music, eventually serving over 150,000 musician clients and 100 million dollars in sales. In 2008 he sold the company for 22 million dollars, but not directly: he first transferred ownership into the Independent Musicians Charitable Trust, then had the trust complete the sale, so the proceeds fund music education causes rather than his own accounts. He has given four TED talks with over seven million combined views. Since 2011 he has written five short, self published books, each under 135 pages, distilling specific lessons from founding and selling CD Baby into standalone arguments: that execution multiplies ideas rather than the reverse, that a decision worth making should feel like a hell yeah, that contradictory ways of living can both be true at once, and most recently that a belief is worth holding not because it is true but because it is useful.",

    legacy:
      "Sivers turned one company's origin story into five distinct short books rather than one long memoir, each built around a single reusable claim rather than a general account of his career. His decision to route CD Baby's sale through a charitable trust, giving away money he could have kept, is frequently cited alongside his writing as evidence the ideas are not merely marketing for a personal brand. He does not currently have a standalone Wikipedia article, a 2022 deletion discussion found insufficient independent secondary coverage, so his own site, sive.rs, remains the most complete record of his own work.",

    notableQuotes: [
      "If you're not saying HELL YEAH about something, say no.",
      "Ideas are just a multiplier of execution. The most brilliant idea is worthless with no execution.",
      "Everybody's ideas seem obvious to them.",
    ],
    primarySources: [
      "Anything You Want (2011, expanded 2022)",
      "How to Live (2021)",
      "Useful Not True (2024)",
    ],
  },
  visakan: {
    slug: "visakan",
    occupation: "Writer",

    fullName: "Visakan Veerasamy",
    birthDate: "1990",
    nationality: "Singaporean",
    occupations: ["Writer"],
    yearsActive: "2005 to present",
    notableWorks: [
      "Friendly Ambitious Nerd (2020)",
      "1000wordvomits (ongoing since 2012, a commitment to 1,000 unedited essays)",
      "frame studies (ongoing Substack, formerly voltaic verses)",
    ],

    earlyLife:
      "Veerasamy was born in 1990 in Singapore and began blogging in 2005, writing initially about Singapore politics and current affairs through his early twenties before turning toward psychology, ambition, and self expression. He was the first marketing hire and blog editor at ReferralCandy, a Singapore based marketing company, where he grew the company blog from roughly two thousand to over one hundred thirty thousand monthly hits between 2013 and 2018, and co-founded Statement.sg, a Singaporean apparel brand.",

    career:
      "He left ReferralCandy in 2018 to write full time, continuing a project he started in 2012 called 1000wordvomits, a public commitment to write one thousand unedited essays of at least one thousand words each; as of 2026 he remains short of completing it. In 2020 he self published Friendly Ambitious Nerd, an edited collection of his best essays and threads from over a decade of writing, and coined the phrase as a name for a specific identity, someone smart, striving, and a little awkward, who wants to build things and be liked without yet believing both are possible. His current project, published under the name frame studies, examines how a person's frameworks rather than the facts in front of them determine what they are able to see and do.",

    legacy:
      "Veerasamy has no traditionally published book and no standalone Wikipedia article; his primary body of work lives entirely on his own site and in roughly a quarter million tweets, an unusually large first person corpus for a writer working almost entirely outside traditional publishing. His recurring contribution is less a single argument than a stance: that writing unedited, in public, over many years, is itself a legitimate method for figuring out who you are, not only a way of sharing a conclusion already reached.",

    notableQuotes: [
      "Greatness is deviance from the norm, ie insanity.",
      "Nobody achieves greatness without passing through the crucible of cringe.",
      "Live your life like you're in a heroic anime, jrpg. Make friends. Help people on their side quests.",
    ],
    primarySources: [
      "Friendly Ambitious Nerd (2020)",
      "visakanv.com essay archive",
    ],
  },
};

export function getProfile(slug: string): Profile | undefined {
  return profiles[slug];
}
