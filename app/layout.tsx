import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" }); // Mapping JetBrains to geist-mono var as per design plan preference for mono

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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}
