# Trace Implementation

Every OPIK AI evaluation is fully traceable and viewable by users.

## Trace Data Structure

```typescript
interface OpikTrace {
  traceId: string;
  userId: string;
  questId: string;
  timestamp: Date;

  // Scores
  formScore: number;
  effortScore: number;
  consistencyScore: number;
  overallScore: number;

  // Results
  grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'E';
  multiplier: number;
  baseXP: number;
  finalXP: number;

  // Feedback
  feedback: string;
}
```

## Example Trace

**Trace ID:** `trace_abc123xyz`

| Field | Value |
| ----- | ----- |
| User ID | `user_s95shadow` |
| Quest ID | `quest_s45assassin` |
| Timestamp | 2026-02-11 14:32:18 |
| Form Score | 0.92 |
| Effort Score | 0.95 |
| Consistency Score | 0.88 |
| Overall Score | 0.92 |
| Grade | S |
| Multiplier | 1.5x |
| Base XP | 4,500 |
| Final XP | 6,750 |
| Feedback | Excellent form on burpees. Slightly slow on tuck jumps. |

## User Access

Users can view traces via:
1. Quest history page
2. Individual quest detail page
3. Profile evaluation history

**Opt-out available anytime.**

## Privacy

| Data | Stored | Shared |
| ---- | ------ | ------ |
| Scores | Yes | No |
| Feedback | Yes | No |
| Proof media | No | Never |
| User metadata | Yes | No |

[Back to Overview →](./overview.md)

---

*Last Updated: February 11, 2026*
