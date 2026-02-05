# Future Roadmap

> Vision for the future evolution of ASCEND: FITNESS RPG

---

## Roadmap Overview

ASCEND: FITNESS RPG has an ambitious roadmap to expand into a complete fitness RPG ecosystem.

### Timeline

| Timeframe | Focus | Key Deliverables |
|-----------|-------|------------------|
| **Q1 2026** | Core Platform | Mobile apps, AI chatbot |
| **Q2 2026** | Social Features | Guilds, challenges, live events |
| **Q3 2026** | Advanced Tracking | IoT integration, nutrition |
| **Q4 2026** | Monetization | Premium features, marketplace |
| **2027+** | Expansion | VR/AR, professional certifications |

---

## Priority Levels

| Priority | Description |
|----------|-------------|
| **Critical** | Essential for platform growth |
| **High** | Major user experience improvement |
| **Medium** | Nice-to-have feature |
| **Low** | Future consideration |

---

## Coming Soon Features

### 1. AI Chatbot (Fitness Coaching)

**Priority:** Critical  
**Timeline:** Q1 2026

An AI-powered chatbot that provides real-time fitness coaching.

#### Features

| Feature | Description |
|---------|-------------|
| **Instant Advice** | Real-time fitness questions |
| **Technique Tips** | Exercise form corrections |
| **Motivation** | Personalized encouragement |
| **Nutrition Tips** | Diet and nutrition advice |
| **Workout Adjustments** | Modify quests based on feedback |

#### Technical Implementation

```typescript
// lib/ai/chatbot.ts
export async function chatWithCoach(message: string, context: UserContext) {
  const systemPrompt = `You are an expert fitness coach and AI assistant.

Your role is to:
- Answer fitness questions accurately
- Provide motivation and encouragement
- Suggest workout modifications
- Give nutrition advice
- Maintain a friendly, supportive tone`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.8,
  });

  return response.choices[0].message.content;
}
```

---

### 2. Nutrition Tracking

**Priority:** High  
**Timeline:** Q1 2026

Comprehensive nutrition tracking with AI-powered meal recommendations.

#### Features

| Feature | Description |
|---------|-------------|
| **Meal Logging** | Track food intake |
| **Calorie Tracking** | Daily calorie goals |
| **Macro Tracking** | Protein, carbs, fats |
| **AI Meal Suggestions** | Personalized meal plans |
| **Recipe Database** | Healthy recipes |

#### Technical Implementation

```typescript
// lib/nutrition/meal-logger.ts
export interface Meal {
  id: string;
  user_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  logged_at: Date;
}

export async function logMeal(userId: string, mealData: Omit<Meal, 'id' | 'user_id' | 'logged_at'>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('meals')
    .insert({
      user_id: userId,
      ...mealData,
      logged_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
```

---

### 3. IoT Scale Tracking

**Priority:** Medium  
**Timeline:** Q2 2026

Smart scale integration for automatic weight tracking.

#### Features

| Feature | Description |
|---------|-------------|
| **Auto-Sync** | Bluetooth scale integration |
| **Weight Trends** | Visual weight history |
| **Body Composition** | Fat, muscle, water % |
| **Goal Tracking** | Weight loss/gain goals |
| **Progress Photos** | Before/after photos |

#### Technical Implementation

```typescript
// lib/iot/scale-integration.ts
export interface ScaleData {
  weight: number;
  body_fat_percentage: number;
  muscle_mass: number;
  water_percentage: number;
  timestamp: Date;
}

export async function syncScaleData(userId: string, scaleData: ScaleData) {
  const supabase = createClient();

  const { error } = await supabase
    .from('weight_log')
    .insert({
      user_id: userId,
      weight: scaleData.weight,
      body_fat_percentage: scaleData.body_fat_percentage,
      muscle_mass: scaleData.muscle_mass,
      water_percentage: scaleData.water_percentage,
      logged_at: scaleData.timestamp.toISOString(),
    });

  if (error) throw error;

  // Update user stats
  await updateWeightStats(userId, scaleData.weight);
}
```

---

### 4. Gym Tools Integration

**Priority:** Medium  
**Timeline:** Q2 2026

Integration with popular gym equipment brands.

#### Supported Brands

| Brand | Features |
|-------|----------|
| **Peloton** | Bike, tread classes |
| **Mirror** | Interactive workouts |
| **NordicTrack** | Equipment sync |
| **Echelon** | Connected fitness |
| **Hydrow** | Rowing machine |

#### Technical Implementation

```typescript
// lib/integrations/peloton.ts
export interface PelotonWorkout {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  calories: number;
  output: number;
  distance: number;
  completed_at: Date;
}

export async function syncPelotonWorkout(
  userId: string,
  workout: PelotonWorkout
) {
  const supabase = createClient();

  // Convert Peloton workout to ASCEND quest
  const quest = await createExternalQuest({
    user_id: userId,
    title: workout.title,
    source: 'peloton',
    external_id: workout.id,
    duration_minutes: workout.duration,
    calories_burned: workout.calories,
  });

  return quest;
}
```

---

### 5. Better Stats Tracker

**Priority:** High  
**Timeline:** Q1 2026

Advanced analytics and visualization.

#### Features

| Feature | Description |
|---------|-------------|
| **Performance Charts** | Detailed progress graphs |
| **Personal Records** | Track PRs |
| **Streak Analysis** | Streak patterns |
| **Workout Heatmaps** | Activity visualization |
| **Comparison Charts** | Compare with others |

#### Technical Implementation

```typescript
// components/analytics/PerformanceChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function PerformanceChart({ data }: { data: PerformanceData[] }) {
  return (
    <div className="h-96 w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="white/10" />
        <XAxis dataKey="date" stroke="white" />
        <YAxis stroke="white" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="xp" stroke="#06b6d4" name="XP" />
        <Line type="monotone" dataKey="level" stroke="#a855f7" name="Level" />
      </LineChart>
    </div>
  );
}
```

---

### 6. Social Media Integration

**Priority:** Medium  
**Timeline:** Q2 2026

Share achievements on social platforms.

#### Features

| Feature | Description |
|---------|-------------|
| **Achievement Sharing** | Share badges and ranks |
| **Quest Completion** | Post completed quests |
| **Leaderboard Sharing** | Share rankings |
| **Progress Updates** | Weekly progress posts |

#### Technical Implementation

```typescript
// lib/social/sharing.ts
export async function shareAchievement(
  achievementId: string,
  platform: 'twitter' | 'facebook' | 'instagram'
) {
  const supabase = createClient();

  const { data: achievement } = await supabase
    .from('achievements')
    .select('*')
    .eq('id', achievementId)
    .single();

  const shareText = `I just earned the "${achievement.name}" achievement in ASCEND: FITNESS RPG! 🏋️‍♂️

Rank: ${achievement.rank}
XP: ${achievement.xp}

Join the hunt: https://ascend.fitness`;

  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
  }

  // Track share analytics
  await supabase.from('share_analytics').insert({
    achievement_id: achievementId,
    platform,
    shared_at: new Date().toISOString(),
  });
}
```

---

### 7. Custom Workout Builder

**Priority:** High  
**Timeline:** Q2 2026

Create custom quests from scratch.

#### Features

| Feature | Description |
|---------|-------------|
| **Exercise Builder** | Create custom exercises |
| **Quest Designer** | Build full quests |
| **Community Sharing** | Share with friends |
| **Quest Templates** | Pre-made templates |
| **AI Suggestions** | AI-powered suggestions |

#### Technical Implementation

```typescript
// lib/quests/custom-builder.ts
export interface CustomExercise {
  id: string;
  name: string;
  type: 'reps' | 'timed' | 'distance';
  sets: number;
  value: number;
  target_muscle: string[];
  instructions: string[];
}

export interface CustomQuest {
  id: string;
  user_id: string;
  title: string;
  description: string;
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  duration_minutes: number;
  xp_reward: number;
  exercises: CustomExercise[];
  is_public: boolean;
}

export async function createCustomQuest(
  userId: string,
  questData: Omit<CustomQuest, 'id' | 'user_id'>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('custom_quests')
    .insert({
      user_id: userId,
      ...questData,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
```

---

### 8. Guild Features

**Priority:** High  
**Timeline:** Q2 2026

Form guilds with friends for group challenges.

#### Features

| Feature | Description |
|---------|-------------|
| **Guild Creation** | Create and manage guilds |
| **Guild Quests** | Group challenges |
| **Guild Leaderboard** | Guild rankings |
| **Guild Chat** | Real-time messaging |
| **Guild Events** | Scheduled events |

#### Technical Implementation

```typescript
// server/actions/guild-actions.ts
'use server';

export async function createGuildAction(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('guilds')
    .insert({
      name: formData.get('name'),
      description: formData.get('description'),
      created_by: user.id,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  // Add creator as guild leader
  await supabase.from('guild_members').insert({
    guild_id: data.id,
    user_id: user.id,
    role: 'leader',
    joined_at: new Date().toISOString(),
  });

  return data;
}
```

---

### 9. Monetization System

**Priority:** Critical  
**Timeline:** Q4 2026

Sustainable monetization model.

#### Features

| Feature | Description |
|---------|-------------|
| **Premium Subscription** | Enhanced features |
| **XP Boosters** | Temporary XP multipliers |
| **Cosmetics** | Custom avatars, themes |
| **Guild Upgrades** | Guild bonuses |
| **Marketplace** | Buy/sell custom quests |

#### Technical Implementation

```typescript
// lib/monetization/subscription.ts
export interface Subscription {
  id: string;
  user_id: string;
  tier: 'free' | 'premium' | 'elite';
  status: 'active' | 'inactive' | 'cancelled';
  renews_at: Date;
  benefits: string[];
}

export async function checkSubscription(userId: string): Promise<Subscription> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error) {
    // Return default free subscription
    return {
      id: 'free',
      user_id: userId,
      tier: 'free',
      status: 'active',
      renews_at: new Date(),
      benefits: ['basic quests', 'public profile'],
    };
  }

  return data;
}
```

---

### 10. Leaderboard 2.0

**Priority:** Medium  
**Timeline:** Q3 2026

Advanced leaderboard with multiple categories.

#### Features

| Feature | Description |
|---------|-------------|
| **Multiple Categories** | XP, streaks, quests completed |
| **Time Filters** | Daily, weekly, monthly, all-time |
| **Class Leaderboards** | Tank, Striker, Assassin rankings |
| **Guild Leaderboards** | Team rankings |
| **Regional Leaderboards** | Location-based rankings |

#### Technical Implementation

```typescript
// lib/leaderboards/advanced.ts
export interface LeaderboardCategory {
  id: string;
  name: string;
  type: 'xp' | 'streak' | 'quests' | 'guild_xp';
  time_filter: 'daily' | 'weekly' | 'monthly' | 'all_time';
}

export async function getLeaderboard(
  category: LeaderboardCategory,
  limit = 100
) {
  const supabase = createClient();

  let query = supabase
    .from('profiles')
    .select('*')
    .eq('hunter_status', 'Normal');

  switch (category.type) {
    case 'xp':
      query = query.order('xp', { ascending: false });
      break;
    case 'streak':
      query = query.order('streak_days', { ascending: false });
      break;
    case 'quests':
      query = query.order('total_quests', { ascending: false });
      break;
  }

  const { data } = await query.limit(limit);

  return data;
}
```

---

## Real-World Integration

### Mobile Apps (iOS + Android)

**Priority:** Critical  
**Timeline:** Q1 2026

Native mobile applications for iOS and Android.

#### Features

| Feature | Description |
|---------|-------------|
| **Push Notifications** | Quest reminders, achievements |
| **Offline Mode** | Complete quests without internet |
| **Biometric Auth** | Face ID, Touch ID |
| **Apple Health Integration** | Health data sync |
| **Google Fit Integration** | Fitness data sync |

#### Technology Stack

| Platform | Technology |
|----------|-----------|
| **iOS** | React Native + Swift |
| **Android** | React Native + Kotlin |
| **Push Notifications** | Firebase Cloud Messaging |
| **Health Integration** | Apple HealthKit, Google Fit |

---

## Long-Term Vision

### VR/AR Workout Experiences

**Timeline:** 2027+

Immersive fitness experiences in virtual and augmented reality.

#### Features

| Feature | Description |
|---------|-------------|
| **Virtual Gyms** | 3D workout environments |
| **AR Coaching** | Real-time form corrections |
| **Multiplayer Quests** | Complete quests together in VR |
| **Haptic Feedback** | Feel the workout |
| **Immersive Narratives** | Story-driven workouts |

### Professional Training Certifications

**Timeline:** 2027+

Become a certified personal trainer through ASCEND.

#### Features

| Feature | Description |
|---------|-------------|
| **Certification Courses** | Professional training education |
| **Practical Exams** | Verified training sessions |
| **Continuing Education** | Ongoing learning |
| **Client Management** | Train other hunters |
| **Certification Badges** | Display credentials |

---

## Summary

| Phase | Features | Timeline |
|-------|----------|----------|
| **Phase 1** | Mobile apps, AI chatbot, nutrition tracking | Q1 2026 |
| **Phase 2** | Guilds, challenges, gym tools, social integration | Q2 2026 |
| **Phase 3** | IoT integration, advanced stats, leaderboard 2.0 | Q3 2026 |
| **Phase 4** | Monetization, marketplace | Q4 2026 |
| **Phase 5** | VR/AR, professional certifications | 2027+ |

---

*Last Updated: February 5, 2026*
