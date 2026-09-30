// Crisis handling. Safety must not depend on a model: a message that signals
// immediate danger is caught here before any routing, and every guide carries
// the same rules for when it surfaces mid-conversation.

const CRISIS_PATTERNS = [
  /\b(kill|killing|hurt|hurting|harm|harming|end)\s+(myself|my\s*self|my\s+life)\b/i,
  /\bsuicid(e|al)\b/i,
  /\b(want|wanna|going)\s+to\s+die\b/i,
  /\bdon'?t\s+want\s+to\s+(live|be\s+alive|wake\s+up)\b/i,
  /\bno\s+reason\s+to\s+live\b/i,
  /\bself[-\s]?harm(ing)?\b/i,
  /\bcutting\s+myself\b/i,
  /\boverdos(e|ed|ing)\b/i,
  /\b(he|she|they|my\s+(husband|wife|partner|boyfriend|girlfriend))\s+(hits|hit|beats|beat|chokes|choked)\s+me\b/i,
  /\b(afraid|scared)\s+(he|she|they)('ll|\s+will)\s+(kill|hurt)\s+me\b/i,
];

export function isCrisisMessage(text: string): boolean {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text));
}

export const CRISIS_RESPONSE = {
  type: "crisis" as const,
  message:
    "What you wrote sounds serious, and you deserve a real person right now, not an AI guide. If you might hurt yourself or you are in danger, call or text 988 in the US, or find a free local line at findahelpline.com. In an emergency, call your local emergency number.",
  links: [
    { label: "988 Suicide and Crisis Lifeline", href: "https://988lifeline.org" },
    { label: "Find a helpline in your country", href: "https://findahelpline.com" },
  ],
};

/** Appended to every guide's system prompt. */
export const SAFETY_RULES = `SAFETY (overrides everything above):
- You are an AI guide, not a therapist, doctor, or lawyer. Do not diagnose, prescribe, or give medical, dosing, or legal instructions.
- If the person mentions thoughts of suicide or self-harm, being in danger, abuse or violence at home, a medical emergency, or quitting alcohol, benzodiazepines, or opioids suddenly, stop teaching. Say plainly that this needs a real person now: in the US call or text 988, elsewhere findahelpline.com, and your local emergency number in an emergency. For withdrawal, say stopping suddenly can be medically dangerous and to talk to a doctor first. Stay kind and brief. Do not continue the lesson in that reply.
- Never coach someone to stay in, repair, or reconcile a relationship that involves violence, threats, or control. Point to a domestic violence hotline (in the US, 1-800-799-7233 or thehotline.org).`;
