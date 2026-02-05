"use client";

import { CheckCircle, Lock, Star, ArrowRight, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { type TrackedFeature } from "./tracker-data";
import { motion } from "framer-motion";

interface TrackerFeatureCardProps {
  feature: TrackedFeature;
}

export function TrackerFeatureCard({ feature }: TrackerFeatureCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return {
        text: 'text-green-400',
        bg: 'bg-green-400/10',
        border: 'border-green-400/30',
        progress: 'bg-green-400'
      };
      case 'In Progress': return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/30',
        progress: 'bg-yellow-400'
      };
      case 'Planned': return {
        text: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/30',
        progress: 'bg-blue-400'
      };
      case 'Not Started': return {
        text: 'text-gray-400',
        bg: 'bg-gray-400/10',
        border: 'border-gray-400/30',
        progress: 'bg-gray-400'
      };
      default: return {
        text: 'text-white/60',
        bg: 'bg-white/10',
        border: 'border-white/20',
        progress: 'bg-white/60'
      };
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Low': return 'text-white/60 bg-white/10';
      default: return 'text-white/60 bg-white/10';
    }
  };

  const statusColors = getStatusColor(feature.status);

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
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={cn("text-xs px-2 py-0.5 rounded font-bold uppercase border", statusColors.bg, statusColors.border, statusColors.text)}>
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
      </div>

      {/* Description */}
      <p className="text-sm text-white/60 mb-4 line-clamp-2">
        {feature.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/60">Progress</span>
          <span className={cn("text-xs font-bold", statusColors.text)}>
            {feature.progress}%
          </span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", statusColors.progress)}
            style={{ width: `${feature.progress}%` }}
          />
        </div>
      </div>

      {/* User Availability */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">User Availability</span>
          {feature.userAvailable ? (
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs font-bold">Available</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-white/40">
              <Lock className="w-3 h-3" />
              <span className="text-xs">Not Available</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">Demo Account</span>
          {feature.demoAccountAvailable ? (
            <div className="flex items-center gap-1 text-blue-400">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs font-bold">Yes</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-white/40">
              <span className="text-xs">No</span>
            </div>
          )}
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
        <Calendar className="w-3 h-3" />
        <span>Last updated: {feature.lastUpdated}</span>
      </div>

      {/* CTA */}
      {feature.userAvailable && (
        <Link
          href="/help/demo-accounts"
          className="inline-flex items-center gap-2 text-xs font-bold text-system-cyan hover:text-white transition-colors"
        >
          Try with Demo Account
          <ArrowRight className="w-3 h-3" />
        </Link>
      )}

      {feature.status === 'Implemented' && feature.userAvailable && (
        <div className="mt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-green-400 hover:text-white transition-colors"
          >
            Use Feature Now
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* View Details Link */}
      <div className="mt-3 pt-3 border-t border-white/10">
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
