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
  voice = true,
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
  /** Show the microphone. Text-only surfaces pass false. */
  voice?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={
        dark
          ? "rounded-[3px] border border-moon/70 bg-raised p-2 shadow-[0_1px_0_var(--color-moon)] focus-within:border-lapis focus-within:shadow-[0_1px_0_var(--color-lapis)]"
          : "rounded-[3px] border border-moon/70 bg-raised p-2 shadow-[0_1px_0_var(--color-moon)] focus-within:border-lapis focus-within:shadow-[0_1px_0_var(--color-lapis)]"
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
              ? "max-h-36 min-h-12 min-w-0 flex-1 resize-none border-0 bg-transparent px-3 py-3 text-base leading-normal text-[17px] text-moon shadow-none placeholder:text-dim focus-visible:border-0 focus-visible:outline-0 focus-visible:ring-0"
              : "max-h-36 min-h-12 min-w-0 flex-1 resize-none border-0 bg-transparent px-3 py-3 text-base leading-normal text-[17px] text-moon shadow-none placeholder:text-dim focus-visible:border-0 focus-visible:outline-0 focus-visible:ring-0"
          }
        />
        {voice && <VoiceInput disabled={disabled} onText={(text) => { onChange([value.trim(), text].filter(Boolean).join(" ").slice(0, 8000)); textareaRef.current?.focus(); }} />}
        <Button
          type="button"
          size="icon"
          onClick={disabled && onStop ? onStop : onSend}
          disabled={disabled ? !onStop : !value.trim()}
          aria-label={disabled && onStop ? "Stop response" : "Send message"}
          className={
            dark
              ? "size-12 rounded-[2px] bg-lapis text-night hover:bg-lapis-deep"
              : "size-12 rounded-[2px] bg-lapis text-night hover:bg-lapis-deep"
          }
        >
          {disabled && onStop ? <Square className="size-4" /> : <ArrowUp className="size-5" />}
        </Button>
      </div>
    </div>
  );
}
