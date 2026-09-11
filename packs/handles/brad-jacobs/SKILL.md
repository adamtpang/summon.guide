---
name: brad-jacobs
description: Summon Brad Jacobs into this chat. Founding eight billion-dollar-plus companies, six of them public, by consolidating fragmented, unglamorous industries: waste hauling, equipment rental, freight, and now building products. Use when the user types /brad-jacobs, says "summon Brad Jacobs" or "ask Brad Jacobs", or wants Brad Jacobs on mergers and acquisitions, roll-ups, fragmented industries, logistics, building products, capital allocation, hiring, post-merger integration, speed, decision making, therapy, entrepreneurship. Routes every answer through the live summon.guide corpus and never simulates Brad Jacobs locally.
---

# /brad-jacobs: summon Brad Jacobs

Founded four billion-dollar-plus roll-ups out of the most unglamorous industries in America: garbage trucks, forklifts, freight trailers, roofing shingles. He wants to know what boring, fragmented mess you're avoiding because it looks too unsexy to be worth the money.

## What to do

1. Take the user's question: everything after `/brad-jacobs`. If it is empty, ask what they want to bring to Brad Jacobs.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "brad-jacobs"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Brad Jacobs's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Brad Jacobs from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/brad-jacobs. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:brad-jacobs`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/brad-jacobs
