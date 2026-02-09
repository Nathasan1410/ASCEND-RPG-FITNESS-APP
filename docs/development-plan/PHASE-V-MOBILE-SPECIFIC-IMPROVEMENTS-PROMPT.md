# PHASE V PROMPT: Mobile-Specific Improvements

> **Phase:** V | **Priority:** P0 - Critical | **Estimated Time:** 2-3 hours  
> **Reference Images:** You will attach reference images for visual inspiration  
> **Important:** Use **MOCK DATA** only. Do not connect to real database/API.

---

## OVERVIEW

Optimize the feed experience specifically for mobile devices (320px-768px). Focus on touch-friendly interactions, proper spacing, and mobile-specific UX patterns that work best on small screens.

**Note:** You will receive reference images to match the visual style exactly. Focus on matching the mobile layout, spacing, and interaction patterns from provided screenshots.

---

## OBJECTIVES

1. **Mobile Filter Panel** - Collapsible by default, touch-friendly
2. **Navigation Mobile Optimization** - Hamburger menu with full-screen overlay
3. **Leaderboard Mobile Filters** - Filter panel for leaderboard page
4. **Touch Targets** - Ensure minimum 44×44px for all interactive elements
5. **Mobile-Specific Animations** - Swipe gestures, pull-to-refresh (optional)

---

## 1. MOBILE FILTER PANEL BEHAVIOR

### File to Modify:
- `components/social/FeedFilterBar.tsx`

### Requirements:

#### Default State (Collapsed on Mobile):
- Filters collapsed by default on mobile screens (<768px)
- Show "Filters" button with active filter count badge
- Tap to expand panel from bottom or top

#### Mobile Layout:
```tsx
// Filter panel expands upward from bottom on mobile
<div className="fixed bottom-20 left-4 right-4 md:relative md:bottom-auto md:left-0 md:right-0 md:top-0">
  <FilterPanel isMobile={isMobile} />
</div>
```

#### Touch-Friendly Buttons:
- Minimum 44×44px touch targets
- Spacing between buttons: 12px minimum
- Large tap zones for easy interaction

```tsx
<button
  className="h-12 min-w-[44px] px-4 py-2 rounded-lg text-sm font-medium"
>
  Filter Button
</button>
```

#### Single Column Layout:
- All filter options stack vertically on mobile
- No horizontal scrolling
- Clear separation between sections

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
  {/* Filter sections */}
</div>
```

---

## 2. MOBILE NAVIGATION OPTIMIZATION

### File to Modify:
- `components/layout/MobileSystemNavbar.tsx`
- `components/layout/MobileBottomNav.tsx`

### Hamburger Menu Requirements:

#### Full-Screen Overlay:
- Menu covers entire screen
- Backdrop blur effect
- Close button in top right
- Smooth slide-in animation

```tsx
{mobileMenuOpen && (
  <>
    <Backdrop 
      onClick={closeMenu}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
    />
    <MobileMenuOverlay className="fixed inset-0 z-50">
      <MenuContent>
        <CloseButton onClick={closeMenu} />
        <NavigationItems />
      </MenuContent>
    </MobileMenuOverlay>
  </>
)}
```

#### Slide-in Animation:
```tsx
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: mobileMenuOpen ? 0 : "100%" }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
  className="fixed inset-y-0 right-0 w-80 max-w-full bg-void-panel z-50"
>
  {/* Menu content */}
</motion.div>
```

#### Close on Backdrop Tap:
```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const closeMenu = () => setMobileMenuOpen(false);

<Backdrop onClick={closeMenu} />
```

#### Navigation Items Layout:
- Large touch targets (min 48px height)
- Icons + labels clearly visible
- Active state indicators
- Section headers for grouping

```tsx
<NavigationSection>
  <SectionHeader>Main</SectionHeader>
  <NavItem href="/dashboard">
    <Home className="w-6 h-6" />
    <span>Dashboard</span>
  </NavItem>
  <NavItem href="/feed">
    <Radio className="w-6 h-6" />
    <span>Hunter Network</span>
  </NavItem>
</NavigationSection>
```

### Bottom Navigation Refinement:

#### Active State Visualization:
- Glowing cyan border around active tab
- Brighter icon color
- Text bold for active tab

```tsx
<NavLink href="/feed">
  <Radio className={cn(
    "w-6 h-6 transition-all",
    isActive && "drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
  )} />
  <span className={cn(
    "text-[10px] font-medium uppercase",
    isActive ? "text-white font-bold" : "text-white/60"
  )}>
    Feed
  </span>
</NavLink>
```

#### Badge Indicators:
- Notification count badge on Notifications tab
- Dot indicator for Feed (if new posts)

```tsx
<Badge className="absolute -top-1 -right-1">
  {count > 9 ? '9+' : count}
</Badge>
```

---

## 3. LEADERBOARD MOBILE FILTERS

### File to Create/Modify:
- `app/dashboard/leaderboard/page.tsx`

### Filter Panel for Leaderboard:

#### Filter Options:
- Rank filter (E-S, All)
- Class filter (Novice, Striker, Tank, Assassin)
- Status filter (Verified, All)
- Time range (Today, Week, Month, All)

#### Mobile Layout:
```tsx
<LeaderboardFilters>
  <FilterButtonGroup>
    <FilterButton label="All Ranks" active={selectedRank === 'all'} />
    <FilterButton label="S-Rank" active={selectedRank === 'S'} />
    <FilterButton label="A-Rank+" active={selectedRank === 'A'} />
  </FilterButtonGroup>
  
  <FilterButtonGroup>
    <FilterButton label="All Classes" active={selectedClass === 'all'} />
    <FilterButton label="Striker" active={selectedClass === 'Striker'} />
    <FilterButton label="Tank" active={selectedClass === 'Tank'} />
  </FilterButtonGroup>
</LeaderboardFilters>
```

#### Horizontal Scroll for Categories:
```tsx
<div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
  {filterOptions.map(option => (
    <FilterChip key={option.value}>
      {option.label}
    </FilterChip>
  ))}
</div>
```

---

## 4. TOUCH TARGETS & MOBILE OPTIMIZATION

### Touch Target Standards:

#### Minimum Sizes:
- Buttons: 44×44px minimum
- Links: 44px minimum height
- Toggles: 44px minimum width/height
- Input fields: 44px minimum height

```tsx
<button className="h-12 min-w-[44px] px-4">Button</button>
<input className="h-12 w-full" />
```

#### Spacing Between Elements:
- Minimum 12px between interactive elements
- 16px minimum between sections
- 24px minimum between major groups

```tsx
<div className="space-y-4">
  {/* Elements with 16px spacing */}
</div>
```

### Mobile-Specific Styling:

#### Larger Text:
- Base text: 16px (not smaller)
- Buttons: 14-16px
- Labels: 12-14px
- Titles: 18-20px

```tsx
<p className="text-base">Body text (16px)</p>
<h3 className="text-lg">Title (18px)</h3>
<button className="text-sm font-medium">Button (14px)</button>
```

#### Simplified Layout:
- Remove complex hover states on mobile
- Use tap states instead
- Simplify information density

```tsx
// Mobile: Simple tap state
<button className="active:bg-system-cyan/20">
  Tap me
</button>

// Desktop: Hover state
<button className="hover:bg-white/10 md:hover:bg-white/10">
  Hover me
</button>
```

---

## 5. MOBILE-SPECIFIC ANIMATIONS

### Swipe to Dismiss (Optional):

```tsx
const [dragX, setDragX] = useState(0);

<div
  onDragEnd={(e, { offset }) => {
    if (offset.x < -100) {
      // Dismiss
    }
  }}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
>
  {/* Content */}
</div>
```

### Pull to Refresh (Optional):

```tsx
const [pullY, setPullY] = useState(0);
const [refreshing, setRefreshing] = useState(false);

<ScrollContainer onPull={(y) => setPullY(y)}>
  <PullIndicator pullY={pullY} />
  <Content />
</ScrollContainer>
```

### Spring Animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
>
  {/* Card content */}
</motion.div>
```

---

## 6. MOCK DATA TO USE

### Mobile Filter Mock Data:

```tsx
const mockMobileFilters = {
  postType: 'all',
  rankFilter: 'all',
  timeRange: 'all',
  verifiedOnly: false,
  friendsOnly: false,
};

const mockFilterOptions = {
  postType: [
    { value: 'all', label: 'All Broadcasts' },
    { value: 'quest_completion', label: 'Quests' },
    { value: 'rank_up', label: 'Rank Ups' },
    { value: 'achievement', label: 'Achievements' },
  ],
  rankFilter: [
    { value: 'all', label: 'All Ranks' },
    { value: 'S', label: 'S-Rank' },
    { value: 'A', label: 'A-Rank+' },
    { value: 'B', label: 'B-Rank+' },
  ],
};
```

### Leaderboard Filter Mock Data:

```tsx
const mockLeaderboardFilters = {
  rank: 'all',
  class: 'all',
  status: 'all',
  timeRange: 'week',
};

const mockFilterChips = [
  { value: 'all', label: 'All Ranks' },
  { value: 'S', label: 'S-Rank' },
  { value: 'A', label: 'A-Rank' },
  { value: 'B', label: 'B-Rank' },
  { value: 'C', label: 'C-Rank' },
  { value: 'D', label: 'D-Rank' },
  { value: 'E', label: 'E-Rank' },
];
```

---

## 7. IMPLEMENTATION EXAMPLE

### Mobile Filter Panel Component:

```tsx
"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { mockMobileFilters, mockFilterOptions } from "@/lib/mock/filter-data";

export function MobileFilterBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState(mockMobileFilters);
  const [activeCount, setActiveCount] = useState(0);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Update active count
  };

  return (
    <div className="md:hidden fixed bottom-20 left-4 right-4 z-40">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-void-panel/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <Filter className={cn(
            "w-5 h-5",
            activeCount > 0 ? "text-system-cyan" : "text-white/60"
          )} />
          <span className="text-sm font-medium text-white">
            Filters
          </span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-system-cyan text-void-deep rounded text-xs font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronUp className="w-5 h-5 text-white/60" />
        )}
      </button>

      {/* Collapsible Filter Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden mt-2"
          >
            <div className="bg-void-panel/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-4">
              {/* Filter Sections */}
              <FilterSection
                label="Post Type"
                options={mockFilterOptions.postType}
                selected={filters.postType}
                onChange={(value) => handleFilterChange('postType', value)}
              />
              
              <FilterSection
                label="Rank"
                options={mockFilterOptions.rankFilter}
                selected={filters.rankFilter}
                onChange={(value) => handleFilterChange('rankFilter', value)}
              />
              
              {/* Toggle Filters */}
              <div className="pt-4 border-t border-white/10">
                <ToggleFilter
                  label="Verified Only"
                  checked={filters.verifiedOnly}
                  onChange={(checked) => handleFilterChange('verifiedOnly', checked)}
                />
                <ToggleFilter
                  label="Friends Only"
                  checked={filters.friendsOnly}
                  onChange={(checked) => handleFilterChange('friendsOnly', checked)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSection({ label, options, selected, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/60 uppercase tracking-wide font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-11 min-w-[44px] px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300",
              selected === option.value
                ? "bg-system-cyan text-void-deep border-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                : "bg-void-deep border-white/20 text-white/70"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleFilter({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-sm text-white/70">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          "w-11 h-6 rounded-full transition-all duration-300 relative",
          checked ? 'bg-system-cyan' : 'bg-void-deep border-2 border-white/20'
        )}>
          <motion.div
            animate={{ x: checked ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute top-0.5 w-5 h-5 rounded-full transition-colors",
              checked ? 'bg-void-deep' : 'bg-white/40'
            )}
          />
        </div>
      </div>
    </label>
  );
}
```

### Mobile Navigation Component:

```tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home, Radio, Trophy, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export function MobileSystemNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Mock username
    setUsername("HunterShadow_X");
  }, []);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/feed", icon: Radio, label: "Hunter Network" },
    { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
    { href: "/friends", icon: User, label: "Friends" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="h-16 border-b border-white/10 bg-system-panel/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/dashboard" className="text-xl font-display font-bold tracking-tighter text-system-cyan">
        ASCEND
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="w-12 h-12 min-w-[48px] flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Backdrop onClick={() => setMobileMenuOpen(false)} />
            <MobileMenu>
              <MenuHeader>
                <UserInfo>
                  <Avatar className="w-12 h-12" />
                  <div>
                    <Username>HunterShadow_X</Username>
                    <RankBadge rank="S" />
                  </div>
                </UserInfo>
                <CloseButton onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </CloseButton>
              </MenuHeader>
              
              <MenuItems>
                <SectionHeader>Main</SectionHeader>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <NavItem
                      key={item.href}
                      href={item.href}
                      isActive={isActive}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className={cn(
                        "w-6 h-6 transition-all",
                        isActive ? "text-system-cyan" : "text-white/60"
                      )} />
                      <span className={cn(
                        "text-base font-medium",
                        isActive ? "text-white" : "text-white/70"
                      )}>
                        {item.label}
                      </span>
                    </NavItem>
                  );
                })}
              </MenuItems>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Backdrop({ onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
    />
  );
}

function MobileMenu({ children }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed inset-y-0 right-0 w-80 max-w-full bg-void-panel z-50 border-l border-white/10 overflow-y-auto"
    >
      {children}
    </motion.div>
  );
}
```

---

## 8. SUCCESS CRITERIA

### Visual:
- [ ] Filters collapsed by default on mobile
- [ ] Filter panel expands smoothly with animation
- [ ] Touch targets are minimum 44×44px
- [ ] Hamburger menu opens full-screen overlay
- [ ] Menu slides in with spring animation
- [ ] Close button visible and accessible
- [ ] Active states clearly visible on mobile

### Functionality:
- [ ] Filter toggle works on mobile
- [ ] Mobile menu opens/closes smoothly
- [ ] Backdrop closes menu on tap
- [ ] All navigation links work
- [ ] Active state updates correctly
- [ ] No horizontal scroll on mobile

### Responsiveness:
- [ ] Works on 320px screen width
- [ ] Works on 375px screen width
- [ ] Works on 414px screen width
- [ ] Works on 768px screen width (tablet)
- [ ] Touch targets accessible on all sizes

---

## 9. TESTING CHECKLIST

### Mobile Devices:
- [ ] iPhone SE (320px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro (430px)
- [ ] Samsung S21 (360px)
- [ ] Pixel 6 (412px)

### Tablet:
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)

### Interactions:
- [ ] Tap buttons work reliably
- [ ] Swipe gestures work (if implemented)
- [ ] Pull to refresh works (if implemented)
- [ ] No accidental triggers
- [ ] Responsive to touch feedback

---

## 10. IMPORTANT NOTES

1. **USE MOCK DATA ONLY** - Do not connect to real database or API
2. **REFERENCE IMAGES** - You will attach reference images for visual matching
3. **TOUCH TARGETS** - Minimum 44×44px for all interactive elements
4. **MOBILE-FIRST** - Design for mobile first (320px-768px)
5. **SIMPLIFY** - Reduce information density on mobile
6. **TEST ON REAL DEVICES** - Use actual mobile devices for testing

---

**Reference Images:** Attach your visual reference screenshots here before starting implementation.

**Next Phase:** Phase 6 - Settings Page Navigation
