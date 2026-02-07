"use client";

import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Users, Server, Database, Wifi, Cpu, CreditCard, PiggyBank, AlertTriangle, CheckCircle, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CostPlanningPage() {
  const [selectedScenario, setSelectedScenario] = useState<string>("1000");
  const [selectedProjectionTime, setSelectedProjectionTime] = useState<string>("3months");
  const [selectedProjectionUsers, setSelectedProjectionUsers] = useState<string>("1000");


  // === UNIT ECONOMICS ===
  const unitEconomics = {
    freeUser: {
      monthlyCost: 1.02,
      monthlyRevenue: 3.55,
      profit: 2.53,
      roi: "248%",
      costBreakdown: {
        infrastructure: 0.85,
        aiApi: 0.07,
        videoStorage: 0.01,
        videoStreaming: 0.04,
        videoTranscoding: 0.05,
      },
      revenueBreakdown: {
        feedAds: 0.40,
        sponsoredQuests: 2.00,
        videoPreroll: 0.30,
        bannerAds: 0.18,
        interstitials: 0.67,
      },
    },
    proUser: {
      monthlyCost: 1.96,
      monthlyRevenue: 9.99,
      profit: 8.03,
      roi: "410%",
      costBreakdown: {
        infrastructure: 0.85,
        aiApi: 0.26,
        videoStorage: 0.10,
        videoStreaming: 0.52,
        videoTranscoding: 0.23,
      },
      revenueBreakdown: {
        subscription: 9.99,
      },
    },
    maxUser: {
      monthlyCost: 2.15,
      monthlyRevenue: 19.99,
      profit: 17.84,
      roi: "830%",
      costBreakdown: {
        infrastructure: 0.85,
        aiApi: 0.35,
        videoStorage: 0.25,
        videoStreaming: 0.65,
        videoTranscoding: 0.05,
      },
      revenueBreakdown: {
        subscription: 19.99,
      },
    },
  };

  // === SCALING SCENARIOS ===
  const scenarios = {
    "100": {
      users: 100,
      freeUsers: 80,
      proUsers: 20,
      maxUsers: 0,
      totalCost: 190.50,
      subscriptionRevenue: 199.80,
      adRevenue: 227.00,
      totalRevenue: 426.80,
      netProfit: 236.30,
      margin: "55%",
      infrastructure: {
        backend: 48,
        transcoding: 0,
        database: 25,
        redis: 15,
        cdn: 50,
      },
    },
    "500": {
      users: 500,
      freeUsers: 400,
      proUsers: 100,
      maxUsers: 0,
      totalCost: 598.50,
      subscriptionRevenue: 999.00,
      adRevenue: 1136.00,
      totalRevenue: 2135.00,
      netProfit: 1536.50,
      margin: "72%",
      infrastructure: {
        backend: 96,
        transcoding: 40,
        database: 50,
        redis: 30,
        cdn: 200,
      },
    },
    "1000": {
      users: 1000,
      freeUsers: 800,
      proUsers: 200,
      maxUsers: 0,
      totalCost: 1235.00,
      subscriptionRevenue: 1998.00,
      adRevenue: 2840.00,
      totalRevenue: 4838.00,
      netProfit: 3603.00,
      margin: "74%",
      infrastructure: {
        backend: 160,
        transcoding: 120,
        database: 50,
        redis: 60,
        cdn: 500,
      },
    },
    "5000": {
      users: 5000,
      freeUsers: 4000,
      proUsers: 1000,
      maxUsers: 0,
      totalCost: 4585.00,
      subscriptionRevenue: 9990.00,
      adRevenue: 14200.00,
      totalRevenue: 24190.00,
      netProfit: 19605.00,
      margin: "81%",
      infrastructure: {
        backend: 320,
        transcoding: 400,
        database: 100,
        redis: 120,
        cdn: 2000,
      },
    },
    "10000": {
      users: 10000,
      freeUsers: 8000,
      proUsers: 2000,
      maxUsers: 0,
      totalCost: 9150.00,
      subscriptionRevenue: 19980.00,
      adRevenue: 28400.00,
      totalRevenue: 48380.00,
      netProfit: 39230.00,
      margin: "81%",
      infrastructure: {
        backend: 640,
        transcoding: 800,
        database: 200,
        redis: 240,
        cdn: 4000,
      },
    },
  };

  const currentScenario = scenarios[selectedScenario as keyof typeof scenarios];

  // === BREAK-EVEN CALCULATION ===
  const breakEvenAnalysis = {
    withoutAds: {
      fixedCosts: 90,
      variableCostPerUser: 0.70,
      revenuePerProUser: 9.99,
      requiredUsers: 200,
      requiredProUsers: 40,
      conversionRate: "20%",
    },
    withAds: {
      fixedCosts: 90,
      variableCostPerUser: 0.70,
      revenuePerFreeUser: 3.55,
      revenuePerProUser: 9.99,
      requiredUsers: 45,
      requiredProUsers: 9,
      conversionRate: "20%",
      reduction: "77%",
    },
  };

  // === REVENUE ALLOCATION ===
  const revenueAllocation = {
    at1000Users: {
      subscription: { amount: 1998, percentage: 41, destination: "Stripe Account" },
      feedAds: { amount: 100, percentage: 2, destination: "Ad Network" },
      sponsoredQuests: { amount: 1500, percentage: 31, destination: "Brand Partnerships" },
      videoPreroll: { amount: 150, percentage: 3, destination: "Video Ad Network" },
      bannerAds: { amount: 90, percentage: 2, destination: "Display Ad Network" },
      interstitials: { amount: 1000, percentage: 21, destination: "Ad Network" },
    },
  };

  // === COST ALLOCATION ===
  const costAllocation = {
    at1000Users: {
      infrastructure: { amount: 910, percentage: 74, breakdown: "Backend, DB, CDN, Transcoding" },
      aiApi: { amount: 108, percentage: 9, breakdown: "Groq tokens" },
      storage: { amount: 217, percentage: 18, breakdown: "Video storage & streaming" },
    },
  };

  // === CAC & LTV CALCULATION ===
  const cacLtv = {
    cac: {
      marketingSpend: 5000,
      newUsersAcquired: 1000,
      cacPerUser: 5.00,
    },
    ltv: {
      averageRevenuePerUser: 4.84,
      grossMargin: 0.81,
      monthlyChurnRate: 0.05,
      ltvMonths: 20,
      ltvDollars: 78.41,
    },
    ratio: "15.7:1",
    paybackPeriod: "1.2 months",
  };

  // === PROJECTIONS ===
  const projections = {
    "3months": {
      "100": { users: 100, months: 3, cost: 571.50, subscriptionRevenue: 599.40, adRevenue: 681.00, totalRevenue: 1280.40, profit: 708.90, margin: "55%" },
      "500": { users: 500, months: 3, cost: 1795.50, subscriptionRevenue: 2997.00, adRevenue: 3408.00, totalRevenue: 6405.00, profit: 4609.50, margin: "72%" },
      "1000": { users: 1000, months: 3, cost: 3705.00, subscriptionRevenue: 5994.00, adRevenue: 8520.00, totalRevenue: 14514.00, profit: 10809.00, margin: "74%" },
      "5000": { users: 5000, months: 3, cost: 13755.00, subscriptionRevenue: 29970.00, adRevenue: 42600.00, totalRevenue: 72570.00, profit: 58815.00, margin: "81%" },
      "10000": { users: 10000, months: 3, cost: 27450.00, subscriptionRevenue: 59940.00, adRevenue: 85200.00, totalRevenue: 145140.00, profit: 117690.00, margin: "81%" },
    },
    "6months": {
      "100": { users: 100, months: 6, cost: 1143.00, subscriptionRevenue: 599.40, adRevenue: 681.00, totalRevenue: 1280.40, profit: 1417.80, margin: "55%" },
      "500": { users: 500, months: 6, cost: 3591.00, subscriptionRevenue: 2997.00, adRevenue: 3408.00, totalRevenue: 6405.00, profit: 9219.00, margin: "72%" },
      "1000": { users: 1000, months: 6, cost: 7410.00, subscriptionRevenue: 5994.00, adRevenue: 8520.00, totalRevenue: 14514.00, profit: 21618.00, margin: "74%" },
      "5000": { users: 5000, months: 6, cost: 27510.00, subscriptionRevenue: 29970.00, adRevenue: 42600.00, totalRevenue: 72570.00, profit: 117630.00, margin: "81%" },
      "10000": { users: 10000, months: 6, cost: 54900.00, subscriptionRevenue: 59940.00, adRevenue: 85200.00, totalRevenue: 145140.00, profit: 235380.00, margin: "81%" },
    },
    "1year": {
      "100": { users: 100, months: 12, cost: 2286.00, subscriptionRevenue: 599.40, adRevenue: 681.00, totalRevenue: 1280.40, profit: 2835.60, margin: "55%" },
      "500": { users: 500, months: 12, cost: 7182.00, subscriptionRevenue: 2997.00, adRevenue: 3408.00, totalRevenue: 6405.00, profit: 18438.00, margin: "72%" },
      "1000": { users: 1000, months: 12, cost: 14820.00, subscriptionRevenue: 5994.00, adRevenue: 8520.00, totalRevenue: 14514.00, profit: 43236.00, margin: "74%" },
      "5000": { users: 5000, months: 12, cost: 55020.00, subscriptionRevenue: 29970.00, adRevenue: 42600.00, totalRevenue: 72570.00, profit: 235260.00, margin: "81%" },
      "10000": { users: 10000, months: 12, cost: 109800.00, subscriptionRevenue: 59940.00, adRevenue: 85200.00, totalRevenue: 145140.00, profit: 470760.00, margin: "81%" },
    },
  };

  const getCurrentProjection = () => {
    const timePeriod = projections[selectedProjectionTime as keyof typeof projections];
    return timePeriod[selectedProjectionUsers as keyof typeof timePeriod];
  };

  const currentProjection = getCurrentProjection();

  return (
    <div className="min-h-screen bg-void-deep pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            ASCEND Financial Planning
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Detailed unit economics, cost breakdowns, and revenue projections
          </p>
        </motion.div>

        {/* UNIT ECONOMICS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-system-cyan" />
            Unit Economics (Per User/Month)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free User */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white/60 mb-4">Free User</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Monthly Cost:</span>
                  <span className="text-status-error font-mono">${unitEconomics.freeUser.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Monthly Revenue:</span>
                  <span className="text-status-success font-mono">${unitEconomics.freeUser.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                  <span className="text-white/40">Net Profit:</span>
                  <span className="text-system-cyan font-bold font-mono">${unitEconomics.freeUser.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">ROI:</span>
                  <span className="text-system-cyan font-bold">{unitEconomics.freeUser.roi}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs text-white/30 uppercase font-semibold">Cost Breakdown</p>
                {Object.entries(unitEconomics.freeUser.costBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/40 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono text-white/60">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-xs text-white/30 uppercase font-semibold">Revenue Sources</p>
                {Object.entries(unitEconomics.freeUser.revenueBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/40 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono text-status-success">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pro User */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-void-panel/50 border-2 border-system-cyan/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-system-cyan">Pro User</h3>
                <span className="px-2 py-1 bg-system-cyan/10 text-system-cyan text-xs rounded-full">Most Profitable</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Monthly Cost:</span>
                  <span className="text-status-error font-mono">${unitEconomics.proUser.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subscription:</span>
                  <span className="text-status-success font-mono">${unitEconomics.proUser.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                  <span className="text-white/40">Net Profit:</span>
                  <span className="text-system-cyan font-bold font-mono">${unitEconomics.proUser.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">ROI:</span>
                  <span className="text-system-cyan font-bold">{unitEconomics.proUser.roi}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-white/30 uppercase font-semibold">Cost Breakdown</p>
                {Object.entries(unitEconomics.proUser.costBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/40 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono text-white/60">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Max User */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white/60">Max User</h3>
                <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full">Highest ROI</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Monthly Cost:</span>
                  <span className="text-status-error font-mono">${unitEconomics.maxUser.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subscription:</span>
                  <span className="text-status-success font-mono">${unitEconomics.maxUser.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                  <span className="text-white/40">Net Profit:</span>
                  <span className="text-system-cyan font-bold font-mono">${unitEconomics.maxUser.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">ROI:</span>
                  <span className="text-system-cyan font-bold">{unitEconomics.maxUser.roi}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-white/30 uppercase font-semibold">Cost Breakdown</p>
                {Object.entries(unitEconomics.maxUser.costBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/40 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono text-white/60">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* SCALING SCENARIOS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-status-success" />
              Scaling Scenarios
            </h2>
            <div className="flex space-x-2">
              {Object.keys(scenarios).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                    selectedScenario === key
                      ? "bg-system-cyan text-void-deep"
                      : "bg-void-panel/50 text-white/60 hover:bg-white/5"
                  }`}
                >
                  {key} Users
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Financial Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Financial Summary: {currentScenario.users.toLocaleString()} Users
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-void-panel/30 rounded-lg p-4">
                    <p className="text-sm text-white/40 mb-1">Free Users</p>
                    <p className="text-2xl font-bold text-white/60">{currentScenario.freeUsers}</p>
                    <p className="text-xs text-white/30">80%</p>
                  </div>
                  <div className="bg-void-panel/30 rounded-lg p-4">
                    <p className="text-sm text-white/40 mb-1">Pro Users</p>
                    <p className="text-2xl font-bold text-system-cyan">{currentScenario.proUsers}</p>
                    <p className="text-xs text-white/30">20%</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Total Cost:</span>
                    <span className="text-status-error font-mono font-bold">${currentScenario.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Subscription Revenue:</span>
                    <span className="text-system-cyan font-mono">${currentScenario.subscriptionRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Ad Revenue:</span>
                    <span className="text-status-success font-mono">${currentScenario.adRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-3">
                    <span className="text-white/40">Total Revenue:</span>
                    <span className="text-white font-mono font-bold">${currentScenario.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Net Profit:</span>
                    <span className="text-status-success font-mono font-bold text-lg">${currentScenario.netProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Profit Margin:</span>
                    <span className="text-system-cyan font-bold">{currentScenario.margin}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Infrastructure Costs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Server className="w-5 h-5 mr-2 text-system-cyan" />
                Infrastructure Breakdown
              </h3>

              <div className="space-y-4">
                {Object.entries(currentScenario.infrastructure).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {key === 'backend' && <Cpu className="w-5 h-5 text-system-cyan" />}
                      {key === 'transcoding' && <Wifi className="w-5 h-5 text-status-warning" />}
                      {key === 'database' && <Database className="w-5 h-5 text-status-success" />}
                      {key === 'redis' && <Server className="w-5 h-5 text-white/60" />}
                      {key === 'cdn' && <Wifi className="w-5 h-5 text-system-cyan" />}
                      <span className="text-white/60 capitalize">{key}:</span>
                    </div>
                    <span className="font-mono text-white/60">${value}/month</span>
                  </div>
                ))}

                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Total Infrastructure:</span>
                    <span className="font-mono font-bold text-white">
                      ${Object.values(currentScenario.infrastructure).reduce((a, b) => a + b, 0)}/month
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* BREAK-EVEN ANALYSIS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-status-warning" />
            Break-Even Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Without Ads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-status-error mb-4">Without Advertising</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Fixed Costs:</span>
                  <span className="font-mono text-white/60">${breakEvenAnalysis.withoutAds.fixedCosts}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Variable Cost/User:</span>
                  <span className="font-mono text-white/60">${breakEvenAnalysis.withoutAds.variableCostPerUser}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Revenue/Pro User:</span>
                  <span className="font-mono text-white/60">${breakEvenAnalysis.withoutAds.revenuePerProUser}</span>
                </div>
              </div>

              <div className="bg-status-error/10 border border-status-error/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-status-error mb-2">Break-Even Formula:</p>
                <code className="text-xs text-status-error font-mono">
                  Users = Fixed / (Revenue - Variable)
                </code>
                <p className="text-xs text-status-error font-mono mt-1">
                  Users = {breakEvenAnalysis.withoutAds.fixedCosts} / ({breakEvenAnalysis.withoutAds.revenuePerProUser} - {breakEvenAnalysis.withoutAds.variableCostPerUser})
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/40">Required Users:</span>
                  <span className="text-status-error font-bold font-mono text-lg">{breakEvenAnalysis.withoutAds.requiredUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Required Pro Users:</span>
                  <span className="text-status-error font-mono">{breakEvenAnalysis.withoutAds.requiredProUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Conversion Rate Needed:</span>
                  <span className="text-status-error font-mono">{breakEvenAnalysis.withoutAds.conversionRate}</span>
                </div>
              </div>
            </motion.div>

            {/* With Ads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-void-panel/50 border-2 border-status-success/30 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-status-success">With Advertising</h3>
                <span className="px-2 py-1 bg-status-success/10 text-status-success text-xs rounded-full">
                  -{breakEvenAnalysis.withAds.reduction} break-even
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Fixed Costs:</span>
                  <span className="font-mono text-white/60">${breakEvenAnalysis.withAds.fixedCosts}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Variable Cost/User:</span>
                  <span className="font-mono text-white/60">${breakEvenAnalysis.withAds.variableCostPerUser}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Revenue/Free User:</span>
                  <span className="font-mono text-status-success">${breakEvenAnalysis.withAds.revenuePerFreeUser}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Revenue/Pro User:</span>
                  <span className="font-mono text-system-cyan">${breakEvenAnalysis.withAds.revenuePerProUser}</span>
                </div>
              </div>

              <div className="bg-status-success/10 border border-status-success/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-status-success mb-2">Break-Even Formula:</p>
                <code className="text-xs text-status-success font-mono">
                  Total Revenue = Total Cost
                </code>
                <p className="text-xs text-status-success font-mono mt-1">
                  (FreeÃ—$3.55) + (ProÃ—$9.99) = $90 + (UsersÃ—$0.70)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/40">Required Users:</span>
                  <span className="text-status-success font-bold font-mono text-lg">{breakEvenAnalysis.withAds.requiredUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Required Pro Users:</span>
                  <span className="text-status-success font-mono">{breakEvenAnalysis.withAds.requiredProUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Conversion Rate:</span>
                  <span className="text-status-success font-mono">{breakEvenAnalysis.withAds.conversionRate}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* REVENUE ALLOCATION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <PiggyBank className="w-6 h-6 mr-2 text-system-cyan" />
            Revenue Allocation @ 1,000 Users
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(revenueAllocation.at1000Users).map(([key, data]) => (
                <div key={key} className="bg-void-panel/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-system-cyan font-bold">{data.percentage}%</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-white mb-1">
                    ${data.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/30">{data.destination}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-lg">Total Monthly Revenue:</span>
                <span className="text-2xl font-mono font-bold text-system-cyan">
                  ${Object.values(revenueAllocation.at1000Users).reduce((a, b) => a + b.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* COST ALLOCATION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-status-error" />
            Cost Allocation @ 1,000 Users
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
          >
            <div className="space-y-6">
              {Object.entries(costAllocation.at1000Users).map(([key, data]) => (
                <div key={key} className="bg-void-panel/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 capitalize text-lg">{key}</span>
                    <span className="text-status-error font-bold">{data.percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-mono font-bold text-white">
                      ${data.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-white/40">{data.breakdown}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-lg">Total Monthly Cost:</span>
                <span className="text-2xl font-mono font-bold text-status-error">
                  ${Object.values(costAllocation.at1000Users).reduce((a, b) => a + b.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* CAC & LTV */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Users className="w-6 h-6 mr-2 text-system-cyan" />
            Customer Acquisition & Lifetime Value
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CAC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white/60 mb-4">Customer Acquisition Cost (CAC)</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/40">Marketing Spend:</span>
                  <span className="font-mono text-white/60">${cacLtv.cac.marketingSpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">New Users Acquired:</span>
                  <span className="font-mono text-white/60">{cacLtv.cac.newUsersAcquired.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-system-cyan/10 border border-system-cyan/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-system-cyan mb-1">Formula:</p>
                <code className="text-xs text-system-cyan font-mono">
                  CAC = Marketing Spend / New Users
                </code>
                <p className="text-xs text-system-cyan font-mono mt-1">
                  CAC = ${cacLtv.cac.marketingSpend.toLocaleString()} / {cacLtv.cac.newUsersAcquired.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-white/40">CAC per User:</span>
                <span className="text-system-cyan font-bold font-mono text-2xl">${cacLtv.cac.cacPerUser.toFixed(2)}</span>
              </div>
            </motion.div>

            {/* LTV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white/60 mb-4">Lifetime Value (LTV)</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/40">Avg Revenue/User:</span>
                  <span className="font-mono text-white/60">${cacLtv.ltv.averageRevenuePerUser.toFixed(2)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Gross Margin:</span>
                  <span className="font-mono text-white/60">{(cacLtv.ltv.grossMargin * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Monthly Churn:</span>
                  <span className="font-mono text-white/60">{(cacLtv.ltv.monthlyChurnRate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Average Lifetime:</span>
                  <span className="font-mono text-white/60">{cacLtv.ltv.ltvMonths} months</span>
                </div>
              </div>

              <div className="bg-status-success/10 border border-status-success/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-status-success mb-1">Formula:</p>
                <code className="text-xs text-status-success font-mono">
                  LTV = (ARPU Ã— Gross Margin) / Churn Rate
                </code>
                <p className="text-xs text-status-success font-mono mt-1">
                  LTV = (${cacLtv.ltv.averageRevenuePerUser.toFixed(2)} Ã— {(cacLtv.ltv.grossMargin * 100).toFixed(0)}%) / {(cacLtv.ltv.monthlyChurnRate * 100).toFixed(0)}%
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-white/40">LTV per User:</span>
                <span className="text-status-success font-bold font-mono text-2xl">${cacLtv.ltv.ltvDollars.toFixed(2)}</span>
              </div>
            </motion.div>
          </div>

          {/* LTV:CAC Ratio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 bg-gradient-to-r from-status-success/10 to-system-cyan/10 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">LTV:CAC Ratio</h3>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-white/40">LTV</p>
                    <p className="text-2xl font-mono font-bold text-status-success">${cacLtv.ltv.ltvDollars.toFixed(2)}</p>
                  </div>
                  <span className="text-3xl text-white/30">Ã·</span>
                  <div>
                    <p className="text-sm text-white/40">CAC</p>
                    <p className="text-2xl font-mono font-bold text-white/60">${cacLtv.cac.cacPerUser.toFixed(2)}</p>
                  </div>
                  <span className="text-3xl text-white/30">=</span>
                  <div>
                    <p className="text-sm text-white/40">Ratio</p>
                    <p className="text-4xl font-mono font-bold text-system-cyan">{cacLtv.ratio}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/40 mb-1">Payback Period</p>
                <p className="text-3xl font-mono font-bold text-white">{cacLtv.paybackPeriod}</p>
                <p className="text-xs text-white/30">Time to recover CAC</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* KEY INSIGHTS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-system-cyan" />
            Key Financial Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-gradient-to-br from-status-success/10 to-emerald-500/10 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-status-success" />
                <span className="text-status-success font-semibold">Profitable from Day 1</span>
              </div>
              <p className="text-sm text-white/60">
                With ads, break-even at just <strong className="text-white">45 users</strong> (9 Pro). No ads requires 200 users (40 Pro).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="bg-gradient-to-br from-system-cyan/10 to-system-blue/10 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-system-cyan" />
                <span className="text-system-cyan font-semibold">81% Margins at Scale</span>
              </div>
              <p className="text-sm text-white/60">
                At 10,000 users: $48,380 revenue, $9,150 cost = 81% margin. Ad revenue drives profitability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-gradient-to-br from-white/5 to-white/5 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-white/60" />
                <span className="text-white/60 font-semibold">Pro Users = 410% ROI</span>
              </div>
              <p className="text-sm text-white/60">
                Pro users cost $1.96/month but generate $9.99 = $8.03 profit per user per month.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-gradient-to-br from-status-warning/10 to-orange-500/10 rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-status-warning" />
                <span className="text-status-warning font-semibold">Ad Dependency</span>
              </div>
              <p className="text-sm text-white/60">
                Ads provide 59% of revenue. If ad revenue drops 50%, margins fall from 81% to 62%.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTIONS */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-system-cyan" />
            Projections
          </h2>

          {/* Time Period Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {Object.keys(projections).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedProjectionTime(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all text-sm ${
                  selectedProjectionTime === key
                    ? "bg-system-cyan text-void-deep"
                    : "bg-void-panel/50 text-white/60 hover:bg-white/5 border border-white/10"
                }`}
              >
                {key === "3months" ? "3 Months" : key === "6months" ? "6 Months" : "1 Year"}
              </button>
            ))}
          </div>

          {/* Projection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-void-panel/50 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-1">Duration</p>
                <p className="text-3xl font-bold text-white">{currentProjection.months}</p>
                <p className="text-sm text-white/60">Months</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-status-error/10 to-red-500/10 rounded-2xl p-6 border border-status-error/20"
            >
              <div className="text-center mb-4">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-1">Total Cost</p>
                <p className="text-3xl font-bold text-status-error">${currentProjection.cost.toLocaleString()}</p>
                <p className="text-sm text-white/60">${(currentProjection.cost / currentProjection.months).toFixed(2)}/month</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-status-success/10 to-green-500/10 rounded-2xl p-6 border border-status-success/20"
            >
              <div className="text-center mb-4">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-status-success">${currentProjection.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-white/60">${(currentProjection.totalRevenue / currentProjection.months).toFixed(2)}/month</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-system-cyan/10 to-blue-500/10 rounded-2xl p-6 border border-system-cyan/30"
            >
              <div className="text-center mb-4">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-1">Net Profit</p>
                <p className="text-3xl font-bold text-system-cyan">${currentProjection.profit.toLocaleString()}</p>
                <p className="text-sm text-white/60">{currentProjection.margin} margin</p>
              </div>
            </motion.div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mt-8 bg-void-panel/50 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-system-cyan" />
              Detailed Breakdown ({currentProjection.months} Months)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cost Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Cost Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Infrastructure</span>
                    <span className="text-white/60 font-mono">${(currentProjection.cost * 0.74).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">AI API</span>
                    <span className="text-white/60 font-mono">${(currentProjection.cost * 0.09).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Storage & Streaming</span>
                    <span className="text-white/60 font-mono">${(currentProjection.cost * 0.18).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-3">
                    <span className="text-white font-semibold">Total Cost</span>
                    <span className="text-status-error font-bold font-mono">${currentProjection.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-white/10">Revenue Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subscription (200 Pro @ $9.99)</span>
                    <span className="text-system-cyan font-mono">${currentProjection.subscriptionRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Ad Revenue (800 Free @ $3.55/mo)</span>
                    <span className="text-status-success font-mono">${currentProjection.adRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-3">
                    <span className="text-white font-semibold">Total Revenue</span>
                    <span className="text-status-success font-bold font-mono">${currentProjection.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Profit Summary */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-void-panel/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-white/40 uppercase mb-1">Net Profit</p>
                  <p className="text-2xl font-bold text-system-cyan">${currentProjection.profit.toLocaleString()}</p>
                  <p className="text-xs text-white/40">over {currentProjection.months} months</p>
                </div>
                <div className="bg-void-panel/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-white/40 uppercase mb-1">Average Monthly Profit</p>
                  <p className="text-2xl font-bold text-white">${(currentProjection.profit / currentProjection.months).toFixed(2)}</p>
                  <p className="text-xs text-white/40">per user/month</p>
                </div>
                <div className="bg-void-panel/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-white/40 uppercase mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-status-success">{currentProjection.margin}</p>
                  <p className="text-xs text-white/40">consistent</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-8 text-center text-white/40 text-sm pb-20">
          <p>Financial projections based on current infrastructure costs and market rates. Actual results may vary.</p>
          <p className="mt-2">Last updated: February 7, 2026</p>
        </footer>
      </div>
    </div>
  );
}

