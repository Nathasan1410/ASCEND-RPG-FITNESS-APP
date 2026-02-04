import { SystemNavbar, MobileBottomNav } from "@/components/layout/SystemNavbar";
import Link from "next/link";

export default function ProfileMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SystemNavbar />
      <MobileBottomNav />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full pb-20 md:pb-6">
        {children}
      </main>
    </div>
  );
}
