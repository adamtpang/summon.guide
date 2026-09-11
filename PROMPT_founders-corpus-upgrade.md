# Claude Code prompt: ground summon.guide in the Founders corpus

Paste everything below the line into a fresh Claude Code session opened IN the
summon.guide repo. It is written to be run there, not from the Aether root.

---

You are upgrading **summon.guide**, a Next.js app where people chat with history's
greatest founders (13 figures in `src/lib/figures.ts`, each with a `systemPrompt`,
`domains`, and Claude-plugin skills under `plugins/<figure>/skills/`). The chat's
`RESPONSE_RULES` already instruct each figure to cite its knowledge base with
`[Source: "Book" by Author]`, but no knowledge base is actually wired in. Your job is to
close that gap: ground every figure in a real corpus so their answers quote actual
transcripts and biographies instead of running on the system prompt alone.

## The corpus (already exists, in a sibling repo)

`../summon.company/knowledge/` holds 48 cleaned episodes, ~810k words, extracted via
youchop.app. Structure per file: frontmatter (`subject`/`guest`, `company`,
`source_book`, `principle`) then `# title`, a one-line **principle**, **Key lessons**
(synthesis), then the full **Transcript**. Folders:
- `founders-podcast/`: 20 solo episodes (Jobs, Rockefeller's 38 letters, How Elon Works, ...)
- `david-senra-conversations/`: 28 interviews (Andreessen, Tobi Lutke, Spiegel, Ek, Dyson, Todd Graves, Brad Jacobs, John Mackey, Jimmy Iovine, ...)
- `greg-isenberg/corpus.md`, `starter-story/corpus.md`: bonus idea/marketing corpora
Read `../summon.company/knowledge/INDEX.md` and the two sub-INDEX.md files first.

## Do this, in order

1. **Import the corpus into this repo, additively.** Copy the processed `.md` episode
   files (NOT the `_raw/` transcripts or `_pipeline/`) into `content/knowledge/founders/`
   and `content/knowledge/interviews/`. Copy the two `corpus.md` files too. Add the raw
   folders to `.gitignore`. Keep the processed markdown committed: it is the grounding
   source. Confirm total added size is reasonable (a few MB of md, not the 21MB raw set).

2. **Build a figure to sources map.** Create `src/lib/figureSources.ts` mapping each
   figure slug to its episode files + the `principle`/`Key lessons` block extracted from
   each. Cover the existing 13 where the corpus supports them (rockefeller -> 38 letters +
   founders-podcast Rockefeller; elon -> How Elon Works + How Elon Thinks; andreessen ->
   his interview; etc.). Where a figure has no corpus coverage, mark it `coverage: "none"`
   so the UI can be honest rather than hallucinate citations.

3. **Inject grounding at chat time (simple, reliable first).** In the chat route, before
   calling the model, load the figure's mapped **Key lessons** digest (not the full
   transcripts, keep it under ~2k tokens) and append it to the system prompt under a
   `## Your documented record (cite these)` heading. This makes citations real without
   embeddings. Leave a clearly-marked TODO + interface seam for a future semantic-retrieval
   upgrade (embed transcript chunks, retrieve top-k per user question) but do NOT build the
   vector store now unless the simple version proves too shallow.

4. **Seed new figures from the corpus.** The interviews contain founders with no figure
   yet: Tobi Lutke, Todd Graves, Brad Jacobs, John Mackey, Jimmy Iovine, Daniel Ek, Evan
   Spiegel, James Dyson, Brian Armstrong. Add 6-9 of them to `figures.ts` following the
   exact `Figure` interface (fill every field: era, hook, signatureQuote pulled from their
   transcript, domains, accomplishments, stats). Each new figure must have corpus coverage
   by construction. This grows the roster from 13 to ~20 and every addition is grounded.

5. **Generate a playbook skill per well-covered figure**, matching the existing pattern
   (`plugins/elon/skills/first-principles/SKILL.md` is the gold standard). Derive each
   skill from that figure's episode `principle` + `Key lessons`, so the skill teaches a
   real, sourced framework (e.g. rockefeller -> `ledger-discipline`, tobi -> `founder-mode`).

6. **Verify before you claim done.** Run `pnpm typecheck` and `pnpm build`. Then start the
   app and exercise ONE figure chat end-to-end (drive it, read the reply): confirm the
   figure cites a real `[Source: ...]` that traces to an actual file in
   `content/knowledge/`. Paste the evidence. A figure that cites a source not in the corpus
   is a failure, fix it.

## Constraints
- Additive only. Do not change the `Figure` interface shape or break the 13 existing figures.
- No em dashes anywhere (the repo's own RESPONSE_RULES already forbid them). Use commas or periods.
- Keep `AI_CONFIG` and the model id untouched (`claude-sonnet-5`).
- Commit in logical steps (import, map, wire, seed, skills) so each is reviewable.

## Definition of done
Every figure either cites real corpus sources in its answers, or is honestly marked as
having no corpus coverage. The roster grew with grounded founders. Typecheck and build
pass, and you have shown one real chat citing one real file.
