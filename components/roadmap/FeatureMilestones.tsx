import { CheckCircle2, Clock, Calendar } from "lucide-react";
import { type FeatureDetail } from "../feature-details-data";
import { cn } from "@/lib/utils/cn";

interface FeatureMilestonesProps {
  feature: FeatureDetail;
}

export function FeatureMilestones({ feature }: FeatureMilestonesProps) {
  return (
    <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Milestones Completed
        </h2>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-bold text-green-400">
            {feature.milestones.completedCount}/{feature.milestones.total} Complete
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-green-400 rounded-full transition-all"
          style={{ width: `${feature.milestones.percentage}%` }}
        />
      </div>

      {/* Completed Milestones */}
      <div className="space-y-4 mb-8">
        {feature.milestones.completed.map((milestone) => (
          <CompletedMilestone key={milestone.id} milestone={milestone} />
        ))}
      </div>

      {/* Upcoming Milestones */}
      {feature.milestones.upcoming.length > 0 && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Upcoming Milestones
          </h3>
          <div className="space-y-4">
            {feature.milestones.upcoming.map((milestone) => (
              <UpcomingMilestone key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      )}

      {/* No upcoming milestones */}
      {feature.milestones.upcoming.length === 0 && feature.milestones.completedCount === feature.milestones.total && (
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">All milestones completed!</span>
          </div>
        </div>
      )}
    </section>
  );
}

interface CompletedMilestoneProps {
  milestone: {
    id: string;
    name: string;
    date: string;
    description: string;
    link?: string;
  };
}

function CompletedMilestone({ milestone }: CompletedMilestoneProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-green-400/5 border border-green-400/20 rounded-xl">
      <div className="flex-shrink-0 mt-0.5">
        <CheckCircle2 className="w-5 h-5 text-green-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-white">{milestone.name}</h4>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">
              {new Date(milestone.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-white/70">{milestone.description}</p>
      </div>
    </div>
  );
}

interface UpcomingMilestoneProps {
  milestone: {
    id: string;
    name: string;
    date: string;
    description: string;
    link?: string;
    priority?: 'High' | 'Medium' | 'Low';
  };
}

function UpcomingMilestone({ milestone }: UpcomingMilestoneProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Low': return 'text-white/60 bg-white/10 border-white/20';
      default: return '';
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
      <div className="flex-shrink-0 mt-0.5">
        <Clock className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-white">{milestone.name}</h4>
          <div className="flex items-center gap-2">
            {milestone.priority && (
              <span className={cn("text-xs px-2 py-0.5 rounded font-bold uppercase border", getPriorityColor(milestone.priority))}>
                {milestone.priority}
              </span>
            )}
            <Calendar className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">
              {new Date(milestone.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-white/70">{milestone.description}</p>
      </div>
    </div>
  );
}
