---
name: meditations
description: Summon Meditations into this chat. Book by Marcus Aurelius. Use when the user types /meditations, says "summon Meditations" or "ask Meditations", or wants Meditations on dichotomy-of-control, view-from-above, memento-mori. Answers only from what Meditations actually says, through the live summon.guide corpus, with no invented persona.
---

# /meditations: summon Meditations

Twelve books of private notes written in Greek on the northern frontier, never meant for publication. The most enduring practical-philosophy text ever written: the dichotomy of control, the view from above, memento mori, and the obstacle becoming the way. Public domain.

This book answers from its own corpus only: what Meditations actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/meditations`. If it is empty, ask what they want to look up in Meditations.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "meditations"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Meditations says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Meditations. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/meditations. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:meditations`
- Kind: book
- Tool: `chat_with_book`
- Sources: `meditations`
- Playbooks: `/dichotomy-of-control`, `/view-from-above`, `/memento-mori`
- Status: ready
- Live at: https://summon.guide/meditations
