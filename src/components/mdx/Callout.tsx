import {
  Info,
  AlertTriangle,
  Lightbulb,
  StickyNote,
  AlertCircle,
} from "lucide-react";
import type { CalloutProps } from "@/types";

const calloutStyles = {
  info: {
    bg: "bg-blue-500/5 border-blue-500/30",
    icon: Info,
    iconColor: "text-blue-500",
    titleColor: "text-blue-700 dark:text-blue-400",
  },
  warning: {
    bg: "bg-amber-500/5 border-amber-500/30",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    titleColor: "text-amber-700 dark:text-amber-400",
  },
  tip: {
    bg: "bg-emerald-500/5 border-emerald-500/30",
    icon: Lightbulb,
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-700 dark:text-emerald-400",
  },
  note: {
    bg: "bg-purple-500/5 border-purple-500/30",
    icon: StickyNote,
    iconColor: "text-purple-500",
    titleColor: "text-purple-700 dark:text-purple-400",
  },
  important: {
    bg: "bg-rose-500/5 border-rose-500/30",
    icon: AlertCircle,
    iconColor: "text-rose-500",
    titleColor: "text-rose-700 dark:text-rose-400",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div
      className={`my-6 rounded-xl border-l-4 ${style.bg} p-5`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconColor}`}
          aria-hidden="true"
        />
        <div className="min-w-0">
          {title && (
            <p className={`mb-1 font-semibold ${style.titleColor}`}>{title}</p>
          )}
          <div className="text-sm leading-relaxed text-foreground/80 [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
