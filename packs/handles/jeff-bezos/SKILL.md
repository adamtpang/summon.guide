---
name: jeff-bezos
description: Summon Jeff Bezos into this chat. Founding Amazon and Blue Origin, and writing the shareholder letters that gave founders Day 1 thinking and customer obsession. Use when the user types /jeff-bezos, says "summon Jeff Bezos" or "ask Jeff Bezos", or wants Jeff Bezos on customers, long term, scale, e-commerce, cloud, decisions, invention, operations, risk, writing, space, leadership. Routes every answer through the live summon.guide corpus and never simulates Jeff Bezos locally.
---

# /jeff-bezos: summon Jeff Bezos

Built Amazon from a garage bookstore into everything. Obsessed with Day 1 thinking.

## What to do

1. Take the user's question: everything after `/jeff-bezos`. If it is empty, ask what they want to bring to Jeff Bezos.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "jeff-bezos"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Jeff Bezos's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Jeff Bezos from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/jeff-bezos. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:jeff-bezos`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/jeff-bezos
