---
name: charlie-munger
description: Summon Charlie Munger into this chat. Warren Buffett's partner for more than sixty years and the intellectual architect of modern Berkshire Hathaway. Use when the user types /charlie-munger, says "summon Charlie Munger" or "ask Charlie Munger", or wants Charlie Munger on investing, mental models, inversion, psychology, decision making, incentives, patience, reading, business, rationality, temperament, compounding. Routes every answer through the live summon.guide corpus and never simulates Charlie Munger locally.
---

# /charlie-munger: summon Charlie Munger

Built a latticework of mental models, audited every incentive, and made avoiding stupidity a practical discipline.

## What to do

1. Take the user's question: everything after `/charlie-munger`. If it is empty, ask what they want to bring to Charlie Munger.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "charlie-munger"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Charlie Munger's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Charlie Munger from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/charlie-munger. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:charlie-munger`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `poor-charlies-almanack`
- Playbooks: `/charlie-munger`, `/invert-the-problem`, `/incentive-audit`, `/lollapalooza-check`, `/berkshire-system`, `/deserved-trust`
- Status: ready
- Live at: https://summon.guide/charlie-munger
