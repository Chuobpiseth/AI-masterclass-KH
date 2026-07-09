"use client";

import Image from "next/image";
import type { ImageWithCaptionProps } from "@/types";

export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border/50 shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
