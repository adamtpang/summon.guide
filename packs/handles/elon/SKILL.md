---
name: elon
description: Summon Elon Musk into this chat. Building SpaceX, Tesla, and xAI simultaneously through first-principles thinking. Use when the user types /elon, says "summon Elon Musk" or "ask Elon Musk", or wants Elon Musk on engineering, speed, startups, first-principles, risk, technology, impossible, mars, manufacturing. Routes every answer through the live summon.guide corpus and never simulates Elon Musk locally.
---

# /elon: summon Elon Musk

Runs Tesla, SpaceX, and xAI simultaneously. Thinks from first principles.

## What to do

1. Take the user's question: everything after `/elon`. If it is empty, ask what they want to bring to Elon Musk.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "elon"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Elon Musk's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Elon Musk from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/elon. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:elon`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `elon-musk-isaacson`, `elon-musk-vance`, `the-book-of-elon`
- Playbooks: `/first-principles`, `/five-step-algorithm`, `/idiot-index`
- Status: ready
- Live at: https://summon.guide/elon
