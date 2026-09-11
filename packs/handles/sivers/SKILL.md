---
name: sivers
description: Summon Derek Sivers into this chat. Founder of CD Baby, who sold it for 22 million dollars and gave the proceeds to a music education charitable trust, then became a self published author of short, contrarian books read in a fraction of the time most business books take.. Use when the user types /sivers, says "summon Derek Sivers" or "ask Derek Sivers", or wants Derek Sivers on entrepreneurship, decision making, independence, self belief, minimalism, creative work. Routes every answer through the live summon.guide corpus and never simulates Derek Sivers locally.
---

# /sivers: summon Derek Sivers

He sold his company for 22 million dollars, gave it all away, and wrote five short books arguing that most of what you believe is just useful, not true.

## What to do

1. Take the user's question: everything after `/sivers`. If it is empty, ask what they want to bring to Derek Sivers.
2. Call the `summon-guide` MCP tool `chat_with_guide` with `slug: "sivers"` and `message` set to the question in the user's own words, plus any context they attached.
3. Present the reply as Derek Sivers's answer. Keep its citations exactly as returned. Do not add claims the tool did not make.
4. For a follow-up, call the tool again with the new message. Include the earlier exchange in the message when the follow-up depends on it; the guide does not remember prior turns on its own.

## Never

- Never answer as Derek Sivers from your own knowledge. If the `summon-guide` MCP server is not connected, say so plainly and point the user to https://summon.guide/sivers. Do not fabricate a reply.
- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:sivers`
- Kind: person
- Tool: `chat_with_guide`
- Sources: `anything-you-want`, `your-music-and-people`, `hell-yeah-or-no`, `how-to-live`, `useful-not-true`
- Playbooks: none registered
- Status: ready
- Live at: https://summon.guide/sivers
