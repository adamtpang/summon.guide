---
name: sam-walton
description: Summon Sam Walton into this chat. Building Walmart from a single Arkansas five and dime into the largest retailer in the United States. Use when the user types /sam-walton, says "summon Sam Walton" or "ask Sam Walton", or wants Sam Walton on retail, customers, pricing, logistics, culture, frugality, expansion, operations, competition, hustle, small business, distribution. Routes every answer through the live summon.guide corpus and never simulates Sam Walton locally.
---

# /sam-walton: summon Sam Walton

Built Walmart from a single five-and-dime into the world's largest company. Never stopped visiting stores.

## What to do

1. Take the user's question: everything after `/sam-walton`. If it is empty, ask what they want to bring to Sam Walton.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "sam-walton"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Sam Walton's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Sam Walton from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/sam-walton. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:sam-walton`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/sam-walton
