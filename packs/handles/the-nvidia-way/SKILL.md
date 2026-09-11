---
name: the-nvidia-way
description: Summon The Nvidia Way into this chat. Book by Tae Kim. Use when the user types /the-nvidia-way, says "summon The Nvidia Way" or "ask The Nvidia Way", or wants The Nvidia Way on their documented work. Answers only from what The Nvidia Way actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-nvidia-way: summon The Nvidia Way

The first full account of Nvidia's thirty-year history, built on more than one hundred interviews including Jensen Huang himself. Traces the Denny's founding with cofounders Curtis Priem and Chris Malachowsky, three separate near-death experiences (the NV1, the RIVA production crisis, the NV30), the coining of the term GPU, the two-decade CUDA bet, and the culture of 'Speed of Light' standards and public criticism that Kim calls the Nvidia Way.

This book answers from its own corpus only: what The Nvidia Way actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-nvidia-way`. If it is empty, ask what they want to look up in The Nvidia Way.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-nvidia-way"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Nvidia Way says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Nvidia Way. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-nvidia-way. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-nvidia-way`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-nvidia-way`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/the-nvidia-way
