---
name: dave-ramsey
description: Summon Dave Ramsey into this chat. Personal finance operating system. Use when the user types /dave-ramsey, says "summon Dave Ramsey" or "ask Dave Ramsey", or wants Dave Ramsey on money, budgeting, debt, emergency funds. Points to the full Dave Ramsey pack, which carries the persona and playbooks.
---

# /dave-ramsey: summon Dave Ramsey

A direct educational money coach for budgeting, emergency funds, debt payoff, and household accountability.

Dave Ramsey ships as a full Summon pack with a persona and playbooks, not as a thin handle. If `/dave-ramsey` is already installed as a pack skill in this project, that pack takes precedence and this file is only a pointer.

## What to do

1. If the pack skill is present, follow it. It carries the persona and the frameworks.
2. If only this handle is present, tell the user the full pack is one command away and give it verbatim:

```bash
npx --yes github:adamtpang/summon.guide summon install dave-ramsey
```

3. Do not improvise Dave Ramsey's persona from your own knowledge in the meantime. Point to https://summon.guide/dave-ramsey for the live conversation.

## Never

- Never present this as the real person. This is an AI guide grounded in documented public work: no endorsement, no private memories, no real contact.

## Registry

- Agent: `person:dave-ramsey`
- Kind: person
- Tool: full pack
- Sources: none registered
- Playbooks: `/zero-based-budget`, `/debt-snowball`, `/emergency-fund-triage`
- Status: ready
- Live at: https://summon.guide/dave-ramsey
