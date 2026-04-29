import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const isRead = searchParams.get("isRead");

  const where: Record<string, unknown> = {};
  if (isRead === "true") where.isRead = true;
  if (isRead === "false") where.isRead = false;

  const inquiries = await prisma.inquiry.findMany({
    where,
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name.slice(0, 200),
        email: (data.email || "").slice(0, 200),
        phone: data.phone.slice(0, 20),
        company: (data.company || "").slice(0, 200),
        message: (data.message || "").slice(0, 2000),
        quantity: (data.quantity || "").slice(0, 100),
        productId: data.productId || null,
        productName: (data.productName || "").slice(0, 200),
        source: data.source || "website",
      },
    });

    // Send DUAL emails (non-blocking)
    const emailData = {
      name: data.name,
      email: data.email || "",
      phone: data.phone,
      company: data.company,
      message: data.message || "",
      quantity: data.quantity,
      productName: data.productName,
      source: data.source || "website",
    };

    // 1. Notify admin about new inquiry
    sendAdminNotification(emailData).catch(console.error);

    // 2. Send confirmation to customer only when email is provided
    if (data.email) {
      sendCustomerConfirmation(emailData).catch(console.error);
    }

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
