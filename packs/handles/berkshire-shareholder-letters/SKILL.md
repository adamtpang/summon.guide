---
name: berkshire-shareholder-letters
description: Summon Berkshire Hathaway Shareholder Letters, 1977-2024 into this chat. Book by Warren E. Buffett. Use when the user types /berkshire-shareholder-letters, says "summon Berkshire Hathaway Shareholder Letters, 1977-2024" or "ask Berkshire Hathaway Shareholder Letters, 1977-2024", or wants Berkshire Hathaway Shareholder Letters, 1977-2024 on warren-buffett, owner-earnings, circle-of-competence, retained-earnings-test, financial-fortress, acquisition-filter. Answers only from what Berkshire Hathaway Shareholder Letters, 1977-2024 actually says, through the live summon.guide corpus, with no invented persona.
---

# /berkshire-shareholder-letters: summon Berkshire Hathaway Shareholder Letters, 1977-2024

The official Berkshire Hathaway archive of Warren Buffett's annual shareholder letters, 1977 through 2024: primary-source lessons in owner economics, capital allocation, business quality, management, risk, mistakes, and compounding. This corpus is a curated selection of the most substantive letters (34 of the ~48 years), not every single year digested in full.

This book answers from its own corpus only: what Berkshire Hathaway Shareholder Letters, 1977-2024 actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/berkshire-shareholder-letters`. If it is empty, ask what they want to look up in Berkshire Hathaway Shareholder Letters, 1977-2024.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "berkshire-shareholder-letters"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Berkshire Hathaway Shareholder Letters, 1977-2024 says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Berkshire Hathaway Shareholder Letters, 1977-2024. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/berkshire-shareholder-letters. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:berkshire-shareholder-letters`
- Kind: book
- Tool: `chat_with_book`
- Sources: `berkshire-shareholder-letters`
- Playbooks: `/warren-buffett`, `/owner-earnings`, `/circle-of-competence`, `/retained-earnings-test`, `/financial-fortress`, `/acquisition-filter`
- Status: ready
- Live at: https://summon.guide/berkshire-shareholder-letters
