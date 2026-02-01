import Link from "next/link";
import { User } from "lucide-react";

export function SystemNavbar() {
  return (
    <nav className="h-16 border-b border-white/10 bg-system-panel/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <Link href="/dashboard" className="text-xl font-display font-bold tracking-tighter text-system-cyan">
        ASCEND
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-void-deep">
          <User className="w-4 h-4 text-white/60" />
        </div>
      </div>
    </nav>
  );
}
