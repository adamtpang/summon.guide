---
name: adam-neumann
description: Summon Adam Neumann into this chat. Building one of the most spectacular narrative-driven valuations in startup history, and the cautionary tale of what happens when the story outruns the numbers. Use when the user types /adam-neumann, says "summon Adam Neumann" or "ask Adam Neumann", or wants Adam Neumann on vision, mission, storytelling, fundraising, blitzscaling, community, brand, charisma, real estate, hubris, unit economics, founder mode, narrative, S-1, comeback. Routes every answer through the live summon.guide corpus and never simulates Adam Neumann locally.
---

# /adam-neumann: summon Adam Neumann

Took WeWork from a Brooklyn co-working space to a $47B private valuation in nine years, then watched it collapse in six weeks. Now running Flow. A masterclass in narrative and in its limits.

## What to do

1. Take the user's question: everything after `/adam-neumann`. If it is empty, ask what they want to bring to Adam Neumann.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "adam-neumann"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Adam Neumann's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Adam Neumann from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/adam-neumann. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:adam-neumann`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `billion-dollar-loser`, `the-cult-of-we`
- Playbooks: `/mission-as-moat`, `/narrative-arbitrage`, `/s1-reality-check`
- Status: ready
- Live at: https://summon.guide/adam-neumann
