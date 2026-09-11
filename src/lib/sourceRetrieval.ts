import type { SourceEpisode } from "@/lib/sourceCorpus";

const STOP_WORDS = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "can",
  "choose",
  "did",
  "do",
  "does",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "one",
  "or",
  "our",
  "should",
  "that",
  "the",
  "their",
  "thing",
  "things",
  "this",
  "through",
  "to",
  "was",
  "we",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "want",
  "you",
  "your",
]);

const CONCEPT_EXPANSIONS: Record<string, string[]> = {
  business: ["company", "customer", "market", "founder"],
  career: ["work", "mission", "life", "decade"],
  company: ["business", "customer", "market", "founder"],
  control: ["independent", "ownership", "board", "capital"],
  educate: ["education", "teach", "teaching", "demonstrate"],
  education: ["educate", "teach", "teaching", "demonstrate"],
  failure: ["failed", "failing", "setback"],
  focus: ["focused", "priority", "simple", "delete", "concentrate", "narrow"],
  hire: ["hiring", "talent", "recruit", "recruiting", "recruitment"],
  hiring: ["hire", "talent", "recruit", "recruiting", "recruitment"],
  iteration: ["iterate", "iterative", "prototype", "prototypes", "testing"],
  last: ["long", "decade", "mission", "enduring", "commitment"],
  life: ["mission", "work", "decade", "long"],
  money: ["cost", "cash", "capital", "profit", "wealth"],
  startup: ["company", "business", "founder", "customer"],
  team: ["hire", "hiring", "talent", "people"],
};

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

type WeightedTerm = {
  term: string;
  weight: number;
};

function queryTerms(query: string): WeightedTerm[] {
  const base = normalize(query)
    .split(/\s+/)
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));
  const weighted = new Map<string, number>();
  for (const term of base) {
    weighted.set(term, 1);
    for (const expansion of CONCEPT_EXPANSIONS[term] || []) {
      if (!weighted.has(expansion)) weighted.set(expansion, 0.35);
    }
  }
  return Array.from(weighted, ([term, weight]) => ({ term, weight }));
}

function containsTerm(field: string, term: string): boolean {
  // Fields and query terms are normalized to space-separated words. Substring
  // matches otherwise reward unrelated words such as `new` inside `knew`.
  const plural = (word: string) => /[^aeiou]y$/.test(word)
    ? `${word.slice(0, -1)}ies`
    : word.endsWith("s") ? `${word}es` : `${word}s`;
  return field.split(" ").some((word) =>
    word === term || word === plural(term) || plural(word) === term,
  );
}

export type RankedSourceEpisode = {
  episode: SourceEpisode;
  score: number;
  matchedTerms: string[];
};

/**
 * Small, deterministic retrieval layer for the synthesized corpus. It is deliberately
 * inspectable: titles and guests matter most, then principles, then lesson text.
 * Concept expansions cover common founder jobs without pretending to be embeddings.
 */
export function rankSourceEpisodes(
  episodes: readonly SourceEpisode[],
  query: string,
): RankedSourceEpisode[] {
  const normalizedQuery = normalize(query);
  const terms = queryTerms(query);

  if (!terms.length) {
    return episodes.map((episode) => ({ episode, score: 0, matchedTerms: [] }));
  }

  return episodes
    .map((episode, index) => {
      const title = normalize(episode.title);
      const guest = normalize(episode.guest || "");
      const principle = normalize(episode.principle);
      const lessons = normalize(episode.keyLessons.join(" "));
      const matchedTerms: string[] = [];
      let matchedWeight = 0;
      let score = 0;

      if (normalizedQuery.length >= 5) {
        if (title.includes(normalizedQuery)) score += 40;
        if (principle.includes(normalizedQuery)) score += 24;
        if (lessons.includes(normalizedQuery)) score += 12;
      }

      for (const { term, weight } of terms) {
        let matched = false;
        if (containsTerm(title, term)) {
          score += 12 * weight;
          matched = true;
        }
        if (containsTerm(guest, term)) {
          score += 10 * weight;
          matched = true;
        }
        if (containsTerm(principle, term)) {
          score += 5 * weight;
          matched = true;
        }
        if (containsTerm(lessons, term)) {
          score += 2 * weight;
          matched = true;
        }
        if (matched) {
          matchedTerms.push(term);
          matchedWeight += weight;
        }
      }

      score += matchedWeight * matchedWeight * 2;
      return { episode, score, matchedTerms, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ episode, score, matchedTerms }) => ({ episode, score, matchedTerms }));
}

export function retrieveSourceEpisodes(
  episodes: readonly SourceEpisode[],
  query: string,
  limit = 16,
): RankedSourceEpisode[] {
  const ranked = rankSourceEpisodes(episodes, query);
  const positive = ranked.filter((result) => result.score > 0);
  const selected = positive.length >= Math.min(4, limit) ? positive : ranked;
  return selected.slice(0, Math.max(1, limit));
}
