# ASCEND: FITNESS RPG - GitBook

> **Turn Workouts into Epic Quests**

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tech Stack](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tech Stack](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)
![Tech Stack](https://img.shields.io/badge/Groq-LLM-ff0066?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Opik-AI-00a67e?style=for-the-badge)

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

[View All 40 Demo Accounts](./1-Getting-Started/demo-accounts.md)

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

- **Hunter Network Feed**: Share quest completions, give kudos/respects
- **Real-time Leaderboard**: Global rankings by XP, level, and class
- **Following System**: Connect with other hunters
- **Community Reports**: Anti-cheat reporting system

### Progress Tracking

- **Stats Dashboard**: XP, level, rank, quests completed
- **Progress Graphs**: XP over time, completion rate trends
- **Weekly/Daily Views**: Detailed breakdowns of progress
- **Personal Records**: Track PRs and achievements

---

## 🔒 Security & Anti-Cheat

### Row-Level Security (RLS)

All database tables have RLS policies:
- Users can only see their own data
- XP cannot be manipulated by others
- Proof uploads are private to user
- Leaderboard shows anonymized data

### Anti-Cheat System

- **Proof Uploads**: Required for quest completion
- **Time Anomaly Detection**: Flag suspicious completion times
- **XP Limit Enforcement**: Prevent impossible XP gains
- **Community Reports**: Report suspicious activities

[Learn More About Security](./5-Security/rls-implementation.md)

---

## 🤖 AI Implementation

### Groq Quest Generation

```typescript
const SYSTEM_PROMPT = `You are an expert fitness trainer and RPG quest designer.

Generate personalized workout quests based on:
- User's current rank (E-S)
- Available equipment
- Fitness goals
- Time constraints

Response Format (JSON):
{
  "title": "Quest Name",
  "description": "Epic description",
  "difficulty": "B",
  "duration_minutes": 45,
  "exercises": [...],
  "xp_reward": 500
}`;
```

### Opik AI Judge

```typescript
interface JudgeOutput {
  xp_multiplier: number;      // 0.8x - 1.5x
  feedback: string;
  form_score: number;         // 0.0 - 1.0
  effort_score: number;       // 0.0 - 1.0
  consistency_score: number;   // 0.0 - 1.0
  overall_score: number;       // Weighted average
}
```

### Opik Tracing

All AI interactions are traced to Opik:
- Quest generation requests
- AI judge evaluations
- Performance metrics
- Error tracking

[View All Traces](./7-AI-Implementation/trace-implementation.md)

---

## 📊 Opik Integration

### What We Track

| Data Type | Purpose | Traced |
|-----------|---------|--------|
| Quest Generation Requests | Monitor AI performance | ✅ |
| AI Judge Evaluations | Track evaluation accuracy | ✅ |
| API Response Times | Identify bottlenecks | ✅ |
| Error Patterns | Proactive bug fixing | ✅ |

### What We Don't Track

| Data Type | Privacy Policy |
|-----------|---------------|
| Personal Workout Data | Not traced |
| User Conversations | Not traced |
| Biometric Data | Not traced |
| Private Information | Not traced |

### User Rights

- **Know**: See exactly what's tracked
- **Control**: Opt out of Opik tracking anytime
- **Access**: View your Opik traces
- **Deletion**: Request deletion of your traces

[Learn About Opik](./7-AI-Implementation/opik-ai-judge.md)

---

## 📚 Documentation Sections

### 1. Getting Started
- [Quick Start](./1-Getting-Started/quick-start.md)
- [Installation Guide](./1-Getting-Started/installation.md)
- [Demo Accounts](./1-Getting-Started/demo-accounts.md)

### 2. Architecture
- [System Overview](./2-Architecture/system-overview.md)
- [Frontend Architecture](./2-Architecture/frontend-architecture.md)
- [Backend Architecture](./2-Architecture/backend-architecture.md)
- [AI Integration](./2-Architecture/ai-integration.md)

### 3. Database
- [Schema](./3-Database/schema.md)
- [Relationships](./3-Database/relationships.md)
- [RLS Policies](./3-Database/rls-policies.md)
- [Optimization](./3-Database/optimization.md)

### 4. Features
- [Quest System](./4-Features/quest-system.md)
- [AI Judge](./4-Features/ai-judge.md)
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
- [Backend Optimization](./6-Performance/backend-optimization.md)
- [Opik Monitoring](./6-Performance/opik-monitoring.md)

### 7. AI Implementation
- [Groq Quest Generation](./7-AI-Implementation/groq-quest-generation.md)
- [Opik AI Judge](./7-AI-Implementation/opik-ai-judge.md)
- [Prompt Engineering](./7-AI-Implementation/prompt-engineering.md)
- [Trace Implementation](./7-AI-Implementation/trace-implementation.md)

### 8. Testing
- [Unit Testing](./8-Testing/unit-testing.md)
- [Integration Testing](./8-Testing/integration-testing.md)
- [Load Testing](./8-Testing/load-testing.md)

### 9. Code Examples
- [Server Actions](./9-Code-Examples/server-actions.md)
- [Components](./9-Code-Examples/components.md)
- [Hooks](./9-Code-Examples/hooks.md)
- [Utilities](./9-Code-Examples/utilities.md)

### 10. Innovation
- [Key Innovations](./10-Innovation/key-innovations.md)
- [Future Roadmap](./10-Innovation/future-roadmap.md)

---

## 🏆 Key Innovations

### 1. AI-Powered Quest Personalization

**Problem**: Generic workout apps don't adapt to users

**Solution**: Groq LLM generates unlimited quest variations personalized to:
- Current rank (E-S)
- Available equipment
- Fitness goals
- Class specialization

### 2. AI Judge with Continuous Learning

**Problem**: No feedback on workout quality

**Solution**: Multi-factor evaluation with Opik tracking
- Evaluates 3 factors: Form, Effort, Consistency
- Provides personalized feedback
- Tracks evaluation accuracy over time

### 3. Anti-Cheat Verification System

**Problem**: Fitness apps can be easily cheated

**Solution**: Multi-layer verification
- Proof upload requirement
- Time anomaly detection
- XP limit enforcement
- Community reporting system

### 4. Transparent AI Monitoring with Opik

**Problem**: Users don't trust black-box AI

**Solution**: Full transparency via Opik integration
- Shows exactly what's tracked
- Documents what's NOT tracked
- Provides user rights (know, control, access, deletion)

---

## 📈 Future Roadmap

### Coming Soon
- AI Chatbot: Real-time fitness coaching
- Nutrition Tracking: AI-powered macro estimation
- IoT Integration: Smart device support
- Custom Workouts: Build your own workouts
- Guild System: Team-based gameplay

### Long-Term Vision
- Mobile Apps (iOS & Android)
- Gym Equipment Integration
- Better Stats: GitHub-style graphs
- Social Media Integration
- Real-World Events

[View Full Roadmap](./10-Innovation/future-roadmap.md)

---

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Groq for providing the LLM API
- Opik for AI observability platform
- Supabase for backend infrastructure
- The Next.js team for amazing framework

---

**Built with ❤️ for the Commit To Change Hackathon**

*Last Updated: February 5, 2026*
