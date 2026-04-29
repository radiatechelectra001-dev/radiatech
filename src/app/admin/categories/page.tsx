"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

interface Category { id: string; slug: string; name: string; description: string; image: string; sortOrder: number; _count?: { products: number }; }

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "📦" },
  { label: "Categories", href: "/admin/categories", icon: "🗂️" },
  { label: "Blog Posts", href: "/admin/blogs", icon: "✍️" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "📩" },
];

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", image: "", sortOrder: 0 });

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    if (res.status === 401) { router.replace("/admin/login"); return false; }
    return true;
  }, [router]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) { const data = await res.json(); setCategories(data); }
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => {
    (async () => { const ok = await checkAuth(); if (ok) await fetchCategories(); })();
  }, [checkAuth, fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const body = { ...form, slug };
    const url = editId ? `/api/categories/${editId}` : "/api/categories";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      setShowForm(false); setEditId(null); setForm({ name: "", slug: "", description: "", image: "", sortOrder: 0 });
      fetchCategories();
    } else { const data = await res.json(); alert(data.error || "Failed"); }
  };

  const handleEdit = (cat: Category) => {
    setEditId(cat.id);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, sortOrder: cat.sortOrder });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products in it will also be deleted.")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) setCategories(categories.filter(c => c.id !== id));
  };

  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/login"); };

  const sidebar = (
    <div className="flex h-full flex-col bg-[#0B3D91] text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5"><span className="text-xl font-bold">Radiatech</span><span className="rounded bg-[#F37021] px-2 py-0.5 text-xs font-semibold uppercase">Admin</span></div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (<a key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.href === "/admin/categories" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><span className="text-lg">{item.icon}</span>{item.label}</a>))}
      </nav>
      <div className="border-t border-white/10 p-3"><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-200"><span className="text-lg">🚪</span>Logout</button></div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden w-64 shrink-0 md:block">{sidebar}</aside>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"><svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          <span className="text-lg font-bold text-[#0B3D91]">Radiatech</span><span className="rounded bg-[#F37021] px-2 py-0.5 text-xs font-semibold uppercase text-white">Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <button onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", slug: "", description: "", image: "", sortOrder: 0 }); }} className="bg-[#0B3D91] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B3D91]/90">+ Add Category</button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">{editId ? "Edit Category" : "New Category"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="Auto-generated" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea required rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImageUpload
                    folder="categories"
                    currentImage={form.image}
                    onImageSelect={(url) => setForm({ ...form, image: url })}
                    label="Category Image"
                  />
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label><input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" /></div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-[#0B3D91] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B3D91]/90">{editId ? "Update" : "Create"}</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="border border-gray-200 text-gray-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B3D91] border-t-transparent" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Order: {cat.sortOrder}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(cat)} className="text-[#0B3D91] text-xs font-medium hover:underline">Edit</button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-500 text-xs font-medium hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
