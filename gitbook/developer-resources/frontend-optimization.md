# Frontend Optimization

> Performance strategies for fast, responsive user experience

---

## Optimization Strategies

ASCEND: FITNESS RPG uses multiple optimization techniques to ensure fast page loads and smooth interactions.

| Strategy | Benefit | Implementation |
|----------|---------|----------------|
| **Code Splitting** | Smaller initial bundles | Dynamic imports |
| **Server Components** | Faster initial load, smaller client bundle | Next.js App Router |
| **Image Optimization** | Reduced bandwidth, faster images | Next.js Image component |
| **Caching** | Reduced API calls | SWR, React Query |
| **Lazy Loading** | Load components on demand | React.lazy, dynamic imports |
| **Minification** | Smaller file sizes | Production builds |

---

## Code Splitting

### Dynamic Imports

Load heavy components only when needed using Next.js dynamic imports.

```typescript
import dynamic from 'next/dynamic';

// Lazy load heavy quest detail component
const QuestDetail = dynamic(() => import('@/components/quest/QuestDetail'), {
  loading: () => (
    <div className="animate-pulse bg-white/5 rounded-2xl h-96" />
  ),
  ssr: false,
});

// Lazy load leaderboard component
const Leaderboard = dynamic(() => import('@/components/leaderboard/Leaderboard'), {
  loading: () => <LeaderboardSkeleton />,
});

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <QuestDetail />
      <Leaderboard />
    </div>
  );
}
```

### Route-Based Splitting

Next.js automatically splits code by route:

```
app/
├── page.tsx              # Landing page (separate bundle)
├── dashboard/
│   ├── page.tsx          # Dashboard (separate bundle)
│   └── quest/
│       └── [id]/
│           └── page.tsx  # Quest detail (separate bundle)
└── profile/
    └── [username]/
        └── page.tsx      # Public profile (separate bundle)
```

### Component-Level Splitting

```typescript
// components/quest/QuestModal.tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

const QuestExecutionView = dynamic(
  () => import('./QuestExecutionView'),
  { ssr: false }
);

export function QuestModal({ questId }: { questId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Quest</button>

      {isOpen && (
        <dialog open>
          <QuestExecutionView questId={questId} />
          <button onClick={() => setIsOpen(false)}>Close</button>
        </dialog>
      )}
    </>
  );
}
```

---

## Image Optimization

### Next.js Image Component

Use the Next.js Image component for automatic optimization.

```typescript
import Image from 'next/image';

export function QuestBanner({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className="relative h-64 w-full rounded-2xl overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority={true}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
```

### Avatar Optimization

```typescript
export function UserAvatar({ avatarUrl, username }: { avatarUrl?: string; username: string }) {
  return (
    <div className="relative h-12 w-12 rounded-full overflow-hidden">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={username}
          fill
          className="object-cover"
          sizes="48px"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">
          {username[0].toUpperCase()}
        </div>
      )}
    </div>
  );
}
```

### Proof Image Optimization

```typescript
export function ProofImage({ proofUrl }: { proofUrl: string }) {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <Image
        src={proofUrl}
        alt="Workout proof"
        fill
        className="object-contain bg-black/50"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </div>
  );
}
```

---

## Server Components

### When to Use Server Components

| Use Case | Example |
|----------|---------|
| Direct database access | Fetching user profile |
| API calls without client data | Quest generation |
| SEO-critical content | Landing page |
| Reducing bundle size | Heavy components |

### Server Component Example

```typescript
// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { QuestCard } from '@/components/quest/QuestCard';

export default async function DashboardPage() {
  const supabase = createClient();
  
  // Server-side data fetch (no client JavaScript needed)
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: quests } = await supabase
    .from('quests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="dashboard">
      <StatusWindow profile={profile} />
      <div className="quest-grid">
        {quests?.map(quest => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
}
```

### Client Component Example

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function QuestCard({ quest }: { quest: Quest }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
    >
      <h3>{quest.title}</h3>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide' : 'Show'} Details
      </button>

      {isExpanded && (
        <div className="mt-4">
          <p>{quest.description}</p>
        </div>
      )}
    </motion.div>
  );
}
```

---

## Caching Strategies

### SWR for Client-Side Fetching

```typescript
'use client';

import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

async function fetcher(key: string) {
  const { data } = await supabase
    .from('match_history')
    .select('*')
    .order('completed_at', { ascending: false })
    .limit(20);

  return data;
}

export function useMatchHistory() {
  const { data, error, mutate } = useSWR('match_history', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // Refresh every minute
  });

  return {
    matchHistory: data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}
```

### React Server Components with Cache

```typescript
// app/leaderboard/page.tsx
import { unstable_cache } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

const getLeaderboardData = unstable_cache(
  async () => {
    const supabase = createClient();
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('hunter_status', 'Normal')
      .order('xp', { ascending: false })
      .limit(100);

    return data;
  },
  ['leaderboard'],
  { revalidate: 300 } // Cache for 5 minutes
);

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboardData();

  return (
    <div className="leaderboard">
      {leaderboard?.map((profile, index) => (
        <LeaderboardRow key={profile.id} rank={index + 1} profile={profile} />
      ))}
    </div>
  );
}
```

---

## Performance Metrics

### Core Web Vitals

| Metric | Target | Description |
|--------|--------|-------------|
| **FCP** | < 1.8s | First Contentful Paint |
| **LCP** | < 2.5s | Largest Contentful Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **TTI** | < 3.8s | Time to Interactive |
| **FID** | < 100ms | First Input Delay |

### Metric Collection

```typescript
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
      }),
    });
  });

  return null;
}
```

### Performance Monitoring

```typescript
// app/api/analytics/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const metric = await request.json();

  // Log metric (in production, send to analytics service)
  console.log('Web Vital:', metric);

  return NextResponse.json({ success: true });
}
```

---

## Bundle Optimization

### Analyzing Bundle Size

```bash
# Analyze bundle size
npm run build

# Next.js automatically outputs bundle analysis
# Check .next/analyze/ for detailed report
```

### Lazy Loading Libraries

```typescript
// Heavy charting library - only load when needed
const Chart = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-2xl" />,
});

export function StatsChart({ data }: { data: StatsData }) {
  return (
    <Chart width="100%" height={256}>
      {/* Chart content */}
    </Chart>
  );
}
```

### Tree Shaking

```typescript
// BAD: Import entire library
import _ from 'lodash';

// GOOD: Import specific functions
import { debounce, throttle } from 'lodash-es';

// Use tree-shakable libraries
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
```

---

## Fonts Optimization

### Next.js Font Optimization

```typescript
// app/layout.tsx
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Font Display Strategy

| Font | Display Strategy | Reason |
|------|------------------|--------|
| **Inter** | `swap` | Body text, fast loading |
| **Orbitron** | `swap` | Display font, decorative |
| **Custom** | `optional` | Fallback to system fonts |

---

## Animation Performance

### CSS Animations

```typescript
// Use CSS animations for simple transitions
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Framer Motion Optimization

```typescript
'use client';

import { motion } from 'framer-motion';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
    >
      {children}
    </motion.div>
  );
}
```

### Use transform and opacity

```typescript
// GOOD: Use transform and opacity (GPU-accelerated)
style={{ transform: 'translateY(10px)', opacity: 0.5 }}

// BAD: Use top and left (triggers reflow)
style={{ top: '10px', left: '20px', opacity: 0.5 }}
```

---

## Best Practices

### 1. Server Components by Default

Use server components unless you need interactivity.

```typescript
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}
```

### 2. Lazy Load Heavy Components

Only load heavy components when needed.

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### 3. Optimize Images

Always use Next.js Image component.

```typescript
<Image src="/image.jpg" alt="Description" width={800} height={600} />
```

### 4. Use Caching

Cache expensive operations.

```typescript
const data = await unstable_cache(fetchData, ['key'], { revalidate: 300 })();
```

### 5. Minimize Client Bundle

Keep client-side JavaScript minimal.

```typescript
// Server Component (no client JS)
export async function Page() {
  return <div>Content</div>;
}
```

---

*Last Updated: February 5, 2026*
