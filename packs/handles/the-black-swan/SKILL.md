---
name: the-black-swan
description: Summon The Black Swan into this chat. Book by Nassim Nicholas Taleb. Use when the user types /the-black-swan, says "summon The Black Swan" or "ask The Black Swan", or wants The Black Swan on black-swan-triplet-test, mediocristan-extremistan-map, turkey-problem, narrative-fallacy-guard, silent-evidence-audit, ludic-fallacy-check, fourth-quadrant-map. Answers only from what The Black Swan actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-black-swan: summon The Black Swan

Rare, high-impact, retrospectively-rationalized events, and why forecasting and expert prediction routinely miss them. The book that made Taleb's name.

This book answers from its own corpus only: what The Black Swan actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-black-swan`. If it is empty, ask what they want to look up in The Black Swan.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-black-swan"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Black Swan says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Black Swan. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-black-swan. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-black-swan`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-black-swan`
- Playbooks: `/black-swan-triplet-test`, `/mediocristan-extremistan-map`, `/turkey-problem`, `/narrative-fallacy-guard`, `/silent-evidence-audit`, `/ludic-fallacy-check`, `/fourth-quadrant-map`
- Status: ready
- Live at: https://summon.guide/the-black-swan
