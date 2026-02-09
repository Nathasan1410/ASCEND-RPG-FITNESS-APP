# ASCEND: FITNESS RPG
## Product Brief v1.0

> **Document Type:** Product Brief  
> **Version:** 1.0  
> **Last Updated:** February 2, 2026  
> **Status:** Active Development  
> **Product Lead:** [Your Name]

---

## Executive Summary

**ASCEND: FITNESS RPG** is a gamified fitness application that transforms daily workouts into an immersive RPG experience. Users become "Hunters" who complete AI-generated workout quests to gain XP, level up, and climb the ranks from E-Rank to the legendary S-Rank.

What sets ASCEND apart is its AI-powered "System" — an intelligent judge that evaluates workout performance, detects cheating, and delivers dynamic rewards based on actual effort. This isn't just another fitness tracker; it's a complete progression system that makes getting fit feel like playing a game.

**Tagline:** *"Your Daily Mandate to Become S-Rank."*

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Target Audience](#4-target-audience)
5. [Core Value Proposition](#5-core-value-proposition)
6. [Key Features](#6-key-features)
7. [User Journey](#7-user-journey)
8. [The System Architecture](#8-the-system-architecture)
9. [Game Mechanics](#9-game-mechanics)
10. [Anti-Cheat System](#10-anti-cheat-system)
11. [Technical Stack](#11-technical-stack)
12. [Competitive Analysis](#12-competitive-analysis)
13. [Business Model](#13-business-model)
14. [Success Metrics](#14-success-metrics)
15. [Product Roadmap](#15-product-roadmap)
16. [Brand Guidelines](#16-brand-guidelines)
17. [Risks & Mitigations](#17-risks--mitigations)

---

## 1. Product Vision

### Vision Statement
> *"To create a world where self-improvement is as engaging as playing your favorite RPG — where every rep counts, every session matters, and everyone can become the hero of their own fitness journey."*

### Mission Statement
> *"ASCEND empowers users to transform their bodies through gamified fitness experiences, using AI to deliver personalized workouts, fair progression, and a community that holds each other accountable."*

### Core Philosophy
ASCEND is built on three pillars:

| Pillar | Description |
|--------|-------------|
| **Gamification** | Turn mundane workouts into epic quests with real progression |
| **Fairness** | AI-powered evaluation ensures everyone earns their rank |
| **Accountability** | Public match history and community verification prevent cheating |

---

## 2. Problem Statement

### The Fitness App Paradox
The fitness app market is saturated with over 350,000 health and fitness apps, yet:

- **67%** of gym memberships go unused
- **80%** of New Year fitness resolutions fail by February
- **Average fitness app retention** drops to 4% after 30 days

### Why Current Solutions Fail

| Problem | Current Apps | ASCEND Solution |
|---------|--------------|-----------------|
| **Boring routines** | Static workout plans | AI-generated dynamic quests |
| **No sense of progress** | Generic badges | RPG-style leveling with visible stats |
| **Easy to cheat** | Honor system only | AI Judge + Social verification |
| **Lack of motivation** | Push notifications | Public leaderboards + community pressure |
| **One-size-fits-all** | Generic programs | Class-based personalization |

### The Core Insight
> *"People don't abandon games mid-level. They abandon workouts mid-set. The difference? Games have progression systems that make every action meaningful."*

---

## 3. Solution Overview

ASCEND reimagines fitness as an RPG where:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   USER = "Hunter"                                           │
│   WORKOUT = "Quest"                                         │
│   EXERCISE = "Battle"                                       │
│   COMPLETION = "Victory"                                    │
│   PROGRESS = "Level Up"                                     │
│                                                             │
│   The System assigns. The Hunter executes. The Judge        │
│   evaluates. XP is awarded. Ranks are earned.               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### The Three Agents

| Agent | Role | Technology |
|-------|------|------------|
| **The Architect** | Generates personalized workout quests | Groq (Llama-3-70B) |
| **The Judge** | Evaluates performance & awards XP | Opik (LLM-as-Judge) |
| **The System** | The overarching AI persona | Combined AI + Rules Engine |

---

## 4. Target Audience

### Primary Persona: "The Gamer Who Wants to Get Fit"

```
Name: Alex, 24
Occupation: Software Developer
Gaming: 15+ hours/week
Fitness: Sporadic, gym membership unused
Pain Points:
  - Finds traditional workouts boring
  - Loves progression systems in games
  - Competitive by nature
  - Struggles with consistency
Motivation:
  - "If only working out felt like leveling up in a game"
```

### Secondary Personas

| Persona | Age | Description | Key Motivation |
|---------|-----|-------------|----------------|
| **The Anime Fan** | 18-30 | Loves Solo Leveling, wants to "become the protagonist" | Fantasy fulfillment |
| **The Comeback Kid** | 25-40 | Former athlete wanting to restart fitness journey | Structured progression |
| **The Social Competitor** | 20-35 | Motivated by leaderboards and community | Competition & recognition |
| **The Data Nerd** | 22-40 | Wants to track every metric and optimize | Stats & analytics |

### Market Size

| Segment | TAM | SAM | SOM (Year 1) |
|---------|-----|-----|--------------|
| Global Fitness App Market | $14.7B | $2.1B (Gamified) | $5M |
| Target Users | 500M | 50M | 100K |

---

## 5. Core Value Proposition

### For Users

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   "ASCEND turns every workout into a quest worth           │
│    completing. Level up your body like you level up        │
│    your game character — with visible progress, fair       │
│    rewards, and a community that keeps you accountable."   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Value Pillars

| Pillar | User Benefit | How We Deliver |
|--------|--------------|----------------|
| **Motivation** | Never feel stuck or bored | Dynamic AI-generated quests daily |
| **Progress** | See tangible improvement | XP, levels, ranks, stat charts |
| **Fairness** | Earn everything legitimately | AI evaluation + anti-cheat |
| **Community** | Belong to something bigger | Leaderboards, public profiles |
| **Personalization** | Workouts that fit you | Class system + AI adaptation |

---

## 6. Key Features

### 6.1 The Awakening (Onboarding)

The first experience sets the tone — users don't "sign up," they "awaken."

```
ONBOARDING FLOW
═══════════════════════════════════════════════════════════

Step 1: BASIC INFO
├── Username (Hunter Name)
├── Height / Weight
└── "Initializing biometric scan..."

Step 2: FITNESS ASSESSMENT
├── Max Pushups (Placement Test)
├── Running Capability
└── "Analyzing physical parameters..."

Step 3: CLASS SELECTION
├── Novice    → Consistency & Form
├── Striker   → Endurance & Speed
├── Tank      → Strength & Power
└── Assassin  → Agility & Fat Loss

Step 4: EQUIPMENT CHECK
├── Available equipment
└── "Calibrating quest generator..."

RESULT: Initial Rank Assignment (E-Rank to S-Rank)
```

### 6.2 The Dashboard (Command Center)

The main hub displays:

| Component | Description |
|-----------|-------------|
| **Status Window** | Hexagonal radar chart showing Strength, Agility, Stamina |
| **XP Bar** | Progress toward next level with visual effects |
| **Rank Badge** | Current rank with glow effects |
| **Active Quest** | Today's assigned workout |
| **Streak Counter** | Consecutive days of completion |

### 6.3 Daily Quests (The Core Loop)

```
QUEST GENERATION FLOW
═══════════════════════════════════════════════════════════

INPUT (User Context)
├── Class: Tank
├── Rank: C-Rank
├── Time Available: 30 minutes
├── Equipment: Dumbbells, Pull-up bar
└── Soreness: Chest (mild)

↓ [THE ARCHITECT - Groq AI]

OUTPUT (Workout Quest)
├── Quest Name: "C-RANK PROTOCOL: POSTERIOR ASSAULT"
├── Difficulty: C-Rank
├── XP Potential: 450 XP
├── Narrative: "The System detects posterior chain weakness..."
└── Exercises:
    ├── Romanian Deadlifts (4x8)
    ├── Pull-ups (4x6)
    ├── Bent-over Rows (3x10)
    └── Face Pulls (3x15)
```

### 6.4 Quest Execution Mode

During workout:

| Feature | Description |
|---------|-------------|
| **Exercise Checklist** | Mark exercises as complete |
| **Rest Timer** | Countdown between sets |
| **Quest Timer** | Total elapsed workout time |
| **Tips Display** | Form cues for each exercise |

### 6.5 The Judgment (Post-Workout)

```
EVALUATION FLOW
═══════════════════════════════════════════════════════════

INPUT (User Submission)
├── Duration: 28 minutes
├── Exercises Completed: 4/4
├── RPE (Perceived Effort): 8/10
└── Feedback: "Last set of pull-ups was tough"

↓ [THE JUDGE - Opik AI]

OUTPUT (Verdict)
├── Status: APPROVED
├── Integrity Score: 0.95
├── Effort Score: 0.90
├── Safety Score: 1.0
├── Final XP: 425 XP
├── Stat Gains: +2 STR, +1 STA
└── System Message: "Protocol executed. Weakness eliminated."
```

### 6.6 Progression System

| Element | Description |
|---------|-------------|
| **Levels** | 1-50+ with exponential XP curve |
| **Ranks** | E → D → C → B → A → S |
| **Stats** | Strength, Agility, Stamina (visible growth) |
| **Streaks** | Consecutive day bonuses |

### 6.7 Social Features

| Feature | Description |
|---------|-------------|
| **Leaderboard** | Global rankings by XP/Rank |
| **Public Profiles** | View other hunters' stats & history |
| **Match History** | Public workout log (like Valorant) |
| **Hunter Status** | Normal → Verified → Flagged → Corrupted |
| **Report System** | Flag suspicious activity |

### 6.8 Level-Up & Rank-Up Effects

Celebratory animations when users progress:

- **Level Up:** Full-screen flash + number animation
- **Rank Up:** Dramatic reveal with new rank badge
- **Sound Effects:** Triumphant audio cues

---

## 7. User Journey

### Week 1: The Awakening

```
Day 1: Sign up → Complete onboarding → Assigned E-Rank
Day 2: First daily quest → Learn the interface
Day 3: Complete quest → First XP gain → Understand progression
Day 4: Build streak → See stats improve
Day 5: Level up! → Experience the dopamine hit
Day 6-7: Habit forming → Check-in becomes routine
```

### Month 1: The Grind

```
Week 1: E-Rank establishing baseline
Week 2: Approaching D-Rank threshold
Week 3: D-RANK PROMOTION (with proof requirement)
Week 4: Building consistency, exploring class mechanics
```

### Month 3: The Transformation

```
- Visible stat improvements
- Community recognition (leaderboard position)
- Verified Hunter status (if proof provided)
- Physical results matching in-app progress
```

### The Retention Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   TRIGGER: Daily notification + streak at risk             │
│      ↓                                                      │
│   ACTION: Open app → Start quest                            │
│      ↓                                                      │
│   VARIABLE REWARD: XP gain (varies by performance)         │
│      ↓                                                      │
│   INVESTMENT: Stats improve → Progress saved                │
│      ↓                                                      │
│   TRIGGER: Tomorrow's quest awaits...                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. The System Architecture

### 8.1 The Architect (Quest Generator)

**Model:** Groq (Llama-3-70B-Versatile)  
**Purpose:** Generate personalized, progressive workout plans

**Input Variables:**
- User class (Novice/Striker/Tank/Assassin)
- User rank (E through S)
- Time available (minutes)
- Equipment available
- Muscle soreness (areas to avoid)
- Previous workout intensity

**Output:** Structured JSON workout plan with exercises, sets, reps, rest times

**Class Protocols:**

| Class | Rep Range | Rest Period | Focus |
|-------|-----------|-------------|-------|
| Novice | 8-12 | 60-90s | Form & consistency |
| Striker | 15-20+ | 30-45s | Endurance & volume |
| Tank | 3-6 | 90-120s | Strength & power |
| Assassin | HIIT/Tabata | Minimal | Agility & cardio |

**Rank Scaling:**

| Rank | Exercise Count | Complexity |
|------|----------------|------------|
| E-Rank | 2-3 | Basic (pushups, squats) |
| D-Rank | 3-4 | Intermediate |
| C-Rank | 4-5 | Challenging |
| B-Rank | 5-6 | Advanced |
| A-Rank | 6+ | Expert |
| S-Rank | 6+ | Elite (muscle-ups, pistol squats) |

### 8.2 The Judge (Evaluation Engine)

**Technology:** Opik (LLM-as-Judge) + Custom Rules Engine  
**Purpose:** Evaluate workout completion, detect cheating, award XP

**Evaluation Metrics:**

| Metric | Weight | Description |
|--------|--------|-------------|
| Integrity Score | 40% | Statistical possibility check |
| Effort Score | 30% | RPE comparison (target vs actual) |
| Safety Score | 20% | Did user respect limitations? |
| Synergy Bonus | 10% | Workout matches user class? |

**XP Formula:**
```
Final_XP = (Base_XP + Volume_Bonus) × 
           (Integrity × Effort × Safety × Synergy × Streak × HunterStatus × ProofBonus)
```

**Cheat Detection Thresholds:**

| Exercise | Physical Limit | Flag Threshold |
|----------|---------------|----------------|
| Pushups | 80 reps/min | > 100 reps/min |
| Squats | 60 reps/min | > 80 reps/min |
| Plank | 10 min (trained) | > 15 min (E-Rank) |
| Running | 2:30/km (elite) | < 2:00/km |

---

## 9. Game Mechanics

### 9.1 XP & Leveling System

**Exponential Curve Formula:**
```
XP_Required = 100 × Level^1.588
```

**Level Thresholds:**

| Level | Total XP Required | Approx. Workouts |
|-------|-------------------|------------------|
| 1 | 0 | Start |
| 5 | 1,200 | ~8 |
| 10 | 3,900 | ~26 |
| 25 | 16,600 | ~110 |
| 50 | 50,000 | ~333 |

### 9.2 Rank System

| Rank | Level Range | XP Range | Badge Color |
|------|-------------|----------|-------------|
| E-Rank | 1-10 | 0 - 3,900 | Gray |
| D-Rank | 11-20 | 3,900 - 10,000 | White |
| C-Rank | 21-30 | 10,000 - 22,000 | Cyan |
| B-Rank | 31-40 | 22,000 - 35,000 | Blue |
| A-Rank | 41-48 | 35,000 - 45,000 | Purple |
| S-Rank | 49+ | 45,000+ | Gold |

### 9.3 Stats System

**Core Stats:**

| Stat | Affected By | Visual |
|------|-------------|--------|
| Strength | Push/Pull exercises, heavy loads | Red in radar |
| Agility | Speed work, HIIT, cardio | Green in radar |
| Stamina | Endurance, high volume | Blue in radar |

**Stat Growth:** +1-3 points per completed quest, based on workout type

### 9.4 Streak System

| Streak Length | Bonus |
|---------------|-------|
| 3 days | +5% XP |
| 7 days | +10% XP |
| 14 days | +15% XP |
| 30 days | +20% XP + Badge |
| 100 days | +25% XP + Title |

### 9.5 Penalty System

**Missed Workout Consequences:**
- Streak resets to 0
- Next quest becomes a "Penalty Quest" (harder, less XP)
- Visible "streak broken" indicator

---

## 10. Anti-Cheat System

### The Three Layers of Defense

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   LAYER 1: OPIK FILTER (Automated)                         │
│   ├── Statistical impossibility detection                  │
│   ├── Time-to-volume analysis                              │
│   └── Instant rejection of impossible claims               │
│                                                             │
│   LAYER 2: SOCIAL AUDIT (Community)                        │
│   ├── Public match history (like Valorant)                 │
│   ├── Report suspicious activity button                    │
│   └── Community pressure deters cheating                   │
│                                                             │
│   LAYER 3: GATEKEEPER (Rank-Up Exams)                      │
│   ├── Video proof required for rank promotions             │
│   ├── Hand sign requirement for freshness                  │
│   └── Verification before rank advancement                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Hunter Status System

| Status | Badge | XP Modifier | Leaderboard | Trigger |
|--------|-------|-------------|-------------|---------|
| Normal | Gray | 1.0x | Visible | Default |
| Verified | Cyan ✓ | 1.1x | Visible | 5+ proofs uploaded |
| Flagged | Yellow ⚠ | 0.8x | Warning shown | 3+ reports |
| Corrupted | Red ☠ | 0.0x | **BANNED** | 5+ reports |

### Proof System

| Quest Type | Proof Required | Proof Type |
|------------|----------------|------------|
| Daily Quest | Optional | Photo/Video |
| Rank-Up Exam | **Mandatory** | Video with hand sign |
| Special Quest | Recommended | Photo/Video |

---

## 11. Technical Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 | App Router, Server Components |
| React 18 | UI Components |
| TypeScript | Type Safety |
| Tailwind CSS | Styling (Dark mode only) |
| Framer Motion | Animations |
| Recharts | Status Window (Radar Chart) |
| Sonner | Toast Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Next.js Server Actions | API mutations |
| Supabase | Database (PostgreSQL) |
| Supabase Auth | Authentication |
| Supabase Storage | Proof media storage |
| Supabase RLS | Row-level security |

### AI/ML
| Technology | Purpose |
|------------|---------|
| Groq (Llama-3-70B) | Quest generation |
| Opik (Comet) | LLM-as-Judge evaluation |
| Zod | Runtime validation |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| Vercel | Hosting & deployment |
| Supabase Cloud | Database hosting |
| GitHub | Version control |

---

## 12. Competitive Analysis

### Direct Competitors

| App | Strengths | Weaknesses | ASCEND Advantage |
|-----|-----------|------------|------------------|
| **Habitica** | Full RPG system, quests | Complex, outdated UI | Modern UI, AI personalization |
| **JEFIT** | Workout tracking, social | No gamification | Full RPG progression |
| **Freeletics** | AI-generated workouts | Subscription-heavy, no RPG | Gamified + free core |
| **Duolingo (model)** | Streak psychology | Not fitness | Apply same psychology to fitness |

### Indirect Competitors

| Category | Examples | ASCEND Differentiation |
|----------|----------|------------------------|
| Fitness Trackers | Strava, Nike Run | Not just tracking — progression system |
| Workout Apps | Strong, Hevy | Gamification layer |
| Habit Apps | Streaks, Habitify | Fitness-specific with AI |

### Competitive Moat

```
1. AI-Powered Personalization (Groq)
   └── Dynamic quests, not static programs

2. Anti-Cheat System (Opik + Social)
   └── Trustworthy progression = meaningful achievement

3. RPG Depth
   └── Classes, ranks, stats, leaderboards

4. Solo Leveling-Inspired Aesthetic
   └── Appeals to anime/gaming demographic
```

---

## 13. Business Model

### Phase 1: MVP (Current)
**Model:** Free  
**Goal:** User acquisition, product validation

### Phase 2: Monetization (Future)

| Revenue Stream | Description | Price Point |
|----------------|-------------|-------------|
| **ASCEND Pro** | Premium features subscription | $9.99/month |
| **Cosmetics** | Badge styles, profile themes | $1.99-4.99 |
| **Class Unlocks** | Additional class archetypes | $4.99 |
| **Seasonal Passes** | Time-limited challenges | $4.99/season |

### ASCEND Pro Features (Future)

- Advanced analytics & insights
- Custom quest parameters
- Priority quest generation
- Exclusive rank badges
- Ad-free experience
- Unlimited proof storage

### Unit Economics Target

| Metric | Target |
|--------|--------|
| CAC | < $5 |
| LTV | > $50 |
| LTV:CAC | > 10:1 |
| Monthly Churn | < 5% |

---

## 14. Success Metrics

### North Star Metric
> **Weekly Active Quests Completed**
> 
> Users who complete at least 3 quests per week are considered "activated"

### Primary KPIs

| Metric | Definition | Target (Month 1) |
|--------|------------|------------------|
| DAU/MAU | Daily/Monthly active ratio | > 30% |
| Quest Completion Rate | Quests completed / generated | > 70% |
| D7 Retention | Users returning after 7 days | > 40% |
| D30 Retention | Users returning after 30 days | > 20% |
| Average Streak | Mean consecutive days | > 5 days |

### Secondary KPIs

| Metric | Definition | Target |
|--------|------------|--------|
| Onboarding Completion | Finish all 4 steps | > 80% |
| Proof Upload Rate | Quests with proof attached | > 10% |
| Report Rate | Reports per 1000 users | < 5 |
| NPS | Net Promoter Score | > 50 |

### Engagement Benchmarks

| User Segment | Quests/Week | Description |
|--------------|-------------|-------------|
| Casual | 1-2 | Weekend warriors |
| Regular | 3-4 | Building habit |
| Dedicated | 5-6 | Committed hunters |
| Elite | 7+ | Daily grinders |

---

## 15. Product Roadmap

### Phase 1: MVP (Feb 2026) ✅ CURRENT

| Feature | Status |
|---------|--------|
| User authentication | ✅ Done |
| Onboarding wizard | ✅ Done |
| Quest generation (Groq) | ✅ Done |
| Quest execution flow | ✅ Done |
| XP & leveling system | ✅ Done |
| Judge evaluation (Opik) | ✅ Done |
| Dashboard & status window | ✅ Done |
| Leaderboard | ✅ Done |
| Public profiles | ✅ Done |
| Match history | ✅ Done |
| Level-up effects | ✅ Done |
| Report system | ✅ Done |

### Phase 2: Anti-Cheat & Polish (Feb 2026)

| Feature | Status | Priority |
|---------|--------|----------|
| Proof upload component | Pending | P0 |
| Rank-up exam flow | Pending | P0 |
| Auto-flag triggers | Pending | P1 |
| Demo & testing | Pending | P0 |

### Phase 3: Social & Engagement (Q2 2026)

| Feature | Description |
|---------|-------------|
| Friend system | Add friends, compare stats |
| Guilds/Clans | Team-based challenges |
| Weekly challenges | Limited-time events |
| Achievement badges | Milestone rewards |
| Push notifications | Smart engagement reminders |

### Phase 4: Advanced Features (Q3 2026)

| Feature | Description |
|---------|-------------|
| Nutrition tracking | "Potion" system |
| Wearable integration | Apple Watch, Fitbit |
| Video form check | AI-powered form analysis |
| Voice log submission | Speak your workout report |
| Custom quest builder | Create & share quests |

### Phase 5: Monetization (Q4 2026)

| Feature | Description |
|---------|-------------|
| ASCEND Pro subscription | Premium tier |
| Cosmetic store | Badges, themes |
| Seasonal passes | Limited-time content |

---

## 16. Brand Guidelines

### Brand Identity

| Element | Value |
|---------|-------|
| **Name** | ASCEND: FITNESS RPG |
| **Tagline** | "Your Daily Mandate to Become S-Rank" |
| **Voice** | Authoritative, cold, efficient, motivating |
| **Personality** | The System is not a friend — it's a commander |

### The System's Voice

```
DO SAY:
✓ "Quest assigned. Execute protocol."
✓ "Weakness detected. Adaptation required."
✓ "Performance acknowledged. XP dispensed."
✓ "Anomaly detected. Data rejected."

DON'T SAY:
✗ "Great job! You're doing amazing!"
✗ "Don't worry, you'll get it next time!"
✗ "Here's a fun workout for you!"
```

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `void-deep` | #050505 | Primary background |
| `void-panel` | #0a0a0f | Card backgrounds |
| `system-cyan` | #00FFFF | Primary accent |
| `system-blue` | #00b8ff | Secondary accent |
| `rank-e` | #6b7280 | E-Rank (gray) |
| `rank-d` | #9ca3af | D-Rank (silver) |
| `rank-c` | #55ead4 | C-Rank (cyan) |
| `rank-b` | #00b8ff | B-Rank (blue) |
| `rank-a` | #bd00ff | A-Rank (purple) |
| `rank-s` | #f3e600 | S-Rank (gold) |

### Typography

| Type | Font | Usage |
|------|------|-------|
| Display | Space Grotesk / Bebas Neue | Headers, rank titles |
| Body | Inter | All body text |
| Mono | JetBrains Mono / Geist Mono | Stats, numbers, XP |

### Design Principles

1. **Dark Mode Only** — No light theme
2. **Neon on Void** — Bright accents on deep black
3. **Information Dense** — Show all relevant data
4. **Mechanical Motion** — Snappy springs, not bouncy
5. **Glassmorphism** — Frosted panels, subtle borders

---

## 17. Risks & Mitigations

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Groq API downtime | High | Low | Fallback quest system |
| Opik latency | Medium | Medium | Async evaluation, optimistic UI |
| Supabase limits | Medium | Low | Connection pooling |
| AI hallucination | Medium | Medium | Zod validation + fallbacks |

### Product Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low retention | High | Medium | Strong onboarding, streak mechanics |
| Cheating undermines trust | High | Medium | Three-layer anti-cheat |
| Complexity overwhelms users | Medium | Low | Progressive disclosure |
| Legal/copyright issues | High | Low | Original branding, no copyrighted assets |

### Market Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Competitor copies features | Medium | Medium | Build community moat |
| Market saturation | Medium | High | Unique positioning (RPG + AI) |
| Economic downturn | Low | Medium | Free core tier |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Hunter** | User of the app |
| **Quest** | Daily workout assignment |
| **Mandate** | Synonym for quest (authoritative) |
| **The System** | The AI persona governing the app |
| **The Architect** | AI agent that generates workouts |
| **The Judge** | AI agent that evaluates performance |
| **XP** | Experience points earned from quests |
| **Rank** | Tier classification (E through S) |
| **Class** | User archetype (Novice/Striker/Tank/Assassin) |
| **Status Window** | Hexagonal stat display |
| **Match History** | Public workout log |
| **Hunter Status** | Trust level (Normal/Verified/Flagged/Corrupted) |
| **Proof** | Photo/video evidence of workout |
| **Streak** | Consecutive days of quest completion |
| **Penalty Quest** | Punishment for missed workouts |

---

## Appendix B: User Stories

### Epic: Onboarding

```
As a new user,
I want to go through an "awakening" experience,
So that I feel like I'm entering a game world, not just another app.

Acceptance Criteria:
- 4-step wizard with progress indicator
- Initial rank assignment based on fitness test
- Class selection with clear descriptions
- "System" voice throughout
```

### Epic: Daily Quest

```
As a Hunter,
I want to receive a personalized daily quest,
So that I always have a workout ready for my situation.

Acceptance Criteria:
- Quest adapts to my class and rank
- Respects time constraints
- Avoids sore muscle groups
- Provides clear instructions
```

### Epic: Progression

```
As a Hunter,
I want to see my XP, level, and rank improve,
So that I feel a sense of achievement and progress.

Acceptance Criteria:
- XP bar with visual fill
- Level-up celebration animation
- Rank-up with dramatic reveal
- Stats visible in hexagon chart
```

### Epic: Anti-Cheat

```
As an honest Hunter,
I want cheaters to be caught and punished,
So that my achievements feel meaningful.

Acceptance Criteria:
- Impossible stats rejected
- Public match history creates accountability
- Report button for suspicious activity
- Visual indicators for flagged users
```

---

## Appendix C: FAQ

**Q: Why "ASCEND"?**
A: It captures the core experience — rising through the ranks, climbing the hierarchy, becoming stronger. Simple, memorable, and motivating.

**Q: How is this different from Habitica?**
A: ASCEND is fitness-focused with AI-generated workouts, modern UI, and a three-layer anti-cheat system. Habitica is a general habit tracker with dated graphics.

**Q: Why dark mode only?**
A: The aesthetic is core to the brand. "The System" is a dark, mysterious entity. Light mode would break the immersion.

**Q: How do you prevent cheating?**
A: Three layers — AI detection (Opik), social pressure (public history), and proof requirements (rank-up exams).

**Q: What if the AI generates a bad workout?**
A: Fallback system + Zod validation. Users can also provide feedback, which improves future generations.

---

*Document Version: 1.0*  
*Product: ASCEND: FITNESS RPG*  
*Status: Active Development*  
*Last Updated: February 2, 2026*
