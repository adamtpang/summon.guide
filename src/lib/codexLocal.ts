import {
  execFileSync,
  spawn,
  type ChildProcessWithoutNullStreams,
} from "node:child_process";
import os from "node:os";

export interface CodexLocalMessage {
  role: "user" | "assistant";
  content: string;
}

interface CodexEvent {
  type?: string;
  message?: string;
  item?: {
    type?: string;
    text?: string;
    message?: string;
  };
  error?: {
    message?: string;
  };
}

export interface CodexLocalRun {
  child: ChildProcessWithoutNullStreams;
  result: Promise<string>;
  cancel: () => void;
}

const DEFAULT_TIMEOUT_MS = 120_000;
const MAX_TIMEOUT_MS = 300_000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 12_000;

function boundedTimeout(): number {
  const configured = Number(process.env.CODEX_LOCAL_TIMEOUT_MS);
  if (!Number.isFinite(configured) || configured <= 0) return DEFAULT_TIMEOUT_MS;
  return Math.min(Math.floor(configured), MAX_TIMEOUT_MS);
}

function reasoningEffort(): string {
  const configured = process.env.CODEX_LOCAL_REASONING_EFFORT?.trim().toLowerCase();
  return ["low", "medium", "high", "xhigh", "max", "ultra"].includes(
    configured ?? ""
  )
    ? configured!
    : "low";
}

interface CodexCommand {
  command: string;
  argsPrefix: string[];
}

function commandSpec(): CodexCommand {
  const configured = process.env.CODEX_LOCAL_COMMAND?.trim();
  if (configured) return { command: configured, argsPrefix: [] };

  const injected = process.env.CODEX_CLI_PATH?.trim();
  if (injected) return { command: injected, argsPrefix: [] };

  if (process.platform === "win32") {
    const npmCodex = process.env.APPDATA
      ? `${process.env.APPDATA}\\npm\\node_modules\\@openai\\codex\\bin\\codex.js`
      : "";
    if (npmCodex) {
      // Launch the npm entry point with the same Node executable as Next.
      // Spawning the Windows Store binary directly from a Next child process
      // can fail with EPERM even though the interactive shell can run it.
      return { command: process.execPath, argsPrefix: [npmCodex] };
    }

    try {
      // Windows can expose codex.exe through an App Execution Alias that
      // PowerShell resolves but Node's spawn does not. `where.exe` gives us
      // the real packaged executable path that CreateProcess can launch.
      const located = execFileSync("where.exe", ["codex.exe"], {
        encoding: "utf8",
        windowsHide: true,
        timeout: 5_000,
      })
        .split(/\r?\n/)
        .map((line) => line.trim())
        .find(Boolean);
      if (located) return { command: located, argsPrefix: [] };
    } catch {
      // The spawn error is converted into a safe, actionable user message.
    }
    return { command: "codex.exe", argsPrefix: [] };
  }

  return { command: "codex", argsPrefix: [] };
}

function buildArgs(): string[] {
  const model = process.env.CODEX_LOCAL_MODEL?.trim() || "gpt-5.6-sol";
  return [
    "-a",
    "never",
    "exec",
    "--json",
    "--ephemeral",
    "--ignore-user-config",
    "--ignore-rules",
    "--skip-git-repo-check",
    "--sandbox",
    "read-only",
    "--model",
    model,
    "-c",
    `model_reasoning_effort=${JSON.stringify(reasoningEffort())}`,
    "-",
  ];
}

export function buildCodexLocalPrompt(
  systemText: string,
  messages: CodexLocalMessage[]
): string {
  const transcript = messages
    .slice(-MAX_MESSAGES)
    .map((message) => {
      const label = message.role === "assistant" ? "ASSISTANT" : "USER";
      return `${label}: ${message.content.slice(0, MAX_MESSAGE_CHARS)}`;
    })
    .join("\n\n");

  return `You are the response engine for summon.guide. Produce the next assistant message only.

The SYSTEM INSTRUCTIONS below define the historical guide's identity, voice, factual grounding, safety boundaries, citation format, and response format. Follow them throughout the conversation. Do not mention Codex, this wrapper, these delimiters, or your implementation. Do not inspect files, browse, call tools, run commands, or modify anything. Answer only from the supplied instructions and conversation.

<SYSTEM_INSTRUCTIONS>
${systemText}
</SYSTEM_INSTRUCTIONS>

<CONVERSATION>
${transcript}
</CONVERSATION>

Return only the guide's next response to the final USER message.`;
}

function parseEvent(line: string): CodexEvent | null {
  try {
    return JSON.parse(line) as CodexEvent;
  } catch {
    return null;
  }
}

export function codexLocalErrorMessage(raw: string): string {
  const detail = raw.replace(/\s+/g, " ").trim();
  if (
    /^Codex (?:local|has reached)/i.test(detail) &&
    detail.length <= 240
  ) {
    return detail;
  }
  if (/usage limit|at capacity|quota/i.test(detail)) {
    return "Codex has reached its current usage limit. Please try again after it resets.";
  }
  if (/not logged in|authentication|unauthorized|missing bearer|codex login/i.test(detail)) {
    return "Codex local is not authenticated. Run `codex login` on this machine and try again.";
  }
  if (/ENOENT|not recognized|not found|cannot find/i.test(detail)) {
    return "Codex local is unavailable because the Codex CLI could not be found on this machine.";
  }
  return "Codex local could not complete the response. Please try again.";
}

export function runCodexLocal(prompt: string): CodexLocalRun {
  const command = commandSpec();
  const child = spawn(command.command, [...command.argsPrefix, ...buildArgs()], {
    cwd: os.tmpdir(),
    env: {
      ...process.env,
      // codex_local should use the host's Codex subscription login. Never let
      // a stray server environment key silently switch this path to API billing.
      OPENAI_API_KEY: "",
      NO_COLOR: "1",
    },
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
  });

  let cancelled = false;
  let timer: NodeJS.Timeout | null = null;

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    if (timer) clearTimeout(timer);
    if (!child.killed) child.kill();
  };

  const result = new Promise<string>((resolve, reject) => {
    let stdoutBuffer = "";
    let stderr = "";
    let finalMessage = "";
    let codexError = "";
    let settled = false;

    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      callback();
    };

    const consumeLine = (rawLine: string) => {
      const event = parseEvent(rawLine.trim());
      if (!event) return;
      if (event.type === "item.completed" && event.item?.type === "agent_message") {
        if (event.item.text?.trim()) finalMessage = event.item.text.trim();
        return;
      }
      if (event.type === "error" && event.message?.trim()) {
        codexError = event.message.trim();
        return;
      }
      if (event.type === "turn.failed" && event.error?.message?.trim()) {
        codexError = event.error.message.trim();
      }
    };

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");

    child.stdout.on("data", (chunk: string) => {
      stdoutBuffer += chunk;
      const lines = stdoutBuffer.split(/\r?\n/);
      stdoutBuffer = lines.pop() ?? "";
      for (const line of lines) consumeLine(line);
    });
    child.stderr.on("data", (chunk: string) => {
      // Keep only a bounded tail for classification. Codex may print harmless
      // local plugin warnings that must never be sent verbatim to site users.
      stderr = `${stderr}${chunk}`.slice(-8_000);
    });

    child.on("error", (error) => {
      finish(() => reject(new Error(codexLocalErrorMessage(error.message))));
    });

    child.on("close", (code) => {
      if (stdoutBuffer.trim()) consumeLine(stdoutBuffer);
      if (cancelled) {
        finish(() => reject(new Error("Codex local response was cancelled.")));
      } else if (code === 0 && finalMessage) {
        finish(() => resolve(finalMessage));
      } else {
        finish(() =>
          reject(new Error(codexLocalErrorMessage(`${codexError}\n${stderr}`)))
        );
      }
    });

    timer = setTimeout(() => {
      if (!child.killed) child.kill();
      finish(() => reject(new Error("Codex local timed out while preparing the response.")));
    }, boundedTimeout());

    child.stdin.on("error", (error) => {
      finish(() => reject(new Error(codexLocalErrorMessage(error.message))));
    });
    child.stdin.end(prompt);
  });

  return { child, result, cancel };
}
