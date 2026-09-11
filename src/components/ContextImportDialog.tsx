"use client";

import { useState } from "react";
import { Check, Copy, FileInput, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Provider = "chatgpt" | "claude";

const SHARED_BRIEF = `Create a privacy-conscious personal context brief that I can paste into summon.guide so it can match me with the right specialist.

Use only what I have explicitly shared or what is strongly supported by our conversations. Do not invent details. Mark uncertainty clearly.

Return only this Markdown structure:

# Personal context
## Current situation
What is happening in my life and work right now.

## Problems I want to solve
The recurring problems, tensions, or decisions I am facing.

## Goals
What I am trying to change, build, learn, or become.

## Priorities
What matters most to me now, in order.

## Constraints
Time, money, energy, responsibilities, risks, or commitments that shape my options.

## Patterns
Repeated behaviors, strengths, blind spots, and ways I tend to get stuck.

## Guidance that works for me
The tone, level of directness, and kind of help I respond to best.

## Open questions
Important things you do not know and should not guess.

Keep it under 700 words. Exclude passwords, account numbers, precise addresses, private keys, government IDs, and identifying information about other people. Omit sensitive medical, financial, or relationship details unless I explicitly shared them and they are essential to the guidance.`;

const PROMPTS: Record<Provider, string> = {
  chatgpt: `You are ChatGPT. Use the memories and conversation context you are allowed to access about me.\n\n${SHARED_BRIEF}`,
  claude: `You are Claude. Use the context available in this conversation or project about me.\n\n${SHARED_BRIEF}`,
};

export default function ContextImportDialog({
  onUseContext,
}: {
  onUseContext: (context: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pastedContext, setPastedContext] = useState("");
  const [copied, setCopied] = useState<Provider | null>(null);

  const copyPrompt = async (provider: Provider) => {
    await navigator.clipboard.writeText(PROMPTS[provider]);
    setCopied(provider);
    window.setTimeout(() => setCopied(null), 1800);
  };

  const useContext = () => {
    const context = pastedContext.trim();
    if (!context) return;
    onUseContext(context);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(true)}
        className="h-11 rounded-full px-3 text-xs font-normal text-white/65 hover:bg-white/10 hover:text-white"
      >
        <FileInput className="size-4" />
        Bring context from ChatGPT or Claude
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-2xl bg-warm-50 p-0 ring-1 ring-ink-950/10 sm:max-w-2xl">
          <DialogHeader className="border-b border-warm-200 px-5 py-5 pr-12 sm:px-7">
            <p className="text-[11px] tracking-[0.22em] text-warm-500 uppercase">
              Import personal context
            </p>
            <DialogTitle className="font-serif text-2xl font-medium leading-tight text-ink-950">
              Let your current AI introduce you.
            </DialogTitle>
            <DialogDescription className="max-w-xl leading-relaxed text-warm-500">
              Copy one prompt into the assistant that already knows you. Paste
              its brief below, then Summon will route your real priorities to
              the most relevant guide.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 px-5 py-6 sm:px-7">
            <section aria-labelledby="extract-step">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink-950 font-mono text-[10px] text-white">
                  1
                </span>
                <div>
                  <h3 id="extract-step" className="text-sm font-medium text-ink-950">
                    Ask your AI for a context brief
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-warm-500">
                    The prompt asks it to separate facts from uncertainty and
                    omit credentials or precise identifiers.
                  </p>
                </div>
              </div>

              <Tabs defaultValue="chatgpt" className="gap-3">
                <TabsList className="h-auto min-h-11 rounded-lg bg-warm-100 p-1">
                  <TabsTrigger value="chatgpt" className="min-h-11 min-w-28 rounded-md px-3">
                    ChatGPT
                  </TabsTrigger>
                  <TabsTrigger value="claude" className="min-h-11 min-w-28 rounded-md px-3">
                    Claude
                  </TabsTrigger>
                </TabsList>
                {(["chatgpt", "claude"] as Provider[]).map((provider) => (
                  <TabsContent key={provider} value={provider} className="space-y-2">
                    <Textarea
                      readOnly
                      value={PROMPTS[provider]}
                      aria-label={`${provider} extraction prompt`}
                      className="h-44 resize-none rounded-xl border-warm-200 bg-white px-4 py-3 font-mono text-[11px] leading-relaxed text-ink-950/75 focus-visible:border-ink-950 focus-visible:ring-ink-950/10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => copyPrompt(provider)}
                      className="h-11 rounded-full border-warm-300 bg-white px-4 text-xs text-ink-950 hover:bg-warm-100"
                    >
                      {copied === provider ? <Check /> : <Copy />}
                      {copied === provider ? "Copied" : "Copy extraction prompt"}
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            <section aria-labelledby="paste-step">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink-950 font-mono text-[10px] text-white">
                  2
                </span>
                <div>
                  <h3 id="paste-step" className="text-sm font-medium text-ink-950">
                    Paste the brief here
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-warm-500">
                    Review and remove anything you do not want to send before
                    using it.
                  </p>
                </div>
              </div>
              <Textarea
                value={pastedContext}
                onChange={(event) => setPastedContext(event.target.value)}
                placeholder="# Personal context\n## Current situation\n..."
                className="min-h-36 rounded-xl border-warm-200 bg-white px-4 py-3 text-base leading-relaxed text-ink-950 placeholder:text-warm-400 focus-visible:border-ink-950 focus-visible:ring-ink-950/10"
              />
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-warm-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-[11px] leading-relaxed text-warm-500">
                <ShieldCheck className="size-4 shrink-0" />
                Summon does not save this brief to your account.
              </p>
              <Button
                type="button"
                onClick={useContext}
                disabled={!pastedContext.trim()}
                className="h-11 rounded-full bg-ink-950 px-5 text-white hover:bg-ink-800"
              >
                Use this context
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
