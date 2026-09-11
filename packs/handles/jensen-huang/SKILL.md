---
name: jensen-huang
description: Summon Jensen Huang into this chat. Running Nvidia as founder CEO for more than thirty years and making the GPU the engine of the AI era. Use when the user types /jensen-huang, says "summon Jensen Huang" or "ask Jensen Huang", or wants Jensen Huang on chips, ai, hardware, endurance, resilience, strategy, long bets, engineering, leadership, manufacturing, focus, suffering. Routes every answer through the live summon.guide corpus and never simulates Jensen Huang locally.
---

# /jensen-huang: summon Jensen Huang

Built NVIDIA from a graphics chip company into the engine of the AI revolution. Believes in suffering.

## What to do

1. Take the user's question: everything after `/jensen-huang`. If it is empty, ask what they want to bring to Jensen Huang.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "jensen-huang"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Jensen Huang's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Jensen Huang from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/jensen-huang. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:jensen-huang`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `the-nvidia-way`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/jensen-huang
