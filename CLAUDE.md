@AGENTS.md

# Project Status

## What's Built
legends.guide v2 — streaming chat with 10 founders, compare feature, source citations. Builds cleanly.

### Architecture
- **Next.js 16 + Tailwind CSS v4 + TypeScript** (App Router)
- **OpenRouter waterfall** for chat: two live-ranked free quality models, then one capped-cost fallback, with SSE streaming
- **No database** — knowledge chunks embedded directly in system prompts (sufficient for 10 founders)
- **Modular AI config** — model/provider swappable via `AI_CONFIG` in figures.ts

### File Map
- `src/lib/figures.ts` — 10 founder definitions with deeply researched system prompts, knowledge chunks with source citations, and `AI_CONFIG` for model swapping
- `src/app/page.tsx` — Landing page: dark grid of 10 FigureCards + Compare CTA
- `src/app/chat/[figure]/page.tsx` — Streaming chat UI: header, message thread, real-time token streaming, typing indicator
- `src/app/compare/page.tsx` — Compare page: pick 2 founders, ask same question, parallel streaming responses side-by-side
- `src/app/api/chat/route.ts` — POST route: entitlement-aware SSE streaming through the OpenRouter waterfall
- `src/components/FigureCard.tsx` — Card with gradient avatar, name, era, hook
- `src/components/ChatMessage.tsx` — Message rendering with citation parsing and display

### The Founding 10
1. John D. Rockefeller — wealth, discipline, monopoly (Titan by Chernow)
2. Steve Jobs — product, taste, focus (Isaacson biography)
3. Jeff Bezos — Day 1, customer obsession (Everything Store, Invent and Wander)
4. Elon Musk — first principles, speed (Isaacson, Vance biographies)
5. Jensen Huang — NVIDIA, suffering, conviction (The Nvidia Way)
6. Peter Thiel — monopoly, contrarian thinking (Zero to One)
7. Charlie Munger — mental models, inversion (Poor Charlie's Almanack)
8. Benjamin Franklin — self-improvement, reinvention (Autobiography, Isaacson)
9. Sam Walton — retail, hustle, culture (Made in America)
10. Naval Ravikant — leverage, specific knowledge, happiness (Almanack)

## Deploy Checklist
- [x] Set OPENROUTER_API_KEY in Vercel Production and Preview
- [ ] `npx vercel --prod`
- [ ] Point legends.guide domain to Vercel

## Future (v2+)
- [ ] Add real portrait images (update `portrait` field in figures.ts)
- [ ] ElevenLabs TTS voice clones per founder
- [ ] Supabase + pgvector RAG when scaling to 50+ founders
- [ ] Web search integration for real-time knowledge
- [ ] Conversation persistence (database)
- [ ] Auth for premium features

## Summon packs (2026-08-17)

- Added a project-level one-command installer: `npx --yes github:adamtpang/summon.guide summon install <dave-ramsey|elon>`.
- The installer creates portable source assets in `.summon/`, project-local skills for Claude Code and Codex, and the `summon-guide` remote MCP configuration.
- Added `/summon`, the site dashboard for the first two packs: Dave Ramsey (personal finance) and Elon (engineering and business). Both are clearly labeled as educational systems inspired by public material, not impersonations or personalized professional advice.

## Summon Member (2026-08-17)

- Added `/connect`, the member dashboard for connecting Claude, ChatGPT, and Codex/Claude Code.
- Added an OAuth authorization server for remote MCP clients: dynamic client registration, S256 PKCE, rotating refresh tokens, protected-resource metadata, and entitlement-aware MCP access.
- Added server-side membership enforcement. All guide calls require an active `Summon Member` entitlement and consume from the five-session monthly allowance. Do not rely on the browser credit counter for paid access.
- Stripe activation is launch configuration, documented in `docs/summon-membership-launch.md`. Apply the Prisma schema to the production database before enabling checkout.

## Corpus rendering and Paul Graham (2026-08-24)

- Added `/distillations` plus `/distillations/[slug]`, backed directly by the one-page Markdown files in `content/distilled/`. There are 47 rendered previews at this checkpoint.
- Added a source-backed Paul Graham guide, installable skills, six original public essay syntheses, and a `paul-graham-essays` source-chat corpus.
- Added `scripts/sync-web-corpus.mjs`; official-source syncs archived 232 Paul Graham pages, 570 Derek Sivers pages, 190 Visakan pages, and 2,211 Tim Ferriss pages (3,203 total) under private `sources/web/*/_raw/` directories with zero remaining failures. Raw source text is not public content.
- Added `scripts/sync-youtube-corpus.mjs` as the YouChop handoff. It uses YouChop's local transcript path and moves raw output into a private `_raw/` layer; original public syntheses are still required before chat grounding is rebuilt.
- Added the App Mafia rendering slot and private course intake instructions. Chat remains disabled until authorized source files have been synthesized.
- Diagnosed the production Starter Story failure as expired shared Anthropic OAuth credentials, not missing corpus data. Reseeded the credential and verified a live streaming response; a metered `ANTHROPIC_API_KEY` remains the durable production fix.
- Verification: `npx tsc --noEmit` and `npm run build` pass. Next reports one pre-existing broad filesystem-trace warning through `src/lib/ranking.ts`.

## Ben Cera / Polsia corpus (2026-08-27)

- Staged a private YouChop corpus at
  `content/knowledge/ben-cera-polsia`: 6 episodes, 16,103 words, and 6 timestamped
  Markdown pages under `brain/pages/`.
- Two videos had no YouTube captions and were transcribed locally with
  `faster-whisper`; no hosted transcript credits or provider key were used.
- `GUIDES.md` is generated by `scripts/gen-guide-inventory.mjs` and now lists Ben
  Cera / Polsia as an additional `corpus-staged` source with 6 corpus documents.
- Ben Cera is not yet registered as a public guide in `src/lib/figures.ts`, and the
  private transcripts must not be republished. Original synthesis is still required
  before public guide or chat grounding work.

## Book PDF finder agent (2026-08-27)

- Added a project-local Claude agent at `.claude/agents/book-pdf-finder.md`.
- It reuses `scripts/find-book.mjs` and `.claude/skills/find-book/SKILL.md`, then escalates only to author, publisher, institutional, library, or retailer sources.
- It is read-only and explicitly refuses shadow libraries, access-control bypass, DRM removal, purchases, borrowing, logins, and gated downloads.
- Added `docs/agents-quickstart.md` explaining when Codex subagents are sufficient and when to promote a repeated role into a named agent, skill, or MCP-backed worker.
- A live agent inspection found that local files named `antifragile` and `the bed of procrustes` are Bookey summaries, not Taleb's primary texts. They remain unverified secondary sources and are not corpus-ingestible as Incerto. Tightened local-file classification and DOAB title matching so filenames cannot be mistaken for verified corpus rights.

## Agent-first guide model (2026-08-27)

- Added `src/lib/guideAgents.ts` as the canonical product registry: every person, book, and channel is a durable `GuideAgent` with sources, skills, capabilities, runtime, and cross-project memory scopes.
- Projects are assignment containers, not owners of agents. Agent memory follows the specialist; assignment memory remains isolated to one project.
- Updated `/summon` from a two-pack page into the agent roster while retaining one-command installs for Dave Ramsey and Elon.
- Added `docs/guide-agent-model.md` as the architecture and product-language reference.

## OpenRouter free-to-saver waterfall (2026-08-29)

- Replaced Anthropic as the active runtime for guide chat, source chat, guide matching, and quote extraction. Legacy Anthropic helpers remain unused as rollback code.
- Added `src/lib/openrouter.ts`, adapted from the proven `waterfall.sh` routing shape: refresh the live catalog every six hours, choose two compatible free quality leaders, then one compatible model under the default $0.25/M input and $1.50/M output caps.
- OpenRouter performs provider/model fallback, and Summon additionally retries successful responses that contain no text. Requests deny providers marked as collecting model inputs.
- Both chat surfaces render a compact shadcn model badge showing Free/Saver, the actual model, and fallback depth. The browser SSE parser now handles network-split frames correctly and surfaces upstream errors without decrementing browser credits.
- Stored `OPENROUTER_API_KEY` as a sensitive Vercel setting for Production and Preview. Local development reads Adam's existing OpenRouter key file only at process start; no secret is committed.
- Live verification: Paul Graham source chat streamed through `minimax/minimax-m3:free` at fallback depth 1 while the data-collection-deny policy was active; `/api/match` and `/api/extract-quote` also returned valid results. `npx tsc --noEmit` and `npm run build` pass. Full-repo lint remains blocked by four unrelated pre-existing errors in Remotion, `gen-grounding.cjs`, and `AmbientMusic.tsx`.
- Deployed the tested preview to production as Vercel deployment `dpl_DEUgpbQys2z7pSf4et6GGy9VMHHV`. A post-deploy request to `https://summon.guide/api/chat/source` returned HTTP 200, 46 SSE events, `minimax/minimax-m3:free`, fallback depth 1, and `[DONE]` with no error. Vercel's large-function beta is enabled because the pre-existing dynamic filesystem trace makes `/library` exceed the normal function bundle limit.

## Problem-first intake and chat redesign (2026-08-30)

- The homepage now starts with a dark, problem-first chatbox. Users can describe
  a life problem or search for a named person without navigating elsewhere first.
- Added a ChatGPT and Claude context-import dialog that generates a
  privacy-conscious extraction prompt, accepts a reviewed Markdown brief, and
  attaches the brief through one-time session storage instead of a URL query.
- `/api/match` now reasons across situation, problems, goals, priorities,
  constraints, and patterns to select the guide and skill best suited to the
  user's highest-leverage current bottleneck.
- Guide and source chats share a shadcn composer, clearer empty states, durable
  citations, editorial response cards, accessible loading states, and 44px+
  controls. Imported context is collapsed into a reviewable attachment card.
- Visual direction references shadcn `login-03` for focused hierarchy while
  preserving Summon's warm-paper and ink system. See `DESIGN.md` for the rules.
- Local verification: structured founder context routed to Paul Graham plus
  `/paul-graham:do-things-that-dont-scale`; homepage, guide chat, and source chat
  returned HTTP 200; Helium passed desktop and 390px mobile overflow and target
  checks; focused ESLint, TypeScript, and production build pass.
- Deployed to production as `dpl_CMENMypVuMYGiE1KomiX3aLzhpt5`. Public checks
  confirmed the new intake and import controls, HTTP 200 for both chat shells,
  and structured context routing to Paul Graham with the correct playbook.

## Free Google sign-in testing mode (2026-08-30)

- Guide chat still requires a Summon identity, but testing access is free and
  does not consume membership sessions or browser credits. Set
  `SUMMON_ACCESS_MODE=paid` to restore the paid entitlement path.
- A question, suggested prompt, or imported personal brief is saved in
  per-guide session storage before Google sign-in. Auth.js returns to the exact
  guide URL, automatically resumes the pending request, and clears the stored
  context only after the guide answers successfully.
- The homepage and `/connect` explicitly say that no payment is required during
  testing. Google remains the only identity provider and Prisma remains the
  durable user/session store.
- Production deployment `dpl_9MnwFyug4uPatR18LUoftuMCnsX6` is live on
  `summon.guide`. Public verification confirmed testing mode, the Google
  provider/callback, and an Auth.js sign-in POST that returns a real
  `accounts.google.com` authorization URL.
- Fixed the remaining Google-side `redirect_uri_mismatch` in Cloud project
  `legends-guide` for OAuth client `legends-guide-web`. The client now retains
  localhost and `legends.guide` while also allowing the
  `https://summon.guide` origin and
  `https://summon.guide/api/auth/callback/google` redirect. A fresh production
  authorization request is accepted by Google without the mismatch error.

## Distillation ownership audit and Bookbox handoff (2026-08-30)

- The canonical agent registry currently contains 106 agents: 48 people, 54
  books or written collections, and 4 channels.
- `content/distilled/` contains 47 one-page Markdown files: 46 ready and the App
  Mafia course placeholder awaiting an authorized source. Semantic coverage is
  2/48 person guides (Paul Graham and David Senra), 40/54 books, and 4/4
  channels. David Senra's file is named `david-senra.md` while his agent slug is
  `senra`, so slug-only audits undercount it.
- Platonic ownership boundary: summon.guide owns people, channels, routing, and
  assignments; bookbox.ink owns book discovery, rights-aware ingestion, private
  corpora, canonical book distillations, book chat, frameworks, exercises,
  skills, and book agents. Summon consumes Bookbox through a stable contract.
- Added the evidence-backed `bookbox.ink` kin edge and `handoff-book-system`
  exchange recipe in `repos.yaml`. Proposal
  `20260830T075018488Z-d5ca2cec` was approved and completed.
- Bookbox now owns the first complete book-agent vertical for `meditations`:
  verified Project Gutenberg rights, a corrected Meric Casaubon edition record,
  12-book chapter map, canonical `distillation.md`, three derived skills, cited
  retrieval chat, profile/API routes, and `bookbox.book.v1` plus
  `bookbox.chat.v1` contracts. Its 54-book audit records 13 complete, 39 partial,
  2 pending, 40 chat-ready, and 14 without a corpus path.
- Compatibility contract `bookbox.ink/docs/compatibility/summon-v1.md` preserves
  Summon's existing profile, source-chat, distillation, and skill URLs. Summon
  has not switched its Meditations backing implementation yet; that adoption is
  the next bounded integration step.
- Bookbox verification: 4/4 tests, TypeScript, ESLint, and Next.js production
  build passed. No deployment, commit, push, or copyrighted source publication
  was performed.

## In-app guide request queue (2026-08-31)

- Added a signed-in request flow to `/summon#request-guide`, seeded with Don
  Valentine, Michael Moritz, and Doug Leone as quick examples. Requests can be
  people, channels, or books and include the user's problem plus an optional
  canonical source URL.
- Requests persist in PostgreSQL with normalized per-user deduplication, a
  ten-per-day abuse limit, and visible onboarding statuses. Drafts survive the
  Google OAuth redirect. Existing live guides route to their agent page instead
  of creating duplicates.
- The app now shows the eight-gate guide onboarding checklist: demand, identity
  boundary, rights/source map, cited corpus, one-page distillation, skills and
  tools, evaluation, and runtime/launch. Book requests explicitly hand source
  and rights work to Bookbox while remaining visible in Summon's request queue.
- Added Prisma migration `20260831000000_add_guide_requests`; it must be applied
  to the target database before deployment. TypeScript, focused ESLint,
  `git diff --check`, and the production build pass. Local HTTP checks returned
  200 for `/summon`, 401 for the unauthenticated request API, and confirmed all
  request-panel copy. Helium visual verification remains pending its one-time
  remote-debugging permission; this work has not been deployed.

## Founders Notes / Sage parity slice (2026-08-31)

- Confirmed Sage as the explicit parity target and recorded the dated capability
  map in `FEATURE-PARITY.md`. Public evidence shows the core loop is concise
  cross-corpus advice over every transcript, private note, and highlight, plus
  keyword search, source browsing, suggested questions, a Discover/Library
  direction, continuous corpus growth, and model upgrades.
- Added `/founders-lens`, an original independent surface over Summon's 49
  selected public-episode syntheses. It includes episode search, solo/interview
  filters, six decision-oriented discovery prompts, source links, and prompt
  handoff into cited Founders corpus chat.
- The page prominently links the official Founders Notes product and states that
  Summon is unaffiliated, does not contain David Senra's private notes or
  highlights, and does not imply endorsement. `docs/david-senra-community-release.md`
  defines the rights, owner-control, pilot, evaluation, and approval gates before
  any community launch.
- TypeScript, focused ESLint, `git diff --check`, and the production build pass.
  Local HTTP checks returned 200 for the landing and chat routes and verified
  query-prefill handoff. Local generation cannot answer without an
  `OPENROUTER_API_KEY`, but a production smoke test returned a 914-character
  answer with route metadata, citations, follow-ups, and no error. No deployment
  or community outreach was performed.

## Full Founders refresh, retrieval, and last-company handoff (2026-09-02)

- YouChop refreshed both public YouTube feeds into ignored private storage under
  `summon.company/knowledge`: 169/169 Founders episodes (2,107,210 words) and
  37/37 David Senra interviews (746,421 words), with zero caption failures.
- Added deterministic, inspectable query-aware retrieval over title, guest,
  principle, and lesson text. Large source chats now ground on the 16 most
  relevant original syntheses instead of sending the whole corpus each turn.
- Added public-safe original syntheses for Henry Singleton and Doug Leone, then
  regenerated `src/lib/sourceCorpus.ts`; the Founders surface now has 51 cited
  syntheses. Raw transcripts remain private and are never shipped in the app.
- Founders Lens now searches lesson text and includes a "Choose your last
  company" job linking into optimism.fun's private-on-device Last Company Lab.
- TypeScript, focused ESLint, and the production build pass locally. Deployment,
  owner authorization, and community release were not performed.

## Controllable Sage parity workspace (2026-09-02)

- `FEATURE-PARITY.md` now distinguishes local product-capability parity from
  proprietary corpus equivalence. The controlled loop is complete: frame a live
  decision, search or discover ranked precedents, inspect original synthesis
  notes and public sources, ask cited corpus chat, and save questions privately
  on-device.
- `/founders-lens` is now a unified Discover, Search, and Saved workspace over
  51 public-safe syntheses. It shows the 206-source private research inventory,
  24.8% editorial coverage, corpus freshness, local index health, publication
  boundary, and runtime policy without exposing transcript text.
- Added repeatable corpus operations: `npm run corpus:founders:status` generates
  the public-safe status and 155-item synthesis queue; `npm run
  corpus:founders:refresh` refreshes both YouTube feeds into ignored private
  storage and can optionally rebuild the local semantic indexes.
- Added an eight-case retrieval acceptance suite. `npm run eval:founders` passes
  8/8 with MRR 0.792 across capital allocation, control, company selection,
  hiring, market education, independence, failure, and focus decisions.
- Source-chat runtime controls are explicit: up to 16 eligible syntheses,
  mandatory citations, no raw transcript runtime access, and provider input
  retention denied. Helium verified the saved-question and ranked-search flows,
  plus a 390px mobile layout with no horizontal overflow and 44px tabs.
- The remaining controlled work is editorial, not product scaffolding: produce
  the 155 queued original syntheses and gather real answer-quality evidence.
  Hosted transcript retrieval, David's private notes/highlights, owner UI, and a
  community release remain gated by written rights and owner authorization. No
  deployment or community outreach was performed.

## The council: life context from themain.quest (2026-09-05)

- themain.quest now mails Adam's life-context brief (`# Personal context`:
  situation, problems, goals, priorities, constraints, patterns, guidance,
  open questions) to this repository as a repos.chat `notice` with subject
  `life-context`. `src/lib/lifeContext.ts` reads the newest one from
  `<workspace>/.repo-connect/mail/summon.guide/` (override the workspace with
  `REPOS_CHAT_ROOT`); on Vercel no mailbox exists and it returns null, so
  production keeps the paste-a-brief path.
- `src/lib/council.ts` is pure: a domain-overlap ranking that never needs a
  model, the council prompt, and a validator that drops invented slugs and
  commands and fills any gap from the ranking. `POST /api/council` (signed-in
  or MCP token) loads the mailed brief or accepts a pasted one, seats three
  guides through the OpenRouter waterfall, and falls back to the ranking when
  the router is unavailable. Seating does not consume a membership session.
- `/council` shows the brief for review (collapsed), the primary seat, and two
  more seats, each with a role, the specific thing that guide did, and the
  first question to ask. "Ask" stores the brief plus that question in the
  same `summon_intake` session storage the homepage uses and opens
  `/chat/<slug>?intake=1`, so nothing personal touches a URL and the guide
  receives the brief as an attached message. The homepage intake now links to
  it ("Seat the council").
- `POST /api/chat` appends a LIFE CONTEXT rule block whenever a user message
  is a `# Personal context` brief: answer the named quest, do not recite the
  brief, take one position on the fork, ask about stated open questions, do
  not speculate about other people's names.
- `extractJsonObject` moved to `src/lib/jsonExtract.ts` and is shared by the
  match and council routes. `npm run smoke:council` seats a real council from
  the mailbox without a browser (uses `scripts/node-server-shim.mjs` so plain
  Node can import server modules; `--env-file-if-exists=.env.local` supplies
  the OpenRouter key locally).
- Verification: `npx tsc --noEmit` (after `prisma generate`), focused ESLint,
  and `npm run build` pass; `/council` and `/api/council` compile. `repos
  verify` confirms both manifests (138 claims, 0 broken). Live smoke against
  notice `20260905T061115475Z-8b047d60` (639 words) seated Senra, Pressfield,
  and Taleb on one run and Pressfield, Seneca, and Rockefeller on the next
  through `minimax/minimax-m3:free`; Pressfield recurs because the brief names
  the Toolsmith's Trance condition. The no-model fallback returns Dalio, Curie,
  Pressfield. Not deployed; the mailbox path is local by design.

## Call-style guide interface (2026-09-06)

- Person-guide chats now open in a portrait-centered call screen with listening,
  thinking, speaking, microphone, captions, inline typing, interrupt, and end
  controls. Returning to chat retains the conversation and cited transcript.
- `GuideCall.tsx` uses browser speech recognition with interim transcription,
  automatic listening between turns, explicit microphone activation, cleanup on
  mute/end/unmount, and a typing fallback for unsupported/denied voice input.
- The existing ElevenLabs reply pipeline now cancels pending audio requests on
  interrupt/end and reports playback failures. Voice requests ask the grounded
  guide for short conversational replies; authentication remains enforced.
- Verified TypeScript, focused ESLint, production build, and diff whitespace.
  Helium 390px check: no horizontal overflow; controls >=44px. Simulated browser
  recognition verified listening, mute cleanup, and spoken-question preservation
  through the sign-in gate. No real microphone or paid TTS quality test was run.
- This is turn-based speech recognition + chat + TTS, not full-duplex realtime
  audio. True voice barge-in and low-latency streaming speech remain future work.
  Not deployed. Existing broad filesystem tracing warnings remain in the build.

## Bounded overnight call verification (2026-09-06)

- Added DRAFT `scripts/test-guide-call.py`: isolated Helium tab, mocked browser
  recognition and Audio, synthetic session/chat/TTS responses, API network block,
  and real getUserMedia rejection. Planned checks cover unsupported API, denial
  without retry, mute/unmute, interrupt, captions, transcript/citations after end,
  and rejected audio replay. The script is not yet validated.
- Blocked before any test case: Helium Harness requested remote-debugging
  approval. Stopped after the first attempt; did not retry or approve the prompt.
  Stopped the temporary Next dev server on port 3107.
- Inspection candidate only: replayAudio calls audio.play() without catching a
  rejected promise, which may leave Speaking stuck. No application fix was made
  because browser reproduction was blocked. At most one fix remains authorized
  for a future explicitly resumed pass.
- Morning owner question: enable Helium remote debugging to run the deterministic
  suite? Real microphone/audio quality is a separate owner test. No microphone,
  paid backend, deployment, commit, push, provider addition, or external messaging.

## Guide intake and verified call replay (2026-09-07)

- Added `data/guide-intake.json` and `/onboarding`: eight reviewable briefs for
  Alysa Liu (alias Alyssa Liu) plus Isaacson's seven individual biography subjects.
  Five missing people are now canonical person agents with `availability: building`,
  `runtime: pending`, no capabilities, and no chat URL. Franklin, Steve Jobs, and
  Elon retain their existing agents; no duplicate profiles were created.
- The in-app process shows all eight gates, required evidence, proposed skill,
  evaluation question, identity boundary, reference-only source lead, and next
  action. Gates 1-2 are documented; corpus, rights, synthesis, skills, evaluation,
  and launch are explicitly unfinished. Existing chat is not presented as proof
  of a completed quality audit. Books stay within Bookbox's ownership boundary.
- Source identities were checked against Team USA and Simon & Schuster. No book
  or interview text was ingested. The scope of protagonists from group books
  (The Innovators, The Wise Men, etc.) remains a separate open user question.
- The roster links to onboarding, supports Alyssa spelling in search, and the
  inventory generator now includes the intake. `/onboarding` and `/summon` return
  200 with all eight names; there is no `/chat/alysa-liu` link. Helium at 390px
  confirmed eight briefs, eight steps, and no horizontal overflow.
- Confirmed and fixed one audio lifecycle defect: rejected `replayAudio.play()`
  promises are now handled, restore replay availability, clear Speaking, and
  ignore errors from replaced/interrupted audio instances.
- `scripts/test-guide-call.py` now passes deterministic Helium checks for unsupported
  API, denial/no retry, retry, mute/unmute, mocked playback, captions, interrupt,
  end cleanup, retained history/citations, and rejected replay. Initial runs were
  invalid because Page was not enabled before new-document mock injection; added
  Page.enable and a fail-closed mock assertion before any mic control. The passing
  run used only synthetic session/chat/TTS and mocked recognition/audio; real
  audio quality remains an owner test. Focused ESLint and TypeScript pass.
- No deployment, commit, push, paid-backend request, or private source publication.

- Production build passes (existing ranking trace warnings). Persistent local preview started on 127.0.0.1:3107; logs in ignored .next/preview.*.log.

## Eve guide packages (2026-09-07)

- Ran the requested skills installer, selecting only `eve` from vercel/eve,
  project-scoped for Codex and Claude Code. Canonical skill: .agents/skills/eve;
  installer lock: skills-lock.json. Installed eve 0.52.2 (Node >=24).
- `scripts/gen-eve-guides.mjs` generates 111 independent Eve applications from
  the full GuideAgent registry under eve-guides/<kind>-<slug>. Each has identity,
  registry status, source/skill references, agent.ts, and the Eve skill. Regenerate
  with `npm run agents:generate`; verify exact content with `npm run agents:check`.
- All packages are authored, not runtime-enabled. Dynamic model selection rejects
  activation until approved routing, auth, entitlement, retrieval, and session
  isolation are integrated. Default tools are disabled. Existing OpenRouter web
  chat remains unchanged. Pending guides are still pending; no new source access
  or source-quality evidence is implied. No provider calls or deployment performed.
- Derek Sivers's representative Eve package compiled with the actual Eve compiler
  and --skip-sandbox-prewarm. Generation parity passes for all 111; the other 110
  packages have not individually received a full compiler build.
- Eve session/build artifacts are ignored and excluded from Next file tracing.
  The engineering skill becomes available to the coding assistant next turn.
- Located Sivers's original social-distribution essay at https://sive.rs/socials,
  dated 2026-03-12, for the user's requested explanation; not a newly ingested corpus.

## Sage URL and agent direction (2026-09-08)

- Adam selected `/sage` for the independent Founders research workspace. Moved
  the full workspace there, updated title/canonical, book navigation, and sitemap;
  `/founders-lens` permanently redirects with query preservation and retains a
  compatibility route. Existing disclosure and official-product link remain.
- Public URL convention is `/<slug>` independent of agent framework; individual
  profile/chat route consolidation remains future work. Sage is a cross-corpus
  experience; guide identities can share infrastructure and need not all run per turn.
- Rechecked foundersnotes.com public claims. Corrected FEATURE-PARITY.md's prior
  blanket pass: authenticated feature parity and answer quality remain unverified.
- Current Founders module has 109 records. Retrieval eval is now 5/8, MRR 0.604,
  with last-company/focus at rank 4 and hiring outside top 10 as new records rank
  above old fixtures. No ranking changes or weakened tests were made. Next work
  is relevance review across the expanded corpus and corpus-status refresh.
- Local HTTP 200 for `/sage`; legacy URL with query returns 308 preserving query.
  TypeScript and focused ESLint pass. No production deployment performed.

## Bounded Sage relevance review (2026-09-08)

- Completed the authorized follow-up; receipt: `docs/sage-retrieval-review-2026-09-08.md`.
  Reproduced original 5/8, MRR 0.604 on 109 records. Original fixtures, rank limits,
  production ranker and corpus remain unchanged (hashes in receipt).
- Reviewed competing synthesis lessons: new direct precedents make exclusive
  expected-title judgments stale. Added explicit grades/reasons and opt-in
  `npm run eval:founders -- --reviewed`: 8/8, MRR 0.833 at unchanged rank limits.
  Default evaluation intentionally stays 5/8 and exits 1. This is a judgment
  repair, not a production retrieval improvement or a full parity claim.
- Remaining weaknesses: Tobi hiring rank 32, Helsing's incidental focus match at
  rank 2, and adjacent rather than direct top-two last-company sources. No boosts
  were introduced just to promote old expected titles. Judgments are provisional
  assistant review, not independent human or generated-answer evaluation.
- Refreshed existing inventory status/queue: 207 episodes (170 + 37), 109
  syntheses (72 + 37), 98 pending, 52.7%. Verified unique synthesis IDs all map to
  inventory. Founders sync date remains honestly unknown. No source ingestion.
- TypeScript, focused evaluator ESLint, and production Next build pass; existing
  ranking/filesystem trace warnings persist. No provider calls, installations,
  new runtimes, commits, pushes, deployment or external mutations.
- Next owner decision: review/accept the provisional relevance labels before
  treating the reviewed score as a release gate. This bounded continuation stops here.

## Accepted judgments, corpus sync and inline Sage (2026-09-08)

- Adam accepted the relevance judgments and requested both corpus syncs plus Sage
  parity. Acceptance is recorded in `data/founders-retrieval-judgments.json`.
  Adam explicitly chose continuing comparison from public evidence; authenticated
  target feature comparison remains unverified and no login request is pending.
- `npm run corpus:founders:refresh` completed using local YouTube captions:
  Founders 170/170, 2,117,329 words; interviews 38/38, 764,360 words. New interview:
  Zach Dell / Base Power, video QFk6g5PQtqs, 2026-09-06, 17,939 words. No hosted
  transcription/model credits were used. Raw text remains in ignored private storage.
- Refreshed status and queue: 208 inventory episodes, 109 syntheses, 99 pending,
  52.4% coverage. Status generator now counts nonempty transcripts for caption
  success and verifies the exporter's signature/vector shape for index readiness.
  Both private semantic indexes are stale; local embedding dependencies are absent
  in the generated brains. No dependency installation/index rebuild was performed.
- Added `SageConversation.tsx` on `/sage`: streaming, contextual follow-ups,
  inspectable known source notes/links, visibly unverified unknown citations,
  Stop, error recovery, explicit save/reopen/delete of up to 20 on-device conversations.
  Discovery/search/saved-question handoffs remain on `/sage`. Existing legacy chat
  and OpenRouter endpoint are reused. No Eve runtime activation or auth redesign.
- `scripts/test-sage.py` passed in Helium against a local production build: split
  SSE, context preservation, evidence inspection, unknown references, storage
  failures, reload/reopen, upstream errors, abort, deletion, 390px no overflow.
  Provider API requests were doubly blocked/mocked; saved data isolated in test tab.
  Initial test attempts exposed corrupt development-generated types and test timing/
  selector defects, not production feature failures. Removed only generated stale
  route types and used a fresh production build for passing checks.
- TypeScript, focused ESLint, reviewed retrieval 8/8 (MRR 0.833), production build
  pass; existing broad trace warnings remain. Original benchmark unchanged (5/8).
  This is local interaction verification, not real generated-answer quality parity.
- Remaining: synthesize 99 queued episodes, rebuild private semantic indexes,
  evaluate actual answer quality/latency and deployment readiness. No deployment,
  commit, push, paid provider use, private source publication or external messaging.

## Reviewed personal council handoff (2026-09-09)

- Adam requested personalized life advice grounded in themain.quest context.
  Reused the existing life-context export, council matcher and guide chat.
- `/council` now loads a read-only brief preview, allows editing before model
  matching, shows the provider handoff, and supports updating the situation.
  Homepage intake links to the council. The copy identifies the heroes as AI
  guides grounded in public work and lives.
- Fixed shared-mailbox exposure: both GET preview and legacy no-brief POST
  require `SUMMON_LIFE_CONTEXT_OWNER_ID` to match the authenticated user.
  Unset means deny. Pasted briefs remain available to other signed-in users.
  Personal API responses are private/no-store; oversized briefs are rejected.
- Guide handoff no longer puts personalized matching reasons into URLs.
  Session-storage failure stays on the council with an error instead of
  silently opening an ungrounded chat.
- Refreshed themain.quest's local export successfully: 558-word private brief,
  notice `20260909T102740180Z-8b8095f2`. No brief text printed or committed.
  Owner binding remains unconfigured because themain.quest's local
  `AUTH_ALLOWED_EMAIL` is unavailable; no identity was guessed.
- `node scripts/test-council-boundary.mjs` passes: anonymous/non-owner/MCP
  isolation, owner preview with zero model calls, pasted matching, private
  response headers and oversize rejection. TypeScript, focused lint and
  production build pass; existing ranking filesystem-trace warnings remain.
- `scripts/test-council.py` stages synthetic browser checks. Execution was
  blocked before page verification by Helium's remote-debugging approval
  prompt. Browser success is not claimed. No real provider calls performed.
- See `docs/personal-council.md`. Production per-user cross-app linking,
  automatic freshness and returning actions/outcomes to themain.quest remain
  future work. This is a local mailbox and reviewed-paste implementation.
  No deployment, commit, push or person-to-person messaging performed.

## Canonical guide conversation URLs (2026-09-10)

- User convention: every available guide conversation lives at `/<guide>`,
  including `/sage`, `/franklin`, `/senra`, and source/book guide slugs.
- Root person routes now render the existing conversation UI. Biographies
  remain available at `/<guide>/about`. Source guides use the same root route
  and preserve query-prefilled questions. `/founders-podcast` aliases `/sage`.
- Legacy `/chat/:slug` and `/chat/source/:slug` redirect permanently with query
  strings preserved. Updated navigation, roster, sharing, metadata and sitemap.
- Sage conversation is now first on the page, ahead of the research workspace.
- Production `/sage` returned HTTP 404 before release. These edits are local;
  publication must account for the existing large pending checkout and private
  filesystem tracing. No production deployment performed in this change.
- Verification: production build and focused lint pass; 9 local HTTP route/redirect checks pass. A real local Sage request returned HTTP 200, 413 answer characters and DONE with no error. Local server remains on port 3114 for Adam; browser tab open was queued.

## Sage monochrome design options (2026-09-10)

- Adam requested design options: simple black and white, black default.
- Added `public/design/sage-options.html`, a self-contained interactive preview
  with Conversation, Call and Study layouts, light toggle, sample exchanges,
  source disclosure, responsive CSS, keyboard focus and reduced-motion support.
- Recommendation: Conversation default, Call as voice mode, Study as an expanded
  source view. No option applied to the actual Sage chat yet.
- Preview uses labeled sample content, no provider requests, no microphone.
  JavaScript syntax and HTTP 200 checked. In-app browser automation timed out,
  so screenshot/interaction verification is not claimed. Restarted local server
  on port 3114 to expose the new public file. No deployment.

## Sage call design selected (2026-09-10)

- Adam chose option 2, Call, and requested radically less UI copy.
- `/sage` opens a black monochrome call surface with Sage name, orb, icon
  controls and a keyboard exit. No hero, stats or introductory copy. Query
  handoffs open text mode so prefilled questions remain reviewable.
- Added optional minimal styling to shared GuideCall, applied only to Sage.
  It reuses speech recognition, captions, mute and interrupt. Sage now speaks
  completed answers with browser speech synthesis; citations remain in text.
  No microphone starts until clicked. Errors offer typing and preserve the
  question in the text view. This is turn-based browser voice, not full duplex.
- Existing text history, saving, citations and followups are retained. Source
  discovery moved to `/sage/library`; About in text mode exposes scope and
  browser speech-service disclosure.
- TypeScript, focused lint and production build pass. First build failed due
  to Windows Prisma DLL lock from our running server; stopping it resolved
  the failure. Existing broad filesystem-trace warnings remain. Both routes
  return 200. Real microphone/audio and visual browser validation remain
  unverified. Local server restarted at 3114; no production deployment.

## Sage voice-input connection fix (2026-09-10)

- User encountered browser speech-recognition connection failure. Sage now
  records microphone turns directly via getUserMedia/MediaRecorder, detects
  a 1.4-second pause, then transcribes through OpenRouter. Existing non-Sage
  speech recognition switches to this path on network/service errors.
- Added `recordVoiceTurn.ts`, `transcribeVoice.ts`, and `/api/transcribe`.
  Authentication is checked before requesting microphone access and again
  before transcription; sign-in action returns to the current guide URL.
  Caps: 30-second capture, 4MB upload, 30-second provider timeout. No local
  audio persistence or transcript logging; responses are private/no-store.
- Uses current catalog model `openai/whisper-large-v3-turbo` and the documented
  OpenRouter audio/transcriptions endpoint. Reference:
  https://openrouter.ai/docs/guides/overview/multimodal/stt
  This endpoint does not support the chat runtime's provider routing filters;
  do not claim chat data-collection-deny guarantees for audio transcription.
- Existing ElevenLabs user-endpoint credential check returned 401. No secret
  values printed or changed. Chose the working OpenRouter connection instead.
- Real provider probe: Windows generated a synthetic 3-second WAV phrase;
  transcription correctly returned 'Hello Sage. Help me decide what to focus
  on today.' No user microphone or personal speech used in that probe.
- `node scripts/test-voice-recording.mjs` passes four synthetic lifecycle
  checks: pause-to-submit, no-speech rejection, cancellation during pending
  permission, and cancellation during recording. Focused lint passes.
  Actual in-app browser microphone permission/device behavior remains unverified.
- Production build (including TypeScript) passes. Local Sage returns 200; unauthenticated transcription preflight returns 401 as intended. Server remains at localhost:3114. No deployment.

## Recognizable guide avatars (2026-09-10)

- Adam requested avatars resembling each guide; pixel art or AI art acceptable.
- Generated an original fictional grayscale pixel-art Sage face using imagegen.
  Copied final asset into `public/avatars/sage-v1.png` and wired into Sage call.
- Audited the actual figures registry: 35 existing portraits, 12 missing. Added
  source-identified local portraits for Vervaeke, Senra, Visakan, James Clear,
  Cal Newport, Annie Duke, Carol Dweck, Paul Millerd, Napoleon Hill, Brad Jacobs,
  Paul Graham and Lulie Tanett. All 47 active people now resolve to local files.
- Verified ambiguous results visually: discarded a Christmas-tree photo named
  lulie2 and used Lulie's About portrait; selected Brad Jacobs the businessman
  rather than the curler. Source links recorded in public/avatars/sources.json.
  Reuse/license clearance for newly sourced photos is not claimed; assess before
  production publication, particularly the Wikipedia nonfree Brad Jacobs image.
- Applied the minimal black call styling to person calls and added `/avatars`
  as a clickable gallery. Pixel illustration currently applies to Sage only;
  person guides use monochrome source portraits, not generated likenesses.
- TypeScript, focused lint and 47/47 local-file audit pass. No deployment.
- Production build passes. Gallery, Sage and representative new assets return HTTP 200. Local server remains on 3114; gallery opened for review.

## Sage faceless silhouette (2026-09-10)

- Adam refined Sage to a wise old man with no face, only a figure/silhouette.
- Generated original monochrome seated elder art with a dark face, long beard,
  robe and restrained rim light. Saved as public/avatars/sage-silhouette-v2.png.
- Updated the Sage call, avatar gallery and source metadata; prior art retained.
- DESIGN.md records the new direction. Other guide portraits are unchanged.
- Production build and focused ESLint pass. Sage and new PNG return HTTP 200; local server restarted on 3114. No deployment.

## Production test release (2026-09-10)

- Adam authorized production deployment. Published an allowlisted staging copy containing src, public, data, Prisma schema and migrations, content/distilled, and build configuration; private corpuses, local environment files and workspace notes were excluded.
- Vercel deployment dpl_9mgC2ocf2U5jn65xiKXgLCtBN7M5 is READY and aliased to https://summon.guide.
- Cloud build passes. Production Sage, silhouette asset and auth session return 200. Transcription preflight returns expected 401 without sign-in. Legacy Founders chat redirects 308 to /sage preserving query.
- Real production Sage response: HTTP 200, 103 SSE events, DONE, no error. Four microphone lifecycle checks pass; actual user microphone remains to be tested by Adam.
- No Git commit/push or database migration performed.

## Text chat and ElevenLabs playback (2026-09-10)

- Adam requested simple chatbot UI and explicitly asked to comment out calls.
- Sage and person guides now open to monochrome text chat. Call UI is commented
  out; GuideCall component and recording code remain available for future work.
- Added per-answer Listen buttons using ElevenLabs, with cancellation, object URL
  cleanup, and one active player. No browser speech fallback or automatic playback.
- All 47 active people plus Sage have explicit library voice assignments. These
  are reused synthetic library voices, not 48 unique voices or authentic clones.
  Dedicated assignments can be configured via ELEVENLABS_VOICE_<SLUG> server env.
- BLOCKER: local ElevenLabs voices request returned 401 invalid_api_key; production
  TTS also failed with provider 401. Replace ELEVENLABS_API_KEY in Vercel to enable
  audio and then provision/audition distinct guide voices. No voices were created.
- TTS output now uses private/no-store and returns sanitized provider errors.

- Final production release: dpl_GnhnVkRr3vMKihRCZ6G5SRrz9dV4, READY at summon.guide. Cloud build, TypeScript and focused lint pass. Local production server is session 35656 on port 3114; its build precedes final contrast-only CSS fixes.
- In-app browser verified Sage and Franklin text-first screens, readable monochrome layouts, no call controls, a real cited Sage reply, Listen button, and graceful voice-unavailable error with text preserved.
- First cloud attempt failed on a Windows-encoded punctuation character; normalized changed files to UTF-8. Browser inspection caught composer/person-text contrast issues, fixed and verified in final release.

## Sage quiet chat refinement (2026-09-10)

- Adam requested a simpler, more beautiful UI. Rebuilt Sage presentation around a
  centered silhouette empty state, compact header, bottom composer and open prose.
- Moved save/history/about/model details into one options menu, removed permanent
  shortcut help and follow-up chips, collapsed citations to one source disclosure.
- Composer grows for multiline input; send becomes stop; input clears immediately,
  focuses after completion, and restores on errors/cancellation. Chat scroll follows
  streaming only while near the bottom. Bold model text renders without asterisks.
- Local in-app browser verified empty and answered layouts, real cited streaming
  reply and saving. TypeScript and focused ESLint pass. ElevenLabs key blocker remains.

- Published as dpl_A39Q4ko3GNAnGTJuVBrrbfrac8j4, READY on summon.guide. Cloud build passes, including TypeScript. In-app production check confirms the new single-composer empty state and options menu. No call UI restored. Local development preview runs on port 3115 (session 9379).

## Transcript RAG / parity reassessment (2026-09-10)

- Adam asked whether transcript depth is the RAG gap and reiterated Founders Notes
  parity. Verified current retrieval: lexical/concept search over 109 syntheses,
  up to 16 per turn; Sept 8 private snapshot 208 transcripts / 2,881,689 words.
- Corrected FEATURE-PARITY.md with a superseding assessment: parity not established,
  old 51/206 counts stale, private indexes not ready, complete podcast coverage
  unverified, private notes/highlights unavailable. Official product page checked.
- Added docs/sage-transcript-rag.md with private pilot, hybrid retrieval, contextual
  chunks, reranking, timestamps, permission filtering and held-out answer evaluation.
- No runtime/policy change, corpus upload, or deployment in this turn.

## Private transcript-RAG pilot built (2026-09-10)

- User accepted pilot. Added scripts/sage-rag with isolated pinned local ML deps,
  package scripts rag:build/search/answer/eval/test/catalog, and public-safe report
  docs/sage-rag-pilot-results.md. Excluded tooling from Next file tracing.
- Built 208 documents / 22,578 chunks, 17,807 exact unique caption anchors. Private
  artifacts/models/key live in sibling summon.company/knowledge/_sage-rag-pilot.
- BM25 + BGE, RRF, title-based document routing, local MiniLM cross-encoder,
  neighbor context, source exclusion filters, stale-page hash checks, citation-ID
  validation and loopback-only structured generation. No hosted transcript upload.
- Reused 21,813 initial vectors; later reindex corrected an inherited incomplete-
  sentence tail loss and bounded long captions. Exact timestamp ambiguity rejected.
- 30 frozen agent-authored cases, 26 positive episode hypotheses. Transcript top-8
  26/26 vs synthesis22/26; MRR .902 vs .714. Median3.4s. Not human gold judgments.
- 5 mechanical tests pass. SmolLM2 1.7B local generation FAILED: citations omitted
  before schema enforcement; schema response over-abstained on Sony and returned
  irrelevant cited content on an unsupported question. All output requires review.
- Official Founders catalog457entries/432numbered vs170syncedFounders;83 exacttitle
  matches and374reconciliation candidates, not proof all374 are missing.
- Transformers private-tool audit reports4high advisories with no automatic fix.
  Not deployed. Public Sage remains synthesis-only; rights/access and independent
  answer review still pending. No Git commit/push or production deployment.
- Local llama.cpp smoke server was stopped after evaluation to release memory.


## Sage catalog reconciliation and stronger generation — 2026-09-10

- Reconciled all 170 saved Founders videos against 457 official catalog entries;
  156 rule-based metadata mappings plus 14 documented agent-reviewed mappings.
  Four catalog bonuses already exist in the 38 David Senra interview transcripts.
  Combined mapping: 174 catalog entries, including 166 numbered episodes.
- Private acquisition queue: 283 entries (195 no local metadata match, 81 fuzzy
  review, 7 repeated-book review). Not a claim that every queued entry is unique
  missing content. Cached public metadata/audio URLs for all 457; no audio fetched.
- Corrected reconciliation of the Red Bull #333 video whose source description
  incorrectly names Napoleon #337. Original private manifest preserved.
- Compared SmolLM2 1.7B and SHA-verified Qwen3 4B locally on twelve frozen cases.
  36 generations across three configurations; no hosted transcript upload.
  Qwen baseline: 2/8 strict supported answers, 6 over-abstentions, 4/4 correct
  unsupported abstentions. Evidence-first: 2 strict, 4 partial, 1 failed comparison,
  1 over-abstention; 4/4 unsupported abstentions. Agent review, not human gold labels.
- Decision: no production promotion. Schema compliance improved, strict grounded
  answer quality remains insufficient. Public Sage stays synthesis-based.
- Added reproducible catalog/generation scripts and documented results in
  docs/sage-rag-reconciliation-and-generation.md. Eight mechanical tests passed.
  No commit, push, deployment or personal outreach.

## Interactive Sage preview — 2026-09-10

User requested testing. Added private preview-server.mjs and preview.html under scripts/sage-rag. Running at http://127.0.0.1:3116/sage with 208-transcript retrieval and experimental Qwen3 4B evidence-first generation. Opened in-app browser; verified an answer and timestamped source links. HTTP checks passed for HTML/avatar and rejected external Origin (403). Loopback only, bounded JSON requests, one active generation. Production unchanged. Model and preview remain running for user testing.



## Sage blue magic design — 2026-09-10

User requested wizard emoji as the design basis and a blue-magic feeling. Added
shared public/design/sage-magic.css palette/emblem; applied it to the main
SageConversation and private preview. Midnight canvas, moonlit text, restrained
blue focus/action/citation accents, wizard with halo. No added call feature or
product copy. DESIGN.md now records the latest direction above old monochrome.
Changes are local; no production deployment.


## Modular preview generation and Luna default — 2026-09-10

User explicitly requested modular models with a ChatGPT/OpenAI model such as Luna
as default after being told hosted use sends selected transcript excerpts. Added
scripts/sage-rag/models.mjs registry and adapter; default is openai/gpt-5.6-luna,
with DeepSeek V4 Flash, Qwen3.8 Flash and local Qwen selectable in the preview.
Official OpenAI model ID verified against its GPT-5.6 Luna model card. Hosted
adapter uses existing OPENROUTER_API_KEY from .env.local, structured outputs,
allowlisted model IDs, provider input collection denied, and no silent fallback.
Actual response model is returned per answer. Retrieval remains local; selected
passages and conversation context go to the selected hosted model. Three adapter
tests pass. Live OpenRouter catalog and completion requests time out from this
machine, including IPv4 curl, so Luna availability on this account is UNVERIFIED.
Do not claim a successful Luna response. Existing Qwen remains selectable. No
production deployment, transcript upload success, or routing change to public Sage.


## SUMA-2: Sage preview evidence ID validation (2026-09-11)

- Verified local Summon company, Engineering agent, issue, project and primary workspace; harness checkout belongs to run b14f15e4-105d-4d15-8bb0-5d7ebdfdcc43.
- Added a string-type and exact packet-allowlist check before declared citations are appended in scripts/sage-rag/models.mjs. Unknown or non-string IDs now reject with the existing unknown-source error.
- Added regressions in scripts/sage-rag/models.test.mjs for unknown-only and mixed IDs, numbers, null, booleans, objects, arrays, valid appended/deduplicated citations, and standard abstention.
- Command: node --test scripts/sage-rag/models.test.mjs (synthetic packet, synthetic key, injected fetch only). Before fix: exit 1, 12 tests, 5 passed, 7 failed with Missing expected rejection. After fix: exit 0, 12 passed, 0 failed.
- Changed files: scripts/sage-rag/models.mjs, scripts/sage-rag/models.test.mjs, and this appended receipt only. Existing uncommitted work preserved; patch is relative to run-start file snapshots because adapter files were already untracked.
- Scope: reference validation only; no claim of factual entailment, provider availability, deployed behavior, customer acceptance, or continuous reliability. No hosted generation, corpus access, install, server stop, database change, commit, push or deployment. Local-model path, registry/default, provider policy and UI unchanged.
- Acceptance passed locally; Cofounder owns receipt review and future work. Source patch and acceptance receipt attached to SUMA-2 as artifact work products.

## SUMA-2 Cofounder verification (2026-09-11)

- Reviewed Engineering's attached patch and before/after acceptance receipt. Independently reran node --test scripts/sage-rag/models.test.mjs: exit 0, 12 passed, 0 failed; synthetic injected fetch only.
- Accepted SUMA-2 as locally complete. SUMA-1 remains the existing scheduler-owned Nightshift control; no new task, dispatch cycle, deployment or external generation started. Local reference validation does not establish factual answer quality, provider availability or customer acceptance.



## Pendleton Ward guide (2026-09-11)

- Added `/pendleton-ward`: selected direct-interview grounding, living-person identity boundary, profile, attributed Commons portrait, three starter questions, and standard synthetic library voice casting.
- Registered the three-interview reading list as partial and The Art of Ooo as pending, not ingested. Added a short original distillation and two explicitly derived plugin skills: creative-play and practice-kindness.
- Regenerated GUIDES.md and the Eve registry/packages. His Eve package is authored but disabled under the existing runtime gate.
- Validation: TypeScript, focused ESLint, changed-code whitespace checks, and agents:check pass. Local chat and about routes return HTTP 200. Live model answer quality and audio were not verified. No deployment, commit, or push.
- Local Next preview runs on http://localhost:3114/pendleton-ward. Source map and acceptance prompts: docs/pendleton-ward-onboarding.md.

## Summon handles: every guide as /<slug> (2026-09-11)

- Adam asked for each guide to be an agent he can summon into any Claude or Codex
  chat. Chosen form factor: one brain, many thin handles. The brain stays on the
  summon.guide MCP server (`chat_with_guide`, `chat_with_book`); a handle is a
  small `SKILL.md` named by slug that routes the user's question to the right
  tool with the identity boundary attached. No local persona copies to drift.
- Added `scripts/gen-summon-handles.mjs` (`npm run handles:generate`,
  `npm run handles:check` for parity). It reads `guideAgents.ts` and writes
  `packs/handles/<slug>/SKILL.md` plus `packs/handles/index.json` for all 114
  registered guides: 54 people, 4 channels, 56 books. Tool routing by runtime:
  48 `chat_with_guide`, 60 `chat_with_book`, 1 full pack (dave-ramsey), 5 with
  no live tool yet (pending guides get an honest status handle, never an
  improvised persona). Duplicate or non-skill-safe slugs fail the build, and any
  em or en dash surviving normalization fails it too.
- Extended `scripts/summon.mjs`: `summon install <slug>` accepts any guide,
  `summon install --all [--include-building]` installs every ready guide, and
  `summon list` prints the roster. Handles land in `.summon/handles/<slug>/`,
  `.claude/skills/<slug>/`, and `.codex/skills/<slug>/`; MCP config for both
  hosts is written as before. Guides that ship as rich packs (dave-ramsey, elon)
  get the pack instead of the pointer. Existing pack installs are unchanged.
- Verified against a scratch target: `--all` installed 91 handles plus 2 packs
  (93 skills in each host), skipped 21 still-building guides by default, wrote
  both MCP configs, and single and unknown-slug installs behave. Parity check
  passes. Not installed into this repo's own `.claude/skills` to avoid 90+
  tracked skill directories; run the installer in the target project instead.
- Not committed, not pushed. The `npx github:` form needs a push first; until
  then use `node <repo>/scripts/summon.mjs install --all --target <project>`.
  Summoning still requires the MCP's member auth; an owner token for Adam's own
  chats remains the open friction point.

## Founders synthesis queue finished: 207 of 208 (2026-09-14)

- Adam asked to finish the synthesis queue. Across 09-11 and 09-13 to 09-14,
  Sonnet agents in batches of five wrote 98 original syntheses from private
  transcripts: Founders episodes 073 to 169 and interview 038 (Zach Dell, Base
  Power). Each file was verified independently against the corpus generator
  parse contract, the no-dash rule, the under-ten-word quote limit, and its
  `youtube_id`. 98 of 98 pass. Coverage is now 207 of 208 private episodes,
  99.5 percent. The one remaining item, "The Mind of Napoleon" (WWQFtt6Hm10,
  published 2026-09-05), has no transcript in private storage yet; it needs
  `npm run corpus:founders:refresh` before it can be synthesized.
- Editorial discipline held per batch: same-subject episodes (two Getty, two
  Disney, two Churchill, two Vannevar Bush, two Kobe, three Paul Graham essay
  parts, and others) were grounded only in their own transcript with distinct
  lesson sets; agents read the existing overlapping file first. Robber-baron
  and conquest material (Gould, Carnegie and Frick, Vanderbilt, Napoleon,
  Insull, Kreuger) is recorded as cost or wrong, not laundered into technique.
  Uncertain speech-to-text names are referred to by role rather than guessed.
- Regenerated `src/lib/sourceCorpus.ts` (207 Founders records, 44 channels).
  Added `scripts/gen-knowledge-index.mjs` (`npm run corpus:founders:index`,
  `:check`) so both INDEX.md tables are rebuilt from frontmatter instead of
  hand-kept; both now list every file and contain no em dashes.
- Retrieval eval after the corpus doubled: default 3/8 (MRR 0.509, was 5/8),
  reviewed 4/8 (MRR 0.637, was 8/8). No case lost its source; Singleton slipped
  to rank 2, Thiel to 5, last-company and hiring to 5, because new syntheses
  now compete for the same queries. This is the same displacement recorded on
  2026-09-08. Ranker and fixtures were left unchanged on purpose. Next bounded
  step: a relevance review of the new top results for those four cases,
  extending the accepted judgments where a new synthesis is directly relevant,
  with Adam's acceptance before the reviewed score is treated as green again.
- Released from an isolated worktree off `origin/main`, since the shared
  checkout's branch had diverged from main. The shared checkout was left
  untouched.

## Every registered guide has a page (2026-09-14)

- Adam asked that every guide, Deutsch and Bezos included, have its own page.
  Audit of all 114 registered guides against production: 108 returned 200
  (Deutsch and Bezos among them); six returned 404. Five are people still in
  onboarding with no corpus or persona (Einstein, Alysa Liu, Kissinger, Doudna,
  da Vinci) and one, Dave Ramsey, ships as a framework pack rather than a chat
  persona. None had an entry in the URL map, so their dashless URLs rewrote
  nowhere.
- `scripts/gen-guide-urls.mjs` now includes every person in the guide registry,
  not only figures, so all six have canonical dashless URLs and aliases (113
  mappings). The `[figure]` route gained a fallback: a registered person with no
  conversation runtime renders `GuideStatusPage`, which says plainly whether the
  guide is a framework pack (with the install command) or still onboarding
  (with a link to the gates), lists registered sources, and carries the
  identity boundary. No improvised persona; unknown slugs still 404.
- Verified locally: all six URLs 200 with the right content, Deutsch and Bezos
  unchanged, book redirect intact, unknown slug 404. Types clean.

## YouChop sync, two new interviews, duplicate-id alias (2026-09-14)

- Adam asked to keep both Senra feeds current. `npm run corpus:founders:refresh`
  pulled 2 new David Senra interviews with local captions (0 caption failures):
  Mati Staniszewski of ElevenLabs (RFccAuyPPOg, 2026-09-09) and Luca Ferrari of
  Bending Spoons (MCbHnlpwZf0, 2026-09-13). Interviews feed is now 40 episodes,
  803,471 words; Founders feed unchanged at 170. Both were synthesized as
  interviews 039 and 040 and verified against the parse contract, no-dash rule,
  short-quote limit, and `youtube_id`.
- The one Founders item that had been stuck in the queue, "The Mind of
  Napoleon" (WWQFtt6Hm10), is a re-upload of the episode synthesis 017 already
  covers: both ids carry exactly 10,119 words, the word count of the single raw
  transcript. Added `data/founders-episode-aliases.json` (duplicate id to the
  id in the existing synthesis) and taught `gen-founders-corpus-status.mjs` to
  treat aliased ids as covered. Coverage now counts covered episodes rather
  than synthesis files, so a re-upload cannot hold it under 100 percent.
- Result: queue empty, 209 syntheses covering 210 private episodes, 100
  percent by episode. `sourceCorpus.ts` regenerated (209 Founders records) and
  both INDEX tables rebuilt. Retrieval eval unchanged in character from the
  earlier note: fixtures displaced by the larger corpus, ranker untouched, the
  bounded relevance review remains the next owner-accepted step.
- Same session, other asks: an auto-prompt toggle for Claude Code was
  installed in Adam's user config (Stop hook, `/auto-prompt on|off|status`,
  default off, capped per session, Codex has no equivalent), and every
  registered guide now has a page (PR #79). Sage versus Senra naming was
  answered with a recommendation, not a change: neither David's product name
  nor his person name is a clean name for the cross-corpus research agent.

## Sage as a David Senra-style guide, text only (2026-09-14)

- Adam asked for Sage to be a David Senra-style guide: text only, his published
  ideas and podcast lessons, no voice clone, one real conversation working end
  to end so he can test it on his own project.
- `src/lib/sagePrompt.ts` holds Sage's prompt, selected in
  `/api/chat/source` for `founders-podcast` only. It lives outside
  `sourceCorpus.ts` because that file is regenerated. Style: start mid-thought,
  lead with a named founder from a listed episode, the show's recurring lenses
  (belief before ability, control over money, money as the byproduct of
  service, rereading primary sources) applied only where an episode supports
  them, and a project mode that maps two or three precedents onto the user's
  stuck part and ends with one move for the week. Identity: Sage is not David
  Senra, never speaks as him in the first person, attributes to him in the
  third person, and says it is an independent AI guide when asked.
- Text only: `ChatComposer` gained an opt-out `voice` prop; Sage passes false
  and no longer renders the Listen button. Other guides keep voice.
- Reliability, measured, not assumed. Both free models in the waterfall now
  return 404 "unavailable for free", so all traffic already lands on
  `deepseek/deepseek-v4.1-flash` at depth 2, production included. With Sage's
  prompt that model spent 711 to 2,843 reasoning tokens per answer; at the
  shared 1,600 budget many answers ended with no visible text ("every model
  returned an empty response"). Providers also dropped streams (an h2 error
  from Together). Fixes, all opt-in so other guides are unchanged:
  `streamOpenRouter` accepts `reasoning` and `retryEmpty`; Sage sends
  max_tokens 6,000, reasoning max_tokens 1,000, and retries the last model up
  to twice when no text arrived.
- Citations: models sometimes cite an interview without its " | Guest" tail.
  `SageConversation` now resolves a citation by exact title, title minus a
  "(with ...)" note, or the part before " | ", so real sources are not shown
  as unverified. The prompt ends with a required output block.
- Verification: a three-turn conversation (a described project with a stuck
  part, a follow-up that depends on turn one, an identity probe) passed 4 of 4
  runs, 12 of 12 turns: every answer arrived, cited only resolvable episodes,
  had follow-ups and no dashes, never spoke as Senra. Specific claims were
  spot-checked against the corpus. The real page rendered an answer with three
  linked sources, zero unverified, no microphone and no Listen button. A
  non-Sage book chat (zero-to-one) is unaffected.
- Open: the dead free models mean the waterfall has one working model; a
  fallback second paid model in `getOpenRouterModelQueue` would remove that
  single point of failure for every guide. Separately, the existing `/senra`
  figure prompt begins "You are David Senra", which is first-person
  impersonation of a living person and worth reframing the way Sage now is.

## Second paid fallback model in the OpenRouter waterfall (2026-09-14)

- Adam asked for a second paid fallback. The waterfall ranked up to two free
  models plus exactly one paid model; with the free picks returning 404
  "unavailable for free", that single paid model carried every answer.
- `rankQueue` now takes the top two paid models under the price caps and
  prefers the second from a different vendor, so one vendor's outage cannot
  take out both. The queue cap is four (two free, two paid); the static
  fallback queue gained a second paid model too.
- OpenRouter rejects a `models` fallback list longer than three (HTTP 400,
  verified live). Both `completeOpenRouter` and `streamOpenRouter` now send at
  most three models per request and, when that window returns nothing or
  fails, continue with the rest. A 401 invalid key or 402 spending limit still
  stops immediately because it applies to every model on the account.
- `scripts/test-openrouter-fallback.mjs` (`npm run test:openrouter-fallback`)
  checks the live queue holds two paid models from different vendors, then
  forces a queue whose first window cannot answer and confirms both paths
  answer from the fourth model. All seven checks passed; the live queue was
  inkling-small:free, inkling:free, openai/gpt-5.6-luna, deepseek-v4-flash-0731.

## /senra reframed so it no longer impersonates David Senra (2026-09-14)

- Adam asked to reframe `/senra`. Its prompt opened "You are David Senra" and
  ended with the shared RESPONSE_RULES, which say "Stay in character at all
  times. Never break character or acknowledge you are an AI", so the guide
  was told to deny being an AI while speaking as a living person. Its intro
  line, spoken aloud from the homepage, began "I am David Senra".
- The `senra` figure is now "an AI guide built on David Senra's public work".
  It keeps the substance of how he teaches (belief before ability, control
  over money, money following service, rereading primary sources, the fast
  dense style) written about him in the third person, never claims his life,
  reading, memories, or private views, says plainly it is an AI not reviewed
  or endorsed by him when asked, and only quotes him where source notes
  support it. It carries its own rules instead of RESPONSE_RULES, with
  citation rules that match the retriever's "Cite as:" lines; a reply that
  only answers who it is needs no citation. The intro line is third person.
- Regenerated the two artifacts that embed the prompt: the `person-senra` Eve
  package and `packs/summon/guides/senra.json`.
- Verified with real conversations through the router using the chat route's
  exact prompt assembly: three runs of a project question, an identity probe,
  and a "your reading routine" first-person bait passed 9 of 9 turns, with no
  first-person claims to his life, clear AI disclosure, citations on
  substantive answers, and no dashes.
- Open: every other person guide still uses RESPONSE_RULES, so every living
  guide (Sivers, Graham, Clear, Newport, and others) is also told never to
  acknowledge being an AI. The same reframe, or a change to that shared rule,
  would close it roster-wide.

## AI disclosure for every guide (2026-09-16)

- pangpod.com's read-only guide-readiness check (repos.chat exchange check-guide-readiness) found that historical guides showed no AI notice and were prompted to never acknowledge being an AI. Now guideDisclosure() in AiPersonaNotice.tsx returns a sentence for every guide (living: not their words, not endorsed; historical: an AI simulation built from their documented life, not the person), shown in the chat empty state, the options menu, the about page, and watch pages. RESPONSE_RULES keeps historical guides in character but forbids denying being an AI.
- Live probe: Franklin, Seneca, and Lee Kuan Yew all disclose when asked. Eve instructions and summon packs regenerated. The summon.guide manifest now lists pangpod.com as kin and its life-context exchange uses valid permission fields.

## Homepage: one question, one box (2026-09-16)

- Adam ran the perfect-landing skill on the homepage and chose option A of three. The page is now a dark screen with "What's stuck?", one input, three example prompts, and a footer with guides, council, and privacy links. The 48-row guide list, the three-step strip, and the two promo cards are gone from the homepage; the roster lives at /summon. Words on the page went from 1,574 to about 36, links and buttons from 112 to 9, height from 5,100px to one screen.
- StuckBox.tsx routes through the same /api/match and session-storage handoff as the old search, so nothing personal reaches a URL. Name-a-person search is no longer on the homepage; use the roster.

## Portrait lines and quote audit (2026-09-18)

- Click a guide's portrait in chat: three lines they are known for appear and play in the guide's voice (GuidePortraitLines.tsx, data/guide-lines.json, pre-rendered public/lines/<slug>-<n>.mp3). Six guides so far: Franklin, Seneca, Marcus Aurelius, Rockefeller, Alexander, Lee Kuan Yew (two lines).
- A source audit found most quotes on file for these six were misattributed, paraphrased, or untraceable (e.g. Franklin "Tell me and I forget", Alexander "army of lions", Rockefeller "common things uncommonly well"). notableQuotes, signatureQuote, and the prompt quote lists now carry only lines traced to a primary source (Poor Richard, Gummere Seneca, Long Meditations, Random Reminiscences, Plutarch, LKY memoir and 1980 rally). Other guides have not been audited yet.

## Lee Kuan Yew through the checklist (2026-09-18)

- He had gone live with zero sources and unverified quotes. Research and fact-check (docs/lee-kuan-yew-onboarding.md): 20 of his own speeches in the National Archives of Singapore confirmed readable, NAS reuse terms (original summaries plus short attributed quotes only, no transcripts), timeline, voice notes, warnings.
- 8 original syntheses in content/knowledge/lee-kuan-yew now ground his chat through figureSources (audit: 8 question-ranked syntheses). His prompt carries a HANDLE HONESTLY section: detention without trial, defamation suits and press control are acknowledged as costs, never glorified.
- Found and fixed a bug for every historical guide: RESPONSE_RULES told them to cite a "Your documented record" section, but retrieval labels notes "Retrieved source notes" with "Cite as:" lines, so historical guides never cited. Live eval: LKY now cites The Search for Talent (1982) and the 1981 Armed Forces Day speech, and names the cost of detention.
- Remaining for LKY: 12 more of the 20 mapped speeches to synthesize; a third verified portrait line.

## Call mode and recording (2026-09-19)

- Call mode is back on for person guides: a phone button in the chat header opens the call screen, replies are spoken in the guide's ElevenLabs voice, and the mic is transcribed per turn.
- Record button on the call screen: src/lib/callRecorder.ts mixes the mic and every guide reply through Web Audio into one MediaRecorder file (webm/opus on Chrome), saved to the device on stop. Nothing is uploaded. Built for pangpod.com episodes.
- Tested locally with a simulated mic: call opens, recording starts, stop saves summon-<guide>-<time>.webm. Not yet tested with a real microphone and a signed-in production session.

## Quote audit for all guides, LKY at 20 sources (2026-09-19)

- Agents audited quotes for the remaining 42 guides; every proposed line was then checked mechanically (scratchpad check-quotes.mjs): fetch the cited URL and require the exact words on the page. 45 of 108 proposed lines passed. 59 flagged quotes (misattributed, paraphrase, unverifiable) were removed from notableQuotes, signatureQuote, prompt quote lists, and one skill line ("Strong opinions, loosely held" is Paul Saffo's). Portrait lines now cover 30 guides; 18 guides have no source-checked line and show a plain portrait.
- Lee Kuan Yew now has 20 original speech syntheses. His old KNOWLEDGE BASE section (first-person passages labelled as memoir chapters we do not have) was replaced with a pointer to the retrieved speech notes; citation rate on the talent eval went from 0 of 3 to 2 of 3.
- Known follow-up: other historical guides likely have the same kind of unsourced "SOURCE: <book>, Chapters" blocks in their prompts. Audit them the same way.
