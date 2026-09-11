#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const privateRoot = path.resolve(repoRoot, "..", "summon.company", "knowledge");
const outputPath = path.join(repoRoot, "data", "founders-corpus-status.json");
const queuePath = path.join(repoRoot, "data", "founders-synthesis-queue.json");

const sources = [
  {
    slug: "founders-podcast",
    label: "Founders Podcast",
    synthesisDir: path.join(repoRoot, "content", "knowledge", "founders"),
  },
  {
    slug: "david-senra-conversations",
    label: "David Senra conversations",
    synthesisDir: path.join(repoRoot, "content", "knowledge", "interviews"),
  },
];

function countSyntheses(directory) {
  if (!fs.existsSync(directory)) return 0;
  return fs.readdirSync(directory).filter(
    (name) => name.endsWith(".md") && name.toLocaleUpperCase("en-US") !== "INDEX.MD",
  ).length;
}

function synthesisIds(directory) {
  if (!fs.existsSync(directory)) return new Set();
  const ids = new Set();
  for (const name of fs.readdirSync(directory)) {
    if (!name.endsWith(".md") || name.toLocaleUpperCase("en-US") === "INDEX.MD") continue;
    const body = fs.readFileSync(path.join(directory, name), "utf8");
    const match = body.match(/^youtube_id:\s*["']?([^"'\r\n]+)["']?\s*$/m);
    if (match) ids.add(match[1].trim());
  }
  return ids;
}

function readSource(source) {
  const sourceRoot = path.join(privateRoot, source.slug);
  const manifestPath = path.join(sourceRoot, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Missing private corpus manifest: ${manifestPath}`);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const episodes = Array.isArray(manifest.episodes) ? manifest.episodes : [];
  const totalLongform = Number(manifest.total_longform || episodes.length);
  const words = episodes.reduce((sum, episode) => sum + Number(episode.words || 0), 0);
  const synthesisCount = countSyntheses(source.synthesisDir);
  const synthesizedIds = synthesisIds(source.synthesisDir);
  const pending = episodes
    .filter((episode) => !synthesizedIds.has(String(episode.id || "")))
    .map((episode) => ({
      source: source.slug,
      id: String(episode.id || ""),
      title: String(episode.title || "Untitled episode"),
      url: String(episode.url || ""),
      published: String(episode.published || ""),
      words: Number(episode.words || 0),
    }));
  let indexReady = false;
  try {
    const brainRoot = path.join(sourceRoot, "brain");
    const index = JSON.parse(fs.readFileSync(path.join(brainRoot, "index.json"), "utf8"));
    const pagesRoot = path.join(brainRoot, "pages");
    const pages = fs.readdirSync(pagesRoot).filter((name) => name.endsWith(".md"));
    const bytes = pages.reduce((sum, name) => sum + fs.statSync(path.join(pagesRoot, name)).size, 0);
    // Match YouChop's own cache signature and vector-shape checks. Existence
    // alone reports stale indexes as ready after adding a new episode.
    indexReady = index.sig === `${pages.length}:${bytes}`
      && Number.isInteger(index.count) && index.count > 0
      && Number.isInteger(index.dims) && index.dims > 0
      && fs.statSync(path.join(brainRoot, "vectors.bin")).size === index.count * index.dims * 4;
  } catch { /* Missing or invalid research indexes are not ready. */ }
  return {
    slug: source.slug,
    label: source.label,
    channel: String(manifest.channel || ""),
    syncedAt: String(manifest.generated || "unknown"),
    episodes: episodes.length,
    words,
    // The sync manifest includes failed caption entries too. Count only staged
    // nonempty transcripts, otherwise an inventory row can hide a failed sync.
    captionFailures: Math.max(0, totalLongform - episodes.filter((episode) => Number(episode.words || 0) > 0).length),
    syntheses: synthesisCount,
    pendingSyntheses: pending.length,
    privateSemanticIndexReady: indexReady,
    pending,
  };
}

const sourceStatus = sources.map(readSource);
const totals = sourceStatus.reduce(
  (current, source) => ({
    privateEpisodes: current.privateEpisodes + source.episodes,
    privateWords: current.privateWords + source.words,
    syntheses: current.syntheses + source.syntheses,
    pendingSyntheses: current.pendingSyntheses + source.pendingSyntheses,
    captionFailures: current.captionFailures + source.captionFailures,
  }),
  { privateEpisodes: 0, privateWords: 0, syntheses: 0, pendingSyntheses: 0, captionFailures: 0 },
);

const synthesisQueue = sourceStatus
  .flatMap((source) => source.pending)
  .sort((a, b) => b.published.localeCompare(a.published) || b.words - a.words);
const publicSourceStatus = sourceStatus.map(({ pending, ...source }) => {
  void pending;
  return source;
});

const status = {
  generatedAt: process.env.CORPUS_DATE || new Date().toISOString().slice(0, 10),
  sources: publicSourceStatus,
  totals: {
    ...totals,
    synthesisCoveragePercent: Number(
      ((totals.syntheses / Math.max(1, totals.privateEpisodes)) * 100).toFixed(1),
    ),
    privateSemanticIndexesReady: sourceStatus.every((source) => source.privateSemanticIndexReady),
  },
  publicationBoundary: {
    publicRuntime: "original episode syntheses only",
    privateResearch: "raw transcripts and local semantic indexes",
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(status, null, 2)}\n`);
fs.writeFileSync(queuePath, `${JSON.stringify(synthesisQueue, null, 2)}\n`);
console.log(
  `wrote ${path.relative(repoRoot, outputPath)}: ${totals.privateEpisodes} private episodes, ${totals.syntheses} public-safe syntheses, ${status.totals.synthesisCoveragePercent}% coverage`,
);
console.log(`wrote ${path.relative(repoRoot, queuePath)}: ${synthesisQueue.length} episodes awaiting original synthesis`);
