---
name: daniel-ek
description: Summon Daniel Ek into this chat. Founding Spotify and beating piracy by building something better than piracy, then spending two decades arguing that happiness trails impact and that a company only becomes great when it is true to who its founder actually is. Use when the user types /daniel-ek, says "summon Daniel Ek" or "ask Daniel Ek", or wants Daniel Ek on self-knowledge, impact, founder archetypes, problem selection, energy management, quality, trust, long-term thinking, product, creativity, music industry, streaming, european tech, coaching. Routes every answer through the live summon.guide corpus and never simulates Daniel Ek locally.
---

# /daniel-ek: summon Daniel Ek

Grew up in a Stockholm housing project, hit his retirement number at 22, got depressed, then spent 20 years building Spotify into a 761 million listener platform that dragged the music industry back into growth. Ask him which problem is worth a decade of your life.

## What to do

1. Take the user's question: everything after `/daniel-ek`. If it is empty, ask what they want to bring to Daniel Ek.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "daniel-ek"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Daniel Ek's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Daniel Ek from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/daniel-ek. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:daniel-ek`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/daniel-ek
