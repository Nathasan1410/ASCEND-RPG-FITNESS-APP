import { SystemButton } from "@/components/ui/SystemButton";
import { OnboardingData } from "@/types/schemas";

interface AssessmentStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AssessmentStep({ data, onUpdate, onNext, onBack }: AssessmentStepProps) {
  const isValid = (data.max_pushups !== undefined) && (data.run_capability_km !== undefined);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-display font-bold uppercase tracking-widest text-white">
          Combat Ability Assessment
        </h2>
        <p className="text-sm text-white/40 font-mono">
          Honesty is mandatory. The System detects false data.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-system-cyan uppercase mb-1">
            Max Pushups (One Set)
          </label>
          <input
            type="number"
            value={data.max_pushups === undefined ? "" : data.max_pushups}
            onChange={(e) => onUpdate({ max_pushups: parseInt(e.target.value) || 0 })}
            className="w-full bg-void-panel border border-void-border focus:border-system-cyan px-4 py-3 rounded text-white outline-none font-mono text-xl"
            placeholder="0"
          />
          <p className="text-xs text-white/30 mt-1">
            Less than 10 = E-Rank. More than 100 = S-Rank.
          </p>
        </div>

        <div>
          <label className="block text-xs font-mono text-system-cyan uppercase mb-1">
            Running Capacity (km)
          </label>
          <input
            type="number"
            value={data.run_capability_km === undefined ? "" : data.run_capability_km}
            onChange={(e) => onUpdate({ run_capability_km: parseInt(e.target.value) || 0 })}
            className="w-full bg-void-panel border border-void-border focus:border-system-cyan px-4 py-3 rounded text-white outline-none font-mono text-xl"
            placeholder="0"
          />
          <p className="text-xs text-white/30 mt-1">
            Distance you can run without stopping.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <SystemButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </SystemButton>
        <SystemButton
          onClick={onNext}
          disabled={!isValid}
          className="flex-1"
          glow={!!isValid}
        >
          Confirm Stats
        </SystemButton>
      </div>
    </div>
  );
}
