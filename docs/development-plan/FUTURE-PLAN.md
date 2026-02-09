# ASCEND: FITNESS RPG - FUTURE DEVELOPMENT PLAN

> **Document Type:** Future Development Plan  
> **Version:** 2.0  
> **Last Updated:** February 2, 2026  
> **Status:** Active Planning

---

## Executive Summary

This document outlines features and improvements that have **not yet been implemented** in ASCEND: FITNESS RPG, organized by priority and development phase.

**Current Status:**
- ✅ MVP Core: Complete (Onboarding, Quests, Judge System, Progression)
- ✅ Anti-Cheat: Complete (Proof Upload, Gatekeeper, Auto-Triggers)
- ✅ Social Pages: Code exists but **NOT ACCESSIBLE** (no navigation links)
- ❌ Social Features: **NOT AVAILABLE** (Friends, Guilds, Messaging, Social Feed)
- ❌ Social Media Feed: **NOT IMPLEMENTED** (Hunter Network scrolling experience)
- ❌ Advanced Features: Missing (Settings, Notifications)

---

## Part I: Navigation & Accessibility (P0 - BLOCKER)

> **Issue:** Critical features are implemented but inaccessible to users. The navbar has no navigation links.

### Current State

| Page/Feature | Status | Issue |
|-------------|--------|-------|
| `/dashboard/leaderboard` | ✅ Code exists | No navbar link | **FIXED** |
| `/profile/[username]` | ✅ Code exists | No navbar link | **FIXED** |
| `/settings` | ✅ Created | Was missing | **DONE** |
| User menu/dropdown | ✅ Implemented | Did not exist | **DONE** |
| Mobile Bottom Nav | ✅ Created | Does not exist | **DONE** |
| FloatingNavDock | ✅ Created | New component for desktop | **DONE** |

### P0 Tasks - ALL COMPLETED ✅

#### 1.1 Enhanced SystemNavbar

**File:** `components/layout/SystemNavbar.tsx`

**Changes Required:**
```tsx
"use client";

import Link from "next/link";
import { User, Trophy, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SystemNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  return (
    <nav className="h-16 border-b border-white/10 bg-system-panel/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <Link href="/dashboard" className="text-xl font-display font-bold tracking-tighter text-system-cyan">
        ASCEND
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/dashboard/leaderboard" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          LEADERBOARD
        </Link>
      </div>
      
      {/* User Menu */}
      <div className="relative">
        <button 
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-void-deep hover:border-white/40 transition-colors"
        >
          <User className="w-4 h-4 text-white/60" />
        </button>
        
        {/* Dropdown */}
        {userMenuOpen && (
          <div className="absolute right-0 top-12 w-48 bg-void-panel border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="p-2 space-y-1">
              <Link 
                href={`/profile/${username}`} 
                className="block px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                My Profile
              </Link>
              <Link 
                href="/settings" 
                className="block px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-status-danger hover:bg-status-danger/10 rounded transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

#### 1.2 Mobile Bottom Navigation (Mobile-Only)

**File:** `components/layout/MobileBottomNav.tsx` (NEW)

**Purpose:** Bottom tab bar for mobile users (768px and below)

**Required Links:**
- 🏠 Dashboard (`/dashboard`)
- 📋 Quests (`/dashboard/quests`)
- 🏆 Leaderboard (`/dashboard/leaderboard`)
- 👤 Profile (`/profile/[username]`)

**Icon Design:**
- Use lucide-react icons: `Home`, `List`, `Trophy`, `User`
- Active tab should glow (system-cyan border)
- Inactive tabs: white/40

```tsx
"use client";

import Link from "next/link";
import { Home, Trophy, User, ScrollText } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileBottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/quests", icon: ScrollText, label: "Quests" },
    { href: "/dashboard/leaderboard", icon: Trophy, label: "Rankings" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-void-panel/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50">
      {navItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all",
            pathname === item.href 
              ? "text-system-cyan" 
              : "text-white/40"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5",
            pathname === item.href && "drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          )} />
          <span className="text-[10px] font-medium uppercase tracking-wide">
            {item.label}
          </span>
        </Link>
      ))}
      {/* Profile is always right-aligned */}
      <Link 
        href="/profile/me" 
        className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all text-white/40"
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium uppercase tracking-wide">
          Profile
        </span>
      </Link>
    </nav>
  );
}
```

#### 1.3 Dashboard Layout Update

**File:** `app/dashboard/layout.tsx`

**Change:** Add MobileBottomNav component

```tsx
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SystemNavbar />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full pb-20 md:pb-6">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
```

---

## Part II: Settings Page (P1)

### 2.1 Settings Page Creation

**File:** `app/settings/page.tsx` (NEW)

**Sections:**

| Section | Fields |
|---------|---------|
| **Account** | Username (edit once with cooldown), Email (read-only), Delete account |
| **Profile** | Display name, Bio (150 chars), Profile banner |
| **Appearance** | Badge style selector (3 variants), Theme options (if enabled) |
| **Audio** | Sound effects toggle, Volume slider (0-100) |
| **Privacy** | Public profile toggle, Show stats toggle, Allow friend requests |
| **Equipment** | Edit equipment inventory checkboxes |
| **Class Change** | Reset class with XP penalty (50% loss) |
| **Danger Zone** | Reset all progress, Delete account |

```tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SystemButton } from "@/components/ui/SystemButton";
import { toast } from "sonner";

export default function SettingsPage() {
  const supabase = createClient();
  const [settings, setSettings] = useState({
    soundEnabled: true,
    soundVolume: 50,
    publicProfile: true,
    showStats: true,
    allowFriendRequests: true,
  });
  
  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ascend-settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem("ascend-settings", JSON.stringify(settings));
    toast.success("Settings saved.");
  };

  // Add sections for each category...
  // Full implementation would include all fields above

  return (
    <div className="space-y-8 animate-in fade-in">
      <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
        Settings
      </h1>
      
      {/* Account Section */}
      {/* Profile Section */}
      {/* Audio Section */}
      {/* Privacy Section */}
      {/* Equipment Section */}
      {/* Danger Zone */}
      
      <SystemButton onClick={handleSave} glow>
        Save Changes
      </SystemButton>
    </div>
  );
}
```

### 2.2 Server Actions for Settings

**File:** `server/actions/settings-actions.ts` (NEW)

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileSettings(data: {
  bio?: string;
  display_name?: string;
  banner_url?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("profiles")
    .update({
      bio: data.bio,
      display_name: data.display_name,
      banner_url: data.banner_url,
    })
    .eq("id", user.id);

  if (error) throw error;
  
  revalidatePath("/settings");
  revalidatePath("/profile/me");
}

export async function updateEquipment(equipment: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("profiles")
    .update({ equipment })
    .eq("id", user.id);

  if (error) throw error;
  
  revalidatePath("/settings");
}

export async function changeUserClass(newClass: "Novice" | "Striker" | "Tank" | "Assassin") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp")
    .eq("id", user.id)
    .single();

  if (!profile) throw new Error("Profile not found");

  // 50% XP penalty for class change
  const newTotalXp = Math.floor((profile.total_xp || 0) * 0.5);

  const { error } = await supabase
    .from("profiles")
    .update({
      class: newClass,
      total_xp: newTotalXp,
      // Recalculate level from new XP
    })
    .eq("id", user.id);

  if (error) throw error;
  
  revalidatePath("/dashboard");
}
```

---

## Part III: Social Features (P1)

### 3.1 Friend System

**Files to Create:**
- `app/friends/page.tsx` - Friends list and add friends
- `server/actions/friend-actions.ts` - Friend request logic
- `app/friend-requests/page.tsx` - Pending requests

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

CREATE INDEX IF NOT EXISTS idx_friends_user ON friends(user_id, status);
CREATE INDEX IF NOT EXISTS idx_friends_friend ON friends(friend_id, status);
```

**Features:**
| Feature | Description |
|---------|-------------|
| Add Friend | Search by username, send request |
| Accept/Decline | Request management dashboard |
| Friend List | View all friends with online status |
| Friend Quests | See friends' recent quests on dashboard |
| Compare Stats | Side-by-side comparison with friend |
| Remove Friend | Unfriend with confirmation |

### 3.2 Guilds/Clans System

**Files to Create:**
- `app/guilds/page.tsx` - Guild list and creation
- `app/guilds/[id]/page.tsx` - Guild detail page
- `server/actions/guild-actions.ts` - Guild management

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS guilds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tag TEXT UNIQUE CHECK (LENGTH(tag) = 4),
  description TEXT,
  leader_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  max_members INT DEFAULT 50,
  xp_pool INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guild_members (
  guild_id UUID REFERENCES guilds(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('leader', 'officer', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (guild_id, user_id)
);

CREATE TABLE IF NOT EXISTS guild_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guild_id UUID REFERENCES guilds(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_xp INT NOT NULL,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('active', 'completed'))
);

CREATE INDEX IF NOT EXISTS idx_guilds_tag ON guilds(tag);
```

**Features:**
| Feature | Description |
|---------|-------------|
| Create Guild | Name + 4-letter unique tag |
| Join Guild | By tag search or invitation |
| Guild Leaderboard | Internal rankings by XP |
| Guild Challenges | Team XP goals with rewards |
| Guild Chat | Basic real-time messaging |
| Guild XP Pool | Shared contribution system |

### 3.3 Activity Feed / Notifications

**Files to Create:**
- `app/notifications/page.tsx` - Notification center
- `components/notifications/NotificationCenter.tsx` - Notification widget (in navbar)
- `server/actions/notification-actions.ts` - Notification logic

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'guild_invite', 'level_up', 'rank_up', 'quest_reminder', 'report_received')),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at);
```

**Features:**
| Feature | Description |
|---------|-------------|
| Push-style UI | Slide-down notification card |
| Friend Requests | When someone adds you |
| Guild Invites | When invited to join |
| Milestone Alerts | Level up / Rank up |
| Quest Reminders | Daily quest available reminder |
| Report Updates | When your report is reviewed |
| Mark Read | Bulk dismiss read notifications |

---

## Part IV: Quest System Enhancements (P1-P2)

### 4.1 Quest History Page

**File:** `app/quests/history/page.tsx` (NEW)

**Purpose:** View all completed quests with filtering and pagination

**Features:**
| Feature | Description |
|---------|-------------|
| Full History List | Pagination, infinite scroll |
| Filter by Type | Daily, Penalty, RankUp, Special |
| Filter by Status | Completed, Failed, Skipped |
| Filter by Date | Date range picker |
| Stats Summary | Total quests, completion rate, XP earned |
| Quest Replay | Re-do old quests (practice mode, no XP) |
| Export History | Download CSV of all logs |

### 4.2 Quest List / Browse

**File:** `app/quests/page.tsx` (NEW)

**Purpose:** Browse and filter all available quests

**Features:**
| Feature | Description |
|---------|-------------|
| Quest Cards Grid | Display available daily quests |
| Difficulty Filter | Filter by rank (E through S) |
| Type Filter | Filter by type (Daily, Special, Challenge) |
| Class Filter | Filter by target class |
| Equipment Filter | Filter by equipment requirements |

### 4.3 Custom Quest Builder

**File:** `app/quests/create/page.tsx` (NEW)

**Purpose:** Users create their own custom quests

**Features:**
| Feature | Description |
|---------|-------------|
| Exercise Selector | Search & add from exercise database |
| Set Parameters | Reps, sets, rest times |
| XP Calculator | Auto-calculate base XP based on volume |
| Preview Quest | See estimated difficulty & XP |
| Save Quest | Add to personal library |
| Share Quest | Generate shareable link |
| Community Quests | Browse user-created quests |

---

## Part V: Advanced Gamification (P2)

### 5.1 Achievement System

**Files to Create:**
- `app/achievements/page.tsx` - Achievement list with progress
- `components/gamification/AchievementBadge.tsx` - Badge display component
- `components/gamification/AchievementGrid.tsx` - Grid layout
- `server/actions/achievement-actions.ts` - Unlock logic

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_reward INT DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

CREATE TABLE IF NOT EXISTS user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  progress JSONB,
  PRIMARY KEY (user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
```

**Achievement Categories:**

| Category | Examples | Rarity |
|-----------|-----------|---------|
| **Milestones** | First Quest, Level 10, Level 25, S-Rank | Common/Rare |
| **Streaks** | 7 Day Streak, 30 Day Streak, 100 Day Streak | Rare/Epic |
| **Volume** | 1000 Total Reps, 10,000 Total Reps, 100,000 Total Reps | Rare/Epic |
| **Class-Specific** | 100 Strength (Tank), 100 Stamina (Striker) | Common |
| **Social** | 10 Friends, Guild Leader, #1 on Leaderboard | Rare/Legendary |
| **Anti-Cheat** | First proof uploaded, Verified Hunter | Common |
| **Time-Based** | Quest in under 7 days, 30 days, 100 days | Epic |

### 5.2 Weekly Challenges

**File:** `app/challenges/page.tsx` (NEW)

**Concept:** Limited-time events with special rewards and leaderboard

**Challenge Types:**
| Type | Description | Reward |
|------|-------------|---------|
| **Volume Challenge** | Complete X total reps in one week | Badge + 500 XP |
| **Streak Challenge** | Maintain 7-day streak | Badge + 200 XP |
| **Rank Climb** | Reach Y rank by date | Badge + Title |
| **Class Challenge** | Complete only Tank class quests | Badge + 1000 XP |
| **Social Challenge** | Add 5 friends | Badge + 500 XP |

**Features:**
- Challenge countdown timer
- Real-time leaderboard per challenge
- Reward notification on completion
- Challenge history

### 5.3 Season System

**Concept:** Monthly leaderboards reset, but XP and levels persist

**Benefits:**
- Fair competition for new players
- Seasonal rewards for top 100
- Season-exclusive badges
- Fresh leaderboards each month

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS seasons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT FALSE
);

-- Add to leaderboard query:
-- WHERE created_at >= season.start_at AND created_at <= season.end_at
```

---

## Part VI: Profile Enhancements (P1-P2)

### 6.1 Profile Page Enhancements

**File:** `app/profile/[username]/page.tsx` (EXISTS - needs updates)

**Missing Elements:**
| Element | Description |
|----------|-------------|
| **Banner Image** | User-uploaded header background (1920x480) |
| **Profile Bio** | Self-description field (150 char limit) |
| **Achievement Badges** | Grid of unlocked achievements |
| **Quest History Filter** | By type, rank, date range |
| **Share Profile** | Copy shareable link button |
| **Edit Profile** | Link to settings page |
| **Friends List Preview** | Show 3-6 friend cards |
| **Badges Showcase** | Display earned badges with rarity colors |
| **Social Links** | Optional Discord/Twitter/Steam links |

### 6.2 Public Activity Feed

**File:** `app/feed/page.tsx` (NEW)

**Concept:** Global feed showing quest completions from all users

**Features:**
| Feature | Description |
|---------|-------------|
| Global Quest Log | Recent completions from all users |
| Like Quest | Show appreciation for good logs |
| Comment on Quest | Discuss workout details |
| Filter by Friends | See only friends' activity |
| Filter by Rank | Show only E-D-C rank activity |

---

## Part VII: Technical Improvements (P1-P2)

### 7.1 Performance Optimizations

| Optimization | Impact | Implementation |
|-------------|--------|----------------|
| Image Lazy Loading | Faster page loads | Add `loading="lazy"` to images |
| Code Splitting | Smaller bundle sizes | Dynamic imports for heavy components |
| CDN for Static Assets | Global delivery | Upload assets to CDN |
| Supabase Edge Functions | Faster DB queries | Move complex queries to edge |
| Redis Caching | Cache leaderboards | Cache frequent queries |

### 7.2 Offline Support

**Concept:** Service Worker for offline functionality

**Features:**
| Feature | Description |
|---------|-------------|
| Cache Active Quest | View quest without internet |
| Cache Profile | View stats offline |
| Offline Logging | Save logs locally, sync when online |
| Sync Queue | Auto-submit pending logs on reconnect |

**File:** `public/sw.js` (Service Worker)

### 7.3 PWA Support

**File:** `public/manifest.json` (NEW)

**Purpose:** Make ASCEND installable as a mobile app

```json
{
  "name": "ASCEND: FITNESS RPG",
  "short_name": "ASCEND",
  "description": "Your Daily Mandate to Become S-Rank",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#050505",
  "theme_color": "#00FFFF",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## Part VIII: Monetization Prep (P2-P3)

### 8.1 Storefront / Cosmetics

**File:** `app/store/page.tsx` (NEW)

**Cosmetic Categories:**

| Category | Examples | Price |
|-----------|------------|--------|
| **Badges** | Custom profile badges (gold, neon, animated) | $0.99 - $4.99 |
| **Themes** | Color schemes, border styles, backgrounds | $1.99 - $2.99 |
| **Titles** | Displayed below username | $1.99 - $4.99 |
| **Profile Banners** | Header images (anime style) | $0.99 - $2.99 |
| **Emote Packs** | Custom reaction animations | $1.99 |

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS user_cosmetics (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  cosmetic_id UUID,
  cosmetic_type TEXT,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, cosmetic_id, cosmetic_type)
);

CREATE TABLE IF NOT EXISTS cosmetics_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT,
  price_cents INT NOT NULL,
  image_url TEXT,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);
```

### 8.2 Premium Tiers

**File:** `app/premium/page.tsx` (NEW)

**Tiers:**

| Tier | Price | Features |
|-------|--------|----------|
| **Free** | $0/month | All core features, 1 proof/day limit |
| **ASCEND+** | $4.99/month | Unlimited proofs, advanced analytics, priority quest generation, ad-free |
| **ASCEND ELITE** | $9.99/month | Everything + custom quests, guild creation, exclusive badges, early access features |

### 8.3 Payment Integration

**Services:** Stripe / Supabase Payments

**Features:**
- Secure checkout
- Subscription management
- Receipt handling
- Webhook for subscription updates

---

## Part IX: Mobile-Only Features (P2-P3)

### 9.1 Push Notifications

**Services:** OneSignal / Firebase Cloud Messaging / Expo Push

**Notification Types:**
- Daily quest available at 6:00 AM
- Quest reminder (if not started by 6:00 PM)
- Streak at risk (if no quest completed by 9:00 PM)
- Friend request received
- Guild activity updates
- Rank up / Level up achievements

### 9.2 Widget Support

**Concept:** Home screen widget for Android/iOS

**Features:**
- Display active quest name
- Show XP progress to next level
- Quick start button
- Countdown to quest expiry
- Current streak counter

---

## Part X: Integration Roadmap (P3)

### 10.1 Wearable Integrations

| Platform | Data Sync | Implementation |
|----------|------------|----------------|
| **Apple Health** | Steps, heart rate, calories | HealthKit SDK |
| **Google Fit** | Activity data, workouts | Google Fitness API |
| **Fitbit** | Daily steps, sleep data | Fitbit Web API |
| **Garmin** | Workout sessions, HR data | Garmin Connect API |
| **Whoop** | Strain and recovery scores | Whoop API |

**Use Cases:**
- Auto-log quest duration from wearable data
- Validate proof via GPS (running quests)
- Sync steps for stamina bonus
- Heart rate-based effort scoring

### 10.2 Nutrition Tracking

**File:** `app/nutrition/page.tsx` (NEW)

**Concept:** "Potion System" from original design

**Features:**
| Feature | Description |
|---------|-------------|
| **Calorie Tracking** | Daily goal vs actual |
| **Macro Tracking** | Protein, carbs, fats, grams |
| **Meal Logging** | Food database search |
| **Hydration Tracking** | Daily water intake goal |
| **Potion Items** | Supplements logging |
| **Nutrition Quests** | Hydration goals, protein goals |
| **Nutrition Rewards** | XP bonuses for hitting goals |

**Database Changes:**
```sql
CREATE TABLE IF NOT EXISTS nutrition_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  log_date TIMESTAMPTZ DEFAULT NOW(),
  calories INT,
  protein_g INT,
  carbs_g INT,
  fats_g INT,
  water_ml INT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS potions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  potion_type TEXT CHECK (potion_type IN ('protein', 'pre-workout', 'post-workout', 'hydration', 'recovery')),
  taken_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 10.3 Video Form Analysis

**Technology:** MediaPipe / PoseNet / TensorFlow.js

**Use Case:**
- Analyze pushup form in video proof
- Check squat depth automatically
- Count reps automatically from video
- Provide form score (0-100) to user
- Reject invalid form submissions

**Implementation:**
```typescript
// File: lib/ai/form-analysis.ts
import * as pose from '@tensorflow-models/pose';

export async function analyzeForm(videoFile: File): Promise<FormAnalysisResult> {
  const poseModel = pose.load();
  const videoElement = document.createElement('video');
  videoElement.src = URL.createObjectURL(videoFile);
  
  // Analyze frames...
  const poses = await poseModel.estimatePoses(videoElement);
  
  // Check pushup form:
  // - Elbow angle > 90 degrees
  // - Body stays straight
  // - Full range of motion
  
  return {
    formScore: calculateScore(poses),
    repCount: countReps(poses),
    feedback: generateFeedback(poses)
  };
}
```

---

## Part XI: Quality of Life Improvements (P1-P2)

### 11.1 Search Functionality

**Global Search:** Search bar in navbar for:
- Users (profiles by username)
- Guilds (by name or tag)
- Quests (if templates exist)
- Achievements (search all achievements)

**File:** `components/search/SearchBar.tsx` (NEW)

### 11.2 Dashboard Widgets

**Add to Dashboard:**

| Widget | Description |
|---------|-------------|
| **Streak Calendar** | Heatmap of activity (like GitHub) |
| **Quest Recommendation** | AI suggests quest based on history |
| **Friend Activity** | Friends' recent quest completions |
| **Leaderboard Preview** | Top 5 players displayed |
| **Rank Progress** | Progress bar to next rank |
| **Weekly Summary** | Last 7 days stats overview |

### 11.3 Quest Execution Enhancements

**New Features:**
| Feature | Description |
|---------|-------------|
| **Exercise Substitution** | Swap exercise if equipment missing |
| **Rest Timer Auto-Start** | Auto-start next rest timer |
| **Voice Log Submission** | Speak feedback instead of typing |
| **Split Timer** | For HIIT/tabata workouts |
| **Form Tips** | Contextual tips per exercise |
| **Warmup Routine** | Auto-generated warmup before quest |

---

## Part XII: Admin & Moderation (P2-P3)

### 12.1 Admin Dashboard

**File:** `app/admin/page.tsx` (NEW - Protected)

**Sections:**

| Section | Features |
|---------|-----------|
| **User Management** | Search, view, ban, unban users |
| **Report Queue** | Review community reports |
| **Leaderboard Moderation** | Remove suspicious entries |
| **Content Moderation** | Review user bios, guild names |
| **System Health** | Groq API status, Opik status, error logs |
| **Database Stats** | User counts, quest completion rates |

### 12.2 Anti-Abuse Systems

| Feature | Description |
|---------|-------------|
| **Rate Limiting** | Prevent API abuse |
| **IP Blocking** | Block malicious IPs |
| **Content Filtering** | Auto-flag inappropriate bios |
| **Spam Detection** | Detect fake friend requests |

---

## Part XIII: Social Media Feed - Hunter Network (P1-P2) **NEW**

> **Vision:** Create a scrolling, immersive social experience similar to Threads/Twitter/Strava, but themed around the Solo Leveling/Hunter/Fitness universe. This will be the core community feature where hunters share their training journeys.

### 13.1 Feed Concept & Design Philosophy

**Design Inspiration:**
- **Twitter/X:** Short, punchy updates, hashtags, retweet-style sharing
- **Threads:** Clean, visual-first scrolling experience
- **Strava:** Activity-based feed with maps, stats, kudos (likes)

**Hunter Network Theme:**
- Posts are "System Broadcasts" or "Quest Logs"
- Likes become "Kudos" or "Respect"
- Shares are "Quest Completions" (share your progress)
- Comments are "Analysis" or "Tactics Discussion"
- Hashtags become "Hunter Tags" (#S-RankJourney, #TankBuild, #DailyGrind)

### 13.2 Feed Types & Content

**Post Categories:**

| Post Type | Description | Engagement Actions |
|-----------|-------------|-------------------|
| **Quest Completion** | Auto-posted when user completes daily quest | Kudos, Respect, Analysis |
| **Rank Up Achievement** | Celebration when hunter advances ranks | Massive Kudos, Congratulate |
| **Level Up Milestone** | Level 10, 25, 50, 75, 100 milestones | Special Badge Reactions |
| **Proof Showcase** | Share video/photo proof of rank-up exam | High engagement, Verified Badge |
| **Hunter Tips** | Share workout advice, form tips | Bookmark, Save for Later |
| **Guild Announcements** | Guild leaders broadcast challenges/events | Join Guild, Guild Kudos |
| **Achievement Unlock** | Display newly earned achievement | Rarity-based reactions |
| **Daily System Message** | AI-generated motivational "System" broadcast | System Appreciation |

**Feed Cards Design:**
```tsx
// Example Hunter Feed Post Component
interface HunterPost {
  id: string;
  author: {
    username: string;
    rank: "E" | "D" | "C" | "B" | "A" | "S";
    hunter_status: "Normal" | "Verified" | "Flagged";
    avatar_url: string;
  };
  post_type: "quest_completion" | "rank_up" | "level_up" | "achievement" | "tip";
  
  // Content
  title: string;           // "Daily Quest: Strength Protocol Complete"
  body?: string;           // Optional text commentary from hunter
  quest_data?: {            // If quest completion post
    name: string;
    xp_earned: number;
    duration_min: number;
    exercises_count: number;
  };
  
  // Engagement
  kudos_count: number;
  respects_count: number;     // Retweets/Shares
  analysis_count: number;      // Comments
  user_kudos: boolean;
  
  // Media
  proof_media_url?: string;    // Video/image attachment
  proof_type: "Photo" | "Video";
  
  // Metadata
  created_at: string;
  tags: string[];            // ["#TankBuild", "#LegDay"]
}
```

### 13.3 Feed Page Architecture

**File:** `app/feed/page.tsx` (NEW - PRIORITY P1)

**Layout Structure:**
- **Left Sidebar (Desktop):** Navigation, Trending Tags, Suggested Hunters
- **Center Feed:** Infinite scroll of posts, masonry grid
- **Right Sidebar (Desktop):** Suggested guilds, Your guild, Upcoming events

**Feed Layout:**
```tsx
"use client";

import { HunterFeedCard } from "@/components/social/HunterFeedCard";
import { FeedFilterBar } from "@/components/social/FeedFilterBar";
import { TrendingTags } from "@/components/social/TrendingTags";

export default function HunterFeedPage() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Left Sidebar - Desktop Only */}
      <aside className="hidden lg:block space-y-6">
        <div className="bg-system-panel border border-white/10 rounded-xl p-4">
          <h3 className="font-bold text-white mb-4">Navigation</h3>
          <nav className="space-y-2">
            <Link href="/feed" className="block text-system-cyan font-medium">
              📡 All Broadcasts
            </Link>
            <Link href="/feed/following" className="block text-white/70 hover:text-white">
              🎯 Following
            </Link>
            <Link href="/feed/verified" className="block text-white/70 hover:text-white">
              ✓ Verified Hunters Only
            </Link>
          </nav>
        </div>
        
        <TrendingTags />
        <SuggestedHunters />
      </aside>
      
      {/* Center Feed - Infinite Scroll */}
      <main className="lg:col-span-2 space-y-4">
        <FeedFilterBar />
        
        {/* Posts Feed */}
        <div className="space-y-4">
          <HunterFeedCard postType="quest_completion" />
          <HunterFeedCard postType="rank_up" />
          <HunterFeedCard postType="achievement" />
          {/* Infinite scroll loads more... */}
        </div>
      </main>
      
      {/* Right Sidebar - Desktop Only */}
      <aside className="hidden lg:block space-y-6">
        <GuildSuggestions />
        <UpcomingEvents />
      </aside>
      
    </div>
  );
}
```

### 13.4 Feed Features

**Core Interactions:**

| Feature | Description | System Theme |
|---------|-------------|--------------|
| **Kudos (Likes)** | Tap to show respect for hunter's effort | "Respect Granted" animation |
| **Respect (Share)** | Share post to your own feed | "Quest Forwarded" |
| **Analysis (Comment)** | Post战术 (tactics) discussion | Engage in Hunter discourse |
| **Save Quest** | Bookmark quest template | "Add to Quest Library" |
| **Report Abuse** | Flag inappropriate content | "System Alert: Violation Detected" |
| **View Profile** | Tap author to see full hunter stats | Open Profile Modal |
| **Filter Feed** | Filter by post type, rank, verified status | "Filter Parameters Applied" |

**Feed Filters:**
```tsx
interface FeedFilters {
  postType?: "all" | "quest" | "rank_up" | "achievement" | "tip";
  rankFilter?: "E" | "D" | "C" | "B" | "A" | "S" | "all";
  verifiedOnly?: boolean;      // Show only Verified Hunters
  friendsOnly?: boolean;       // Show only following
  guildFilter?: string;         // Filter by guild tag
  timeRange?: "today" | "week" | "month" | "all";
}
```

### 13.5 Feed Post Components

**Hunter Feed Card:**
```tsx
// File: components/social/HunterFeedCard.tsx

"use client";

import { motion } from "framer-motion";
import { ThumbsUp, Repeat, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";

interface HunterFeedCardProps {
  post: HunterPost;
  onKudos?: (postId: string) => void;
  onRespect?: (postId: string) => void;
  onAnalysis?: (postId: string) => void;
}

export function HunterFeedCard({ post, onKudos, onRespect, onAnalysis }: HunterFeedCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-system-panel border border-white/10 rounded-xl overflow-hidden hover:border-system-cyan/30 transition-all"
    >
      
      {/* Author Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={post.author.avatar_url} 
              alt={post.author.username}
              className="w-12 h-12 rounded-full border-2 border-white/20"
            />
            {post.author.hunter_status === "Verified" && (
              <div className="absolute -bottom-1 -right-1 bg-rank-a rounded-full p-1">
                <VerifiedIcon className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {post.author.username}
              </span>
              <RankBadge rank={post.author.rank} size="sm" />
              {post.author.hunter_status === "Verified" && (
                <VerifiedBadge />
              )}
            </div>
            <span className="text-sm text-white/40">
              {formatTimeAgo(post.created_at)}
            </span>
          </div>
        </div>
        
        <button className="text-white/40 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-4 space-y-3">
        {post.body && (
          <p className="text-white/90 leading-relaxed">
            {post.body}
          </p>
        )}
        
        {/* Quest Data Card (if quest completion) */}
        {post.post_type === "quest_completion" && post.quest_data && (
          <div className="bg-void-deep border border-white/10 rounded-lg p-3 space-y-2">
            <h4 className="font-bold text-system-cyan">
              {post.quest_data.name}
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold text-rank-b">
                  +{post.quest_data.xp_earned}
                </div>
                <div className="text-xs text-white/40">XP Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {post.quest_data.duration_min}
                </div>
                <div className="text-xs text-white/40">Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {post.quest_data.exercises_count}
                </div>
                <div className="text-xs text-white/40">Exercises</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Proof Media */}
        {post.proof_media_url && (
          <div className="rounded-lg overflow-hidden">
            {post.proof_type === "Video" ? (
              <video 
                src={post.proof_media_url} 
                controls
                className="w-full h-64 object-cover"
              />
            ) : (
              <img 
                src={post.proof_media_url} 
                alt="Quest proof"
                className="w-full h-64 object-cover"
              />
            )}
          </div>
        )}
        
        {/* Hunter Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm text-system-cyan/80 hover:text-system-cyan cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Engagement Bar */}
      <div className="px-4 pb-4 border-t border-white/10 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onKudos?.(post.id)}
            className={cn(
              "flex items-center gap-2 transition-colors",
              post.user_kudos ? "text-system-cyan" : "text-white/40 hover:text-white/70"
            )}
          >
            <ThumbsUp className={cn("w-5 h-5", post.user_kudos && "fill-current")} />
            <span className="text-sm font-medium">
              {post.kudos_count}
            </span>
          </button>
          
          <button 
            onClick={() => onRespect?.(post.id)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <Repeat className="w-5 h-5" />
            <span className="text-sm font-medium">
              {post.respects_count}
            </span>
          </button>
          
          <button 
            onClick={() => onAnalysis?.(post.id)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              {post.analysis_count}
            </span>
          </button>
        </div>
        
        <button className="text-white/40 hover:text-white transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
```

### 13.6 Create Post (Hunter Broadcast)

**File:** `app/feed/create/page.tsx` (NEW - P2)

**Post Creation Flow:**
1. User clicks "New Broadcast" button (floating action button on mobile, button in navbar on desktop)
2. Modal opens with post creation interface
3. User selects:
   - Post type: Quest Completion / Rank Up / Level Up / Tip / Achievement
   - Attach proof (video/photo for quest completions)
   - Add body text (max 500 chars)
   - Add hunter tags (max 5)
4. Preview post before submission
5. Submit → Appears in feed immediately

**Create Post Modal:**
```tsx
// File: components/social/CreatePostModal.tsx

interface CreatePostData {
  post_type: "quest_completion" | "rank_up" | "level_up" | "tip" | "achievement";
  body: string;
  tags: string[];
  proof_media?: File;
  quest_id?: string;  // If quest completion, link to specific quest
}

export function CreatePostModal() {
  return (
    <Dialog>
      <DialogContent className="bg-system-panel border border-white/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            New Hunter Broadcast
          </DialogTitle>
        </DialogHeader>
        
        {/* Post Type Selector */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          <button className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10">
            <div className="text-2xl mb-1">⚔️</div>
            <div className="text-xs text-white/70">Quest</div>
          </button>
          <button className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10">
            <div className="text-2xl mb-1">⬆️</div>
            <div className="text-xs text-white/70">Rank Up</div>
          </button>
          <button className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-xs text-white/70">Level Up</div>
          </button>
          <button className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-white/70">Achievement</div>
          </button>
          <button className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10">
            <div className="text-2xl mb-1">💡</div>
            <div className="text-xs text-white/70">Tip</div>
          </button>
        </div>
        
        {/* Text Input */}
        <textarea 
          placeholder="Share your progress with the Hunter Network..."
          maxLength={500}
          className="w-full bg-void-deep border border-white/10 rounded-lg p-4 text-white min-h-[120px] resize-none"
        />
        
        {/* Hunter Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white/40 text-sm">Tags:</span>
          <div className="flex-1 flex flex-wrap gap-2">
            <input 
              type="text" 
              placeholder="#S-RankJourney"
              className="bg-transparent border-none text-system-cyan text-sm"
            />
          </div>
        </div>
        
        {/* Proof Upload */}
        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center mb-4">
          <div className="text-white/40">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Drag proof media here</p>
            <p className="text-xs text-white/30">Video or Photo (max 50MB)</p>
          </div>
        </div>
        
        {/* Character Counter */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-white/40">Character limit: 0/500</span>
          <button className="text-sm text-system-cyan hover:text-white transition-colors">
            Add Quest Link
          </button>
        </div>
        
        {/* Submit Button */}
        <Button className="w-full bg-system-cyan text-void-deep font-bold py-3 rounded-lg">
          Broadcast to Network
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

### 13.7 Database Schema for Feed

**New Tables Required:**
```sql
-- Hunter Feed Posts
CREATE TABLE IF NOT EXISTS hunter_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Post Content
  post_type TEXT NOT NULL CHECK (post_type IN (
    'quest_completion', 'rank_up', 'level_up', 
    'achievement', 'tip', 'guild_announcement'
  )),
  title TEXT NOT NULL,
  body TEXT,
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
  
  -- Engagement
  kudos_count INT DEFAULT 0,
  respects_count INT DEFAULT 0,
  analysis_count INT DEFAULT 0,
  
  -- Media
  proof_media_url TEXT,
  proof_type TEXT CHECK (proof_type IN ('Photo', 'Video', 'None')),
  
  -- Tags & Metadata
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feed Engagement (Kudos, Respects, Analysis)
CREATE TABLE IF NOT EXISTS feed_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_post_id UUID REFERENCES hunter_feed(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  engagement_type TEXT NOT NULL CHECK (engagement_type IN ('kudos', 'respect', 'analysis')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(feed_post_id, user_id, engagement_type)
);

-- Feed Filters & Search
CREATE INDEX IF NOT EXISTS idx_feed_created ON hunter_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_user ON hunter_feed(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_tags ON hunter_feed USING GIN(tags);
```

### 13.8 Feed Features by Phase

**Phase 1: Core Feed (P1 - 4 hours)**
- ✅ Basic infinite scroll feed
- ✅ Hunter Feed Card component
- ✅ Kudos/Respect/Analysis buttons
- ✅ Filter by post type
- ✅ Trending tags sidebar

**Phase 2: Content Creation (P2 - 6 hours)**
- ✅ Create Post Modal
- ✅ Quest Completion auto-posts
- ✅ Proof media upload
- ✅ Hunter tags system

**Phase 3: Advanced Social (P2 - 8 hours)**
- ✅ Real-time feed updates (Supabase Realtime)
- ✅ Comment/Analysis threading
- ✅ Post editing/deletion
- ✅ Saved/Bookmarked posts
- ✅ Search feed by hashtags
- ✅ User profile feed tab

**Phase 4: Gamified Interactions (P3 - 6 hours)**
- ✅ Kudos animations (particle effects)
- ✅ Respect streaks (share 5 posts in a row)
- ✅ Hunter reputation score (based on engagement)
- ✅ Trending Hunters algorithm
- ✅ Feed personalization (show what you like)

### 13.9 Mock Implementation (Current Phase)

**Current Status:** SOCIAL MEDIA FEED IS NOT IMPLEMENTED

**Mock Demo Plan:**
For initial demonstration/presentation purposes, create a mock version of the Hunter Feed with:
- Static sample posts from "demo hunters"
- Simulated engagement counts
- Working Kudos/Respect buttons (localStorage only)
- Fake trending tags
- Demo create post (doesn't persist to database)

**Mock Data Structure:**
```typescript
// lib/mock/feed-data.ts
export const MOCK_HUNTER_FEED: HunterPost[] = [
  {
    id: "mock-1",
    author: {
      username: "ShadowHunter_X",
      rank: "A",
      hunter_status: "Verified",
      avatar_url: "/mock-avatars/hunter-1.jpg"
    },
    post_type: "rank_up",
    title: "B-Rank to A-Rank Rank Up",
    body: "Finally achieved A-Rank! The exam was brutal but worth it. Tank build coming next.",
    quest_data: null,
    kudos_count: 247,
    respects_count: 89,
    analysis_count: 34,
    user_kudos: false,
    proof_media_url: "/mock-videos/rank-up-1.mp4",
    proof_type: "Video",
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    tags: ["#RankUp", "#TankBuild", "#A-Rank"]
  },
  {
    id: "mock-2",
    author: {
      username: "SwiftBlade",
      rank: "S",
      hunter_status: "Verified",
      avatar_url: "/mock-avatars/hunter-2.jpg"
    },
    post_type: "achievement",
    title: "Unlocked: Master of Endurance",
    body: "After 6 months of daily grinds, finally got the Master of Endurance badge! 1000+ total stamina stat achieved.",
    quest_data: null,
    kudos_count: 562,
    respects_count: 189,
    analysis_count: 67,
    user_kudos: false,
    proof_media_url: "/mock-images/achievement-master.png",
    proof_type: "Photo",
    created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    tags: ["#Achievement", "#Stamina", "#S-Rank"]
  },
  {
    id: "mock-3",
    author: {
      username: "IronFist",
      rank: "B",
      hunter_status: "Normal",
      avatar_url: "/mock-avatars/hunter-3.jpg"
    },
    post_type: "quest_completion",
    title: "Daily Quest: Strength Protocol Complete",
    body: "Hit a new PR on weighted squats! System said 'Anomaly Detected' but my form was clean lol. Tank grind never stops.",
    quest_data: {
      name: "Strength Protocol: Leg Day",
      xp_earned: 450,
      duration_min: 45,
      exercises_count: 6
    },
    kudos_count: 128,
    respects_count: 34,
    analysis_count: 19,
    user_kudos: true,
    proof_media_url: "/mock-images/quest-3.jpg",
    proof_type: "Photo",
    created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    tags: ["#DailyGrind", "#TankBuild", "#LegDay"]
  },
  // ... more mock posts
];
```

### 13.10 Integration with Existing Features

**Auto-Posting on Quest Completion:**
When a user completes a quest, automatically offer to post to feed:
```typescript
// In server/actions/quest-actions.ts
export async function completeQuestAndBroadcast(questId: string, logData: any, postToFeed: boolean = true) {
  // ... existing quest completion logic ...
  
  if (postToFeed) {
    await createFeedPost({
      user_id: user.id,
      post_type: "quest_completion",
      title: `Daily Quest: ${questData.plan_json.quest_name} Complete`,
      body: logData.user_feedback || "Quest protocol executed successfully.",
      quest_id: questId,
      tags: generateTagsFromQuest(questData),
      proof_media_url: logData.proof_media_url,
      proof_type: logData.proof_type
    });
  }
  
  return { success: true, xp: calculatedXp };
}
```

**Rank Up Celebration Post:**
When user passes rank-up exam, auto-create post:
```typescript
// In server/actions/rank-up-actions.ts
export async function processRankUpSuccess(userId: string, newRank: string, proofUrl: string) {
  // ... existing rank up logic ...
  
  await createFeedPost({
    user_id: userId,
    post_type: "rank_up",
    title: `${oldRank}-Rank to ${newRank}-Rank Rank Up`,
    body: "Successfully passed rank examination. System recognizes evolution.",
    proof_media_url: proofUrl,
    proof_type: "Video",
    tags: [`#RankUp`, `#${newRank}-Rank`, "#HunterEvolution"]
  });
}
```

### 13.11 Feed Analytics & Insights

**For Admin/Analytics Dashboard:**
```typescript
interface FeedAnalytics {
  total_posts_today: number;
  total_posts_week: number;
  most_active_hunters: { username: string; post_count: number }[];
  trending_tags: { tag: string; count: number }[];
  avg_engagement_rate: number; // kudos + respects + analysis / views
  most_kudosed_posts: { post_id: string; kudos_count: number }[];
}
```

---

## Implementation Priority Matrix (UPDATED)

| Priority | Features | Estimated Time | Dependencies |
|-----------|----------|------------------|--------------|
| **P0 - Blocker** | Navigation, Accessibility | 4 hours | None |
| **P1 - Core Social** | Friends, Settings, Notifications | 12 hours | P0 |
| **P1 - Quest History** | History page, filters | 4 hours | P0 |
| **P1 - Profile Enhancements** | Banner, bio, achievements | 6 hours | P0 |
| **P2 - Social Media Feed** | Hunter Network Feed (Phase 1) | 4 hours | P1 |
| **P2 - Advanced Gamification** | Achievements, Guilds, Challenges | 16 hours | P1 |
| **P2 - Monetization** | Store, Premium tiers | 8 hours | P2 |
| **P3 - Integrations** | Wearables, Nutrition, Video AI | 20+ hours | P2 |
| **P3 - Mobile Features** | PWA, Push, Widgets | 12 hours | P2 |

---

## Immediate Next Steps (Week 1)

1. **Fix Navigation (P0)** - Update SystemNavbar with dropdown, add Trophy link
2. **Create Mobile Bottom Nav (P0)** - Bottom tab bar for mobile
3. **Create Settings Page (P1)** - Basic account, audio, privacy settings
4. **Create Quest History (P1)** - View all completed quests with filters
5. **Friend System (P1)** - Add friends, view profiles

---

## Blocked Features (Current)

| Feature | Blocker | Resolution |
|---------|----------|-------------|
| **Leaderboard** | No navbar link | Add navigation (P0) |
| **Public Profiles** | No navbar link | Add user menu (P0) |
| **Report Function** | No visibility in UI | Already exists in profile, needs navigation fix |
| **Match History** | Profile page not accessible | Fix navigation (P0) |
| **Settings** | Page doesn't exist | Create page (P1) |
| **Notifications** | No UI component | Create NotificationCenter (P1) |
| **Social Media Feed** | **NOT IMPLEMENTED** | Create Hunter Network Feed (P1-P2) - See Part XIII |
| **Friends System** | Code exists but not accessible | Fix navigation (P0) |
| **Guilds System** | **NOT IMPLEMENTED** | See Part III (P1-P2) |
| **Messaging** | **NOT IMPLEMENTED** | Future feature (P2-P3) |

---

## Migration Checklist (For SQL Updates)

```sql
-- Run these in Supabase SQL Editor after navigation fixes:

-- Part III: Social Features
CREATE TABLE IF NOT EXISTS friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS guilds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tag TEXT UNIQUE CHECK (LENGTH(tag) = 4),
  description TEXT,
  leader_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  max_members INT DEFAULT 50,
  xp_pool INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guild_members (
  guild_id UUID REFERENCES guilds(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('leader', 'officer', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (guild_id, user_id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'guild_invite', 'level_up', 'rank_up', 'quest_reminder', 'report_received')),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Part V: Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_reward INT DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

CREATE TABLE IF NOT EXISTS user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  progress JSONB,
  PRIMARY KEY (user_id, achievement_id)
);
```

---

*Document Version: 2.0*  
*Product: ASCEND: FITNESS RPG*  
*Status: Active Planning*  
*Last Updated: February 2, 2026*
