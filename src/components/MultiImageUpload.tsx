"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface MultiImageUploadProps {
  folder: "products" | "categories" | "blogs" | "projects" | "infrastructure";
  currentImages?: string[];
  onImagesSelect: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ folder, currentImages = [], onImagesSelect, label = "Gallery Images" }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Upload failed");
    }

    const data = await response.json();
    return data.url as string;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setError("");
    setUploading(true);

    try {
      const uploadedUrls = [];
      for (const file of files) {
        uploadedUrls.push(await uploadFile(file));
      }

      const nextImages = [...currentImages, ...uploadedUrls];
      onImagesSelect(nextImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeImage = (url: string) => {
    const nextImages = currentImages.filter((image) => image !== url);
    onImagesSelect(nextImages);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentImages.map((image) => (
            <div key={image} className="relative h-28 overflow-hidden border border-gray-200 bg-gray-100">
              <Image src={image} alt="Product gallery preview" fill sizes="(max-width: 640px) 50vw, 160px" className="object-cover" />
              <button type="button" onClick={() => removeImage(image)} className="absolute right-2 top-2 bg-red-500 p-1 text-white transition-colors hover:bg-red-600" aria-label="Remove image">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload className="mb-2 text-gray-400" size={30} />
        <span className="text-sm font-medium text-gray-700">{uploading ? "Uploading..." : "Click to upload multiple images"}</span>
        <span className="text-xs text-gray-500">PNG, JPG, WebP, GIF (max 5MB each)</span>
      </button>

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={handleFileChange} disabled={uploading} className="hidden" />

      {error && <div className="bg-red-50 p-3 text-sm text-red-600">{error}</div>}
    </div>
  );
}