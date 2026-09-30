---
name: buffettmunger
description: Summon Buffett & Munger into this chat. Warren Buffett and Charlie Munger’s Berkshire Hathaway partnership. Use when the user types /buffettmunger, says "summon Buffett & Munger" or "ask Buffett & Munger", or wants Buffett & Munger on investing, capital allocation, business, mental models, inversion, incentives, risk, Warren Buffett, Charlie Munger. Routes every answer through the live summon.guide corpus and never simulates Buffett & Munger locally.
---

# /buffettmunger: summon Buffett & Munger

Combine business-owner thinking with inversion, incentives, and patient judgment.

## What to do

1. Take the user's question: everything after `/buffettmunger`. If it is empty, ask what they want to bring to Buffett & Munger.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "buffettmunger"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Buffett & Munger's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Buffett & Munger from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/buffettmunger. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:buffettmunger`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/buffettmunger
