import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const tasks = await Task.find({ assignedTo: req.user.id }).populate('project_id', 'name').sort({ createdAt: -1 });

    const formattedTasks = tasks.map(task => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority, // Now from model
      dueDate: task.createdAt.toISOString().split('T')[0],
      projectName: task.project_id?.name || 'Unknown',
      progress: task.status === 'completed' ? 100 : task.status === 'in_progress' ? 50 : 0,
      assignee: req.user!.name, // Add ! to assert non-null
    }));

    return NextResponse.json({ tasks: formattedTasks });
  } catch (error) {
    console.error("My tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);