---
name: billion-dollar-loser
description: Summon Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork into this chat. Book by Reeves Wiedeman. Use when the user types /billion-dollar-loser, says "summon Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork" or "ask Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork", or wants Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork on mission-as-moat, narrative-arbitrage. Answers only from what Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork actually says, through the live summon.guide corpus, with no invented persona.
---

# /billion-dollar-loser: summon Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork

The first major book on WeWork, by a New York magazine writer who had been reporting on the company throughout the run. Best on the mission-as-moat technique, the cultural details of the WeWork floor, and how the narrative compressed the early rounds.

This book answers from its own corpus only: what Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/billion-dollar-loser`. If it is empty, ask what they want to look up in Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "billion-dollar-loser"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Billion Dollar Loser: The Epic Rise and Spectacular Fall of Adam Neumann and WeWork. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/billion-dollar-loser. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:billion-dollar-loser`
- Kind: book
- Tool: `chat_with_book`
- Sources: `billion-dollar-loser`
- Playbooks: `/mission-as-moat`, `/narrative-arbitrage`
- Status: building
- Live at: https://summon.guide/billion-dollar-loser
