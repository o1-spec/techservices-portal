/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAccessToken } from "@/lib/jwt"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define public routes (no auth needed)
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/verify-email",
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
    "/api/auth/verify-email",
    "/api/auth/resend-verification",
  ]

  // Define protected routes with required roles or allowed users
  const protectedRoutes = {
    "/dashboard": ["Admin", "Manager", "Employee"],
    "/my-team": ["Admin", "Manager"],
    "/projects": ["Admin", "Manager", "Employee"],
    "/announcements": ["Admin", "Manager"], // Only these roles
    "/reports": ["specific-users"], // Use allowedUsers list below
  }

  // List of specific allowed users (e.g., by email) for routes like /reports
  const allowedUsers = ["admin@example.com", "manager@example.com"]; // Replace with real emails

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !isPublicRoute) {
    console.log("Checking protection for:", pathname)
    const authToken = request.cookies.get("auth-token")?.value

    if (!authToken) {
      console.log("No token, redirecting to login")
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const payload = verifyAccessToken(authToken)
      const userRole = payload?.role
      const userEmail = payload?.email

      // Check role-based access
      const requiredRoles = protectedRoutes[pathname as keyof typeof protectedRoutes]
      if (requiredRoles && (!userRole || !requiredRoles.includes(userRole))) {
        console.log("Role not allowed, redirecting")
        const referer = request.headers.get("referer") || "/dashboard"
        return NextResponse.redirect(new URL(referer, request.url))
      }

      // Check specific users for routes like /reports
      if (
        pathname.startsWith("/reports") &&
        (!userEmail || !allowedUsers.includes(userEmail))
      ) {
        console.log("User not in allowed list, redirecting")
        const referer = request.headers.get("referer") || "/dashboard"
        return NextResponse.redirect(new URL(referer, request.url))
      }

      console.log("Access granted for:", pathname, "Role:", userRole)
    } catch (error) {
      console.error("Token error, redirecting to login")
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  const authToken = request.cookies.get("auth-token")?.value
  if (authToken && pathname.startsWith("/auth/") && !pathname.includes("/verify-email")) {
    try {
      const payload = verifyAccessToken(authToken)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // Allow access if token invalid
    }
  }

  // Redirect authenticated users from home to dashboard
  if (authToken && pathname === "/") {
    try {
      const payload = verifyAccessToken(authToken)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // Allow access if token invalid
    }
  }

  return NextResponse.next()
}

// ...existing config...
// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth/login (login endpoint)
     * - api/auth/register (register endpoint)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth/login|api/auth/register).*)",
  ],
}