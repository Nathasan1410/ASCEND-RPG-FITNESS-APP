import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ProfileBannerProps {
  bannerUrl?: string | null;
}

export function ProfileBanner({ bannerUrl }: ProfileBannerProps) {
  return (
    <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden rounded-t-xl bg-gradient-to-b from-zinc-900 to-zinc-800">
      {bannerUrl ? (
        <Image
          src={bannerUrl}
          alt="Profile Banner"
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 100vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      ) : null}
    </div>
  );
}
