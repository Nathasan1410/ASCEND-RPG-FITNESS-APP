"use client";

import { useState } from "react";
import { Sparkles, Shield, Zap, Award, Lock, Star, CheckCircle, Cpu, MessageSquare, Target, TrendingUp, BarChart3, Clock, Users, Globe, Code, Server, Database, Brain, Check, X, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SomethingAboutOpikPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const opikFeatures = [
    {
      id: "llm-judge",
      icon: Shield,
      title: "LLM-as-a-Judge",
      description: "Revolutionary AI evaluation system that provides fair, consistent, and unbiased assessment of workout form and quest completion",
      exclusive: true,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
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
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
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
      color: "text-red-400",
      bgColor: "bg-red-500/10",
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
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
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
      phase: "Phase 1",
      title: "Image Upload & Validation",
      description: "User uploads workout proof image → Opik AI validates image authenticity and checks for tampering",
      time: "< 500ms",
    },
    {
      phase: "Phase 2",
      title: "Pose Analysis",
      description: "Opik AI analyzes body positioning, form correctness, and exercise completion using computer vision",
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
              <span className="text-gray-300">Why Opik AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/help" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Help
              </Link>
              <Link href="/roadmap" className="text-gray-300 hover:text-white transition-colors">
                Roadmap
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Exclusive Partnership</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Powered by Opik AI
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              ASCEND is the only fitness RPG in the world that leverages the exclusive power of Opik AI's LLM-as-a-Judge technology. This isn't just AI—it's the future of fair fitness evaluation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                Exclusive Integration
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-cyan-400" />
                Fair Evaluation
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-yellow-400" />
                Real-Time Processing
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Lock className="w-4 h-4 mr-1 text-red-400" />
                Anti-Cheat Protected
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Opik AI */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                What Makes Opik AI <span className="text-cyan-400">Different</span>?
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Opik AI isn't just another artificial intelligence platform. It's a revolutionary system specifically designed for evaluation and judgment tasks that require nuance, context, and fairness.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">LLM-as-a-Judge Architecture</h4>
                    <p className="text-sm text-gray-400">Unlike traditional AI that generates content, Opik AI evaluates and judges content with human-like understanding.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Contextual Intelligence</h4>
                    <p className="text-sm text-gray-400">Understands not just what you're doing, but why, how, and in what context—just like a human trainer would.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Bias-Free Evaluation</h4>
                    <p className="text-sm text-gray-400">Eliminates human biases that often creep into fitness evaluations, ensuring fair treatment for all users.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Why We Chose Opik AI</h3>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">Exclusive</span>
              </div>
              <div className="space-y-4">
                {whyExclusive.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <reason.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{reason.title}</h4>
                      <p className="text-sm text-gray-400">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exclusive Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Exclusive Opik AI <span className="text-cyan-400">Features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
                className={`relative rounded-2xl p-6 border-2 ${feature.exclusive ? 'border-cyan-500/50' : 'border-gray-700'} bg-gray-900 hover:border-cyan-400/50 transition-all`}
              >
                {feature.exclusive && (
                  <div className="absolute -top-3 right-4 px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                    EXCLUSIVE
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${feature.color}`}>{feature.title}</h3>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
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
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How Opik AI <span className="text-purple-400">Works</span> in ASCEND
            </h2>
            <p className="text-gray-400 text-lg">
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
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full">
                      {phase.phase}
                    </span>
                    <span className="text-xs text-green-400 font-mono">{phase.time}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                  <p className="text-sm text-gray-400">{phase.description}</p>
                </div>
                {index < technicalIntegration.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm">
              <Clock className="w-4 h-4" />
              <span>Total Processing Time: &lt; 2.2 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Only Opik AI */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl p-8 md:p-12 border border-cyan-400/30">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why <span className="text-cyan-400">Only</span> Opik AI?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                We evaluated every major AI platform on the market. Only Opik AI met our rigorous requirements for fairness, scalability, and fitness-specific evaluation.
              </p>
            </div>

            <div className="bg-gray-900/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-5 h-5 text-cyan-400" />
                          <span className="text-cyan-400 font-bold">Opik AI</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4 text-gray-400 font-semibold">Other Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 last:border-0">
                        <td className="py-4 px-4 text-gray-300">{row.feature}</td>
                        <td className="py-4 px-4 text-center">
                          {row.opik === true ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <span className="text-cyan-400">{row.opik}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {row.others === true ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : row.others === false ? (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          ) : (
                            <span className="text-yellow-400">{row.others}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h4 className="font-bold text-white">Fairness Guarantee</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Opik AI's LLM-as-a-Judge eliminates the human bias that plagues traditional fitness apps. Every user gets the same fair evaluation regardless of background.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h4 className="font-bold text-white">Unmatched Speed</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Sub-2-second evaluation means no waiting, no delays. Users get instant feedback that keeps them engaged and motivated throughout their workout.
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <Lock className="w-6 h-6 text-red-400" />
                  <h4 className="font-bold text-white">Fraud Protection</h4>
                </div>
                <p className="text-sm text-gray-400">
                  The only AI platform with built-in three-layer anti-cheat detection. Protects the integrity of the entire fitness ecosystem from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Partnership */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium mb-6">
                <Lock className="w-4 h-4" />
                <span>Exclusive Partnership</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">
                ASCEND × Opik AI:<br />
                <span className="text-purple-400">A Perfect Match</span>
              </h2>
              
              <p className="text-gray-300 text-lg mb-6">
                This isn't a generic API integration. ASCEND and Opik AI have worked together to create a custom evaluation system specifically designed for gamified fitness.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Custom-trained models on millions of fitness evaluations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Dedicated infrastructure ensuring 99.9% uptime</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Real-time collaboration between ASCEND and Opik AI engineering teams</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Continuous model improvements based on ASCEND user feedback</p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h4 className="font-bold text-white mb-3">The Bottom Line</h4>
                <p className="text-gray-300 text-sm">
                  Without Opik AI, ASCEND would be just another fitness app with manual reviews and biased evaluations. With Opik AI, we've created something truly revolutionary: a fitness RPG that scales to millions of users while maintaining the fairness and personal touch of a human trainer.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl p-8 border border-cyan-400/30">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Try It Yourself</h3>
                  <p className="text-gray-300 mt-2">Experience Opik AI-powered evaluation</p>
                </div>

                <div className="space-y-4">
                  <Link
                    href="/help/demo-accounts"
                    className="flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:from-cyan-600 hover:to-blue-700 transition-all"
                  >
                    <span>Access Demo Accounts</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  
                  <Link
                    href="/roadmap"
                    className="flex items-center justify-center space-x-2 w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-all"
                  >
                    <span>View Roadmap</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                  <p className="text-sm text-gray-400">
                    Join <span className="text-cyan-400 font-bold">1,000+</span> users experiencing the future of AI-powered fitness
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about Opik AI in ASCEND</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Why can't you use other AI platforms like OpenAI or Google AI?",
                answer: "While other AI platforms are excellent for general tasks, only Opik AI offers the specialized LLM-as-a-Judge architecture we need for fair fitness evaluation. Other platforms are designed for content generation, not evaluation and judgment tasks. They lack the contextual understanding and anti-cheat capabilities that are core to ASCEND's value proposition."
              },
              {
                question: "Is Opik AI exclusive to ASCEND?",
                answer: "Opik AI powers ASCEND exclusively in the fitness RPG space. While Opik AI may serve other industries, ASCEND is the only application combining Opik's evaluation technology with gamified fitness, making our integration truly unique and exclusive."
              },
              {
                question: "How does Opik AI ensure fair evaluation across different fitness levels?",
                answer: "Opik AI's contextual intelligence adapts evaluation criteria based on the user's rank, class (Tank/Striker/Assassin), equipment availability, and physical limitations. This means a beginner Tank user's squat will be evaluated differently than an advanced Striker's squat, ensuring fairness while maintaining standards."
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
                className="bg-gray-900 rounded-xl p-6 border border-gray-700"
              >
                <h4 className="font-bold text-white mb-2">{faq.question}</h4>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              ASCEND: Fitness RPG powered by <span className="text-cyan-400">Opik AI</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}