---
name: the-pathless-path
description: Summon The Pathless Path into this chat. Book by Paul Millerd. Use when the user types /the-pathless-path, says "summon The Pathless Path" or "ask The Pathless Path", or wants The Pathless Path on their documented work. Answers only from what The Pathless Path actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-pathless-path: summon The Pathless Path

A former strategy consultant's argument against the default script of school, career ladder, and retirement, drawn from his own extended, unstructured period he calls the void, and a case for building identity from more than a job title.

This book answers from its own corpus only: what The Pathless Path actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-pathless-path`. If it is empty, ask what they want to look up in The Pathless Path.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-pathless-path"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Pathless Path says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Pathless Path. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-pathless-path. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-pathless-path`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-pathless-path`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/the-pathless-path
