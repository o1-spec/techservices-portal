import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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

    let users;
    if (user.role === "Admin") {
      users = await User.find({ company_id: user.company_id }).select('name role');
    } else if (user.role === "Manager") {
      users = await User.find({ company_id: user.company_id, role: 'Employee' }).select('name role');
    } else {
      // Employees can't fetch users
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const formattedUsers = users.map(u => ({
      id: (u._id as { toString: () => string }).toString(),
      name: u.name,
      role: u.role,
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error("Users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);