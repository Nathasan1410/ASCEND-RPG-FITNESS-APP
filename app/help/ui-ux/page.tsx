"use client";

import { useState } from "react";
import { Layout, Navigation, Smartphone, Search, BarChart3, Award, MessageCircle, Users, ChevronRight, ChevronDown, CheckCircle, ArrowRight, Zap, Home, Activity, Settings, Trophy, Bell } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function UIUXPage() {
  const [activeSection, setActiveSection] = useState("navigation");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const sections = [
    { id: "navigation", title: "Navigation", icon: Navigation, color: "text-system-cyan" },
    { id: "screens", title: "Key Screens", icon: Layout, color: "text-purple-400" },
    { id: "actions", title: "Common Actions", icon: Zap, color: "text-yellow-400" },
    { id: "design", title: "Design System", icon: BarChart3, color: "text-green-400" },
    { id: "accessibility", title: "Accessibility", icon: Award, color: "text-pink-400" },
    { id: "responsive", title: "Responsive Design", icon: Smartphone, color: "text-blue-400" },
  ];

  const navigationItems = [
    {
      id: "desktop",
      title: "Desktop Navigation",
      icon: Layout,
      description: "Top navigation bar with main menu items and user profile",
      items: [
        "Dashboard - Main stats and current quest",
        "Hunter Network - Social feed of other hunters",
        "Leaderboard - Global and class-specific rankings",
        "Profile - Your hunter profile and settings",
        "Help - Documentation and support",
      ],
    },
    {
      id: "mobile",
      title: "Mobile Navigation",
      icon: Smartphone,
      description: "Bottom navigation bar for easy thumb access on mobile devices",
      items: [
        "Dashboard - Main stats and current quest",
        "Hunter Network - Social feed",
        "Leaderboard - Rankings",
        "Profile - Your hunter profile",
        "Help - Documentation and support",
      ],
    },
    {
      id: "strava-mobile",
      title: "Strava Mobile Navigation",
      icon: Activity,
      description: "Alternative mobile navigation similar to Strava app",
      items: [
        "Quick access to generate quests",
        "View current active quest",
        "Access Hunter Network feed",
        "Check leaderboard position",
      ],
    },
  ];

  const screenCards = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Home,
      description: "Your main hub showing stats, current quest, and quick actions",
      features: [
        "Total XP and level progress",
        "Current rank badge",
        "Active quest card",
        "Quest completion streak",
        "Quick generate quest button",
      ],
    },
    {
      id: "quest-detail",
      title: "Quest Detail",
      icon: Zap,
      description: "Detailed view of your generated quest with exercises and tracking",
      features: [
        "Quest title and difficulty",
        "Exercise list with sets, reps, and weights",
        "Warm-up and cool-down routines",
        "Progress tracking during workout",
        "Complete quest and upload proof buttons",
      ],
    },
    {
      id: "hunter-network",
      title: "Hunter Network",
      icon: Users,
      description: "Social feed showing quest completions from other hunters",
      features: [
        "Quest completion posts",
        "Give kudos (blue) and respects (orange)",
        "Follow other hunters",
        "View profile and stats",
        "Comment on posts",
      ],
    },
    {
      id: "leaderboard",
      title: "Leaderboard",
      icon: Trophy,
      description: "Global and class-specific rankings",
      features: [
        "Global XP leaderboard",
        "Filter by rank (E-S)",
        "Filter by class (Tank/Striker/Assassin)",
        "Filter by time period (daily/weekly/monthly)",
        "View hunter profiles",
      ],
    },
    {
      id: "profile",
      title: "Profile",
      icon: Users,
      description: "Your hunter profile with stats and settings",
      features: [
        "Profile picture and rank badge",
        "Class and level",
        "XP and quest history",
        "Achievements and badges",
        "Settings and preferences",
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      description: "Account and app settings",
      features: [
        "Profile information",
        "Class selection",
        "Goals and preferences",
        "Notification settings",
        "Privacy settings",
        "Delete account (danger zone)",
      ],
    },
  ];

  const actionGuides = [
    {
      id: "generate-quest",
      title: "Generate Quest",
      icon: Zap,
      steps: [
        "Click 'Generate Quest' button on dashboard",
        "Select your equipment (e.g., dumbbells, barbell, bodyweight)",
        "Choose your goals (strength, hypertrophy, endurance)",
        "Wait for AI to generate your personalized quest (1-3 seconds)",
        "View quest details and start workout",
      ],
    },
    {
      id: "complete-workout",
      title: "Complete Workout",
      icon: CheckCircle,
      steps: [
        "Open quest detail page",
        "Follow warm-up exercises",
        "Complete each exercise with specified sets and reps",
        "Track your weights and rests",
        "Complete cool-down routine",
        "Click 'Complete Quest' button",
        "Upload proof (photo or video)",
      ],
    },
    {
      id: "give-kudos-respect",
      title: "Give Kudos/Respect",
      icon: MessageCircle,
      steps: [
        "Go to Hunter Network feed",
        "Find a post from another hunter",
        "Click blue Kudos button (for encouragement)",
        "Click orange Respect button (for impressive achievement)",
        "View how many kudos/respects you've given and received",
      ],
    },
    {
      id: "view-leaderboard",
      title: "View Leaderboard",
      icon: Trophy,
      steps: [
        "Click 'Leaderboard' in navigation",
        "View global rankings by default",
        "Filter by rank (E, D, C, B, A, S)",
        "Filter by class (Tank, Striker, Assassin)",
        "Filter by time period (daily, weekly, monthly)",
        "Click on hunter's name to view their profile",
      ],
    },
  ];

  const designExamples = [
    {
      id: "glassmorphism",
      title: "Glassmorphism Design",
      description: "Frosted glass effect with semi-transparent backgrounds and blur",
      code: `bg-void-deep/50 backdrop-blur-xl border border-white/10`,
      preview: "Creates a frosted glass effect with dark background",
    },
    {
      id: "gradient-cards",
      title: "Gradient Cards",
      description: "Subtle gradients for visual interest",
      code: `bg-gradient-to-br from-system-cyan/5 to-blue-600/5`,
      preview: "Adds a subtle cyan-to-blue gradient background",
    },
    {
      id: "rounded-corners",
      title: "Rounded Corners",
      description: "Consistent rounded corners for modern look",
      code: `rounded-2xl or rounded-3xl`,
      preview: "Large border-radius for card elements",
    },
    {
      id: "neon-accent",
      title: "Neon Accent Colors",
      description: "Cyan and other neon colors for highlights",
      code: `text-system-cyan or border-system-cyan/30`,
      preview: "Bright neon cyan for key elements and borders",
    },
    {
      id: "hover-effects",
      title: "Hover Effects",
      description: "Interactive feedback on hover",
      code: `hover:border-system-cyan/30 hover:bg-white/5 transition-all`,
      preview: "Border color change and background lightening on hover",
    },
    {
      id: "animations",
      title: "Smooth Animations",
      description: "Framer Motion for smooth transitions",
      code: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`,
      preview: "Fade-in with slide-up animation on page load",
    },
  ];

  const accessibilityFeatures = [
    {
      id: "touch-targets",
      title: "44px Touch Targets",
      description: "All interactive elements are at least 44x44 pixels for mobile touch",
      code: `min-h-[44px] min-w-[44px]`,
    },
    {
      id: "focus-states",
      title: "Focus States",
      description: "Clear visual indicators for keyboard navigation",
      code: `focus:border-system-cyan focus:ring-2 focus:ring-system-cyan/50`,
    },
    {
      id: "aria-labels",
      title: "ARIA Labels",
      description: "Descriptive labels for screen readers",
      code: `aria-label="Generate new quest"`,
    },
    {
      id: "color-contrast",
      title: "Color Contrast",
      description: "High contrast text for readability",
      code: "text-white on bg-void-deep",
    },
    {
      id: "keyboard-navigation",
      title: "Keyboard Navigation",
      description: "Full keyboard support for all features",
      code: "Tab, Enter, and Escape keys work throughout app",
    },
  ];

  const responsiveBreakpoints = [
    {
      id: "mobile",
      title: "Mobile (< 768px)",
      description: "Bottom navigation, stacked layouts, single column",
      features: [
        "Bottom navigation bar for easy thumb access",
        "Single column layout for cards",
        "Stacked buttons and controls",
        "Larger touch targets (48px+)",
      ],
    },
    {
      id: "tablet",
      title: "Tablet (768px - 1024px)",
      description: "Two-column layouts, optimized touch",
      features: [
        "Two-column grid for content",
        "Hybrid navigation (top for desktop, bottom for mobile)",
        "Optimized spacing for touch",
        "Medium-sized touch targets (44px)",
      ],
    },
    {
      id: "desktop",
      title: "Desktop (> 1024px)",
      description: "Multi-column layouts, mouse/keyboard optimized",
      features: [
        "Three-column grid for dashboard",
        "Top navigation with hover menus",
        "Standard touch targets (32px+)",
        "Hover effects and tooltips",
        "Keyboard shortcuts support",
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/help" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Help
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center">
              <Layout className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                UI/UX Guide
              </h1>
              <p className="text-sm text-white/60">
                Learn how to navigate and use ASCEND effectively
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Search className="w-6 h-6 text-system-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Search Feature
                  </h2>
                  <p className="text-sm text-white/70">
                    Use the search bar in the Help Center to quickly find articles, guides, and answers. Just type keywords and results appear instantly.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">
              Browse by Topic
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "bg-void-deep/50 border border-white/10 rounded-xl p-4 hover:border-system-cyan/30 hover:bg-white/5 transition-all text-left",
                      activeSection === section.id && "border-system-cyan bg-system-cyan/10"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={cn("w-5 h-5", section.color)} />
                      <h3 className="font-bold text-white">{section.title}</h3>
                    </div>
                    <div className="text-xs text-white/60">
                      {section.id === "navigation" && "Desktop, mobile, and Strava navigation"}
                      {section.id === "screens" && "Dashboard, quest, feed, and more"}
                      {section.id === "actions" && "Generate quest, complete workout, interact"}
                      {section.id === "design" && "Glassmorphism and modern UI patterns"}
                      {section.id === "accessibility" && "Keyboard nav and screen reader support"}
                      {section.id === "responsive" && "Mobile, tablet, and desktop layouts"}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <AnimatePresence mode="wait">
            {activeSection === "navigation" && (
              <motion.section
                key="navigation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Navigation
                </h2>
                <div className="space-y-6">
                  {navigationItems.map((item, index) => (
                    <div key={item.id} className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-system-cyan" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-white/70 mb-4">
                            {item.description}
                          </p>
                          <ul className="space-y-2">
                            {item.items.map((listItem, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-white/80">{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeSection === "screens" && (
              <motion.section
                key="screens"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Key Screens
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {screenCards.map((screen, index) => (
                    <motion.div
                      key={screen.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center">
                          <screen.icon className="w-5 h-5 text-system-cyan" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {screen.title}
                        </h3>
                      </div>
                      <p className="text-sm text-white/70 mb-4">
                        {screen.description}
                      </p>
                      <ul className="space-y-2">
                        {screen.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeSection === "actions" && (
              <motion.section
                key="actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Common Actions
                </h2>
                <div className="space-y-6">
                  {actionGuides.map((action, index) => (
                    <div key={action.id} className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
                          <action.icon className="w-6 h-6 text-system-cyan" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-3">
                            {action.title}
                          </h3>
                          <ol className="space-y-2">
                            {action.steps.map((step, i) => (
                              <li key={i} className="flex gap-3 text-sm text-white/80">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-system-cyan/20 text-system-cyan text-xs font-bold flex items-center justify-center">
                                  {i + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeSection === "design" && (
              <motion.section
                key="design"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Design System
                </h2>
                <div className="space-y-6">
                  {designExamples.map((example, index) => (
                    <div key={example.id} className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-3">
                        {example.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4">
                        {example.description}
                      </p>
                      <div className="bg-void-deep border border-white/10 rounded-lg p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <ChevronRight className="w-4 h-4 text-system-cyan" />
                          <span className="text-xs font-bold text-system-cyan">CSS Code</span>
                        </div>
                        <code className="text-sm text-white/90 font-mono block">
                          {example.code}
                        </code>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{example.preview}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeSection === "accessibility" && (
              <motion.section
                key="accessibility"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Accessibility Features
                </h2>
                <div className="space-y-6">
                  {accessibilityFeatures.map((feature, index) => (
                    <div key={feature.id} className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4">
                        {feature.description}
                      </p>
                      <div className="bg-void-deep border border-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ChevronRight className="w-4 h-4 text-system-cyan" />
                          <span className="text-xs font-bold text-system-cyan">Implementation</span>
                        </div>
                        <code className="text-sm text-white/90 font-mono block">
                          {feature.code}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeSection === "responsive" && (
              <motion.section
                key="responsive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Responsive Design
                </h2>
                <div className="space-y-6">
                  {responsiveBreakpoints.map((breakpoint, index) => (
                    <div key={breakpoint.id} className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-system-cyan" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {breakpoint.title}
                        </h3>
                      </div>
                      <p className="text-sm text-white/70 mb-4">
                        {breakpoint.description}
                      </p>
                      <ul className="space-y-2">
                        {breakpoint.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/help/features"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Zap className="w-6 h-6 text-system-cyan mb-3" />
                <h3 className="font-bold text-white mb-2">Features</h3>
                <p className="text-sm text-white/60 mb-3">Explore all features and how they work.</p>
                <div className="flex items-center gap-2 text-sm text-system-cyan group-hover:text-white transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/help/faq"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <MessageCircle className="w-6 h-6 text-purple-400 mb-3" />
                <h3 className="font-bold text-white mb-2">FAQ</h3>
                <p className="text-sm text-white/60 mb-3">Find answers to frequently asked questions.</p>
                <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-white transition-colors">
                  View FAQs
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/help/getting-started"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Award className="w-6 h-6 text-green-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Getting Started</h3>
                <p className="text-sm text-white/60 mb-3">Start your fitness RPG journey in 5 steps.</p>
                <div className="flex items-center gap-2 text-sm text-green-400 group-hover:text-white transition-colors">
                  Start Here
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
