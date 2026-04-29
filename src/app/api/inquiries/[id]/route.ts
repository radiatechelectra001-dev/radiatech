import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  try {
    const inquiry = await prisma.inquiry.update({ where: { id }, data: { isRead: data.isRead } });
    return NextResponse.json(inquiry);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.inquiry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
