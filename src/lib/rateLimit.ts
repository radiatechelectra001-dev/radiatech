import { NextRequest } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

const globalForRateLimit = globalThis as unknown as {
  rateLimitStore?: Map<string, RateLimitEntry>;
};

const store = globalForRateLimit.rateLimitStore ?? new Map<string, RateLimitEntry>();
globalForRateLimit.rateLimitStore = store;

export function getClientIdentifier(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: Math.max(0, limit - 1), resetAt, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetAt: existing.resetAt, retryAfter };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
    retryAfter: 0,
  };
}