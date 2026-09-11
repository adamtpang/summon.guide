---
name: the-book-of-elon
description: Summon The Book of Elon into this chat. Book by Eric Jorgenson. Use when the user types /the-book-of-elon, says "summon The Book of Elon" or "ask The Book of Elon", or wants The Book of Elon on their documented work. Answers only from what The Book of Elon actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-book-of-elon: summon The Book of Elon

Jorgenson's anthology of Musk's own words: interviews, transcripts, talks. Same compiler as The Almanack of Naval Ravikant. Pending ingestion: drop the PDF in sources/elon/the-book-of-elon.pdf and we'll extract a fresh set of skills.

This book answers from its own corpus only: what The Book of Elon actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-book-of-elon`. If it is empty, ask what they want to look up in The Book of Elon.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-book-of-elon"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Book of Elon says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Book of Elon. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-book-of-elon. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-book-of-elon`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-book-of-elon`
- Playbooks: none registered
- Status: building
- Live at: https://summon.guide/the-book-of-elon
