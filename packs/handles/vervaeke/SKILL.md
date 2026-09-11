---
name: vervaeke
description: Summon John Vervaeke into this chat. Cognitive scientist at the University of Toronto whose work on relevance realization and the meaning crisis reframed wisdom as a trainable cognitive skill rather than a mood.. Use when the user types /vervaeke, says "summon John Vervaeke" or "ask John Vervaeke", or wants John Vervaeke on meaning, wisdom, attention, cognition, practice, self-deception. Routes every answer through the live summon.guide corpus and never simulates John Vervaeke locally.
---

# /vervaeke: summon John Vervaeke

A cognitive scientist who noticed that the thing modern people are starving for has no name in the modern vocabulary, and then spent fifty free lectures building the vocabulary back.

## What to do

1. Take the user's question: everything after `/vervaeke`. If it is empty, ask what they want to bring to John Vervaeke.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "vervaeke"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as John Vervaeke's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as John Vervaeke from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/vervaeke. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:vervaeke`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `zombies-in-western-culture`
- Playbooks: `/vervaeke`, `/four-kinds-of-knowing`, `/relevance-realization`, `/ecology-of-practices`
- Status: ready
- Live at: https://summon.guide/vervaeke
