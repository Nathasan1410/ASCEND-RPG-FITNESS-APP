# THE SYSTEM - HOURLY EXECUTION TIMELINE

## Week Overview (Feb 1-8, 2026)

```
WEEK AT A GLANCE
================

Day 1 (Feb 1) - FOUNDATION
|--[6-8 hrs]-------------------------------------------|
  Morning: Project Init + Supabase Setup
  Afternoon: Auth + Core Utilities

Day 2 (Feb 2) - ONBOARDING  
|--[6-8 hrs]-------------------------------------------|
  Morning: Landing Page + Auth Modal
  Afternoon: Wizard Steps 1-4

Day 3 (Feb 3) - QUEST GEN (Part 1)
|--[6-8 hrs]-------------------------------------------|
  Morning: Groq Setup + Prompts
  Afternoon: Dashboard Layout + Status Window

Day 4 (Feb 4) - QUEST GEN (Part 2)
|--[6-8 hrs]-------------------------------------------|
  Morning: Quest Card + Exercise List
  Afternoon: Quest Execution View

Day 5 (Feb 5) - JUDGE SYSTEM
|--[6-8 hrs]-------------------------------------------|
  Morning: Opik Setup + Metrics
  Afternoon: XP Calculation + Completion Flow

Day 6 (Feb 6) - SOCIAL LAYER
|--[5-6 hrs]-------------------------------------------|
  Morning: Leaderboard
  Afternoon: Profile Page

Day 7-8 (Feb 7-8) - POLISH & DEMO
|--[5-6 hrs]-------------------------------------------|
  Day 7: Animations + Testing
  Day 8: Demo Recording + Final Fixes
```

---

## DAY 1: FOUNDATION (Feb 1)
**Goal:** Database ready, Auth working, core utilities in place

### Hour-by-Hour Schedule

```
MORNING SESSION (4 hours)
=========================

Hour 1 (09:00-10:00) - Project Initialization
├── 09:00 - Create Next.js 14 project
│   └── npx create-next-app@latest the-system --typescript --tailwind --app
├── 09:15 - Configure tsconfig.json (strict mode)
├── 09:30 - Install dependencies
│   └── npm i framer-motion lucide-react recharts zod tailwind-merge clsx sonner
├── 09:45 - Setup path aliases in tsconfig.json

Hour 2 (10:00-11:00) - Tailwind Configuration
├── 10:00 - Create tailwind.config.ts with System theme
│   ├── background: #050505
│   ├── system.accent: #00b8ff
│   └── rank colors (e-gray to s-gold)
├── 10:30 - Create globals.css
│   └── Custom animations, dark mode base
├── 10:45 - Create lib/utils/cn.ts

Hour 3 (11:00-12:00) - Supabase Project Setup
├── 11:00 - Create Supabase project (dashboard)
├── 11:15 - Create database enums:
│   ├── user_class: 'Novice','Striker','Tank','Assassin'
│   ├── rank_tier: 'E-Rank' to 'S-Rank'
│   ├── quest_status: 'Active','Completed','Failed','Skipped'
│   └── quest_type: 'Daily','Special','Penalty'
├── 11:30 - Create profiles table
└── 11:45 - Create quests table

Hour 4 (12:00-13:00) - Database Completion
├── 12:00 - Create logs table
├── 12:15 - Create auto-profile trigger
│   └── handle_new_user() function
├── 12:30 - Apply RLS policies
│   ├── profiles: public read, self update
│   ├── quests: self only
│   └── logs: self only
└── 12:45 - LUNCH BREAK

---

AFTERNOON SESSION (3-4 hours)
=============================

Hour 5 (14:00-15:00) - Supabase Clients
├── 14:00 - Create lib/supabase/client.ts (browser)
├── 14:20 - Create lib/supabase/server.ts (server)
├── 14:40 - Generate TypeScript types
│   └── supabase gen types typescript > types/supabase.ts

Hour 6 (15:00-16:00) - Auth Setup
├── 15:00 - Create middleware.ts (route protection)
├── 15:20 - Create app/auth/callback/route.ts
├── 15:40 - Test auth flow (signup creates profile)

Hour 7 (16:00-17:00) - Core Utilities
├── 16:00 - Create lib/gamification/leveling.ts
│   └── XP formula: 100 * Level^1.588
├── 16:20 - Create level calculation functions
├── 16:40 - Create types/schemas.ts (Zod)

Hour 8 (17:00-18:00) - Verification & Buffer
├── 17:00 - Test database connections
├── 17:20 - Verify all files created correctly
├── 17:40 - Document any issues
└── 18:00 - END DAY 1
```

### Day 1 Deliverables Checklist
- [ ] Next.js project runs (`npm run dev`)
- [ ] Tailwind theme configured with System colors
- [ ] Supabase tables created (profiles, quests, logs)
- [ ] RLS policies enabled
- [ ] Auth creates profile on signup
- [ ] TypeScript types generated
- [ ] XP formula implemented

---

## DAY 2: THE AWAKENING (Feb 2)
**Goal:** User can signup and complete onboarding wizard

### Hour-by-Hour Schedule

```
MORNING SESSION (4 hours)
=========================

Hour 1 (09:00-10:00) - Landing Page Structure
├── 09:00 - Create app/page.tsx (landing)
├── 09:20 - Add hero section with System aesthetic
├── 09:40 - Add "Enter the System" CTA button

Hour 2 (10:00-11:00) - Auth Modal
├── 10:00 - Create components/auth/AuthModal.tsx
├── 10:20 - Build login form
├── 10:40 - Build signup form
├── 10:50 - Add Supabase auth integration

Hour 3 (11:00-12:00) - Framer Motion Animations
├── 11:00 - Create SystemCard variants
├── 11:20 - Add entrance animations to landing
├── 11:40 - Add modal transition animations

Hour 4 (12:00-13:00) - Onboarding Setup
├── 12:00 - Create app/onboarding/layout.tsx
├── 12:20 - Create app/onboarding/page.tsx (wizard)
├── 12:40 - Create StepProgress component
└── 12:50 - LUNCH BREAK

---

AFTERNOON SESSION (4 hours)
===========================

Hour 5 (14:00-15:00) - Wizard Step 1 & 2
├── 14:00 - Create BasicInfoStep.tsx
│   └── Username, height, weight inputs
├── 14:30 - Create AssessmentStep.tsx
│   └── Max pushups, run capability inputs

Hour 6 (15:00-16:00) - Wizard Step 3 & 4
├── 15:00 - Create ClassSelectStep.tsx
│   └── 4 class cards with descriptions
├── 15:30 - Create EquipmentStep.tsx
│   └── Equipment checklist

Hour 7 (16:00-17:00) - Server Action & Logic
├── 16:00 - Create server/actions/profile-actions.ts
│   └── updateOnboarding() action
├── 16:20 - Implement rank calculation logic
├── 16:40 - Connect wizard to server action

Hour 8 (17:00-18:00) - Testing & Polish
├── 17:00 - Test complete onboarding flow
├── 17:20 - Add validation messages
├── 17:40 - Fix any bugs
└── 18:00 - END DAY 2
```

### Day 2 Deliverables Checklist
- [ ] Landing page renders with animations
- [ ] Auth modal works (login + signup)
- [ ] All 4 onboarding steps functional
- [ ] Class selection saves to profile
- [ ] Initial rank calculated correctly
- [ ] User redirects to dashboard

---

## DAY 3: QUEST GENERATION - PART 1 (Feb 3)
**Goal:** Groq generates workouts, dashboard displays stats

### Hour-by-Hour Schedule

```
MORNING SESSION (4 hours)
=========================

Hour 1 (09:00-10:00) - Groq Setup
├── 09:00 - Install Groq SDK
├── 09:15 - Create lib/ai/groq.ts client
├── 09:30 - Create lib/ai/prompts.ts
├── 09:45 - Write Architect system prompt (CRITICAL)

Hour 2 (10:00-11:00) - Quest Generation Function
├── 10:00 - Create generateDailyQuest() in groq.ts
├── 10:20 - Add Zod validation for response
├── 10:40 - Create fallback quest JSON

Hour 3 (11:00-12:00) - Quest Server Action
├── 11:00 - Create server/actions/quest-actions.ts
├── 11:15 - Implement generateDailyQuest action
├── 11:30 - Implement getActiveQuest action
├── 11:45 - Test with Groq API

Hour 4 (12:00-13:00) - Dashboard Layout
├── 12:00 - Create app/dashboard/layout.tsx
├── 12:20 - Create SystemNavbar component
├── 12:40 - Create SystemSidebar component
└── 12:50 - LUNCH BREAK

---

AFTERNOON SESSION (3 hours)
===========================

Hour 5 (14:00-15:00) - Status Window (Stats Chart)
├── 14:00 - Install recharts if needed
├── 14:15 - Create StatusWindow.tsx with RadarChart
├── 14:40 - Style with System colors

Hour 6 (15:00-16:00) - XP & Rank Components
├── 15:00 - Create XPBar.tsx (animated progress)
├── 15:25 - Create RankBadge.tsx (dynamic color)
├── 15:50 - Create ClassIcon.tsx

Hour 7 (16:00-17:00) - Dashboard Page
├── 16:00 - Create app/dashboard/page.tsx
├── 16:20 - Integrate all components
├── 16:40 - Fetch user profile (Server Component)
└── 17:00 - END DAY 3
```

### Day 3 Deliverables Checklist
- [ ] Groq client configured
- [ ] Architect prompt generating valid JSON
- [ ] Quest saves to database
- [ ] Dashboard layout renders
- [ ] Status Window shows stats hexagon
- [ ] XP bar displays progress
- [ ] Rank badge shows current rank

---

## DAY 4: QUEST GENERATION - PART 2 (Feb 4)
**Goal:** Quest cards display, user can execute and complete quests

### Hour-by-Hour Schedule

```
MORNING SESSION (4 hours)
=========================

Hour 1 (09:00-10:00) - Quest Card Component
├── 09:00 - Create QuestCard.tsx
├── 09:20 - Add glassmorphism styling
├── 09:40 - Add Framer Motion entrance

Hour 2 (10:00-11:00) - Exercise Display
├── 10:00 - Create ExerciseItem.tsx
├── 10:20 - Add completion checkbox
├── 10:40 - Style with System theme

Hour 3 (11:00-12:00) - Quest Generation UI
├── 11:00 - Add "Generate Quest" button to dashboard
├── 11:15 - Create quest request form (time, equipment)
├── 11:30 - Connect to generateDailyQuest action
├── 11:45 - Add loading states

Hour 4 (12:00-13:00) - Quest Detail Page Setup
├── 12:00 - Create app/dashboard/quest/[id]/page.tsx
├── 12:20 - Fetch quest data
├── 12:40 - Display quest narrative
└── 12:50 - LUNCH BREAK

---

AFTERNOON SESSION (4 hours)
===========================

Hour 5 (14:00-15:00) - Exercise Checklist
├── 14:00 - Create ExerciseChecklist.tsx
├── 14:20 - Track completion state
├── 14:40 - Calculate progress percentage

Hour 6 (15:00-16:00) - Timers
├── 15:00 - Create QuestTimer.tsx (workout timer)
├── 15:20 - Create RestTimer.tsx (between sets)
├── 15:40 - Add audio/visual cues

Hour 7 (16:00-17:00) - Completion Form
├── 16:00 - Create CompletionForm.tsx
├── 16:15 - Add RPE slider (1-10)
├── 16:30 - Add feedback text input
├── 16:45 - Add submission handler

Hour 8 (17:00-18:00) - Integration Testing
├── 17:00 - Test full quest flow
├── 17:20 - Fix UI issues
├── 17:40 - Verify data saves correctly
└── 18:00 - END DAY 4
```

### Day 4 Deliverables Checklist
- [ ] Quest card displays exercises
- [ ] User can generate new quest
- [ ] Quest detail page shows full workout
- [ ] Exercise checklist tracks completion
- [ ] Rest timer counts down
- [ ] Completion form captures RPE + feedback
- [ ] Form submission works

---

## DAY 5: THE JUDGE SYSTEM (Feb 5)
**Goal:** Opik evaluates workouts, XP awarded correctly

### Hour-by-Hour Schedule

```
MORNING SESSION (4 hours)
=========================

Hour 1 (09:00-10:00) - Opik Setup
├── 09:00 - Install Opik SDK
├── 09:15 - Create lib/ai/opik.ts client
├── 09:30 - Configure environment variables
├── 09:45 - Test basic tracing

Hour 2 (10:00-11:00) - Wrap Groq with Opik
├── 10:00 - Add tracing to generateDailyQuest
├── 10:20 - Log inputs/outputs to Opik
├── 10:40 - Verify traces in Opik dashboard

Hour 3 (11:00-12:00) - WorkoutIntegrityMetric
├── 11:00 - Create custom metric class
├── 11:15 - Implement time-to-volume check
│   └── Detect physically impossible claims
├── 11:30 - Implement RPE comparison
├── 11:45 - Implement safety check

Hour 4 (12:00-13:00) - XP Calculation Logic
├── 12:00 - Create lib/gamification/xp-calculator.ts
├── 12:15 - Implement multiplier system
│   └── Integrity * Effort * Synergy * Safety * Streak
├── 12:35 - Test with sample data
└── 12:50 - LUNCH BREAK

---

AFTERNOON SESSION (3 hours)
===========================

Hour 5 (14:00-15:00) - Submit Quest Log Action
├── 14:00 - Create server/actions/log-actions.ts
├── 14:15 - Create submitQuestLog() action
├── 14:30 - Integrate Opik evaluation
├── 14:45 - Save log to database

Hour 6 (15:00-16:00) - Profile Updates
├── 15:00 - Update user XP after submission
├── 15:15 - Update user stats (strength, etc.)
├── 15:30 - Check for level-up
├── 15:45 - Check for rank-up

Hour 7 (16:00-17:00) - Testing & Validation
├── 16:00 - Test honest submission (full XP)
├── 16:15 - Test cheating attempt (0 XP)
├── 16:30 - Test level-up trigger
├── 16:45 - Verify Opik dashboard traces
└── 17:00 - END DAY 5
```

### Day 5 Deliverables Checklist
- [ ] Opik client configured
- [ ] Groq calls traced to Opik
- [ ] Integrity metric detects cheating
- [ ] XP calculates with multipliers
- [ ] Profile updates with XP
- [ ] Level-up triggers correctly
- [ ] Rank-up triggers correctly
- [ ] Opik dashboard shows evaluation traces

---

## DAY 6: SOCIAL LAYER (Feb 6)
**Goal:** Leaderboard working, profile page complete

### Hour-by-Hour Schedule

```
MORNING SESSION (3 hours)
=========================

Hour 1 (09:00-10:00) - Leaderboard Database
├── 09:00 - Create materialized view SQL
├── 09:20 - Create unique index for concurrent refresh
├── 09:40 - Create RPC function for queries

Hour 2 (10:00-11:00) - Leaderboard UI
├── 10:00 - Create app/dashboard/leaderboard/page.tsx
├── 10:20 - Create LeaderboardTable.tsx
├── 10:40 - Add pagination/limit

Hour 3 (11:00-12:00) - Rank Filtering
├── 11:00 - Create RankFilter.tsx (tabs)
├── 11:20 - Connect filter to query
├── 11:40 - Test rank-based filtering

---

AFTERNOON SESSION (3 hours)
===========================

Hour 4 (13:00-14:00) - Profile Page
├── 13:00 - Create app/dashboard/profile/page.tsx
├── 13:20 - Create StatsDetail.tsx
├── 13:40 - Display full stats chart

Hour 5 (14:00-15:00) - Quest History
├── 14:00 - Create QuestHistory.tsx
├── 14:20 - Fetch past quests from logs
├── 14:40 - Display history list

Hour 6 (15:00-16:00) - Polish & Testing
├── 15:00 - Add streak display to profile
├── 15:20 - Test leaderboard updates
├── 15:40 - Test profile page rendering
└── 16:00 - END DAY 6
```

### Day 6 Deliverables Checklist
- [ ] Leaderboard shows top 50 players
- [ ] Rank filter works
- [ ] Profile shows all stats
- [ ] Quest history displays
- [ ] Streak counter accurate

---

## DAY 7-8: POLISH & DEMO (Feb 7-8)

### Day 7 Schedule
```
MORNING SESSION (3 hours)
=========================
Hour 1-2 - Animations
├── Level-up celebration effect
├── Rank-up transition
├── Quest completion confetti

Hour 3 - Loading States
├── Skeleton components
├── Toast notifications

AFTERNOON SESSION (3 hours)
===========================
Hour 4-5 - Testing
├── Full user journey test
├── Edge case testing
├── Performance check

Hour 6 - Bug Fixes
├── Fix critical issues
├── Document remaining bugs
```

### Day 8 Schedule
```
MORNING SESSION (3 hours)
=========================
Hour 1-2 - Demo Recording
├── Script demo flow
├── Record E-Rank to D-Rank progression
├── Show Opik traces

Hour 3 - Presentation
├── Prepare slides
├── Document features

AFTERNOON SESSION (2 hours)
===========================
Hour 4-5 - Final Polish
├── Last minute fixes
├── Verify deployment works
├── Submit to hackathon
```

### Final Checklist
- [ ] Demo video recorded
- [ ] Presentation complete
- [ ] All critical bugs fixed
- [ ] App deploys successfully
- [ ] Opik dashboard accessible
- [ ] Submitted before deadline

---

## Time Budget Summary

| Day | Task | Hours |
|-----|------|-------|
| 1 | Foundation | 7 |
| 2 | Onboarding | 8 |
| 3 | Quest Gen P1 | 7 |
| 4 | Quest Gen P2 | 8 |
| 5 | Judge System | 7 |
| 6 | Social Layer | 6 |
| 7-8 | Polish & Demo | 8 |
| **TOTAL** | | **51 hours** |

**Buffer Time:** ~5-10 hours for unexpected issues

---

## Emergency Shortcuts

If running behind, cut in this order:
1. Skip profile page (keep leaderboard)
2. Simplify animations (no confetti)
3. Skip safety scoring (keep integrity only)
4. Use simpler stats display (bars instead of radar)
5. Skip rest timer (manual tracking)

**Never Skip:**
- Database setup
- Auth flow
- Quest generation
- Basic XP calculation
- Demo preparation

---

*Document Version: 1.0*  
*Created: Feb 1, 2026*
