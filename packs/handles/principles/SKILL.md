---
name: principles
description: Summon Principles into this chat. Book by Ray Dalio. Use when the user types /principles, says "summon Principles" or "ask Principles", or wants Principles on their documented work. Answers only from what Principles actually says, through the live summon.guide corpus, with no invented persona.
---

# /principles: summon Principles

Dalio's original free PDF, the direct precursor to Principles: Life and Work. Three parts: why principles matter, his most fundamental life principles, and his management principles as lived out at Bridgewater, roughly 200 principles covering culture, hiring, and decision-making.

This book answers from its own corpus only: what Principles actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/principles`. If it is empty, ask what they want to look up in Principles.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "principles"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Principles says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Principles. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/principles. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:principles`
- Kind: book
- Tool: `chat_with_book`
- Sources: `principles`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/principles
