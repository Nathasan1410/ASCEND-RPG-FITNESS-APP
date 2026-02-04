import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileSystemNavbar />

      <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full pb-20 md:pb-6">
        {children}
      </main>
    </div>
  );
}
