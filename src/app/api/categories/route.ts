import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeProducts = searchParams.get("includeProducts") === "true";

  const categories = await prisma.productCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: includeProducts ? { products: { where: { isActive: true }, orderBy: { createdAt: "desc" } } } : undefined,
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const category = await prisma.productCategory.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description || "",
        image: data.image || "",
        sortOrder: data.sortOrder || 0,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create category";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
