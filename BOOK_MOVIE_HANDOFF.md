# book.movie handoff — summon.guide voiceover

**Status:** Audio path shipped on summon.guide. Visuals live in book.movie / Remotion.

## One line

**Here is the audio; visuals next.**

## What summon.guide produces

| Field | Value |
| --- | --- |
| Product surface | https://summon.guide/speak (local: `/speak`) |
| Demo guide | Benjamin Franklin (`franklin`) |
| Demo script | `content/demos/franklin-thirteen-virtues.md` |
| Episode shape | Hook → 3 points → close (~90–120s) |
| API | `POST /api/tts` with `{ text, figureSlug, mode: "script", download: true }` |
| Output | `audio/mpeg` mp3 (ElevenLabs) |
| Artifact name | `{slug}-voiceover.mp3` e.g. `franklin-voiceover.mp3` |

## How Adam produces audio in one session

1. Set `ELEVENLABS_API_KEY` in `.env.local` (or Vercel env for prod).
2. `npm run dev` → open `/speak`.
3. Click **Load Franklin demo** (or paste any short essay).
4. **Generate & play** to hear; **Download mp3** for the file.
5. Copy handoff from the dark card on `/speak` (or use this file).

## What book.movie should do next

1. Accept the mp3 as the **master timeline** (duration = audio duration).
2. Split script into beats (sentences / points); cut visuals on those boundaries.
3. Visual language: editorial print — warm parchment, ink type, still portraits, restrained motion. No SaaS dashboard chrome.
4. Optional: pull guide portrait from summon.guide `public/portraits/benjamin-franklin.jpg`.
5. Export a 90–120s vertical or 16:9 essay short.

## Contract (stable)

```json
{
  "source": "summon.guide",
  "guideSlug": "franklin",
  "guideName": "Benjamin Franklin",
  "audio": "franklin-voiceover.mp3",
  "format": "audio/mpeg",
  "scriptPath": "content/demos/franklin-thirteen-virtues.md",
  "targetSeconds": [90, 120],
  "structure": ["hook", "point1", "point2", "point3", "close"],
  "aesthetic": "editorial-print"
}
```

## Env blocker

Without `ELEVENLABS_API_KEY`, `/api/tts` returns 500. Script assembly and download UI still work; audio bytes do not.
