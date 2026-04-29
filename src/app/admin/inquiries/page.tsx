"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Inquiry { id: string; name: string; email: string; phone: string; company: string; message: string; quantity: string; productName: string; product?: { name: string }; source: string; isRead: boolean; createdAt: string; }

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "📦" },
  { label: "Categories", href: "/admin/categories", icon: "🗂️" },
  { label: "Blog Posts", href: "/admin/blogs", icon: "✍️" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "📩" },
];

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    (async () => {
      const auth = await fetch("/api/auth/me");
      if (auth.status === 401) { router.replace("/admin/login"); return; }
      const res = await fetch("/api/inquiries");
      if (res.ok) { const data = await res.json(); setInquiries(data); }
      setLoading(false);
    })();
  }, [router]);

  const markRead = async (id: string) => {
    const res = await fetch(`/api/inquiries/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
    if (res.ok) setInquiries(inquiries.map(i => i.id === id ? { ...i, isRead: true } : i));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    if (res.ok) { setInquiries(inquiries.filter(i => i.id !== id)); if (selected?.id === id) setSelected(null); }
  };

  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/login"); };

  const sidebar = (
    <div className="flex h-full flex-col bg-[#0B3D91] text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5"><span className="text-xl font-bold">Radiatech</span><span className="rounded bg-[#F37021] px-2 py-0.5 text-xs font-semibold uppercase">Admin</span></div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (<a key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${item.href === "/admin/inquiries" ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><span className="text-lg">{item.icon}</span>{item.label}</a>))}
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Inquiries</h1>

          {/* Inquiry Detail Modal */}
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setSelected(null)}>
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Inquiry Details</h2>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                </div>
                <div className="space-y-3 text-sm">
                  <div><span className="font-medium text-gray-500">Name:</span> <span className="text-gray-900">{selected.name}</span></div>
                  <div><span className="font-medium text-gray-500">Email:</span> <a href={`mailto:${selected.email}`} className="text-blue-600">{selected.email}</a></div>
                  <div><span className="font-medium text-gray-500">Phone:</span> <a href={`tel:${selected.phone}`} className="text-blue-600">{selected.phone}</a></div>
                  {selected.company && <div><span className="font-medium text-gray-500">Company:</span> {selected.company}</div>}
                  {(selected.product?.name || selected.productName) && <div><span className="font-medium text-gray-500">Product:</span> {selected.product?.name || selected.productName}</div>}
                  {selected.quantity && <div><span className="font-medium text-gray-500">Quantity:</span> {selected.quantity}</div>}
                  <div><span className="font-medium text-gray-500">Source:</span> {selected.source}</div>
                  <div><span className="font-medium text-gray-500">Message:</span><p className="mt-1 text-gray-700 bg-gray-50 rounded-lg p-3">{selected.message}</p></div>
                  <div><span className="font-medium text-gray-500">Date:</span> {new Date(selected.createdAt).toLocaleString("en-IN")}</div>
                </div>
                <div className="flex gap-2 mt-5">
                  {!selected.isRead && <button onClick={() => { markRead(selected.id); setSelected({ ...selected, isRead: true }); }} className="bg-[#0B3D91] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0B3D91]/90">Mark as Read</button>}
                  <button onClick={() => setSelected(null)} className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50">Close</button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B3D91] border-t-transparent" /></div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-20 text-gray-400"><span className="text-4xl mb-2 block">📭</span><p>No inquiries yet</p></div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className={`hover:bg-gray-50 cursor-pointer ${!inq.isRead ? "bg-blue-50/30" : ""}`} onClick={() => { setSelected(inq); if (!inq.isRead) markRead(inq.id); }}>
                      <td className="px-5 py-3 font-medium text-gray-900">{inq.name}</td>
                      <td className="px-5 py-3 text-gray-600">{inq.email}</td>
                      <td className="px-5 py-3 text-gray-600">{inq.phone}</td>
                      <td className="px-5 py-3 text-gray-600">{inq.product?.name || inq.productName || "—"}</td>
                      <td className="px-5 py-3 text-gray-500">{new Date(inq.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</td>
                      <td className="px-5 py-3">{inq.isRead ? <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Read</span> : <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full">New</span>}</td>
                      <td className="px-5 py-3"><button onClick={(e) => { e.stopPropagation(); handleDelete(inq.id); }} className="text-red-500 text-xs font-medium hover:underline">Delete</button></td>
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
