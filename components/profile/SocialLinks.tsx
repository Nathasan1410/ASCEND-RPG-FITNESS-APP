import { Twitter, Gamepad2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SocialLinksProps {
  discord?: string | null;
  twitter?: string | null;
  steam?: string | null;
}

export function SocialLinks({ discord, twitter, steam }: SocialLinksProps) {
  const hasLinks = discord || twitter || steam;

  if (!hasLinks) {
    return null;
  }

  return (
    <div className="flex gap-3">
      {discord && (
        <a
          href={`https://discord.com/users/${discord}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center hover:bg-indigo-500/30 hover:border-indigo-500/50 transition-all hover:scale-110"
          aria-label="Discord"
        >
          <MessageCircle className="w-5 h-5 text-indigo-400" />
        </a>
      )}

      {twitter && (
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center hover:bg-sky-500/30 hover:border-sky-500/50 transition-all hover:scale-110"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5 text-sky-400" />
        </a>
      )}

      {steam && (
        <a
          href={`https://steamcommunity.com/id/${steam}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-lg bg-slate-500/20 border border-slate-500/30 flex items-center justify-center hover:bg-slate-500/30 hover:border-slate-500/50 transition-all hover:scale-110"
          aria-label="Steam"
        >
          <Gamepad2 className="w-5 h-5 text-slate-400" />
        </a>
      )}
    </div>
  );
}
