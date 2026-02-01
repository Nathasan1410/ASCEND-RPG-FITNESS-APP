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
      console.log("Requesting new quest...");
      const result = await generateDailyQuest({
        time_window_min: 30, // Default for now
        muscle_soreness: [],
      });

      console.log("Quest Generation Result:", result);

      if (!result) {
        throw new Error("Server returned no data (undefined/null)");
      }

      if (!result.id) {
        throw new Error("Server returned invalid data (missing ID)");
      }

      toast.success("New mandate received.");
      router.refresh(); // Force UI update
    } catch (error: any) {
      const msg = error?.message || "Quest generation failed.";
      toast.error(`System Error: ${msg}`);
      console.error("Full Error Object:", error);
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
