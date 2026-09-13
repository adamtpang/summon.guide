# Guide chat standard

Implementation and release checks, 2026-09-13.

The empty screen shows the portrait or cover and name. The shared shadcn composer has a message field, microphone and send button. Sage retains its wizard, blue atmosphere and saved conversations. Recommended starting questions and next prompts appear as separate wrapping bubbles immediately above the composer. Model details and credits are behind options. Answer sources expand on demand. All three chat surfaces offer explicit ElevenLabs playback.

The microphone records one turn, ends after a pause, transcribes through the existing authenticated service and inserts a draft for review. Sending remains explicit. Cancel, denial and teardown release the microphone; starting a recording stops reply audio. This is dictation plus playback, not a full-duplex call. ElevenLabs only: Adam declined a device-voice fallback.

## Retrieval contract

Person guides now use `guideRetrieval.ts`: join curated person notes with the registered books/channels belonging to that person, deduplicate by file, then rank against the last three user turns using Sage's source retriever. Maximum 16 selected notes and 24,000 grounding characters; chunks stay intact. Citations use actual selected titles. Person and source routes use question-aware retrieval; smaller source corpora also respect the 16-note limit.

Only existing synthesis registries are read. No filesystem transcript access or raw publication was added. This is lexical retrieval-augmented generation over syntheses, not an embedding index or full-transcript RAG. Sage's private full-transcript experiments remain separate from its production synthesis runtime.

Run `node --import ./scripts/node-server-shim.mjs scripts/audit-guide-retrieval.mjs` to refresh `data/guide-retrieval-audit.json`. It covers active person guides and registered book/channel sources, not pending onboarding identities. Counts are inventory evidence, not answer-quality scores.

Current active-person coverage: 48 portraits and mapped synthetic voice assignments; 41 with retrievable syntheses. Seven have no connected runtime corpus: Pendleton Ward, Lee Kuan Yew, Adam Neumann, Ricky Gervais, Marie Curie, Bob Marley and Sam Walton. Walton has a staged local synthesis outside the generated runtime registry; that is not yet live retrieval. Missing-corpus prompts explicitly prohibit claims of transcript retrieval and invented citations.

## Work still required for deep corpus coverage

For each guide: verify identity and source ownership, acquire authorized sources, record coverage and gaps, prepare source-addressable chunks, build a private retrieval index, evaluate evidence selection and generated answers, then enable the provider/runtime path. Bookbox remains responsible for book ingestion. A broad corpus must not be called deep or reliable solely because it contains many documents.

Required evaluations include direct evidence, cross-source synthesis, ambiguous questions, unsupported premises, a question outside the corpus, citation fidelity, and retrieval isolation from other guides. Fixed acceptance questions should be reviewed independently; test titles alone do not establish answer quality.

## Verification and blockers

- TypeScript and production build pass; existing broad filesystem tracing warnings remain.
- Retrieval tests cover all active guides for budget, deduplication, citation provenance, raw-path exclusion and an exact-title change in selection. No provider answer-quality evaluation was run.
- HTTP 200 with shared composer and microphone markup: Sage, Brad Jacobs, Elon Musk, Paul Graham Essays.
- `scripts/test-minimal-chat.py` is an unvalidated Helium test draft for 390px layout, synthetic microphone success, denial, cancellation and mocked playback. It was blocked before execution by the browser remote-debugging permission prompt. No real microphone test or visual verification completed.
- ElevenLabs read-only credential check returned HTTP 401. A valid `ELEVENLABS_API_KEY` is required locally and in production before real playback can be tested. No fallback voice was added.

Release checks: three separate prompt buttons precede the composer on Sage, Brad Jacobs and Paul Graham Essays. The Windows Prisma DLL was locked by local development; release compilation uses the already-generated client via `npx next build --webpack`.
