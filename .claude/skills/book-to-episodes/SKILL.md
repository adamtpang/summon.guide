---
name: book-to-episodes
description: Turn a book into a series of short voiceover episodes for YouTube and shorts. Reads an extracted book.md, decides which ideas are worth watching rather than just worth knowing, writes each as a hook plus three points plus a close in the guide's own voice at 200 to 300 words, then generates the scripts and the book.movie handoff files. Use when the user wants video or audio artifacts from a book, mentions YouTube, shorts, voiceover, NotebookLM, or says turn this book into videos or make media from my PDFs.
---

# Book to episodes

The chain already exists end to end. This is the judgment step in the middle.

```
PDF          ->  book.md        scripts/pdf-to-md.mjs
book.md      ->  episode script THIS SKILL, then scripts/episodes-from-plan.mjs
script       ->  mp3            /speak, POST /api/tts (ElevenLabs, guide voice)
mp3          ->  video          book.movie / Remotion, per BOOK_MOVIE_HANDOFF.md
```

Do not invent a new format. `src/lib/episode.ts` defines it and `/speak` renders
against it: **hook, exactly three points, close, 200 to 300 words, 90 to 120
seconds at 145 wpm.** `content/demos/franklin-thirteen-virtues.md` is the
reference; read it before writing anything.

## What makes an episode, as opposed to a skill

These are different judgments and the same book yields different sets.

A **skill** earns its place by being *runnable*: a procedure someone applies this
week. An **episode** earns its place by being *watchable*: it needs a turn, a
concrete detail, and a reason to keep listening past the first ten seconds.

Franklin's thirteen virtues is both. A pricing framework with no story in it is a
fine skill and a dull episode. A founder's single worst week is a great episode
and not a skill at all.

Test each candidate:

1. **Is there a turn?** Something the viewer does not expect at second five. A
   reversal, a cost, an admission. Without it you have a lecture.
2. **Is there one concrete detail?** A number, an object, a place, a name. "He
   tracked his spending" is nothing. "A little book, a page per virtue, a black
   spot for every failure" is the episode.
3. **Does it end somewhere?** The close should land a decision the viewer can
   make tonight, not summarise what was said.
4. **Would you watch it if it were not yours?**

Six to twelve episodes per book. That is roughly fifteen to twenty minutes of
finished media from one PDF, which is what makes this a body of work rather than
a one-off.

## Voice

Write in the guide's **first person**, present tense where it works. The Franklin
demo says "I listed thirteen virtues", not "Franklin listed thirteen virtues".
That is what makes the audio worth having a cloned voice for.

Constraints that are not stylistic preferences:

- **No em dashes.** The script refuses to write them. Commas, periods, colons.
- **Short sentences.** This is read aloud. A sentence that needs a second breath
  needs to be two sentences.
- **Every claim traceable.** The `sourceAnchor` names the chapter. If you cannot
  name it, you are writing from genre memory, not from the book.

## Structure, per episode

- **Hook**, about 50 words. State the problem the viewer already has. Do not
  introduce yourself, do not set up, do not say "in this video".
- **Point 1**, the method or the moment. Concrete.
- **Point 2**, the complication. What went wrong, what it cost, what most people
  get wrong here.
- **Point 3**, the transferable version. What the viewer does with it.
- **Close**, about 50 words. One decision, tonight.

## Then run it

```bash
node scripts/episodes-from-plan.mjs plan-episodes.json --dry
node scripts/episodes-from-plan.mjs plan-episodes.json
```

Plan shape:

```json
{
  "figureSlug": "franklin",
  "bookSlug": "autobiography-of-benjamin-franklin",
  "episodes": [
    {
      "slug": "thirteen-virtues",
      "title": "Thirteen Virtues",
      "sourceAnchor": "Part 2",
      "hook": "...",
      "points": ["...", "...", "..."],
      "close": "..."
    }
  ]
}
```

The script measures every episode and **refuses to write any of them** if one is
out of range, telling you exactly how many words to cut or add. Length is the
thing that quietly ruins this format: a 400 word script does not become a 110
second video no matter how well it reads.

It writes the script markdown, a `.handoff.json` per episode carrying per-beat
timings for the visual edit, and a `.series.json` for the book as a whole.

## On NotebookLM

Reasonable for a fast draft or for finding what is interesting in a source you
have not read. It is not the production path here, for three reasons: it has no
public API so it cannot be batched, its two-host format is recognisably generic,
and it cannot use the guide voices in `src/lib/voices.ts`, which is the whole
point of a summon.guide episode. Use it to explore. Ship through this pipeline.

## Anti-patterns

- Twelve episodes that are one book summary sliced twelve ways. Each needs its
  own turn.
- Writing to 400 words and trusting someone to trim it. Write to the format.
- Third person. The voice clone is worthless if the script is a book report.
- Opening with "in this video" or any variant. The hook is the first sentence of
  the argument.
- Shipping a guide with no voice mapping. The script warns; heed it.
