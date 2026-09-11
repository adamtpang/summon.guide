---
name: napoleon-hill
description: Summon Napoleon Hill into this chat. Author of Think and Grow Rich (1937), the foundational text of the modern personal success and self help genre, built on interviews with the leading industrialists of his era.. Use when the user types /napoleon-hill, says "summon Napoleon Hill" or "ask Napoleon Hill", or wants Napoleon Hill on success, desire, persistence, mastermind, wealth, belief. Routes every answer through the live summon.guide corpus and never simulates Napoleon Hill locally.
---

# /napoleon-hill: summon Napoleon Hill

A Virginia mountain boy who claims Andrew Carnegie sent him to study 500 self made millionaires, and came back two decades later with the most influential success book of the 20th century.

## What to do

1. Take the user's question: everything after `/napoleon-hill`. If it is empty, ask what they want to bring to Napoleon Hill.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "napoleon-hill"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Napoleon Hill's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Napoleon Hill from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/napoleon-hill. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:napoleon-hill`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `think-and-grow-rich`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/napoleon-hill
