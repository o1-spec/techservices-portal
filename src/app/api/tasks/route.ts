import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
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

    if (req.method === 'POST') {
      if (user.role !== 'Admin' && user.role !== 'Manager') {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
      }

      const { title, description, project_id, assignedTo } = await req.json();
      if (!title || !project_id || !assignedTo) {
        return NextResponse.json({ error: "Title, project ID, and assignee are required" }, { status: 400 });
      }

      const task = new Task({
        title,
        description: description || '',
        status: 'pending',
        assignedTo,
        project_id,
      });
      await task.save();

      return NextResponse.json({ message: "Task created", task: { id: task._id.toString(), ...task.toObject() } }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error("Tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const POST = (request: NextRequest) => authMiddleware(request, handler);