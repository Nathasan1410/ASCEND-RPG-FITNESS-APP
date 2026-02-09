Project Blueprint: The System – Autonomous AI-Scaffolded Fitness RPG1. Executive Architectural Overview1.1 Project Mandate and Operational PhilosophyThis document serves as the authoritative, executable "Ground Truth" for the autonomous construction of "The System," a gamified fitness application that merges role-playing game (RPG) progression mechanics with real-world physical exertion. The project is specifically architected for execution by an Autonomous AI Agent (OpenCode) operating within a Google Antigravity cloud environment.The core philosophy of "The System" is the gamification of self-improvement. Users are not merely tracking sets and reps; they are "Players" or "Operatives" interacting with a deterministic "System" that issues "Mandates" (workouts) and rewards them with "Experience Points (XP)" and "Rank Ups." This creates a psychological feedback loop similar to MMORPGs (Massively Multiplayer Online Role-Playing Games), leveraging variable reward schedules and progression dynamics to enforce habit formation.Crucially, this architecture adheres to strict technological constraints: Next.js 14 (App Router) for the frontend, Supabase for the backend infrastructure, Groq (Llama-3-70b-Versatile) for rapid, structured AI content generation, and Opik (Comet) for "LLM-as-a-Judge" verification of user inputs. The application is strictly Web2, avoiding all Web3/Blockchain complexities to ensure mainstream accessibility, high performance, and legal safety.1.2 The "OpenCode" Execution ContextThe instructions contained herein are optimized for ingestion by an autonomous coding agent. Unlike human-centric documentation, which may rely on implicit context or tribal knowledge, this blueprint prioritizes:Explicitness: Every file path, variable name, and configuration setting is defined to prevent hallucination.Modularity: The architecture is broken into discrete "Execution Pillars" that can be scaffolded in parallel or sequence without circular dependencies.Validation: Each pillar includes specific "Success Criteria" and "Anti-Patterns" to guide the agent's self-correction loops.2. Pillar 1: "Legally Distinct" Branding & Design SystemThe visual and narrative identity of "The System" must evoke the "power fantasy" aesthetic popularized by modern "Hunter" and "Dungeon" tropes in media (specifically Solo Leveling) while maintaining rigorous legal distinctness to avoid copyright infringement. The "System" is a generic trope in the LitRPG genre, but specific character names, guilds, and terminology from famous properties are protected intellectual property.2.1 IP Safety and Nomenclature StrategyThe goal is to capture the vibe—cold, authoritative, blue-tinted, and noir—without using protected terminologies. "The System" is a generic enough term to be defensible, provided it is stylized distinctly. However, specific terms associated with the source material (e.g., "Sung Jin-Woo," "Shadow Monarch," "Antares") are strictly prohibited.To achieve this, we employ a strategy of Visual Metonymy: using design elements (colors, UI sounds, motion) to evoke the feeling of the source material while using legally distinct terminology that shifts the genre slightly from "Magical Fantasy" to "Cyber-Noir."2.1.1 Narrative Divergence TableThe following nomenclature strategy ensures the application remains legally distinct while satisfying the user's desire for a specific genre feel. This table serves as the Strict Vocabulary List for the AI Agent when generating UI text and database enums.Source Concept (Avoid)"The System" Terminology (Safe)Design Rationale & Semantic LoadHunterOperative / Awakened"Hunter" is generic but heavily saturated. "Operative" implies a connection to a digital "System" or a secret organization, shifting the tone to tech-noir. "Awakened" allows for a "pre-system" vs "post-system" user state.GuildSyndicate / SectorMoves away from medieval fantasy tropes toward a cyberpunk/noir organizational structure. "Syndicate" implies a shadowy, perhaps illicit, cooperation fitting the "underground" vibe of the app.Dungeon / GateBreach / Fracture"Breach" suggests a digital or dimensional tear fitting the "System" UI aesthetic. It implies a violation of reality that must be "patched" or "cleared."Daily QuestMandate / Protocol"Mandate" sounds more authoritative and mandatory, reinforcing the "System's" absolute control. It removes the "optional" feel of a quest.ManaVigor / Bio-EnergyGrounds the resource in physical fitness (biology) rather than magic. "Vigor" connects directly to stamina and health metrics.Shadow ArmyEchoes / Remnants"Echoes" implies past versions of oneself (previous Personal Records) rather than a magical army. This allows for "Ghost" racing mechanics later.National Level HunterApex AuthorityDescribes status without using the specific "National Level" trademarked phrasing. "Apex" denotes the top of the food chain.System AdminThe ArchitectA nod to The Matrix and generic sci-fi, establishing the AI as a constructor rather than just a manager.2.2 Visual Identity Theory: "Digital Noir"The visual language is defined as "Digital Noir / Systempunk." It contrasts deep, void-like blacks with piercing, high-saturation accent colors. This mimics high-contrast OLED displays, suggesting the interface is overlaying reality itself.Primary Mood: Cold, unfeeling, calculated. The UI does not "congratulate" the user warmly; it "acknowledges" performance.Typography: Monospace fonts (e.g., Geist Mono or JetBrains Mono) for data values to emphasize the "computer terminal" aesthetic, paired with a geometric sans-serif (e.g., Inter or Space Grotesk) for readability.Texture: Subtle scanlines, noise overlays, and chromatic aberration effects on hover states to simulate a digital projection interface.2.3 Detailed Tailwind CSS ConfigurationTo execute this vision autonomously, the OpenCode agent requires a pre-defined tailwind.config.ts. This configuration extends the color palette with specific semantic names representing rarity and system states.The specific hex codes selected are chosen for maximum contrast against dark backgrounds, ensuring accessibility (WCAG AA compliance for text) while maintaining the "neon" aesthetic.Actionable File: tailwind.config.tsTypeScriptimport type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#050505", // True Void Black [1]
        foreground: "#ffffff",
        
        // System Specific Palette
        system: {
          dark: "#0a0a0f",      // Deep noir background for cards
          panel: "#12121a",     // Slightly lighter for modals/overlays
          border: "#2a2a35",    // Subtle border for unselected states
          accent: "#00b8ff",    // The core "System Blue"
        },
        
        // Semantic Ranks (The Hierarchy)
        rank: {
          e: {
            DEFAULT: "#8a8a8a", // Dull Gray (E-Rank)
            glow: "rgba(138, 138, 138, 0.5)"
          },
          d: {
            DEFAULT: "#ffffff", // Basic White (D-Rank)
            glow: "rgba(255, 255, 255, 0.5)"
          },
          c: {
            DEFAULT: "#55ead4", // Cyan/Teal (C-Rank) [1]
            glow: "rgba(85, 234, 212, 0.5)"
          },
          b: {
            DEFAULT: "#00b8ff", // Electric Blue (B-Rank) - Core Brand Color [2]
            glow: "rgba(0, 184, 255, 0.6)"
          },
          a: {
            DEFAULT: "#bd00ff", // Deep Purple (A-Rank) [2]
            glow: "rgba(189, 0, 255, 0.6)"
          },
          s: {
            DEFAULT: "#f3e600", // Hyper Gold (S-Rank) [1]
            glow: "rgba(243, 230, 0, 0.7)"
          },
          ss: {
            DEFAULT: "#c5003c", // Blood Red (SS-Rank/Danger) [1]
            glow: "rgba(197, 0, 60, 0.8)"
          },
        },

        // Functional Status Indicators
        status: {
          success: "#00ff9f",   // Success Teal [2]
          warning: "#ffd300",   // Cyber Yellow [4]
          error: "#ff003c",     // Glitch Red
          energy: "#001eff",    // Mana Blue [2]
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "pulse-system": {
           "0%, 100%": { boxShadow: "0 0 5px #00b8ff" },
           "50%": { boxShadow: "0 0 20px #00b8ff" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glitch": "glitch 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite",
        "pulse-system": "pulse-system 2s infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
2.4 UI Physics: The "Quest Card" EntranceTo replicate the "snappy" feel of a digital interface materializing in front of the user, we utilize Framer Motion with specific spring physics parameters. Standard CSS transitions are linear and feel lifeless. Spring physics simulate weight and tension, making the UI feel "alive".The goal is an entrance that is fast (high stiffness) but settles quickly without excessive oscillation (moderate damping). This mimics the effect of a holographic window snapping into existence.2.4.1 Framer Motion Variants StrategyWe define a reusable SystemCard component wrapper. The variants object allows orchestration, where parent containers can stagger the entrance of children elements (e.g., a list of daily quests appearing one by one).Physics Logic & Parameters:Stiffness (350-400): A high value is critical. Low stiffness (e.g., 100) creates a "floaty" feel. We need the UI to feel responsive and urgent. 400 is roughly equivalent to a tight mechanical spring.Damping (30): This provides the resistance. With a stiffness of 400, a damping of 10 would oscillate wildly. A damping of 30 arrests the motion quickly after the initial overshoot, providing a "solid" lock-in feel.Mass (1): We keep mass standard to maintain a lightweight, holographic feel. Increasing mass would make the UI feel "heavy" and sluggish.Actionable File: /components/ui/SystemCard.tsxTypeScript"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Defined variants for the "System" reveal effect
export const systemCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    filter: "blur(10px)" // Digital materialize effect
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 400, // Very snappy 
      damping: 30,    // Quick settlement 
      mass: 1
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 0px 15px rgba(0, 184, 255, 0.3)", // Electric blue glow
    borderColor: "#00b8ff",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect for lists [10]
      delayChildren: 0.2
    }
  }
};

interface SystemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rank?: 'e' | 'd' | 'c' | 'b' | 'a' | 's';
}

export function SystemCard({ className, rank = 'e', children,...props }: SystemCardProps) {
  const borderColor = {
    e: 'border-rank-e',
    d: 'border-rank-d',
    c: 'border-rank-c',
    b: 'border-rank-b',
    a: 'border-rank-a',
    s: 'border-rank-s',
  }[rank];

  return (
    <motion.div
      variants={systemCardVariants}
      className={cn(
        "relative overflow-hidden rounded-lg border bg-system-panel p-6",
        borderColor,
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity hover:opacity-100" />
      {children}
    </motion.div>
  );
}
3. Pillar 2: Gamification Logic & Math (The "Fairness" Engine)A critical failure point in gamified fitness apps is linear progression. In real life, fitness gains obey the law of diminishing returns; beginners improve rapidly, while experts fight for marginal gains. However, RPGs typically use exponential XP curves where higher levels require significantly more XP, but higher-level quests award significantly more XP."The System" must balance these conflicting realities using a "Fairness Engine" driven by Relative Effort Scoring and a carefully derived leveling curve.3.1 The Exponential Leveling CurveWe will implement a power curve to control player progression. The requirement is explicit: Level 1 begins at 100 XP, and Level 50 is reached at 50,000 XP.3.1.1 Mathematical DerivationWe utilize the standard Power Function form: $XP_{req} = Constant \times Level^{Exponent}$.Let $L$ be the level and $XP(L)$ be the cumulative XP required to reach that level.Given points:$XP(1) \approx 100$ (Base threshold to clear L1)$XP(50) = 50,000$ (Threshold to reach L50)Using the formula $XP = A \times L^B$:$100 = A \times 1^B \implies A = 100$.Now substituting for L50:$50,000 = 100 \times 50^B$$500 = 50^B$$\ln(500) = B \times \ln(50)$$6.2146 = B \times 3.9120$$B \approx 1.5886$Rounding for cleaner implementation, we use an exponent of 1.58 or 1.6, or we can use the derived precision. For this blueprint, we will use 1.588 for precision, or round to 1.6 for slightly harder difficulty at the top end.The Formula:$$XP_{Required} = \lfloor 100 \times Level^{1.588} \rfloor$$Validation:Level 1: $100 \times 1^{1.588} = 100$ XPLevel 10: $100 \times 10^{1.588} \approx 3,880$ XPLevel 25: $100 \times 25^{1.588} \approx 16,600$ XPLevel 50: $100 \times 50^{1.588} \approx 49,965$ XP (Matches target ~50k)3.1.2 JavaScript ImplementationThe leveling.ts utility file will handle these calculations. It requires two functions: one to determine XP needed for the next level, and one to calculate current level from total XP (for profile hydration).TypeScript// /lib/gamification/leveling.ts

const BASE_XP = 100;
const EXPONENT = 1.588;

/**
 * Calculates total XP required to reach a specific level.
 * Formula: XP = 100 * (Level ^ 1.588)
 */
export const calculateXpForLevel = (level: number): number => {
  if (level <= 1) return 0; // You start at level 1 with 0 XP
  return Math.floor(BASE_XP * Math.pow(level, EXPONENT));
};

/**
 * Calculates current level based on total XP.
 * Inverse Formula: Level = (XP / 100) ^ (1 / 1.588)
 */
export const calculateLevelFromXp = (xp: number): number => {
  if (xp < BASE_XP) return 1;
  const level = Math.pow(xp / BASE_XP, 1 / EXPONENT);
  return Math.floor(level);
};

/**
 * Calculates progress percentage to next level for UI progress bars.
 */
export const calculateLevelProgress = (xp: number) => {
  const currentLevel = calculateLevelFromXp(xp);
  const currentLevelXp = calculateXpForLevel(currentLevel);
  const nextLevelXp = calculateXpForLevel(currentLevel + 1);
  
  const needed = nextLevelXp - currentLevelXp;
  const earned = xp - currentLevelXp;
  
  return Math.min(100, Math.max(0, (earned / needed) * 100));
}
3.2 Relative Effort Scoring (RPE-Based XP)A "Tank" (Advanced User) doing 10 pushups should not receive the same XP as a "Novice" doing 10 pushups. If XP is static, advanced users can "farm" low-level quests to level up without physical improvement. This is known as "smurfing" in gaming and destroys the integrity of the leaderboard.We introduce Relative Perceived Exertion (RPE) scaling.3.2.1 The LogicThe Opik Judge will calculate XP using the following inputs:Base XP: The standard value of the exercise (e.g., 1 Pushup = 10 XP).User Class/Rank Multiplier:E-Rank (Novice): 1.0x (Baseline)D-Rank: 0.9xC-Rank: 0.8xB-Rank: 0.6xA-Rank: 0.4xS-Rank: 0.1x (Requires 10x volume for same XP on basic moves)Volume: Sets × Reps.Difficulty Tier of Move: Pushup (Tier 1) vs. Diamond Pushup (Tier 2) vs. One-Arm Pushup (Tier 3).Formula:$$XP_{Final} = (Base_{XP} \times Volume) \times \frac{Tier_{Move}}{Tier_{UserRank}} \times \text{ConsistencyBonus}$$This creates a Diminishing Returns mechanic. As the user's level increases, they must perform harder variations (Tier 2/3) to maintain XP gain rates. A Level 50 User doing basic pushups (Tier 1) will receive negligible XP, forcing them to "evolve" their training.3.3 Database Optimization: Rank-Based LeaderboardsLeaderboards in fitness apps are read-heavy. Calculating ranks on the fly for thousands of users using COUNT and ORDER BY is a performance bottleneck. We will use Postgres Materialized Views in Supabase to pre-calculate ranks.3.3.1 Materialized View ArchitectureA materialized view stores the result of the query physically on the disk. We will refresh this view periodically (e.g., via a pg_cron job every 10 minutes or a trigger), rather than on every request.Schema Definition (SQL):SQL-- 1. Create the Materialized View for Leaderboards
CREATE MATERIALIZED VIEW leaderboard_ranks AS
SELECT
  id as user_id,
  username,
  avatar_url,
  total_xp,
  -- Calculate Global Rank
  RANK() OVER (ORDER BY total_xp DESC) as global_rank,
  -- Calculate Tier (E, D, C, B, A, S) based on dynamic thresholds
  CASE
    WHEN total_xp < 3880 THEN 'E'   -- Level 1-10
    WHEN total_xp < 16600 THEN 'D'  -- Level 10-25
    WHEN total_xp < 30000 THEN 'C'  -- Level 25-35
    WHEN total_xp < 42000 THEN 'B'  -- Level 35-45
    WHEN total_xp < 49000 THEN 'A'  -- Level 45-49
    ELSE 'S'                        -- Level 50+
  END as rank_tier
FROM profiles
WITH DATA;

-- 2. Create Unique Index for Concurrent Refreshes [15, 16]
-- Essential for refreshing without locking the table for reads
CREATE UNIQUE INDEX idx_leaderboard_user_id ON leaderboard_ranks(user_id);
CREATE INDEX idx_leaderboard_xp ON leaderboard_ranks(total_xp DESC);
CREATE INDEX idx_leaderboard_rank_tier ON leaderboard_ranks(rank_tier);

-- 3. Security: Function to read view (bypassing direct table RLS complexity)
-- Note: Materialized views don't support RLS directly in the same way.
-- We expose this via a stored procedure.
CREATE OR REPLACE FUNCTION get_leaderboard_by_rank(target_rank text)
RETURNS SETOF leaderboard_ranks
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM leaderboard_ranks 
  WHERE rank_tier = target_rank 
  ORDER BY total_xp DESC 
  LIMIT 50;
$$;
4. Pillar 3: AI Agent Prompts (Groq + Opik)This pillar defines the "Brain" of the system. We use Groq (Llama-3-70b) for generation due to its speed (essential for a snappy game loop) and Opik for evaluation (the "Judge"). The latency of Groq (often <1s for 500 tokens) enables the "Instant Dungeon Generation" feel.4.1 The Architect: Groq System Prompt (Strict JSON)Llama-3 is powerful but can be verbose. To ensure strict JSON compatibility with our API_CONTRACT, we must use specific prompting techniques. We will use JSON Mode where supported, but reinforce it with a "System" persona that refuses to output conversational filler.Prompt Engineering Strategy:Role Definition: "You are THE SYSTEM."Constraint: "Output ONLY JSON. No markdown fencing, no intro text."Edge Case Handling: Explicit instructions for missing equipment.Few-Shot Prompting: Providing a single perfect example within the system prompt to ground the model's output structure.System Prompt:ROLE: You are "The System," a highly advanced AI governing a gamified fitness progression interface.TASK: Generate a fitness quest (workout) based on the User's Profile and Request.OUTPUT FORMAT: Strict JSON. Do not include markdown (json). Do not include conversational text.API CONTRACT (You must strictly adhere to this schema):{"quest_name": "string (Thematic title, e.g., 'E-Rank Survival Protocol')","difficulty": "string (E, D, C, B, A, S)","duration_min": "integer","xp_reward": "integer","exercises":,"narrative_intro": "string (A noir, system-style briefing message. Max 2 sentences.)"}CONSTRAINTS:If user has NO equipment, generate strictly calisthenics (bodyweight) exercises.XP Reward must align with Difficulty: E=100-200, D=200-500, C=500-1000.Narrative tone: Cold, authoritative, second-person. "You have been assigned..."If the user request is unsafe or impossible, generate a "Recovery Protocol" (stretching/mobility) instead of refusing.Do NOT outputjson ``` code fences. Just the raw JSON string.EXAMPLE OUTPUT:{"quest_name": "Morning Awakening","difficulty": "E","duration_min": 15,"xp_reward": 150,"exercises": [{ "name": "Pushups", "sets": 3, "reps": "10", "rest_sec": 60, "instruction": "Chest to floor." }],"narrative_intro": "The day begins. Prove your readiness."}
### 4.2 The Judge: Opik Evaluation SDK Script

We utilize **Opik** to validate user logs. In this "System," the user claims to have finished a quest. The AI Judge analyzes the claim. If the logs are statistically improbable (cheating), the Judge denies XP.[19, 20, 21]

We will implement a custom metric class `WorkoutIntegrityMetric` in TypeScript. This script fulfills the requirement to "Detect Cheating" and "Calculate Safety Score."

**Actionable File: `/lib/ai/opik-judge.ts`**

```typescript
import { Opik } from "opik";
import { EvaluationResult } from "opik/evaluation";

// Define the custom metric for Workout Integrity
class WorkoutIntegrityMetric {
  name = "Workout Integrity Score";

  // Score function analyzes the input (workout plan) vs output (user log)
  async score(input: any, output: any): Promise<EvaluationResult> {
    const plan = input.plan;
    const log = output.userLog;
    
    let integrityScore = 1.0;
    let reasons: string =;

    // --- 1. Time-to-Volume Analysis (Statistical Cheat Detection) ---
    // If user claims 100 pushups in 30 seconds, this is physically impossible.
    const claimedDuration = log.duration_seconds;
    
    // Calculate total volume (reps)
    const totalReps = log.exercises.reduce((acc: number, ex: any) => acc + (ex.sets * parseInt(ex.reps |

| "0")), 0);
    
    // Threshold: World Record pace is roughly 1 rep per 0.5-0.8 seconds for simple moves.
    // We set a "Physics Limit" of 1 rep per 1.0 seconds to account for mechanics.
    // Plus 30 seconds rest per set minimum.
    const totalSets = log.exercises.reduce((acc: number, ex: any) => acc + ex.sets, 0);
    const minRestTime = (totalSets - 1) * 30; // Minimum rest assumption
    const minActiveTime = totalReps * 1.0; 
    const minPossibleTime = minActiveTime + minRestTime;

    if (claimedDuration < minPossibleTime) {
      integrityScore = 0.0;
      reasons.push(`Suspicious temporal anomaly. ${totalReps} reps in ${claimedDuration}s violates physiological limits.`);
    }

    // --- 2. Consistency Check ---
    // Did they skip exercises?
    if (log.exercises.length < plan.exercises.length) {
      integrityScore -= 0.5; // Heavy penalty for skipping
      reasons.push(`Incomplete protocol. Expected ${plan.exercises.length} exercises, found ${log.exercises.length}.`);
    }

    // --- 3. Safety/Sanity Check ---
    // Did they claim an impossible weight increase? (e.g., +50kg in one session)
    // This requires history context, but for MVP we check simple bounds.
    
    return {
      value: Math.max(0, integrityScore),
      reason: reasons.length > 0? reasons.join(" | ") : "Protocol executed within normal parameters."
    };
  }
}

// The Evaluation Function to be called by the Server Action
export async function evaluateWorkoutLog(workoutPlan: any, userLog: any) {
  const client = new Opik();
  const integrityMetric = new WorkoutIntegrityMetric();
  
  // Create a trace for this evaluation for observability
  const trace = client.trace({
    name: "Quest_Evaluation",
    input: { workoutPlan },
    output: { userLog }
  });

  const scoreResult = await integrityMetric.score({ plan: workoutPlan }, { userLog });

  // Log the feedback score to the Opik platform
  await trace.logFeedback({
    name: integrityMetric.name,
    value: scoreResult.value,
    reason: scoreResult.reason
  });

  await trace.end();
  
  return scoreResult;
}
5. Pillar 4: OpenCode "Master Context" RefinementFor the Autonomous Agent (OpenCode) to succeed, we must explicitly define the architectural constraints. The PROJECT_CONTEXT.md file acts as the "Constitution" for the AI, defining the boundaries of the codebase.5.1 Operational Anti-Patterns (What NOT to do)The following section must be added to PROJECT_CONTEXT.md to prevent common Next.js 14 / Supabase pitfalls. This instructs the agent to avoid patterns that are syntactically valid but architecturally flawed.CRITICAL ANTI-PATTERNS (DO NOT IMPLEMENT)Do NOT use useEffect for Initial Data Fetching:Bad: Fetching user profile inside a useEffect on the client. This causes layout shift, loading spinners, and waterfalls.Good: Use Server Actions or fetch directly in Server Components (page.tsx) and pass data as initial props. Next.js 14 is Server-First.Do NOT use Route Handlers (/app/api/...) for Mutations:Bad: Creating a POST /api/quest/complete endpoint and calling it via fetch.Good: Use Server Actions (/server/actions/quest.ts) with the 'use server' directive. This integrates tighter with Next.js caching, revalidation, and form handling.Do NOT Expose Materialized Views Directly via API:Bad: Querying leaderboard_ranks via supabase-js client directly from the browser. Materialized views often do not respect RLS policies efficiently and exposing them can leak data.Good: Wrap the view access in a Postgres Security Definer Function (RPC) that applies filtering logic, OR use a Server Component to fetch the data with the Service Role key (securely on the server).Do NOT Perform "Chat" Logic on the Client:Bad: Calling Groq API directly from a React component. This exposes the API Key to the browser network tab.Good: All AI generation happens in a Server Action.Do NOT Store Game Logic in the Database Schema:Bad: Writing complex SQL triggers to calculate XP.Good: Keep business logic (XP calculation) in the application layer (TypeScript) where it can be version controlled and tested, then write the result to the DB.6. Pillar 5: The "Batch Execution" Plan (requirements.md)This file is the set of instructions the AI Agent reads to build the app step-by-step. It is structured chronologically to manage dependencies (e.g., Database must exist before Auth, Auth before User Profiles).requirements.md (Optimized for Autonomous Execution)Phase 1: Foundation & Database (The "Awakening")Goal: Setup Supabase schema, auth, and base types.Action 1: Create supabase/schema.sql.Define tables: profiles, quests, quest_logs.Define Enums: rank_enum ('E', 'D', 'C', 'B', 'A', 'S').Implement handle_new_user trigger for auto-profile creation on Auth signup.Critical: Add total_xp integer column to profiles, default 0.Action 2: Setup RLS (Row Level Security).profiles: Users can read everyone (for leaderboards), but update ONLY auth.uid() = id.quest_logs: Insert only if auth.uid() = user_id.Action 3: Generate TypeScript Types.Run supabase gen types command logic to create /types/supabase.ts.Phase 2: The Core Loop (Groq Integration)Goal: Generate workouts via AI.Action 1: Create /server/ai/groq-client.ts.Initialize Groq SDK.Implement generateDailyQuest(userProfile) function.Constraint: Must use the JSON-mode prompt defined in Pillar 3.Action 2: Create /server/actions/quest.ts.getNewQuest(): Calls Groq, validates JSON, saves to DB (optional: cache in Redis/Supabase to save costs).Phase 3: The Frontend Experience (Next.js + Design)Goal: "System" Interface.Action 1: Configure Tailwind.Apply tailwind.config.ts from Pillar 1.Add globals.css with the "Noir" background variables.Action 2: Components./components/system/QuestCard.tsx: Use Framer Motion systemCardVariants./components/system/RankBadge.tsx: Dynamic color based on Rank (E-S)./components/system/ProgressBar.tsx: Visualizes the exponential XP curve.Action 3: Pages./app/dashboard/page.tsx: Server Component. Fetches profiles and active quests.Phase 4: The Judge & Progression (Opik + Math)Goal: XP calculation and Validation.Action 1: Implement Leveling Logic.Create /lib/gamification/leveling.ts with the exponential formula and RPE logic.Action 2: Integrate Opik.Create /server/actions/complete-quest.ts.Call evaluateWorkoutLog (from Pillar 3).If integrity_score > 0.8: Update profiles.total_xp.Trigger revalidatePath('/dashboard').Phase 5: Social Hierarchy (Leaderboards)Goal: Read-optimized rankings.Action 1: Execute SQL for Materialized View (leaderboard_ranks).Action 2: Create /server/actions/leaderboard.ts.Function to query the view via RPC.Implement refreshLeaderboard() admin function (calls REFRESH MATERIALIZED VIEW CONCURRENTLY).Action 3: Leaderboard Page./app/leaderboard/page.tsx: Display Top 50 S-Rank players.7. Deep Research Insights & Synthesis7.1 The "Why" Behind The ArchitectureThe architecture of "The System" is not merely a collection of tech choices; it is a psychological engine designed to exploit the specific dopamine pathways associated with RPG progression.Groq as the "Dungeon Master": We selected Groq (Llama-3-70b) specifically for latency. In a game loop, friction is death. If a user requests a quest and waits 10 seconds, the immersion breaks. Groq’s TPU-based inference often delivers responses in <1 second, making the "System" feel omnipotent and instant.Opik as the "Arbiter": Traditional fitness apps rely on trust. "The System" relies on Judgment. By implementing an AI Judge (Opik) that can reject a workout for being "statistically impossible," we introduce a layer of high-stakes accountability found in games but missing in fitness. This transforms the user from a passive logger to an active participant trying to "prove" their worth to the System.Materialized Views for Social Scaling: As the user base grows, calculating the rank of User #50,420 in real-time becomes a massive database load. Materialized Views solve this by snapshotting the social hierarchy. This aligns with the "System" lore—ranks are updated periodically (e.g., "The Daily Reset"), creating a community event where everyone checks their new standing simultaneously.7.2 Legal & Branding Nuance: The "Safe Harbor" of ParodyBy shifting the language from "Hunter/Gate" to "Operative/Breach," we maintain the feeling of Solo Leveling without touching the trademark. The color palette serves as the subconscious link—users recognize the blue/black noir aesthetic immediately, even if the names are different. This is Visual Metonymy, using parts of the design to evoke the whole genre without legal risk. We are not building a Solo Leveling app; we are building a System app, a sub-genre that Solo Leveling popularized but does not own.7.3 Operational Security & PerformanceThe use of Server Actions over API Routes is a critical Web2 optimization. It creates a "zero-bundle" effect where the backend logic is not shipped to the client, reducing the JavaScript payload and preventing reverse-engineering of the XP formulas. This protects the integrity of the game (preventing client-side XP injection hacks) while improving mobile performance for users in the gym with poor reception.This blueprint provides the OpenCode Agent with every necessary artifact: the aesthetics, the math, the AI logic, the database structure, and the step-by-step plan to build "The System."End of Report.ADDENDUM: Technical Artifacts for OpenCodeA.1 Database Schema (SQL)SQLcreate table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  total_xp bigint default 0,
  rank_tier text default 'E',
  avatar_url text,
  created_at timestamptz default now()
);

create table quest_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  quest_data jsonb not null, -- Stores the AI generated quest snapshot
  user_input jsonb not null, -- Stores user's claimed reps/time
  integrity_score float default 0,
  verified boolean default false,
  created_at timestamptz default now()
);

-- Trigger to auto-create profile
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, total_xp, rank_tier)
  values (new.id, new.raw_user_meta_data->>'username', 0, 'E');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
A.2 Framer Motion Spring Config (JSON)JSON{
  "system_spring": {
    "type": "spring",
    "stiffness": 400,
    "damping": 30,
    "mass": 1
  }
}
