---
name: zero-to-one
description: Summon Zero to One: Notes on Startups, or How to Build the Future into this chat. Book by Peter Thiel with Blake Masters. Use when the user types /zero-to-one, says "summon Zero to One: Notes on Startups, or How to Build the Future" or "ask Zero to One: Notes on Startups, or How to Build the Future", or wants Zero to One: Notes on Startups, or How to Build the Future on their documented work. Answers only from what Zero to One: Notes on Startups, or How to Build the Future actually says, through the live summon.guide corpus, with no invented persona.
---

# /zero-to-one: summon Zero to One: Notes on Startups, or How to Build the Future

Thiel's own primer on startups, expanded from a 2012 Stanford class Blake Masters took notes on. Argues that competition destroys profits and every valuable company is some kind of monopoly; lays out the definite-optimist 2x2 for thinking about the future, the power law that governs venture returns, the 'Thiel's law' foundations every founder gets one shot at, why distribution is as important as product, and the seven questions every business must answer, illustrated by the cleantech bubble and Tesla's escape from it.

This book answers from its own corpus only: what Zero to One: Notes on Startups, or How to Build the Future actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/zero-to-one`. If it is empty, ask what they want to look up in Zero to One: Notes on Startups, or How to Build the Future.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "zero-to-one"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Zero to One: Notes on Startups, or How to Build the Future says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Zero to One: Notes on Startups, or How to Build the Future. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/zero-to-one. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:zero-to-one`
- Kind: book
- Tool: `chat_with_book`
- Sources: `zero-to-one`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/zero-to-one
