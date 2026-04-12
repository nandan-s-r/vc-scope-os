import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VC Scope",
  description: "AI Operating System for Venture Capital",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
