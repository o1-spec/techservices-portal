import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div>
                    <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                </div>
                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/login"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}