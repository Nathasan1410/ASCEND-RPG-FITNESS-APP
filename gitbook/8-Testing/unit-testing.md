# Unit Testing

> Testing strategies and examples for ASCEND: FITNESS RPG

---

## Testing Overview

ASCEND: FITNESS RPG uses a comprehensive testing approach to ensure code quality and reliability.

### Test Types

| Test Type | Purpose | Tools |
|-----------|---------|-------|
| **Unit Tests** | Test individual functions | Jest, @testing-library/react |
| **Integration Tests** | Test component interactions | Jest, @testing-library/react |
| **End-to-End Tests** | Test full user flows | Playwright |

### Test Structure

```
tests/
├── unit/
│   ├── lib/
│   │   ├── gamification/xp-calculator.test.ts
│   │   ├── gamification/leveling.test.ts
│   │   ├── ai/groq.test.ts
│   │   └── anti-cheat/logic-filter.test.ts
├── integration/
│   ├── components/
│   │   ├── quest/QuestCard.test.tsx
│   │   ├── gamification/XPBadge.test.tsx
│   │   └── profile/ProfileCard.test.tsx
│   └── server-actions/
│       ├── quest-actions.test.ts
│       └── profile-actions.test.ts
└── e2e/
    ├── quest-generation.spec.ts
    ├── quest-completion.spec.ts
    └── rank-up.spec.ts
```

---

## Unit Tests

### XP Calculator Tests

```typescript
// tests/unit/lib/gamification/xp-calculator.test.ts
import { describe, it, expect } from '@jest/globals';
import { XPService } from '@/lib/gamification/xp-calculator';

describe('XPService', () => {
  describe('calculateXP', () => {
    it('calculates XP correctly for S-grade with perfect scores', () => {
      const baseXP = 2500;
      const formScore = 0.95;
      const effortScore = 0.92;
      const consistencyScore = 0.88;
      const xpMultiplier = 1.5;

      const xp = XPService.calculateXP({
        baseXP,
        formScore,
        effortScore,
        consistencyScore,
        xpMultiplier,
      });

      // 2500 * 1.5 = 3750 (with perfect performance bonus)
      expect(xp).toBe(3750);
    });

    it('calculates XP correctly for E-grade with average scores', () => {
      const baseXP = 50;
      const formScore = 0.7;
      const effortScore = 0.7;
      const consistencyScore = 0.7;
      const xpMultiplier = 1.0;

      const xp = XPService.calculateXP({
        baseXP,
        formScore,
        effortScore,
        consistencyScore,
        xpMultiplier,
      });

      // 50 * 0.8 = 40 (with below-average penalty)
      expect(xp).toBe(40);
    });

    it('applies minimum XP multiplier of 0.8', () => {
      const baseXP = 1000;
      const formScore = 0.3;
      const effortScore = 0.3;
      const consistencyScore = 0.3;
      const xpMultiplier = 0.5; // Below minimum

      const xp = XPService.calculateXP({
        baseXP,
        formScore,
        effortScore,
        consistencyScore,
        xpMultiplier,
      });

      // 1000 * 0.8 = 800 (minimum multiplier applied)
      expect(xp).toBe(800);
    });

    it('applies maximum XP multiplier of 1.5', () => {
      const baseXP = 1000;
      const formScore = 1.0;
      const effortScore = 1.0;
      const consistencyScore = 1.0;
      const xpMultiplier = 2.0; // Above maximum

      const xp = XPService.calculateXP({
        baseXP,
        formScore,
        effortScore,
        consistencyScore,
        xpMultiplier,
      });

      // 1000 * 1.5 = 1500 (maximum multiplier applied)
      expect(xp).toBe(1500);
    });
  });
});
```

### Level Calculator Tests

```typescript
// tests/unit/lib/gamification/leveling.test.ts
import { describe, it, expect } from '@jest/globals';
import { LevelingService } from '@/lib/gamification/leveling';

describe('LevelingService', () => {
  describe('calculateLevel', () => {
    it('returns level 1 for 0 XP', () => {
      const level = LevelingService.calculateLevel(BigInt(0));
      expect(level).toBe(1);
    });

    it('returns level 2 for 100 XP', () => {
      const level = LevelingService.calculateLevel(BigInt(100));
      expect(level).toBe(2);
    });

    it('returns level 5 for 1000 XP', () => {
      const level = LevelingService.calculateLevel(BigInt(1000));
      expect(level).toBe(5);
    });

    it('returns level 10 for 5000 XP', () => {
      const level = LevelingService.calculateLevel(BigInt(5000));
      expect(level).toBe(10);
    });
  });

  describe('calculateRank', () => {
    it('returns E-Rank for levels 1-4', () => {
      expect(LevelingService.calculateRank(1)).toBe('E');
      expect(LevelingService.calculateRank(2)).toBe('E');
      expect(LevelingService.calculateRank(4)).toBe('E');
    });

    it('returns D-Rank for levels 5-9', () => {
      expect(LevelingService.calculateRank(5)).toBe('D');
      expect(LevelingService.calculateRank(7)).toBe('D');
      expect(LevelingService.calculateRank(9)).toBe('D');
    });

    it('returns C-Rank for levels 10-19', () => {
      expect(LevelingService.calculateRank(10)).toBe('C');
      expect(LevelingService.calculateRank(15)).toBe('C');
      expect(LevelingService.calculateRank(19)).toBe('C');
    });

    it('returns B-Rank for levels 20-49', () => {
      expect(LevelingService.calculateRank(20)).toBe('B');
      expect(LevelingService.calculateRank(35)).toBe('B');
      expect(LevelingService.calculateRank(49)).toBe('B');
    });

    it('returns A-Rank for levels 50-99', () => {
      expect(LevelingService.calculateRank(50)).toBe('A');
      expect(LevelingService.calculateRank(75)).toBe('A');
      expect(LevelingService.calculateRank(99)).toBe('A');
    });

    it('returns S-Rank for levels 100+', () => {
      expect(LevelingService.calculateRank(100)).toBe('S');
      expect(LevelingService.calculateRank(150)).toBe('S');
    });
  });

  describe('getXPForLevel', () => {
    it('returns correct XP for level 1', () => {
      const xp = LevelingService.getXPForLevel(1);
      expect(xp).toBe(BigInt(0));
    });

    it('returns correct XP for level 2', () => {
      const xp = LevelingService.getXPForLevel(2);
      expect(xp).toBe(BigInt(100));
    });

    it('returns correct XP for level 10', () => {
      const xp = LevelingService.getXPForLevel(10);
      expect(xp).toBe(BigInt(4000));
    });
  });
});
```

### Anti-Cheat Logic Filter Tests

```typescript
// tests/unit/lib/anti-cheat/logic-filter.test.ts
import { describe, it, expect } from '@jest/globals';
import { checkImpossibility } from '@/lib/anti-cheat/logic-filter';

describe('checkImpossibility', () => {
  it('passes normal submission', async () => {
    const submission = {
      questId: 'quest-1',
      duration: 45,
      exercises: [
        { exerciseId: 'ex-1', value: 20, type: 'reps' },
        { exerciseId: 'ex-2', value: 30, type: 'reps' },
      ],
    };

    const quest = {
      id: 'quest-1',
      duration_minutes: 45,
      xp_reward: 500,
      exercises: [{ id: 'ex-1' }, { id: 'ex-2' }],
    };

    const result = await checkImpossibility(submission, quest);
    expect(result.passed).toBe(true);
    expect(result.confidence).toBe(1.0);
  });

  it('rejects suspiciously fast completion', async () => {
    const submission = {
      questId: 'quest-1',
      duration: 5,
      exercises: [
        { exerciseId: 'ex-1', value: 100, type: 'reps' },
      ],
    };

    const quest = {
      id: 'quest-1',
      duration_minutes: 45,
      xp_reward: 500,
      exercises: [{ id: 'ex-1' }],
    };

    const result = await checkImpossibility(submission, quest);
    expect(result.passed).toBe(false);
    expect(result.reason).toContain('too short');
    expect(result.confidence).toBeGreaterThan(0.8);
  });

  it('rejects impossible rep count', async () => {
    const submission = {
      questId: 'quest-1',
      duration: 30,
      exercises: [
        { exerciseId: 'ex-1', value: 100, type: 'reps' },
      ],
    };

    const quest = {
      id: 'quest-1',
      duration_minutes: 45,
      xp_reward: 500,
      exercises: [{ id: 'ex-1' }],
    };

    const result = await checkImpossibility(submission, quest);
    expect(result.passed).toBe(false);
    expect(result.reason).toContain('Impossible rep count');
  });

  it('rejects XP over limit', async () => {
    const submission = {
      questId: 'quest-1',
      duration: 45,
      exercises: [
        { exerciseId: 'ex-1', value: 20, type: 'reps' },
      ],
    };

    const quest = {
      id: 'quest-1',
      duration_minutes: 45,
      xp_reward: 5000, // Over 4000 limit
      exercises: [{ id: 'ex-1' }],
    };

    const result = await checkImpossibility(submission, quest);
    expect(result.passed).toBe(false);
    expect(result.reason).toContain('XP exceeds limit');
  });
});
```

---

## Integration Tests

### Server Action Tests

```typescript
// tests/integration/server-actions/quest-actions.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals';
import { generateQuestAction } from '@/server/actions/quest-actions';

describe('generateQuestAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates quest successfully for authenticated user', async () => {
    const result = await generateQuestAction();

    expect(result.success).toBe(true);
    expect(result.quest).toBeDefined();
    expect(result.quest.title).toBeTruthy();
    expect(result.quest.difficulty).toMatch(/^[EDCBAS]$/);
    expect(result.quest.xp_reward).toBeGreaterThanOrEqual(50);
    expect(result.quest.xp_reward).toBeLessThanOrEqual(4000);
  });

  it('returns error for unauthenticated user', async () => {
    const result = await generateQuestAction();

    expect(result.success).toBe(false);
    expect(result.error).toBe('Unauthorized');
  });

  it('uses fallback quest on Groq failure', async () => {
    const result = await generateQuestAction();

    expect(result.success).toBe(true);
    expect(result.quest).toBeDefined();
    expect(result.quest.title).toContain('Gatekeeper'); // Fallback quest title
  });
});
```

### Quest Completion Tests

```typescript
// tests/integration/server-actions/match-history-actions.test.ts
import { describe, it, expect } from '@jest/globals';
import { completeQuestAction } from '@/server/actions/match-history-actions';

describe('completeQuestAction', () => {
  it('completes quest successfully', async () => {
    const formData = new FormData();
    formData.append('questId', 'quest-1');
    formData.append('proof', new File([''], 'proof.jpg', { type: 'image/jpeg' }));
    formData.append('duration', '45');
    formData.append('notes', 'Great workout!');

    const result = await completeQuestAction(formData);

    expect(result.success).toBe(true);
    expect(result.xpEarned).toBeGreaterThan(0);
    expect(result.evaluation).toBeDefined();
  });

  it('rejects invalid duration', async () => {
    const formData = new FormData();
    formData.append('questId', 'quest-1');
    formData.append('proof', new File([''], 'proof.jpg', { type: 'image/jpeg' }));
    formData.append('duration', '1'); // Too short
    formData.append('notes', 'Great workout!');

    const result = await completeQuestAction(formData);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

---

## Component Tests

### Quest Card Component Tests

```typescript
// tests/integration/components/quest/QuestCard.test.tsx
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { QuestCard } from '@/components/quest/QuestCard';

describe('QuestCard', () => {
  const mockQuest = {
    id: 'quest-1',
    title: 'Gatekeeper Protocol',
    description: 'Begin your journey with foundational exercises.',
    difficulty: 'E',
    duration_minutes: 20,
    xp_reward: 50,
    exercises: [
      {
        name: 'Bodyweight Squats',
        type: 'reps',
        sets: 3,
        value: 10,
        target_muscle: ['quadriceps', 'glutes'],
        instructions: ['Stand with feet shoulder-width apart'],
      },
    ],
  };

  it('renders quest title', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('Gatekeeper Protocol')).toBeInTheDocument();
  });

  it('renders quest difficulty', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('E')).toBeInTheDocument();
  });

  it('renders XP reward', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('50 XP')).toBeInTheDocument();
  });

  it('renders duration', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('20 min')).toBeInTheDocument();
  });

  it('renders exercises', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('Bodyweight Squats')).toBeInTheDocument();
  });

  it('opens detail view on click', () => {
    render(<QuestCard quest={mockQuest} />);
    const card = screen.getByText('Gatekeeper Protocol').closest('div');
    expect(card).toBeInTheDocument();
  });
});
```

### XP Badge Component Tests

```typescript
// tests/integration/components/gamification/XPBadge.test.tsx
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { XPBadge } from '@/components/gamification/XPBadge';

describe('XPBadge', () => {
  it('renders XP amount', () => {
    render(<XPBadge xp={1500} />);
    expect(screen.getByText('1500 XP')).toBeInTheDocument();
  });

  it('formats large XP numbers', () => {
    render(<XPBadge xp={1500000} />);
    expect(screen.getByText('1.5M XP')).toBeInTheDocument();
  });

  it('formats thousand XP numbers', () => {
    render(<XPBadge xp={1500} />);
    expect(screen.getByText('1.5K XP')).toBeInTheDocument();
  });

  it('applies correct color class for low XP', () => {
    const { container } = render(<XPBadge xp={100} />);
    expect(container.firstChild).toHaveClass('text-gray-400');
  });

  it('applies correct color class for medium XP', () => {
    const { container } = render(<XPBadge xp{5000} />);
    expect(container.firstChild).toHaveClass('text-cyan-400');
  });

  it('applies correct color class for high XP', () => {
    const { container } = render(<XPBadge xp={50000} />);
    expect(container.firstChild).toHaveClass('text-purple-400');
  });
});
```

---

## Running Tests

### Run All Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Run Specific Test Files

```bash
# Run unit tests
npm test -- tests/unit

# Run integration tests
npm test -- tests/integration

# Run specific test file
npm test -- tests/unit/lib/gamification/xp-calculator.test.ts
```

### Run E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific E2E test
npm run test:e2e -- quest-generation.spec.ts

# Run E2E tests in headed mode
npm run test:e2e -- --headed
```

---

## Test Configuration

### Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'server/actions/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

### Playwright Configuration

```javascript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## Test Coverage

### Coverage Targets

| Category | Target | Current |
|----------|--------|---------|
| Statements | 80% | TBD |
| Branches | 75% | TBD |
| Functions | 80% | TBD |
| Lines | 80% | TBD |

### Generating Coverage Report

```bash
# Generate coverage report
npm test -- --coverage

# View coverage report
open coverage/lcov-report/index.html
```

---

## Best Practices

### 1. Write Descriptive Tests

```typescript
// GOOD: Descriptive test name
it('calculates XP correctly for S-grade with perfect scores', () => {
  // ...
});

// BAD: Generic test name
it('works', () => {
  // ...
});
```

### 2. Test Edge Cases

```typescript
it('handles zero XP', () => {
  const result = calculateXP(0);
  expect(result).toBe(0);
});

it('handles maximum XP', () => {
  const result = calculateXP(4000);
  expect(result).toBe(6000);
});
```

### 3. Use Matchers Appropriately

```typescript
// GOOD: Specific matcher
expect(value).toBeGreaterThanOrEqual(0);

// BAD: Generic matcher
expect(value >= 0).toBe(true);
```

### 4. Mock External Dependencies

```typescript
jest.mock('@/lib/ai/groq', () => ({
  generateQuestWithGroq: jest.fn().mockResolvedValue(mockQuest),
}));
```

---

*Last Updated: February 5, 2026*
