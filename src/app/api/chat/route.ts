import Anthropic from "@anthropic-ai/sdk";
import { anthropicClient } from "@/lib/anthropic";
import { getFigure, AI_CONFIG } from "@/lib/figures";
import { NextRequest } from "next/server";

// API key (metered credits) by default, or a Claude subscription OAuth token
// when ANTHROPIC_AUTH_TOKEN is set. See src/lib/anthropic.ts.
const anthropic = anthropicClient();

export async function POST(req: NextRequest) {
  const { figure: figureSlug, messages } = await req.json();

  const figure = getFigure(figureSlug);
  if (!figure) {
    return Response.json({ error: "Figure not found" }, { status: 404 });
  }

  // The per-figure system prompt is ~4K tokens (biographical context +
  // knowledge base + response rules). It is identical across every turn of
  // a conversation, so we cache it as the prefix and pay full price only on
  // the first turn. Cache reads bill at ~10% of input price.
  // See https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
  const stream = anthropic.messages.stream({
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    system: [
      {
        type: "text",
        text: figure.systemPrompt,
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
        // Distinguish auth errors (invalid/missing ANTHROPIC_API_KEY) from
        // other failures so a runtime config issue surfaces clearly in the UI.
        let userMessage = "Stream error";
        if (error instanceof Anthropic.AuthenticationError) {
          userMessage =
            "Server is missing a valid Anthropic API key. Please contact the site owner.";
        } else if (error instanceof Anthropic.RateLimitError) {
          userMessage = "Rate limited — please try again in a moment.";
        } else if (error instanceof Anthropic.APIError) {
          const detail = error.message?.slice(0, 200) || "";
          // Always log the full detail — billing errors and bad model ids
          // both read as a bare "400" in the UI otherwise (that ambiguity
          // once cost days of debugging).
          console.error("[chat] Anthropic APIError", error.status, detail);
          // The most common operational failure is an empty API credit
          // balance (a 400 whose message mentions "credit balance"). Give
          // users a calm, honest message instead of raw billing text.
          if (/credit balance/i.test(detail)) {
            userMessage =
              "The guides are resting for a moment — the site is topping up. Please try again shortly.";
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
