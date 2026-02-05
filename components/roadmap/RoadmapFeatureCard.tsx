"use client";

import { Star, Clock, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { type Feature } from "./roadmap-data";
import { motion } from "framer-motion";

interface RoadmapFeatureCardProps {
  feature: Feature;
  showInnovationRating?: boolean;
}

export function RoadmapFeatureCard({ feature, showInnovationRating = false }: RoadmapFeatureCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'In Progress': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'Planned': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      default: return 'text-white/60 border-white/20 bg-white/10';
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

  return (
    <motion.div
      className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
            {feature.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("text-xs px-2 py-0.5 rounded font-bold uppercase border", getStatusColor(feature.status))}>
              {feature.status}
            </span>
            <span className={cn("text-xs px-2 py-0.5 rounded font-bold", getPriorityColor(feature.priority))}>
              {feature.priority}
            </span>
            <span className={cn("text-xs", getCategoryColor(feature.category))}>
              {feature.category}
            </span>
          </div>
        </div>
        {showInnovationRating && feature.starRating && (
          <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-bold text-yellow-400">{feature.starRating}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-white/60 mb-4 line-clamp-3">
        {feature.description}
      </p>

      {/* Timeline */}
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Clock className="w-3 h-3" />
        <span>{feature.timeline}</span>
      </div>

      {/* Innovation Rating Stars */}
      {showInnovationRating && feature.starRating && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(feature.starRating!)
                    ? "text-yellow-400 fill-current"
                    : "text-white/20"
                )}
              />
            ))}
            <span className="text-xs text-white/60 ml-2">{feature.starRating}/5</span>
          </div>
        </div>
      )}

      {/* CTA for implemented features */}
      {feature.status === 'Implemented' && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            href="/tracker"
            className="inline-flex items-center gap-2 text-xs font-bold text-system-cyan hover:text-white transition-colors"
          >
            View in Tracker
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* View Details Link */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <Link
          href={`/roadmap/${feature.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors"
        >
          View Details
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
