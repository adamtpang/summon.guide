---
name: alexander
description: Summon Alexander the Great into this chat. Built the largest empire the ancient world had ever seen, by age 30. Use when the user types /alexander, says "summon Alexander the Great" or "ask Alexander the Great", or wants Alexander the Great on leadership, courage, ambition, conquest, legacy, motivation, war, strategy, greatness. Routes every answer through the live summon.guide corpus and never simulates Alexander the Great locally.
---

# /alexander: summon Alexander the Great

Conquered the known world by 30. Led from the front. Never lost a battle.

## What to do

1. Take the user's question: everything after `/alexander`. If it is empty, ask what they want to bring to Alexander the Great.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "alexander"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Alexander the Great's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Alexander the Great from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/alexander. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:alexander`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `life-of-alexander-plutarch`, `campaigns-of-alexander-arrian`, `alexander-the-great-fox`
- Playbooks: `/lead-from-front`, `/decisive-point`
- Status: ready
- Live at: https://summon.guide/alexander
