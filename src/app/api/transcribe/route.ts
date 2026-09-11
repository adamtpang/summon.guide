import { auth } from "@/auth";
import { MAX_VOICE_BYTES, transcribeVoice } from "@/lib/transcribeVoice";
const headers = { "Cache-Control": "private, no-store" };
export async function GET() {
  if (!(await auth())?.user?.id) return Response.json({ error: "Sign in to use voice." }, { status: 401, headers });
  return Response.json({ ready: true }, { headers });
}
export async function POST(req: Request) {
  if (!(await auth())?.user?.id) return Response.json({ error: "Sign in to use voice." }, { status: 401, headers });
  if (Number(req.headers.get("content-length")) > MAX_VOICE_BYTES + 10000) return Response.json({ error: "Record a shorter question." }, { status: 413, headers });
  try {
    const file = (await req.formData()).get("audio");
    if (!(file instanceof Blob) || !file.size || file.size > MAX_VOICE_BYTES) return Response.json({ error: "Record a shorter question." }, { status: 400, headers });
    const text = await transcribeVoice(file, req.signal);
    return Response.json({ text }, { headers });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Transcription failed. Try again." }, { status: 502, headers });
  }
}
