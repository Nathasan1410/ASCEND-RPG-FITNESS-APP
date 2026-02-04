import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileSystemNavbar />

      <main className="flex-1 pb-20 md:pb-6">
        {children}
      </main>
    </div>
  );
}
