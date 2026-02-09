# ASCEND: FITNESS RPG - DEPLOYMENT WALKTHROUGH

> **Project:** ASCEND: FITNESS RPG  
> **Version:** 1.0  
> **Last Updated:** February 3, 2026  
> **Purpose:** Complete guide to deploy application to production

---

## Overview

This document provides a step-by-step walkthrough to deploy ASCEND: FITNESS RPG to production on Vercel with Supabase as backend.

**Deployment Stack:**
- **Hosting:** Vercel
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **AI Services:** Groq (Quest Generation) + Opik (Evaluation/Judge)
- **Frontend:** Next.js 14 (App Router)

---

## Pre-Deployment Checklist

### 1. Prerequisites

Before starting deployment, ensure you have:

- [ ] **Vercel Account** - Free tier is sufficient for MVP
- [ ] **Supabase Account** - Free tier (500MB DB, 50K MAU)
- [ ] **GitHub Account** - Repository must exist
- [ ] **Groq API Key** - For quest generation
- [ ] **Opik API Key** - For AI judge system
- [ ] **Node.js 18+** - Installed locally

### 2. Required Accounts & API Keys

| Service | Account Type | Purpose | Get From |
|--------|-------------|---------|-----------|
| **Vercel** | Hosting | Deploy & host app | https://vercel.com/signup |
| **GitHub** | Version Control | Push code from local | https://github.com/new |
| **Supabase** | Backend | Database, Auth, Storage | https://supabase.com/signup |
| **Groq** | AI API | Quest generation | https://console.groq.com/keys |
| **Opik** | AI SDK | Judge system | https://www.comet.com/opik |

---

## Step 1: Supabase Setup (Database)

### 1.1 Create Supabase Project

1. Go to https://supabase.com/signup
2. Sign up or log in
3. Click "New Project"
4. Name it: `ascend-fitness-rpg`
5. Set organization (if applicable)
6. Choose a region closest to your users (e.g., US East, EU West)

### 1.2 Get Database Connection String

1. Navigate to **Settings > Database**
2. Note down:
   - **Project URL:** `https://<project-id>.supabase.co`
   - **API URL:** `https://<project-id>.supabase.co`
   - **Anon Key:** (Public key for client-side)
   - **Service Role Key:** (For server-side operations - keep secret)

**Copy these values** - You'll need them for environment variables.

---

## Step 2: Apply Database Migrations

### 2.1 Migrations to Apply

You have 3 migration files that must be run in order:

1. **`supabase/migrations/003_social_tables.sql`**
   - Creates `friends` and `notifications` tables
   - Sets up RLS policies
   - Creates 2 database triggers

2. **`supabase/migrations/005_achievements.sql`**
   - Creates `achievements` and `user_achievements` tables
   - Seeds 46 achievements
   - Creates achievement notification trigger

3. **`supabase/migrations/006_profile_enhancements.sql`**
   - Adds columns to `profiles` table (bio, display_name, banner_url, allow_friend_requests)
   - Creates materialized view for leaderboard
   - Adds 6 performance indexes
   - Creates refresh function

### 2.2 Apply Migrations

1. In Supabase dashboard, navigate to **SQL Editor**
2. **Copy and run `003_social_tables.sql`**
   ```sql
   -- Paste entire content of 003_social_tables.sql
   -- Click "Run"
   -- Verify output: Success with 2 tables and 2 triggers
   ```
3. **Copy and run `005_achievements.sql`**
   ```sql
   -- Paste entire content of 005_achievements.sql
   -- Click "Run"
   -- Verify output: Success with 2 tables and 46 rows inserted
   ```
4. **Copy and run `006_profile_enhancements.sql`**
   ```sql
   -- Paste entire content of 006_profile_enhancements.sql
   -- Click "Run"
   -- Verify output: Success with 4 columns added, 1 materialized view, 6 indexes
   ```

### 2.3 Verify Migrations

Run these verification queries:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Expected output: 7 tables
-- achievements, friends, logs, notifications, profiles, quests, user_achievements
```

```sql
-- Check materialized view
SELECT view_name 
FROM information_schema.views 
WHERE view_name = 'leaderboard_mv';
```

```sql
-- Count achievements
SELECT COUNT(*) FROM achievements;
-- Expected: 46
```

```sql
-- Check triggers
SELECT trigger_name 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
-- Expected: 3 triggers (friend_request, friend_accepted, achievement_unlock)
```

---

## Step 3: Configure Environment Variables

### 3.1 Create Local Environment File

Create or update `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Groq API (Quest Generation)
GROQ_API_KEY=gsk_your-groq-api-key-here

# Opik API (AI Judge System)
OPIK_API_KEY=your-opik-api-key-here
OPIK_PROJECT_NAME=ascend-fitness-rpg

# Application
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

**⚠️ CRITICAL:** Never commit `.env.local` to version control!

### 3.2 Vercel Environment Variables

After deploying, you'll need to set these in Vercel:

1. Go to **Vercel Dashboard** → **Project Settings** → **Environment Variables**
2. Add these variables:

| Variable | Value | Environment |
|----------|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Anon key | All |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Service Role Key | Production |
| `GROQ_API_KEY` | Your Groq API key | All |
| `OPIK_API_KEY` | Your Opik API key | All |
| `OPIK_PROJECT_NAME` | `ascend-fitness-rpg` | All |

---

## Step 4: Push Code to GitHub

### 4.1 Initialize Git Repository (if not done)

```bash
# From project root
cd D:\Projekan\OpikAI-SoloLevel

# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: ASCEND Fitness RPG - Full social + achievements implementation

- Parts I-II: Navigation, Settings
- Part III: Social Features (Friends, Notifications)
- Part IV-V: Quest Enhancements, Achievements
- Part VI-VII: Profile enhancements, Technical optimizations"
```

### 4.2 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ascend-fitness-rpg` (or your preferred name)
3. Description: "A gamified fitness RPG inspired by Solo Leveling mechanics"
4. Make it Public
5. Click "Create repository"

### 4.3 Push to GitHub

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/your-username/ascend-fitness-rpg.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 5: Deploy to Vercel

### 5.1 Connect Vercel to GitHub

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose the repository you just created
5. Click **"Import"**

### 5.2 Configure Build Settings

Vercel should automatically detect Next.js. Configure:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `./` (default) |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### 5.3 Set Environment Variables

In the Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add all variables from **Step 3.2**
3. Make sure **"Include in Vercel Build"** is checked for all
4. Click **Save**

### 5.4 Deploy

1. Click **"Deploy"** button
2. Wait for deployment to complete (usually 2-3 minutes)
3. Vercel will provide a deployment URL like `https://ascend-fitness-rpg.vercel.app`

---

## Step 6: Post-Deployment Verification

### 6.1 Test Live Application

1. Visit your deployment URL
2. Test these critical flows:

#### Authentication Flow
- [ ] Sign up with email
- [ ] Complete onboarding wizard
- [ ] Reach dashboard
- [ ] Verify profile created

#### Core Features
- [ ] Generate daily quest
- [ ] Complete quest with timer
- [ ] Submit quest log
- [ ] Receive XP reward
- [ ] Level up notification
- [ ] Leaderboard loads
- [ ] Settings page works
- [ ] Profile page displays correctly

#### Social Features (Part III)
- [ ] Search for users
- [ ] Send friend request
- [ ] Accept friend request
- [ ] View friends list
- [ ] Notification center loads
- [ ] Mark notification as read
- [ ] Delete notification

#### Achievements (Part V)
- [ ] Achievements page loads
- [ ] All 46 achievements displayed
- [ ] Rarity grouping correct
- [ ] Lock/unlock status visible
- [ ] "Check for New" works
- [ ] Achievement unlocked triggers notification

### 6.2 Check Vercel Logs

1. In Vercel dashboard, go to **Deployments** → **Build Log**
2. Verify no build errors
3. Check deployment was successful
4. Note the deployment time and commit hash

### 6.3 Verify Database Connection

1. In Supabase dashboard, go to **Database** → **Logs**
2. Check for any recent errors
3. Verify tables were created (see Step 2.3)
4. Check triggers are active

---

## Step 7: Configure Custom Domain (Optional)

### 7.1 Purchase Custom Domain

1. Purchase a domain (e.g., `ascend.fitness`, `ascendrpg.com`)
2. Point DNS to Vercel (instructions provided by Vercel)

### 7.2 Add Domain to Vercel

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain
4. Follow DNS configuration steps
5. Wait for SSL certificate (usually 5-15 minutes)

### 7.3 Update Environment Variables

Update `NEXT_PUBLIC_APP_URL` to your custom domain:

```bash
# In Vercel environment variables
NEXT_PUBLIC_APP_URL=https://ascend.fitness
```

---

## Step 8: Monitoring & Analytics Setup

### 8.1 Vercel Analytics

Vercel provides built-in analytics:

1. Go to **Analytics** tab in Vercel dashboard
2. Check page views, unique visitors, top pages
3. Set up conversion goals (if desired)

### 8.2 Error Tracking (Optional)

For production error tracking:

1. **Sentry Integration** (Recommended)
   - Sign up at https://sentry.io
   - Create Next.js project
   - Add DSN to environment variables:
     ```bash
     SENTRY_DSN=https://your-sentry-dsn
     ```

2. **Vercel Error Logs**
   - Already available in Vercel dashboard
   - No additional setup needed

### 8.3 Performance Monitoring

Monitor Core Web Vitals:

1. Go to your deployed app
2. Open browser DevTools
3. Go to **Lighthouse** tab
4. Run Lighthouse report
5. Target scores:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

---

## Step 9: Ongoing Maintenance

### 9.1 Database Maintenance

#### Refresh Materialized Leaderboard

The materialized view (`leaderboard_mv`) needs periodic refresh:

**Option 1: Manual Refresh**
- Run in Supabase SQL Editor:
  ```sql
  SELECT refresh_leaderboard();
  ```

**Option 2: Scheduled Refresh (Recommended)**
- Use Supabase pg_cron extension:
  ```sql
  -- In Supabase SQL Editor:
  SELECT cron.schedule(
    'refresh-leaderboard',
    '*/10 * * * *', -- Every 10 minutes
    $$ REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_mv; $$
  );
  ```

### 9.2 Update Application

When updating the application:

1. **Test locally first**
   ```bash
   npm run dev
   ```

2. **Run build check**
   ```bash
   npm run build
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Update: [description]"
   git push
   ```

### 9.3 Monitor API Quotas

Check your service limits:

| Service | Free Tier Limit | Monitor |
|---------|----------------|----------|
| **Supabase** | 500MB DB, 50K MAU, 1GB Storage | Dashboard |
| **Vercel** | 100GB bandwidth, 6GB builds/month | Dashboard |
| **Groq** | 50K requests/month (varies) | Dashboard |
| **Opik** | 1K traces/month (varies) | Dashboard |

---

## Troubleshooting

### Build Errors

#### TypeScript Errors

If you see TypeScript errors:
```bash
# Check type errors
npm run type-check

# Fix errors in source files
```

#### Build Failures

If build fails:
1. Check error logs in terminal
2. Fix reported issues
3. Run `npm run build` again

### Runtime Errors

#### Database Connection Failed

If app can't connect to database:

1. Verify `NEXT_PUBLIC_SUPABASE_URL` is set correctly
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set correctly
3. Check Supabase project is active (not paused)
4. Check RLS policies aren't blocking access

#### API Errors

If Groq or Opik fails:

1. Check API keys are correct
2. Check you haven't exceeded quota limits
3. Check API service status pages

### Deployment Issues

#### Vercel Build Timeout

If build times out:

1. Check for infinite loops
2. Optimize build time
3. Increase Vercel timeout (Settings → General → Build Timeout)

#### Environment Variables Not Working

If env vars don't load:

1. Ensure they're added in Vercel dashboard
2. Restart deployment after adding
3. Check for typos in variable names
4. Verify variable values don't have spaces

---

## Security Checklist

### Before Production Deployment

- [ ] **Remove development files** (`.env.local`, `.DS_Store`, etc.)
- [ ] **Set strong secrets** (long, random strings)
- [ ] **Enable 2FA** on all accounts (Vercel, Supabase, GitHub)
- [ ] **Review RLS policies** in Supabase
- [ ] **Test authentication flow** thoroughly
- [ ] **Enable error monitoring** (Sentry recommended)
- [ ] **Set up rate limiting** (if implementing public APIs)
- [ ] **Review API key permissions** (minimal required scope)

### Database Security

- [ ] **RLS enabled** on all tables
- [ ] **No hardcoded credentials** in code
- [ ] **Supabase Row Level Security** configured
- [ ] **Service Role Key** used only on server
- [ ] **Anon Key** used only on client (browser)

---

## Rollback Plan

### If Deployment Fails

#### Option 1: Keep Previous Version

1. Don't delete previous Vercel deployment
2. Vercel keeps last 3 deployments
3. In Vercel dashboard, go to **Deployments**
4. Click **...** on previous deployment
5. Click **Promote to Production**

#### Option 2: Hotfix Branch

```bash
# Create hotfix branch
git checkout -b hotfix/issue-name

# Fix the issue
# ... make changes ...

# Commit and push
git add .
git commit -m "Hotfix: [description]"
git push origin hotfix/issue-name

# Merge to main after testing
git checkout main
git merge hotfix/issue-name
git push origin main
```

### Database Rollback

If database migrations fail:

1. Identify which migration failed
2. Write rollback SQL:
   ```sql
   -- Example: Drop problematic tables
   DROP TABLE IF EXISTS problematic_table CASCADE;
   ```
3. Run rollback in Supabase SQL Editor
4. Fix migration script
5. Re-test migration locally
6. Re-apply fixed migration

---

## Performance Optimization

### Build Optimization

#### Enable Production Optimizations

In `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config ...
  
  // Enable swc minification (faster builds)
  swcMinify: true,
  
  // Enable image optimization
  images: {
    domains: ['your-domain.com'],
    remotePatterns: ['^https://.*\\.supabase\\.co'],
  },
  
  // Compress output
  compress: true,
  
  // Production source maps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
```

### Database Optimization

#### Enable Query Caching

In `lib/supabase/server.ts`, enable caching:

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      // Enable connection pooling
      fetch: {
        // Cache revalidation for 60 seconds
        revalidate: 60,
      },
    },
  }
);
```

---

## Scaling Considerations

### When to Scale Up

Consider upgrading from free tiers when:

- **Supabase**: > 50K MAU or > 500MB database
- **Vercel**: > 100GB bandwidth/month or > 6GB builds
- **Groq**: Consistently hitting API limits
- **Opik**: Exceeding trace limits

### Cost Optimization

To reduce costs:

1. **Optimize database queries** (reduce read/write operations)
2. **Implement caching** (reduce Supabase requests)
3. **Use CDN** for static assets
4. **Optimize build times** (reduce Vercel build minutes)
5. **Compress images** (reduce bandwidth)

---

## Success Criteria

Your deployment is successful when:

- [ ] Application builds without errors
- [ ] All 3 database migrations applied successfully
- [ ] Environment variables configured in Vercel
- [ ] Application deployed and accessible at your URL
- [ ] Authentication flow works end-to-end
- [ ] Core quest loop functions (generate → complete → XP)
- [ ] Social features work (friends, notifications)
- [ ] Achievements display and unlock correctly
- [ ] Leaderboard loads fast (< 200ms)
- [ ] Mobile navigation works correctly
- [ ] Settings page saves to database
- [ ] No TypeScript errors in production build
- [ ] Vercel build succeeds
- [ ] SSL certificate enabled (if using custom domain)
- [ ] Error monitoring configured

---

## Quick Reference Commands

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run type-check

# Build production bundle
npm run build

# Start production server locally
npm start
```

### Git Commands

```bash
# Check status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push

# View commit history
git log --oneline
```

### Database Verification

```sql
-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Count rows in specific tables
SELECT COUNT(*) FROM profiles;
SELECT COUNT(*) FROM friends;
SELECT COUNT(*) FROM notifications;
SELECT COUNT(*) FROM achievements;

-- View triggers
SELECT trigger_name FROM information_schema.triggers WHERE trigger_schema = 'public';
```

---

## Support Resources

### Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Groq Docs:** https://console.groq.com/docs
- **Opik Docs:** https://www.comet.com/docs/opik

### Community

- **Next.js GitHub:** https://github.com/vercel/next.js
- **Supabase GitHub:** https://github.com/supabase/supabase-js
- **Vercel Discord:** https://vercel.com/discord

### Emergency Contacts

- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support

---

## Next Steps After Deployment

1. **User Acceptance Testing**
   - Share app with 5-10 beta users
   - Collect feedback on all features
   - Identify critical bugs
   - Gather UX improvement suggestions

2. **Monitor First 48 Hours**
   - Check error logs regularly
   - Monitor database performance
   - Track API usage (Groq, Opik)
   - Watch for unusual activity patterns

3. **Week 1 Maintenance**
   - Refresh materialized view
   - Review analytics data
   - Optimize slow queries
   - Address user-reported issues

4. **Month 1 Roadmap**
   - Plan feature enhancements based on user feedback
   - Consider adding more achievements
   - Evaluate need for guilds system
   - Assess scaling requirements

---

## Deployment Timeline Estimate

| Task | Time Estimate | Notes |
|------|----------------|-------|
| Supabase Setup | 15 min | Create project, get keys |
| Apply Database Migrations | 20 min | Run 3 SQL files |
| Configure Environment Variables | 10 min | Set up .env.local |
| Push to GitHub | 10 min | Initial push |
| Vercel Setup & Deploy | 15 min | Connect repo, set env vars, deploy |
| Verification & Testing | 30 min | Test all flows |
| **Total First Deployment** | **~1.5 hours** | |

---

## Conclusion

This deployment guide covers all steps needed to deploy ASCEND: FITNESS RPG to production. Follow each step carefully and verify success before proceeding to the next.

**Key Points:**
- Apply all 3 database migrations in correct order
- Configure all environment variables in Vercel
- Test thoroughly before promoting to production
- Set up monitoring and error tracking
- Plan for scaling and maintenance

**After Deployment:**
Your app will be live at `https://your-app-name.vercel.app` with full gamification features including friends, notifications, and achievements.

**Good luck, Hunter!** 🎯
