"use client"
import { useState } from "react"
import {
  FolderOpen,
  Plus,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

interface Project {
  id: number
  name: string
  description: string
  status: string
  deadline: string
  team: number
  progress?: number
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX",
      status: "In Progress",
      deadline: "2025-12-01",
      team: 5,
      progress: 65,
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Develop cross-platform mobile application",
      status: "Completed",
      deadline: "2025-10-15",
      team: 3,
      progress: 100,
    },
    {
      id: 3,
      name: "Database Migration",
      description: "Migrate legacy database to cloud infrastructure",
      status: "Planning",
      deadline: "2025-11-30",
      team: 4,
      progress: 15,
    },
    {
      id: 4,
      name: "API Integration",
      description: "Integrate third-party APIs for enhanced functionality",
      status: "In Progress",
      deadline: "2025-10-20",
      team: 2,
      progress: 40,
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ name: "", description: "", deadline: "", team: 0 })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const handleSave = () => {
    setProjects([...projects, { id: Date.now(), status: "Planning", progress: 0, ...form }])
    setIsModalOpen(false)
    setForm({ name: "", description: "", deadline: "", team: 0 })
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-chart-4" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-secondary" />
      case "Planning":
        return <AlertCircle className="h-4 w-4 text-chart-5" />
      default:
        return <FolderOpen className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "In Progress":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "Planning":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && !projects.find((p) => p.deadline === deadline && p.status === "Completed")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Project Management</h1>
            <p className="text-muted-foreground text-lg">Track and manage your team&apos;s projects efficiently.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex gap-2">
              <div className="bg-card p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">{projects.length} Total</span>
                </div>
              </div>
              <div className="bg-card p-3 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium text-card-foreground">
                    {projects.filter((p) => p.status === "In Progress").length} Active
                  </span>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-5 w-5 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 card-hover group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3">
                    <FolderOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground group-hover:text-secondary transition-colors">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

              {project.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-card-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className={isOverdue(project.deadline) ? "text-destructive font-medium" : ""}>
                    {new Date(project.deadline).toLocaleDateString()}
                  </span>
                  {isOverdue(project.deadline) && <AlertCircle className="h-3 w-3 ml-1 text-destructive" />}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {project.team} members
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                >
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{project.status}</span>
                </div>

                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(project.team, 3) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-primary/20 rounded-full border-2 border-card flex items-center justify-center"
                    >
                      <Users className="h-3 w-3 text-primary" />
                    </div>
                  ))}
                  {project.team > 3 && (
                    <div className="w-6 h-6 bg-muted rounded-full border-2 border-card flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">+{project.team - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project Name</label>
              <Input
                placeholder="Enter project name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Describe the project goals and objectives"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Deadline</label>
                <Input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Team Size</label>
                <Input
                  type="number"
                  placeholder="0"
                  min="1"
                  value={form.team}
                  onChange={(e) => setForm({ ...form, team: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-secondary hover:bg-secondary/90">
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
