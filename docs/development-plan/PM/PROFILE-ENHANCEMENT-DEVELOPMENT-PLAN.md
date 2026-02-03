# 📋 PROFILE PAGE ENHANCEMENT DEVELOPMENT PLAN
> **Document Type:** Development Plan
> **Version:** 1.0
> **Last Updated:** February 4, 2026
> **Priority:** P1 (Core Social Feature)
> **Estimated Timeline:** 12-16 hours (Feb 4-5, 2026)

---

## Overview

### Feature Summary
Enhance the public profile page (`app/profile/[username]/page.tsx`) to provide a complete hunter profile experience with banner image, profile bio, achievements, friends preview, profile editing modal, and match history filters. This addresses the current limitation where profile personalization is hidden in settings instead of being accessible from the profile page itself.

### Priority Level
**P1 - Core Social Feature**
- Critical for user self-expression and social engagement
- Directly impacts profile page completion and usability
- No external dependencies required

### Estimated Timeline
- **Start:** February 4, 2026
- **Target Completion:** February 5, 2026
- **Effort:** 12-16 hours (broken down into 6 phases)

---

## Implementation Phases

### Phase 1: Profile Header Enhancements (P1)

**Objectives:**
- Add banner image with gradient fallback
- Add profile bio display
- Add social links display
- Add "Edit Profile" and "Share Profile" buttons

**Tasks Breakdown:**
1. Create `components/profile/ProfileBanner.tsx`
   - Accept `banner_url` prop
   - Display banner image if provided
   - Show gradient fallback if no banner (zinc-900 to zinc-800)
   - Lazy load image for performance
   - Dimensions: Aspect ratio 4:1 (1920×480), height: 200px on mobile, 300px on desktop

2. Create `components/profile/ProfileBio.tsx`
   - Accept `bio` prop (string, max 150 chars)
   - Display bio text with proper typography
   - Show empty state: "No bio yet" (with Edit icon hint)
   - Character count: Not needed (display only)

3. Create `components/profile/SocialLinks.tsx`
   - Accept `socialLinks` prop (object: { discord, twitter, steam })
   - Display icons using lucide-react: `Discord`, `Twitter`, `Gamepad2`
   - Link to correct URLs:
     - Discord: `https://discord.com/users/{username}`
     - Twitter: `https://twitter.com/{username}`
     - Steam: `https://steamcommunity.com/id/{username}`
   - Handle empty state: Don't render if no social links provided

4. Create `components/profile/ShareProfileButton.tsx`
   - Copy current profile URL to clipboard
   - Show toast: "Profile link copied to clipboard!"
   - Use `clipboard` API
   - Fallback: `navigator.clipboard.writeText(window.location.href)`

5. Update `app/profile/[username]/page.tsx` layout
   - Add ProfileBanner at top of profile
   - Add ProfileBio below banner
   - Add SocialLinks below bio (if provided)
   - Add "Edit Profile" button in profile header (only if viewing own profile)
   - Add "Share Profile" button in profile header
   - Update existing stats section to fit below new header

6. Implement conditional rendering
   - Show "Edit Profile" button if `profile.id === current_user_id`
   - Hide "Edit Profile" button if viewing someone else's profile
   - Get current user ID from Supabase auth session

**Deliverables:**
- ✅ `components/profile/ProfileBanner.tsx` - Banner display component
- ✅ `components/profile/ProfileBio.tsx` - Bio display component
- ✅ `components/profile/SocialLinks.tsx` - Social links display component
- ✅ `components/profile/ShareProfileButton.tsx` - Share button component
- ✅ Updated `app/profile/[username]/page.tsx` - Profile header with banner, bio, social links, edit/share buttons

**Acceptance Criteria:**
- Banner displays if `banner_url` exists, otherwise shows gradient fallback
- Banner aspect ratio is 4:1 (1920×480)
- Banner image is lazy loaded
- Bio displays with max 150 chars
- Empty bio shows "No bio yet"
- Social links display with correct icons and URLs
- Social links don't render if none provided
- "Edit Profile" button shows only when viewing own profile
- "Share Profile" button copies URL to clipboard
- Toast notification shows "Profile link copied to clipboard!"
- Profile header layout is responsive (mobile: single column, desktop: banner full width)

---

### Phase 2: Profile Editing Modal (P1)

**Objectives:**
- Create modal for editing profile fields
- Validate inputs (Display Name: 50 chars, Bio: 150 chars)
- Save changes via existing Server Action

**Tasks Breakdown:**
1. Create `components/profile/EditProfileModal.tsx`
   - Modal component with glassmorphism styling
   - Fields to edit:
     - Display Name (text input, max 50 chars)
     - Bio (textarea, max 150 chars)
     - Banner URL (URL input)
     - Discord username (text input)
     - Twitter username (text input)
     - Steam profile URL (URL input)
   - Character counters for Display Name and Bio
   - Save and Cancel buttons
   - Loading state while saving
   - Full-screen on mobile (< 768px)
   - Slide-up animation on mobile open

2. Integrate with existing Server Action
   - Import `updateProfileSettings` from `server/actions/settings-actions.ts`
   - Call on Save button click with:
     ```typescript
     await updateProfileSettings({
       bio: profileForm.bio,
       display_name: profileForm.displayName,
       banner_url: profileForm.bannerUrl,
       social_links: {
         discord: profileForm.discord,
         twitter: profileForm.twitter,
         steam: profileForm.steam,
       },
     });
     ```
   - Handle success: Show toast, close modal, refresh page
   - Handle error: Show error toast, keep modal open

3. Add input validation
   - Display Name: Required, max 50 chars, no special characters
   - Bio: Optional, max 150 chars
   - Banner URL: Optional, validate URL format
   - Discord/Twitter/Steam: Optional, no validation needed
   - Disable "Save" button if Display Name is empty
   - Disable "Save" button if validation fails

4. Add real-time character counters
   - Display Name: Show "X/50" characters
   - Bio: Show "X/150" characters
   - Update on every input change
   - Show warning color (yellow) at 90% capacity
   - Show error color (red) at 100% capacity

5. Add loading state
   - Disable "Save" button while API call is in progress
   - Show loading spinner or text "Saving..."
   - Disable "Cancel" button while loading (optional, to prevent data loss)

6. Add toast notifications
   - Success toast: "Profile updated successfully!"
   - Error toast: "Failed to update profile. Please try again."
   - Use `sonner` library for toasts

7. Add modal state management
   - Open modal when "Edit Profile" button clicked
   - Close modal when "Cancel" button clicked
   - Close modal when clicking outside modal backdrop
   - Close modal on Escape key press

**Deliverables:**
- ✅ `components/profile/EditProfileModal.tsx` - Profile editing modal with all fields, validation, and integration

**Acceptance Criteria:**
- Modal opens when "Edit Profile" button clicked
- Modal closes when clicking "Cancel", outside backdrop, or pressing Escape
- All fields are pre-populated with current profile data
- Character counters update in real-time for Display Name (X/50) and Bio (X/150)
- "Save" button disabled while loading
- "Save" button disabled if Display Name is empty
- "Save" button disabled if URL validation fails
- Success toast shows on successful save
- Error toast shows on failed save
- Modal closes after successful save
- Profile page refreshes to show updated data
- Modal is full-screen on mobile (< 768px)
- Modal has slide-up animation on mobile open

---

### Phase 3: Achievements Section (P1-P2)

**Objectives:**
- Display unlocked achievement badges on profile
- Show achievement rarity colors
- Handle empty state (no achievements unlocked)

**Tasks Breakdown:**
1. Create Server Action `getUserAchievements` in `server/actions/profile-actions.ts` (NEW FILE)
   - Accept `user_id` parameter
   - Query `user_achievements` and `achievements` tables:
     ```typescript
     const { data } = await supabase
       .from("user_achievements")
       .select(`
         unlocked_at,
         achievements (
           id,
           name,
           description,
           icon,
           rarity
         )
       `)
       .eq("user_id", user_id)
       .order("unlocked_at", { ascending: false });
     ```
   - Return array of achievements with user data
   - Handle empty result gracefully

2. Create `components/profile/AchievementBadges.tsx`
   - Accept `achievements` prop (array of achievement objects)
   - Display in grid layout (responsive: 2 columns mobile, 4 columns desktop)
   - Each badge shows:
     - Icon (64px × 64px)
     - Rarity color (background and border)
     - Hover effect (scale up, show tooltip)
   - Rarity colors:
     - Common: `bg-gray-400/20 border-gray-400`
     - Rare: `bg-blue-400/20 border-blue-400`
     - Epic: `bg-purple-400/20 border-purple-400`
     - Legendary: `bg-yellow-400/20 border-yellow-400`

3. Create achievement tooltip component
   - Show on hover: achievement name, description, unlock date
   - Position: Above or below badge
   - Animation: Fade in on hover
   - Z-index: High to appear above other elements

4. Handle empty state
   - If `achievements` array is empty or undefined, show:
     - Empty state message: "No achievements yet"
     - Subtext: "Complete quests to earn achievements!"
     - Icon: Trophy or Badge icon from lucide-react
   - Style: Center-aligned, muted text

5. Handle loading state
   - Show skeleton loader while fetching achievements
   - Create `components/loading/AchievementSkeleton.tsx`
   - Display 4-6 skeleton badges in grid

6. Integrate into profile page
   - Fetch achievements in `app/profile/[username]/page.tsx`:
     ```typescript
     const achievements = await getUserAchievements(profile.id);
     ```
   - Pass achievements to `AchievementBadges` component
   - Position: Below stats section, before match history

**Deliverables:**
- ✅ `server/actions/profile-actions.ts` - NEW FILE with `getUserAchievements` function
- ✅ `components/profile/AchievementBadges.tsx` - Achievement badges grid
- ✅ `components/loading/AchievementSkeleton.tsx` - Loading skeleton
- ✅ Updated `app/profile/[username]/page.tsx` - With achievements section

**Acceptance Criteria:**
- Achievements display in grid layout (2 columns mobile, 4 columns desktop)
- Rarity colors are correct (Common: gray, Rare: blue, Epic: purple, Legendary: gold)
- Hover shows achievement tooltip (name, description, unlock date)
- Empty state displays "No achievements yet" with helpful message
- Loading skeleton shows while fetching
- Achievements load without errors even if database is empty
- Achievement badges are 64px × 64px with border
- Tooltip has proper z-index to appear above other elements

---

### Phase 4: Friends Preview Section (P1)

**Objectives:**
- Show 3-6 friend avatars on profile
- Link to friend profiles
- Handle empty state (no friends)

**Tasks Breakdown:**
1. Create Server Action `getFriendPreviews` in `server/actions/profile-actions.ts`
   - Accept `user_id` parameter
   - Query `friends` table and join with `profiles`:
     ```typescript
     const { data } = await supabase
       .from("friends")
       .select(`
         friend_id,
         profiles!friend_id (
           id,
           username,
           display_name,
           avatar_url,
           rank_tier,
           class
         )
       `)
       .or(`user_id.eq.${user_id},friend_id.eq.${user_id}`)
       .limit(6)
       .order("created_at", { ascending: false });
     ```
   - Return array of friend profiles
   - Handle empty result gracefully

2. Create `components/profile/FriendsPreview.tsx`
   - Accept `friends` prop (array of friend profile objects)
   - Display in horizontal row layout (responsive: wrap on mobile)
   - Each friend card shows:
     - Circular avatar (48px × 48px)
     - Rank badge overlay (small, bottom-right of avatar)
     - Link to friend's profile
     - Hover effect: Scale up (1.1), show username tooltip
   - Limit: Show up to 6 friends
   - Handle empty state: "No friends yet", subtext "Add friends to see them here!"

3. Add friend avatar links
   - Each avatar is wrapped in Link component:
     ```typescript
     <Link href={`/profile/${friend.username}`}>
       <FriendAvatar />
     </Link>
     ```

4. Handle empty state
   - If `friends` array is empty or undefined, show:
     - Empty state message: "No friends yet"
     - Subtext: "Add friends to see them here!"
     - Icon: UserPlus or Users icon from lucide-react
     - Link to `/friends` page (optional)
   - Style: Center-aligned, muted text

5. Handle loading state
   - Show skeleton loader while fetching friends
   - Create `components/loading/FriendsSkeleton.tsx`
   - Display 3-4 skeleton avatars in horizontal row

6. Integrate into profile page
   - Fetch friends in `app/profile/[username]/page.tsx`:
     ```typescript
     const friends = await getFriendPreviews(profile.id);
     ```
   - Pass friends to `FriendsPreview` component
   - Position: Below achievements, before match history

**Deliverables:**
- ✅ `server/actions/profile-actions.ts` - With `getFriendPreviews` function
- ✅ `components/profile/FriendsPreview.tsx` - Friends preview section
- ✅ `components/loading/FriendsSkeleton.tsx` - Loading skeleton
- ✅ Updated `app/profile/[username]/page.tsx` - With friends preview

**Acceptance Criteria:**
- Displays 3-6 friend avatars (circular, 48px × 48px)
- Each avatar has rank badge overlay (small, bottom-right)
- Clicking avatar navigates to friend's profile
- Empty state displays "No friends yet" with helpful message
- Hover effect scales up friend avatar (1.1x)
- Empty state links to `/friends` page (optional)
- Friends are displayed in horizontal row (wraps on mobile)
- Loading skeleton shows while fetching

---

### Phase 5: Match History Filters (P1-P2)

**Objectives:**
- Add filters to match history section
- Filter by quest type (Daily/Penalty/RankUp/Special)
- Filter by date range (start date, end date)

**Tasks Breakdown:**
1. Create `components/profile/MatchHistoryFilters.tsx`
   - Accept `onFilterChange` callback prop
   - Quest type dropdown:
     - Options: All, Daily, Penalty, RankUp, Special
     - Default: All
   - Date range picker:
     - Start date input (date type)
     - End date input (date type)
     - Default: No date filter
   - "Reset Filters" button (clears all filters)
   - Filter badge count: "Showing X quests" (optional)

2. Add filter state management in `app/profile/[username]/page.tsx`
   - Create client component for filter state:
     ```typescript
     "use client";

     import { useState } from "react";

     export default function PublicProfilePage({ params }: ProfilePageProps) {
       const [filters, setFilters] = useState({
         type: "all",
         startDate: "",
         endDate: "",
       });
       // ...
     }
     ```
   - Update `match_history` based on filters
   - Re-fetch data when filters change

3. Update `getPublicProfile` Server Action to accept filter parameters
   - Add optional parameters: `p_quest_type`, `p_start_date`, `p_end_date`
   - Modify query to filter by quest type:
     ```typescript
     let query = supabase
       .from("logs")
       .select(/* ... */)
       .eq("user_id", user_id);

     if (p_quest_type && p_quest_type !== "all") {
       query = query.eq("quest_type", p_quest_type);
     }

     if (p_start_date) {
       query = query.gte("completed_at", p_start_date);
     }

     if (p_end_date) {
       query = query.lte("completed_at", p_end_date);
     }

     const { data } = await query.order("completed_at", { ascending: false }).limit(20);
     ```
   - Return filtered match history

4. Update `MatchHistory` component to accept filtered data
   - Component already exists, just pass filtered data
   - No changes needed to component itself

5. Add loading state for filters
   - Show loading spinner while fetching filtered results
   - Disable filter dropdowns while loading

6. Add "Reset Filters" functionality
   - Clear all filter state
   - Set filters back to defaults: `{ type: "all", startDate: "", endDate: "" }`
   - Re-fetch unfiltered data

**Deliverables:**
- ✅ `components/profile/MatchHistoryFilters.tsx` - Filter UI component
- ✅ Updated `server/actions/match-history-actions.ts` - With filter parameters
- ✅ Updated `app/profile/[username]/page.tsx` - With filter state management

**Acceptance Criteria:**
- Quest type filter works correctly (All, Daily, Penalty, RankUp, Special)
- Date range filter works correctly (start date, end date)
- "Reset Filters" button clears all filters
- Match history updates when filters change
- Loading state shows while fetching filtered results
- Filter badge count displays "Showing X quests" (optional)
- Filters don't break if no data matches

---

### Phase 6: Mobile Optimization & Polish (P1)

**Objectives:**
- Ensure profile page is fully responsive
- Touch-friendly mobile interactions
- Smooth animations and transitions

**Tasks Breakdown:**

1. Test profile page on mobile breakpoints
   - 320px (iPhone SE)
   - 375px (iPhone 12/13)
   - 390px (iPhone 14 Pro)
   - 412px (Google Pixel 6)
   - 768px (tablet breakpoint)

2. Ensure all touch targets are minimum 44px × 44px
   - Check all buttons, inputs, links
   - Adjust padding/margin as needed
   - Verify with Chrome DevTools device simulator

3. Adjust layout for mobile (single column, stacked sections)
   - Profile banner: Full width, height 200px
   - Profile bio: Full width, 16px padding
   - Social links: Full width, horizontal scroll if needed
   - Achievements: 2 columns, 64px × 64px badges
   - Friends preview: 3 columns max, wrap to next row
   - Match history: Full width, stacked items

4. Add smooth fade-in animations for profile elements
   - Use Framer Motion for animations
   - Stagger animations by 100ms for each element
   - Animation config: `{ stiffness: 400, damping: 30 }`
   - Elements to animate:
     - Profile banner
     - Profile bio
     - Social links
     - Achievements
     - Friends preview
     - Match history

5. Add hover effects for desktop
   - Scale up (1.02x) on hover
   - Add shadow (0 4px 12px rgba(0,0,0,0.3)) on hover
   - Add color change (white/80 to white) on hover
   - Apply to: Achievement badges, friend avatars, social links

6. Ensure modal is fully responsive
   - Mobile (< 768px): Full-screen, slide-up animation
   - Desktop (≥768px): Centered modal, 600px width, fade-in animation
   - Close button: Top-right, 44px × 44px touch target
   - Save/Cancel buttons: Full-width on mobile, side-by-side on desktop

7. Add skeleton loaders for all loading states
   - Profile banner skeleton
   - Achievement badges skeleton
   - Friends preview skeleton
   - Match history skeleton (already exists)

8. Optimize images for mobile
   - Banner images: Lazy loaded
   - Avatar images: Lazy loaded
   - Use responsive image sizes if possible

9. Test on real mobile devices (if available)
   - iOS: iPhone, iPad
   - Android: Samsung, Google Pixel
   - Document any issues found

**Deliverables:**
- ✅ Fully responsive profile page (mobile, tablet, desktop)
- ✅ All touch targets minimum 44px × 44px on mobile
- ✅ Smooth fade-in animations (Framer Motion)
- ✅ Desktop hover effects (scale, shadow, color change)
- ✅ Fully responsive modal (full-screen on mobile, centered on desktop)
- ✅ Skeleton loaders for all loading states
- ✅ Optimized image loading (lazy load)

**Acceptance Criteria:**
- Profile page works on all mobile breakpoints (320px, 375px, 390px, 412px)
- Profile page works on tablet breakpoint (768px)
- Profile page works on desktop breakpoint (>1024px)
- All buttons and links have minimum 44px × 44px touch targets
- No horizontal scrolling on mobile
- Animations are smooth (60fps)
- Modal is usable on mobile (full-screen, easy to close)
- Banner images lazy load correctly
- Avatar images lazy load correctly
- Skeleton loaders display while fetching data

---

## Workstream Coordination

### Frontend (FE Master Workstream)

#### What FE Master Will Build

**Phase 1 - Profile Header**
- `components/profile/ProfileBanner.tsx` - Banner display with gradient fallback
- `components/profile/ProfileBio.tsx` - Bio display with empty state
- `components/profile/SocialLinks.tsx` - Social links display
- `components/profile/ShareProfileButton.tsx` - Share button with clipboard copy
- `app/profile/[username]/page.tsx` - Updated with banner, bio, social links, edit/share buttons
- Conditional rendering for "Edit Profile" button (own profile only)

**Phase 2 - Profile Editing Modal**
- `components/profile/EditProfileModal.tsx` - Full modal with all fields, validation, Server Action integration
- Real-time character counters
- Loading state while saving
- Toast notifications (success/error)
- Modal close on backdrop click, Cancel, Escape

**Phase 3 - Achievements**
- `server/actions/profile-actions.ts` - NEW FILE with `getUserAchievements` function
- `components/profile/AchievementBadges.tsx` - Achievement badges grid
- `components/profile/AchievementTooltip.tsx` - Tooltip on hover
- `components/loading/AchievementSkeleton.tsx` - Loading skeleton
- `app/profile/[username]/page.tsx` - Updated with achievements section

**Phase 4 - Friends Preview**
- `server/actions/profile-actions.ts` - With `getFriendPreviews` function
- `components/profile/FriendsPreview.tsx` - Friends preview section
- `components/loading/FriendsSkeleton.tsx` - Loading skeleton
- `app/profile/[username]/page.tsx` - Updated with friends preview

**Phase 5 - Match History Filters**
- `components/profile/MatchHistoryFilters.tsx` - Filter UI component
- `server/actions/match-history-actions.ts` - Updated with filter parameters
- `app/profile/[username]/page.tsx` - Updated with client-side filter state

**Phase 6 - Mobile Optimization & Polish**
- Responsive layout for all breakpoints
- Touch target sizes (44px × 44px minimum)
- Smooth animations (Framer Motion)
- Desktop hover effects
- Fully responsive modal
- Skeleton loaders for all loading states

#### Reference Materials Provided
- `app/profile/[username]/page.tsx` - Current profile page implementation
- `app/settings/page.tsx` - Settings page with profile fields (for reference)
- `components/profile/MatchHistory.tsx` - Existing match history component
- `components/gamification/RankBadge.tsx` - Rank badge component
- `server/actions/settings-actions.ts` - Existing `updateProfileSettings` Server Action
- `docs/initial-research/Frontend-guide.md` - Design system guidelines
- `docs/development-plan/UI-Design-Plan.md` - Mobile UI specifics
- `docs/development-plan/PM/PROFILE-ENHANCEMENT-PRODUCT-BRIEF.md` - Complete requirements

#### Direction Needed
- **Use existing Server Actions:** `updateProfileSettings` from `server/actions/settings-actions.ts` - Don't create new Server Action for updating profile
- **Follow design system:** Dark mode only (zinc-950 background), Neon Cyan (#00FFFF) accent, glassmorphism cards
- **Mobile-first approach:** Ensure 44px minimum touch targets, single column layout on mobile
- **Lazy load images:** Banner and avatar images must be lazy loaded for performance
- **Use toast notifications:** `sonner` library for success/error messages
- **Use Framer Motion:** For animations (spring physics: stiffness: 400, damping: 30)
- **Strict TypeScript:** NO `any` types allowed, use proper interfaces
- **No external assets:** CSS gradients, Tailwind borders, Lucide icons only
- **Server Components default:** Use Server Components where possible, Client Components only for interactivity

---

### Mobile UI/UX (Mobile UI/UX Developer Workstream)

#### What Mobile UI/UX Developer Will Refine

**Profile Header**
- Polish profile banner aspect ratio and spacing
- Refine bio typography for mobile (16px base font)
- Improve social links touch targets (44px × 44px)
- Add subtle animations for edit/share buttons (fade in, hover scale)

**Profile Editing Modal**
- Ensure modal is fully mobile-friendly (full-screen, slide-up animation)
- Refine input padding and spacing for mobile touch targets
- Improve character counter visibility (large enough to read)
- Add smooth modal close animation (slide down)
- Ensure keyboard doesn't cover inputs on mobile

**Achievements Section**
- Polish achievement badge size (64px × 64px on mobile)
- Refine achievement grid spacing (8px gap)
- Improve tooltip visibility (z-index, positioning)
- Add smooth achievement hover animations (scale 1.1x)

**Friends Preview**
- Polish friend avatar size (48px × 48px on mobile)
- Refine rank badge overlay (small, legible)
- Improve friend avatar spacing (12px gap)
- Add smooth hover animations (scale 1.1x)

**Match History**
- Refine filter dropdown touch targets (44px × 44px)
- Improve date picker usability on mobile (native date picker)
- Polish match history item spacing and readability

#### Refinement Specifications
- Profile header padding: 16px on mobile, 24px on desktop
- Banner image aspect ratio: 4:1 (1920×480), height 200px mobile, 300px desktop
- Bio text size: 16px mobile, 18px desktop
- Social links size: 44px × 44px touch targets on mobile
- Achievement badges: 64px × 64px on mobile, 80px × 80px on desktop
- Friend avatars: 48px × 48px on mobile, 64px × 64px on desktop
- Modal width: 600px desktop, 100vw mobile (full-screen)
- Modal close button: 44px × 44px touch target, top-right
- Input height: 44px minimum on mobile
- Button height: 44px minimum on mobile

#### Polish Requirements
- Smooth fade-in animation for profile elements (staggered by 100ms)
- Subtle hover effects on desktop (scale: 1.02, shadow: 0 4px 12px rgba(0,0,0,0.3))
- Loading skeleton for all sections while fetching
- Empty states should have helpful messages and icons
- Profile share toast should use system notification sound (if enabled)
- Modal should have backdrop blur (backdrop-blur-xl)

#### Accessibility Improvements
- All interactive elements must have ARIA labels (aria-label="Edit Profile")
- Keyboard navigation must work for all buttons and inputs (Tab, Enter, Escape)
- Focus indicators must be visible (2px solid Neon Cyan border)
- Screen reader text for achievement icons (aria-label="Achievement: [name]")
- Screen reader text for friend avatars (aria-label="[username], [rank] rank")
- Modal trap focus (Tab cycles through modal elements only)

---

### Backend/Integration

#### Server Actions Needed
| Server Action | File Path | Status | Notes |
|--------------|-----------|--------|-------|
| `getPublicProfile(username)` | `server/actions/match-history-actions.ts` | ✅ EXISTS | Already working, no changes needed for Phase 1-4 |
| `updateProfileSettings(...)` | `server/actions/settings-actions.ts` | ✅ EXISTS | Already working, use for Phase 2 |
| `getUserAchievements(user_id)` | NEW: `server/actions/profile-actions.ts` | ❌ NEEDS CREATION | For Phase 3 |
| `getFriendPreviews(user_id)` | NEW: `server/actions/profile-actions.ts` | ❌ NEEDS CREATION | For Phase 4 |
| `getPublicProfile(username, filters)` | UPDATE: `server/actions/match-history-actions.ts` | ❌ NEEDS UPDATE | For Phase 5 - Add filter parameters |

#### Server Action Implementation Details

**New File: `server/actions/profile-actions.ts`**
```typescript
"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserAchievements(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select(`
      unlocked_at,
      achievements (
        id,
        name,
        description,
        icon,
        rarity
      )
    `)
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  if (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }

  return data || [];
}

export async function getFriendPreviews(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("friends")
    .select(`
      friend_id,
      profiles!friend_id (
        id,
        username,
        display_name,
        rank_tier,
        class
      )
    `)
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .limit(6)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching friends:", error);
    return [];
  }

  return data || [];
}
```

**Update: `server/actions/match-history-actions.ts`**
```typescript
// Add optional filter parameters to getPublicProfile function
export async function getPublicProfile(
  username: string,
  filters?: {
    questType?: string;
    startDate?: string;
    endDate?: string;
  }
) {
  // ... existing code ...

  let query = supabase
    .from("logs")
    .select(/* ... */)
    .eq("user_id", profile.id)
    .eq("is_public", true);

  // Add filter logic
  if (filters?.questType && filters.questType !== "all") {
    query = query.eq("quest_type", filters.questType);
  }

  if (filters?.startDate) {
    query = query.gte("completed_at", filters.startDate);
  }

  if (filters?.endDate) {
    query = query.lte("completed_at", filters.endDate);
  }

  const { data: logsData } = await query
    .order("completed_at", { ascending: false })
    .limit(20);

  // ... rest of function
}
```

#### Database Migrations Needed
**NONE** - All required columns already exist in `profiles` table:
- `display_name` (text) - Display name (max 50 chars)
- `bio` (text) - User bio (max 150 chars)
- `banner_url` (text) - URL to profile banner image
- `social_links` (jsonb) - Social links object: `{ discord: "", twitter: "", steam: "" }`

Achievements tables exist but are not yet used:
- `achievements` table - Seeded with achievement data
- `user_achievements` table - Tracks unlocked achievements
- No new columns needed for achievements

---

## Quality Assurance

### Testing Strategy
| Test Type | Scope | Method |
|-----------|--------|--------|
| **Unit Tests** | NOT REQUIRED | Per docs/initial-research/rules-and-constraints.md |
| **Integration Tests** | Profile components | Manual testing - verify all components work together |
| **E2E Tests** | Full profile flow | Manual testing - verify complete user journey |
| **Mobile Testing** | Responsive layout | Browser DevTools + Real devices (if available) |

### Edge Cases to Verify
| Edge Case | Expected Behavior |
|-----------|-----------------|
| Profile with no banner | Show gradient fallback (zinc-900 to zinc-800) |
| Profile with empty bio | Show empty state "No bio yet" with Edit icon hint |
| Profile with no friends | Show empty state "No friends yet" with helpful message |
| Profile with no achievements | Show empty state "No achievements yet" with helpful message |
| Profile with no social links | Don't render social links section |
| User views own profile | Show "Edit Profile" button |
| User views someone else's profile | Hide "Edit Profile" button |
| Banner URL is invalid (not a URL) | Show gradient fallback, don't crash, log error to console |
| Achievement database is empty | Show empty state "No achievements yet", don't crash |
| Friend database query fails | Show empty state "No friends yet", don't crash |
| Server Action fails (getUserAchievements) | Show empty state "No achievements yet", don't crash |
| Server Action fails (getFriendPreviews) | Show empty state "No friends yet", don't crash |
| Server Action fails (getPublicProfile with filters) | Show empty match history, don't crash |
| User tries to save empty display name | Disable "Save" button, show validation error text |
| User exceeds character limit | Show warning color (yellow) at 90%, error color (red) at 100% |
| User tries to save invalid URL | Disable "Save" button, show validation error text |
| Modal is already open | Don't open second modal, ignore "Edit Profile" button click |
| Profile save is successful | Show success toast, close modal, refresh page |
| Profile save is unsuccessful | Show error toast, keep modal open, keep input data |

### Performance Validation
| Metric | Target | Verification Method |
|--------|--------|-----------------|
| Profile page load time | < 2 seconds on 4G mobile | Chrome DevTools Network tab |
| Banner image load time | < 1 second | Chrome DevTools Network tab |
| Achievements fetch time | < 500ms (if cached) | Chrome DevTools Network tab |
| Modal open time | < 200ms (instant) | Browser Performance API |
| Profile save time | < 1 second | Browser Performance API |
| Animation frame rate | 60fps | Chrome DevTools Performance tab |

### Accessibility Testing
- [ ] All elements are keyboard navigable (Tab, Enter, Escape)
- [ ] Screen reader announces profile sections correctly (ARIA labels)
- [ ] Focus indicators are visible on all interactive elements (2px solid Neon Cyan)
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Modal trap focus (Tab cycles through modal elements only)
- [ ] Esc key closes modal
- [ ] All images have alt text (banner, avatars, achievements)

### Cross-Browser Compatibility
- [ ] Chrome (Desktop & Mobile) - Test all features
- [ ] Firefox (Desktop & Mobile) - Test all features
- [ ] Safari (iOS & macOS) - Test all features (date picker compatibility)
- [ ] Edge (Desktop) - Test all features

---

## Risk Mitigation

### Identified Risks

| Risk | Severity | Mitigation Strategy |
|------|-----------|-------------------|
| **Achievement UI not implemented** | ⚠️ MEDIUM | Defer to P2, show empty state if table is empty |
| **Social feed has 500 errors** | 🚨 HIGH | Fix social feed bugs first (see BUG-HUNTER-PROMPT.md) - This is a critical blocker |
| **Profile modal not mobile-friendly** | ⚠️ MEDIUM | Use full-screen modal on mobile, test on real devices, ensure touch targets are 44px × 44px |
| **Banner image load times slow** | ⚠️ MEDIUM | Lazy load banner images, use responsive image sizes if possible, show gradient fallback immediately |
| **Achievement database empty** | ⚠️ LOW | Show helpful empty state, guide user to complete quests to earn achievements |
| **Friend database query returns error** | ⚠️ LOW | Wrap in try/catch, show empty state instead of crashing |
| **Server Actions return unexpected data** | ⚠️ MEDIUM | Add null checks, use optional chaining (`?.`), provide fallback values |
| **Modal doesn't close properly** | ⚠️ MEDIUM | Test all close paths (Cancel, backdrop click, Esc key), add console logs for debugging |

### Fallback Approaches
- If `getUserAchievements` Server Action fails, show empty state "No achievements yet" instead of crashing
- If `getFriendPreviews` Server Action fails, hide friends section or show empty state "No friends yet" instead of crashing
- If banner image fails to load, show gradient fallback instead of broken image icon
- If profile save fails, keep modal open and show error message, don't lose user's input data
- If modal is already open, ignore "Edit Profile" button click and show toast "Profile editor is already open"

---

## Timeline & Milestones

### Overall Timeline
- **Start Date:** February 4, 2026
- **Target Completion:** February 5, 2026
- **Total Estimated Effort:** 12-16 hours

### Phase Breakdown
| Phase | Name | Tasks | Est. Time | Dependencies |
|-------|-------|-------|------------|
| **Phase 1** | Profile Header Enhancements | 2-3 hours | None |
| **Phase 2** | Profile Editing Modal | 3-4 hours | Phase 1 |
| **Phase 3** | Achievements Section | 2-3 hours | None (can defer to P2) |
| **Phase 4** | Friends Preview Section | 2-3 hours | None |
| **Phase 5** | Match History Filters | 1-2 hours | P1-P2 (can defer) |
| **Phase 6** | Mobile Optimization & Polish | 2 hours | All phases |

### Daily Schedule
| Day | Phases | Deliverables |
|------|--------|-------------|
| **Feb 4** | Phase 1, Phase 2 | Profile header, editing modal |
| **Feb 4-5** | Phase 3, Phase 4 | Achievements, friends preview |
| **Feb 5** | Phase 5, Phase 6 | Filters, mobile polish |

### Milestones
| Milestone | Date | Success Criteria |
|-----------|------|-----------------|
| **M1: Profile Header Complete** | Feb 4 | Banner, bio, social links, edit/share buttons functional |
| **M2: Profile Editing Complete** | Feb 4 | Modal works, saves changes, updates profile |
| **M3: Achievements Complete** | Feb 5 | Achievement badges display correctly (P2 optional) |
| **M4: Friends Preview Complete** | Feb 5 | Friends preview shows 3-6 friend avatars |
| **M5: Mobile Optimization Complete** | Feb 5 | Profile page fully responsive, mobile-friendly |

### Dependencies
| Dependency | Description | Status |
|------------|-------------|--------|
| **Database migrations** | Columns already exist in `profiles` table | ✅ NO ACTION |
| **Achievement UI** | Achievement database seeded, UI not implemented | ⚠️ DEFER TO P2 |
| **Social feed bugs** | POST /feed 500 errors | 🚨 MUST FIX FIRST (critical blocker) |
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

*Document Version: 1.0*
*Product: ASCEND: FITNESS RPG*
*Status: Ready for Development*
*Last Updated: February 4, 2026*
