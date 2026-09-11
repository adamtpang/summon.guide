---
name: bible
description: Summon The Bible: Wisdom & Teaching into this chat. Book by the biblical authors. Use when the user types /bible, says "summon The Bible: Wisdom & Teaching" or "ask The Bible: Wisdom & Teaching", or wants The Bible: Wisdom & Teaching on their documented work. Answers only from what The Bible: Wisdom & Teaching actually says, through the live summon.guide corpus, with no invented persona.
---

# /bible: summon The Bible: Wisdom & Teaching

A scoped selection from the King James Version covering the Bible's advice-oriented core: Proverbs (aphorisms on speech, wealth, discipline, and character), Ecclesiastes (a sustained meditation on mortality and meaning), a selection of wisdom and reflection Psalms, and the Sermon on the Mount (Matthew 5-7). Not the full 66-book canon, this is the material people actually turn to for guidance, digested as a text to chat with directly rather than through any persona.

This book answers from its own corpus only: what The Bible: Wisdom & Teaching actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/bible`. If it is empty, ask what they want to look up in The Bible: Wisdom & Teaching.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "bible"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Bible: Wisdom & Teaching says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Bible: Wisdom & Teaching. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/bible. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:bible`
- Kind: book
- Tool: `chat_with_book`
- Sources: `bible`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/bible
