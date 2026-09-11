---
name: benjamin-franklin-an-american-life
description: Summon Benjamin Franklin: An American Life into this chat. Book by Walter Isaacson. Use when the user types /benjamin-franklin-an-american-life, says "summon Benjamin Franklin: An American Life" or "ask Benjamin Franklin: An American Life", or wants Benjamin Franklin: An American Life on junto. Answers only from what Benjamin Franklin: An American Life actually says, through the live summon.guide corpus, with no invented persona.
---

# /benjamin-franklin-an-american-life: summon Benjamin Franklin: An American Life

Isaacson's biography. Best modern source for Franklin's diplomatic work in France, the Junto's institutional legacy, and his reinventions across seven careers.

This book answers from its own corpus only: what Benjamin Franklin: An American Life actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/benjamin-franklin-an-american-life`. If it is empty, ask what they want to look up in Benjamin Franklin: An American Life.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "benjamin-franklin-an-american-life"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Benjamin Franklin: An American Life says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Benjamin Franklin: An American Life. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/benjamin-franklin-an-american-life. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:benjamin-franklin-an-american-life`
- Kind: book
- Tool: `chat_with_book`
- Sources: `benjamin-franklin-an-american-life`
- Playbooks: `/junto`
- Status: building
- Live at: https://summon.guide/benjamin-franklin-an-american-life
