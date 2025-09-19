/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { FolderOpen, Calendar, Users, Target, Edit, Save, X, CheckCircle, Clock, AlertCircle, Plus, User, Mail, Phone, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Header from "@/components/Header"

// Mock project data

interface Project {
  id: string
  name: string
  description: string
  status: string
  deadline: string
  progress: number
  team: { id: string; name: string; role: string }[]
  tasks: { id: string; title: string; status: string; assignee: string }[]
}

interface MemberProfile {
  id: string
  name: string
  role: string
  email: string
  phone: string
  department: string
  status: string
  performance: number
  tasksCompleted: number
}

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "" })
  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "" })
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState<{ id: string; name: string; role: string }[]>([])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`, { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setProject(data.project)
        } else {
          console.error('Failed to fetch project')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/users', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setEmployees(data.users)
        } else {
          // Fallback to mock
          setEmployees([
            { id: "1", name: "John Doe", role: "Developer" },
            { id: "2", name: "Jane Smith", role: "Designer" },
            { id: "3", name: "Bob Johnson", role: "Developer" },
            { id: "4", name: "Alice Brown", role: "Manager" },
          ])
        }
      } catch (error) {
        // Fallback
        setEmployees([
          { id: "1", name: "John Doe", role: "Developer" },
          { id: "2", name: "Jane Smith", role: "Designer" },
          { id: "3", name: "Bob Johnson", role: "Developer" },
          { id: "4", name: "Alice Brown", role: "Manager" },
        ])
      }
    }

    fetchProject()
    fetchEmployees()
  }, [id])

  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null)

  const openProfileModal = (member: Project["team"][number]) => {
    const mockProfile = {
      ...member,
      email: `${member.name.toLowerCase().replace(' ', '.')}@company.com`,
      phone: "+1 (555) 123-4567",
      department: "Engineering",
      status: "Active",
      performance: 85,
      tasksCompleted: 12,
    }
    setSelectedMember(mockProfile)
    setIsProfileModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!project) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4" />
      case "In Progress": return <Clock className="h-4 w-4" />
      case "Pending": return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: project.name,
          description: project.description,
          status: project.status,
        }),
      })
      if (res.ok) {
        setIsEditing(false)
      } else {
        console.error('Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleAddTeamMember = async () => {
    if (newTeamMember.name && newTeamMember.role) {
      const selectedEmp = employees.find(emp => emp.name === newTeamMember.name)
      if (selectedEmp) {
        try {
          const res = await fetch(`/api/projects/${id}/team`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              userId: selectedEmp.id,
              role: newTeamMember.role,
            }),
          })
          if (res.ok) {
            // Refetch project to update team
            const fetchRes = await fetch(`/api/projects/${id}`, { credentials: 'include' })
            if (fetchRes.ok) {
              const data = await fetchRes.json()
              setProject(data.project)
            }
            setNewTeamMember({ name: "", role: "" })
            setIsAddTeamModalOpen(false)
          } else {
            console.error('Failed to add team member')
          }
        } catch (error) {
          console.error('Error adding team member:', error)
        }
      }
    }
  }
  const handleAddTask = async () => {
    if (newTask.title && newTask.assignee) {
      try {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            project_id: id,
            assignedTo: project.team.find(m => m.name === newTask.assignee)?.id || '',
          }),
        })
        if (res.ok) {
          const fetchRes = await fetch(`/api/projects/${id}`, { credentials: 'include' })
          if (fetchRes.ok) {
            const data = await fetchRes.json()
            setProject(data.project)
          }
          setNewTask({ title: "", description: "", assignee: "" })
          setIsAddTaskModalOpen(false)
        } else {
          console.error('Failed to add task')
        }
      } catch (error) {
        console.error('Error adding task:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Badge className={getStatusColor(project.status)}>
              {getStatusIcon(project.status)}
              <span className="ml-1">{project.status}</span>
            </Badge>
            {isEditing ? (
              <div className="flex space-x-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{project.progress}%</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <Progress value={project.progress} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Deadline</p>
                  <p className="text-2xl font-bold text-gray-900">{new Date(project.deadline).toLocaleDateString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold text-gray-900">{project.team.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
              <CardDescription>People working on this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => openProfileModal(member)}>
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
              <Dialog open={isAddTeamModalOpen} onOpenChange={setIsAddTeamModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Select Employee</label>
                      <Select value={newTeamMember.name} onValueChange={(value) => setNewTeamMember({ ...newTeamMember, name: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.name}>
                              {emp.name} - {emp.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role in Project</label>
                      <Input
                        value={newTeamMember.role}
                        onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                        placeholder="e.g., Developer, Designer"
                      />
                    </div>
                    <Button onClick={handleAddTeamMember} className="w-full">
                      Add Member
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Tasks
              </CardTitle>
              <CardDescription>Project tasks and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Task Title</label>
                      <Input
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Enter task title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Enter task description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Assign To</label>
                      <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          {project.team.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddTask} className="w-full">
                      Add Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {isEditing && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Edit Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Name</label>
                  <Input
                    value={project.name}
                    onChange={(e) => setProject({ ...project, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Select value={project.status} onValueChange={(value) => setProject({ ...project, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Deadline</label>
                    <Input
                      type="date"
                      value={project.deadline}
                      onChange={(e) => setProject({ ...project, deadline: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Profile Details</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">{selectedMember.name}</h3>
                <p className="text-lg text-gray-600">{selectedMember.role}</p>
                <Badge className={getStatusColor(selectedMember.status)} mt-2>
                  {selectedMember.status}
                </Badge>
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">{selectedMember.department}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Score</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${selectedMember.performance >= 90 ? 'text-green-600' : selectedMember.performance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {selectedMember.performance}%
                      </span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${selectedMember.performance >= 90 ? 'bg-green-500' : selectedMember.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${selectedMember.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tasks Completed</span>
                    <span className="font-semibold text-gray-900">{selectedMember.tasksCompleted}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>
                  Close
                </Button>
                <Button>
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}