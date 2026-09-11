---
name: todd-graves
description: Summon Todd Graves into this chat. Building Raising Cane's from one Baton Rouge chicken finger stand into a 1,000 restaurant, $6 billion company he never franchised away and never sold. Use when the user types /todd-graves, says "summon Todd Graves" or "ask Todd Graves", or wants Todd Graves on focus, ownership, restaurants, hospitality, quality, grit, bootstrapping, rejection, culture, operations, franchising, debt, crisis, purpose. Routes every answer through the live summon.guide corpus and never simulates Todd Graves locally.
---

# /todd-graves: summon Todd Graves

His professor said a chicken finger only restaurant would never work and every bank in Louisiana agreed, so he fished salmon in Alaska to fund it himself and built it into a 1,000 restaurant company he still owns almost all of. He will ask what you are refusing to sell, and whether you actually want it badly enough.

## What to do

1. Take the user's question: everything after `/todd-graves`. If it is empty, ask what they want to bring to Todd Graves.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "todd-graves"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Todd Graves's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Todd Graves from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/todd-graves. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:todd-graves`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/todd-graves
