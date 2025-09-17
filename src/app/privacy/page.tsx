import Header from "@/components/Header";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">How we collect, use, and protect your data.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <p className="text-gray-600">
                We collect personal information you provide when registering, such as name, email, and role.
                We also collect usage data to improve our services.
              </p>
            </section>
            <section>
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <p className="text-gray-600">
                Your data is used to provide services, communicate updates, and ensure security.
                We do not sell your personal information to third parties.
              </p>
            </section>
            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
              </div>
              <p className="text-gray-600">
                We use encryption and secure servers to protect your data. Access is restricted to authorized personnel only.
              </p>
            </section>
            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <p className="text-gray-600">
                You have the right to access, update, or delete your personal information. Contact us to exercise these rights.
              </p>
            </section>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: September 17, 2025. For questions, contact support@techservices.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}