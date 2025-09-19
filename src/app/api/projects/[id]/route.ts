import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, AuthenticatedRequest } from '@/middleware/auth';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Task from '@/models/Task';
import User from '@/models/User';

interface PopulatedTeam {
  user: {
    _id: string;
    name: string;
  };
  role: string;
}

async function handler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const project = await Project.findById(params.id).populate(
      'team.user',
      'name'
    );
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (
      user.role !== 'Admin' &&
      project.assignedTo.toString() !== (user._id as string).toString()
    ) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (req.method === 'GET') {
      const tasks = await Task.find({ project_id: params.id }).populate(
        'assignedTo',
        'name'
      );
      const formattedProject = {
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        deadline: project.createdAt.toISOString().split('T')[0],
        progress: 0,
        team: project.team.map((t: PopulatedTeam) => ({
          id: t.user._id.toString(),
          name: t.user.name,
          role: t.role,
        })),
        tasks: tasks.map((task) => ({
          id: task._id.toString(),
          title: task.title,
          status: task.status,
          assignee: task.assignedTo?.name || 'Unknown',
        })),
      };

      return NextResponse.json({ project: formattedProject });
    } else if (req.method === 'PUT') {
      if (user.role !== 'Admin' && user.role !== 'Manager') {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      const { name, description, status } = await req.json();
      await Project.findByIdAndUpdate(params.id, { name, description, status });
      return NextResponse.json({ message: 'Project updated' });
    } else if (req.method === 'DELETE') {
      if (user.role !== 'Admin') {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      await Project.findByIdAndDelete(params.id);
      return NextResponse.json({ message: 'Project deleted' });
    } else {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = (
  request: NextRequest,
  context: { params: { id: string } }
) => authMiddleware(request, (req) => handler(req, context));
export const PUT = (
  request: NextRequest,
  context: { params: { id: string } }
) => authMiddleware(request, (req) => handler(req, context));
export const DELETE = (
  request: NextRequest,
  context: { params: { id: string } }
) => authMiddleware(request, (req) => handler(req, context));
