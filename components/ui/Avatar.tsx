"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  username?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  verified?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-20 h-20 text-2xl",
};

export function Avatar({ 
  src, 
  alt = "User avatar", 
  username = "User", 
  size = "md",
  className,
  verified = false
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/[\s_-]+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(username);

  if (!src || imageError) {
    return (
      <div className={cn(
        "rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border-2 border-white/20",
        sizeClasses[size],
        className
      )}>
        <span className="text-system-cyan">{initials}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {!imageLoaded && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border-2 border-white/20 flex items-center justify-center">
          <User className="w-1/2 h-1/2 text-system-cyan opacity-50" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "rounded-full object-cover",
          !imageLoaded && "opacity-0"
        )}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
        sizes={`(max-width: 768px) ${size === 'xl' ? '80px' : size === 'lg' ? '48px' : size === 'md' ? '40px' : '32px'}, ${size === 'xl' ? '80px' : size === 'lg' ? '48px' : size === 'md' ? '40px' : '32px'}`}
      />
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-rank-a rounded-full p-0.5 border-2 border-[#050505]">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-2m-4 4m0 6 4-2" />
          </svg>
        </div>
      )}
    </div>
  );
}
