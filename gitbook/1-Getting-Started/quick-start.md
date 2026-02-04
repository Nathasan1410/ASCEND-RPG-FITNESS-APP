# Quick Start Guide

Start using ASCEND in 60 seconds with demo accounts or set up your own environment.

## Option 1: Try Demo Accounts (2 minutes)

Demo accounts let you explore ASCEND without signing up. Choose any rank level to see different features unlocked.

### Quick Demo Steps

1. **Select Demo Account**
   - Choose from S-Rank, A-Rank, B-Rank, or C-Rank accounts
   - Copy email and password (all use same password: `Test123!`)

2. **Login**
   - Go to `/login`
   - Enter demo credentials
   - Access the dashboard

3. **Explore Features**
   - **Dashboard**: View your stats and current quest
   - **Generate Quest**: Click "Generate Quest" to create a new workout
   - **Hunter Network**: View social feed and see what other hunters are doing
   - **Leaderboard**: Check global rankings

4. **Complete a Quest**
   - Follow exercises in your quest
   - Track sets and reps
   - Upload proof (photo/video)
   - Earn XP and check your level!

[View All Demo Accounts](./demo-accounts.md)

---

## Option 2: Local Setup (10 minutes)

### Prerequisites

- Node.js 18+ or higher
- npm or yarn
- Git
- Supabase account (free tier)
- GitHub account (for deployment)

### Step 1: Clone Repository

```bash
git clone https://github.com/username/ASCEND-RPG-FITNESS-APP
cd ASCEND-RPG-FITNESS-APP
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Groq AI Configuration
GROQ_API_KEY=your-groq-api-key

# Opik Configuration
OPIK_API_KEY=your-opik-api-key
OPIK_PROJECT_NAME=ascend-fitness-rpg
```

### Step 4: Set Up Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Run the database migrations from `supabase/migrations/`
4. Configure storage buckets for proof uploads
5. Set up Row-Level Security (RLS) policies

### Step 5: Start Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see ASCEND running locally.

---

## First Quest Walkthrough

After logging in, follow these steps to complete your first quest:

### 1. Navigate to Dashboard

Click on the "Dashboard" link in the navigation menu to see your current stats and available quests.

### 2. Generate Your First Quest

- Click the "Generate Quest" button
- Select your equipment (e.g., "dumbbells", "barbell", "bodyweight")
- Choose your goals (e.g., "strength", "hypertrophy", "endurance")
- Wait for AI to generate your personalized quest

### 3. Complete the Workout

- Read through the quest exercises
- Follow the warm-up routine
- Complete each exercise with proper form
- Track your sets, reps, and weights
- Finish with the cool-down routine

### 4. Upload Proof

- Click "Complete Quest"
- Upload a photo or video proof of your workout
- Add any notes about your performance
- Submit for verification

### 5. Receive XP and Level Up!

- AI judge evaluates your quest completion
- You'll receive XP based on:
  - Quest difficulty
  - Completion quality (form, effort, consistency)
  - Judge score multiplier
- Check your stats dashboard to see your new level!

---

## Demo Account Features

### S-Rank Accounts (Top Tier)

**Features Unlocked:**
- All quests and equipment types
- Full access to social features
- Advanced analytics and graphs
- Custom workout builder
- Priority AI judge evaluation

**Recommended For:**
- Seeing all features at once
- Testing advanced gamification
- Exploring social features

### A-Rank Accounts (Advanced)

**Features Unlocked:**
- Most quests and equipment
- Full social features
- Basic analytics
- Standard AI judge

**Recommended For:**
- Testing advanced quests
- Checking leaderboard competitiveness
- Viewing social feed interactions

### B-Rank Accounts (Experienced)

**Features Unlocked:**
- Moderate quests
- Social feed viewing
- Basic analytics
- Standard AI judge

**Recommended For:**
- Testing quest variety
- Seeing progression mechanics
- Understanding XP system

### C-Rank Accounts (Beginner)

**Features Unlocked:**
- Basic quests
- Limited social features
- Simple stats

**Recommended For:**
- First-time users
- Learning the interface
- Understanding core gameplay loop

---

## Common Issues

### Issue: Can't Login with Demo Account

**Solution:**
- Ensure you're using the correct email format
- Password is case-sensitive: `Test123!`
- Try a different demo account

### Issue: Quest Generation Fails

**Solution:**
- Check your Groq API key is valid
- Verify you have sufficient credits
- Try again (AI generation can timeout)

### Issue: Proof Upload Fails

**Solution:**
- Check file size (max 10MB)
- Verify file type (JPEG, PNG, MP4, WebM)
- Check your Supabase storage configuration

### Issue: XP Not Awarded

**Solution:**
- Ensure proof was uploaded
- Wait for AI judge evaluation (may take 1-2 minutes)
- Check for any error messages

---

## Next Steps

After completing your first quest, explore more features:

1. **Hunter Network**: See what other hunters are doing
2. **Leaderboard**: Check global rankings
3. **Profile**: Update your hunter class and goals
4. **Settings**: Configure preferences and privacy
5. **Help Center**: Read guides for advanced features

---

## Support

Need help? Visit our [Help Center](../../app/help/page.tsx) or [contact support](mailto:support@ascend.fitness).

---

**Ready to start your journey?** [View Demo Accounts](./demo-accounts.md) or [Set Up Locally](./installation.md)
