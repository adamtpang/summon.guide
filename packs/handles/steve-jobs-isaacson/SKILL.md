---
name: steve-jobs-isaacson
description: Summon Steve Jobs into this chat. Book by Walter Isaacson. Use when the user types /steve-jobs-isaacson, says "summon Steve Jobs" or "ask Steve Jobs", or wants Steve Jobs on their documented work. Answers only from what Steve Jobs actually says, through the live summon.guide corpus, with no invented persona.
---

# /steve-jobs-isaacson: summon Steve Jobs

Isaacson's authorized biography, based on more than forty interviews with Jobs over two years plus interviews with over a hundred family members, friends, adversaries, and colleagues. The definitive account of the garage founding, the 1985 ouster, the NeXT and Pixar wilderness years, the 1997 return and turnaround, and the product decisions behind the iMac, iPod, iPhone, and iPad, in Jobs's own words as well as those who worked with him.

This book answers from its own corpus only: what Steve Jobs actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/steve-jobs-isaacson`. If it is empty, ask what they want to look up in Steve Jobs.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "steve-jobs-isaacson"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Steve Jobs says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Steve Jobs. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/steve-jobs-isaacson. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:steve-jobs-isaacson`
- Kind: book
- Tool: `chat_with_book`
- Sources: `steve-jobs-isaacson`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/steve-jobs-isaacson
