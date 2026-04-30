"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, total, pageSize, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1);

  return (
    <div className="mt-5 flex flex-col gap-3 border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500">Showing {start}-{end} of {total}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="border border-slate-200 px-3 py-2 font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
        {pages.map((item, index) => {
          const previous = pages[index - 1];
          return (
            <span key={item} className="flex items-center gap-2">
              {previous && item - previous > 1 && <span className="text-slate-400">...</span>}
              <button type="button" onClick={() => onPageChange(item)} className={`min-w-10 border px-3 py-2 font-semibold ${item === page ? "border-primary bg-primary text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{item}</button>
            </span>
          );
        })}
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="border border-slate-200 px-3 py-2 font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}