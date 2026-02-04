import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";
export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="md:hidden">
        {/* <MobileSystemNavbar /> */}
      </div>

      <main className="flex-1 pb-20 md:pb-6 md:pt-20">
        {children}
      </main>
    </div>
  );
}
