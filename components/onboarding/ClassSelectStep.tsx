import { SystemButton } from "@/components/ui/SystemButton";
import { OnboardingData, UserClass } from "@/types/schemas";
import { cn } from "@/lib/utils/cn";

interface ClassSelectStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CLASSES: { id: UserClass; name: string; desc: string; stat: string }[] = [
  { id: "Novice", name: "Novice", desc: "Focus on consistency and form. Best for beginners.", stat: "All Stats Balanced" },
  { id: "Striker", name: "Striker", desc: "High volume, low rest. Endurance focused.", stat: "+Agility" },
  { id: "Tank", name: "Tank", desc: "Heavy loads, maximum tension. Strength focused.", stat: "+Strength" },
  { id: "Assassin", name: "Assassin", desc: "HIIT and Calisthenics. Fat loss focused.", stat: "+Stamina" },
];

export function ClassSelectStep({ data, onUpdate, onNext, onBack }: ClassSelectStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-display font-bold uppercase tracking-widest text-white">
          Choose Your Path
        </h2>
        <p className="text-sm text-white/40 font-mono">
          This choice will determine your daily quests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {CLASSES.map((cls) => (
          <button
            key={cls.id}
            onClick={() => onUpdate({ selected_class: cls.id })}
            className={cn(
              "text-left p-4 rounded border transition-all duration-300 relative overflow-hidden group",
              data.selected_class === cls.id
                ? "bg-system-cyan/10 border-system-cyan shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                : "bg-void-panel border-void-border hover:border-white/20"
            )}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={cn(
                "font-display font-bold uppercase tracking-wider",
                data.selected_class === cls.id ? "text-system-cyan" : "text-white"
              )}>
                {cls.name}
              </span>
              <span className="text-xs font-mono text-white/50">{cls.stat}</span>
            </div>
            <p className="text-xs text-white/60">{cls.desc}</p>
            
            {/* Selection Indicator */}
            {data.selected_class === cls.id && (
              <div className="absolute right-0 top-0 h-full w-1 bg-system-cyan" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <SystemButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </SystemButton>
        <SystemButton
          onClick={onNext}
          disabled={!data.selected_class}
          className="flex-1"
          glow={!!data.selected_class}
        >
          Confirm Class
        </SystemButton>
      </div>
    </div>
  );
}
