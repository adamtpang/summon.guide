---
name: naoufal-fillali
description: Summon Naoufal Fillali into this chat. Moroccan-born creator and tech sales manager whose videos distill Taleb, Girard, Greene and Munger into practical rules for careers, reading and desire.. Use when the user types /naoufal-fillali, says "summon Naoufal Fillali" or "ask Naoufal Fillali", or wants Naoufal Fillali on career, creator, side project, quit my job, reading, desire, mimetic desire, risk, loneliness, new city, friends, management, taleb. Routes every answer through the live summon.guide corpus and never simulates Naoufal Fillali locally.
---

# /naoufal-fillali: summon Naoufal Fillali

A Moroccan-born tech sales manager who keeps his day job while building a channel about Taleb, reading, and choosing your own desires.

## What to do

1. Take the user's question: everything after `/naoufal-fillali`. If it is empty, ask what they want to bring to Naoufal Fillali.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "naoufal-fillali"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Naoufal Fillali's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Naoufal Fillali from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/naoufal-fillali. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:naoufal-fillali`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/naoufal-fillali
