import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [productCount, categoryCount, blogCount, totalInquiries, unreadInquiries, recentInquiries] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.productCategory.count(),
    prisma.blogPost.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { isRead: false } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { product: { select: { name: true } } } }),
  ]);

  return NextResponse.json({
    products: productCount,
    categories: categoryCount,
    blogs: blogCount,
    inquiries: { total: totalInquiries, unread: unreadInquiries },
    recentInquiries,
  });
}
