import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

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
      if (user.role !== 'Admin') {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
      }

      const employees = await User.find({ company_id: user.company_id, role: { $ne: 'Admin' } }).select('name email role isActive phone department');
      const formattedEmployees = (employees as Array<{ _id: string; name: string; email: string; role: string; isActive: boolean; phone?: string; department?: string }>).map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        email: emp.email,
        role: emp.role,
        status: emp.isActive ? 'Active' : 'Inactive',
        phone: emp.phone || '+1 (555) 000-0000',
        department: emp.department || 'Engineering',
      }));

      return NextResponse.json({ employees: formattedEmployees });
    } else if (req.method === 'POST') {
      if (user.role !== 'Admin') {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
      }

      const { name, email, role, status, phone, department } = await req.json();
      if (!name || !email || !role) {
        return NextResponse.json({ error: "Name, email, and role are required" }, { status: 400 });
      }

      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
      }

      // Generate random password
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 12);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        company_id: user.company_id,
        isActive: status === 'Active',
        phone,
        department,
      });
      await newUser.save();

      // TODO: Send email with randomPassword

      return NextResponse.json({ message: "Employee created", employee: { id: String(newUser._id), name, email, role, status, phone, department } }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error("Employees error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const GET = (request: NextRequest) => authMiddleware(request, handler);
export const POST = (request: NextRequest) => authMiddleware(request, handler);