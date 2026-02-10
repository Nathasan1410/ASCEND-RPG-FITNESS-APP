# Developer Resources

## Documentation

[Code Examples](./components.md) - React components, hooks, server actions

[Testing](./unit-testing.md) - Unit testing guide

[Security](./rls-implementation.md) - Row-Level Security policies

[Performance](./frontend-optimization.md) - Optimization techniques

## Project Structure

**app/** - Next.js App Router (dashboard, feed, leaderboard, profile)

**components/** - Reusable React components

**lib/** - Utilities, AI integration (groq, opik), constants

**server/** - Server actions (quest, log, report, profile)

**supabase/** - Database migrations

**types/** - TypeScript types

**public/** - Static assets

## Key Libraries

**Frontend** - next, react, typescript, tailwindcss, framer-motion, lucide-react, zod, zustand

**Backend** - @supabase/supabase-js, supabase

**AI** - groq-sdk, opik

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GROQ_API_KEY=your-groq-api-key
OPIK_API_KEY=your-opik-api-key
```

## Getting Started

```bash
npm install
npm run dev
```

Available scripts: dev, build, start, lint, test
