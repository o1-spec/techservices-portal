"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { FolderOpen, Calendar, Users, Target, Edit, Save, X, CheckCircle, Clock, AlertCircle, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

// Mock project data
interface Project {
  id: number
  name: string
  description: string
  status: string
  deadline: string
  progress: number
  team: { id: number; name: string; role: string }[]
  tasks: { id: number; title: string; status: string; assignee: string }[]
}

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // TODO: Fetch project by id
    setProject({
      id: Number(id),
      name: "Website Redesign",
      description: "Complete overhaul of the company website with modern design and improved UX.",
      status: "In Progress",
      deadline: "2025-12-01",
      progress: 65,
      team: [
        { id: 1, name: "John Doe", role: "Lead Developer" },
        { id: 2, name: "Jane Smith", role: "UI/UX Designer" },
        { id: 3, name: "Bob Johnson", role: "Backend Developer" },
      ],
      tasks: [
        { id: 1, title: "Design mockups", status: "Completed", assignee: "Jane Smith" },
        { id: 2, title: "Frontend development", status: "In Progress", assignee: "John Doe" },
        { id: 3, title: "API integration", status: "Pending", assignee: "Bob Johnson" },
      ],
    })
  }, [id])

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

  const handleSave = () => {
    // TODO: Save project updates
    setIsEditing(false)
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
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
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
              <Button className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
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
    </div>
  )
}