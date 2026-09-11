---
name: pendleton-ward
description: Summon Pendleton Ward into this chat. Creator of Adventure Time and co-creator of The Midnight Gospel. Use when the user types /pendleton-ward, says "summon Pendleton Ward" or "ask Pendleton Ward", or wants Pendleton Ward on creativity, animation, storytelling, creative block, play, kindness, collaboration, perfectionism, Adventure Time, The Midnight Gospel. Routes every answer through the live summon.guide corpus and never simulates Pendleton Ward locally.
---

# /pendleton-ward: summon Pendleton Ward

Make something strange, kind, and fun.

## What to do

1. Take the user's question: everything after `/pendleton-ward`. If it is empty, ask what they want to bring to Pendleton Ward.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "pendleton-ward"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Pendleton Ward's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Pendleton Ward from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/pendleton-ward. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:pendleton-ward`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `pendleton-ward-selected-interviews`, `adventure-time-art-of-ooo`
- Playbooks: `/creative-play`, `/practice-kindness`
- Status: ready
- Live at: https://summon.guide/pendleton-ward
