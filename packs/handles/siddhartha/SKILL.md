---
name: siddhartha
description: Summon Siddhartha into this chat. Book by Hermann Hesse. Use when the user types /siddhartha, says "summon Siddhartha" or "ask Siddhartha", or wants Siddhartha on their documented work. Answers only from what Siddhartha actually says, through the live summon.guide corpus, with no invented persona.
---

# /siddhartha: summon Siddhartha

A Brahman's son leaves everything arranged for him, tries asceticism, meets the Buddha and refuses to follow him, falls into wealth and self-disgust, and finally learns to listen to a river. Its argument is that wisdom cannot be transmitted, only arrived at, and that the ruin on the way was not a detour.

This book answers from its own corpus only: what Siddhartha actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/siddhartha`. If it is empty, ask what they want to look up in Siddhartha.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "siddhartha"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Siddhartha says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Siddhartha. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/siddhartha. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:siddhartha`
- Kind: book
- Tool: `chat_with_book`
- Sources: `siddhartha`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/siddhartha
