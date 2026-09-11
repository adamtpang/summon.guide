# UPGRADE_SESSION: summon.guide (2026-07-28)

Cash-first media upgrade: **guide speaks a short essay** for a 90–120s video voiceover.

---

## Diagnosis

| Area | Finding |
| --- | --- |
| Product | Premium guide/mentorship (editorial print). Chat + matching exist. |
| Voice | `elevenlabs` already in `package.json`. `POST /api/tts` streams chat replies and homepage intros. |
| Gap | No paste-script path, no episode template, no mp3 download UX, no book.movie handoff. Chat TTS capped at 2000 chars. |
| Demo guide | Benjamin Franklin (`franklin`): classic essay voice; voice ID mapped (`Callum`). |
| Env (local) | `.env.local` has DB/auth secrets only: **no `ELEVENLABS_API_KEY`** → live audio cannot generate until key is set. |

**Verdict:** Wiring was 70% there (TTS API + voice map). Missing surface was script mode + media handoff. Shipped that surface; audio proof blocked on API key.

---

## Files changed / added

### Added
- `src/app/speak/page.tsx`: Script mode UI (guide picker, episode template, paste, generate/play/download, handoff)
- `src/app/speak/layout.tsx`: Metadata for `/speak`
- `src/lib/episode.ts`: Hook → 3 points → close; duration helpers; Franklin demo
- `src/lib/voices.ts`: Shared `VOICE_MAP`, TTS limits (chat 2k / script 4k)
- `content/demos/franklin-thirteen-virtues.md`: Demo script artifact
- `BOOK_MOVIE_HANDOFF.md`: “Here is the audio; visuals next.”
- `UPGRADE_SESSION.md`: this file

### Updated
- `src/app/api/tts/route.ts`: `mode: "script"`, download disposition, shared voices lib
- `src/app/page.tsx`: Homepage card → `/speak`
- `src/app/sitemap.ts`: `/speak`
- `OFFER.md`: one-liner filled
- `EVIDENCE.md`: results log row

---

## What shipped

1. **Script mode** (`/speak`): paste essay or fill template → select guide → generate voiceover → play + download mp3.
2. **Episode template**: hook → 3 points → close; word count + ~duration @ 145 wpm; target 90–120s.
3. **Demo path**: Franklin “Thirteen Virtues”, one click **Load Franklin demo** on `/speak`. Script also at `content/demos/franklin-thirteen-virtues.md`.
4. **book.movie handoff**: dark card on `/speak` + `BOOK_MOVIE_HANDOFF.md` with contract and next visual steps.
5. **TTS upgrade**: script mode allows 4000 chars; `Content-Disposition` for download naming `{slug}-voiceover.mp3`.

Design: warm parchment page (skills-style), serif H1, tracked eyebrows, black primary buttons, not a SaaS dashboard.

---

## Blockers (env keys)

| Key | Needed for | Local status |
| --- | --- | --- |
| `ELEVENLABS_API_KEY` | `/api/tts` mp3 generation | **Missing** in `.env.local` |
| `ANTHROPIC_API_KEY` (or OAuth) | Chat / match (not required for pure TTS) | Not in local env snapshot |

**To unblock audio proof:**
```bash
# .env.local
ELEVENLABS_API_KEY=sk_...
npm run dev
# open http://localhost:3000/speak → Load Franklin demo → Generate & play
```

Also set the same key in Vercel project env for production.

---

## Proof

| Claim | Status |
| --- | --- |
| Adam can produce a guide voiceover from a short essay in one session | **UI + API path shipped**; live mp3 needs `ELEVENLABS_API_KEY` |
| Script artifact | `content/demos/franklin-thirteen-virtues.md` |
| Handoff | `BOOK_MOVIE_HANDOFF.md` |
| Offer one-liner | Filled in `OFFER.md` |
| Generated voiceover file path | After first successful generate: browser download `franklin-voiceover.mp3`; session also stores metadata in `localStorage.summon_last_voiceover` |

### Falsifiable proof test

1. Add `ELEVENLABS_API_KEY` to `.env.local`.
2. `npm run dev` → `/speak` → **Load Franklin demo** → **Download mp3**.
3. **Pass if:** file `franklin-voiceover.mp3` downloads, plays ~90–120s, and is intelligible spoken English in Franklin’s mapped voice.
4. **Fail if:** 500 from `/api/tts`, empty body, or duration outside ~70–150s for the demo script.

---

## Next session paste

```
Continue summon.guide voiceover path.

1) Ensure ELEVENLABS_API_KEY in .env.local (and Vercel).
2) Proof: /speak → Load Franklin demo → Download mp3; log path + duration in EVIDENCE.md.
3) book.movie: import franklin-voiceover.mp3 as timeline master; cut on sentence boundaries; editorial stills/type (see BOOK_MOVIE_HANDOFF.md).
4) Optional: persist generated mp3 under public/demos/ once proven (git-lfs or CDN if large).
5) Do not rebuild all guides. Cash-first: one published short with Franklin VO + book.movie picture.

Key files: src/app/speak/page.tsx, src/app/api/tts/route.ts, src/lib/episode.ts, BOOK_MOVIE_HANDOFF.md, content/demos/franklin-thirteen-virtues.md
```

---

## Success criteria (prompt)

- [x] Script mode paste → guide → audio download path
- [x] Episode template hook / 3 points / close
- [x] One demo guide path (Franklin)
- [x] book.movie handoff note
- [x] DESIGN.md respected (editorial, minimal)
- [ ] Live voiceover artifact logged (blocked on API key, run proof test above)
- [x] OFFER.md one-liner filled
