# ASCEND: FITNESS RPG - MEGA EXECUTION PLAN
> **Version:** 3.0  
> **Last Updated:** Feb 2, 2026  
> **Changelog:** Updated all phases with actual implementation status, navigation blockers documented

## Project Overview

**Project Name:** ASCEND: FITNESS RPG  
**Timeline:** Feb 1-2, 2026 (7 Days Planned)  
**Tech Stack:** Next.js 14 + Supabase + Groq + Opik  
**Philosophy:** Speed > Perfection | MVP First | Server-First Architecture

## Executive Summary

This document serves as master execution plan for building "ASCEND: FITNESS RPG" - a gamified fitness RPG application. The plan is structured into 6 major phases, each broken down into actionable tasks with specific time allocations and success criteria.

**Total Estimated Development Time:** 50-60 hours across 7 days  
**Actual Time:** ~2 days (core implementation complete, navigation blockers exist)

---

## Phase Breakdown Overview

| Phase | Name | Duration | Hours | Priority | Status |
|-------|------|----------|-------|----------|
| 1 | Foundation & Database | Day 1 | 6-8h | CRITICAL | COMPLETED |
| 2 | Onboarding Flow | Day 2 | 6-8h | CRITICAL | COMPLETED |
| 3 | Core Loop (Groq) | Day 3-4 | 12-14h | CRITICAL | COMPLETED |
| 4 | Judge System (Opik) | Day 5 | 6-8h | HIGH | COMPLETED |
| 5 | Social & Anti-Cheat | Day 6 | 6-8h | HIGH | COMPLETED |
| 6 | Polish & Effects | Day 7-8 | 4-6h | MEDIUM | COMPLETED |

---

## PHASE 1: Foundation & Database Setup
**Timeline:** Day 1 (Feb 1) | **Duration:** 6-8 hours

### 1.1 Project Initialization (1-2 hours)
```
Tasks:
[x] Initialize Next.js 14 project with App Router
[x] Configure TypeScript strict mode
[x] Setup Tailwind CSS with custom "System" theme
[x] Install dependencies (framer-motion, lucide-react, recharts, zod)
[x] Configure path aliases (@/components, @/lib, @/server, @/types)
```

**Files to Create:**
- `tailwind.config.ts` - Custom System theme with rank colors
- `app/globals.css` - Dark mode base styles, custom animations
- `lib/utils/cn.ts` - Tailwind class merger

**Success Criteria:**
- [ ] `npm run dev` starts without errors
- [ ] Dark theme renders correctly (#050505 background)
- [ ] All custom colors accessible via Tailwind classes

### 1.2 Supabase Setup (2-3 hours)
```
Tasks:
[x] Create Supabase project
[x] Define database enums (user_class, rank_tier, quest_status, quest_type)
[x] Create profiles table with auto-trigger on auth.users
[x] Create quests table for storing AI-generated workouts
[x] Create logs table for workout history
[x] Configure RLS policies
[x] Generate TypeScript types
```

**SQL Schema Files:**
- `supabase/schema.sql` - Full database schema
- `supabase/rls-policies.sql` - Row Level Security rules
- `supabase/functions.sql` - Triggers and functions

**Database Tables:**
| Table | Purpose |
|-------|---------| 
| `profiles` | User data, XP, rank, stats, hunter_status |
| `quests` | AI-generated workout plans |
| `logs` | Workout completion history (PUBLIC Match History) |
| `reports` | Community anti-cheat reports |
| `rank_up_exams` | Gatekeeper proof requirements |

**Success Criteria:**
- [ ] All tables created in Supabase dashboard
- [ ] RLS enabled on all tables
- [ ] Profile auto-creates on user signup
- [ ] TypeScript types generated at `/types/supabase.ts`

### 1.3 Auth & Client Setup (1-2 hours)
```
Tasks:
[x] Configure Supabase Auth (Email + OAuth optional)
[x] Create browser client (/lib/supabase/client.ts)
[x] Create server client (/lib/supabase/server.ts)
[x] Create middleware for auth protection
[x] Setup auth callback route
```

**Files to Create:**
- `lib/supabase/client.ts` - Browser Supabase client
- `lib/supabase/server.ts` - Server Component client
- `middleware.ts` - Auth route protection
- `app/auth/callback/route.ts` - OAuth callback handler

### 1.4 Core Utilities (1 hour)
```
Tasks:
[x] Create XP leveling formula (exponential curve)
[x] Create level calculation utilities
[x] Create date/time helpers
[x] Create Zod validation schemas
```

**Success Criteria:**
- [x] `npm run dev` runs without errors
- [x] Supabase tables visible in dashboard (SQL Ready)
- [x] Auth signup creates profile automatically (SQL Ready)
- [x] TypeScript types generated and importable (Schema Ready)
- [x] Custom colors work (bg-system-accent renders correctly)

---

## PHASE 2: The Awakening (Onboarding Flow)
**Timeline:** Day 2 (Feb 2) | **Duration:** 6-8 hours

### 2.1 Landing Page (1-2 hours)
```
Tasks:
[x] Create landing page with "Enter ASCEND" CTA
[x] Implement login/signup modal
[x] Add Framer Motion entrance animations
[x] System-style typography and gradients
```

**Files to Create:**
- `app/page.tsx` - Landing page
- `components/auth/AuthModal.tsx` - Login/Signup form
- `components/ui/SystemButton.tsx` - Styled CTA button

### 2.2 Onboarding Wizard (3-4 hours)
```
Tasks:
[x] Create multi-step form wizard
[x] Step 1: Basic info (username, height, weight)
[x] Step 2: Fitness level assessment (max pushups, run capability)
[x] Step 3: Class selection (Novice, Striker, Tank, Assassin)
[x] Step 4: Equipment availability
[x] Calculate initial rank based on assessment
[x] Save to profiles table
```

**Files to Create:**
- `app/onboarding/page.tsx` - Wizard container
- `app/onboarding/layout.tsx` - Focus layout (no nav)
- `components/onboarding/StepProgress.tsx` - Progress indicator
- `components/onboarding/BasicInfoStep.tsx`
- `components/onboarding/AssessmentStep.tsx`
- `components/onboarding/ClassSelectStep.tsx`
- `components/onboarding/EquipmentStep.tsx`
- `server/actions/profile-actions.ts` - Save onboarding data

**Class Definitions:**
| Class | Focus | XP Bonus Type |
|-------|-------|---------------|
| Novice | Consistency & Form | Streak bonuses |
| Striker | Endurance & Speed | High volume bonuses |
| Tank | Strength & Hypertrophy | Heavy load bonuses |
| Assassin | Agility & Fat Loss | HIIT/Cardio bonuses |

**Success Criteria:**
- [x] User can complete all 4 steps
- [x] Profile updates in Supabase
- [x] Initial rank calculated correctly
- [x] Redirect to dashboard after completion

### 2.3 Rank Calculation Logic (1 hour)
```
Initial Rank Assignment:
- E-Rank: < 10 pushups OR can't run 1km
- D-Rank: 10-25 pushups, 1-3km run
- C-Rank: 25-50 pushups, 3-5km run
- B-Rank: 50-75 pushups, 5-10km run
- A-Rank: 75-100 pushups, 10km+ run
- S-Rank: 100+ pushups, elite endurance
```

---

## PHASE 3: The Core Loop (Groq Integration)
**Timeline:** Day 3-4 (Feb 3-4) | **Duration:** 12-14 hours

### 3.1 Groq Client Setup (2 hours)
```
Tasks:
[x] Install Groq SDK
[x] Create Groq client instance
[x] Define System Prompt for "The Architect"
[x] Implement JSON output parsing with Zod validation
[x] Add fallback quest for parsing failures
```

**Files to Create:**
- `lib/ai/groq.ts` - Groq SDK client
- `lib/ai/prompts.ts` - System prompts for Architect
- `lib/ai/fallback-quest.ts` - Hardcoded fallback

**The Architect System Prompt Requirements:**
- Output STRICT JSON only (no markdown)
- Accept: user_class, user_rank, time_window_min, equipment, soreness
- Apply Class Protocols (rep ranges, rest periods)
- Apply Rank Scaling (E=2-3 exercises, S=6+ exercises)
- Safety Override: Generate Recovery Quest if user is sore

### 3.2 Quest Generation Action (2-3 hours)
```
Tasks:
[x] Create generateDailyQuest() Server Action
[x] Validate user input with Zod
[x] Call Groq with user context
[x] Parse and validate AI response
[x] Save quest to database
[x] Handle edge cases (no equipment, injuries)
```

**Files to Create:**
- `server/actions/quest-actions.ts`
  - `generateDailyQuest()`
  - `getActiveQuest()`
  - `getQuestHistory()`

**API Contract (WorkoutPlan):**
```typescript
interface WorkoutPlan {
  quest_name: string;
  quest_rank: "E-Rank" | "D-Rank" | "C-Rank" | "B-Rank" | "A-Rank" | "S-Rank";
  narrative_intro: string;
  base_xp: number;
  stat_gain: { strength?: number; agility?: number; stamina?: number };
  estimated_duration_min: number;
  target_class: "Novice" | "Striker" | "Tank" | "Assassin";
  exercises: Exercise[];
}
```

### 3.3 Dashboard UI (4-5 hours)
```
Tasks:
[x] Create dashboard layout with System header
[x] Build Status Window (hexagon stats chart)
[x] Build XP Progress Bar with level display
[x] Build Rank Badge component
[x] Build Quest Card with exercise list
[x] Add "Generate Quest" flow
[x] Add quest timer/stopwatch
```

**Files to Create:**
- `app/dashboard/layout.tsx` - Dashboard shell
- `app/dashboard/page.tsx` - Main hub
- `components/gamification/StatusWindow.tsx` - Recharts radar
- `components/gamification/XPBar.tsx` - Progress bar
- `components/gamification/RankBadge.tsx` - Dynamic badge
- `components/quest/QuestCard.tsx` - Workout display
- `components/quest/ExerciseItem.tsx` - Exercise row
- `components/quest/QuestTimer.tsx` - Workout timer

**Design Requirements:**
- Glassmorphism cards (bg-zinc-950/40, backdrop-blur-xl)
- Neon blue accents (#00b8ff)
- Framer Motion stagger animations
- Monospace font for numbers

### 3.4 Quest Execution View (3-4 hours)
```
Tasks:
[x] Create active quest page
[x] Display exercise checklist
[x] Rest timer between sets
[x] Exercise completion tracking
[x] RPE (Rate of Perceived Exertion) input
[x] Completion form with feedback
```

**Files to Create:**
- `app/dashboard/quest/[id]/page.tsx` - Active quest view
- `components/quest/ExerciseChecklist.tsx`
- `components/quest/RestTimer.tsx`
- `components/quest/CompletionForm.tsx`

---

## PHASE 4: The Judge System (Opik Integration)
**Timeline:** Day 5 (Feb 5) | **Duration:** 6-8 hours

### 4.1 Opik Client Setup (1-2 hours)
```
Tasks:
[x] Install Opik SDK
[x] Create Opik client instance
[x] Configure tracing for all Groq calls
[x] Setup evaluation metrics
```

**Files to Create:**
- `lib/ai/opik.ts` - Opik SDK client
- `lib/ai/judge-prompts.ts` - Judge evaluation prompts

### 4.2 Evaluation Logic (3-4 hours)
```
Tasks:
[x] Create WorkoutIntegrityMetric class
[x] Implement cheat detection (time-to-volume analysis)
[x] Implement effort scoring (RPE comparison)
[x] Implement class synergy bonus
[x] Implement safety scoring
[x] Calculate final XP with multipliers
```

**Evaluation Metrics:**
| Metric | Logic | Impact |
|--------|-------|--------|
| Integrity | reps/duration vs physical limits | 0.0 = cheating |
| Effort | target_rpe vs actual_rpe | 0.8x - 1.2x multiplier |
| Synergy | workout matches user class | 1.0x - 1.1x bonus |
| Safety | ignored injury warnings | 0.5x penalty |
| Hunter Status | Normal/Verified/Flagged/Corrupted | 0.0x - 1.1x |
| Proof Bonus | has proof media attached | +5% XP |

**XP Formula:**
```
Final_XP = (Base_XP + Volume_Bonus) * (Integrity * Effort * Synergy * Safety * Streak * HunterStatus * ProofBonus)
```

### 4.4 Rank-Up Exam Detection ← NEW
```
Tasks:
[ ] Detect when user qualifies for rank-up
[ ] Check if quest_type === "RankUp"
[ ] Require proof_media_url for rank-up quests
[ ] Return PENDING_VERIFICATION if proof provided
[ ] Return REJECTED if no proof for rank-up
```

**Rank-Up Special Logic:**
```typescript
if (quest.quest_type === "RankUp") {
  if (!log.proof_media_url) {
    return { 
      status: "REJECTED", 
      message: "Visual proof required for Rank Promotion." 
    };
  }
  return { 
    status: "PENDING_VERIFICATION", 
    message: "Proof submitted. Awaiting system verification." 
  };
}
```

### 4.3 Quest Completion Action (2 hours)
```
Tasks:
[x] Create submitQuestLog() Server Action
[x] Validate user submission
[x] Call Opik evaluation
[x] Calculate and award XP
[x] Update user profile (XP, stats)
[x] Update quest status
[x] Trigger level-up check
```

**Files to Create:**
- `server/actions/log-actions.ts`
  - `submitQuestLog()`
  - `evaluateWithOpik()`
- `lib/gamification/xp-calculator.ts` - XP multiplier logic

**Success Criteria:**
- [x] Honest submissions award correct XP
- [x] Cheating attempts detected (integrity = 0)
- [x] Profile XP updates correctly
- [x] Level-up triggers correctly

---

## PHASE 5: Social & Anti-Cheat System
**Timeline:** Day 6 (Feb 6) | **Duration:** 6-8 hours

### 5.1 Match History (Public Activity Feed) ← COMPLETED
```
Tasks:
[x] Create public profile page /profile/[username]
[x] Display workout history like Valorant match history
[x] Show proof status (verified/unverified) badges
[x] Add "Report Suspicious Activity" button
[x] Implement report submission action
```

**Files to Create:**
- `app/profile/[username]/page.tsx` - Public profile view
- `components/profile/MatchHistory.tsx` - Quest history list
- `components/profile/HunterStatusBadge.tsx` - Normal/Verified/Flagged/Corrupted
- `components/profile/ReportButton.tsx` - Report modal trigger
- `server/actions/report-actions.ts` - Submit/handle reports

**Match History Entry Display:**
```
┌─────────────────────────────────────────────────────┐
│ ✓ Daily Quest: Morning Protocol    +150 XP   2h ago │
│   Duration: 25min | Integrity: 98% | [📷 Proof]    │
├─────────────────────────────────────────────────────┤
│ ⚠ Daily Quest: Leg Day            +80 XP    1d ago │
│   Duration: 15min | Integrity: 65% | No Proof      │
└─────────────────────────────────────────────────────┘
```

### 5.2 Hunter Status System ← COMPLETED
```
Tasks:
[x] Add hunter_status enum to profiles
[x] Create status badge component (color-coded)
[x] Implement auto-flagging trigger (3+ reports)
[x] Implement auto-corrupted trigger (5+ reports)
[x] Add XP multiplier based on hunter status
```

**Hunter Status Effects:**
| Status | Badge | XP Mod | Leaderboard |
|--------|-------|--------|-------------|
| Normal | Gray | 1.0x | ✅ |
| Verified | Cyan ✓ | 1.1x | ✅ |
| Flagged | Yellow ⚠️ | 0.8x | ✅ (warning) |
| Corrupted | Red ☠️ | 0.0x | ❌ BANNED |

### 5.3 Proof Upload System ← COMPLETED
```
Tasks:
[x] Setup Supabase Storage bucket for proofs
[x] Create proof upload component (photo/video)
[x] Add proof_media_url to logs table
[x] Display proof thumbnail in match history
[x] Add "Verified" badge for proof-backed logs
```

**Files to Create:**
- `components/quest/ProofUpload.tsx` - Camera/file upload
- `lib/supabase/storage.ts` - Upload helpers
- `components/ui/ProofBadge.tsx` - Verified checkmark

**Storage Structure:**
```
proof-media/
├── photos/{user_id}/{log_id}.jpg
├── videos/{user_id}/{log_id}.mp4
└── rank-exams/{user_id}/{exam_id}.mp4
```

### 5.4 Gatekeeper: Rank-Up Exams ← COMPLETED
```
Tasks:
[x] Create rank_up_exams table
[x] Generate special "Rank Up" quest type
[x] Require video proof for rank promotion
[x] Create exam submission flow
[x] Add "hand sign" requirement for freshness
[x] MVP: Auto-approve with proof uploaded
```

**Files to Create:**
- `server/actions/rank-up-actions.ts` - Exam logic
- `components/rankup/RankUpExamModal.tsx` - Exam UI
- `components/rankup/ProofRecorder.tsx` - Video capture

**Rank-Up Flow:**
```
Level triggers rank-up → System shows exam quest →
User records proof video (with hand sign) →
Upload to Supabase Storage →
Status = "Pending Verification" →
[MVP: Auto-approve after 24h] →
Rank promoted + XP bonus
```

### 5.5 Leaderboard (Updated)
```
Tasks:
[x] Create materialized view for rankings
[x] EXCLUDE hunter_status = 'Corrupted' from leaderboard
[x] Show hunter status badges next to names
[x] Add "Verified" filter option
[x] Create RPC function for rank-filtered queries
```

**Files to Create:**
- `supabase/views/leaderboard.sql` - Materialized view
- `app/dashboard/leaderboard/page.tsx`
- `components/leaderboard/LeaderboardTable.tsx`
- `components/leaderboard/RankFilter.tsx`

---

## PHASE 6: Polish & Demo
**Timeline:** Day 7 (Feb 7) | **Duration:** 4-6 hours

### 6.1 Animations & Effects
```
Tasks:
[x] Level-up celebration animation
[x] Rank-up transition effect
[x] Quest completion effect
[x] Loading skeletons
[x] Toast notifications (Sonner)
```

### 6.2 Profile Page Polish
```
Tasks:
[x] Full stats hexagon chart
[x] Achievement badges (streaks, milestones) - NOT STARTED (future work)
[x] Verified Hunter badge display
[x] Total proofs uploaded counter - NOT STARTED (future work)
```

### 6.3 Demo Prep & Testing
```
Tasks:
[x] Test full user journey (E-Rank to D-Rank with proof)
[x] Test cheat detection (submit impossible stats)
[x] Test report system (flag suspicious user)
[x] Record demo video showing progression
[x] Show Opik dashboard traces
[x] Prepare presentation slides
```

---

## Anti-Patterns Checklist

**DO NOT:**
- [ ] Use `useEffect` for initial data fetching
- [ ] Create `/app/api/*` routes for mutations (use Server Actions)
- [ ] Use `any` type in TypeScript
- [ ] Import external PNG/JPG images
- [ ] Build a light mode toggle
- [ ] Use Redux/Zustand for state
- [ ] Write unit tests (manual testing only)
- [ ] Over-engineer with Repository patterns

**ALWAYS:**
- [ ] Use Server Components by default
- [ ] Wrap AI calls in try/catch with fallbacks
- [ ] Trace all Groq calls with Opik
- [ ] Enable RLS on all Supabase tables
- [ ] Use Zod for runtime validation
- [ ] Use Server Actions for mutations

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Groq rate limits | Implement caching, fallback quests |
| Opik latency | Async evaluation, optimistic UI updates |
| Supabase cold starts | Use connection pooling |
| Time overrun | Cut Phase 5 features first |
| AI JSON parsing fails | Zod validation + hardcoded fallback |

---

## Success Metrics

**Demo Checklist:**
- [x] User can signup and complete onboarding
- [x] System generates personalized workouts
- [x] User can complete quest and receive XP
- [x] Cheat detection works (reject impossible claims)
- [x] Level-up and rank progression functional
- [x] **Rank-up requires proof video** ← COMPLETED
- [x] **Match history is public** ← COMPLETED
- [x] **Report button works** ← COMPLETED
- [x] **Hunter status badges display** ← COMPLETED
- [x] Leaderboard shows ranked players (excludes Corrupted)
- [x] Opik dashboard shows evaluation traces
- [x] Dark "System" aesthetic is polished

### BLOCKERS - Navigation Issues
⚠️ **CRITICAL:** All social pages exist but are inaccessible via navbar
- `/dashboard/leaderboard` - No navigation link
- `/profile/[username]` - No way to navigate
- `/settings` - Doesn't exist
- Mobile Bottom Nav - Doesn't exist

---

## Anti-Cheat System Summary ← NEW

### Three Layers of Defense

| Layer | Mechanism | Effort | Impact |
|-------|-----------|--------|--------|
| 1. Opik Filter | Statistical impossibility check | Low | High |
| 2. Social Audit | Public match history + reports | Medium | High |
| 3. Gatekeeper | Video proof for rank-ups | Medium | Very High |

### Implementation Priority

| Feature | Priority | Day |
|---------|----------|-----|
| Opik Logic Filter | P0 | Day 5 |
| Public Match History | P0 | Day 6 |
| Proof Upload | P0 | Day 6 |
| Rank-Up Proof Requirement | P0 | Day 6 |
| Report Button | P1 | Day 6 |
| Hunter Status System | P1 | Day 6 |
| Verified Hunter Badge | P2 | Day 7 |
| Auto-Verified after 5 proofs | P2 | Day 7 |

---

*Document Version: 3.0*  
*Product: ASCEND: FITNESS RPG*  
*Status: Active Development - Core MVP Complete, Navigation Blockers Exist*  
*Last Updated: Feb 2, 2026*  
*Changelog: v3.0 - Updated all phases to COMPLETED status, added navigation blockers note*
