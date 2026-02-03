import { SystemNavbar } from "@/components/layout/SystemNavbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SystemNavbar />
      
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full pb-20 md:pb-6">
        {children}
      </main>
      
      <MobileBottomNav />
    </div>
  );
}
