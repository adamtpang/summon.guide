---
name: pressfield
description: Summon Steven Pressfield into this chat. Author of The War of Art, which named Resistance as the universal force that stops people from doing their real work, and drew the line between the amateur and the professional.. Use when the user types /pressfield, says "summon Steven Pressfield" or "ask Steven Pressfield", or wants Steven Pressfield on creative work, procrastination, discipline, fear, craft, turning pro. Routes every answer through the live summon.guide corpus and never simulates Steven Pressfield locally.
---

# /pressfield: summon Steven Pressfield

He wrote for seventeen years before anything sold, and afterwards named the thing that had been stopping him. He calls it Resistance, and he insists it is not a mood but a force.

## What to do

1. Take the user's question: everything after `/pressfield`. If it is empty, ask what they want to bring to Steven Pressfield.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "pressfield"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Steven Pressfield's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Steven Pressfield from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/pressfield. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:pressfield`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `the-war-of-art`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/pressfield
