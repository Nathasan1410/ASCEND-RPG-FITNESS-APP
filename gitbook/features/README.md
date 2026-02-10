# Features

> **Current Working Features in ASCEND**

---

## Core Gameplay Loop

```
Generate Quest → Complete Workout → Upload Proof → OPIK AI Evaluation → Earn XP → Level Up → Repeat
```

---

## Quest System

### AI-Powered Generation
- **Unlimited Variations**: Groq LLM generates unique workouts
- **Personalized**: Tailored to your rank, class, equipment, and goals
- **Smart Difficulty**: Scales with your level (E-S ranks)
- **Class-Specific**: Tank (strength), Striker (speed), Assassin (agility)

### Quest Components
- **Warm-up Routine**: Prepares your body for the workout
- **Main Exercises**: 4-6 exercises with sets and reps
- **Form Tips**: Technique guidance for each exercise
- **Cool-down Routine**: Recovery after workout
- **XP Reward**: Based on quest difficulty (50-4,000 XP)

### Quest Tracking
- Real-time set tracking
- Weight logging
- Duration tracking
- RPE (Rate of Perceived Exertion) input

[Quest System Details](./quest-system.md)

---

## Anti-Cheat System

### Multi-Layer Protection
1. **Proof Uploads Required**
   - Photo or video evidence mandatory for XP reward
   - Validates quest completion
   - Stored securely in Supabase

2. **Time Anomaly Detection**
   - Detects suspiciously fast completions
   - Compares actual vs expected duration
   - Flags potential cheating

3. **OPIK AI Evaluation**
   - Multi-factor scoring (form, effort, consistency)
   - Reduces XP for poor performance
   - Provides feedback for improvement

4. **XP Limit Enforcement**
   - Prevents impossible XP gains
   - Validates XP calculation
   - Maintains system integrity

5. **Community Reporting**
   - Hunters can report suspicious activity
   - OPIK AI moderates reports
   - Fair investigation process

[Anti-Cheat Details](./anti-cheat.md)

---

## Gamification

### XP & Levels
- **Base XP**: Earned from quest completion
- **XP Multiplier**: 0.8x - 1.5x based on OPIK AI evaluation
- **Level Progression**: XP formula scales exponentially
- **Level Up**: Automatic when XP threshold reached

### Hunter Ranks
- **E-Rank** (1-9): Beginner
- **D-Rank** (31-60): Intermediate
- **C-Rank** (61-90): Advanced
- **B-Rank** (91-120): Expert
- **A-Rank** (121-150): Master
- **S-Rank** (151+): Elite

### Achievements
- Unlock badges for milestones
- Track quest completions
- Celebrate streaks
- Display on profile

### Streaks
- Track daily quest completions
- Bonus XP for consistency
- Leaderboard for streaks

[Gamification Details](./gamification.md)

---

## Social Features

### Hunter Network Feed
- **Social Feed**: See quest completions from other hunters
- **Real-time Updates**: Live feed of community activity
- **Quest Details**: View exercises and performance
- **Proof Previews**: See completion photos/videos

### Kudos & Respects
- **Kudos**: Give recognition (1x value)
- **Respects**: High-value recognition (5x value)
- **Track Received**: See your total kudos/respects
- **Give Freely**: Unlimited kudos to give

### Leaderboards
- **Global Rankings**: All hunters ranked by total XP
- **Rank-Specific**: Compare with hunters at your level
- **Class-Specific**: Rankings by Tank, Striker, Assassin
- **Time Filters**: Daily, weekly, monthly, all-time

### Friends System
- **Send Friend Requests**: Connect with other hunters
- **Accept/Decline**: Manage your friend list
- **View Profiles**: See friends' stats and achievements
- **Track Progress**: Watch friends level up

[Social Features Details](./social-feed.md)

---

## User Interface

### Dashboard
- Current quest display
- Stats overview (XP, level, rank)
- Quick actions (generate quest, complete quest)
- Recent activity feed

### Quest Detail Page
- Complete quest information
- Exercise breakdown
- Form tips and instructions
- Proof upload interface

### Leaderboard Page
- Multiple leaderboard views
- Hunter profiles
- Ranking changes
- Time period filters

### Profile Page
- Hunter stats
- Rank and class
- Achievements and badges
- Activity history

---

## Technical Features

### Performance
- Fast page loads with Next.js
- Optimistic UI updates
- Efficient caching strategy
- Lazy loading for large lists

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Adaptive layouts
- Mobile-optimized experience

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Clear visual hierarchy

---

## What's Coming?

See our roadmap for future features. Current focus:
- ✅ Core quest system
- ✅ OPIK AI evaluation
- ✅ Social features
- ✅ Anti-cheat system
- 🔄 Mobile apps (Q1 2026)
- 🔄 AI chatbot (Q1 2026)
- 🔄 Nutrition tracking (Q1 2026)

---

*Last Updated: February 10, 2026*
