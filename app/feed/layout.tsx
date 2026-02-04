import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20 md:pb-6">
        {children}
      </main>
      
      <MobileBottomNav />
    </div>
  );
}
