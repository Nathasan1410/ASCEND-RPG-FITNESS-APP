import { Calendar, TrendingUp, Zap, Users, Bot, DollarSign, Star } from "lucide-react";
import { type FeatureDetail } from "./feature-details-data";
import { cn } from "@/lib/utils/cn";

interface FeatureHeaderProps {
  feature: FeatureDetail;
}

export function FeatureHeader({ feature }: FeatureHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'In Progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Planned': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Not Started': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-white/60 bg-white/10 border-white/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Low': return 'text-white/60 bg-white/10';
      default: return 'text-white/60 bg-white/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Core': return <Zap className="w-4 h-4" />;
      case 'Social': return <Users className="w-4 h-4" />;
      case 'AI': return <Bot className="w-4 h-4" />;
      case 'Monetization': return <DollarSign className="w-4 h-4" />;
      case 'Innovation': return <Star className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core': return 'text-system-cyan';
      case 'Social': return 'text-blue-400';
      case 'AI': return 'text-purple-400';
      case 'Monetization': return 'text-green-400';
      case 'Innovation': return 'text-yellow-400';
      default: return 'text-white/60';
    }
  };

  const statusColors = getStatusColor(feature.status);
  const priorityColors = getPriorityColor(feature.priority);
  const categoryColors = getCategoryColor(feature.category);

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-display font-bold text-white mb-4">
        {feature.name}
      </h1>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={cn("px-3 py-1 rounded-lg text-sm font-bold uppercase border", statusColors)}>
          {feature.status}
        </span>
        <span className={cn("px-3 py-1 rounded-lg text-sm font-bold", priorityColors)}>
          {feature.priority} Priority
        </span>
        <span className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold", categoryColors)}>
          {getCategoryIcon(feature.category)}
          {feature.category}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Overall Progress</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-system-cyan" />
            <span className="text-lg font-bold text-white">{feature.progress}%</span>
          </div>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", 
              feature.status === 'Implemented' ? 'bg-green-400' :
              feature.status === 'In Progress' ? 'bg-yellow-400' :
              'bg-blue-400'
            )}
            style={{ width: `${feature.progress}%` }}
          />
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Calendar className="w-4 h-4" />
        <span>Last updated: {new Date(feature.lastUpdated).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
    </div>
  );
}
