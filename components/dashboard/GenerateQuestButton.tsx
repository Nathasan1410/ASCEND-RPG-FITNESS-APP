"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SystemButton } from "@/components/ui/SystemButton";
import { generateDailyQuest } from "@/server/actions/quest-actions";
import { toast } from "sonner";

export function GenerateQuestButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await generateDailyQuest({
        time_window_min: 30, // Default for now
        muscle_soreness: [],
      });
      toast.success("New mandate received.");
      router.refresh(); // Force UI update
    } catch (error) {
      toast.error("System Error: Quest generation failed.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-12 border border-dashed border-white/20 rounded-xl bg-white/5">
      <p className="text-white/60 mb-4 font-mono">No active mandate detected.</p>
      <SystemButton onClick={handleGenerate} disabled={loading} glow>
        {loading ? "Analyzing Biometrics..." : "Generate Daily Quest"}
      </SystemButton>
    </div>
  );
}
