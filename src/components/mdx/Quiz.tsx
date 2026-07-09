import { HelpCircle } from "lucide-react";
import type { QuizProps } from "@/types";

export function Quiz({ title, children }: QuizProps) {
  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h4 className="text-lg font-bold text-primary">
          {title || "🧠 Quiz"}
        </h4>
      </div>
      <div className="prose-sm text-foreground/80 [&>ul]:list-disc [&>ul]:ml-5 [&>ol]:list-decimal [&>ol]:ml-5 [&>p]:mb-2">
        {children}
      </div>
    </div>
  );
}
