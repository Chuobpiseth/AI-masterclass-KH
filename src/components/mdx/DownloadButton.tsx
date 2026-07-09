import { Download } from "lucide-react";
import type { DownloadButtonProps } from "@/types";

export function DownloadButton({
  href,
  filename,
  label,
}: DownloadButtonProps) {
  return (
    <div className="my-6">
      <a
        href={href}
        download={filename}
        className="inline-flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
      >
        <Download className="h-4 w-4" />
        {label || `Download ${filename}`}
      </a>
    </div>
  );
}
