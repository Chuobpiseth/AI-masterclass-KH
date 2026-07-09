"use client";

import type { PDFViewerProps } from "@/types";

export function PDFViewer({
  driveId,
  title,
  height = "600px",
}: PDFViewerProps) {
  const embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;

  return (
    <div className="my-8">
      {title && (
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          📄 {title}
        </h4>
      )}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30 shadow-lg"
        style={{ height }}
      >
        <iframe
          src={embedUrl}
          title={title || "PDF Document"}
          className="h-full w-full"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      </div>
    </div>
  );
}
