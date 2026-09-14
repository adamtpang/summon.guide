import "server-only";

import type { ChatMessageInput, ModelRouteMeta } from "@/lib/aiTypes";

const CHAT_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODELS_URL = "https://openrouter.ai/api/v1/models";
const CATALOG_TTL_MS = 6 * 60 * 60 * 1000;
const MIN_CONTEXT_LENGTH = 128_000;

// Used only when the live catalog cannot be reached. The normal path ranks
// the current catalog, like waterfall.sh, so expired preview models are not
// allowed to become permanent infrastructure.
const FALLBACK_QUEUE = [
  "z-ai/glm-5.2:free",
  "minimax/minimax-m3:free",
  "openai/gpt-oss-120b",
];

interface OpenRouterModel {
  id?: string;
  name?: string;
  context_length?: number;
  architecture?: {
    input_modalities?: string[];
    output_modalities?: string[];
  };
  pricing?: {
    prompt?: string;
    completion?: string;
  };
  top_provider?: {
    max_completion_tokens?: number;
  };
  benchmarks?: {
    artificial_analysis?: {
      intelligence_index?: number;
    };
  };
  reasoning?: {
    mandatory?: boolean;
  };
}

export interface ModelCandidate {
  id: string;
  name: string;
  tier: "free" | "discounted";
  promptPerMillion: number;
  completionPerMillion: number;
  intelligence: number | null;
}

interface CatalogCache {
  expiresAt: number;
  queue: ModelCandidate[];
}

let catalogCache: CatalogCache | null = null;

export class OpenRouterError extends Error {
  constructor(
    message: string,
    public readonly status = 500,
  ) {
    super(message);
    this.name = "OpenRouterError";
  }
}

function apiKey(): string {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) {
    throw new OpenRouterError(
      "OPENROUTER_API_KEY is not configured on the server.",
      500,
    );
  }
  return key;
}

function parseNumber(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function candidateFromModel(model: OpenRouterModel): ModelCandidate | null {
  const id = model.id?.trim();
  if (!id || id.startsWith("~") || id.includes(":batch")) return null;
  if (/safety|guard|moderation|music|audio|image|embedding/i.test(id)) return null;

  const inputModalities = model.architecture?.input_modalities || [];
  const outputModalities = model.architecture?.output_modalities || [];
  if (!inputModalities.includes("text") || !outputModalities.includes("text")) return null;
  if ((model.context_length || 0) < MIN_CONTEXT_LENGTH) return null;
  if ((model.top_provider?.max_completion_tokens || 0) < 1_024) return null;

  const prompt = parseNumber(model.pricing?.prompt);
  const completion = parseNumber(model.pricing?.completion);
  if (prompt === null || completion === null || prompt < 0 || completion < 0) return null;

  return {
    id,
    name: model.name?.replace(/\s*\(free\)\s*$/i, "").trim() || id,
    tier: prompt === 0 && completion === 0 ? "free" : "discounted",
    promptPerMillion: prompt * 1_000_000,
    completionPerMillion: completion * 1_000_000,
    intelligence: parseNumber(model.benchmarks?.artificial_analysis?.intelligence_index),
  };
}

function explicitQueue(): ModelCandidate[] | null {
  const configured = process.env.OPENROUTER_MODEL_QUEUE?.trim();
  if (!configured) return null;

  const ids = [...new Set(configured.split(",").map((id) => id.trim()).filter(Boolean))];
  return ids.slice(0, 3).map((id) => ({
    id,
    name: friendlyModelName(id),
    tier: id.endsWith(":free") || id === "openrouter/free" ? "free" : "discounted",
    promptPerMillion: 0,
    completionPerMillion: 0,
    intelligence: null,
  }));
}

function fallbackQueue(): ModelCandidate[] {
  return FALLBACK_QUEUE.map((id) => ({
    id,
    name: friendlyModelName(id),
    tier: id.endsWith(":free") ? "free" : "discounted",
    promptPerMillion: 0,
    completionPerMillion: 0,
    intelligence: null,
  }));
}

function rankQueue(models: OpenRouterModel[]): ModelCandidate[] {
  const candidates = models
    .map(candidateFromModel)
    .filter((candidate): candidate is ModelCandidate => Boolean(candidate));

  const byQualityThenCost = (a: ModelCandidate, b: ModelCandidate) =>
    (b.intelligence ?? -1) - (a.intelligence ?? -1) ||
    a.promptPerMillion + a.completionPerMillion -
      (b.promptPerMillion + b.completionPerMillion);

  const free = candidates
    .filter((candidate) => candidate.tier === "free" && candidate.intelligence !== null)
    .sort(byQualityThenCost)
    .slice(0, 2);

  const maxPrompt = Number(process.env.OPENROUTER_MAX_INPUT_PER_MILLION || 0.25);
  const maxCompletion = Number(process.env.OPENROUTER_MAX_OUTPUT_PER_MILLION || 1.5);
  const discounted = candidates
    .filter(
      (candidate) =>
        candidate.tier === "discounted" &&
        candidate.intelligence !== null &&
        candidate.promptPerMillion <= maxPrompt &&
        candidate.completionPerMillion <= maxCompletion,
    )
    .filter((candidate) => {
      const source = models.find((model) => model.id === candidate.id);
      return source?.reasoning?.mandatory !== true;
    })
    .sort(byQualityThenCost)
    .slice(0, 1);

  const queue = [...free, ...discounted];
  if (!queue.some((candidate) => candidate.tier === "free")) {
    queue.unshift({
      id: "openrouter/free",
      name: "Free Models Router",
      tier: "free",
      promptPerMillion: 0,
      completionPerMillion: 0,
      intelligence: null,
    });
  }

  return queue.length >= 2 ? queue.slice(0, 3) : fallbackQueue();
}

export async function getOpenRouterModelQueue(): Promise<ModelCandidate[]> {
  const configured = explicitQueue();
  if (configured?.length) return configured;
  if (catalogCache && catalogCache.expiresAt > Date.now()) return catalogCache.queue;

  try {
    const response = await fetch(MODELS_URL, {
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`catalog HTTP ${response.status}`);
    const payload = (await response.json()) as { data?: OpenRouterModel[] };
    const queue = rankQueue(payload.data || []);
    catalogCache = { expiresAt: Date.now() + CATALOG_TTL_MS, queue };
    return queue;
  } catch (error) {
    console.error(
      "[openrouter] live model catalog unavailable, using fallback queue:",
      error instanceof Error ? error.message : error,
    );
    return fallbackQueue();
  }
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey()}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://summon.guide",
    "X-Title": "summon.guide",
  };
}

function messagesForRequest(system: string, messages: ChatMessageInput[]) {
  return [
    { role: "system" as const, content: system },
    ...messages.map((message) => ({
      role: message.role,
      content: String(message.content || ""),
    })),
  ];
}

async function errorFromResponse(response: Response): Promise<OpenRouterError> {
  let detail = "";
  try {
    const payload = (await response.json()) as { error?: { message?: string } };
    detail = payload.error?.message || "";
  } catch {
    detail = (await response.text().catch(() => "")).slice(0, 240);
  }
  return new OpenRouterError(
    detail || `OpenRouter request failed with HTTP ${response.status}.`,
    response.status,
  );
}

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const candidate = part as { type?: string; text?: string };
      return candidate.type === "text" ? candidate.text || "" : "";
    })
    .join("");
}

function friendlyModelName(id: string): string {
  return id
    .split("/")
    .pop()!
    .replace(/:free$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function routeMeta(
  actualModel: string,
  queue: ModelCandidate[],
): ModelRouteMeta {
  const candidate = queue.find((item) => item.id === actualModel);
  const fallbackDepth = Math.max(
    0,
    queue.findIndex((item) => item.id === actualModel),
  );
  return {
    provider: "OpenRouter",
    model: actualModel,
    modelLabel: candidate?.name || friendlyModelName(actualModel),
    tier:
      candidate?.tier ||
      (actualModel.endsWith(":free") ? "free" : "discounted"),
    fallbackDepth,
  };
}

export async function completeOpenRouter(options: {
  system: string;
  messages: ChatMessageInput[];
  maxTokens?: number;
  temperature?: number;
}): Promise<{ text: string; meta: ModelRouteMeta }> {
  const queue = await getOpenRouterModelQueue();
  let remaining = [...queue];

  while (remaining.length) {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: headers(),
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        models: remaining.map((candidate) => candidate.id),
        messages: messagesForRequest(options.system, options.messages),
        provider: { allow_fallbacks: true, data_collection: "deny" },
        max_tokens: options.maxTokens || 1_024,
        temperature: options.temperature ?? 0.4,
      }),
    });

    if (!response.ok) throw await errorFromResponse(response);
    const payload = (await response.json()) as {
      model?: string;
      choices?: { message?: { content?: unknown }; finish_reason?: string }[];
    };
    const actualModel = payload.model || remaining[0].id;
    const text = textFromContent(payload.choices?.[0]?.message?.content).trim();
    if (text) {
      const meta = routeMeta(actualModel, queue);
      console.info(
        `[openrouter/complete] ${meta.tier} model ${meta.model}, fallback depth ${meta.fallbackDepth}`,
      );
      return { text, meta };
    }

    // waterfall.sh found that reasoning models can return HTTP 200 with empty
    // content after consuming the output budget. Treat that as failure and
    // continue after the model that actually answered.
    const usedIndex = remaining.findIndex((candidate) => candidate.id === actualModel);
    remaining = remaining.slice(usedIndex >= 0 ? usedIndex + 1 : 1);
  }

  throw new OpenRouterError("Every model returned an empty response.", 502);
}

function userFacingError(error: unknown): string {
  if (!(error instanceof OpenRouterError)) {
    return error instanceof Error ? error.message : "The model waterfall failed.";
  }
  if (error.status === 401) return "The OpenRouter key is invalid. The site owner needs to replace it.";
  if (error.status === 402) return "The free models are unavailable and the OpenRouter spending limit was reached.";
  if (error.status === 429) return "Every model in the waterfall is busy. Please try again shortly.";
  if (error.status >= 500) return "The model waterfall is temporarily unavailable. Please try again.";
  return error.message;
}

export function streamOpenRouter(options: {
  system: string;
  messages: ChatMessageInput[];
  maxTokens?: number;
  temperature?: number;
  logLabel: string;
  /**
   * Optional OpenRouter reasoning controls. Reasoning models spend part of
   * max_tokens thinking before any visible text; bounding it keeps room for
   * the answer. Omitted means provider defaults, as before.
   */
  reasoning?: { max_tokens?: number; effort?: "low" | "medium" | "high"; exclude?: boolean };
  /**
   * How many times to re-run the final candidate when the whole waterfall
   * produced no visible text (an empty stream, or a provider error before any
   * text). Default 0 keeps the original behavior.
   */
  retryEmpty?: number;
}): Response {
  const encoder = new TextEncoder();
  const emit = (controller: ReadableStreamDefaultController<Uint8Array>, value: unknown) =>
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(value)}\n\n`));

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      let queue: ModelCandidate[] = [];
      let remaining: ModelCandidate[] = [];

      try {
        queue = await getOpenRouterModelQueue();
        remaining = [...queue];
        let emptyRetriesLeft = options.retryEmpty ?? 0;

        while (remaining.length) {
          const response = await fetch(CHAT_URL, {
            method: "POST",
            headers: headers(),
            signal: AbortSignal.timeout(120_000),
            body: JSON.stringify({
              models: remaining.map((candidate) => candidate.id),
              messages: messagesForRequest(options.system, options.messages),
              provider: { allow_fallbacks: true, data_collection: "deny" },
              max_tokens: options.maxTokens || 1_600,
              ...(options.reasoning ? { reasoning: options.reasoning } : {}),
              temperature: options.temperature ?? 0.65,
              stream: true,
              stream_options: { include_usage: true },
            }),
          });

          if (!response.ok) throw await errorFromResponse(response);
          if (!response.body) throw new OpenRouterError("OpenRouter returned no stream.", 502);

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let actualModel = remaining[0].id;
          let emittedMeta = false;
          let hadContent = false;
          let midStreamError: OpenRouterError | null = null;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const frames = buffer.split(/\r?\n\r?\n/);
            buffer = frames.pop() || "";

            for (const frame of frames) {
              const data = frame
                .split(/\r?\n/)
                .filter((line) => line.startsWith("data:"))
                .map((line) => line.slice(5).trimStart())
                .join("\n");
              if (!data || data === "[DONE]") continue;

              let chunk: {
                model?: string;
                error?: { code?: number | string; message?: string };
                choices?: { delta?: { content?: unknown }; finish_reason?: string }[];
              };
              try {
                chunk = JSON.parse(data);
              } catch {
                continue;
              }

              if (chunk.model) actualModel = chunk.model;
              if (chunk.error) {
                midStreamError = new OpenRouterError(
                  chunk.error.message || "OpenRouter stream failed.",
                  Number(chunk.error.code) || 502,
                );
                break;
              }

              const text = textFromContent(chunk.choices?.[0]?.delta?.content);
              if (!text) continue;
              if (!emittedMeta) {
                const meta = routeMeta(actualModel, queue);
                emit(controller, { meta });
                console.info(
                  `[${options.logLabel}] ${meta.tier} model ${meta.model}, fallback depth ${meta.fallbackDepth}`,
                );
                emittedMeta = true;
              }
              hadContent = true;
              emit(controller, { text });
            }
            if (midStreamError) break;
          }

          if (midStreamError) await reader.cancel().catch(() => undefined);
          if (midStreamError && hadContent) throw midStreamError;
          if (hadContent) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            return;
          }

          const usedIndex = remaining.findIndex((candidate) => candidate.id === actualModel);
          const used = remaining[usedIndex >= 0 ? usedIndex : 0];
          remaining = remaining.slice(usedIndex >= 0 ? usedIndex + 1 : 1);
          // Providers intermittently return an empty stream for a request that
          // succeeds on the next attempt. Re-run the last candidate rather than
          // failing the whole answer, when the caller opted in.
          if (!remaining.length && emptyRetriesLeft > 0 && used) {
            emptyRetriesLeft -= 1;
            console.warn(
              `[${options.logLabel}] ${used.id} returned no text; retrying (${emptyRetriesLeft} left)`,
            );
            remaining = [used];
          }
        }

        throw new OpenRouterError("Every model returned an empty response.", 502);
      } catch (error) {
        console.error(
          `[${options.logLabel}] OpenRouter waterfall failed:`,
          error instanceof Error ? error.message : error,
        );
        emit(controller, { error: userFacingError(error) });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
