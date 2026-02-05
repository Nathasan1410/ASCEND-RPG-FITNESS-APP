import { Calendar, CheckCircle2, Circle, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { type FeatureDetail } from "./feature-details-data";
import { cn } from "@/lib/utils/cn";

interface FeatureTimelineProps {
  feature: FeatureDetail;
}

export function FeatureTimeline({ feature }: FeatureTimelineProps) {
  return (
    <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        When will this be achieved?
      </h2>
      
      {/* Target Date */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-xl">
        <div className="w-12 h-12 rounded-xl bg-system-cyan/20 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-6 h-6 text-system-cyan" />
        </div>
        <div>
          <div className="text-sm text-white/60 mb-1">Target</div>
          <div className="text-lg font-bold text-white">{feature.timeline.targetDate}</div>
          <div className="text-sm text-system-cyan">{feature.timeline.quarter}</div>
        </div>
      </div>
      
      {/* Timeline Visualization */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Timeline Phases</h3>
        <div className="space-y-4">
          {feature.timeline.phases.map((phase, index: number) => (
            <TimelinePhase key={index} phase={phase} />
          ))}
        </div>
      </div>

      {/* Dependencies */}
      {feature.timeline.dependencies.length > 0 && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-bold text-white mb-4">Dependencies</h3>
          <div className="flex flex-wrap gap-3">
            {feature.timeline.dependencies.map((dep: string) => (
              <Link
                key={dep}
                href={`/roadmap/${dep}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
              >
                <LinkIcon className="w-4 h-4 text-white/60 group-hover:text-system-cyan transition-colors" />
                <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                  {dep.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {feature.timeline.dependencies.length === 0 && (
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 text-white/60">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm">No dependencies - this feature can be developed independently</span>
          </div>
        </div>
      )}
    </section>
  );
}

interface TimelinePhaseProps {
  phase: FeatureDetail['timeline']['phases'][number];
}

function TimelinePhase({ phase }: TimelinePhaseProps) {
  const getStatusIcon = () => {
    switch (phase.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-white/30" />;
    }
  };

  const getStatusColor = () => {
    switch (phase.status) {
      case 'completed':
        return 'border-green-400/30 bg-green-400/5';
      case 'in_progress':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'pending':
        return 'border-white/10 bg-white/5';
    }
  };

  return (
    <div className={cn("flex items-start gap-4 p-4 border rounded-xl", getStatusColor())}>
      <div className="flex-shrink-0 mt-0.5">
        {getStatusIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-white">{phase.name}</h4>
          <span className="text-sm text-white/60">{phase.date}</span>
        </div>
        {phase.description && (
          <p className="text-sm text-white/70">{phase.description}</p>
        )}
      </div>
    </div>
  );
}
