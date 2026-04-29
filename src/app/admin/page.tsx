"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  product?: string;
  createdAt: string;
  read: boolean;
}

interface Stats {
  products: number;
  categories: number;
  blogs: number;
  inquiries: number;
  recentInquiries: Inquiry[];
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "📦" },
  { label: "Categories", href: "/admin/categories", icon: "🗂️" },
  { label: "Blog Posts", href: "/admin/blogs", icon: "✍️" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "📩" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.status === 401) {
        router.replace("/admin/login");
        return false;
      }
      return true;
    } catch {
      router.replace("/admin/login");
      return false;
    }
  }, [router]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // stats fetch failed silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const authed = await checkAuth();
      if (authed && !cancelled) {
        await fetchStats();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [checkAuth, fetchStats]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0B3D91] border-t-transparent" />
          <p className="text-sm text-gray-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Products", value: stats?.products ?? 0, icon: "📦", color: "bg-blue-50 text-[#0B3D91]" },
    { label: "Categories", value: stats?.categories ?? 0, icon: "🗂️", color: "bg-orange-50 text-[#F37021]" },
    { label: "Blog Posts", value: stats?.blogs ?? 0, icon: "✍️", color: "bg-green-50 text-green-700" },
    { label: "Inquiries", value: typeof stats?.inquiries === "object" ? (stats?.inquiries as any)?.total ?? 0 : stats?.inquiries ?? 0, icon: "📩", color: "bg-purple-50 text-purple-700" },
  ];

  const sidebar = (
    <div className="flex h-full flex-col bg-[#0B3D91] text-white">
      {/* Branding */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        <span className="text-xl font-bold tracking-tight">Radiatech</span>
        <span className="rounded bg-[#F37021] px-2 py-0.5 text-xs font-semibold uppercase">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = item.href === "/admin";
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-red-500/20 hover:text-red-200"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 md:block">{sidebar}</aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-bold text-[#0B3D91]">Radiatech</span>
          <span className="rounded bg-[#F37021] px-2 py-0.5 text-xs font-semibold uppercase text-white">
            Admin
          </span>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <h1 className="mb-1 text-2xl font-bold text-gray-900">Welcome back 👋</h1>
          <p className="mb-6 text-sm text-gray-500">
            Here&apos;s what&apos;s happening with your website today.
          </p>

          {/* Stat Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.label}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{card.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Inquiries */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
              <a
                href="/admin/inquiries"
                className="text-sm font-medium text-[#0B3D91] hover:underline"
              >
                View all →
              </a>
            </div>

            {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-3 font-medium">Name</th>
                      <th className="px-5 py-3 font-medium">Email</th>
                      <th className="px-5 py-3 font-medium">Product</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats.recentInquiries.slice(0, 5).map((inq) => (
                      <tr key={inq.id} className="transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-900">
                          {inq.name}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-gray-600">{inq.email}</td>
                        <td className="whitespace-nowrap px-5 py-3 text-gray-600">
                          {(inq as any).product?.name || (inq as any).productName || "—"}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-gray-500">
                          {formatDate(inq.createdAt)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              inq.read
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {inq.read ? "Read" : "Unread"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <span className="mb-2 text-4xl">📭</span>
                <p className="text-sm">No inquiries yet</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
