import { blogPosts } from "@/data/blogs";
import { markPublicDbAvailable, markPublicDbUnavailable, shouldSkipPublicDbRead } from "@/lib/dbHealth";

type PrismaClientInstance = typeof import("@/lib/db")["prisma"];

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function markdownToHtml(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const escaped = escapeHtml(block).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />");
      return `<p>${escaped}</p>`;
    })
    .join("");
}

const fallbackBlogs: PublicBlogPost[] = blogPosts
  .map((blog) => {
    const date = new Date(`${blog.date}T00:00:00.000Z`);

    return {
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: markdownToHtml(blog.content),
      coverImage: blog.image,
      author: blog.author,
      tags: JSON.stringify(blog.tags),
      publishedAt: date,
      createdAt: date,
      updatedAt: date,
    };
  })
  .sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime());

async function queryBlogs<T>(query: (client: PrismaClientInstance) => Promise<T>, fallback: T) {
  if (shouldSkipPublicDbRead()) {
    return fallback;
  }

  try {
    const { prisma } = await import("@/lib/db");
    const result = await query(prisma);
    markPublicDbAvailable();
    return result;
  } catch (error) {
    markPublicDbUnavailable(error);
    return fallback;
  }
}

export function parseBlogTags(tags: string) {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string") : [];
  } catch {
    return [];
  }
}

export async function getPublishedBlogs() {
  return queryBlogs(
    (client) =>
      client.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
      }),
    fallbackBlogs,
  );
}

export async function getPublishedBlogBySlug(slug: string) {
  return queryBlogs(
    (client) => client.blogPost.findFirst({ where: { slug, isPublished: true } }),
    fallbackBlogs.find((blog) => blog.slug === slug) ?? null,
  );
}

export async function getRelatedBlogs(currentSlug: string, currentId: string, take = 3) {
  return queryBlogs(
    (client) =>
      client.blogPost.findMany({
        where: { isPublished: true, id: { not: currentId } },
        orderBy: { createdAt: "desc" },
        take,
      }),
    fallbackBlogs.filter((blog) => blog.slug !== currentSlug).slice(0, take),
  );
}