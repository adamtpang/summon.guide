---
name: default-alive
description: Use this skill when a company needs to know whether its current trajectory reaches profitability before cash runs out. Typical triggers include runway anxiety, an assumed future funding round, rising burn, and delayed cost decisions. See "When to invoke" below.
---

# Default Alive

Source: Paul Graham, "Default Alive or Default Dead?" (2015).

## When to invoke

- **Runway is discussed without a trajectory.** The team knows months of cash but not whether growth reaches profitability in time.
- **Fundraising is assumed.** The base plan quietly depends on money that has not been committed.
- **The fatal pinch is approaching.** Burn rose to chase growth, while each dollar of spend is producing less.

## Framework

1. Record cash on hand, monthly revenue, monthly expenses, and recent monthly growth.
2. Project the current trajectory without a new funding round.
3. Mark the month cash reaches zero and the month operating cash flow reaches break-even.
4. If break-even comes first, label the company default alive. If cash runs out first, label it default dead.
5. Calculate which changes in burn, gross margin, or growth could reverse the result while there is still time.
6. Treat fundraising as an optional scenario, never as the base case.

## Anti-patterns

- Using a hoped-for growth rate instead of the observed one.
- Counting unsigned investment as cash.
- Waiting for a fundraising failure before cutting burn.
- Calling the company default alive merely because it is profitable today without checking durability.

## Output shape

Return the classification, assumptions, cash-out month, break-even month, the smallest survivable correction, and the deadline for acting.
