# Overview

<figure><img src="../.gitbook/assets/ascend-hero.png" alt=""><figcaption><p>ASCEND transforms fitness into an RPG adventure</p></figcaption></figure>

> Where Fitness Meets RPG - Level Up Through Real Workouts

## Video Introduction & Demo

[![ASCEND: Fitness RPG - Demo Video](https://img.youtube.com/vi/berWi_a0w0s/0.jpg)](https://youtu.be/berWi_a0w0s)

Watch the 3-minute demo video to see ASCEND in action.

## Important Links

| Link | Description |
| ---- | ----------- |
| [Live Demo](https://ascend-rpg-fitness.vercel.app/) | Live application demo |
| [How We Use OPIK AI](https://ascend-rpg-fitness.vercel.app/domain/best-of-OPIK) | Documentation on using OPIK AI |
| [Cost Planning](https://ascend-rpg-fitness.vercel.app/roadmap/cost-planning) | Cost planning and budget breakdown |
| [Monetization Model](https://ascend-rpg-fitness.vercel.app/roadmap/monetization-system) | Monetization strategy and model |
| [GitBook](https://nathasan1410.gitbook.io/ascend-fitness-rpg/) | Official documentation |
| [Roadmap](https://ascend-rpg-fitness.vercel.app/roadmap) | Project roadmap and milestones |
| [Help](https://ascend-rpg-fitness.vercel.app/roadmap) | Help and support resources |

## What is ASCEND?

ASCEND is a gamified fitness app that transforms workouts into RPG quests. Complete AI-generated workouts, earn XP, level up, and climb hunter rankings from E to S rank.

## Core Features

| Feature | Description |
| ------- | ----------- |
| **OPIK AI** | Multi-factor evaluation with XP multipliers (0.8x-1.5x) |
| **AI Quest Generation** | Groq LLM creates personalized workouts based on rank and class |
| **Anti-Cheat** | Proof uploads required, time anomaly detection |
| **Hunter Ranking** | Progress from E to S rank with leaderboards |
| **Social Network** | Hunter feed, kudos, and respects |

## Platform Architecture

| Layer | Technology | Purpose |
| ----- | ---------- | ------- |
| Frontend | Next.js 14, React 18, TypeScript 5 | User interface |
| Backend | Next.js API Routes, Supabase | Authentication, data |
| Database | PostgreSQL (Supabase) | User data, quests, XP |
| AI | Groq LLM (Llama 3.3 70B) | Quest generation |
| Evaluation | OPIK AI | Form, effort, consistency scoring |

## System Flow

```mermaid
graph LR
    A[Generate Quest] --> B[Complete Workout]
    B --> C[Upload Proof]
    C --> D[OPIK AI Evaluate]
    D --> E[Earn XP]
    E --> F[Level Up]

    style A fill:#00a67e
    style D fill:#00a67e
    style E fill:#f59e0b
```

## Quick Start

| Rank | Email | Password | Level | XP |
| ---- | ------ | -------- | ----- | -- |
| S | shadowhunter@test.com | Test123! | 95 | 245,000 |
| A | thunderstrike@test.com | Test123! | 78 | 156,000 |
| B | swiftwolf@test.com | Test123! | 52 | 104,000 |
| C | swiftninja@test.com | Test123! | 22 | 44,000 |

[View all 40 demo accounts →](../getting-started/demo-accounts.md)

---

*Last Updated: February 11, 2026*
