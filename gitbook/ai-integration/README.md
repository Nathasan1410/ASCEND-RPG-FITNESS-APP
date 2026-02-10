# AI Integration

Groq LLM (Llama 3.3 70B) generates unique workout quests. Each quest is personalized to user's rank, class, equipment, goals, and time constraints.

## Quest Examples

| Rank | Class | Duration | XP | Exercises |
|-------|--------|-----------|-----|-----------|
| D | Striker | 30 min | 300 | Jump rope, squats, swings, pull-ups |
| S | Assassin | 45 min | 4,500 | Burpees, mountain climbers, tuck jumps |

## Classes

**Tank:** Strength focus, compound movements, 6-10 reps, heavier weights

**Striker:** Speed focus, explosive movements, 15-20 reps, moderate weights

**Assassin:** Agility focus, HIIT circuits, bodyweight, plyometrics

## Configuration

Model: Llama 3.3 70B Versatile

Temperature: 0.7

Max Tokens: 1,000

Response Format: Structured JSON

## Validation

Zod schema validates quest structure. Difficulty checked against rank requirements. 4-6 exercises required. Duration range: 15-90 minutes.

## Fallback

Pre-built quest templates ensure users always get a workout if AI generation fails.

## Documentation

[Technical Details](./ai-integration.md)

---

*Last Updated: February 10, 2026*
