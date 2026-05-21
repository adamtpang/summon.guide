# summon.guide — Claude Code Plugin Marketplace

Pick exactly who you want to summon into your Claude chats. One plugin per guide.

## Installation

```
/plugin marketplace add adamtpang/summon.guide
/plugin install elon              # Elon Musk's mindset + 3 frameworks
/plugin install franklin          # Franklin's mindset + 13 Virtues + Junto
/plugin install rockefeller       # Rockefeller's mindset + Ledger A + Crisis
/plugin install alexander         # Alexander's mindset + Lead-from-front + Decisive point
/plugin install deutsch           # Deutsch's mindset + Good explanations + Optimism
/plugin install lee-kuan-yew      # Lee's mindset + Pragmatist test + Incorruptibility
/plugin install marcus-aurelius   # Marcus's mindset + Dichotomy + View from above + Memento mori
```

Each plugin is independent — install only the guides you want, mix and match.

## How to invoke a guide once installed

Each plugin gives you a **namespaced** slash command per skill:

- `/<plugin>:<plugin>` — the **umbrella skill**, channels the full mindset
- `/<plugin>:<framework>` — a specific tool

Examples after `/plugin install elon`:

| Command | What it does |
|---|---|
| `/elon:elon` | Channel Elon's full operating mode — first principles, the algorithm, the idiot index, schedule pressure |
| `/elon:first-principles` | Decompose to physics, materials, hours. Compute the irreducible floor. |
| `/elon:five-step-algorithm` | Question → delete → simplify → accelerate → automate, in that order. |
| `/elon:idiot-index` | Finished cost / raw material cost. Above 10x means you are paying for inefficiency. |

## The seven guides

| Plugin | Guide | Skills | Source |
|---|---|---|---|
| `elon` | Elon Musk | `elon`, `first-principles`, `five-step-algorithm`, `idiot-index` | *Elon Musk* by Walter Isaacson |
| `franklin` | Benjamin Franklin | `franklin`, `thirteen-virtues`, `junto` | Autobiography + Isaacson's biography |
| `rockefeller` | John D. Rockefeller | `rockefeller`, `ledger`, `crisis` | *Titan* by Ron Chernow |
| `alexander` | Alexander the Great | `alexander`, `lead-from-front`, `decisive-point` | Plutarch, Arrian |
| `deutsch` | David Deutsch | `deutsch`, `good-explanations`, `principle-of-optimism` | *The Beginning of Infinity* |
| `lee-kuan-yew` | Lee Kuan Yew | `lee-kuan-yew`, `pragmatist-test`, `incorruptibility` | *From Third World to First* |
| `marcus-aurelius` | Marcus Aurelius | `marcus-aurelius`, `dichotomy-of-control`, `view-from-above`, `memento-mori` | *Meditations* |

## Why this structure

Sahil Lavingia's [`slavingia/skills`](https://github.com/slavingia/skills) turned *one book* into a Claude Code plugin. We do the same for many books — but each guide is its own plugin, so a user who only wants Marcus's Stoic frameworks doesn't have to install Elon's manufacturing algorithm.

Every skill is grounded in a specific passage of a specific book. We don't generate philosophy on the fly. The data model that links guides → books → skills lives in `src/lib/{figures,books,skills}.ts`, and the on-disk SKILL.md files under `/plugins/<guide>/skills/<skill>/SKILL.md` are the source of truth Claude Code reads.

## Adding a new skill or guide

See `/BOOKS.md` for the full roadmap (Forbes / market cap / GDP / historical figures × canonical books) and `/GUIDE_ONBOARDING.md` for the onboarding algorithm. Quick summary:

1. **New skill on existing guide**: create `/plugins/<guide>/skills/<slug>/SKILL.md` with frontmatter, add an entry to `src/lib/skills.ts`, and add the slug to the source book's `skillSlugs` in `src/lib/books.ts`.
2. **New guide**: see `/GUIDE_ONBOARDING.md`. You also need to add the new plugin to `.claude-plugin/marketplace.json` and create `/plugins/<guide>/.claude-plugin/plugin.json`.

## License

MIT.
