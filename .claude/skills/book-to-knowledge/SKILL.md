---
name: book-to-knowledge
description: Turn a book PDF into a chapter-digest knowledge corpus that grounds /chat/source/<slug>, chat with the book itself rather than with a person. Three stages, mirroring book-to-skills. Use when the user wants to chat with a book, when a book needs a corpus before it can power /chat/source, or when the user says ground this book, digest this book, or make this book chat-ready.
---

# Book to knowledge

Three stages. Stage 1 is already done for any book already onboarded through
book-to-skills. Stage 2 is judgment, and it is the whole point of a person
doing this rather than a script. Stage 3 is mechanical.

The unit here is different from book-to-skills. A skill extracts a runnable
framework; three to eight per book is normal, because most of a book is not
a framework. A knowledge digest covers the WHOLE book, chapter by chapter,
because the point is answering open questions about what the book actually
says, not just the parts that became procedures.

## Stage 1: PDF to book.md (scripted, usually already done)

```
node scripts/pdf-to-md.mjs sources/<figure-slug>/<book-slug>.pdf
```

If the book already has a `sourceAnchor`-bearing skill in `skills.ts`, stage
1 is done, `sources/_md/<book-slug>.md` already exists. Skip to stage 2.

## Stage 2: chapter digests (judgment, do this properly)

Read the whole book, chapter by chapter, in order. Actually read it, not the
table of contents. For each chapter or clearly bounded section, write one
file at `content/knowledge/<book-slug>/<NNN>-<chapter-slug>.md`, in the
**exact same shape episode synthesis files already use**, so it needs zero
changes to `scripts/gen-source-corpus.mjs` or `buildSourceGroundingBlock`:

```markdown
---
title: "Chapter title"
principle: "One line: the chapter's central claim or turn."
tags: [book-slug, relevant, themes]
---

# Chapter title

> **Key principle:** one or two sentences expanding the principle line.

*Synthesized from Chapter N of <Book Title> by <Author>.*

## Key lessons

- A specific claim, scene, or argument from this chapter, in your own words.
- Another one. Five to eight bullets is normal for a real chapter.
- ...

---

*Synthesis only. The full text of this chapter is not redistributed here.
Read the book: <where to legitimately get it, matching amazonUrl or the
public-domain source>.*
```

The frontmatter only needs `title`, `principle`, and `tags` (skip
`youtube_url`, `guest`, etc., they are episode-specific and the parser
treats them as optional). The `## Key lessons` heading and the trailing
`---` before the synthesis-only note are required, the parser looks for both
exactly.

**The rule that matters most: digest, never reproduce.** This is higher
stakes than episode synthesis, because a book's text is the product being
sold, not a free podcast transcript.

- Paraphrase in your own words. A direct quote is a sentence, occasionally
  two, never a paragraph.
- Cover the chapter's actual argument or scene, not just its topic. "This
  chapter is about wealth" is not a digest. "Rockefeller argues that ledger
  discipline, not luck, explains who survives a downturn, and proves it with
  Ledger A's actual entries from 1855" is.
- Every file ends with the same synthesis-only footer every episode file
  already carries. Do not skip it.
- If a chapter is mostly plot with no extractable claim (fiction, memoir),
  digest what happens and why it matters to the book's argument, not a
  summary that could substitute for reading it.
- Total digest length should stay a small fraction of the original. If a
  chapter's digest is getting close to the chapter's own length, you are
  transcribing, not digesting. Stop and compress.

**How many files.** One per chapter is the default. A book with very short
chapters (Seneca's letters, aphorism collections) can group a few into one
file; a book with very long chapters can split one into two digests. Match
the book's own structure, do not force a fixed count.

## Stage 3: register and generate (scripted)

```
scripts/gen-source-corpus.mjs
```

Before running it, add or update the book's `corpusPaths` in
`src/lib/books.ts`:

```typescript
corpusPaths: ["content/knowledge/<book-slug>"],
```

Chat-eligibility comes from `corpusPaths` being present, not from `role`. A
book keeps its existing `role` (`by`, `about`, `compiled`), this only adds
the field. The script regenerates `src/lib/sourceCorpus.ts`, which
`api/chat/source` and `/chat/source/<slug>` already read, unchanged, no new
plumbing needed. Note the script's console output: it warns rather than
silently truncating if a corpus exceeds `MAX_SOURCE_GROUNDING_CHARS`.

## Verify before claiming done

```
npx tsc --noEmit && npm run build
```

Then confirm `/chat/source/<book-slug>` actually renders and a real message
round-trips through `/api/chat/source` with a correct `[Source: "..."]`
citation. A corpus that parses but was never actually chatted with is not
verified.

## Anti-patterns

- Reproducing substantial passages instead of paraphrasing. This is the one
  that actually matters, everything else here is process.
- Digesting from the table of contents or jacket copy instead of the body.
- Treating this like book-to-skills and only covering the "useful" chapters.
  A knowledge corpus that skips the chapters with no obvious framework
  produces gaps a reader will find and be annoyed by.
- Skipping the synthesis-only footer because it feels repetitive across
  files. It is the thing that keeps this defensible at scale.
- Declaring done on a green typecheck without actually sending it a message.
