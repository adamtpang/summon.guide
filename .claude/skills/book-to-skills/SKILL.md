---
name: book-to-skills
description: Turn a book PDF into installable Claude Code skills for this repo. Runs the three-stage pipeline: extract the PDF to a clean book.md, read it and decide which frameworks deserve to be skills, then scaffold and register them. Use when a new PDF lands in sources/, when a book in books.ts has status pending or partial and needs skills, or when the user says ingest this book, turn this into skills, or extract frameworks from this PDF.
---

# Book to skills

Three stages. Two are mechanical and scripted; the middle one is judgment and is
the only reason a person is needed. Do not skip stage 2 by pattern-matching
chapter titles into skill names.

The model to follow is `slavingia/skills`: one book becomes one plugin, and the
skills track the book's own progression rather than an arbitrary set of topics.

## Stage 1: PDF to book.md (scripted)

```
node scripts/pdf-to-md.mjs sources/<figure-slug>/<book-slug>.pdf
```

Writes `sources/_md/<book-slug>.md` with frontmatter recording the page count
and word count. The script strips running heads, page numbers, and hyphens
broken across line wraps, and promotes chapter headings to markdown.

Check the reported word count before continuing. If it warns about a low
word-per-page ratio the PDF is scanned images, and there is no text to read.
Stop and tell the user it needs OCR first rather than proceeding on 200 words
extracted from a 400 page book.

## Stage 2: choose the skills (judgment, do this properly)

Read the extracted markdown. Actually read it. Then decide what becomes a skill.

**A framework earns a skill when all four hold:**

1. **The book argues for it.** It is the author's own claim, with a location you
   can cite. If you cannot name the chapter, it is not from the book, it is from
   your prior knowledge of the genre.
2. **It is runnable.** A person can apply it to a real situation this week. "Think
   long term" is a sentiment. "Track every penny in one ledger, then hunt the
   single largest recurring line" is a procedure.
3. **It is specific to this book.** If the same skill could be derived from any
   of twenty business books, it is genre boilerplate. Cut it.
4. **It survives the hard-to-vary test.** Change a detail of the framework. If it
   still works, the detail was decoration and the framework is vague.

**How many.** Three to eight per book. Fewer than three usually means you skimmed.
More than eight usually means you are splitting one framework into fragments.

**Follow the book's spine.** If the book is a sequence (find the problem, build
the thing, price it, grow it), the skills should follow that sequence, because
that ordering is itself part of what the author is teaching.

**Also write the umbrella skill** when the guide is new: slug equal to the figure
slug, channelling the whole mind rather than one framework.

**Themes and problem hints.** Every skill needs `themes` from the fixed taxonomy
in `src/lib/skills.ts` (most relevant first) and a `problemHint` written in the
user's own voice, describing the moment they would need it. Write "I keep
lowering my price to win deals and I am barely profitable", not "helps with
pricing strategy". The router matches a stated problem against that line.

## Stage 3: scaffold and register (scripted)

Write a plan file, dry run it, then apply.

```
node scripts/scaffold-skills.mjs plan.json --dry
node scripts/scaffold-skills.mjs plan.json
```

Plan shape:

```json
{
  "figureSlug": "hormozi",
  "bookSlug": "100m-offers",
  "skills": [
    {
      "slug": "grand-slam-offer",
      "title": "The Grand Slam Offer",
      "tagline": "one line, what the skill does",
      "whenToUse": "the situation that should trigger it",
      "sourceAnchor": "Section III",
      "themes": ["selling", "money"],
      "problemHint": "in the user's voice",
      "corePrinciple": "the one paragraph that matters",
      "framework": [{ "title": "Step name", "body": "what to do" }],
      "antiPatterns": ["the failure mode this prevents"],
      "outputShape": "what the skill should produce",
      "closingQuote": "short, from the book"
    }
  ]
}
```

The script writes the `SKILL.md` files, adds entries to `src/lib/skills.ts`,
attaches the slugs to the book in `src/lib/books.ts`, bumps that book's status,
and adds the plugin to `.claude-plugin/marketplace.json` if it is new. It
refuses to write anything if the figure or book is missing, if a skill already
exists, or if any content contains an em dash.

Prerequisites the script enforces, so handle them first: the figure must exist
in `figures.ts`, and the book must exist in `books.ts`.

## Verify before claiming done

```
npx tsc --noEmit && npm run build
```

Then confirm the skill actually surfaces: it should appear on the book's page at
`/books/<book-slug>`, in the library at `/skills`, and under its guide. A skill
that exists in `skills.ts` but renders nowhere is not finished.

Consider writing the book's encyclopedia entry in `src/lib/bookProfiles.ts` at
the same time, since you have just read the whole book and will not have it this
fresh again.

## Anti-patterns

- Generating skills from the table of contents without reading the body. Chapter
  titles are marketing; the framework is in the prose.
- Inventing a `sourceAnchor` to satisfy the schema. If you do not know where it
  came from, you do not know that it came from the book.
- Writing eight skills that are one skill split eight ways.
- Skills that restate the genre. Every business book says focus on customers.
  What does *this* book say that the others do not?
- Declaring completion on a green typecheck. Typecheck proves the data parses,
  not that anyone can find the skill.
