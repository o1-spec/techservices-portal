"use client"
import { useEffect, useState } from "react"
import { Users, Mail, Phone, Building, TrendingUp, Search, User, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock team data (replace with API fetch)
interface TeamMember {
    id: string  // Change to string
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
    const [team, setTeam] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterDepartment, setFilterDepartment] = useState("All")

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

    // Add function to open profile modal
    const openProfileModal = (member: TeamMember) => {
        setSelectedMember(member)
        setIsProfileModalOpen(true)
    }

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch('/api/my-team', { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json()
                    setTeam(data.team)
                } else {
                    console.error('Failed to fetch team')
                }
            } catch (error) {
                console.error('Error fetching team:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchTeam()
    }, [])

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
                                <Button variant="outline" className="w-full mt-4" onClick={() => openProfileModal(member)}>
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
            <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
                <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">Profile Details</DialogTitle>
                    </DialogHeader>
                    {selectedMember && (
                        <div className="space-y-6">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900">{selectedMember.name}</h3>
                                <p className="text-lg text-gray-600">{selectedMember.role}</p>
                                <Badge className={`${getStatusColor(selectedMember.status)} mt-2`}>
                                    {selectedMember.status}
                                </Badge>
                            </div>

                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm">{selectedMember.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm">{selectedMember.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Building className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm">{selectedMember.department}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Metrics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Performance Metrics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Performance Score</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-semibold ${getPerformanceColor(selectedMember.performance)}`}>
                                                {selectedMember.performance}%
                                            </span>
                                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                                                <div
                                                    className={`h-2 rounded-full ${selectedMember.performance >= 90 ? 'bg-green-500' : selectedMember.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${selectedMember.performance}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Tasks Completed</span>
                                        <span className="font-semibold text-gray-900">{selectedMember.tasksCompleted}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>
                                    Close
                                </Button>
                                <Button>
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    )
}