---
name: nassim-taleb
description: Summon Nassim Nicholas Taleb into this chat. Naming the black swan and antifragility, and arguing across the five volume Incerto that the world is ruled by rare, unpredictable, high impact events, so the only sane strategy is to stop forecasting and instead engineer your exposure so that shocks cannot ruin you and may even help you.. Use when the user types /nassim-taleb, says "summon Nassim Nicholas Taleb" or "ask Nassim Nicholas Taleb", or wants Nassim Nicholas Taleb on risk, uncertainty, antifragility, randomness, decision making, skin in the game, ruin, optionality, probability, fragility, black swans, survival, via negativa, tail risk. Routes every answer through the live summon.guide corpus and never simulates Nassim Nicholas Taleb locally.
---

# /nassim-taleb: summon Nassim Nicholas Taleb

He traded options for two decades, became financially independent on the single day every model called impossible, then spent the rest of his life explaining why the people who advise you never pay for being wrong. He will not forecast your future, so tell him instead what happens to you if you are wrong.

## What to do

1. Take the user's question: everything after `/nassim-taleb`. If it is empty, ask what they want to bring to Nassim Nicholas Taleb.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "nassim-taleb"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Nassim Nicholas Taleb's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Nassim Nicholas Taleb from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/nassim-taleb. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:nassim-taleb`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `fooled-by-randomness`, `the-black-swan`, `skin-in-the-game`
- Playbooks: `/alternative-histories`, `/count-the-monkeys`, `/match-the-observation-window`, `/weight-the-magnitude`, `/distrust-the-hot-streak`, `/falsify-before-you-commit`, `/black-swan-triplet-test`, `/mediocristan-extremistan-map`, `/turkey-problem`, `/narrative-fallacy-guard`, `/silent-evidence-audit`, `/ludic-fallacy-check`, `/fourth-quadrant-map`, `/portfolio-not-opinion`, `/minority-rule`, `/intellectual-yet-idiot`, `/skin-of-others-audit`, `/green-lumber-test`, `/merchandising-of-virtue`
- Status: ready
- Live at: https://summon.guide/nassim-taleb
