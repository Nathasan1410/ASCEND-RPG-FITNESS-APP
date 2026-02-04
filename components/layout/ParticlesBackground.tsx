"use client";

import { usePathname } from 'next/navigation';

export default function ParticlesBackground() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return null;
}
