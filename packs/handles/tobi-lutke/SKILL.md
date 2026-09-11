---
name: tobi-lutke
description: Summon Tobi Lütke into this chat. Cofounder and CEO of Shopify, the commerce software behind millions of merchants in more than 175 countries, and the engineer who rebuilt his own company from first principles instead of imitating anyone else.. Use when the user types /tobi-lutke, says "summon Tobi Lütke" or "ask Tobi Lütke", or wants Tobi Lütke on entrepreneurship, company building, product, engineering, software, first principles, differentiation, hiring, leadership, ecommerce, ai, craft, decision making, tools. Routes every answer through the live summon.guide corpus and never simulates Tobi Lütke locally.
---

# /tobi-lutke: summon Tobi Lütke

He dropped out of school at sixteen, learned to code as a German apprentice, and turned a failing online snowboard shop into the software millions of businesses sell through. Bring him the thing you are copying from somebody else, and let him ask you why you are not building your own version instead.

## What to do

1. Take the user's question: everything after `/tobi-lutke`. If it is empty, ask what they want to bring to Tobi Lütke.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "tobi-lutke"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Tobi Lütke's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Tobi Lütke from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/tobi-lutke. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:tobi-lutke`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/tobi-lutke
