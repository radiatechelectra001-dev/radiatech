import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Allow admin routes so you can still access admin if needed
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Show maintenance page for all other routes
  const maintenanceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contact Developer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      font-family: sans-serif;
      color: #111;
      text-align: center;
      padding: 2rem;
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    p { font-size: 1.5rem; }
  </style>
</head>
<body>
  <div>
    <h1>Please contact to developer</h1>
    <p>📞 9621492080</p>
  </div>
</body>
</html>`;

  return new NextResponse(maintenanceHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)",
  ],
};
