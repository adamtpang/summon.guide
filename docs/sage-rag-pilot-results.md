# Sage private RAG pilot results — 2026-09-10

The private retrieval pilot works. It is not connected to production and does not
establish Founders Notes parity. The small local generation model failed the smoke
checks and must not replace the live model.

Latest follow-up: [catalog reconciliation and paired generation evaluation](sage-rag-reconciliation-and-generation.md). All 170 saved Founders videos are mapped, four catalog bonuses are already covered by interview transcripts, and 283 entries remain queued. Qwen3 4B was evaluated locally and was not promoted.

## Built

- 208 episodes from the September 8 private YouTube snapshot, 22,578 passages.
- 17,807 passages with exact, unique caption anchors; others use episode-level links.
- Incremental vector reuse, local BGE embeddings, BM25, reciprocal-rank fusion,
  episode routing, local MiniLM cross-encoder reranking and adjacent passage context.
- Excluded sources/documents are filtered before ranking and context expansion.
- Unfinished caption tails are preserved; oversized run-on captions are split.
- Loopback-only local generation, structured evidence selection and reference-ID
  validation. Every generated result is unreviewed; references do not prove support.
- No transcript uploads or production deployment. Model-weight downloads only.

## Retrieval evidence

Frozen set: 30 agent-authored cases, including 26 positive relevance hypotheses and
four unsupported questions. No independent human labeling has been completed.

| Measurement | Syntheses | Transcript pilot |
| --- | ---: | ---: |
| Expected episode found in top 8, positive cases | 22/26 | 26/26 |
| Mean reciprocal rank, positive cases | 0.714 | 0.902 |

Local median retrieval latency was approximately 3.4 seconds in this run.
This measures candidate episode ranking, not passage precision or answer quality.
The original pre-reranking run is retained privately (transcript MRR 0.749).

A spot check exposed ASR variation: the Sony transcript renders Bulova as Bova.
Title routing and passage reranking recovered the actual 100,000-radio order
passage. Exact-string detail tests alone can therefore produce false negatives.

## Generation evidence: not ready

A downloaded, SHA-256-verified official SmolLM2 1.7B quantization ran locally in
llama.cpp. An unconstrained factual answer omitted citations and was rejected.
With structured output, the model abstained on the answerable Sony question and
returned irrelevant cited material for an unsupported password question. These
are failures, not a successful answer-quality result. Five mechanical tests pass:
chunk integrity, timestamp ambiguity, invented IDs, loopback restriction and source
exclusions. They do not substitute for a stronger model and independent review.

## Initial coverage gap (superseded by linked reconciliation)

The official https://www.founderspodcast.com/ catalog snapshot contains 457 entries,
432 numbered. Our Founders subset contains 170 YouTube episodes (plus 38 separate
David Senra interviews). Exact-title matching links 83 catalog entries; 374 require
reconciliation. Renamings, bonuses and duplicates mean unmatched is not proof of a
missing transcript. The private catalog audit retains the reconciliation queue.

## Use and review

See `scripts/sage-rag/README.md` for setup and commands. Run:

```sh
npm run rag:search -- "What did Sam Walton learn from losing a store lease?"
npm run rag:eval
npm run rag:test
```

Private artifacts are under `../summon.company/knowledge/_sage-rag-pilot/`:
`passage-review.md`, `evaluation.json`, `catalog-audit.json`, and generation smoke
results. Neither these files nor raw corpuses belong in public assets.

## Next decisions

1. Independently label passage relevance and answer support in the private review.
2. Reconcile the full podcast catalog, then obtain/ingest eligible missing sources.
3. Evaluate a stronger local model or an explicitly approved hosted research path.
4. Resolve hosted corpus access requirements before wiring transcript retrieval
   into the unchanged Sage UI. David's private notes/highlights remain unavailable.
