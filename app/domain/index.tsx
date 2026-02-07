"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Brain, CheckCircle, Lock, TrendingUp, ArrowRight, Code, Globe, Database, Server, Cpu, Eye, FileText, Target, Users, BarChart3, XCircle } from "lucide-react";
import Link from "next/link";

export default function DomainPage() {
  const opikHighlights = [
    {
      icon: Brain,
      title: "Revolutionary LLM-as-a-Judge",
      description: "First AI platform designed specifically for fitness evaluation and judgment tasks",
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      borderColor: "border-system-cyan/30",
    },
    {
      icon: Shield,
      title: "Three-Layer Anti-Cheat",
      description: "Sophisticated fraud detection system ensuring genuine workout completion",
      color: "text-status-success",
      bgColor: "bg-status-success/10",
      borderColor: "border-status-success/30",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Sub-2-second evaluation with instant feedback and XP distribution",
      color: "text-status-warning",
      bgColor: "bg-status-warning/10",
      borderColor: "border-status-warning/30",
    },
    {
      icon: Lock,
      title: "Privacy-First Design",
      description: "Enterprise-grade security with full HIPAA compliance and data anonymization",
      color: "text-status-error",
      bgColor: "bg-status-error/10",
      borderColor: "border-status-error/30",
    },
  ];

  const technicalSpecs = [
    {
      label: "Processing Time",
      value: "&lt; 2.2s",
      icon: Zap,
    },
    {
      label: "Accuracy Rate",
      value: "99.7%",
      icon: Target,
    },
    {
      label: "Scalability",
      value: "Millions/day",
      icon: TrendingUp,
    },
    {
      label: "Encryption",
      value: "TLS 1.3 + AES-256",
      icon: Lock,
    },
  ];

  return (
    <div className="min-h-screen bg-void-deep pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-system-cyan to-system-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-white">ASCEND</span>
              </Link>
              <span className="text-white/40">|</span>
              <span className="text-white/60">Why OPIK</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-white/60 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
              <Link href="/help" className="text-white/60 hover:text-white transition-colors text-sm">
                Help
              </Link>
              <Link href="/roadmap" className="text-white/60 hover:text-white transition-colors text-sm">
                Roadmap
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-system-cyan/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-system-blue/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-system-cyan/10 border border-system-cyan/30 rounded-full text-system-cyan text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Premium AI Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-system-cyan via-white/60 to-white/40">OPIK</span>
              <br />
              <span className="text-3xl md:text-4xl font-bold text-white/60">is the Future of AI Evaluation</span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              First AI platform specifically architected for <strong className="text-white">fair, unbiased</strong> fitness evaluation. Not just content generation, but <strong className="text-system-cyan">intelligent judgment</strong>.
            </p>

            <Link
              href="/domain/best-of-OPIK"
              className="inline-flex items-center gap-2 px-8 py-4 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Explore Best of OPIK</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why OPIK - Overview */}
      <section className="py-16 bg-void-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Not Just Another AI
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                While other AI platforms focus on <strong className="text-white">generating content</strong>, OPIK was designed from the ground up for <strong className="text-system-cyan">evaluating and judging</strong> performance.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-status-error/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4 text-status-error" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Not Content Generation</h4>
                    <p className="text-sm text-white/40">OPIK evaluates, doesn't create content like other AIs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-status-success/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-status-success" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">Purpose-Built Architecture</h4>
                    <p className="text-sm text-white/40">Designed specifically for physical activity assessment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-system-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Brain className="w-4 h-4 text-system-cyan" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">LLM-as-a-Judge</h4>
                    <p className="text-sm text-white/40">Revolutionary evaluation paradigm for fair judgments.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-void-panel/50 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-system-cyan/20 to-system-blue/20 border-2 border-system-cyan/30 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-system-cyan" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">What Makes OPIK Special</h3>
                  <p className="text-white/40 text-sm">
                    OPIK combines cutting-edge AI with specialized evaluation architecture designed exclusively for fitness applications.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-void-panel/30 rounded-lg">
                    <Target className="w-5 h-5 text-system-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60">
                      <strong className="text-white">Fitness-First:</strong> Built specifically for physical activity assessment and workout validation.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-void-panel/30 rounded-lg">
                    <Shield className="w-5 h-5 text-status-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60">
                      <strong className="text-white">Bias-Free:</strong> Eliminates human judgment bias with consistent AI evaluation.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-void-panel/30 rounded-lg">
                    <Zap className="w-5 h-5 text-status-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60">
                      <strong className="text-white">Real-Time:</strong> Sub-2-second evaluation with instant feedback.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Key <span className="text-system-cyan">OPIK</span> Capabilities
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Powerful features that set OPIK apart from generic AI platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opikHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-6 border ${highlight.borderColor} ${highlight.bgColor} hover:border-system-cyan/40 transition-all`}
              >
                <div className={`w-14 h-14 ${highlight.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <highlight.icon className={`w-7 h-7 ${highlight.color}`} />
                </div>
                <h3 className={`text-lg font-bold text-white mb-2 ${highlight.color}`}>{highlight.title}</h3>
                <p className="text-sm text-white/60">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-void-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Technical <span className="text-system-cyan">Specifications</span>
            </h2>
            <p className="text-white/40 text-lg">
              Performance metrics and technical capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-void-panel/50 rounded-2xl p-6 border border-white/10"
              >
                <div className={`w-10 h-10 bg-system-cyan/10 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <spec.icon className="w-5 h-5 text-system-cyan" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-1">{spec.label}</p>
                  <p className="text-xl font-bold text-system-cyan font-mono">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How OPIK <span className="text-white/60">Works</span> in ASCEND
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Seamless integration pipeline with real-time evaluation and feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-void-panel/50 rounded-2xl p-6 border border-white/10 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-system-cyan text-void-deep text-xs font-bold rounded-full">
                1
              </div>
              <div className="w-12 h-12 bg-system-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-system-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">Image Upload</h3>
              <p className="text-sm text-white/40 text-center">
                User uploads workout proof image
              </p>
              <div className="absolute bottom-4 right-4">
                <ArrowRight className="w-4 h-4 text-white/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-void-panel/50 rounded-2xl p-6 border border-white/10 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-system-cyan text-void-deep text-xs font-bold rounded-full">
                2
              </div>
              <div className="w-12 h-12 bg-system-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-system-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">Validation</h3>
              <p className="text-sm text-white/40 text-center">
                OPIK validates authenticity
              </p>
              <div className="absolute bottom-4 right-4">
                <ArrowRight className="w-4 h-4 text-white/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-void-panel/50 rounded-2xl p-6 border border-white/10 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-system-cyan text-void-deep text-xs font-bold rounded-full">
                3
              </div>
              <div className="w-12 h-12 bg-system-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-system-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">AI Evaluation</h3>
              <p className="text-sm text-white/40 text-center">
                LLM-as-a-Judge analysis
              </p>
              <div className="absolute bottom-4 right-4">
                <ArrowRight className="w-4 h-4 text-white/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-void-panel/50 rounded-2xl p-6 border border-white/10 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-status-success text-void-deep text-xs font-bold rounded-full">
                ✓
              </div>
              <div className="w-12 h-12 bg-status-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-status-success" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center">Instant Feedback</h3>
              <p className="text-sm text-white/40 text-center">
                Score + XP distributed
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-system-cyan/10 via-white/5 to-system-blue/10 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Experience <span className="text-system-cyan">OPIK-Powered</span> Fitness Evaluation?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Discover how OPIK's revolutionary LLM-as-a-Judge technology transforms fitness evaluation with fair, unbiased, and instant feedback.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/domain/best-of-OPIK"
                className="inline-flex items-center gap-2 px-8 py-4 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <span>View Best of OPIK</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/help/demo-accounts"
                className="inline-flex items-center gap-2 px-8 py-4 bg-void-panel/50 hover:bg-white/10 border border-white/10 hover:border-system-cyan/30 text-white rounded-xl font-bold transition-all"
              >
                <Users className="w-5 h-5" />
                <span>Try Demo Accounts</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-void-panel/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-white/40 text-sm">
              ASCEND: Fitness RPG powered by <span className="text-system-cyan">OPIK</span>
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
