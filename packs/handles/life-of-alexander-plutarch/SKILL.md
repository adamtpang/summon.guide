---
name: life-of-alexander-plutarch
description: Summon Life of Alexander into this chat. Book by Plutarch. Use when the user types /life-of-alexander-plutarch, says "summon Life of Alexander" or "ask Life of Alexander", or wants Life of Alexander on lead-from-front. Answers only from what Life of Alexander actually says, through the live summon.guide corpus, with no invented persona.
---

# /life-of-alexander-plutarch: summon Life of Alexander

Roman-era biography written ~AD 100. Source for the taming of Bucephalus, the helmet of water in the Gedrosian Desert, and Alexander's character.

This book answers from its own corpus only: what Life of Alexander actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/life-of-alexander-plutarch`. If it is empty, ask what they want to look up in Life of Alexander.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "life-of-alexander-plutarch"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Life of Alexander says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Life of Alexander. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/life-of-alexander-plutarch. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:life-of-alexander-plutarch`
- Kind: book
- Tool: `chat_with_book`
- Sources: `life-of-alexander-plutarch`
- Playbooks: `/lead-from-front`
- Status: ready
- Live at: https://summon.guide/life-of-alexander-plutarch
