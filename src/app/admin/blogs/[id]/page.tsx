"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function AdminBlogForm({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "R Singh", tags: "[]", isPublished: false,
  });

  useEffect(() => {
    params.then(async ({ id }) => {
      const auth = await fetch("/api/auth/me");
      if (auth.status === 401) { router.replace("/admin/login"); return; }

      if (id !== "new") {
        setIsEdit(true); setBlogId(id);
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const b = await res.json();
          setForm({
            title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content,
            coverImage: b.coverImage || "", author: b.author || "R Singh",
            tags: typeof b.tags === "string" ? b.tags : JSON.stringify(b.tags),
            isPublished: b.isPublished,
          });
        }
      }
    });
  }, [params, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const body = { ...form, slug, publishedAt: form.isPublished ? new Date().toISOString() : null };
    const url = isEdit ? `/api/blogs/${blogId}` : "/api/blogs";
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) router.push("/admin/blogs");
      else { const data = await res.json(); alert(data.error || "Failed to save"); }
    } catch { alert("Error saving"); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit Blog Post" : "New Blog Post"}</h1>
          <button onClick={() => router.push("/admin/blogs")} className="text-sm text-gray-600 hover:text-gray-900">← Back to Blogs</button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="Auto-generated" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>
          </div>

          <div><label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label><textarea required rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>

          <div><label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML) *</label><textarea required rows={10} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUpload
              folder="blogs"
              currentImage={form.coverImage}
              onImageSelect={(url) => setForm({ ...form, coverImage: url })}
              label="Cover Image"
            />
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Author</label><input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>
          </div>

          <div><label className="block text-sm font-medium text-gray-700 mb-1">Tags (JSON Array)</label><input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder='["PPR-C", "Industrial"]' className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <span className="text-sm text-gray-700">Published</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-[#0B3D91] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0B3D91]/90 disabled:opacity-50">{saving ? "Saving..." : isEdit ? "Update Post" : "Create Post"}</button>
            <button type="button" onClick={() => router.push("/admin/blogs")} className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
