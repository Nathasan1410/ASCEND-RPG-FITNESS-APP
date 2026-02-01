# THE SYSTEM - DOCUMENTATION INDEX
> **Version:** 2.0  
> **Last Updated:** Feb 1, 2026  
> **Changelog:** Added Anti-Cheat System documentation across all files

## Quick Reference

**Project:** The System - AI Hunter Gym  
**Duration:** 7 Days (Feb 1-8, 2026)  
**Total Hours:** ~55 hours estimated  

---

## Documentation Files

### Development Plan (`./docs/development-plan/`)

| File | Version | Purpose | Read When... |
|------|---------|---------|--------------|
| [MEGA-PLAN.md](./MEGA-PLAN.md) | v2.0 | Complete project plan with all phases | Starting the project |
| [MILESTONES.md](./MILESTONES.md) | v1.0 | Trackable milestone checklist | Tracking daily progress |
| [TIMELINE.md](./TIMELINE.md) | v1.0 | Hour-by-hour execution schedule | Planning your day |
| [REQUIREMENTS.md](./REQUIREMENTS.md) | v2.0 | Code-ready specifications | Writing actual code |
| [UI-Design-Plan.md](./UI-Design-Plan.md) | v1.0 | Visual design system | Building UI components |

### Initial Research (`./docs/initial-researcth/`)

| File | Version | Purpose |
|------|---------|---------|
| DB-Schema.md | v2.0 | Database tables, enums, RLS, triggers |
| Evaluation-Schema.md | v2.0 | Anti-cheat logic, XP formulas, Judge prompts |
| api-schema.md | v2.0 | TypeScript interfaces, Zod schemas |
| project-context.md | v2.0 | Project vision, game mechanics |
| ai-agent-build.md | v1.0 | Groq Architect agent specification |
| folder-structure.md | v1.0 | Project file organization |
| rules-and-constraints.md | v1.0 | Coding standards, anti-patterns |

---

## Anti-Cheat System Summary

The System implements a **Three-Layer Anti-Cheat Defense**:

### Layer 1: Opik Logic Filter (Automated)
- Statistical impossibility detection
- Runs on every quest submission
- Rejects physically impossible claims (e.g., 100 pushups in 10 seconds)

### Layer 2: Social Audit (Community)
- All workout logs are PUBLIC by default ("Match History")
- Users can report suspicious activity
- Hunter Status system: Normal → Verified → Flagged → Corrupted

### Layer 3: Gatekeeper (Rank-Up Exams)
- Video proof REQUIRED for rank promotions
- Hand sign verification for freshness
- Psychological deterrent even with auto-approval

### Hunter Status Effects

| Status | Badge | XP Modifier | Leaderboard |
|--------|-------|-------------|-------------|
| Normal | Gray | 1.0x | ✅ |
| Verified | Cyan ✓ | 1.1x | ✅ |
| Flagged | Yellow ⚠️ | 0.8x | ✅ (warning) |
| Corrupted | Red ☠️ | 0.0x | ❌ BANNED |

---

## Implementation Timeline Summary

```
DAY 1 ─────────────────────────────────────────────────
FOUNDATION (6-8 hrs)
├── Project init + Tailwind config
├── Supabase schema (5 tables with anti-cheat)
├── Auth setup + middleware
└── Core utilities (XP formula, Zod schemas)

DAY 2 ─────────────────────────────────────────────────
ONBOARDING (6-8 hrs)
├── Landing page with "Enter the System"
├── Auth modal (login/signup)
├── 4-step onboarding wizard
└── Initial rank calculation

DAY 3 ─────────────────────────────────────────────────
QUEST GEN PART 1 (6-8 hrs)
├── Groq client + Architect prompt
├── Quest generation function
├── Dashboard layout
└── Status Window (stats chart)

DAY 4 ─────────────────────────────────────────────────
QUEST GEN PART 2 (6-8 hrs)
├── Quest card + exercise list
├── Quest execution view
├── Rest timer + completion form
└── Exercise checklist

DAY 5 ─────────────────────────────────────────────────
JUDGE SYSTEM (6-8 hrs)
├── Opik integration (Logic Filter)
├── Integrity metrics (cheat detection)
├── XP calculation with multipliers
├── Level/rank-up logic
└── Rank-up proof requirement check

DAY 6 ─────────────────────────────────────────────────
SOCIAL & ANTI-CHEAT (6-8 hrs)
├── Public Match History page
├── Hunter Status badges
├── Proof upload (Supabase Storage)
├── Report system
├── Leaderboard (excludes Corrupted)
└── Rank-up exam flow

DAY 7 ──────────────────────────────────────────────
POLISH & DEMO (4-6 hrs)
├── Animations (level-up, rank-up)
├── Testing full user journey
├── Demo video recording
└── Final fixes
```

---

## Key Technical Decisions

### Architecture
- **Server-First:** Server Components by default, `'use client'` only for interactivity
- **Server Actions:** NO `/app/api/*` routes for mutations
- **Public Match History:** All logs visible by default (social pressure)

### Database
- **Supabase Postgres:** 5 tables (profiles, quests, logs, reports, rank_up_exams)
- **RLS Enabled:** All tables protected
- **Auto-Triggers:** Flag on reports, verify on proofs

### Anti-Cheat
- **Layer 1:** Opik statistical analysis
- **Layer 2:** Social pressure via public logs
- **Layer 3:** Video proof for rank-ups

### Gamification
- **XP Formula:** `100 * Level^1.588`
- **Multipliers:** Integrity * Effort * Synergy * Streak * HunterStatus * ProofBonus
- **Ranks:** E → D → C → B → A → S (based on level)

---

## Critical File Paths

```
/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── globals.css                 # System styles
│   ├── auth/
│   │   └── callback/route.ts       # OAuth handler
│   ├── onboarding/
│   │   ├── layout.tsx              # Focus layout
│   │   └── page.tsx                # Wizard
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard shell
│   │   ├── page.tsx                # Main hub
│   │   ├── quest/[id]/page.tsx     # Active quest
│   │   ├── leaderboard/page.tsx    # Rankings
│   │   └── profile/page.tsx        # User profile
│   └── profile/
│       └── [username]/page.tsx     # Public profile (Match History)
├── components/
│   ├── ui/                         # Base components
│   ├── quest/                      # Quest-related
│   ├── gamification/               # XP, Rank, Stats
│   └── profile/                    # Match history, badges
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser client
│   │   ├── server.ts               # Server client
│   │   └── storage.ts              # Proof upload helpers
│   ├── ai/
│   │   ├── groq.ts                 # Groq SDK
│   │   ├── opik.ts                 # Opik SDK
│   │   └── prompts.ts              # System prompts
│   ├── gamification/
│   │   ├── leveling.ts             # XP math
│   │   └── xp-calculator.ts        # Evaluation logic
│   └── utils.ts                    # cn() helper
├── server/
│   └── actions/
│       ├── profile-actions.ts      # Onboarding
│       ├── quest-actions.ts        # Generation
│       ├── log-actions.ts          # Submission
│       ├── leaderboard-actions.ts  # Rankings
│       ├── match-history-actions.ts # Public profiles
│       └── report-actions.ts       # Community reports
├── types/
│   ├── supabase.ts                 # Generated types
│   └── schemas.ts                  # Zod schemas
├── middleware.ts                   # Auth protection
└── tailwind.config.ts              # System theme
```

---

## Emergency Contacts & Resources

### APIs
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Groq Console:** https://console.groq.com
- **Opik Dashboard:** https://www.comet.com/opik

### Docs
- **Next.js 14:** https://nextjs.org/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Groq SDK:** https://console.groq.com/docs
- **Framer Motion:** https://www.framer.com/motion/

### UI References
- **Aceternity UI:** https://ui.aceternity.com
- **ReactBits:** https://reactbits.dev
- **Motion.dev:** https://motion.dev

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Generate Supabase types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts

# Build for production
npm run build
```

---

## Progress Tracking

Update this section daily:

| Day | Date | Status | Hours | Notes |
|-----|------|--------|-------|-------|
| 1 | Feb 1 | NOT STARTED | 0 | |
| 2 | Feb 2 | NOT STARTED | 0 | |
| 3 | Feb 3 | NOT STARTED | 0 | |
| 4 | Feb 4 | NOT STARTED | 0 | |
| 5 | Feb 5 | NOT STARTED | 0 | |
| 6 | Feb 6 | NOT STARTED | 0 | |
| 7 | Feb 7 | NOT STARTED | 0 | |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 1, 2026 | Initial documentation |
| 2.0 | Feb 1, 2026 | Added Anti-Cheat System (Social Audit, Gatekeeper, Match History) |

---

*Generated: Feb 1, 2026*  
*Version: 2.0*
