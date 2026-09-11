#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const fixtures = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "data", "founders-retrieval-evals.json"), "utf8"),
);
const { getSourceCorpus } = await import("../src/lib/sourceCorpus.ts");
const { retrieveSourceEpisodes } = await import("../src/lib/sourceRetrieval.ts");

const corpus = getSourceCorpus("founders-podcast");
if (!corpus) throw new Error("Founders corpus is missing");

// Keep the original single-title benchmark as the default. The expanded-corpus
// review is an explicitly separate measurement, with unchanged queries/rank limits.
const reviewed = process.argv.includes("--reviewed");
const judgments = reviewed ? JSON.parse(
  fs.readFileSync(path.join(repoRoot, "data", "founders-retrieval-judgments.json"), "utf8"),
) : null;
if (judgments) {
  if (judgments.minimumGrade !== 3) throw new Error("Reviewed acceptance requires direct relevance (grade 3)");
  for (const [id, entries] of Object.entries(judgments.queries)) {
    if (!fixtures.some((fixture) => fixture.id === id)) throw new Error(`Unknown judgment query: ${id}`);
    for (const entry of entries) {
      if (!corpus.episodes.some((episode) => episode.title === entry.title)) {
        throw new Error(`Judged source missing: ${entry.title}`);
      }
      if (!Number.isInteger(entry.grade) || entry.grade < 0 || entry.grade > 3 || !entry.reason) {
        throw new Error(`Invalid relevance judgment: ${entry.title}`);
      }
    }
  }
  console.log(`Expanded-corpus reviewed acceptance (${judgments.reviewedAt}); original benchmark remains available without --reviewed.`);
}

let passed = 0;
let reciprocalRank = 0;
for (const fixture of fixtures) {
  const results = retrieveSourceEpisodes(corpus.episodes, fixture.query, 10);
  const entries = judgments?.queries[fixture.id];
  const acceptedTitles = entries
    ? entries.filter((entry) => entry.grade >= judgments.minimumGrade).map((entry) => entry.title)
    : [fixture.expectedTitle];
  const rank = results.findIndex((result) => acceptedTitles.includes(result.episode.title)) + 1;
  const ok = rank > 0 && rank <= fixture.maxRank;
  if (ok) passed++;
  if (rank > 0) reciprocalRank += 1 / rank;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${fixture.id}: expected ${entries ? "a reviewed directly relevant source" : `"${fixture.expectedTitle}"`} <= ${fixture.maxRank}, got ${rank || "not found"}`,
  );
}

const meanReciprocalRank = reciprocalRank / fixtures.length;
console.log(`\n${passed}/${fixtures.length} acceptance cases passed; MRR ${meanReciprocalRank.toFixed(3)}`);
if (passed !== fixtures.length) process.exit(1);
