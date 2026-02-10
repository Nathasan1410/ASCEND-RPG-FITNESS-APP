# Technical Details

## LLM Configuration

| Setting | Value |
| -------- | ----- |
| Model | Llama 3.3 70B Versatile |
| Provider | Groq |
| Temperature | 0.7 |
| Max Tokens | 1,000 |
| Response Format | Structured JSON |

## Prompt Engineering

### Quest Generation Prompt

```
Generate a fitness quest for a {rank}-rank {class} user.
Equipment: {equipment}
Goals: {goals}
Duration: {duration} minutes

Requirements:
- 4-6 unique exercises
- Valid JSON format
- Difficulty appropriate for {rank} rank
- Suitable for {class} class
```

### Quest Structure

```typescript
interface Quest {
  id: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  class: 'Tank' | 'Striker' | 'Assassin';
  duration: number; // minutes
  xp: number;
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  duration?: number; // for cardio/HIIT
  instructions: string;
}
```

## Validation

Zod schema validates:
- Quest structure
- Exercise count (4-6)
- Difficulty vs rank match
- Duration range (15-90 min)
- JSON validity

### Validation Rules

| Rule | Check |
| ---- | ----- |
| Exercise count | 4-6 exercises |
| Duration | 15-90 minutes |
| XP range | Matches rank |
| Class match | Exercises fit class style |

## Fallback System

If AI generation fails:
1. Retry (max 3 attempts)
2. Use pre-built templates
3. Always provide a quest

### Quest Database

| Rank | Available Templates |
| ---- | ------------------- |
| E | 25 templates |
| D | 20 templates |
| C | 15 templates |
| B | 10 templates |
| A | 8 templates |
| S | 5 templates |

## Error Handling

| Error Type | Action |
| ---------- | ------ |
| API timeout | Retry with template |
| Invalid JSON | Retry generation |
| Validation fail | Use template |
| Rate limit | Queue request |

[Back to Overview →](./overview.md)

---

*Last Updated: February 11, 2026*
