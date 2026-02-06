"use client";

import { useState } from "react";
import { LineChart, DollarSign, TrendingUp, AlertTriangle, Target, Check, ChevronRight, Calendar, Clock, Zap, BarChart3, PieChart, Info, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function CostPlanningPage() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "monitoring", label: "Cost Monitoring", icon: BarChart3 },
    { id: "optimization", label: "Optimization", icon: Zap },
    { id: "prediction", label: "ML Prediction", icon: TrendingUp },
    { id: "planning", label: "Planning", icon: Target },
  ];

  const keyMetrics = [
    {
      label: "Target Profit Margin",
      value: "80%+",
      description: "Maintain excellent margins at all scales",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      label: "Cost Reduction",
      value: "30-50%",
      description: "Through optimization strategies",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Break-Even",
      value: "45 users",
      description: "77% reduction with ads",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      label: "Annual Savings",
      value: "$100K+",
      description: "At 10,000 users",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
  ];

  const costCategories = [
    {
      name: "Infrastructure",
      icon: LineChart,
      items: ["Backend Servers", "Database (Supabase)", "Caching (Redis)", "CDN & Streaming", "Load Balancer"],
      savings: "30-50%",
    },
    {
      name: "API Costs",
      icon: DollarSign,
      items: ["Groq AI Tokens", "Stripe Fees", "Third-Party APIs", "Rate Limit Overage"],
      savings: "20-40%",
    },
    {
      name: "Video Costs",
      icon: PieChart,
      items: ["Storage (Hot/Warm/Cold)", "Transcoding (GPU)", "Streaming Bandwidth"],
      savings: "40-60%",
    },
    {
      name: "Operations",
      icon: Shield,
      items: ["Support Team", "DevOps Tools", "Monitoring Systems", "Marketing"],
      savings: "10-20%",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/roadmap" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Roadmap
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 flex items-center justify-center">
              <LineChart className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Cost Planning & Optimization
              </h1>
              <p className="text-sm text-white/60">
                Proactive cost management for profitable scaling from 100 to 50,000+ users
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Key Metrics */}
          <section>
            <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3 mb-6">
                <Info className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Strategic Cost Management
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Comprehensive cost planning, monitoring, and optimization system to ensure ASCEND scales profitably while maintaining excellent margins (80%+).
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className={cn("bg-white/5 rounded-xl p-4", metric.bgColor)}>
                    <div className={cn("text-2xl font-bold mb-1", metric.color)}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-white/60 mb-2">{metric.label}</div>
                    <div className="text-xs text-white/70">{metric.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <section>
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-system-cyan text-void-deep"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Cost Planning Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Real-Time Cost Monitoring", description: "Track all infrastructure, API, and operational costs in real-time", icon: BarChart3 },
                        { title: "Automated Optimization", description: "Intelligent automation that identifies waste and applies cost-saving measures", icon: Zap },
                        { title: "Budget Alerting", description: "Proactive alerting before costs exceed budgets or unusual spikes occur", icon: AlertTriangle },
                        { title: "ML-Based Prediction", description: "Machine learning models to predict future costs and enable proactive planning", icon: TrendingUp },
                        { title: "Planning Workspace", description: "Interactive workspace for planning infrastructure scaling and budget allocation", icon: Target },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-5"
                          >
                            <div className="w-10 h-10 rounded-xl bg-system-cyan/10 flex items-center justify-center mb-3">
                              <Icon className="w-5 h-5 text-system-cyan" />
                            </div>
                            <h4 className="font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-sm text-white/70">{item.description}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "monitoring" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Real-Time Cost Monitoring Dashboard</h3>
                    <p className="text-sm text-white/70 mb-6">
                      Single pane of glass for tracking all infrastructure, API, and operational costs in real-time with automatic alerting and trend analysis.
                    </p>
                    <div className="space-y-4">
                      {[
                        { title: "Infrastructure Cost Tracker", icon: BarChart3, color: "text-blue-400", items: ["DigitalOcean VPS", "AWS EC2", "Supabase DB", "Redis Cloud", "Cloudflare Stream"] },
                        { title: "API Cost Tracker", icon: DollarSign, color: "text-green-400", items: ["Groq AI Tokens", "Stripe Payments", "Third-Party APIs"] },
                        { title: "Profit Calculator", icon: TrendingUp, color: "text-purple-400", items: ["Gross Margin", "Net Profit", "Unit Economics", "LTV:CAC"] },
                      ].map((section, index) => {
                        const Icon = section.icon;
                        return (
                          <div key={section.title} className="bg-white/5 rounded-xl p-5">
                            <h4 className={cn("font-bold mb-3", section.color)}>{section.title}</h4>
                            <ul className="space-y-1">
                              {section.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "optimization" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Infrastructure Optimization</h3>
                      <div className="space-y-3">
                        {[
                          { title: "Idle Resource Detection", description: "Auto-scale down servers with CPU <10% for 24+ hours", savings: "30-50%" },
                          { title: "Right-Sizing", description: "Suggest optimal instance sizes based on actual usage", savings: "20-40%" },
                          { title: "Reserved Instances", description: "70% discount on predictable 24/7 workloads", savings: "40-50%" },
                        ].map((item, index) => (
                          <div key={item.title} className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h4 className="font-bold text-blue-400 mb-2">{item.title}</h4>
                            <p className="text-xs text-white/70 mb-2">{item.description}</p>
                            <div className="text-xs text-green-400 font-bold">Savings: {item.savings}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Video Cost Optimization</h3>
                      <div className="space-y-3">
                        {[
                          { title: "Adaptive Bitrate Streaming", description: "Reduce bandwidth 30-40% with no quality loss", savings: "30-40%" },
                          { title: "Tiered Storage", description: "60-80% savings with hot/warm/cold storage strategy", savings: "60-80%" },
                          { title: "GPU Cluster Management", description: "30-40% savings with spot instances and auto-scaling", savings: "30-40%" },
                        ].map((item, index) => (
                          <div key={item.title} className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h4 className="font-bold text-purple-400 mb-2">{item.title}</h4>
                            <p className="text-xs text-white/70 mb-2">{item.description}</p>
                            <div className="text-xs text-green-400 font-bold">Savings: {item.savings}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "prediction" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">ML-Based Cost Prediction</h3>
                    <p className="text-sm text-white/70 mb-6">
                      Machine learning model that predicts future costs based on historical data, user growth projections, and scaling scenarios to enable proactive planning and budgeting.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {[
                        { title: "1-Month Forecast", model: "ARIMA + Neural Network", accuracy: "±10% MAPE", color: "text-blue-400" },
                        { title: "3-Month Forecast", model: "Prophet + XGBoost", accuracy: "±15% MAPE", color: "text-purple-400" },
                        { title: "6-Month Forecast", model: "LSTM + Prophet", accuracy: "±20% MAPE", color: "text-green-400" },
                        { title: "12-Month Forecast", model: "Transformer + Prophet", accuracy: "±25% MAPE", color: "text-yellow-400" },
                      ].map((item) => (
                        <div key={item.title} className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className={cn("w-4 h-4", item.color)} />
                            <h4 className={cn("font-bold", item.color)}>{item.title}</h4>
                          </div>
                          <p className="text-xs text-white/60">{item.model}</p>
                          <p className="text-sm text-white mt-1">Accuracy: {item.accuracy}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-5">
                      <h4 className="font-bold text-purple-400 mb-3">Scenario Modeling</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        {[
                          { growth: "10% MoM", revenue: "$48K/mo", users: "10K" },
                          { growth: "20% MoM", revenue: "$112K/mo", users: "10K" },
                          { growth: "30% MoM", revenue: "$112K/mo", users: "10K" },
                        ].map((scenario, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-3">
                            <p className="text-purple-400 font-bold">{["Conservative", "Moderate", "Optimistic"][index]}</p>
                            <p className="text-white/70">{scenario.growth}</p>
                            <p className="text-green-400">{scenario.revenue} @{scenario.users}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "planning" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Budget Allocation</h3>
                      <div className="space-y-3">
                        {costCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <div key={category.name} className="bg-white/5 border border-white/10 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon className="w-4 h-4 text-system-cyan" />
                                <h4 className="font-bold text-system-cyan">{category.name}</h4>
                              </div>
                              <div className="space-y-1">
                                {category.items.slice(0, 2).map((item, i) => (
                                  <li key={i} className="text-xs text-white/70">• {item}</li>
                                ))}
                              </div>
                              <div className="mt-2 text-xs text-green-400">
                                Potential savings: {category.savings}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">What-If Analysis</h3>
                      <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <h4 className="font-bold text-blue-400 mb-2">Scale to 10K Users</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Infrastructure:</span>
                              <span className="text-white">$2,400/mo</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">API Costs:</span>
                              <span className="text-white">$1,200/mo</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Video Costs:</span>
                              <span className="text-white">$3,000/mo</span>
                            </div>
                            <div className="border-t border-white/10 pt-2 flex justify-between">
                              <span className="text-white font-bold">Total Cost:</span>
                              <span className="text-system-cyan font-bold">$6,600/mo</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
                          <h4 className="font-bold text-green-400 mb-2">With Optimization (40% Savings)</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Optimized Cost:</span>
                              <span className="text-white">$3,960/mo</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Monthly Savings:</span>
                              <span className="text-green-400 font-bold">$2,640/mo</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Annual Savings:</span>
                              <span className="text-green-400 font-bold">$31,680/yr</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Cost Categories */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Cost Categories Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {costCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-500/10 border border-system-cyan/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-system-cyan" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{category.name}</h3>
                        <p className="text-xs text-green-400">Potential savings: {category.savings}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-system-cyan/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "What is the break-even point for ASCEND?",
                  answer: "With advertising, ASCEND breaks even at 45 users (77% reduction compared to 200 users without ads). This demonstrates the power of our hybrid monetization model.",
                },
                {
                  question: "How do you achieve 80%+ profit margins?",
                  answer: "Through proactive cost management, automated optimization, ML-based predictions, and intelligent resource scaling. Our tiered pricing and advertising revenue generate high ARPU while keeping per-user costs minimal.",
                },
                {
                  question: "What cost optimization strategies do you use?",
                  answer: "We use idle resource detection, right-sizing, reserved instances, adaptive bitrate streaming, tiered storage (hot/warm/cold), and GPU cluster management to reduce costs by 30-50%.",
                },
                {
                  question: "How accurate are cost predictions?",
                  answer: "Our ML models achieve ±10-25% accuracy depending on the timeframe: 1-month (±10%), 3-month (±15%), 6-month (±20%), 12-month (±25%).",
                },
                {
                  question: "What are the main cost categories?",
                  answer: "Infrastructure (servers, DB, CDN), API costs (Groq AI, Stripe), Video costs (storage, transcoding, streaming), and Operations (support, DevOps, marketing).",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-void-deep/50 border border-white/10 rounded-xl p-5"
                >
                  <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Optimize for Profitability
              </h2>
              <p className="text-white/70 mb-6">
                Our cost planning system ensures ASCEND scales profitably from 100 to 50,000+ users
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/roadmap/monetization-system"
                  className="px-8 py-3 bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white rounded-lg font-bold transition-all inline-flex items-center gap-2"
                >
                  View Monetization
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tracker"
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all inline-flex items-center gap-2"
                >
                  Implementation Tracker
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
