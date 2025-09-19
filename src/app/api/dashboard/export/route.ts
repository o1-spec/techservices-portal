import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Task from "@/models/Task";
import Announcement from "@/models/Announcement";
import PDFDocument from 'pdfkit';

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

    const url = new URL(req.url);
    const format = url.searchParams.get('format') || 'csv';

    const stats: Record<string, number> = {};
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

    if (format === 'pdf') {
      // Generate PDF with pdfkit
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {});

      doc.fontSize(20).text('Dashboard Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`User: ${user.name} (${user.role})`);
      doc.moveDown();
      doc.fontSize(12).text('Stats:');
      Object.entries(stats).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`);
      });
      doc.end();

      const pdfBuffer = Buffer.concat(buffers);

      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=dashboard-report.pdf',
        },
      });
    } else if (format === 'excel') {
      // Keep XLSX for Excel
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet([stats]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      return new NextResponse(excelBuffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=dashboard-report.xlsx',
        },
      });
    } else {
      // Keep CSV
      const headers = Object.keys(stats).join(',');
      const values = Object.values(stats).join(',');
      const csv = `${headers}\n${values}`;

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=dashboard-report.csv',
        },
      });
    }
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);