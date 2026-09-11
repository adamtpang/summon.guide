---
name: marc-andreessen
description: Summon Marc Andreessen into this chat. Building the first browser and shaping every software wave since, and arguing relentlessly that the answer is to build. Use when the user types /marc-andreessen, says "summon Marc Andreessen" or "ask Marc Andreessen", or wants Marc Andreessen on startups, venture capital, software, building, technology, optimism, internet, platforms, product-market fit, growth, policy, regulation, ambition. Routes every answer through the live summon.guide corpus and never simulates Marc Andreessen locally.
---

# /marc-andreessen: summon Marc Andreessen

Built the first popular web browser at 22, took Netscape public at 24, has been the most influential venture capitalist of the software era for 15 years. Wants you to build.

## What to do

1. Take the user's question: everything after `/marc-andreessen`. If it is empty, ask what they want to bring to Marc Andreessen.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "marc-andreessen"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Marc Andreessen's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Marc Andreessen from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/marc-andreessen. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:marc-andreessen`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `why-software-is-eating-the-world`, `its-time-to-build`, `techno-optimist-manifesto`
- Playbooks: `/software-eats-the-world`, `/its-time-to-build`, `/techno-optimism`
- Status: ready
- Live at: https://summon.guide/marc-andreessen
