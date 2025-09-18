/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAccessToken } from "@/lib/jwt"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /auth/login)
  const { pathname } = request.nextUrl

  // Define public routes that don't require authentication
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

  // Define API routes that require authentication
  const protectedApiRoutes = [
    "/api/auth/logout",
    "/api/dashboard",
    "/api/employees",
    "/api/projects",
    "/api/tasks",
    "/api/announcements",
    "/api/users",
  ]

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
  const isProtectedApiRoute = protectedApiRoutes.some((route) => pathname.startsWith(route))
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const isMyTeamRoute = pathname.startsWith("/my-team")
  const isProjectsRoute = pathname.startsWith("/projects")
  const isAnnouncementsRoute = pathname.startsWith("/announcements")

  // Only check authentication for protected routes
  if (isDashboardRoute || isProtectedApiRoute || isMyTeamRoute || isProjectsRoute || isAnnouncementsRoute) {
    console.log("Protected route:", pathname)
    // Check if user has authentication token
    const authToken = request.cookies.get("auth-token")?.value

    // Verify token if it exists
    let isValidToken = false
    let userRole = null
    if (authToken) {
      try {
        const payload = verifyAccessToken(authToken)
        isValidToken = !!payload
        userRole = payload?.role
        console.log("Token verified, user role:", userRole)
      } catch (error) {
        console.error('Token verification error:', error)
        isValidToken = false
      }
    } else {
      console.log("No auth token found")
    }

    // If user is not authenticated and trying to access a protected route
    if (!isValidToken) {
      console.log("User not authenticated, redirecting to login")
      // For API routes, return 401
      if (isProtectedApiRoute) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      
      // For dashboard routes, redirect to login
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check role-based access (e.g., only Admin can access certain routes)
    if (isMyTeamRoute && userRole !== 'Manager' && userRole !== 'Admin') {
      console.log("Non-manager/admin trying to access my-team, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    console.log("Access granted for:", pathname, "Role:", userRole)
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  const authToken = request.cookies.get("auth-token")?.value
  if (authToken && pathname.startsWith("/auth/") && !pathname.includes("/verify-email")) {
    try {
      const payload = verifyAccessToken(authToken)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // Invalid token, allow access to auth pages
    }
  }

  // If user is authenticated and trying to access home page, redirect to dashboard
  if (authToken && pathname === "/") {
    try {
      const payload = verifyAccessToken(authToken)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // Invalid token, allow access to home page
    }
  }

  // Allow the request to continue
  return NextResponse.next()
}

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