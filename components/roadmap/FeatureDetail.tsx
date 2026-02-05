"use client";

import { getFeatureById } from "./feature-utils";
import { FeatureHeader } from "./FeatureHeader";
import { FeatureDescription } from "./FeatureDescription";
import { FeatureTimeline } from "./FeatureTimeline";
import { FeatureMilestones } from "./FeatureMilestones";
import { FeatureImplementationTracker } from "./FeatureImplementationTracker";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface FeatureDetailProps {
  featureId: string;
}

export function FeatureDetail({ featureId }: FeatureDetailProps) {
  const feature = getFeatureById(featureId);

  if (!feature) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Feature Not Found</h1>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 text-system-cyan hover:text-white transition-colors"
          >
            Back to Roadmap
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/roadmap" className="hover:text-white transition-colors">
              Roadmap
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{feature.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Feature Header */}
        <FeatureHeader feature={feature} />

        {/* What & Why */}
        <FeatureDescription feature={feature} />

        {/* Timeline */}
        <FeatureTimeline feature={feature} />

        {/* Milestones */}
        <FeatureMilestones feature={feature} />

        {/* Implementation Tracker */}
        <FeatureImplementationTracker feature={feature} />
      </div>
    </div>
  );
}
