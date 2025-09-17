"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {  Calendar, User, Target, Edit, Save, X, CheckCircle, Clock, AlertTriangle, MessageSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

// Mock task data
interface Task {
  id: number
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  projectName: string
  progress: number
  assignee: string
  comments: { id: number; author: string; content: string; date: string }[]
}

export default function TaskDetails() {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // TODO: Fetch task by id
    setTask({
      id: Number(id),
      title: "Complete Frontend Development",
      description: "Implement the user interface for the new dashboard feature including responsive design and accessibility.",
      status: "In Progress",
      priority: "High",
      dueDate: "2025-09-20",
      projectName: "Website Redesign",
      progress: 70,
      assignee: "John Doe",
      comments: [
        { id: 1, author: "Manager", content: "Please ensure the design is mobile-friendly.", date: "2025-09-05" },
        { id: 2, author: "John Doe", content: "Working on the responsive layout now.", date: "2025-09-10" },
      ],
    })
  }, [id])

  if (!task) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-5 w-5 text-green-600" />
      case "In Progress": return <Clock className="h-5 w-5 text-blue-600" />
      case "Pending": return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSave = () => {
    // TODO: Save task updates
    setIsEditing(false)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: task.comments.length + 1,
        author: "John Doe", // Current user
        content: newComment,
        date: new Date().toISOString().split('T')[0],
      }
      setTask({ ...task, comments: [...task.comments, comment] })
      setNewComment("")
    }
  }

  const updateStatus = (newStatus: string) => {
    setTask({ ...task, status: newStatus })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <p className="text-gray-600">Project: {task.projectName}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority} Priority
            </Badge>
            <Badge className={`flex items-center gap-1 ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {getStatusIcon(task.status)}
              {task.status}
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
                Edit Task
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
                  <p className="text-2xl font-bold text-gray-900">{task.progress}%</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <Progress value={task.progress} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Due Date</p>
                  <p className="text-2xl font-bold text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignee</p>
                  <p className="text-2xl font-bold text-gray-900">{task.assignee}</p>
                </div>
                <User className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  {isEditing ? (
                    <Textarea
                      value={task.description}
                      onChange={(e) => setTask({ ...task, description: e.target.value })}
                      rows={4}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    {isEditing ? (
                      <Select value={task.priority} onValueChange={(value) => setTask({ ...task, priority: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-600 mt-1">{task.priority}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    {isEditing ? (
                      <Select value={task.status} onValueChange={updateStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-gray-600 mt-1">{task.status}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Due Date</label>
                    <Input
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
              <CardDescription>Discussion and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}