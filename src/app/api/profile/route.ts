import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (req.method === 'GET') {
      const profile = {
        name: user.name,
        email: user.email,
        phone: user.phone || '+1 (555) 000-0000',
        location: user.location || 'Not specified',
        bio: user.bio || '',
        role: user.role,
        department: user.department || 'Engineering',
        joinDate: user.createdAt.toISOString().split('T')[0],
        avatar: user.avatar || null,
      };
      return NextResponse.json({ profile });
    } else if (req.method === 'PUT') {
      const { name, email, phone, location, bio, password } = await req.json();

      const updateData: {
        name?: string;
        email?: string;
        phone?: string;
        location?: string;
        bio?: string;
        password?: string;
      } = { name, email, phone, location, bio };
      if (password) {
        updateData.password = await bcrypt.hash(password, 12);
      }

      await User.findByIdAndUpdate(req.user.id, updateData);
      return NextResponse.json({ message: "Profile updated" });
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);
export const PUT = (request: NextRequest) => authMiddleware(request, handler);