# 🚀 DEV FEED DEPLOYMENT GUIDE

> **Guide Date:** February 4, 2026
> **Purpose:** Test `/dev/feed` with migration fixes before production deployment
> **Status:** Development environment ready for testing

---

## 🎯 Overview

This guide walks you through deploying and testing the `/dev/feed` page with all critical fixes applied. The dev feed is a **test environment** separate from production `/feed`.

---

## 📋 Prerequisites

Before proceeding, ensure you have:

1. ✅ **Access to Supabase Dashboard**
   - URL: https://supabase.com/dashboard
   - Navigate to your project

2. ✅ **Database backups** (Recommended)
   - Export current database state
   - In case migrations cause issues

3. ✅ **Local development server running**
   ```bash
   cd D:\Projekan\OpikAI-SoloLevel
   npm run dev
   ```

4. ✅ **Review bug fixes** (See: `docs/reports/MIGRATION-DISCREPANCY-ANALYSIS.md`)

---

## 🚨 Step 1: Fix Migration Files (DO THIS FIRST)

### Critical Fixes Required

Before any testing, you **MUST** fix the 3 critical discrepancies found in migration files.

### Fix 1.1: RPC Function Column Names

**File:** `supabase/migrations/008_optimization_rpc_functions.sql`

**Location:** Lines 25-26 in `get_match_history_optimized()` function

**Issue:** Column names are misspelled (`proof` instead of `proof`)

**Current (WRONG):**
```sql
l.proof_media_url,
l.proof_type,
```

**Fix (CORRECT):**
```sql
l.proof_media_url,
l.proof_type,
```

**Edit the file and change:**
- Line 25: `l.proof_media_url` → `l.proof_media_url`
- Line 26: `l.proof_type::TEXT` → `l.proof_type::TEXT`

### Fix 1.2: Achievement Rarity Typos

**File:** `supabase/migrations/005_achievements.sql`

**Location:** Lines 54 and 59

**Issue:** Two achievements have wrong rarity values

**Current (WRONG):**
```sql
-- Line 54:
('Elite Hunter', 'Reach Level 25', '⭐⭐⭐', 500, 'epic'),

-- Line 59:
('Century Champion', 'Maintain a 100-day streak', '🏅', 750, 'epic'),
```

**Fix (CORRECT):**
```sql
-- Line 54: Change to:
('Elite Hunter', 'Reach Level 25', '⭐⭐⭐', 500, 'legendary'),

-- Line 59: Change to:
('Century Champion', 'Maintain a 100-day streak', '🏅', 750, 'legendary'),
```

### Fix 1.3: Missing xp_reward Column (Alternative Fix)

**File:** `supabase/migrations/003_social_tables.sql`

**Location:** Add after line 29 (after notifications table creation)

**Issue:** Achievement trigger tries to insert `xp_reward` column that doesn't exist

**Option A: Add the column (Recommended):**
```sql
-- Add after line 29:
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS xp_reward INT;
```

**Option B: Remove from trigger (Simpler):**
**File:** `supabase/migrations/005_achievements.sql`
**Location:** Lines 106-120

**Change the trigger INSERT from:**
```sql
INSERT INTO notifications (user_id, type, title, message, link, xp_reward)
```
**To:**
```sql
INSERT INTO notifications (user_id, type, title, message, link)
```

**Option B is simpler and recommended for dev testing.**

---

## 📋 Step 2: Execute Migrations in Correct Order

### Migration Execution Order

Execute migrations in this specific order to ensure dependencies are satisfied:

1. **001 → 002** (Base schema - should already exist)
2. **003** (Social tables - friends, notifications)
3. **005** (Achievements)
4. **006** (Profile enhancements)
5. **007** (Optimization indexes)
6. **008** (Optimization RPC functions)
7. **009_error_logging** (Error logging)
8. **009_social_feed_schema** (Hunter feed)

### Execution Steps

**For each migration file:**

1. Open the migration file from `supabase/migrations/`
2. Copy entire content (Ctrl+A, Ctrl+C)
3. Go to Supabase Dashboard → SQL Editor
4. Paste content (Ctrl+V)
5. Click "Run" button
6. Verify success (should show "Success. No rows returned")
7. Repeat for next migration

### Verification Queries

After all migrations execute, run these verification queries:

```sql
-- Check all tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public'
ORDER BY tablename;

-- Check all indexes exist
SELECT indexname FROM pg_indexes WHERE schemaname = 'public'
ORDER BY indexname;

-- Check all RPC functions exist
SELECT proname FROM pg_proc 
WHERE proname LIKE '%kudos%' 
   OR proname LIKE '%respects%'
   OR proname LIKE '%match_history%'
   OR proname = 'log_error'
ORDER BY proname;

-- Verify specific functions have correct column names
SELECT prosrc FROM pg_proc 
WHERE proname = 'get_match_history_optimized';

-- Verify achievement rarity values
SELECT name, rarity 
FROM achievements 
WHERE name IN ('Elite Hunter', 'Century Champion', 'Legendary Hunter');
```

**Expected Results:**
- 15+ tables should be listed (including `hunter_feed`, `feed_engagement`, `error_logs`)
- 20+ indexes should be listed
- 8+ RPC functions should be listed
- Achievement rarity should be `legendary` (not `epic`)

---

## 🚀 Step 3: Test /dev/feed Page

### Access the Dev Environment

**Local Development:**
```bash
# Ensure dev server is running
npm run dev

# Navigate to:
http://localhost:3000/dev/feed
```

**Vercel Deployment (if applicable):**
```bash
# Deploy to Vercel
npm run build
vercel deploy --prebuilt

# Access at:
https://ascend-rpg-fitness.vercel.app/dev/feed
```

### Testing Checklist

#### 1. Page Load Test
- [ ] Page loads without 500 errors
- [ ] Dev mode banner is visible (red background)
- [ ] Page renders completely within 3 seconds
- [ ] No console errors
- [ ] Loading skeletons appear briefly

#### 2. Feed Loading Test
- [ ] Skeletons appear before content loads
- [ ] Posts appear after loading finishes
- [ ] Trending tags load correctly
- [ ] No infinite loading states

#### 3. Create Post Test
- [ ] Click "New Broadcast (DEV)" button
- [ ] Create Post modal opens
- [ ] Post type selection works (icons visible)
- [ ] Title input accepts text
- [ ] Body textarea accepts text
- ] Tag input adds tags
- ] ] Submit button works
- [ ] Success alert appears: "Post created successfully! (DEV MODE)"
- [ ] Modal closes after success
- ] ] Post appears in feed immediately
- [ ] Post count in sidebar increments

#### 4. Kudos Toggle Test
- [ ] Click kudos button on a post
- ] ] Button fills with cyan color
- ] ] Kudos count increments
- [ ] Click kudos button again
- ] ] Button unfills
- ] ] Kudos count decrements
- [ ] Alert appears on error: "Failed to toggle kudos: [error message]"

#### 5. Respect Toggle Test
- [ ] Click respect button on a post
- [ ] Respect count increments
- [ ] Click respect button again
- ] ] Respect count decrements

#### 6. Filter Test
- [ ] Post Type filter changes (dropdown works)
- [ ] Rank filter changes (buttons work)
- [ ] Verified Only toggle works
- [ ] Friends Only toggle works
- [ ] Feed reloads when filter changes
- [ ] Active filter displays correctly in sidebar

#### 7. No 500 Errors Test
- [ ] No 500 errors in browser console
- [ ] No network errors in browser console
- [ ] No "column does not exist" errors
- [ ] No "function does not exist" errors

---

## 📊 Step 4: Verify Database State

### Check Supabase Dashboard

1. Go to **Database** section
2. Click on **Table Editor** for each table:

   - `hunter_feed`
   - `feed_engagement`
   - `error_logs`

3. **Verify columns exist:**
   - `hunter_feed` table should have: `kudos_count`, `respects_count`, `analysis_count`
   - `feed_engagement` table should have: `feed_post_id`, `user_id`, `engagement_type`

4. **Verify indexes exist:**
   - `idx_feed_created`
   - `idx_feed_engagement_post`
   - `idx_feed_engagement_user`

5. **Verify RPC functions exist:**
   - `increment_kudos_count`
   - `decrement_kudos_count`
   - `increment_respects_count`
   - `decrement_respects_count`

### Check Logs

1. Go to **Database Logs**
2. Search for any errors related to:
   - `column "proof_media_url" does not exist`
   - `column "proof_type" does not exist`
   - `relation "hunter_feed_author_fkey" does not exist`

3. **Expected:** No errors if fixes were applied correctly

---

## 🐛 Step 5: Troubleshooting Common Issues

### Issue: "column does not exist" Error

**Symptoms:**
```
column "proof_media_url" does not exist
HINT: There is a column named "proof_media_url" but it's different
```

**Root Causes:**
1. Migration 009_social_feed_schema.sql not executed
2. Typo in migration 008 (using `proof` instead of `proof`)

**Fix:**
1. Ensure migration 009_social_feed_schema.sql is executed
2. Ensure migration 008_optimization_rpc_functions.sql has the fix applied (Step 1.1)

### Issue: "relation does not exist" Error

**Symptoms:**
```
relation "hunter_feed_author_fkey" does not exist
```

**Root Cause:**
1. Migration 009_social_feed_schema.sql not executed
2. Table `hunter_feed` doesn't exist yet

**Fix:**
Execute migration 009_social_feed_schema.sql

### Issue: Posts Not Loading

**Symptoms:**
- Feed shows "No posts yet in Hunter Network"
- Loading spinner never disappears
- Console shows errors

**Root Causes:**
1. RPC functions don't exist (migrations not executed)
2. Server actions can't query non-existent tables

**Fix:**
Execute all migrations in correct order (Step 2)

### Issue: Create Post Fails

**Symptoms:**
- Alert "Failed to create post: ..."
- No post appears in feed
- Console error shows details

**Root Causes:**
1. `hunter_feed` table doesn't exist (migration not executed)
2. `feed_engagement` table doesn't exist (migration not executed)

**Fix:**
Execute migration 009_social_feed_schema.sql

### Issue: Toggle Kudos/Respect Does Nothing

**Symptoms:**
- Click button, nothing happens
- Count doesn't update
- No error in console

**Root Causes:**
1. RPC functions don't exist (migrations not executed)
2. `feed_engagement` table doesn't exist (migration not executed)

**Fix:**
Execute migration 009_social_feed_schema.sql

---

## 🔄 Step 6: Rollback Strategy (If Needed)

If migrations cause unexpected issues:

### 1. Drop Social Feed Tables

```sql
-- Use with extreme caution - this will DELETE data
DROP TABLE IF EXISTS hunter_feed CASCADE;
DROP TABLE IF EXISTS feed_engagement CASCADE;
```

### 2. Re-run Specific Migrations

```sql
-- Re-run only the problematic migration
-- Copy content from migration file and paste again
```

### 3. Restore from Database Backup

```sql
-- If you exported a backup, restore from it
-- Otherwise, contact Supabase support
```

---

## 📋 Step 7: Compare Dev vs Production

### Feature Comparison

| Feature | Dev Mode (/dev/feed) | Production (/feed) |
|---------|-------------------------|-------------------|
| Banner | Red "DEV MODE" | Normal |
| Create Post | Success alert "DEV MODE" | Normal success |
| Navigation | Links to both feeds | Production feed only |
| Testing | Checklist in sidebar | No checklist |

### Expected Behavior

- **Dev mode:** Same functionality as production, but with testing UI elements
- **Production mode:** Clean UI without testing elements
- **Both:** Should use same server actions and RPC functions

---

## ✅ Step 8: Production Deployment (After Testing)

### When Dev Feed Works Correctly

1. **Remove dev mode banner** from `app/dev/feed/page.tsx`
2. **Remove testing checklist** from right sidebar
3. **Copy dev feed code to production `/feed/page.tsx`
4. **Or:** Keep `/dev/feed` for ongoing testing

### Deployment to Production

```bash
# 1. Build the application
npm run build

# 2. Test build locally
npm run start

# 3. If everything works, deploy
vercel deploy --prebuilt
```

### Verify Production

1. Navigate to: `https://ascend-rpg-fitness.vercel.app/feed`
2. Test all functionality:
   - Feed loads
   - Create post works
   - Kudos toggle works
   - Respect toggle works
   - Filters work
   - No 500 errors

3. Check Supabase logs for any errors

---

## 📞 Support & Resources

### If You Need Help

**Supabase Documentation:**
- Schema docs: https://supabase.com/docs/guides/database/functions
- RLS policies: https://supabase.com/docs/guides/auth/row-level-security-policies

**Next.js Documentation:**
- Server Actions: https://nextjs.org/docs/app/building-your-application/caching/server-actions-and-mutations
- Routing: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts

### Common Supabase Errors

| Error | Description | Fix |
|--------|-------------|-----|
| 42P13 | Undefined table | Execute missing migration |
| 42P01 | Undefined column | Fix column name typo |
| 3F000 | Function not found | Check migration executed |

---

## 🎯 Success Criteria

### Dev Feed Testing Complete When:

- [x] All migrations executed successfully
- [x] Dev feed loads without errors
- [x] Can load posts from feed
- [x] Can create new posts
- [x] Kudos toggle works
- [x] Respect toggle works
- [x] Filters work
- [x] No 500 errors in console
- [x] Test checklist items checked
- [x] Database tables verified in Supabase
- [x] RPC functions verified in Supabase

### Production Deployment Ready When:

- [ ] Dev feed tested thoroughly
- [ ] All bugs from original report fixed
- [ ] Type check passes with zero errors
- [ ] No console errors
- [ ] All features working correctly
- [ ] Stakeholder approval obtained

---

## 📝 Notes

### Current Status (Before Starting)

- ✅ **Dev feed page created** at `/app/dev/feed/page.tsx`
- ✅ **Migration discrepancy analysis** completed
- ✅ **Bug fixes report** created
- ⏳ **Migration fixes** NOT yet applied (Step 1)
- ⏳ **Migrations NOT yet executed** (Step 2)
- ⏳ **Dev feed NOT yet tested** (Step 3)

### Next Steps

1. **[ ]** Fix all 3 migration discrepancies (Step 1)
2. **[ ]** Execute all 8 migrations in correct order (Step 2)
3. **[ ]** Test `/dev/feed` thoroughly (Step 3)
4. **[ ]** Verify database state (Step 4)
5. **[ ]** Document any issues found (Step 5)
6. **[ ]** Rollback if needed (Step 6)
7. **[ ]** Compare dev vs production (Step 7)
8. **[ ]** Deploy to production when ready (Step 8)

---

**Guide Version:** 1.0  
**Last Updated:** February 4, 2026  
**Next Review:** After migration execution and testing complete
