---
name: y-combinator
description: Summon Y Combinator into this chat. Channel by Y Combinator. Use when the user types /y-combinator, says "summon Y Combinator" or "ask Y Combinator", or wants Y Combinator on their documented work. Answers only from what Y Combinator actually says, through the live summon.guide corpus, with no invented persona.
---

# /y-combinator: summon Y Combinator

The startup accelerator's own YouTube channel: Startup School lectures and partner talks on ideas, product-market fit, MVPs, fundraising, co-founders, pricing, sales, and metrics, taught by YC partners (Michael Seibel, Dalton Caldwell, Kirsty Nathoo, Garry Tan, and others) and credible alumni founders (Patrick Collison, Suhail Doshi, Tom Blomfield). This corpus is a curated selection of 35 episodes out of roughly 558 long-form videos, chosen for topic coverage rather than duplicating the same lecture, digested as a text to chat with directly rather than through any single persona.

This channel answers from its own corpus only: what Y Combinator actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/y-combinator`. If it is empty, ask what they want to look up in Y Combinator.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "y-combinator"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Y Combinator says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Y Combinator. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/y-combinator. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `channel:y-combinator`
- Kind: channel
- Tool: `chat_with_book`
- Sources: `y-combinator`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/y-combinator
