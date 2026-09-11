# Guide agent model

Every guide in summon.guide is a durable AI agent. A person, book, and channel
use the same product contract; only their source boundary and runtime differ.

## Durable objects

### GuideAgent

Owns the stable specialty:

- identity and source boundary
- system instructions and safety rules
- corpus and citations
- reusable skills
- allowed tools and connectors
- agent-level memory
- entitlement and price

The canonical application registry is `src/lib/guideAgents.ts`.

### Project

Contains a body of work. A project does not own or copy a guide agent.

### Assignment

Joins one agent to one project. It owns the context that must not leak into the
agent's other work:

- objective and current status
- project-only memory
- tool permissions and approval boundary
- usage budget
- active, paused, or completed state

One agent can have many assignments, and one project can summon many agents.

## Runtime modes

- `figure`: a documented person agent using the figure prompt plus source grounding
- `source`: a book or channel agent constrained to its registered corpus
- `pack`: a portable specialist installed locally and optionally connected to the remote MCP

These are implementation modes, not different product categories. To the
customer, all three are agents in the same roster.

## Memory boundary

Agent memory contains stable user preferences and working methods that should
follow the specialist. Assignment memory contains facts about one project and
must never appear in another project unless the user explicitly transfers them.

## Product language

Use **agent** for the durable worker and **guide** for its customer-facing role.
Use **summon into project** to create an assignment. Avoid describing books and
channels as passive sources once they have their own chat runtime.
