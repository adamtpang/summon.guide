---
name: skin-in-the-game
description: Summon Skin in the Game into this chat. Book by Nassim Nicholas Taleb. Use when the user types /skin-in-the-game, says "summon Skin in the Game" or "ask Skin in the Game", or wants Skin in the Game on portfolio-not-opinion, minority-rule, intellectual-yet-idiot, skin-of-others-audit, green-lumber-test, merchandising-of-virtue. Answers only from what Skin in the Game actually says, through the live summon.guide corpus, with no invented persona.
---

# /skin-in-the-game: summon Skin in the Game

Hidden asymmetries in daily life: who bears the downside of a decision, why symmetry of risk is the precondition for trust, and how removing skin in the game corrupts a system.

This book answers from its own corpus only: what Skin in the Game actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/skin-in-the-game`. If it is empty, ask what they want to look up in Skin in the Game.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "skin-in-the-game"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what Skin in the Game says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of Skin in the Game. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/skin-in-the-game. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:skin-in-the-game`
- Kind: book
- Tool: `chat_with_book`
- Sources: `skin-in-the-game`
- Playbooks: `/portfolio-not-opinion`, `/minority-rule`, `/intellectual-yet-idiot`, `/skin-of-others-audit`, `/green-lumber-test`, `/merchandising-of-virtue`
- Status: ready
- Live at: https://summon.guide/skin-in-the-game
