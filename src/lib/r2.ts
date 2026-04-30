import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { logServerError } from "@/lib/api";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || "radiatech-images";
const PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function isR2Configured(): boolean {
  return !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_PUBLIC_URL);
}

/**
 * Upload a file to Cloudflare R2
 * @param file The File object from FormData
 * @param folder Subfolder like "products", "categories", "blogs"
 * @returns Public URL of the uploaded image
 */
export async function uploadToR2(file: File, folder: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("File must be under 5MB");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .toLowerCase()
    .slice(0, 50);
  const timestamp = Date.now();
  const key = `${folder}/${timestamp}-${safeName}.${ext}`;

  await R2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  // Return the public URL
  return `${PUBLIC_URL}/${key}`;
}

/**
 * Delete a file from Cloudflare R2 by its URL
 */
export async function deleteFromR2(url: string): Promise<void> {
  if (!url || !PUBLIC_URL || !url.startsWith(PUBLIC_URL)) return;

  const key = url.replace(`${PUBLIC_URL}/`, "");

  try {
    await R2.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
  } catch (err) {
    logServerError("r2.delete", err);
  }
}
