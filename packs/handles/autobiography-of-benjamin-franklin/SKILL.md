---
name: autobiography-of-benjamin-franklin
description: Summon The Autobiography of Benjamin Franklin into this chat. Book by Benjamin Franklin. Use when the user types /autobiography-of-benjamin-franklin, says "summon The Autobiography of Benjamin Franklin" or "ask The Autobiography of Benjamin Franklin", or wants The Autobiography of Benjamin Franklin on thirteen-virtues. Answers only from what The Autobiography of Benjamin Franklin actually says, through the live summon.guide corpus, with no invented persona.
---

# /autobiography-of-benjamin-franklin: summon The Autobiography of Benjamin Franklin

Franklin's own account, begun 1771, published posthumously. The 13 Virtues, the Junto, his approach to self-education and reinvention all come from here.

This book answers from its own corpus only: what The Autobiography of Benjamin Franklin actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/autobiography-of-benjamin-franklin`. If it is empty, ask what they want to look up in The Autobiography of Benjamin Franklin.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "autobiography-of-benjamin-franklin"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Autobiography of Benjamin Franklin says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Autobiography of Benjamin Franklin. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/autobiography-of-benjamin-franklin. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:autobiography-of-benjamin-franklin`
- Kind: book
- Tool: `chat_with_book`
- Sources: `autobiography-of-benjamin-franklin`
- Playbooks: `/thirteen-virtues`
- Status: ready
- Live at: https://summon.guide/autobiography-of-benjamin-franklin
