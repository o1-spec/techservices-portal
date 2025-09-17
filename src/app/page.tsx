/* eslint-disable react/no-unescaped-entities */
import {
  CheckCircle,
  Users,
  FolderOpen,
  MessageSquare,
  BarChart3,
  Building,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Award,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              Enterprise-Grade SaaS Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transform Your Team Management
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-8 leading-relaxed">
              Streamline employee management, project tracking, and team communication with our comprehensive SaaS
              platform designed for modern software development companies.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
                Watch Demo
              </Button>
            </div> */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Trusted by development teams worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8" />
              <span className="font-semibold text-lg">TechCorp</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8" />
              <span className="font-semibold text-lg">DevFlow</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8" />
              <span className="font-semibold text-lg">GlobalDev</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <span className="font-semibold text-lg">SecureCode</span>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Everything you need to manage your team
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Comprehensive tools designed specifically for software development companies and remote teams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Employee Management</CardTitle>
                <CardDescription>
                  Comprehensive employee lifecycle management with role-based access control and detailed profiles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Role-based permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Employee profiles & skills
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Team organization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <FolderOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Project Tracking</CardTitle>
                <CardDescription>
                  Advanced project management with timeline tracking, milestone management, and progress visualization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Gantt charts & timelines
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Task dependencies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Team Communication</CardTitle>
                <CardDescription>
                  Centralized communication hub with announcements, comments, and real-time notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Company announcements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Task comments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Real-time notifications
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Analytics & Reports</CardTitle>
                <CardDescription>
                  Comprehensive dashboards with exportable reports and key performance indicators.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Performance dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    PDF/CSV exports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Custom metrics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Security & Access</CardTitle>
                <CardDescription>
                  Enterprise-grade security with JWT authentication, password hashing, and audit trails.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    JWT authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Role-based access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Audit logging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <Building className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Multi-Company Support</CardTitle>
                <CardDescription>
                  Scalable architecture supporting multiple companies with isolated data and custom branding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Data isolation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Custom branding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Subscription plans
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by teams worldwide</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of companies already using Techservices Portal
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-secondary mr-2" />
                <span className="text-3xl md:text-4xl font-bold text-secondary">500+</span>
              </div>
              <p className="text-muted-foreground">Companies</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-secondary mr-2" />
                <span className="text-3xl md:text-4xl font-bold text-secondary">25K+</span>
              </div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FolderOpen className="h-6 w-6 text-secondary mr-2" />
                <span className="text-3xl md:text-4xl font-bold text-secondary">100K+</span>
              </div>
              <p className="text-muted-foreground">Projects Managed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-secondary mr-2" />
                <span className="text-3xl md:text-4xl font-bold text-secondary">99.9%</span>
              </div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                About Techservices Portal
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                Built for modern software development teams
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Designed specifically for software development companies like Techservices, our portal addresses the
                unique challenges of managing distributed teams, complex projects, and seamless communication across
                time zones.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Eliminate Communication Gaps</h3>
                    <p className="text-muted-foreground">
                      Centralized platform ensures everyone stays informed and aligned.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Boost Productivity</h3>
                    <p className="text-muted-foreground">
                      Streamlined workflows and automated processes save valuable time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Scale Confidently</h3>
                    <p className="text-muted-foreground">
                      Enterprise-grade architecture grows with your business needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <Card className="p-4 text-center">
                    <Award className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium">Award Winning</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Secure</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Fast Setup</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Global Ready</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What our customers say</h2>
            <p className="text-xl text-muted-foreground">Don&apos;t just take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Techservices Portal transformed how we manage our remote development team. The project tracking
                features are exceptional.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">CTO, DevCorp</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The multi-company support is perfect for our agency. We can manage all our clients&apos; projects in one
                place."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Founder, TechAgency</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Finally, a platform that understands the needs of software development teams. The reporting features
                are outstanding."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">PM, StartupLab</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to transform your team management?</h2>
          <p className="text-xl mb-8 opacity-90 text-pretty">
            Join thousands of development teams who have already streamlined their operations with Techservices Portal.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90 px-8 py-3 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 px-8 py-3 text-lg bg-transparent"
            >
              Schedule Demo
            </Button>
          </div> */}
          <p className="text-sm opacity-75">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">Techservices Portal</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Empowering software development teams with comprehensive management tools for the modern workplace.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Globe className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Building className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {/* <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#features" className="hover:text-primary-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-primary-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/integrations" className="hover:text-primary-foreground transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="/api" className="hover:text-primary-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div> */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="/help" className="hover:text-primary-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-primary-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-primary-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">© 2025 Techservices Portal. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-primary-foreground/60 text-sm">support@techservices.com</span>
              <span className="text-primary-foreground/60 text-sm">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
