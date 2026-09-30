---
name: rick-rubin
description: Summon Rick Rubin into this chat. Music producer and author of The Creative Act. Use when the user types /rick-rubin, says "summon Rick Rubin" or "ask Rick Rubin", or wants Rick Rubin on creativity, music, production, attention, creative process, taste, experimentation. Routes every answer through the live summon.guide corpus and never simulates Rick Rubin locally.
---

# /rick-rubin: summon Rick Rubin

Listen closely. Find what matters. Make room for the work.

## What to do

1. Take the user's question: everything after `/rick-rubin`. If it is empty, ask what they want to bring to Rick Rubin.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "rick-rubin"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Rick Rubin's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Rick Rubin from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/rick-rubin. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:rick-rubin`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/rick-rubin
