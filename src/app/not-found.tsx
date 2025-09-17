/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft, Building, Users, FolderOpen, BarChart3, HelpCircle, Mail } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-80 h-80 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/5 rounded-full"></div>
            <div className="absolute inset-8 bg-card rounded-full border border-border flex items-center justify-center">
              <div className="text-8xl font-bold text-secondary/20 select-none">404</div>
            </div>
            <div className="absolute top-16 right-16 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-secondary" />
            </div>
            <div className="absolute bottom-20 left-12 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Oops! Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's help you find what you need.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link href="/">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-secondary/20 transition-colors">
                    <Home className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Home</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-accent/20 transition-colors">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Dashboard</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employees">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-500/20 transition-colors">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Employees</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/projects">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-500/20 transition-colors">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Projects</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building className="h-5 w-5 text-secondary" />
            <span className="font-semibold text-foreground">Techservices Portal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@techservices.com" className="text-secondary hover:underline">
              support@techservices.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
