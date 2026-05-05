# summon.guide — Claude Code Skills

Claude Code skills derived from the lives and books of history's greatest guides. Each skill captures one specific framework, principle, or method from the source biography or primary text. Install once, then invoke any of these slash commands when you're working through a decision they would have something to say about.

Built in homage to [`slavingia/skills`](https://github.com/slavingia/skills), which turned one book — *The Minimalist Entrepreneur* — into Claude Code skills. We did the same for many books, from many lives.

## Installation

In Claude Code:

```
/plugin marketplace add adamtpang/summon.guide
/plugin install summon-guide
```

That's it — Claude Code will fetch the repo and register all 13 skills automatically.

<details>
<summary>Alternative: install from a local clone</summary>

```bash
git clone https://github.com/adamtpang/summon.guide.git ~/.claude/plugins/summon-guide
```

Then in Claude Code:

```
/plugin marketplace add ~/.claude/plugins/summon-guide
/plugin install summon-guide
```

</details>

## Skills

### John D. Rockefeller — *Titan* by Ron Chernow

| Skill | Command | When to use |
|-------|---------|-------------|
| **Ledger A Discipline** | `/rockefeller-ledger` | Setting up bookkeeping habits, auditing recurring spend, or imposing financial discipline on a chaotic operation |
| **Crisis as Opportunity** | `/rockefeller-crisis` | A market panic, downturn, layoff wave, or competitor collapse — and you have cash and conviction |

### Benjamin Franklin — *Autobiography* + *Benjamin Franklin: An American Life* by Walter Isaacson

| Skill | Command | When to use |
|-------|---------|-------------|
| **13 Virtues System** | `/franklin-thirteen-virtues` | Building self-discipline, fixing a recurring personal flaw, designing a habit tracker |
| **Build a Junto** | `/franklin-junto` | Starting a mastermind, founders circle, weekly dinner, or peer-improvement society |

### Elon Musk — *Elon Musk* by Walter Isaacson

| Skill | Command | When to use |
|-------|---------|-------------|
| **First-Principles Reasoning** | `/musk-first-principles` | Quoted an "industry standard" cost, told a long timeline, or stuck behind "this is how it has always been done" |
| **Five-Step Algorithm** | `/musk-five-step-algorithm` | Simplifying a workflow, killing process bloat, speeding up cycle time |
| **The Idiot Index** | `/musk-idiot-index` | Auditing supplier prices, vendor contracts, build-vs-buy decisions |

### Alexander the Great — Plutarch, Arrian, Robin Lane Fox

| Skill | Command | When to use |
|-------|---------|-------------|
| **Lead From the Front** | `/alexander-lead-from-front` | Asking the team to absorb something hard and you need them to follow |
| **Concentrate at the Decisive Point** | `/alexander-decisive-point` | Spread across too many fronts, facing a stronger competitor, or struggling to focus |

### David Deutsch — *The Beginning of Infinity*

| Skill | Command | When to use |
|-------|---------|-------------|
| **Hard-to-Vary Explanations** | `/deutsch-good-explanations` | Evaluating a theory, debating an interpretation, choosing between competing hypotheses |
| **The Principle of Optimism** | `/deutsch-principle-of-optimism` | Paralysis from "this is just how it is" or a problem someone declared impossible |

### Lee Kuan Yew — *From Third World to First*, *The Singapore Story*

| Skill | Command | When to use |
|-------|---------|-------------|
| **The Pragmatist Test** | `/lky-pragmatist-test` | Debating a policy or strategy through an ideological lens instead of through results |
| **The Incorruptibility Lock** | `/lky-incorruptibility` | Designing incentives, hiring senior leadership, fixing a culture where rules get bent quietly |

## Adding a new skill

1. Create `/skills/<slug>/SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: <slug>
   description: <one paragraph: what the skill does and when Claude should reach for it>
   ---
   ```
2. Add an entry to `/src/lib/skills.ts` so the website indexes it on the matching guide's profile page and on `/skills`.
3. Open a PR.

## Adding a new guide

1. Add the figure to `/src/lib/figures.ts` and `/src/lib/profiles.ts` so they have a `summon.guide/<slug>` profile page.
2. Add 1+ skills following the steps above, with `figureSlug` matching.
3. Open a PR.

## License

MIT.
