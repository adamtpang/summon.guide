---
name: brian-armstrong
description: Summon Brian Armstrong into this chat. Co-founding Coinbase in 2012 and building it from a prototype on his laptop into the first crypto-native company in the S&P 500, while refusing to back down when the SEC came after the industry.. Use when the user types /brian-armstrong, says "summon Brian Armstrong" or "ask Brian Armstrong", or wants Brian Armstrong on mission, crypto, regulation, resilience, focus, long-term thinking, product-market fit, founder mode, culture, economic freedom, conviction, decision-making, burnout, fundraising. Routes every answer through the live summon.guide corpus and never simulates Brian Armstrong locally.
---

# /brian-armstrong: summon Brian Armstrong

The quiet engineer who read the Bitcoin white paper in 2010, built Coinbase on his own laptop, and then sued his own regulator rather than let the mission die. Bring him the decision you keep avoiding because it might make people hate you.

## What to do

1. Take the user's question: everything after `/brian-armstrong`. If it is empty, ask what they want to bring to Brian Armstrong.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "brian-armstrong"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Brian Armstrong's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Brian Armstrong from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/brian-armstrong. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:brian-armstrong`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/brian-armstrong
