# Hooks

> Custom React hooks for state management and data fetching

---

## Custom Hooks Overview

ASCEND: FITNESS RPG uses custom React hooks for reusable state logic.

### Hook Categories

| Category | Hooks |
|----------|-------|
| **Data Fetching** | `useQuest`, `useMatchHistory`, `useLeaderboard` |
| **User State** | `useUser`, `useProfile` |
| **Form Handling** | `useQuestCompletion`, `useReport` |
| **Realtime** | `useRealtimeUpdates` |
| **UI State** | `useModal`, `useToast` |

---

## Data Fetching Hooks

### useQuest Hook

```typescript
// hooks/useQuest.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Quest } from '@/types/schemas';

interface UseQuestReturn {
  quest: Quest | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useQuest(questId: string): UseQuestReturn {
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuest = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = createClient();
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .eq('id', questId)
        .single();

      if (error) throw error;

      setQuest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quest');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questId) {
      fetchQuest();
    }
  }, [questId]);

  return { quest, loading, error, refetch: fetchQuest };
}
```

### useMatchHistory Hook

```typescript
// hooks/useMatchHistory.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MatchHistory } from '@/types/schemas';

interface UseMatchHistoryReturn {
  matchHistory: MatchHistory[];
  loading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export function useMatchHistory(
  userId: string,
  initialLimit = 20
): UseMatchHistoryReturn {
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(initialLimit);

  const fetchMatchHistory = async (currentLimit = limit) => {
    try {
      if (currentLimit === limit) setLoading(true);
      setError(null);

      const supabase = createClient();
      const { data, error } = await supabase
        .from('match_history')
        .select(`
          *,
          quest:quests!inner(
            title,
            difficulty,
            xp_reward
          )
        `)
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(currentLimit);

      if (error) throw error;

      setMatchHistory(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch match history');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const newLimit = limit + 20;
    setLimit(newLimit);
    await fetchMatchHistory(newLimit);
  };

  useEffect(() => {
    if (userId) {
      fetchMatchHistory();
    }
  }, [userId]);

  return {
    matchHistory,
    loading,
    error,
    loadMore,
    hasMore: matchHistory.length >= limit,
  };
}
```

### useLeaderboard Hook

```typescript
// hooks/useLeaderboard.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/schemas';

interface UseLeaderboardReturn {
  leaderboard: Profile[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLeaderboard(limit = 100): UseLeaderboardReturn {
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

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

      if (error) throw error;

      setLeaderboard(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
}
```

---

## User State Hooks

### useUser Hook

```typescript
// hooks/useUser.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) throw error;

      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refreshUser: fetchUser, signOut };
}
```

### useProfile Hook

```typescript
// hooks/useProfile.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types/schemas';

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export function useProfile(userId?: string): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = createClient();
      const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;

      if (!targetUserId) {
        throw new Error('User not found');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error) throw error;

      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile?.id);

      if (error) throw error;

      await fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  return { profile, loading, error, refetch: fetchProfile, updateProfile };
}
```

---

## Form Handling Hooks

### useQuestCompletion Hook

```typescript
// hooks/useQuestCompletion.ts
'use client';

import { useState } from 'react';
import { completeQuestAction } from '@/server/actions/match-history-actions';

interface QuestCompletionState {
  submitting: boolean;
  error: string | null;
  success: boolean;
  xpEarned: bigint | null;
  evaluation: any;
  feedback: string | null;
}

export function useQuestCompletion() {
  const [state, setState] = useState<QuestCompletionState>({
    submitting: false,
    error: null,
    success: false,
    xpEarned: null,
    evaluation: null,
    feedback: null,
  });

  const completeQuest = async (formData: FormData) => {
    setState(prev => ({ ...prev, submitting: true, error: null }));

    const result = await completeQuestAction(formData);

    setState({
      submitting: false,
      error: result.error || null,
      success: result.success || false,
      xpEarned: result.xpEarned || null,
      evaluation: result.evaluation || null,
      feedback: result.feedback || null,
    });

    return result;
  };

  const reset = () => {
    setState({
      submitting: false,
      error: null,
      success: false,
      xpEarned: null,
      evaluation: null,
      feedback: null,
    });
  };

  return { ...state, completeQuest, reset };
}
```

### useReport Hook

```typescript
// hooks/useReport.ts
'use client';

import { useState } from 'react';
import { reportUserAction } from '@/server/actions/report-actions';

interface ReportState {
  submitting: boolean;
  error: string | null;
  success: boolean;
}

export function useReport() {
  const [state, setState] = useState<ReportState>({
    submitting: false,
    error: null,
    success: false,
  });

  const reportUser = async (formData: FormData) => {
    setState(prev => ({ ...prev, submitting: true, error: null }));

    const result = await reportUserAction(formData);

    setState({
      submitting: false,
      error: result.error || null,
      success: result.success || false,
    });

    return result;
  };

  const reset = () => {
    setState({
      submitting: false,
      error: null,
      success: false,
    });
  };

  return { ...state, reportUser, reset };
}
```

---

## Realtime Hooks

### useRealtimeUpdates Hook

```typescript
// hooks/useRealtimeUpdates.ts
'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeUpdatesOptions {
  table: string;
  filter?: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
}

export function useRealtimeUpdates(options: UseRealtimeUpdatesOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const supabase = createClient();

    channelRef.current = supabase
      .channel(`realtime-${options.table}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: options.table,
          filter: options.filter,
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              options.onInsert?.(payload);
              break;
            case 'UPDATE':
              options.onUpdate?.(payload);
              break;
            case 'DELETE':
              options.onDelete?.(payload);
              break;
          }
        }
      )
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [options.table, options.filter]);
}
```

### Usage Example

```typescript
// Example: Listen for new match history entries
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

export function DashboardPage() {
  const { matchHistory, refetch } = useMatchHistory(userId);

  useRealtimeUpdates({
    table: 'match_history',
    filter: `user_id=eq.${userId}`,
    onInsert: (payload) => {
      console.log('New completion:', payload);
      refetch();
    },
  });

  return (
    <div>
      {/* Render dashboard */}
    </div>
  );
}
```

---

## UI State Hooks

### useModal Hook

```typescript
// hooks/useModal.ts
'use client';

import { useState, useCallback } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
}
```

### useToast Hook

```typescript
// hooks/useToast.ts
'use client';

import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface UseToastReturn {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  dismissToast: (id: string) => void;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'info', duration = 3000) => {
      const id = crypto.randomUUID();
      setToasts(prev => [...prev, { id, message, type, duration }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
```

---

## Hook Best Practices

### 1. Always Use TypeScript Types

```typescript
interface UseMyHookReturn {
  data: DataType | null;
  loading: boolean;
  error: string | null;
}
```

### 2. Clean Up Effects

```typescript
useEffect(() => {
  const channel = subscribe();

  return () => {
    channel.unsubscribe();
  };
}, []);
```

### 3. Handle Loading and Error States

```typescript
return { data, loading, error };
```

### 4. Provide Refetch Function

```typescript
return { data, refetch: fetchData };
```

### 5. Use Stable References

```typescript
const fetchData = useCallback(async () => {
  // ...
}, [dependencies]);
```

---

*Last Updated: February 5, 2026*
