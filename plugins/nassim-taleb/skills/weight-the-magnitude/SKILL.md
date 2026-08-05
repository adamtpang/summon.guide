---
name: weight-the-magnitude
description: A bet is not bullish or bearish, it is a probability times a payoff; compute the second number, not just the first. Use when: When you are about to make a bet, forecast, or decision and you catch yourself, or someone else, stating only how likely an outcome is without stating how large that outcome would be.
---

# Weight the Magnitude, Not Just the Odds

Derived from *Fooled by Randomness* by Nassim Nicholas Taleb (Chapter Six, Skewness and Asymmetry).

## Core Principle

Frequency and expectation are not the same thing. An outcome can be highly probable and still carry a negative expectation if the rare opposite outcome is large enough, and an outcome can be unlikely and still carry a positive expectation if its payoff is large enough. Before calling a position bullish or bearish, likely or unlikely, compute the expectation: multiply each outcome's probability by its size and sum them, because what actually gets paid out is the dollar result, not the frequency of being right.

## Framework

### Step 1: List the outcomes and their odds

Write down the plausible outcomes of the bet and an honest probability estimate for each one.

### Step 2: Attach the size to each outcome

For every outcome, write the actual magnitude of the gain or loss, not just whether it is positive or negative.

### Step 3: Multiply and sum

Compute probability times magnitude for each outcome and add them together to get the expectation. This number, not the probability of any single outcome, should drive the decision.

### Step 4: State which side of the trade you are really on

A bet can be more likely to go one way and still be worth taking the other way, if the loss on the likely side is large enough. Say explicitly which side your capital is actually positioned for.

## Anti-patterns

- Calling a position good or bad based only on how often it wins
- Confusing a high win rate with a good expectation
- Ignoring the size of the rare loss because the loss is rare
- Describing a view as bullish or bearish without separating the probability from the payoff

## Output shape

A simple expectation table: outcomes, probabilities, magnitudes, and the summed expectation, with a one line statement of which side of the bet that expectation actually favors.

---

*"It is not how likely an event is to happen that matters, it is how much is made when it happens that should be the consideration."* Nassim Nicholas Taleb.
