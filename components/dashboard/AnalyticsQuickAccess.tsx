"use client";

import Link from "next/link";
import { BarChart3, FlaskConical, GitCommit, Database, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  count?: number;
  trend?: string;
}

const analyticsCards: AnalyticsCard[] = [
  {
    id: "ai-analytics",
    title: "AI Analytics",
    description: "View performance metrics, trends, and AI evaluation results",
    icon: BarChart3,
    href: "/dashboard/analytics",
    color: "from-cyan-500/10 to-blue-500/10",
    trend: "+15% this week",
  },
  {
    id: "experiments",
    title: "A/B Experiments",
    description: "Manage and view AI experiments, prompt testing, and results",
    icon: FlaskConical,
    href: "/dashboard/analytics/experiments",
    color: "from-purple-500/10 to-pink-500/10",
    count: 3,
  },
  {
    id: "prompts",
    title: "Prompt History",
    description: "View all AI prompt versions, changes, and optimization history",
    icon: GitCommit,
    href: "/dashboard/analytics/prompts",
    color: "from-green-500/10 to-emerald-500/10",
  },
  {
    id: "traces",
    title: "Trace Export",
    description: "Export and analyze Opik trace data for team collaboration",
    icon: Database,
    href: "/dashboard/analytics/traces",
    color: "from-yellow-500/10 to-orange-500/10",
  },
];

export function AnalyticsQuickAccess() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-system-cyan" />
          <div>
            <h2 className="text-xl font-bold text-white">AI Analytics</h2>
            <p className="text-sm text-white/60">Quick access to performance data</p>
          </div>
        </div>
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-2 text-sm text-system-cyan hover:text-system-cyan/80 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsCards.map((card, index) => (
          <Link key={card.id} href={card.href} className="group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`h-full p-6 rounded-xl border transition-all duration-300
                bg-gradient-to-br ${card.color}
                border-white/10 hover:border-system-cyan/30
                hover:shadow-lg hover:shadow-system-cyan/20`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  {card.count !== undefined && (
                    <div className="text-xs font-bold text-white/80 bg-black/20 px-2 py-1 rounded">
                      {card.count}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-white/70 mb-4 flex-1">
                  {card.description}
                </p>

                {card.trend && (
                  <div className="mt-auto">
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <ArrowRight className="w-3 h-3" />
                      <span>{card.trend}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}