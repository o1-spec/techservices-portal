/* eslint-disable react/no-unescaped-entities */
"use client"
import Header from "@/components/Header"
import { FileText, Shield, AlertTriangle } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-secondary/10 rounded-full">
              <FileText className="h-12 w-12 text-secondary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground mb-6">Please read these terms carefully before using our services</p>
          <Badge variant="outline" className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="h-6 w-6 text-secondary" />
                1. Acceptance of Terms
              </CardTitle>
              <CardDescription className="text-base">
                By accessing and using this portal, you accept and agree to be bound by the terms and provision of this agreement.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="h-6 w-6 text-secondary" />
                2. Use License
              </CardTitle>
              <CardDescription className="text-base">
                Permission is granted to temporarily download one copy of the materials on Techservices Portal for personal, non-commercial transitory viewing only.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <AlertTriangle className="h-6 w-6 text-secondary" />
                3. Disclaimer
              </CardTitle>
              <CardDescription className="text-base">
                The materials on Techservices Portal are provided on an 'as is' basis. Techservices Portal makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                4. Limitations
              </CardTitle>
              <CardDescription className="text-base">
                In no event shall Techservices Portal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Techservices Portal, even if Techservices Portal or a Techservices Portal authorized representative has been notified orally or in writing of the possibility of such damage.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                5. Accuracy of Materials
              </CardTitle>
              <CardDescription className="text-base">
                The materials appearing on Techservices Portal could include technical, typographical, or photographic errors. Techservices Portal does not warrant that any of the materials on its website are accurate, complete, or current.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                6. Links
              </CardTitle>
              <CardDescription className="text-base">
                Techservices Portal has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Techservices Portal of the site.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                7. Modifications
              </CardTitle>
              <CardDescription className="text-base">
                Techservices Portal may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                8. Governing Law
              </CardTitle>
              <CardDescription className="text-base">
                These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            If you have any questions about these Terms of Service, please <Link href="/contact" className="text-secondary hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}