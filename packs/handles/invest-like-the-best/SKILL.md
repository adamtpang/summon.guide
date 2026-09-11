---
name: invest-like-the-best
description: Summon Invest Like the Best into this chat. Channel by Patrick O'Shaughnessy. Use when the user types /invest-like-the-best, says "summon Invest Like the Best" or "ask Invest Like the Best", or wants Invest Like the Best on their documented work. Answers only from what Invest Like the Best actually says, through the live summon.guide corpus, with no invented persona.
---

# /invest-like-the-best: summon Invest Like the Best

Patrick O'Shaughnessy's long-form interview show with investors, operators, and founders: specific capital-allocation decisions, real deal mechanics, and named theses rather than generic market commentary. This corpus is a curated selection of 28 of the show's highest-signal episodes out of roughly 64 long-form interviews, digested as a text to chat with directly rather than through any single persona.

This channel answers from its own corpus only: what Invest Like the Best actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/invest-like-the-best`. If it is empty, ask what they want to look up in Invest Like the Best.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "invest-like-the-best"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Invest Like the Best says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Invest Like the Best. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/invest-like-the-best. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `channel:invest-like-the-best`
- Kind: channel
- Tool: `chat_with_book`
- Sources: `invest-like-the-best`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/invest-like-the-best
