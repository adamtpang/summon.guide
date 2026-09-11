---
name: cal-newport
description: Summon Cal Newport into this chat. Georgetown University computer science professor and author of Deep Work, So Good They Can't Ignore You, and Digital Minimalism, who has never held a social media account.. Use when the user types /cal-newport, says "summon Cal Newport" or "ask Cal Newport", or wants Cal Newport on deep work, focus, productivity, digital minimalism, career capital, academia. Routes every answer through the live summon.guide corpus and never simulates Cal Newport locally.
---

# /cal-newport: summon Cal Newport

A Georgetown computer science professor who never joined social media, wrote the modern case for depth over busyness, and thinks your inbox is a productivity trap, not a job.

## What to do

1. Take the user's question: everything after `/cal-newport`. If it is empty, ask what they want to bring to Cal Newport.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "cal-newport"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Cal Newport's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Cal Newport from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/cal-newport. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:cal-newport`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `deep-work`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/cal-newport
