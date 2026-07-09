import { ClipboardList } from "lucide-react";
import type { HomeworkProps } from "@/types";

export function Homework({ title, children }: HomeworkProps) {
  return (
    <div className="my-8 rounded-xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <ClipboardList className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <h4 className="text-lg font-bold text-amber-700 dark:text-amber-400">
          {title || "📝 Homework"}
        </h4>
      </div>
      <div className="prose-sm text-foreground/80 [&>ul]:list-disc [&>ul]:ml-5 [&>ol]:list-decimal [&>ol]:ml-5 [&>p]:mb-2">
        {children}
      </div>
    </div>
  );
}
