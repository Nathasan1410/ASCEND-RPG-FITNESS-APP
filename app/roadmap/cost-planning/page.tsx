"use client";

import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Users, Server, Database, Wifi, Cpu, CreditCard, PiggyBank, AlertTriangle, CheckCircle, ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CostPlanningPage() {
  const [selectedScenario, setSelectedScenario] = useState<string>("1000");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                  ASCEND
                </span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Cost Planning</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/feed" className="text-gray-300 hover:text-white transition-colors">
                Hunter Network
              </Link>
              <Link href="/roadmap" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Roadmap
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">ASCEND Financial Planning</h1>
          <p className="text-xl text-gray-400">
            Detailed unit economics, cost breakdowns, and revenue projections
          </p>
        </div>

        {/* UNIT ECONOMICS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-cyan-400" />
            Unit Economics (Per User/Month)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free User */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-gray-300 mb-4">Free User</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monthly Cost:</span>
                  <span className="text-red-400 font-mono">${unitEconomics.freeUser.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monthly Revenue:</span>
                  <span className="text-green-400 font-mono">${unitEconomics.freeUser.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Net Profit:</span>
                  <span className="text-cyan-400 font-bold font-mono">${unitEconomics.freeUser.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ROI:</span>
                  <span className="text-cyan-400 font-bold">{unitEconomics.freeUser.roi}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs text-gray-500 uppercase font-semibold">Cost Breakdown</p>
                {Object.entries(unitEconomics.freeUser.costBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-semibold">Revenue Sources</p>
                {Object.entries(unitEconomics.freeUser.revenueBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono text-green-400">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro User */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-cyan-500/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">Pro User</h3>
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">Most Profitable</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monthly Cost:</span>
                  <span className="text-red-400 font-mono">${unitEconomics.proUser.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subscription:</span>
                  <span className="text-green-400 font-mono">${unitEconomics.proUser.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Net Profit:</span>
                  <span className="text-cyan-400 font-bold font-mono">${unitEconomics.proUser.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ROI:</span>
                  <span className="text-cyan-400 font-bold">{unitEconomics.proUser.roi}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-semibold">Cost Breakdown</p>
                {Object.entries(unitEconomics.proUser.costBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Max User */}
            <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-purple-400">Max User</h3>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">Highest ROI</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monthly Cost:</span>
                  <span className="text-red-400 font-mono">${unitEconomics.maxUser.monthlyCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subscription:</span>
                  <span className="text-green-400 font-mono">${unitEconomics.maxUser.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Net Profit:</span>
                  <span className="text-purple-400 font-bold font-mono">${unitEconomics.maxUser.profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ROI:</span>
                  <span className="text-purple-400 font-bold">{unitEconomics.maxUser.roi}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-semibold">Cost Breakdown</p>
                {Object.entries(unitEconomics.maxUser.costBreakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-mono">${value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SCALING SCENARIOS */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
              Scaling Scenarios
            </h2>
            <div className="flex space-x-2">
              {Object.keys(scenarios).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedScenario === key
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {key} Users
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Financial Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6">
                Financial Summary: {currentScenario.users.toLocaleString()} Users
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Free Users</p>
                    <p className="text-2xl font-bold text-gray-300">{currentScenario.freeUsers}</p>
                    <p className="text-xs text-gray-500">80%</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Pro Users</p>
                    <p className="text-2xl font-bold text-cyan-400">{currentScenario.proUsers}</p>
                    <p className="text-xs text-gray-500">20%</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Cost:</span>
                    <span className="text-red-400 font-mono font-bold">${currentScenario.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subscription Revenue:</span>
                    <span className="text-cyan-400 font-mono">${currentScenario.subscriptionRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Ad Revenue:</span>
                    <span className="text-green-400 font-mono">${currentScenario.adRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                    <span className="text-gray-400">Total Revenue:</span>
                    <span className="text-white font-mono font-bold">${currentScenario.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Net Profit:</span>
                    <span className="text-green-400 font-mono font-bold text-lg">${currentScenario.netProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Profit Margin:</span>
                    <span className="text-cyan-400 font-bold">{currentScenario.margin}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure Costs */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-400" />
                Infrastructure Breakdown
              </h3>

              <div className="space-y-4">
                {Object.entries(currentScenario.infrastructure).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {key === 'backend' && <Cpu className="w-5 h-5 text-cyan-400" />}
                      {key === 'transcoding' && <Wifi className="w-5 h-5 text-yellow-400" />}
                      {key === 'database' && <Database className="w-5 h-5 text-green-400" />}
                      {key === 'redis' && <Server className="w-5 h-5 text-orange-400" />}
                      {key === 'cdn' && <Wifi className="w-5 h-5 text-purple-400" />}
                      <span className="text-gray-300 capitalize">{key}:</span>
                    </div>
                    <span className="font-mono">${value}/month</span>
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Infrastructure:</span>
                    <span className="font-mono font-bold">
                      ${Object.values(currentScenario.infrastructure).reduce((a, b) => a + b, 0)}/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BREAK-EVEN ANALYSIS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-yellow-400" />
            Break-Even Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Without Ads */}
            <div className="bg-gray-800 rounded-xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-4">Without Advertising</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fixed Costs:</span>
                  <span className="font-mono">${breakEvenAnalysis.withoutAds.fixedCosts}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Variable Cost/User:</span>
                  <span className="font-mono">${breakEvenAnalysis.withoutAds.variableCostPerUser}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Revenue/Pro User:</span>
                  <span className="font-mono">${breakEvenAnalysis.withoutAds.revenuePerProUser}</span>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-300 mb-2">Break-Even Formula:</p>
                <code className="text-xs text-red-200 font-mono">
                  Users = Fixed / (Revenue - Variable)
                </code>
                <p className="text-xs text-red-200 font-mono mt-1">
                  Users = {breakEvenAnalysis.withoutAds.fixedCosts} / ({breakEvenAnalysis.withoutAds.revenuePerProUser} - {breakEvenAnalysis.withoutAds.variableCostPerUser})
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Required Users:</span>
                  <span className="text-red-400 font-bold font-mono text-lg">{breakEvenAnalysis.withoutAds.requiredUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Required Pro Users:</span>
                  <span className="text-red-400 font-mono">{breakEvenAnalysis.withoutAds.requiredProUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conversion Rate Needed:</span>
                  <span className="text-red-400 font-mono">{breakEvenAnalysis.withoutAds.conversionRate}</span>
                </div>
              </div>
            </div>

            {/* With Ads */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-green-500/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-400">With Advertising</h3>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                  -{breakEvenAnalysis.withAds.reduction} break-even
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fixed Costs:</span>
                  <span className="font-mono">${breakEvenAnalysis.withAds.fixedCosts}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Variable Cost/User:</span>
                  <span className="font-mono">${breakEvenAnalysis.withAds.variableCostPerUser}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Revenue/Free User:</span>
                  <span className="font-mono text-green-400">${breakEvenAnalysis.withAds.revenuePerFreeUser}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Revenue/Pro User:</span>
                  <span className="font-mono text-cyan-400">${breakEvenAnalysis.withAds.revenuePerProUser}</span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-300 mb-2">Break-Even Formula:</p>
                <code className="text-xs text-green-200 font-mono">
                  Total Revenue = Total Cost
                </code>
                <p className="text-xs text-green-200 font-mono mt-1">
                  (Free×$3.55) + (Pro×$9.99) = $90 + (Users×$0.70)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Required Users:</span>
                  <span className="text-green-400 font-bold font-mono text-lg">{breakEvenAnalysis.withAds.requiredUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Required Pro Users:</span>
                  <span className="text-green-400 font-mono">{breakEvenAnalysis.withAds.requiredProUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conversion Rate:</span>
                  <span className="text-green-400 font-mono">{breakEvenAnalysis.withAds.conversionRate}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVENUE ALLOCATION */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <PiggyBank className="w-6 h-6 mr-2 text-pink-400" />
            Revenue Allocation @ 1,000 Users
          </h2>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(revenueAllocation.at1000Users).map(([key, data]) => (
                <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-cyan-400 font-bold">{data.percentage}%</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-white mb-1">
                    ${data.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{data.destination}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-lg">Total Monthly Revenue:</span>
                <span className="text-2xl font-mono font-bold text-cyan-400">
                  ${Object.values(revenueAllocation.at1000Users).reduce((a, b) => a + b.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COST ALLOCATION */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-red-400" />
            Cost Allocation @ 1,000 Users
          </h2>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="space-y-6">
              {Object.entries(costAllocation.at1000Users).map(([key, data]) => (
                <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 capitalize text-lg">{key}</span>
                    <span className="text-red-400 font-bold">{data.percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-mono font-bold text-white">
                      ${data.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">{data.breakdown}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-lg">Total Monthly Cost:</span>
                <span className="text-2xl font-mono font-bold text-red-400">
                  ${Object.values(costAllocation.at1000Users).reduce((a, b) => a + b.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CAC & LTV */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-400" />
            Customer Acquisition & Lifetime Value
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CAC */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Customer Acquisition Cost (CAC)</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Marketing Spend:</span>
                  <span className="font-mono">${cacLtv.cac.marketingSpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">New Users Acquired:</span>
                  <span className="font-mono">{cacLtv.cac.newUsersAcquired.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-300 mb-1">Formula:</p>
                <code className="text-xs text-blue-200 font-mono">
                  CAC = Marketing Spend / New Users
                </code>
                <p className="text-xs text-blue-200 font-mono mt-1">
                  CAC = ${cacLtv.cac.marketingSpend.toLocaleString()} / {cacLtv.cac.newUsersAcquired.toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                <span className="text-gray-400">CAC per User:</span>
                <span className="text-blue-400 font-bold font-mono text-2xl">${cacLtv.cac.cacPerUser.toFixed(2)}</span>
              </div>
            </div>

            {/* LTV */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">Lifetime Value (LTV)</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Revenue/User:</span>
                  <span className="font-mono">${cacLtv.ltv.averageRevenuePerUser.toFixed(2)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gross Margin:</span>
                  <span className="font-mono">{(cacLtv.ltv.grossMargin * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Churn:</span>
                  <span className="font-mono">{(cacLtv.ltv.monthlyChurnRate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Lifetime:</span>
                  <span className="font-mono">{cacLtv.ltv.ltvMonths} months</span>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-300 mb-1">Formula:</p>
                <code className="text-xs text-green-200 font-mono">
                  LTV = (ARPU × Gross Margin) / Churn Rate
                </code>
                <p className="text-xs text-green-200 font-mono mt-1">
                  LTV = (${cacLtv.ltv.averageRevenuePerUser.toFixed(2)} × {(cacLtv.ltv.grossMargin * 100).toFixed(0)}%) / {(cacLtv.ltv.monthlyChurnRate * 100).toFixed(0)}%
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                <span className="text-gray-400">LTV per User:</span>
                <span className="text-green-400 font-bold font-mono text-2xl">${cacLtv.ltv.ltvDollars.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* LTV:CAC Ratio */}
          <div className="mt-8 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">LTV:CAC Ratio</h3>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-gray-400">LTV</p>
                    <p className="text-2xl font-mono font-bold text-green-400">${cacLtv.ltv.ltvDollars.toFixed(2)}</p>
                  </div>
                  <span className="text-3xl text-gray-500">÷</span>
                  <div>
                    <p className="text-sm text-gray-400">CAC</p>
                    <p className="text-2xl font-mono font-bold text-blue-400">${cacLtv.cac.cacPerUser.toFixed(2)}</p>
                  </div>
                  <span className="text-3xl text-gray-500">=</span>
                  <div>
                    <p className="text-sm text-gray-400">Ratio</p>
                    <p className="text-4xl font-mono font-bold text-cyan-400">{cacLtv.ratio}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Payback Period</p>
                <p className="text-3xl font-mono font-bold text-purple-400">{cacLtv.paybackPeriod}</p>
                <p className="text-xs text-gray-500">Time to recover CAC</p>
              </div>
            </div>
          </div>
        </section>

        {/* KEY INSIGHTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-purple-400" />
            Key Financial Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Profitable from Day 1</span>
              </div>
              <p className="text-sm text-gray-300">
                With ads, break-even at just <strong>45 users</strong> (9 Pro). No ads requires 200 users (40 Pro).
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">81% Margins at Scale</span>
              </div>
              <p className="text-sm text-gray-300">
                At 10,000 users: $48,380 revenue, $9,150 cost = 81% margin. Ad revenue drives profitability.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">Pro Users = 410% ROI</span>
              </div>
              <p className="text-sm text-gray-300">
                Pro users cost $1.96/month but generate $9.99 = $8.03 profit per user per month.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Ad Dependency</span>
              </div>
              <p className="text-sm text-gray-300">
                Ads provide 59% of revenue. If ad revenue drops 50%, margins fall from 81% to 62%.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>Financial projections based on current infrastructure costs and market rates. Actual results may vary.</p>
          <p className="mt-2">Last updated: February 7, 2026</p>
        </footer>
      </div>
    </div>
  );
}