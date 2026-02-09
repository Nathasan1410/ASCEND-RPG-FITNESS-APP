# ASCEND: FITNESS RPG - PROJECT CONTEXT

> **Version:** 1.1  
> **Last Updated:** February 3, 2026  
> **Purpose:** Builder Context for Full-Stack Prompt Engineering

---

## Executive Summary

**Project Name:** ASCEND: FITNESS RPG (formerly "The System")  
**Type:** Gamified Fitness RPG Application  
**Philosophy:** Solo Leveling-inspired workout progression with AI Judge  
**Tech Stack:** Next.js 14 + Supabase + Groq + Opik  

---

## Table of Contents

1. [Current Project State](#current-project-state)
2. [Technical Architecture](#technical-architecture)
3. [Feature Implementation Status](#feature-implementation-status)
4. [File Structure Overview](#file-structure-overview)
5. [Component Library](#component-library)
6. [Database Schema](#database-schema)
7. [API & Server Actions](#api--server-actions)
8. [Known Issues & Edge Cases](#known-issues--edge-cases)

---

## 1. Current Project State

### MVP Status
| Component | Status |
|---------|--------|
| Core Quest Loop | ✅ Complete |
| Anti-Cheat (3-Layer) | ✅ Complete |
| Navigation | ✅ Complete |
| Social Pages | ⚠️ Code exists, **navigation blocked** |
| Settings Page | ✅ Created |
| Leaderboard | ✅ Functional |
| Profiles | ✅ Functional |
| Match History | ✅ Functional |
| Report System | ✅ Functional |
| **Social Media Feed** | ❌ **NOT IMPLEMENTED** (See Part XIII in FUTURE-PLAN.md) |

### What Works Right Now
Users can:
- ✅ Sign up and complete onboarding
- ✅ Generate AI-powered daily quests
- ✅ Execute quests with timers
- ✅ Submit completion logs
- ✅ Receive XP and level up
- ✅ Access leaderboard from navbar
- ✅ Access their own profile from navbar
- Access settings page from navbar
- Mobile users see bottom navigation

---

## 2. Technical Architecture

### Frontend
```
Framework:     Next.js 14 (App Router)
Styling:       Tailwind CSS
Animations:    Framer Motion
Icons:         Lucide React
Charts:        Recharts (Radar for stats)
Notifications:  Sonner
Validation:     Zod
```

### Backend
```
Auth:          Supabase Auth
Database:       Supabase PostgreSQL
Storage:        Supabase Storage (proof media)
API:            Next.js Server Actions
```

### AI Integration
```
Quest Generation: Groq (Llama-3.1-70b-Versatile)
Evaluation:       Opik (LLM-as-Judge)
```

### Key Directories
```
app/                  Next.js 14 App Router pages
components/             React components
lib/
  ├── ai/          Groq + Opik clients
  ├── gamification/ XP calculator, leveling
  ├── supabase/    DB + Storage clients
  └── utils/        Helpers
server/actions/      Server Actions
```

---

## 3. Feature Implementation Status

### ✅ COMPLETED Features
| Feature | Files | Status |
|---------|-------|--------|
| **Onboarding** | `app/onboarding/page.tsx` + components/onboarding/* | ✅ |
| **Landing Page** | `app/page.tsx` + `components/auth/AuthModal.tsx` | ✅ |
| **Dashboard** | `app/dashboard/page.tsx` + `app/dashboard/layout.tsx` | ✅ |
| **Quest Execution** | `app/dashboard/quest/[id]/page.tsx` + `components/quest/*` | ✅ |
| **Leaderboard** | `app/dashboard/leaderboard/page.tsx` | `components/leaderboard/LeaderboardTable.tsx` | ✅ |
| **Public Profiles** | `app/profile/[username]/page.tsx` | ✅ |
| **Settings Page** | `app/settings/page.tsx` | ✅ |
| **Navigation** | `SystemNavbar.tsx` + `MobileBottomNav.tsx` | ✅ |

### ⚠️ TODO (Not Started)
| Feature | Priority | Notes |
|---------|----------|-------|
| Friends System | P1 | Database tables exist, UI not accessible |
| Social Notifications | P1 | Database tables exist, no UI component |
| Quest History Page | P1 | Navigation blocker - needs `/quests/history` route |
| **Social Media Feed** | **P1** | **NOT IMPLEMENTED** - See Part XIII in FUTURE-PLAN.md |
| Guilds/Clans | P2 | NOT IMPLEMENTED |
| Achievements | P2 | Database seeded, UI not implemented |
| Weekly Challenges | P2 | NOT IMPLEMENTED |
| Wearable Integration | P3 | NOT IMPLEMENTED |
| Nutrition Tracking | P3 | NOT IMPLEMENTED |
| Messaging/Direct Chat | P3 | NOT IMPLEMENTED |

---

## 4. File Structure Overview

### Page Files
```
app/
├── page.tsx                        # Landing page
├── layout.tsx                        # Root layout
├── auth/
│   └── callback/
│       └── route.tsx                  # OAuth handler
├── onboarding/
│   └── page.tsx                    # Onboarding wizard
├── dashboard/
│   ├── page.tsx                  # Main dashboard
│   ├── layout.tsx                  # Dashboard layout (includes nav)
│   ├── leaderboard/
│   │   └── page.tsx           # Rankings
│   ├── quest/[id]/
│   │   └── page.tsx           # Quest execution
│   └── settings/
│       └── page.tsx               # Settings page
└── profile/[username]/
    └── page.tsx                    # Public profile
```

### Component Files
```
components/
├── auth/
│   └── AuthModal.tsx            # Login/signup modal
├── dashboard/
│   ├── StatusWindow.tsx            # Hexagon radar chart
│   ├── XPBar.tsx                # Progress bar
│   ├── RankBadge.tsx              # Rank display
│   └── GenerateQuestButton.tsx   # Create quest CTA
├── layout/
│   ├── SystemNavbar.tsx             # Desktop navbar
│   ├── FloatingNavDock.tsx           # macOS-style floating dock
│   └── MobileBottomNav.tsx           # Mobile bottom tabs
├── gamification/
│   ├── LevelUpEffect.tsx            # Level-up modal
│   └── RankUpEffect.tsx             # Rank-up modal
├── onboarding/
│   ├── BasicInfoStep.tsx
│   ├── AssessmentStep.tsx
│   ├── ClassSelectStep.tsx
│   └── EquipmentStep.tsx
├── quest/
│   ├── QuestCard.tsx               # Quest display
│   ├── ExerciseItem.tsx            # Exercise row
│   ├── QuestExecution.tsx          # Quest workout flow
│   ├── ExerciseChecklist.tsx
│   ├── CompletionForm.tsx           # Submit form
│   ├── QuestTimer.tsx             # Workout timer
│   ├── RestTimer.tsx
│   └── ProofUpload.tsx            # Photo/video upload
├── leaderboard/
│   └── LeaderboardTable.tsx
├── profile/
│   ├── MatchHistory.tsx            # Public quest history
│   ├── HunterStatusBadge.tsx      # Status indicator
│   └── ReportButton.tsx           # Anti-cheat report
└── settings/
└── SettingsPage.tsx             # Settings UI
└── ui/
    ├── SystemButton.tsx             # Styled button
    ├── ProofBadge.tsx              # Proof indicator
    └── Skeleton.tsx                # Loading state
```

### Server Actions
```
server/actions/
├── profile-actions.tsx             # Onboarding, profile updates
├── quest-actions.tsx             # Quest generation
├── log-actions.tsx              # Quest submission
├── leaderboard-actions.tsx          # Leaderboard queries
├── match-history-actions.tsx        # Profile data
└── report-actions.tsx            # Anti-cheat reports
```

### Library Files
```
lib/
├── ai/
│   ├── groq.ts                 # Quest generation
│   ├── opik.ts                 # Judge evaluation
│   └── prompts.ts                # System prompts
├── gamification/
│   ├── leveling.ts              # XP formulas
│   └── xp-calculator.ts        # Evaluation logic
├── supabase/
│   ├── client.ts                # Browser client
│   ├── server.ts                # Server client
│   └── storage.ts               # Upload helpers
└── utils/
    ├── cn.ts                     # Class merge utility
    ├── audio.ts                  # Sound effects
    └── date-helpers.ts         # Formatters
```

---

## 5. Database Schema

### Tables
```
profiles          # User data, XP, rank, stats, hunter_status
quests            # AI-generated workouts
logs              # Workout history
reports            # Community reports
rank_up_exams      # Gatekeeper data
```

### Key Fields
```
profiles:
  - id, username, class (Novice/Striker/Tank/Assassin)
  - level, current_xp, total_xp, rank_tier (E-Rank to S-Rank)
  - stats_strength, stats_agility, stats_stamina
  - streak_current, streak_best
  - hunter_status (Normal/Verified/Flagged/Corrupted)
  - equipment []
  - onboarding_done, height_cm, weight_kg
  - verified_at, report_count

quests:
  - quest_type (Daily/Penalty/RankUp/Special)
  - rank_difficulty, plan_json (Groq output)
  - status (Active/Completed/Failed)
  - xp_potential, expires_at, requires_proof

logs:
  - quest_id, user_id, duration_actual, rpe_actual
  - exercises_completed (JSON)
  - xp_awarded, integrity_score, safety_score
  - proof_media_url, proof_type (None/Photo/Video/Timelapse)
  - verification_status, is_public

reports:
  - reporter_id, target_user_id, target_log_id
  - reason, status

rank_up_exams:
  - from_rank, to_rank, exam_quest_id
  - proof_media_url, hand_sign_required
  - status (Pending/Approved/Rejected)
```

---

## 6. API & Server Actions

### Server Actions
| File | Exports |
|------|--------|
| profile-actions.tsx | `completeOnboarding()` |
| quest-actions.tsx | `generateDailyQuest()`, `getActiveQuest()`, `getQuestById()` |
| log-actions.tsx | `submitQuestLog()` - Main evaluation logic |
| leaderboard-actions.tsx | `getLeaderboard()` |
| match-history-actions.tsx | `getPublicProfile()` |
| report-actions.tsx | `submitReport()` |

### Action Flow
1. Client action called → 2. Supabase query → 3. Execute logic → 4. Return result

---

## 7. Known Issues & Edge Cases

### Current Issues
1. **LSP Warnings** - TypeScript linting issues in some files (non-blocking)
2. **Mobile Navigation** - Works but `/quests/history` page doesn't exist
3. **Profile Route** - `/profile/me` redirects but component doesn't explicitly handle it
4. **Settings** - LocalStorage used, but server persistence could be better

### Edge Cases to Handle
- User with `hunter_status='Corrupted'` - Should be excluded everywhere
- Quest expires while in progress - Should be handled
- Failed Groq generation - Should use fallback
- Opik timeout - Should handle gracefully
- Proof upload failure - Should show error message

---

## Key Design Decisions (Reference for Next Builder)

### System Aesthetic
- **Theme:** Dark mode only (zinc-950 background)
- **Accent:** Cyan neon (#00FFFF)
- **Rank Colors:** E(Gray) → D(White) → C(Cyan) → B(Blue) → A(Purple) → S(Gold)
- **Fonts:** Inter (body), Space Grotesk (headers)

### Component Patterns
- Use `cn()` utility for class merging
- Use Server Components by default
- Client Components for interactive elements
- Use Framer Motion for animations

### Data Flow
1. Quest Generation: Groq → Zod validate → Save to DB
2. Quest Execution: Complete → Opik evaluate → XP calculation → Update stats
3. Social: Public logs visible → Reports can be submitted

---

## Recommended Next Session Focus (For Full-Stack Prompt Engineering)

When starting the next builder session, focus on these aspects:

### 1. Infrastructure & Environment
- Deployment setup (Vercel, Supabase)
- Environment variables (.env.local)
- CI/CD configuration

### 2. Core Feature Expansion
- Friends system implementation
- Social notifications
- Quest history page
- Achievements system
- Weekly challenges

### 3. Optimization Work
- Performance profiling
- Code splitting/lazy loading
- Database query optimization
- Image optimization (if adding external assets later)

### 4. Full-Stack Prompt Engineering
Instead of: "Create this page/form/component..."  
Focus on: "Design and implement the complete [feature] stack including database, backend, API endpoints, deployment, testing, optimization"

### 5. Testing & QA
- End-to-end testing of all flows
- Unit tests (if time permits)
- Cross-browser testing
- Mobile responsiveness testing
- Load testing

---

## Important Notes for Next Builder

1. **This Project Uses Next.js 14 App Router** - All pages are in `/app/` directory
2. **Server Actions Only** - No `/app/api/` routes
3. **TypeScript Strict Mode** - All files should pass compilation
4. **RLS Enabled** - Database security policies are critical
5. **Dark Mode Only** - No light mode toggle should exist

### Design System Reference
- **Colors:** Use Tailwind colors from `tailwind.config.ts`
- **Icons:** Use Lucide React icons consistently
- **Fonts:** Inter and JetBrains Mono
- **Animations:** Use Framer Motion spring physics

### Code Style to Maintain
- No `any` types
- Explicit `cn()` imports everywhere
- Consistent naming (kebab-case)
- React Server Components as default
- Client Components with "use client" only when needed

---

*Document Version: 1.1*  
*Project: ASCEND: FITNESS RPG*  
*Status: Core MVP Complete - Social Features Planned*  
*Last Updated: February 3, 2026*
