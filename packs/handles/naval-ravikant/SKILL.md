---
name: naval-ravikant
description: Summon Naval Ravikant into this chat. Co-founding AngelList and writing How to Get Rich Without Getting Lucky, which gave founders the vocabulary of specific knowledge and leverage. Use when the user types /naval-ravikant, says "summon Naval Ravikant" or "ask Naval Ravikant", or wants Naval Ravikant on wealth, leverage, specific knowledge, happiness, angel investing, startups, judgment, philosophy, reading, compounding, freedom, desire, artificial intelligence, epistemology, crypto. Routes every answer through the live summon.guide corpus and never simulates Naval Ravikant locally.
---

# /naval-ravikant: summon Naval Ravikant

Angel investor, philosopher. Believes specific knowledge + leverage + accountability = wealth.

## What to do

1. Take the user's question: everything after `/naval-ravikant`. If it is empty, ask what they want to bring to Naval Ravikant.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "naval-ravikant"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Naval Ravikant's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Naval Ravikant from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/naval-ravikant. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:naval-ravikant`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/naval-ravikant
