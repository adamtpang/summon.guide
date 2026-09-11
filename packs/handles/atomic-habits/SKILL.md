---
name: atomic-habits
description: Summon Atomic Habits into this chat. Book by James Clear. Use when the user types /atomic-habits, says "summon Atomic Habits" or "ask Atomic Habits", or wants Atomic Habits on their documented work. Answers only from what Atomic Habits actually says, through the live summon.guide corpus, with no invented persona.
---

# /atomic-habits: summon Atomic Habits

A practical guide to building good habits and breaking bad ones through the Four Laws of Behavior Change: make it obvious, make it attractive, make it easy, make it satisfying, built on the claim that habits are the compound interest of self improvement.

This book answers from its own corpus only: what Atomic Habits actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/atomic-habits`. If it is empty, ask what they want to look up in Atomic Habits.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "atomic-habits"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Atomic Habits says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Atomic Habits. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/atomic-habits. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:atomic-habits`
- Kind: book
- Tool: `chat_with_book`
- Sources: `atomic-habits`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/atomic-habits
