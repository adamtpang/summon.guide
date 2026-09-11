---
name: tools-of-titans
description: Summon Tools of Titans into this chat. Book by Timothy Ferriss. Use when the user types /tools-of-titans, says "summon Tools of Titans" or "ask Tools of Titans", or wants Tools of Titans on their documented work. Answers only from what Tools of Titans actually says, through the live summon.guide corpus, with no invented persona.
---

# /tools-of-titans: summon Tools of Titans

A distilled playbook of the tactics, routines, and habits of hundreds of world class performers interviewed on The Tim Ferriss Show, organized around health, wealth, and wisdom.

This book answers from its own corpus only: what Tools of Titans actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/tools-of-titans`. If it is empty, ask what they want to look up in Tools of Titans.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "tools-of-titans"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Tools of Titans says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Tools of Titans. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/tools-of-titans. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:tools-of-titans`
- Kind: book
- Tool: `chat_with_book`
- Sources: `tools-of-titans`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/tools-of-titans
