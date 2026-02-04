import { cn } from "@/lib/utils/cn";
import { Edit3 } from "lucide-react";

interface ProfileBioProps {
  bio?: string | null;
  showEditHint?: boolean;
}

export function ProfileBio({ bio, showEditHint }: ProfileBioProps) {
  if (!bio) {
    return (
      <div className="flex items-center gap-2 text-white/40">
        <span>No bio yet</span>
        {showEditHint && <Edit3 className="w-3 h-3 text-system-cyan/50" />}
      </div>
    );
  }

  return (
    <p className="text-white/80 text-base md:text-lg leading-relaxed">
      {bio}
    </p>
  );
}
