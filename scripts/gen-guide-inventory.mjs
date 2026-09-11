#!/usr/bin/env node
// Generates GUIDES.md from the actual Summon guide registry, book registry,
// corpus directories, distillations, plugins, and requested source registry.
//
// Usage: node scripts/gen-guide-inventory.mjs

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "GUIDES.md");
const REQUESTED_PATH = path.join(ROOT, "data", "requested-guide-sources.json");

const { figures } = await import(pathToFileURL(path.join(ROOT, "src", "lib", "figures.ts")).href);
const { books } = await import(pathToFileURL(path.join(ROOT, "src", "lib", "books.ts")).href);

const requested = fs.existsSync(REQUESTED_PATH)
  ? JSON.parse(fs.readFileSync(REQUESTED_PATH, "utf8"))
  : [];
const intake = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "guide-intake.json"), "utf8"));
const pluginSlugs = new Set(listDirectories(path.join(ROOT, "plugins")));
const distillationSlugs = new Set(
  listFiles(path.join(ROOT, "content", "distilled"), ".md").map((file) => path.basename(file, ".md")),
);
const figureBySlug = new Map(figures.map((figure) => [figure.slug, figure]));

const channels = books.filter((book) => book.role === "channel");
const writtenSources = books.filter((book) => book.role !== "channel");

assertUnique(figures, "guide");
assertUnique(books, "book or channel");
assertUnique(requested, "requested source");

const lines = [];
lines.push("# Summon guide inventory");
lines.push("");
lines.push("> GENERATED FILE. Do not edit by hand.");
lines.push("> Regenerate with `node scripts/gen-guide-inventory.mjs`.");
lines.push("> Sources: `src/lib/figures.ts`, `src/lib/books.ts`, `content/knowledge/`, `content/distilled/`, `plugins/`, and `data/requested-guide-sources.json`.");
lines.push("");
lines.push(`**${figures.length} guides · ${channels.length} channels · ${writtenSources.length} books and written collections · ${requested.length} additional ${requested.length === 1 ? "source" : "sources"}**`);
lines.push("");

lines.push("## Guide onboarding");
lines.push("");
lines.push("Tracked in `data/guide-intake.json` and visible at `/onboarding`. Source leads are not ingested corpora. Existing runtime is not proof of a complete onboarding audit.");
lines.push("");
lines.push("| Guide | Availability | Next action |");
lines.push("| --- | --- | --- |");
for (const candidate of intake) {
  lines.push(`| ${cell(candidate.name)} | ${figureBySlug.has(candidate.slug) ? "Existing chat; audit pending" : "Sourcing; chat disabled"} | ${cell(candidate.nextAction)} |`);
}
lines.push("");
lines.push("## Additional sources");
lines.push("");
if (!requested.length) {
  lines.push("No additional sources are tracked outside the main guide and book registries.");
  lines.push("");
} else {
  lines.push("| Guide | Organization | Source | Status | Discovered | Corpus docs | Note |");
  lines.push("| --- | --- | --- | --- | ---: | ---: | --- |");
  for (const source of [...requested].sort(by("guideName"))) {
    lines.push(`| ${cell(source.guideName)} | ${cell(source.organization)} | [${cell(source.title)}](${source.url}) | ${cell(source.status)} | ${source.discoveredVideoCount ?? ""} | ${countCorpusDocs(source.corpusPaths)} | ${cell(source.note)} |`);
  }
  lines.push("");
}

lines.push("## Guides");
lines.push("");
lines.push("A guide is a person defined in `src/lib/figures.ts`. Source counts come from `src/lib/books.ts`.");
lines.push("");
lines.push("| Guide | Slug | Sources | Corpus docs | One-pagers | Plugin |");
lines.push("| --- | --- | ---: | ---: | ---: | --- |");
for (const guide of [...figures].sort(by("name"))) {
  const guideSources = books.filter((book) => book.figureSlug === guide.slug);
  const corpusDocs = guideSources.reduce((sum, book) => sum + countCorpusDocs(book.corpusPaths), 0);
  const onePagers = new Set([
    ...(distillationSlugs.has(guide.slug) ? [guide.slug] : []),
    ...guideSources.filter((book) => distillationSlugs.has(book.slug)).map((book) => book.slug),
  ]).size;
  lines.push(`| [${cell(guide.name)}](https://summon.guide/${guide.slug}) | \`${guide.slug}\` | ${guideSources.length} | ${corpusDocs} | ${onePagers} | ${pluginSlugs.has(guide.slug) ? "yes" : "no"} |`);
}
lines.push("");

lines.push("## Channels");
lines.push("");
lines.push("A channel is an entry in `src/lib/books.ts` whose role is `channel`.");
lines.push("");
lines.push("| Channel | Host | Guide | Status | Corpus docs | One-pager | Chat |");
lines.push("| --- | --- | --- | --- | ---: | --- | --- |");
for (const channel of [...channels].sort(by("title"))) {
  const guide = figureBySlug.get(channel.figureSlug);
  const onePager = distillationSlugs.has(channel.slug);
  const chat = channel.corpusPaths?.length > 0;
  const channelTitle = channel.amazonUrl ? `[${cell(channel.title)}](${channel.amazonUrl})` : cell(channel.title);
  lines.push(`| ${channelTitle} | ${cell(channel.author)} | ${guide ? `[${cell(guide.name)}](https://summon.guide/${guide.slug})` : cell(channel.figureSlug)} | ${cell(channel.status)} | ${countCorpusDocs(channel.corpusPaths)} | ${onePager ? `[view](https://summon.guide/distillations/${channel.slug})` : "no"} | ${chat ? `[open](https://summon.guide/chat/source/${channel.slug})` : "no"} |`);
}
lines.push("");

lines.push("## Books and written collections");
lines.push("");
lines.push("This includes books, essays, letters, scriptures, and manifestos registered in `src/lib/books.ts`.");
lines.push("");
lines.push("| Title | Author | Guide | Role | Status | Corpus docs | One-pager | Chat |");
lines.push("| --- | --- | --- | --- | --- | ---: | --- | --- |");
for (const book of [...writtenSources].sort(by("title"))) {
  const guide = figureBySlug.get(book.figureSlug);
  const onePager = distillationSlugs.has(book.slug);
  const chat = book.corpusPaths?.length > 0;
  const bookTitle = book.amazonUrl ? `[${cell(book.title)}](${book.amazonUrl})` : cell(book.title);
  lines.push(`| ${bookTitle} | ${cell(book.author)} | ${guide ? `[${cell(guide.name)}](https://summon.guide/${guide.slug})` : cell(book.figureSlug)} | ${cell(book.role)} | ${cell(book.status)} | ${countCorpusDocs(book.corpusPaths)} | ${onePager ? `[view](https://summon.guide/distillations/${book.slug})` : "no"} | ${chat ? `[open](https://summon.guide/chat/source/${book.slug})` : "no"} |`);
}
lines.push("");

fs.writeFileSync(OUT, `${lines.join("\n")}\n`, "utf8");
console.log(`wrote ${path.relative(ROOT, OUT)}: ${figures.length} guides, ${channels.length} channels, ${writtenSources.length} written sources, ${requested.length} additional`);

function listDirectories(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function listFiles(directory, extension) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => path.join(directory, entry.name));
}

function countCorpusDocs(corpusPaths = []) {
  return corpusPaths.reduce((sum, corpusPath) => sum + countMarkdownRecursive(path.join(ROOT, corpusPath)), 0);
}

function countMarkdownRecursive(directory) {
  if (!fs.existsSync(directory)) return 0;
  let count = 0;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) count += countMarkdownRecursive(fullPath);
    else if (entry.isFile() && entry.name.endsWith(".md")) count += 1;
  }
  return count;
}

function assertUnique(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item.slug) throw new Error(`${label} is missing a slug`);
    if (seen.has(item.slug)) throw new Error(`duplicate ${label} slug: ${item.slug}`);
    seen.add(item.slug);
  }
}

function by(key) {
  return (a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? ""));
}

function cell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}
