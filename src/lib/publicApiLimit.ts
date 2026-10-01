import { createHash } from "node:crypto";

/** Per-instance burst protection. No distributed quota or billing guarantee. */
export function createBurstLimit(limit = 60, windowMs = 60000, capacity = 10000) {
  const buckets = new Map<string, { count: number; reset: number }>();
  return (key: string, now = Date.now()) => {
    let bucket = buckets.get(key);
    if (!bucket || bucket.reset <= now) {
      if (buckets.size >= capacity) {
        for (const [id, value] of buckets) if (value.reset <= now) buckets.delete(id);
        if (buckets.size >= capacity) return false;
      }
      bucket = { count: 0, reset: now + windowMs }; buckets.set(key, bucket);
    }
    if (bucket.count >= limit) return false;
    bucket.count++; return true;
  };
}
const allow = createBurstLimit();
export function allowPublicRequest(req: Request) {
  const ip = req.headers.get(process.env.VERCEL ? "x-vercel-forwarded-for" : "x-forwarded-for")?.split(",")[0].trim() || "unknown";
  return allow(createHash("sha256").update(ip).digest("hex"));
}

export async function readPublicBody(req: Request) {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > 4096) throw new Error("Request too large");
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}

export const publicApiHeaders = { "Access-Control-Allow-Origin": "*", "Cache-Control": "private, no-store" };
