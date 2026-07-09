"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import type { PromptExampleProps } from "@/types";

export function PromptExample({
  prompt,
  label,
  platform = "ChatGPT",
}: PromptExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5 bg-primary/5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {label || `${platform} Prompt`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label="Copy prompt"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="p-4">
        <p className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {prompt}
        </p>
      </div>
    </div>
  );
}
