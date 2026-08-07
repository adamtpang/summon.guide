import Anthropic from "@anthropic-ai/sdk";
import { anthropicClient } from "@/lib/anthropic";
import { AI_CONFIG } from "@/lib/figures";
import { buildSourceSystemPrompt } from "@/lib/sourceCorpus";
import { NextRequest } from "next/server";

// Mirrors api/chat/route.ts, but grounds a channel's own corpus directly
// instead of a person's persona. See docs/pipeline.md for the split between
// "chat with a guide" and "chat with a source" and why they are two routes.
export async function POST(req: NextRequest) {
  const anthropic = await anthropicClient();
  const { source: bookSlug, messages } = await req.json();

  const systemText = buildSourceSystemPrompt(bookSlug);
  if (!systemText) {
    return Response.json({ error: "Source not found" }, { status: 404 });
  }

  const stream = anthropic.messages.stream({
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    system: [
      {
        type: "text",
        text: systemText,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ text: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        let userMessage = "Stream error";
        if (error instanceof Anthropic.AuthenticationError) {
          userMessage =
            "Server is missing a valid Anthropic API key. Please contact the site owner.";
        } else if (error instanceof Anthropic.RateLimitError) {
          userMessage = "Rate limited, please try again in a moment.";
        } else if (error instanceof Anthropic.APIError) {
          const detail = error.message?.slice(0, 200) || "";
          console.error("[chat/source] Anthropic APIError", error.status, detail);
          if (/credit balance/i.test(detail)) {
            userMessage =
              "The guides are resting for a moment, the site is topping up. Please try again shortly.";
          } else {
            userMessage = `Upstream API error (${error.status}): ${detail}`;
          }
        } else if (error instanceof Error) {
          userMessage = error.message;
        }
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: userMessage })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
