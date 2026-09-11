import type { ModelRouteMeta } from "@/lib/aiTypes";

interface ChatStreamEvent {
  text?: string;
  error?: string;
  meta?: ModelRouteMeta;
}

async function responseError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as {
      error?: string;
      message?: string;
    };
    return payload.error || payload.message || `Chat failed (${response.status}).`;
  } catch {
    return `Chat failed (${response.status}).`;
  }
}

export async function readChatStream(
  response: Response,
  options: {
    onText: (text: string) => void;
    onMeta: (meta: ModelRouteMeta) => void;
  },
): Promise<string> {
  if (!response.ok) throw new Error(await responseError(response));
  const reader = response.body?.getReader();
  if (!reader) throw new Error("The chat response did not include a stream.");

  const decoder = new TextDecoder();
  let buffer = "";
  let accumulated = "";

  const consumeFrame = (frame: string) => {
    const data = frame
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data || data === "[DONE]") return;

    let event: ChatStreamEvent;
    try {
      event = JSON.parse(data) as ChatStreamEvent;
    } catch {
      return;
    }
    if (event.error) throw new Error(event.error);
    if (event.meta) options.onMeta(event.meta);
    if (event.text) {
      accumulated += event.text;
      options.onText(accumulated);
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const frames = buffer.split(/\r?\n\r?\n/);
      buffer = frames.pop() || "";
      frames.forEach(consumeFrame);
    }
    buffer += decoder.decode();
    if (buffer.trim()) consumeFrame(buffer);
    return accumulated;
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  }
}
