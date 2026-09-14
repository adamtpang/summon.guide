// Live check of the OpenRouter waterfall's second paid fallback.
//
//   node --no-warnings --experimental-transform-types --env-file-if-exists=.env.local \
//     --import ./scripts/node-server-shim.mjs scripts/test-openrouter-fallback.mjs
//
// 1. Prints the live-ranked queue and checks it holds two paid models from
//    different vendors when the catalog allows.
// 2. Forces a four-model queue whose first request window cannot answer
//    (two retired free models plus an invalid model id, which OpenRouter
//    rejects for the whole request) and checks both the non-streaming and the
//    streaming paths still answer from the fourth model.
// Costs a few cents of paid tokens. Needs OPENROUTER_API_KEY.

const { getOpenRouterModelQueue, completeOpenRouter, streamOpenRouter } = await import("../src/lib/openrouter.ts");

let failures = 0;
const check = (label, ok, detail) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
  if (!ok) failures += 1;
};

delete process.env.OPENROUTER_MODEL_QUEUE;
const queue = await getOpenRouterModelQueue();
console.log("live queue:", queue.map((c) => `${c.id} [${c.tier}]`).join(" -> "));
const paid = queue.filter((c) => c.tier === "discounted");
check("live queue has two paid models", paid.length === 2, `${paid.length} paid`);
if (paid.length === 2) {
  const [a, b] = paid.map((c) => c.id.split("/")[0]);
  check("paid models come from different vendors", a !== b, `${a} and ${b}`);
}
check("live queue within the four-model cap", queue.length <= 4, `${queue.length} models`);

const FOURTH = "deepseek/deepseek-v4.1-flash";
process.env.OPENROUTER_MODEL_QUEUE = [
  "z-ai/glm-5.2:free",
  "minimax/minimax-m3:free",
  "nonexistent-vendor/not-a-real-model",
  FOURTH,
].join(",");
const ask = [{ role: "user", content: "Reply with only the word ok." }];

try {
  const done = await completeOpenRouter({ system: "You reply tersely.", messages: ask, maxTokens: 600 });
  check("non-streaming answers after the first window fails", Boolean(done.text.trim()), `${done.meta.model}, depth ${done.meta.fallbackDepth}, "${done.text.trim().slice(0, 20)}"`);
  check("non-streaming answer came from the fourth model", done.meta.model.startsWith(FOURTH), done.meta.model);
} catch (error) {
  check("non-streaming answers after the first window fails", false, error.message);
}

const response = streamOpenRouter({ system: "You reply tersely.", messages: ask, maxTokens: 600, logLabel: "test/fallback" });
const raw = await response.text();
let text = "";
let meta = null;
let streamError = null;
for (const line of raw.split("\n")) {
  if (!line.startsWith("data: ")) continue;
  const payload = line.slice(6).trim();
  if (payload === "[DONE]") continue;
  try {
    const obj = JSON.parse(payload);
    if (obj.text) text += obj.text;
    if (obj.meta) meta = obj.meta;
    if (obj.error) streamError = obj.error;
  } catch {}
}
check("streaming answers after the first window fails", Boolean(text.trim()) && !streamError, streamError || `${meta?.model}, depth ${meta?.fallbackDepth}, "${text.trim().slice(0, 20)}"`);
check("streaming answer came from the fourth model", Boolean(meta?.model?.startsWith(FOURTH)), meta?.model);

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
