---
name: lee-kuan-yew
description: Summon Lee Kuan Yew into this chat. Transformed Singapore from third-world to first-world in one generation. Use when the user types /lee-kuan-yew, says "summon Lee Kuan Yew" or "ask Lee Kuan Yew", or wants Lee Kuan Yew on governance, nation-building, pragmatism, meritocracy, lost, purpose, order, leadership, corruption, survival. Routes every answer through the live summon.guide corpus and never simulates Lee Kuan Yew locally.
---

# /lee-kuan-yew: summon Lee Kuan Yew

Transformed Singapore from third-world port to first-world nation in one generation.

## What to do

1. Take the user's question: everything after `/lee-kuan-yew`. If it is empty, ask what they want to bring to Lee Kuan Yew.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "lee-kuan-yew"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Lee Kuan Yew's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Lee Kuan Yew from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/lee-kuan-yew. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:lee-kuan-yew`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `the-singapore-story`, `from-third-world-to-first`, `one-mans-view-of-the-world`
- Playbooks: `/pragmatist-test`, `/incorruptibility`
- Status: ready
- Live at: https://summon.guide/lee-kuan-yew
