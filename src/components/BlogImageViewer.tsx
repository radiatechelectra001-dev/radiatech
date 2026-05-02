"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogImageViewerProps {
  images: string[];
  title: string;
}

export default function BlogImageViewer({ images, title }: BlogImageViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  const selectedImage = images[selectedIndex];

  const prev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setSelectedIndex((i) => (i + 1) % images.length);

  return (
    <div className="mb-10">
      {/* Main image */}
      <div className="relative overflow-hidden shadow-lg">
        <Image
          src={selectedImage}
          alt={`${title} – image ${selectedIndex + 1}`}
          width={900}
          height={450}
          className="w-full h-[240px] sm:h-[380px] object-cover transition-all duration-300"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight size={20} />
            </button>
            <span className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {selectedIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={`thumb-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all ${
                idx === selectedIndex
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
