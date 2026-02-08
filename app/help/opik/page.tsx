"use client";

import { Eye, EyeOff, Shield, Zap, AlertTriangle, CheckCircle, XCircle, Lock, Database, Globe, Smartphone, Settings, FileText, BarChart3, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export default function OpikHelpPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/help" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Help
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Opik: Transparent AI Monitoring
              </h1>
              <p className="text-sm text-green-400 font-medium">
                How We Track & Improve Your Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* What is Opik */}
          <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-system-cyan/10 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-system-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  What is Opik?
                </h2>
                <p className="text-white/70 leading-relaxed">
                  <strong>Opik</strong> is an AI observability platform that helps us understand how ASCEND performs and how users interact with the app. Think of it as a smart monitoring system that tracks app behavior, helps us find bugs, and improves the AI features that generate your quests.
                </p>
              </div>
            </div>

            <div className="bg-system-cyan/5 border border-system-cyan/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-system-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-2">
                    Why We Use Opik
                  </p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Faster bug detection and fixes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Better AI judge accuracy for quest evaluations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Improved quest quality and personalization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Smoother app performance and UX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Real-time error tracking and alerts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* What We Track */}
          <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">
                What Does Opik Track?
              </h2>
            </div>

            <div className="space-y-4">
              <TrackingItem
                icon={Globe}
                title="Quest Generation Requests"
                description="When you request a new quest, Opik logs the request to help us improve AI quest quality."
                tracked={true}
              />
              <TrackingItem
                icon={Settings}
                title="AI Judge Evaluations"
                description="When the AI evaluates your quest completion, Opik tracks the evaluation to improve judge accuracy."
                tracked={true}
              />
              <TrackingItem
                icon={Zap}
                title="Performance Metrics"
                description="App performance data like page load times, API response times, and error rates."
                tracked={true}
              />
              <TrackingItem
                icon={Smartphone}
                title="User Flow Data"
                description="Which screens you visit, how long you stay, and common navigation paths."
                tracked={true}
              />
              <TrackingItem
                icon={FileText}
                title="Error Occurrences"
                description="When and where errors occur, so we can fix them quickly."
                tracked={true}
              />
            </div>
          </section>

          {/* What We DON'T Track */}
          <section className="bg-void-deep/50 border border-red-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <EyeOff className="w-8 h-8 text-red-400" />
              <h2 className="text-2xl font-bold text-white">
                What Does Opik NOT Track?
              </h2>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-2">
                    Your Privacy Is Our Priority
                  </p>
                  <p className="text-sm text-white/70">
                    We <strong>never</strong> send your personal workout data, biometric information, or private conversations to Opik. All tracked data is anonymized and aggregated.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <TrackingItem
                icon={XCircle}
                title="Personal Workout Data"
                description="Your exercises, sets, reps, weights, and performance metrics are NOT sent to Opik."
                tracked={false}
              />
              <TrackingItem
                icon={XCircle}
                title="Biometric Information"
                description="Heart rate, calories burned, or any health metrics are NOT tracked by Opik."
                tracked={false}
              />
              <TrackingItem
                icon={XCircle}
                title="User Conversations"
                description="Chat messages, comments, or any user-generated content are NOT sent to Opik."
                tracked={false}
              />
              <TrackingItem
                icon={XCircle}
                title="Personal Identification"
                description="Emails, names, or any personally identifiable information is NOT included in Opik traces."
                tracked={false}
              />
              <TrackingItem
                icon={XCircle}
                title="Proof Media"
                description="Your quest proof photos, videos, or any uploaded media are NOT sent to Opik."
                tracked={false}
              />
            </div>
          </section>

          {/* How It Helps You */}
          <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">
                How Opik Monitoring Helps You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitCard
                icon={Zap}
                title="Faster Bug Fixes"
                description="Opik alerts us to errors in real-time, allowing us to fix bugs faster and keep the app running smoothly."
              />
              <BenefitCard
                icon={CheckCircle}
                title="Better AI Accuracy"
                description="Tracking AI judge evaluations helps us improve the accuracy and fairness of quest grading."
              />
              <BenefitCard
                icon={Database}
                title="Improved Quest Quality"
                description="Understanding which quests work best helps us generate more personalized and effective workout plans."
              />
              <BenefitCard
                icon={Smartphone}
                title="Smoother UX"
                description="User flow data reveals pain points, helping us make the app more intuitive and enjoyable."
              />
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                Your Rights & Control
              </h2>
            </div>

            <div className="space-y-4">
              <RightItem
                icon={Eye}
                title="Right to Know"
                description="You have the right to know exactly what data is being tracked. This page provides full transparency."
              />
              <RightItem
                icon={Settings}
                title="Right to Control"
                description="You can request to disable Opik tracking for your account (note: this may affect app performance)."
              />
              <RightItem
                icon={Database}
                title="Right to Access"
                description="You can request a copy of all Opik trace data associated with your account."
              />
              <RightItem
                icon={XCircle}
                title="Right to Deletion"
                description="You can request deletion of all Opik trace data at any time."
              />
            </div>

            <div className="mt-6 pt-6 border-t border-blue-500/20">
              <p className="text-sm text-white/60 text-center">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@ascend.fitness" className="text-system-cyan hover:text-white transition-colors">
                  privacy@ascend.fitness
                </a>
              </p>
            </div>
          </section>

          {/* Technical Details */}
          <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-gray-400" />
              <h2 className="text-2xl font-bold text-white">
                Technical Details
              </h2>
            </div>

            <div className="space-y-4 text-sm text-white/70">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-2">Project Name</h3>
                <p>
                  All traces are sent to the <strong>"LevelUp Workout"</strong> project in Opik. This ensures proper separation from other projects and easy tracking.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-2">Data Encryption</h3>
                <p>
                  All data sent to Opik is encrypted in transit using TLS 1.3. Stored data is encrypted at rest.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-2">Data Retention</h3>
                <p>
                  Opik trace data is retained for 90 days by default. After 90 days, data is automatically deleted.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-2">Data Storage</h3>
                <p>
                  Opik data is stored securely on Opik's servers, which comply with GDPR and SOC 2 standards.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-bold text-white mb-2">Anonymization</h3>
                <p>
                  User IDs are anonymized before being sent to Opik. No personally identifiable information is included.
                </p>
              </div>
            </div>
          </section>

          {/* Analytics Dashboard */}
          <section className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-system-cyan" />
              <h2 className="text-2xl font-bold text-white">
                View Your AI Analytics
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-white/80">
                Want to see how the AI Judge is evaluating your workouts? Check out the new AI Analytics Dashboard!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard
                  icon={BarChart3}
                  title="Score Distribution"
                  description="See your grade breakdown across all completed quests"
                />
                <FeatureCard
                  icon={TrendingUp}
                  title="Performance Trends"
                  description="Track your XP and scores over time"
                />
                <FeatureCard
                  icon={Zap}
                  title="Factor Analysis"
                  description="Deep dive into Integrity, Effort, and Safety scores"
                />
                <FeatureCard
                  icon={Activity}
                  title="Recent Evaluations"
                  description="View detailed breakdown of your latest quest evaluations"
                />
              </div>

              <div className="pt-6">
                <a
                  href="/dashboard/analytics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
                >
                  Open AI Analytics Dashboard
                  <BarChart3 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <FAQItem
                question="Is my workout data sent to Opik?"
                answer="No. Your personal workout data (exercises, sets, reps, weights, etc.) is stored in your Supabase database and is never sent to Opik."
              />
              <FAQItem
                question="Can I disable Opik tracking?"
                answer="Yes. You can contact us at privacy@ascend.fitness to request disabling Opik tracking for your account. Note: This may affect our ability to provide support and improve the app for you."
              />
              <FAQItem
                question="How long is Opik data retained?"
                answer="Opik trace data is retained for 90 days by default. After 90 days, data is automatically deleted."
              />
              <FAQItem
                question="Who has access to Opik data?"
                answer="Only authorized ASCEND developers have access to Opik data. Data is used solely for improving app performance and features."
              />
              <FAQItem
                question="Is Opik data shared with third parties?"
                answer="No. Opik data is never shared with third parties for marketing or advertising purposes."
              />
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Still Have Questions?
              </h3>
              <p className="text-white/70 mb-6">
                Our team is here to help. Contact us with any questions about Opik or your privacy.
              </p>
              <a
                href="mailto:privacy@ascend.fitness"
                className="inline-flex items-center gap-2 px-8 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
              >
                Contact Privacy Team
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function TrackingItem({ icon: Icon, title, description, tracked }: { icon: any; title: string; description: string; tracked: boolean }) {
  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-xl border",
      tracked ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"
    )}>
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", tracked ? "text-green-400" : "text-red-400")} />
      <div className="flex-1">
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-white/60">{description}</p>
      </div>
      {tracked ? (
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      )}
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-system-cyan/20 transition-all">
      <Icon className="w-6 h-6 text-system-cyan mb-3" />
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}

function RightItem({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
      <Icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-white/60">{description}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
      <h4 className="font-bold text-white mb-2">{question}</h4>
      <p className="text-sm text-white/60">{answer}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-system-cyan/20 transition-all">
      <Icon className="w-6 h-6 text-system-cyan mb-3" />
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}
