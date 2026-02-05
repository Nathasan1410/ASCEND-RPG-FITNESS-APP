# PROMPTS: Create Missing GitBook Documentation Files

**Date:** February 5, 2026
**AI Model:** GLM 4.7
**Purpose:** Create all missing GitBook documentation files in one session

---

## Instructions for AI

You are an advanced technical documentation specialist. Create comprehensive, professional GitBook documentation files for the ASCEND: FITNESS RPG project.

**Important Rules:**
1. Write in Markdown format
2. Include Mermaid diagrams for architecture/system overview
3. Include TypeScript code examples with syntax highlighting
4. Be comprehensive and detailed
5. Use proper formatting (headings, bullet points, tables)
6. Reference actual project structure and code
7. Make it production-ready for hackathon judges

---

## File 1: Database Schema

**Path:** `gitbook/3-Database/schema.md`

**Content Requirements:**

1. **Table Overview**
   - List all database tables with their purposes
   - Include row counts and relationships
   - Table descriptions

2. **Table Definitions**
   For each table, include:
   - Complete CREATE TABLE SQL
   - Column definitions with data types
   - Primary keys and foreign keys
   - Indexes
   - Constraints
   - Triggers

3. **Tables to Document:**

   **profiles table:**
   ```sql
   CREATE TABLE public.profiles (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     username TEXT UNIQUE NOT NULL,
     email TEXT UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW(),
     xp BIGINT DEFAULT 0,
     level INT DEFAULT 1,
     rank_tier TEXT DEFAULT 'E' CHECK (rank_tier IN ('E', 'D', 'C', 'B', 'A', 'S')),
     class TEXT DEFAULT 'Assassin' CHECK (class IN ('Tank', 'Striker', 'Assassin')),
     role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
     avatar_url TEXT,
     bio TEXT,
     goals TEXT[],
     equipment TEXT[],
     hunter_status TEXT DEFAULT 'Normal' CHECK (hunter_status IN ('Normal', 'Verified', 'Flagged', 'Corrupted')),
     streak_days INT DEFAULT 0,
     longest_streak INT DEFAULT 0,
     total_quests INT DEFAULT 0,
     total_xp_earned BIGINT DEFAULT 0,
     
     CONSTRAINT xp_min CHECK (xp >= 0),
     CONSTRAINT level_min CHECK (level >= 1),
     CONSTRAINT streak_min CHECK (streak_days >= 0)
   );
   
   CREATE INDEX idx_profiles_username ON public.profiles(username);
   CREATE INDEX idx_profiles_xp ON public.profiles(xp DESC);
   CREATE INDEX idx_profiles_level ON public.profiles(level DESC);
   ```

   **quests table:**
   ```sql
   CREATE TABLE public.quests (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     description TEXT,
     difficulty TEXT NOT NULL CHECK (difficulty IN ('E', 'D', 'C', 'B', 'A', 'S')),
     duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
     xp_reward BIGINT NOT NULL CHECK (xp_reward >= 0),
     exercises JSONB NOT NULL,
     warm_up JSONB,
     cool_down JSONB,
     class_specialization JSONB,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
     
     CONSTRAINT xp_reward_min CHECK (xp_reward >= 50),
     CONSTRAINT xp_reward_max CHECK (xp_reward <= 4000),
     CONSTRAINT duration_min CHECK (duration_minutes >= 15),
     CONSTRAINT duration_max CHECK (duration_minutes <= 180)
   );
   
   CREATE INDEX idx_quests_user_id ON public.quests(user_id);
   CREATE INDEX idx_quests_difficulty ON public.quests(difficulty);
   ```

   **match_history table:**
   ```sql
   CREATE TABLE public.match_history (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
     quest_id UUID REFERENCES public.quests(id) ON DELETE CASCADE,
     started_at TIMESTAMPTZ NOT NULL,
     completed_at TIMESTAMPTZ,
     actual_duration_minutes INT CHECK (actual_duration_minutes > 0),
     xp_earned BIGINT CHECK (xp_earned >= 0),
     proof_url TEXT,
     notes TEXT,
     judge_form_score NUMERIC(3, 2) CHECK (judge_form_score >= 0 AND judge_form_score <= 1),
     judge_effort_score NUMERIC(3, 2) CHECK (judge_effort_score >= 0 AND judge_effort_score <= 1),
     judge_consistency_score NUMERIC(3, 2) CHECK (judge_consistency_score >= 0 AND judge_consistency_score <= 1),
     judge_overall_score NUMERIC(3, 2) CHECK (judge_overall_score >= 0 AND judge_overall_score <= 1),
     judge_xp_multiplier NUMERIC(3, 2) CHECK (judge_xp_multiplier >= 0 AND judge_xp_multiplier <= 1.5),
     judge_feedback TEXT,
     judge_suggested_improvements TEXT[],
     created_at TIMESTAMPTZ DEFAULT NOW(),
     
     CONSTRAINT xp_earned_min CHECK (xp_earned >= 0),
     CONSTRAINT duration_min CHECK (actual_duration_minutes >= 5),
     CONSTRAINT scores_min CHECK (judge_form_score >= 0 AND judge_effort_score >= 0 AND judge_consistency_score >= 0),
     CONSTRAINT scores_max CHECK (judge_form_score <= 1 AND judge_effort_score <= 1 AND judge_consistency_score <= 1),
     CONSTRAINT multiplier_min CHECK (judge_xp_multiplier >= 0.8),
     CONSTRAINT multiplier_max CHECK (judge_xp_multiplier <= 1.5)
   );
   
   CREATE INDEX idx_match_history_user_id ON public.match_history(user_id);
   CREATE INDEX idx_match_history_completed_at ON public.match_history(completed_at DESC);
   ```

   **reports table:**
   ```sql
   CREATE TABLE public.reports (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
     reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
     reason TEXT NOT NULL,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
     admin_notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     resolved_at TIMESTAMPTZ,
     
     CONSTRAINT reporter_required CHECK (reporter_id IS NOT NULL),
     CONSTRAINT status_default CHECK (status = 'pending')
   );
   
   CREATE INDEX idx_reports_reporter_id ON public.reports(reporter_id);
   CREATE INDEX idx_reports_status ON public.reports(status);
   ```

   **rank_up_exams table:**
   ```sql
   CREATE TABLE public.rank_up_exams (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
     target_rank TEXT NOT NULL CHECK (target_rank IN ('D', 'C', 'B', 'A', 'S')),
     proof_url TEXT NOT NULL,
     hand_sign_video TEXT,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'under_review', 'approved', 'rejected')),
     admin_notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     reviewed_at TIMESTAMPTZ,
     
     CONSTRAINT user_required CHECK (user_id IS NOT NULL),
     CONSTRAINT target_rank_required CHECK (target_rank IS NOT NULL),
     CONSTRAINT status_default CHECK (status = 'pending')
   );
   
   CREATE INDEX idx_rank_up_exams_user_id ON public.rank_up_exams(user_id);
   CREATE INDEX idx_rank_up_exams_status ON public.rank_up_exams(status);
   ```

4. **ER Diagram**
   ```mermaid
   erDiagram
     PROFILES ||--o{1..}||--o{1:N} MATCH_HISTORY
     PROFILES ||--o{1..}||--o{1:N} QUESTS
     QUESTS ||--o{1:N}||--o{1:N} QUESTS
     PROFILES ||--o{1:N} REPORTS
     PROFILES ||--o{1..}||--o{1:N} RANK_UP_EXAMS
     PROFILES }o--|||{1:1} REPORTS
   ```

5. **Indexes and Performance**
   List all indexes with their purposes
   Explain query optimization strategies
   Include row count estimates

---

## File 2: Database Relationships

**Path:** `gitbook/3-Database/relationships.md`

**Content Requirements:**

1. **Relationship Overview**
   - Visual ER diagram showing all relationships
   - One-to-many, many-to-one relationship types
   - Foreign key relationships

2. **Detailed Relationships**

   **User to Quests (One-to-Many):**
   ```sql
   -- One profile can have many quests
   ALTER TABLE public.quests
   ADD CONSTRAINT fk_user_id 
   REFERENCES public.profiles(id) ON DELETE CASCADE;
   ```

   **User to Match History (One-to-Many):**
   ```sql
   -- One profile can have many quest completions
   ALTER TABLE public.match_history
   ADD CONSTRAINT fk_user_id 
   REFERENCES public.profiles(id) ON DELETE CASCADE;
   ```

   **Quest to Match History (One-to-Many):**
   ```sql
   -- One quest can be completed multiple times
   ALTER TABLE public.match_history
   ADD CONSTRAINT fk_quest_id 
   REFERENCES public.quests(id) ON DELETE CASCADE;
   ```

   **User to Reports (One-to-Many):**
   - User can report other users
   - Admins can view all reports

   **User to Rank Up Exams (One-to-Many):**
   - User takes exams to rank up
   - Exams have status tracking

3. **Relationship Diagram**
   ```mermaid
   erDiagram
     PROFILES {
       id UUID PK
       username
       email
       xp BIGINT
       level INT
       rank_tier
       class
       hunter_status
     }
     QUESTS {
       id UUID PK
       user_id UUID FK
       title
       difficulty
       xp_reward
     }
     MATCH_HISTORY {
       id UUID PK
       user_id UUID FK
       quest_id UUID FK
       started_at
       completed_at
       xp_earned
       proof_url
       judge_scores JSONB
     }
     REPORTS {
       id UUID PK
       reporter_id UUID FK
       reported_user_id UUID FK
       reason
       status
     }
     RANK_UP_EXAMS {
       id UUID PK
       user_id UUID FK
       target_rank
       proof_url
       hand_sign_video
       status
     }
     
     PROFILES ||--o{1:N} QUESTS
     PROFILES ||--o{1:N} MATCH_HISTORY
     QUESTS ||--o{1:N}||--o{1:N} MATCH_HISTORY
     PROFILES ||--o{1:N} REPORTS
     PROFILES ||--o{1:N} RANK_UP_EXAMS
     REPORTS }o--|||{1:1} PROFILES
   RANK_UP_EXAMS }o--|||{1:1} PROFILES
     PROFILES }o--|||{1:1} REPORTS
     RANK_UP_EXAMS }o--|||{1:1} PROFILES
   ```

4. **Cascade Rules**
   ```sql
   ON DELETE CASCADE: When user is deleted, all related records are deleted
   Used on: user_id in match_history, quests, reports, rank_up_exams
   ```

5. **Query Examples**
   ```typescript
   // Get user with all their quests
   const { data: user } = await supabase
     .from('profiles')
     .select(`
       *,
       quests:quests(
         id,
         title,
         difficulty,
         xp_reward
       )
     `)
     .eq('id', userId);

   // Get match history with quest details
   const { data: history } = await supabase
     .from('match_history')
     .select(`
       *,
       quest:quests!inner(
         title,
         difficulty,
         xp_reward
       )
     `)
     .eq('user_id', userId);
   ```

---

## File 3: Database RLS Policies

**Path:** `gitbook/5-Security/rls-implementation.md`

**Content Requirements:**

1. **RLS Overview**
   - Explain what RLS is and why it's important
   - Security layers and enforcement

2. **Policies for Each Table**

   **Profiles RLS:**
   ```sql
   -- Users can only read their own data
   CREATE POLICY "Users can view own profile"
   ON profiles
   FOR SELECT
   USING (auth.uid()::text = id);

   CREATE POLICY "Users can update own profile"
   ON profiles
   FOR UPDATE
   USING (auth.uid()::text = id);
   ```

   **Quests RLS:**
   ```sql
   -- Users can view their assigned quests
   CREATE POLICY "Users can view own quests"
   ON quests
   FOR SELECT
   USING (auth.uid()::text = user_id);

   -- Users can only complete their assigned quests
   CREATE POLICY "Users can complete own quests"
   ON match_history
   FOR INSERT
   WITH CHECK (auth.uid()::text = user_id);
   ```

   **Match History RLS:**
   ```sql
   -- All authenticated users can read (public feed)
   CREATE POLICY "Public match history"
   ON match_history
   FOR SELECT
   USING (auth.uid() IS NOT NULL);

   -- Users can insert their completions
   CREATE POLICY "Users can insert own completions"
   ON match_history
   FOR INSERT
   WITH CHECK (auth.uid()::text = user_id);
   ```

   **Reports RLS:**
   ```sql
   -- Users can insert reports
   CREATE POLICY "Users can insert reports"
   ON reports
   FOR INSERT
   WITH CHECK (auth.uid()::text = reporter_id);

   -- Admins can read all reports
   CREATE POLICY "Admins can read all reports"
   ON reports
   FOR SELECT
   USING (
     EXISTS (
       SELECT 1 FROM profiles
       WHERE id = auth.uid() AND role = 'admin'
     )
   );
   ```

   **Rank Up Exams RLS:**
   ```sql
   -- Users can create their rank-up requests
   CREATE POLICY "Users can create rank-up requests"
   ON rank_up_exams
   FOR INSERT
   WITH CHECK (auth.uid()::text = user_id);

   -- Users can view their own exam status
   CREATE POLICY "Users can view own rank-up exams"
   ON rank_up_exams
   FOR SELECT
   USING (auth.uid()::text = user_id);
   ```

3. **Security Benefits**
   ```sql
   -- Prevents:
   - ❌ Reading other users' profiles
   - ❌ Modifying other users' XP
   - ❌ Viewing quests assigned to others
   - ❌ Inserting completions for others
   - ❌ Viewing sensitive report data (non-admin)
   ```

4. **Testing RLS**
   ```typescript
   // Test: User tries to read another user's profile
   const result = await supabase
     .from('profiles')
     .select('*')
     .eq('id', 'other-user-id')
     .single();
   
   // Expected: Returns error (RLS prevents access)
   // Result: ✅ Policy works correctly
   ```

---

## File 4: Backend Architecture

**Path:** `gitbook/2-Architecture/backend-architecture.md`

**Content Requirements:**

1. **Backend Overview**
   - Supabase services and their purposes
   - Serverless functions vs database queries
   - Edge deployment benefits

2. **Supabase Architecture**
   ```mermaid
   graph TB
     subgraph "Supabase Layer"
         Auth[Supabase Auth]
         DB[(PostgreSQL Database]
         Storage[Supabase Storage]
         Edge[Supabase Edge Functions]
     end

     subgraph "External Services"
         Groq[Quest Generation API]
         Opik[AI Monitoring Platform]
     end

     Auth --> DB
     Auth --> Edge
     Storage --> DB
     Edge --> DB
     DB --> Groq
     DB --> Opik

     style Auth fill:#3ECF8E
     style DB fill:#24282D
     style Groq fill:#FF0066
     style Opik fill:#00A67E
     style Edge fill:#FF5722
   ```

3. **Server Components**
   - List all server actions with their purposes
   - Include TypeScript code examples
   - Database query patterns

   Example server action:
   ```typescript
   'use server';
   import { createClient } from '@/lib/supabase/server';
   import { revalidatePath } from 'next/cache';

   export async function generateQuestAction() {
     const supabase = createClient();
     const { data: { user } } = await supabase.auth.getUser();

     const quest = await generateQuest(user.id, user.rank_tier);
     
     // Revalidate dashboard to show new quest
     revalidatePath('/dashboard');
     
     return { success: true, quest };
   }
   ```

4. **API Design**
   - RESTful patterns for all operations
   - Error handling and validation
   - Response formats

5. **Authentication Flow**
   ```mermaid
   sequenceDiagram
     participant Client
     participant Supabase Auth
     participant Database
     
     Client->>Supabase Auth: Login
     Supabase Auth->>Database: Verify user
     Database-->>Supabase Auth: User data
     Supabase Auth-->>Client: JWT token
     Client->>Database: Request protected data
     Database-->>Client: Protected data
   ```

---

## File 5: Backend Architecture

**Path:** `gitbook/2-Architecture/backend-architecture.md`

Wait, I notice there might be a duplicate. Let me check what's actually needed based on the README structure. Actually, the README shows:
- `2-Architecture/system-overview.md` - EXISTS
- `2-Architecture/frontend-architecture.md` - EXISTS (we created this)
- `2-Architecture/backend-architecture.md` - MISSING

So let me focus on the missing files.

Actually, looking at the README again more carefully, the section shows:
```
### 2. Architecture
- [System Overview](./2-Architecture/system-overview.md)
- [Frontend Architecture](./2-Architecture/frontend-architecture.md)
- [Backend Architecture](./2-Architecture/backend-architecture.md)
- [AI Integration](./2-Architecture/ai-integration.md)
```

So File 5 should be: **AI Integration**

---

## File 5: AI Integration

**Path:** `gitbook/2-Architecture/ai-integration.md`

**Content Requirements:**

1. **AI Architecture Overview**
   - Diagram showing Groq LLM + Opik integration
   - Data flow from quest generation to evaluation

2. **Groq Quest Generation**
   - API integration details
   - Prompt engineering examples
   - Response parsing and validation
   - Fallback to templates

   ```typescript
   // Groq client setup
   import Groq from 'groq-sdk';

   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

   const SYSTEM_PROMPT = `You are an expert fitness trainer and RPG quest designer.
   
   Generate personalized workout quests based on:
   - User's current rank (E-S)
   - Available equipment
   - Fitness goals
   - Time constraints
   - Class specialization (Tank/Striker/Assassin)

   Response Format (JSON):
   {
     "title": "Quest Name",
     "description": "Epic description",
     "difficulty": "B",
     "duration_minutes": 45,
     "exercises": [...],
     "xp_reward": 500
   }`;

   const response = await groq.chat.completions.create({
     messages: [{ role: 'user', content: SYSTEM_PROMPT }],
     model: 'llama-3.3-70b-versatile',
     temperature: 0.7,
     max_tokens: 1000,
   response_format: { type: 'json_object' },
   });

   const quest = JSON.parse(response.choices[0].message.content);
   ```

3. **Opik AI Judge**
   - Integration details
   - Trace implementation
   - Evaluation metrics

4. **Data Flow Diagram**
   ```mermaid
   graph LR
     User[User] --> Dashboard[Dashboard]
     Dashboard --> Groq[Groq API]
     Groq -->|Quest JSON|Database[DB]
     Database -->|Quest Data|Dashboard
     Dashboard --> Opik[Opik Trace]
     Dashboard --> Judge[AI Judge]
     Judge -->|Score|Database[DB]
     Database -->|User[User]

     style User fill:#00FFFF
     style Dashboard fill:#3ECF8E
     style Groq fill:#FF0066
     style Opik fill:#00A67E
     style DB fill:#24282D
   style Judge fill:#F59E0B
   ```

5. **Error Handling**
   ```typescript
   // Robust error handling for AI services
   try {
     const quest = await generateQuest();
     return quest;
   } catch (error) {
     // Log error to Opik
     await opik.trace('groq_generation_error', {
       error: error.message,
       stack: error.stack,
       timestamp: new Date().toISOString(),
     });
     
     // Fallback to template quest
     const fallbackQuest = generateFallbackQuest(user);
     return fallbackQuest;
   }
   ```

---

## File 6: Features - Anti-Cheat

**Path:** `gitbook/4-Features/anti-cheat.md`

**Content Requirements:**

1. **Anti-Cheat Overview**
   - Three-layer defense system
   - Prevention methods for each layer

2. **Layer 1: Opik Logic Filter**
   - Statistical impossibility detection
   - Code examples

3. **Layer 2: Social Audit**
   - Public match history
   - Community reporting system

4. **Layer 3: Gatekeeper**
   - Rank-up exam requirements
   - Video proof verification

5. **Database Triggers**
   ```sql
   -- XP update trigger
   CREATE OR REPLACE FUNCTION check_xp_update()
   RETURNS TRIGGER AS $$
   BEGIN
     IF NEW.xp - OLD.xp > 4000 THEN
       RAISE EXCEPTION 'Invalid XP increase' USING ERRCODE = '23505';
     END IF;
     
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER enforce_xp_limits
   BEFORE UPDATE OF xp ON profiles
   FOR EACH ROW EXECUTE FUNCTION check_xp_update();
   ```

---

## File 7: Performance - Frontend Optimization

**Path:** `gitbook/6-Performance/frontend-optimization.md`

**Content Requirements:**

1. **Optimization Strategies**
   - Code splitting
   - Image optimization
   - Dynamic imports
   - Server components
   - Caching strategies

2. **Code Splitting**
   ```typescript
   import dynamic from 'next/dynamic';

   // Lazy load heavy components
   const QuestDetail = dynamic(() => import('@/components/quest/QuestDetail'), {
     loading: () => <Skeleton />,
     ssr: false,
   });
   ```

3. **Image Optimization**
   ```typescript
   import Image from 'next/image';

   <Image
     src="/quest-banner.png"
     alt="Quest Banner"
     width={1200}
     height={600}
     priority={true}
     className="rounded-2xl"
   />
   ```

4. **Performance Metrics**
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - Time to Interactive (TTI)

---

## File 8: Testing

**Path:** `gitbook/8-Testing/unit-testing.md`

**Content Requirements:**

1. **Testing Overview**
   - Test framework setup (if any)
   - Unit test structure
   - Integration test approach

2. **Unit Test Examples**
   ```typescript
   import { describe, it, expect } from '@jest/globals';
   import { XPService } from '@/lib/gamification/xp-calculator';

   describe('XPService', () => {
     it('calculates XP correctly for S-grade', () => {
       const baseXP = 2500;
       const xp = XPService.calculateXP(baseXP, 0.95, 0.92, 0.88, 1.1);
       expect(xp).toBe(3894); // 2500 * 1.5x
     });
     
     it('calculates XP correctly for E-grade', () => {
       const baseXP = 50;
       const xp = XPService.calculateXP(baseXP, 0.5, 0.5, 0.5, 1.0);
       expect(xp).toBe(40); // 50 * 0.8x
     });
   });
   ```

3. **Integration Test Examples**
   ```typescript
   import { test, expect } from '@jest/globals';
   import { generateQuestAction } from '@/server/actions/quest-actions';

   describe('Quest Generation', () => {
     it('generates quest successfully', async () => {
       const result = await generateQuestAction();
       expect(result.success).toBe(true);
       expect(result.quest).toBeDefined();
       expect(result.quest.title).toBeTruthy();
     });
   });
   ```

---

## File 9: Code Examples - Components

**Path:** `gitbook/9-Code-Examples/components.md`

**Content Requirements:**

1. **Base Components**
   - Button, Card, Input, Badge components
   - Include TypeScript code

   Example:
   ```typescript
   import { ButtonHTMLAttributes } from "react";
   import { cn } from "@/lib/utils/cn";

   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: "primary" | "secondary" | "ghost";
     size?: "sm" | "md" | "lg";
   }

   export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
     return (
       <button
         className={cn(
           "rounded-lg font-bold transition-all",
           {
             primary: "bg-system-cyan text-void-deep hover:bg-system-cyan/90",
             secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
             ghost: "text-white/70 hover:text-white hover:bg-white/5",
           }[variant],
           {
             sm: "px-3 py-2 text-sm",
             md: "px-4 py-3 text-base",
             lg: "px-6 py-4 text-lg",
           }[size],
         )}
         {...props}
       />
     );
   }
   ```

2. **Feature Components**
   - QuestCard, ExerciseList, XPBadge, RankBadge
   - Include glassmorphism styling

---

## File 10: Code Examples - Server Actions

**Path:** `gitbook/9-Code-Examples/server-actions.md`

**Content Requirements:**

1. **Server Actions Overview**
   - List all server actions with their purposes
   - Include TypeScript code examples

2. **Examples**
   ```typescript
   'use server';
   import { createClient } from '@/lib/supabase/server';
   import { revalidatePath } from 'next/cache';

   // Quest generation action
   export async function generateQuestAction(userId: string) {
     const supabase = createClient();
     
     // Generate quest using Groq
     const quest = await generateQuestWithGroq(userId);
     
     // Save to database
     const { error } = await supabase
       .from('quests')
       .insert({
         user_id: userId,
         ...quest,
       });
     
     if (error) {
       return { error: 'Failed to generate quest' };
     }
     
     // Revalidate dashboard to show new quest
     revalidatePath('/dashboard');
     
     return { success: true, quest };
   }

   // Quest completion action
   export async function completeQuestAction(data: QuestCompletion) {
     const supabase = createClient();
     
     // Upload proof
     const { data: { publicUrl } } = await supabase.storage
       .from('proof-uploads')
       .upload(`${data.questId}/${Date.now()}-${data.proofFile.name}`, data.proofFile);
     
     // Save match history
     const { error } = await supabase
       .from('match_history')
       .insert({
         user_id: data.userId,
         quest_id: data.questId,
         proof_url: publicUrl,
         actual_duration_minutes: data.duration,
         notes: data.notes,
       });
     
     // Revalidate
     revalidatePath('/dashboard');
     
     return { success: true };
   }
   ```

3. **Validation**
   - Zod schema validation examples
   - Error handling patterns

---

## File 11: Code Examples - Hooks

**Path:** `gitbook/9-Code-Examples/hooks.md`

**Content Requirements:**

1. **Custom Hooks**
   - List all custom hooks with their purposes
   - Include TypeScript code

2. **Examples**
   ```typescript
   import { useState, useEffect } from 'react';

   // Custom hook for managing quest state
   export function useQuestState(questId: string) {
     const [quest, setQuest] = useState<Quest | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
       async function fetchQuest() {
         try {
           setLoading(true);
           setError(null);
           const { data } = await supabase
             .from('quests')
             .select('*')
             .eq('id', questId)
             .single();
           
           setQuest(data);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       }

       if (questId) {
         fetchQuest();
       }
     }, [questId]);

     return { quest, loading, error, refetch: () => fetchQuest() };
   }

   // Custom hook for user context
   export function useUserContext() {
     const [user, setUser] = useState<User | null>(null);
     
     useEffect(() => {
       async function fetchUser() {
         const { data: { user } } = await supabase.auth.getUser();
         setUser(user);
       }
       
       fetchUser();
     }, []);
     
     return { user, setUser, refreshUser: () => fetchUser() };
   }
   ```

---

## File 12: Innovation - Key Innovations

**Path:** `gitbook/10-Innovation/key-innovations.md`

**Content Requirements:**

1. **Key Innovations**
   - List all major innovations with descriptions
   - Competitive analysis
   - Real-world relevance

2. **Innovations List**
   - AI-Powered Quest Generation
   - AI Judge with Opik Integration
   - Anti-Cheat Verification System
   - Social Hunter Network
   - Gamification System (XP, Ranks, Achievements)
   - Transparent AI Monitoring
   - Row-Level Security

3. **Evidence of Innovation**
   - Technical implementation details
   - Code examples
   - Metrics and impact

---

## File 13: Innovation - Future Roadmap

**Path:** `gitbook/10-Innovation/future-roadmap.md`

**Content Requirements:**

1. **Roadmap Overview**
   - Timeline for next 6-12 months
   - Priority levels (Critical, High, Medium, Low)

2. **Coming Soon Features**
   - AI Chatbot (fitness coaching)
   - Nutrition Tracking
   - IoT Scale Tracking
   - Gym Tools Integration
   - Better Stats Tracker
   - Social Media Integration
   - Custom Workout Builder
   - Guild Features
   - Monetization System
   - Leaderboard 2.0
   - Real-World Integration
   - Mobile Apps (iOS + Android)
   - Brand Evolution

3. **Long-Term Vision**
   - Complete fitness RPG ecosystem
   - Community-driven content
   - Professional training certifications
   - VR/AR workout experiences

---

## General Instructions for All Files

1. **Formatting:**
   - Use Markdown format with proper headers (##, ###, ####)
   - Use bullet points for lists
   - Use tables for structured data
   - Use code blocks with language tags (```typescript, ```sql, ```mermaid)

2. **Diagrams:**
   - Include Mermaid diagrams where appropriate
   - Ensure diagrams are readable and accurate
   - Use consistent styling

3. **Code Examples:**
   - Include actual TypeScript/SQL code from the project
   - Ensure code is syntactically correct
   - Add comments explaining complex logic
   - Use proper TypeScript types

4. **Documentation Quality:**
   - Be comprehensive and detailed
   - Include technical depth for hackathon judges
   - Show evidence of robust implementation
   - Professional formatting throughout

5. **Opik Evidence:**
   - Include Opik integration details where relevant
   - Show trace examples
- Document what's tracked and what's not tracked
   - Demonstrate goal alignment

---

## Execution Order

Create files in this order:
1. Database Schema (3-Database/schema.md)
2. Database Relationships (3-Database/relationships.md)
3. Database RLS (5-Security/rls-implementation.md) - Wait, this already exists!
4. Backend Architecture (2-Architecture/backend-architecture.md)
5. AI Integration (2-Architecture/ai-integration.md)
6. Anti-Cheat (4-Features/anti-cheat.md)
7. Frontend Optimization (6-Performance/frontend-optimization.md)
8. Unit Testing (8-Testing/unit-testing.md)
9. Components (9-Code-Examples/components.md)
10. Server Actions (9-Code-Examples/server-actions.md)
11. Hooks (9-Code-Examples/hooks.md)
12. Key Innovations (10-Innovation/key-innovations.md)
13. Future Roadmap (10-Innovation/future-roadmap.md)

---

**Total Files to Create: 13 files**

**Time Estimate:**
- Simple files (schema, relationships, anti-cheat, frontend-optimization, hooks): 30 min each = 2.5 hours
- Medium files (backend-architecture, ai-integration, components, server-actions): 45 min each = 2.25 hours
- Complex files (rls-implementation, unit-testing): 60 min each = 1 hour

**Total: ~7.5 hours**

---

**Create all 13 files in sequence. Each file should be comprehensive, professional, and production-ready for hackathon judges.**
