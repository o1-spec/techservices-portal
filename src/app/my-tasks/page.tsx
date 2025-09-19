"use client"
import { useEffect, useState } from "react"
import { FolderOpen, CheckCircle, Clock, AlertTriangle, Calendar, User, Edit, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

// Mock task data (replace with API fetch)
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
}

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState("All")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/my-tasks', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setTasks(data.tasks)
        } else {
          console.error('Failed to fetch tasks')
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(task => filter === "All" || task.status === filter)

  const updateStatus = (id: number, newStatus: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Progress": return <Clock className="h-4 w-4 text-blue-600" />
      case "Pending": return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">My Tasks</h1>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Tasks</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-all border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    {task.title}
                  </CardTitle>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{task.projectName}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{task.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {task.assignee}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select value={task.status} onValueChange={(value) => updateStatus(task.id, value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => window.location.href = `/my-tasks/${task.id}`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>

                <Button variant="ghost" className="w-full" onClick={() => window.location.href = `/my-tasks/${task.id}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Details & Comments
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tasks found matching the filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}