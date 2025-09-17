"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Building,
  Users,
  FolderOpen,
  MessageSquare,
  BarChart3,
  User,
  LogOut,
  Bell,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function Header() {
  const router = useRouter()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on component mount
  useState(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("token"))
    }
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    router.push("/auth/login")
  }

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-secondary" />
            <span className="ml-2 text-xl font-bold text-foreground">Techservices Portal</span>
          </div>

          {isAuthenticated ? (
            <>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-secondary transition-colors flex items-center"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  href="/employees"
                  className="text-muted-foreground hover:text-secondary transition-colors flex items-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Employees
                </Link>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-secondary transition-colors flex items-center"
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Projects
                </Link>
                <Link
                  href="/announcements"
                  className="text-muted-foreground hover:text-secondary transition-colors flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Announcements
                </Link>
              </nav>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-secondary rounded-full"></span>
                </Button>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setIsLogoutModalOpen(true)} className="hidden sm:flex">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <nav className="flex space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background border-l border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {isAuthenticated && (
              <nav className="space-y-4">
                <Link
                  href="/dashboard"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Dashboard
                </Link>
                <Link
                  href="/employees"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <Users className="h-4 w-4 mr-3" />
                  Employees
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <FolderOpen className="h-4 w-4 mr-3" />
                  Projects
                </Link>
                <Link
                  href="/announcements"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Announcements
                </Link>
                <hr className="border-border" />
                <Link
                  href="/profile"
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors"
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Link>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex items-center text-muted-foreground hover:text-secondary transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </button>
              </nav>
            )}
          </div>
        </div>
      )}

      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>Are you sure you want to log out?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
