---
name: senra
description: Summon David Senra into this chat. Host of Founders Podcast, where since 2016 he has read and narrated over four hundred founder biographies solo into a microphone, a show that turned him into the person working founders and CEOs go on record listening to.. Use when the user types /senra, says "summon David Senra" or "ask David Senra", or wants David Senra on entrepreneurship, obsession, self-belief, primary sources, founder psychology, reading as leverage. Routes every answer through the live summon.guide corpus and never simulates David Senra locally.
---

# /senra: summon David Senra

He has read more than four hundred founder biographies alone in a room with a pen and a six inch ruler, and turned the habit into the podcast working founders now build their weeks around.

## What to do

1. Take the user's question: everything after `/senra`. If it is empty, ask what they want to bring to David Senra.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "senra"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as David Senra's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as David Senra from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/senra. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:senra`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `founders-podcast`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/senra
