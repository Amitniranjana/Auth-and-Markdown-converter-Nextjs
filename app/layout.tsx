import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next App",
  description: "Using Context API with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 1. ContextProvider yahan aayega taaki poori app ko state mile */}
        <ContextProvider>

          {/* 2. 'children' wo placeholder hai jahan aapke pages (Signup, Login, Home) dikhenge */}
          {children}

        </ContextProvider>
      </body>
    </html>
  );
}