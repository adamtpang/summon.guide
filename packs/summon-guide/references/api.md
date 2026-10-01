# Public retrieval

Run `node "<skill directory>/scripts/client.mjs"` with JSON on stdin.

`{"action":"roster"}` calls GET https://summon.guide/api/public/guides.
Returns guides with id, name, kind, domains, description, availability, sourceCount and URL. Building guides have null URL.

`{"action":"notes","input":{"id":"<id from roster>","query":"startup customers focus","limit":4}}` calls POST https://summon.guide/api/public/notes.

Only id, query (2–600 characters) and limit (1–6) are accepted. Body limit 4 KB. Never send personal context. Returns status (ok, no_corpus, no_relevant_notes), sourceCount and notes containing id, title, principle, lessons, sourceUrl and kind=synthesis_excerpt. No raw transcript or filesystem path. This assistant performs matching, scoring and generation.

No Authorization header or login. 400 invalid input; 404 unknown guide; 429 burst limit. Retry service failures later; they do not indicate an expertise gap. Roster is cached, notes are not publicly cached. Burst protection is per server instance, not a global quota.

# Optional authenticated generation

With a user-provided SUMMON_ACCESS_TOKEN environment variable, existing helper actions remain: match and research accept server input; guide and book accept {slug,message}. These call /api/summon/match, /api/summon/research, /api/chat and /api/chat/source. They transmit input and may consume allowance. Use only on explicit request for server generation or tracked onboarding. Never substitute provider credentials. MCP https://summon.guide/api/mcp is an optional authenticated transport.
