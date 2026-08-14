/**
 * ElevenLabs voice IDs per guide slug.
 * Living legends: prefer licensed clones from public interviews (TODO).
 * Dead legends: closest-matching library voices.
 */
export const VOICE_MAP: Record<string, string> = {
  hesse: "N2lVS1w4EtoT3dr4eOWO", // Callum: warm, measured, European
  pressfield: "onwK4e9ZLuTAKqWW03F9", // Daniel: direct, weathered, plain
  vervaeke: "pNInz6obpgDQGcFmaJgB", // Adam: calm, measured, academic
  rockefeller: "onwK4e9ZLuTAKqWW03F9", // Daniel: deep, authoritative, older male
  "warren-buffett": "onwK4e9ZLuTAKqWW03F9", // Daniel: mature, warm, measured
  "charlie-munger": "onwK4e9ZLuTAKqWW03F9", // Daniel: mature, dry, measured
  franklin: "N2lVS1w4EtoT3dr4eOWO", // Callum: warm, wise, British-inflected
  elon: "TX3LPaxmHKxFdv7VOQHJ", // Liam: direct, slightly halting
  alexander: "VR6AewLTigWG4xSOukaG", // Arnold: commanding, powerful
  deutsch: "pNInz6obpgDQGcFmaJgB", // Adam: calm, British, academic
  "lee-kuan-yew": "yoZ06aMxZJJ28mfd3POQ", // Sam: clear, authoritative, clipped
  "marcus-aurelius": "pqHfZKP75CvOlQylNhV4", // Bill: measured, grave, contemplative
  "marc-andreessen": "ErXwobaYiN019PkySvjV", // Antoni: direct, energetic, declarative
  "adam-neumann": "VR6AewLTigWG4xSOukaG", // Arnold: charismatic, expansive
  seneca: "pNInz6obpgDQGcFmaJgB", // Adam: calm, deliberate, Roman gravitas
  "ricky-gervais": "JBFqnCBsd6RMkjVDRZzb", // George: warm, mature British delivery
  "marie-curie": "XrExE9yKIg1WjnnlVkGX", // Matilda: warm, measured, mature female
  "bob-marley": "onwK4e9ZLuTAKqWW03F9", // placeholder warm male
  senra: "ErXwobaYiN019PkySvjV", // Antoni: direct, energetic, declarative, no accent documented
  sivers: "onwK4e9ZLuTAKqWW03F9", // Daniel: calm, plain American, unhurried, matter of fact
  visakan: "TX3LPaxmHKxFdv7VOQHJ", // Liam: direct, associative, slightly halting, no accent documented
  "james-clear": "onwK4e9ZLuTAKqWW03F9", // Daniel: calm, plain, matter of fact
  "cal-newport": "pNInz6obpgDQGcFmaJgB", // Adam: calm, measured, academic
  "tim-ferriss": "ErXwobaYiN019PkySvjV", // Antoni: direct, energetic, declarative
  "annie-duke": "21m00Tcm4TlvDq8ikWAM", // Rachel: calm, precise, professional female
  "carol-dweck": "EXAVITQu4vr4xnSDxMaL", // Bella: warm, professional female
  "paul-millerd": "N2lVS1w4EtoT3dr4eOWO", // Callum: warm, reflective, measured
  "napoleon-hill": "pqHfZKP75CvOlQylNhV4", // Bill: measured, grave, period gravitas
};

export const DEFAULT_VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // Daniel fallback

/** Chat replies stay short; script/voiceover mode allows ~90–120s spoken. */
export const TTS_LIMITS = {
  chat: 2000,
  /** ~350–400 words at typical TTS rate; enough for a 2-minute voiceover. */
  script: 4000,
} as const;

export function getVoiceId(figureSlug?: string | null): string {
  if (figureSlug && VOICE_MAP[figureSlug]) return VOICE_MAP[figureSlug];
  return DEFAULT_VOICE_ID;
}

export function hasMappedVoice(figureSlug: string): boolean {
  return Boolean(VOICE_MAP[figureSlug]);
}
