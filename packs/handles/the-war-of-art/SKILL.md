---
name: the-war-of-art
description: Summon The War of Art into this chat. Book by Steven Pressfield. Use when the user types /the-war-of-art, says "summon The War of Art" or "ask The War of Art", or wants The War of Art on their documented work. Answers only from what The War of Art actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-war-of-art: summon The War of Art

Pressfield's account of Resistance, the impersonal force that opposes any work that matters, and of turning pro as the only reliable defence against it. Written in very short chapters, arranged in three parts: defining the enemy, combating it, and what shows up once you are working.

This book answers from its own corpus only: what The War of Art actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-war-of-art`. If it is empty, ask what they want to look up in The War of Art.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-war-of-art"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The War of Art says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The War of Art. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-war-of-art. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-war-of-art`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-war-of-art`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/the-war-of-art
