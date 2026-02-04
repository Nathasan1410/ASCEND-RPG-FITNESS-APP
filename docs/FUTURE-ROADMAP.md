# 🚀 FUTURE ROADMAP - ASCEND: FITNESS RPG

> **Last Updated:** February 5, 2026
> **Version:** 1.0
> **Status:** Unsorted execution order (as requested)

---

## 🤖 CORE FEATURE: AI CHATBOT

### Purpose
An AI-powered chatbot that helps users understand WHY they're doing each exercise, provides real-time coaching, and explains the fitness science behind their workouts.

### User Problem
Users complete exercises without understanding:
- **"Why am I doing this?"** - No context for purpose
- **"Is this form right?"** - Uncertainty about technique
- **"How many reps?"** - Reliance on external references
- **"Am I doing enough?"** - Confusion about progression

### Solution
AI Chatbot integrated throughout the app provides:
- **Exercise explanations** - Why this movement targets specific muscles
- **Form coaching** - Real-time technique feedback
- **Science breakdown** - Biomechanics and physiology simplified
- **Motivation** - Context-aware encouragement based on user's progress
- **Adaptation** - Suggests alternatives if an exercise isn't working for user

### Implementation Plan

#### Phase 1: Integration Core (Priority: HIGH)
- [ ] Add chat button to Quest Detail page
- [ ] Add chat button to Quest Tracking page
- [ ] Add chat button to Dashboard
- [ ] Create chat history (last 7 days)
- [ ] Integrate with Groq AI (context-aware)
- [ ] Context: User's current quest, exercises completed, form history

#### Phase 2: AI Capabilities (Priority: HIGH)
- [ ] Explain exercise purpose ("This targets your quadriceps")
- [ ] Describe form cues ("Keep chest up, drive through heels")
- [ ] Suggest modifications ("If knee pain, try X instead")
- [ ] Track user questions ("Why did we do this?")
- [ ] Learn from patterns ("User asks about squats every Tuesday")
- [ ] Provide alternatives ("Try Bulgarian split for better focus")

#### Phase 3: Personalization (Priority: MEDIUM)
- [ ] Remember user's fitness goals
- [ ] Track injuries and limitations
- [ ] Adjust advice based on class (Tank/Striker/Assassin)
- [ ] Language adaptation (beginner vs advanced users)
- [ ] Tone matching (encouraging for beginners, technical for experts)

#### Phase 4: Analytics (Priority: LOW)
- [ ] Track most asked questions
- [ ] Monitor satisfaction with chatbot
- [ ] Identify knowledge gaps
- [ ] Improve prompts based on feedback

### Technical Implementation
```typescript
// lib/ai/chatbot.ts
import { createChatCompletion } from '@groq/sdk';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: ChatContext;
}

interface ChatContext {
  questId?: string;
  currentExercise?: string;
  userGoals: string[];
  injuries: string[];
  class: 'Tank' | 'Striker' | 'Assassin';
  level: number;
  xp: number;
}

const CHATBOT_SYSTEM_PROMPT = `You are ASCEND's AI Fitness Coach.

Your Purpose:
- Help users understand WHY they're doing each exercise
- Provide real-time technique coaching
- Explain fitness science in simple terms
- Motivate users through their fitness journey
- Suggest safe alternatives when needed

User Context (provided for each query):
- Current quest being completed
- Exercise being performed
- User's fitness goals (strength, hypertrophy, endurance, etc.)
- User's injuries or limitations
- Hunter class (Tank/Striker/Assassin)
- Current level and XP
- Previous questions and answers

Rules:
1. Always explain the WHY first, then the HOW
2. Use encouraging, motivational tone
3. Adapt language to user's fitness level (beginner vs advanced)
4. Consider user's class specialization
5. Never provide medical advice - suggest consulting a doctor
6. Track user's understanding over time
7. Remember past conversations for context

Response Format:
1. Exercise Purpose (1-2 sentences)
2. Technique Tips (bullet points, 2-4)
3. Science Explanation (simple terms, 1-2 sentences)
4. Modification Suggestions (if applicable, 1-2 options)
5. Motivation (1 encouraging sentence)

Examples:

Q: "Why are we doing squats?"
A: "Squats are fantastic because they target your quadriceps, hamstrings, and glutes simultaneously - giving you the most bang for your buck! 🦵

The Purpose: This compound movement builds lower body strength and power, which translates to better athletic performance in sports and daily activities.

Technique Tips:
- Keep your chest up and maintain a neutral spine
- Drive through your HEELS, not your toes
- Push your hips back as you descend
- Keep your weight centered over mid-foot
- Descend until your thighs are at least parallel to the ground (or slightly below for squat depth)

Science: Squats load the largest muscles in your body (quads, hamstrings, glutes) and trigger a strong hormonal response that supports muscle growth and strength gains. They're also highly functional - simulating the motion of sitting down and standing up!

Q: "My knees hurt during squats. What should I do?"
A: I understand - knee pain is serious and you should prioritize your safety. Here's what I recommend:

1. STOP immediately if you feel sharp, shooting, or grinding pain
2. Try these safer alternatives:
   - Front squats (knees may track forward better)
   - Goblet squats (more comfortable range)
   - Leg press machine (controlled movement)
   - Bulgarian split squats (reduces knee stress)
   
3. Strengthen supporting muscles:
   - Glute bridges
   - Clamshells
   - Hip flexor stretches
   - Hamstring curls

4. Consult a physical therapist or sports medicine doctor
5. When you return to squats, reduce weight and focus on form

Remember: Pain is your body's way of saying "stop." Listen to it and come back stronger! 💪

Q: "How many reps should I do for bicep curls?"
A: Great question! For bicep curls, here's what I recommend:

- Hypertrophy (Muscle Growth): 3-4 sets of 8-12 reps with 60-90 seconds rest
  - Higher rep range with moderate weight maximizes muscle growth
  - Focus on the ECCENTRIC phase (lowering the weight slowly)
  
- Strength: 3-5 sets of 5-8 reps with 2-3 minutes rest
  - Heavier weight, lower rep range
  - Control is more important than speed

- Your Level (Tank, B-Rank): Since you're building strength, start with 3-4 sets of 8-10 reps
- Progression: Increase weight by 5-10% when you can complete all sets with perfect form

Remember: Quality beats quantity! Perfect form with moderate weight beats cheating with heavy weight. 🎯`;

export async function getChatbotResponse(
  userMessage: string,
  context: ChatContext
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
    // Add previous chat history for context
    ...context.chatHistory.slice(-5),
  ];

  const response = await createChatCompletion({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
}
```

---

## 🍎 NUTRITION TRACKING: MICRO & MACROS

### Purpose
Simple, frictionless nutrition tracking where users input meals in "dirty" ways (no food database, no barcode scanning). AI analyzes and provides guidance.

### User Problem
Current solutions are too complex:
- **"I don't know the macro count for this meal"** - Requires database lookups
- **"Scanning this takes too long"** - Barcode scanning is slow
- **"How do I log this restaurant meal?"** - Can't find exact match
- **"I'm eating at a restaurant and don't want to calculate everything"** - Overwhelming

### Solution
Users input simple descriptions:
- **"Chicken breast with rice"** - AI estimates macros
- **"Protein shake after workout"** - AI adds to daily totals
- **"Snack: handful of nuts"** - Quick logging
- **"Homemade: pasta with tomato sauce"** - AI estimates portions

AI Features:
- Smart macro estimation from simple descriptions
- Meal suggestions based on user's goals
- Quick-add common foods (protein shakes, fruits, snacks)
- Daily/weekly macro targets with progress tracking
- Hydration reminders
- No database needed - pure AI estimation

### Implementation Plan

#### Phase 1: Quick Input System (Priority: HIGH)
- [ ] Meal input form with simple text field
- [ ] AI estimates macros from description
- [ ] Portion size suggestions (small/medium/large)
- [ ] Quick-add common foods (favorites)
- [ ] Meal type detection (breakfast, lunch, dinner, snack)

#### Phase 2: Macro Intelligence (Priority: HIGH)
- [ ] Calculate protein, carbs, fats from description
- [ ] Estimate calories based on portion
- [ ] Suggest macro distribution based on goals
- [ ] Learn user's eating patterns
- [ ] Adapt suggestions over time

#### Phase 3: Goal Tracking (Priority: MEDIUM)
- [ ] Daily protein target
- [ ] Daily calorie target
- [ ] Weekly macro goals
- [ ] Progress visualization
- [ ] Adjust goals based on activity level

#### Phase 4: Analytics (Priority: LOW)
- [ ] Track accuracy of AI estimates
- [ ] Monitor user satisfaction
- [ ] Identify most logged foods
- [ ] Suggest improvements

### Technical Implementation
```typescript
// types/nutrition.ts
interface Meal {
  id: string;
  userId: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'post_workout';
  timestamp: Date;
  aiEstimates?: MacroEstimates;
}

interface MacroEstimates {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface UserNutritionGoals {
  dailyProtein: number;
  dailyCalories: number;
  weeklyProtein: number;
}

// lib/ai/nutrition-ai.ts
const NUTRITION_SYSTEM_PROMPT = `You are ASCEND's Nutrition Assistant.

Your Purpose:
- Help users track nutrition effortlessly
- Estimate macros from simple food descriptions
- Provide smart suggestions based on user's goals
- Make nutrition tracking frictionless

Estimation Rules:
1. Be conservative - it's better to underestimate than overestimate
2. Consider portion sizes (small/medium/large)
3. Account for cooking methods (grilled adds fat)
4. Round to nearest 5g increments for simplicity
5. Hydrated foods have water content
6. Protein sources: chicken breast (~31g/100g), eggs (~6g/50g), etc.

Macro Breakdown (per 100g):
- Chicken breast: ~31g protein, 0g carbs, 3.6g fat
- Rice (cooked): ~2.7g protein, 28g carbs, 0.3g fat
- Eggs (2 large): ~12g protein, 1.1g carbs, 10g fat
- Almonds (30g): ~6g protein, 6g carbs, 17g fat

Response Format:
{
  "estimated_macros": {
    "protein": number (in grams),
    "carbs": number (in grams),
    "fats": number (in grams),
    "calories": number
  },
  "portion_size": "small/medium/large",
  "confidence": "high/medium/low",
  "suggestions": ["tip1", "tip2", "tip3"]
}

Examples:

Q: "I had chicken breast with rice for lunch"
A: {
  "estimated_macros": {
    "protein": 33.7,
    "carbs": 28,
    "fats": 3.9,
    "calories": 280
  },
  "portion_size": "medium",
  "confidence": "high",
  "suggestions": [
    "Great protein source! Chicken breast provides ~31g of protein per 100g.",
    "Consider adding vegetables for fiber and micronutrients.",
    "This meal is perfect for your post-workout recovery."
  ]
}

Q: "Protein shake after workout - chocolate flavor"
A: {
  "estimated_macros": {
    "protein": 24,
    "carbs": 12,
    "fats": 3,
    "calories": 175
  },
  "portion_size": "small (one scoop)",
  "confidence": "high",
  "suggestions": [
    "Great timing for post-workout recovery!",
    "Consider adding a banana or some berries for quick carbs.",
    "Chocolate whey is tasty, but consider unflavored if watching sugar intake."
  ]
}`;

export async function estimateMacrosFromDescription(
  description: string,
  userGoals: UserNutritionGoals
): Promise<MacroEstimates> {
  const messages = [
    { role: 'system', content: NUTRITION_SYSTEM_PROMPT },
    { role: 'user', content: `My nutrition goals: ${userGoals.dailyProtein}g protein, ${userGoals.dailyCalories} calories. ${description}` },
  ];

  const response = await createChatCompletion({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.3,
    max_tokens: 300,
  });

  const estimates = JSON.parse(response.choices[0].message.content);
  return estimates;
}
```

---

## 📱 IOT SCALE TRACKING

### Purpose
Allow users to track their fitness equipment, supplements, and body measurements. Connects to smart devices for automated logging.

### User Problem
Equipment and supplement tracking is manual:
- **"I forgot to log my creatine dose yesterday"** - No reminders
- **"How much protein powder do I have left?"** - Manual inventory check
- **"Did I take my pre-workout supplement?"** - No tracking
- **"My weight has been 180lb for 2 weeks"** - Manual measurement

### Solution
Smart device integration:
- **Bluetooth scales** - Auto-weigh supplements, log to database
- **Smart shaker bottles** - Track protein shake consumption
- **Body composition scales** - Auto-log body fat %, muscle mass
- **Supplement reminders** - Notifications via app when to take
- **Low inventory alerts** - Remind user to reorder

### Device Types

#### Smart Scales
- Bluetooth kitchen scales (Xiaomi Mi, Withings, etc.)
- Automatically log weight to database
- Sync with app via Bluetooth
- Cost: $20-50

#### Smart Bottles
- Bluetooth protein shaker bottles (Promix, BlenderBottle)
- Track shake count (bottle has compartments)
- Auto-sync consumption
- Cost: $30-60

#### Body Composition Devices
- Bluetooth body fat scales (Renpho, Tanita)
- Muscle mass tracking
- Body fat percentage
- Hydration levels
- Cost: $50-150

#### Wearable Integration
- Apple Watch
- Fitbit
- Garmin
- Auto-logger steps, heart rate during workouts

### Implementation Plan

#### Phase 1: Device Support (Priority: HIGH)
- [ ] Bluetooth scale integration API
- [ ] Bluetooth bottle integration API
- [ ] Auto-logging workflows
- [ ] Device pairing interface

#### Phase 2: Supplement Tracking (Priority: HIGH)
- [ ] Inventory management (creatinine, protein powder, etc.)
- [ ] Serving size tracking (scoops per day)
- [ ] Daily/weekly dose tracking
- [ ] Low inventory alerts

#### Phase 3: Body Composition (Priority: MEDIUM)
- [ ] Body fat % tracking
- [ ] Muscle mass tracking
- [ ] Weight trends with graphs
- [ ] Progress photos

#### Phase 4: Analytics (Priority: LOW)
- [ ] Correlate supplement usage with progress
- [ ] Analyze weight trends
- [ ] Provide insights

### Technical Implementation
```typescript
// types/iot.ts
interface BluetoothDevice {
  id: string;
  name: string;
  type: 'scale' | 'bottle' | 'body_comp';
  status: 'connected' | 'disconnected' | 'pairing';
  lastSync: Date;
}

interface SupplementInventory {
  productId: string;
  name: string;
  currentStock: number;
  dailyServing: number;
  lastRefill: Date;
}

// lib/iot/bluetooth.ts
class BluetoothManager {
  async scanForDevices(): Promise<BluetoothDevice[]> {
    // Use Web Bluetooth API
    // Return discovered scales, bottles, etc.
  }

  async connectToDevice(device: BluetoothDevice): Promise<boolean> {
    // Pair with device
    // Set up notifications
  }

  async syncWeightFromScale(deviceId: string): Promise<number> {
    // Get current weight from scale
    // Log to database
  }

  async syncSupplementFromBottle(deviceId: string): Promise<number> {
    // Get remaining powder in bottle
    // Update inventory
  }
}
```

---

## 🛠️ GYM TOOLS INTEGRATION

### Purpose
Integrate with gym equipment APIs for automatic logging and enhanced workout data.

### Equipment APIs to Support

#### Gym Equipment APIs
- **Technogym API** - Popular gym chains (technogym.com)
  - Auto-log machine workouts
  - Track resistance used
  - Sync with ASCEND

- **Peloton API** - Connected fitness equipment
  - Auto-log classes
  - Sync heart rate data
  - Track calories burned

- **iFit API** - Apple Watch, Garmin integration
  - Sync wearable data
  - Auto-log outdoor activities

- **Echelon** - Connected fitness equipment
  - Track trainer-led sessions
  - Log resistance training

### Implementation Plan

#### Phase 1: API Integration (Priority: HIGH)
- [ ] Research available APIs
- [ ] Select best APIs for ASCEND
- [ ] Implement OAuth flows
- [ ] Test data syncing

#### Phase 2: Auto-Logging (Priority: MEDIUM)
- [ ] Auto-log equipment workouts
- [ ] Sync with quest system
- [ ] Match difficulty to equipment used
- [ ] Track resistance progression

#### Phase 3: Enhanced Analytics (Priority: LOW)
- [ ] Analyze equipment usage patterns
- [ ] Suggest optimal equipment configurations
- [ ] Track wear and maintenance needs

---

## 📊 BETTER STATS TRACKER

### Purpose
Replace simple stats dashboard with comprehensive analytics, graphs, and insights similar to GitHub contribution graphs.

### Current Limitations
Basic stats display:
- Total XP only
- Level only
- Rank only
- Quest completion count only

### Solution
GitHub-style stats with:
- Activity heatmaps (when user works out)
- Progress graphs (XP over time, weight trends)
- Streak visualizations (calendar view)
- Comparative stats (vs similar users)
- Performance metrics (completion rate, consistency score)
- Detailed breakdowns by exercise type, muscle group

### Implementation Plan

#### Phase 1: Activity Tracking (Priority: HIGH)
- [ ] Track daily quest completion times
- [ ] Track workout duration
- [ ] Track rest days
- [ ] Activity heatmap visualization
- [ ] Streak calendar view

#### Phase 2: Progress Graphs (Priority: HIGH)
- [ ] XP over time (line graph)
- [ ] Weight trends (line graph with moving average)
- [ ] Body composition changes
- [ ] Level progression (milestone markers)
- [ ] Quest difficulty distribution (bar chart)

#### Phase 3: Comparative Stats (Priority: MEDIUM)
- [ ] Compare to users at same level
- [ ] Show percentile rankings
- [ ] Compare to class average
- [ ] Show global rank trends

#### Phase 4: Insights Engine (Priority: MEDIUM)
- [ ] Identify best workout days
- [ ] Identify weak areas
- [ ] Suggest optimal quest times
- [ ] Pattern recognition (rest day vs workout day)

### Technical Implementation
```typescript
// lib/analytics/stats-engine.ts
interface UserActivity {
  date: Date;
  xpEarned: number;
  questsCompleted: number;
  workoutDuration: number;
  exercises: number;
  qualityScore: number;
}

interface ProgressData {
  xpHistory: Array<{ date: Date, xp: number }>;
  weightHistory: Array<{ date: Date, weight: number }>;
  questHistory: Array<{ date: Date, difficulty: string, completed: boolean }>;
}

class StatsEngine {
  generateActivityHeatmap(activities: UserActivity[]): HeatmapData {
    // Generate GitHub-style contribution heatmap
  }

  generateProgressGraphs(data: ProgressData): GraphData {
    // Generate multiple chart types
  }

  getComparativeStats(userId: string, level: number): ComparisonData {
    // Compare user to others at same level
  }

  getInsights(activities: UserActivity[]): Insights {
    // Identify patterns and suggest improvements
  }
}
```

---

## 🌐 SOCIAL MEDIA INTEGRATION

### Purpose
Proper social media integration, not just basic sharing. Full OAuth, posting, and engagement tracking.

### Platforms to Support

#### Primary Platforms
- **Instagram** - Share workout photos, quest completions, achievements
  - OAuth integration
  - Auto-post with captions and hashtags
  - Track engagement (likes, comments)
  - Instagram Stories integration (share quest highlights)

- **TikTok** - Share workout videos, transformation clips
  - OAuth integration
  - Auto-post with trending sounds
  - Track views and engagement
  - Duets/React features

#### Secondary Platforms
- **Twitter/X** - Share quick updates, achievements
- **Strava** - Sync workout data (for cross-platform visibility)
- **YouTube** - Share longer workout videos, tutorials

### Implementation Plan

#### Phase 1: OAuth Integration (Priority: HIGH)
- [ ] Instagram OAuth flow
- [ ] TikTok OAuth flow
- [ ] Twitter OAuth flow
- [ ] Secure token storage

#### Phase 2: Auto-Posting (Priority: MEDIUM)
- [ ] Auto-post quest completions
- [ ] Auto-post rank-ups
- [ ] Auto-post achievements
- [ ] Customizable captions
- [ ] Hashtag management

#### Phase 3: Engagement Tracking (Priority: LOW)
- [ ] Track likes and comments
- [ ] Track views and shares
- [ ] Analyze best posting times
- [ ] Engagement analytics dashboard

---

## 💬 CUSTOM WORKOUT BUILDER

### Purpose
Allow users to create completely custom workouts instead of AI-generated quests. Users define exercises, sets, reps, and AI provides guidance and tracking.

### User Problem
AI-generated quests may not fit:
- **"I want to focus on shoulders today"** - AI generates generic workout
- **"My gym doesn't have that machine"** - Quest adapts to wrong equipment
- **"I'm doing a specialized split"** - AI doesn't understand the protocol
- **"I want to do 5x5, but AI keeps giving me 3x12"** - Fixed progression

### Solution
Custom workout builder with:
- **Exercise selection** - Choose from library or create custom
- **Flexible parameters** - Sets, reps, weight, rest times
- **Circuit builder** - Chain exercises with different stations
- **Superset support** - Two exercises back-to-back
- **Dropset support** - Decreasing weight each set
- **AI coaching** - AI provides tips for custom workouts
- **Save & reuse** - Save favorite custom workouts

### Implementation Plan

#### Phase 1: Exercise Library (Priority: HIGH)
- [ ] Pre-built exercise library (100+ exercises)
- [ ] Exercise categories (compound, isolation, bodyweight, calisthenics)
- [ ] Muscle group targeting
- [ ] Difficulty levels for each exercise
- [ ] Video demonstrations

#### Phase 2: Custom Builder (Priority: HIGH)
- [ ] Add/remove exercises
- [ ] Edit parameters (sets, reps, weight, rest)
- [ ] Circuit builder interface
- [ ] Timer integration
- [ ] Save custom workouts
- [ ] Duplicate workouts

#### Phase 3: AI Integration (Priority: MEDIUM)
- [ ] AI reviews custom workouts
- [ ] AI suggests exercise alternatives
- [ ] AI optimizes exercise order
- [ ] AI provides form cues
- [ ] AI estimates difficulty

#### Phase 4: Progress Tracking (Priority: MEDIUM)
- [ ] Track custom workout completions
- [ ] Track personal records (PRs)
- [ ] Compare to previous sessions
- [ ] Progress over time

---

## 🏰 GUILD FEATURES

### Purpose
Team-based gameplay with dungeons, raids, boss battles, and territory wars. Competitive guild system for social engagement.

### Features

#### Dungeon Raid
- **Similar to HIIT** - High-intensity guild challenge
- **Time-limited** - 1 hour completion goal
- **Leaderboard** - Guild vs Guild competition
- **Rewards** - Guild XP, titles, territory control
- **Difficulty scaling** - E to S dungeons

#### Boss Raid
- **Power challenge** - Defeat powerful boss monster
- **Co-op** - 4-8 hunters required
- **Phase-based** - Multiple mechanics to master
- **Strategy** - Class-specific roles (Tank tanks, Strikers DPS)
- **Rewards** - Epic loot, titles

#### Weekly Challenges
- **Individual competition** - Most XP in 7 days
- **Categories** - Most quests, most XP, most consistent
- **Guild ranking** - Average guild score
- **Personal ranking** - Individual leaderboard

#### Monthly Challenges
- **Major event** - 30-day challenge
- **Theme-based** - Strength month, Cardio month, etc.
- **Guild participation** - Guild vs Guild competition
- **Global leaderboard** - All hunters compete

#### IRL Events
- **Guild Raid** - Real-world meetup
- **Guild War** - Physical competition between guilds
- **Territory Battle** - Capture gym/locations
- **Reward** - Guild recognition, prizes

### Implementation Plan

#### Phase 1: Guild System (Priority: HIGH)
- [ ] Create guild
- [ ] Invite members
- [ ] Guild chat/discord
- [ ] Guild ranks (Leader, Officer, Member)
- [ ] Guild XP bank

#### Phase 2: Dungeons (Priority: HIGH)
- [ ] Dungeon generator
- [ ] Dungeon progression
- [ ] Raid matchmaking
- [ ] Raid rewards
- [ ] Leaderboard

#### Phase 3: Bosses (Priority: MEDIUM)
- [ ] Boss generator
- [ ] Boss mechanics
- [ ] Phase design
- [ ] Co-op raids
- [ ] Boss loot

#### Phase 4: Challenges (Priority: MEDIUM)
- [ ] Weekly challenges
- [ ] Monthly events
- [ ] Challenge leaderboards
- [ ] Rewards distribution

---

## 🏆 MONETIZATION: FREE + PRO

### Purpose
Freemium model where core experience is free, but premium features are available via subscription or one-time purchase.

### Free Tier (Always Free)
- ✅ Quest generation (AI-powered)
- ✅ AI judge evaluation
- ✅ XP and leveling system
- ✅ Social features (feed, kudos, follows)
- ✅ Leaderboard
- ✅ Daily quests
- ✅ Custom workouts (basic)

### Pro Tier (Subscription)
- ✅ Unlimited custom workouts
- ✅ Advanced analytics (heatmaps, graphs)
- ✅ AI chatbot access
- ✅ Macro tracking
- ✅ IOT device integration
- ✅ Priority support
- ✅ Guild features
- ✅ Ad-free experience
- ✅ Early access to new features
- **Pricing:** $9.99/month or $99.99/year

### Max Tier (Subscription)
- ✅ All Pro features
- ✅ Personal AI coach
- ✅ Workout analysis and optimization
- ✅ Nutrition planning
- ✅ Discord bot integration
- ✅ Custom workouts with AI suggestions
- ✅ Priority support (24h response)
- ✅ Exclusive challenges and events
- ✅ Premium badges and titles
- **Pricing:** $19.99/month or $199.99/year

### Max Havent Thoughts
- **Guild Raid Entry Fee:** $5 per raid (prevents abuse)
- **Boss Raid Entry Fee:** $10 per raid
- **Territory War Entry:** Free to all guilds
- **Weekly Challenge Entry:** Free
- **Monthly Challenge Entry:** Free
- **IRL Event Tickets:** $10-$25 (venue costs)
- **Premium Currency (Havent Tokens):** Earn through daily login, completing challenges, guild events
- **Havent Tokens Use:** Buy exclusive cosmetics, skip raid fees, access premium features temporarily

### Implementation Plan

#### Phase 1: Subscription System (Priority: HIGH)
- [ ] Stripe integration
- [ ] Subscription tiers (Free, Pro, Max)
- [ ] Payment processing
- [ ] Receipts and invoices
- [ ] Cancel subscription flow
- [ ] Downgrade flow

#### Phase 2: Premium Features (Priority: HIGH)
- [ ] Feature flags per tier
- [ ] Upgrade prompts for free users
- [ ] Downgrade flow for Pro users
- [ ] Usage analytics

#### Phase 3: Currency System (Priority: MEDIUM)
- [ ] Havent Tokens implementation
- [ ] Token earning methods
- [ ] Token marketplace
- [ ] Token spending

---

## 📈 LEADERBOARD 2.0

### Purpose
Advanced leaderboards with GitHub-style stats visualization, multiple ranking categories, and historical data.

### Features

#### Multi-Category Rankings
- **Global XP Leaderboard** - All hunters
- **Weekly XP Leaderboard** - Last 7 days
- **Monthly XP Leaderboard** - Current month
- **Quest Streak Leaderboard** - Longest streaks
- **Completion Rate** - Quest success percentage
- **Consistency Score** - Average judge score

#### GitHub-Style Stats
- **Contribution Graph** - Daily XP over time (like GitHub commits)
- **Activity Heatmap** - Workout intensity calendar
- **Profile Views** - How many people viewed profile
- **Social Engagement** - Kudos given/received
- **Guild Rankings** - Guild XP leaderboards

#### Historical Data
- **Rank history** - When user reached each rank
- **Level history** - When user leveled up
- **Quest history** - All completed quests
- **Weight trends** - Body composition over time
- **Performance metrics** - Completion rate trends

### Implementation Plan

#### Phase 1: Enhanced Leaderboard (Priority: HIGH)
- [ ] Multi-category tabs
- [ ] Filtering (by rank, class, region)
- [ ] Search functionality
- [ ] GitHub-style graphs
- [ ] Historical data view

#### Phase 2: Analytics Integration (Priority: MEDIUM)
- [ ] Connect to stats engine
- [ ] Generate insights
- [ ] Compare with averages
- [ ] Identify trends

---

## ⚔ REAL-WORLD INTEGRATION

### Purpose
Connect ASCEND with the real world through partnerships, events, and offline features.

### Partnership Opportunities

#### Gym Chains
- **Technogym** - Auto-log workouts, equipment tracking
- **Planet Fitness** - Quest integration, member discounts
- **Gold's Gym** - Custom workout plans based on ASCEND goals
- **Local Gyms** - Partner with independent gyms for events

#### Fitness Apps
- **MyFitnessPal** - Sync workout data
- **Strava** - Cross-platform activity sync
- **Fitbit** - Wearable integration for heart rate
- **Apple Health** - Centralize health data

#### Nutrition Brands
- **MyProtein** - Supplement ordering, macro tracking
- **Optimum Nutrition** - Meal plans based on goals
- **GNC** - Product integration, discounts

### IRL Events

#### Guild Meetups
- **Local Events** - Organize city-wide gatherings
- **Workout Competitions** - Physical challenges
- **Social Mixers** - Networking and fun
- **Prizes and Sponsors** - Branded events

#### Territory Battles
- **Gym Takeover** - Guilds compete for gym locations
- **City Events** - Urban exploration challenges
- **Virtual Territories** - Digital territory control

### Implementation Plan

#### Phase 1: Partnerships (Priority: MEDIUM)
- [ ] Partnership outreach program
- [ ] API integration guidelines
- [ ] Revenue sharing models

#### Phase 2: Events System (Priority: LOW)
- [ ] Event creation tools
- [ ] RSVP system
- [ ] Event management dashboard
- [ ] QR code check-in
- [ ] Photo galleries

---

## 📱 MOBILE APPS (iOS & Android)

### Purpose
Native mobile applications for better performance, offline capabilities, and native device integration.

### Features

#### Core Features
- ✅ All web features available
- ✅ Push notifications
- ✅ Offline mode
- ✅ Background sync
- ✅ Native performance
- ✅ Haptic feedback
- ✅ Native camera integration

#### Mobile-Exclusive Features
- **Wearable integration** - Native Bluetooth Low Energy (BLE) for devices
- **HealthKit** - Save workouts to Apple Health
- **Google Fit** - Save workouts to Google Fit
- **Widget support** - Home screen widgets
- **Face ID** - Secure authentication
- **Biometric login** - Fingerprint/Face ID

### Implementation Plan

#### Phase 1: iOS App (Priority: MEDIUM)
- [ ] Swift/SwiftUI development
- [ ] App Store submission
- [ ] TestFlight beta testing
- [ ] Push notification setup
- [ ] HealthKit integration

#### Phase 2: Android App (Priority: MEDIUM)
- [ ] Kotlin/Java development
- [ ] Play Store submission
- [ ] Beta testing
- [ ] Push notification setup
- [ ] Google Fit integration

---

## 🎨 BRAND EVOLUTION

### Future Branding

#### Visual Identity
- **Evolved Logo** - More detailed and dynamic
- **Customizable Themes** - User can choose color schemes
- **Animated Mascot** - Hunter companion character
- **Sound Effects** - Satisfying audio feedback
- **Achievement Animations** - Epic unlock animations

#### Voice & Tone
- **Personalized AI Coach** - Adapts to user's personality
- **Multiple Voice Options** - Male, female, gender-neutral
- **Tone Adaptation** - Encouraging vs technical based on user preference
- **Localized Content** - Multiple languages

### Implementation Plan

#### Phase 1: Enhanced Brand (Priority: LOW)
- [ ] Animated logo system
- [ ] Custom theme engine
- [ ] Mascot design
- [ ] Sound effects library
- [ ] Achievement animations

---

## 🗓 EXECUTION ORDER (Unsorted)

As requested, features are listed in the order they were thought of (not by execution date).

### Completed (Current Session)
- ✅ AI Chatbot - Core feature concept
- ✅ Nutrition Tracking - Macro estimation with AI
- ✅ IOT Scale Tracking - Bluetooth device integration
- ✅ Gym Tools Integration - Equipment API support
- ✅ Better Stats Tracker - GitHub-style graphs
- ✅ Social Media Integration - OAuth and auto-posting
- ✅ Custom Workout Builder - Full custom workouts
- ✅ Guild Features - Dungeons, raids, boss battles
- ✅ Monetization - Free/Pro/Max tiers with currency
- ✅ Leaderboard 2.0 - Advanced analytics and graphs
- ⚔ Real-World Integration - Partnerships and IRL events
- ⚔ Mobile Apps - iOS and Android native apps
- 🎨 Brand Evolution - Enhanced visual identity

### In Progress (Current Session)
- [ ] Before Quest Time Check - Ask user time availability
- [ ] All docs updated to reference AI chatbot

### Planned (Future Sessions)

### Immediate Next Session
1. Complete UI/UX tutorial page
2. Complete Features documentation page
3. Add Help links to navigation components
4. Create FAQ page
5. Update README.md with roadmap reference

### Short-Term (1-2 weeks)
1. Implement AI chatbot core functionality
2. Implement nutrition tracking MVP
3. Create custom workout builder MVP

### Medium-Term (1-2 months)
1. IOT scale integration
2. Gym tools API integration
3. Better stats tracker with GitHub-style graphs
4. Social media OAuth integration

### Long-Term (3-6 months)
1. Guild system implementation
2. Monetization system
3. Leaderboard 2.0
4. Mobile apps (iOS + Android)
5. Real-world partnerships
6. Brand evolution

---

## 📊 SUCCESS METRICS FOR ROADMAP

### Innovation Score
- AI Chatbot: ⭐⭐⭐⭐⭐⭐ (5/5) - Completely new to fitness
- Nutrition Tracking: ⭐⭐⭐⭐ (4/5) - AI-powered estimation
- Custom Workouts: ⭐⭐⭐⭐ (4/5) - Solves AI limitation problem
- Guild System: ⭐⭐⭐⭐⭐⭐ (5/5) - MMORPG-style gameplay
- IOT Integration: ⭐⭐⭐⭐ (3/5) - Smart device tracking
- Better Stats: ⭐⭐⭐⭐ (4/5) - GitHub-style visualization

### Real-World Relevance Score
- AI Chatbot: ⭐⭐⭐⭐⭐⭐ (5/5) - Directly addresses user confusion
- Nutrition Tracking: ⭐⭐⭐⭐⭐ (5/5) - Solves complexity problem
- IOT Integration: ⭐⭐⭐⭐ (3/5) - Automates manual tracking
- Real-World Integration: ⭐⭐⭐⭐⭐ (5/5) - Gym partnerships, IRL events
- Mobile Apps: ⭐⭐⭐⭐⭐ (5/5) - Native experience

### User Experience Score
- Custom Workouts: ⭐⭐⭐⭐⭐ (5/5) - Complete user control
- Better Stats: ⭐⭐⭐⭐⭐ (5/5) - Deep insights
- Guild Features: ⭐⭐⭐⭐⭐⭐ (5/5) - Social engagement
- Social Media: ⭐⭐⭐⭐ (3/5) - Better sharing

### Technical Feasibility Score
- AI Chatbot: ⭐⭐⭐⭐⭐⭐ (5/5) - Leverages Groq + existing quest system
- Nutrition Tracking: ⭐⭐⭐⭐⭐⭐ (5/5) - Simple, frictionless design
- IOT Integration: ⭐⭐⭐ (3/5) - Complex (Bluetooth, APIs)
- Real-World Integration: ⭐⭐⭐⭐ (3/5) - Requires partnerships

---

**Total Innovation Score:** 4.7/5 (94%)

---

**Roadmap Created:** February 5, 2026
**Status:** Ready for review
**Next Steps:** Update documentation to reference new features

---

**Note to AI:** This roadmap is intentionally unsorted by execution date as requested. All future features are organized by logical category for easy reference.
