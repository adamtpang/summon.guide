---
name: fooled-by-randomness
description: Summon Fooled by Randomness into this chat. Book by Nassim Nicholas Taleb. Use when the user types /fooled-by-randomness, says "summon Fooled by Randomness" or "ask Fooled by Randomness", or wants Fooled by Randomness on alternative-histories, count-the-monkeys, match-the-observation-window, weight-the-magnitude, distrust-the-hot-streak, falsify-before-you-commit. Answers only from what Fooled by Randomness actually says, through the live summon.guide corpus, with no invented persona.
---

# /fooled-by-randomness: summon Fooled by Randomness

The first Incerto book. On the difference between skill and luck, why rare, unseen events dominate outcomes people attribute to competence, and how a trader survives long enough for competence to matter.

This book answers from its own corpus only: what Fooled by Randomness actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/fooled-by-randomness`. If it is empty, ask what they want to look up in Fooled by Randomness.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "fooled-by-randomness"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Fooled by Randomness says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Fooled by Randomness. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/fooled-by-randomness. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:fooled-by-randomness`
- Kind: book
- Tool: `chat_with_book`
- Sources: `fooled-by-randomness`
- Playbooks: `/alternative-histories`, `/count-the-monkeys`, `/match-the-observation-window`, `/weight-the-magnitude`, `/distrust-the-hot-streak`, `/falsify-before-you-commit`
- Status: ready
- Live at: https://summon.guide/fooled-by-randomness
