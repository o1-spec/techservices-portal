/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart3,
    TrendingUp,
    Users,
    FolderOpen,
    DollarSign,
    Download,
    Filter,
    Calendar,
    Search,
    ArrowUpRight,
    Activity,
    Target,
    Award,
    AlertCircle,
} from "lucide-react"
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts"

// Sample data for charts
const monthlyData = [
    { month: "Jan", employees: 45, projects: 12, revenue: 125000, productivity: 85 },
    { month: "Feb", employees: 48, projects: 15, revenue: 142000, productivity: 88 },
    { month: "Mar", employees: 52, projects: 18, revenue: 158000, productivity: 92 },
    { month: "Apr", employees: 55, projects: 22, revenue: 175000, productivity: 89 },
    { month: "May", employees: 58, projects: 25, revenue: 192000, productivity: 94 },
    { month: "Jun", employees: 62, projects: 28, revenue: 210000, productivity: 96 },
]

const projectStatusData = [
    { name: "Completed", value: 45, color: "#10b981" },
    { name: "In Progress", value: 32, color: "#3b82f6" },
    { name: "On Hold", value: 8, color: "#f59e0b" },
    { name: "Cancelled", value: 5, color: "#ef4444" },
]

const departmentData = [
    { department: "Engineering", employees: 28, projects: 15, budget: 450000 },
    { department: "Design", employees: 12, projects: 8, budget: 180000 },
    { department: "Marketing", employees: 8, projects: 5, budget: 120000 },
    { department: "Sales", employees: 6, projects: 3, budget: 90000 },
    { department: "HR", employees: 4, projects: 2, budget: 60000 },
]

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState("last-6-months")
    const [selectedDepartment, setSelectedDepartment] = useState("all")

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
                            <p className="text-muted-foreground text-lg">
                                Comprehensive insights into your team performance and project metrics
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <Download className="h-4 w-4" />
                                Export Report
                            </Button>
                            <Button className="bg-secondary hover:bg-secondary/90 gap-2">
                                <Calendar className="h-4 w-4" />
                                Schedule Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search reports, metrics, or departments..." className="pl-10" />
                                </div>
                            </div>
                            <Select value={dateRange} onValueChange={setDateRange}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Select date range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                                    <SelectItem value="last-year">Last Year</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <Filter className="h-4 w-4" />
                                More Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="card-hover">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                                    <p className="text-3xl font-bold text-foreground">62</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-600 font-medium">+12.5%</span>
                                        <span className="text-sm text-muted-foreground">vs last month</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                    <Users className="h-6 w-6 text-secondary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card-hover">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                                    <p className="text-3xl font-bold text-foreground">28</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-600 font-medium">+8.3%</span>
                                        <span className="text-sm text-muted-foreground">vs last month</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <FolderOpen className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card-hover">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Avg. Productivity</p>
                                    <p className="text-3xl font-bold text-foreground">94%</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-600 font-medium">+2.1%</span>
                                        <span className="text-sm text-muted-foreground">vs last month</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card-hover">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                                    <p className="text-3xl font-bold text-foreground">$210K</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-600 font-medium">+15.2%</span>
                                        <span className="text-sm text-muted-foreground">vs last month</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                    <DollarSign className="h-6 w-6 text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="employees">Employees</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="departments">Departments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Growth Trends */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-secondary" />
                                        Growth Trends
                                    </CardTitle>
                                    <CardDescription>Employee count and project growth over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Area
                                                type="monotone"
                                                dataKey="employees"
                                                stackId="1"
                                                stroke="#3b82f6"
                                                fill="#3b82f6"
                                                fillOpacity={0.6}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="projects"
                                                stackId="1"
                                                stroke="#10b981"
                                                fill="#10b981"
                                                fillOpacity={0.6}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Project Status Distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-secondary" />
                                        Project Status Distribution
                                    </CardTitle>
                                    <CardDescription>Current status of all projects</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={projectStatusData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={(props) => `${(props as unknown as { name: string; percent: number }).name} ${((props as unknown as { name: string; percent: number }).percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {projectStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Revenue and Productivity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-secondary" />
                                    Revenue vs Productivity
                                </CardTitle>
                                <CardDescription>Monthly revenue correlation with team productivity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="productivity"
                                            stroke="#10b981"
                                            name="Productivity (%)"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="employees" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Employee Performance Metrics</CardTitle>
                                    <CardDescription>Individual and team performance indicators</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                name: "Sarah Johnson",
                                                role: "Senior Developer",
                                                performance: 96,
                                                projects: 5,
                                                status: "excellent",
                                            },
                                            {
                                                name: "Michael Chen",
                                                role: "UI/UX Designer",
                                                performance: 92,
                                                projects: 3,
                                                status: "excellent",
                                            },
                                            {
                                                name: "Emily Rodriguez",
                                                role: "Project Manager",
                                                performance: 89,
                                                projects: 8,
                                                status: "good",
                                            },
                                            { name: "David Kim", role: "Backend Developer", performance: 87, projects: 4, status: "good" },
                                            { name: "Lisa Wang", role: "QA Engineer", performance: 85, projects: 6, status: "good" },
                                        ].map((employee, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 border border-border rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-medium text-secondary">
                                                            {employee.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{employee.name}</p>
                                                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-foreground">{employee.performance}%</p>
                                                        <p className="text-xs text-muted-foreground">{employee.projects} projects</p>
                                                    </div>
                                                    <Badge variant={employee.status === "excellent" ? "default" : "secondary"}>
                                                        {employee.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-secondary" />
                                        Top Performers
                                    </CardTitle>
                                    <CardDescription>This month's standout employees</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Sarah Johnson", metric: "96% Performance", badge: "🏆" },
                                            { name: "Michael Chen", metric: "5 Projects Completed", badge: "🎯" },
                                            { name: "Emily Rodriguez", metric: "Zero Delays", badge: "⚡" },
                                        ].map((performer, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                                <span className="text-2xl">{performer.badge}</span>
                                                <div>
                                                    <p className="font-medium text-foreground">{performer.name}</p>
                                                    <p className="text-sm text-muted-foreground">{performer.metric}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Timeline</CardTitle>
                                    <CardDescription>Completion rates over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="projects" stroke="#3b82f6" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                                        Project Alerts
                                    </CardTitle>
                                    <CardDescription>Projects requiring attention</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            { project: "Mobile App Redesign", issue: "Behind schedule", severity: "high" },
                                            { project: "API Integration", issue: "Resource conflict", severity: "medium" },
                                            { project: "Database Migration", issue: "Pending approval", severity: "low" },
                                        ].map((alert, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 border border-border rounded-lg"
                                            >
                                                <div>
                                                    <p className="font-medium text-foreground">{alert.project}</p>
                                                    <p className="text-sm text-muted-foreground">{alert.issue}</p>
                                                </div>
                                                <Badge
                                                    variant={
                                                        alert.severity === "high"
                                                            ? "destructive"
                                                            : alert.severity === "medium"
                                                                ? "default"
                                                                : "secondary"
                                                    }
                                                >
                                                    {alert.severity}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="departments" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Department Overview</CardTitle>
                                <CardDescription>Resource allocation and performance by department</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={departmentData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="department" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="employees" fill="#3b82f6" name="Employees" />
                                        <Bar dataKey="projects" fill="#10b981" name="Projects" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
