import franklinLibrary from "../data/passages/franklin.json" with { type: "json" };

// Passage libraries: a guide's own published words, split into short citable
// passages and searched per question. Unlike the synthesis notes (our
// summaries), these are the person's actual text, so the guide can quote it
// and the reader can check it. Only public-domain or otherwise cleared text
// belongs here. Franklin's is built by scripts/build_passages_franklin.py.

export type Passage = {
  id: string;
  title: string;
  kind: string;
  work: string;
  url: string;
  part: number;
  text: string;
};

const LIBRARIES: Record<string, Passage[]> = {
  franklin: franklinLibrary.passages as Passage[],
};

const STOP = new Set(
  "a about after all also am an and any are as at be because been but by can could did do does for from get had has have he her him his how i if in into is it its just me more my no not of on one or our out she should so some than that the their them then there these they this to up us was we were what when where which who why will with would you your".split(" "),
);

// People ask in today's words; the texts answer in their own. Each entry adds
// the period vocabulary a question's plain words should also search for.
const PERIOD_WORDS: Record<string, string[]> = {
  procrastinate: ["idleness", "sloth", "industry", "diligence", "lost", "time"],
  procrastinating: ["idleness", "sloth", "industry", "diligence", "lost", "time"],
  lazy: ["idleness", "sloth", "industry", "diligence"],
  productive: ["industry", "diligence", "order", "time"],
  productivity: ["industry", "diligence", "order", "time"],
  routine: ["order", "scheme", "hours", "day"],
  schedule: ["order", "scheme", "hours", "day"],
  habit: ["habitude", "virtue", "virtues", "resolution", "practice", "precept"],
  habits: ["habitude", "virtue", "virtues", "resolution", "practice", "precept"],
  discipline: ["resolution", "temperance", "order", "virtue"],
  money: ["wealth", "frugality", "industry", "riches", "credit", "debt"],
  rich: ["wealth", "riches", "frugality", "industry"],
  save: ["frugality", "saving", "expenses", "wealth"],
  saving: ["frugality", "expenses", "wealth"],
  spending: ["expenses", "frugality", "luxury", "extravagance"],
  debt: ["debts", "creditor", "creditors", "borrowing", "credit"],
  loan: ["debt", "creditor", "borrowing", "credit", "lender"],
  job: ["trade", "business", "employment", "calling", "master"],
  career: ["trade", "business", "employment", "calling"],
  business: ["trade", "shop", "customers", "credit", "partnership"],
  startup: ["business", "trade", "partnership", "printing"],
  boss: ["master", "employer", "governor"],
  cofounder: ["partner", "partnership", "partners"],
  partner: ["partnership", "partners"],
  network: ["acquaintance", "friends", "club", "junto"],
  networking: ["acquaintance", "friends", "club", "junto"],
  friends: ["friendship", "acquaintance", "companions", "junto"],
  argue: ["dispute", "disputing", "contradiction", "modest", "diffidence"],
  argument: ["dispute", "disputing", "contradiction", "modest", "diffidence"],
  persuade: ["persuasion", "modest", "diffidence", "opinion"],
  disagree: ["dispute", "contradiction", "opinion", "modest"],
  learn: ["reading", "study", "improvement", "books", "knowledge"],
  learning: ["reading", "study", "improvement", "books", "knowledge"],
  writing: ["prose", "style", "spectator", "essays", "composition"],
  write: ["prose", "style", "spectator", "essays", "composition"],
  health: ["temperance", "exercise", "diet", "air"],
  diet: ["temperance", "eating", "drinking", "vegetable"],
  sleep: ["dreams", "bed", "rest", "air"],
  anger: ["passion", "resentment", "temper", "tranquillity"],
  angry: ["passion", "resentment", "temper", "tranquillity"],
  anxious: ["tranquillity", "trifles", "uneasiness", "fear"],
  anxiety: ["tranquillity", "trifles", "uneasiness", "fear"],
  happy: ["happiness", "felicity", "content", "pleasure"],
  happiness: ["felicity", "content", "pleasure", "virtue"],
  mistake: ["errata", "error", "fault"],
  mistakes: ["errata", "errors", "faults"],
  regret: ["errata", "error", "fault", "repent"],
  ego: ["pride", "vanity", "humility"],
  pride: ["vanity", "humility"],
  marriage: ["wife", "marry", "married", "matrimony"],
  wife: ["marriage", "married", "deborah"],
  death: ["dying", "die", "life", "immortality"],
  grief: ["loss", "death", "affliction", "consolation"],
  old: ["age", "aged", "years"],
  religion: ["deity", "providence", "sect", "worship", "god"],
  god: ["deity", "providence", "worship"],
  kids: ["children", "son", "education", "youth"],
  children: ["son", "daughter", "education", "youth"],
  reputation: ["character", "credit", "appearances", "esteem"],
  honest: ["sincerity", "integrity", "truth", "justice"],
  science: ["experiments", "electricity", "philosophical", "observations"],
  invent: ["invention", "inventions", "stove", "experiments"],
  politics: ["assembly", "public", "governor", "province"],
  leadership: ["public", "projects", "assembly", "subscription"],
  community: ["public", "subscription", "library", "company", "junto"],
  goals: ["project", "scheme", "resolution", "perfection"],
  focus: ["order", "attention", "application", "industry"],
  failure: ["errata", "misfortune", "disappointment"],
  quit: ["leave", "left", "ran", "departure"],
  travel: ["voyage", "journey", "london", "ship"],
  slavery: ["slave", "slaves", "negro", "negroes", "servitude"],
  slave: ["slaves", "negro", "negroes", "servitude"],
};

function stem(word: string): string {
  if (word.length > 5 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith("ed")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) word = word.slice(0, -1);
  if (word.length > 4 && word.endsWith("e")) word = word.slice(0, -1);
  return word;
}

function tokens(text: string): string[] {
  return (text.toLowerCase().match(/[a-z']+/g) || []).map((w) => w.replace(/'/g, "")).filter((w) => w.length > 1 && !STOP.has(w));
}

type Index = { docs: { stems: Map<string, number>; length: number }[]; df: Map<string, number>; avg: number };
const indexes = new Map<string, Index>();

function indexFor(slug: string): Index | null {
  const passages = LIBRARIES[slug];
  if (!passages) return null;
  let index = indexes.get(slug);
  if (index) return index;
  const df = new Map<string, number>();
  const docs = passages.map((passage) => {
    const stems = new Map<string, number>();
    // The title counts three times: a letter "To Lord Kames" should surface for "Kames".
    const words = [...tokens(passage.text), ...tokens(passage.title), ...tokens(passage.title), ...tokens(passage.title)];
    for (const word of words) stems.set(stem(word), (stems.get(stem(word)) || 0) + 1);
    for (const key of stems.keys()) df.set(key, (df.get(key) || 0) + 1);
    return { stems, length: words.length };
  });
  index = { docs, df, avg: docs.reduce((sum, d) => sum + d.length, 0) / docs.length };
  indexes.set(slug, index);
  return index;
}

export function hasPassages(slug: string): boolean {
  return Boolean(LIBRARIES[slug]?.length);
}

export function passageCount(slug: string): number {
  return LIBRARIES[slug]?.length || 0;
}

/** BM25 over the guide's own text, with today's words expanded to period ones. */
export function retrievePassages(slug: string, query: string, limit = 6): Passage[] {
  const index = indexFor(slug);
  if (!index) return [];
  const passages = LIBRARIES[slug];
  const weights = new Map<string, number>();
  for (const word of tokens(query)) {
    weights.set(stem(word), Math.max(weights.get(stem(word)) || 0, 1));
    for (const extra of PERIOD_WORDS[word] || []) weights.set(stem(extra), Math.max(weights.get(stem(extra)) || 0, 0.6));
  }
  if (!weights.size) return [];
  const N = index.docs.length;
  const scored = index.docs.map((doc, i) => {
    let score = 0;
    for (const [term, weight] of weights) {
      const tf = doc.stems.get(term);
      if (!tf) continue;
      const idf = Math.log(1 + (N - (index.df.get(term) || 0) + 0.5) / ((index.df.get(term) || 0) + 0.5));
      score += weight * idf * ((tf * 2.4) / (tf + 1.4 * (0.25 + 0.75 * (doc.length / index.avg))));
    }
    return { i, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const picked: Passage[] = [];
  const perTitle = new Map<string, number>();
  for (const { i, score } of scored) {
    if (score <= 0 || picked.length === limit) break;
    const title = passages[i].title;
    if ((perTitle.get(title) || 0) >= 2) continue;       // spread across works
    perTitle.set(title, (perTitle.get(title) || 0) + 1);
    picked.push(passages[i]);
  }
  return picked;
}

/** The prompt block: the person's own words, each with its citation line. */
export function buildPassageGrounding(slug: string, query: string): string {
  const picked = retrievePassages(slug, query);
  if (!picked.length) return "";
  let block =
    "## Passages from your own writing\nThese are your actual published words, retrieved for this question. Prefer them over summaries. You may quote a short phrase exactly as written here, inside quotation marks, and cite it. Do not alter a quotation or quote anything that is not in these passages.\n";
  for (const passage of picked) {
    block += `\n### ${passage.title}\nCite as: [Source: "${passage.title}"]\n${passage.text}\n`;
  }
  return block;
}
