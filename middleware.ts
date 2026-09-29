import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        if (
          path === "/" || 
          path === "/login" || 
          path === "/signup" || 
          path.startsWith("/api") ||
          path.startsWith("/_next") ||
          path === "/favicon.ico"
        ) {
          return true; // Public routes
        }
        return !!token; // Require token for other routes
      },
    },
  }
)

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
