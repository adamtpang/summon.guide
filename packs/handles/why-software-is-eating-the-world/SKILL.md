---
name: why-software-is-eating-the-world
description: Summon Why Software Is Eating the World into this chat. Book by Marc Andreessen. Use when the user types /why-software-is-eating-the-world, says "summon Why Software Is Eating the World" or "ask Why Software Is Eating the World", or wants Why Software Is Eating the World on software-eats-the-world. Answers only from what Why Software Is Eating the World actually says, through the live summon.guide corpus, with no invented persona.
---

# /why-software-is-eating-the-world: summon Why Software Is Eating the World

The 2011 Wall Street Journal essay that named the era. The argument that software companies were poised to take over industry after industry, framed years before it was conventional wisdom.

This book answers from its own corpus only: what Why Software Is Eating the World actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/why-software-is-eating-the-world`. If it is empty, ask what they want to look up in Why Software Is Eating the World.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "why-software-is-eating-the-world"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Why Software Is Eating the World says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Why Software Is Eating the World. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/why-software-is-eating-the-world. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:why-software-is-eating-the-world`
- Kind: book
- Tool: `chat_with_book`
- Sources: `why-software-is-eating-the-world`
- Playbooks: `/software-eats-the-world`
- Status: ready
- Live at: https://summon.guide/why-software-is-eating-the-world
