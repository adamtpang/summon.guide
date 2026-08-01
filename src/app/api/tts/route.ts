import { ElevenLabsClient } from "elevenlabs";
import { NextRequest } from "next/server";

// Voice IDs per legend, curated from ElevenLabs library
// Living legends need voice clones from public interviews (TODO)
// Dead legends use closest-matching preset voices
const VOICE_MAP: Record<string, string> = {
  "pressfield": "onwK4e9ZLuTAKqWW03F9", // Daniel: direct, weathered, plain
  "vervaeke": "pNInz6obpgDQGcFmaJgB", // Adam: calm, measured, academic
  "rockefeller": "onwK4e9ZLuTAKqWW03F9", // Daniel: deep, authoritative, older male
  "franklin": "N2lVS1w4EtoT3dr4eOWO",   // Callum: warm, wise, British-inflected
  "elon": "TX3LPaxmHKxFdv7VOQHJ",        // Liam: direct, slightly halting
  "alexander": "VR6AewLTigWG4xSOukaG",   // Arnold: commanding, powerful
  "deutsch": "pNInz6obpgDQGcFmaJgB",     // Adam: calm, British, academic
  "lee-kuan-yew": "yoZ06aMxZJJ28mfd3POQ",         // Sam: clear, authoritative, clipped
  "marcus-aurelius": "pqHfZKP75CvOlQylNhV4", // Bill: measured, grave, contemplative
  "marc-andreessen": "ErXwobaYiN019PkySvjV", // Antoni: direct, energetic, declarative
  "adam-neumann": "VR6AewLTigWG4xSOukaG",     // Arnold: charismatic, expansive
  "seneca": "pNInz6obpgDQGcFmaJgB",            // Adam: calm, deliberate, Roman gravitas
  "ricky-gervais": "JBFqnCBsd6RMkjVDRZzb", // George: warm, mature British delivery
  "marie-curie": "XrExE9yKIg1WjnnlVkGX", // Matilda: warm, measured, mature female
  "bob-marley": "onwK4e9ZLuTAKqWW03F9", // placeholder warm male, swap for a licensed Caribbean-accented voice
};

const DEFAULT_VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // Fallback to Daniel

function getClient() {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error("ElevenLabs API key not configured");
  }
  return new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
}

export async function POST(req: NextRequest) {
  try {
    const { text, figureSlug } = await req.json();

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    const client = getClient();
    const voiceId = (figureSlug && VOICE_MAP[figureSlug]) || DEFAULT_VOICE_ID;

    // Limit text length to control costs
    const trimmedText = text.slice(0, 2000);

    const audioStream = await client.textToSpeech.convert(voiceId, {
      text: trimmedText,
      model_id: "eleven_turbo_v2_5",
      voice_settings: {
        stability: 0.7,
        similarity_boost: 0.8,
        style: 0.3,
        use_speaker_boost: true,
      },
    });

    // Collect the stream into a buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    const message = error instanceof Error ? error.message : "TTS failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
