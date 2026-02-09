# MODULAR MOBILE BOTTOM NAVIGATION - DEVELOPMENT PLAN

## Overview
Extract hardcoded Strava-style bottom navigation into reusable component and integrate into mobile layouts. Priority: P1 (Core UX improvement). Estimated timeline: 3.5-5.5 hours.

## Implementation Phases

### Phase 1: Component Creation
**Objectives:**
- Create `components/layout/StravaMobileNav.tsx`
- Define TypeScript interfaces for props
- Extract navigation logic from hardcoded implementation
- Implement component with full TypeScript types

**Tasks Breakdown:**
1. Create new file `components/layout/StravaMobileNav.tsx`
2. Define `NavItem` interface with fields:
   - `id: string`
   - `href: string`
   - `label: string`
   - `icon: LucideIcon`
   - `badge?: string`
   - `showAvatar?: boolean`
3. Define `StravaMobileNavProps` interface with:
   - `navItems: NavItem[]`
   - `username?: string`
4. Extract class names from hardcoded nav in `app/feed/mobile/page.tsx` (lines 118-168)
5. Implement component logic:
   - Use `usePathname()` to detect active page
   - Fetch username from Supabase if not provided
   - Render nav items with conditional rendering for badge/avatar
6. Add React.memo for performance optimization

**Deliverables:**
- ✅ `components/layout/StravaMobileNav.tsx` file created
- ✅ TypeScript interfaces defined
- ✅ Component functional with all features

**Acceptance Criteria:**
- Component renders without errors
- TypeScript compilation passes
- Component accepts props correctly
- No console warnings or errors

### Phase 2: Integration
**Objectives:**
- Replace hardcoded nav in `app/feed/mobile/page.tsx`
- Verify visual and functional match to original
- Test all navigation links

**Tasks Breakdown:**
1. Remove hardcoded nav from `app/feed/mobile/page.tsx` (lines 118-168)
2. Define `navItems` array for feed page configuration:
   ```typescript
   const navItems = [
     {
       id: "home",
       href: "/dashboard",
       label: "Home",
       icon: Home,
     },
     {
       id: "feed",
       href: "/feed",
       label: "Feed",
       icon: Radio,
       badge: "NEW",
     },
     {
       id: "profile",
       href: `/profile/${username}`,
       label: "You",
       icon: User,
       showAvatar: true,
     },
     {
       id: "settings",
       href: "/settings",
       label: "More",
       icon: Plus,
     },
   ];
   ```
3. Import and render `StravaMobileNav` component in page
4. Remove unused imports (Radio, Plus, Home, Link, cn)
5. Test navigation by clicking each nav item
6. Verify active state highlighting works

**Deliverables:**
- ✅ `app/feed/mobile/page.tsx` refactored to use component
- ✅ All navigation links functional
- ✅ Visual match to original design

**Acceptance Criteria:**
- Page renders without errors
- Nav displays identically to original design
- All 4 nav items clickable and navigate correctly
- Active state shows cyan color for current page
- "NEW" badge displays on Feed item
- Avatar shows first letter of username

### Phase 3: Documentation & Future Prep
**Objectives:**
- Document component usage
- Create example configurations
- Note future integration points

**Tasks Breakdown:**
1. Add JSDoc comments to component explaining props and usage
2. Create usage example in component file (as comment)
3. Create example configurations for different layouts:
   - Dashboard layout (standard nav)
   - Profile layout (profile-focused nav)
   - Settings layout (settings-focused nav)
4. Note in this development plan which layouts will need integration:
   - `app/dashboard/layout.tsx` - Phase II (next sprint)
   - `app/profile/layout.tsx` - Phase II (next sprint)
   - `app/settings/layout.tsx` - Phase II (next sprint)
   - `app/achievements/layout.tsx` - Phase III
   - `app/friends/layout.tsx` - Phase III
   - `app/notifications/layout.tsx` - Phase III

**Deliverables:**
- ✅ Component documented with JSDoc
- ✅ Usage examples created
- ✅ Future integration points documented

**Acceptance Criteria:**
- Component has clear documentation
- Examples are easy to follow
- Future work is clearly identified

## Workstream Coordination

### Frontend (FE Master Workstream)

**What FE Master Will Build:**
1. New component: `components/layout/StravaMobileNav.tsx`
2. Refactor: `app/feed/mobile/page.tsx` to use new component
3. Documentation: JSDoc comments and usage examples

**Reference Materials Provided:**
- Original hardcoded nav code: `app/feed/mobile/page.tsx` lines 118-168
- Existing nav component: `components/layout/MobileBottomNav.tsx` (for pattern reference)
- Design system: `docs/initial-research/Frontend-guide.md`
- Product brief: `docs/development-plan/PM/MODULAR-MOBILE-NAV-PRODUCT-BRIEF.md`

**Direction Needed:**
1. Use exact class names from hardcoded version for visual match
2. Maintain Strava-style design: glassmorphism, bottom fixed, mobile-only
3. Support three nav item types: icon-only, badge, avatar
4. Use TypeScript strict mode - no `any` types
5. Follow existing component patterns (see `MobileBottomNav.tsx`)
6. Keep imports minimal - only what's needed
7. Ensure component only shows on mobile (`md:hidden`)

### Mobile UI/UX (Mobile UI/UX Developer Workstream)

**What Mobile UI/UX Developer Will Refine:**
- Phase II: After initial integration, refine spacing and touch targets
- Phase III: Test on actual mobile devices (iOS and Android)
- Phase IV: Optimize animations and transitions

**Refinement Specifications:**
- Phase II will specify exact padding adjustments if needed
- Phase III will provide feedback on real-device behavior
- Phase IV will suggest animation improvements

**Polish Requirements:**
- Ensure touch targets are minimum 44px×44px (already met)
- Verify smooth transitions between pages
- Test on multiple screen sizes (320px, 375px, 414px, 768px)
- Verify keyboard navigation works properly

**Mobile-Specific Requirements:**
- Test on iOS Safari
- Test on Android Chrome
- Verify safe area handling on devices with notches
- Test landscape mode (though nav shouldn't rotate)

### Backend/Integration
**Server Actions Needed:**
- None - this is client-side only component

**Database Migrations Needed:**
- None - no database changes required

**API Integrations:**
- None - uses existing Supabase auth client for username fetch

## Quality Assurance

### Testing Strategy
1. **Manual Testing:**
   - Test all 4 navigation items
   - Test active state highlighting
   - Test on multiple mobile screen sizes
   - Test keyboard navigation
2. **Type Checking:**
   - Run `npm run typecheck` to ensure zero TypeScript errors
3. **Visual Regression:**
   - Compare screenshots of old vs new implementation
   - Ensure pixel-perfect match to original design

### Edge Cases to Verify
1. Empty username shows "H" in avatar
2. Long badge text displays correctly
3. Active state persists when navigating back
4. Component re-renders efficiently (use React DevTools)
5. No console errors or warnings

### Performance Validation
- Component should not cause unnecessary re-renders
- Bundle size impact should be minimal (< 1KB gzipped)
- Render time should be < 16ms (60fps)

### Accessibility Testing
- All links have descriptive labels
- Keyboard navigation works (Tab, Enter/Space)
- Focus states are visible
- Screen reader announces link destinations correctly
- Touch targets are minimum 44px×44px

## Risk Mitigation

### Identified Risks

#### Risk 1: Visual Mismatch to Original Design
- **Impact**: Medium - users may notice slight differences
- **Probability**: Low - using exact class names from original
- **Mitigation**: Side-by-side screenshot comparison before committing
- **Fallback**: Keep original page as backup until verified

#### Risk 2: TypeScript Type Errors
- **Impact**: Low - will break build but easy to fix
- **Probability**: Medium - complex prop types
- **Mitigation**: Start with loose types, tighten incrementally
- **Fallback**: Use `as any` temporarily (document for cleanup)

#### Risk 3: Breaking Navigation Links
- **Impact**: High - users cannot navigate
- **Probability**: Low - using Next.js Link component
- **Mitigation**: Test all links manually after integration
- **Fallback**: Hardcode hrefs if dynamic username fails

#### Risk 4: Performance Degradation
- **Impact**: Medium - slower page loads
- **Probability**: Low - simple component, minimal state
- **Mitigation**: Use React.memo, useEffect with empty deps
- **Fallback**: Remove React.memo if it causes issues

### Fallback Approaches
1. If component extraction fails, keep hardcoded nav in feed page
2. If TypeScript types cause issues, use looser types temporarily
3. If username fetch fails, hardcode "H" as avatar letter
4. If styling doesn't match, reference exact class names from original

## Timeline & Milestones

### Start Date
February 4, 2026 (immediate)

### Key Milestones
- **Milestone 1 (2 hours)**: Component created with TypeScript types
- **Milestone 2 (4 hours)**: Integration into feed page complete
- **Milestone 3 (4.5 hours)**: Documentation complete

### Target Completion
February 4, 2026 (same day - < 6 hours total)

### Dependencies
- None - can start immediately

### Future Integration Points (Phased)

**Phase II - Next Sprint (P1 Priority):**
- `app/dashboard/layout.tsx` - Standard nav configuration
- `app/profile/layout.tsx` - Profile-focused configuration
- `app/settings/layout.tsx` - Settings-focused configuration

**Phase III - Following Sprint (P1 Priority):**
- `app/achievements/layout.tsx` - Achievements nav configuration
- `app/friends/layout.tsx` - Friends nav configuration
- `app/notifications/layout.tsx` - Notifications nav configuration

**Phase IV - Later Sprint (P2 Priority):**
- Add haptic feedback on tap
- Add swipe gestures for nav item switching
- Add long-press shortcuts for quick actions

## Component Configuration Examples

### Feed Mobile Page Configuration (Phase 2)
```typescript
import { StravaMobileNav } from "@/components/layout/StravaMobileNav";
import { Home, Radio, User, Plus } from "lucide-react";

const navItems = [
  {
    id: "home",
    href: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    id: "feed",
    href: "/feed",
    label: "Feed",
    icon: Radio,
    badge: "NEW",
  },
  {
    id: "profile",
    href: `/profile/${username}`,
    label: "You",
    icon: User,
    showAvatar: true,
  },
  {
    id: "settings",
    href: "/settings",
    label: "More",
    icon: Plus,
  },
];

<StravaMobileNav navItems={navItems} username={username} />
```

### Dashboard Layout Configuration (Phase II - Future)
```typescript
import { StravaMobileNav } from "@/components/layout/StravaMobileNav";
import { Home, Radio, Trophy, User } from "lucide-react";

const navItems = [
  {
    id: "home",
    href: "/dashboard",
    label: "Activity",
    icon: Home,
  },
  {
    id: "feed",
    href: "/feed",
    label: "Feed",
    icon: Radio,
  },
  {
    id: "leaderboard",
    href: "/dashboard/leaderboard",
    label: "Rankings",
    icon: Trophy,
  },
  {
    id: "profile",
    href: "/profile/me",
    label: "You",
    icon: User,
    showAvatar: true,
  },
];

<StravaMobileNav navItems={navItems} username={username} />
```

### Profile Layout Configuration (Phase II - Future)
```typescript
import { StravaMobileNav } from "@/components/layout/StravaMobileNav";
import { Home, Radio, User, Settings } from "lucide-react";

const navItems = [
  {
    id: "home",
    href: "/dashboard",
    label: "Home",
    icon: Home,
  },
  {
    id: "feed",
    href: "/feed",
    label: "Feed",
    icon: Radio,
  },
  {
    id: "profile",
    href: "/profile/me",
    label: "You",
    icon: User,
    showAvatar: true,
  },
  {
    id: "settings",
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

<StravaMobileNav navItems={navItems} username={username} />
```

## Sign-Off Requirements

### Before Completion
- [ ] TypeScript compilation passes with zero errors
- [ ] No console errors or warnings in browser
- [ ] All navigation links functional
- [ ] Visual match to original design (verified by screenshots)
- [ ] Component documented with JSDoc
- [ ] Usage examples created

### After Completion
- [ ] Report filed in `./docs/reports/FE/` with screenshots
- [ ] Product brief updated with completion status
- [ ] PROJECT-CONTEXT.md updated with new component
- [ ] Ready for Mobile UI/UX Developer refinement (Phase II)

## Notes for FE Master

1. **Strict TypeScript**: Use proper types, no `any`. If stuck, use `unknown` and type guards.
2. **Exact Class Names**: Copy class names exactly from original hardcoded nav for visual match.
3. **Minimal Imports**: Only import what's used. Remove unused imports after refactoring.
4. **Component Placement**: Place in `components/layout/` directory with other layout components.
5. **Client Component**: Must be client component because it uses `usePathname()` hook.
6. **React.memo**: Consider wrapping component in React.memo if performance testing shows re-renders.
7. **Error Handling**: Add try-catch around username fetch for graceful fallback.
8. **Testing Priority**: Test on multiple mobile screen sizes (use Chrome DevTools device toolbar).

## Handoff to Mobile UI/UX Developer

After FE Master completes this work, Mobile UI/UX Developer will:
1. Test on real mobile devices (iOS Safari, Android Chrome)
2. Refine spacing and touch targets if needed
3. Optimize animations and transitions
4. Ensure accessibility standards are met

Mobile UI/UX Developer will report findings in `./docs/reports/FE/` with:
- Real-device testing screenshots
- Spacing adjustments recommendations
- Performance metrics
- Accessibility audit results
