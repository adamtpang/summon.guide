---
name: on-anger
description: Summon On Anger (De Ira) into this chat. Book by Seneca. Use when the user types /on-anger, says "summon On Anger (De Ira)" or "ask On Anger (De Ira)", or wants On Anger (De Ira) on on-anger. Answers only from what On Anger (De Ira) actually says, through the live summon.guide corpus, with no invented persona.
---

# /on-anger: summon On Anger (De Ira)

Three books on anger as a vice: its physiology, its destructiveness, and the practical techniques for not being governed by it. The clearest pre-modern account of what to do between the trigger and the response.

This book answers from its own corpus only: what On Anger (De Ira) actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/on-anger`. If it is empty, ask what they want to look up in On Anger (De Ira).
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "on-anger"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what On Anger (De Ira) says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of On Anger (De Ira). If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/on-anger. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:on-anger`
- Kind: book
- Tool: `chat_with_book`
- Sources: `on-anger`
- Playbooks: `/on-anger`
- Status: building
- Live at: https://summon.guide/on-anger
