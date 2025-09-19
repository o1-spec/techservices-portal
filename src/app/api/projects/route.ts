import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import User from "@/models/User";
import Task from "@/models/Task";

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
      let projects;
      if (user.role === "Admin") {
        projects = await Project.find().populate('assignedTo', 'name').populate('company_id', 'name');
      } else if (user.role === "Manager") {
        projects = await Project.find({ assignedTo: user._id }).populate('assignedTo', 'name').populate('company_id', 'name');
      } else {
        // Employees see projects they have tasks in
        const taskProjects = await Task.find({ assignedTo: user._id }).distinct('project_id');
        projects = await Project.find({ _id: { $in: taskProjects } }).populate('assignedTo', 'name').populate('company_id', 'name');
      }

      const formattedProjects = projects.map(project => ({
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        deadline: project.createdAt.toISOString().split('T')[0],
        team: project.team.length,
        progress: 0, 
      }));

      return NextResponse.json({ projects: formattedProjects });
    } else if (req.method === 'POST') {
      if (user.role !== 'Admin' && user.role !== 'Manager') {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
      }

      const { name, description } = await req.json();
      if (!name || !description) {
        return NextResponse.json({ error: "Name and description are required" }, { status: 400 });
      }

      const project = new Project({
        name,
        description,
        status: 'active',
        assignedTo: user._id,
        company_id: user.company_id,
        team: [], // Initialize empty
      });
      await project.save();

      return NextResponse.json({ message: "Project created", project: { id: project._id.toString(), ...project.toObject() } }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error("Projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);
export const POST = (request: NextRequest) => authMiddleware(request, handler);