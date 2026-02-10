# Developer Resources

> **Technical Documentation for Developers**

---

## Overview

This section contains detailed technical documentation for developers working on ASCEND: FITNESS RPG. For user-facing documentation, see the [Getting Started](../getting-started/) and [Features](../features/) sections.

---

## Available Documentation

### Code Examples
- [Components](./components.md) - Reusable React components
- [Hooks](./hooks.md) - Custom React hooks
- [Server Actions](./server-actions.md) - Next.js server actions

### Testing
- [Unit Testing](./unit-testing.md) - Testing guide and best practices

### Security
- [RLS Implementation](./rls-implementation.md) - Row-Level Security policies

### Performance
- [Frontend Optimization](./frontend-optimization.md) - Performance techniques

---

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/          # Main dashboard pages
│   ├── auth/              # Authentication pages
│   ├── feed/              # Social feed
│   ├── leaderboard/        # Leaderboard
│   ├── profile/           # User profile
│   └── help/             # Help center
├── components/            # Reusable components
├── lib/                  # Utility libraries
│   ├── ai/              # AI integration (Groq, OPIK)
│   ├── constants/        # App constants
│   ├── db/              # Database utilities
│   └── utils/           # Helper functions
├── server/               # Server actions
│   ├── quest-actions.ts
│   ├── log-actions.ts
│   ├── report-actions.ts
│   └── ...
├── supabase/            # Database migrations
├── types/               # TypeScript types
└── public/              # Static assets
```

---

## Key Libraries & Tools

### Frontend
```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "framer-motion": "latest",
  "lucide-react": "latest",
  "zod": "latest",
  "zustand": "latest"
}
```

### Backend
```json
{
  "@supabase/supabase-js": "latest",
  "supabase": "latest",
  "groq-sdk": "latest",
  "opik": "latest"
}
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Groq AI
GROQ_API_KEY=your-groq-api-key

# OPIK AI
OPIK_API_KEY=your-opik-api-key
OPIK_PROJECT_NAME=ascend-fitness-rpg

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Getting Started for Developers

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase account

### Installation
```bash
# Clone repository
git clone https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP
cd ASCEND-RPG-FITNESS-APP

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

---

## API Endpoints

### Server Actions (Internal)
- `generateQuestAction` - Generate AI-powered quest
- `completeQuestAction` - Complete quest with proof
- `submitReportAction` - Submit community report
- `uploadProofAction` - Upload proof to Supabase

### API Routes (External)
- `/api/quests/generate` - Quest generation endpoint
- `/api/opik/evaluate` - OPIK AI evaluation
- `/api/opik/traces` - Retrieve OPIK traces

---

## Database Schema

### Key Tables
- **profiles** - User profiles and stats
- **quests** - Generated quests
- **match_history** - Quest completions
- **social_feed** - Social posts
- **friends** - Friend relationships
- **reports** - Community reports

### Relationships
- profiles → quests (one-to-many)
- profiles → match_history (one-to-many)
- profiles → social_feed (one-to-many)
- match_history → quests (many-to-one)

---

## AI Integration

### Groq LLM
```typescript
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const response = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [{ role: 'user', content: prompt }],
  temperature: 0.7,
  max_tokens: 1000,
});
```

### OPIK AI
```typescript
import { getOpikClient } from '@/lib/ai/opik';

const opik = getOpikClient();

const trace = opik.trace({
  name: 'quest_evaluation',
  input: { questId, userId, performance },
  output: { score, multiplier, feedback },
});
```

---

## Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Write unit tests for new features
- Document complex functions with JSDoc

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name
```

---

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

---

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Supabase
- Configure database migrations
- Set up RLS policies
- Configure storage buckets

---

## Support

- **Documentation**: See other sections for user guides
- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions in GitHub Discussions

---

*Last Updated: February 10, 2026*
