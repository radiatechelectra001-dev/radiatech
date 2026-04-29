import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");

  const where: Record<string, unknown> = {};
  if (published === "true") where.isPublished = true;

  const blogs = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const blog = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || "",
        content: data.content || "",
        coverImage: data.coverImage || "",
        author: data.author || "R Singh",
        tags: JSON.stringify(data.tags || []),
        isPublished: data.isPublished || false,
        publishedAt: data.isPublished ? new Date() : null,
      },
    });
    return NextResponse.json(blog, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create blog";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
