"use client"
import { useState } from "react"
import { MessageSquare, Plus, User, Calendar, Edit, Trash2, Search, AlertCircle, Info, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

type UserRole = "Admin" | "Manager" | "Employee"
const userRole: UserRole = "Employee" 

interface Announcement {
  id: number
  title: string
  content: string
  author: string
  date: string
  type: "general" | "important" | "update"
  priority: "low" | "medium" | "high"
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: "New Project Launch", content: "We're excited to announce the launch of our new project.", author: "Admin", date: "2025-09-15", type: "update", priority: "high" },
    { id: 2, title: "Team Meeting", content: "Weekly team meeting scheduled for Friday.", author: "Manager", date: "2025-09-14", type: "general", priority: "medium" },
    { id: 3, title: "System Maintenance", content: "Scheduled maintenance on Sunday from 2-4 AM.", author: "Admin", date: "2025-09-13", type: "important", priority: "high" },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", content: "", type: "general" as Announcement["type"], priority: "medium" as Announcement["priority"] })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | Announcement["type"]>("all")

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ann.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || ann.type === filterType
    return matchesSearch && matchesType
  })

  const handleSave = () => {
    if (isEditing && editingId) {
      setAnnouncements(announcements.map(ann => ann.id === editingId ? { ...ann, ...form } : ann))
      setIsEditing(false)
      setEditingId(null)
    } else {
      setAnnouncements([...announcements, { id: Date.now(), author: userRole, date: new Date().toISOString().split('T')[0], ...form }])
      setIsModalOpen(false)
    }
    setForm({ title: "", content: "", type: "general", priority: "medium" })
  }

  const handleEdit = (ann: Announcement) => {
    setForm({ title: ann.title, content: ann.content, type: ann.type, priority: ann.priority })
    setIsEditing(true)
    setEditingId(ann.id)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "important": return <AlertCircle className="h-5 w-5 text-red-600" />
      case "update": return <CheckCircle className="h-5 w-5 text-green-600" />
      default: return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const canManageAnnouncements = userRole === "Admin" || userRole === "Manager"

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
            <p className="text-gray-600">Stay updated with the latest news and updates</p>
          </div>
          {canManageAnnouncements && (
            <Button onClick={() => setIsModalOpen(true)} className="mt-4 lg:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Announcement
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={(value: "all" | Announcement["type"]) => setFilterType(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="update">Update</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No announcements found.</p>
            </div>
          ) : (
            filteredAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-l-blue-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(ann.type)}
                    <h3 className="text-xl font-semibold text-gray-900">{ann.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(ann.priority)}>
                      {ann.priority} priority
                    </Badge>
                    {canManageAnnouncements && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(ann)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(ann.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{ann.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {ann.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {ann.date}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open)
        if (!open) {
          setIsEditing(false)
          setEditingId(null)
          setForm({ title: "", content: "", type: "general", priority: "medium" })
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Announcement" : "Add Announcement"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Announcement title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Announcement content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={form.type} onValueChange={(value: Announcement["type"]) => setForm({ ...form, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select value={form.priority} onValueChange={(value: Announcement["priority"]) => setForm({ ...form, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}