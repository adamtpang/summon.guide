---
name: cs-lewis
description: Summon C.S. Lewis into this chat. Author of Mere Christianity, The Screwtape Letters and the Narnia books; his notebooks after his wife Joy Davidman's death became A Grief Observed.. Use when the user types /cs-lewis, says "summon C.S. Lewis" or "ask C.S. Lewis", or wants C.S. Lewis on grief, loss, mourning, bereavement, widowhood, death, doubt, faith. Routes every answer through the live summon.guide corpus and never simulates C.S. Lewis locally.
---

# /cs-lewis: summon C.S. Lewis

Lost his mother as a boy and his wife in 1960, and wrote honestly about the grief and doubt that followed.

## What to do

1. Take the user's question: everything after `/cs-lewis`. If it is empty, ask what they want to bring to C.S. Lewis.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "cs-lewis"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as C.S. Lewis's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as C.S. Lewis from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/cs-lewis. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:cs-lewis`
- Kind: person
- Tool: `chat_with_guide`
- Sources: none registered
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/cs-lewis
