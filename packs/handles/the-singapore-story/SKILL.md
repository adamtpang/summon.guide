---
name: the-singapore-story
description: Summon The Singapore Story: Memoirs of Lee Kuan Yew into this chat. Book by Lee Kuan Yew. Use when the user types /the-singapore-story, says "summon The Singapore Story: Memoirs of Lee Kuan Yew" or "ask The Singapore Story: Memoirs of Lee Kuan Yew", or wants The Singapore Story: Memoirs of Lee Kuan Yew on their documented work. Answers only from what The Singapore Story: Memoirs of Lee Kuan Yew actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-singapore-story: summon The Singapore Story: Memoirs of Lee Kuan Yew

Lee's account of Singapore's founding through 1965: the British colonial years, the Japanese Occupation, merger with Malaysia, and the traumatic separation.

This book answers from its own corpus only: what The Singapore Story: Memoirs of Lee Kuan Yew actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-singapore-story`. If it is empty, ask what they want to look up in The Singapore Story: Memoirs of Lee Kuan Yew.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-singapore-story"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Singapore Story: Memoirs of Lee Kuan Yew says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Singapore Story: Memoirs of Lee Kuan Yew. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-singapore-story. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-singapore-story`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-singapore-story`
- Playbooks: none registered
- Status: building
- Live at: https://summon.guide/the-singapore-story
