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
  wikipediaUrl: string;

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
      "In 1863 Rockefeller and partners entered the oil refining business in Cleveland, recognizing that refining — not drilling — was where the durable margins lived. He incorporated Standard Oil on January 10, 1870. Through what became known as the Cleveland Massacre of February 1872, he acquired 22 of 26 competing refiners in six weeks, paying generously in Standard Oil stock and cash. By 1879 his company refined 90% of all American oil. He built the first true vertical-and-horizontal industrial monopoly: pipelines, tankers, barrels, and retail. The Sherman Antitrust Act of 1890 was passed largely in response to him, and the U.S. Supreme Court ordered Standard Oil dissolved in 1911 — but the breakup multiplied his wealth, since he held stock in every successor company.",

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
      "Franklin was born in Boston on January 17, 1706, the fifteenth of seventeen children of Josiah Franklin, a candle and soap maker. He attended Boston Latin School for two years before leaving school at age ten to work in his father's shop. At twelve he was apprenticed to his older brother James, a printer. He taught himself to write by dissecting essays in The Spectator: he would read a piece, make brief notes, set it aside for several days, then try to reconstruct the original from his notes — and compare the result to the model. He read voraciously and at sixteen began submitting essays to his brother's newspaper under the pseudonym Silence Dogood. After clashing with James, he ran away to Philadelphia at seventeen with almost nothing in his pockets.",

    career:
      "By age thirty Franklin owned the most successful printing operation in the colonies, publishing the Pennsylvania Gazette and the wildly popular Poor Richard's Almanack. He retired from the print business at forty-two, financially independent enough never to need to work again — and used that freedom for the rest of his life. He proved that lightning is electricity with the famous kite experiment of 1752, invented the lightning rod, bifocals, and the Franklin stove, founded the first lending library in America, the first volunteer fire company, the first public hospital, and what became the University of Pennsylvania. As ambassador to France from 1776 to 1785, he secured the alliance that won American independence — charming the French court while wearing a simple fur cap instead of powdered wigs. He helped draft the Declaration of Independence and was the oldest delegate to the Constitutional Convention at age 81.",

    legacy:
      "Franklin died in Philadelphia on April 17, 1790, at age 84. Twenty thousand people attended his funeral. He had reinvented himself across at least seven distinct careers — printer, author, scientist, postmaster, philanthropist, diplomat, statesman — and produced one of the most influential autobiographies ever written. The 13 Virtues system he designed at twenty became the template for modern habit tracking; the Junto society he founded at twenty-one became the template for the modern peer-improvement group. His face appears on the U.S. $100 bill.",

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
      "Musk has articulated a five-step manufacturing algorithm — question every requirement, delete any part you can, simplify, accelerate cycle time, automate last — that has become an influential industrial framework outside Tesla and SpaceX. His stated goal of making humanity a multiplanetary species has driven Starship development. He remains one of the most controversial public figures of his era: admired as the most aggressive engineering executive of the twenty-first century, criticized for labor practices, his behavior on X, and his political pronouncements.",

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
      "Alexander was born in Pella, the capital of the Kingdom of Macedon, in late July 356 BC, the son of King Philip II and Queen Olympias of Epirus, who claimed descent from Achilles. Plutarch records that on the night of his birth the Temple of Artemis at Ephesus burned down — an omen the priests interpreted as the birth of a destroyer. From age thirteen to sixteen he was tutored by Aristotle at the Temple of the Nymphs at Mieza, where he studied philosophy, medicine, and scientific inquiry, and developed the lifelong love of Homer that led him to carry an annotated copy of the Iliad on every campaign. At twelve he tamed the wild stallion Bucephalus by realizing the horse was afraid of his own shadow; the horse carried him through every major battle for the next twenty years. At eighteen, commanding the Macedonian cavalry at the Battle of Chaeronea (338 BC), he shattered the elite Theban Sacred Band.",

    career:
      "When Philip II was assassinated in 336 BC, Alexander seized the throne at age twenty and consolidated control of Greece. In 334 BC he crossed the Hellespont into Asia with roughly 48,000 infantry and 6,000 cavalry, beginning the campaign that would destroy the Persian Empire. He defeated Darius III at the Battle of the Granicus (334 BC), the Battle of Issus (333 BC), and finally at Gaugamela (331 BC), where outnumbered roughly four to one he led the Companion Cavalry directly at the Persian king. He took Tyre after a seven-month siege by building a causeway across the strait — the mole still stands today as a peninsula. He founded Alexandria in Egypt in 331 BC, was crowned Pharaoh, then pushed across the Hindu Kush, defeated King Porus on the banks of the Hydaspes despite war elephants, and reached the Beas River in modern Punjab. There, after eight years and 11,000 miles, his troops refused to march further. He turned back through the Gedrosian Desert in one of the most catastrophic marches in military history.",

    legacy:
      "Alexander died in Babylon on the evening of 10 or 11 June 323 BC at age 32, after a fever following heavy drinking — possibly typhoid, possibly malaria, possibly poisoning, the question is still debated. When asked to whom he left his empire, he reportedly replied: “To the strongest.” His generals immediately fought a series of wars (the Wars of the Diadochi) that broke the empire into the Hellenistic kingdoms — Ptolemaic Egypt, the Seleucid Empire, Antigonid Macedon — which spread Greek language, philosophy, and civic institutions from the Mediterranean to the borders of India for the next three centuries. Twenty cities he founded survive in some form, including Alexandria, Egypt — still the second-largest city in Egypt today.",

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
      "In 1985 Deutsch published “Quantum theory, the Church-Turing principle and the universal quantum computer” — the foundational paper that defined the quantum Turing machine and effectively founded the field of quantum computation. With Richard Jozsa he produced the Deutsch–Jozsa algorithm in 1992, one of the first quantum algorithms exponentially faster than any classical counterpart. His first book, The Fabric of Reality (1997), argued that four strands — quantum physics (the multiverse), epistemology (Popper's conjecture-and-criticism), evolution (Darwin), and computation (Turing) — are deeply intertwined. His second book, The Beginning of Infinity (2011), argues that good explanations — ones that are hard to vary while still accounting for what they explain — are the engine of unbounded human progress. In 2012, with Chiara Marletto, he proposed constructor theory, an attempt to reformulate physics in terms of which transformations are possible and which are not.",

    legacy:
      "Deutsch is a Fellow of the Royal Society, won the Isaac Newton Medal in 2017, and shared the 2022 Breakthrough Prize in Fundamental Physics for foundational work on quantum information. The Beginning of Infinity has become a touchstone text for a generation of technologists and entrepreneurs as a defense of definite optimism — the view that all problems are soluble unless forbidden by the laws of physics, and that pessimism is bad epistemology, not realism.",

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
      "Lee co-founded the People's Action Party (PAP) in 1954 and led it to victory in the 1959 election, becoming Prime Minister of Singapore at age 35 — the youngest in the Commonwealth. Singapore merged with Malaysia in 1963 but was expelled on August 9, 1965; Lee broke down in tears on television. He was 42 years old, leading a tiny island of 1.9 million with no natural resources, no army, and uncertain water supply. Over the next three decades he attracted multinationals through low taxes, English-language education, and rule of law; built corruption-free government via the Corrupt Practices Investigation Bureau; created mass homeownership through the Housing & Development Board (HDB) and Central Provident Fund (CPF); and enforced multiracialism and meritocracy. Singapore went from a GDP per capita of $516 in 1965 to over $80,000 today, one of the highest in the world. He stepped down as Prime Minister in 1990 after 31 years and continued as Senior Minister and Minister Mentor.",

    legacy:
      "Lee's wife Geok Choo, his partner of sixty years, died in 2010. He died on March 23, 2015, at age 91. Over a million Singaporeans lined the funeral route in the rain. He is among the most studied and emulated nation-builders of the twentieth century: Deng Xiaoping sent successive Chinese delegations to Singapore to study his model, and figures from Henry Kissinger to Margaret Thatcher to Bill Clinton sought his counsel. His doctrine of pragmatic, results-tested governance — “Does it work? Let's try it. If it doesn't work, toss it out.” — remains influential in policy circles and in private-sector leadership alike.",

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
      "Marcus was born in Rome on April 26, 121 AD, into a prominent senatorial family, originally named Marcus Annius Verus. The emperor Hadrian noticed him as a serious, honest boy and set in motion the succession that would eventually bring him to the throne, arranging his adoption into the family of Antoninus Pius. He was given the finest education in Rome — rhetoric under the famous orator Fronto — but the decisive influence was philosophy. His tutor Junius Rusticus put into his hands the Discourses of Epictetus, a former slave whose Stoicism became the foundation of Marcus's thought. He reportedly wore the rough cloak of a philosopher and slept on the ground as a young man, to the alarm of his mother.",

    career:
      "Marcus became emperor in 161 AD on the death of Antoninus Pius, and immediately did something unusual: he insisted on ruling jointly with his adoptive brother, Lucius Verus, until Verus died in 169. His reign was defined by crisis rather than triumph. The Antonine Plague — likely smallpox, brought back by returning legions — killed an estimated five million people across the empire. The Marcomannic Wars kept him for years on the cold Danube frontier, personally directing campaigns against the Germanic Quadi and Marcomanni. It was there, in military camp, writing in Greek and for no audience but himself, that he composed the twelve books we call the Meditations — private reminders on how to keep a just and undisturbed mind while carrying the heaviest responsibility in the world.",

    legacy:
      "Marcus died on March 17, 180 AD, aged 58, still on campaign. He is counted the last of the “Five Good Emperors,” and his death is often marked as the end of the Pax Romana. His one clear failure was his succession: he was followed by his son Commodus, whose unstable, tyrannical reign broke the long tradition of adoptive emperors and is conventionally treated as the beginning of Rome's decline. But the Meditations, never intended for publication, survived — and became the most widely read and practically applied work of philosophy ever written, the operating manual for anyone trying to stay sane, ethical, and undefeated under pressure.",

    notableQuotes: [
      "You have power over your mind — not outside events. Realize this, and you will find strength.",
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
      "Marc Andreessen was born July 9, 1971, in Cedar Falls, Iowa, and grew up in New Lisbon, Wisconsin, a town of about a thousand people. He taught himself BASIC on a Radio Shack TRS-80 in elementary school. He enrolled at the University of Illinois at Urbana-Champaign as an undergraduate computer science major, where he worked at the National Center for Supercomputing Applications (NCSA). In 1992–1993, working with Eric Bina, he co-created Mosaic — the first graphical web browser to display images inline with text and to run on common consumer operating systems. Mosaic, more than any other single piece of software, was the moment the World Wide Web became something ordinary people could see and use.",

    career:
      "In 1994, fresh out of college, Andreessen partnered with Jim Clark, the founder of Silicon Graphics, to start Mosaic Communications Corporation, soon renamed Netscape Communications. Netscape Navigator became the dominant web browser of the mid-1990s. The company's IPO on August 9, 1995 — the stock opened at $28 and closed at $58.25 the same day, valuing Netscape at $2.9 billion despite having only modest revenue — is widely cited as the catalyst of the dot-com era. After the U.S. v. Microsoft antitrust suit and the bundling of Internet Explorer with Windows crushed Netscape's market share, AOL acquired Netscape in 1999 for $4.2 billion. Andreessen co-founded Loudcloud in 1999 (one of the earliest commercial cloud-services companies); after the dot-com bust, the company pivoted into Opsware and sold to Hewlett-Packard in 2007 for $1.6 billion. In 2009, Andreessen and Ben Horowitz founded Andreessen Horowitz (a16z) on the contrarian thesis that technical founders should be supported as CEOs of their own companies rather than replaced by professional managers. a16z grew into one of the largest venture firms in the world, with notable early investments in Facebook, Coinbase, Airbnb, GitHub, Lyft, Instagram, Skype, Slack, and Stripe.",

    legacy:
      "Andreessen's three signature essays — “Why Software Is Eating the World” (2011), “It's Time to Build” (2020), and “The Techno-Optimist Manifesto” (2023) — have each defined the discourse of their moment. He sits on the board of Meta (since 2008) and has remained one of the most public voices in technology and venture capital, prolific on Twitter / X and on the a16z podcast. He is married to Laura Arrillaga-Andreessen, a Stanford professor and philanthropist; they have one son.",

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
      "Israeli Defense Forces — Naval officer, 5 years",
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
      "Adam Neumann was born April 22, 1979, in Tel Aviv, Israel. His parents — both physicians — divorced when he was seven. He spent parts of his childhood in Indianapolis and then on Kibbutz Nir Am in southern Israel, where the communal model of living and shared infrastructure later became part of the WeWork pitch. After high school he served five years as an officer in the Israeli Navy. In 2001 he moved to New York City to live with his sister, the model Adi Neumann, and enrolled at Baruch College's Zicklin School of Business, leaving before completing his degree. His earliest entrepreneurial attempts — collapsible high-heeled shoes, and Egg Baby, a line of baby clothing with built-in knee pads — did not scale.",

    career:
      "In 2008 Neumann co-founded GreenDesk, an environmentally conscious co-working space in Brooklyn, with the architect Miguel McKelvey. They sold GreenDesk and in 2010 launched WeWork at 154 Grand Street in SoHo. WeWork's pitch was distinctive from day one: it sold workspaces not as real estate but as membership in a community — a curated aesthetic, free beer, member events, and the stated mission of “elevating the world's consciousness.” The model attracted aggressive growth capital. By 2014 WeWork was a unicorn; by 2017 SoftBank's Masayoshi Son committed billions through the Vision Fund. By January 2019 the private valuation reached $47 billion — among the highest in the world for a private company. In August 2019 WeWork filed an S-1 to go public. The S-1 made public for the first time the company's unit economics, governance entanglements, and the non-GAAP metric “Community-Adjusted EBITDA.” Public investors rejected the offering; the IPO was withdrawn; within six weeks of the filing Neumann was ousted as CEO. SoftBank paid him approximately $1.7 billion to exit. WeWork eventually went public via SPAC at a fraction of the peak valuation, and filed for Chapter 11 bankruptcy protection in November 2023.",

    legacy:
      "In 2022 Neumann founded Flow, a residential real estate company applying community-driven design to apartment living; Andreessen Horowitz led the seed round with $350 million, the largest single check in a16z's history. Neumann's career is widely studied — in business schools, in books such as Reeves Wiedeman's *Billion Dollar Loser* (2020) and Eliot Brown and Maureen Farrell's *The Cult of We* (2021), and in Apple TV+'s *WeCrashed* (2022) — as both an exemplar of narrative-driven valuation building and a cautionary tale about what happens when story outruns unit economics. He is married to Rebekah Paltrow Neumann; the couple has six children and lives primarily in Miami.",

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
    deathPlace: "Rome — forced suicide by order of Emperor Nero",
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
      "Epistulae Morales ad Lucilium (Letters to Lucilius / Letters from a Stoic) — 124 surviving letters",
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
      "Seneca was born around 4 BC in Corduba, the chief city of the Roman province of Hispania Baetica, into the wealthy equestrian Annaeus family. His father, Seneca the Elder, was a celebrated teacher of rhetoric whose textbooks have partly survived; his mother, Helvia, came from a respected provincial family. He was brought to Rome as a child by his aunt and educated in the city — first in rhetoric in the family tradition, then in philosophy under the Stoic Attalus, the Sextian school philosopher Sotion (whose teaching of Pythagorean vegetarianism Seneca followed for a time), and Papirius Fabianus. He suffered from respiratory illness, almost certainly asthma, from his youth and credited philosophy with helping him survive it. His brothers were Junius Gallio (proconsul of Achaea, mentioned in the New Testament Acts of the Apostles for declining to hear charges against the apostle Paul) and Mela, father of the poet Lucan.",

    career:
      "Seneca entered the Roman Senate under Tiberius or Caligula and was a successful advocate when Claudius came to power in AD 41 and exiled him to Corsica on charges (probably trumped up) of adultery with Julia Livilla. He spent eight years in exile, writing the *Consolations* (to his mother Helvia, to Polybius, to Marcia). In AD 49 Agrippina the Younger arranged his recall to Rome to tutor her twelve-year-old son Lucius Domitius Ahenobarbus — soon to become Emperor Nero. After Nero's accession in AD 54, Seneca and the Praetorian prefect Sextus Afranius Burrus effectively co-managed the state through what later historians called the *Quinquennium Neronis*, the five-good-years of Nero's reign. Seneca composed Nero's first speech to the Senate, drafted policy, and authored most of his surviving moral and philosophical works during these years, including the *Letters to Lucilius* and *On the Shortness of Life*. He also accumulated extraordinary personal wealth — perhaps the largest private fortune of his era — which his enemies (Suillius Rufus, then later Cassius Dio) used to charge him with hypocrisy.",

    legacy:
      "By AD 62 Burrus was dead and Seneca had effectively retired, though he could not extract himself fully. In AD 65, Nero accused him of complicity in the Pisonian conspiracy on thin evidence and ordered him to take his own life. Tacitus's *Annals* describes the death in detail: Seneca opened his veins, then took hemlock when blood loss was too slow, and finally was carried into a steam bath where he suffocated, dictating final words to scribes. His wife Pompeia Paulina attempted to die with him but was kept alive on Nero's order. Seneca's letters became the most-read philosophical text in the medieval European tradition; Augustine, Erasmus, Montaigne, and Petrarch each treated him as a near-Christian moralist. His prose style — short, paradoxical, aphoristic — shaped European essay-writing through Bacon. The *Epistulae Morales* and *On the Shortness of Life* remain the most accessible Stoic texts ever produced and the entry point most modern readers take into the school.",

    notableQuotes: [
      "It is not that we have a short time to live, but that we waste much of it.",
      "While we are postponing, life speeds by.",
      "Begin at once to live, and count each separate day as a separate life.",
      "Anger, if not restrained, is frequently more hurtful to us than the injury that provokes it.",
      "He who is brave is free.",
      "No servitude is more disgraceful than that which is self-imposed.",
    ],
    primarySources: [
      "Letters from a Stoic (Epistulae Morales ad Lucilium) by Seneca — Robin Campbell translation (Penguin, 1969) and the Loeb Classical Library three-volume edition",
      "On the Shortness of Life (De Brevitate Vitae) by Seneca — C. D. N. Costa translation (Penguin Great Ideas, 2004)",
      "Dialogues and Essays by Seneca — John Davie translation (Oxford World's Classics, 2007)",
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
      "University College London (UCL), 1980–1983 — enrolled to read biology, switched to philosophy after about two weeks, graduating with a lower-second-class (2:2) honours degree in philosophy"
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
      "The Office (BBC, 2001–2003) — co-created and co-written with Stephen Merchant; Gervais played David Brent",
      "Extras (BBC/HBO, 2005–2007) — co-created with Stephen Merchant; Gervais played Andy Millman",
      "After Life (Netflix, 2019–2022) — created, written, directed by and starring Gervais",
      "Derek (Channel 4, 2012–2014) — written, directed by and starring Gervais",
      "The Ricky Gervais Show (2005 podcast; HBO animated series, 2010–2012) — with Stephen Merchant and Karl Pilkington",
      "Netflix stand-up specials: Humanity (2018), SuperNature (2022), Armageddon (2023), Mortality (2025)"
    ],
    "spouses": [
      "Jane Fallon (partner, 1982–present)"
    ],
    "netWorth": "Estimated at roughly US$160 million as of 2025 (Celebrity Net Worth); figures vary by source, currency, and year and should be treated as approximate",
    "earlyLife": "Ricky Dene Gervais was born on 25 June 1961 in Reading, Berkshire, the youngest of four children. His father, Lawrence Raymond \"Jerry\" Gervais (1919–2002), was a labourer of Franco-Ontarian (French-Canadian) descent who met Gervais's mother while stationed in England during the Second World War; his mother, Eva Sophia (née House; 1925–2000), was English. He grew up on a council estate and attended Whitley Park Infants and Junior Schools and Ashmead Comprehensive School in Reading. In 1980 he went to University College London, initially to read biology but switching to philosophy after about two weeks, and graduated in 1983 with a lower-second-class honours degree. An atheist and humanist, Gervais has cited his philosophical education and scientific outlook as central to his comedy and public persona.",
    "career": "Before his breakthrough, Gervais worked a variety of jobs, including a brief pre-fame stint managing the band Suede and roughly seven years in an office administrative role that later fed his observational comedy. His major success came with The Office, a mockumentary sitcom co-created and co-written with Stephen Merchant for BBC Two, which ran for two series and two Christmas specials between 2001 and 2003. Gervais starred as the self-deluded middle manager David Brent, a character whose comedy derives from the gap between his self-perception and how others see him. The series won multiple BAFTA Awards and a Golden Globe, and its format was adapted internationally, most successfully as the American version of The Office, for which Gervais served as an executive producer.\n\nGervais and Merchant followed with Extras (2005–2007), in which Gervais played struggling actor Andy Millman, and Life's Too Short (2011–2013). Gervais then wrote, directed and starred in Derek (2012–2014) and created the Netflix series After Life (2019–2022), a solo project about a grieving widower that he wrote, directed, executive-produced and starred in across three series. Alongside television, The Ricky Gervais Show began in 2005 as a podcast with Merchant and Karl Pilkington — certified by Guinness World Records as the most-downloaded podcast in 2006 — and was later adapted into an animated HBO series (2010–2012).\n\nGervais built a parallel career in stand-up comedy, touring shows including Animals (2003), Politics (2004), Fame (2007) and Science (2010) before a series of Netflix specials: Humanity (2018), SuperNature (2022), Armageddon (2023) and Mortality (2025). He also hosted the Golden Globe Awards five times (2010, 2011, 2012, 2016 and 2020), where his acerbic monologues drew wide attention. His accolades include seven BAFTA Television Awards, two Primetime Emmy Awards, and Golden Globe wins, including consecutive awards for Best Performance in Stand-Up Comedy on Television for Armageddon (2024) and Mortality (2026).",
    "legacy": "Gervais is widely regarded as one of the most influential figures in modern British comedy, credited with popularising the mockumentary sitcom format through The Office, whose David Brent became a defining example of cringe comedy built on a character's blind spots and naturalistic performance. His work has been recognised with BAFTA, Emmy and Golden Globe awards, and formats he co-created have been remade around the world. He has also become a prominent and frequently controversial public voice on free speech and the limits of comedy, arguing that offence is \"the collateral damage of free speech\" and distinguishing the subject of a joke from its target. His later projects, particularly After Life, broadened his reputation to include more openly emotional and reflective work, while his Netflix stand-up specials and Golden Globes hosting cemented his standing as a global comedic figure.",
    "notableQuotes": [
      "Offence is the collateral damage of free speech.",
      "Most offence comes from when people mistake the subject of a joke with the actual target.",
      "The truth is more devastating than a lie."
    ],
    "primarySources": [
      "The Office (BBC Two, 2001–2003) — series co-created, co-written and co-directed by Ricky Gervais and Stephen Merchant",
      "Extras (BBC/HBO, 2005–2007) — series co-created by Ricky Gervais and Stephen Merchant",
      "After Life (Netflix, 2019–2022) — series created, written and directed by Ricky Gervais",
      "Ricky Gervais: Humanity (Netflix, 2018), SuperNature (2022), Armageddon (2023) and Mortality (2025) — stand-up specials",
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
    "deathPlace": "Sancellemoz sanatorium, Passy, Haute-Savoie, France — aplastic anaemia attributed to prolonged ionizing-radiation exposure",
    "nationality": "Polish and French",
    "education": [
      "Clandestine 'Flying University' (Uniwersytet Latający), Warsaw, which admitted women barred from formal Polish higher education under Russian rule (c. 1885–1889)",
      "Licence in physics, University of Paris (the Sorbonne), 1893 — ranked first in her class",
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
      "Recherches sur les substances radioactives (doctoral thesis, 1903) — established radioactivity as an atomic property",
      "Discovery of the elements polonium (July 1898) and radium (December 1898)",
      "Isolation of pure radium chloride and determination of radium's atomic weight (1902)",
      "Pierre Curie (1923) — her biography of her husband, containing autobiographical reflection",
      "Autobiographical Notes (1923) — first-person memoir published with the American editions",
      "Founding and direction of the Radium Institute; wartime mobile X-ray units, the 'petites Curies' (World War I)"
    ],
    "spouses": [
      "Pierre Curie (m. 1895; d. 1906)"
    ],
    "children": "2 — Irène and Ève",
    "parents": [
      "Władysław Skłodowski (physics and mathematics teacher)",
      "Bronisława Skłodowska (née Boguska; teacher and school director)"
    ],
    "awards": [
      "Nobel Prize in Physics, 1903 — shared with Pierre Curie and Antoine Henri Becquerel; first woman to win a Nobel Prize",
      "Nobel Prize in Chemistry, 1911 — sole laureate, for the discovery of radium and polonium and the isolation and study of radium; first person to win two Nobel Prizes and the only person to win Nobels in two different sciences",
      "Davy Medal, Royal Society (London), 1903 — jointly with Pierre Curie",
      "Matteucci Medal, 1904 — shared with Pierre Curie",
      "Elliott Cresson Medal, Franklin Institute (Philadelphia), 1909",
      "First woman professor at the University of Paris (Sorbonne), appointed 1906; first woman interred in the Panthéon on her own merits (reburial, 1995)"
    ],
    "earlyLife": "Maria Salomea Skłodowska was born on 7 November 1867 in Warsaw, then part of Congress Poland under Russian rule, the youngest of five children in a family of teachers. Her father, Władysław Skłodowski, taught physics and mathematics, and her mother, Bronisława, ran a girls' boarding school; the family's Polish patriotism and financial hardship shaped a childhood marked by both learning and loss. Barred as a woman from Poland's formal universities, she attended the clandestine, movable 'Flying University' in Warsaw and worked for several years as a governess to fund her sister Bronisława's medical studies in Paris, on a reciprocal pact by which Bronisława would later support her in turn.",
    "career": "In 1891 Skłodowska moved to Paris and enrolled at the Sorbonne, earning a licence in physics in 1893 (ranked first in her class) and one in mathematics in 1894. She met the physicist Pierre Curie, whom she married in a civil ceremony in 1895, and together they turned to the study of the rays recently observed by Henri Becquerel. Replacing Becquerel's fogged photographic plates with a sensitive piezoelectric-quartz electrometer, she measured radiation as an electric current and showed the effect to be an atomic property — coining the term 'radioactivity.' Finding that the mineral pitchblende was far more active than its uranium content could explain, she inferred, and then chased through fraction-by-fraction chemical separation, two previously unknown elements: polonium (named for her occupied homeland, Poland) and radium, both announced in 1898.\n\nOver roughly four years the Curies processed several tons of pitchblende residue by hand to isolate a decigram of pure radium chloride and determine radium's atomic weight, work that earned Marie her 1903 doctorate. That same year she, Pierre, and Becquerel shared the Nobel Prize in Physics, making her the first woman to receive a Nobel. The Curies declined to patent the radium-isolation process, publishing it freely so that radium — and the new medicine of radiotherapy — could be produced by anyone. After Pierre was killed in a Paris street accident in 1906, Marie took over his chair at the Sorbonne, becoming the first woman to hold a professorship there.\n\nIn 1911 she was awarded the Nobel Prize in Chemistry, for the discovery of radium and polonium and the isolation and study of radium, becoming the first person to win two Nobel Prizes and the only person to win them in two distinct sciences. She directed the newly founded Radium Institute in Paris, and during the First World War she organized France's first military radiology service, equipping and often personally driving mobile X-ray units — the 'petites Curies' — to the front. She continued to lead the Radium Institute until her death.",
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
      "Marie Curie, Pierre Curie (1923), trans. Charlotte & Vernon Kellogg — includes her Autobiographical Notes",
      "Marie Curie, Recherches sur les substances radioactives (doctoral thesis, 1903)",
      "The Nobel Prize official records and citations for the 1903 Physics and 1911 Chemistry prizes (NobelPrize.org)",
      "Ève Curie, Madame Curie: A Biography (1937) — the principal early biography, by her daughter",
      "Susan Quinn, Marie Curie: A Life (1995) — reputable modern scholarly biography"
    ]
  },
};

export function getProfile(slug: string): Profile | undefined {
  return profiles[slug];
}
