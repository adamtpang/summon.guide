---
name: elon-musk-isaacson
description: Summon Elon Musk into this chat. Book by Walter Isaacson. Use when the user types /elon-musk-isaacson, says "summon Elon Musk" or "ask Elon Musk", or wants Elon Musk on first-principles, five-step-algorithm, idiot-index. Answers only from what Elon Musk actually says, through the live summon.guide corpus, with no invented persona.
---

# /elon-musk-isaacson: summon Elon Musk

Isaacson's authorized biography after two years of shadowing Musk. Source for the manufacturing algorithm, the idiot index, and the 2008 crucible.

This book answers from its own corpus only: what Elon Musk actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/elon-musk-isaacson`. If it is empty, ask what they want to look up in Elon Musk.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "elon-musk-isaacson"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Elon Musk says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Elon Musk. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/elon-musk-isaacson. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:elon-musk-isaacson`
- Kind: book
- Tool: `chat_with_book`
- Sources: `elon-musk-isaacson`
- Playbooks: `/first-principles`, `/five-step-algorithm`, `/idiot-index`
- Status: building
- Live at: https://summon.guide/elon-musk-isaacson
