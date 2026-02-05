"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthModal } from "@/components/auth/AuthModal";
import { AnimatePresence } from "framer-motion";
import LaserFlow from "@/components/LaserFlow";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import VideosSection from "@/components/landing/VideosSection";
import MarketSection from "@/components/landing/MarketSection";
import CompetitiveSection from "@/components/landing/CompetitiveSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import TechStackSection from "@/components/landing/TechStackSection";
import CTASection from "@/components/landing/CTASection";
import SocialLinks from "@/components/landing/SocialLinks";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStartJourney = () => {
    setShowAuth(true);
  };

  const handleTryDemo = () => {
    window.location.href = '/help/demo-accounts';
  };

  return (
    <main className="min-h-screen flex flex-col relative bg-void-deep">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LaserFlow
          color="#00b8ff"
          wispDensity={isMobile ? 1.0 : 2.0}
          flowSpeed={1.4}
          verticalSizing={4.5}
          horizontalSizing={3.5}
          fogIntensity={isMobile ? 0.7 : 1.5}
          fogScale={0.25}
          wispSpeed={30}
          wispIntensity={isMobile ? 4.0 : 8.0}
          flowStrength={0.3}
          decay={1.5}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.48}
          dpr={typeof window !== 'undefined' ? (isMobile ? 1 : window.devicePixelRatio) : 1}
          className={`w-full h-full ${isMobile ? 'opacity-60' : ''}`}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="flex-1 flex flex-col relative z-10 pt-0 md:pt-0">
        <HeroSection onStartJourney={handleStartJourney} onTryDemo={handleTryDemo} />
        <ProblemSection />
        <SolutionSection />
        <WorkflowSection />
        <VideosSection />
        <MarketSection />
        <CompetitiveSection />
        <ComparisonSection />
        <TechStackSection />
        <CTASection onStartJourney={handleStartJourney} onTryDemo={handleTryDemo} />
        <SocialLinks />
      </div>

      <AnimatePresence>
        {showAuth && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div onClick={(e) => e.stopPropagation()}>
              <AuthModal onClose={() => setShowAuth(false)} />
            </div>
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/40 hover:text-white text-2xl md:text-3xl transition-colors"
            >
              ✕
            </button>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
