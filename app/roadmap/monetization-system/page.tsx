"use client";

import { Crown, Target, Sparkles, DollarSign, TrendingUp, LineChart, BarChart3, ArrowUpRight, Check, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export default function MonetizationSystemPage() {
  const revenueStreams = [
    {
      title: "Subscription Revenue",
      percentage: 60,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan",
      description: "Three-tier freemium model with high conversion rates"
    },
    {
      title: "Advertising Revenue",
      percentage: 35,
      color: "text-purple-400",
      bgColor: "bg-purple-400",
      description: "Non-intrusive ads generating $10-20 CPM"
    },
    {
      title: "Creator Economy",
      percentage: 5,
      color: "text-green-400",
      bgColor: "bg-green-400",
      description: "70/30 revenue split for video creators"
    }
  ];

  const plans = [
    {
      id: "free",
      name: "Free Hunter",
      price: "$0",
      period: "forever",
      icon: Target,
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
      borderColor: "border-gray-400/30",
      conversion: "65% of users",
      features: "1 quest/day, 3 AI evals, 10 chatbot questions, 2 videos, ads included"
    },
    {
      id: "pro",
      name: "Pro Hunter",
      price: "$9.99",
      period: "/month",
      icon: Crown,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      borderColor: "border-system-cyan/50",
      popular: true,
      conversion: "30% of users",
      features: "Unlimited quests & AI evals, 300 chatbot questions, 10 videos, ad-free, analytics, nutrition tracking, IoT sync"
    },
    {
      id: "max",
      name: "Max Hunter",
      price: "$19.99",
      period: "/month",
      icon: Sparkles,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/50",
      conversion: "5% of users",
      features: "All Pro + video monetization (70%), unlimited uploads, live streaming, AI coach, full guild access"
    }
  ];

  const revenueProjections = [
    {
      scenario: "Year 1 (Conservative)",
      users: "1,000",
      monthlyRevenue: "$4,838",
      arpu: "$4.84",
      subsRevenue: "$1,984 (41%)",
      adsRevenue: "$2,840 (59%)",
      creatorRevenue: "$14 (1%)"
    },
    {
      scenario: "Year 2 (Aggressive)",
      users: "10,000",
      monthlyRevenue: "$112,540",
      arpu: "$11.25",
      subsRevenue: "$67,524 (60%)",
      adsRevenue: "$39,389 (35%)",
      creatorRevenue: "$5,627 (5%)"
    }
  ];

  const adRevenueDetails = [
    { type: "Native Feed Ads", cpm: "$10", details: "1 ad per 4 posts (20% of feed)" },
    { type: "Sponsored Quests", rate: "$0.50-2.00", details: "Per quest start - primary revenue driver" },
    { type: "Video Pre-Rolls", cpm: "$15", details: "15-30s skippable before workout videos" },
    { type: "Interstitials", cpm: "$20", details: "Max 1 ad/hour between quest completions" }
  ];

  const competitiveAdvantages = [
    {
      icon: TrendingUp,
      title: "AI-Powered Differentiation",
      description: "Unique AI quest generation + judge evaluation creates daily habit loops that increase retention and LTV"
    },
    {
      icon: BarChart3,
      title: "High-Lifetime Value (LTV)",
      description: "Gamification (XP, levels, guilds) increases user engagement. Pro/Max users have 3x higher retention than Free users"
    },
    {
      icon: DollarSign,
      title: "Low Cost Structure",
      description: "Fixed costs $90-900/month, variable costs $0.50-0.70/user/month. 80%+ gross margins at all scales"
    },
    {
      icon: ArrowUpRight,
      title: "Creator Economy Network Effects",
      description: "70% revenue share attracts creators, driving content growth and organic user acquisition"
    }
  ];

  const keyMetrics = [
    { metric: "Break-Even Users", value: "45", detail: "With ads (77% reduction vs subs-only)" },
    { metric: "Gross Margin", value: "80%+", detail: "At all scales" },
    { metric: "Year 1 MRR", value: "$4,838", detail: "1,000 users" },
    { metric: "Year 2 MRR", value: "$112,540", detail: "10,000 users" },
    { metric: "Year 1 ARR", value: "$58K", detail: "Conservative projection" },
    { metric: "Year 2 ARR", value: "$1.35M", detail: "Aggressive projection" }
  ];

  const implementationPhases = [
    { phase: "Oct 2026", task: "Pricing Strategy & Stripe Setup" },
    { phase: "Nov 2026", task: "Payment Flow & Subscription Management" },
    { phase: "Dec 2026", task: "Feature Gating & Billing UI" },
    { phase: "Q4 2026", task: "Testing & Launch" }
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link href="/roadmap" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Roadmap
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 flex items-center justify-center">
              <Crown className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Monetization Strategy
              </h1>
              <p className="text-sm text-white/60">
                Investor Overview & Financial Projections
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Executive Summary */}
          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 border border-system-cyan/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Executive Summary
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                Hybrid SaaS + ad-supported fitness RPG platform generating revenue through three streams: <span className="text-system-cyan font-semibold">subscriptions</span>, <span className="text-purple-400 font-semibold">advertising</span>, and <span className="text-green-400 font-semibold">creator economy</span>. Break-even at <span className="text-green-400 font-bold">45 users</span> with 80%+ margins at scale.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${stream.bgColor}`} />
                      <h3 className={`text-lg font-bold ${stream.color}`}>
                        {stream.title}
                      </h3>
                    </div>
                    <div className={`text-4xl font-display font-bold ${stream.color} mb-2`}>
                      {stream.percentage}%
                    </div>
                    <p className="text-xs text-white/60">
                      {stream.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-system-cyan mb-1">$4.84</div>
                  <div className="text-xs text-white/60">ARPU (Year 1)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">$11.25</div>
                  <div className="text-xs text-white/60">ARPU (Year 2)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">80%+</div>
                  <div className="text-xs text-white/60">Gross Margin</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">45</div>
                  <div className="text-xs text-white/60">Break-Even Users</div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Tiers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Three-Tier Subscription Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "bg-void-deep/50 border-2 rounded-2xl p-6 relative overflow-hidden",
                      plan.popular ? "border-system-cyan/50 shadow-lg shadow-system-cyan/10" : "border-white/10"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-system-cyan to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", plan.bgColor, "border", plan.borderColor)}>
                        <Icon className={cn("w-6 h-6", plan.color)} />
                      </div>
                      <div>
                        <h3 className={cn("text-xl font-bold text-white", plan.color)}>
                          {plan.name}
                        </h3>
                        <p className="text-xs text-white/60">{plan.conversion}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-white">
                          {plan.price}
                        </span>
                        <span className="text-sm text-white/60">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-white/70 leading-relaxed">
                        {plan.features}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Financial Projections */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Financial Projections
            </h2>
            
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Scenario</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Users</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Monthly Revenue</th>
                      <th className="text-right p-4 text-white/70 font-semibold">ARPU</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Subscriptions</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Advertising</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueProjections.map((projection, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-white font-semibold">{projection.scenario}</td>
                        <td className="p-4 text-white">{projection.users}</td>
                        <td className="p-4 text-right text-system-cyan font-bold">{projection.monthlyRevenue}</td>
                        <td className="p-4 text-right text-white">${projection.arpu}</td>
                        <td className="p-4 text-right text-white">{projection.subsRevenue}</td>
                        <td className="p-4 text-right text-white">{projection.adsRevenue}</td>
                        <td className="p-4 text-right text-white">{projection.creatorRevenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  <span className="text-green-400">Ad Revenue Breakdown</span>
                </h3>
                <div className="space-y-3">
                  {adRevenueDetails.map((ad, index) => (
                    <div key={index} className="flex items-start justify-between bg-white/5 rounded-lg p-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">{ad.type}</h4>
                        <p className="text-xs text-white/60">{ad.details}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-green-400 font-bold text-sm">
                          {ad.cpm || ad.rate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-xs text-green-300">
                    <strong>Revenue at Scale:</strong> 1K users → $2,840/mo | 5K users → $14,200/mo | 10K users → $28,400/mo
                  </p>
                </div>
              </div>

              <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  <span className="text-purple-400">Creator Economy</span>
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Eligibility Requirements</h4>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                        Max Tier subscription ($19.99/mo)
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                        Minimum 1,000 followers
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                        Minimum 10,000 total views
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                        30+ days account age
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Revenue Split</h4>
                    <p className="text-sm text-white mb-2">Creators keep 70% of ad revenue</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-xs text-white/70 mb-1">Example: 5,000 views/month</p>
                      <p className="text-sm text-white">$75 gross (at $15 CPM)</p>
                      <p className="text-xs text-green-300 mt-1">Creator: $52.50 | Platform: $22.50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why This Works */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Why This Model Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitiveAdvantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-system-cyan/10 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-system-cyan" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {advantage.title}
                      </h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {advantage.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Key Metrics */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Key Metrics & Break-Even Analysis
            </h2>
            <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-white/60 mb-1">{metric.metric}</p>
                    <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                    <p className="text-[10px] text-white/50">{metric.detail}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="font-bold text-orange-400 mb-2">Cost Structure</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Fixed Costs</span>
                      <span className="text-white font-semibold">$90-900/mo</span>
                    </div>
                    <p className="text-xs text-white/50 ml-auto">Infrastructure, DB, Redis</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Variable Costs</span>
                      <span className="text-white font-semibold">$0.50-0.70/user</span>
                    </div>
                    <p className="text-xs text-white/50 ml-auto">Scales with users</p>
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-green-400 mb-2">Break-Even Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Break-Even (with ads)</span>
                      <span className="text-white font-bold">45 users</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Break-Even (subs only)</span>
                      <span className="text-white font-bold">200 users</span>
                    </div>
                    <p className="text-xs text-green-300 mt-2">
                      <Check className="w-3 h-3 inline mr-1" />
                      77% reduction in break-even with advertising
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Opportunity */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Market Opportunity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-display font-bold text-system-cyan mb-2">$30B</div>
                <h3 className="text-lg font-bold text-white mb-2">Global Fitness App Market</h3>
                <p className="text-sm text-white/60">Growing at 15% CAGR, post-COVID surge in home fitness adoption</p>
              </div>
              <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-display font-bold text-purple-400 mb-2">$100B</div>
                <h3 className="text-lg font-bold text-white mb-2">Creator Economy TAM</h3>
                <p className="text-sm text-white/60">Expanding rapidly with creator-friendly platforms driving adoption</p>
              </div>
              <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-display font-bold text-green-400 mb-2">Underserved</div>
                <h3 className="text-lg font-bold text-white mb-2">Gaming + Fitness Niche</h3>
                <p className="text-sm text-white/60">No dominant player combining RPG mechanics with fitness training</p>
              </div>
            </div>
          </section>

          {/* Implementation Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Implementation Timeline (Q4 2026)
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {implementationPhases.map((phase, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-system-cyan/10 border border-system-cyan/30 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-system-cyan" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{phase.phase}</h4>
                      <p className="text-sm text-white/70">{phase.task}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Tech Stack</span>
                  <span className="text-xs text-white/50">Next.js, Supabase, Stripe, Groq AI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Est. Development Time</span>
                  <span className="text-xs text-white/50">4 months</span>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics to Track */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Key Performance Indicators (KPIs)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metric: "MRR / MRR Growth", category: "Revenue" },
                { metric: "CAC / LTV Ratio", category: "Acquisition" },
                { metric: "Churn Rate", category: "Retention" },
                { metric: "ARPU by Tier", category: "Revenue" },
                { metric: "Conversion: Free→Pro", category: "Conversion" },
                { metric: "Conversion: Free→Max", category: "Conversion" },
                { metric: "Creator Revenue Share", category: "Creator" },
                { metric: "Ad Revenue per User", category: "Ads" }
              ].map((kpi, index) => (
                <div key={index} className="bg-void-deep/50 border border-white/10 rounded-xl p-4">
                  <span className="text-xs text-white/40 uppercase tracking-wide">{kpi.category}</span>
                  <p className="text-sm font-semibold text-white mt-1">{kpi.metric}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Investment Ask */}
          <section>
            <div className="bg-gradient-to-r from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Investment Ask
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Seed funding required to accelerate development and scale to 10K users within 12 months of launch. Allocation focused on AI infrastructure, video processing, and initial user acquisition campaigns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/5 rounded-xl p-4">
                  <Clock className="w-8 h-8 text-system-cyan mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm mb-1">Development</h4>
                  <p className="text-xs text-white/60">4-month sprint to production</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm mb-1">Scale</h4>
                  <p className="text-xs text-white/60">10K users in 12 months</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <LineChart className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm mb-1">Revenue Target</h4>
                  <p className="text-xs text-white/60">$1.35M ARR by Year 2</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="text-center py-8">
            <p className="text-white/60 text-sm">
              Request follow-up meeting for detailed financial model and go-to-market strategy
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
