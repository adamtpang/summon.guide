# The pipeline: from a book you want to a video you can watch

Every stage exists and every stage has been run. This is the order, what each
step actually does, and what it refuses to do.

```
want a book
   ↓  npm run book:find
source it legally
   ↓  npm run book:extract
book.md
   ↓  onboard the guide, add the book
registered
   ↓  /book-to-skills          ↓  /book-to-episodes
plan.json                      plan.json
   ↓  npm run book:scaffold       ↓  npm run book:episodes
installable skills             episode scripts + handoffs
                                  ↓  node scripts/gen-episodes.mjs
                               visible at /watch
                                  ↓  npm run video:render -- ... --voice
                               narrated mp4
```

Two branches from the same book. Skills are things you *run*; episodes are
things you *watch*. The same book usually yields both, and they are different
judgments, so do not derive one from the other.

---

## 1. Source it

```bash
npm run book:find -- "The Beginning of Infinity"
npm run book:find -- --backlog "C:/Users/adamp/Desktop/win/Library/Books/no-pdfs"
```

Checks the local shelf first, because with roughly 400 books there the usual
answer is that you already own it. Then Gutenberg, DOAB open access, and the
Internet Archive. It distinguishes a full public-domain scan, which can be
ingested, from controlled digital lending, which can be read but not ingested.

It does not search shadow libraries. The corpus is worth what its sources are
worth, and a source that cannot be named is worth nothing on a public page.

For the tail with no API, author sites and publisher open-access pages, escalate
to a browser agent. `.claude/skills/find-book/SKILL.md` has the prompt.

## 2. Extract

```bash
npm run book:extract -- sources/pressfield/the-war-of-art.pdf
```

Writes `sources/_md/<book>.md`. Strips running heads, page numbers and roman
numerals, rejoins words hyphenated across a line break, unwraps hard wraps so
sentences are contiguous, and promotes chapter headings.

Watch the reported word count. A low words-per-page ratio means the PDF is
scanned images and there is no text to read. It says so; stop and OCR first
rather than proceeding on 200 words from a 400 page book.

`sources/_md/` is gitignored. Extracted text is the book in another format and
is exactly as copyrighted as the PDF.

## 3. Register

Both downstream branches refuse to run until these exist.

- **The guide**, if new, in `src/lib/figures.ts` and `src/lib/profiles.ts`, plus
  a voice in the TTS route, ambient music, and suggested questions. Full list in
  `docs/guide-onboarding-checklist.md`. `portrait` and `wikipediaUrl` are
  optional, since living figures often have neither.
- **The book** in `src/lib/books.ts`.

A living guide automatically gets the AI-simulation disclosure. Twenty of
thirty-two are alive.

## 4a. Skills, the branch you run

```bash
/book-to-skills
npm run book:scaffold -- plan.json --dry
npm run book:scaffold -- plan.json
```

The judgment is which frameworks earn a skill: the book must argue for it with a
citable location, it must be runnable this week, it must be specific to this
book rather than genre boilerplate, and it must survive the hard-to-vary test.
Three to eight per book.

The scaffolder writes all four places a skill must appear or it is invisible
somewhere: the plugin directory, `skills.ts`, the book's `skillSlugs`, and
`marketplace.json`. It refuses if the figure or book is missing, if a skill
collides, or if any content contains an em dash.

## 4b. Episodes, the branch you watch

```bash
/book-to-episodes
npm run book:episodes -- plan.json --dry
npm run book:episodes -- plan.json
node scripts/gen-episodes.mjs
```

This is the screenplay stage. The format is fixed by `src/lib/episode.ts`: a
hook, exactly three points, a close, 200 to 300 words, 90 to 120 seconds at 145
wpm.

The judgment is different from the skills one. A framework earns a skill by
being runnable. An episode earns its place by being watchable, which needs a
turn, one concrete detail, and an ending that lands a decision. Write in the
guide's first person, because a cloned voice reading a book report is worthless.

Length is enforced, not suggested. One episode out of range and the script
refuses to write any of them, telling you exactly how many words to cut. A 400
word script does not become a 110 second video however well it reads.

`gen-episodes.mjs` regenerates `src/lib/episodes.ts` so the site can see them.
Skip it and the episodes exist as files that nothing renders.

## 5. Voice

Set `ELEVENLABS_API_KEY`. As of the last check, production returns a 401 from
ElevenLabs, so the key is missing or invalid there and no episode can be
narrated until that is fixed.

Then either `/speak` in the browser, or let the renderer fetch it.

## 6. Video

```bash
npm run video:render -- content/episodes/pressfield/turning-pro.handoff.json --voice
npm run video:render -- <handoff.json> --still     # one frame, fast
```

Remotion renders video from React, so the video shares the site's exact fonts,
palette and portraits. See `remotion/README.md`.

Cuts come from the beat timings the episode already carries. When audio is
present its measured duration wins and every beat is scaled by the same ratio,
because a real read drifts a second or two over two minutes.

## 7. Ship

`npx tsc --noEmit && npm run build`, then branch, PR, merge with the owner's OK,
then `npx vercel --prod` because auto-deploy is unreliable. Verify the live URL.

---

## What this does not do yet

Episodes are **animated quote cards**. Every beat gets the same treatment, and
the screen carries no information the narration does not. A video essay needs
the beat to say what is *shown*, not only what is *said*. `docs/video-essays.md`
sketches the shot vocabulary that would close it.
