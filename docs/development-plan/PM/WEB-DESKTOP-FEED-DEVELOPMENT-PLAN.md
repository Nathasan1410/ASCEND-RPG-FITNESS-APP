# WEB/DESKTOP FEED IMPLEMENTATION PLAN

**Project:** ASCEND: FITNESS RPG  
**Feature:** Web/Desktop Social Feed  
**Reference:** Strava Web Design  
**Status:** 🟡 READY TO START  
**Date Created:** February 4, 2026  
**Version:** 1.0  

---

## 🎯 EXECUTIVE SUMMARY

This plan outlines the implementation of a web/desktop version of the Hunter Network social feed, building on the mobile feed completed in the previous session. The desktop feed will follow Strava's web design patterns while maintaining ASCEND's dark theme, neon cyan accents, and glassmorphism design system.

**Reference Screenshots:**
- tnflnt-strava-feed-web-01.jpg - Main feed layout
- tnflnt-strava-feed-web-02.jpg - Feed card design
- tnflnt-strava-feed-web-03.jpg - User profile section
- tnflnt-strava-feed-web-insitu-01.jpg - Desktop view
- tnflnt-strava-feed-web-insitu-02.jpg - Sidebar elements
- tnflnt-strava-feed-system-bbl-01.jpg - Navigation patterns
- tnflnt-strava-feed-system-bbl-02.jpg - Header/sticky elements
- tnflnt-strava-feed-system-bbl-03.jpg - Bottom bars/modules
- tnflnt-strava-feed-system-bbl-04.jpg - Full page composition

---

## 📊 IMPLEMENTATION PHASES

### Phase 1: Analysis & Planning ✅ IN PROGRESS
**Status:** Document creation started
**Timeline:** 30 minutes
**Deliverable:** Implementation plan document (this file)

**Objectives:**
- Study all 9 reference screenshots thoroughly
- Identify Strava web design patterns
- Document mobile vs web differences
- Create 8-phase milestone breakdown

---

### Phase 2: Component Updates for Web/Desktop
**Status:** 🟡 NOT STARTED
**Timeline:** 60 minutes
**Files to Modify:**
- `components/social/HunterFeedCard.tsx` - Update for desktop
- `components/social/CreatePostSection-Mobile.tsx` - Desktop compatibility
- `components/layout/MobileSystemNavbar.tsx` - Desktop navbar

**Objectives:**
- Adapt mobile feed card for desktop layout
- Add desktop-specific interactions (hover states, larger touch targets)
- Update create post for modal-based desktop experience
- Convert hamburger menu to full desktop navigation
- Ensure responsive breakpoints work correctly

**Responsive Breakpoints:**
```css
/* Mobile (< 768px) */
- Bottom navigation visible
- Full-screen overlay menu
- Single column layout
- Compact spacing

/* Tablet (768px - 1024px) */
- One sidebar visible (user stats)
- Bottom navigation hidden
- Tablet-optimized spacing
- Tablet touch targets

/* Desktop (> 1024px) */
- Two sidebars (left + right)
- Full top navigation
- Max-width feed column (~640-672px)
- Desktop hover interactions
```

---

### Phase 3: Web/Desktop Feed Page Layout
**Status:** 🟡 NOT STARTED
**Timeline:** 90 minutes
**File to Create:** `app/feed/page.tsx` (NEW - desktop version)

**Objectives:**
- Create main feed page with Strava web layout
- Implement 3-column layout (sidebar-left | feed | sidebar-right)
- Left sidebar: User stats, quick actions, navigation
- Center: Feed column with create post button
- Right sidebar: Trending tags, suggestions
- Add infinite scroll or pagination
- Ensure responsive collapse of sidebars

**Layout Structure:**
```tsx
// Mobile: Single column
<div className="flex flex-col md:hidden">
  <MobileFeed />
</div>

// Tablet: Left sidebar + feed
<div className="hidden md:flex lg:hidden">
  <LeftSidebar />
  <FeedColumn />
</div>

// Desktop: Left sidebar + feed + right sidebar
<div className="hidden lg:flex">
  <LeftSidebar />
  <FeedColumn />
  <RightSidebar />
</div>
```

---

### Phase 4: Enhanced Feed Cards for Desktop
**Status:** 🟡 NOT STARTED
**Timeline:** 75 minutes
**Files to Modify:**
- `components/social/HunterFeedCard.tsx` - Enhance for desktop

**Objectives:**
- Add hover effects on all action buttons
- Implement comment preview on card hover
- Add detailed activity data display
- Create share dropdown with options
- Update typography for desktop (larger sizes)
- Add keyboard navigation support
- Implement like/comment/share animations

**Desktop-Specific Features:**
- Hover state: Show comment preview
- Hover state: Expand share button
- Click: Open post detail modal
- Right-click: Context menu options

---

### Phase 5: Advanced Create Post Modal
**Status:** 🟡 NOT STARTED
**Timeline:** 90 minutes
**File to Create:** `components/social/CreatePostWeb.tsx` (NEW)

**Objectives:**
- Create full-featured modal for desktop
- Implement rich text editor with preview
- Add drag & drop media upload
- Create post type selector with icons
- Add privacy toggles (public/friends only)
- Add location selector (optional)
- Implement submit with loading state
- Add cancel/discard functionality
- Add form validation

**Modal Features:**
```tsx
<Modal>
  <UserInfoHeader />
  <TextArea placeholder="What's on your mind?" />
  <MediaUploadArea />
    <DragDropZone />
    <ImagePreview />
  </MediaUploadArea>
  <PostTypeSelector />
    <QuestComplete />
    <RankUp />
    <HunterTip />
  </PostTypeSelector>
  <PrivacyToggle />
  <LocationSelector />
  <SubmitButton />
  <CancelButton />
</Modal>
```

---

### Phase 6: Trending/Hashtags System
**Status:** 🟡 NOT STARTED
**Timeline:** 60 minutes
**File to Create:** `components/social/TrendingTags.tsx` (NEW)

**Objectives:**
- Create trending tags section component
- Display tags in card/list format
- Add click to filter by tag
- Show post count for each tag
- Implement "View All" functionality
- Add animations for tag appearance
- Make responsive for all screen sizes

**Tag Display Options:**
```tsx
// Desktop: Card with list
<div className="trending-card">
  <h3>Trending</h3>
  <ul className="tag-list">
    <li><Tag count={42} /></li>
    <li><Tag count={38} /></li>
  </ul>
  <button>View All</button>
</div>

// Mobile: Horizontal scroll
<div className="trending-scroll">
  <Tag count={42} />
  <Tag count={38} />
</div>
```

---

### Phase 7: Sidebar Components
**Status:** 🟡 NOT STARTED
**Timeline:** 90 minutes
**File to Create:** `components/layout/FeedSidebar.tsx` (NEW)

**Objectives:**
- Create left sidebar component with user info
- Add stats summary (XP, level, rank, class)
- Add quick actions (profile, settings)
- Create right sidebar component
- Add trending tags section to right sidebar
- Add suggestions/recommendations section
- Implement collapsible sections
- Ensure responsive behavior

**Left Sidebar Structure:**
```tsx
<LeftSidebar>
  <UserInfo />
    <Avatar />
    <Username />
    <StatsSummary />
      <XP />
      <Level />
      <Rank />
      <Class />
  </UserInfo>
  <QuickActions />
    <ProfileButton />
    <SettingsButton />
  </QuickActions>
  <Navigation />
    <ActivitySection />
    <SocialSection />
  </Navigation>
</LeftSidebar>
```

**Right Sidebar Structure:**
```tsx
<RightSidebar>
  <TrendingTagsSection />
  <SuggestionsSection />
    <RecommendedHunters />
  </SuggestionsSection>
</RightSidebar>
```

---

### Phase 8: Integration & Data Connection
**Status:** 🟡 NOT STARTED
**Timeline:** 90 minutes
**Server Actions to Create:** `server/actions/feed-actions.ts`

**Objectives:**
- Create server actions for feed operations
- Connect web feed to real backend data
- Implement real-time updates (optional)
- Add loading and error states
- Implement infinite scroll for pagination
- Add search functionality
- Test end-to-end flows
- Optimize performance

**Server Actions Required:**
```typescript
// server/actions/feed-actions.ts
export async function getFeedPosts(params: FeedParams)
export async function createPost(data: CreatePostData)
export async function likePost(postId: string)
export async function unlikePost(postId: string)
export async function commentOnPost(postId: string, text: string)
export async function sharePost(postId: string, platform: string)
export async function getTrendingTags()
export async function getRecommendedUsers()
```

---

## 📁 FILES TO CREATE

### New Files (9)
1. `app/feed/page.tsx` - Main web feed page
2. `components/social/CreatePostWeb.tsx` - Advanced create post modal
3. `components/social/TrendingTags.tsx` - Trending tags component
4. `components/layout/FeedSidebar.tsx` - Sidebar components
5. `components/layout/LeftSidebar.tsx` - Left sidebar
6. `components/layout/RightSidebar.tsx` - Right sidebar
7. `server/actions/feed-actions.ts` - Feed server actions
8. `types/feed.ts` - Feed TypeScript interfaces
9. `lib/feed-utils.ts` - Feed utility functions

### Modified Files (3)
1. `components/social/HunterFeedCard.tsx` - Enhance for desktop
2. `components/social/CreatePostSection-Mobile.tsx` - Desktop compatibility
3. `components/layout/MobileSystemNavbar.tsx` - Desktop navbar

---

## 🎨 DESIGN SYSTEM COMPLIANCE

### Colors
```css
Background: #050505 (zinc-950)
Cards: rgba(18, 24, 27, 0.6) with blur
Borders: rgba(255, 255, 255, 0.1)
Accent: #00b8ff (cyan) for primary actions
Success: #14b8a6 (teal)
Warning: #ffd300 (yellow)
Error: #ef4444 (red)

Rank Colors:
E-Rank: #8a8a8a (Gray)
D-Rank: #ffffff (White)
C-Rank: #55ead4 (Cyan)
B-Rank: #4ade80 (Blue)
A-Rank: #bd00ff (Purple)
S-Rank: #f3e600 (Gold)
```

### Glassmorphism
```css
.glass-enhanced {
  background: rgba(18, 24, 27, 0.5);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.glass-card {
  background: rgba(18, 24, 27, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Typography
```css
Font Display: 'Space Grotesk', system-ui
Font Body: 'Inter', system-ui
Font Mono: 'JetBrains Mono', monospace

Font Sizes (Strava-like):
Text-xl: 20px - Feed title
Text-lg: 18px - Section headers
Text-base: 16px - Body text
Text-sm: 14px - Secondary text
Text-xs: 12px - Labels/badges
```

### Spacing
```css
.section-gap: 24px - Between sections
.card-gap: 16px - Between feed cards
.element-gap: 8px - Between elements
.padding-standard: 16px - Standard padding
.padding-compact: 12px - Compact padding
```

### Animations
```css
Spring Configuration:
stiffness: 400
damping: 30

Hover Effects:
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)

Active State Glow:
box-shadow: 0 0 15px rgba(0, 184, 255, 0.4)
box-shadow: 0 0 20px rgba(0, 184, 255, 0.5)
```

---

## 📐 RESPONSIVE BREAKPOINTS

### Mobile (< 768px)
- Single column layout
- Hide sidebars
- Show bottom navigation
- Show hamburger menu in navbar
- Compact spacing (12px standard)
- Smaller font sizes

### Tablet (768px - 1024px)
- Left sidebar visible (250px width)
- Right sidebar hidden
- Feed width: calc(100% - 250px)
- Bottom navigation hidden
- Full top navigation
- Medium spacing (16px standard)

### Desktop (> 1024px)
- Both sidebars visible (280px each)
- Feed width: calc(100% - 560px)
- Feed max-width: ~640-672px
- Full top navigation
- Bottom navigation hidden
- Desktop spacing (16px standard)
- Hover interactions enabled

---

## 📋 IMPLEMENTATION CHECKLIST

### Must Do
- [ ] Study all 9 reference screenshots in detail
- [ ] Document Strava web design patterns
- [ ] Create implementation plan with milestones ✅
- [ ] Update existing components for desktop compatibility
- [ ] Create app/feed/page.tsx for web/desktop
- [ ] Build sidebar components
- [ ] Build advanced create post modal
- [ ] Implement trending tags system
- [ ] Connect to backend data
- [ ] Test on desktop, tablet, mobile
- [ ] Ensure responsive design works
- [ ] Create progress reports in docs/reports/FE/

### Must Not Do
- [ ] Do NOT deviate from reference screenshots
- [ ] Do NOT ignore Strava's web design patterns
- [ ] Do NOT break existing mobile functionality
- [ ] Do NOT create features not in reference
- [ ] Do NOT use API routes (use Server Actions)
- [ ] Do NOT use unit tests (manual testing only)
- [ ] Do NOT use any TypeScript any types

---

## 🔧 TECHNICAL REQUIREMENTS

### Tech Stack
```
Framework: Next.js 14 (App Router)
Language: TypeScript (STRICT - no any types)
Styling: Tailwind CSS
State Management: React Context or URL search params
Animations: Framer Motion with spring physics (stiffness: 400, damping: 30)
Icons: Lucide-react only
Backend: Supabase with Server Actions
Database: PostgreSQL with RLS enabled
```

### File Structure
```
/app/feed/page.tsx - Main web feed page (NEW)
/components/social/
  HunterFeedCard.tsx - Enhanced for desktop
  CreatePostWeb.tsx - Advanced create post modal (NEW)
  TrendingTags.tsx - Trending tags component (NEW)
/components/layout/
  FeedSidebar.tsx - Sidebar components (NEW)
  LeftSidebar.tsx - Left sidebar (NEW)
  RightSidebar.tsx - Right sidebar (NEW)
/lib/utils/
  cn.ts - Class merging utility (EXISTS)
/server/actions/
  feed-actions.ts - Server actions for feeds (NEW)
```

---

## 📊 SUCCESS CRITERIA

### Phase 1: Analysis & Planning
- [ ] All reference screenshots studied and documented
- [ ] Strava web patterns identified
- [ ] Implementation plan with 8 phases created
- [ ] Documentation complete

### Phase 2: Component Updates
- [ ] Existing components updated for desktop compatibility
- [ ] Responsive breakpoints implemented
- [ ] Mobile functionality preserved

### Phase 3: Web Feed Layout
- [ ] app/feed/page.tsx created with Strava layout
- [ ] Sidebars implemented
- [ ] Responsive design works
- [ ] Create post section added

### Phase 4: Feed Card Enhancement
- [ ] Feed cards enhanced for desktop
- [ ] Hover effects added
- [ ] All features functional

### Phase 5: Advanced Create Post
- [ ] Full-featured modal created
- [ ] Rich editor implemented
- [ ] Media upload functional
- [ ] Privacy controls added

### Phase 6: Trending Tags
- [ ] Trending tags component created
- [ ] Filter by tag functionality
- [ ] Responsive design

### Phase 7: Sidebars
- [ ] Sidebar components created
- [ ] User info section functional
- [ ] Trending tags integrated
- [ ] Collapsible sections work

### Phase 8: Integration
- [ ] Connected to backend data
- [ ] Real-time updates implemented
- [ ] All features functional
- [ ] Performance acceptable

---

## 🚀 NEXT STEPS

### Immediate (After Plan Approval)
1. Create Phase 1 Analysis & Plan report
2. Begin Phase 2: Component updates
3. Set up development environment

### During Implementation
1. Create progress reports after each phase
2. Test on desktop, tablet, mobile continuously
3. Reference screenshots constantly
4. Maintain design system compliance

### After Implementation
1. Final testing across all devices
2. Performance optimization
3. Bug fixes and polish
4. Create final summary report

---

## 📝 REPORTS TO CREATE

1. `docs/reports/FE/Phase1-Analysis-Plan.md` - THIS REPORT
2. `docs/reports/FE/Phase2-Component-Updates.md`
3. `docs/reports/FE/Phase3-Web-Feed-Layout.md`
4. `docs/reports/FE/Phase4-FeedCard-Desktop.md`
5. `docs/reports/FE/Phase5-CreatePost-Web.md`
6. `docs/reports/FE/Phase6-TrendingTags.md`
7. `docs/reports/FE/Phase7-Sidebars.md`
8. `docs/reports/FE/Phase8-Integration.md`
9. `docs/reports/FE/Web-Desktop-Feed-Final-Summary.md`

---

## 🎯 OBJECTIVE

Implement a web/desktop feed for the Hunter Network that:

- Matches Strava's web design based on reference screenshots
- Maintains consistency with app's dark theme and neon cyan accents
- Works on all devices - mobile, tablet, desktop
- Preserves existing functionality - mobile feed still works
- Uses Server Actions for all mutations (no API routes)
- Follows design system - glassmorphism, spring animations, proper typography
- Creates progress reports - documenting each phase's completion

---

**Document Version:** 1.0  
**Status:** READY FOR IMPLEMENTATION  
**Next Action:** Begin Phase 2 - Component Updates  
**Last Updated:** February 4, 2026
