# ASCEND: FITNESS RPG

> **Turn Workouts into Epic Quests**

---

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tech Stack](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tech Stack](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)
![Tech Stack](https://img.shields.io/badge/Groq-LLM-ff0066?style=for-the-badge&logo=groq)
![Tech Stack](https://img.shields.io/badge/OPIK-AI-00a67e?style=for-the-badge&logo=opik)

---

## 🎯 What is ASCEND?

ASCEND is a gamified fitness app that transforms workouts into epic RPG quests. Complete AI-generated workouts, earn XP, level up, and climb hunter rankings from E to S rank. Train solo or compete with hunters worldwide in Hunter Network.

## 💡 The Problem

- **Lack of Motivation**: Generic workout apps fail to keep users engaged
- **No Progress Tracking**: Users can't see measurable improvement over time
- **No Community**: Solo workouts lack the social motivation and competition
- **Generic Workouts**: One-size-fits-all programs don't adapt to individual needs

## ✨ The Solution

### 1. AI-Powered Personalization
Groq LLM (Llama 3.3 70B) generates unlimited personalized workout variations based on your rank, class, equipment, and goals.

### 2. Fair Quest Evaluation with OPIK AI
OPIK AI (LLM-as-a-Judge) evaluates your workout completion with multi-factor scoring - form quality, effort level, and consistency. Every XP reward is fair and transparent.

### 3. Anti-Cheat System
Proof uploads, time anomaly detection, and community reporting ensure fair competition across all ranks.

### 4. Social Hunter Network
Strava-inspired feed shows quest completions from other hunters. Give kudos and respects, track your friends, and compete on leaderboards.

## 🏆 What Makes ASCEND Unique

| Feature | Benefit |
|---------|---------|
| **OPIK AI Transparency** | Full traceability of every AI evaluation - see exactly how your XP is calculated |
| **Unlimited Quest Variety** | AI generates unique workouts - never repeat the same quest twice |
| **Fair Competition** | Multi-factor evaluation prevents cheating and ensures XP reflects actual effort |
| **Progressive Difficulty** | E-S rank system scales quests to your fitness level |
| **Class Specialization** | Tank (strength), Striker (speed), Assassin (agility) playstyles |

## 📊 Quick Stats

- **40 Demo Accounts**: Explore ASCEND at different rank levels
- **6 Hunter Ranks**: E → D → C → B → A → S progression
- **3 Hunter Classes**: Tank, Striker, Assassin specializations
- **3 Evaluation Factors**: Form (40%), Effort (30%), Consistency (30%)
- **XP Multipliers**: 0.8x to 1.5x based on performance quality

## 🚀 Quick Start

**Try Demo Accounts (2 minutes):**

| Rank | Username | Email | Password | Level | XP |
|------|----------|-------|----------|-------|-----|
| S-Rank | ShadowHunter | shadowhunter@test.com | Test123! | 95 | 245,000 |
| A-Rank | ThunderStrike | thunderstrike@test.com | Test123! | 78 | 156,000 |
| B-Rank | SwiftWolf | swiftwolf@test.com | Test123! | 52 | 104,000 |
| C-Rank | SwiftNinja | swiftninja@test.com | Test123! | 22 | 44,000 |

[View All Demo Accounts](./getting-started/demo-accounts.md)

## 🎮 Key Features

### Quest System
- AI-generated personalized workouts
- Dynamic difficulty (E-S ranks)
- Class-specific exercises
- Warm-up and cool-down routines
- Real-time exercise tracking

### Hunter Ranks
- **E-Rank** (1-30): Beginner bodyweight exercises
- **D-Rank** (31-60): Basic equipment workouts
- **C-Rank** (61-90): Intermediate exercises
- **B-Rank** (91-120): Advanced multi-exercise
- **A-Rank** (121-150): Complex high-intensity
- **S-Rank** (151+): Elite performance quests

### XP System
- Base XP varies by quest difficulty (50-4,000)
- AI judge applies multiplier (0.8x - 1.5x) based on performance
- Track XP history and progression over time
- Level up and rank up as you progress

### Social Features
- **Hunter Network Feed**: See what other hunters are completing
- **Kudos & Respects**: Give recognition (respects = 5x value)
- **Leaderboards**: Global, rank-specific, and class-specific rankings
- **Friends System**: Connect and compete with other hunters

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18+
- **State Management**: React Context + Custom Hooks
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion

### Backend
- **Database**: Supabase (PostgreSQL 15)
- **Authentication**: Supabase Auth (OAuth + Email/Password)
- **Storage**: Supabase Storage (Proof uploads)
- **Serverless**: Supabase Edge Functions

### AI Services
- **Quest Generation**: Groq LLM (Llama 3.3 70B)
- **Quest Evaluation**: OPIK AI (LLM-as-a-Judge)
- **Observability**: OPIK Tracing & Monitoring

---

*Last Updated: February 10, 2026*
