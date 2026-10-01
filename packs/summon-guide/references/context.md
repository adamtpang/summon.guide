# Personal context intake

Use this when someone asks for advice tailored to their life or invokes summon-guide inside a project such as themain.quest.

## Gather only what matters

1. Start with the current request and visible conversation. A named guide is a preference, not permission to force their perspective onto every problem.
2. When the user refers to project life context, follow that project's AGENTS.md and read its canonical current brief or files relevant to the decision. Do not scan other projects, the home folder or hidden chats. Do not copy credentials or unrelated third-party details.
3. In themain.quest, consult its life-context instructions. The existing `npm run life:context` is a print-only brief export; inspect the script before execution, never add `--send` or `--out`. It can prefer historical questbook material, so check the current conversation and live outbox before treating exported priorities as current. Parked, declined, completed and awaiting-result items remain in those states. Do not edit life state or dispatch tasks.
4. Prefer the newest explicit user correction over an older file. Treat preferences as preferences, uncertain beliefs as uncertain, and unknown facts as unknown. A fresh export timestamp does not prove its contents are current. If facts conflict, ask only the question that changes the advice.
5. Build a small working brief in this chat, without saving it: situation, decision, desired outcome, priorities, constraints, attempts, values, deferred actions, unknowns and evidence provenance. Keep only relevant details. Dates, money, health and relationships should be included only when material to the question. Do not display a sensitive dossier back to the user.

## Prepare evidence locally

Run `node "<skill directory>/scripts/prepare.mjs"` with JSON on stdin. This helper validates and formats context; the host assistant performs semantic extraction and writes the advice. It does not discover other chats, infer a person's life, or generate a remote guide response.

```json
{
  "guide": "Rose Blumkin",
  "topics": ["customer trust", "operating costs", "focus"],
  "context": {
    "situation": "A short relevant summary from this conversation",
    "decision": "The actual choice the user is facing",
    "outcome": "What they want to change",
    "priorities": ["Current stated priority"],
    "constraints": ["Explicit limit, such as time or available money"],
    "attempts": ["What they have already tried"],
    "values": ["What must not be sacrificed"],
    "deferred": ["An action they explicitly declined or parked"],
    "unknowns": ["A fact that would change the recommendation"],
    "provenance": ["Current conversation; dated canonical project brief"]
  }
}
```

Topics must be generic concepts, never copied personal passages, names of third parties, account information or identifying details. The helper sends only these topics and the guide ID to public retrieval. The full brief is returned locally to this assistant and is never written to a file or sent to Summon. Do not echo it into logs or put it in shell arguments. The current host's normal model processing still applies; this is not offline inference.

If there is no named guide, use the main skill's matching rubric, then prepare the selected guide using the same brief. If context is missing, ask one focused question; do not fabricate a personalized answer.

## Answer in this chat

Use **Rose Blumkin · AI guide** (or the selected name), then an estimated fit score when matching is relevant. Keep the evidence status compact, for example “Two cited starter notes; limited coverage.”

- Take a position on the actual decision, conditional on important unknowns.
- Explain the documented principle with a clickable source citation. Explain your application to the user's specific constraint separately.
- Give one feasible next action. Do not prescribe deferred actions, invent memory, promise income, or treat historical overwork as a life ideal.
- Ask at most one useful question if needed. Do not ask for details already present.

For example, if a synthetic user is choosing between launching another project and testing an existing offer, has two hours a day, and values family time, Rose's operating-discipline lens could support checking whether one offer delivers customer value at sustainable cost. It does not establish that they should work longer hours or abandon their broader ambition. The fit to burnout, grief or relationships may be weak; offer a better-fit guide rather than disguising retail advice as expertise in those areas.

No website navigation, connector installation, context upload, private dossier persistence or messaging is required.
