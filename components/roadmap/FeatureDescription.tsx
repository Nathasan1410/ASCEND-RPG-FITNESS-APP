import { AlertCircle, CheckCircle2 } from "lucide-react";
import { type FeatureDetail } from "../feature-details-data";

interface FeatureDescriptionProps {
  feature: FeatureDetail;
}

export function FeatureDescription({ feature }: FeatureDescriptionProps) {
  return (
    <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">What is this feature?</h2>
      
      {/* User-facing description */}
      <p className="text-white/80 mb-6 text-lg">
        {feature.description.userFacing}
      </p>
      
      {/* Technical explanation */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-bold text-system-cyan mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Technical Details
        </h3>
        <p className="text-sm text-white/60">
          {feature.description.technical}
        </p>
      </div>
      
      {/* Why needed */}
      <div className="border-t border-white/10 pt-6">
        <h2 className="text-2xl font-bold text-white mb-4">Why is this needed?</h2>
        
        {/* Problem Statement */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2">Problem Statement</h3>
          <p className="text-white/70">
            {feature.description.problemStatement}
          </p>
        </div>

        {/* Current Limitations */}
        {feature.description.currentLimitations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Current Limitations</h3>
            <ul className="space-y-2">
              {feature.description.currentLimitations.map((limitation: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-white/70">
                  <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Solution */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2">Solution</h3>
          <p className="text-white/70">
            {feature.description.solution}
          </p>
        </div>

        {/* User Benefits */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-3">User Benefits</h3>
          <ul className="space-y-2">
            {feature.description.userBenefits.map((benefit: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-white/70">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Value */}
        <div className="bg-gradient-to-r from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-xl p-4">
          <h3 className="text-sm font-bold text-system-cyan mb-2">Business Value</h3>
          <p className="text-sm text-white/70">
            {feature.description.businessValue}
          </p>
        </div>
      </div>
    </section>
  );
}
