# Landing Page Implementation Prompt - ASCEND Fitness RPG

## Project Overview
**Project:** ASCEND - Fitness RPG  
**Hackathon:** Commit To Change 2026  
**Sponsor:** OPIK AI ⭐  
**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, OGL (LaserFlow), Groq SDK, Opik SDK

## Objective
Create a stunning, animated landing page for ASCEND that showcases the product, its features, market opportunity, and competitive advantages. The landing page must use iOS-inspired glassmorphism design with Laser Flow background for a premium, immersive feel that appeals to fitness enthusiasts and gamers alike.

## Landing Page Sections

### 1. Hero Section (Solo Leveling Quest Card Design)
**Visual Design:** Holographic quest card inspired by Solo Leveling system interface

**Layout Structure:**
```
┌─────────────────────────────────────┐
│  [System Blue Glow Border]        │
│                                   │
│  ┌─────────────────────────────┐   │
│  │  RANK: S                  │   │
│  │  [Glowing Rank Badge]     │   │
│  └─────────────────────────────┘   │
│                                   │
│  QUEST TITLE                       │
│  "Turn Workouts into Epic Quests"   │
│  [Holographic Text Effect]         │
│                                   │
│  ───────────────────────────────    │
│                                   │
│  OBJECTIVES:                       │
│  • Transform fitness into RPG        │
│  • Earn XP and level up            │
│  • Climb hunter rankings            │
│  • Join 10K+ hunters              │
│  [Checkmark animations]            │
│                                   │
│  ───────────────────────────────    │
│                                   │
│  REWARDS:                         │
│  🎯 AI-Powered Quests             │
│  ⚡ Instant Quest Generation       │
│  🎮 E→S Rank Progression          │
│  👥 Hunter Network                │
│  [Reward icons with glow]          │
│                                   │
│  ───────────────────────────────    │
│                                   │
│  TIME REMAINING: 24:00:00        │
│  [Countdown animation]             │
│                                   │
│  [START YOUR JOURNEY]             │
│  [Holographic accept button]       │
│                                   │
│  [TRY DEMO ACCOUNTS]              │
│  [Secondary ghost button]           │
│                                   │
└─────────────────────────────────────┘
```

**Visual Elements:**
- **Background:** Dark blue/black holographic interface (#0a0a15)
- **Border:** Glowing cyan/blue border with pulse animation
- **Rank Badge:** S-rank glowing badge (gold/yellow with glow)
- **Text:** Holographic white text with subtle blue glow
- **Objectives:** Checkmark icons that animate on scroll
- **Rewards:** Icon badges with individual glow effects
- **Timer:** Digital countdown with system font
- **Buttons:** Holographic glassmorphism with glow

**Animations:**
- Border glow pulse animation
- Rank badge shimmer effect
- Text holographic fade-in
- Objectives checkmark animation (staggered)
- Rewards icon bounce on hover
- Timer counting down animation
- Button press holographic effect

**Detailed Implementation:**

```tsx
<QuestCard className="relative max-w-4xl mx-auto">
  {/* Holographic Border */}
  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 glow-pulse" />
  
  {/* Header with Rank */}
  <div className="relative z-10 flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.6)] flex items-center justify-center">
        <span className="text-3xl font-bold text-white drop-shadow-lg">S</span>
      </div>
      <div>
        <div className="text-cyan-400 text-xs font-mono tracking-wider">RANK</div>
        <div className="text-white text-2xl font-bold tracking-tight">Daily Quest</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-cyan-400 text-xs font-mono">TIME REMAINING</div>
      <div className="text-white text-xl font-mono tabular-nums">24:00:00</div>
    </div>
  </div>

  {/* Quest Title */}
  <div className="relative z-10 mb-8">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Turn Workouts
      </span>
      <br />
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        into Epic Quests
      </span>
    </h1>
    <p className="text-lg text-white/70 leading-relaxed">
      AI-powered fitness RPG that transforms your workouts into an epic adventure. 
      Earn XP, level up, and climb hunter rankings.
    </p>
  </div>

  {/* Objectives */}
  <div className="relative z-10 mb-8">
    <div className="text-cyan-400 text-sm font-mono mb-4 tracking-wider">
      OBJECTIVES
    </div>
    <div className="space-y-3">
      {[
        "Transform fitness into immersive RPG experience",
        "Earn XP and level up your hunter",
        "Climb from E-rank to S-rank",
        "Join community of 10K+ hunters"
      ].map((objective, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
        >
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
            <Check className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-white/80">{objective}</span>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Rewards */}
  <div className="relative z-10 mb-8">
    <div className="text-purple-400 text-sm font-mono mb-4 tracking-wider">
      REWARDS
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Zap, name: "AI Quests", color: "cyan" },
        { icon: Award, name: "XP System", color: "yellow" },
        { icon: Trophy, name: "Ranks E→S", color: "purple" },
        { icon: Users, name: "Hunter Net", color: "blue" }
      ].map((reward, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 flex flex-col items-center gap-2"
        >
          <div className={`w-12 h-12 rounded-lg bg-${reward.color}-500/20 flex items-center justify-center`}>
            <reward.icon className={`w-6 h-6 text-${reward.color}-400`} />
          </div>
          <span className="text-xs text-white/60 text-center">{reward.name}</span>
        </motion.div>
      ))}
    </div>
  </div>

  {/* CTAs */}
  <div className="relative z-10 flex flex-col sm:flex-row gap-4">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-8 rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all"
    >
      START YOUR JOURNEY
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 bg-white/10 backdrop-blur-xl text-white font-bold py-4 px-8 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all"
    >
      TRY DEMO ACCOUNTS
    </motion.button>
  </div>
</QuestCard>
```

**Styling for Quest Card:**
```css
.quest-card {
  background: linear-gradient(135deg, rgba(10, 10, 21, 0.95) 0%, rgba(5, 5, 10, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  box-shadow: 
    0 0 0 2px rgba(6, 182, 212, 0.3),
    0 0 40px rgba(6, 182, 212, 0.2),
    inset 0 0 40px rgba(6, 182, 212, 0.05);
}

@keyframes glow-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 0 2px rgba(6, 182, 212, 0.3),
      0 0 40px rgba(6, 182, 212, 0.2),
      inset 0 0 40px rgba(6, 182, 212, 0.05);
  }
  50% { 
    box-shadow: 
      0 0 0 2px rgba(6, 182, 212, 0.6),
      0 0 60px rgba(6, 182, 212, 0.4),
      inset 0 0 40px rgba(6, 182, 212, 0.1);
  }
}

.glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}
```

**Background:** Laser Flow animation (custom color: #00b8ff system cyan)

### 2. Problem Statement
**Headline:** "The Challenge: Staying Motivated in Fitness"  
**Content (presented as feature cards):**
- **Motivation Crisis** - 72% quit fitness goals within 3 months
- **Monotonous Workouts** - Boring routines lead to burnout
- **Lack of Progress** - Hard to see improvement without clear metrics
- **Social Pressure** - No community to hold you accountable
- **Gamification Gap** - $3.2B fitness gamification market underserved

### 3. Solution Overview
**Headline:** "Enter the System: Become a Hunter"  
**Content (Feature cards with icons):**
- 🎯 **AI-Powered Quests** - Personalized workouts by Groq Llama 3.3 70B
- ⚡ **Instant Generation** - Get quest in under 2 seconds
- 🎮 **RPG Progression** - Earn XP, level up, unlock E→S ranks
- 👥 **Hunter Network** - Social feed with community verification
- 🛡️ **Anti-Cheat System** - Three-layer verification with Opik traces
- 🌍 **Multi-Class System** - Tank, Striker, Assassin specializations

### 4. How It Works
**Headline:** "The Hunter Workflow"  
**Flow visualization (animated):**
**Step 1:** Enter the System → Create your hunter profile  
**Step 2:** Receive Quest → AI generates personalized workout  
**Step 3:** Complete Quest → Execute exercises with timer  
**Step 4:** Submit Proof → Upload with verification  
**Step 5:** Earn Rewards → XP calculation with multipliers  
**Step 6:** Level Up → Unlock new ranks and abilities

### 5. Videos Section
**Headline:** "Watch ASCEND in Action"  
**Content:**
- ASCEND Introduction (2 min) - Quick overview
- Why ASCEND Matters (3 min) - Vision and mission vlog
- Full App Demo (5 min) - Complete feature walkthrough  
**Layout:** Responsive grid (side-by-side on desktop, stacked on mobile)

### 6. App Screenshots Carousel
**Headline:** "Explore the Interface"  
**Content:** Carousel of app screenshots showing:
- Dashboard - Fitness command center
- AI Quest Generation - Personalized workout creation
- Quest Completion - Exercise tracking
- Hunter Network - Social feed
- Leaderboard - Rankings and competition  
- Mobile Experience - On-the-go fitness

**Carousel Requirements:**
- Auto-play with pause on hover
- Navigation dots
- Previous/Next arrows  
- Smooth transitions (slide with momentum)
- Responsive (1-2 cards on mobile, 3 on tablet, 4 on desktop)

### 7. Market Analysis
**Headline:** "A $3.2B Market Opportunity"  
**Content (Feature cards with statistics):**
- 120M+ anime/weeb enthusiasts globally
- 750M+ gamers worldwide
- $3.2B fitness gamification market (28% CAGR)
- 72% quit fitness goals in 3 months
- 73% YoY AI adoption in fitness
- Growing self-improvement trend

### 8. Why We're Better
**Headline:** "What Sets ASCEND Apart"  
**Content (Feature cards):**
- **Solo Leveling-Inspired** - Immersive RPG narrative
- **True Gamification** - Complete progression system (XP, levels, ranks)
- **AI-Powered Personalization** - Groq generates tailored workouts
- **OPIK Observability ⭐** - Real-time AI tracing, quality monitoring
- **Anti-Cheat Verification** - Three-layer system unique in fitness
- **Multi-Class System** - Tank, Striker, Assassin specializations

### 9. Competitive Comparison
**Headline:** "Compare with Fitness Apps"  
**Content:** Simple comparison table or cards:
- ASCEND vs Arise: Level Up In Real Life vs Nike Training Club vs Zombies, Run!
- Focus on: Gamification depth, AI personalization, Social verification, Anti-cheat, Progression system

### 10. Technology Stack
**Headline:** "Built on Cutting-Edge Technology"  
**Content (Tech stack logos/names with brief descriptions):**
- Next.js 14 - Modern React framework
- Groq Llama 3.3 70B - Sub-second AI inference
- OPIK AI ⭐ - Real-time observability
- Supabase - Backend & database
- TypeScript - Type-safe development
- Framer Motion - Smooth animations
- OGL - Laser Flow background

### 11. CTA Section
**Headline:** "Ready to Begin Your Hunter Journey?"  
**Subheadline:** "Join thousands of hunters transforming their fitness into an epic adventure."  
**CTA:** Large "START YOUR JOURNEY" button (primary variant)  
**Secondary CTA:** "TRY DEMO" (ghost variant with arrow icon)

### 12. Social Media Links
**Content:** Social media icons (real links):
- GitHub: https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP
- Twitter/X: https://x.com/NthnaelSan
- Instagram: https://www.instagram.com/nthnael.san/
- LinkedIn: https://www.linkedin.com/in/nathanaelsantoso/
- GitBook: https://nathasan1410.gitbook.io/ascend-fitness-rpg

**Style:** Minimalist icons in footer or bottom section

## Design Requirements

### Color Scheme (iOS-Inspired Dark Theme)
```css
/* Brand Colors */
--system-cyan: #00b8ff;          /* Electric Cyan */
--system-blue: #0066ff;          /* Royal Blue */
--system-purple: #bd00ff;        /* Neon Purple */

/* Dark Theme */
--void-deep: #050505;            /* Almost Black */
--system-dark: #0a0a0f;         /* Panel BG */
--system-panel: #12121a;         /* Sub-panel BG */
--ios-bg-secondary: rgba(28, 28, 30, 0.8);
--ios-bg-tertiary: rgba(44, 44, 46, 0.7);

/* Text Colors */
--ios-text-primary: #FFFFFF;      /* White */
--ios-text-secondary: rgba(235, 235, 245, 0.6);

/* Borders */
--ios-border: rgba(255, 255, 255, 0.12);
--ios-divider: rgba(255, 255, 255, 0.08);

/* Rank Colors */
--rank-e: #8a8a8a;              /* Gray */
--rank-d: #ffffff;               /* White */
--rank-c: #55ead4;               /* Cyan */
--rank-b: #00b8ff;               /* Blue */
--rank-a: #bd00ff;               /* Purple */
--rank-s: #f3e600;               /* Gold */
```

### Typography
**Font Family:** Inter, -apple-system, BlinkMacSystemFont, SF Pro, sans-serif
**Headings:** Bold, gradient-text effect (system-cyan to system-purple)
**Body:** Regular weight, line-height 1.5-1.75
**CTA:** Bold, uppercase for primary buttons

### Glassmorphism Design System
```css
.ios-glass {
  background: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}
```

### Mobile-Responsive Layout
**Grid layout:** Responsive breakpoints
- Mobile: 1 column (px-4)
- Tablet: 2 columns (px-6)
- Desktop: 3-4 columns (px-8) with span variations

### Laser Flow Background
- Use LaserFlow component from components/LaserFlow
- Custom color: System cyan (#00b8ff)
- Position: Fixed, z-index: 0
- Opacity: 0.6-0.8 for subtle effect
- Interactive: Mouse tracking enabled

## Animation Requirements

### MUST BE ANIMATED throughout:

#### Scroll Animations:
- Fade in on scroll (Framer Motion)
- Stagger animations for lists/cards
- Parallax effects for background

#### Hover Effects:
- Cards scale up slightly
- Border glow intensifies
- Text colors shift
- Smooth transitions (0.2s cubic-bezier)

#### iOS-Style Animations:
- Spring animations with iOS values
- Button press feedback (scale down)
- Entrance animations with stagger
- Smooth page transitions

#### Micro-Interactions:
- Button hover states
- Link underline animations
- Icon bounce/pulse
- Counter animations for numbers
- Haptic feedback on touch (Web Vibration API)

### Button Variants
```typescript
variant: "primary" | "secondary" | "ghost"

// Primary (START YOUR JOURNEY)
background: linear-gradient(135deg, #00b8ff 0%, #0066ff 100%);
color: #ffffff;
box-shadow: 0 4px 6px -1px rgba(0, 184, 255, 0.3);

// Secondary (neutral)
background: #ffffff;
color: #0a0a0f;
border: 1px solid #e5e5e5;

// Ghost
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px);
color: #ffffff;
border: 1px solid rgba(255, 255, 255, 0.12);
```

## Implementation Guide

### File Structure
```
app/
  page.tsx                          # Landing page (replace existing)
  layout.tsx                        # Root layout (keep existing)
  globals.css                       # Global styles (keep existing)

components/
  landing/
    LaserFlow.tsx                   # Laser Flow background component
    HeroSection.tsx                 # Hero with CTAs
    ProblemSection.tsx              # Problem statement (cards)
    SolutionSection.tsx           # Solution (cards)
    WorkflowSection.tsx           # How it works (animated)
    VideosSection.tsx             # Demo videos
    ScreenshotsCarousel.tsx       # App screenshots carousel
    MarketSection.tsx             # Market analysis (cards)
    CompetitiveSection.tsx        # Why we're better (cards)
    ComparisonSection.tsx         # Competitor comparison
    TechStackSection.tsx          # Technology stack
    CTASection.tsx                # Final CTA
    SocialLinks.tsx               # Social media icons

  ui/
    Button.tsx                     # (keep existing)
    Card.tsx                       # (keep existing)
```

### Key Components

#### 1. Laser Flow Component
Use the exact LaserFlow component from components/LaserFlow. Configure:
- Color: #00b8ff (system cyan)
- Wisp density: 1.0 (mobile) / 2.0 (desktop)
- Fog intensity: 0.7 (mobile) / 1.5 (desktop)
- Interactive: true
- DPR: 1 on mobile, devicePixelRatio on desktop

#### 2. ScreenshotsCarousel Component
Features:
- Auto-play with interval (5000ms)
- Pause on hover
- Navigation dots (clickable)
- Previous/Next buttons
- Smooth slide transition (Framer Motion with momentum)
- Responsive: 1/2/3/4 cards per view
- Lazy loading for images
- Use react-snap-carousel

#### 3. Animated Flow (How It Works)
Use Framer Motion for:
- Step-by-step visualization
- Animated arrows connecting steps
- Icons that pulse/animate
- Number counter (1 → 6)
- Progress bar animation

## Code Style Guidelines

Follow existing code style from project:

### TypeScript
- Strict mode enabled
- Explicit types for props
- Interfaces over types for objects
- No any types (use unknown if necessary)
- Proper error handling

### React
- Functional components with hooks
- Props interfaces defined explicitly
- Use useCallback, useMemo for performance
- Proper key props in lists
- Client components marked with "use client"

### Styling
- Tailwind CSS utility classes
- No inline styles (use Tailwind)
- Accept className prop for customization
- Use motion components from Framer Motion
- Follow naming convention: variant, size, className

### Imports
```typescript
// External libraries
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapCarousel } from 'react-snap-carousel';

// Internal modules
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import LaserFlow from '@/components/LaserFlow';
import type { LandingSectionProps } from '@/types/landing';
```

## Performance Considerations

### Lazy Loading:
- Lazy load sections below the fold
- Lazy load carousel images
- Dynamic import for heavy components

### Animations:
- Use transform and opacity for GPU acceleration
- Disable complex animations on mobile if needed
- Use will-change sparingly
- Reduce LaserFlow complexity on mobile
- Reduce quest card glow intensity on mobile (performance optimization)
- Simplify holographic effects on low-end devices

### Bundle Size:
- Tree-shake unused GSAP plugins (if used)
- Use dynamic imports for Framer Motion heavy components
- Optimize images (WebP format, appropriate sizes)

## Responsive Design

### Breakpoints
```css
/* Mobile: < 640px */
- Single column layout
- Quest card: Full width with proper padding
- Simplified animations (reduce glow intensity on mobile)
- Smaller fonts (text-3xl hero title)
- Touch-friendly buttons (44x44px min)
- Safe area padding for iOS
- Quest card rank badge: Scaled down for mobile

/* Tablet: 640px - 1024px */
- 2 column grid
- Quest card: Centered with medium width
- Side-by-side videos (if space allows)
- 2-3 cards in carousel
- Medium fonts
- Quest card: Normal size

/* Desktop: > 1024px */
- 3-4 column grid
- Quest card: Max width (max-w-4xl) with glow
- Full layout
- 4 cards in carousel
- Enhanced animations
- Large fonts
- Quest card: Full holographic effects
```

### iOS-Specific Considerations
- Add safe area inset handling
- Use -webkit-backdrop-filter for blur
- Add haptic feedback on touch
- Handle notch/Dynamic Island
- Use iOS spring animation values

```typescript
// iOS spring animation
const iosSpring = {
  type: "spring",
  stiffness: 350,
  damping: 0.8,
  mass: 0.8,
};

// iOS cubic bezier
const iosEase = [0.4, 0, 0.2, 1];

// Haptic feedback
const triggerHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5);
  }
};
```

## Content Guidelines

### Tone
- Energetic and motivating
- Gaming/RPG terminology (hunters, quests, ranks)
- Confident and authoritative
- Data-driven (include specific numbers)
- Action-oriented (strong CTAs)

### Copywriting
- Keep headlines short and punchy
- Use bullet points for easy scanning
- Highlight key metrics and benefits
- Include "OPIK AI" mention prominently (⭐)
- Use gaming language to engage target audience

### OPIK Integration Highlights
- Mention OPIK in multiple sections
- Add OPIK logo where appropriate
- Emphasize observability and quality monitoring
- Highlight "Powered by OPIK AI" as sponsor credit

## Testing Checklist

### Functional Requirements
- All sections render correctly
- START YOUR JOURNEY button navigates to auth
- TRY DEMO button works
- Carousel auto-plays and can be controlled
- Videos load (placeholders work)
- Social links are clickable
- Animations trigger on scroll/hover
- Laser Flow background is visible and interactive

### Visual Requirements
- iOS glassmorphism displays correctly
- Laser Flow background is visible and interactive
- System cyan/purple colors used consistently
- Typography is readable at all sizes
- Hover effects work as expected
- Animations are smooth (no jank)
- Safe areas respected on iOS

### Performance
- Lighthouse score > 90
- Initial load < 3s
- Animations run at 60fps
- No console errors

### Responsive
- Mobile layout works (320px+)
- Tablet layout works (640px-1024px)
- Desktop layout works (> 1024px)
- Carousel adapts to screen size
- Touch targets minimum 44x44px

## Deliverables

### Required Components
- LaserFlow.tsx - Laser Flow background (already exists)
- HeroSection.tsx - Hero with CTAs
- ProblemSection.tsx - Problem statement (cards)
- SolutionSection.tsx - Solution (cards)
- WorkflowSection.tsx - How it works (animated)
- VideosSection.tsx - Demo videos
- ScreenshotsCarousel.tsx - App screenshots
- MarketSection.tsx - Market analysis (cards)
- CompetitiveSection.tsx - Why better (cards)
- ComparisonSection.tsx - Competitor table
- TechStackSection.tsx - Technology stack
- CTASection.tsx - Final CTA
- SocialLinks.tsx - Social media icons
- page.tsx - Landing page composition

### Additional Assets
Placeholder images for:
- App screenshots (use generic UI mockups with game-inspired design)
- Technology logos (SVG or CDN)

## Important Notes

### OPIK AI Sponsorship
⭐ Acknowledge OPIK AI as primary sponsor
- Include OPIK logo in relevant sections
- Mention observability benefits
- Add "Powered by OPIK AI" tagline

### Animation Performance
- Test animations on low-end devices
- Consider prefers-reduced-motion media query
- Disable animations on battery saver mode
- Use CSS-only animations where possible

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Alt text for all images
- Focus indicators for buttons/links
- Minimum touch target: 44x44px

### SEO Considerations
- Meta tags for title and description
- Open Graph tags for social sharing
- Structured data (Schema.org)
- Semantic HTML structure

## Reference Links

### React Components
- Framer Motion: https://www.framer.com/motion/
- react-snap-carousel: https://www.npmjs.com/package/react-snap-carousel

### Documentation
- Next.js 14: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### Design References
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Glassmorphism design patterns
- Gaming UI inspiration

## Success Metrics

### Visual Impact
- Stunning, memorable design that stands out
- Immersive laser flow background
- Premium iOS-inspired glassmorphism

### Animation Quality
- Smooth, purposeful animations (no motion sickness)
- iOS spring animation values
- Touch feedback on mobile

### Performance
- Fast loading, 60fps animations
- LaserFlow optimized for mobile
- Lazy loading for images

### Conversion
- Clear CTAs that drive signups
- Demo accounts accessible

### Brand Consistency
- Follows iOS-inspired dark theme perfectly
- System cyan/purple accent colors
- Glassmorphism design system

### Mobile Experience
- Fully functional on all devices
- Touch targets minimum 44x44px
- Safe area handling for iOS

## Next Steps

1. Set up component structure in components/landing/
2. Verify dependencies: framer-motion, react-snap-carousel, ogl (already installed)
3. Create base layout with LaserFlow background
4. Implement sections one by one (Hero → Problem → Solution → ...)
5. Add scroll animations with Framer Motion
6. Implement carousel component with react-snap-carousel
7. Integrate all sections into page.tsx
8. Test responsiveness and performance
9. Add haptic feedback for mobile
10. Implement safe area handling for iOS
11. Polish animations and interactions
12. Deploy and verify functionality

## Questions?

If clarification is needed on:
- Specific section content
- Animation behavior
- Color or styling choices
- Component architecture
- Performance optimization
- Mobile-specific features

Please ask before proceeding!

**Build something legendary! ⚔️**

🏆 **Powered by OPIK AI - Observability for AI Excellence** ⭐
