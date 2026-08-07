#!/usr/bin/env node
// Builds src/lib/sourceCorpus.ts: the grounding corpus for /chat/source/<slug>,
// chat with a channel itself rather than with a person. Reads every episode
// synthesis file under each "channel" book's corpusPaths in books.ts and
// bakes title, principle, and key lessons into a generated TS constant, the
// same way figureSources.ts grounds a guide, except the whole channel corpus
// goes in rather than a curated per-figure subset.
//
//   node scripts/gen-source-corpus.mjs
//
// Rerun after adding episodes to a channel's corpusPaths directories, or
// after registering a new "channel" book in books.ts.

import fs from "fs";
import path from "path";

const booksSrc = fs.readFileSync("src/lib/books.ts", "utf8").replace(/\r\n/g, "\n");

function extractChannelBooks(src) {
  const books = [];
  const blockRe = /\{\s*slug: "([a-z0-9-]+)"[\s\S]*?\n {2}\},/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const block = m[0];
    if (!/role: "channel"/.test(block)) continue;
    const slug = m[1];
    const title = (/title: "([^"]+)"/.exec(block) || [])[1] || slug;
    const author = (/author: "([^"]+)"/.exec(block) || [])[1] || "";
    const pathsMatch = /corpusPaths:\s*\[([^\]]*)\]/.exec(block);
    if (!pathsMatch) {
      console.warn(`WARNING: channel book "${slug}" has no corpusPaths, skipping`);
      continue;
    }
    const corpusPaths = pathsMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
    books.push({ slug, title, author, corpusPaths });
  }
  return books;
}

function parseEpisode(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const fmMatch = /^---\n([\s\S]*?)\n---/.exec(raw);
  if (!fmMatch) return null;
  const fm = fmMatch[1];
  const title = (/^title:\s*"([^"]*)"/m.exec(fm) || [])[1] || path.basename(file);
  const principle = (/^principle:\s*"([^"]*)"/m.exec(fm) || [])[1] || "";
  const youtube = (/^youtube_url:\s*"([^"]*)"/m.exec(fm) || [])[1] || "";
  const guest = (/^guest:\s*"([^"]*)"/m.exec(fm) || [])[1] || "";

  const lessonsMatch = /## Key lessons\n\n([\s\S]*?)\n\n---/.exec(raw);
  const keyLessons = lessonsMatch
    ? lessonsMatch[1]
        .split("\n")
        .filter((l) => l.startsWith("- "))
        .map((l) => l.slice(2).trim())
    : [];

  if (!title || !principle || !keyLessons.length) return null;
  return {
    file: file.replace(/\\/g, "/"),
    title,
    principle,
    keyLessons,
    youtube,
    guest,
  };
}

const channelBooks = extractChannelBooks(booksSrc);
if (!channelBooks.length) {
  console.error("No channel books with corpusPaths found in books.ts. Nothing to generate.");
  process.exit(1);
}

const corpus = {};
for (const book of channelBooks) {
  const episodes = [];
  for (const dir of book.corpusPaths) {
    if (!fs.existsSync(dir)) {
      console.warn(`WARNING: corpusPath "${dir}" for "${book.slug}" does not exist`);
      continue;
    }
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") && f.toUpperCase() !== "INDEX.MD")
      .map((f) => path.join(dir, f));
    for (const file of files) {
      const ep = parseEpisode(file);
      if (ep) episodes.push(ep);
      else console.warn(`WARNING: could not parse episode ${file}, skipping`);
    }
  }
  episodes.sort((a, b) => a.file.localeCompare(b.file));
  corpus[book.slug] = { title: book.title, host: book.author, episodes };
  console.log(`${book.slug}: ${episodes.length} episodes from ${book.corpusPaths.join(", ")}`);
}

const J = (v) => JSON.stringify(v, null, 2);

const out = `// GENERATED FILE, do not edit by hand.
// Regenerate with: node scripts/gen-source-corpus.mjs
// Rerun after adding episodes to a channel's corpusPaths, or after
// registering a new "channel" book in books.ts.
//
// This grounds /chat/source/<slug>, chat with a channel's own corpus rather
// than with a person. Contrast with figureSources.ts, which grounds a
// guide's persona in a curated subset of episodes; this holds the FULL
// corpus for the channel itself, keyed by the books.ts slug.

export interface SourceEpisode {
  /** Repo-relative path under content/knowledge/ */
  file: string;
  title: string;
  /** One line: the lesson this episode teaches. */
  principle: string;
  keyLessons: string[];
  youtube: string;
  /** Interview guest, if this episode is an interview rather than solo narration. */
  guest?: string;
}

export interface SourceCorpus {
  title: string;
  host: string;
  episodes: SourceEpisode[];
}

export const sourceCorpus: Record<string, SourceCorpus> = ${J(corpus)};

export function getSourceCorpus(bookSlug: string): SourceCorpus | undefined {
  return sourceCorpus[bookSlug];
}

// Generous on purpose: this is a one-time cost per conversation (cached the
// same way figure grounding is), and a silent per-episode cutoff means
// most of a 40+ episode channel never gets cited. Log rather than truncate
// quietly if a corpus ever actually exceeds this.
const MAX_SOURCE_GROUNDING_CHARS = 150000;

/** Formats a channel's full corpus into the grounding block for its system prompt. */
export function buildSourceGroundingBlock(bookSlug: string): string {
  const corpus = sourceCorpus[bookSlug];
  if (!corpus || !corpus.episodes.length) return "";

  const header = [
    "## The corpus (cite these, invent nothing else)",
    "",
    \`The following is every episode of \${corpus.title} synthesized into this system. Answer only from this material.\`,
    "When you draw on an episode, cite it by title. Never cite an episode that is not listed here.",
    "",
  ].join("\\n");

  let out = header;
  let dropped = 0;
  for (const ep of corpus.episodes) {
    const subject = ep.guest ? \` (with \${ep.guest})\` : "";
    const head = \`### \${ep.title}\${subject}\\nPrinciple: \${ep.principle}\\n\`;
    if (out.length + head.length > MAX_SOURCE_GROUNDING_CHARS) {
      dropped++;
      continue;
    }
    out += head;
    for (const lesson of ep.keyLessons) {
      const line = \`- \${lesson}\\n\`;
      if (out.length + line.length > MAX_SOURCE_GROUNDING_CHARS) continue;
      out += line;
    }
    out += "\\n";
  }
  if (dropped > 0 && typeof console !== "undefined") {
    console.warn(\`buildSourceGroundingBlock("\${bookSlug}"): dropped \${dropped} of \${corpus.episodes.length} episodes, over the \${MAX_SOURCE_GROUNDING_CHARS} char cap\`);
  }
  return out.trimEnd();
}

const SOURCE_RESPONSE_RULES = \`
RULES:
- You are not a person. You are a guide to this corpus. If asked whether you are an AI, say yes plainly; there is no character to stay in.
- Answer only from the corpus above. If the corpus does not cover something, say so rather than inventing an answer.
- Keep responses concise, 2-4 paragraphs max unless the question demands depth.
- Cite the specific episode you are drawing on, naturally, in the sentence (e.g., "In the episode on X...").
- Format source citations at the end of your response like: [Source: "Episode Title"]
- NEVER use em dashes or en dashes in your responses. Use commas, periods, or "and" instead.
- Write in a conversational, spoken style.
- After your main response, on a new line, suggest exactly 3 follow-up questions formatted as: [FOLLOWUP: question1 | question2 | question3]
\`;

/** Full system prompt for chatting with a source's corpus directly, no persona. */
export function buildSourceSystemPrompt(bookSlug: string): string | null {
  const corpus = sourceCorpus[bookSlug];
  if (!corpus) return null;
  const grounding = buildSourceGroundingBlock(bookSlug);
  return \`You are a guide to \${corpus.title}\${corpus.host ? \`, hosted by \${corpus.host}\` : ""}. You answer questions using only the corpus of episodes below, nothing invented and nothing assumed from outside knowledge.

\${grounding}
\${SOURCE_RESPONSE_RULES}\`;
}
`;

fs.writeFileSync("src/lib/sourceCorpus.ts", out, "utf8");
console.log(`\nwrote src/lib/sourceCorpus.ts (${Object.keys(corpus).length} channel${Object.keys(corpus).length === 1 ? "" : "s"})`);
