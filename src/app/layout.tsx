process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // for self-signed certificates
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/AuthProvider";
import Footer from "@/components/Footer";
import { config } from "@/lib/config";
import AuthInitializer from "@/components/AuthInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: config.appName,
  description: config.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className} antialiased`}>
        <AuthProvider>
          <AuthInitializer />
          <div className="w-full bg-red-800 px-40 md:px-12 ">{/*px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64*/}
            <Navbar />
          </div>
          <div className="bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <Toaster />
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
