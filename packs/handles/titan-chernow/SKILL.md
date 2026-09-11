---
name: titan-chernow
description: Summon Titan: The Life of John D. Rockefeller, Sr. into this chat. Book by Ron Chernow. Use when the user types /titan-chernow, says "summon Titan: The Life of John D. Rockefeller, Sr." or "ask Titan: The Life of John D. Rockefeller, Sr.", or wants Titan: The Life of John D. Rockefeller, Sr. on ledger, crisis. Answers only from what Titan: The Life of John D. Rockefeller, Sr. actually says, through the live summon.guide corpus, with no invented persona.
---

# /titan-chernow: summon Titan: The Life of John D. Rockefeller, Sr.

The definitive 800-page biography. The source of every framework we attribute to Rockefeller: Ledger A, the Cleveland Massacre, the dimes, the systematic philanthropy.

This book answers from its own corpus only: what Titan: The Life of John D. Rockefeller, Sr. actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/titan-chernow`. If it is empty, ask what they want to look up in Titan: The Life of John D. Rockefeller, Sr..
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "titan-chernow"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Titan: The Life of John D. Rockefeller, Sr. says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Titan: The Life of John D. Rockefeller, Sr.. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/titan-chernow. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:titan-chernow`
- Kind: book
- Tool: `chat_with_book`
- Sources: `titan-chernow`
- Playbooks: `/ledger`, `/crisis`
- Status: ready
- Live at: https://summon.guide/titan-chernow
