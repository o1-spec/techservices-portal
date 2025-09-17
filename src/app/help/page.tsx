import Header from "@/components/Header";
import { HelpCircle, MessageSquare, BookOpen, Phone } from "lucide-react";

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">Find answers to common questions and get support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <HelpCircle className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Getting Started</h3>
            <p className="text-gray-600">Learn how to set up your account and navigate the portal.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MessageSquare className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQs</h3>
            <p className="text-gray-600">Common questions about projects, employees, and reports.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600">Detailed guides and tutorials for advanced features.</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-6">Contact our support team for personalized assistance.</p>
          <a href="/contact" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Phone className="h-5 w-5 mr-2" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}