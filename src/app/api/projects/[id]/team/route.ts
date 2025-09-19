import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import User from "@/models/User";

async function handler(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (req.method === 'POST') {
      if (user.role !== 'Admin' && user.role !== 'Manager') {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
      }

      const { userId, role } = await req.json();
      if (!userId || !role) {
        return NextResponse.json({ error: "User ID and role are required" }, { status: 400 });
      }

      // Check if user exists
      const teamUser = await User.findById(userId);
      if (!teamUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Add to team
      project.team.push({ user: userId, role });
      await project.save();

      return NextResponse.json({ message: "Team member added" });
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error("Team error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const POST = (request: NextRequest, context: { params: { id: string } }) => authMiddleware(request, (req) => handler(req, context));