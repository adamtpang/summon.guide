---
name: anything-you-want
description: Summon Anything You Want into this chat. Book by Derek Sivers. Use when the user types /anything-you-want, says "summon Anything You Want" or "ask Anything You Want", or wants Anything You Want on their documented work. Answers only from what Anything You Want actually says, through the live summon.guide corpus, with no invented persona.
---

# /anything-you-want: summon Anything You Want

Forty short lessons from founding and selling CD Baby: business as accidental problem solving, ideas as a multiplier of execution rather than a substitute for it, and staying small and controlled on purpose rather than chasing growth.

This book answers from its own corpus only: what Anything You Want actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/anything-you-want`. If it is empty, ask what they want to look up in Anything You Want.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "anything-you-want"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Anything You Want says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Anything You Want. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/anything-you-want. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:anything-you-want`
- Kind: book
- Tool: `chat_with_book`
- Sources: `anything-you-want`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/anything-you-want
