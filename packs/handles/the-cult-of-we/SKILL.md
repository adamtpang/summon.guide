---
name: the-cult-of-we
description: Summon The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion into this chat. Book by Eliot Brown and Maureen Farrell. Use when the user types /the-cult-of-we, says "summon The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion" or "ask The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion", or wants The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion on s1-reality-check. Answers only from what The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-cult-of-we: summon The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion

The deeply reported Wall Street Journal account of the SoftBank dynamics, the S-1 disaster, and the six weeks between filing and ouster. The clearest source on what the public-market scrutiny actually exposed.

This book answers from its own corpus only: what The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-cult-of-we`. If it is empty, ask what they want to look up in The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-cult-of-we"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Cult of We: WeWork, Adam Neumann, and the Great Startup Delusion. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-cult-of-we. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-cult-of-we`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-cult-of-we`
- Playbooks: `/s1-reality-check`
- Status: building
- Live at: https://summon.guide/the-cult-of-we
