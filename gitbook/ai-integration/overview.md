# AI Integration Overview

<figure><img src="../../.gitbook/assets/ai-integration-hero.png" alt=""><figcaption><p>Groq LLM powers personalized quest generation</p></figcaption></figure>

Groq LLM (Llama 3.3 70B) generates unique workout quests. Each quest is personalized to user's rank, class, equipment, goals, and time constraints.

## Quest Generation Flow

```mermaid
graph LR
    A[User Profile] --> B[Groq LLM]
    B --> C[Quest JSON]
    C --> D[Zod Validation]
    D --> E[Save to Database]

    style B fill:#ff0066
    style D fill:#00a67e
```

## Personalization Factors

| Factor | Description | Options |
| ------ | ----------- | ------- |
| **Rank** | Determines difficulty | E, D, C, B, A, S |
| **Class** | Defines workout style | Tank, Striker, Assassin |
| **Equipment** | Available gear | Bodyweight, Dumbbells, Full Gym |
| **Goals** | Fitness objectives | Strength, Cardio, Endurance |
| **Duration** | Time available | 15-90 minutes |

## Quest Examples

| Rank | Class | Duration | XP | Exercises |
| ---- | ----- | --------- | -- | --------- |
| D | Striker | 30 min | 300 | Jump rope, squats, swings, pull-ups |
| S | Assassin | 45 min | 4,500 | Burpees, mountain climbers, tuck jumps |

## Class Specializations

**Tank** - Strength focus
- 6-10 reps per set
- Heavier weights
- Compound movements

**Striker** - Speed focus
- 15-20 reps per set
- Moderate weights
- Explosive movements

**Assassin** - Agility focus
- HIIT circuits
- Bodyweight only
- Plyometrics

[View Technical Details →](./technical-details.md)

---

*Last Updated: February 11, 2026*
