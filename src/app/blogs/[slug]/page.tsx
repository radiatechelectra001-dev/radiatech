import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, User, Tag } from "lucide-react";
import { companyInfo } from "@/data/company";
import BlogImageViewer from "@/components/BlogImageViewer";
import { getPublishedBlogBySlug, getRelatedBlogs, parseBlogImages, parseBlogTags } from "@/lib/publicBlogs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) return { title: "Blog - Radiatech Electra" };
  return {
    title: `${blog.title} - Radiatech Electra`,
    description: blog.excerpt,
    openGraph: { title: blog.title, description: blog.excerpt, images: blog.coverImage ? [{ url: blog.coverImage }] : undefined },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);
  if (!blog) notFound();

  const tags = parseBlogTags(blog.tags);
  // Use all gallery images; fall back to cover so the viewer always has something
  const rawImages = parseBlogImages(blog.images);
  const allImages = rawImages.length > 0 ? rawImages : (blog.coverImage ? [blog.coverImage] : []);

  const relatedBlogs = await getRelatedBlogs(blog.slug, blog.id, 3);

  return (
    <main>
      <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-white">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          {tags[0] && <span className="bg-accent text-white text-xs font-bold px-3 py-1 mb-4 inline-block">{tags[0]}</span>}
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1"><Calendar size={14} />{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><User size={14} />{blog.author}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {allImages.length > 0 && (
            <BlogImageViewer images={allImages} title={blog.title} />
          )}

          <article className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-10 pt-6 border-t border-gray-100">
              <Tag size={16} className="text-gray-400" />
              {tags.map((tag, idx) => <span key={`${tag}-${idx}`} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5">{tag}</span>)}
            </div>
          )}

          {/* CTA: Send Inquiry */}
          <div className="mt-12 bg-gradient-to-r from-primary to-primary-dark p-5 sm:p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Need Help With Your Piping Project?</h3>
            <p className="text-blue-200 mb-4">Our experts are ready to help you find the perfect PPR-C piping solution.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 text-sm font-semibold transition-colors">Send Inquiry</Link>
              <a href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${encodeURIComponent("Hi, I read your blog and I'm interested in PPR-C piping solutions.")}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1da851] text-white px-6 py-3 text-sm font-semibold transition-colors">WhatsApp Us</a>
              <a href={`tel:${companyInfo.contact.phoneHref}`} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-sm font-semibold transition-colors border border-white/20">Call Now</a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((rb) => (
                  <Link key={rb.id} href={`/blogs/${rb.slug}`} className="group bg-white overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
                    {rb.coverImage && (
                      <div className="relative h-36 overflow-hidden">
                        <Image src={rb.coverImage} alt={rb.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">{rb.title}</h4>
                      <p className="text-gray-500 text-xs">{new Date(rb.publishedAt || rb.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
