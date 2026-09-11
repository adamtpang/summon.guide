---
name: tao-te-ching
description: Summon Tao Te Ching into this chat. Book by Laozi. Use when the user types /tao-te-ching, says "summon Tao Te Ching" or "ask Tao Te Ching", or wants Tao Te Ching on their documented work. Answers only from what Tao Te Ching actually says, through the live summon.guide corpus, with no invented persona.
---

# /tao-te-ching: summon Tao Te Ching

Eighty-one short chapters traditionally split into the Tao Ching and the Teh Ching, teaching government and self-cultivation by yielding, emptiness, and non-action (wu wei). This is James Legge's 1891 scholarly translation, the widely cited public-domain edition. Authorship is traditionally credited to Lao Tzu, a semi-legendary figure with no settled historical record, so this source is registered as a text to chat with directly, not a guide.

This book answers from its own corpus only: what Tao Te Ching actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/tao-te-ching`. If it is empty, ask what they want to look up in Tao Te Ching.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "tao-te-ching"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Tao Te Ching says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Tao Te Ching. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/tao-te-ching. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:tao-te-ching`
- Kind: book
- Tool: `chat_with_book`
- Sources: `tao-te-ching`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/tao-te-ching
