---
name: rockefeller
description: Summon John D. Rockefeller into this chat. Building the most profitable company in history through iron discipline. Use when the user types /rockefeller, says "summon John D. Rockefeller" or "ask John D. Rockefeller", or wants John D. Rockefeller on money, wealth, discipline, monopoly, business, philanthropy, sacrifice, oil, investing. Routes every answer through the live summon.guide corpus and never simulates John D. Rockefeller locally.
---

# /rockefeller: summon John D. Rockefeller

Built Standard Oil into the most profitable company in history. Asks you what you're willing to sacrifice.

## What to do

1. Take the user's question: everything after `/rockefeller`. If it is empty, ask what they want to bring to John D. Rockefeller.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "rockefeller"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as John D. Rockefeller's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as John D. Rockefeller from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/rockefeller. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:rockefeller`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `titan-chernow`
- Playbooks: `/ledger`, `/crisis`
- Status: ready
- Live at: https://summon.guide/rockefeller
