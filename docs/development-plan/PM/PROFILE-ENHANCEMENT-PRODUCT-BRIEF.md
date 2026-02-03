# 📋 PROFILE PAGE ENHANCEMENT PRODUCT BRIEF
> **Document Type:** Product Brief
> **Version:** 1.0
> **Last Updated:** February 4, 2026
> **Priority:** P1 (Core Social Feature)
> **Status:** READY FOR DEVELOPMENT

---

## Executive Summary

Enhance the public profile page (`app/profile/[username]/page.tsx`) to provide a complete hunter profile experience. Currently, profile pages display basic stats and match history but are missing key personalization and social features that should be visible on the profile, not hidden in settings. This enhancement will improve user self-expression, social engagement, and overall profile completeness.

---

## Business Context

### User Problem
The current profile page is bare-bones - it shows stats and match history but lacks:
1. **Personalization** - Users can't express themselves (no bio, banner, social links)
2. **Social Context** - No indication of who this user is beyond stats
3. **Achievement Showcase** - Earned achievements are visible but not displayed
4. **Easy Profile Editing** - Profile fields are hidden in Settings page instead of being accessible from the profile

### User Value
- **Self-Expression** - Users can customize their profile with bio, banner, social links
- **Social Discovery** - Friends can see achievements, social connections, and learn about each other
- **Achievement Pride** - Users can showcase their earned achievements on their profile
- **Better UX** - Profile editing should be accessible from the profile page, not hidden in settings

### Expected Impact
- Increase profile page engagement by 40%
- Improve social connections (friend requests, profile views)
- Enhance sense of progression and achievement pride
- Reduce friction for profile customization (no need to navigate to settings)

---

## Requirements

### Functional Requirements

#### Must Have (P1)
| Requirement | Acceptance Criteria |
|-------------|-------------------|
| **Banner Image** | Display profile banner if `banner_url` exists (1920x480), fallback to gradient background |
| **Profile Bio** | Display user bio text (max 150 chars), empty state "No bio yet" |
| **Edit Profile Button** | View own profile: Show "Edit Profile" button that opens edit modal; View others' profile: Button hidden |
| **Share Profile Button** | Copy profile URL to clipboard, show toast "Profile link copied!" |
| **Achievement Badges** | Display grid of unlocked achievement badges (if any exist), show rarity color (common/rare/epic/legendary) |
| **Friends Preview** | Show 3-6 friend avatars with links to their profiles, empty state "No friends yet" |
| **Profile Info Modal** | When clicking "Edit Profile", show modal with: Display Name (50 chars), Bio (150 chars), Banner URL input, Save/Cancel buttons |
| **Social Links Section** | Display optional social links (Discord, Twitter, Steam) if provided in profile data |

#### Should Have (P1-P2)
| Requirement | Acceptance Criteria |
|-------------|-------------------|
| **Match History Filters** | Filter by quest type (Daily/Penalty/RankUp/Special), Filter by date range picker |
| **Match History Pagination** | Show 20 entries per page, Load More button for infinite scroll |
| **Achievement Details** | Click achievement to see description and unlock date |
| **Profile Stats Summary** | Show additional stats: Total playtime, Best streak, Quest completion rate |

#### Nice to Have (P2)
| Requirement | Acceptance Criteria |
|-------------|-------------------|
| **Profile Animations** | Smooth fade-in animations for profile elements |
| **Achievement Hover Effects** | Show achievement tooltip on hover |
| **Profile Theme Colors** | Allow users to choose accent color for their profile |

### Non-Functional Requirements

#### Performance
- Profile page must load within 2 seconds on 4G mobile
- Banner images must be lazy loaded
- Achievement badges must load progressively

#### Accessibility (ARIA)
- All profile elements must have proper ARIA labels
- Keyboard navigation must work for all interactive elements
- Focus indicators must be visible (2px minimum outline)

#### Design System Compliance
- Dark mode only (zinc-950 background)
- Neon Cyan (#00FFFF) accent color for interactions
- Rank colors: E(Gray) → D(White) → C(Cyan) → B(Blue) → A(Purple) → S(Gold)
- Glassmorphism cards for profile sections
- Mobile-first design (320px - 768px breakpoints)
- Touch targets minimum 44px × 44px

#### Responsive Design
- Mobile (< 768px): Single column, stacked layout
- Tablet (768px - 1024px): Two-column layout (stats + radar chart, match history)
- Desktop (> 1024px): Three-column layout (profile header, achievements, match history)

---

## Technical Specification

### Database Schema
The following columns already exist in the `profiles` table and should be used:

| Column | Type | Description |
|--------|------|-------------|
| `display_name` | text | Display name (max 50 chars) |
| `bio` | text | User bio (max 150 chars) |
| `banner_url` | text | URL to profile banner image |
| `social_links` | jsonb | `{ discord: "", twitter: "", steam: "" }` |

**No database migrations required** - columns already exist.

### API Endpoints

| Endpoint | Method | Purpose |
|----------|---------|---------|
| `getPublicProfile(username)` | Server Action | Fetch profile data (already exists in `server/actions/match-history-actions.ts`) |
| `updateProfileSettings(bio, display_name, banner_url, social_links)` | Server Action | Update profile fields (already exists in `server/actions/settings-actions.ts`) |
| `getUserAchievements(user_id)` | Server Action | Fetch user's unlocked achievements (needs to be created) |

### Frontend Components

#### New Components to Create
| Component | File Path | Purpose |
|-----------|-----------|---------|
| `ProfileBanner` | `components/profile/ProfileBanner.tsx` | Display profile banner with gradient fallback |
| `ProfileBio` | `components/profile/ProfileBio.tsx` | Display user bio with character count |
| `AchievementBadges` | `components/profile/AchievementBadges.tsx` | Grid of unlocked achievements with rarity colors |
| `FriendsPreview` | `components/profile/FriendsPreview.tsx` | Show 3-6 friend avatars |
| `EditProfileModal` | `components/profile/EditProfileModal.tsx` | Modal for editing profile fields |
| `ShareProfileButton` | `components/profile/ShareProfileButton.tsx` | Copy profile URL to clipboard |
| `SocialLinks` | `components/profile/SocialLinks.tsx` | Display optional social links |
| `MatchHistoryFilters` | `components/profile/MatchHistoryFilters.tsx` | Filter match history by type/date |

#### Existing Components to Reuse
| Component | Purpose |
|-----------|---------|
| `StatusWindow` | Radar chart for physique stats (strength/agility/stamina) |
| `RankBadge` | Display user rank (E-S) |
| `HunterStatusBadge` | Display hunter status (Normal/Verified/Flagged/Corrupted) |
| `MatchHistory` | Match history list (already exists) |
| `SystemButton` | Primary action button |
| `ReportButton` | Report user button |

### Third-Party Integrations
None required for this feature.

---

## Dependencies

### What Must Be Built First
| Dependency | Status | Notes |
|------------|--------|-------|
| `app/profile/[username]/page.tsx` | ✅ EXISTS | Has basic profile layout, needs enhancements |
| `server/actions/match-history-actions.ts` | ✅ EXISTS | `getPublicProfile` function works |
| `server/actions/settings-actions.ts` | ✅ EXISTS | `updateProfileSettings` function works |
| `achievements` table | ❌ EXISTS | Database table seeded but UI not implemented |
| `user_achievements` table | ❌ EXISTS | Database table exists but query not implemented |

### External Services Needed
None required.

### Blocking Issues
| Issue | Severity | Status |
|-------|-----------|--------|
| **Achievement UI not implemented** | ⚠️ P2 | Achievements database exists but no UI component yet - can defer to P2 |
| **Social feed has bugs** | 🚨 P0 | POST /feed 500 errors - should be fixed first (see BUG-HUNTER-PROMPT.md) |

---

## Implementation Strategy

### Phase 1: Profile Header Enhancements (P1)
**Objectives:**
- Add banner image with gradient fallback
- Add profile bio display
- Add social links display
- Add "Edit Profile" and "Share Profile" buttons

**Tasks:**
1. Create `ProfileBanner` component (gradient fallback, banner_url support)
2. Create `ProfileBio` component (display bio, show empty state)
3. Create `SocialLinks` component (Discord/Twitter/Steam icons)
4. Create `ShareProfileButton` component (copy URL to clipboard)
5. Update `app/profile/[username]/page.tsx` layout to include banner, bio, social links above stats
6. Add conditional rendering: Show "Edit Profile" button only if viewing own profile

**Deliverables:**
- Enhanced profile header with banner, bio, social links
- Edit and Share buttons in profile header

**Acceptance Criteria:**
- Banner displays if `banner_url` exists, otherwise shows gradient
- Bio displays with max 150 chars, empty state "No bio yet"
- Social links display with appropriate icons
- "Edit Profile" button opens edit modal (Phase 2)
- "Share Profile" button copies URL and shows toast

---

### Phase 2: Profile Editing Modal (P1)
**Objectives:**
- Create modal for editing profile fields
- Validate inputs (Display Name: 50 chars, Bio: 150 chars)
- Save changes via existing Server Action

**Tasks:**
1. Create `EditProfileModal` component with fields:
   - Display Name (text input, max 50 chars)
   - Bio (textarea, max 150 chars)
   - Banner URL (URL input)
   - Discord username (text input)
   - Twitter username (text input)
   - Steam profile URL (URL input)
2. Integrate with `updateProfileSettings` Server Action
3. Add character counters for text fields
4. Add validation (required fields, max length, URL format)
5. Add loading state while saving
6. Add success/error toasts

**Deliverables:**
- Functional profile editing modal
- Integration with existing Server Action

**Acceptance Criteria:**
- Modal opens when "Edit Profile" button clicked
- All fields are pre-populated with current profile data
- Character counters update in real-time
- "Save" button disabled while loading
- Success toast on save, error toast on failure
- Modal closes after successful save
- Profile page refreshes to show updated data

---

### Phase 3: Achievements Section (P1-P2)
**Objectives:**
- Display unlocked achievement badges on profile
- Show achievement rarity colors
- Handle empty state (no achievements unlocked)

**Tasks:**
1. Create Server Action `getUserAchievements(user_id)` in `server/actions/achievement-actions.ts` (or create new file)
2. Query `user_achievements` and `achievements` tables
3. Create `AchievementBadges` component (grid layout, rarity colors)
4. Add hover effects for achievements (tooltip with name, description, unlock date)
5. Handle empty state: "No achievements yet - complete quests to earn them!"

**Deliverables:**
- Achievement badges grid on profile
- Server Action for fetching achievements
- Achievement tooltip component

**Acceptance Criteria:**
- Achievements display in grid layout (responsive)
- Rarity colors: Common(gray), Rare(blue), Epic(purple), Legendary(gold)
- Hover shows achievement details
- Empty state displays helpful message
- Achievements load without errors even if database is empty

---

### Phase 4: Friends Preview Section (P1)
**Objectives:**
- Show 3-6 friend avatars on profile
- Link to friend profiles
- Handle empty state (no friends)

**Tasks:**
1. Create Server Action `getFriendPreviews(user_id)` that fetches friend profiles
2. Query `friends` table and join with `profiles` table
3. Limit to 6 friends (select from all friends or display most recent)
4. Create `FriendsPreview` component (circular avatars, links)
5. Handle empty state: "No friends yet - add friends to see them here!"

**Deliverables:**
- Friends preview section on profile
- Server Action for fetching friends
- Empty state handling

**Acceptance Criteria:**
- Displays 3-6 friend avatars (rounded-full)
- Clicking avatar navigates to friend's profile
- Empty state displays helpful message
- Friend avatars show rank badge overlay
- Hover effect on friend avatars (scale up, show username)

---

### Phase 5: Match History Filters (P1-P2)
**Objectives:**
- Add filters to match history section
- Filter by quest type (Daily/Penalty/RankUp/Special)
- Filter by date range (start date, end date)

**Tasks:**
1. Create `MatchHistoryFilters` component with:
   - Quest type dropdown (all/Daily/Penalty/RankUp/Special)
   - Date range picker (start date, end date)
   - "Reset Filters" button
2. Update `getPublicProfile` Server Action to accept filter parameters
3. Filter match_history results based on selected filters
4. Update `MatchHistory` component to accept filtered data
5. Add loading state when applying filters

**Deliverables:**
- Filter UI component
- Updated Server Action with filtering logic
- Filtered match history display

**Acceptance Criteria:**
- Quest type filter works correctly
- Date range filter works correctly
- "Reset Filters" button clears all filters
- Match history updates when filters change
- Loading state shows while fetching filtered results

---

### Phase 6: Mobile Optimization & Polish (P1)
**Objectives:**
- Ensure profile page is fully responsive
- Touch-friendly mobile interactions
- Smooth animations and transitions

**Tasks:**
1. Test profile page on mobile breakpoints (320px, 375px, 390px, 412px)
2. Ensure all touch targets are minimum 44px × 44px
3. Adjust layout for mobile (single column, stacked sections)
4. Add smooth fade-in animations for profile elements
5. Add hover effects for desktop (scale, shadow, color changes)
6. Ensure modal is fully responsive (full-screen on mobile)

**Deliverables:**
- Fully responsive profile page
- Mobile-optimized touch interactions
- Smooth animations and transitions

**Acceptance Criteria:**
- Profile page works on all mobile breakpoints
- All buttons and links have minimum 44px touch targets
- No horizontal scrolling on mobile
- Animations are smooth (60fps)
- Modal is usable on mobile (full-screen, easy to close)

---

## Workstream Coordination

### Frontend (FE Master Workstream)

#### What FE Master Will Build
- All new profile components listed in Technical Specification
- Enhanced `app/profile/[username]/page.tsx` layout
- Profile editing modal with form validation
- Achievement badges grid
- Friends preview section
- Match history filters
- Responsive layout and mobile optimization

#### Reference Materials Provided
- `app/profile/[username]/page.tsx` - Current profile page implementation
- `app/settings/page.tsx` - Settings page with profile fields (for reference)
- `components/profile/MatchHistory.tsx` - Existing match history component
- `components/gamification/RankBadge.tsx` - Rank badge component
- `server/actions/settings-actions.ts` - Existing Server Action for updating profile
- `docs/initial-research/Frontend-guide.md` - Design system guidelines
- `docs/development-plan/UI-Design-Plan.md` - Mobile UI specifics

#### Direction Needed
- Use existing Server Actions where possible (`updateProfileSettings` from `settings-actions.ts`)
- Follow design system: Dark mode only, Neon Cyan accent, glassmorphism cards
- Mobile-first approach: Ensure 44px minimum touch targets
- Lazy load banner images for performance
- Use toast notifications for user feedback (sonner)
- Use Framer Motion for animations (spring physics: stiffness: 400, damping: 30)

---

### Mobile UI/UX (Mobile UI/UX Developer Workstream)

#### What Mobile UI/UX Developer Will Refine
- Polish profile page layout and spacing
- Refine touch target sizes for mobile
- Improve loading states and skeleton screens
- Add subtle animations and micro-interactions
- Ensure profile modal is fully mobile-friendly

#### Refinement Specifications
- Profile header should have 16px padding on mobile
- Banner image should have aspect ratio 4:1 (1920x480)
- Achievement badges should be 64px × 64px on mobile
- Friend avatars should be 48px × 48px with rank badge overlay
- Modal should be full-screen on mobile (< 768px) with slide-up animation
- All inputs should have 44px minimum height on mobile

#### Polish Requirements
- Smooth fade-in animation for profile elements (staggered by 100ms)
- Subtle hover effects on desktop (scale: 1.02, shadow: 0 4px 12px rgba(0,0,0,0.3))
- Loading skeleton for achievements while fetching
- Empty states should have helpful messages and icons
- Profile share toast should use system notification sound

#### Accessibility Improvements
- All interactive elements must have ARIA labels
- Keyboard navigation must work for all buttons and inputs
- Focus indicators must be visible (2px solid Neon Cyan)
- Screen reader text for achievement icons

---

### Backend/Integration

#### Server Actions Needed
| Server Action | File Path | Status |
|--------------|-----------|--------|
| `getPublicProfile(username)` | `server/actions/match-history-actions.ts` | ✅ EXISTS |
| `updateProfileSettings(...)` | `server/actions/settings-actions.ts` | ✅ EXISTS |
| `getUserAchievements(user_id)` | NEW: `server/actions/profile-actions.ts` | ❌ NEEDS CREATION |
| `getFriendPreviews(user_id)` | NEW: `server/actions/profile-actions.ts` | ❌ NEEDS CREATION |

#### Database Migrations Needed
**NONE** - All required columns already exist in `profiles` table:
- `display_name` (text)
- `bio` (text)
- `banner_url` (text)
- `social_links` (jsonb)

Achievements tables exist but are not yet used:
- `achievements` table (seeded with achievement data)
- `user_achievements` table (tracks unlocked achievements)

---

## Quality Assurance

### Testing Strategy
| Test Type | Scope | Method |
|-----------|--------|--------|
| **Unit Tests** | NOT REQUIRED | Per docs/initial-research/rules-and-constraints.md |
| **Integration Tests** | Profile components | Manual testing |
| **E2E Tests** | Full profile flow | Manual testing |
| **Mobile Testing** | Responsive layout | Test on real devices or browser dev tools |

### Edge Cases to Verify
| Edge Case | Expected Behavior |
|-----------|-----------------|
| Profile with no banner | Show gradient fallback background |
| Profile with empty bio | Show empty state "No bio yet" |
| Profile with no friends | Show empty state "No friends yet" |
| Profile with no achievements | Show empty state "No achievements yet" |
| Profile with no social links | Don't display social links section |
| User views own profile | Show "Edit Profile" button |
| User views someone else's profile | Hide "Edit Profile" button |
| Banner URL is invalid | Show gradient fallback, log error |
| Achievement database is empty | Show empty state "No achievements yet" |
| Server Action fails | Show error toast, keep modal open |
| User tries to save empty display name | Disable "Save" button, show validation error |

### Performance Validation
- Profile page load time: < 2 seconds on 4G mobile
- Banner image load time: < 1 second (lazy loaded)
- Achievements fetch time: < 500ms (if cached)
- Modal open time: < 200ms (instant)
- Profile save time: < 1 second

### Accessibility Testing
- All elements are keyboard navigable (Tab, Enter, Escape)
- Screen reader announces profile sections correctly
- Focus indicators are visible on all interactive elements
- Color contrast meets WCAG AA standards (4.5:1)

### Cross-Browser Compatibility
- Chrome (Desktop & Mobile) ✅
- Firefox (Desktop & Mobile) ✅
- Safari (iOS & macOS) ✅
- Edge (Desktop) ✅

---

## Risk Mitigation

### Identified Risks

| Risk | Severity | Mitigation Strategy |
|------|-----------|-------------------|
| **Achievement UI not implemented** | ⚠️ MEDIUM | Defer to P2, show empty state if table is empty |
| **Social feed has 500 errors** | 🚨 HIGH | Fix social feed bugs first (see BUG-HUNTER-PROMPT.md) |
| **Profile modal not mobile-friendly** | ⚠️ MEDIUM | Use full-screen modal on mobile, test on real devices |
| **Banner image load times slow** | ⚠️ MEDIUM | Lazy load banner images, use responsive image sizes |
| **Achievement database empty** | ⚠️ LOW | Show helpful empty state, guide user to complete quests |

### Fallback Approaches
- If `getUserAchievements` Server Action fails, show empty state instead of crashing
- If `getFriendPreviews` Server Action fails, hide friends section instead of crashing
- If banner image fails to load, show gradient fallback instead of broken image
- If profile save fails, keep modal open and show error message

---

## Timeline & Milestones

### Overall Timeline
**Start Date:** February 4, 2026
**Target Completion:** February 5, 2026
**Estimated Effort:** 12-16 hours

### Phase Breakdown
| Phase | Tasks | Est. Time | Dependencies |
|-------|-------|------------|--------------|
| **Phase 1** | Profile header enhancements (banner, bio, social links, buttons) | 2-3 hours | None |
| **Phase 2** | Profile editing modal | 3-4 hours | Phase 1 |
| **Phase 3** | Achievements section | 2-3 hours | None (can defer to P2) |
| **Phase 4** | Friends preview section | 2-3 hours | None |
| **Phase 5** | Match history filters | 1-2 hours | P1-P2 (can defer) |
| **Phase 6** | Mobile optimization & polish | 2 hours | All phases |

### Milestones
| Milestone | Date | Success Criteria |
|-----------|------|-----------------|
| **M1: Profile Header Complete** | Feb 4 | Banner, bio, social links, edit/share buttons functional |
| **M2: Profile Editing Complete** | Feb 4 | Modal works, saves changes, updates profile |
| **M3: Achievements Complete** | Feb 5 | Achievement badges display correctly (P2 optional) |
| **M4: Mobile Optimization Complete** | Feb 5 | Profile page fully responsive, mobile-friendly |

### Dependencies
| Dependency | Description | Status |
|------------|-------------|--------|
| **Database migrations** | Columns already exist, no migrations needed | ✅ NO ACTION |
| **Achievement UI** | Achievement database seeded, UI not implemented | ⚠️ DEFER TO P2 |
| **Social feed bugs** | POST /feed 500 errors | 🚨 MUST FIX FIRST |
| **Server Actions** | Need to create `getUserAchievements` and `getFriendPreviews` | ❌ NEEDS CREATION |

---

## Success Criteria

### Measurable Criteria for Completion

#### Must-Have (P1) - All Required
✅ Profile banner displays if `banner_url` exists, otherwise shows gradient fallback
✅ Profile bio displays with max 150 chars, empty state "No bio yet"
✅ "Edit Profile" button opens modal with Display Name, Bio, Banner URL, Social Links
✅ Profile save works via `updateProfileSettings` Server Action
✅ "Share Profile" button copies URL to clipboard and shows toast
✅ Social links display if provided in profile data
✅ Profile page fully responsive (mobile, tablet, desktop)
✅ All touch targets minimum 44px × 44px on mobile
✅ Modal is full-screen on mobile with slide-up animation
✅ Profile page loads within 2 seconds on 4G mobile

#### Should-Have (P1-P2) - Most Required
✅ Achievement badges display with rarity colors (common/rare/epic/legendary)
✅ Friends preview shows 3-6 friend avatars
✅ Match history can be filtered by quest type and date range
✅ Empty states display helpful messages
✅ Smooth fade-in animations for profile elements

#### Nice-to-Have (P2) - Optional
⭕ Achievement hover tooltips show description and unlock date
⭕ Profile page has theme color options
⭕ Match history has pagination/infinite scroll
⭕ Profile has additional stats (total playtime, best streak, completion rate)

---

## Testing Checklist

### Manual Testing Steps

#### Profile Header
- [ ] Banner displays if `banner_url` exists
- [ ] Gradient fallback displays if no `banner_url`
- [ ] Bio displays with text (max 150 chars)
- [ ] Empty bio shows "No bio yet"
- [ ] Social links display with correct icons
- [ ] Social links navigate to correct URLs
- [ ] "Edit Profile" button shows on own profile
- [ ] "Edit Profile" button hidden on others' profiles
- [ ] "Share Profile" button copies URL to clipboard
- [ ] Toast notification shows "Profile link copied!"

#### Profile Editing Modal
- [ ] Modal opens when "Edit Profile" button clicked
- [ ] Modal closes when clicking "Cancel" or outside
- [ ] All fields pre-populated with current data
- [ ] Character counters update in real-time
- [ ] "Save" button disabled while loading
- [ ] Success toast shows on successful save
- [ ] Error toast shows on failed save
- [ ] Profile page refreshes after successful save
- [ ] Modal closes after successful save
- [ ] Modal is full-screen on mobile (< 768px)

#### Achievements Section
- [ ] Achievement badges display in grid layout
- [ ] Rarity colors are correct (Common: gray, Rare: blue, Epic: purple, Legendary: gold)
- [ ] Hover shows achievement tooltip (name, description, unlock date)
- [ ] Empty state shows "No achievements yet"
- [ ] Achievements load without errors if database is empty

#### Friends Preview
- [ ] Friends preview shows 3-6 friend avatars
- [ ] Friend avatars are circular with rank badge overlay
- [ ] Clicking friend avatar navigates to friend's profile
- [ ] Empty state shows "No friends yet"
- [ ] Hover effect scales up friend avatar

#### Match History Filters
- [ ] Quest type dropdown shows all options
- [ ] Quest type filter works correctly
- [ ] Date range picker works correctly
- [ ] "Reset Filters" button clears all filters
- [ ] Match history updates when filters change
- [ ] Loading state shows while fetching filtered results

#### Mobile Responsiveness
- [ ] Profile page works on 320px breakpoint
- [ ] Profile page works on 375px breakpoint
- [ ] Profile page works on 390px breakpoint
- [ ] Profile page works on 412px breakpoint
- [ ] No horizontal scrolling on mobile
- [ ] All buttons have minimum 44px × 44px touch targets
- [ ] Modal is full-screen on mobile
- [ ] Modal close button is easily accessible

---

## Sign-off Requirements

### FE Master Sign-off
- [ ] All new profile components created and functional
- [ ] Profile page fully integrated with all features
- [ ] Server Actions created and tested
- [ ] Code follows existing patterns and conventions
- [ ] TypeScript strict mode enabled (no `any` types)
- [ ] Dark mode only (no light mode)
- [ ] No external assets (CSS/SVG/Lucide only)

### Mobile UI/UX Developer Sign-off
- [ ] Profile page fully responsive
- [ ] All touch targets minimum 44px × 44px
- [ ] Animations are smooth and performant
- [ ] Modal is fully mobile-friendly
- [ ] Empty states are helpful and visually clear
- [ ] Loading states are visible and informative

### QA Sign-off
- [ ] All acceptance criteria met
- [ ] All edge cases tested and verified
- [ ] Performance targets met
- [ ] Accessibility requirements met
- [ ] Cross-browser compatibility verified
- [ ] Mobile device testing completed

---

## Appendix

### A. Existing Database Schema

```sql
-- profiles table columns used for profile enhancements
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT, -- NEW: Display name (max 50 chars)
  bio TEXT, -- NEW: User bio (max 150 chars)
  banner_url TEXT, -- NEW: URL to profile banner image
  social_links JSONB DEFAULT '{}', -- NEW: { discord: "", twitter: "", steam: "" }
  -- ... other columns
);
```

### B. Achievement Rarity Colors

| Rarity | Color | Tailwind Class |
|--------|-------|----------------|
| Common | Gray | `text-gray-400 bg-gray-400/20` |
| Rare | Blue | `text-blue-400 bg-blue-400/20` |
| Epic | Purple | `text-purple-400 bg-purple-400/20` |
| Legendary | Gold | `text-yellow-400 bg-yellow-400/20` |

### C. Social Links Icons

| Platform | Icon | URL Format |
|----------|-------|------------|
| Discord | `Discord` icon from lucide-react | `https://discord.com/users/{username}` |
| Twitter | `Twitter` icon from lucide-react | `https://twitter.com/{username}` |
| Steam | `Gamepad2` icon from lucide-react | `https://steamcommunity.com/id/{username}` |

### D. Toast Notification Examples

```typescript
// Success toast
toast.success("Profile updated successfully!");

// Error toast
toast.error("Failed to update profile. Please try again.");

// Share toast
toast.success("Profile link copied to clipboard!");
```

---

*Document Version: 1.0*
*Product: ASCEND: FITNESS RPG*
*Status: Ready for Development*
*Last Updated: February 4, 2026*
