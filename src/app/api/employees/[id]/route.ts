import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/middleware/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

async function handler(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  try {
    if (!req.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'Admin') {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const employee = await User.findById(params.id);
    if (!employee || employee.company_id.toString() !== user.company_id.toString()) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    if (req.method === 'PUT') {
      const { name, email, role, status, phone, department } = await req.json();
      await User.findByIdAndUpdate(params.id, {
        name,
        email,
        role,
        isActive: status === 'Active',
        phone,
        department,
      });
      return NextResponse.json({ message: "Employee updated" });
    } else if (req.method === 'DELETE') {
      await User.findByIdAndUpdate(params.id, { isActive: false });
      return NextResponse.json({ message: "Employee deactivated" });
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    console.error("Employee error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const PUT = (request: NextRequest, context: { params: { id: string } }) => authMiddleware(request, (req) => handler(req, context));
export const DELETE = (request: NextRequest, context: { params: { id: string } }) => authMiddleware(request, (req) => handler(req, context));