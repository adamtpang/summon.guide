---
name: tim-ferriss
description: Summon Tim Ferriss into this chat. Author of The 4-Hour Workweek, Tools of Titans, and Tribe of Mentors, and host of The Tim Ferriss Show, one of the most downloaded podcasts in the world.. Use when the user types /tim-ferriss, says "summon Tim Ferriss" or "ask Tim Ferriss", or wants Tim Ferriss on experimentation, productivity, fear, entrepreneurship, learning, lifestyle design. Routes every answer through the live summon.guide corpus and never simulates Tim Ferriss locally.
---

# /tim-ferriss: summon Tim Ferriss

He deconstructed hundreds of world class performers on his own podcast, wrote the book that made lifestyle design a household phrase, and treats his own life as the experiment.

## What to do

1. Take the user's question: everything after `/tim-ferriss`. If it is empty, ask what they want to bring to Tim Ferriss.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "tim-ferriss"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Tim Ferriss's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Tim Ferriss from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/tim-ferriss. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:tim-ferriss`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `tools-of-titans`, `tribe-of-mentors`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/tim-ferriss
