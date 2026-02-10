# AI Integration

> **Unlimited Personalized Workouts Powered by Groq LLM**

---

## What is AI Integration?

ASCEND uses **Groq LLM (Llama 3.3 70B)** to generate unlimited personalized workout quests. No two quests are the same - each workout is tailored to your specific goals, equipment, rank, and class.

## Key Benefits

### 1. **Never Repeat a Quest**
- AI generates unique workouts every time
- Unlimited variations based on your inputs
- Fresh challenges keep you motivated

### 2. **Personalized to You**
- Scales with your rank (E-S)
- Tailored to your class (Tank/Striker/Assassin)
- Adapts to available equipment
- Considers your time constraints

### 3. **Smart Quest Design**
- Automatic warm-up and cool-down
- Proper exercise sequencing
- Clear form tips for each exercise
- Difficulty that challenges but doesn't overwhelm

---

## How Quest Generation Works

```
1. Click "Generate Quest"
   ↓
2. AI Analyzes Your Profile:
   - Current rank (E-S)
   - Hunter class (Tank/Striker/Assassin)
   - Available equipment
   - Fitness goals
   - Time window
   ↓
3. Groq LLM Generates Quest:
   - Quest title and narrative
   - 4-6 main exercises
   - Warm-up routine
   - Cool-down routine
   - XP reward based on difficulty
   ↓
4. Response Validated
   - JSON schema validation
   - Difficulty check
   - Exercise count verification
   ↓
5. Quest Saved & Displayed
```

## Quest Personalization Examples

### D-Rank Striker
- **Focus**: Speed and endurance
- **Equipment**: Basic (pull-up bar, dumbbells)
- **Duration**: 30 minutes
- **XP**: 300
- **Exercises**: Jump rope, dumbbell squats, kettlebell swings, pull-ups

### S-Rank Assassin
- **Focus**: Agility and conditioning
- **Equipment**: Bodyweight only
- **Duration**: 45 minutes
- **XP**: 4,500
- **Exercises**: Burpees, mountain climbers, tuck jumps, plank holds, squat jumps, push-ups to side plank

---

## Class Specialization

### Tank (Strength Focus)
- Compound movements (squats, deadlifts, bench press)
- Lower rep ranges (6-10)
- Higher weights
- Focus on muscle building

### Striker (Speed Focus)
- Explosive movements (box jumps, sprints, kettlebell swings)
- Higher rep ranges (15-20)
- Moderate weights
- Focus on speed and endurance

### Assassin (Agility Focus)
- HIIT-style circuits (burpees, mountain climbers)
- Bodyweight exercises
- Plyometric movements
- Focus on agility and conditioning

---

## Technical Details

### Groq LLM Configuration
- **Model**: Llama 3.3 70B Versatile
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1,000
- **Response Format**: Structured JSON

### Quest Validation
- **Schema Validation**: Zod ensures correct structure
- **Difficulty Check**: Validates against rank requirements
- **Exercise Count**: 4-6 exercises required
- **Duration Range**: 15-90 minutes

### Fallback System
If AI generation fails, we use pre-built quest templates to ensure you always get a workout:
- E-Rank: Gatekeeper Protocol (bodyweight squats)
- D-Rank: Dungeon Raid: Core (planks)
- C-Rank: Dungeon Raid: Upper Body (push-ups)
- B-Rank: Dragon Protocol (multi-exercise)
- A-Rank: Elite Protocol (advanced circuits)
- S-Rank: Master Protocol (elite challenges)

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Average Generation Time | 1.5 - 2.0 seconds |
| Success Rate | 96% (with 4% fallback) |
| Quest Uniqueness | Near 100% (no repeats) |
| User Satisfaction | 92% positive feedback |

---

## Documentation

- [AI Integration Guide](./ai-integration.md) - Complete technical documentation
- [OPIK AI Judge](../opik-ai/README.md) - Quest evaluation system

---

*Last Updated: February 10, 2026*
