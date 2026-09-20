# Summon Guide: install once, use in chat

Install: `npx --yes github:adamtpang/summon.guide summon install summon-guide --global`.
Start a fresh Codex or Claude Code chat and ask it to use summon-guide. No Summon login, key or MCP configuration is required. Host skill invocation syntax can vary.

The host extracts visible context locally, fetches the live roster, ranks suitable guides, retrieves bounded published synthesis excerpts, and writes cited advice in the current chat. Only generic topic queries leave the host. Compatibility scores are host estimates using problem /50, constraints /25, approach /15 and evidence /10. This flow uses the host's existing model and tools, not a separate Summon generation call.

Public contract:
- GET /api/public/guides: cached roster, identities, availability and public corpus counts.
- POST /api/public/notes: strict id/query/limit body; 4 KB maximum, query 600 characters, at most six notes, three bounded lessons per note. Returns ok, no_corpus or no_relevant_notes. Unknown identities return 404. No auth or paid model invocation.
- Notes are projected only from existing generated public synthesis registries. No filesystem loading, private transcript paths, persona prompts or raw corpora are returned. Source coverage varies.
- Notes have per-instance burst protection (60/minute) and private/no-store responses. This is not a distributed quota. The static roster is CDN-cacheable. Neither endpoint accepts arbitrary URLs for fetching.

If the roster lacks expertise, the host researches a candidate and gives explicitly provisional source-backed advice. A source-only local dossier can persist in a private git-ignored directory. This does not publish a profile or complete corpus ingestion/evaluation. Discovery is bounded to one candidate per invocation.

Optional authenticated features remain unchanged: /api/summon/match, /api/summon/research, /api/chat, /api/chat/source and /api/mcp. They require Summon authentication and may consume membership allowance. Server onboarding is a separate explicit action; default skill use never blocks on it.

Validation: `node --import ./scripts/node-server-shim.mjs --test scripts/public-guide.test.mjs scripts/summon-guide.test.mjs scripts/summon-skill.test.mjs`.
