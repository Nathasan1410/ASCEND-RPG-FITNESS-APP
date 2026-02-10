# Components

> Reusable UI components with glassmorphism design

---

## Base Components

### Button Component

```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25":
            variant === "primary",
          "bg-white/10 text-white border border-white/20 hover:bg-white/20":
            variant === "secondary",
          "text-white/70 hover:text-white hover:bg-white/5":
            variant === "ghost",
          "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25":
            variant === "danger",
        }[variant],
        {
          "px-3 py-2 text-sm": size === "sm",
          "px-4 py-3 text-base": size === "md",
          "px-6 py-4 text-lg": size === "lg",
        }[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
    </button>
  );
}
```

### Card Component

```typescript
// components/ui/Card.tsx
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "neon";
  interactive?: boolean;
}

export function Card({
  variant = "glass",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-200",
        {
          "bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20":
            variant === "glass",
          "bg-gradient-to-br from-white/10 to-white/5 border border-white/10":
            variant === "neon",
          "bg-gray-900/50 border border-gray-700":
            variant === "default",
        }[variant],
        interactive && "hover:scale-[1.02] hover:shadow-xl cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Input Component

```typescript
// components/ui/Input.tsx
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-white/70"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-400">{error}</span>
      )}
    </div>
  );
}
```

### Badge Component

```typescript
// components/ui/Badge.tsx
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "rank";
  size?: "sm" | "md";
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold transition-colors",
        {
          "bg-white/10 text-white/70": variant === "default",
          "bg-green-500/20 text-green-400 border border-green-500/30":
            variant === "success",
          "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30":
            variant === "warning",
          "bg-red-500/20 text-red-400 border border-red-500/30":
            variant === "error",
          "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30":
            variant === "rank",
        }[variant],
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
        }[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
```

---

## Feature Components

### Quest Card Component

```typescript
// components/quest/QuestCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { XPBadge } from '@/components/gamification/XPBadge';
import { RankBadge } from '@/components/gamification/RankBadge';
import { Quest } from '@/types/schemas';

interface QuestCardProps {
  quest: Quest;
  onClick?: () => void;
}

export function QuestCard({ quest, onClick }: QuestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        variant="glass"
        interactive={!!onClick}
        onClick={onClick}
        className="relative overflow-hidden"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <RankBadge rank={quest.difficulty} />
            <div>
              <h3 className="text-lg font-bold text-white">
                {quest.title}
              </h3>
              <p className="text-sm text-white/60">
                {quest.duration_minutes} min
              </p>
            </div>
          </div>
          <XPBadge xp={quest.xp_reward} />
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {quest.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="default">
            {quest.exercises.length} Exercises
          </Badge>
          {quest.warm_up && (
            <Badge variant="success">
              Warm-up Included
            </Badge>
          )}
          {quest.cool_down && (
            <Badge variant="success">
              Cool-down Included
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </Card>
    </motion.div>
  );
}
```

### Exercise List Component

```typescript
// components/quest/ExerciseList.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Exercise } from '@/types/schemas';

interface ExerciseListProps {
  exercises: Exercise[];
  interactive?: boolean;
}

export function ExerciseList({ exercises, interactive = false }: ExerciseListProps) {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const toggleComplete = (exerciseId: string) => {
    if (!interactive) return;
    
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {exercises.map((exercise, index) => (
        <Card
          key={exercise.id || index}
          variant="glass"
          interactive={interactive}
          onClick={() => toggleComplete(exercise.id || index.toString())}
          className={cn(
            "transition-all duration-200",
            completedExercises.has(exercise.id || index.toString()) && "opacity-50"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-white">
                  {exercise.name}
                </h4>
                <Badge variant="default" size="sm">
                  {exercise.type}
                </Badge>
              </div>
              
              <div className="text-sm text-white/60 mb-3">
                {exercise.sets} sets × {exercise.value}{' '}
                {exercise.type === 'reps' ? 'reps' : exercise.type === 'timed' ? 'seconds' : 'miles'}
              </div>

              <div className="flex flex-wrap gap-1">
                {exercise.target_muscle.map(muscle => (
                  <Badge key={muscle} variant="secondary" size="sm">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            {interactive && (
              <div
                className={cn(
                  "h-6 w-6 rounded-full border-2 transition-colors",
                  completedExercises.has(exercise.id || index.toString())
                    ? "border-cyan-500 bg-cyan-500"
                    : "border-white/30 hover:border-cyan-500"
                )}
              >
                {completedExercises.has(exercise.id || index.toString()) && (
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>

          {exercise.instructions && exercise.instructions.length > 0 && (
            <ol className="mt-4 space-y-1 text-sm text-white/70">
              {exercise.instructions.map((instruction, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-cyan-400">{i + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          )}
        </Card>
      ))}
    </div>
  );
}
```

### XP Badge Component

```typescript
// components/gamification/XPBadge.tsx
import { cn } from "@/lib/utils/cn";

interface XPBadgeProps {
  xp: number;
  showLabel?: boolean;
  className?: string;
}

export function XPBadge({ xp, showLabel = true, className }: XPBadgeProps) {
  const formatXP = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getColorClass = (value: number): string => {
    if (value >= 50000) return "text-purple-400";
    if (value >= 10000) return "text-pink-400";
    if (value >= 5000) return "text-cyan-400";
    if (value >= 1000) return "text-blue-400";
    return "text-gray-400";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 font-bold",
        getColorClass(xp),
        className
      )}
    >
      {showLabel && <span className="text-white/60">XP:</span>}
      {formatXP(xp)}
    </span>
  );
}
```

### Rank Badge Component

```typescript
// components/gamification/RankBadge.tsx
import { cn } from "@/lib/utils/cn";

interface RankBadgeProps {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RankBadge({ rank, size = 'md', className }: RankBadgeProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-sm px-2 py-0.5';
      case 'lg': return 'text-xl px-4 py-2';
      default: return 'text-lg px-3 py-1';
    }
  };

  const getRankColor = (rank: string): string => {
    const colors: Record<string, string> = {
      'E': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'D': 'bg-green-500/20 text-green-400 border-green-500/30',
      'C': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'B': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'A': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'S': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 shadow-lg shadow-purple-500/25',
    };
    return colors[rank] || colors['E'];
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg border font-bold uppercase tracking-wider",
        getSizeClass(),
        getRankColor(rank),
        className
      )}
    >
      {rank}
    </span>
  );
}
```

---

## Glassmorphism Styling

### Glass Card Utility

```typescript
// lib/utils/glass.ts
import { cn } from "./cn";

export function glass({
  intensity = 10,
  blur = 16,
  border = true,
}: {
  intensity?: number;
  blur?: number;
  border?: boolean;
} = {}) {
  return cn(
    `bg-white/${intensity}`,
    `backdrop-blur-${blur}`,
    border && "border border-white/10",
    "rounded-2xl"
  );
}
```

### Neon Glow Effect

```typescript
// lib/utils/neon.ts
import { cn } from "./cn";

export function neon({
  color = "cyan",
  intensity = 25,
}: {
  color?: "cyan" | "purple" | "pink" | "green";
  intensity?: number;
} = {}) {
  const colors: Record<string, string> = {
    cyan: `shadow-cyan-500/${intensity}`,
    purple: `shadow-purple-500/${intensity}`,
    pink: `shadow-pink-500/${intensity}`,
    green: `shadow-green-500/${intensity}`,
  };

  return cn(
    "shadow-lg",
    colors[color],
    "shadow-[0_0_20px_rgba(var(--color),0.3)]"
  );
}
```

---

## Component Best Practices

### 1. Compose Components

```typescript
// Good: Compose multiple components
<Card variant="glass">
  <div className="flex items-center gap-3">
    <Avatar src={user.avatarUrl} />
    <div>
      <h3>{user.username}</h3>
      <RankBadge rank={user.rank_tier} />
    </div>
  </div>
</Card>

// Bad: One giant component
<div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
  {/* ...lots of nested divs... */}
</div>
```

### 2. Use Variants for Consistency

```typescript
// Use predefined variants
<Card variant="glass" />
<Card variant="neon" />

// Instead of custom classes
<div className="bg-white/5 backdrop-blur-lg border border-white/10" />
```

### 3. Support Accessibility

```typescript
// Add proper ARIA labels
<button aria-label="Complete quest">Complete</button>

// Use semantic HTML
<nav>...</nav>
<main>...</main>
<article>...</article>
```

---

*Last Updated: February 5, 2026*
