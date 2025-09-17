/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useEffect } from "react"
import { BarChart3, Users, FolderOpen, MessageSquare, Download, TrendingUp, Clock, CheckCircle, Target } from "lucide-react"
import Header from "@/components/Header"

type UserRole = "Admin" | "Manager" | "Employee"
const userRole: UserRole = "Admin" // Change to "Admin", "Manager", or "Employee" to test

export default function Dashboard() {
  const [stats, setStats] = useState({ employees: 0, projects: 0, tasks: 0, announcements: 0, teamMembers: 0, myTasks: 0, performance: 0 })

  useEffect(() => {
    // TODO: Fetch stats based on user role
    if (userRole === "Admin") {
      setStats({ employees: 25, projects: 10, tasks: 50, announcements: 5, teamMembers: 0, myTasks: 0, performance: 0 })
    } else if (userRole === "Manager") {
      setStats({ employees: 0, projects: 5, tasks: 0, announcements: 3, teamMembers: 8, myTasks: 0, performance: 0 })
    } else if (userRole === "Employee") {
      setStats({ employees: 0, projects: 0, tasks: 0, announcements: 2, teamMembers: 0, myTasks: 12, performance: 85 })
    }
  }, [])

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format}`)
  }

  const renderStatsCards = () => {
    if (userRole === "Admin") {
      return (
        <>
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Employees</p>
                <p className="text-3xl font-bold text-primary">{stats.employees}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="bg-primary/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-chart-4">{stats.projects}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <div className="bg-chart-4/20 p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-chart-4" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Tasks</p>
                <p className="text-3xl font-bold text-chart-3">{stats.tasks}</p>
                <p className="text-xs text-destructive mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  15 overdue
                </p>
              </div>
              <div className="bg-chart-3/20 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-5/5 to-chart-5/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Announcements</p>
                <p className="text-3xl font-bold text-chart-5">{stats.announcements}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />2 new today
                </p>
              </div>
              <div className="bg-chart-5/20 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-chart-5" />
              </div>
            </div>
          </div>
        </>
      )
    } else if (userRole === "Manager") {
      return (
        <>
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">My Team Members</p>
                <p className="text-3xl font-bold text-primary">{stats.teamMembers}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% from last month
                </p>
              </div>
              <div className="bg-primary/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">My Projects</p>
                <p className="text-3xl font-bold text-chart-4">{stats.projects}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 completed this month
                </p>
              </div>
              <div className="bg-chart-4/20 p-3 rounded-lg">
                <FolderOpen className="h-6 w-6 text-chart-4" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Team Tasks</p>
                <p className="text-3xl font-bold text-chart-3">{stats.tasks}</p>
                <p className="text-xs text-destructive mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  3 overdue
                </p>
              </div>
              <div className="bg-chart-3/20 p-3 rounded-lg">
                <Target className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-5/5 to-chart-5/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Announcements</p>
                <p className="text-3xl font-bold text-chart-5">{stats.announcements}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />1 new today
                </p>
              </div>
              <div className="bg-chart-5/20 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-chart-5" />
              </div>
            </div>
          </div>
        </>
      )
    } else if (userRole === "Employee") {
      return (
        <>
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">My Tasks</p>
                <p className="text-3xl font-bold text-primary">{stats.myTasks}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3 completed this week
                </p>
              </div>
              <div className="bg-primary/20 p-3 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">My Performance</p>
                <p className="text-3xl font-bold text-chart-4">{stats.performance}%</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% from last month
                </p>
              </div>
              <div className="bg-chart-4/20 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-chart-4" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Tasks</p>
                <p className="text-3xl font-bold text-chart-3">{stats.tasks}</p>
                <p className="text-xs text-destructive mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  2 overdue
                </p>
              </div>
              <div className="bg-chart-3/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chart-5/5 to-chart-5/10 p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Announcements</p>
                <p className="text-3xl font-bold text-chart-5">{stats.announcements}</p>
                <p className="text-xs text-chart-4 mt-1 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />1 new today
                </p>
              </div>
              <div className="bg-chart-5/20 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-chart-5" />
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  const renderNavigationCards = () => {
    const cards = [
      { title: "Employees", icon: Users, href: "/employees", color: "text-primary", bg: "bg-primary/10", visible: userRole === "Admin" },
      { title: "Projects", icon: FolderOpen, href: "/projects", color: "text-chart-4", bg: "bg-chart-4/10", visible: true },
      { title: "My Tasks", icon: Target, href: "/my-tasks", color: "text-chart-3", bg: "bg-chart-3/10", visible: userRole === "Employee" },
      { title: "My Team", icon: Users, href: "/my-team", color: "text-primary", bg: "bg-primary/10", visible: userRole === "Manager" },
      { title: "Announcements", icon: MessageSquare, href: "/announcements", color: "text-chart-5", bg: "bg-chart-5/10", visible: true },
      { title: "Reports", icon: BarChart3, href: "/reports", color: "text-chart-3", bg: "bg-chart-3/10", visible: userRole === "Admin" || userRole === "Manager" },
    ]

    return cards.filter(card => card.visible).map((card, index) => (
      <div
        key={index}
        className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 cursor-pointer card-hover group"
        onClick={() => (window.location.href = card.href)}
      >
        <div className="flex items-center justify-between mb-4">
          <card.icon className={`h-10 w-10 ${card.color} group-hover:text-secondary transition-colors`} />
          <div className={`${card.bg} p-2 rounded-lg`}>
            <TrendingUp className="h-5 w-5 text-current" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-2">{card.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {card.title === "Employees" && "Manage staff records, roles, and team assignments efficiently."}
          {card.title === "Projects" && "Create, track, and manage projects with deadlines and teams."}
          {card.title === "My Tasks" && "View and manage your assigned tasks and progress."}
          {card.title === "My Team" && "Monitor your team members and their performance."}
          {card.title === "Announcements" && "Post company updates and view important notifications."}
          {card.title === "Reports" && "Generate insights and export detailed analytics reports."}
        </p>
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's what's happening with your {userRole === "Admin" ? "company" : userRole === "Manager" ? "team" : "work"} today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderNavigationCards()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderStatsCards()}
        </div>

        <div className="bg-card p-8 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-card-foreground mb-2">Export Reports</h2>
              <p className="text-muted-foreground">Generate and download comprehensive reports for your records.</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg">
              <Download className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleExport("PDF")}
              className="flex items-center justify-center px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all duration-200 font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Export PDF Report
            </button>
            <button
              onClick={() => handleExport("CSV")}
              className="flex items-center justify-center px-6 py-3 bg-chart-4 text-white rounded-lg hover:bg-chart-4/90 transition-all duration-200 font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Export CSV Data
            </button>
            <button
              onClick={() => handleExport("Excel")}
              className="flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all duration-200 font-medium"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Excel File
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}