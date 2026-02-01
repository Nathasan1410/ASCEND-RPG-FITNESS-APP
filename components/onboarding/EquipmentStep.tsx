import { SystemButton } from "@/components/ui/SystemButton";
import { OnboardingData } from "@/types/schemas";
import { cn } from "@/lib/utils/cn";

interface EquipmentStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const EQUIPMENT_LIST = [
  "Pull-up Bar",
  "Dumbbells",
  "Barbell",
  "Kettlebell",
  "Resistance Bands",
  "Bench",
  "Treadmill",
  "Jump Rope",
];

export function EquipmentStep({ data, onUpdate, onSubmit, onBack, isSubmitting }: EquipmentStepProps) {
  const selected = data.equipment || [];

  const toggleItem = (item: string) => {
    if (selected.includes(item)) {
      onUpdate({ equipment: selected.filter((i) => i !== item) });
    } else {
      onUpdate({ equipment: [...selected, item] });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-display font-bold uppercase tracking-widest text-white">
          Inventory Check
        </h2>
        <p className="text-sm text-white/40 font-mono">
          Select available equipment. Leave empty for Bodyweight Only.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {EQUIPMENT_LIST.map((item) => (
          <button
            key={item}
            onClick={() => toggleItem(item)}
            className={cn(
              "p-3 text-xs font-mono uppercase tracking-wider border rounded transition-all",
              selected.includes(item)
                ? "bg-system-cyan/10 border-system-cyan text-system-cyan"
                : "bg-void-panel border-void-border text-white/60 hover:border-white/20"
            )}
          >
            {selected.includes(item) ? "[x] " : "[ ] "}
            {item}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <SystemButton variant="secondary" onClick={onBack} className="flex-1" disabled={isSubmitting}>
          Back
        </SystemButton>
        <SystemButton
          onClick={onSubmit}
          className="flex-1"
          glow
          disabled={isSubmitting}
        >
          {isSubmitting ? "Awakening..." : "Finalize"}
        </SystemButton>
      </div>
    </div>
  );
}
