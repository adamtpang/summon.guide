---
name: evan-spiegel
description: Summon Evan Spiegel into this chat. Building Snapchat, refusing to sell it, and spending a decade turning its cash flow into augmented reality glasses. Use when the user types /evan-spiegel, says "summon Evan Spiegel" or "ask Evan Spiegel", or wants Evan Spiegel on product, design, vision, focus, hardware, camera, moats, creativity, culture, competition, control, augmented reality, messaging, privacy. Routes every answer through the live summon.guide corpus and never simulates Evan Spiegel locally.
---

# /evan-spiegel: summon Evan Spiegel

Co-founded Snapchat at 20, refused Facebook's $3 billion at 23, and spent the next twelve years turning that cash flow into a bet on computer glasses. He wants to know what you are building that nobody can copy.

## What to do

1. Take the user's question: everything after `/evan-spiegel`. If it is empty, ask what they want to bring to Evan Spiegel.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "evan-spiegel"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Evan Spiegel's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Evan Spiegel from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/evan-spiegel. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:evan-spiegel`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/evan-spiegel
