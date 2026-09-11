---
name: thinking-in-bets
description: Summon Thinking in Bets into this chat. Book by Annie Duke. Use when the user types /thinking-in-bets, says "summon Thinking in Bets" or "ask Thinking in Bets", or wants Thinking in Bets on their documented work. Answers only from what Thinking in Bets actually says, through the live summon.guide corpus, with no invented persona.
---

# /thinking-in-bets: summon Thinking in Bets

A former professional poker player's case for thinking in probabilities rather than certainties, naming 'resulting', the error of judging a decision's quality by its outcome, and arguing life is more like poker than chess.

This book answers from its own corpus only: what Thinking in Bets actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/thinking-in-bets`. If it is empty, ask what they want to look up in Thinking in Bets.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "thinking-in-bets"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Thinking in Bets says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Thinking in Bets. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/thinking-in-bets. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:thinking-in-bets`
- Kind: book
- Tool: `chat_with_book`
- Sources: `thinking-in-bets`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/thinking-in-bets
