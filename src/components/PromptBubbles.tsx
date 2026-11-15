"use client";

import { Button } from "@/components/ui/button";

export default function PromptBubbles({ prompts, onSelect, disabled = false }: {
  prompts: string[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}) {
  if (disabled || !prompts.length) return null;
  return <div aria-label="Recommended prompts" className="mb-3 flex max-h-40 flex-wrap gap-2 overflow-y-auto py-1">
    {[...new Set(prompts.map(prompt => prompt.trim()).filter(Boolean))].slice(0, 3).map(prompt => (
      <Button key={prompt} type="button" variant="outline" onClick={() => onSelect(prompt)}
        className="h-auto min-h-11 min-w-0 max-w-full justify-start rounded-[3px] border-edge bg-raised px-4 py-2.5 text-left text-[14px] font-normal leading-snug whitespace-normal text-mist hover:border-lapis hover:bg-raised hover:text-lapis [overflow-wrap:anywhere]">
        {prompt}
      </Button>
    ))}
  </div>;
}
