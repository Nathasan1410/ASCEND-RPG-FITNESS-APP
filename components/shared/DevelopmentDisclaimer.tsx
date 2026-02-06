"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Info, X, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export interface DisclaimerProps {
  variant?: 'tracker' | 'roadmap' | 'help';
  position?: 'top' | 'inline';
  onDismiss?: () => void;
}

export function DevelopmentDisclaimer({ 
  variant = 'tracker', 
  position = 'inline',
  onDismiss 
}: DisclaimerProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `disclaimer-${variant}`;
      const wasDismissed = localStorage.getItem(storageKey) === 'true';
      setDismissed(wasDismissed);
    }
  }, [variant]);

  const handleDismiss = () => {
    const storageKey = `disclaimer-${variant}`;
    localStorage.setItem(storageKey, 'true');
    setDismissed(true);
    onDismiss?.();
  };

  const content = {
    tracker: {
      icon: Info,
      title: "Important Information",
      message: "This page displays feature status that is currently in development. Some features may not be available yet or may differ from what's displayed. For the latest updates, visit the Implementation Tracker page.",
      color: "system-cyan",
    },
    roadmap: {
      icon: Clock,
      title: "Development Roadmap",
      message: "The feature timelines below are projections and may change as development progresses. Implementation dates are not guaranteed. For the latest progress, check our GitHub repository history.",
      color: "purple-400",
    },
    help: {
      icon: AlertTriangle,
      title: "Content in Development",
      message: "Documentation on this Help Center page is currently being compiled. For the latest information, visit the Help page or check the Update Log in our GitHub repository.",
      color: "yellow-400",
    },
  } as const;

  const currentContent = content[variant];

  if (dismissed) return null;

  if (position === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="relative rounded-xl transition-all"
        style={{
          background: `linear-gradient(135deg, ${currentContent.color === 'system-cyan' ? 'rgba(0, 184, 255, 0.1)' : currentContent.color === 'purple-400' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(250, 204, 21, 0.1)'}, ${currentContent.color === 'system-cyan' ? 'rgba(0, 184, 255, 0.05)' : currentContent.color === 'purple-400' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(250, 204, 21, 0.05)'})`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${currentContent.color === 'system-cyan' ? 'rgba(0, 184, 255, 0.3)' : currentContent.color === 'purple-400' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(250, 204, 21, 0.3)'}`,
        }}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <currentContent.icon className={`w-5 h-5 ${currentContent.color === 'system-cyan' ? 'text-system-cyan' : currentContent.color === 'purple-400' ? 'text-purple-400' : 'text-yellow-400'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-white">
                  {currentContent.title}
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {currentContent.message}
              </p>
            </div>
            {onDismiss && (
              <button 
                onClick={handleDismiss}
                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="relative rounded-xl transition-all"
      style={{
        background: `linear-gradient(135deg, ${currentContent.color === 'system-cyan' ? 'rgba(0, 184, 255, 0.1)' : currentContent.color === 'purple-400' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(250, 204, 21, 0.1)'}, ${currentContent.color === 'system-cyan' ? 'rgba(0, 184, 255, 0.05)' : currentContent.color === 'purple-400' ? 'rgba(168, 85, 247, 0.05)' : 'rgba(250, 204, 21, 0.05)'})`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${currentContent.color === 'system-cyan' ? 'rgba(0, 184, 255, 0.3)' : currentContent.color === 'purple-400' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(250, 204, 21, 0.3)'}`,
      }}
    >
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            <currentContent.icon className={`w-6 h-6 ${currentContent.color === 'system-cyan' ? 'text-system-cyan' : currentContent.color === 'purple-400' ? 'text-purple-400' : 'text-yellow-400'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white mb-1">
              {currentContent.title}
            </h3>
            <p className="text-sm text-white/90 mb-4 leading-relaxed">
              {currentContent.message}
            </p>
          </div>
          {onDismiss && (
            <button 
              onClick={handleDismiss}
              className="text-white/40 hover:text-white transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-white/80">Status: <span className="text-green-400 font-medium">In Development</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-3 h-3 text-blue-400" />
              <span className="text-white/80">Version: <span className="text-blue-400 font-medium">Pre-Production</span></span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
