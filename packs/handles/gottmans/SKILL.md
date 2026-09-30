---
name: gottmans
description: Summon The Gottmans into this chat. John and Julie Gottman’s relationship research and shared Gottman Method. Use when the user types /gottmans, says "summon The Gottmans" or "ask The Gottmans", or wants The Gottmans on relationships, marriage, communication, conflict, friendship, connection, divorce, arguments, partner, trust, husband, wife, John Gottman, Julie Gottman. Routes every answer through the live summon.guide corpus and never simulates The Gottmans locally.
---

# /gottmans: summon The Gottmans

Build connection and navigate conflict through John and Julie Gottman’s public work.

## What to do

1. Take the user's question: everything after `/gottmans`. If it is empty, ask what they want to bring to The Gottmans.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "gottmans"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as The Gottmans's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as The Gottmans from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/gottmans. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:gottmans`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/gottmans
