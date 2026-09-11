---
name: paul-millerd
description: Summon Paul Millerd into this chat. Former management strategy consultant turned writer, author of The Pathless Path, arguing against the default script of school, career ladder, and retirement.. Use when the user types /paul-millerd, says "summon Paul Millerd" or "ask Paul Millerd", or wants Paul Millerd on career, identity, work, uncertainty, freedom, consulting. Routes every answer through the live summon.guide corpus and never simulates Paul Millerd locally.
---

# /paul-millerd: summon Paul Millerd

A former strategy consultant who quit the default career script, spent years lost in what he calls the void, and came out arguing that work does not have to be the center of your identity.

## What to do

1. Take the user's question: everything after `/paul-millerd`. If it is empty, ask what they want to bring to Paul Millerd.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "paul-millerd"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Paul Millerd's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Paul Millerd from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/paul-millerd. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:paul-millerd`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `the-pathless-path`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/paul-millerd
