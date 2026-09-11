# Agents without the ceremony

You do not need to learn an agent framework before you can have an AI team.
Start by giving Codex an outcome and asking it to delegate independent work to
subagents. Learn to create durable agents only after a role repeats.

## The five pieces

| Piece | What it is | Use it when |
| --- | --- | --- |
| Main agent | Your accountable collaborator | One person must own the final outcome |
| Subagent | A temporary specialist created for one bounded task | Research, review, comparison, or another parallel branch |
| Named agent | A saved job description with triggers, tools, process, and output | The same specialist role keeps returning |
| Skill | A saved method or playbook | Several agents should perform a task the same way |
| MCP | A connection to external tools or data | The work needs a browser, database, calendar, files, or another service |

An agent is not mainly a persona. It is a contract for doing a job reliably.

## Start with this workflow

1. Tell Codex the outcome, constraints, and definition of done.
2. Ask it to delegate only independent work that can run in parallel.
3. Keep one main agent accountable for reconciling the results.
4. Notice which role you request repeatedly.
5. Save that repeated role as a named agent.

Example:

> Find a legal digital edition of this book. Use a subagent for source research.
> Do not use shadow libraries. Return the rights basis, whether it can enter a
> corpus, and the next action I need to perform manually.

For summon.guide, the saved version is `.claude/agents/book-pdf-finder.md`.

## How to design a named agent

Write seven things:

1. **Outcome:** the result it owns.
2. **Trigger:** when it should be invoked, with real examples.
3. **Inputs:** what it needs before starting.
4. **Tools:** only the capabilities required for the job.
5. **Process:** the ordered loop it follows.
6. **Output:** an exact, scannable return format.
7. **Boundaries:** actions it must never take and conditions that make it stop.

The system prompt should make a good result easier to produce than a bad one.
Concrete ordering, evidence standards, and stop conditions matter more than a
long fictional biography.

## What to learn first

Learn these in order:

1. Writing a crisp delegated task.
2. Separating independent subtasks from dependent steps.
3. Defining evidence and a finish line.
4. Saving a repeated role as a named agent.
5. Giving agents reusable skills.
6. Connecting MCP tools only when the role genuinely needs external access.

Do not start by building a large permanent hierarchy. Start with one main agent
and one or two specialists. Promote a specialist into a named agent only after
you have seen the role recur and can describe what good work looks like.

## A useful life-agent starter team

- **Chief of staff:** turns open loops into a weekly plan and keeps ownership clear.
- **Researcher:** finds evidence and separates fact from inference.
- **Decision reviewer:** stress-tests important choices and surfaces downside.
- **Learning coach:** turns a topic into a curriculum, retrieval practice, and projects.
- **Book finder:** locates legal source material and classifies corpus rights.

Keep financial, legal, medical, and relationship decisions under human control.
Agents can structure evidence and questions; they should not quietly acquire the
authority to spend, publish, communicate, diagnose, or commit on your behalf.
