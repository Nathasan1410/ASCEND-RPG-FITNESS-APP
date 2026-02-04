# ASCEND: FITNESS RPG

> **Turn Workouts into Epic Quests**

---

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tech Stack](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tech Stack](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)
![Tech Stack](https://img.shields.io/badge/Groq-LLM-ff0066?style=for-the-badge&logo=groq)
![Tech Stack](https://img.shields.io/badge/Opik-AI-00a67e?style=for-the-badge&logo=opik)

---

## 🎯 Project Overview

ASCEND is a gamified fitness app that transforms workouts into epic RPG quests. Users complete AI-generated workouts, earn XP, level up, and climb hunter rankings from E to S rank. Train solo or compete with hunters worldwide in Hunter Network.

### Problem Solved

- **Lack of Motivation**: Gamification keeps users engaged through XP, levels, and ranks
- **No Progress Tracking**: Comprehensive stats and leaderboards show progress over time
- **No Community**: Hunter Network feed connects fitness enthusiasts worldwide
- **Generic Workouts**: AI generates personalized quests based on goals, equipment, and class

### Key Innovations

1. **AI-Powered Quest Generation**: Groq LLM creates unlimited personalized workout variations
2. **AI Judge with Opik Integration**: Multi-factor evaluation with full transparency
3. **Anti-Cheat Verification System**: Proof uploads + automated detection ensures fair competition
4. **Social Hunter Network**: Strava-inspired feed with kudos, respects, and real-time leaderboard
5. **Transparent AI Monitoring**: Opik traces all AI interactions with privacy-first approach

---

## 🚀 Quick Start

### Try Demo Accounts (2 minutes)

We provide 40 demo accounts to explore ASCEND at different rank levels:

| Rank | Username | Email | Password | Level | XP |
|------|----------|-------|----------|-------|-----|
| S-Rank | ShadowHunter | shadowhunter@test.com | Test123! | 95 | 245,000 |
| A-Rank | ThunderStrike | thunderstrike@test.com | Test123! | 78 | 156,000 |
| B-Rank | SwiftWolf | swiftwolf@test.com | Test123! | 52 | 104,000 |
| C-Rank | SwiftNinja | swiftninja@test.com | Test123! | 22 | 44,000 |

[View All 24 Demo Accounts](./1-Getting-Started/demo-accounts.md)

### Local Setup (10 minutes)

```bash
# Clone repository
git clone https://github.com/username/ASCEND-RPG-FITNESS-APP
cd ASCEND-RPG-FITNESS-APP

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

---

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React Components]
        State[React Context + Hooks]
        Router[Next.js App Router]
        Styles[Tailwind CSS]
    end

    subgraph "Backend Layer"
        Auth[Supabase Auth]
        DB[(PostgreSQL Database]
        Storage[Supabase Storage]
        Edge[Supabase Edge Functions]
    end

    subgraph "AI Layer"
        QuestGen[Groq LLM - Quest Generation]
        Judge[Opik AI Judge]
        Tracing[Opik Observability]
    end

    UI --> Router
    Router --> State
    Router --> Auth
    Router --> DB
    Auth --> Edge
    Edge --> DB
    Storage --> DB
    State --> QuestGen
    Edge --> Judge
    Judge --> Tracing

    style UI fill:#00FFFF
    style DB fill:#3ECF8E
    style QuestGen fill:#FF0066
    style Judge fill:#00A67E
    style Tracing fill:#00D1B2
```

### Tech Stack

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18+
- **State Management**: React Context + Custom Hooks
- **Styling**: Tailwind CSS 3.4
- **Animation**: Framer Motion
- **Icons**: Lucide React

#### Backend
- **Database**: Supabase (PostgreSQL 15)
- **Authentication**: Supabase Auth (OAuth + Email/Password)
- **Storage**: Supabase Storage (Proof uploads)
- **Serverless**: Supabase Edge Functions

#### AI Services
- **Quest Generation**: Groq LLM (Llama 3.3 70B)
- **Quest Evaluation**: Opik AI (Comet platform)
- **Observability**: Opik Tracing & Monitoring

---

## 📚 Documentation Sections

### 1. Getting Started
- [Quick Start](./1-Getting-Started/quick-start.md)
- [Installation Guide](./1-Getting-Started/installation.md)
- [Demo Accounts](./1-Getting-Started/demo-accounts.md)
- [How to Complete Your First Quest](./1-Getting-Started/how-to-complete-your-first-quest.md)
- [Understanding the Hunter Ranking System](./1-Getting-Started/understanding-the-hunter-ranking-system.md)

### 2. Architecture
- [System Overview](./2-Architecture/system-overview.md)
- [Frontend Architecture](./2-Architecture/frontend-architecture.md)

### 3. Database
- [Schema](./3-Database/schema.md)
- [Relationships](./3-Database/relationships.md)
- [RLS Policies](./3-Database/rls-policies.md)

### 4. Features
- [Quest System](./4-Features/quest-system.md)
- [Gamification](./4-Features/gamification.md)
- [Social Feed](./4-Features/social-feed.md)
- [Anti-Cheat](./4-Features/anti-cheat.md)

### 5. Security
- [Authentication](./5-Security/authentication.md)
- [RLS Implementation](./5-Security/rls-implementation.md)
- [API Security](./5-Security/api-security.md)
- [Proof Validation](./5-Security/proof-validation.md)

### 6. Performance
- [Frontend Optimization](./6-Performance/frontend-optimization.md)
- [Opik Monitoring](./6-Performance/opik-monitoring.md)

### 7. AI Implementation
- [Groq Quest Generation](./7-AI-Implementation/groq-quest-generation.md)
- [Opik AI Judge](./7-AI-Implementation/opik-ai-judge.md)
- [Trace Implementation](./7-AI-Implementation/trace-implementation.md)

### 8. Testing
- [Unit Testing](./8-Testing/unit-testing.md)
- [Integration Testing](./8-Testing/integration-testing.md)

### 9. Code Examples
- [Server Actions](./9-Code-Examples/server-actions.md)
- [Components](./9-Code-Examples/components.md)
- [Hooks](./9-Code-Examples/hooks.md)

### 10. Innovation
- [Key Innovations](./10-Innovation/key-innovations.md)
- [Future Roadmap](./10-Innovation/future-roadmap.md)

---

## 🎮 Core Features

### Quest System
- **AI-Powered Generation**: Personalized quests based on goals, equipment, and class
- **Dynamic Difficulty**: Adapts to user's rank (E → S)
- **Class Specialization**: Tank (strength), Striker (speed), Assassin (agility)
- **Proof Uploads**: Photo/video verification for anti-cheat
- **AI Judge Evaluation**: Multi-factor scoring (form, effort, consistency)

### Gamification
- **XP & Levels**: Earn XP for completing quests and climbing levels
- **Hunter Ranks**: E → D → C → B → A → S rank progression
- **Achievements**: Unlock badges for milestones and challenges
- **Streaks**: Track daily quest completion streaks

### Social Features
- **Hunter Network Feed**: Social feed showing quest completions from other hunters
- **Kudos and Respects**: Give recognition for achievements (respects = 5x value)
- **Following System**: Connect with other hunters and track their progress
- **Comments and Tags**: Interact with posts and add context

### Leaderboard
- **Global Rankings**: All hunters ranked by total XP
- **Rank-Specific**: Compare with hunters at your current rank
- **Class-Specific**: Rankings by Tank, Striker, and Assassin
- **Time Period Filters**: Daily, weekly, monthly, and all-time

### Anti-Cheat System
- **Proof Uploads**: Required for XP reward
- **AI Judge Evaluation**: Multi-factor scoring determines XP multiplier
- **Time Anomaly Detection**: Flag suspiciously fast completions
- **XP Limit Enforcement**: Prevent impossible XP gains
- **Community Reports**: Users can report suspicious activity

---

## 🔒 Security & Privacy

### Row-Level Security (RLS)
All database tables have RLS policies:
- Users can only see their own data
- XP cannot be manipulated by others
- Proof uploads are private to user
- Leaderboard shows anonymized data

### Hunter Status System
- **Normal**: Gray badge, 1.0x XP, visible on leaderboards
- **Verified**: Cyan badge, 1.1x XP, trusted status
- **Flagged**: Yellow badge, 0.8x XP, warning on profile
- **Corrupted**: Red badge, 0.0x XP, banned from leaderboards

---

## 🤖 AI Implementation

### Groq Quest Generation
- **Model**: Llama 3.3 70B for fast inference
- **Personalization**: Based on user's rank, class, equipment, goals
- **Response Format**: Structured JSON with quest details and exercises
- **Validation**: Zod schema validation ensures correct format

### Opik AI Judge
- **Multi-Factor Evaluation**:
  - Form Quality (40% weight): Exercise technique from proof
  - Effort Level (30% weight): Consistency and intensity
  - Consistency (30% weight): Comparison to historical performance
- **XP Multiplier**: 0.8x (E) to 1.5x (S) based on overall score
- **Feedback**: Personalized tips for improvement

### Opik Tracing
All AI operations are traced to Opik:
- Quest generation requests
- AI judge evaluations
- Performance metrics
- Error tracking

[Learn About Opik](./7-AI-Implementation/opik-ai-judge.md)

---

## 📊 Key Innovations

### 1. AI-Powered Quest Personalization
Groq LLM generates unlimited personalized workout variations based on:
- Current rank (E-S)
- Available equipment
- Fitness goals
- Class specialization

### 2. AI Judge with Continuous Learning
Multi-factor evaluation with transparency:
- Form, effort, and consistency scoring
- Personalized feedback generation
- Performance metrics tracking

### 3. Anti-Cheat Verification System
Multi-layer defense ensuring fair competition:
- Proof uploads (photo/video)
- Time anomaly detection
- XP limit enforcement
- Community reporting system

### 4. Transparent AI Monitoring with Opik
Privacy-first approach with full transparency:
- What we track (quest generation, AI judge, performance, errors)
- What we don't track (personal data, conversations, biometrics)
- User rights (know, control, access, delete)

---

## 📖 Future Roadmap

### Coming Soon
- AI Chatbot: Real-time fitness coaching
- Nutrition Tracking: AI-powered macro estimation
- IoT Scale Tracking: Bluetooth devices, supplements, body composition
- Gym Tools Integration: Technogym, Peloton, iFit, Echelon
- Better Stats Tracker: GitHub-style graphs
- Social Media Integration: Instagram, TikTok, Twitter/X, Strava
- Custom Workout Builder: Build your own workouts
- Guild Features: Dungeons, raids, boss battles, territory wars
- Monetization System: Free/Pre/Pro/Max tiers
- Leaderboard 2.0: Multi-category with historical data
- Real-World Integration: Gym partnerships, IRL events
- Mobile Apps: iOS + Android
- Brand Evolution: Animated mascot, sound effects

### Long-Term Vision
- Complete fitness RPG ecosystem
- Community-driven content creation
- Partnerships with major gym chains
- Global fitness challenges
- Professional training certifications
- VR/AR workout experiences

---

*Last Updated: February 5, 2026*
