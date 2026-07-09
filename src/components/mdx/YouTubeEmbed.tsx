"use client";

import { useState } from "react";
import type { YouTubeEmbedProps } from "@/types";

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="my-8">
      {title && (
        <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          🎬 {title}
        </h4>
      )}
      <div className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-muted/30 shadow-lg aspect-video">
        {!isLoaded && (
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted/80 to-muted transition-all hover:from-muted/60 hover:to-muted/80 cursor-pointer group"
            aria-label={`Play video: ${title || videoId}`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl group-hover:scale-110 transition-transform duration-200">
              <svg
                className="h-7 w-7 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Click to load video
            </span>
          </button>
        )}
        {isLoaded && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || "YouTube Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
