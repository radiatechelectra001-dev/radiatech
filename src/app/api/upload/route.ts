import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";
import { uploadToR2, isR2Configured } from "@/lib/r2";
import { jsonError, logServerError } from "@/lib/api";

function sanitizeFolder(value: string) {
  const folder = value
    .split("/")
    .map((part) => part.replace(/[^a-zA-Z0-9_-]/g, ""))
    .filter(Boolean)
    .join("/");

  return folder || "uploads";
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = sanitizeFolder((formData.get("folder") as string) || "uploads");

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, WebP, and GIF images are allowed" }, { status: 400 });
    }

    // Limit 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
    }

    if (isR2Configured()) {
      const url = await uploadToR2(file, folder);
      return NextResponse.json({ url, storage: "r2" });
    }

    if (process.env.NODE_ENV === "production") {
      return jsonError("File storage is not configured.", 503);
    }

    // Fallback: local file storage (development only)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
    const timestamp = Date.now();
    const filename = `${timestamp}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public", "images", folder);
    await mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      url: `/images/${folder}/${filename}`,
      storage: "local",
    });
  } catch (error) {
    logServerError("api.upload.POST", error);
    return jsonError("Upload failed. Please try again.", 500);
  }
}
