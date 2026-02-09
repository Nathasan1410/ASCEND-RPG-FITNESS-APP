# PHASE IV PROMPT: Improved Active States

> **Phase:** IV | **Priority:** P0 - Critical | **Estimated Time:** 2-3 hours  
> **Reference Images:** You will attach reference images for visual inspiration  
> **Important:** Use **MOCK DATA** only. Do not connect to real database/API.

---

## OVERVIEW

Create crystal-clear active states for navigation items, filter buttons, and toggle switches across the application. Users should instantly know which elements are active, which are inactive, and what happens on hover/interaction.

**Note:** You will receive reference images to match the visual style exactly. Focus on matching the colors, shadows, and animation feel from the provided screenshots.

---

## OBJECTIVES

1. **Navigation Active States** - Clear visual feedback for active/selected navigation items
2. **Filter Button States** - Unambiguous selected vs unselected states
3. **Toggle Switch States** - Clear on/off states with smooth transitions
4. **Hover/Interaction States** - Consistent hover effects across all interactive elements
5. **Accessibility** - High contrast and clear visual hierarchy

---

## 1. NAVIGATION ACTIVE STATES

### Files to Modify:
- `components/layout/SystemNavbar.tsx` (desktop navigation)
- `components/layout/MobileBottomNav.tsx` (mobile bottom nav)
- `components/layout/MobileSystemNavbar.tsx` (mobile hamburger menu)

### Visual Requirements:

**Active State (Selected):**
- Text color: `text-white` (pure white, brighter)
- Icon color: `text-system-cyan` with `drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]` glow effect
- Background: Optional subtle cyan background `bg-system-cyan/10`
- Border: Cyan bottom border `border-b-2 border-system-cyan` for desktop
- Animation: Spring animation on state change

**Inactive State:**
- Text color: `text-white/70` (dimmed white)
- Icon color: `text-white/60` (dimmed icon)
- Background: Transparent
- Border: None
- Hover effect: Brighten to `text-white` on hover

### Implementation Pattern:

```tsx
className={cn(
  "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
  pathname === item.href
    ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
    : "text-white/70 hover:text-white hover:bg-white/5"
)}
```

```tsx
<item.icon className={cn(
  "w-5 h-5 transition-all",
  pathname === item.href 
    ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
    : "text-white/60"
)} />
```

### Mock Data for Navigation:

```tsx
const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/feed", icon: Radio, label: "Hunter Network" },
  { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/notifications", icon: Bell, label: "Notifications", badge: 3 },
];
```

---

## 2. FILTER BUTTON STATES

### Files to Modify:
- `components/social/FeedFilterBar.tsx`
- `components/ui/ActiveFilterChips.tsx` (if exists)

### Visual Requirements:

**Selected State (Active Filter):**
- Background: Solid cyan `bg-system-cyan`
- Text color: Dark `text-void-deep`
- Border: Cyan border `border-system-cyan`
- Glow effect: `shadow-[0_0_10px_rgba(0,255,255,0.3)]`
- Animation: Scale up slightly on selection

**Unselected State:**
- Background: Dark `bg-void-deep`
- Text color: `text-white/70`
- Border: White/20 border `border-white/20`
- Glow effect: None

**Hover State (Unselected):**
- Border: Brighter `border-white/40`
- Background: Slightly lighter `bg-white/5`

### Implementation Pattern:

```tsx
<button
  onClick={() => onSelect(value)}
  className={cn(
    "px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300",
    selected === value
      ? "bg-system-cyan text-void-deep border-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)] scale-105"
      : "bg-void-deep border-white/20 text-white/70 hover:border-white/40 hover:bg-white/5"
  )}
>
  {label}
</button>
```

### Mock Data for Filters:

```tsx
const postTypeOptions = [
  { value: "all", label: "All Broadcasts" },
  { value: "quest_completion", label: "Quest Completions" },
  { value: "rank_up", label: "Rank Ups" },
  { value: "level_up", label: "Level Ups" },
  { value: "achievement", label: "Achievements" },
];

const rankFilterOptions = [
  { value: "all", label: "All Ranks" },
  { value: "S", label: "S-Rank Only" },
  { value: "A", label: "A-Rank+" },
  { value: "B", label: "B-Rank+" },
  { value: "C", label: "C-Rank+" },
];
```

---

## 3. TOGGLE SWITCH STATES

### Files to Modify:
- `components/social/FeedFilterBar.tsx`
- Any components with toggle switches

### Visual Requirements:

**ON State (Active):**
- Track background: Cyan `bg-system-cyan`
- Track border: None
- Glow effect: `shadow-[0_0_10px_rgba(0,255,255,0.4)]`
- Toggle knob: Dark `bg-void-deep`
- Position: Right (x: 20px)
- Label color: White `text-white`

**OFF State (Inactive):**
- Track background: Dark `bg-void-deep`
- Track border: White/20 `border-2 border-white/20`
- Glow effect: None
- Toggle knob: White/40 `bg-white/40`
- Position: Left (x: 2px)
- Label color: Dimmed `text-white/60`

**Transition:** Smooth spring animation using framer-motion

### Implementation Pattern:

```tsx
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
      checked 
        ? "bg-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]"
        : "bg-void-deep border-2 border-white/20"
    )}>
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "absolute top-0.5 w-6 h-6 rounded-full transition-colors",
          checked ? "bg-void-deep" : "bg-white/40"
        )}
      />
    </div>
  </div>
  <span className={cn(
    "text-sm font-medium transition-colors",
    checked ? "text-white" : "text-white/60 group-hover:text-white/80"
  )}>
    {label}
  </span>
</label>
```

### Mock Toggle Data:

```tsx
const toggles = [
  { key: "verifiedOnly", label: "Verified Hunters Only", checked: false },
  { key: "friendsOnly", label: "Friends Only", checked: false },
  { key: "newToday", label: "New Today", checked: true },
];
```

---

## 4. ACTIVE FILTER CHIPS

### File to Create/Modify:
- `components/ui/ActiveFilterChips.tsx`

### Visual Requirements:
- Display active filters as removable chips
- Cyan background `bg-system-cyan/20`
- Cyan text `text-system-cyan`
- Rounded pill shape `rounded-full`
- X icon for removal
- "Clear All" button in dimmed style

### Implementation:

```tsx
export function ActiveFilterChips({ filters, onRemoveFilter, onClearAll }) {
  const activeFilters = [
    filters.postType !== 'all' && { key: 'postType', label: `Type: ${filters.postType}` },
    filters.rankFilter !== 'all' && { key: 'rankFilter', label: `Rank: ${filters.rankFilter}` },
    filters.timeRange !== 'all' && { key: 'timeRange', label: `Time: ${filters.timeRange}` },
    filters.verifiedOnly && { key: 'verifiedOnly', label: 'Verified Only' },
    filters.friendsOnly && { key: 'friendsOnly', label: 'Friends Only' },
  ].filter(Boolean);

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
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

## 5. SUCCESS CRITERIA

### Visual Verification:
- [ ] Active navigation items have cyan glow and brighter text
- [ ] Inactive navigation items are dimmed, brighten on hover
- [ ] Selected filter buttons have solid cyan background with glow
- [ ] Unselected filter buttons are dark with dimmed border
- [ ] Toggle ON state has cyan track with glow
- [ ] Toggle OFF state has dark track with border
- [ ] All transitions use spring animations (smooth, bouncy feel)
- [ ] Active filter chips display correctly with X icons
- [ ] Clear All button appears when filters are active

### Functionality:
- [ ] Navigation active state matches current route
- [ ] Filter selection updates state immediately
- [ ] Toggle switches animate smoothly
- [ ] Filter chips remove individual filters
- [ ] Clear All removes all filters

### Accessibility:
- [ ] Active states have minimum 4.5:1 contrast ratio
- [ ] Hover states are clearly visible
- [ ] Focus states are implemented (keyboard navigation)
- [ ] Color is not the only indicator of state (icons, borders also indicate)

---

## 6. MOCK DATA TO USE

### Navigation Mock Data:
```tsx
// For testing different active states
const testPaths = ["/dashboard", "/feed", "/dashboard/leaderboard", "/friends", "/notifications"];

// Simulating different active states
const mockNavItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", active: true },
  { href: "/feed", icon: Radio, label: "Hunter Network", active: false },
  { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard", active: false },
  { href: "/friends", icon: Users, label: "Friends", active: false },
  { href: "/notifications", icon: Bell, label: "Notifications", active: false, badge: 3 },
];
```

### Filter Mock Data:
```tsx
const mockFilters = {
  postType: 'quest_completion',
  rankFilter: 'A',
  timeRange: 'week',
  verifiedOnly: true,
  friendsOnly: false,
};

const mockFilterOptions = {
  postType: [
    { value: 'all', label: 'All Broadcasts' },
    { value: 'quest_completion', label: 'Quest Completions' },
    { value: 'rank_up', label: 'Rank Ups' },
    { value: 'level_up', label: 'Level Ups' },
  ],
  rankFilter: [
    { value: 'all', label: 'All Ranks' },
    { value: 'S', label: 'S-Rank Only' },
    { value: 'A', label: 'A-Rank+' },
    { value: 'B', label: 'B-Rank+' },
  ],
  timeRange: [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ],
};
```

---

## 7. TESTING CHECKLIST

### Desktop (1920px+):
- [ ] Hover states work on all navigation items
- [ ] Active state glows are visible
- [ ] Filter buttons have proper hover states
- [ ] Toggle switches animate smoothly

### Tablet (768px-1024px):
- [ ] Touch targets are large enough (min 44×44px)
- [ ] Active states are still clear
- [ ] Filter layout is responsive

### Mobile (320px-768px):
- [ ] Active states are visible on small screens
- [ ] Filter buttons are touch-friendly
- [ ] Toggle switches are easy to tap
- [ ] No horizontal scroll

---

## 8. IMPORTANT NOTES

1. **USE MOCK DATA ONLY** - Do not connect to real database or API
2. **REFERENCE IMAGES** - You will attach reference images for visual matching
3. **ANIMATIONS** - Use spring animations (stiffness: 400, damping: 30) for smooth feel
4. **COLORS** - Use only system colors:
   - `system-cyan`: #00ffff
   - `void-deep`: #0a0a0a
   - `void-panel`: #141414
   - `white`: #ffffff
5. **CONSISTENCY** - Apply the same visual patterns across all components
6. **ACCESSIBILITY** - Ensure high contrast and clear visual hierarchy

---

**Reference Images:** Attach your visual reference screenshots here before starting implementation.

**Next Phase:** Phase V - Mobile-Specific Improvements
