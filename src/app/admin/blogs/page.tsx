"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import Pagination from "@/components/admin/Pagination";

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const pageSize = 10;

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, pageSize, total: 0, totalPages: 1 });

  useEffect(() => {
    let cancelled = false;

    async function loadBlogs() {
      try {
        const authResponse = await fetch("/api/auth/me");
        if (authResponse.status === 401) {
          router.replace("/admin/login");
          return;
        }

        const response = await fetch(`/api/blogs?admin=true&page=${page}&pageSize=${pageSize}`);
        const data = (await response.json().catch(() => null)) as { items?: Blog[]; pagination?: PaginationState; error?: unknown } | null;
        if (cancelled) return;

        if (!response.ok) {
          setBlogs([]);
          setError(typeof data?.error === "string" ? data.error : "Unable to load blog posts.");
          return;
        }

        setBlogs(data?.items || []);
        setPagination(data?.pagination || { page, pageSize, total: 0, totalPages: 1 });
        setError("");
        if (data?.pagination?.totalPages && page > data.pagination.totalPages) setPage(data.pagination.totalPages);
      } catch {
        if (!cancelled) {
          setBlogs([]);
          setError("Unable to load blog posts.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBlogs();

    return () => {
      cancelled = true;
    };
  }, [page, refreshKey, router]);

  const handleDelete = async (blogId: string) => {
    if (!confirm("Delete this blog post?")) return;
    setLoading(true);
    const response = await fetch(`/api/blogs/${blogId}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: unknown } | null;
      setError(typeof data?.error === "string" ? data.error : "Unable to delete blog post.");
      setLoading(false);
      return;
    }

    if (blogs.length === 1 && page > 1) setPage((currentPage) => currentPage - 1);
    else setRefreshKey((current) => current + 1);
  };

  const handlePageChange = (nextPage: number) => {
    setLoading(true);
    setPage(nextPage);
  };

  return (
    <AdminShell
      title="Blog Posts"
      description="Publish customer-facing articles, guides, and company updates."
      action={
        <Link href="/admin/blogs/new" className="inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark sm:w-auto">
          <Plus size={16} /> Add Post
        </Link>
      }
    >
      {loading ? (
        <div className="h-64 animate-pulse border border-slate-200 bg-white" />
      ) : error ? (
        <div className="border border-red-200 bg-red-50 px-5 py-6 text-sm font-medium text-red-700">{error}</div>
      ) : blogs.length === 0 ? (
        <div className="border border-dashed border-slate-300 bg-white px-5 py-16 text-center text-sm text-slate-500">No blog posts yet.</div>
      ) : (
        <>
          <div className="grid gap-4 md:hidden">
            {blogs.map((blog) => (
              <article key={blog.id} className="border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="line-clamp-2 font-semibold text-slate-950">{blog.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{blog.author}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${blog.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">{blog.excerpt}</p>
                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                  <Link href={`/admin/blogs/${blog.id}`} className="inline-flex flex-1 items-center justify-center gap-2 border border-slate-200 px-3 py-2 text-sm font-semibold text-primary hover:bg-slate-50"><Edit3 size={15} /> Edit</Link>
                  <button onClick={() => handleDelete(blog.id)} className="inline-flex flex-1 items-center justify-center gap-2 border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"><Trash2 size={15} /> Delete</button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Author</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-950">{blog.title}</p>
                      <p className="mt-1 max-w-xl truncate text-xs text-slate-500">/{blog.slug}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{blog.author}</td>
                    <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 text-xs font-semibold ${blog.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{blog.isPublished ? "Published" : "Draft"}</span></td>
                    <td className="px-5 py-4 text-slate-500">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/blogs/${blog.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"><Edit3 size={15} /> Edit</Link>
                        <button onClick={() => handleDelete(blog.id)} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"><Trash2 size={15} /> Delete</button>
                      </div>
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