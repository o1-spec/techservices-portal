"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userRole, setUserRole] = useState<string | null>("Employee");

    const [notifications, setNotifications] = useState([
        { id: 1, title: "New Task Assigned", message: "You have been assigned a new task: 'Design UI Mockups'", time: "2 hours ago", unread: true },
        { id: 2, title: "Project Update", message: "Project 'Website Redesign' has been updated", time: "1 day ago", unread: true },
        { id: 3, title: "Announcement", message: "New company announcement posted", time: "3 days ago", unread: false },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        router.push("/auth/login");
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const renderNavLinks = () => {
        if (!isAuthenticated || !userRole) return null;

        switch (userRole) {
            case "Admin":
                return (
                    <>
                        <Link href="/dashboard" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/dashboard" ? "text-secondary" : ""}`}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>
                        <Link href="/employees" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/employees" ? "text-secondary" : ""}`}>
                            <Users className="h-4 w-4 mr-2" />
                            Employees
                        </Link>
                        <Link href="/projects" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/projects" ? "text-secondary" : ""}`}>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Projects
                        </Link>
                        <Link href="/announcements" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/announcements" ? "text-secondary" : ""}`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Announcements
                        </Link>
                        <Link href="/reports" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/reports" ? "text-secondary" : ""}`}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Reports
                        </Link>
                    </>
                );
            case "Manager":
                return (
                    <>
                        <Link href="/dashboard" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/dashboard" ? "text-secondary" : ""}`}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>
                        <Link href="/projects" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/projects" ? "text-secondary" : ""}`}>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Projects
                        </Link>
                        <Link href="/announcements" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/announcements" ? "text-secondary" : ""}`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Announcements
                        </Link>
                        <Link href="/my-team" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/my-team" ? "text-secondary" : ""}`}>
                            <Users className="h-4 w-4 mr-2" />
                            My Team
                        </Link>
                    </>
                );
            case "Employee":
                return (
                    <>
                        <Link href="/dashboard" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/dashboard" ? "text-secondary" : ""}`}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Dashboard
                        </Link>
                        <Link href="/my-tasks" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/my-tasks" ? "text-secondary" : ""}`}>
                            <FolderOpen className="h-4 w-4 mr-2" />
                            My Tasks
                        </Link>
                        <Link href="/announcements" className={`text-muted-foreground hover:text-secondary transition-colors flex items-center ${pathname === "/announcements" ? "text-secondary" : ""}`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Announcements
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 py-3">
                    <div className="flex items-center">
                        <Building className="h-8 w-8 text-secondary" />
                        <span className="ml-2 text-xl font-bold text-foreground">Techservices Portal</span>
                    </div>

                    {isAuthenticated ? (
                        <>
                            <nav className="hidden md:flex space-x-8">
                                {renderNavLinks()}
                            </nav>
                            <div className="flex items-center space-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="relative">
                                            <Bell className="h-4 w-4" />
                                            {unreadCount > 0 && (
                                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                                                    {unreadCount}
                                                </span>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-80">
                                        <div className="p-4 border-b">
                                            <h3 className="font-semibold">Notifications</h3>
                                            <p className="text-sm text-muted-foreground">You have {unreadCount} unread notifications</p>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <DropdownMenuItem
                                                    key={notification.id}
                                                    className={`p-4 cursor-pointer ${notification.unread ? 'bg-muted/50' : ''}`}
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <div className="flex flex-col space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">{notification.title}</span>
                                                            {notification.unread && <div className="h-2 w-2 bg-secondary rounded-full"></div>}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                                                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="p-4 text-center">
                                            <Link href="/notifications" className="w-full">View All Notifications</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
                                {renderNavLinks()}
                                <hr className="border-border" />
                                <Link href="/profile" className="flex items-center text-muted-foreground hover:text-secondary transition-colors">
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
    );
}