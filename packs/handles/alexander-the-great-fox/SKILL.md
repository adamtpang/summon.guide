---
name: alexander-the-great-fox
description: Summon Alexander the Great into this chat. Book by Robin Lane Fox. Use when the user types /alexander-the-great-fox, says "summon Alexander the Great" or "ask Alexander the Great", or wants Alexander the Great on their documented work. Answers only from what Alexander the Great actually says, through the live summon.guide corpus, with no invented persona.
---

# /alexander-the-great-fox: summon Alexander the Great

Modern scholarly biography. Best for synthesizing the ancient sources and assessing strategy, leadership, and the campaign's geography.

This book answers from its own corpus only: what Alexander the Great actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/alexander-the-great-fox`. If it is empty, ask what they want to look up in Alexander the Great.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "alexander-the-great-fox"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Alexander the Great says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Alexander the Great. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/alexander-the-great-fox. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:alexander-the-great-fox`
- Kind: book
- Tool: `chat_with_book`
- Sources: `alexander-the-great-fox`
- Playbooks: none registered
- Status: building
- Live at: https://summon.guide/alexander-the-great-fox
