# Editorial renderer

Turns a summon.guide episode into a video, cut on the beat timings the episode
already carries.

```bash
cd remotion && npm install

npm run video:render -- content/episodes/pressfield/turning-pro.handoff.json
npm run video:render -- <handoff.json> --still            # one frame, fast
npm run video:render -- <handoff.json> --voice            # fetch the read from /api/tts
npm run video:render -- <handoff.json> --voice --api https://summon.guide
npm run video:studio                                       # live editing
```

Handoffs are written by `scripts/episodes-from-plan.mjs` and live at
`content/episodes/<guide>/<episode>.handoff.json`.

## What Remotion is

Remotion renders video from React. A composition is a normal component that
receives the current frame as a number, and any CSS or DOM you can write becomes
a frame. To render, it opens the component in headless Chrome, screenshots every
frame, and stitches them with ffmpeg.

Practically that means the video is code, so:

- **The look is the site's look.** The same fonts, palette, and portraits, since
  it is the same CSS. A guide does not become a different product on video.
- **Data drives it.** Pass a different handoff and you get a different episode.
  There is no timeline to drag and no project file to keep in sync.
- **It is deterministic and reviewable.** A frame is a pure function of its
  inputs, so the same handoff always renders the same video, and a change to the
  look is a diff you can read.

What it is not: a generative model. Remotion does not invent footage. It draws
exactly what you specify, which is the reason to use it here.

## Why this and not generated footage

Text-to-video models produce cinematic movement, because that is what they are
trained on. That is right when the footage is the point.

A summon.guide episode is a page read aloud in a guide's voice, where the words
are the show. The screen should behave like print: parchment, ink type, a still
portrait, and motion slow enough that you notice the sentence instead of the
animation. Generated B-roll under a Franklin essay makes it look like every
other AI video, which is precisely what summon.guide is not.

Generative video is still useful here, for texture rather than for content: a
slow paper grain or ink bleed behind the type. A handful of loops covers a whole
series, which sits well inside the free tiers.

## Timing is not decided here

`scripts/episodes-from-plan.mjs` computes seconds per beat, the website prints
those numbers on the episode page, and this cuts on the same ones. One source,
so the page and the video cannot drift.

When audio is supplied, its measured duration wins and every beat is scaled by
the same ratio. The estimate is words over 145 wpm, which is right for planning
a script and wrong for cutting a video, because a real read drifts a second or
two over two minutes and the drift accumulates through the read rather than
landing at the end. Duration is measured with ffprobe through Remotion, which
bundles ffmpeg, so this needs no extra dependency.

## The look

`src/theme.ts` holds it: paper `#F4EFE3`, ink `#1A1713`, gold `#A9781F`, Georgia
for reading type and a monospace for labels. These match the website.

Fonts are system faces on purpose. A webfont fetch that fails during a headless
render falls back silently, and you find out when you watch the file.

## Structure

- `src/theme.ts` palette, type, the handoff types
- `src/Episode.tsx` the composition: title card, then one scene per beat
- `src/Root.tsx` registers it, duration computed from the handoff
- `scripts/render.mjs` renders a handoff, fetches or copies audio into
  `public/` for `staticFile`, rescales beats to real audio, and prints the beat
  table before starting

## History

This began in a separate repo, book.movie, which paired a React frontend with a
backend that sent a `visualPrompt` per beat to Replicate for generated footage.
That repo is retired. What is worth carrying forward is recorded in
`docs/video-essays.md`.
