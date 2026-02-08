"use client";

import { TrendingUp, Target, Shield, CheckCircle, AlertTriangle, BarChart3, DollarSign, ArrowRight, Users, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CostPlanningPage() {
  const executiveMetrics = [
    { metric: "Break-Even", value: "45 users", detail: "With advertising (77% reduction)" },
    { metric: "LTV:CAC Ratio", value: "15.7:1", detail: "Industry benchmark: 3:1" },
    { metric: "Gross Margin", value: "80%+", detail: "At all scales" },
    { metric: "Payback Period", value: "1.2 months", detail: "CAC recovery time" }
  ];

  const marketData = [
    {
      title: "Anime/Pop Culture",
      size: "1.8B viewers",
      source: "Dentsu Report (July 2025)",
      details: "31% of global consumers, Netflix: 50%+ subscribers watch anime (150M households), US: 63% of Netflix audience"
    },
    {
      title: "Fitness App Market",
      size: "$30B TAM",
      source: "Industry Reports",
      details: "Growing at 15% CAGR, post-COVID surge in home fitness"
    },
    {
      title: "Creator Economy",
      size: "$100B TAM",
      source: "Market Research",
      details: "Expanding rapidly with creator-friendly platforms"
    }
  ];

  const competitors = [
    { name: "Arise", pricing: "$20/mo", downloads: "100K+", issues: "Limited access, no community", advantage: "Freemium ($0-$19.99), full community" },
    { name: "Traditional Apps", pricing: "$10-15/mo", downloads: "Millions", issues: "No gamification", advantage: "RPG mechanics, progression" },
    { name: "Fitness Trackers", pricing: "$5-10/mo", downloads: "High", issues: "No social", advantage: "Social media for personal growth" }
  ];

  const unitEconomics = [
    { tier: "Free", cost: "$1.02", revenue: "$3.55", profit: "$2.53", roi: "248%" },
    { tier: "Pro", cost: "$1.96", revenue: "$9.99", profit: "$8.03", roi: "410%", highlighted: true },
    { tier: "Max", cost: "$2.15", revenue: "$19.99", profit: "$17.84", roi: "830%" }
  ];

  const scaleProjections = [
    { users: "1,000", revenue: "$4,838", cost: "$1,235", profit: "$3,603", margin: "74%", arr: "$58K" },
    { users: "5,000", revenue: "$24,190", cost: "$4,585", profit: "$19,605", margin: "81%", arr: "$290K" },
    { users: "10,000", revenue: "$48,380", cost: "$9,150", profit: "$39,230", margin: "81%", arr: "$580K" }
  ];

  const breakEvenScenarios = [
    { scenario: "Without ads", requiredUsers: 200, requiredProUsers: 40, timeToBreakEven: "3-4 months" },
    { scenario: "With ads", requiredUsers: 45, requiredProUsers: 9, timeToBreakEven: "Immediate", highlighted: true },
    { scenario: "Reduction", requiredUsers: "77%", requiredProUsers: "77%", timeToBreakEven: "~90%", highlighted: true }
  ];

  const ltvCac = {
    cac: "$5.00",
    ltv: "$78.41",
    ratio: "15.7:1",
    payback: "1.2 months",
    benchmark: "3:1 (industry)"
  };

  const risks = [
    { type: "Market Risk", level: "Medium", impact: "30-40%", mitigation: "Diversify into mainstream fitness" },
    { type: "Competition", level: "Medium", impact: "20-30%", mitigation: "Unique gamified approach, community-first" },
    { type: "Technology", level: "Low", impact: "10-20%", mitigation: "Proven tech stack, incremental scaling" },
    { type: "Cost Overrun", level: "Medium", impact: "20-25%", mitigation: "Built-in margin buffer (80%+ at 10K)" },
    { type: "Churn Risk", level: "Medium", impact: "15-25%", mitigation: "Gamification increases retention" },
    { type: "Monetization", level: "Low", impact: "10-15%", mitigation: "Hybrid model, multiple revenue streams" }
  ];

  const costStructure = {
    fixed: [
      { item: "Infrastructure (servers, DB)", cost: "$50-200/mo" },
      { item: "Development support", cost: "$30-500/mo" },
      { item: "Administrative", cost: "$10-100/mo" }
    ],
    variable: [
      { item: "Infrastructure", cost: "$0.37-0.52/user" },
      { item: "AI API", cost: "$0.05-0.07/user" },
      { item: "Video Storage", cost: "$0.10-0.25/user" },
      { item: "Video Streaming", cost: "$0.52-0.65/user" }
    ]
  };

  const growthPhases = [
    { phase: "Launch", users: 100, revenue: "$427", profitability: "Immediate" },
    { phase: "Scale", users: 1000, revenue: "$4,838", profitability: "Immediate" },
    { phase: "Growth", users: 5000, revenue: "$24,190", profitability: "Immediate" },
    { phase: "Scale-up", users: 10000, revenue: "$48,380", profitability: "Immediate" }
  ];

  const investment = {
    developmentTime: "4 months to production",
    targetUsers: "10K users in 12 months",
    revenue: "$1.35M ARR by Year 2",
    margins: "80%+ maintained",
    keyMessage: "Beyond MVP - not just hackathon farmers"
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/roadmap/monetization-system" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Monetization Strategy
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Cost Planning & Financial Analysis
              </h1>
              <p className="text-sm text-white/60">
                Investor Overview & Financial Projections
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
          {/* Executive Summary */}
          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 border border-system-cyan/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Executive Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {executiveMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 text-center"
                  >
                    <p className="text-xs text-white/60 mb-2">{metric.metric}</p>
                    <p className="text-3xl font-display font-bold text-system-cyan mb-2">{metric.value}</p>
                    <p className="text-xs text-white/50">{metric.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Market Opportunity */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Market Opportunity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketData.map((market, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
                >
                  <div className="text-4xl font-display font-bold text-system-cyan mb-2">{market.size}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{market.title}</h3>
                  <p className="text-xs text-white/40 mb-3">{market.source}</p>
                  <p className="text-sm text-white/60">{market.details}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm text-green-300">
                <strong className="text-white">Key Insight:</strong> This is NOT niche - it's mainstream market with 1.8B anime viewers globally
              </p>
            </div>
          </section>

          {/* Competitive Analysis */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Competitive Analysis
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Competitor</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Pricing</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Downloads</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Key Issues</th>
                      <th className="text-left p-4 text-white/70 font-semibold">ASCEND Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((competitor, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-white font-semibold">{competitor.name}</td>
                        <td className="p-4 text-white">{competitor.pricing}</td>
                        <td className="p-4 text-white">{competitor.downloads}</td>
                        <td className="p-4 text-white/60">{competitor.issues}</td>
                        <td className="p-4 text-system-cyan">{competitor.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 p-4 bg-system-cyan/10 border border-system-cyan/20 rounded-xl">
              <p className="text-sm text-system-cyan">
                <strong>ASCEND Unique Position:</strong> "Protagonist of Their Own Story" - gamified fitness narrative, social media for personal growth, community-driven (guilds, raids)
              </p>
            </div>
          </section>

          {/* Unit Economics Summary */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Unit Economics Summary (Per User/Month)
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Tier</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Cost</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Revenue</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Profit</th>
                      <th className="text-right p-4 text-white/70 font-semibold">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitEconomics.map((econ, index) => (
                      <tr key={index} className={`border-b border-white/5 last:border-0 ${econ.highlighted ? "bg-system-cyan/5" : ""}`}>
                        <td className="p-4 text-white font-semibold">{econ.tier}</td>
                        <td className="p-4 text-right text-status-error">{econ.cost}</td>
                        <td className="p-4 text-right text-status-success">{econ.revenue}</td>
                        <td className="p-4 text-right text-system-cyan font-bold">{econ.profit}</td>
                        <td className="p-4 text-right text-system-cyan font-bold">{econ.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Financial Projections at Scale */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Financial Projections at Scale
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Users</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Monthly Revenue</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Monthly Cost</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Net Profit</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Margin</th>
                      <th className="text-right p-4 text-white/70 font-semibold">ARR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaleProjections.map((proj, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-white font-semibold">{proj.users}</td>
                        <td className="p-4 text-right text-status-success">{proj.revenue}</td>
                        <td className="p-4 text-right text-status-error">{proj.cost}</td>
                        <td className="p-4 text-right text-system-cyan font-bold">{proj.profit}</td>
                        <td className="p-4 text-right text-system-cyan font-bold">{proj.margin}</td>
                        <td className="p-4 text-right text-purple-400 font-bold">{proj.arr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Financial Statements */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Financial Statements @ 10,000 Users
            </h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 text-system-cyan">Balance Sheet (Neraca) - Monthly</h3>
                <div className="text-xs text-white/70 bg-black/30 p-4 rounded-lg overflow-x-auto font-mono whitespace-pre">
ASSETS (Aset)
  Current Assets
    Cash                    $48,380
    Accounts Receivable        $0
    Prepaid Expenses         $2,000
  Non-Current Assets
    Server Equipment          $15,000
    IP & Software           $50,000
    Accumulated Depreciation ($5,000)
  TOTAL ASSETS                      $110,380

LIABILITIES & EQUITY (Liabilitas & Ekuitas)
  Current Liabilities
    Accounts Payable         $9,150
    Accrued Expenses        $1,500
  Equity
    Paid-in Capital        $100,000
    Retained Earnings         ($270)
  TOTAL LIABILITIES & EQUITY        $110,380
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 text-system-cyan">Profit & Loss (Laporan L/R) - Annual</h3>
                <div className="text-xs text-white/70 bg-black/30 p-4 rounded-lg overflow-x-auto font-mono whitespace-pre">
REVENUE (Pendapatan)
  Subscription Revenue            $239,760
  Ad Revenue                     $340,800
  Creator Revenue                 $67,608
  TOTAL REVENUE                        $648,168

EXPENSES (Pengeluaran)
  Cost of Goods Sold (COGS)     $109,800
    - Infrastructure              $76,860
    - AI API Costs               $9,882
    - Video Storage              $19,764
    - Video Streaming            $3,294
  Operating Expenses (OPEX)      $38,760
    - Marketing                 $20,000
    - Support                   $8,000
    - Administration            $10,760
  TOTAL EXPENSES                     $148,560

NET INCOME (Laba Bersih)           $499,608
GROSS MARGIN                       81%
NET MARGIN                          77%
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 text-system-cyan">Cashflow Statement (Laporan Arus Kas) - Annual</h3>
                <div className="text-xs text-white/70 bg-black/30 p-4 rounded-lg overflow-x-auto font-mono whitespace-pre">
OPERATING ACTIVITIES
  Cash from Operations          $499,608
  Changes in Working Capital
    + Accounts Receivable        $0
    - Accounts Payable         ($9,150)
    - Prepaid Expenses        ($2,000)
  NET CASH FROM OPS                 $488,458

INVESTING ACTIVITIES
  Capital Expenditures (CAPEX)  ($30,000)
  Equipment Purchases           ($20,000)
  Software Development         ($10,000)
  NET CASH FROM INVESTING            ($30,000)

FINANCING ACTIVITIES
  Investment Received            $500,000
  Debt Repayments                  $0
  Dividends Paid                   $0
  NET CASH FROM FINANCING           $500,000

NET INCREASE IN CASH                  $958,458
BEGINNING CASH BALANCE               $50,000
ENDING CASH BALANCE               $1,008,458
                </div>
              </motion.div>
            </div>
          </section>

          {/* Break-Even Analysis */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Break-Even Analysis
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Scenario</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Required Users</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Required Pro Users</th>
                      <th className="text-right p-4 text-white/70 font-semibold">Break-Even Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {breakEvenScenarios.map((scenario, index) => (
                      <tr key={index} className={`border-b border-white/5 last:border-0 ${scenario.highlighted ? "bg-green-500/10" : ""}`}>
                        <td className="p-4 text-white font-semibold">{scenario.scenario}</td>
                        <td className="p-4 text-right text-white">{scenario.requiredUsers}</td>
                        <td className="p-4 text-right text-white">{scenario.requiredProUsers}</td>
                        <td className="p-4 text-right text-system-cyan font-bold">{scenario.timeToBreakEven}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                77% reduction in break-even requirement with advertising
              </p>
            </div>
          </section>

          {/* LTV:CAC Analysis */}
          <section>
            <div className="bg-gradient-to-r from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                LTV:CAC Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-2">Customer Acquisition Cost (CAC)</p>
                  <p className="text-4xl font-mono font-bold text-white">{ltvCac.cac}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/60 mb-2">Lifetime Value (LTV)</p>
                  <p className="text-4xl font-mono font-bold text-status-success">{ltvCac.ltv}</p>
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-4 bg-white/5 rounded-2xl p-6">
                  <span className="text-3xl text-white/40">÷</span>
                  <div>
                    <p className="text-sm text-white/40 mb-1">LTV:CAC Ratio</p>
                    <p className="text-5xl font-mono font-bold text-system-cyan">{ltvCac.ratio}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-xs text-white/60 mb-1">Industry Benchmark</p>
                  <p className="text-lg font-bold text-white/60">{ltvCac.benchmark}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-xs text-white/60 mb-1">Payback Period</p>
                  <p className="text-lg font-bold text-system-cyan">{ltvCac.payback}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-xs text-white/60 mb-1">Key Insight</p>
                  <p className="text-sm font-semibold text-green-400">5.2x above benchmark</p>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Analysis */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Risk Analysis
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Risk Type</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Risk Level</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Impact</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((risk, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-white font-semibold">{risk.type}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            risk.level === "Low" ? "bg-green-500/20 text-green-400" : 
                            risk.level === "Medium" ? "bg-yellow-500/20 text-yellow-400" : 
                            "bg-red-500/20 text-red-400"
                          }`}>
                            {risk.level}
                          </span>
                        </td>
                        <td className="p-4 text-white/60">{risk.impact}</td>
                        <td className="p-4 text-white/60">{risk.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Cost Structure */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Cost Structure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-system-cyan" />
                  Fixed Costs (monthly)
                </h3>
                <div className="space-y-3">
                  {costStructure.fixed.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/70">{item.item}</span>
                      <span className="text-status-error font-semibold">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-void-deep/50 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-system-cyan" />
                  Variable Costs (per user)
                </h3>
                <div className="space-y-3">
                  {costStructure.variable.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/70">{item.item}</span>
                      <span className="text-status-error font-semibold">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Growth Roadmap */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Growth Roadmap
            </h2>
            <div className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70 font-semibold">Phase</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Users</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Monthly Revenue</th>
                      <th className="text-left p-4 text-white/70 font-semibold">Time to Profitability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthPhases.map((phase, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="p-4 text-white font-semibold">{phase.phase}</td>
                        <td className="p-4 text-white">{phase.users}</td>
                        <td className="p-4 text-status-success">{phase.revenue}</td>
                        <td className="p-4 text-green-400 font-bold">{phase.profitability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-sm text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Profitable from launch - all phases achieve immediate profitability
              </p>
            </div>
          </section>

          {/* Investment Requirements */}
          <section>
            <div className="bg-gradient-to-r from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">
                Investment Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <Calendar className="w-8 h-8 text-system-cyan mx-auto mb-2" />
                  <p className="text-xs text-white/60 mb-1">Development</p>
                  <p className="text-sm font-bold text-white">{investment.developmentTime}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-white/60 mb-1">Target</p>
                  <p className="text-sm font-bold text-white">{investment.targetUsers}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-xs text-white/60 mb-1">Revenue</p>
                  <p className="text-sm font-bold text-white">{investment.revenue}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <DollarSign className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-xs text-white/60 mb-1">Margins</p>
                  <p className="text-sm font-bold text-white">{investment.margins}</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <p className="text-xl font-bold text-system-cyan mb-2">
                  "{investment.keyMessage}"
                </p>
                <p className="text-sm text-white/70">
                  Not just another hackathon project - a full-featured platform with sustainable economics and community-driven growth
                </p>
              </div>
              <Link
                href="/roadmap/monetization-system"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white rounded-lg font-bold transition-all"
              >
                View Monetization Strategy
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <section className="text-center py-8">
            <p className="text-white/60 text-sm">
              Request follow-up meeting for detailed financial model and investment opportunities
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
