# Hunter Ranking

The ranking system that measures fitness progression.

## Ranks Overview

| Rank | Level Range | Title | XP Threshold |
| ---- | ----------- | ----- | ------------ |
| **E** | 1-10 | Novice | 0 XP |
| **D** | 11-20 | Apprentice | 1,000 XP |
| **C** | 21-30 | Adept | 2,500 XP |
| **B** | 31-50 | Expert | 5,000 XP |
| **A** | 51-70 | Master | 12,000 XP |
| **S** | 71-100 | Legend | 25,000 XP |

## Rank Requirements

### E-Rank (Novice)

| Requirement | Value |
| ----------- | ----- |
| Level | 1-10 |
| XP | 0-1,000 |
| Quest difficulty | Beginner |
| Exercise count | 4 |

### D-Rank (Apprentice)

| Requirement | Value |
| ----------- | ----- |
| Level | 11-20 |
| XP | 1,001-2,500 |
| Quest difficulty | Easy |
| Exercise count | 4-5 |

### C-Rank (Adept)

| Requirement | Value |
| ----------- | ----- |
| Level | 21-30 |
| XP | 2,501-5,000 |
| Quest difficulty | Moderate |
| Exercise count | 4-5 |

### B-Rank (Expert)

| Requirement | Value |
| ----------- | ----- |
| Level | 31-50 |
| XP | 5,001-12,000 |
| Quest difficulty | Hard |
| Exercise count | 5-6 |

### A-Rank (Master)

| Requirement | Value |
| ----------- | ----- |
| Level | 51-70 |
| XP | 12,001-25,000 |
| Quest difficulty | Expert |
| Exercise count | 5-6 |

### S-Rank (Legend)

| Requirement | Value |
| ----------- | ----- |
| Level | 71-100 |
| XP | 25,001+ |
| Quest difficulty | Master |
| Exercise count | 6 |

## Ranking Up

### XP Calculation

```
Base XP × Multiplier = Final XP
```

### Multiplier by Grade

| Grade | Multiplier |
| ----- | ---------- |
| S | 1.5x |
| A | 1.3x |
| B | 1.1x |
| C | 1.0x |
| D | 0.9x |
| E | 0.8x |

### Progress to Next Rank

| Rank | XP Needed | Quests (Avg) |
| ---- | --------- | ------------ |
| E → D | 1,000 XP | ~5-10 quests |
| D → C | 1,500 XP | ~5-8 quests |
| C → B | 2,500 XP | ~5-7 quests |
| B → A | 7,000 XP | ~7-10 quests |
| A → S | 13,000 XP | ~10-15 quests |

## Rank Benefits

| Rank | Quest XP | Leaderboard | Badges |
| ---- | -------- | ----------- | ------ |
| E | 100-200 | Local | Novice |
| D | 200-500 | Regional | Apprentice |
| C | 500-1,000 | National | Adept |
| B | 1,000-2,000 | International | Expert |
| A | 2,000-4,000 | Global | Master |
| S | 4,000-8,000 | Legend | Legend |

## Leaderboards

| Type | Ranking By |
| ---- | ---------- |
| **Global** | Total XP |
| **Rank-Specific** | XP within rank |
| **Class-Specific** | XP within class |
| **Weekly** | XP earned this week |

[Learn about Social Network →](./social-network.md)

---

*Last Updated: February 11, 2026*
