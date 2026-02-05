import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { WebVitals } from "@/components/analytics/WebVitals";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { SystemNavbar } from "@/components/layout/SystemNavbar";
import ParticlesBackground from "@/components/layout/ParticlesBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "ASCEND: FITNESS RPG",
  description: "Your Daily Mandate to Become S-Rank",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ASCEND",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground`}>
        <div className="min-h-screen flex flex-col bg-background safe-area-padded">
          <ParticlesBackground />
          <SystemNavbar />
          <ErrorBoundary>
            <div className="flex-1 md:pt-20 pb-20 md:pb-0">
              {children}
            </div>
          </ErrorBoundary>
          <Toaster theme="dark" position="top-center" />
          <WebVitals />
        </div>
      </body>
    </html>
  );
}
