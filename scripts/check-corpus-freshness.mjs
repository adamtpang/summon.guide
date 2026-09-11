#!/usr/bin/env node
// Flags channel corpora whose raw source (summon.company/knowledge) has grown
// SINCE THE LAST TIME THIS SCRIPT RAN, so a human decides whether to re-run
// the digestion agent. Does NOT auto-digest, auto-write, or auto-register
// anything, the synthesis step needs editorial judgment.
//
// A curated digest is always a SUBSET of the raw corpus by design, so
// "digested < raw" is not itself a signal, it's always true. The real signal
// is raw growing over time (new videos uploaded), tracked via a baseline file.
//
// Usage: node scripts/check-corpus-freshness.mjs
//        node scripts/check-corpus-freshness.mjs --reset   (accept current counts as the new baseline without flagging)

import fs from "fs";
import path from "path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const COMPANY_KNOWLEDGE = path.resolve(REPO_ROOT, "..", "summon.company", "knowledge");
const BASELINE_PATH = path.resolve(import.meta.dirname, ".corpus-freshness-baseline.json");

const SOURCE_MAP = {
  "content/knowledge/founders": ["founders-podcast"],
  "content/knowledge/interviews": ["david-senra-conversations"],
  "content/knowledge/starter-story": ["starter-story"],
  "content/knowledge/invest-like-the-best": ["invest-like-the-best"],
  "content/knowledge/y-combinator": ["y-combinator"],
};

function digestedCount(dir) {
  const full = path.resolve(REPO_ROOT, dir);
  if (!fs.existsSync(full)) return 0;
  return fs.readdirSync(full).filter((f) => f.endsWith(".md") && f.toUpperCase() !== "INDEX.MD").length;
}

function rawCount(sourceSlug) {
  const manifestPath = path.join(COMPANY_KNOWLEDGE, sourceSlug, "manifest.json");
  if (!fs.existsSync(manifestPath)) return null;
  const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return Array.isArray(m.episodes) ? m.episodes.length : null;
}

const isReset = process.argv.includes("--reset");
const baseline = fs.existsSync(BASELINE_PATH) ? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8")) : {};
const nextBaseline = {};

console.log(isReset ? "Resetting corpus freshness baseline\n" : "Corpus freshness check (vs last recorded baseline)\n");
let flagged = 0;
let firstRun = 0;

for (const [digestDir, sources] of Object.entries(SOURCE_MAP)) {
  const digested = digestedCount(digestDir);
  for (const src of sources) {
    const raw = rawCount(src);
    if (raw === null) {
      console.log(`  ? ${src}: no manifest.json found in summon.company/knowledge/${src}`);
      continue;
    }
    nextBaseline[src] = raw;
    const prior = baseline[src];
    if (isReset || prior === undefined) {
      console.log(`  · ${src}: baseline set to ${raw} raw videos (${digested} currently digested)`);
      if (prior === undefined && !isReset) firstRun++;
      continue;
    }
    if (raw > prior) {
      console.log(`  ⚑ ${src}: raw grew ${prior} -> ${raw} (+${raw - prior} new) since last check, ${digested} currently digested`);
      flagged++;
    } else {
      console.log(`  ✓ ${src}: unchanged at ${raw} raw videos, ${digested} currently digested`);
    }
  }
}

fs.writeFileSync(BASELINE_PATH, JSON.stringify(nextBaseline, null, 2));

console.log(`\n${flagged} channel(s) grew since the last check.`);
if (firstRun > 0) console.log(`${firstRun} channel(s) had no prior baseline, recorded current counts as the starting point.`);
if (flagged > 0) console.log("This only flags growth, it does not digest or register anything automatically.");
