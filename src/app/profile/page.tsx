"use client"
import { useState } from "react"
import { User, Mail, Lock, Camera, Shield, Calendar, MapPin, Phone, Edit3, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/Header"
import Image from "next/image"

export default function Profile() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Senior Software Engineer with 5+ years of experience in full-stack development.",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "2022-03-15",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSave = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      toast.error(
        "Error",
        "Passwords do not match",
      )
      return
    }
    setLoading(true)
    // TODO: API call to update profile
    setTimeout(() => {
      toast.success(

        "Profile updated successfully",
      )
      setLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form to original values if needed
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatar(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground text-lg">Manage your personal information and account settings.</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-secondary hover:bg-secondary/90 shadow-lg">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel} className="shadow-md">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading} className="bg-secondary hover:bg-secondary/90 shadow-lg">
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/10">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-28 h-28 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          width={112}
                          height={112}
                        />
                      ) : (
                        <User className="h-14 w-14 text-primary" />
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground p-3 rounded-full hover:bg-secondary/90 transition-colors cursor-pointer shadow-md">
                        <Camera className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-card-foreground mb-1">{form.name}</h2>
                  <p className="text-muted-foreground text-sm mb-3">{form.role}</p>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">
                    <Shield className="h-3 w-3 mr-1" />
                    {form.department}
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                    <span className="text-card-foreground">{form.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                    <span className="text-card-foreground">{form.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
                    <span className="text-card-foreground">{form.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-3" />
                    <span className="text-card-foreground">Joined {new Date(form.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="security">Security Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details and bio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter full name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter email address"
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter phone number"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter location"
                              value={form.location}
                              onChange={(e) => setForm({ ...form, location: e.target.value })}
                              className="pl-10"
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Bio</label>
                        <Textarea
                          placeholder="Tell us about yourself"
                          value={form.bio}
                          onChange={(e) => setForm({ ...form, bio: e.target.value })}
                          rows={4}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-muted/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Update your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">New Password (optional)</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            className="pl-10"
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <X className="h-4 w-4" />
                          Passwords do not match
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}