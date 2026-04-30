import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeProducts = searchParams.get("includeProducts") === "true";

    const categories = await prisma.productCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: includeProducts ? { products: { where: { isActive: true }, orderBy: { createdAt: "desc" } } } : undefined,
    });
    return NextResponse.json(categories);
  } catch (error) {
    logServerError("api.categories.GET", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 500;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to load categories.", status);
  }
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
  } catch (error) {
    logServerError("api.categories.POST", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to create category. Check the fields and try again.", status);
  }
}
