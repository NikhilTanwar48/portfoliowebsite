import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
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
  title: "Nikhil Tanwar | Data Scientist & ML Engineer",
  description:
    "MSc Web & Data Science at Universität Koblenz. Machine Learning, Predictive Modeling, Geospatial Analytics & Interactive Dashboards.",
  keywords: [
    "Nikhil Tanwar",
    "Data Scientist",
    "Machine Learning Engineer",
    "Universität Koblenz",
    "XGBoost",
    "Python",
    "Geospatial Analytics",
    "Germany",
  ],
  authors: [{ name: "Nikhil Tanwar" }],
  openGraph: {
    title: "Nikhil Tanwar | Data Scientist & ML Engineer",
    description:
      "MSc Web & Data Science at Universität Koblenz. Machine Learning, Predictive Modeling, Geospatial Analytics & Interactive Dashboards.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Tanwar | Data Scientist & ML Engineer",
    description:
      "MSc Web & Data Science at Universität Koblenz. Machine Learning, Predictive Modeling, Geospatial Analytics & Interactive Dashboards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}