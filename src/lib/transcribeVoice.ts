export const MAX_VOICE_BYTES = 4_000_000;
export const VOICE_MODEL = "openai/whisper-large-v3-turbo";
export async function transcribeVoice(audio: Blob, signal?: AbortSignal): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("Voice transcription is not configured.");
  const type = audio.type.split(";")[0];
  const format = ({ "audio/webm": "webm", "audio/mp4": "m4a", "audio/wav": "wav", "audio/ogg": "ogg" } as Record<string, string>)[type];
  if (!format || !audio.size || audio.size > MAX_VOICE_BYTES) throw new Error("Record a shorter audio question.");
  const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST", signal: AbortSignal.any([...(signal ? [signal] : []), AbortSignal.timeout(30000)]),
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: VOICE_MODEL, input_audio: { data: Buffer.from(await audio.arrayBuffer()).toString("base64"), format } }),
  });
  if (!response.ok) throw new Error(response.status === 429 ? "Voice is busy. Try again shortly." : "Transcription is unavailable. Try again or type.");
  const data = await response.json();
  if (typeof data.text !== "string" || !data.text.trim()) throw new Error("I didn’t catch that. Try again.");
  return data.text.trim().slice(0, 8000);
}
