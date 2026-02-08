# MASTER PROMPT: Video Script Writer for ASCEND Hackathon

> **Purpose:** Create engaging, Gen Z-style video script for hackathon submission
> **Product:** ASCEND: Fitness RPG (Solo Leveling-inspired self-improvement system)
> **Hackathon:** Commit To Change
> **Category:** Personal Growth
> **Target Video Length:** 35-60 seconds (or 3 minutes based on requirement)

---

## 🎯 PHASE 1: CONTEXT LEARNING (MANDATORY - DO NOT SKIP)

You MUST thoroughly study the following context before writing the script. Read and understand these materials:

### 1. Product Overview

**ASCEND: Fitness RPG** is a gamified self-improvement system that transforms fitness into an epic quest experience, inspired by Solo Leveling.

**Core Philosophy:**
- **Tagline:** "Level Up Your Life" - Holistic self-improvement (physical + mental + social)
- **Target Audience:** Weebs/anime fans (120M TAM), gamers (750M SAM), young professionals seeking structure
- **Problem Solved:** Motivation crisis in self-improvement (72% quit fitness goals in 3 months)
- **Solution:** AI-powered quest system with RPG progression mechanics

**Brand Identity:**
- Inspired by Solo Leveling (legally distinct - using "System" narrative)
- Power fantasy: Transform from weak (E-Rank) to OP (S-Rank)
- "Digital Noir" aesthetic with cyberpunk elements
- Empowering narrative: "Be the protagonist of your life"

### 2. Key Features (Deep Dive)

#### Quest System
- **AI-Generated Quests:** Using Groq LLM (Llama 3.3 70B) to generate personalized workouts
- **Dynamic Difficulty:** Scales with user rank (E-S) based on level and goals
- **Class Specialization:**
  - **Tank (Strength Focus):** Compound movements, 6-10 reps, higher weights
  - **Striker (Speed Focus):** Explosive movements, cardio intervals, 15-20 reps
  - **Assassin (Agility Focus):** HIIT circuits, bodyweight exercises, plyometrics
- **Quest Types:** Strength, Cardio, HIIT, Recovery, Challenge (special events)
- **Execution Flow:** Generate quest → View details → Track sets/reps → Upload proof → AI judge evaluation → Earn XP

#### Gamification System
- **XP Sources:** Quest completion (primary), achievements, streak bonuses, special events
- **XP Formula:** Base XP × (form score + effort + consistency) × multipliers
- **Multipliers:**
  - Judge grade: E (0.8x) → D (0.9x) → C (1.0x) → B (1.1x) → A (1.3x) → S (1.5x)
  - Streak: 0-2 days (1.0x) → 3-6 days (1.1x) → 7-29 days (1.2x) → 30+ days (1.3x)
  - Hunter status: Corrupted (0.0x) → Normal (1.0x) → Verified (1.1x)
  - Proof bonus: 1.0x (no proof) → 1.1x (with proof)

- **Leveling Formula:** Level = XP^(1/1.588) / 100
- **Hunter Ranks (E-S System):**
  - **E (1-30):** Hunter - 0-600 XP
  - **D (31-60):** Knight - 601-1,500 XP
  - **C (61-90):** Elite - 1,501-6,000 XP
  - **B (91-120):** Master - 6,001-12,000 XP
  - **A (121-150):** Grandmaster - 12,001-30,000 XP
  - **S (151+):** Legend - 30,001+ XP

- **Rank-Up Requirements:** Level + quest completions + video proof + consistency (0.7+ avg score)

- **Achievements (4 categories, 20+ total):**
  - Quest: First quest, Quest Master (100), Quest Legend (500), Perfect Form
  - Rank: Rank Up E/D/C/B/A/S, S-Rank Hunter
  - Streak: 7-day, 30-day, 100-day, Year-Long
  - Social: Community Helper, Mentor, Social Butterfly, Influencer
  - Special: Verified Hunter, Anti-Cheat Champion, Event Winner, Hall of Fame

- **Streak System:** Daily tracking with progressive multipliers. Resets if user misses daily quest or skips 2+ consecutive days.

#### AI Integration
- **Groq SDK (Llama 3.3 70B):**
  - Generates personalized quest JSON based on rank, equipment, goals, time, class
  - Returns: title, description, difficulty, duration, exercises with sets/reps/weight/rest
  - Tracked via Opik: user context, quest parameters, generation time, success status

- **Opik AI (LLM-as-a-Judge):**
  - Evaluates quest completions with multi-factor scoring:
    - Form Quality (40% weight): Exercise technique from proof
    - Effort Level (30% weight): Consistency and intensity
    - Consistency (30% weight): Comparison to previous quests
  - Returns: form score, effort score, consistency score, overall score, XP multiplier, XP earned, feedback, suggestions
  - Tracked via Opik: evaluation context, scoring breakdown, success status

#### Anti-Cheat System (Unique in Fitness)
- **Layer 1: Opik Statistical Analysis (Automated):**
  - Detects statistically impossible claims (e.g., 100 pushups in 10 seconds)
  - Runs on every quest submission
  - Rejects physically impossible submissions

- **Layer 2: Social Audit (Community):**
  - All workout logs are PUBLIC by default ("Match History")
  - Users can report suspicious activity
  - Hunter Status system: Normal → Verified → Flagged → Corrupted
  - XP modifiers based on status (Verified gets 1.1x, Corrupted gets 0.0x and banned from leaderboard)

- **Layer 3: Gatekeeper (Rank-Up Exams):**
  - Video proof REQUIRED for rank promotions
  - Hand sign verification for freshness
  - Psychological deterrent even with auto-approval

#### Social Features
- **Hunter Network:** Social feed like Strava but RPG-themed
- **Kudos/Respects:** Social validation (like/heart equivalent)
- **Following/Followers:** Community building
- **Leaderboard:** Rankings excluding Corrupted users
- **Community Accountability:** Public logs create social pressure for honesty

### 3. Tech Stack (For Technical Depth in Script)

**Frontend:**
- Next.js 14 (App Router, Server Components, Server Actions)
- React 18 with TypeScript 5 (strict mode)
- Tailwind CSS with custom "System" theme (cyan neon #00FFFF, zinc-950 background)
- Framer Motion (level-up animations, transitions)
- Recharts (stats visualization)

**Backend:**
- Supabase (PostgreSQL database)
- Row-Level Security (RLS) policies for all tables
- Server Actions (no /app/api/* routes for mutations)
- Storage buckets for proof uploads

**AI Integration:**
- Groq SDK (Llama 3.3 70B) for quest generation
- Opik SDK for AI monitoring and evaluation
- Multi-factor XP calculation with grade-based multipliers

**Monitoring:**
- Opik SDK for traces (quest generation, AI judge, performance, errors)
- Goal alignment tracking: "improve_quest_quality" with success rate metric

### 4. Brand Personality & Voice

**Tone:**
- Energetic but authentic
- Gen Z-friendly but not cringy
- Empathetic but empowering
- "Power fantasy" narrative (weak to strong transformation)

**Voice Characteristics:**
- First person preferred ("We've all been there")
- Present tense for urgency
- Contractions for casual feel ("you're" instead of "you are")
- Short sentences (under 15 words)
- Active voice ("ASCEND transforms" vs "Transformation is achieved by...")
- Gaming/anime terminology used naturally (ranks, quests, XP, grind)

**What to AVOID:**
- Corporate or salesy language
- Overly formal tone
- Generic "motivation" speeches (without substance)
- Third person ("People struggle with...")
- Passive voice

**What to INCLUDE:**
- Specific pain points (concrete examples)
- Empowering language ("be the protagonist")
- Gaming references (rank up, level up, quests)
- Visual descriptions (app UI, animations)
- Authentic moments (meme-friendly, relatable)

### 5. Visual Style

**Color Palette:**
- Background: Dark zinc-950 (#09090b)
- Primary Accent: Cyan neon (#00FFFF)
- Secondary: Purple (#a855f7) for highlights
- Text: White (#ffffff) and Zinc-400 (#a1a1aa)

**Typography:**
- Headings: Space Grotesk (bold, impactful, gaming aesthetic)
- Body: Inter (clean, readable)
- Data: JetBrains Mono (tech/coding feel)

**Visual Elements:**
- Anime-inspired transitions (flash, screen shake)
- "System" UI overlays (scanlines, holographic feel)
- Progress bars with level-up animations
- Rank badges (E-S with color coding: Gray, Green, Blue, Purple, Orange, Gold)
- Text overlays: Bold, short (3-5 words max)

### 6. Hackathon Context

**Category:** Personal Growth (NOT generic "Health & Fitness")

**Judging Criteria:**
1. **Problem Statement (15-20%):** Motivation crisis in self-improvement (120M weebs seeking progression)
2. **Solution/Innovation (20-25%):** ASCEND's unique approach (AI + RPG + gamification)
3. **Market Opportunity (15-20%):** TAM 120M weebs, SAM 750M gamers, $3.2B fitness gamification market growing at 28% CAGR
4. **Technical Implementation (20-25%):** Next.js 14, Supabase, Groq, Opik integration
5. **Traction/Roadmap (15-20%):** MVP complete, 24 demo accounts, future features (mobile apps, AI chatbot, nutrition, guilds)
6. **Team/Execution (15-20%):** Working product (not vaporware), 44 files, 19,000+ lines of code/docs

**Bonus Category:** Best Use of Opik ($5,000)
- Quest generation traces documented (user context, parameters, success)
- AI judge evaluation traces (form/effort/consistency scoring, multipliers)
- Performance monitoring (API response time, database query time)
- Error tracking (global handler with traces)
- Goal alignment demonstration (quest quality improvement through data)
- User rights documentation (dashboard access, opt-out, data deletion)

**Key Differentiator for Judges:**
- This is NOT just another fitness app
- This is a holistic self-improvement system targeting an underserved niche (weebs/gamers)
- First app combining Solo Leveling narrative with AI-powered fitness
- Three-layer anti-cheat system (unique in fitness industry)
- Comprehensive Opik integration with full transparency

---

## 📝 PHASE 2: USER'S DRAFT ANALYSIS

### User's Draft (Reference - Preserve Core):

```
Everyone wants to be healthy, want that abs, and prove that youre better than your old self, but do you know that the progress of you going there.

You will need to commit while stuck in mediocricity, feeling stupid and seeing no progress on your body,

and finally you stopped Commiting to your Change. ***Title Drop***

We've all been there, new year new me, you're on fire, you go to the gym, 3 times or maybe even 7 times a week, but slowly you got burned out, you see no progress, your responsibility is piling up and you're quitting for your change.

But what if i told you, if now you can see your progress? show text WHILE MANAGING UR TIME :)

*Total 35 Secs*

---

Introducing Project ASCEND. Inspired by Solo Leveling, we made a Quest System for your Personal Growth on Fulfilling your daily training.

Product intro, demo, blabla

Outro : its time to Commit to Change,
```

### Key Elements to PRESERVE (Do Not Remove):

1. **Emotional Hook:**
   - "Everyone wants to be healthy, want that abs"
   - Relatable desire for self-improvement
   - "prove that you're better than your old self"

2. **Pain Points:**
   - "stuck in mediocrity"
   - "feeling stupid and seeing no progress"
   - "you stopped Committing to your Change" (Title Drop concept)
   - "burned out"
   - "you see no progress"
   - "responsibility is piling up"

3. **New Year Resolution Reference:**
   - "new year new me"
   - Cycle of starting and quitting
   - "you're on fire" (initial excitement)
   - "3 times or maybe even 7 times a week" (overcommitment)

4. **Title Drop Opportunity:**
   - "you stopped Committing to Your Change" → Turn into impactful phrase
   - Or better: "This is why you stop Committing to Change"

5. **Solution Reveal:**
   - "Introducing Project ASCEND"
   - "Quest System for your Personal Growth"
   - "Solo Leveling" inspiration mention

6. **Call to Action:**
   - "it's time to Commit to Change"
   - Aligns with hackathon name

### Elements to ELEVATE (Make Better):

1. **More Specific Problems:**
   - Add concrete examples: "gym intimidation", "fitness app fatigue", "boring workout routines"
   - Make it more relatable: show specific frustration moments

2. **Clearer Value Proposition:**
   - Explain WHAT ASCEND does: AI generates personalized quests → You complete → AI judges → You earn XP → You level up
   - Make the solution tangible, not abstract
   - Show the "System" in action (like the anime)

3. **Target Audience Cue:**
   - Subtle hints at weebs/gamers identity without alienating
   - "For those who love RPG progression in games, but struggle to find it in real life"
   - "If you've ever wanted to level up IRL like in your favorite anime..."

4. **Better Flow & Transitions:**
   - Smooth transition from problem → solution
   - Use "But what if..." as bridge (user already has this)
   - Build tension before solution reveal

5. **Visual Directions:**
   - Each segment needs clear visual guidance
   - Show app UI, animations, user reactions
   - Text overlays for key phrases

6. **Word Count & Timing:**
   - Current draft is around 100+ words (too long for 35 seconds)
   - Need to trim to ~75-90 words for 35s
   - Or expand to ~130-150 words for 60s

---

## 🎬 PHASE 3: SCRIPT REQUIREMENTS

### Choose Your Duration (Select ONE):

#### **Option A: 35-40 Seconds (Short, Punchy)**

**Word Count Target:** 75-90 words total
**Speaking Rate:** ~135-150 words/minute

**Structure:**

| Time | Section | Word Count | Purpose |
|------|---------|------------|---------|
| 0:00-0:05 | Hook | 15-20 words | Grab attention with relatable desire |
| 0:05-0:12 | Problem | 20-25 words | Validate pain points (stuck, no progress) |
| 0:12-0:15 | Title Drop | 10-12 words | Impactful phrase, dramatic pause |
| 0:15-0:22 | New Year Cycle | 15-18 words | Relatable pattern of starting/quitting |
| 0:22-0:28 | Solution | 18-22 words | Introduce ASCEND with key differentiators |
| 0:28-0:35 | CTA | 12-15 words | Call to action + category alignment |

#### **Option B: 60 Seconds (More Detail)**

**Word Count Target:** 130-150 words total
**Speaking Rate:** ~130-140 words/minute

**Structure:**

| Time | Section | Word Count | Purpose |
|------|---------|------------|---------|
| 0:00-0:08 | Hook | 18-22 words | Relatable desire for self-improvement |
| 0:08-0:18 | Problem Deep Dive | 25-30 words | Specific pain points (mediocrity, burnout) |
| 0:18-0:22 | Title Drop | 12-15 words | Impactful emotional climax |
| 0:22-0:32 | New Year Cycle | 20-25 words | Pattern of overcommitment and quitting |
| 0:32-0:42 | Solution (ASCEND) | 25-30 words | AI quests + RPG system explained |
| 0:42-0:50 | Demo Hint | 15-18 words | Tease product in action |
| 0:50-0:60 | CTA | 15-20 words | Call to action + hackathon name |

#### **Option C: 3 Minutes (Complete Pitch)**

**Word Count Target:** 390-450 words total
**Speaking Rate:** ~130-150 words/minute

**Structure:**

| Time | Section | Word Count | Purpose |
|------|---------|------------|---------|
| 0:00-0:30 | Hook + Problem | 65-75 words | Full context of motivation crisis |
| 0:30-1:00 | Solution + Innovation | 65-75 words | ASCEND intro + unique features |
| 1:00-1:30 | Demo Walkthrough | 0 words (show only) | Live app demo with voiceover |
| 1:30-2:00 | Market + Category | 65-75 words | Target audience + market opportunity |
| 2:00-2:30 | Tech Stack + Opik | 65-75 words | Technical depth + bonus category |
| 2:30-3:00 | Outro + CTA | 65-75 words | Final impact + call to action |

---

## ✍️ PHASE 4: WRITING GUIDELINES (CRITICAL)

### Voice & Style Rules:

1. **First Person Preference:**
   - ✅ "We've all been there"
   - ❌ "People struggle with motivation"
   - Creates empathy and connection

2. **Present Tense for Urgency:**
   - ✅ "You're stuck in mediocrity"
   - ❌ "You were stuck in mediocrity"
   - Makes it immediate and real

3. **Contractions for Casual Feel:**
   - ✅ "you're" instead of "you are"
   - ✅ "don't" instead of "do not"
   - Natural, conversational tone

4. **Short Sentences:**
   - Keep under 15 words when possible
   - Break complex ideas into 2 short sentences
   - Improves pacing and retention

5. **Active Voice:**
   - ✅ "ASCEND transforms your life"
   - ❌ "Transformation is achieved by ASCEND"
   - More direct and impactful

6. **Powerful Verbs:**
   - ✅ "smashes", "transforms", "ignites", "unlocks"
   - ❌ "is", "has", "makes", "does"
   - Creates energy and excitement

### Pacing & Timing:

**Speaking Rate:**
- Slow: 110-120 wpm (dramatic moments, emphasis)
- Normal: 130-150 wpm (most of script)
- Fast: 160-170 wpm (excitement, energy peaks)

**Word Count Targets:**
- **35s script:** 75-90 words (average 2.5-2.6 words/second)
- **60s script:** 130-150 words (average 2.3-2.5 words/second)
- **3min script:** 390-450 words (average 2.2-2.5 words/second)

**Timing Tips:**
- Pause after impactful phrases (1-2 seconds)
- Speed up during excitement (solution reveal)
- Slow down during emotional moments (pain points)
- Keep Title Drop slow and dramatic (with pause)

### Key Phrases to Include (High Priority):

**Taglines:**
- "Level Up Your Life" (brand promise)
- "Your life is now a quest" (product hook)
- "Be the protagonist" (empowerment narrative)

**Problem Phrases:**
- "stuck in mediocrity" (from user's draft)
- "feeling stupid and seeing no progress" (from user's draft)
- "you stopped Committing to Your Change" (Title Drop concept)

**Solution Phrases:**
- "ASCEND turns your workouts into epic quests" (value prop)
- "AI generates personalized challenges" (differentiator)
- "You earn XP, level up, and rank up" (RPG mechanic)

**CTA Phrases:**
- "It's time to Commit to Change" (hackathon alignment)
- "Be the protagonist of your life" (empowerment)
- "Start your journey today" (action-oriented)

### Keywords to Emphasize (Bold in Script):

- **Progress** (visible, quantifiable, trackable)
- **Motivation** (sustainable, not fleeting)
- **Community** (Hunters, kudos, support, accountability)
- **Personalized** (AI-generated, tailored to YOU)
- **Fair** (AI judge, anti-cheat, transparent)
- **Quests** (the core mechanic)
- **XP** (progression system)
- **Level Up** (growth metaphor)
- **Rank Up** (milestone achievement)

### Emotional Arc (Storytelling):

**Emotional Flow:**
1. **Empathy** (Hook): "We all want this..."
2. **Validation** (Problem): "Here's why it's hard..."
3. **Tension** (Title Drop): "This is where you stop..."
4. **Relief** (Solution): "But what if there's another way..."
5. **Excitement** (Product): "ASCEND changes everything..."
6. **Hope** (CTA): "It's time to start your journey..."

**Emotional Notes for Script Writer:**
- Hook: Warm, empathetic, understanding
- Problem: Frustrated, relatable, "I've been there too"
- Title Drop: Dramatic, powerful, pause for impact
- New Year Cycle: Nostalgic, "we've all done this"
- Solution: Energetic, excited, breakthrough moment
- CTA: Inspiring, confident, call to action

---

## 🎥 PHASE 5: VISUAL DIRECTIONS (MANDATORY)

### Format for Visual Notes:

```markdown
### Segment X: [Name] (0:00-0:XX)

**Script:** [Exact words to speak]

**Visual:** [Detailed description of what's on screen]
- [Visual element 1]
- [Visual element 2]
- [Visual element 3]

**Audio:** [Music, sound effects, voice tone]
- [Audio element 1]
- [Audio element 2]

**Text Overlays:** [Optional text on screen]
- [Text overlay 1] (timing: 0:02)
- [Text overlay 2] (timing: 0:08)

**Word Count:** XX words
**Duration:** XX seconds
**Tone Note:** [Emotional direction for voice]
```

### Visual Style Guidelines:

**App UI Elements to Show:**
- **Quest Card:** Title, difficulty badge, XP reward, duration
- **Quest Execution:** Exercise list with sets/reps, timer, checklist
- **Proof Upload:** File selector with preview
- **AI Judge Evaluation:** Score display (Form: 0.85, Effort: 0.90, etc.), XP awarded popup
- **Level Up Animation:** Progress bar fills, "LEVEL UP!" text, rank badge change
- **Hunter Status Badge:** Normal (gray), Verified (cyan ✓), Flagged (yellow ⚠️), Corrupted (red ☠️)
- **Hunter Network Feed:** User posts, kudos/respects, timestamps
- **Leaderboard:** Top hunters with rank badges, XP scores

**Text Overlay Style:**
- **Bold, Impactful:** Short phrases (3-5 words max)
- **Timing:** Appear for 2-3 seconds, then fade
- **Position:** Center or upper-third of screen
- **Animation:** Scale in (0.3s) → Hold → Scale out (0.3s)
- **Examples:**
  - "WE ALL WANT THIS" (0:02)
  - "STUCK IN MEDIOCRITY" (0:08)
  - "THE SOLUTION" (0:20)
  - "LEVEL UP YOUR LIFE" (0:28)

**Color Scheme:**
- **Background:** Zinc-950 (#09090b) - dark, immersive
- **Primary Accent:** Cyan (#00FFFF) - futuristic, "System" feel
- **Secondary:** Purple (#a855f7) - highlights, special moments
- **Text:** White (#ffffff) for headings, Zinc-400 (#a1a1aa) for body
- **Success/Energy:** Green (#10B981) for positive moments
- **Warning/Alert:** Amber (#F59E0B) for tension moments

**Typography:**
- **Headings:** Space Grotesk Bold (uppercase, impactful)
- **Body:** Inter Regular (clean, readable)
- **Data:** JetBrains Mono (monospace, tech feel)

**Animation Style:**
- **Transitions:** 0.5-2 second cuts (fast-paced for Gen Z)
- **Effects:**
  - Flash: Quick white flash (0.2s) for dramatic moments
  - Screen shake: Slight shake (10px) for impact
  - Scanlines: Subtle "System" overlay (opacity 5%)
  - Glitch: Occasional glitch effect (0.1s) for "System" feel
  - Level-up: Particle burst + "LEVEL UP!" text scale-in

**Camera/Shot Types:**
- **Wide shot:** App interface full screen
- **Close-up:** Specific UI elements (XP popup, rank badge)
- **Split screen:** Before/after (bored vs engaged, problem vs solution)
- **Montage:** Quick cuts of different features (3-5 seconds each)

### Music & Sound Effects:

**Music Arc:**
- **0:00-0:05 (Hook):** Low, melancholic piano → empathy
- **0:05-0:15 (Problem):** Builds tension, slight dissonance → frustration
- **0:15-0:20 (Title Drop):** Dramatic drop, silence (0.5s), then slow build → impact
- **0:20-0:30 (New Year):** Nostalgic, hopeful → relatable
- **0:30-0:40 (Solution):** Energy peaks, epic, anime-style → excitement
- **0:40-0:50 (Product):** Upbeat, driving, modern → action
- **0:50-0:60 (CTA):** Epic climax, dramatic drop → inspiration

**Sound Effects (SFX):**
- **Quest generation:** "System" chime (ding + digital hum)
- **Level up:** Fanfare + "LEVEL UP!" voice (or text-only)
- **Rank up:** More epic fanfare + rank announcement
- **XP earned:** Coin chime + number counter animation
- **Kudos/respect:** Notification ping
- **Title Drop:** Dramatic whoosh + impact sound

### Example Visual Direction:

```markdown
### Segment 1: Hook (0:00-0:05)

**Script:** "Everyone wants to be healthy, see those abs, and prove you're better than your old self."

**Visual:**
- Split screen:
  - Left: Person looking at mirror, disappointed expression
  - Right: Anime-style character powering up, energy aura
- Text overlay: "WE ALL WANT THIS" (center, bold, timing: 0:02)
- Slow pan across screen

**Audio:**
- Music: Low, melancholic piano (slow tempo, minor key)
- SFX: None (builds tension)

**Text Overlays:**
- "WE ALL WANT THIS" (0:02-0:04)

**Word Count:** 20 words
**Duration:** 5 seconds
**Tone Note:** Warm, empathetic, understanding
```

---

## 🚀 PHASE 6: DELIVERABLES (What You Must Output)

### Complete Script Format:

```markdown
# ASCEND: Fitness RPG - Hackathon Video Script

## Script Overview
- **Total Duration:** XX seconds / 3 minutes
- **Total Word Count:** XXX words
- **Target Audience:** Weebs, gamers, young professionals
- **Style:** Gen Z, energetic, authentic, power fantasy
- **Hackathon:** Commit To Change
- **Category:** Personal Growth

## Full Script with Visuals

### Segment 1: [Segment Name] (0:00-0:XX)

**Script:** [Exact words to speak]

**Visual:** [Detailed description]
- [Visual element 1]
- [Visual element 2]

**Audio:** [Music, SFX]
- [Audio element 1]
- [Audio element 2]

**Text Overlays:** [Optional]
- [Text] (timing)

**Word Count:** XX words
**Duration:** XX seconds
**Tone Note:** [Emotional direction]

[Continue for all segments...]

## Summary Statistics
- **Problem clarity:** X/5
- **Solution clarity:** X/5
- **Gen Z appeal:** X/5
- **Brand alignment:** X/5
- **Visual clarity:** X/5
- **Overall quality:** X/5

## Production Notes
- **Music recommendations:** [Specific tracks or genres]
- **SFX library:** [Recommended sound packs]
- **Footage needed:** [List of app screens to capture]
- **Animation specs:** [Specific animation timings]
- **Color correction:** [Grading notes]
```

### What Script Writer Must Deliver:

1. **Complete Script** with accurate timestamps (0:00-0:XX)
2. **Visual Directions** for each segment (detailed, actionable)
3. **Audio Suggestions** (music arc, SFX timing)
4. **Text Overlays** with timing
5. **Word Count** per segment and total
6. **Estimated Duration** for each segment (must add up to target)
7. **Tone Notes** for voice direction (emotional arc)
8. **Summary Statistics** (self-evaluation)
9. **Production Notes** (practical guidance for editing)

---

## 📊 PHASE 7: EVALUATION CRITERIA (Self-Check)

### Content Quality Checklist (Script Writer Must Verify):

**Problem Statement:**
- [ ] Hook captures attention in first 5 seconds
- [ ] Problem is relatable to target audience (weebs/gamers)
- [ ] Specific pain points mentioned (mediocrity, burnout, no progress)
- [ ] Emotional empathy established ("we've all been there")
- [ ] New Year cycle referenced (relatable pattern)

**Solution/Innovation:**
- [ ] ASCEND clearly explained (AI quests + RPG system)
- [ ] Key differentiators highlighted (AI judge, progression, social)
- [ ] Value proposition is tangible (earn XP, level up, rank up)
- [ ] Target audience cue included (weebs/gamers identity)
- [ ] "Level Up Your Life" tagline included

**Market & Category:**
- [ ] "Personal Growth" category mentioned or implied
- [ ] Hackathon name ("Commit To Change") referenced
- [ ] Market opportunity hinted (120M weebs, gamers)
- [ ] Innovation shown (unique approach vs competitors)

**Call to Action:**
- [ ] CTA is clear and compelling
- [ ] "It's time to Commit to Change" included
- [ ] Demo account mention (if applicable)
- [ ] Contact info or next steps clear

### Style Quality Checklist:

**Tone & Voice:**
- [ ] Gen Z-friendly but not cringy
- [ ] Authentic and relatable
- [ ] Confident but not arrogant
- [ ] First person used appropriately
- [ ] Present tense for urgency
- [ ] Contractions for casual feel
- [ ] Short sentences (under 15 words)
- [ ] Active voice throughout

**Brand Personality:**
- [ ] Energetic and exciting
- [ ] Empowering narrative ("be the protagonist")
- [ ] Gaming/anime terminology used naturally
- [ ] Power fantasy elements present (weak to strong)
- [ ] Authentic moments included (relatable humor)

### Technical Quality Checklist:

**Timing & Pacing:**
- [ ] Word count fits target duration (±10%)
- [ ] Speaking rate consistent (130-150 wpm)
- [ ] Timestamps are accurate
- [ ] Total duration matches target (35s/60s/3min)
- [ ] Pacing varies (slow for emotion, fast for excitement)

**Visual Directions:**
- [ ] Visual descriptions are clear and actionable
- [ ] App UI elements specified (quest card, XP popup, etc.)
- [ ] Text overlays included with timing
- [ ] Color scheme consistent (zinc-950, cyan, purple)
- [ ] Animation style defined (flash, screen shake, scanlines)

**Audio Suggestions:**
- [ ] Music arc makes sense (builds tension, peaks at solution)
- [ ] SFX timing is appropriate
- [ ] Tone notes for voice are clear
- [ ] Music genre recommendations specific

### Innovation & Bonus Checklist:

**Meme-Friendly Moments:**
- [ ] At least 1 relatable/humorous moment
- [ ] Self-deprecation used appropriately ("we've all done this")
- [ ] Viral potential (memorable lines, quotable phrases)

**Unexpected Transitions:**
- [ ] At least 1 creative transition (not standard cuts)
- [ ] Title drop is impactful with pause
- [ ] Energy peaks at solution reveal

**Category Alignment:**
- [ ] "Personal Growth" explicitly mentioned
- [ ] Holistic growth implied (physical + mental + social)
- [ ] "Commit To Change" hackathon name included

**Opik Bonus (If 3-min version):**
- [ ] Opik integration mentioned (AI judge, traces)
- [ ] Technical depth shown (Next.js, Supabase, Groq)
- [ ] "Best Use of Opik" referenced or implied

---

## 🎯 PHASE 8: FINAL NOTES & REMINDERS

### CRITICAL - Do NOT Skip These:

1. **STUDY CONTEXT FIRST (Phase 1):**
   - Read all reference materials (README, market analysis, features)
   - Understand product deeply before writing
   - Don't guess - use actual product knowledge

2. **PRESERVE USER'S DRAFT CORE (Phase 2):**
   - Keep emotional hook: "Everyone wants to be healthy..."
   - Keep pain points: "stuck in mediocrity", "feeling stupid"
   - Keep Title Drop concept: "stopped Committing to Change"
   - Keep New Year cycle reference
   - Keep CTA: "it's time to Commit to Change"
   - ELEVATE these elements, don't replace them

3. **ELEVATE THE MESSAGE:**
   - Add specificity to problems (concrete examples)
   - Make solution more tangible (explain HOW it works)
   - Include target audience cue (weebs/gamers)
   - Add better flow and smooth transitions
   - Ensure timing accuracy (word counts match durations)

4. **MATCH BRAND PERSONALITY:**
   - Tone: Energetic, authentic, Gen Z-friendly
   - Voice: First person, present tense, active
   - Style: Gaming/anime terminology naturally
   - Not corporate, not salesy, not boring

5. **INCLUDE VISUAL DIRECTIONS:**
   - Every segment needs visual guidance
   - Show app UI elements (quest card, XP popup, level up)
   - Text overlays with timing
   - Color scheme consistency

6. **TIMING ACCURACY:**
   - Word counts MUST match target duration
   - Timestamps must be accurate
   - Total duration: 35s (75-90 words) or 60s (130-150 words) or 3min (390-450 words)
   - Speaking rate: 130-150 words/minute

### What Makes This Script Special:

- **It's a STORY, not a pitch:** Transformative narrative from weak to strong
- **It SPEAKS the audience's language:** Gaming/anime terms, relatable struggles
- **It SHOWS, not just TELLS:** Visual directions make it concrete
- **It balances AUTHENTICITY with PROFESSIONALISM:** Relatable but credible
- **It aligns PERFECTLY with hackathon criteria:** Personal Growth, innovation, technical depth

### Common Mistakes to AVOID:

❌ **Don't write in third person:** "People struggle with..." → Use first person: "We've all been there..."
❌ **Don't use passive voice:** "Transformation is achieved by..." → Use active: "ASCEND transforms..."
❌ **Don't be generic:** "ASCEND is a fitness app" → Be specific: "ASCEND turns workouts into epic quests"
❌ **Don't skip visual directions:** Script is useless without visual guidance
❌ **Don't ignore timing:** Wrong word count = wrong duration = wasted production time
❌ **Don't be corporate:** Use "You're stuck" not "Individuals experience stagnation"
❌ **Don't be cringy:** "Swag", "yeet", "no cap" → Avoid forced Gen Z slang
❌ **Don't skip context learning:** You MUST understand the product first

### Success Metrics for Script Writer:

**If you check all these boxes, you're ready:**
- [ ] Read Phase 1 (Context Learning) thoroughly
- [ ] Understood product features (Quest system, Gamification, AI, Anti-Cheat, Social)
- [ ] Analyzed user's draft (Phase 2) - preserving core, elevating message
- [ ] Chose target duration (35s/60s/3min)
- [ ] Followed writing guidelines (Phase 4) - voice, pacing, emotional arc
- [ ] Included visual directions (Phase 5) - detailed, actionable
- [ ] Met all deliverables (Phase 6) - complete script format
- [ ] Self-evaluated using criteria (Phase 7) - quality check
- [ ] Final script preserves user's emotional core
- [ ] Final script elevates message without losing authenticity
- [ ] Final script is ready for production (editor can execute immediately)

---

## 📚 REFERENCE MATERIALS (Already Provided - Use These)

You have access to the following documents. Reference them as needed:

1. **README.md** - Product overview, tech stack, demo accounts
2. **3-MINUTE-PITCH-STRATEGY.md** - Timing, structure, word counts, breakdown
3. **MARKET-ANALYSIS.md** - Target audience, market size, positioning, SWOT
4. **PITCH-DECK-STRATEGY.md** - Video production strategy, Gen Z style
5. **gitbook/4-Features/quest-system.md** - AI quest generation, execution, completion, AI judge
6. **gitbook/4-Features/gamification.md** - XP system, leveling, ranks, achievements, streaks
7. **FINAL-SUMMARY.md** - Hackathon readiness, statistics, Opik integration

### How to Use These References:

- **For product details:** Check README.md, quest-system.md, gamification.md
- **For audience understanding:** Check MARKET-ANALYSIS.md (psychographics, pain points)
- **For timing guidance:** Check 3-MINUTE-PITCH-STRATEGY.md (word counts, structure)
- **For visual style:** Check PITCH-DECK-STRATEGY.md (Gen Z aesthetic, animations)
- **For hackathon criteria:** Check FINAL-SUMMARY.md (judging categories, Opik bonus)

---

## 🎬 READY TO WRITE? GREAT!

**Your Mission:**

1. **Study Phase 1 (Context Learning)** - Don't skip this. Understand ASCEND deeply.
2. **Analyze user's draft (Phase 2)** - Identify what to preserve vs elevate.
3. **Choose target duration (Phase 3)** - 35s, 60s, or 3min?
4. **Follow writing guidelines (Phase 4)** - Voice, pacing, emotional arc.
5. **Create visual directions (Phase 5)** - Make it actionable for editors.
6. **Deliver complete script (Phase 6)** - All 9 deliverables required.
7. **Self-evaluate (Phase 7)** - Use the checklist to verify quality.
8. **Final review (Phase 8)** - Ensure no critical mistakes.

**The Goal:**

Deliver a script that's:
- ✅ Authentic and relatable to target audience (weebs/gamers)
- ✅ Engaging and exciting (Gen Z-style but not cringy)
- ✅ Clear on value proposition (ASCEND = AI quests + RPG progression)
- ✅ Ready for production (visual directions, timing, audio suggestions)
- ✅ Aligned with hackathon criteria (Personal Growth category)
- ✅ Preserving user's emotional core (hook, pain points, Title Drop, CTA)
- ✅ Elevating the message (specificity, clarity, flow)

**This script isn't just words on paper. It's the roadmap to winning the hackathon.** 🚀

---

**START WRITING. GOOD LUCK.**

*This master prompt is designed to ensure the script writer deeply understands ASCEND, preserves the user's vision, elevates the content to professional standards, and delivers a script that's ready for immediate video production.*