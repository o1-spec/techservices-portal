"use client";
import { useState } from "react";
import { MessageSquare, Plus, User, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header"

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "New Project Launch", content: "We're excited to announce the launch of our new project.", author: "Admin", date: "2025-09-15" },
    { id: 2, title: "Team Meeting", content: "Weekly team meeting scheduled for Friday.", author: "Manager", date: "2025-09-14" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSave = () => {
    setAnnouncements([...announcements, { id: Date.now(), author: "Admin", date: new Date().toISOString().split('T')[0], ...form }]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Announcement
          </button>
        </div>
        <div className="space-y-6">
          {announcements.map((ann) => (
            <div key={ann.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{ann.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{ann.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {ann.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {ann.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}