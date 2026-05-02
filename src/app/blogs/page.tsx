import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";
import { getPublishedBlogsPage, parseBlogImages, parseBlogTags } from "@/lib/publicBlogs";

export const metadata = {
  title: "Blog & Insights - Radiatech Electra",
  description: "Industry insights, technical guides, and the latest updates on PPR-C piping solutions from Radiatech Electra.",
};

export const dynamic = "force-dynamic";

const pageSize = 9;

function pageHref(page: number) {
  return page <= 1 ? "/blogs" : `/blogs?page=${page}`;
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page;
  const requestedPage = Math.max(1, Number.parseInt(rawPage || "1", 10) || 1);
  const { items: blogs, pagination } = await getPublishedBlogsPage(requestedPage, pageSize);
  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1).filter((item) => item === 1 || item === pagination.totalPages || Math.abs(item - pagination.page) <= 1);

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-blue-200 text-lg max-w-2xl">Industry insights, technical guides, and company updates on PPR-C piping solutions.</p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-12 sm:py-20"><p className="text-gray-400 text-lg">No blog posts published yet. Check back soon!</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {blogs.map((blog) => {
                const tags = parseBlogTags(blog.tags);
                const thumbnail = blog.coverImage || parseBlogImages(blog.images)[0] || "";
                return (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all card-hover border border-gray-100">
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {thumbnail ? (
                        <Image src={thumbnail} alt={blog.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10" />
                      )}
                      {tags[0] && <div className="absolute top-3 left-3"><span className="bg-primary text-white text-xs font-bold px-3 py-1">{tags[0]}</span></div>}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs mb-3">
                        <span className="flex items-center gap-1"><Calendar size={14} />{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                        <span className="flex items-center gap-1"><User size={14} />{blog.author}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">Read More <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {pagination.totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border border-gray-100 bg-white px-4 py-4 text-sm shadow-sm sm:flex-row">
              <p className="text-gray-500">Showing page {pagination.page} of {pagination.totalPages}</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {pagination.page > 1 ? (
                  <Link href={pageHref(pagination.page - 1)} className="border border-gray-200 px-3 py-2 font-semibold text-gray-600 transition-colors hover:border-primary hover:text-primary">Previous</Link>
                ) : (
                  <span className="border border-gray-100 px-3 py-2 font-semibold text-gray-300">Previous</span>
                )}
                {pages.map((item, index) => {
                  const previous = pages[index - 1];
                  return (
                    <span key={item} className="flex items-center gap-2">
                      {previous && item - previous > 1 && <span className="text-gray-400">...</span>}
                      <Link href={pageHref(item)} className={`min-w-10 border px-3 py-2 text-center font-semibold transition-colors ${item === pagination.page ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"}`}>{item}</Link>
                    </span>
                  );
                })}
                {pagination.page < pagination.totalPages ? (
                  <Link href={pageHref(pagination.page + 1)} className="border border-gray-200 px-3 py-2 font-semibold text-gray-600 transition-colors hover:border-primary hover:text-primary">Next</Link>
                ) : (
                  <span className="border border-gray-100 px-3 py-2 font-semibold text-gray-300">Next</span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
