---
name: its-time-to-build
description: Summon It's Time to Build into this chat. Book by Marc Andreessen. Use when the user types /its-time-to-build, says "summon It's Time to Build" or "ask It's Time to Build", or wants It's Time to Build on its-time-to-build. Answers only from what It's Time to Build actually says, through the live summon.guide corpus, with no invented persona.
---

# /its-time-to-build: summon It's Time to Build

The April 2020 essay written in the early weeks of the pandemic. A direct argument that Western institutions had stopped building, and that the right response to any problem is to ask “what do we build to fix it, and what is stopping the build?”

This book answers from its own corpus only: what It's Time to Build actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/its-time-to-build`. If it is empty, ask what they want to look up in It's Time to Build.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "its-time-to-build"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what It's Time to Build says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of It's Time to Build. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/its-time-to-build. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:its-time-to-build`
- Kind: book
- Tool: `chat_with_book`
- Sources: `its-time-to-build`
- Playbooks: `/its-time-to-build`
- Status: ready
- Live at: https://summon.guide/its-time-to-build
