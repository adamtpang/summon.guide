---
name: elon-musk-vance
description: Summon Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future into this chat. Book by Ashlee Vance. Use when the user types /elon-musk-vance, says "summon Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future" or "ask Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future", or wants Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future on their documented work. Answers only from what Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future actually says, through the live summon.guide corpus, with no invented persona.
---

# /elon-musk-vance: summon Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future

The earlier biography. Best on Musk's South African childhood, Zip2, PayPal, and the SpaceX startup years before Falcon 1 reached orbit.

This book answers from its own corpus only: what Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/elon-musk-vance`. If it is empty, ask what they want to look up in Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "elon-musk-vance"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/elon-musk-vance. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:elon-musk-vance`
- Kind: book
- Tool: `chat_with_book`
- Sources: `elon-musk-vance`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/elon-musk-vance
