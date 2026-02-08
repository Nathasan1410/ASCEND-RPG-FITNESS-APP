# OPIK AI Tester - Level Up Workout

## 📋 Overview

This tester is designed to test the OPIK AI API connectivity and check if user "nathasan1410" is registered in the Level Up Workout application.

## 🎯 Target User

**Username**: nathasan1410  
**Status**: ❌ NOT YET REGISTERED (as of last test run)

---

## 🚀 Quick Start

### Run Complete Workflow (Recommended)
```bash
node scripts/opik-tester-complete.js
```

### Run Individual Tests
```bash
# Test OPIK API only
node scripts/test-opik-simple.js

# Test OPIK API (comprehensive)
node scripts/test-opik-ai.mjs

# Check user status only
node scripts/check-user-nathasan1410.js
```

---

## 📊 Test Results (Latest Run)

**Date**: February 8, 2026  
**Duration**: 6.42 seconds

| Test | Status | Details |
|------|--------|---------|
| Environment Variables | ✅ PASS | All variables set correctly |
| Opik Initialization | ✅ PASS | Client initialized successfully |
| Send Test Trace | ✅ PASS | Trace sent to Opik dashboard |
| User Check | ⚠️ WARN | User "nathasan1410" not found |
| Create User Check Trace | ✅ PASS | Trace created documenting check |

**Summary**:
- Total Tests: 7
- Passed: 6
- Failed: 0
- Warnings: 1
- Success Rate: 85.7%

---

## 🔍 User Status: nathasan1410

### Current Status
```
❌ NOT FOUND in profiles table
```

### What This Means
- User has not been registered in Level Up Workout yet
- User cannot login until account is created
- Auth user and profile need to be created

---

## ➕ How to Add User "nathasan1410"

### Option 1: Automatic Scripts (Recommended)

#### Step 1: Create Auth User
```bash
node scripts/add-user-nathasan1410.js
```

This will:
- Create user in Supabase Auth system
- Set email: nathasan1410@test.com
- Set password: Test123!
- Assign E-Rank, Level 1, Novice class

#### Step 2: Create Profile
```bash
node scripts/create-profile-nathasan1410.js
```

This will:
- Create profile in `profiles` table
- Link to Auth user
- Set initial stats and rank

### Option 2: Manual SQL

1. Create Auth user (run the add-user script first)
2. Get the user ID from the script output
3. Run SQL in Supabase Dashboard:

```sql
INSERT INTO profiles (id, username, email, level, xp, rank, hunter_class, hunter_status)
VALUES (
  '<USER_ID_FROM_SCRIPT_OUTPUT>',
  'nathasan1410',
  'nathasan1410@test.com',
  1,
  0,
  'E',
  'Novice',
  'Normal'
);
```

---

## 🔐 Login Credentials (After Creation)

**Email**: nathasan1410@test.com  
**Password**: Test123!

---

## 📈 Opik Dashboard Access

### View Test Results
1. Go to [https://www.comet.com/opik](https://www.comet.com/opik)
2. Login to your account
3. Select project: **Level Up Workout**
4. Look for traces:
   - `opik_tester_nathasan1410_check`
   - `user_check_nathasan1410`

### What You'll See
- All test traces with timestamps
- Input/output data for each trace
- Metrics and error logs
- Performance data

---

## 📁 Available Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `opik-tester-complete.js` | Complete workflow (test + check user) | `node scripts/opik-tester-complete.js` |
| `test-opik-simple.js` | Simple Opik API test | `node scripts/test-opik-simple.js` |
| `test-opik-ai.mjs` | Comprehensive Opik test | `node scripts/test-opik-ai.mjs` |
| `add-user-nathasan1410.js` | Create auth user | `node scripts/add-user-nathasan1410.js` |
| `create-profile-nathasan1410.js` | Create profile | `node scripts/create-profile-nathasan1410.js` |

---

## 🔧 Environment Variables Required

Create or edit `.env.local`:

```env
OPIK_API_KEY=3rBkXOzhiSVHTGKnmA4JYWqIv
NEXT_PUBLIC_SUPABASE_URL=https://lwzdgxyhorocyysuvceh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_1p5ypVoXBARsJ5-fpo-bbw_v1Wx8N57
SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ❓ Troubleshooting

### Issue: "OPIK_API_KEY is not set"
**Solution**: Add OPIK_API_KEY to `.env.local` file

### Issue: "User not found in Supabase"
**Solution**: Run the add user scripts to create the account

### Issue: "Failed to send trace to Opik"
**Solution**: 
- Check network connectivity
- Verify OPIK_API_KEY is valid
- Check Opik dashboard for API key status

### Issue: "Failed to create auth user"
**Solution**: 
- Check SERVICE_ROLE_KEY is correct
- Verify SUPABASE_URL is correct
- Check Supabase project status

---

## 📚 Documentation

- **Opik Docs**: https://www.comet.com/docs/opik
- **Supabase Docs**: https://supabase.com/docs
- **Project README**: See project root README.md

---

## 🎓 How the Tester Works

### 1. Environment Check
Verifies all required environment variables are set

### 2. Opik Connection Test
- Initializes Opik client with API key
- Creates test trace
- Sends trace to Opik dashboard

### 3. User Check
- Queries Supabase `profiles` table
- Searches for username "nathasan1410"
- Returns profile data if found

### 4. Trace Creation
- Creates trace documenting user check
- Sends trace with result (found/not found)
- Tags trace with username for easy search

---

## 🔄 Workflow Diagram

```
┌─────────────────────────────────────────┐
│   Run: opik-tester-complete.js         │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│   STEP 1: Test OPIK API                 │
│   • Check env variables                 │
│   • Initialize Opik client              │
│   • Send test traces                    │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│   STEP 2: Check User Status             │
│   • Query Supabase profiles table       │
│   • Search for "nathasan1410"           │
│   • Display results                     │
└────────────┬────────────────────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
  Found ✓      Not Found ✗
      │             │
      ▼             ▼
  Display       Show Instructions
  Profile       to create user
  Details
```

---

## 📝 Next Steps

### If User Exists
1. ✅ User is ready to use Level Up Workout
2. Login with credentials provided above
3. Start your fitness journey!

### If User Doesn't Exist
1. Run: `node scripts/add-user-nathasan1410.js`
2. Run: `node scripts/create-profile-nathasan1410.js`
3. Run tester again to verify: `node scripts/opik-tester-complete.js`
4. Login with: nathasan1410@test.com / Test123!

---

## 🎉 Success Checklist

After adding the user, verify:
- [ ] User can login with email: nathasan1410@test.com
- [ ] User can login with password: Test123!
- [ ] Profile displays correctly (E-Rank, Level 1)
- [ ] User can access the dashboard
- [ ] User can complete quests
- [ ] Opik traces are visible in dashboard

---

## 📞 Support

For issues or questions:
- Check Opik documentation
- Review existing test scripts in `scripts/` directory
- Check `.env.local` configuration
- Verify Supabase project status

---

*Last Updated: February 8, 2026*  
*Project: Level Up Workout*  
*Target User: nathasan1410*
