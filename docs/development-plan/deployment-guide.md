# 🚀 Deployment Guide: The System

This guide outlines the steps to deploy "The System" to production using **GitHub** and **Vercel**.

## 1. Prerequisites

Ensure you have the following ready:
- **GitHub Account**: To host the source code.
- **Vercel Account**: To deploy the Next.js application.
- **Supabase Project**: With the database schema applied.
- **Groq API Key**: For the AI Architect.
- **Opik API Key**: For the AI Judge.

## 2. Push to GitHub

The project is already initialized as a local Git repository.

1.  Create a **new repository** on GitHub (e.g., `the-system-solo-leveling`).
2.  Run the following commands in your terminal to push the code:

```bash
# Add the remote repository
git remote add origin https://github.com/Nathasan1410/the-system-solo-leveling.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

## 3. Database Setup (Supabase)

Before deploying the app, ensure your database schema is active.

1.  Go to your **Supabase Dashboard** -> **SQL Editor**.
2.  Open the file `supabase/schema.sql` from this project.
3.  Copy the entire content and paste it into the Supabase SQL Editor.
4.  Click **Run**.
5.  *Optional:* Create a storage bucket named `proof-media` in the Storage section and set it to Public.

## 4. Deploy to Vercel

1.  Go to your **Vercel Dashboard** and click **"Add New..."** -> **"Project"**.
2.  Import the Git repository you just pushed.
3.  **Configure Project:**
    *   **Framework Preset:** Next.js
    *   **Root Directory:** `./` (default)
4.  **Environment Variables:**
    Expand the "Environment Variables" section and add the following keys (copy from your `.env.local`):

    | Key | Value Description |
    |-----|-------------------|
    | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
    | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key |
    | `GROQ_API_KEY` | Your Groq API Key |
    | `OPIK_API_KEY` | Your Opik API Key |

5.  Click **Deploy**.

## 5. Post-Deployment Checks

Once Vercel finishes building:

1.  Visit the deployment URL.
2.  **Test Auth:** Sign up a new user. Check if `profiles` table updates in Supabase.
3.  **Test Onboarding:** Complete the wizard.
4.  **Test Quest Gen:** Go to Dashboard and generate a quest. (If Groq key works, you'll see a unique workout; otherwise fallback).
5.  **Test Execution:** "Start" the quest and submit a log.

## 6. Troubleshooting

- **Build Errors on Vercel:** Check the "Build Logs". Ensure `npm install` succeeded.
- **Database Errors:** Check Supabase RLS policies in `supabase/schema.sql`. Ensure you ran the SQL script.
- **AI Errors:** Check Vercel "Runtime Logs" to see if Groq/Opik calls are failing (usually invalid API key).

---

*Status: Ready for Deployment*
