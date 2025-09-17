import Header from "@/components/Header";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with our team for support or inquiries.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-indigo-600 mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">support@techservices.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-600 mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-red-600 mr-4" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">123 Tech Street, Innovation City, IC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}