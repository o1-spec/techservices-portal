import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google"
import "./globals.css";
import { ToastContainer } from "@/components/ui/toast-container";
import { AuthProvider } from "@/hooks/useAuth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Techservices Portal - Employee & Project Management",
  description: "A secure SaaS platform for managing employees, projects, and communication across teams and executives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased relative w-full`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}