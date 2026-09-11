---
name: deep-work
description: Summon Deep Work into this chat. Book by Cal Newport. Use when the user types /deep-work, says "summon Deep Work" or "ask Deep Work", or wants Deep Work on their documented work. Answers only from what Deep Work actually says, through the live summon.guide corpus, with no invented persona.
---

# /deep-work: summon Deep Work

A case for distraction free, cognitively demanding work as an increasingly rare and valuable skill, distinguishing deep work from shallow, logistical busywork and laying out rules for cultivating it in a fragmented attention economy.

This book answers from its own corpus only: what Deep Work actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/deep-work`. If it is empty, ask what they want to look up in Deep Work.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "deep-work"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Deep Work says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Deep Work. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/deep-work. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:deep-work`
- Kind: book
- Tool: `chat_with_book`
- Sources: `deep-work`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/deep-work
