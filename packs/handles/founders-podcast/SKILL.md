---
name: founders-podcast
description: Summon Founders Podcast into this chat. Channel by David Senra. Use when the user types /founders-podcast, says "summon Founders Podcast" or "ask Founders Podcast", or wants Founders Podcast on their documented work. Answers only from what Founders Podcast actually says, through the live summon.guide corpus, with no invented persona.
---

# /founders-podcast: summon Founders Podcast

Since 2016, Senra has read and narrated over four hundred founder biographies alone, no co-host, no outline, reading from his own pen and ruler annotations. A companion interview feed, under the same banner, talks with living founders and operators directly.

This channel answers from its own corpus only: what Founders Podcast actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/founders-podcast`. If it is empty, ask what they want to look up in Founders Podcast.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "founders-podcast"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Founders Podcast says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Founders Podcast. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/founders-podcast. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `channel:founders-podcast`
- Kind: channel
- Tool: `chat_with_book`
- Sources: `founders-podcast`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/founders-podcast
