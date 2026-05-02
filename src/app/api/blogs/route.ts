import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) return value.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0).map((tag) => tag.trim());
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0).map((tag) => tag.trim()) : [];
  } catch {
    return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
}

function normalizeImages(value: unknown) {
  if (Array.isArray(value)) return value.filter((image): image is string => typeof image === "string" && image.trim().length > 0).map((image) => image.trim());
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((image): image is string => typeof image === "string" && image.trim().length > 0).map((image) => image.trim()) : [];
  } catch {
    return value.split(",").map((image) => image.trim()).filter(Boolean);
  }
}

function resolvePublishedAt(data: Record<string, unknown>) {
  if (!data.isPublished) return null;
  if (typeof data.publishedAt === "string" && data.publishedAt.trim()) {
    const selectedDate = new Date(data.publishedAt);
    if (!Number.isNaN(selectedDate.getTime())) return selectedDate;
  }
  return new Date();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");
  const admin = searchParams.get("admin") === "true";
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");
  const shouldPaginate = pageParam !== null || pageSizeParam !== null;
  const page = Math.max(1, Number.parseInt(pageParam || "1", 10) || 1);
  const pageSize = Math.min(50, Math.max(1, Number.parseInt(pageSizeParam || "10", 10) || 10));

  if (admin) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const where: Record<string, unknown> = {};
    if (published === "true") where.isPublished = true;

    if (shouldPaginate) {
      const [items, total] = await prisma.$transaction([
        prisma.blogPost.findMany({ where, orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }], skip: (page - 1) * pageSize, take: pageSize }),
        prisma.blogPost.count({ where }),
      ]);

      return NextResponse.json({ items, pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) } });
    }

    const blogs = await prisma.blogPost.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(blogs);
  } catch (error) {
    logServerError("api.blogs.GET", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 500;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to load blog posts.", status);
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const images = normalizeImages(data.images);
    const blog = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || "",
        content: data.content || "",
        coverImage: data.coverImage || images[0] || "",
        images: JSON.stringify(images),
        author: data.author || "R Singh",
        tags: JSON.stringify(normalizeTags(data.tags)),
        isPublished: data.isPublished || false,
        publishedAt: resolvePublishedAt(data),
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    logServerError("api.blogs.POST", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to create blog post. Check the fields and try again.", status);
  }
}
