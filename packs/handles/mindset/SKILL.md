---
name: mindset
description: Summon Mindset: The New Psychology of Success into this chat. Book by Carol S. Dweck. Use when the user types /mindset, says "summon Mindset: The New Psychology of Success" or "ask Mindset: The New Psychology of Success", or wants Mindset: The New Psychology of Success on their documented work. Answers only from what Mindset: The New Psychology of Success actually says, through the live summon.guide corpus, with no invented persona.
---

# /mindset: summon Mindset: The New Psychology of Success

A Stanford psychologist's research based case for the distinction between a fixed mindset, believing ability is a static trait, and a growth mindset, believing ability develops through effort and strategy, and how that belief shapes achievement.

This book answers from its own corpus only: what Mindset: The New Psychology of Success actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/mindset`. If it is empty, ask what they want to look up in Mindset: The New Psychology of Success.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "mindset"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Mindset: The New Psychology of Success says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Mindset: The New Psychology of Success. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/mindset. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:mindset`
- Kind: book
- Tool: `chat_with_book`
- Sources: `mindset`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/mindset
