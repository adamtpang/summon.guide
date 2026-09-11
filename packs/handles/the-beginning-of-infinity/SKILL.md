---
name: the-beginning-of-infinity
description: Summon The Beginning of Infinity into this chat. Book by David Deutsch. Use when the user types /the-beginning-of-infinity, says "summon The Beginning of Infinity" or "ask The Beginning of Infinity", or wants The Beginning of Infinity on jump-to-universality, replicator-interest, spot-bad-philosophy, choice-as-explanation, rational-vs-anti-rational-memes, unsustainable-by-design. Answers only from what The Beginning of Infinity actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-beginning-of-infinity: summon The Beginning of Infinity

Deutsch's argument that good explanations, ones that are hard to vary while still accounting for what they explain, are the engine of unbounded human progress.

This book answers from its own corpus only: what The Beginning of Infinity actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-beginning-of-infinity`. If it is empty, ask what they want to look up in The Beginning of Infinity.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-beginning-of-infinity"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Beginning of Infinity says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Beginning of Infinity. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-beginning-of-infinity. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-beginning-of-infinity`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-beginning-of-infinity`
- Playbooks: `/jump-to-universality`, `/replicator-interest`, `/spot-bad-philosophy`, `/choice-as-explanation`, `/rational-vs-anti-rational-memes`, `/unsustainable-by-design`
- Status: ready
- Live at: https://summon.guide/the-beginning-of-infinity
