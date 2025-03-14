import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if API keys are set in localStorage
  // Note: This is a client-side check, so we'll redirect to the API setup page
  // on the client side. This middleware is just to ensure direct URL access is handled.

  // Skip API setup page to avoid redirect loop
  if (request.nextUrl.pathname === "/api-setup") {
    return NextResponse.next()
  }

  // Skip for static files
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next()
  }

  // For all other routes, we'll check on the client side
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

