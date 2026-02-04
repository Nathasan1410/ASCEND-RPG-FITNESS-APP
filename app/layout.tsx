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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground`}>
        <div className="min-h-screen flex flex-col bg-background">
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
