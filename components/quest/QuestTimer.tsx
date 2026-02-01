"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";
import { SystemButton } from "@/components/ui/SystemButton";

export function QuestTimer({ onDurationChange }: { onDurationChange: (seconds: number) => void }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => {
          const newSeconds = s + 1;
          onDurationChange(newSeconds);
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, onDurationChange]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-void-panel border border-void-border rounded-lg p-4 flex items-center justify-between">
      <div className="text-3xl font-mono font-bold text-white tracking-widest">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-2">
        <SystemButton
          variant={isActive ? "secondary" : "primary"}
          onClick={() => setIsActive(!isActive)}
          className="px-4"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </SystemButton>
      </div>
    </div>
  );
}
