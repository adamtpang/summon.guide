export const FOUNDERS_LENS_PROMPTS = [
  {
    title: "Choose your last company",
    description: "Use historical precedents to test a mission worthy of a decade.",
    prompt:
      "I am trying to choose the last company I would be proud to build for the next decade or longer. Compare founders who committed to an enduring mission, explain what made their founder-problem fit real rather than aspirational, show where obsession became a liability, and give me falsifiable tests to run before I commit. Cite every episode you use.",
  },
  {
    title: "Find a precedent",
    description: "Match a live company problem to comparable founder decisions.",
    prompt:
      "Find three historical founder precedents for a company facing a difficult strategic decision. Compare what each founder did, where the analogy breaks, and cite every episode you use.",
  },
  {
    title: "Pressure-test a claim",
    description: "Look for counterexamples before accepting conventional wisdom.",
    prompt:
      "Founders are often given confident advice that may be wrong. Show me three counterexamples from this corpus, explain the conditions that made them work, and cite every episode you use.",
  },
  {
    title: "Build the hiring bar",
    description: "Compare how exceptional builders found and judged talent.",
    prompt:
      "How did the founders in this corpus identify unusually capable people? Give me the recurring tests, meaningful disagreements, and a practical hiring checklist with episode citations.",
  },
  {
    title: "Study obsession safely",
    description: "Separate productive intensity from mythology and damage.",
    prompt:
      "Compare examples of founder obsession that compounded results with examples where the same trait caused damage. Give me a decision rule, not hero worship, and cite the episodes.",
  },
  {
    title: "Teach the market",
    description: "Find examples of companies creating demand through education.",
    prompt:
      "Which founders had to educate a market before customers understood the product? Compare their methods and give me a sequence I could adapt, with episode citations.",
  },
  {
    title: "Protect control",
    description: "Learn when ownership and independence changed the outcome.",
    prompt:
      "When did retaining control matter more than taking the largest available check? Compare several cases, include the tradeoffs, and cite every episode you use.",
  },
] as const;

export const FOUNDERS_LENS_DISCLOSURE =
  "Summon Sage is an independent research workspace built from original syntheses of selected public Founders episodes and David Senra interviews. It is not affiliated with David Senra or Founders Notes' Sage, does not contain David's private notes or highlights, and does not imply endorsement.";
