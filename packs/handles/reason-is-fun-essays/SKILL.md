---
name: reason-is-fun-essays
description: Summon Reason Is Fun: Selected Essays into this chat. Book by Lulie Tanett. Use when the user types /reason-is-fun-essays, says "summon Reason Is Fun: Selected Essays" or "ask Reason Is Fun: Selected Essays", or wants Reason Is Fun: Selected Essays on their documented work. Answers only from what Reason Is Fun: Selected Essays actually says, through the live summon.guide corpus, with no invented persona.
---

# /reason-is-fun-essays: summon Reason Is Fun: Selected Essays

A curated set of essays from Lulie Tanett's blog, lulie.co.uk, working in the Popper/Deutsch tradition of fallibilist epistemology applied to personal life: why discipline is usually internal conflict, why coercion (including self-coercion) can't manufacture new thoughts, how knowledge actually grows, and her open research questions.

This book answers from its own corpus only: what Reason Is Fun: Selected Essays actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/reason-is-fun-essays`. If it is empty, ask what they want to look up in Reason Is Fun: Selected Essays.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "reason-is-fun-essays"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Reason Is Fun: Selected Essays says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Reason Is Fun: Selected Essays. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/reason-is-fun-essays. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:reason-is-fun-essays`
- Kind: book
- Tool: `chat_with_book`
- Sources: `reason-is-fun-essays`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/reason-is-fun-essays
