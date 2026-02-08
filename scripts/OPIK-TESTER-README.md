# OPIK AI Tester

**Purpose**: Test OPIK AI API connectivity and check if user "nathasan1410" is registered in LevelUp Workout

---

## Quick Start

### Run the Simple Tester (Recommended)

```bash
node scripts/test-opik-simple.js
```

### Run the Comprehensive Tester

```bash
node scripts/test-opik-ai.mjs
```

---

## What It Tests

### ✅ Opik AI API Tests
- **Environment Variables**: Checks if OPIK_API_KEY, SUPABASE_URL, and SUPABASE_ANON_KEY are set
- **Opik Connection**: Initializes the Opik client and tests connection
- **Trace Sending**: Sends test traces to Opik dashboard
- **Span Testing**: Creates and sends test spans
- **Metric Logging**: Sends test metrics to Opik
- **Error Logging**: Tests error logging functionality

### 🔍 User Check Tests
- **Supabase Query**: Checks if user "nathasan1410" exists in the `profiles` table
- **Profile Data**: If found, displays user's level, XP, rank, hunter class, and status
- **Trace Creation**: Creates a trace documenting the user check

---

## Test Results Interpretation

### ✓ All Tests Passed
- **OPIK AI API is working correctly**
- All traces, spans, and metrics are being sent to the Opik dashboard

### ⚠ Warning (User Not Found)
- User "nathasan1410" is NOT registered in the system
- The user needs to sign up to access LevelUp Workout

### ✗ Tests Failed
- Check environment variables in `.env.local`
- Verify OPIK_API_KEY is valid
- Check network connectivity

---

## Current Test Results

**Last Run**: February 8, 2026
**Total Tests**: 7
**Passed**: 6
**Failed**: 0
**Warnings**: 1
**Success Rate**: 85.7%

### User Check Result
**Target User**: nathasan1410
**Status**: ❌ NOT FOUND
**Explanation**: The user has not been registered yet

---

## How to Add User "nathasan1410"

### Option 1: Sign Up Through App
1. Open the LevelUp Workout app
2. Click "Sign Up"
3. Enter email and password
4. Set username to "nathasan1410"
5. Complete onboarding

### Option 2: Create Demo Account Script
```bash
node scripts/create-demo-accounts.js
```

Then modify the script to add "nathasan1410" as a demo account.

### Option 3: Direct Database Insert (Advanced)
1. Go to Supabase Dashboard
2. Open SQL Editor
3. Run:
```sql
-- Insert user (you'll need to create auth user first via Supabase Auth)
INSERT INTO profiles (id, username, email, level, xp, rank, hunter_class, hunter_status)
VALUES (
  '<user_id_from_auth>', 
  'nathasan1410',
  'email@example.com',
  1,
  0,
  'E',
  'Warrior',
  'Normal'
);
```

---

## Viewing Results in Opik Dashboard

1. Go to [https://www.comet.com/opik](https://www.comet.com/opik)
2. Login with your account
3. Select project: **LevelUp Workout**
4. Look for traces named:
   - `opik_tester_nathasan1410_check`
   - `user_check_nathasan1410`
5. View trace details, spans, and metrics

---

## Environment Variables Required

Create or edit `.env.local` in the project root:

```env
OPIK_API_KEY=your_opik_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Troubleshooting

### Issue: "OPIK_API_KEY is not set"
**Solution**: Add `OPIK_API_KEY` to `.env.local` file

### Issue: "Failed to import opik package"
**Solution**: Run `npm install opik`

### Issue: "User not found in Supabase"
**Solution**: User needs to sign up or be added manually (see above)

### Issue: "Failed to send trace to Opik"
**Solution**: 
- Check network connectivity
- Verify OPIK_API_KEY is valid
- Check Opik dashboard for API key status

---

## Scripts Available

| Script | Description | Usage |
|--------|-------------|-------|
| `test-opik-simple.js` | Simple Opik connectivity test + user check | `node scripts/test-opik-simple.js` |
| `test-opik-ai.mjs` | Comprehensive Opik API tests | `node scripts/test-opik-ai.mjs` |
| `test-groq-api.mjs` | Test Groq AI API | `node scripts/test-groq-api.mjs` |

---

## Project Information

- **Project Name**: LevelUp Workout
- **Framework**: Next.js 14
- **Database**: Supabase (PostgreSQL)
- **AI APIs**: 
  - Opik (monitoring & evaluation)
  - Groq (quest generation)

---

## Support

For issues or questions:
- Check Opik documentation: https://www.comet.com/docs/opik
- Check Supabase documentation: https://supabase.com/docs
- Review existing test scripts in `scripts/` directory

---

*Last Updated: February 8, 2026*
