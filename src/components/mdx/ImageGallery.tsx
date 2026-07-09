"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className="my-8">
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 cursor-pointer"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {image.caption && (
              <p className="p-2 text-xs text-muted-foreground text-center">
                {image.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light z-10"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain rounded-lg"
            />
            {images[selectedIndex].caption && (
              <p className="mt-3 text-center text-sm text-white/70">
                {images[selectedIndex].caption}
              </p>
            )}
            <div className="mt-3 flex justify-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex > 0 ? selectedIndex - 1 : images.length - 1
                  );
                }}
                className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition"
                aria-label="Previous image"
              >
                ← Previous
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
                  );
                }}
                className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition"
                aria-label="Next image"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
