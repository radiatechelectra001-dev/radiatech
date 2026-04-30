"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const galleryImages = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);
  const [selectedImage, setSelectedImage] = useState(galleryImages[0] || "");
  const activeImage = galleryImages.includes(selectedImage) ? selectedImage : galleryImages[0];

  if (!activeImage) return null;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden bg-gray-50 shadow-lg">
        <Image src={activeImage} alt={productName} width={600} height={500} priority className="h-[300px] w-full object-cover sm:h-[400px]" />
      </div>

      {galleryImages.length > 1 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900">Gallery</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {galleryImages.map((image, index) => {
              const isActive = image === activeImage;
              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square overflow-hidden border bg-gray-50 transition ${isActive ? "border-primary ring-2 ring-primary/20" : "border-gray-100 hover:border-primary/50"}`}
                  aria-label={`Show ${productName} image ${index + 1}`}
                >
                  <Image src={image} alt={`${productName} gallery ${index + 1}`} fill sizes="(max-width: 640px) 33vw, 160px" className="object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}