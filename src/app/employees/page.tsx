"use client"
import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, Filter, Users, Mail, Shield, Activity } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"


interface Employee {
  id: string
  name: string
  email: string
  role: string
  status: string
  phone?: string
  department?: string
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [form, setForm] = useState({ name: "", email: "", role: "Employee", status: "Active", phone: "", department: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/employees', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setEmployees(data.employees)
        } else {
          console.error('Failed to fetch employees')
        }
      } catch (error) {
        console.error('Error fetching employees:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const openModal = (employee: Employee | null = null) => {
    setEditingEmployee(employee)
    setForm(
      employee
        ? {
          name: employee.name,
          email: employee.email,
          role: employee.role,
          status: employee.status,
          phone: employee.phone ?? "",
          department: employee.department ?? "",
        }
        : { name: "", email: "", role: "Employee", status: "Active", phone: "", department: "" }
    )
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      const method = editingEmployee ? 'PUT' : 'POST'
      const url = editingEmployee ? `/api/employees/${editingEmployee.id}` : '/api/employees'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          status: form.status,
          phone: form.phone || '+1 (555) 000-0000',
          department: form.department || 'Engineering',
        }),
      })
      if (res.ok) {
        const data = await res.json()
        if (editingEmployee) {
          setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...form } : emp))
        } else {
          setEmployees([...employees, data.employee])
        }
        setIsModalOpen(false)
        setEditingEmployee(null)
        setForm({ name: "", email: "", role: "Employee", status: "Active", phone: "", department: "" })
      } else {
        console.error('Failed to save employee')
      }
    } catch (error) {
      console.error('Error saving employee:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setEmployees(employees.filter(emp => emp.id !== id))
      } else {
        console.error('Failed to delete employee')
      }
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "All" || emp.role === filterRole
    const matchesStatus = filterStatus === "All" || emp.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-4 w-4 text-destructive" />
      case "Manager":
        return <Users className="h-4 w-4 text-secondary" />
      default:
        return <Users className="h-4 w-4 text-muted-foreground" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-muted-foreground">Loading employees...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Employee Management</h1>
            <p className="text-muted-foreground text-lg">Manage your team members and their roles efficiently.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="bg-card p-3 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-card-foreground">{employees.length} Total</span>
              </div>
            </div>
            <Button onClick={() => openModal()} className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-5 w-5 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search employees by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <Activity className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {filteredEmployees.map((emp: Employee) => (
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-card-foreground">{emp.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getRoleIcon(emp.role)}
                        <span className="ml-2 text-sm font-medium text-card-foreground">{emp.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${emp.status === "Active"
                          ? "bg-chart-4/10 text-chart-4 border border-chart-4/20"
                          : "bg-destructive/10 text-destructive border border-destructive/20"
                          }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${emp.status === "Active" ? "bg-chart-4" : "bg-destructive"
                            }`}
                        />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModal(emp)}
                          className="text-secondary hover:text-secondary/80 hover:bg-secondary/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(emp.id)}
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No employees found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter email address"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Department</label>
              <Input
                placeholder="Enter department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Role</label>
                <Select value={form.role} onValueChange={(value: string) => setForm({ ...form, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status</label>
                <Select value={form.status} onValueChange={(value: string) => setForm({ ...form, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-secondary hover:bg-secondary/90">
                {editingEmployee ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
