#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const handle = args.find((arg) => arg.startsWith("@") || /^https?:\/\//.test(arg));
const nameArg = args.find((arg) => arg.startsWith("--name="));
const topArg = args.find((arg) => arg.startsWith("--top="));
const minArg = args.find((arg) => arg.startsWith("--min-minutes="));

if (!handle || !nameArg) {
  console.error("Usage: node scripts/sync-youtube-corpus.mjs @handle --name=corpus-slug [--top=all|N] [--min-minutes=N]");
  process.exit(1);
}

const name = nameArg.split("=")[1];
if (!/^[a-z0-9-]+$/.test(name)) {
  console.error("--name must be a lowercase kebab-case slug");
  process.exit(1);
}

const youchopScript = path.resolve("..", "youchop.app", "tools", "corpus.mjs");
if (!fs.existsSync(youchopScript)) {
  console.error(`Missing YouChop corpus tool: ${youchopScript}`);
  process.exit(1);
}

const outRoot = path.resolve("content", "knowledge");
const toolArgs = [youchopScript, handle, "--local", "--out", outRoot, "--name", name, "--top", topArg?.split("=")[1] || "all"];
if (minArg) toolArgs.push("--min-minutes", minArg.split("=")[1]);

const result = spawnSync(process.execPath, toolArgs, { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status || 1);

const corpusDir = path.join(outRoot, name);
const rawDir = path.join(corpusDir, "_raw");
const pipelineDir = path.join(corpusDir, "_pipeline");
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(pipelineDir, { recursive: true });

const corpusFile = path.join(corpusDir, "corpus.md");
if (fs.existsSync(corpusFile)) fs.renameSync(corpusFile, path.join(rawDir, "corpus.md"));
const manifestFile = path.join(corpusDir, "manifest.json");
if (fs.existsSync(manifestFile)) fs.renameSync(manifestFile, path.join(pipelineDir, "youchop-manifest.json"));

console.log(`YouChop transcripts are staged privately in ${rawDir}`);
console.log(`Add original episode syntheses beside _raw, then run: node scripts/gen-source-corpus.mjs`);
