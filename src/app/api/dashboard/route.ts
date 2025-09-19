import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Task from "@/models/Task";
import Announcement from "@/models/Announcement";

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

    interface Stats {
      employees?: number;
      projects?: number;
      tasks?: number;
      announcements?: number;
      teamMembers?: number;
      myTasks?: number;
      performance?: number;
    }
    const stats: Stats = {};

    if (user.role === "Admin") {
      stats.employees = await User.countDocuments();

      stats.projects = await Project.countDocuments({ status: 'active' });

      stats.tasks = await Task.countDocuments({ status: { $in: ['pending', 'in_progress'] } });

      stats.announcements = await Announcement.countDocuments();
    } else if (user.role === "Manager") {
      stats.teamMembers = await User.countDocuments({ company_id: user.company_id, role: 'Employee' });

      stats.projects = await Project.countDocuments({ assignedTo: user._id });

      const teamMemberIds = await User.find({ company_id: user.company_id, role: 'Employee' }).select('_id');
      stats.tasks = await Task.countDocuments({ assignedTo: { $in: teamMemberIds } });

      stats.announcements = await Announcement.countDocuments();
    } else if (user.role === "Employee") {
      stats.myTasks = await Task.countDocuments({ assignedTo: user._id });

      const totalTasks = await Task.countDocuments({ assignedTo: user._id });
      const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: 'completed' });
      stats.performance = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      stats.tasks = await Task.countDocuments({ assignedTo: user._id, status: { $in: ['pending', 'in_progress'] } });

      stats.announcements = await Announcement.countDocuments();
    }

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);