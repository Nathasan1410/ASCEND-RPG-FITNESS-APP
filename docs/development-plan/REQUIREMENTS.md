# THE SYSTEM - REQUIREMENTS.MD (OpenCode Execution)
> **Version:** 2.0  
> **Last Updated:** Feb 1, 2026  
> **Changelog:** Added Anti-Cheat System (reports table, proof upload, hunter_status, rank-up exams)

## Preamble

This document is optimized for autonomous AI agent execution. Each section contains explicit file paths, code snippets, and success criteria. Execute phases sequentially - later phases depend on earlier ones.

---

## PHASE 1: DATABASE & INFRASTRUCTURE SETUP

### Step 1.1: Initialize Next.js Project

**Execute:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

**Then Install Dependencies:**
```bash
npm install @supabase/supabase-js @supabase/ssr groq-sdk framer-motion lucide-react recharts zod tailwind-merge clsx sonner
npm install -D @types/node
```

### Step 1.2: Configure Tailwind Theme

**File: `/tailwind.config.ts`**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        system: {
          dark: "#0a0a0f",
          panel: "#12121a",
          border: "#2a2a35",
          accent: "#00b8ff",
        },
        rank: {
          e: { DEFAULT: "#8a8a8a", glow: "rgba(138, 138, 138, 0.5)" },
          d: { DEFAULT: "#ffffff", glow: "rgba(255, 255, 255, 0.5)" },
          c: { DEFAULT: "#55ead4", glow: "rgba(85, 234, 212, 0.5)" },
          b: { DEFAULT: "#00b8ff", glow: "rgba(0, 184, 255, 0.6)" },
          a: { DEFAULT: "#bd00ff", glow: "rgba(189, 0, 255, 0.6)" },
          s: { DEFAULT: "#f3e600", glow: "rgba(243, 230, 0, 0.7)" },
        },
        status: {
          success: "#00ff9f",
          warning: "#ffd300",
          error: "#ff003c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "pulse-system": {
          "0%, 100%": { boxShadow: "0 0 5px #00b8ff" },
          "50%": { boxShadow: "0 0 20px #00b8ff" },
        },
      },
      animation: {
        "pulse-system": "pulse-system 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Step 1.3: Create Global Styles

**File: `/app/globals.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #050505;
  --foreground: #ffffff;
}

html {
  color-scheme: dark;
}

body {
  background: var(--background);
  color: var(--foreground);
}

/* Glassmorphism utility */
.glass {
  @apply bg-system-panel/40 backdrop-blur-xl border border-white/10 rounded-xl;
}

/* Neon glow effects */
.glow-blue {
  box-shadow: 0 0 10px rgba(0, 184, 255, 0.5), 0 0 20px rgba(0, 184, 255, 0.3);
}

/* System card base */
.system-card {
  @apply bg-system-panel border border-system-border rounded-lg p-6;
}
```

### Step 1.4: Create Utility Functions

**File: `/lib/utils.ts`**
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Step 1.5: Supabase Database Schema

**Execute this SQL in Supabase SQL Editor:**

```sql
-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_class AS ENUM ('Novice', 'Striker', 'Tank', 'Assassin');
CREATE TYPE rank_tier AS ENUM ('E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank');
CREATE TYPE quest_status AS ENUM ('Active', 'Completed', 'Failed', 'Skipped', 'Pending_Verification');
CREATE TYPE quest_type AS ENUM ('Daily', 'Special', 'Penalty', 'RankUp');
CREATE TYPE hunter_status AS ENUM ('Normal', 'Verified', 'Flagged', 'Corrupted');
CREATE TYPE proof_type AS ENUM ('None', 'Photo', 'Video', 'Timelapse');
CREATE TYPE verification_status AS ENUM ('Auto_Approved', 'Pending', 'Verified', 'Rejected');
CREATE TYPE report_reason AS ENUM ('Impossible_Stats', 'Fake_Media', 'Suspicious_Pattern', 'Other');
CREATE TYPE report_status AS ENUM ('Pending', 'Reviewed', 'Confirmed', 'Dismissed');

-- ============================================
-- PROFILES TABLE (Updated with Anti-Cheat)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  class user_class DEFAULT 'Novice',
  rank_tier rank_tier DEFAULT 'E-Rank',
  level INT DEFAULT 1,
  current_xp BIGINT DEFAULT 0,
  total_xp BIGINT DEFAULT 0,
  stats_strength INT DEFAULT 10,
  stats_agility INT DEFAULT 10,
  stats_stamina INT DEFAULT 10,
  streak_current INT DEFAULT 0,
  streak_best INT DEFAULT 0,
  -- Anti-Cheat Fields
  hunter_status hunter_status DEFAULT 'Normal',
  verified_at TIMESTAMPTZ,
  report_count INT DEFAULT 0,
  -- Profile Data
  last_activity_at TIMESTAMPTZ,
  onboarding_done BOOLEAN DEFAULT FALSE,
  height_cm INT,
  weight_kg INT,
  equipment TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUESTS TABLE (Updated with Proof Requirements)
-- ============================================
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  quest_type quest_type DEFAULT 'Daily',
  rank_difficulty rank_tier NOT NULL,
  plan_json JSONB NOT NULL,
  xp_potential INT NOT NULL,
  status quest_status DEFAULT 'Active',
  requires_proof BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LOGS TABLE (Updated with Match History & Proof)
-- ============================================
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  duration_actual INT NOT NULL,
  user_feedback TEXT,
  rpe_actual INT CHECK (rpe_actual >= 1 AND rpe_actual <= 10),
  exercises_completed JSONB,
  xp_awarded INT DEFAULT 0,
  safety_score FLOAT DEFAULT 1.0,
  integrity_score FLOAT DEFAULT 1.0,
  opik_trace_id TEXT,
  -- Proof & Verification (Anti-Cheat)
  proof_media_url TEXT,
  proof_type proof_type DEFAULT 'None',
  is_public BOOLEAN DEFAULT TRUE,
  verification_status verification_status DEFAULT 'Auto_Approved',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REPORTS TABLE (Community Anti-Cheat)
-- ============================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_log_id UUID REFERENCES logs(id) ON DELETE SET NULL,
  reason report_reason NOT NULL,
  description TEXT,
  status report_status DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RANK UP EXAMS TABLE (Gatekeeper System)
-- ============================================
CREATE TABLE rank_up_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  from_rank rank_tier NOT NULL,
  to_rank rank_tier NOT NULL,
  exam_quest_id UUID REFERENCES quests(id) ON DELETE SET NULL,
  proof_media_url TEXT NOT NULL,
  hand_sign_required TEXT,
  status report_status DEFAULT 'Pending',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AUTO-CREATE PROFILE TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'Operative_' || LEFT(NEW.id::TEXT, 8))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- AUTO-FLAG ON REPORT THRESHOLD (Anti-Cheat)
-- ============================================
CREATE OR REPLACE FUNCTION check_report_threshold()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles 
  SET 
    report_count = report_count + 1,
    hunter_status = CASE 
      WHEN report_count + 1 >= 5 THEN 'Corrupted'
      WHEN report_count + 1 >= 3 THEN 'Flagged'
      ELSE hunter_status
    END
  WHERE id = NEW.target_user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_report
  AFTER INSERT ON reports
  FOR EACH ROW EXECUTE FUNCTION check_report_threshold();

-- ============================================
-- AUTO-VERIFY HUNTER ON PROOF UPLOADS
-- ============================================
CREATE OR REPLACE FUNCTION grant_verified_status()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM logs 
    WHERE user_id = NEW.user_id 
    AND proof_media_url IS NOT NULL
  ) >= 5 THEN
    UPDATE profiles 
    SET hunter_status = 'Verified', verified_at = NOW()
    WHERE id = NEW.user_id AND hunter_status = 'Normal';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_proof_upload
  AFTER INSERT ON logs
  FOR EACH ROW 
  WHEN (NEW.proof_media_url IS NOT NULL)
  EXECUTE FUNCTION grant_verified_status();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_up_exams ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read (for leaderboards), only self can update
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Quests: Only own quests
CREATE POLICY "Users can view own quests" ON quests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quests" ON quests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quests" ON quests
  FOR UPDATE USING (auth.uid() = user_id);

-- Logs: PUBLIC read (Match History), self insert
CREATE POLICY "Everyone can view public logs" ON logs
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own private logs" ON logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reports: Users can create reports, view only own reports
CREATE POLICY "Users can report others" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id AND auth.uid() != target_user_id);

CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- Rank Up Exams: Self only
CREATE POLICY "Users can view own exams" ON rank_up_exams
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exams" ON rank_up_exams
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Step 1.6: Supabase Client Files

**File: `/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**File: `/lib/supabase/server.ts`**
```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore in Server Components
          }
        },
      },
    }
  );
}
```

**File: `/middleware.ts`**
```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users from landing to dashboard
  if (user && request.nextUrl.pathname === "/") {
    // Check if onboarding is done
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_done")
      .eq("id", user.id)
      .single();

    const url = request.nextUrl.clone();
    if (!profile?.onboarding_done) {
      url.pathname = "/onboarding";
    } else {
      url.pathname = "/dashboard";
    }
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

**File: `/app/auth/callback/route.ts`**
```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/onboarding";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
```

### Step 1.7: Environment Variables

**File: `/.env.local`**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
OPIK_API_KEY=your_opik_api_key
```

### Step 1.8: Leveling System

**File: `/lib/gamification/leveling.ts`**
```typescript
const BASE_XP = 100;
const EXPONENT = 1.588;

/**
 * XP required to reach a specific level.
 * Formula: XP = 100 * (Level ^ 1.588)
 * 
 * Examples:
 * - Level 1: 0 XP (starting point)
 * - Level 10: ~3,880 XP
 * - Level 25: ~16,600 XP
 * - Level 50: ~50,000 XP
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(BASE_XP * Math.pow(level, EXPONENT));
}

/**
 * Calculate current level from total XP.
 * Inverse: Level = (XP / 100) ^ (1 / 1.588)
 */
export function levelFromXp(xp: number): number {
  if (xp < BASE_XP) return 1;
  return Math.floor(Math.pow(xp / BASE_XP, 1 / EXPONENT));
}

/**
 * Progress percentage to next level (0-100).
 */
export function levelProgress(xp: number): number {
  const currentLevel = levelFromXp(xp);
  const currentLevelXp = xpForLevel(currentLevel);
  const nextLevelXp = xpForLevel(currentLevel + 1);
  
  const needed = nextLevelXp - currentLevelXp;
  const earned = xp - currentLevelXp;
  
  return Math.min(100, Math.max(0, (earned / needed) * 100));
}

/**
 * Determine rank tier based on level.
 */
export function rankFromLevel(level: number): string {
  if (level >= 50) return "S-Rank";
  if (level >= 40) return "A-Rank";
  if (level >= 30) return "B-Rank";
  if (level >= 20) return "C-Rank";
  if (level >= 10) return "D-Rank";
  return "E-Rank";
}

/**
 * XP to next level.
 */
export function xpToNextLevel(xp: number): number {
  const currentLevel = levelFromXp(xp);
  const nextLevelXp = xpForLevel(currentLevel + 1);
  return nextLevelXp - xp;
}
```

### Step 1.9: Zod Schemas

**File: `/types/schemas.ts`**
```typescript
import { z } from "zod";

// User Classes
export const UserClassSchema = z.enum(["Novice", "Striker", "Tank", "Assassin"]);
export type UserClass = z.infer<typeof UserClassSchema>;

// Rank Tiers
export const RankTierSchema = z.enum([
  "E-Rank",
  "D-Rank",
  "C-Rank",
  "B-Rank",
  "A-Rank",
  "S-Rank",
]);
export type RankTier = z.infer<typeof RankTierSchema>;

// Exercise Schema (from Groq)
export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["Warmup", "Skill", "Compound", "Isolation", "Cooldown"]),
  sets: z.number(),
  reps: z.string(),
  rest_sec: z.number(),
  rpe_target: z.number().min(1).max(10),
  target_muscle: z.string(),
  tips: z.string(),
  video_query: z.string().optional(),
});
export type Exercise = z.infer<typeof ExerciseSchema>;

// Workout Plan Schema (Groq Output)
export const WorkoutPlanSchema = z.object({
  quest_name: z.string(),
  quest_rank: RankTierSchema,
  narrative_intro: z.string(),
  base_xp: z.number(),
  stat_gain: z.object({
    strength: z.number().optional(),
    agility: z.number().optional(),
    stamina: z.number().optional(),
  }),
  estimated_duration_min: z.number(),
  target_class: UserClassSchema,
  exercises: z.array(ExerciseSchema),
});
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;

// Quest Log Input (User Submission)
export const QuestLogInputSchema = z.object({
  quest_id: z.string().uuid(),
  duration_actual: z.number().min(1),
  rpe_actual: z.number().min(1).max(10),
  user_feedback: z.string().optional(),
  exercises_completed: z.array(
    z.object({
      exercise_id: z.string(),
      sets_done: z.number(),
      reps_done: z.string(),
      skipped: z.boolean().optional(),
    })
  ),
});
export type QuestLogInput = z.infer<typeof QuestLogInputSchema>;

// Judge Verdict (Opik Output) - Updated with Anti-Cheat
export const JudgeVerdictSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "FLAGGED", "PENDING_VERIFICATION"]),
  integrity_score: z.number().min(0).max(1),
  effort_score: z.number().min(0).max(1),
  safety_score: z.number().min(0).max(1),
  final_xp: z.number(),
  system_message: z.string(),
  proof_required: z.boolean().default(false),
  proof_provided: z.boolean().default(false),
  verification_status: z.enum(["Auto_Approved", "Pending", "Verified", "Rejected"]).default("Auto_Approved"),
  stat_updates: z.object({
    strength_add: z.number(),
    agility_add: z.number(),
    stamina_add: z.number(),
  }),
});
export type JudgeVerdict = z.infer<typeof JudgeVerdictSchema>;

// Hunter Status
export const HunterStatusSchema = z.enum(["Normal", "Verified", "Flagged", "Corrupted"]);
export type HunterStatus = z.infer<typeof HunterStatusSchema>;

// Proof Type
export const ProofTypeSchema = z.enum(["None", "Photo", "Video", "Timelapse"]);
export type ProofType = z.infer<typeof ProofTypeSchema>;

// Quest Log Input (User Submission) - Updated with Proof
export const QuestLogInputSchemaV2 = z.object({
  quest_id: z.string().uuid(),
  duration_actual: z.number().min(1),
  rpe_actual: z.number().min(1).max(10),
  user_feedback: z.string().optional(),
  exercises_completed: z.array(
    z.object({
      exercise_id: z.string(),
      sets_done: z.number(),
      reps_done: z.string(),
      skipped: z.boolean().optional(),
    })
  ),
  proof_media_url: z.string().url().optional(),
  proof_type: ProofTypeSchema.default("None"),
  is_public: z.boolean().default(true),
});

// Report Schema
export const ReportSchema = z.object({
  target_user_id: z.string().uuid(),
  target_log_id: z.string().uuid().optional(),
  reason: z.enum(["Impossible_Stats", "Fake_Media", "Suspicious_Pattern", "Other"]),
  description: z.string().max(500).optional(),
});
export type ReportInput = z.infer<typeof ReportSchema>;

// Onboarding Form
export const OnboardingSchema = z.object({
  username: z.string().min(3).max(20),
  height_cm: z.number().min(100).max(250),
  weight_kg: z.number().min(30).max(300),
  max_pushups: z.number().min(0).max(500),
  run_capability_km: z.number().min(0).max(100),
  selected_class: UserClassSchema,
  equipment: z.array(z.string()),
});
export type OnboardingData = z.infer<typeof OnboardingSchema>;
```

---

## PHASE 2: ONBOARDING FLOW

### Step 2.1: Landing Page

**File: `/app/page.tsx`**
```typescript
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-8">
        {/* Title */}
        <h1 className="text-6xl font-bold tracking-tighter">
          <span className="text-system-accent">THE</span>{" "}
          <span className="text-white">SYSTEM</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-gray-400 max-w-md mx-auto">
          Your Daily Mandate to become S-Rank.
        </p>
        
        {/* CTA */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-system-accent text-black font-bold rounded-lg hover:bg-system-accent/90 transition-all glow-blue"
        >
          ENTER THE SYSTEM
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
```

### Step 2.2: Onboarding Layout

**File: `/app/onboarding/layout.tsx`**
```typescript
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}
```

### Step 2.3: Profile Actions

**File: `/server/actions/profile-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { OnboardingSchema, type OnboardingData } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function calculateInitialRank(pushups: number): string {
  if (pushups >= 100) return "S-Rank";
  if (pushups >= 75) return "A-Rank";
  if (pushups >= 50) return "B-Rank";
  if (pushups >= 25) return "C-Rank";
  if (pushups >= 10) return "D-Rank";
  return "E-Rank";
}

export async function completeOnboarding(data: OnboardingData) {
  const validated = OnboardingSchema.parse(data);
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const initialRank = calculateInitialRank(validated.max_pushups);
  
  const { error } = await supabase
    .from("profiles")
    .update({
      username: validated.username,
      class: validated.selected_class,
      rank_tier: initialRank,
      height_cm: validated.height_cm,
      weight_kg: validated.weight_kg,
      equipment: validated.equipment,
      onboarding_done: true,
      stats_strength: 10 + Math.floor(validated.max_pushups / 10),
      stats_stamina: 10 + Math.floor(validated.run_capability_km * 2),
      stats_agility: 10,
    })
    .eq("id", user.id);

  if (error) throw error;
  
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
```

---

## PHASE 3: CORE QUEST LOOP (GROQ)

### Step 3.1: Groq Client

**File: `/lib/ai/groq.ts`**
```typescript
import Groq from "groq-sdk";
import { WorkoutPlanSchema, type WorkoutPlan } from "@/types/schemas";
import { ARCHITECT_PROMPT } from "./prompts";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface QuestInput {
  user_class: string;
  user_rank: string;
  time_window_min: number;
  equipment: string[];
  muscle_soreness: string[];
}

export async function generateWorkoutPlan(input: QuestInput): Promise<WorkoutPlan> {
  const userMessage = `
USER PROFILE:
- Class: ${input.user_class}
- Rank: ${input.user_rank}
- Time: ${input.time_window_min} minutes
- Equipment: ${input.equipment.length > 0 ? input.equipment.join(", ") : "Bodyweight only"}
- Soreness: ${input.muscle_soreness.length > 0 ? input.muscle_soreness.join(", ") : "None"}

Generate a quest now.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: ARCHITECT_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from Groq");

    const parsed = JSON.parse(content);
    return WorkoutPlanSchema.parse(parsed);
  } catch (error) {
    console.error("Groq generation failed:", error);
    return getFallbackQuest(input);
  }
}

function getFallbackQuest(input: QuestInput): WorkoutPlan {
  return {
    quest_name: "Basic Training Protocol",
    quest_rank: "E-Rank",
    narrative_intro: "The System is experiencing interference. Execute this basic protocol.",
    base_xp: 100,
    stat_gain: { strength: 1, stamina: 1 },
    estimated_duration_min: input.time_window_min,
    target_class: "Novice",
    exercises: [
      {
        id: "ex_1",
        name: "Push-ups",
        type: "Compound",
        sets: 3,
        reps: "10",
        rest_sec: 60,
        rpe_target: 6,
        target_muscle: "Chest",
        tips: "Keep core tight.",
      },
      {
        id: "ex_2",
        name: "Squats",
        type: "Compound",
        sets: 3,
        reps: "15",
        rest_sec: 60,
        rpe_target: 6,
        target_muscle: "Legs",
        tips: "Knees over toes.",
      },
      {
        id: "ex_3",
        name: "Plank",
        type: "Isolation",
        sets: 3,
        reps: "30s",
        rest_sec: 30,
        rpe_target: 5,
        target_muscle: "Core",
        tips: "Straight line from head to heels.",
      },
    ],
  };
}
```

### Step 3.2: Architect Prompt

**File: `/lib/ai/prompts.ts`**
```typescript
export const ARCHITECT_PROMPT = `ROLE: You are "The System," a hyper-intelligent fitness architect. You do not offer encouragement; you offer optimization. Your goal is to force evolution upon the user ("The Operative") through calculated physical stress.

OUTPUT FORMAT: Strict JSON only. Do not include markdown code fences. Do not include conversational text.

JSON SCHEMA:
{
  "quest_name": "string (Thematic title, e.g., 'E-Rank Survival Protocol')",
  "quest_rank": "E-Rank | D-Rank | C-Rank | B-Rank | A-Rank | S-Rank",
  "narrative_intro": "string (2 sentences max, cold and authoritative tone)",
  "base_xp": "number (E=100-200, D=200-500, C=500-1000, B=1000-2000, A=2000-4000, S=4000+)",
  "stat_gain": { "strength": number, "agility": number, "stamina": number },
  "estimated_duration_min": "number",
  "target_class": "Novice | Striker | Tank | Assassin",
  "exercises": [
    {
      "id": "string (ex_1, ex_2, etc.)",
      "name": "string",
      "type": "Warmup | Skill | Compound | Isolation | Cooldown",
      "sets": "number",
      "reps": "string (e.g., '12', '10-15', 'AMRAP', '30s')",
      "rest_sec": "number",
      "rpe_target": "number 1-10",
      "target_muscle": "string",
      "tips": "string (1 sentence, imperative)"
    }
  ]
}

CLASS PROTOCOLS:
- Novice: Focus on form. Rep range 8-12. Controlled tempo.
- Striker: High volume. Rep range 15-20+. Rest < 45s.
- Tank: Maximum tension. Rep range 3-6 or difficult variations. Rest > 90s.
- Assassin: HIIT/Circuit style. Explosive. Cardio focus.

RANK SCALING:
- E-Rank: 2-3 exercises. Basic movements.
- D-Rank: 3-4 exercises. Standard progressions.
- C-Rank: 4-5 exercises. Intermediate variations.
- B-Rank: 5-6 exercises. Challenging movements.
- A-Rank: 6+ exercises. Advanced techniques.
- S-Rank: 6+ exercises. Elite-level difficulty or failure sets.

CONSTRAINTS:
- If user has NO equipment, generate strictly bodyweight exercises.
- If user reports muscle SORENESS, switch to Active Recovery (mobility/stretching).
- XP must match the difficulty rank.
- narrative_intro must use second-person ("You have been assigned...").
- Do NOT output markdown code blocks. Just raw JSON.`;

export const JUDGE_PROMPT = `ROLE: You are "The Judge," an impartial auditor of The System.
TASK: Evaluate the Operative's performance log against the assigned quest.

ANALYSIS STEPS:
1. INTEGRITY CHECK: Compare claimed reps vs duration. If physically impossible (e.g., 100 pushups in 30 seconds), flag as CHEAT.
2. EFFORT CHECK: Compare target_rpe vs actual_rpe. If user RPE << target, effort is LOW.
3. SAFETY CHECK: Did user perform high intensity while reporting soreness? If yes, UNSAFE.

OUTPUT: Strict JSON with:
- status: APPROVED | REJECTED | FLAGGED
- integrity_score: 0.0 - 1.0
- effort_score: 0.0 - 1.0
- safety_score: 0.0 - 1.0
- system_message: String (feedback to user)`;
```

### Step 3.3: Quest Actions

**File: `/server/actions/quest-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { generateWorkoutPlan } from "@/lib/ai/groq";
import { revalidatePath } from "next/cache";

interface GenerateQuestInput {
  time_window_min: number;
  muscle_soreness: string[];
}

export async function generateDailyQuest(input: GenerateQuestInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Not authenticated");

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) throw new Error("Profile not found");

  // Generate workout plan
  const plan = await generateWorkoutPlan({
    user_class: profile.class || "Novice",
    user_rank: profile.rank_tier || "E-Rank",
    time_window_min: input.time_window_min,
    equipment: profile.equipment || [],
    muscle_soreness: input.muscle_soreness,
  });

  // Save to database
  const expiresAt = new Date();
  expiresAt.setHours(23, 59, 59, 999); // Expires at midnight

  const { data: quest, error } = await supabase
    .from("quests")
    .insert({
      user_id: user.id,
      rank_difficulty: plan.quest_rank,
      plan_json: plan,
      xp_potential: plan.base_xp,
      status: "Active",
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/dashboard");
  return quest;
}

export async function getActiveQuest() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "Active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return quest;
}

export async function getQuestById(id: string) {
  const supabase = await createClient();
  
  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("id", id)
    .single();

  return quest;
}
```

---

## PHASE 4: JUDGE SYSTEM (OPIK)

### Step 4.1: XP Calculator

**File: `/lib/gamification/xp-calculator.ts`**
```typescript
import { type WorkoutPlan, type QuestLogInput } from "@/types/schemas";

interface EvaluationInput {
  plan: WorkoutPlan;
  log: QuestLogInput;
  userClass: string;
  streakCurrent: number;
}

interface EvaluationResult {
  integrityScore: number;
  effortScore: number;
  safetyScore: number;
  synergyBonus: number;
  streakBonus: number;
  finalXp: number;
  status: "APPROVED" | "REJECTED" | "FLAGGED";
  message: string;
}

export function evaluateWorkout(input: EvaluationInput): EvaluationResult {
  const { plan, log, userClass, streakCurrent } = input;

  // 1. Integrity Check (Cheat Detection)
  const integrityScore = checkIntegrity(plan, log);

  // 2. Effort Score (RPE Comparison)
  const effortScore = checkEffort(plan, log);

  // 3. Safety Score
  const safetyScore = 1.0; // Simplified for MVP

  // 4. Class Synergy
  const synergyBonus = plan.target_class === userClass ? 1.1 : 1.0;

  // 5. Streak Bonus
  const streakBonus = 1 + Math.min(streakCurrent * 0.02, 0.2); // Max 20% bonus

  // Calculate Final XP
  let finalXp = plan.base_xp;
  finalXp *= integrityScore;
  finalXp *= effortScore;
  finalXp *= safetyScore;
  finalXp *= synergyBonus;
  finalXp *= streakBonus;
  finalXp = Math.floor(finalXp);

  // Determine Status
  let status: "APPROVED" | "REJECTED" | "FLAGGED";
  let message: string;

  if (integrityScore === 0) {
    status = "REJECTED";
    message = "ANOMALY DETECTED. Stats rejected. The System does not tolerate deception.";
  } else if (integrityScore < 0.5) {
    status = "FLAGGED";
    message = "Suspicious activity logged. XP reduced. You are being monitored.";
  } else {
    status = "APPROVED";
    message = effortScore >= 1.0
      ? "Exceptional effort acknowledged. The System rewards those who push beyond limits."
      : "Protocol completed. Continue to prove your worth.";
  }

  return {
    integrityScore,
    effortScore,
    safetyScore,
    synergyBonus,
    streakBonus,
    finalXp,
    status,
    message,
  };
}

function checkIntegrity(plan: WorkoutPlan, log: QuestLogInput): number {
  // Calculate total claimed volume
  let totalReps = 0;
  log.exercises_completed.forEach((ex) => {
    if (!ex.skipped) {
      const reps = parseInt(ex.reps_done) || 0;
      totalReps += ex.sets_done * reps;
    }
  });

  // Physics check: Max ~80 reps/min for simple exercises
  const durationMin = log.duration_actual;
  const maxPossibleReps = durationMin * 80;

  if (totalReps > maxPossibleReps) {
    return 0; // Cheating detected
  }

  // Check completion rate
  const planExercises = plan.exercises.length;
  const completedExercises = log.exercises_completed.filter((e) => !e.skipped).length;
  const completionRate = completedExercises / planExercises;

  if (completionRate < 0.5) {
    return 0.5; // Partial completion
  }

  return 1.0;
}

function checkEffort(plan: WorkoutPlan, log: QuestLogInput): number {
  // Average target RPE from plan
  const avgTargetRpe = plan.exercises.reduce((sum, ex) => sum + ex.rpe_target, 0) / plan.exercises.length;
  const actualRpe = log.rpe_actual;

  const delta = avgTargetRpe - actualRpe;

  if (delta <= 0) {
    return 1.2; // User worked harder than expected
  } else if (delta <= 2) {
    return 1.0; // Normal
  } else if (delta <= 4) {
    return 0.8; // Slacking
  } else {
    return 0.5; // Sandbagging
  }
}
```

### Step 4.2: Log Actions

**File: `/server/actions/log-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { QuestLogInputSchema, type WorkoutPlan } from "@/types/schemas";
import { evaluateWorkout } from "@/lib/gamification/xp-calculator";
import { levelFromXp, rankFromLevel } from "@/lib/gamification/leveling";
import { revalidatePath } from "next/cache";

export async function submitQuestLog(input: unknown) {
  const validated = QuestLogInputSchema.parse(input);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get quest
  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("id", validated.quest_id)
    .single();

  if (!quest) throw new Error("Quest not found");

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) throw new Error("Profile not found");

  // Evaluate workout
  const evaluation = evaluateWorkout({
    plan: quest.plan_json as WorkoutPlan,
    log: validated,
    userClass: profile.class || "Novice",
    streakCurrent: profile.streak_current || 0,
  });

  // Insert log
  const { error: logError } = await supabase.from("logs").insert({
    quest_id: validated.quest_id,
    user_id: user.id,
    duration_actual: validated.duration_actual,
    user_feedback: validated.user_feedback,
    rpe_actual: validated.rpe_actual,
    exercises_completed: validated.exercises_completed,
    xp_awarded: evaluation.finalXp,
    safety_score: evaluation.safetyScore,
    integrity_score: evaluation.integrityScore,
  });

  if (logError) throw logError;

  // Update quest status
  await supabase
    .from("quests")
    .update({ status: evaluation.status === "REJECTED" ? "Failed" : "Completed" })
    .eq("id", validated.quest_id);

  // Update profile
  const newTotalXp = (profile.total_xp || 0) + evaluation.finalXp;
  const newCurrentXp = (profile.current_xp || 0) + evaluation.finalXp;
  const newLevel = levelFromXp(newTotalXp);
  const newRank = rankFromLevel(newLevel);
  const newStreak = evaluation.status !== "REJECTED" ? (profile.streak_current || 0) + 1 : 0;

  await supabase
    .from("profiles")
    .update({
      total_xp: newTotalXp,
      current_xp: newCurrentXp,
      level: newLevel,
      rank_tier: newRank,
      streak_current: newStreak,
      streak_best: Math.max(newStreak, profile.streak_best || 0),
      stats_strength: (profile.stats_strength || 10) + (evaluation.finalXp > 0 ? (quest.plan_json as WorkoutPlan).stat_gain.strength || 0 : 0),
      stats_agility: (profile.stats_agility || 10) + (evaluation.finalXp > 0 ? (quest.plan_json as WorkoutPlan).stat_gain.agility || 0 : 0),
      stats_stamina: (profile.stats_stamina || 10) + (evaluation.finalXp > 0 ? (quest.plan_json as WorkoutPlan).stat_gain.stamina || 0 : 0),
      last_activity_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  revalidatePath("/dashboard");

  return {
    status: evaluation.status,
    xp_awarded: evaluation.finalXp,
    message: evaluation.message,
    new_level: newLevel,
    new_rank: newRank,
  };
}
```

---

## PHASE 5: SOCIAL LAYER

### Step 5.1: Leaderboard View (SQL) - Updated with Anti-Cheat

**Execute in Supabase:**
```sql
-- Materialized View for Leaderboards (excludes Corrupted users)
CREATE MATERIALIZED VIEW leaderboard_ranks AS
SELECT
  id as user_id,
  username,
  total_xp,
  level,
  rank_tier,
  class,
  hunter_status,
  streak_current,
  RANK() OVER (ORDER BY total_xp DESC) as global_rank
FROM profiles
WHERE onboarding_done = true
AND hunter_status != 'Corrupted'  -- Exclude cheaters
WITH DATA;

-- Index for fast queries
CREATE UNIQUE INDEX idx_leaderboard_user_id ON leaderboard_ranks(user_id);
CREATE INDEX idx_leaderboard_xp ON leaderboard_ranks(total_xp DESC);
CREATE INDEX idx_leaderboard_status ON leaderboard_ranks(hunter_status);

-- RPC Function to query leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(limit_count int DEFAULT 50)
RETURNS TABLE (
  user_id uuid,
  username text,
  total_xp bigint,
  level int,
  rank_tier rank_tier,
  class user_class,
  hunter_status hunter_status,
  streak_current int,
  global_rank bigint
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM leaderboard_ranks
  ORDER BY total_xp DESC
  LIMIT limit_count;
$$;

-- Public Activity Feed View (Match History)
CREATE OR REPLACE VIEW public_activity_feed AS
SELECT 
  l.id as log_id,
  l.user_id,
  p.username,
  p.hunter_status,
  q.plan_json->>'quest_name' as quest_name,
  q.rank_difficulty as quest_rank,
  l.xp_awarded,
  l.duration_actual,
  l.integrity_score,
  l.proof_media_url,
  l.proof_type,
  l.verification_status,
  l.completed_at
FROM logs l
JOIN profiles p ON l.user_id = p.id
JOIN quests q ON l.quest_id = q.id
WHERE l.is_public = true
ORDER BY l.completed_at DESC;
```

### Step 5.2: Leaderboard Actions (Updated)

**File: `/server/actions/leaderboard-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLeaderboard(limit: number = 50) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_leaderboard", {
    limit_count: limit,
  });

  if (error) {
    // Fallback to direct query if RPC fails
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, total_xp, level, rank_tier, class, hunter_status, streak_current")
      .eq("onboarding_done", true)
      .neq("hunter_status", "Corrupted")  // Exclude cheaters
      .order("total_xp", { ascending: false })
      .limit(limit);

    return profiles?.map((p, i) => ({ ...p, global_rank: i + 1 })) || [];
  }

  return data || [];
}
```

### Step 5.3: Match History Actions (NEW)

**File: `/server/actions/match-history-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";

export async function getPublicProfile(username: string) {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, rank_tier, level, total_xp, class, hunter_status, streak_current, streak_best, stats_strength, stats_agility, stats_stamina, created_at")
    .eq("username", username)
    .single();
    
  if (!profile) return null;
  
  // Get match history (public logs)
  const { data: logs } = await supabase
    .from("logs")
    .select(`
      id,
      xp_awarded,
      duration_actual,
      integrity_score,
      proof_media_url,
      proof_type,
      verification_status,
      completed_at,
      quests (
        plan_json,
        rank_difficulty
      )
    `)
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("completed_at", { ascending: false })
    .limit(20);
  
  // Calculate stats
  const totalProofs = logs?.filter(l => l.proof_media_url).length || 0;
  const avgIntegrity = logs?.reduce((sum, l) => sum + l.integrity_score, 0) / (logs?.length || 1);
  
  return {
    profile,
    match_history: logs || [],
    stats: {
      total_quests: logs?.length || 0,
      verified_quests: totalProofs,
      proof_rate: logs?.length ? (totalProofs / logs.length) * 100 : 0,
      avg_integrity: avgIntegrity,
    }
  };
}
```

### Step 5.4: Report Actions (NEW)

**File: `/server/actions/report-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { ReportSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export async function submitReport(input: unknown) {
  const validated = ReportSchema.parse(input);
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  
  // Cannot report yourself
  if (user.id === validated.target_user_id) {
    throw new Error("Cannot report yourself");
  }
  
  // Check rate limit (max 5 reports per day)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { count } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("reporter_id", user.id)
    .gte("created_at", today.toISOString());
    
  if ((count || 0) >= 5) {
    throw new Error("Daily report limit reached");
  }
  
  // Submit report
  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    target_user_id: validated.target_user_id,
    target_log_id: validated.target_log_id,
    reason: validated.reason,
    description: validated.description,
  });
  
  if (error) throw error;
  
  revalidatePath(`/profile/${validated.target_user_id}`);
  
  return { success: true, message: "Report submitted. The System will investigate." };
}
```

### Step 5.5: Proof Upload Helpers (NEW)

**File: `/lib/supabase/storage.ts`**
```typescript
import { createClient } from "./client";

export async function uploadProof(
  file: File,
  userId: string,
  logId: string,
  type: "photo" | "video" | "rank-exam"
): Promise<string> {
  const supabase = createClient();
  
  const bucket = "proof-media";
  const folder = type === "rank-exam" ? "rank-exams" : type === "video" ? "videos" : "photos";
  const extension = file.name.split(".").pop();
  const path = `${folder}/${userId}/${logId}.${extension}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
    
  return publicUrl;
}
```

---

## SUCCESS CRITERIA CHECKLIST

### Phase 1 Complete When:
- [ ] `npm run dev` runs without errors
- [ ] Supabase tables exist (profiles, quests, logs, reports, rank_up_exams)
- [ ] RLS policies enabled
- [ ] Auth creates profile on signup
- [ ] TypeScript types generated

### Phase 2 Complete When:
- [ ] User can signup/login
- [ ] Onboarding wizard functional
- [ ] Initial rank assigned correctly
- [ ] Redirect to dashboard works

### Phase 3 Complete When:
- [ ] Groq generates valid workout JSON
- [ ] Quest saves to database
- [ ] Dashboard displays user stats
- [ ] Quest card shows exercises

### Phase 4 Complete When:
- [ ] Quest completion awards XP
- [ ] Cheat detection rejects impossible claims
- [ ] Level/rank updates correctly
- [ ] Streak increments
- [ ] **Rank-up quests require proof** ← NEW

### Phase 5 Complete When:
- [ ] Leaderboard displays ranked users (excludes Corrupted)
- [ ] **Public match history works** ← NEW
- [ ] **Hunter status badges display** ← NEW
- [ ] **Report button functional** ← NEW
- [ ] **Proof upload works** ← NEW
- [ ] Profile page shows stats

---

*Document Version: 2.0*  
*Last Updated: Feb 1, 2026*  
*Changelog: Added Anti-Cheat System (reports, proof upload, hunter_status, match history)*
