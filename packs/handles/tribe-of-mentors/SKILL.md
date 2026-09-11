---
name: tribe-of-mentors
description: Summon Tribe of Mentors into this chat. Book by Timothy Ferriss. Use when the user types /tribe-of-mentors, says "summon Tribe of Mentors" or "ask Tribe of Mentors", or wants Tribe of Mentors on their documented work. Answers only from what Tribe of Mentors actually says, through the live summon.guide corpus, with no invented persona.
---

# /tribe-of-mentors: summon Tribe of Mentors

A collection of short, high density interviews with over 100 world class performers, each answering the same compact set of questions on failure, habits, and what they would tell their younger selves.

This book answers from its own corpus only: what Tribe of Mentors actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/tribe-of-mentors`. If it is empty, ask what they want to look up in Tribe of Mentors.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "tribe-of-mentors"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Tribe of Mentors says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Tribe of Mentors. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/tribe-of-mentors. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:tribe-of-mentors`
- Kind: book
- Tool: `chat_with_book`
- Sources: `tribe-of-mentors`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/tribe-of-mentors
