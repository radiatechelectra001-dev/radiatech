"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Blog { id: string; slug: string; title: string; excerpt: string; author: string; isPublished: boolean; publishedAt: string | null; createdAt: string; }

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "📦" },
  { label: "Categories", href: "/admin/categories", icon: "🗂️" },
  { label: "Blog Posts", href: "/admin/blogs", icon: "✍️" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "📩" },
];

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const auth = await fetch("/api/auth/me");
      if (auth.status === 401) { router.replace("/admin/login"); return; }
      const res = await fetch("/api/blogs");
      if (res.ok) { const data = await res.json(); setBlogs(data); }
      setLoading(false);
    })();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/login"); };

  const sidebar = (
    <div className="flex h-full flex-col bg-[#0B3D91] text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5"><span className="text-xl font-bold">Radiatech</span><span className="rounded bg-[#F37021] px-2 py-0.5 text-xs font-semibold uppercase">Admin</span></div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (<a key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.href === "/admin/blogs" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><span className="text-lg">{item.icon}</span>{item.label}</a>))}
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
          <span className="text-lg font-bold text-[#0B3D91]">Radiatech</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
            <Link href="/admin/blogs/new" className="bg-[#0B3D91] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B3D91]/90">+ Add Post</Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B3D91] border-t-transparent" /></div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-400"><span className="text-4xl mb-2 block">✍️</span><p>No blog posts yet</p></div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-3 font-medium">Title</th>
                    <th className="px-5 py-3 font-medium">Author</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{blog.title}</td>
                      <td className="px-5 py-3 text-gray-600">{blog.author}</td>
                      <td className="px-5 py-3">{blog.isPublished ? <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Published</span> : <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-0.5 rounded-full">Draft</span>}</td>
                      <td className="px-5 py-3 text-gray-500">{new Date(blog.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td className="px-5 py-3"><div className="flex gap-2"><Link href={`/admin/blogs/${blog.id}`} className="text-[#0B3D91] text-xs font-medium hover:underline">Edit</Link><button onClick={() => handleDelete(blog.id)} className="text-red-500 text-xs font-medium hover:underline">Delete</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
