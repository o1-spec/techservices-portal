import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, AuthenticatedRequest } from '@/middleware/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Task from '@/models/Task';

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'Manager') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const teamMembers = await User.find({
      company_id: user.company_id,
      role: 'Employee',
    });

    const formattedTeam = await Promise.all(
      teamMembers.map(async (member) => {
        const totalTasks = await Task.countDocuments({
          assignedTo: member._id,
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: member._id,
          status: 'completed',
        });
        const performance =
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return {
          id: String(member._id),
          name: member.name,
          email: member.email,
          phone: member.phone || '+1 (555) 000-0000',
          role: member.role,
          department: member.department || 'Engineering',
          status: member.isActive ? 'Active' : 'Inactive',
          performance,
          tasksCompleted: completedTasks,
        };
      })
    );

    return NextResponse.json({ team: formattedTeam });
  } catch (error) {
    console.error('My team error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);
