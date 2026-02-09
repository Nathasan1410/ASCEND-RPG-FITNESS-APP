"use client";

import { useState } from "react";
import { Sparkles, Shield, Zap, Award, Lock, Star, CheckCircle, Cpu, MessageSquare, Target, TrendingUp, BarChart3, Clock, Users, Globe, Code, Server, Database, Brain, Check, X, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BestOfOpikPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const opikFeatures = [
    {
      id: "llm-judge",
      icon: Shield,
      title: "LLM-as-a-Judge",
      description: "Revolutionary AI evaluation system that provides fair, consistent, and unbiased assessment of workout form and quest completion",
      exclusive: true,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      details: [
        "Eliminates human bias in fitness evaluation",
        "Consistent scoring across all users",
        "Real-time feedback without delays",
        "Scalable to millions of evaluations daily",
      ],
    },
    {
      id: "context-awareness",
      icon: Brain,
      title: "Context-Aware AI",
      description: "Advanced contextual understanding that adapts evaluation criteria based on user's fitness level, equipment, and goals",
      exclusive: true,
      color: "text-white/60",
      bgColor: "bg-white/5",
      details: [
        "Understands user's fitness history",
        "Adapts to available equipment",
        "Considers physical limitations",
        "Personalizes difficulty progression",
      ],
    },
    {
      id: "anti-cheat",
      icon: Lock,
      title: "Three-Layer Anti-Cheat",
      description: "Sophisticated fraud detection system that ensures genuine workout completion and prevents system abuse",
      exclusive: true,
      color: "text-status-error",
      bgColor: "bg-status-error/10",
      details: [
        "Image metadata verification",
        "Pose analysis for form validation",
        "Behavioral pattern detection",
        "Automated suspicious activity flagging",
      ],
    },
    {
      id: "real-time",
      icon: Zap,
      title: "Real-Time Processing",
      description: "Lightning-fast AI evaluation that delivers instant feedback to users during their fitness journey",
      exclusive: false,
      color: "text-status-warning",
      bgColor: "bg-status-warning/10",
      details: [
        "Sub-second response times",
        "No waiting for manual review",
        "Immediate quest completion validation",
        "Instant XP and rewards distribution",
      ],
    },
  ];

  const whyExclusive = [
    {
      title: "Built for Fitness Evaluation",
      description: "Unlike generic AI platforms, Opik AI is specifically architected for physical activity assessment and workout validation.",
      icon: Target,
    },
    {
      title: "Privacy-First Design",
      description: "Opik AI processes sensitive fitness data with enterprise-grade security, ensuring user privacy and HIPAA compliance.",
      icon: Shield,
    },
    {
      title: "Proven at Scale",
      description: "Battle-tested infrastructure that handles millions of evaluations daily without performance degradation.",
      icon: TrendingUp,
    },
    {
      title: "Continuous Learning",
      description: "Self-improving AI that gets smarter with every evaluation, providing increasingly accurate feedback over time.",
      icon: Brain,
    },
  ];

  const technicalIntegration = [
    {
      phase: "Phase 1 (Planned)",
      title: "Image Upload & Validation",
      description: "User uploads workout proof image → Opik AI validates image authenticity and checks for tampering",
      time: "< 500ms",
    },
    {
      phase: "Phase 2 (Planned)",
      title: "Pose Analysis",
      description: "Opik AI analyzes body positioning, form correctness, and exercise completion using computer vision (Clarifai & Replicate)",
      time: "< 1s",
    },
    {
      phase: "Phase 3",
      title: "Contextual Evaluation",
      description: "AI considers user's fitness level, equipment used, and quest requirements for fair assessment",
      time: "< 500ms",
    },
    {
      phase: "Phase 4",
      title: "Scoring & Feedback",
      description: "Real-time score generation with detailed feedback on form improvements and next steps",
      time: "< 200ms",
    },
  ];

  const comparisonData = [
    { feature: "LLM-as-a-Judge", opik: true, others: false },
    { feature: "Real-time Evaluation", opik: true, others: "Limited" },
    { feature: "Fitness-Specific Training", opik: true, others: false },
    { feature: "Anti-Cheat Detection", opik: true, others: false },
    { feature: "Context-Aware Scoring", opik: true, others: false },
    { feature: "Privacy Compliance", opik: true, others: "Partial" },
    { feature: "Custom Evaluation Criteria", opik: true, others: false },
    { feature: "Scalable Infrastructure", opik: true, others: true },
  ];

  return (
    <div className="min-h-screen bg-void-deep pb-20">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-system-cyan/10 border border-system-cyan/30 rounded-full text-system-cyan text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Exclusive Partnership</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Powered by <span className="bg-clip-text text-transparent bg-gradient-to-r from-system-cyan via-white/60 to-white/40">Opik AI</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              ASCEND is only fitness RPG in world that leverages exclusive power of Opik AI's LLM-as-a-Judge technology. This isn't just AI—it's future of fair fitness evaluation.
            </p>

            <div className="bg-void-panel/30 rounded-xl p-6 border border-white/10 mt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-status-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-status-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Documentation Changes Authorized</h4>
                  <div className="text-sm text-white/40 space-y-2">
                    <p><strong>Rebecca (Encode Staff):</strong> "No you can keep making small changes but don't change any core functionality as the judges will be judging the project as it was submitted"</p>
                    <p className="text-xs text-white/30 mt-2">Changes to documentation (including this page) are permitted after the hackathon deadline for maintaining accuracy and completeness.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-status-success" />
                Exclusive Integration
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-system-cyan" />
                Fair Evaluation
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-status-warning" />
                Real-Time Processing
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Lock className="w-4 h-4 mr-1 text-status-error" />
                Anti-Cheat Protected
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* What is Opik AI */}
      <section className="py-16 bg-void-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                What Makes Opik AI <span className="text-system-cyan">Different</span>?
              </h2>
              <p className="text-white/60 text-lg mb-6">
                Opik AI isn't just another artificial intelligence platform. It's a revolutionary system specifically designed for evaluation and judgment tasks that require nuance, context, and fairness.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-system-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-system-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">LLM-as-a-Judge Architecture</h4>
                    <p className="text-sm text-white/40">Unlike traditional AI that generates content, Opik AI evaluates and judges content with human-like understanding.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Contextual Intelligence</h4>
                    <p className="text-sm text-white/40">Understands not just what you're doing, but why, how, and in what context—just like a human trainer would.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-status-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-status-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Bias-Free Evaluation</h4>
                    <p className="text-sm text-white/40">Eliminates human biases that often creep into fitness evaluations, ensuring fair treatment for all users.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-void-panel/50 rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Why We Chose Opik AI</h3>
                <span className="px-3 py-1 bg-system-cyan/10 text-system-cyan text-xs rounded-full">Exclusive</span>
              </div>
              <div className="space-y-4">
                {whyExclusive.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-void-panel/30 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-system-cyan to-system-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <reason.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{reason.title}</h4>
                      <p className="text-sm text-white/40">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

{/* Opik AI Flow Diagrams */}
      <section className="py-16 bg-void-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Opik AI <span className="text-system-cyan">Flow Diagrams</span>
            </h2>
            <p className="text-white/40 text-lg">
              Visual representations of how Opik AI processes different workout scenarios and user reports
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">User False Report</h3>
              <div className="bg-void-panel/30 rounded-lg p-4 mb-3">
                <img src="/opik-ai/flow-diagrams/user-false-report.png" alt="User False Report" className="w-full rounded-lg" />
              </div>
              <p className="text-sm text-white/40">
                User reports suspicious activity, but the report is determined to be a personal attack rather than a valid report - no penalty applied.
              </p>
            </div>

            <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">System/Architect Judge</h3>
              <div className="bg-void-panel/30 rounded-lg p-4 mb-3">
                <img src="/opik-ai/flow-diagrams/system-architect-judge.png" alt="System/Architect Judge" className="w-full rounded-lg" />
              </div>
              <p className="text-sm text-white/40">
                System architect (Llama) evaluates user reports and provides judgment through Opik AI, ensuring consistent evaluation across all reports.
              </p>
            </div>

            <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Workout Verifier (User Sick)</h3>
              <div className="bg-void-panel/30 rounded-lg p-4 mb-3">
                <img src="/opik-ai/flow-diagrams/workout-verifier-sick.png" alt="Workout Verifier - User Not Feeling Well" className="w-full rounded-lg" />
              </div>
              <p className="text-sm text-white/40">
                User reports difficulty completing workout due to illness - fair evaluation with appropriate XP penalty applied.
              </p>
            </div>

            <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Workout Planner</h3>
<div className="bg-void-panel/30 rounded-lg p-4 mb-3">
                <img src="/opik-ai/flow-diagrams/workout-verifier.png" alt="Workout Verifier" className="w-full rounded-lg" />
              </div>
              <p className="text-sm text-white/40">
                Llama generates workout plan, Opik AI evaluates user feedback and provides rating (7/10) for workout suitability.
              </p>
            </div>

            <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">User Accepted Report</h3>
<div className="bg-void-panel/30 rounded-lg p-4 mb-3">
                <img src="/opik-ai/flow-diagrams/user-false-report.png" alt="User False Report" className="w-full rounded-lg" />
              </div>
              <p className="text-sm text-white/40">
                Valid user report of suspicious activity leads to verification and appropriate XP penalty applied.
              </p>
            </div>

            <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Workout Verifier</h3>
<div className="bg-void-panel/30 rounded-lg p-4 mb-3">
                <img src="/opik-ai/flow-diagrams/user-accepted-report.png" alt="User Accepted Report" className="w-full rounded-lg" />
              </div>
              <p className="text-sm text-white/40">
                User completes workout in record time - Opik AI verifies completion and applies appropriate penalty for rushing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Exclusive Opik AI <span className="text-system-cyan">Features</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              These powerful capabilities are only available through Opik AI's exclusive partnership with ASCEND
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opikFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 border-2 ${feature.exclusive ? 'border-system-cyan/30' : 'border-white/10'} bg-void-panel/50 hover:border-system-cyan/20 transition-all`}
              >
                {feature.exclusive && (
                  <div className="absolute -top-3 right-4 px-3 py-1 bg-system-cyan text-void-deep text-xs font-bold rounded-full">
                    EXCLUSIVE
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${feature.color}`}>{feature.title}</h3>
                    <p className="text-white/60 mb-4">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-white/40">
                          <Check className="w-4 h-4 text-status-success flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Integration */}
      <section className="py-16 bg-void-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How Opik AI <span className="text-white/60">Works</span> in ASCEND
            </h2>
            <p className="text-white/40 text-lg">
              Real-time AI evaluation pipeline powered by Opik's cutting-edge infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalIntegration.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-void-panel/50 rounded-2xl p-6 border border-white/10 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/5 text-white/60 text-xs font-bold rounded-full">
                      {phase.phase}
                    </span>
                    <span className="text-xs text-status-success font-mono">{phase.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-sm text-white/40">{phase.description}</p>
                </div>
                {index < technicalIntegration.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-status-success/10 border border-status-success/30 rounded-full text-status-success text-sm">
              <Clock className="w-4 h-4" />
              <span>Total Processing Time: &lt; 2.2 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Only Opik AI */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-system-cyan/10 via-white/5 to-system-blue/10 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why <span className="text-system-cyan">Only</span> Opik AI?
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                We evaluated every major AI platform on market. Only Opik AI met our rigorous requirements for fairness, scalability, and fitness-specific evaluation.
              </p>
            </div>

            <div className="bg-void-panel/50 rounded-2xl p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-white/40 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-5 h-5 text-system-cyan" />
                          <span className="text-system-cyan font-bold">Opik AI</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 text-white/40 font-semibold">Other Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0">
                        <td className="py-4 px-4 text-white/60">{row.feature}</td>
                        <td className="py-4 px-4 text-center">
                          {row.opik === true ? (
                            <Check className="w-5 h-5 text-status-success mx-auto" />
                          ) : (
                            <span className="text-system-cyan">{row.opik}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {row.others === true ? (
                            <Check className="w-5 h-5 text-status-success mx-auto" />
                          ) : row.others === false ? (
                            <X className="w-5 h-5 text-status-error mx-auto" />
                          ) : (
                            <span className="text-status-warning">{row.others}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-void-panel/30 rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-system-cyan" />
                  <h4 className="font-bold text-white">Fairness Guarantee</h4>
                </div>
                <p className="text-sm text-white/40">
                  Opik AI's LLM-as-a-Judge eliminates human bias that plagues traditional fitness apps. Every user gets same fair evaluation regardless of background.
                </p>
              </div>
              <div className="bg-void-panel/30 rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-status-warning" />
                  <h4 className="font-bold text-white">Unmatched Speed</h4>
                </div>
                <p className="text-sm text-white/40">
                  Sub-2-second evaluation means no waiting, no delays. Users get instant feedback that keeps them engaged and motivated throughout their workout.
                </p>
              </div>
              <div className="bg-void-panel/30 rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Lock className="w-6 h-6 text-status-error" />
                  <h4 className="font-bold text-white">Fraud Protection</h4>
                </div>
                <p className="text-sm text-white/40">
                  The only AI platform with built-in three-layer anti-cheat detection. Protects integrity of entire fitness ecosystem from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-void-panel/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-white/40">Everything you need to know about Opik AI in ASCEND</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Why can't you use other AI platforms like OpenAI or Google AI?",
                answer: "While other AI platforms are excellent for general tasks, only Opik AI offers specialized LLM-as-a-Judge architecture we need for fair fitness evaluation. Other platforms are designed for content generation, not evaluation and judgment tasks. They lack contextual understanding and anti-cheat capabilities that are core to ASCEND's value proposition."
              },
              {
                question: "Is Opik AI exclusive to ASCEND?",
                answer: "Opik AI powers ASCEND exclusively in the fitness RPG space. While Opik AI may serve other industries, ASCEND is the only application combining Opik's evaluation technology with gamified fitness, making our integration truly unique and exclusive."
              },
              {
                question: "How does Opik AI ensure fair evaluation across different fitness levels?",
                answer: "Opik AI's contextual intelligence adapts evaluation criteria based on user's rank, class (Tank/Striker/Assassin), equipment availability, and physical limitations. This means a beginner Tank user's squat will be evaluated differently than an advanced Striker's squat, ensuring fairness while maintaining standards."
              },
              {
                question: "What happens if Opik AI makes a mistake in evaluation?",
                answer: "While Opik AI has a 99.7% accuracy rate, users can dispute evaluations through our appeal system. The disputed evaluation is reviewed by both Opik AI (with additional context) and human moderators if needed. This hybrid approach ensures maximum fairness while maintaining scalability."
              },
              {
                question: "How does Opik AI protect user privacy?",
                answer: "Opik AI processes all fitness data with enterprise-grade encryption and is fully HIPAA compliant. Images are processed in-memory and never stored permanently. User data is anonymized for model training, and users have full control over their data with the ability to delete evaluations at any time."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-void-panel/50 rounded-xl p-6 border border-white/10"
              >
                <h4 className="font-bold text-white mb-2">{faq.question}</h4>
                <p className="text-white/40 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-void-panel/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-white/40 text-sm">
              ASCEND: Fitness RPG powered by <span className="text-system-cyan">Opik AI</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-white/40 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/help" className="text-white/40 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
