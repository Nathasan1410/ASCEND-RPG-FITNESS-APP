# Architecture

## Tech Stack

**Frontend:** Next.js 14 (App Router), React 18+, TypeScript 5, Tailwind CSS 3.4, Framer Motion, Lucide React

**Backend:** Supabase (PostgreSQL 15), Supabase Auth, Supabase Storage, Supabase Edge Functions

**AI:** Groq LLM (Llama 3.3 70B) for quest generation, OPIK AI (LLM-as-a-Judge) for evaluation, OPIK SDK for tracing

## Data Flow

Quest Generation: User clicks generate → Server action fetches profile → Groq LLM generates quest → Response validated with Zod → Quest saved to database → Quest displayed

Quest Evaluation: User completes quest → Proof uploaded to storage → OPIK AI evaluates (form 40%, effort 30%, consistency 30%) → Overall score calculated → XP multiplier applied → XP awarded → Trace logged

## Security

Row-Level Security (RLS) policies restrict data access. Users can only see own data. XP cannot be manipulated by others. Proof uploads private to user. Leaderboards show anonymized data.

## Database

**Key Tables:** profiles (user stats), quests (generated workouts), match_history (completions), social_feed (posts), friends (relationships), reports (community reports)

**Relationships:** profiles → quests (one-to-many), profiles → match_history (one-to-many), profiles → social_feed (one-to-many)

## Performance

Frontend: Code splitting, image optimization, lazy loading, memoization

Backend: Database indexes, connection pooling, caching, CDN for static assets

[Technical Details](./system-overview.md) • [Backend](./backend-architecture.md) • [Frontend](./frontend-architecture.md) • [Database](./schema.md)

---

*Last Updated: February 10, 2026*
