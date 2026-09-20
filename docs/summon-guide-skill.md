# In-chat Summon matchmaking

`summon-guide` complements the older browser-oriented `summon` skill. It extracts relevant context from the visible conversation, calls the live service, and returns advice in the host chat. Install with `node scripts/summon.mjs install summon-guide --global` or `npx --yes github:adamtpang/summon.guide summon install summon-guide --global`. Connect `https://summon.guide/api/mcp` through the client's OAuth flow. Codex uses `$summon-guide`; Claude Code uses `/summon-guide`. Reopen the chat to discover a newly installed skill.

## Implemented contract

- `match_guides` / authenticated `POST /api/summon/match`: all ready, chat-capable person/book/channel agents; up to three complementary matches. Compatibility is a model-estimated rubric summed by code: problem /50, constraints /25, approach /15, evidence /10. No corpus forces evidence to zero. Scores are not calibrated probabilities or proof of answer quality. Unknown and duplicate ids cannot become selected guides. An entirely invalid model response fails with 503 instead of triggering discovery.
- A minimum fit of 70 selects a guide. A valid response with no qualifying match returns `research_required`. A provider failure returns 503, never an arbitrary guide.
- Existing `chat_with_guide` and `chat_with_book` tools deliver advice and citations in-chat. MCP parsing now rejects empty and incomplete SSE responses and handles a final frame without a newline.
- When research is required, the **host assistant running the skill** searches the web and reads sources using its available tools. The server does not perform an independent web crawl. The skill compares up to three candidates, scores fit, then submits one with 2–5 original summaries from at least two independent source hosts. It excludes private context from search queries.
- `consult_researched_guide` / authenticated `POST /api/summon/research` generates explicitly provisional advice, returns numbered source links and creates/reuses a private per-user GuideRequest at SOURCING. Existing public identities, declined requests and daily request limits are respected. Advice uses the existing membership allowance. Existing request status is never reset.
- Only candidate identity and a public source URL are persisted by the endpoint. User chat context is neither saved into the onboarding record nor published. A source-only dossier can be kept privately by the skill for reuse; the server does not yet store that whole dossier. No new database migration is needed.

## Deliberate limits

Automatic discovery yields a provisional guide plus a tracked onboarding request. It does **not** automatically complete the eight public-guide launch gates, acquire a deep corpus, enable full-transcript RAG, publish a profile or establish source rights. This boundary is explicit in the tool response and skill. Source notes are researched by the caller; the server validates shape, bounds and source-host diversity, not factual correctness or independent authorship. No URLs from research payloads are fetched by the server.

The portable HTTPS client takes JSON via stdin and a user OAuth token via `SUMMON_ACCESS_TOKEN`; it uses a fixed HTTPS origin, rejects redirects, and does not read browser cookies or provider credentials. It is a fallback for clients without MCP, not a bypass for OAuth.

## Verification (2026-09-20)

- New unit checks: score calculation, no-corpus correction, identity validation/deduplication, weak matches, malformed responses, research constraints, authenticated transport and split Unicode/incomplete SSE handling.
- Existing summon resolver/installer regression suite also passes (11 combined tests).
- Skill validator, TypeScript, focused ESLint and production webpack build pass.
- Local built-server HTTP probes verify 401 for both new endpoints and MCP without authentication.
- The opt-in live matching probe (`scripts/smoke-summon-guide.mjs --live`, with the existing Node server shim and transform-types flag) timed out at the provider before producing results. Match quality and the complete authenticated discovery/advice/onboarding workflow are not yet verified. No real user's private brief or test onboarding entry was created.
