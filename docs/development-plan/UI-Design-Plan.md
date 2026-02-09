# THE SYSTEM - UI DESIGN PLAN

## Design Philosophy: "The Interface is the Character"

> "The System is not software. It is an entity. It does not assist—it commands. Every pixel must reinforce this truth."

This document establishes the definitive visual language for "The System" application. We are not building a fitness app with a dark theme. We are constructing a **Diegetic Interface**—a UI that exists within the narrative reality of the user's life, as if an otherworldly intelligence has chosen them for awakening.

---

## Part I: The Visual Paradigm

### 1.1 Futuristic User Interface (FUI) Principles

The System's interface follows the **FUI Paradigm**, characterized by:

| Principle | Implementation | Anti-Pattern |
|-----------|----------------|--------------|
| **Information Density** | Every screen displays maximum relevant data | Minimalist "card with single stat" |
| **Neon-on-Void Contrast** | Bright elements on true dark backgrounds | Gray-on-gray "soft" dark modes |
| **Geometric Precision** | Sharp angles, chamfered corners, grid alignment | Organic curves, rounded everything |
| **Mechanical Motion** | Snappy, spring-based animations with overshoot | Smooth, eased, "friendly" transitions |
| **Ambient Audio** | UI sounds for every interaction | Silent interfaces |
| **Data Transmission Aesthetic** | Text that "decodes" or types itself | Static, instant text rendering |

### 1.2 Reference Sources (Priority Order)

```
PRIMARY REFERENCES
├── Arwes Framework (arwes.dev)
│   └── SVG frames, text decipher, audio bleeps
├── Linear App (linear.app)
│   └── Data density, monospace numbers, subtle borders
└── Vercel Dashboard (vercel.com)
    └── Bento grids, dark mode polish

COMPONENT LIBRARIES (Implementation References)
├── Aceternity UI (ui.aceternity.com)
│   ├── Spotlight effects, glowing borders
│   ├── 3D card transforms, parallax effects
│   ├── Text generation effects (typewriter, reveal)
│   ├── Background beams, grid patterns
│   ├── Floating navbar, dock components
│   └── Bento grid layouts with hover effects
├── ReactBits (reactbits.dev)
│   ├── Animated backgrounds (Aurora, Hyperspeed)
│   ├── Text animations (Blur, Gradient, Split)
│   ├── Interactive components (Tilt cards, Magnet)
│   ├── Scroll-based animations
│   └── Noise/grain texture overlays
└── Motion.dev (motion.dev)
    ├── Official Framer Motion documentation
    ├── Spring physics configuration
    ├── Gesture animations (drag, hover, tap)
    ├── Layout animations (shared element)
    └── AnimatePresence for exit animations

ARTISTIC REFERENCES
├── Solo Leveling Anime UI Breakdowns (ArtStation)
├── Cybersecurity Dashboard concepts (Dribbble)
├── TRON: Legacy UI Design
└── Halo Infinite Menu Systems
```

### 1.3 Component Mapping from Reference Libraries

The following maps specific UI needs to reference library components:

| System Feature | Aceternity Component | ReactBits Alternative |
|---------------|---------------------|----------------------|
| Quest Card Hover | `CardHoverEffect` | `TiltCard` |
| System Window Entrance | `BackgroundBeams` | `Aurora` background |
| Level Up Flash | `SpotlightCard` | `Particles` burst |
| Text Decode Effect | `TextGenerateEffect` | `SplitText` |
| Stats Hexagon | Custom (Recharts) | Custom (Recharts) |
| XP Bar Fill | `MovingBorder` | `GradientText` counter |
| Dashboard Grid | `BentoGrid` | Grid with `TiltCard` |
| Rank Badge Glow | `GlowingBorder` | `Magnet` effect |
| Navbar | `FloatingNav` | `Dock` style |
| Background | `BackgroundGradient` | `Hyperspeed` / `Aurora` |

### 1.4 Aceternity UI Components to Implement

```
HIGH PRIORITY (Use These)
════════════════════════════════════════════════════════
1. BackgroundBeams
   → Landing page, creates "System awakening" feel
   
2. TextGenerateEffect  
   → Quest descriptions that type out
   
3. CardHoverEffect (3D Tilt)
   → Quest cards with parallax depth
   
4. MovingBorder
   → Active quest card border animation
   
5. SpotlightCard
   → Level up celebration modal
   
6. BentoGrid
   → Dashboard layout structure
   
7. FloatingNavbar
   → Top navigation with blur backdrop

MEDIUM PRIORITY (Consider These)
════════════════════════════════════════════════════════
8. Meteors
   → Background effect during rank-up
   
9. InfiniteMovingCards
   → Leaderboard scrolling display
   
10. Tabs (Aceternity style)
    → Quest type switching (Daily/Penalty/Special)

LOW PRIORITY (Nice to Have)
════════════════════════════════════════════════════════
11. Parallax Scroll
    → Profile page sections
    
12. Tracing Beam
    → Onboarding step progress
```

### 1.5 ReactBits Components to Implement

```
BACKGROUND EFFECTS
════════════════════════════════════════════════════════
Aurora         → Subtle animated gradient background
Hyperspeed     → Quest generation "loading" state
Particles      → Level-up celebration burst

TEXT ANIMATIONS
════════════════════════════════════════════════════════
BlurText       → System message reveal
GradientText   → XP counter, rank display
SplitText      → Quest title entrance
CountUp        → XP gained animation

INTERACTIVE ELEMENTS
════════════════════════════════════════════════════════
TiltCard       → Quest cards with 3D perspective
Magnet         → Button hover magnetic effect
Spotlight      → Cursor-following highlight

TEXTURES
════════════════════════════════════════════════════════
Noise          → Subtle grain overlay for depth
ScanLines      → Optional retro CRT effect
```

### 1.6 Motion.dev Implementation Guide

Reference `motion.dev` for all animation implementations:

```typescript
// Key imports from framer-motion
import { 
  motion,
  AnimatePresence,    // Exit animations
  useScroll,          // Scroll-linked animations
  useTransform,       // Value transformations
  useSpring,          // Spring physics
  useInView,          // Viewport detection
  LayoutGroup,        // Shared layout animations
  Reorder,            // Drag-to-reorder lists
} from "framer-motion";

// Motion.dev recommended patterns for "System" UI:

// 1. Spring-based entrances (not ease/duration)
const springConfig = { stiffness: 400, damping: 30 };

// 2. AnimatePresence for modals
<AnimatePresence mode="wait">
  {isOpen && <Modal key="modal" />}
</AnimatePresence>

// 3. Layout animations for list reordering
<LayoutGroup>
  <motion.div layout />
</LayoutGroup>

// 4. Scroll-linked parallax
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

// 5. useInView for reveal animations
const ref = useRef(null);
const isInView = useInView(ref, { once: true });
```

---

## Part II: The Color System

### 2.1 The Sacred Palette

The System's color identity is built on **high-saturation accents against absolute void**. These are not suggestions—they are law.

```
THE VOID (Backgrounds)
══════════════════════════════════════════════════════════
┌─────────────────┬────────────┬─────────────────────────┐
│ Token           │ Hex        │ Usage                   │
├─────────────────┼────────────┼─────────────────────────┤
│ void-absolute   │ #000000    │ True black (OLED only)  │
│ void-deep       │ #050505    │ Primary background      │
│ void-panel      │ #0a0a0f    │ Card/modal backgrounds  │
│ void-surface    │ #12121a    │ Elevated surfaces       │
│ void-border     │ #1a1a24    │ Subtle dividers         │
└─────────────────┴────────────┴─────────────────────────┘

THE SYSTEM CORE (Primary Accent)
══════════════════════════════════════════════════════════
┌─────────────────┬────────────┬─────────────────────────┐
│ Token           │ Hex        │ Usage                   │
├─────────────────┼────────────┼─────────────────────────┤
│ system-cyan     │ #00FFFF    │ Primary UI accent       │
│ system-blue     │ #00b8ff    │ Secondary elements      │
│ system-electric │ #3498DB    │ Inactive/muted states   │
│ system-glow     │ #00FFFF40  │ Glow/shadow color       │
└─────────────────┴────────────┴─────────────────────────┘

THE HIERARCHY (Rank Colors)
══════════════════════════════════════════════════════════
┌─────────────────┬────────────┬─────────────────────────┐
│ Rank            │ Hex        │ Psychological Intent    │
├─────────────────┼────────────┼─────────────────────────┤
│ E-Rank          │ #6b7280    │ Dull, unawakened        │
│ D-Rank          │ #9ca3af    │ Basic, functional       │
│ C-Rank          │ #55ead4    │ Promising, cyan-teal    │
│ B-Rank          │ #00b8ff    │ Competent, electric     │
│ A-Rank          │ #bd00ff    │ Elite, arcane purple    │
│ S-Rank          │ #f3e600    │ Legendary, pure gold    │
└─────────────────┴────────────┴─────────────────────────┘

STATUS INDICATORS
══════════════════════════════════════════════════════════
┌─────────────────┬────────────┬─────────────────────────┐
│ Token           │ Hex        │ Usage                   │
├─────────────────┼────────────┼─────────────────────────┤
│ status-success  │ #00ff9f    │ Quest complete, XP gain │
│ status-warning  │ #ffd300    │ Low HP, streak at risk  │
│ status-danger   │ #ff003c    │ Penalty, failure        │
│ status-mana     │ #bd00ff    │ Magic/energy related    │
│ status-health   │ #22c55e    │ HP bar fill             │
└─────────────────┴────────────┴─────────────────────────┘
```

### 2.2 Tailwind Configuration

```typescript
// tailwind.config.ts - The System Theme
const systemTheme = {
  colors: {
    // The Void
    void: {
      absolute: '#000000',
      deep: '#050505',
      panel: '#0a0a0f',
      surface: '#12121a',
      border: '#1a1a24',
    },
    
    // System Core
    system: {
      cyan: '#00FFFF',
      blue: '#00b8ff',
      electric: '#3498DB',
      glow: 'rgba(0, 255, 255, 0.25)',
    },
    
    // Ranks
    rank: {
      e: '#6b7280',
      d: '#9ca3af',
      c: '#55ead4',
      b: '#00b8ff',
      a: '#bd00ff',
      s: '#f3e600',
    },
    
    // Status
    status: {
      success: '#00ff9f',
      warning: '#ffd300',
      danger: '#ff003c',
      mana: '#bd00ff',
      health: '#22c55e',
    },
  },
};
```

### 2.3 Color Application Rules

```
RULE 1: The 90/10 Contrast Law
═══════════════════════════════════════════════════════════
90% of screen space = Void colors (backgrounds, panels)
10% of screen space = Accent colors (borders, text, icons)

RULE 2: Glow Hierarchy
═══════════════════════════════════════════════════════════
Primary actions   → Full glow (box-shadow: 0 0 20px #00FFFF)
Secondary actions → Subtle glow (box-shadow: 0 0 10px #00FFFF40)
Tertiary/Static   → No glow, border only

RULE 3: Rank Color Exclusivity
═══════════════════════════════════════════════════════════
Rank colors appear ONLY in rank-related contexts:
✓ Rank badges
✓ XP/level indicators tied to rank
✓ Leaderboard entries
✗ General UI elements
✗ Buttons (use system-cyan)

RULE 4: Red is Sacred
═══════════════════════════════════════════════════════════
#ff003c (status-danger) appears ONLY for:
✓ HP loss
✓ Penalty quests
✓ Failed conditions
✗ Cancel buttons (use muted void-border)
✗ Destructive actions (use warning first)
```

---

## Part III: Typography System

### 3.1 The Font Stack

```
PRIMARY: Inter Variable
════════════════════════════════════════════════════════
Use: All body text, descriptions, UI labels
Weight: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
Style: Clean, geometric, highly legible

DISPLAY: Space Grotesk / Bebas Neue
════════════════════════════════════════════════════════
Use: Headers, quest names, rank titles
Weight: 700 (bold)
Style: Tall, commanding, slightly condensed
Transform: uppercase (always)

MONO: JetBrains Mono / Geist Mono
════════════════════════════════════════════════════════
Use: Numbers, stats, XP values, timers, codes
Weight: 500 (medium)
Style: Technical, precise
Feature: Tabular numbers for alignment
```

### 3.2 Type Scale

```
SCALE (Based on 1.25 ratio)
════════════════════════════════════════════════════════
xs:   12px / 16px  → Fine print, timestamps
sm:   14px / 20px  → Secondary text, labels
base: 16px / 24px  → Body text, descriptions
lg:   20px / 28px  → Subheadings, quest details
xl:   24px / 32px  → Section headers
2xl:  30px / 36px  → Page titles
3xl:  36px / 40px  → Feature numbers (XP gained)
4xl:  48px / 52px  → Level display, hero numbers
5xl:  60px / 64px  → Landing page only
```

### 3.3 Typography Rules

```
RULE 1: Stats Are Mono
═══════════════════════════════════════════════════════
ALL numerical values use monospace font:
✓ XP: 12,450
✓ Level: 15
✓ Streak: 7 days
✓ Timer: 02:45
✗ "You have 3 quests" (use regular font)

RULE 2: System Voice Is Uppercase
═══════════════════════════════════════════════════════
When The System "speaks," text is uppercase:
✓ "QUEST ASSIGNED"
✓ "PENALTY DETECTED"
✓ "LEVEL UP"
✗ User-generated content
✗ Descriptive body text

RULE 3: Tracking for Headers
═══════════════════════════════════════════════════════
Display headers use letter-spacing: 0.1em
This creates the "wide" technical appearance

RULE 4: Number Formatting
═══════════════════════════════════════════════════════
All numbers > 999 use comma separators
XP always shows as: +150 XP (with plus sign for gains)
Time shows as: 15:00 or 2h 30m (never "2.5 hours")
```

---

## Part IV: The Component Library

### 4.1 Core Primitives

#### 4.1.1 The System Frame

The foundational container for all "System Windows." Not a rectangle—a chamfered, glowing panel.

```
VISUAL SPECIFICATION
════════════════════════════════════════════════════════

    ╔══════════════════════════════════════════════════╗
    ║                                                  ║░
    ║    [QUEST RECEIVED]                              ║░
    ║                                                  ║░
    ║    Mission: Daily Strength Protocol              ║░
    ║    Difficulty: E-Rank                            ║░
    ║    Reward: 150 XP                                ║░
    ║                                                  ║░
    ║    ┌────────────────┐  ┌────────────────┐       ║░
    ║    │    DECLINE     │  │    ACCEPT      │       ║░
    ║    └────────────────┘  └────────────────┘       ║░
    ║                                                  ║░
    ╚══════════════════════════════════════════════════╝░
     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

CSS IMPLEMENTATION
════════════════════════════════════════════════════════
.system-frame {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.15),
    0 25px 50px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  clip-path: polygon(
    0 12px,
    12px 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    12px 100%,
    0 calc(100% - 12px)
  );
}
```

#### 4.1.2 The Glow Border

For elements requiring emphasis without full frame treatment.

```typescript
// Tailwind utility classes
const glowBorder = `
  border border-system-cyan/30
  shadow-[0_0_10px_rgba(0,255,255,0.2)]
  hover:border-system-cyan/60
  hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
  transition-all duration-300
`;
```

#### 4.1.3 Glassmorphism Panel

For secondary containers (modals, dropdowns, cards).

```css
.glass-panel {
  background: rgba(18, 18, 26, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### 4.2 Interactive Components

#### 4.2.1 Button Hierarchy

```
PRIMARY BUTTON (Accept Quest, Confirm Action)
════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────┐
│  Background: system-cyan (#00FFFF)                  │
│  Text: void-deep (#050505) - BLACK on cyan          │
│  Border: none                                        │
│  Shadow: 0 0 20px rgba(0, 255, 255, 0.5)            │
│  Hover: brightness(1.1), shadow expands             │
│  Active: scale(0.98), shadow contracts              │
└─────────────────────────────────────────────────────┘

SECONDARY BUTTON (Cancel, Back)
════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────┐
│  Background: transparent                            │
│  Text: system-cyan (#00FFFF)                        │
│  Border: 1px solid system-cyan/40                   │
│  Shadow: none                                        │
│  Hover: background rgba(0, 255, 255, 0.1)           │
│  Active: scale(0.98)                                │
└─────────────────────────────────────────────────────┘

DANGER BUTTON (Abandon Quest, Delete)
════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────┐
│  Background: transparent                            │
│  Text: status-danger (#ff003c)                      │
│  Border: 1px solid status-danger/40                 │
│  Shadow: none                                        │
│  Hover: background rgba(255, 0, 60, 0.1)            │
└─────────────────────────────────────────────────────┘

GHOST BUTTON (Tertiary actions)
════════════════════════════════════════════════════════
┌─────────────────────────────────────────────────────┐
│  Background: transparent                            │
│  Text: white/60                                     │
│  Border: none                                        │
│  Hover: text white/100                              │
└─────────────────────────────────────────────────────┘
```

#### 4.2.2 Progress Bars

```
XP PROGRESS BAR
════════════════════════════════════════════════════════

  Level 15                              Level 16
    ▼                                      ▼
    ┌──────────────────────────────────────┐
    │████████████████████░░░░░░░░░░░░░░░░░│  67%
    └──────────────────────────────────────┘
    
  Background: void-surface (#12121a)
  Fill: linear-gradient(90deg, system-blue, system-cyan)
  Glow: 0 0 10px system-glow on fill
  Border: 1px solid void-border

HP BAR (Health Points)
════════════════════════════════════════════════════════

    HP: 85/100
    ┌──────────────────────────────────────┐
    │█████████████████████████████░░░░░░░░│
    └──────────────────────────────────────┘
    
  Fill color changes based on percentage:
  100-60%: status-health (#22c55e)
  59-30%:  status-warning (#ffd300)
  29-0%:   status-danger (#ff003c) + pulse animation
```

#### 4.2.3 Input Fields

```
TEXT INPUT
════════════════════════════════════════════════════════

  ┌─ Username ────────────────────────────────────────┐
  │ ShadowMonarch                                     │
  └───────────────────────────────────────────────────┘
  
  Background: void-panel (#0a0a0f)
  Border: 1px solid void-border
  Focus Border: system-cyan
  Focus Glow: 0 0 10px system-glow
  Text: white
  Placeholder: white/40
  Label: system-cyan, uppercase, letter-spacing 0.1em

SLIDER (RPE Input)
════════════════════════════════════════════════════════

  Rate of Perceived Exertion
  
  1 ────────────●───────────── 10
      Easy      ▲      Hard
                │
              [ 7 ]
  
  Track: void-surface
  Thumb: system-cyan with glow
  Active region: gradient to thumb position
```

### 4.3 Complex Components

#### 4.3.1 Status Window (Radar Chart)

```
THE PLAYER STATUS HEXAGON
════════════════════════════════════════════════════════

                    STRENGTH
                       ▲
                      /│\
                     / │ \
                    /  │  \
          VITALITY /   │   \ AGILITY
                  /    │    \
                 /     │     \
                ───────┼───────
                 \     │     /
                  \    │    /
                   \   │   /
         STAMINA    \  │  /    INTELLIGENCE
                     \ │ /
                      \│/
                       ▼
                   PERCEPTION

  Implementation: Recharts RadarChart
  Fill: system-cyan with opacity 0.3
  Stroke: system-cyan solid
  Grid: void-border
  Labels: white/60, uppercase
```

```typescript
// Component specification
interface StatusWindowProps {
  stats: {
    strength: number;    // 1-100
    agility: number;
    stamina: number;
    intelligence: number;
    vitality: number;
    perception: number;
  };
  size?: 'sm' | 'md' | 'lg';
}
```

#### 4.3.2 Quest Card

```
QUEST CARD ANATOMY
════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────────────┐   │
│ │  [E-RANK]  DAILY QUEST                            │   │
│ └───────────────────────────────────────────────────┘   │
│                                                         │
│  ▶ SURVIVAL PROTOCOL: MORNING TRAINING                 │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  The System detects lethargy. Execute the              │
│  following protocol to maintain operational status.    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  □  Push-ups ─────────────── 3 × 15 reps        │   │
│  │  □  Squats ───────────────── 3 × 20 reps        │   │
│  │  □  Plank ────────────────── 3 × 30 sec         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ⏱  Est. Duration: 15 min     💎  Reward: +150 XP      │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │     DECLINE     │  │     BEGIN QUEST    ▶        │  │
│  └─────────────────┘  └─────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

  Rank badge: background color matches rank
  Title: uppercase, letter-spacing, bold
  Narrative: regular weight, white/80
  Exercises: monospace numbers, checkbox UI
  Meta: icons + text, muted
  Buttons: secondary (decline) + primary (begin)
```

#### 4.3.3 Rank Badge

```
RANK BADGE VARIANTS
════════════════════════════════════════════════════════

  ┌─────────┐   ┌─────────┐   ┌─────────┐
  │ E-RANK  │   │ C-RANK  │   │ S-RANK  │
  └─────────┘   └─────────┘   └─────────┘
      ↓             ↓             ↓
    Gray         Cyan          Gold
  No glow    Subtle glow   Full glow + 
                           Particle effect

  Size variants: xs (14px), sm (16px), md (20px), lg (24px)
  
  S-Rank special treatment:
  - Animated gradient border
  - Particle sparkle effect
  - Gold glow pulsing
```

#### 4.3.4 Level Up Modal

```
LEVEL UP CELEBRATION
════════════════════════════════════════════════════════

          ╔═══════════════════════════════════════╗
          ║                                       ║
          ║            ◆  LEVEL UP  ◆             ║
          ║                                       ║
          ║              [ 14 → 15 ]              ║
          ║                                       ║
          ║         ───────────────────           ║
          ║                                       ║
          ║          STATS INCREASED              ║
          ║                                       ║
          ║          STR  +2                      ║
          ║          AGI  +1                      ║
          ║          STA  +3                      ║
          ║                                       ║
          ║         ───────────────────           ║
          ║                                       ║
          ║       [ ACKNOWLEDGE ]                 ║
          ║                                       ║
          ╚═══════════════════════════════════════╝

  Entry Animation:
  1. Screen flash white (100ms)
  2. Modal scales from 0.5 to 1.0 with overshoot
  3. Level numbers count up with particle trail
  4. Stats appear sequentially (stagger 100ms)
  
  Background: Subtle radial light burst from center
  Audio: Triumphant "ding" + mechanical whir
```

---

## Part V: Animation System

### 5.1 The Mechanical Motion Language

The System does not move like a friendly app. It **snaps**, **locks**, and **transmits**.

```
SPRING PHYSICS PRESETS
════════════════════════════════════════════════════════

SNAP (Primary interactions)
  stiffness: 400
  damping: 30
  mass: 1
  → Quick arrival, minimal overshoot
  → Use for: Buttons, cards, modals

LOCK (Final positioning)
  stiffness: 600
  damping: 40
  mass: 1
  → Very quick, almost no overshoot
  → Use for: Dropdowns settling, tooltips

FLOAT (Ambient movement)
  stiffness: 100
  damping: 20
  mass: 1
  → Slow, gentle
  → Use for: Background particles, idle animations

ALERT (Attention-grabbing)
  stiffness: 500
  damping: 15
  mass: 0.5
  → Quick with intentional overshoot
  → Use for: Notifications, warnings, level-up
```

### 5.2 Framer Motion Variants

```typescript
// /lib/animations/system-variants.ts

import { Variants } from "framer-motion";

// System window entrance
export const systemWindowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    filter: "blur(5px)",
    transition: { duration: 0.2 },
  },
};

// Staggered list items
export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

// Notification slide-in
export const notificationVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -50, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.15 },
  },
};

// Level up flash
export const levelUpVariants: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.5, 
    filter: "brightness(3)",
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    filter: "brightness(1)",
    transition: { 
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Glow pulse
export const glowPulseVariants: Variants = {
  pulse: {
    boxShadow: [
      "0 0 5px rgba(0, 255, 255, 0.3)",
      "0 0 20px rgba(0, 255, 255, 0.6)",
      "0 0 5px rgba(0, 255, 255, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

### 5.3 Text Animation (The Decode Effect)

```typescript
// Text that "deciphers" character by character
export const TextDecipher = ({ 
  text, 
  speed = 30 
}: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
};
```

### 5.4 Animation Timing Guidelines

```
PAGE TRANSITIONS
════════════════════════════════════════════════════════
Duration: 300ms max
Type: Fade + slight Y translation
Stagger: Content loads sequentially, not all at once

MICRO-INTERACTIONS
════════════════════════════════════════════════════════
Button hover: 150ms
Button press: 100ms
Input focus: 200ms
Tooltip appear: 150ms

CELEBRATIONS (Level Up, Quest Complete)
════════════════════════════════════════════════════════
Flash duration: 100ms
Modal entrance: 400ms with overshoot
Number count-up: 50ms per digit
Total sequence: 2-3 seconds max

DATA UPDATES
════════════════════════════════════════════════════════
XP bar fill: 500ms ease-out
Stat counter: Count up over 300ms
New item appear: 200ms with scale
```

---

## Part VI: Layout System

### 6.1 The Bento Grid

The dashboard uses a **Bento Grid** layout—modular, asymmetric, and information-dense.

```
DESKTOP DASHBOARD LAYOUT (1440px+)
════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Navigation | User Avatar                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────┐  ┌─────────────────────────┐  │
│  │                             │  │                         │  │
│  │     ACTIVE QUEST            │  │    STATUS WINDOW        │  │
│  │     (Primary Focus)         │  │    (Hexagon Stats)      │  │
│  │                             │  │                         │  │
│  │     2/3 width               │  │    1/3 width            │  │
│  │                             │  │                         │  │
│  └─────────────────────────────┘  └─────────────────────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   XP BAR     │  │   STREAK     │  │   QUICK ACTIONS      │  │
│  │   + Level    │  │   Counter    │  │   Generate Quest     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     QUEST HISTORY                        │   │
│  │     (Recent completions, scrollable)                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

MOBILE DASHBOARD LAYOUT (< 768px)
════════════════════════════════════════════════════════

┌─────────────────────────────┐
│  HEADER: Level + XP Bar     │
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │    ACTIVE QUEST       │  │
│  │    (Full width)       │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  STATUS (Compact)     │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  STREAK | ACTIONS     │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  BOTTOM NAV: 🏠 📋 🏆 👤   │
└─────────────────────────────┘
```

### 6.2 Spacing System

```
BASE UNIT: 4px
════════════════════════════════════════════════════════

space-1:  4px   → Tight gaps (icon to text)
space-2:  8px   → Element internal padding (buttons)
space-3:  12px  → Small gaps (list items)
space-4:  16px  → Standard padding (cards)
space-5:  20px  → Medium gaps
space-6:  24px  → Section separators
space-8:  32px  → Large section gaps
space-10: 40px  → Major section breaks
space-12: 48px  → Page section margins
space-16: 64px  → Hero spacing
```

### 6.3 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Ultra-wide
};
```

---

## Part VII: Icon & Asset Strategy

### 7.1 Icon Library

```
PRIMARY: Lucide React
════════════════════════════════════════════════════════
Why: Consistent stroke width, comprehensive set, MIT license

Core icons needed:
├── Navigation: Home, User, Trophy, Settings, LogOut
├── Actions: Play, Pause, Check, X, Plus, Minus
├── Status: AlertTriangle, CheckCircle, XCircle, Clock
├── Fitness: Dumbbell, Heart, Flame, Timer
├── Gamification: Star, Award, Zap, TrendingUp
└── System: Terminal, Activity, Radio, Wifi
```

### 7.2 Custom Icons (SVG)

```
SYSTEM-SPECIFIC ICONS (Must be created)
════════════════════════════════════════════════════════

1. Rank Badges (E through S)
   - Geometric shield shapes
   - Internal letter or symbol
   - Color-coded per rank

2. Class Icons
   - Novice: Simple sword
   - Striker: Lightning bolt
   - Tank: Shield
   - Assassin: Crossed daggers

3. Quest Type Icons
   - Daily: Sun/circle
   - Penalty: Skull
   - Special: Star burst

4. The System Eye (Brand Mark)
   - Stylized eye with digital elements
   - Used for loading states
   - Appears during "System" messages
```

### 7.3 Asset Rules

```
RULE 1: No External Images
════════════════════════════════════════════════════════
All visuals are CSS/SVG generated:
✓ Gradients for backgrounds
✓ SVG for icons
✓ CSS shapes for decorative elements
✗ Stock photos
✗ Anime screenshots (copyright violation)

RULE 2: Icon Sizing
════════════════════════════════════════════════════════
Inline with text: 1em (matches line height)
Standalone small: 16px
Standalone medium: 24px
Standalone large: 32px
Feature icons: 48px

RULE 3: Icon Colors
════════════════════════════════════════════════════════
Default: currentColor (inherits text color)
Active/hover: system-cyan
Disabled: white/30
```

---

## Part VIII: Sound Design

### 8.1 Audio Palette

```
UI SOUNDS (Short, Mechanical)
════════════════════════════════════════════════════════

click.mp3       → Button press (50ms, sharp click)
hover.mp3       → Button hover (30ms, subtle beep)
success.mp3     → Quest complete (200ms, ascending tone)
error.mp3       → Failed action (150ms, low buzz)
notification.mp3 → New quest (300ms, alert chime)
levelup.mp3     → Level up (1s, triumphant fanfare)
typing.mp3      → Text decode (10ms per character, soft tick)
```

### 8.2 Implementation with Howler.js

```typescript
// /lib/audio/system-sounds.ts
import { Howl } from 'howler';

const sounds = {
  click: new Howl({ src: ['/audio/click.mp3'], volume: 0.5 }),
  hover: new Howl({ src: ['/audio/hover.mp3'], volume: 0.3 }),
  success: new Howl({ src: ['/audio/success.mp3'], volume: 0.6 }),
  error: new Howl({ src: ['/audio/error.mp3'], volume: 0.5 }),
  notification: new Howl({ src: ['/audio/notification.mp3'], volume: 0.7 }),
  levelUp: new Howl({ src: ['/audio/levelup.mp3'], volume: 0.8 }),
};

export const playSound = (name: keyof typeof sounds) => {
  sounds[name]?.play();
};
```

### 8.3 Audio Rules

```
RULE 1: Respect User Preference
════════════════════════════════════════════════════════
Check for prefers-reduced-motion
Provide global mute toggle
Remember preference in localStorage

RULE 2: Never Startling
════════════════════════════════════════════════════════
Max volume: 70% of system volume
No sudden loud sounds
Fade in notifications if needed

RULE 3: Consistent Character
════════════════════════════════════════════════════════
All sounds should feel "digital" and "mechanical"
No organic sounds (birds, nature, human voices)
Synthesized/electronic tones only
```

---

## Part IX: Implementation Priority

### 9.1 Component Build Order

```
PHASE 1: Primitives (Day 1-2)
════════════════════════════════════════════════════════
1. System Frame component
2. Glass Panel component  
3. Button variants (Primary, Secondary, Ghost, Danger)
4. Input fields
5. Progress bars (XP, HP)

PHASE 2: Data Display (Day 3)
════════════════════════════════════════════════════════
6. Rank Badge
7. Status Window (Radar Chart)
8. XP Bar with level indicator
9. Streak counter

PHASE 3: Quest Components (Day 4)
════════════════════════════════════════════════════════
10. Quest Card
11. Exercise Item (with checkbox)
12. Quest Timer
13. Completion Form (RPE slider, feedback)

PHASE 4: Modals & Overlays (Day 5)
════════════════════════════════════════════════════════
14. System Modal (base)
15. Quest Received modal
16. Level Up celebration
17. Notification toast

PHASE 5: Layout & Navigation (Day 6)
════════════════════════════════════════════════════════
18. Dashboard layout (Bento Grid)
19. System Navbar
20. Mobile bottom nav
21. Sidebar (desktop)

PHASE 6: Polish (Day 7)
════════════════════════════════════════════════════════
22. Loading skeletons
23. Error states
24. Empty states
25. Final animation tuning
```

### 9.2 Quality Checklist

```
BEFORE SHIPPING EACH COMPONENT
════════════════════════════════════════════════════════

□ Follows System color palette exactly
□ Uses correct typography (mono for numbers)
□ Has hover/focus/active states
□ Animates with spring physics (not ease)
□ Works on mobile (touch targets 44px+)
□ Has loading state
□ Has error state
□ Accessible (proper contrast, focus visible)
□ No external images used
□ Dark mode only (no light mode code)
```

---

## Part X: Design Tokens Export

### 10.1 CSS Custom Properties

```css
/* /app/globals.css */

:root {
  /* Void */
  --void-absolute: #000000;
  --void-deep: #050505;
  --void-panel: #0a0a0f;
  --void-surface: #12121a;
  --void-border: #1a1a24;
  
  /* System */
  --system-cyan: #00FFFF;
  --system-blue: #00b8ff;
  --system-electric: #3498DB;
  --system-glow: rgba(0, 255, 255, 0.25);
  
  /* Ranks */
  --rank-e: #6b7280;
  --rank-d: #9ca3af;
  --rank-c: #55ead4;
  --rank-b: #00b8ff;
  --rank-a: #bd00ff;
  --rank-s: #f3e600;
  
  /* Status */
  --status-success: #00ff9f;
  --status-warning: #ffd300;
  --status-danger: #ff003c;
  --status-mana: #bd00ff;
  --status-health: #22c55e;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  
  /* Animation */
  --spring-snap: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --spring-lock: 300ms cubic-bezier(0.22, 1, 0.36, 1);
  
  /* Shadows */
  --shadow-glow: 0 0 20px var(--system-glow);
  --shadow-panel: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## Summary: The Visual DNA

The System's visual identity is defined by five core principles:

1. **The Void**: True black backgrounds (#050505) create depth and make accents pop
2. **The Glow**: Cyan (#00FFFF) as the signature color, always with luminous glow effects
3. **The Snap**: Spring-based animations with high stiffness, minimal overshoot
4. **The Density**: Information-rich layouts inspired by Linear and Vercel dashboards
5. **The Voice**: Uppercase system messages, monospace numbers, decoded text effects

Every design decision reinforces the narrative: **You are an Operative. The System is watching. Level up or be left behind.**

---

*Document Version: 1.0*  
*Design Authority: The System*  
*Classification: [S-RANK] - Critical Implementation Guide*
