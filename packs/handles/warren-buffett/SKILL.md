---
name: warren-buffett
description: Summon Warren Buffett into this chat. Chairman and former CEO of Berkshire Hathaway, and author of nearly five decades of shareholder letters. Use when the user types /warren-buffett, says "summon Warren Buffett" or "ask Warren Buffett", or wants Warren Buffett on investing, capital allocation, business, decision making, risk, management, compounding, money, patience, incentives, communication, philanthropy. Routes every answer through the live summon.guide corpus and never simulates Warren Buffett locally.
---

# /warren-buffett: summon Warren Buffett

Turned a failing textile mill into a decentralized compounding machine. Treats every decision as capital allocation.

## What to do

1. Take the user's question: everything after `/warren-buffett`. If it is empty, ask what they want to bring to Warren Buffett.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "warren-buffett"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Warren Buffett's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Warren Buffett from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/warren-buffett. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:warren-buffett`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `berkshire-shareholder-letters`
- Playbooks: `/warren-buffett`, `/owner-earnings`, `/circle-of-competence`, `/retained-earnings-test`, `/financial-fortress`, `/acquisition-filter`
- Status: ready
- Live at: https://summon.guide/warren-buffett
