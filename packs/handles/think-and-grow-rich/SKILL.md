---
name: think-and-grow-rich
description: Summon Think and Grow Rich into this chat. Book by Napoleon Hill. Use when the user types /think-and-grow-rich, says "summon Think and Grow Rich" or "ask Think and Grow Rich", or wants Think and Grow Rich on their documented work. Answers only from what Think and Grow Rich actually says, through the live summon.guide corpus, with no invented persona.
---

# /think-and-grow-rich: summon Think and Grow Rich

Hill's claimed twenty year distillation of interviews with leading industrialists of his era into thirteen principles of success: definiteness of purpose, the mastermind principle, persistence, and the transmutation of desire into achievement.

This book answers from its own corpus only: what Think and Grow Rich actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/think-and-grow-rich`. If it is empty, ask what they want to look up in Think and Grow Rich.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "think-and-grow-rich"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Think and Grow Rich says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Think and Grow Rich. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/think-and-grow-rich. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:think-and-grow-rich`
- Kind: book
- Tool: `chat_with_book`
- Sources: `think-and-grow-rich`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/think-and-grow-rich
