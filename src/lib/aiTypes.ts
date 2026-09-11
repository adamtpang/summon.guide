export interface ModelRouteMeta {
  provider: "OpenRouter";
  model: string;
  modelLabel: string;
  tier: "free" | "discounted";
  fallbackDepth: number;
}

export interface ChatMessageInput {
  role: "user" | "assistant";
  content: string;
}
