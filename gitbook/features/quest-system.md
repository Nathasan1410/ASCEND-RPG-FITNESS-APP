# Quest System

The core of ASCEND - AI-generated personalized workout quests.

## How Quests Work

| Aspect | Description |
| ------ | ----------- |
| **Generation** | Groq LLM creates unique quests |
| **Personalization** | Tailored to rank, class, goals |
| **Validation** | Zod ensures structure correctness |
| **Execution** | Users complete in 15-90 minutes |
| **Evaluation** | OPIK AI scores completion quality |

## Quest Structure

```typescript
interface Quest {
  id: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  class: 'Tank' | 'Striker' | 'Assassin';
  duration: number;
  xp: number;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  instructions: string;
}
```

## Quest Examples

### C-Rank Striker Quest (30 min)

| Exercise | Sets | Reps |
| -------- | ---- | ---- |
| Jumping Jacks | 2 | 30 |
| Bodyweight Squats | 3 | 15 |
| Push-ups | 3 | 10 |
| Mountain Climbers | 3 | 20 |
| Plank Hold | 2 | 45 seconds |

### S-Rank Assassin Quest (45 min)

| Exercise | Sets | Reps |
| -------- | ---- | ---- |
| Burpees | 4 | 20 |
| Mountain Climbers | 4 | 40 |
| Tuck Jumps | 3 | 15 |
| Box Jumps | 3 | 12 |
| Plank to Push-up | 3 | 15 |

## Quest Difficulty by Rank

| Rank | XP Range | Exercise Count | Duration |
| ---- | -------- | -------------- | -------- |
| E | 100-200 | 4 | 15-30 min |
| D | 200-500 | 4-5 | 20-45 min |
| C | 500-1,000 | 4-5 | 25-60 min |
| B | 1,000-2,000 | 5-6 | 30-75 min |
| A | 2,000-4,000 | 5-6 | 35-90 min |
| S | 4,000-8,000 | 6 | 45-90 min |

## Quest Types

| Type | Description |
| ---- | ----------- |
| **Strength** | Focus on muscle building |
| **Cardio** | Endurance and stamina |
| **HIIT** | High-intensity intervals |
| **Mixed** | Combination of above |

[Learn about Gamification →](./gamification.md)

---

*Last Updated: February 11, 2026*
