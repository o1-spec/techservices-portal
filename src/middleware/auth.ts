import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    role: string
    name: string
  }
}

export async function authMiddleware(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization')
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    const tokenFromCookie = request.cookies.get('auth-token')?.value

    const token = tokenFromHeader || tokenFromCookie

    if (!token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      )
    }

    // Verify the token
    const payload = verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Connect to database and get user details
    await connectDB()
    const user = await User.findById(payload.userId).select('-password')

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }

    // Add user to request object
    const authenticatedRequest = request as AuthenticatedRequest
    authenticatedRequest.user = {
      id: (user._id as string).toString(),
      email: user.email,
      role: user.role,
      name: user.name
    }

    // Call the handler with authenticated request
    return await handler(authenticatedRequest)
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

export function requireAuth(handler: (req: AuthenticatedRequest, context?: unknown) => Promise<NextResponse>) {
  return (request: NextRequest, context?: unknown) => authMiddleware(request, (req) => handler(req, context))
}

export function requireRole(roles: string[]) {
  return function(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return (request: NextRequest) => authMiddleware(request, async (req) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }
      return await handler(req)
    })
  }
}

export function requireAdmin(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return requireRole(['Admin'])(handler)
}

export function requireAdminOrManager(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return requireRole(['Admin', 'Manager'])(handler)
}