"use client";

import { SiGooglegemini, SiAnthropic } from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";
import { BrainCircuit } from "lucide-react";

export function AIIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case "chatgpt":
      return <TbBrandOpenai className={className} />;
    case "gemini":
      return <SiGooglegemini className={className} />;
    case "claude":
      return <SiAnthropic className={className} />;
    case "deepseek":
      return <BrainCircuit className={className} />; // Using generic lucide icon for DeepSeek
    default:
      return <BrainCircuit className={className} />;
  }
}
