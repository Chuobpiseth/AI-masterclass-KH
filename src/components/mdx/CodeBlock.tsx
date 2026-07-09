"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ children, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl border border-border/50 bg-[#0d1117] overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium text-white/50">
          {title || language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
          aria-label="Copy code"
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
      <pre className="overflow-x-auto p-4">
        <code className="text-sm leading-relaxed text-[#e6edf3] font-mono">
          {children}
        </code>
      </pre>
    </div>
  );
}
