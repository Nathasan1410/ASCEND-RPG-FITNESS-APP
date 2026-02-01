import { SystemButton } from "@/components/ui/SystemButton";
import { OnboardingData } from "@/types/schemas";

interface BasicInfoStepProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function BasicInfoStep({ data, onUpdate, onNext }: BasicInfoStepProps) {
  const isValid = data.username && data.height_cm && data.weight_kg;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-display font-bold uppercase tracking-widest text-white">
          Identity Verification
        </h2>
        <p className="text-sm text-white/40 font-mono">
          Enter your physical parameters for system calibration.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-system-cyan uppercase mb-1">Codename</label>
          <input
            type="text"
            value={data.username || ""}
            onChange={(e) => onUpdate({ username: e.target.value })}
            className="w-full bg-void-panel border border-void-border focus:border-system-cyan px-4 py-3 rounded text-white outline-none font-mono"
            placeholder="HUNTER_NAME"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-system-cyan uppercase mb-1">Height (cm)</label>
            <input
              type="number"
              value={data.height_cm || ""}
              onChange={(e) => onUpdate({ height_cm: parseInt(e.target.value) })}
              className="w-full bg-void-panel border border-void-border focus:border-system-cyan px-4 py-3 rounded text-white outline-none font-mono"
              placeholder="175"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-system-cyan uppercase mb-1">Weight (kg)</label>
            <input
              type="number"
              value={data.weight_kg || ""}
              onChange={(e) => onUpdate({ weight_kg: parseInt(e.target.value) })}
              className="w-full bg-void-panel border border-void-border focus:border-system-cyan px-4 py-3 rounded text-white outline-none font-mono"
              placeholder="70"
            />
          </div>
        </div>
      </div>

      <SystemButton
        onClick={onNext}
        disabled={!isValid}
        className="w-full"
        glow={!!isValid}
      >
        Proceed to Assessment
      </SystemButton>
    </div>
  );
}
