import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/Authcontext";
import { ArrowUp } from "lucide-react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
