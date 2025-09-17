"use client"
import { useState } from "react"
import { Bell, Trash2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"

// Mock notifications data (replace with API fetch)
interface Notification {
  id: number
  title: string
  message: string
  time: string
  unread: boolean
  type: "task" | "project" | "announcement" | "general"
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New Task Assigned", message: "You have been assigned a new task: 'Design UI Mockups'", time: "2 hours ago", unread: true, type: "task" },
    { id: 2, title: "Project Update", message: "Project 'Website Redesign' has been updated", time: "1 day ago", unread: true, type: "project" },
    { id: 3, title: "Announcement", message: "New company announcement posted", time: "3 days ago", unread: false, type: "announcement" },
    { id: 4, title: "Task Completed", message: "Your task 'Code Backend API' has been marked as completed", time: "5 days ago", unread: false, type: "task" },
    { id: 5, title: "Team Meeting", message: "Reminder: Team meeting scheduled for tomorrow at 10 AM", time: "1 week ago", unread: false, type: "general" },
  ])

  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return notification.unread
    if (filter === "read") return !notification.unread
    return true
  })

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "task": return "bg-blue-100 text-blue-800"
      case "project": return "bg-green-100 text-green-800"
      case "announcement": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your latest activities and announcements</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Badge variant="outline" className="text-sm">
              {unreadCount} unread
            </Badge>
            <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="flex-1 sm:flex-none"
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            className="flex-1 sm:flex-none"
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === "read" ? "default" : "outline"}
            onClick={() => setFilter("read")}
            className="flex-1 sm:flex-none"
          >
            Read ({notifications.length - unreadCount})
          </Button>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No notifications found.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`hover:shadow-md transition-all ${notification.unread ? 'border-l-4 border-l-blue-500' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        {notification.unread && (
                          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {notification.unread && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}