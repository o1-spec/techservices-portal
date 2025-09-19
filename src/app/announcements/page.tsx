"use client"
import { useEffect, useState } from "react"
import { MessageSquare, Plus, User, Calendar, Edit, Trash2, Search, AlertCircle, Info, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

interface Announcement {
  id: string  // Change to string
  title: string
  content: string
  author: string
  date: string
  type: "general" | "important" | "update"
  priority: "low" | "medium" | "high"
}

type UserRole = "Admin" | "Manager" | "Employee"

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)  // Change to string
  const [form, setForm] = useState({ title: "", content: "", type: "general" as Announcement["type"], priority: "medium" as Announcement["priority"] })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | Announcement["type"]>("all")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.user.role);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/announcements', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setAnnouncements(data.announcements)
        } else {
          console.error('Failed to fetch announcements')
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAnnouncements()
  }, [])

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || ann.type === filterType
    return matchesSearch && matchesType
  })

  const handleSave = async () => {
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/announcements/${editingId}` : '/api/announcements';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const fetchRes = await fetch('/api/announcements', { credentials: 'include' });
        if (fetchRes.ok) {
          const data = await fetchRes.json();
          setAnnouncements(data.announcements);
        }
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingId(null);
        setForm({ title: "", content: "", type: "general", priority: "medium" });
      } else {
        console.error('Failed to save announcement');
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
    }
  }

  const handleEdit = (ann: Announcement) => {
    setForm({ title: ann.title, content: ann.content, type: ann.type, priority: ann.priority })
    setIsEditing(true)
    setEditingId(ann.id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setAnnouncements(announcements.filter(ann => ann.id !== id));
      } else {
        console.error('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="grid grid-cols-1 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
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