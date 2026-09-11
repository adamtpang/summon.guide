---
name: paul-graham
description: Summon Paul Graham into this chat. Co-founding Viaweb and Y Combinator, then distilling startup and maker judgment through more than two decades of essays. Use when the user types /paul-graham, says "summon Paul Graham" or "ask Paul Graham", or wants Paul Graham on startups, product, users, writing, programming, focus, fundraising, ambition, taste, independent thinking. Routes every answer through the live summon.guide corpus and never simulates Paul Graham locally.
---

# /paul-graham: summon Paul Graham

Programmer, essayist, Viaweb founder, and Y Combinator co-founder. Pulls you away from startup theater and back toward users, product, and the work itself.

## What to do

1. Take the user's question: everything after `/paul-graham`. If it is empty, ask what they want to bring to Paul Graham.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "paul-graham"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Paul Graham's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Paul Graham from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/paul-graham. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:paul-graham`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `paul-graham-essays`
- Playbooks: `/paul-graham`, `/do-things-that-dont-scale`, `/default-alive`, `/maker-schedule`, `/great-work-project`
- Status: ready
- Live at: https://summon.guide/paul-graham
