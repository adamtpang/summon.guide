/** Per-guide ElevenLabs voices. Library casting or voices designed from a written
 * description (ElevenLabs Voice Design). None is cloned from a recording of the person.
 * Dedicated account voices can override each assignment with
 * ELEVENLABS_VOICE_<SLUG_WITH_UNDERSCORES> in server environment settings.
 */
export const VOICE_MAP: Record<string, string> = {
  "rick-rubin": "JBFqnCBsd6RMkjVDRZzb", // Calm library casting, not Rubin's voice or a clone.
  "pendleton-ward": "ErXwobaYiN019PkySvjV", // Library casting, not Ward's voice or a clone.
  sage: "JBFqnCBsd6RMkjVDRZzb", // George: mature, calm storyteller
  "tobi-lutke": "N2lVS1w4EtoT3dr4eOWO",
  "todd-graves": "TX3LPaxmHKxFdv7VOQHJ",
  "john-mackey": "onwK4e9ZLuTAKqWW03F9",
  "jimmy-iovine": "ErXwobaYiN019PkySvjV",
  "daniel-ek": "N2lVS1w4EtoT3dr4eOWO",
  "evan-spiegel": "TX3LPaxmHKxFdv7VOQHJ",
  "james-dyson": "JBFqnCBsd6RMkjVDRZzb",
  "brian-armstrong": "pNInz6obpgDQGcFmaJgB",
  "steve-jobs": "ErXwobaYiN019PkySvjV",
  "jeff-bezos": "VR6AewLTigWG4xSOukaG",
  "sam-walton": "onwK4e9ZLuTAKqWW03F9",
  "naval-ravikant": "pNInz6obpgDQGcFmaJgB",
  "ray-dalio": "pqHfZKP75CvOlQylNhV4",
  "lulie-tanett": "XrExE9yKIg1WjnnlVkGX",
  hesse: "N2lVS1w4EtoT3dr4eOWO", // Callum: warm, measured, European
  "nassim-taleb": "pqHfZKP75CvOlQylNhV4", // Bill: measured, grave, aphoristic
  "peter-thiel": "pNInz6obpgDQGcFmaJgB", // Adam: calm, deliberate, contrarian
  "jensen-huang": "VR6AewLTigWG4xSOukaG", // Arnold: commanding, energetic keynote presence
  pressfield: "onwK4e9ZLuTAKqWW03F9", // Daniel: direct, weathered, plain
  vervaeke: "pNInz6obpgDQGcFmaJgB", // Adam: calm, measured, academic
  rockefeller: "WSrIoSc2Nj9NSrYw5anZ", // Designed voice (ElevenLabs Voice Design), not a clone: old Gilded Age industrialist, dry, exacting
  "warren-buffett": "onwK4e9ZLuTAKqWW03F9", // Daniel: mature, warm, measured
  "charlie-munger": "onwK4e9ZLuTAKqWW03F9", // Daniel: mature, dry, measured
  franklin: "cvBBMAUkEsGOIhfUFZmL", // Designed voice, not a clone: elderly 18th century Philadelphian, warm, wry, unhurried
  elon: "TX3LPaxmHKxFdv7VOQHJ", // Liam: direct, slightly halting
  alexander: "k0SowLXkFmKsorTXk1yQ", // Designed voice, not a clone: young commanding king, energetic, direct
  deutsch: "pNInz6obpgDQGcFmaJgB", // Adam: calm, British, academic
  "lee-kuan-yew": "7DHxEfwQzXWuiEldRcxx", // Tristan, ElevenLabs library voice with a Singaporean accent; not his voice or a clone
  "marcus-aurelius": "gRoKC2L6mkmLlD5lv0Bu", // Designed voice, not a clone: quiet, contemplative emperor
  "marc-andreessen": "ErXwobaYiN019PkySvjV", // Antoni: direct, energetic, declarative
  "adam-neumann": "VR6AewLTigWG4xSOukaG", // Arnold: charismatic, expansive
  seneca: "QRcfvWiOOkYDxISpupJA", // Designed voice, not a clone: grave, intimate Roman letter writer
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
  "brad-jacobs": "ErXwobaYiN019PkySvjV", // Antoni: direct, energetic, declarative, reused from marc-andreessen/tim-ferriss/senra
  "paul-graham": "pNInz6obpgDQGcFmaJgB", // Adam: calm, measured, analytical; library voice, not a clone
};

export const DEFAULT_VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // Daniel fallback

/** Chat replies stay short; script/voiceover mode allows ~90–120s spoken. */
export const TTS_LIMITS = {
  chat: 2000,
  /** ~350–400 words at typical TTS rate; enough for a 2-minute voiceover. */
  script: 4000,
} as const;

export function getVoiceId(figureSlug?: string | null): string {
  if (figureSlug && VOICE_MAP[figureSlug]) {
    const key = `ELEVENLABS_VOICE_${figureSlug.replace(/-/g, "_").toUpperCase()}`;
    return process.env[key]?.trim() || VOICE_MAP[figureSlug];
  }
  return DEFAULT_VOICE_ID;
}

export function hasMappedVoice(figureSlug: string): boolean {
  return Boolean(VOICE_MAP[figureSlug]);
}
