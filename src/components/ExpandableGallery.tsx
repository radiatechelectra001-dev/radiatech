"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import type { PublicGalleryImage } from "@/lib/publicGalleries";

interface ExpandableGalleryProps {
  images: PublicGalleryImage[];
  initialLimit: number;
  gridClassName?: string;
  imageClassName?: string;
  lightbox?: boolean;
}

export default function ExpandableGallery({
  images,
  initialLimit,
  gridClassName = "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6",
  imageClassName = "h-40 sm:h-64",
  lightbox = false,
}: ExpandableGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeImage, setActiveImage] = useState<PublicGalleryImage | null>(null);
  if (images.length === 0) return null;

  const visibleImages = showAll ? images : images.slice(0, initialLimit);

  return (
    <>
      <div>
        <div className={gridClassName}>
          {visibleImages.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden shadow-sm transition-all hover:shadow-xl${lightbox ? " cursor-pointer" : ""}`}
              onClick={lightbox ? () => setActiveImage(item) : undefined}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={350}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageClassName}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                </div>
                {lightbox && (
                  <div className="absolute right-3 top-3">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {images.length > initialLimit && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="inline-flex items-center gap-2 border-2 border-primary px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {showAll ? "Show Less" : "View All"}
              {showAll ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </button>
          </div>
        )}
      </div>

      {lightbox && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setActiveImage(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div
            className="relative mx-auto max-h-[90vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.image}
              alt={activeImage.title}
              width={1200}
              height={800}
              className="mx-auto max-h-[85vh] w-auto object-contain"
              unoptimized
            />
            {activeImage.title && (
              <p className="mt-3 text-center text-sm text-white/80">{activeImage.title}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}