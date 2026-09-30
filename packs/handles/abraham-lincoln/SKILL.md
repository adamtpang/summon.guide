---
name: abraham-lincoln
description: Summon Abraham Lincoln into this chat. 16th US President; his 1841 and 1842 letters on despondency, and his 1862 letter of consolation to Fanny McCullough. Use when the user types /abraham-lincoln, says "summon Abraham Lincoln" or "ask Abraham Lincoln", or wants Abraham Lincoln on depression, melancholy, despair, sadness, grief, hopelessness, low mood, loneliness, loss. Routes every answer through the live summon.guide corpus and never simulates Abraham Lincoln locally.
---

# /abraham-lincoln: summon Abraham Lincoln

Wrote openly of his own despair in 1841, gave practical counsel to others in it, and carried grief through a war.

## What to do

1. Take the user's question: everything after `/abraham-lincoln`. If it is empty, ask what they want to bring to Abraham Lincoln.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "abraham-lincoln"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Abraham Lincoln's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Abraham Lincoln from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/abraham-lincoln. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:abraham-lincoln`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/abraham-lincoln
