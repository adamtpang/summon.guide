"use client";

import { useState, useCallback } from "react";

interface CopyableInstallProps {
  /** the slash commands to run inside Claude Code */
  commands: string[];
  /** label shown above the command block */
  label?: string;
  /** small footnote shown under the block */
  footnote?: React.ReactNode;
  /** visual variant — dark for hero placement, soft for inline placement */
  variant?: "dark" | "soft";
}

/**
 * A single copy-pasteable install block. One click puts the entire command
 * sequence on the user's clipboard, ready to paste into a Claude Code session.
 */
export default function CopyableInstall({
  commands,
  label = "Install in Claude Code",
  footnote,
  variant = "dark",
}: CopyableInstallProps) {
  const [copied, setCopied] = useState(false);
  const text = commands.join("\n");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // older browsers — fall back to selectable code block
    }
  }, [text]);

  if (variant === "soft") {
    return (
      <div className="bg-white border border-warm-200 rounded-xl p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-warm-500 text-[11px] tracking-[0.2em] uppercase">
            {label}
          </p>
          <button
            onClick={handleCopy}
            className="text-xs font-medium text-ink-950 hover:text-ink-800 flex items-center gap-1.5 transition-colors"
            aria-label="Copy install commands"
          >
            {copied ? (
              <>
                <CheckIcon /> Copied
              </>
            ) : (
              <>
                <CopyIcon /> Copy
              </>
            )}
          </button>
        </div>
        <pre className="text-[13px] font-mono bg-warm-100 rounded-md p-3 overflow-x-auto leading-relaxed text-ink-950">
          <code>{text}</code>
        </pre>
        {footnote ? (
          <p className="text-warm-500 text-xs mt-3 leading-relaxed">{footnote}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="bg-ink-950 text-white rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase">
          {label}
        </p>
        <button
          onClick={handleCopy}
          className="text-xs font-medium text-white hover:text-white/80 flex items-center gap-1.5 transition-colors"
          aria-label="Copy install commands"
        >
          {copied ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="text-sm font-mono bg-black/40 rounded-lg p-4 overflow-x-auto leading-relaxed">
        <code>{text}</code>
      </pre>
      {footnote ? (
        <p className="text-white/60 text-xs mt-4 leading-relaxed">{footnote}</p>
      ) : null}
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-green-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
