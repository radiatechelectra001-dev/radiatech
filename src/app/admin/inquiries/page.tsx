"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Phone, Trash2, X } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Pagination from "@/components/admin/Pagination";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  quantity: string;
  productName: string;
  product?: { name: string } | null;
  source: string;
  isRead: boolean;
  createdAt: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const pageSize = 10;

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, pageSize, total: 0, totalPages: 1 });

  useEffect(() => {
    let cancelled = false;

    async function loadInquiries() {
      try {
        const authResponse = await fetch("/api/auth/me");
        if (authResponse.status === 401) {
          router.replace("/admin/login");
          return;
        }

        const response = await fetch(`/api/inquiries?page=${page}&pageSize=${pageSize}`);
        const data = (await response.json().catch(() => null)) as { items?: Inquiry[]; pagination?: PaginationState; error?: unknown } | null;
        if (cancelled) return;

        if (!response.ok) {
          setInquiries([]);
          setError(typeof data?.error === "string" ? data.error : "Unable to load inquiries.");
          return;
        }

        setInquiries(data?.items || []);
        setPagination(data?.pagination || { page, pageSize, total: 0, totalPages: 1 });
        setError("");
        if (data?.pagination?.totalPages && page > data.pagination.totalPages) setPage(data.pagination.totalPages);
      } catch {
        if (!cancelled) {
          setInquiries([]);
          setError("Unable to load inquiries.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInquiries();

    return () => {
      cancelled = true;
    };
  }, [page, refreshKey, router]);

  const markRead = async (inquiryId: string) => {
    const response = await fetch(`/api/inquiries/${inquiryId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
    if (response.ok) {
      setInquiries((current) => current.map((inquiry) => inquiry.id === inquiryId ? { ...inquiry, isRead: true } : inquiry));
      setError("");
      return;
    }

    const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
    setError(typeof data?.error === "string" ? data.error : "Unable to update inquiry.");
  };

  const handleDelete = async (inquiryId: string) => {
    if (!confirm("Delete this inquiry?")) return;
    setLoading(true);
    const response = await fetch(`/api/inquiries/${inquiryId}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
      setError(typeof data?.error === "string" ? data.error : "Unable to delete inquiry.");
      setLoading(false);
      return;
    }

    if (selected?.id === inquiryId) setSelected(null);
    if (inquiries.length === 1 && page > 1) setPage((currentPage) => currentPage - 1);
    else setRefreshKey((current) => current + 1);
  };

  const handlePageChange = (nextPage: number) => {
    setLoading(true);
    setPage(nextPage);
  };

  const openInquiry = (inquiry: Inquiry) => {
    setSelected(inquiry);
    if (!inquiry.isRead) void markRead(inquiry.id);
  };

  return (
    <AdminShell title="Inquiries" description="Review, mark, and manage customer inquiries submitted from product pages and contact forms.">
      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 px-4" onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Inquiry Details</h2>
                <p className="text-sm text-slate-500">{new Date(selected.createdAt).toLocaleString("en-IN")}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700" aria-label="Close inquiry details"><X size={22} /></button>
            </div>
            <div className="space-y-5 px-5 py-5 text-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <Detail label="Name" value={selected.name} />
                <Detail label="Phone" value={selected.phone} href={`tel:${selected.phone}`} />
                <Detail label="Email" value={selected.email || "-"} href={selected.email ? `mailto:${selected.email}` : undefined} />
                <Detail label="Company" value={selected.company || "-"} />
                <Detail label="Product" value={selected.product?.name || selected.productName || "-"} />
                <Detail label="Source" value={selected.source} />
              </div>
              {selected.quantity && <Detail label="Quantity" value={selected.quantity} />}
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Message</p>
                <p className="border border-slate-100 bg-slate-50 p-4 leading-relaxed text-slate-700">{selected.message || "-"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row">
              {!selected.isRead && (
                <button onClick={() => { void markRead(selected.id); setSelected({ ...selected, isRead: true }); }} className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
                  <CheckCircle2 size={16} /> Mark as Read
                </button>
              )}
              <button onClick={() => handleDelete(selected.id)} className="inline-flex items-center justify-center gap-2 border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="h-64 animate-pulse border border-slate-200 bg-white" />
      ) : error ? (
        <div className="border border-red-200 bg-red-50 px-5 py-6 text-sm font-medium text-red-700">{error}</div>
      ) : inquiries.length === 0 ? (
        <div className="border border-dashed border-slate-300 bg-white px-5 py-16 text-center text-sm text-slate-500">No inquiries yet.</div>
      ) : (
        <>
          <div className="grid gap-4 md:hidden">
            {inquiries.map((inquiry) => (
              <article key={inquiry.id} className={`border bg-white p-4 shadow-sm ${inquiry.isRead ? "border-slate-200" : "border-amber-200"}`} onClick={() => openInquiry(inquiry)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-slate-950">{inquiry.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{inquiry.product?.name || inquiry.productName || "General inquiry"}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${inquiry.isRead ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{inquiry.isRead ? "Read" : "New"}</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><Phone size={15} /> {inquiry.phone}</p>
                  {inquiry.email && <p className="flex items-center gap-2"><Mail size={15} /> {inquiry.email}</p>}
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className={`cursor-pointer hover:bg-slate-50 ${!inquiry.isRead ? "bg-amber-50/30" : ""}`} onClick={() => openInquiry(inquiry)}>
                    <td className="px-5 py-4 font-medium text-slate-950">{inquiry.name}</td>
                    <td className="px-5 py-4 text-slate-600">{inquiry.email || "-"}</td>
                    <td className="px-5 py-4 text-slate-600">{inquiry.phone}</td>
                    <td className="px-5 py-4 text-slate-600">{inquiry.product?.name || inquiry.productName || "-"}</td>
                    <td className="px-5 py-4 text-slate-500">{new Date(inquiry.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</td>
                    <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 text-xs font-semibold ${inquiry.isRead ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{inquiry.isRead ? "Read" : "New"}</span></td>
                    <td className="px-5 py-4">
                      <button onClick={(event) => { event.stopPropagation(); void handleDelete(inquiry.id); }} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"><Trash2 size={15} /> Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={pagination.page} totalPages={pagination.totalPages} total={pagination.total} pageSize={pagination.pageSize} onPageChange={handlePageChange} />
        </>
      )}
    </AdminShell>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      {href ? <a href={href} className="font-medium text-primary hover:text-primary-dark">{value}</a> : <p className="font-medium text-slate-800">{value}</p>}
    </div>
  );
}