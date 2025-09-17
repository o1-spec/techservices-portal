"use client"
import { useState } from "react"
import { Users, Mail, Phone, Building, TrendingUp, Search, User, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

// Mock team data (replace with API fetch)
interface TeamMember {
    id: number
    name: string
    email: string
    phone: string
    role: string
    department: string
    status: string
    performance: number
    tasksCompleted: number
}

export default function MyTeam() {
    const [team, setTeam] = useState<TeamMember[]>([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 (555) 123-4567", role: "Senior Developer", department: "Engineering", status: "Active", performance: 92, tasksCompleted: 45 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 (555) 987-6543", role: "UI/UX Designer", department: "Design", status: "Active", performance: 88, tasksCompleted: 38 },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1 (555) 456-7890", role: "Backend Developer", department: "Engineering", status: "Inactive", performance: 75, tasksCompleted: 22 },
    ])
    const [searchTerm, setSearchTerm] = useState("")
    const [filterDepartment, setFilterDepartment] = useState("All")

    // TODO: Fetch team based on current Manager

    const filteredTeam = team.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDepartment = filterDepartment === "All" || member.department === filterDepartment
        return matchesSearch && matchesDepartment
    })

    const getStatusColor = (status: string) => {
        return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }

    const getPerformanceColor = (performance: number) => {
        if (performance >= 90) return "text-green-600"
        if (performance >= 80) return "text-yellow-600"
        return "text-red-600"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">My Team</h1>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search team members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Departments</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeam.map((member) => (
                        <Card key={member.id} className="hover:shadow-lg transition-all border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <User className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                            <p className="text-sm text-gray-600">{member.role}</p>
                                        </div>
                                    </CardTitle>
                                    <Badge className={getStatusColor(member.status)}>
                                        {member.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        {member.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4" />
                                        {member.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Building className="h-4 w-4" />
                                        {member.department}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">Performance</span>
                                        </div>
                                        <span className={`font-semibold ${getPerformanceColor(member.performance)}`}>
                                            {member.performance}%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Tasks Completed</span>
                                        <span className="font-semibold text-gray-900">{member.tasksCompleted}</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = `/profile/${member.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredTeam.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No team members found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    )
}