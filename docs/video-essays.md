# Video essays: where this is, and what book.movie learned

Written 2026-08-01, when the book.movie repo was retired and its renderer moved
here. This exists so the repo can be deleted without losing the reasoning.

## What book.movie was

A separate project, "transform books into AI-generated movies and social media
content using Replicate AI". A React frontend, an Express backend, and an essay
pipeline at `backend/services/essayPipeline.js` that:

1. Split an essay into scene beats, with OpenAI when a key was present and a
   rule-based splitter when it was not.
2. Wrote a `visualPrompt` per beat, describing the shot in prose.
3. Sent each prompt to a Replicate text-to-video model, defaulting to
   `minimax/video-01`, with a dry-run mode that returned a placeholder.

Its beats were `hook, beat_1, beat_2, beat_3, close` and it targeted 90 seconds.

## The thing worth keeping

**Both projects independently arrived at the same five-beat spine.** book.movie
wrote `hook, beat_1, beat_2, beat_3, close`; summon.guide's `episode.ts` writes
`hook, point1, point2, point3, close`, targeting 90 to 120 seconds. Neither knew
about the other. That is decent evidence the shape is right for a short essay,
and `remotion/src/theme.ts` accepts both namings so either can render.

**And the gap it exposes.** book.movie's beats carried a `visualPrompt`.
summon.guide's carry only `role`, `seconds`, and `text`. A summon.guide beat
says what is *said* and never what is *shown*.

That is exactly the difference between what exists now and a video essay.

## What exists now

The editorial renderer in `remotion/`. It is genuinely good at what it does:
parchment, ink type, a still portrait, the sentence held long enough to land. A
rendered episode is 2,958 frames and about 10 MB for 98 seconds.

But it is honestly described as **animated quote cards**. Every beat has the
same visual treatment. The screen carries no information the narration does not.

## What a video essay needs

The screen has to carry meaning the voice does not. In practice that is a small
vocabulary of shot types, each a Remotion component:

- **quote** what exists today: type on parchment. Right for a claim.
- **diagram** a mechanism drawn while it is explained. Right for "here is how
  Resistance works" or "here is how the library was funded".
- **number** one figure, large, arriving on the beat. Fifty subscribers at forty
  shillings wants this.
- **timeline** a sequence with positions. Right for the three-part structure of
  a book, or a life.
- **comparison** two columns. Amateur against professional is the obvious case.
- **portrait** the guide, held, for the personal beats.

Which means the episode format needs one more field per beat, naming the shot
and its data. That is the same move book.movie made with `visualPrompt`, except
pointing at a component rather than at a generative model, so the output is
deterministic and on-brand instead of cinematic and generic.

Sketch:

```json
{
  "role": "point2",
  "seconds": 24,
  "text": "Fifty men who could not afford a library apiece now had one between them.",
  "shot": { "type": "number", "value": "50", "label": "subscribers at forty shillings" }
}
```

`scripts/episodes-from-plan.mjs` would accept `shot` alongside `text`, the
`.claude/skills/book-to-episodes` skill would ask for it when writing a plan,
and `remotion/src/Episode.tsx` would switch on `shot.type` instead of rendering
every beat the same way.

### book.movie's actual beat-generation prompt

Before the repo was retired, `backend/services/essayPipeline.js` had a working
prompt that generated a `visualPrompt` per beat. It is the closest thing that
existed to a solved version of the `shot` field above, so it is worth reading
before writing a new one from scratch. Its system prompt, verbatim:

```
You are a video essay director for short-form social video (60-120 seconds).
Turn the essay into exactly 5 beats with roles: hook, beat_1, beat_2, beat_3, close.
Each beat needs:
- role (one of those five)
- narration (spoken line, 1-3 sentences, concise)
- visualPrompt (detailed image/video generation prompt; cinematic; <style>)
- durationSec (integer; sum should be 60-120, prefer ~90)

Respond ONLY with JSON: { "beats": [ ... ] }
```

It also shipped a rule-based fallback for when no LLM key was present: split
the body into sentences, chunk them evenly across the five roles, and build
`visualPrompt` from a template (`Cinematic short-form vertical video for a
{roleLabel} about "{title}". Scene: {chunk}`). That fallback is not worth
reusing (it is generic sentence-slicing, not a real judgment about what to
show), but the schema shape (`role`, `narration`, `visualPrompt`, `durationSec`
per beat, exactly 5 beats, JSON-only response) is a reasonable starting point
for the prompt that would ask an LLM to fill in `shot` instead of
`visualPrompt`, e.g.:

```
Turn this essay beat into exactly one of six shots: quote, diagram, number,
timeline, comparison, portrait. Respond with { "type": ..., and the fields
that shot needs (a "value" and "label" for number, "steps" for timeline, etc.) }.
Prefer quote only when nothing more specific is true of the beat.
```

The difference from book.movie's version is the target: book.movie's prompt
aimed at a generative video model and had to describe a whole cinematic scene
in prose. This one aims at a fixed Remotion component and only has to name
the type and hand it structured data, which is a smaller and more reliable
thing to ask an LLM for.

## What was not carried over

- The React frontend. It was a separate product surface and summon.guide already
  has one.
- The Replicate integration. Generated footage is the wrong default here, for
  the reasons in `remotion/README.md`. If it comes back it should be for texture
  behind the type, not for the content of a shot.
- `taskAnalysis.js` and the company documents, which were project scaffolding
  rather than anything this repo needs.

## Open question

The reference the owner pointed at is an animated educational explainer on
monetary history. Its actual visual grammar has not been studied, so the shot
vocabulary above is reasoned from first principles rather than copied from
something known to work. Worth watching properly before building the components.
