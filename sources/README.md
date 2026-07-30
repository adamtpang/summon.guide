# Sources — book ingestion workflow

This folder holds the **primary-source PDFs** we use to extract Claude Code skills. The PDFs themselves are **not committed** (`.gitignore` excludes them) — they are usually copyrighted, large, and not needed at runtime.

The website never reads from here. Only Claude reads from here, during local ingestion sessions.

## Folder layout

```
sources/
├── .gitignore           ← excludes *.pdf, *.epub, etc.
├── README.md            ← this file
├── elon/
│   ├── the-book-of-elon.pdf       ← drop here
│   └── elon-musk-isaacson.pdf
├── bezos/
│   └── invent-and-wander.pdf
├── rockefeller/
│   └── titan-chernow.pdf
└── ...
```

The subfolder name matches the figure's slug in `src/lib/figures.ts`. The filename matches the book's slug in `src/lib/books.ts`.

## How to ingest a new book

This is now a scripted pipeline rather than a prose prompt. Run the skill:

```
/book-to-skills
```

It lives at `.claude/skills/book-to-skills/SKILL.md` and drives all three stages.
The two mechanical stages are scripts you can also run directly:

```bash
# Stage 1: PDF to a clean book.md (strips running heads, page numbers, hyphen breaks)
node scripts/pdf-to-md.mjs sources/deutsch/the-fabric-of-reality.pdf

# Stage 3: scaffold SKILL.md files and register them everywhere
node scripts/scaffold-skills.mjs plan.json --dry
node scripts/scaffold-skills.mjs plan.json
```

Stage 2, deciding which frameworks deserve to be skills, is the judgment step and
is described in the skill. It is the only part that cannot be automated.

`scaffold-skills.mjs` updates all four places a skill has to appear (the plugin
directory, `skills.ts`, the book's `skillSlugs` in `books.ts`, and
`marketplace.json`) and refuses to write anything if the figure or book is
missing, a skill already exists, or any content contains an em dash.

### Prerequisites

Save the PDF as `sources/<figure-slug>/<book-slug>.pdf`. Both slugs come from
`src/lib/books.ts`; if the book is not there yet, add an entry first with
`status: "pending"`. The figure must exist in `src/lib/figures.ts`.

### The old manual template

Kept for reference. The pipeline above supersedes it.

> I dropped `sources/elon/the-book-of-elon.pdf`. Read it and extract 3–5 frameworks that Elon **actually used** (not generic startup advice). For each framework:
>
> 1. Create `/skills/elon-<short-name>/SKILL.md` following the structural pattern of `/skills/musk-five-step-algorithm/SKILL.md` — frontmatter (`name`, `description`), then sections: *Core Principle*, *Framework*, *Evaluation Criteria*, *Anti-patterns*, *Output*. End with one of his signature quotes attributed to him.
> 2. Add an entry to `src/lib/skills.ts` with `figureSlug: "elon"`, the source book in `source` and the chapter or anchor in `sourceAnchor`.
> 3. In `src/lib/books.ts`, add the new skill slug to that book's `skillSlugs` array and update `status` to `partial` or `complete` depending on coverage.
>
> Quality bar: each framework must be specific, named, anti-pattern-aware, and attributable to a chapter or interview Claude can cite.

### 3. Verify and ship

The website auto-picks up new entries — no separate registration step.

- `summon.guide/<figure>` shows the new skills in the *Claude Code skills* section
- `summon.guide/skills` lists every skill across every guide
- The plugin (`/plugin install summon-guide`) registers the new slash commands automatically

Open a PR with title format: `Add N skills from <Book Title> by <Author> to /<figure>`.

## Quality bar for extracted skills

Already covered in `/BOOKS.md` — read that before generating skills if it's your first ingestion session. Short version: be specific, name the procedure, call out the failure mode, and cite the source.

## Activating a new figure (not just a new book)

If the book is for a figure that doesn't yet exist on summon.guide (e.g., Bezos, Buffett, Munger, Naval), the order is:

1. Add a portrait at `public/portraits/<slug>.jpg`
2. Promote the figure from `_ARCHIVE_FOUNDERS` in `src/lib/figures.ts` to the active `figures` array (or write a new entry)
3. Add a `Profile` to `src/lib/profiles.ts` with the full Wikipedia-style infobox
4. Add voice + music mappings in `src/app/api/tts/route.ts` and `src/components/AmbientMusic.tsx`
5. Add the suggested-questions seed in `src/app/chat/[figure]/page.tsx`
6. *Then* run book ingestion per the steps above

The patterns are documented in the existing 6 active guides.
