import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession, verifyPassword, hashPassword } from "@/lib/auth";
import { logServerError } from "@/lib/api";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // 1. Auth check
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Rate limit: 5 attempts per 15 min per admin id
  const clientIdentifier = getClientIdentifier(req);
  const limit = checkRateLimit({
    key: `change-password:${session.id}:${clientIdentifier}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body as { currentPassword?: string; newPassword?: string };

    // 3. Input validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
    }

    if (newPassword === currentPassword) {
      return NextResponse.json({ error: "New password must be different from the current password." }, { status: 400 });
    }

    // 4. Fetch user from DB
    const user = await prisma.adminUser.findUnique({ where: { id: session.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // 5. Verify current password
    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
    }

    // 6. Hash and save new password
    const hashed = await hashPassword(newPassword);
    await prisma.adminUser.update({
      where: { id: session.id },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logServerError("api.auth.change-password", error);
    return NextResponse.json({ error: "Failed to change password. Please try again." }, { status: 500 });
  }
}
