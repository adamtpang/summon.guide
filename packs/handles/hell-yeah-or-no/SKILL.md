---
name: hell-yeah-or-no
description: Summon Hell Yeah or No into this chat. Book by Derek Sivers. Use when the user types /hell-yeah-or-no, says "summon Hell Yeah or No" or "ask Hell Yeah or No", or wants Hell Yeah or No on their documented work. Answers only from what Hell Yeah or No actually says, through the live summon.guide corpus, with no invented persona.
---

# /hell-yeah-or-no: summon Hell Yeah or No

The expansion of a 2009 essay into a full decision filter: if it is not a hell yeah, it is a no. Argues most overcommitment comes from saying yes to too many medium options out of fear rather than genuine desire.

This book answers from its own corpus only: what Hell Yeah or No actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/hell-yeah-or-no`. If it is empty, ask what they want to look up in Hell Yeah or No.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "hell-yeah-or-no"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Hell Yeah or No says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Hell Yeah or No. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/hell-yeah-or-no. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:hell-yeah-or-no`
- Kind: book
- Tool: `chat_with_book`
- Sources: `hell-yeah-or-no`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/hell-yeah-or-no
