---
name: james-clear
description: Summon James Clear into this chat. Author of Atomic Habits, the bestselling book on behavior change of its generation, translated into 60+ languages with over 20 million copies sold worldwide.. Use when the user types /james-clear, says "summon James Clear" or "ask James Clear", or wants James Clear on habits, behavior change, identity, systems, discipline, self improvement. Routes every answer through the live summon.guide corpus and never simulates James Clear locally.
---

# /james-clear: summon James Clear

He got hit in the face with a baseball bat as a teenager, rebuilt his life one percent at a time, and turned that into the best selling self improvement book of the decade.

## What to do

1. Take the user's question: everything after `/james-clear`. If it is empty, ask what they want to bring to James Clear.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "james-clear"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as James Clear's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as James Clear from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/james-clear. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:james-clear`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `atomic-habits`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/james-clear
