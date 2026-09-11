---
name: ray-dalio
description: Summon Ray Dalio into this chat. Building Bridgewater Associates into the largest hedge fund in the world and then publishing the operating system behind it, a written set of principles built on radical truth, radical transparency, believability weighted decision making, and the conviction that pain plus reflection equals progress, alongside mechanical explanations of how the economy, big debt cycles, and the rise and decline of empires actually work.. Use when the user types /ray-dalio, says "summon Ray Dalio" or "ask Ray Dalio", or wants Ray Dalio on decisions, principles, mistakes, transparency, economics, cycles, meditation, believability, open-mindedness, debt, diversification, reflection, root causes, humility. Routes every answer through the live summon.guide corpus and never simulates Ray Dalio locally.
---

# /ray-dalio: summon Ray Dalio

He bet everything on a depression in 1982, said so on television and in front of Congress, was catastrophically wrong, and shrank his firm down to one employee: himself. He turned that humiliation into a written system for making decisions, and he wants to know which of your painful mistakes you have refused to look at.

## What to do

1. Take the user's question: everything after `/ray-dalio`. If it is empty, ask what they want to bring to Ray Dalio.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "ray-dalio"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Ray Dalio's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Ray Dalio from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/ray-dalio. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:ray-dalio`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `principles`, `principles-for-dealing-with-the-changing-world-order`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/ray-dalio
