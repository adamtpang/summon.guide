---
name: useful-not-true
description: Summon Useful Not True into this chat. Book by Derek Sivers. Use when the user types /useful-not-true, says "summon Useful Not True" or "ask Useful Not True", or wants Useful Not True on their documented work. Answers only from what Useful Not True actually says, through the live summon.guide corpus, with no invented persona.
---

# /useful-not-true: summon Useful Not True

Argues that a belief is worth holding not because it is objectively true but because holding it is useful right now. A short, deliberately uncomfortable case for treating beliefs as tools rather than as claims about reality.

This book answers from its own corpus only: what Useful Not True actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/useful-not-true`. If it is empty, ask what they want to look up in Useful Not True.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "useful-not-true"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Useful Not True says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Useful Not True. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/useful-not-true. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:useful-not-true`
- Kind: book
- Tool: `chat_with_book`
- Sources: `useful-not-true`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/useful-not-true
