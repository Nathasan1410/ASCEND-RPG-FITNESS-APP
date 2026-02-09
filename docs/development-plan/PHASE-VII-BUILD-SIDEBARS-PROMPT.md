# PHASE VII PROMPT: Build Sidebar Components

> **Phase:** VII | **Priority:** P0 - Critical | **Estimated Time:** 2-3 hours  
> **Reference Images:** You will attach reference images for visual inspiration  
> **Important:** Use **MOCK DATA** only. Do not connect to real database/API.

---

## OVERVIEW

Create comprehensive sidebar components for the web/desktop feed layout. The sidebar system includes:

1. **Left Sidebar** - User profile info, stats summary, and quick actions
2. **Right Sidebar** - Trending tags, suggestions, and recommendations
3. **Responsive Behavior** - Sidebars hide on mobile, show on tablet/desktop
4. **Collapsible Sections** - For space optimization

**Note:** You will receive reference images to match the visual style exactly. Focus on matching the layout, spacing, and design patterns from the provided screenshots.

---

## OBJECTIVES

1. **Left Sidebar** - User profile card with stats and navigation
2. **Right Sidebar** - Trending tags and suggestions
3. **Responsive Design** - Sidebars hide on mobile (<768px), show on tablet/desktop
4. **Collapsible Sections** - Ability to collapse/expand sidebar sections
5. **Mock Data Integration** - Use mock user data, stats, and trending tags

---

## 1. LEFT SIDEBAR COMPONENT

### File to Create:
- `components/layout/FeedSidebar.tsx` (or separate: `components/layout/LeftSidebar.tsx`)

### Structure:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Settings, 
  Trophy, 
  Target, 
  Star,
  ChevronDown,
  ChevronUp,
  Flame,
  Zap,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
```

### Left Sidebar Sections:

#### A. User Profile Card

**Visual Requirements:**
- Large avatar (80-100px) centered or left-aligned
- Username with rank badge
- Level and XP progress bar
- Hunter status badge (Verified/Normal)
- Glassmorphism card style

```tsx
<UserProfileCard>
  <Avatar className="w-20 h-20 border-2 border-system-cyan/30" />
  <UserInfo>
    <Username>HunterShadow_X</Username>
    <RankBadge rank="S" />
    <HunterStatus status="Verified" />
  </UserInfo>
  <Stats>
    <StatItem icon={Crown} label="Rank" value="S-Rank" />
    <StatItem icon={Star} label="Level" value="87" />
    <StatItem icon={Zap} label="XP" value="124,500" />
  </Stats>
  <XPProgress>
    <ProgressBar value={75} />
    <XPText>75% to Level 88</XPText>
  </XPProgress>
</UserProfileCard>
```

#### B. Quick Actions

**Visual Requirements:**
- List of action buttons with icons
- Hover effects with cyan glow
- Link-based navigation

```tsx
<QuickActions>
  <NavLink href="/profile/me">
    <User className="w-4 h-4" />
    <span>My Profile</span>
  </NavLink>
  <NavLink href="/settings">
    <Settings className="w-4 h-4" />
    <span>Settings</span>
  </NavLink>
  <NavLink href="/dashboard/leaderboard">
    <Trophy className="w-4 h-4" />
    <span>Leaderboard</span>
  </NavLink>
  <NavLink href="/dashboard/quests">
    <Target className="w-4 h-4" />
    <span>Active Quests</span>
  </NavLink>
</QuickActions>
```

#### C. Personal Stats Summary

**Visual Requirements:**
- Mini stats cards
- Weekly/monthly progress
- Visual indicators (up/down arrows)

```tsx
<StatsSummary>
  <StatCard>
    <Icon><Flame className="w-5 h-5 text-system-cyan" /></Icon>
    <Value>12,450</Value>
    <Label>Weekly XP</Label>
    <Trend>+15% <UpArrow /></Trend>
  </StatCard>
  <StatCard>
    <Icon><Target className="w-5 h-5 text-success" /></Icon>
    <Value>28</Value>
    <Label>Quests Completed</Label>
    <Trend>+3 <UpArrow /></Trend>
  </StatCard>
  <StatCard>
    <Icon><Zap className="w-5 h-5 text-secondary" /></Icon>
    <Value>45</Value>
    <Label>Day Streak</Label>
    <Trend>+2 <UpArrow /></Trend>
  </StatCard>
</StatsSummary>
```

---

## 2. RIGHT SIDEBAR COMPONENT

### File to Create:
- `components/layout/RightSidebar.tsx`

### Structure:

```tsx
"use client";

import { useState } from "react";
import { Hash, TrendingUp, Users, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
```

### Right Sidebar Sections:

#### A. Trending Tags

**Visual Requirements:**
- List of trending hashtags
- Post count for each tag
- Click to filter feed
- "View All" button

```tsx
<TrendingSection>
  <SectionHeader>
    <TrendingUp className="w-5 h-5 text-system-cyan" />
    <Title>Trending Tags</Title>
    <ViewAllButton>View All</ViewAllButton>
  </SectionHeader>
  
  <TrendingTagsList>
    {trendingTags.map(tag => (
      <TrendingTag key={tag.id}>
        <TagName onClick={() => filterByTag(tag.name)}>
          <Hash className="w-4 h-4" />
          {tag.name}
        </TagName>
        <PostCount>{tag.count} posts</PostCount>
      </TrendingTag>
    ))}
  </TrendingTagsList>
</TrendingSection>
```

#### B. Hunters to Follow (Suggestions)

**Visual Requirements:**
- List of suggested hunters
- Avatar, name, rank, follow button
- "Refresh" button

```tsx
<SuggestionsSection>
  <SectionHeader>
    <Users className="w-5 h-5 text-system-cyan" />
    <Title>Hunters to Follow</Title>
    <RefreshButton>Refresh</RefreshButton>
  </SectionHeader>
  
  <SuggestionsList>
    {suggestedHunters.map(hunter => (
      <HunterCard key={hunter.id}>
        <HunterInfo>
          <Avatar src={hunter.avatar} />
          <Name>{hunter.username}</Name>
          <RankBadge rank={hunter.rank} />
        </HunterInfo>
        <FollowButton onClick={() => followHunter(hunter.id)}>
          {hunter.following ? 'Following' : 'Follow'}
        </FollowButton>
      </HunterCard>
    ))}
  </SuggestionsList>
</SuggestionsSection>
```

#### C. Active Challenges (Optional)

**Visual Requirements:**
- List of active community challenges
- Progress indicators
- Join button

```tsx
<ChallengesSection>
  <SectionHeader>
    <Target className="w-5 h-5 text-secondary" />
    <Title>Active Challenges</Title>
  </SectionHeader>
  
  <ChallengesList>
    {activeChallenges.map(challenge => (
      <ChallengeCard key={challenge.id}>
        <ChallengeInfo>
          <Title>{challenge.name}</Title>
          <Participants>{challenge.participants} hunters</Participants>
          <TimeLeft>{challenge.timeLeft} remaining</TimeLeft>
        </ChallengeInfo>
        <JoinButton>Join</JoinButton>
      </ChallengeCard>
    ))}
  </ChallengesList>
</ChallengesSection>
```

---

## 3. RESPONSIVE BEHAVIOR

### Breakpoints:

```tsx
// Mobile (< 768px): Hide both sidebars
<div className="hidden md:flex lg:w-80 lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:bottom-0">
  {/* Left Sidebar Content */}
</div>

// Tablet (768px - 1024px): Show left sidebar only, right sidebar hidden
<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:left-0 md:top-16 md:bottom-0">
  {/* Left Sidebar Content */}
</div>

// Desktop (> 1024px): Show both sidebars
<div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:bottom-0">
  {/* Left Sidebar Content */}
</div>

<div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:right-0 lg:top-16 lg:bottom-0">
  {/* Right Sidebar Content */}
</div>
```

### Main Feed Container:

```tsx
<div className="min-h-screen bg-background flex">
  {/* Left Sidebar */}
  <LeftSidebar />
  
  {/* Main Feed - Responsive margin */}
  <main className={cn(
    "flex-1 transition-all duration-300",
    "md:ml-64",
    "lg:ml-80 lg:mr-80"
  )}>
    <FeedContent />
  </main>
  
  {/* Right Sidebar */}
  <RightSidebar />
</div>
```

---

## 4. COLLAPSIBLE SECTIONS

### Implementation:

```tsx
function CollapsibleSection({ 
  title, 
  icon: Icon, 
  children, 
  defaultExpanded = true 
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <CollapsibleContainer>
      <CollapsibleHeader onClick={() => setIsExpanded(!isExpanded)}>
        <Icon className="w-5 h-5 text-system-cyan" />
        <Title>{title}</Title>
        <ChevronButton>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </ChevronButton>
      </CollapsibleHeader>
      
      <AnimatePresence>
        {isExpanded && (
          <CollapsibleContent
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {children}
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </CollapsibleContainer>
  );
}
```

---

## 5. MOCK DATA TO USE

### Left Sidebar - User Profile Mock Data:

```tsx
const mockUserProfile = {
  username: "HunterShadow_X",
  displayName: "Alex Hunter",
  avatar: "/avatars/hunter-shadow.jpg",
  rank: "S",
  level: 87,
  xp: 124500,
  xpToNextLevel: 165000,
  hunterStatus: "Verified",
  class: "Assassin",
  joinDate: "2025-01-15",
  stats: {
    weeklyXP: 12450,
    questsCompleted: 28,
    dayStreak: 45,
    totalQuests: 342,
    rankUps: 7,
    achievements: 23
  }
};

const mockQuickActions = [
  { href: "/profile/me", icon: User, label: "My Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/dashboard/quests", icon: Target, label: "Active Quests" },
  { href: "/achievements", icon: Star, label: "Achievements" },
];
```

### Right Sidebar - Trending Tags Mock Data:

```tsx
const mockTrendingTags = [
  { id: 1, name: "#RankUp", count: 1243 },
  { id: 2, name: "#LegDay", count: 892 },
  { id: 3, name: "#TankBuild", count: 756 },
  { id: 4, name: "#QuestComplete", count: 634 },
  { id: 5, name: "#MorningGrind", count: 521 },
  { id: 6, name: "#CardioKing", count: 445 },
  { id: 7, name: "#PRDay", count: 389 },
  { id: 8, name: "#S-Rank", count: 312 },
];
```

### Right Sidebar - Suggestions Mock Data:

```tsx
const mockSuggestedHunters = [
  {
    id: 1,
    username: "SwiftBlade",
    displayName: "Mike Chen",
    avatar: "/avatars/swift-blade.jpg",
    rank: "S",
    class: "Striker",
    hunterStatus: "Verified",
    following: false,
    xp: 156000
  },
  {
    id: 2,
    username: "IronFist",
    displayName: "Sarah Johnson",
    avatar: "/avatars/iron-fist.jpg",
    rank: "A",
    class: "Tank",
    hunterStatus: "Verified",
    following: false,
    xp: 89000
  },
  {
    id: 3,
    username: "NightHunter",
    displayName: "James Wilson",
    avatar: "/avatars/night-hunter.jpg",
    rank: "S",
    class: "Assassin",
    hunterStatus: "Normal",
    following: false,
    xp: 134000
  },
  {
    id: 4,
    username: "TankMaster",
    displayName: "Emily Davis",
    avatar: "/avatars/tank-master.jpg",
    rank: "A",
    class: "Tank",
    hunterStatus: "Verified",
    following: false,
    xp: 76000
  },
];
```

### Right Sidebar - Active Challenges Mock Data:

```tsx
const mockActiveChallenges = [
  {
    id: 1,
    name: "100k XP Weekend",
    description: "Reach 100,000 XP in one weekend",
    participants: 1243,
    timeLeft: "2 days 14 hours",
    prize: "Achievement + XP Bonus",
    joined: false
  },
  {
    id: 2,
    name: "30-Day Streak Challenge",
    description: "Complete at least one quest daily for 30 days",
    participants: 856,
    timeLeft: "15 days",
    prize: "S-Rank Badge + Title",
    joined: true
  },
  {
    id: 3,
    name: "Rank Up Rally",
    description: "Complete your next rank-up exam this week",
    participants: 634,
    timeLeft: "5 days",
    prize: "Double XP on Rank Up",
    joined: false
  },
];
```

---

## 6. IMPLEMENTATION PATTERN

### Complete Left Sidebar Component:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, Settings, Trophy, Target, Star, 
  Flame, Zap, Crown, ChevronDown, ChevronUp, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { mockUserProfile, mockQuickActions } from "@/lib/mock/sidebar-data";

export function LeftSidebar() {
  return (
    <aside className={cn(
      "hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:bottom-0",
      "bg-void-panel/50 backdrop-blur-xl border-r border-white/10",
      "overflow-y-auto overflow-x-hidden"
    )}>
      <div className="p-6 space-y-6">
        {/* User Profile Card */}
        <UserProfileCard profile={mockUserProfile} />
        
        {/* Quick Actions */}
        <QuickActions actions={mockQuickActions} />
        
        {/* Personal Stats Summary */}
        <StatsSummary profile={mockUserProfile} />
      </div>
    </aside>
  );
}

function UserProfileCard({ profile }) {
  return (
    <div className="bg-void-deep/50 rounded-2xl p-6 border border-white/10">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-20 h-20 mb-4 border-2 border-system-cyan/50 rounded-full" />
        <h3 className="text-xl font-bold text-white mb-1">{profile.displayName}</h3>
        <p className="text-sm text-white/60 mb-3">@{profile.username}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <RankBadge rank={profile.rank} />
          <HunterStatus status={profile.hunterStatus} />
        </div>
        
        <div className="grid grid-cols-3 gap-4 w-full mb-4">
          <StatItem icon={Crown} label="Rank" value={`${profile.rank}-Rank`} />
          <StatItem icon={Star} label="Level" value={profile.level.toString()} />
          <StatItem icon={Zap} label="XP" value={formatXP(profile.xp)} />
        </div>
        
        <div className="w-full">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-white/60">Level {profile.level}</span>
            <span className="text-system-cyan">Level {profile.level + 1}</span>
          </div>
          <ProgressBar value={(profile.xp / profile.xpToNextLevel) * 100} />
        </div>
      </div>
    </div>
  );
}

function QuickActions({ actions }) {
  return (
    <div className="bg-void-deep/50 rounded-2xl p-4 border border-white/10">
      <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
        Quick Actions
      </h4>
      <nav className="space-y-1">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <action.icon className="w-4 h-4" />
            <span className="text-sm">{action.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

// Helper components...
function StatItem({ icon: Icon, label, value }) {
  return (
    <div className="text-center">
      <Icon className="w-5 h-5 mx-auto mb-1 text-system-cyan" />
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-xs text-white/50">{label}</p>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 bg-void-deep rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-system-cyan to-system-cyan/50 rounded-full"
      />
    </div>
  );
}
```

### Complete Right Sidebar Component:

```tsx
"use client";

import { useState } from "react";
import { Hash, TrendingUp, Users, RefreshCw, ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { mockTrendingTags, mockSuggestedHunters, mockActiveChallenges } from "@/lib/mock/sidebar-data";

export function RightSidebar() {
  return (
    <aside className={cn(
      "hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:right-0 lg:top-16 lg:bottom-0",
      "bg-void-panel/50 backdrop-blur-xl border-l border-white/10",
      "overflow-y-auto overflow-x-hidden"
    )}>
      <div className="p-6 space-y-6">
        {/* Trending Tags */}
        <TrendingSection tags={mockTrendingTags} />
        
        {/* Hunters to Follow */}
        <SuggestionsSection hunters={mockSuggestedHunters} />
        
        {/* Active Challenges */}
        <ChallengesSection challenges={mockActiveChallenges} />
      </div>
    </aside>
  );
}

function TrendingSection({ tags }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-void-deep/50 rounded-2xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-system-cyan" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wide">
            Trending Tags
          </h4>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/60 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {tags.slice(0, 6).map((tag, index) => (
                <TrendingTag key={tag.id} tag={tag} rank={index + 1} />
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-system-cyan hover:text-white transition-colors">
              View All Tags
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrendingTag({ tag, rank }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-system-cyan/10 hover:border-system-cyan/30 border border-transparent transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-xs font-bold w-5 h-5 flex items-center justify-center rounded",
          rank <= 3 ? "bg-system-cyan text-void-deep" : "bg-white/10 text-white/60"
        )}>
          {rank}
        </span>
        <span className="flex items-center gap-1 text-sm text-white/70 group-hover:text-white transition-colors">
          <Hash className="w-3 h-3" />
          {tag.name}
        </span>
      </div>
      <span className="text-xs text-white/50">{tag.count} posts</span>
    </motion.button>
  );
}

function SuggestionsSection({ hunters }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [following, setFollowing] = useState<Set<number>>(new Set());

  const handleFollow = (hunterId: number) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hunterId)) {
        newSet.delete(hunterId);
      } else {
        newSet.add(hunterId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-void-deep/50 rounded-2xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-system-cyan" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wide">
            Hunters to Follow
          </h4>
        </div>
        <button className="text-white/60 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {hunters.map(hunter => (
                <HunterCard 
                  key={hunter.id} 
                  hunter={hunter} 
                  isFollowing={following.has(hunter.id)}
                  onFollow={() => handleFollow(hunter.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HunterCard({ hunter, isFollowing, onFollow }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
      <Avatar src={hunter.avatar} className="w-10 h-10" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white truncate">{hunter.username}</p>
          <RankBadge rank={hunter.rank} size="xs" />
        </div>
        <p className="text-xs text-white/50">{hunter.class}</p>
      </div>
      <button
        onClick={onFollow}
        className={cn(
          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300",
          isFollowing
            ? "bg-white/10 text-white/70 hover:bg-white/20"
            : "bg-system-cyan text-void-deep hover:bg-system-cyan/90"
        )}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}
```

---

## 7. STYLING & DESIGN SYSTEM

### Glassmorphism for Sidebars:

```css
.sidebar-glass {
  background: rgba(18, 24, 27, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Hover Effects:

```tsx
className="hover:bg-white/10 hover:border-system-cyan/30 transition-all duration-300 group"
```

### Active States:

```tsx
className="bg-system-cyan text-void-deep shadow-[0_0_10px_rgba(0,255,255,0.3)]"
```

---

## 8. SUCCESS CRITERIA

### Visual:
- [ ] Left sidebar displays user profile with avatar, name, rank, level, XP
- [ ] Left sidebar has quick actions with icons
- [ ] Left sidebar shows personal stats summary
- [ ] Right sidebar displays trending tags with post counts
- [ ] Right sidebar shows hunter suggestions with follow buttons
- [ ] Right sidebar displays active challenges
- [ ] All sections use glassmorphism design
- [ ] Hover effects have cyan glow
- [ ] Collapsible sections animate smoothly

### Functionality:
- [ ] Sidebars hide on mobile (<768px)
- [ ] Left sidebar shows on tablet (768px-1024px)
- [ ] Both sidebars show on desktop (>1024px)
- [ ] Trending tags clickable (filter functionality)
- [ ] Follow buttons toggle state
- [ ] Collapsible sections work
- [ ] Refresh buttons have visual feedback

### Responsive:
- [ ] No horizontal scroll on mobile
- [ ] Sidebars fixed position on desktop
- [ ] Main feed adjusts margins based on sidebar visibility
- [ ] Touch targets minimum 44×44px on tablet

---

## 9. TESTING CHECKLIST

### Desktop (1920px+):
- [ ] Both sidebars visible
- [ ] Sidebars fixed to edges
- [ ] Hover effects work
- [ ] Collapsible sections work

### Tablet (768px-1024px):
- [ ] Left sidebar visible
- [ ] Right sidebar hidden
- [ ] Content readable

### Mobile (<768px):
- [ ] Both sidebars hidden
- [ ] Full-width feed
- [ ] No horizontal scroll

---

## 10. IMPORTANT NOTES

1. **USE MOCK DATA ONLY** - Do not connect to real database or API
2. **REFERENCE IMAGES** - You will attach reference images for visual matching
3. **RESPONSIVE DESIGN** - Test on all screen sizes
4. **COLLAPSIBLE SECTIONS** - Use spring animations for smooth transitions
5. **CONSISTENCY** - Follow design system for colors, spacing, typography
6. **PERFORMANCE** - Use proper animation libraries (framer-motion)

---

**Reference Images:** Attach your visual reference screenshots here before starting implementation.

**Next Phase:** Phase 8 - Integration & Data Connection (SKIPPED - using mock data)
