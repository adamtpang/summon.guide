import { auth } from "@/auth";
import {
  buildContextPrompt,
  buildQuestionsSystemPrompt,
  FALLBACK_QUESTIONS,
  MAX_PROBLEM_CHARS,
  parseQuestions,
} from "@/lib/councilThread";
import { authenticateMcpToken } from "@/lib/membership";
import { completeOpenRouter } from "@/lib/openrouter";
import { NextRequest } from "next/server";

// POST /api/council/questions
//
// Body: { problem: string }
// Returns: { questions, prompt, generatedBy }
//
// Writes questions tailored to the problem and wraps them in a prompt the
// user runs in their own Claude or Codex session. Falls back to a fixed set
// when the router is unavailable, so the step never blocks.

const privateHeaders = { "Cache-Control": "private, no-store" };

export async function POST(req: NextRequest) {
  const session = await auth();
  const mcpUserId = session?.user?.id ? null : await authenticateMcpToken(req.headers.get("authorization"));
  if (!session?.user?.id && !mcpUserId) {
    return Response.json({ error: "Sign in to prepare your council" }, { status: 401, headers: privateHeaders });
  }

  let body: { problem?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const problem = typeof body.problem === "string" ? body.problem.trim() : "";
  if (problem.length < 15) {
    return Response.json({ error: "Describe the problem in at least a sentence" }, { status: 400, headers: privateHeaders });
  }
  if (problem.length > MAX_PROBLEM_CHARS) {
    return Response.json({ error: `Keep the problem under ${MAX_PROBLEM_CHARS.toLocaleString()} characters` }, { status: 400, headers: privateHeaders });
  }

  let questions = FALLBACK_QUESTIONS;
  let generatedBy: "model" | "fallback" = "fallback";
  try {
    const response = await completeOpenRouter({
      system: buildQuestionsSystemPrompt(),
      messages: [{ role: "user", content: problem }],
      maxTokens: 900,
      temperature: 0.3,
    });
    questions = parseQuestions(response.text);
    generatedBy = "model";
  } catch (error) {
    console.error("[council/questions] using fallback questions:", error instanceof Error ? error.message : error);
  }

  return Response.json(
    { questions, prompt: buildContextPrompt(problem, questions), generatedBy },
    { headers: privateHeaders },
  );
}
