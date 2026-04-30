import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { sendInquiryEmails } from "@/lib/email";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const isRead = searchParams.get("isRead");
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");
  const shouldPaginate = pageParam !== null || pageSizeParam !== null;
  const page = Math.max(1, Number.parseInt(pageParam || "1", 10) || 1);
  const pageSize = Math.min(50, Math.max(1, Number.parseInt(pageSizeParam || "10", 10) || 10));

  const where: Record<string, unknown> = {};
  if (isRead === "true") where.isRead = true;
  if (isRead === "false") where.isRead = false;

  if (shouldPaginate) {
    const [items, total] = await prisma.$transaction([
      prisma.inquiry.findMany({
        where,
        include: { product: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({ items, pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) } });
  }

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
    const clientIdentifier = getClientIdentifier(req);
    const ipLimit = checkRateLimit({ key: `inquiry:ip:${clientIdentifier}`, limit: 8, windowMs: 15 * 60 * 1000 });

    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many inquiry submissions. Please try again after a short break." },
        { status: 429, headers: { "Retry-After": String(ipLimit.retryAfter) } },
      );
    }

    if (!data.name || !data.phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const contactKey = String(data.email || data.phone || "").toLowerCase().replace(/\s+/g, "");
    if (contactKey) {
      const contactLimit = checkRateLimit({ key: `inquiry:contact:${contactKey}`, limit: 5, windowMs: 60 * 60 * 1000 });
      if (!contactLimit.allowed) {
        return NextResponse.json(
          { error: "Too many submissions from this contact. Please try again later." },
          { status: 429, headers: { "Retry-After": String(contactLimit.retryAfter) } },
        );
      }
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

    const delivery = await sendInquiryEmails(emailData);
    if (!delivery.admin.ok || !delivery.customer.ok) {
      console.error("[Inquiry email] Delivery failed", delivery);
      return NextResponse.json(
        {
          success: true,
          warning: "Inquiry saved. Email delivery needs attention in server email settings.",
          email: delivery,
          id: inquiry.id,
        },
        { status: 201 },
      );
    }

    return NextResponse.json({ success: true, id: inquiry.id, email: delivery }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to submit inquiry" }, { status: 500 });
  }
}
