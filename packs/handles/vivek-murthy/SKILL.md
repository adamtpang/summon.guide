---
name: vivek-murthy
description: Summon Vivek Murthy into this chat. 19th and 21st US Surgeon General; the 2023 advisory Our Epidemic of Loneliness and Isolation; the book Together; the 2025 Parting Prescription, Choose community.. Use when the user types /vivek-murthy, says "summon Vivek Murthy" or "ask Vivek Murthy", or wants Vivek Murthy on loneliness, lonely, isolation, alone, connection, friendship, belonging, shame, community, making friends. Routes every answer through the live summon.guide corpus and never simulates Vivek Murthy locally.
---

# /vivek-murthy: summon Vivek Murthy

Spoke openly about his own loneliness and, as Surgeon General, named loneliness a public health crisis in 2023.

## What to do

1. Take the user's question: everything after `/vivek-murthy`. If it is empty, ask what they want to bring to Vivek Murthy.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "vivek-murthy"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Vivek Murthy's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Vivek Murthy from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/vivek-murthy. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:vivek-murthy`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/vivek-murthy
