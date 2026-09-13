"use client";

import type { KeyboardEvent, RefObject } from "react";
import { ArrowUp, Square } from "lucide-react";

import VoiceInput from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatComposer({
  value,
  onChange,
  onKeyDown,
  onSend,
  placeholder,
  disabled,
  textareaRef,
  tone = "dark",
  onStop,
}: {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  placeholder: string;
  disabled: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  tone?: "light" | "dark";
  onStop?: () => void;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={
        dark
          ? "rounded-2xl border border-white/10 bg-white/[0.07] p-2 backdrop-blur-md"
          : "rounded-2xl border border-warm-200 bg-white/90 p-2 backdrop-blur-md"
      }
    >
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Message"
          maxLength={8000}
          rows={1}
          disabled={disabled}
          className={
            dark
              ? "max-h-36 min-h-12 min-w-0 flex-1 resize-none border-0 bg-transparent px-3 py-3 text-base leading-normal text-white shadow-none placeholder:text-white/35 focus-visible:border-0 focus-visible:ring-0"
              : "max-h-36 min-h-12 min-w-0 flex-1 resize-none border-0 bg-transparent px-3 py-3 text-base leading-normal text-ink-950 shadow-none placeholder:text-warm-400 focus-visible:border-0 focus-visible:ring-0"
          }
        />
        <VoiceInput disabled={disabled} onText={(text) => { onChange([value.trim(), text].filter(Boolean).join(" ").slice(0, 8000)); textareaRef.current?.focus(); }} />
        <Button
          type="button"
          size="icon"
          onClick={disabled && onStop ? onStop : onSend}
          disabled={disabled ? !onStop : !value.trim()}
          aria-label={disabled && onStop ? "Stop response" : "Send message"}
          className={
            dark
              ? "size-12 rounded-full bg-blue-100 text-neutral-950 hover:bg-blue-200"
              : "size-12 rounded-full bg-ink-950 text-white hover:bg-ink-800"
          }
        >
          {disabled && onStop ? <Square className="size-4" /> : <ArrowUp className="size-5" />}
        </Button>
      </div>
    </div>
  );
}
