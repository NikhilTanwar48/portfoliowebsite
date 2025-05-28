import { ThemeProvider } from "@/components/ui/theme-provider"; // ensure this exists
// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikhil Tanwar | Portfolio",
  description: "Fintech | Cybersecurity | Data Science | ML Projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div
            className="min-h-screen bg-gradient-to-b
            from-sky-300 via-pink-200 to-yellow-100
            dark:from-black dark:via-purple-900 dark:to-purple-700
            bg-[length:100%_200%] bg-no-repeat
            transition-all duration-[2000ms]"
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
