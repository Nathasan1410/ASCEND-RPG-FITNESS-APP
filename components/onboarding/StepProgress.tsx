import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2 text-xs font-mono text-system-cyan/60 uppercase tracking-widest">
        <span>Awakening Process</span>
        <span>{Math.round(progress)}% Synchronized</span>
      </div>
      <div className="h-1 w-full bg-void-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-system-cyan shadow-[0_0_10px_#00FFFF]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
