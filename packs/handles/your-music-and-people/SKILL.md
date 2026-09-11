---
name: your-music-and-people
description: Summon Your Music and People into this chat. Book by Derek Sivers. Use when the user types /your-music-and-people, says "summon Your Music and People" or "ask Your Music and People", or wants Your Music and People on their documented work. Answers only from what Your Music and People actually says, through the live summon.guide corpus, with no invented persona.
---

# /your-music-and-people: summon Your Music and People

Marketing and reputation lessons drawn from CD Baby, reframed for any creator: marketing as an extension of the art itself, being considerate as a form of being memorable, and proudly excluding most people to matter more to the few.

This book answers from its own corpus only: what Your Music and People actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/your-music-and-people`. If it is empty, ask what they want to look up in Your Music and People.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "your-music-and-people"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Your Music and People says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Your Music and People. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/your-music-and-people. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:your-music-and-people`
- Kind: book
- Tool: `chat_with_book`
- Sources: `your-music-and-people`
- Playbooks: none registered
- Status: building
- Live at: https://summon.guide/your-music-and-people
