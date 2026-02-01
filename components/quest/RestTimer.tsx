"use client";

import { useState, useEffect } from "react";
import { SystemButton } from "@/components/ui/SystemButton";
import { toast } from "sonner";

export function RestTimer({ duration = 60 }: { duration: number }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      toast.info("Rest period complete. Resume protocol.");
      // Optional: Play sound
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-xl font-mono text-system-cyan">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </div>
      <SystemButton
        size="sm"
        variant="secondary"
        onClick={() => (isActive ? reset() : setIsActive(true))}
      >
        {isActive ? "Skip Rest" : "Start Rest"}
      </SystemButton>
    </div>
  );
}
