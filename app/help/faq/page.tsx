"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search, CheckCircle, ArrowRight, MessageCircle, Zap, Award, Users, Shield, Settings, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      borderColor: "border-system-cyan/30",
      questions: [
        {
          q: "How do I create an account?",
          a: "Sign up with email and password, or use social login (Google, GitHub). Choose your hunter username, select your starting class (Tank, Striker, or Assassin), and complete your profile.",
        },
        {
          q: "How do I start my first quest?",
          a: "After logging in, click 'Generate Quest' on your dashboard. Select your equipment and goals, wait for AI to create your personalized quest, and follow the exercises. Complete your workout and upload proof to earn XP!",
        },
        {
          q: "What are demo accounts?",
          a: "Demo accounts are pre-configured hunter accounts for testing ASCEND. They have different ranks (S, A, B, C) so you can explore features at different levels. All demo accounts use the same password: Test123!",
        },
        {
          q: "What class should I choose?",
          a: "Tank (Strength): Focus on building muscle and power. Best if you want to lift heavy and get stronger.\n\nStriker (Speed): Emphasis on cardio, agility, and explosive movements. Ideal for those who want to improve endurance.\n\nAssassin (Agility): Balance of strength and HIIT workouts. Perfect for those who want varied, high-intensity training.",
        },
        {
          q: "How do I level up?",
          a: "Complete quests and achievements to earn XP. Each level requires more XP than the previous one. Check your stats dashboard to see your current XP, level, and XP needed for the next level.",
        },
      ],
    },
    {
      id: "quest-system",
      title: "Quest System",
      icon: Award,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/30",
      questions: [
        {
          q: "How are quests generated?",
          a: "ASCEND uses Groq's Llama 3.3 70B AI model to generate personalized workout quests. The AI considers your current rank, available equipment, fitness goals, class specialization, and quest history to create unique, tailored workouts.",
        },
        {
          q: "What determines quest difficulty?",
          a: "Quest difficulty is based on your current rank (E-S). E-Rank quests are beginner-friendly with bodyweight exercises. S-Rank quests are elite-level with complex, high-intensity movements. You can also select your preferred difficulty when generating quests.",
        },
        {
          q: "How is XP calculated?",
          a: "Base XP reward is determined by quest difficulty:\n\nE-Rank: 50-100 XP\nD-Rank: 150-300 XP\nC-Rank: 500-800 XP\nB-Rank: 800-1500 XP\nA-Rank: 1500-2500 XP\nS-Rank: 2500-4000 XP\n\nThe AI judge can multiply this by 0.8x-1.5x based on your completion quality.",
        },
        {
          q: "What happens if I fail a quest?",
          a: "You can retry any quest as many times as you want. Failing doesn't penalize you - just try again! Your quest history tracks completions, not failures.",
        },
        {
          q: "Can I skip exercises?",
          a: "Yes, you can skip any exercise you can't do. The quest will still count as completed, but you may earn slightly less XP since you didn't complete all exercises.",
        },
        {
          q: "How long do I have to complete a quest?",
          a: "Quests don't have strict time limits. However, the AI judge evaluates your completion time as part of the effort score. Completing too quickly may result in a lower effort score.",
        },
      ],
    },
    {
      id: "ai-judge-opik",
      title: "AI Judge & Opik",
      icon: Shield,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
      questions: [
        {
          q: "What does the AI judge evaluate?",
          a: "The AI judge evaluates three factors:\n\n1. Form Quality (40% weight): Exercise technique from proof (0.0-1.0)\n2. Effort Level (30% weight): Consistency and intensity (0.0-1.0)\n3. Consistency (30% weight): Comparison to previous quests (0.0-1.0)\n\nThese factors combine into an overall score that determines your XP multiplier.",
        },
        {
          q: "What does Opik track?",
          a: "Opik traces all AI operations for transparency and monitoring:\n\nTraced:\n- Quest generation requests\n- AI judge evaluations\n- API response times\n- Performance metrics\n- Error tracking\n\nNot Traced:\n- Personal workout data\n- User conversations\n- Biometric data\n- Private information",
        },
        {
          q: "What doesn't Opik track?",
          a: "Opik does NOT track your personal workout data, user conversations, biometric data, or private information. We prioritize your privacy. You can view your Opik traces in /help/opik.",
        },
        {
          q: "Can I opt out of Opik tracking?",
          a: "Yes! You can opt out of Opik tracking in your account settings. We believe in transparency and user control. Even if you opt out, all ASCEND features will still work normally.",
        },
        {
          q: "How does the judge decide XP multiplier?",
          a: "The XP multiplier is based on your overall score (0.0-1.0):\n\n0.90-1.00 (S grade): 1.5x multiplier - Excellent\n0.80-0.89 (A grade): 1.3x multiplier - Great\n0.70-0.79 (B grade): 1.1x multiplier - Good\n0.60-0.69 (C grade): 1.0x multiplier - Average\n0.50-0.59 (D grade): 0.9x multiplier - Below average\n0.00-0.49 (E grade): 0.8x multiplier - Poor",
        },
      ],
    },
    {
      id: "social-features",
      title: "Social Features",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      questions: [
        {
          q: "How do kudos and respects work?",
          a: "Kudos (blue button) and Respects (orange button) are ways to recognize other hunters:\n\nKudos: Give encouragement and support. Use for any post you like.\nRespects: Give recognition for impressive achievements. Save for extraordinary completions.\n\nView your kudos/respect counts on your profile.",
        },
        {
          q: "How do I follow other hunters?",
          a: "Visit a hunter's profile and click 'Follow'. You'll see their posts in your Hunter Network feed. You can also view your followers and who you're following on your profile.",
        },
        {
          q: "How do I interact with the feed?",
          a: "On the Hunter Network feed, you can:\n\n- View quest completions from followed hunters\n- Like posts (kudos)\n- Give recognition for achievements (respects)\n- Comment on posts\n- Tag hunters in comments\n- Click on quests to view details",
        },
        {
          q: "Can I see posts from hunters I don't follow?",
          a: "Yes! The Hunter Network has a 'Global' tab showing posts from all hunters. Switch between 'Following' and 'Global' tabs to see different content.",
        },
        {
          q: "How does the leaderboard work?",
          a: "The leaderboard shows rankings in several categories:\n\nGlobal: All hunters ranked by total XP\nRank: Leaderboards for each rank (E, D, C, B, A, S)\nClass: Leaderboards for Tank, Striker, and Assassin\nTime: Daily, weekly, monthly, and all-time\n\nClick on any hunter's name to view their profile.",
        },
      ],
    },
    {
      id: "account-settings",
      title: "Account & Settings",
      icon: Settings,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
      questions: [
        {
          q: "How do I change my class?",
          a: "Go to your profile → Settings → Class Selection. You can change your class at any time. Note: Changing your class doesn't affect your XP or level, but it will change the type of quests you receive.",
        },
        {
          q: "What's in the danger zone?",
          a: "The danger zone contains account management actions that can't be undone:\n\n- Delete your account (permanent)\n- Reset all progress (XP, level, rank)\n- Disable your account\n\nBe careful with these actions!",
        },
        {
          q: "How do I delete my account?",
          a: "Go to your profile → Settings → Danger Zone → Delete Account. This permanently deletes your data and can't be undone. Consider exporting your data first if you want to keep it.",
        },
        {
          q: "Can I export my data?",
          a: "Yes! Go to your profile → Settings → Privacy → Export Data. We'll provide a JSON file with your quest history, XP, achievements, and profile data.",
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page. Enter your email, and we'll send a password reset link. Check your spam folder if you don't see it within 5 minutes.",
        },
      ],
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      icon: Shield,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/30",
      questions: [
        {
          q: "How is my data protected?",
          a: "ASCEND uses multiple security measures:\n\n1. Row-Level Security (RLS): You can only see your own data\n2. Encryption: All data is encrypted at rest and in transit\n3. Secure Authentication: Supabase Auth with OAuth support\n4. Regular Security Audits: We regularly review and update security",
        },
        {
          q: "What are RLS policies?",
          a: "Row-Level Security (RLS) is a PostgreSQL feature that enforces data access at the database level. For ASCEND, RLS policies ensure:\n\n- You can only see your own quests, XP, and profile\n- You can only update your own data\n- XP manipulation by others is impossible\n- Proof uploads are private to you",
        },
        {
          q: "Can I make my account private?",
          a: "Yes! Go to your profile → Settings → Privacy. You can make your profile private (only visible to people you follow) or public (visible to everyone). Your XP and rank on the leaderboard are always public.",
        },
        {
          q: "What happens if I report suspicious activity?",
          a: "When you report suspicious activity, our team reviews it. We may:\n\n- Investigate the reported account\n- Request proof of quest completions\n- Temporarily suspend suspicious accounts\n- Ban accounts that violate our anti-cheat policies",
        },
      ],
    },
    {
      id: "technical-issues",
      title: "Technical Issues",
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/30",
      questions: [
        {
          q: "What if the app doesn't load?",
          a: "Try these troubleshooting steps:\n\n1. Refresh your browser (Ctrl+F5 or Cmd+R)\n2. Clear browser cache and cookies\n3. Try a different browser (Chrome, Firefox, Safari)\n4. Check your internet connection\n5. Try incognito/private mode\n\nIf the issue persists, contact support at support@ascend.fitness",
        },
        {
          q: "What if I can't upload proof?",
          a: "Check these requirements:\n\nFile size: Max 10MB\nFile types: JPEG, PNG, WebP (images), MP4, WebM (videos)\n\nIf your file meets requirements but still fails:\n1. Try a different file format\n2. Check your internet connection\n3. Clear browser cache\n4. Try a different browser",
        },
        {
          q: "How do I report a bug?",
          a: "Go to /help → Contact Support or email support@ascend.fitness. Include:\n\n- Description of the bug\n- Steps to reproduce\n- Expected vs actual behavior\n- Your browser and device info\n- Screenshots if helpful",
        },
        {
          q: "Is my data backed up?",
          a: "Yes! We automatically backup your data daily. Your data is stored securely with redundancy. However, we recommend exporting your data periodically for your own records.",
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/help" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Help
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                FAQ
              </h1>
              <p className="text-sm text-white/60">
                Find answers to frequently asked questions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-void-deep/50 backdrop-blur-xl border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/40 focus:border-system-cyan focus:outline-none transition-all"
              />
            </div>
          </section>

          <section>
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <HelpCircle className="w-16 h-16 mx-auto mb-4 text-white/20" />
                <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
                <p className="text-white/60">
                  Try different search terms or browse all categories.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredCategories.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  const isCategoryExpanded = expandedCategory === category.id;
                  const totalQuestions = category.questions.length;
                  const showingQuestions = searchQuery ? category.questions.length : totalQuestions;

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.05 }}
                      className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedCategory(isCategoryExpanded ? null : category.id)}
                        className="w-full p-6 hover:bg-white/5 transition-all flex items-center justify-between"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", category.bgColor, category.borderColor, "border")}>
                            <Icon className={cn("w-6 h-6", category.color)} />
                          </div>
                          <div>
                            <h3 className={cn("text-xl font-bold text-white mb-1", category.color)}>
                              {category.title}
                            </h3>
                            <p className="text-sm text-white/60">
                              {searchQuery ? `${showingQuestions} questions found` : `${totalQuestions} questions`}
                            </p>
                          </div>
                        </div>
                        {isCategoryExpanded ? (
                          <ChevronUp className="w-5 h-5 text-white/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isCategoryExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-white/10 bg-black/20"
                          >
                            <div className="p-6 space-y-4">
                              {category.questions.map((item, questionIndex) => {
                                const isQuestionExpanded = expandedQuestion === questionIndex;

                                return (
                                  <div key={questionIndex} className="bg-white/5 rounded-xl overflow-hidden">
                                    <button
                                      onClick={() => setExpandedQuestion(isQuestionExpanded ? null : questionIndex)}
                                      className="w-full p-5 hover:bg-white/10 transition-all text-left"
                                    >
                                      <div className="flex items-start gap-3 mb-3">
                                        <CheckCircle className="w-5 h-5 text-system-cyan flex-shrink-0 mt-0.5" />
                                        <p className="font-bold text-white text-base">{item.q}</p>
                                      </div>
                                    </button>

                                    <AnimatePresence>
                                      {isQuestionExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="border-t border-white/10 bg-black/20 px-5 pb-5"
                                        >
                                          <div className="flex items-start gap-3">
                                            <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-white/90 text-sm whitespace-pre-line">{item.a}</p>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Still Have Questions?
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Can't find what you're looking for? Contact our support team for personalized assistance.
              </p>
              <Link
                href="mailto:support@ascend.fitness"
                className="inline-flex items-center gap-2 px-6 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
