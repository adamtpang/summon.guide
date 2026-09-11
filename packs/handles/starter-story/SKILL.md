---
name: starter-story
description: Summon Starter Story into this chat. Channel by Pat Walls. Use when the user types /starter-story, says "summon Starter Story" or "ask Starter Story", or wants Starter Story on their documented work. Answers only from what Starter Story actually says, through the live summon.guide corpus, with no invented persona.
---

# /starter-story: summon Starter Story

Pat Walls's YouTube show interviewing founders about exactly how they built a specific business: real revenue numbers, real customer-acquisition tactics, real pricing and unit economics, not generic advice. This corpus is a curated selection of 28 of the channel's highest-signal episodes out of roughly 170 long-form interviews, weighted toward substantive case studies over thin clip-show entries, digested as a text to chat with directly rather than through any single persona.

This channel answers from its own corpus only: what Starter Story actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/starter-story`. If it is empty, ask what they want to look up in Starter Story.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "starter-story"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Starter Story says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Starter Story. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/starter-story. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `channel:starter-story`
- Kind: channel
- Tool: `chat_with_book`
- Sources: `starter-story`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/starter-story
