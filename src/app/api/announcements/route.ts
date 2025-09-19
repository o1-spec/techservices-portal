/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, AuthenticatedRequest } from '@/middleware/auth';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcement';
import User from '@/models/User';

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (req.method === 'GET') {
      const announcements = await Announcement.find({ company_id: user.company_id })
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 });

      const formattedAnnouncements = announcements.map((ann) => ({
        id: ann._id.toString(),
        title: ann.title,
        content: ann.content,
        author: ann.createdBy?.name || 'Unknown',
        date: ann.createdAt.toISOString().split('T')[0],
        type: ann.type,
        priority: ann.priority,
      }));

      return NextResponse.json({ announcements: formattedAnnouncements });
    } else if (req.method === 'POST') {
      if (user.role !== 'Admin' && user.role !== 'Manager') {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }

      const { title, content } = await req.json();
      if (!title || !content) {
        return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
      }

      const announcement = new Announcement({
        title,
        content,
        type: 'general', // Default, can be passed from form
        priority: 'medium', // Default
        createdBy: user._id,
        company_id: user.company_id,
      });
      await announcement.save();

      return NextResponse.json(
        { message: 'Announcement created' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Announcements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add PUT and DELETE for /api/announcements/[id]
export const PUT = (request: NextRequest) =>
  authMiddleware(request, async (req) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split('/').pop();
      if (!id)
        return NextResponse.json({ error: 'ID required' }, { status: 400 });

      const user = await User.findById(req.user!.id);
      if (!user || (user.role !== 'Admin' && user.role !== 'Manager')) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      const { title, content, type, priority } = await request.json();
      await Announcement.findByIdAndUpdate(id, {
        title,
        content,
        type,
        priority,
      });
      return NextResponse.json({ message: 'Announcement updated' });
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });

export const DELETE = (request: NextRequest) =>
  authMiddleware(request, async (req) => {
    try {
      const url = new URL(request.url);
      const id = url.pathname.split('/').pop();
      if (!id)
        return NextResponse.json({ error: 'ID required' }, { status: 400 });

      const user = await User.findById(req.user!.id);
      if (!user || (user.role !== 'Admin' && user.role !== 'Manager')) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      await Announcement.findByIdAndDelete(id);
      return NextResponse.json({ message: 'Announcement deleted' });
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });

export const GET = (request: NextRequest) => authMiddleware(request, handler);
export const POST = (request: NextRequest) => authMiddleware(request, handler);