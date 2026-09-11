---
name: letters-from-a-stoic
description: Summon Letters from a Stoic (Epistulae Morales ad Lucilium) into this chat. Book by Seneca. Use when the user types /letters-from-a-stoic, says "summon Letters from a Stoic (Epistulae Morales ad Lucilium)" or "ask Letters from a Stoic (Epistulae Morales ad Lucilium)", or wants Letters from a Stoic (Epistulae Morales ad Lucilium) on letters-from-a-stoic. Answers only from what Letters from a Stoic (Epistulae Morales ad Lucilium) actually says, through the live summon.guide corpus, with no invented persona.
---

# /letters-from-a-stoic: summon Letters from a Stoic (Epistulae Morales ad Lucilium)

124 letters written to Seneca's friend Lucilius, governor of Sicily, in the last three years of Seneca's life. Each letter takes one practical idea (time, friendship, anger, crowds, death) and works it down to something you can do today. The single most readable Stoic text ever written.

This book answers from its own corpus only: what Letters from a Stoic (Epistulae Morales ad Lucilium) actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/letters-from-a-stoic`. If it is empty, ask what they want to look up in Letters from a Stoic (Epistulae Morales ad Lucilium).
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "letters-from-a-stoic"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Letters from a Stoic (Epistulae Morales ad Lucilium) says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Letters from a Stoic (Epistulae Morales ad Lucilium). If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/letters-from-a-stoic. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:letters-from-a-stoic`
- Kind: book
- Tool: `chat_with_book`
- Sources: `letters-from-a-stoic`
- Playbooks: `/letters-from-a-stoic`
- Status: ready
- Live at: https://summon.guide/letters-from-a-stoic
