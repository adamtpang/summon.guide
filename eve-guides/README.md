# Summon Eve agents

Every canonical person, book, and channel has an independent Eve application here.
Namespaced IDs prevent collisions between a person and a book with the same slug.
`manifest.json` maps the live registry to generated directories. Do not edit
generated files: update the registry and run `npm run agents:generate`.

Each directory contains an Eve `agent.ts`, guide instructions, and the requested
Eve engineering skill. The skill is also installed for project Codex and Claude
Code. Specialist source/skill IDs remain attached but are not falsely marked as
retrieved or loaded. No private raw corpus is copied into these packages.

These are authored packages, not deployed agents. The current website retains
its existing OpenRouter runtime. A dynamic model gate deliberately rejects Eve
sessions until the approved model adapter, per-user auth, entitlement, retrieval,
and session isolation are implemented and tested. No default paid model, shell
tools, messaging connections, or recurring jobs are enabled. Pending onboarding
entries retain their building status.

Validation:

```powershell
npm run agents:generate
npm run agents:check
cd eve-guides/person-sivers
node ../../node_modules/eve/bin/eve.js build --skip-sandbox-prewarm
```

Node 24+ is required. Set `EVE_TELEMETRY_DISABLED=1` for local compiler checks.
Next steps are runtime integration and meaningful guide evals; compiling a package
does not establish source coverage or answer quality.
