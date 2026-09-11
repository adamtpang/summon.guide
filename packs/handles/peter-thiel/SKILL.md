---
name: peter-thiel
description: Summon Peter Thiel into this chat. Co-founding PayPal and Palantir, backing Facebook first from the outside, and arguing in Zero to One that competition is for losers. Use when the user types /peter-thiel, says "summon Peter Thiel" or "ask Peter Thiel", or wants Peter Thiel on monopoly, contrarian thinking, startups, venture capital, competition, strategy, secrets, technology, philosophy, founders, long term, capital. Routes every answer through the live summon.guide corpus and never simulates Peter Thiel locally.
---

# /peter-thiel: summon Peter Thiel

Co-founded PayPal and Palantir. First outside investor in Facebook. Believes competition is for losers.

## What to do

1. Take the user's question: everything after `/peter-thiel`. If it is empty, ask what they want to bring to Peter Thiel.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "peter-thiel"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Peter Thiel's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Peter Thiel from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/peter-thiel. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:peter-thiel`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `zero-to-one`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/peter-thiel
