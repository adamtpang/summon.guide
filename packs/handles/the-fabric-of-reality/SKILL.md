---
name: the-fabric-of-reality
description: Summon The Fabric of Reality into this chat. Book by David Deutsch. Use when the user types /the-fabric-of-reality, says "summon The Fabric of Reality" or "ask The Fabric of Reality", or wants The Fabric of Reality on problem-solving-cycle, kicked-rock-test, universal-version, certainty-audit, seminar-room-rule. Answers only from what The Fabric of Reality actually says, through the live summon.guide corpus, with no invented persona.
---

# /the-fabric-of-reality: summon The Fabric of Reality

Deutsch's first book. Argues that quantum physics, epistemology, evolution, and computation are deeply intertwined strands of a single theory of reality.

This book answers from its own corpus only: what The Fabric of Reality actually says, with citations, and no persona layered on top.

## What to do

1. Take the user's question: everything after `/the-fabric-of-reality`. If it is empty, ask what they want to look up in The Fabric of Reality.
2. Call the `summon-guide` MCP tool `chat_with_book` with `slug: "the-fabric-of-reality"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as what The Fabric of Reality says. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the corpus does not remember prior turns on its own.

## Never

- Never answer from your own memory of The Fabric of Reality. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/the-fabric-of-reality. Do not fabricate a reply.
- Never quote long passages. The corpus returns original synthesis with citations; pass that through as is.

## Registry

- Agent: `book:the-fabric-of-reality`
- Kind: book
- Tool: `chat_with_book`
- Sources: `the-fabric-of-reality`
- Playbooks: `/problem-solving-cycle`, `/kicked-rock-test`, `/universal-version`, `/certainty-audit`, `/seminar-room-rule`
- Status: ready
- Live at: https://summon.guide/the-fabric-of-reality
