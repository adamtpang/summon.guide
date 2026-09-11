# Private Sage transcript-RAG pilot

This CLI runs independently of Next.js. Live Sage still uses original syntheses.
Private transcripts, vectors, downloaded models, evaluation packets and the local
model key live outside this repository, under:

`../summon.company/knowledge/_sage-rag-pilot/`

## Run

Requires Node 24+, Python for the catalog audit, and the existing private YouChop
corpus directories. Install the isolated tooling dependencies once:

```sh
npm install --prefix scripts/sage-rag
npm run rag:build
npm run rag:search -- "What did Sam Walton learn from losing a store lease?"
npm run rag:eval
npm run rag:test
npm run rag:catalog
```

Search prints titles and timestamp links only. The full passages and model-ready
prompt are saved privately as `latest-evidence.json` and `latest-prompt.txt`.
Evaluation outputs are private because they contain source excerpts. The 30
questions are provisional agent-authored relevance hypotheses, not human gold
labels, and four require unsupported-answer review rather than a retrieval hit.

## Local generation

The pilot accepts only loopback OpenAI-compatible model endpoints. It does not
send excerpts to OpenRouter, ElevenLabs or another hosted model. Model weights
are downloaded from Hugging Face, but inference is local.

A small SmolLM2 model is suitable for a plumbing smoke test, not for claiming
Founders Notes advice quality. Start the installed llama.cpp server:

```sh
llama-server -m ../summon.company/knowledge/_sage-rag-pilot/models/smollm2-1.7b-instruct-q4_k_m.gguf --host 127.0.0.1 --port 8089 -c 8192 -np 1 -t 4 --cors-origins http://127.0.0.1:8089 --api-key-file ../summon.company/knowledge/_sage-rag-pilot/local-model.key
npm run rag:answer -- "What did Sam Walton learn from losing a store lease?"
```

`SAGE_LOCAL_LLM_URL` can select a different **loopback** completion endpoint;
`SAGE_LOCAL_LLM_MODEL` can set its model name. The private `local-model.key`, if
present, is sent only to that loopback endpoint. Generation uses four passages
plus adjacent context to fit the smoke model. Structured generation selects evidence IDs; unsupported responses can abstain.
Invalid references are rejected. Every output requires review: reference checking
is not factual verification. The SmolLM2 smoke tests failed (over-abstention and an
irrelevant cited response), so this model is not ready for live use.

## Retrieval

- Manifest/page identity checks, source hashes and stale-page refusal.
- Sentence chunks with overlap; long captions are split and unfinished tails kept.
- Reuse unchanged `Xenova/bge-small-en-v1.5` vectors; embed additions locally.
- BM25 + semantic retrieval, reciprocal-rank fusion, and title-based episode routing.
- Local `Xenova/ms-marco-MiniLM-L-6-v2` cross-encoder passage reranking.
- Maximum two primary hits per episode, plus adjacent passage context.
- Eight-word exact, unique caption anchors for timestamps. Unaligned evidence gets
  an episode link. Caption ASR errors remain visible; no invented timestamps.
- `excludedSources` and `excludedDocuments` filter hits and adjacent context.

## Known limits

- Only the 208-episode saved YouTube snapshot is indexed. The official Founders
  catalog has more entries. The separate audit generates a reconciliation queue;
  title mismatches are not treated as proven missing episodes.
- Returning the right episode does not prove the right passage or factual support.
- ASR misspellings (for example Bova/Bulova) can break exact detail checks.
- The cross-encoder is an experiment; keep the before-reranking results and compare
  the frozen questions. Do not change judgments to manufacture a passing score.
- There is no public transcript endpoint, production integration, transcript
  publication, automatic corpus refresh, or access to David's private highlights.
- The isolated Transformers.js dependency audit currently reports four high
  advisories without a reported automatic fix. This tooling is not deployed;
  reassess dependencies before using it as a hosted service.

Next: independent passage/answer review, complete catalog reconciliation, stronger
local-model comparison or an approved hosted-model research contract, and only
then an approved hosted corpus integration.


## Reconcile and compare generation (September 10 follow-up)

`npm run rag:catalog` (also `rag:reconcile`) generates the current metadata mapping
and private acquisition queue. `npm run rag:catalog:details` caches public episode
metadata, including audio URLs and runtimes; it does not download audio. After a
catalog refresh, run details and reconciliation again to incorporate new runtimes.
Use `python scripts/sage-rag/reconcile-catalog.py --cached` to reuse the snapshot.
Reviewed identity exceptions live in `catalog-reviewed-matches.json`, including
four cross-feed interviews and the copied Red Bull/Napoleon description error.

With a local model already serving port 8089, run:

```sh
npm run rag:eval:generation -- model-label
```

The runner uses exactly twelve preselected frozen retrieval packets (eight
positive, four unsupported). Set `SAGE_GENERATION_STRATEGY=evidence-first` for the
experimental evidence-summary-first prompt (550-token budget instead of 300).
Use a different label for each configuration; its private result file is replaced.
The experiment needs the existing private `evaluation.json` from `rag:eval`.

Qwen model file: `Qwen3-4B-Instruct-2507-Q4_K_M.gguf`; start it with the same
loopback/API-key server options above and context 8192. Provenance, hash, detailed
results and the no-promotion decision are in
`docs/sage-rag-reconciliation-and-generation.md`. No default production model changed.

Run catalog regressions with `python scripts/sage-rag/reconcile-catalog.test.py`.

## Interactive private preview

Start the Qwen llama.cpp server as above, then run
`node scripts/sage-rag/preview-server.mjs` and open
`http://127.0.0.1:3116/sage`. This separate local test interface has the Sage
silhouette, a simple composer, conversation context and cited source links.
It uses the 208-transcript index and experimental evidence-first generation.
Refresh/new chat clears in-memory history; private model diagnostics still use
the pilot output directory. Both services bind to loopback only. This does not
deploy anything to summon.guide.


## Model selection (latest preview behavior)

The preview now defaults to GPT-5.6 Luna via OpenRouter. `models.mjs` is the single
allowlisted registry: ID, display label, provider and upstream model ID. Its
`generateAnswer` adapter accepts a model ID independently of retrieval. The picker
also offers DeepSeek V4 Flash, Qwen3.8 Flash and local Qwen. `.env.local` is loaded
server-side for OPENROUTER_API_KEY; no credentials reach the browser. No model
fallback happens silently. Answers display upstream model metadata.

Hosted models receive the selected passages and recent conversation context;
local Qwen keeps these on the computer. This supersedes the original preview's
local-generation-only description. The command-line pilot and historical evaluator
still use localAnswer and remain loopback-only. Restart preview-server after
registry changes. Run `node --test scripts/sage-rag/models.test.mjs` for adapter tests.

At this checkpoint, OpenRouter connectivity times out from this machine, so the
Luna default is configured but not live-verified. The official OpenAI model card is
https://developers.openai.com/api/docs/models/gpt-5.6-luna . Do not substitute a
similarly named model or infer API access from this Codex session's model list.
