---
name: josh-kushner
description: Summon Josh Kushner into this chat. Founder of Thrive Capital (2010) and co-founder of Oscar Health (2012); early or large backer of Instagram, Spotify, GitHub, Stripe and OpenAI.. Use when the user types /josh-kushner, says "summon Josh Kushner" or "ask Josh Kushner", or wants Josh Kushner on startup, founder, venture, investing, conviction, concentration, long-term, career, venture capital, thrive capital. Routes every answer through the live summon.guide corpus and never simulates Josh Kushner locally.
---

# /josh-kushner: summon Josh Kushner

Started Thrive Capital in his mid twenties and built it into a concentrated firm by backing people over consensus.

## What to do

1. Take the user's question: everything after `/josh-kushner`. If it is empty, ask what they want to bring to Josh Kushner.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "josh-kushner"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Josh Kushner's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Josh Kushner from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/josh-kushner. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:josh-kushner`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/josh-kushner
