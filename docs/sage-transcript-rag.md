# Sage transcript retrieval plan

## Outcome

A user asks a precise founder question and receives a concise, grounded answer
whose evidence can be inspected at the relevant episode timestamp. Keep the
current simple chat UI. The private pilot is now implemented; see `sage-rag-pilot-results.md`. Hosted integration remains proposed.

## Current path

Question -> weighted lexical search across 109 original syntheses -> up to 16
syntheses -> model answer. No transcript access in the live path. September 8
inventory: 208 private transcripts, 99 without synthesis, private indexes stale.
Do not equate the synced YouTube catalog with every Founders podcast episode.

## Target path

1. Inventory source IDs, full episode catalog coverage, timestamp availability,
   provenance, versions, and permitted retrieval/display/provider uses.
2. Chunk eligible transcripts at topic/speaker boundaries. Starting experiment:
   400–800 tokens per chunk with short overlap; retain neighboring context, title,
   person, episode ID, timestamp ranges and source version. Tune against evaluation.
3. Index both exact names/phrases and semantic embeddings. Keep summaries as an
   overview and routing layer; retrieve primary passages for specific evidence.
4. Fuse keyword and semantic results, rerank candidate passages, then include
   parent/neighbor context where necessary. Vary depth by question, with measured
   latency and cost budgets. These parameters require testing, not assertion.
5. Generate with stable evidence IDs. Separate direct quotations from paraphrases,
   qualify missing evidence, and make timestamps/citations inspectable on demand.
6. Validate citation references against retrieved IDs, enforce source access
   permissions at retrieval time, and avoid exposing entire transcripts through
   the source drawer. Store private text separately from public application assets.
7. Refresh incrementally on new/changed episodes and remove excluded material
   from indexes and cached evidence. Track ingestion failures and index version.

## Execution order

- Audit complete catalog coverage and the exact private source format first.
- Build and evaluate the retrieval pipeline privately against a fixed snapshot.
- Resolve hosted-corpus permission/access requirements before routing live public
  questions to transcripts; preserve synthesis-only behavior until then.
- Integrate the approved index behind the existing chat endpoint and source drawer.
- Evaluate public-evidence capability parity. Obtain signed-in comparison evidence
  if available before claiming parity with the actual Founders Notes experience.

## Acceptance evidence

Create at least 30 held-out questions spanning exact anecdotes, numbers, obscure
names, cross-founder comparisons, conflicting examples and unsupported questions.
Include questions whose answers were omitted from synthesis. Human-label relevant
passages independently of the ranker. Compare synthesis-only and transcript RAG
blindly for retrieval recall, factual support, citation/timestamp correctness,
usefulness, appropriate abstention, latency and cost. Record failures openly.
Do not replace judgments just to make unchanged retrieval pass an evaluation.

## Separate remaining gaps

- David's private book notes/highlights: requires owner access/authorization.
- Signed-in Founders Notes capabilities: unverified; public evidence only so far.
- Hosted transcript use: existing project gate, not automatically solved by RAG.
- Equivalent answer quality: requires evidence, not merely a vector database.
