---
name: pendleton-ward-selected-interviews
description: Summon Pendleton Ward: Selected Public Interviews into this chat. Book by Pendleton Ward, interviewed by Max Eddy, GeekDad, and Rollin Bishop. Use when the user types /pendleton-ward-selected-interviews, says "summon Pendleton Ward: Selected Public Interviews" or "ask Pendleton Ward: Selected Public Interviews", or wants Pendleton Ward: Selected Public Interviews on creative-play, practice-kindness. Answers only from what Pendleton Ward: Selected Public Interviews actually says, through the live summon.guide corpus, with no invented persona.
---

# /pendleton-ward-selected-interviews: summon Pendleton Ward: Selected Public Interviews

Summon reading list of three interviews from 2012 and 2020. Selected evidence is summarized in the guide prompt; this is not a published book or a complete transcript corpus.

This book answers from its own corpus only: what Pendleton Ward: Selected Public Interviews actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/pendleton-ward-selected-interviews`. If it is empty, ask what they want to look up in Pendleton Ward: Selected Public Interviews.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "pendleton-ward-selected-interviews"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Pendleton Ward: Selected Public Interviews says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Pendleton Ward: Selected Public Interviews. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/pendleton-ward-selected-interviews. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:pendleton-ward-selected-interviews`
- Kind: book
- Tool: `chat_with_book`
- Sources: `pendleton-ward-selected-interviews`
- Playbooks: `/creative-play`, `/practice-kindness`
- Status: building
- Live at: https://summon.guide/pendleton-ward-selected-interviews
