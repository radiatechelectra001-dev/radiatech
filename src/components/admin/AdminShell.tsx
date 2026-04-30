"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BarChart3, BookOpenText, FolderTree, Inbox, LogOut, Menu, Package, X } from "lucide-react";
import { companyInfo } from "@/data/company";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Blog Posts", href: "/admin/blogs", icon: BookOpenText },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({
  children,
  title,
  description,
  action,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-[#081f49] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center bg-white shadow-sm">
            <Image src="/LOGO.png" alt={companyInfo.name} width={34} height={34} className="h-8 w-8 object-contain" />
          </span>
          <span>
            <span className="block text-base font-bold leading-tight">Radiatech Electra</span>
            <span className="mt-0.5 inline-flex bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Admin</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white text-[#081f49] shadow-sm"
                  : "text-white/72 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link href="/" className="mb-2 block px-3 py-2 text-xs font-medium text-white/55 hover:text-white">
          View public website
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/72 transition-colors hover:bg-red-500/20 hover:text-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden min-h-screen lg:block">{sidebar}</aside>

      {sidebarOpen && <button aria-label="Close menu overlay" className="fixed inset-0 z-40 bg-slate-900/45 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[86vw] transform transition-transform duration-200 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebar}
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
                aria-label="Open admin navigation"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
                <p className="hidden truncate text-xs text-slate-500 sm:block">Radiatech Electra management console</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:inline-flex"
            >
              <LogOut size={16} />
              Logout
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="sr-only"
              aria-label="Close admin navigation"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
              {description && <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}