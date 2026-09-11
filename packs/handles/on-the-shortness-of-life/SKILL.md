---
name: on-the-shortness-of-life
description: Summon On the Shortness of Life (De Brevitate Vitae) into this chat. Book by Seneca. Use when the user types /on-the-shortness-of-life, says "summon On the Shortness of Life (De Brevitate Vitae)" or "ask On the Shortness of Life (De Brevitate Vitae)", or wants On the Shortness of Life (De Brevitate Vitae) on on-the-shortness-of-life. Answers only from what On the Shortness of Life (De Brevitate Vitae) actually says, through the live summon.guide corpus, with no invented persona.
---

# /on-the-shortness-of-life: summon On the Shortness of Life (De Brevitate Vitae)

A short essay addressed to Seneca's friend Paulinus on the use of time. The core argument: life is long enough if well invested; we make it short by selling it cheaply, hour by hour, to projects we have not chosen.

This book answers from its own corpus only: what On the Shortness of Life (De Brevitate Vitae) actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/on-the-shortness-of-life`. If it is empty, ask what they want to look up in On the Shortness of Life (De Brevitate Vitae).
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "on-the-shortness-of-life"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what On the Shortness of Life (De Brevitate Vitae) says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of On the Shortness of Life (De Brevitate Vitae). If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/on-the-shortness-of-life. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:on-the-shortness-of-life`
- Kind: book
- Tool: `chat_with_book`
- Sources: `on-the-shortness-of-life`
- Playbooks: `/on-the-shortness-of-life`
- Status: building
- Live at: https://summon.guide/on-the-shortness-of-life
