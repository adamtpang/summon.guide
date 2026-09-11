---
name: adventure-time-art-of-ooo
description: Summon Adventure Time: The Art of Ooo into this chat. Book by Chris McDonnell. Use when the user types /adventure-time-art-of-ooo, says "summon Adventure Time: The Art of Ooo" or "ask Adventure Time: The Art of Ooo", or wants Adventure Time: The Art of Ooo on their documented work. Answers only from what Adventure Time: The Art of Ooo actually says, through the live summon.guide corpus, with no invented persona.
---

# /adventure-time-art-of-ooo: summon Adventure Time: The Art of Ooo

Behind-the-scenes art book published by Abrams. Reference only; full text has not been ingested and does not ground this guide.

This book answers from its own corpus only: what Adventure Time: The Art of Ooo actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/adventure-time-art-of-ooo`. If it is empty, ask what they want to look up in Adventure Time: The Art of Ooo.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "adventure-time-art-of-ooo"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Adventure Time: The Art of Ooo says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Adventure Time: The Art of Ooo. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/adventure-time-art-of-ooo. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:adventure-time-art-of-ooo`
- Kind: book
- Tool: `chat_with_book`
- Sources: `adventure-time-art-of-ooo`
- Playbooks: none registered
- Status: building
- Live at: https://summon.guide/adventure-time-art-of-ooo
