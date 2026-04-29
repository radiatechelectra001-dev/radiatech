"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import MultiImageUpload from "@/components/MultiImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const parseImages = (images: unknown, fallbackImage: string) => {
  if (Array.isArray(images)) return images.filter((image): image is string => typeof image === "string" && image.length > 0);
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) return parsed.filter((image): image is string => typeof image === "string" && image.length > 0);
    } catch {
      return fallbackImage ? [fallbackImage] : [];
    }
  }
  return fallbackImage ? [fallbackImage] : [];
};

const parseJsonField = <T,>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export default function AdminProductForm({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isEdit = id !== "new";
  const productId = isEdit ? id : null;
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", specifications: "{}", applications: "[]",
    image: "", categoryId: "", isFeatured: false, isNewArrival: false, isActive: true,
    images: [] as string[],
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      const authRes = await fetch("/api/auth/me");
      if (authRes.status === 401) { router.replace("/admin/login"); return; }

      const catRes = await fetch("/api/categories");
      if (catRes.ok && !cancelled) { const data = await catRes.json(); setCategories(data); }

      if (isEdit && productId) {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok && !cancelled) {
          const p = await res.json();
          setForm({
            name: p.name, slug: p.slug, description: p.description,
            specifications: typeof p.specifications === "string" ? p.specifications : JSON.stringify(p.specifications, null, 2),
            applications: typeof p.applications === "string" ? p.applications : JSON.stringify(p.applications, null, 2),
            image: p.image || "", categoryId: p.categoryId || "",
            isFeatured: p.isFeatured, isNewArrival: p.isNewArrival, isActive: p.isActive,
            images: parseImages(p.images, p.image || ""),
          });
        }
      }
    }

    void fetchData();

    return () => { cancelled = true; };
  }, [router, isEdit, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const body = {
      ...form,
      slug,
      specifications: parseJsonField(form.specifications, {}),
      applications: parseJsonField<string[]>(form.applications, []),
      images: form.images.length > 0 ? form.images : form.image ? [form.image] : [],
    };

    const url = isEdit ? `/api/products/${productId}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) router.push("/admin/products");
      else { const data = await res.json(); alert(data.error || "Failed to save"); }
    } catch { alert("Error saving product"); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit Product" : "Add Product"}</h1>
          <button onClick={() => router.push("/admin/products")} className="text-sm text-gray-600 hover:text-gray-900">← Back to Products</button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="Auto-generated from name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select required value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none">
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none" />
          </div>

          <div>
            <ImageUpload
              folder="products"
              currentImage={form.image}
              onImageSelect={(url) => setForm({ ...form, image: url, images: form.images.length > 0 ? form.images : url ? [url] : [] })}
              label="Product Image"
            />
          </div>

          <div>
            <MultiImageUpload
              folder="products"
              currentImages={form.images}
              onImagesSelect={(urls) => setForm({ ...form, images: urls, image: form.image || urls[0] || "" })}
              label="Product Gallery Images"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (JSON)</label>
            <textarea rows={4} value={form.specifications} onChange={e => setForm({...form, specifications: e.target.value})} placeholder='{"Material": "PPR-C", "Size": "20mm"}'
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Applications (JSON Array)</label>
            <textarea rows={3} value={form.applications} onChange={e => setForm({...form, applications: e.target.value})} placeholder='["Water Supply", "Chemical Plants"]'
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none" />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isNewArrival} onChange={e => setForm({...form, isNewArrival: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-700">New Arrival</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-[#0B3D91] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0B3D91]/90 transition-colors disabled:opacity-50">
              {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
            </button>
            <button type="button" onClick={() => router.push("/admin/products")} className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
