# MODULAR MOBILE BOTTOM NAVIGATION - PRODUCT BRIEF

## Executive Summary
Extract and modularize the hardcoded Strava-style bottom navigation from `app/feed/mobile/page.tsx` into a reusable component that can be configured and applied across multiple mobile layouts. This will eliminate code duplication, ensure consistent UX across mobile pages, and simplify future navigation updates.

## Business Context

### Why This Feature Matters
- **Code Maintenance**: Current implementation has hardcoded navigation in individual pages, making updates error-prone
- **Consistency**: Different pages may have slightly different nav implementations, leading to UX inconsistencies
- **Scalability**: As more mobile pages are added (achievements, friends, notifications, etc.), each would need to duplicate the nav code

### User Problem It Solves
Users currently navigate across multiple mobile pages with potentially inconsistent bottom navigation behavior. This creates confusion when navigation elements differ slightly between pages.

### Expected User Value/Impact
- Seamless and consistent navigation experience across all mobile pages
- Faster page loads due to component reuse and better caching
- Easier to add new pages with proper navigation integration

## Requirements

### Functional Requirements
- Extract the Strava-style bottom navigation from `app/feed/mobile/page.tsx` (lines 118-168)
- Create a new configurable component: `components/layout/StravaMobileNav.tsx`
- Component must accept props to configure:
  - `navItems`: Array of navigation items (label, href, icon, badge, showAvatar)
  - `username`: User's username for avatar display (optional)
- Component must support the following nav item configurations:
  - **Icon-only items**: Standard navigation with icon + label
  - **Badge items**: Navigation items with "NEW" or other badges
  - **Avatar items**: Navigation items showing user avatar with first letter
- Component must match existing Strava-style design:
  - Glassmorphism background: `bg-void-deep/95 backdrop-blur-xl`
  - Fixed position at bottom: `fixed bottom-0 left-0 right-0`
  - Border top: `border-t border-white/10`
  - Mobile-only display: `md:hidden`
  - Z-index: `z-50`
- Active state styling:
  - Icon and label color: `text-system-cyan`
  - Inactive state: `text-white/50`
- Touch targets minimum 44px×44px (already met with current padding)
- Page bottom padding: Ensure content isn't hidden behind nav (already has `pb-20`)

### Non-Functional Requirements

#### Performance Targets
- Component must not cause unnecessary re-renders
- Use React.memo if appropriate for performance optimization
- Minimal bundle size impact

#### Accessibility Requirements
- All navigation links must have proper ARIA labels
- Keyboard navigation support (tab through items)
- Focus states visible
- Descriptive link text for screen readers

#### Cross-Platform Compatibility
- Mobile devices (320px - 768px) only
- Desktop should not show bottom nav (already `md:hidden`)
- Consistent behavior across iOS and Android

#### Design System Compliance
- Follow design system from `docs/initial-research/Frontend-guide.md`:
  - Dark mode only (zinc-950/void-deep background)
  - Cyan accent color (`text-system-cyan` / `#00FFFF`)
  - Glassmorphism with backdrop blur
  - Lucide React icons only
  - No external assets

## Technical Specification

### Database Schema Requirements
None required - this is a UI component only.

### API Endpoints Needed
None required - navigation only uses client-side routing.

### Frontend Components Required

#### 1. New Component: `components/layout/StravaMobileNav.tsx`
**Props Interface:**
```typescript
interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string; // Optional badge text (e.g., "NEW")
  showAvatar?: boolean; // Show user avatar instead of icon
}

interface StravaMobileNavProps {
  navItems: NavItem[];
  username?: string; // Required if any navItem has showAvatar=true
}
```

**Component Behavior:**
- Client component (needs `usePathname` hook)
- Fetches username from Supabase auth if not provided (for backward compatibility)
- Auto-detects active page using `usePathname()`
- Handles avatar display with first letter of username

#### 2. Component Refactor: Update Existing Pages
**Remove hard-coded nav from:**
- `app/feed/mobile/page.tsx` (lines 118-168)
- Future: `app/dashboard/page.tsx` (if mobile view has bottom nav)
- Future: `app/profile/[username]/page.tsx` (mobile view)

**Add component to:**
- `app/feed/mobile/page.tsx`
- Future: `app/dashboard/layout.tsx` (for all dashboard mobile pages)
- Future: `app/profile/layout.tsx` (for profile mobile pages)
- Future: `app/settings/layout.tsx` (for settings mobile pages)
- Future: `app/achievements/layout.tsx`
- Future: `app/friends/layout.tsx`
- Future: `app/notifications/layout.tsx`

### Third-Party Integrations
None - uses existing:
- Next.js `Link` component for routing
- Lucide React for icons
- Supabase auth client for username

## Dependencies

### What Must Be Built First
1. ✅ `app/feed/mobile/page.tsx` exists with hardcoded nav (source of truth)
2. ✅ `components/layout/MobileBottomNav.tsx` exists (reference for pattern, but different style)
3. ✅ Tailwind CSS configured with `system-cyan` color
4. ✅ Lucide React installed
5. ✅ Next.js App Router configured

### External Services Needed
- None (Supabase auth already integrated)

### Blocking Issues
None - this is a pure UI refactor with no backend dependencies.

## Implementation Strategy

### Phase 1: Component Creation (2-3 hours)
- Create `components/layout/StravaMobileNav.tsx`
- Define TypeScript interfaces for props
- Extract hardcoded navigation into configurable structure
- Implement component with proper TypeScript types
- Test component in isolation with sample props

### Phase 2: Integration (1-2 hours)
- Replace hardcoded nav in `app/feed/mobile/page.tsx`
- Verify visual match to original design
- Test navigation across all linked pages
- Ensure active states work correctly

### Phase 3: Documentation & Future Prep (30 min)
- Document component props and usage
- Create example configurations for different layouts
- Note which layouts will need this component in future work

### Timeline Estimates
- **Phase 1**: 2-3 hours (component creation)
- **Phase 2**: 1-2 hours (integration)
- **Phase 3**: 30 min (documentation)
- **Total**: 3.5-5.5 hours

### Risk Mitigation

#### Risk 1: Breaking Changes to Feed Page
- **Mitigation**: Keep original page as fallback, create new page with component
- **Fallback**: If integration fails, can revert to hardcoded version

#### Risk 2: TypeScript Type Errors
- **Mitigation**: Start with loose types, tighten incrementally
- **Validation**: Run `npm run typecheck` after each phase

#### Risk 3: Inconsistent Styling
- **Mitigation**: Use exact class names from hardcoded version
- **Verification**: Side-by-side comparison of old vs new

#### Risk 4: Username Not Available
- **Mitigation**: Fetch from Supabase auth if not provided as prop
- **Fallback**: Show "H" default avatar letter

## Success Criteria

### Measurable Criteria for Completion
- ✅ `components/layout/StravaMobileNav.tsx` created with full TypeScript types
- ✅ Component accepts `navItems` and optional `username` props
- ✅ Component supports icon-only, badge, and avatar nav items
- ✅ `app/feed/mobile/page.tsx` uses new component instead of hardcoded nav
- ✅ Visual match to original design (verified by screenshot comparison)
- ✅ Active/inactive states work correctly for all pages
- ✅ All navigation links function properly
- ✅ Component only shows on mobile (md:hidden works)

### Testing Checklist
- [ ] Component renders without errors
- [ ] All 4 nav items display correctly (Home, Feed with NEW badge, You with avatar, More)
- [ ] Active page highlighted in cyan
- [ ] Inactive pages in white/50
- [ ] Avatar shows first letter of username
- [ ] "NEW" badge displays on Feed item
- [ ] Navigation links work (clicking Home goes to /dashboard, etc.)
- [ ] Bottom padding prevents content overlap
- [ ] Nav hidden on desktop (md:hidden)
- [ ] Nav visible on mobile (768px and below)
- [ ] Keyboard navigation works (Tab key cycles through items)
- [ ] Focus states visible
- [ ] TypeScript compilation passes with zero errors
- [ ] No console errors or warnings

### Sign-off Requirements
- Visual verification: Screenshot of feed mobile page matches original
- Functional verification: All navigation items work correctly
- Code review: TypeScript types are correct and comprehensive
- Performance: No unnecessary re-renders detected (React DevTools)

## Edge Cases to Handle

### 1. Empty Username
- If username is empty string or undefined, show "H" in avatar

### 2. Missing Nav Item Props
- If required props missing, show console warning, render gracefully

### 3. Multiple Avatar Items
- Support multiple avatar items if needed (future-proofing)

### 4. Badge Overflow
- Handle long badge text with proper truncation or wrapping

### 5. Long Labels
- If label text is long, truncate or use ellipsis

### 6. Dynamic Nav Items
- Support for adding/removing nav items based on user permissions (future)
