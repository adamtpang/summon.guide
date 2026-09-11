---
name: how-to-live
description: Summon How to Live into this chat. Book by Derek Sivers. Use when the user types /how-to-live, says "summon How to Live" or "ask How to Live", or wants How to Live on their documented work. Answers only from what How to Live actually says, through the live summon.guide corpus, with no invented persona.
---

# /how-to-live: summon How to Live

Twenty seven short chapters, each fully convinced of a different and often contradictory way to live. Independence and commitment, mastery and always staying a beginner, are each argued completely on their own terms rather than resolved into one rule.

This book answers from its own corpus only: what How to Live actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/how-to-live`. If it is empty, ask what they want to look up in How to Live.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "how-to-live"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what How to Live says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of How to Live. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/how-to-live. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:how-to-live`
- Kind: book
- Tool: `chat_with_book`
- Sources: `how-to-live`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/how-to-live
