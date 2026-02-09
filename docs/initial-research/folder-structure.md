# 📂 Project Folder Structure (Next.js 14 App Router)

/app
  /auth             # Login/Register pages
  /dashboard        # Main User Dashboard (Stats, Daily Quest)
  /onboarding       # Class Selection & Initial Test
  /api              # (Minimal use, prefer Server Actions)
    /webhooks       # Only if needed
/components
  /ui               # Shadcn primitives (Button, Card, Dialog)
  /quest            # Specific: QuestCard, ExerciseList
  /gamification     # Specific: XPBar, RankBadge, HexagonStats
/lib
  /supabase         # client.ts, server.ts
  /ai               # groq.ts, opik.ts, prompts.ts
  /utils            # cn, gamification-math.ts
/server
  /actions          # Server Actions (createQuest, submitLog)