import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id).exec();

    if (!user) {
      return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company_id: user.company_id,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);