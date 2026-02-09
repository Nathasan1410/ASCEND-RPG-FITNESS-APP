# MASTER FRONTEND ENHANCEMENT PLAN

**Date:** February 4, 2026
**Version:** 1.0
**Priority:** P0 - Critical UX Improvements
**Status:** Draft

---

## EXECUTIVE SUMMARY

The current frontend implementation suffers from critical UX issues that significantly impact user experience:

1. **Navigation Inconsistencies** - Multiple navigation systems (SystemNavbar, MobileBottomNav, FloatingNavDock) create confusion
2. **Missing Mobile Navigation** - Desktop nav links are hidden on mobile, breaking access to core features
3. **Poor Filter UX** - Filters are always visible, take excessive screen space, lack clear active state indicators
4. **Unclear Toggle States** - Toggle switches have minimal visual feedback, making it hard to know if filters are active
5. **No Clear Visual Hierarchy** - Navigation and filtering controls compete for attention

**Impact:** Users struggle to navigate the app, can't easily find features, and have poor filter management experience.

---

## PHASE I: UNIFIED NAVIGATION SYSTEM

### Objective
Create a single, consistent navigation system that works seamlessly across all screen sizes.

### Current State
- **SystemNavbar** (`components/layout/SystemNavbar.tsx`): Desktop-only, hidden on mobile
- **MobileBottomNav** (`components/layout/MobileBottomNav.tsx`): Mobile-only, limited to 4 items
- **FloatingNavDock** (`components/layout/FloatingNavDock.tsx`): Duplicate of MobileBottomNav, unnecessary
- **Navigation Links**: Hunter Network, Leaderboard, Friends, Notifications only accessible on desktop

### Problems
1. Mobile users cannot access Feed, Leaderboard, Friends, Notifications from main nav
2. Three navigation systems create maintenance burden and user confusion
3. FloatingNavDock duplicates MobileBottomNav functionality
4. Inconsistent navigation patterns across pages

### Solution: Create Unified Navigation Component

#### 1.1 SystemNavbar Enhancement (P0 - BLOCKER)
**File:** `components/layout/SystemNavbar.tsx`

**Changes:**
- Add mobile hamburger menu with full navigation
- Consolidate all navigation items
- Make responsive (visible on all screen sizes)
- Remove duplicate navigation links from dropdown (currently redundant)

**Implementation:**

```tsx
"use client";

import Link from "next/link";
import { User, Trophy, Settings, LogOut, Users, Bell, Radio, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { getUnreadCount } from "@/server/actions/notification-actions";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/feed", icon: Radio, label: "Hunter Network" },
  { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/notifications", icon: Bell, label: "Notifications", hasBadge: true },
];

export function SystemNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
      const count = await getUnreadCount();
      setUnreadCount(count);
    });
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <nav className="h-16 border-b border-white/10 bg-system-panel/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/dashboard" className="text-xl font-display font-bold tracking-tighter text-system-cyan">
        ASCEND
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm flex items-center gap-2 transition-colors",
                pathname === item.href
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              <Icon className={cn("w-4 h-4", pathname === item.href ? "text-system-cyan" : "text-white/60")} />
              {item.label}
              {item.hasBadge && unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-status-danger" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Desktop User Menu */}
      <div className="hidden md:block relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-void-deep hover:border-white/40 transition-colors"
        >
          <User className="w-4 h-4 text-white/60" />
        </button>

        {userMenuOpen && (
          <UserDropdownMenu
            username={username}
            unreadCount={unreadCount}
            onLogout={handleLogout}
            onClose={() => setUserMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
```

#### 1.2 Mobile Bottom Navigation Refinement (P0)
**File:** `components/layout/MobileBottomNav.tsx`

**Changes:**
- Add Settings link to main nav (currently missing)
- Add Profile link (currently floating, not part of main nav)
- Improve active state visualization
- Make profile button more accessible

**Implementation:**

```tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, ScrollText, Trophy, Settings, User, Radio, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";
import { getUnreadCount } from "@/server/actions/notification-actions";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
      const count = await getUnreadCount();
      setUnreadCount(count);
    });
  }, []);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/feed", icon: Radio, label: "Feed", showBadge: true },
    { href: "/notifications", icon: Bell, label: "Alerts", showBadge: true },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-system-cyan bg-system-cyan/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "w-6 h-6 transition-all",
                      isActive && "drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                    )}
                  />
                  {item.showBadge && (item.href === "/feed" ? false : unreadCount > 0) && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-status-danger border-2 border-zinc-900" />
                  )}
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-system-cyan/10 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Profile Button - Floating */}
          <Link
            href={`/profile/${username}`}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
              pathname?.includes("/profile/")
                ? "text-system-cyan bg-system-cyan/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <User
              className={cn(
                "w-6 h-6 transition-all",
                pathname?.includes("/profile/") && "drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
              )}
            />
            <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

#### 1.3 Remove FloatingNavDock (P0)
**File:** `components/layout/FloatingNavDock.tsx`

**Action:** DELETE - This component duplicates MobileBottomNav functionality and is not used anywhere

#### 1.4 Update Dashboard Layout (P0)
**File:** `app/dashboard/layout.tsx`

**Changes:**
- Remove FloatingNavDock import
- Ensure only SystemNavbar and MobileBottomNav are used

---

## PHASE II: FILTER SYSTEM REDESIGN

### Objective
Create a collapsible, intuitive filter system with clear active state indicators.

### Current State
- **FeedFilterBar** (`components/social/FeedFilterBar.tsx`): Always visible, takes up ~300px screen height
- **Toggle Switches**: Minimal visual feedback, hard to tell if active
- **Filter Sections**: Multiple buttons, unclear which is selected
- **No Collapse**: Filters always consume screen space

### Problems
1. Filters take too much screen space (critical on mobile)
2. No way to collapse/expand filters
3. Active filters not clearly indicated
4. Toggle states ambiguous
5. Poor mobile UX

### Solution: Collapsible Filter Panel with Clear States

#### 2.1 Enhanced FeedFilterBar (P0 - BLOCKER)
**File:** `components/social/FeedFilterBar.tsx`

**Changes:**
- Add collapsible panel (expand/collapse button)
- Show active filter count badge
- Improve toggle switch visualization
- Add "Clear All" button
- Better mobile layout

**Implementation:**

```tsx
"use client";

import { useState } from "react";
import type { FeedFilters } from "@/types/social";
import { cn } from "@/lib/utils/cn";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedFilterBarProps {
  filters: FeedFilters;
  onFiltersChange: (filters: FeedFilters) => void;
}

export function FeedFilterBar({ filters, onFiltersChange }: FeedFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate active filters count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.postType !== 'all') count++;
    if (filters.rankFilter !== 'all') count++;
    if (filters.timeRange !== 'all') count++;
    if (filters.verifiedOnly) count++;
    if (filters.friendsOnly) count++;
    if (filters.guildFilter) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();
  const hasActiveFilters = activeCount > 0;

  const handleClearAll = () => {
    onFiltersChange({
      postType: 'all',
      rankFilter: 'all',
      verifiedOnly: false,
      friendsOnly: false,
      timeRange: 'all',
      guildFilter: null,
    });
  };

  return (
    <div className="bg-void-panel border border-white/10 rounded-xl overflow-hidden">
      {/* Header - Always Visible */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className={cn(
            "w-5 h-5 transition-colors",
            hasActiveFilters ? "text-system-cyan" : "text-white/60"
          )} />
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">
            Filters
          </h3>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-system-cyan text-void-deep rounded text-xs font-bold">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-status-danger hover:bg-status-danger/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-system-cyan hover:bg-system-cyan/10 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <>
                Hide <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4 border-t border-white/10">
              {/* Filter Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FilterSection
                  label="Post Type"
                  options={[
                    { value: "all", label: "All Broadcasts" },
                    { value: "quest_completion", label: "Quest Completions" },
                    { value: "rank_up", label: "Rank Ups" },
                    { value: "level_up", label: "Level Ups" },
                  ]}
                  selected={filters.postType}
                  onChange={(value) => onFiltersChange({ ...filters, postType: value as any })}
                />

                <FilterSection
                  label="Rank"
                  options={[
                    { value: "all", label: "All Ranks" },
                    { value: "S", label: "S-Rank Only" },
                    { value: "A", label: "A-Rank+" },
                    { value: "B", label: "B-Rank+" },
                  ]}
                  selected={filters.rankFilter}
                  onChange={(value) => onFiltersChange({ ...filters, rankFilter: value as any })}
                />

                <FilterSection
                  label="Time Range"
                  options={[
                    { value: "today", label: "Today" },
                    { value: "week", label: "This Week" },
                    { value: "month", label: "This Month" },
                    { value: "all", label: "All Time" },
                  ]}
                  selected={filters.timeRange}
                  onChange={(value) => onFiltersChange({ ...filters, timeRange: value as any })}
                />
              </div>

              {/* Toggle Filters */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-4">
                  <EnhancedToggle
                    label="Verified Hunters Only"
                    checked={filters.verifiedOnly}
                    onChange={(checked) => onFiltersChange({ ...filters, verifiedOnly: checked })}
                  />

                  <EnhancedToggle
                    label="Friends Only"
                    checked={filters.friendsOnly}
                    onChange={(checked) => onFiltersChange({ ...filters, friendsOnly: checked })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSection({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/60 uppercase tracking-wide font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-300",
              selected === option.value
                ? 'bg-system-cyan text-void-deep border-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)]'
                : 'bg-void-deep border-white/20 text-white/70 hover:border-white/40'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EnhancedToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          "w-12 h-7 rounded-full transition-all duration-300 relative",
          checked ? 'bg-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'bg-void-deep border-2 border-white/20'
        )}>
          <motion.div
            animate={{
              x: checked ? 20 : 2
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute top-0.5 w-6 h-6 rounded-full transition-colors",
              checked ? 'bg-void-deep' : 'bg-white/40'
            )}
          />
        </div>
      </div>
      <span className={cn(
        "text-sm font-medium transition-colors",
        checked ? 'text-white' : 'text-white/60 group-hover:text-white/80'
      )}>
        {label}
      </span>
    </label>
  );
}
```

#### 2.2 Active Filter Indicator (P0)
**File:** `app/feed/page.tsx`

**Changes:**
- Show active filters as removable chips
- Add quick filter access from page header

---

## PHASE III: ACTIVE FILTER CHIPS

### Objective
Provide visual feedback for active filters with easy removal.

### Implementation

#### 3.1 ActiveFilterChips Component (P1)
**New File:** `components/ui/ActiveFilterChips.tsx`

```tsx
"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { FeedFilters } from "@/types/social";

interface ActiveFilterChipsProps {
  filters: FeedFilters;
  onRemoveFilter: (filterKey: keyof FeedFilters) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({ filters, onRemoveFilter, onClearAll }: ActiveFilterChipsProps) {
  const activeFilters: Array<{ key: keyof FeedFilters; label: string }> = [];

  if (filters.postType !== 'all') {
    activeFilters.push({ key: 'postType', label: `Type: ${filters.postType}` });
  }
  if (filters.rankFilter !== 'all') {
    activeFilters.push({ key: 'rankFilter', label: `Rank: ${filters.rankFilter}` });
  }
  if (filters.timeRange !== 'all') {
    activeFilters.push({ key: 'timeRange', label: `Time: ${filters.timeRange}` });
  }
  if (filters.verifiedOnly) {
    activeFilters.push({ key: 'verifiedOnly', label: 'Verified Only' });
  }
  if (filters.friendsOnly) {
    activeFilters.push({ key: 'friendsOnly', label: 'Friends Only' });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
      <span className="text-xs text-white/60 font-medium uppercase tracking-wide mr-2">
        Active Filters:
      </span>
      {activeFilters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onRemoveFilter(filter.key)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-system-cyan/20 text-system-cyan rounded-full text-xs font-medium hover:bg-system-cyan/30 transition-colors"
        >
          {filter.label}
          <X className="w-3 h-3" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white/70 rounded-full text-xs font-medium hover:bg-white/20 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
```

---

## PHASE IV: IMPROVED ACTIVE STATES

### Objective
Make it crystal clear which navigation items, filters, and controls are active.

### 4.1 Navigation Active States (P0)
**Visual Indicators:**
- **Active Nav Item**: Blue glow + underline + brighter icon color
- **Inactive Nav Item**: Dimmed icon + on hover brightens

**Implementation:**
```tsx
// In navigation components
className={cn(
  "flex items-center gap-2 transition-all duration-300",
  pathname === item.href
    ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
    : "text-white/70 hover:text-white"
)}
```

### 4.2 Filter Button States (P0)
**Visual Indicators:**
- **Selected**: Solid blue background + glow effect + white text
- **Unselected**: Dark background + dimmed border
- **Hover on Unselected**: Brighter border

### 4.3 Toggle Switch States (P0)
**Visual Indicators:**
- **On**: Blue background, white toggle, glow effect
- **Off**: Dark background, grey toggle
- **Transition**: Smooth spring animation

---

## PHASE V: MOBILE-SPECIFIC IMPROVEMENTS

### Objective
Optimize for mobile screens (320px-768px).

### 5.1 Filter Panel Mobile Behavior (P0)
**Changes:**
- Filters collapsed by default on mobile
- Single column layout
- Touch-friendly buttons (min 44px × 44px)
- Swipe to dismiss (optional)

### 5.2 Navigation Mobile Optimization (P0)
**Changes:**
- Hamburger menu for SystemNavbar on mobile
- Full-screen mobile menu overlay
- Smooth slide-in animation
- Close on backdrop tap

### 5.3 Leaderboard Mobile Filters (P1)
**File:** `app/dashboard/leaderboard/page.tsx`

**Changes:**
- Add filter bar to leaderboard page
- Filter by rank, class, hunter status
- Collapsible filter panel

---

## PHASE VI: SETTINGS PAGE NAVIGATION

### Objective
Improve settings page with better navigation between sections.

### 6.1 Settings Navigation (P1)
**File:** `app/settings/page.tsx`

**Changes:**
- Add sidebar navigation on desktop
- Sticky section headers
- Smooth scroll to sections on mobile
- Quick links at top

---

## IMPLEMENTATION PRIORITY

### P0 - Blockers (Must Have)
1. ✅ SystemNavbar enhancement with mobile hamburger menu
2. ✅ MobileBottomNav refinement with all links
3. ✅ Delete FloatingNavDock
4. ✅ Collapsible FeedFilterBar with clear states
5. ✅ Enhanced toggle switches with visual feedback
6. ✅ Active filter chips component

### P1 - High Priority (Should Have)
1. ActiveFilterChips integration in Feed page
2. Leaderboard filter panel
3. Settings page navigation
4. Improved filter reset UX

### P2 - Medium Priority (Nice to Have)
1. Swipe to dismiss on mobile filter panel
2. Advanced filter animations
3. Filter presets (e.g., "My Friends", "High Rank Hunters")

---

## TESTING CHECKLIST

### Navigation
- [ ] All pages accessible from mobile nav
- [ ] All pages accessible from desktop nav
- [ ] Active states clearly visible
- [ ] Mobile hamburger menu works
- [ ] Backdrop closes mobile menu

### Filters
- [ ] Filter panel collapses/expands smoothly
- [ ] Active filter count badge shows correctly
- [ ] Toggle states are unambiguous
- [ ] Clear All button works
- [ ] Individual filter removal works
- [ ] Active filter chips display correctly
- [ ] Mobile filters collapsed by default

### Responsiveness
- [ ] Works on 320px screen width
- [ ] Works on 768px screen width
- [ ] Works on desktop (1440px+)
- [ ] Touch targets minimum 44px × 44px
- [ ] No horizontal scroll on mobile

### Accessibility
- [ ] All buttons have ARIA labels
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces changes

---

## SUCCESS CRITERIA

### Phase I: Navigation
- ✅ Single unified navigation system
- ✅ All pages accessible on mobile
- ✅ Clear active states
- ✅ Smooth animations (spring physics)

### Phase II: Filters
- ✅ Collapsible filter panel
- ✅ Clear active state indicators
- ✅ Toggle switches unambiguous
- ✅ Active filter count badge
- ✅ Clear All button
- ✅ Individual filter removal

### Phase III: Mobile UX
- ✅ Filters collapsed by default on mobile
- ✅ Touch-friendly controls
- ✅ No horizontal scroll
- ✅ Hamburger menu works smoothly

---

## COMPONENT ARCHITECTURE

### New Components to Create
1. `components/ui/ActiveFilterChips.tsx` - P0
2. `components/layout/UserDropdownMenu.tsx` - P0 (extracted from SystemNavbar)

### Components to Modify
1. `components/layout/SystemNavbar.tsx` - P0
2. `components/layout/MobileBottomNav.tsx` - P0
3. `components/social/FeedFilterBar.tsx` - P0
4. `app/dashboard/layout.tsx` - P0
5. `app/feed/page.tsx` - P1

### Components to Delete
1. `components/layout/FloatingNavDock.tsx` - P0

---

## TIMELINE

### Sprint 1: Navigation Fixes (Week 1)
- Day 1-2: SystemNavbar enhancement
- Day 3: MobileBottomNav refinement
- Day 4: Delete FloatingNavDock, update layout
- Day 5: Testing and bug fixes

### Sprint 2: Filter System (Week 2)
- Day 1-2: Collapsible FeedFilterBar
- Day 3: Enhanced toggle switches
- Day 4: ActiveFilterChips component
- Day 5: Integration and testing

### Sprint 3: Polish and Mobile (Week 3)
- Day 1-2: Mobile-specific improvements
- Day 3: Leaderboard filters
- Day 4: Settings navigation
- Day 5: Final testing and documentation

---

## NOTES FOR MOBILE UI/UX DEVELOPER

### What's Implemented (Don't Redo)
- Core functionality of navigation
- Filter logic and state management
- Basic responsive layouts

### What Needs Polish (Please Refine)
- Exact spacing and alignment
- Animation timing and feel
- Glassmorphism intensity
- Color contrasts and accessibility
- Icon sizing and positioning
- Button tap targets on mobile
- Visual feedback delays

### Specific Questions for You
1. Should filters expand upward or downward on mobile?
2. What's the ideal toggle switch size for mobile?
3. Should active filter chips be dismissible with swipe?
4. What's the preferred animation duration for nav transitions?

---

**Document Status:** Ready for Implementation
**Last Updated:** February 4, 2026
**Next Review:** After Phase I completion
