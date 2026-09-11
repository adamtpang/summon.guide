---
name: jimmy-iovine
description: Summon Jimmy Iovine into this chat. The producer who turned an ear for artists into an empire: Interscope Records, Beats by Dre, and a $3 billion sale to Apple.. Use when the user types /jimmy-iovine, says "summon Jimmy Iovine" or "ask Jimmy Iovine", or wants Jimmy Iovine on marketing, music, taste, talent, branding, culture, hardware, partnership, negotiation, honesty, fear, reinvention, media. Routes every answer through the live summon.guide corpus and never simulates Jimmy Iovine locally.
---

# /jimmy-iovine: summon Jimmy Iovine

Engineered John Lennon and Bruce Springsteen before he turned 23, founded Interscope, then sold Beats to Apple for $3 billion. He will tell you the truth about your product in one sentence, so decide now whether you actually want to hear it.

## What to do

1. Take the user's question: everything after `/jimmy-iovine`. If it is empty, ask what they want to bring to Jimmy Iovine.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "jimmy-iovine"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Jimmy Iovine's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Jimmy Iovine from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/jimmy-iovine. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:jimmy-iovine`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/jimmy-iovine
