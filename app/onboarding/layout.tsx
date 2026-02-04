import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";
export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <MobileSystemNavbar />
      {children}
    </div>
  );
}
