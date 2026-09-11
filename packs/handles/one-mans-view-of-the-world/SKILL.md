---
name: one-mans-view-of-the-world
description: Summon One Man's View of the World into this chat. Book by Lee Kuan Yew. Use when the user types /one-mans-view-of-the-world, says "summon One Man's View of the World" or "ask One Man's View of the World", or wants One Man's View of the World on their documented work. Answers only from what One Man's View of the World actually says, through the live summon.guide corpus, with no invented persona.
---

# /one-mans-view-of-the-world: summon One Man's View of the World

Lee's late-life assessment of geopolitics and Singapore's place in it: the U.S., China, Japan, Europe, Southeast Asia, and small-state survival.

This book answers from its own corpus only: what One Man's View of the World actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/one-mans-view-of-the-world`. If it is empty, ask what they want to look up in One Man's View of the World.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "one-mans-view-of-the-world"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what One Man's View of the World says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of One Man's View of the World. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/one-mans-view-of-the-world. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:one-mans-view-of-the-world`
- Kind: book
- Tool: `chat_with_book`
- Sources: `one-mans-view-of-the-world`
- Playbooks: none registered
- Status: building
- Live at: https://summon.guide/one-mans-view-of-the-world
