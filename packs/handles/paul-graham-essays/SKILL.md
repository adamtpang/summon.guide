---
name: paul-graham-essays
description: Summon Paul Graham: Selected Essays into this chat. Book by Paul Graham. Use when the user types /paul-graham-essays, says "summon Paul Graham: Selected Essays" or "ask Paul Graham: Selected Essays", or wants Paul Graham: Selected Essays on paul-graham, do-things-that-dont-scale, default-alive, maker-schedule, great-work-project. Answers only from what Paul Graham: Selected Essays actually says, through the live summon.guide corpus, with no invented persona.
---

# /paul-graham-essays: summon Paul Graham: Selected Essays

A growing synthesis of Paul Graham's official essay archive on startups, users, programming, writing, taste, ambition, and doing great work. The first source-backed slice covers six canonical essays; the private sync pipeline can backfill the rest without republishing his full text.

This book answers from its own corpus only: what Paul Graham: Selected Essays actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/paul-graham-essays`. If it is empty, ask what they want to look up in Paul Graham: Selected Essays.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "paul-graham-essays"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Paul Graham: Selected Essays says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Paul Graham: Selected Essays. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/paul-graham-essays. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:paul-graham-essays`
- Kind: book
- Tool: `chat_with_book`
- Sources: `paul-graham-essays`
- Playbooks: `/paul-graham`, `/do-things-that-dont-scale`, `/default-alive`, `/maker-schedule`, `/great-work-project`
- Status: ready
- Live at: https://summon.guide/paul-graham-essays
