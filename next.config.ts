import type { NextConfig } from "next";

type RemotePattern = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>[number];

const remotePatterns: RemotePattern[] = [
  {
    protocol: "https" as const,
    hostname: "pub-6f6e10a32fff4209bd4d2f49885eafe7.r2.dev",
    port: "",
    pathname: "/**",
    search: "",
  },
];

if (process.env.R2_PUBLIC_URL) {
  try {
    const r2PublicUrl = new URL(process.env.R2_PUBLIC_URL);
    const pattern = {
      protocol: r2PublicUrl.protocol.replace(":", "") as "http" | "https",
      hostname: r2PublicUrl.hostname,
      port: r2PublicUrl.port,
      pathname: "/**",
      search: "",
    };

    if (!remotePatterns.some((remotePattern) => remotePattern.hostname === pattern.hostname)) {
      remotePatterns.push(pattern);
    }
  } catch {
    // Invalid R2_PUBLIC_URL should not prevent the app from starting.
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking — page cannot be embedded in an iframe on another site
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Force HTTPS for 1 year, include subdomains
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Control what info is sent in the Referer header
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser features (camera, mic, geolocation, etc.)
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Basic XSS protection for older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
