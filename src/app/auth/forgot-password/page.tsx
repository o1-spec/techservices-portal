"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Mail, Building, ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      setSent(true)
      toast.success("Reset email sent!", "Check your inbox.")
    } else {
      toast.error("Error", "Email not found.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>

      <div className="relative w-full max-w-md">
        <Card className="border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Building className="h-8 w-8 text-secondary-foreground" />
            </div>
            <p className="text-2xl font-bold text-balance">
              {sent ? "Check Your Email" : "Reset Your Password"}
            </p>
            <p className="text-base text-muted-foreground">
              {sent
                ? "We've sent a password reset link to your email address"
                : "Enter your email address and we'll send you a link to reset your password"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                  <input
                    type="email"
                    required
                    aria-label="Email address"
                    className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin"></div>
                      Sending reset link...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Reset Link
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              /* Enhanced success state */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-foreground font-medium">Email sent successfully!</p>
                  <p className="text-sm text-muted-foreground">
                    If an account with that email exists, you&apos;ll receive a password reset link shortly.
                  </p>
                </div>
                <Button onClick={() => setSent(false)} variant="outline" className="w-full">
                  Send Another Email
                </Button>
              </div>
            )}

            <div className="text-center pt-4 border-t border-border">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Need help? Contact our support team at support@techservices.com
          </p>
        </div>
      </div>
    </div>
  )
}
