# Duo guides

- `/gottmans`: John and Julie Schwartz Gottman; relationships. Three initial original syntheses of public Gottman Institute pages. Partial educational coverage; no therapy, diagnostic scoring, paid books, or private material.
- `/buffettmunger`: Warren Buffett and Charlie Munger; investing. Reuses both existing person corpora; retrieval interleaves up to eight ranked notes per member within the context budget. Individual guides remain available.

A duo is a person-family guide with explicit `members` metadata, one shared conversation, and one synthetic narrator. It does not simulate an invented dialogue. Attribute claims to an individual only when the source supports it; shared and institutional material stays labeled as such. The Gottmans avatar is a monogram. Buffett & Munger renders both existing portraits.

Run `node --experimental-strip-types --import ./scripts/node-server-shim.mjs scripts/test-duo-guides.mjs` to verify registrations, prompts, evidence unions, balanced retrieval and source provenance. This smoke suite is not an independent answer-quality evaluation.
