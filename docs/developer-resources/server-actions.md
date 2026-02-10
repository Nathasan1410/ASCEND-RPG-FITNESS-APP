# Server Actions

> Type-safe server-side mutations with Next.js Server Actions

---

## Server Actions Overview

Next.js Server Actions are used for all mutations in ASCEND: FITNESS RPG.

### Benefits

| Benefit | Description |
|---------|-------------|
| **Type-Safe** | Full TypeScript support |
| **No API Routes** | No need for separate `/app/api/*` routes |
| **Automatic Form Handling** | Built-in form validation |
| **Better Error Handling** | Centralized error management |
| **Automatic Revalidation** | Update UI after mutations |

### Action Structure

All server actions are located in `server/actions/`:

```
server/actions/
├── profile-actions.ts       # Onboarding, profile updates
├── quest-actions.ts         # Quest generation, completion
├── match-history-actions.ts # Match history queries
├── leaderboard-actions.ts   # Leaderboard calculations
├── report-actions.ts        # Moderation system
└── rank-up-actions.ts       # Rank-up exams
```

---

## Quest Generation Action

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { generateQuestWithGroq } from '@/lib/ai/groq';
import { generateFallbackQuest } from '@/lib/ai/fallback';
import { opik } from '@opik/opik-nodejs';

export async function generateQuestAction() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const trace = await opik.trace('quest_generation', {
      user_id: user.id,
      timestamp: new Date().toISOString(),
    });

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('rank_tier, class, goals, equipment, level')
        .eq('id', user.id)
        .single();

      if (!profile) {
        throw new Error('Profile not found');
      }

      const questData = await generateQuestWithGroq({
        rank_tier: profile.rank_tier,
        class: profile.class,
        goals: profile.goals,
        equipment: profile.equipment,
        level: profile.level,
      });

      const { data: quest, error } = await supabase
        .from('quests')
        .insert({
          user_id: user.id,
          title: questData.title,
          description: questData.description,
          difficulty: questData.difficulty,
          duration_minutes: questData.duration_minutes,
          xp_reward: questData.xp_reward,
          exercises: questData.exercises,
          warm_up: questData.warm_up,
          cool_down: questData.cool_down,
          class_specialization: questData.class_specialization,
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to save quest');
      }

      revalidatePath('/dashboard');

      await trace.end({
        output: { quest_id: quest.id },
        metrics: {
          difficulty: quest.difficulty,
          duration: quest.duration_minutes,
          xp_reward: quest.xp_reward,
        },
      });

      return { success: true, quest };
    } catch (error) {
      await trace.end({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  } catch (error) {
    console.error('Quest generation error:', error);
    return { error: 'Failed to generate quest' };
  }
}
```

---

## Quest Completion Action

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { uploadProof } from '@/lib/supabase/storage';
import { evaluateQuestWithOpik } from '@/lib/ai/opik';
import { calculateXP } from '@/lib/gamification/xp-calculator';
import { checkLevelUp } from '@/lib/gamification/leveling';
import { z } from 'zod';
import { questCompletionSchema } from '@/types/schemas';

export async function completeQuestAction(formData: FormData) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const validated = questCompletionSchema.parse({
      questId: formData.get('questId'),
      proof: formData.get('proof'),
      duration: parseInt(formData.get('duration') as string),
      notes: formData.get('notes'),
    });

    const trace = await opik.trace('quest_completion', {
      user_id: user.id,
      quest_id: validated.questId,
      duration_minutes: validated.duration,
    });

    try {
      const proofUrl = await uploadProof(
        user.id,
        validated.questId,
        validated.proof
      );

      const { data: quest } = await supabase
        .from('quests')
        .select('*')
        .eq('id', validated.questId)
        .single();

      if (!quest) {
        throw new Error('Quest not found');
      }

      const evaluation = await evaluateQuestWithOpik({
        quest,
        proofUrl,
        duration: validated.duration,
        notes: validated.notes,
      });

      const xpEarned = calculateXP({
        baseXP: quest.xp_reward,
        formScore: evaluation.form_score,
        effortScore: evaluation.effort_score,
        consistencyScore: evaluation.consistency_score,
        xpMultiplier: evaluation.xp_multiplier,
      });

      const { error } = await supabase
        .from('match_history')
        .insert({
          user_id: user.id,
          quest_id: validated.questId,
          started_at: new Date(Date.now() - validated.duration * 60 * 1000).toISOString(),
          completed_at: new Date().toISOString(),
          actual_duration_minutes: validated.duration,
          xp_earned: xpEarned,
          proof_url: proofUrl,
          notes: validated.notes,
          judge_form_score: evaluation.form_score,
          judge_effort_score: evaluation.effort_score,
          judge_consistency_score: evaluation.consistency_score,
          judge_overall_score: evaluation.overall_score,
          judge_xp_multiplier: evaluation.xp_multiplier,
          judge_feedback: evaluation.feedback,
          judge_suggested_improvements: evaluation.suggestions,
        });

      if (error) {
        throw new Error('Failed to save completion');
      }

      await checkLevelUp(user.id, xpEarned);

      revalidatePath('/dashboard');
      revalidatePath('/profile');

      await trace.end({
        output: {
          xp_earned: xpEarned,
          evaluation: evaluation.overall_score,
        },
        metrics: {
          xp_earned: xpEarned,
          form_score: evaluation.form_score,
          effort_score: evaluation.effort_score,
          consistency_score: evaluation.consistency_score,
          overall_score: evaluation.overall_score,
        },
      });

      return {
        success: true,
        xpEarned,
        evaluation,
        feedback: evaluation.feedback,
      };
    } catch (error) {
      await trace.end({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid form data', details: error.errors };
    }
    console.error('Quest completion error:', error);
    return { error: 'Failed to complete quest' };
  }
}
```

---

## Profile Update Action

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { profileUpdateSchema } from '@/types/schemas';

export async function updateProfileAction(formData: FormData) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const validated = profileUpdateSchema.parse({
      username: formData.get('username'),
      bio: formData.get('bio'),
      goals: formData.get('goals')?.toString().split(',').map(g => g.trim()),
      equipment: formData.get('equipment')?.toString().split(',').map(e => e.trim()),
      avatar: formData.get('avatar'),
    });

    const { error } = await supabase
      .from('profiles')
      .update({
        username: validated.username,
        bio: validated.bio,
        goals: validated.goals,
        equipment: validated.equipment,
        avatar_url: validated.avatar,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      if (error.code === '23505') {
        return { error: 'Username already taken' };
      }
      throw new Error('Failed to update profile');
    }

    revalidatePath('/profile');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid form data', details: error.errors };
    }
    console.error('Profile update error:', error);
    return { error: 'Failed to update profile' };
  }
}
```

---

## Report User Action

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { reportSchema } from '@/types/schemas';

export async function reportUserAction(formData: FormData) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const validated = reportSchema.parse({
      reportedUserId: formData.get('reportedUserId'),
      reason: formData.get('reason'),
    });

    const { data: existingReport } = await supabase
      .from('reports')
      .select('id')
      .eq('reporter_id', user.id)
      .eq('reported_user_id', validated.reportedUserId)
      .eq('reason', validated.reason)
      .single();

    if (existingReport) {
      return { error: 'You have already reported this user for this reason' };
    }

    const { error } = await supabase
      .from('reports')
      .insert({
        reporter_id: user.id,
        reported_user_id: validated.reportedUserId,
        reason: validated.reason,
        status: 'pending',
        created_at: new Date().toISOString(),
      });

    if (error) {
      throw new Error('Failed to submit report');
    }

    const { data: reportCount } = await supabase
      .from('reports')
      .select('id', { count: 'exact' })
      .eq('reported_user_id', validated.reportedUserId)
      .eq('status', 'pending');

    if (reportCount && reportCount.length >= 5) {
      await supabase
        .from('profiles')
        .update({ hunter_status: 'Flagged' })
        .eq('id', validated.reportedUserId);
    }

    revalidatePath(`/profile/${validated.reportedUserId}`);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid form data', details: error.errors };
    }
    console.error('Report error:', error);
    return { error: 'Failed to submit report' };
  }
}
```

---

## Rank-Up Exam Action

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { rankUpExamSchema } from '@/types/schemas';

export async function submitRankUpExamAction(formData: FormData) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Unauthorized' };
    }

    const validated = rankUpExamSchema.parse({
      targetRank: formData.get('targetRank'),
      proofVideo: formData.get('proofVideo'),
      handSignVideo: formData.get('handSignVideo'),
    });

    const { data: profile } = await supabase
      .from('profiles')
      .select('rank_tier, level')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return { error: 'Profile not found' };
    }

    const rankRequirements: Record<string, number> = {
      'D': 2,
      'C': 5,
      'B': 10,
      'A': 20,
      'S': 50,
    };

    if (profile.level < rankRequirements[validated.targetRank]) {
      return { error: `Insufficient level for ${validated.targetRank}-Rank` };
    }

    if (profile.rank_tier >= validated.targetRank) {
      return { error: 'You already have this rank or higher' };
    }

    const { error } = await supabase
      .from('rank_up_exams')
      .insert({
        user_id: user.id,
        target_rank: validated.targetRank,
        proof_url: validated.proofVideo,
        hand_sign_video: validated.handSignVideo,
        status: 'submitted',
        created_at: new Date().toISOString(),
      });

    if (error) {
      throw new Error('Failed to submit exam');
    }

    revalidatePath('/profile');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid form data', details: error.errors };
    }
    console.error('Rank-up exam error:', error);
    return { error: 'Failed to submit rank-up exam' };
  }
}
```

---

## Leaderboard Action

```typescript
'use server';

export async function getLeaderboardAction(limit = 100) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        username,
        xp,
        level,
        rank_tier,
        class,
        streak_days,
        hunter_status,
        avatar_url
      `)
      .eq('hunter_status', 'Normal')
      .order('xp', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error('Failed to fetch leaderboard');
    }

    return { success: true, leaderboard: data };
  } catch (error) {
    console.error('Leaderboard error:', error);
    return { error: 'Failed to fetch leaderboard' };
  }
}
```

---

## Validation Schemas

```typescript
// types/schemas.ts
import { z } from 'zod';

export const questCompletionSchema = z.object({
  questId: z.string().uuid('Invalid quest ID'),
  proof: z.instanceof(File, { message: 'Proof file required' }),
  duration: z.number().min(5, 'Duration must be at least 5 minutes').max(180, 'Duration must be at most 180 minutes'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

export const profileUpdateSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  goals: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  avatar: z.string().url().optional(),
});

export const reportSchema = z.object({
  reportedUserId: z.string().uuid('Invalid user ID'),
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(500, 'Reason must be less than 500 characters'),
});

export const rankUpExamSchema = z.object({
  targetRank: z.enum(['D', 'C', 'B', 'A', 'S']),
  proofVideo: z.instanceof(File, { message: 'Proof video required' }),
  handSignVideo: z.instanceof(File, { message: 'Hand sign video required' }),
});
```

---

## Error Handling

### Standardized Error Response

```typescript
// server/actions/utils.ts
export function createActionError(
  message: string,
  details?: any
): { error: string; details?: any } {
  console.error('Action error:', message, details);
  return { error: message, details };
}

export function handleSupabaseError(error: any): string {
  const errorMap: Record<string, string> = {
    '23505': 'Duplicate entry',
    '23514': 'Check constraint violation',
    '23503': 'Foreign key violation',
    'PGRST116': 'Row not found',
  };

  return errorMap[error.code] || 'Database error occurred';
}
```

### Usage in Actions

```typescript
export async function someAction() {
  try {
    // Action logic
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createActionError('Invalid form data', error.errors);
    }
    if (error.code) {
      return createActionError(handleSupabaseError(error));
    }
    return createActionError('An unexpected error occurred');
  }
}
```

---

## Best Practices

### 1. Always Use `use server`

```typescript
'use server';

export async function myAction() {
  // Server-side code
}
```

### 2. Validate Input

```typescript
const validated = schema.parse(data);
```

### 3. Revalidate Paths

```typescript
revalidatePath('/dashboard');
revalidatePath('/profile');
```

### 4. Handle Errors Gracefully

```typescript
try {
  // Action logic
} catch (error) {
  console.error('Action error:', error);
  return { error: 'Failed to complete action' };
}
```

### 5. Type Return Values

```typescript
export async function myAction(): Promise<{ success: boolean; error?: string }> {
  // ...
}
```

---

*Last Updated: February 5, 2026*
