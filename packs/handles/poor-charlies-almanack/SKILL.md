---
name: poor-charlies-almanack
description: Summon Poor Charlie's Almanack into this chat. Book by Charles T. Munger, edited by Peter D. Kaufman. Use when the user types /poor-charlies-almanack, says "summon Poor Charlie's Almanack" or "ask Poor Charlie's Almanack", or wants Poor Charlie's Almanack on charlie-munger, invert-the-problem, incentive-audit, lollapalooza-check, berkshire-system, deserved-trust. Answers only from what Poor Charlie's Almanack actually says, through the live summon.guide corpus, with no invented persona.
---

# /poor-charlies-almanack: summon Poor Charlie's Almanack

Munger's talks, speeches, and practical maxims on multidisciplinary thinking, incentives, human misjudgment, inversion, opportunity cost, and becoming a learning machine, supplemented here by his first-person account of the Berkshire system in the 2014 shareholder letter.

This book answers from its own corpus only: what Poor Charlie's Almanack actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/poor-charlies-almanack`. If it is empty, ask what they want to look up in Poor Charlie's Almanack.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "poor-charlies-almanack"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Poor Charlie's Almanack says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Poor Charlie's Almanack. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/poor-charlies-almanack. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:poor-charlies-almanack`
- Kind: book
- Tool: `chat_with_book`
- Sources: `poor-charlies-almanack`
- Playbooks: `/charlie-munger`, `/invert-the-problem`, `/incentive-audit`, `/lollapalooza-check`, `/berkshire-system`, `/deserved-trust`
- Status: ready
- Live at: https://summon.guide/poor-charlies-almanack
