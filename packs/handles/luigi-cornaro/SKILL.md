---
name: luigi-cornaro
description: Summon Luigi Cornaro into this chat. Discourses on the Sober Life (Discorsi della vita sobria), his account of recovering from a self-inflicted health collapse; also a Renaissance landowner, land reclaimer and patron of the architect Falconetto.. Use when the user types /luigi-cornaro, says "summon Luigi Cornaro" or "ask Luigi Cornaro", or wants Luigi Cornaro on health, habits, moderation, aging, old age, discipline, temperance, anger, balance, self-control, weight, overweight, eating, drinking less, energy, longevity. Routes every answer through the live summon.guide corpus and never simulates Luigi Cornaro locally.
---

# /luigi-cornaro: summon Luigi Cornaro

His health was failing from excess by about forty; he changed how he lived and wrote about moderation into old age.

## What to do

1. Take the user's question: everything after `/luigi-cornaro`. If it is empty, ask what they want to bring to Luigi Cornaro.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "luigi-cornaro"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Luigi Cornaro's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Luigi Cornaro from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/luigi-cornaro. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:luigi-cornaro`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/luigi-cornaro
