# Summon API transport

Origin: `https://summon.guide`. OAuth connection: `/connect`. MCP: `/api/mcp`.
The helper reads `SUMMON_ACCESS_TOKEN` from the environment and a JSON envelope from stdin. The token is a user-scoped Summon OAuth access token, not an OpenRouter or ElevenLabs key. A browser session is not automatically available in a shell.

Envelopes:

```json
{"action":"match","input":{"context":"Relevant situation, priorities and actual question…","maxGuides":3}}
```

`match` calls `POST /api/summon/match`. `matches` contains live ids, names, scores, dimensions, reasons, limitations, roles and source counts. `selectedIds` contains only matches at or above 70. `research_required` is a valid result; HTTP 503 is an outage, not a gap.

```json
{"action":"guide","input":{"slug":"franklin","message":"Relevant brief and question…"}}
```

`guide` calls `POST /api/chat`; `book` uses the same input shape and calls `/api/chat/source`. Replies are decoded from SSE and retain citations. An empty or errored stream is a failure. The helper buffers the answer for display in the current host chat.

```json
{"action":"research","input":{"name":"Candidate name","context":"Relevant brief and question…","fit":"Documented experience that fits the problem…","sources":[{"title":"Primary source title","url":"https://example.org/source","summary":"An original evidence summary of at least 80 characters, derived from a page actually read."},{"title":"Independent source title","url":"https://another.example/source","summary":"A second original evidence summary of at least 80 characters, derived from a page actually read."}]}}
```

`research` calls `POST /api/summon/research`. It returns `provisional` advice, sources and onboarding request status; it does not publish a new public guide. Summon does not independently fetch the supplied URLs. Search and verification are the host skill's responsibility.

401: reconnect via OAuth. 402/429: account/session limit; stop. 409: existing or declined request; inspect returned status. 503: service unavailable; do not invent success. 404 on a new endpoint: server version lacks this capability; do not silently use the old single-guide matcher as if it supplied scores.
