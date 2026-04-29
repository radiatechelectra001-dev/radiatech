import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: { id: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { id: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<{ id: string; email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(): Promise<{ id: string; email: string }> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
