"use client";

import type { AudioPlayerProps } from "@/types";

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className="my-8 rounded-xl border border-border/50 bg-gradient-to-r from-muted/50 to-muted/30 p-5 shadow-sm">
      {title && (
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          🎧 {title}
        </h4>
      )}
      <audio
        controls
        className="w-full"
        preload="metadata"
        aria-label={title || "Audio player"}
      >
        <source src={src} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
