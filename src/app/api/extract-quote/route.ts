import { completeOpenRouter } from "@/lib/openrouter";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, figureName, era } = await req.json();

  if (!messages?.length || !figureName) {
    return Response.json({ error: "Missing messages or figureName" }, { status: 400 });
  }

  // Build a summary of the conversation for the curator
  const conversationText = messages
    .map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
    .join("\n\n");

  const response = await completeOpenRouter({
    system: `You are a quote curator. Extract the single most shareable, standalone quote from this conversation with ${figureName}. The quote should make someone stop scrolling on X/Twitter: punchy, wise, and complete without context. Return ONLY the quote text, no attribution, no quote marks, nothing else. Max 180 characters. Strip any source citations like [Source: ...].`,
    messages: [
      { role: "user", content: conversationText },
    ],
    maxTokens: 400,
    temperature: 0.3,
  });

  const quote = response.text.trim();

  return Response.json({ quote, figureName, era: era || "" });
}
