# Installation Guide

Complete setup instructions for running ASCEND locally or deploying to production.

## System Requirements

### Development Environment

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn 1.22.0+)
- **Git**: 2.30.0 or higher
- **OS**: Windows, macOS, or Linux

### Production Environment

- **Vercel**: For frontend deployment
- **Supabase**: For backend services
- **Groq**: For AI quest generation
- **Opik**: For AI monitoring

---

## Step 1: Clone Repository

```bash
git clone https://github.com/username/ASCEND-RPG-FITNESS-APP
cd ASCEND-RPG-FITNESS-APP
```

---

## Step 2: Install Dependencies

### Using npm

```bash
npm install
```

### Using yarn

```bash
yarn install
```

This installs all required dependencies including:
- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS
- Supabase client
- Groq SDK
- Framer Motion

---

## Step 3: Configure Environment Variables

### Create `.env.local` File

Copy the example environment file:

```bash
cp .env.example .env.local
```

### Environment Variables Explained

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

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ASCEND: FITNESS RPG
```

### Where to Get Keys

#### Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing
3. Go to Project Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`

#### Groq API Key

1. Go to [Groq Console](https://console.groq.com)
2. Create an account (free tier available)
3. Go to API Keys
4. Create new API key
5. Copy to `GROQ_API_KEY`

#### Opik API Key

1. Go to [Opik Dashboard](https://www.comet.com/site/opik)
2. Create an account
3. Go to Project Settings
4. Copy API key to `OPIK_API_KEY`

---

## Step 4: Set Up Supabase Database

### Run Migrations

```bash
npx supabase db push
```

This applies all database migrations from `supabase/migrations/`:
- Create tables (users, quests, match_history, etc.)
- Set up Row-Level Security (RLS) policies
- Create indexes for performance
- Seed initial data

### Create Storage Buckets

Go to Supabase Dashboard → Storage:

1. Create `proof-uploads` bucket
2. Set bucket to public (for serving images/videos)
3. Add RLS policies:
   ```sql
   CREATE POLICY "Users can upload their own proofs"
   ON storage.objects
   FOR INSERT
   WITH CHECK (bucket_id = 'proof-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
   ```

---

## Step 5: Start Development Server

### Using npm

```bash
npm run dev
```

### Using yarn

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

---

## Step 6: Verify Setup

### Check Frontend

1. Visit `http://localhost:3000`
2. You should see the landing page
3. Navigate to `/login` to test authentication

### Check Backend

1. Open browser DevTools → Console
2. Check for Supabase connection errors
3. Test API calls (e.g., generate quest)

### Check AI Integration

1. Generate a new quest
2. Check network requests for Groq API
3. Verify quest is created successfully

### Check Opik Integration

1. Generate a quest
2. Check Opik dashboard for traces
3. Verify quest generation trace appears

---

## Production Deployment

### Deploy Frontend to Vercel

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy Project**

```bash
vercel
```

4. **Add Environment Variables**

In Vercel Dashboard → Settings → Environment Variables:
- Add all variables from `.env.local`

5. **Deploy to Production**

```bash
vercel --prod
```

### Deploy Backend (Supabase)

Supabase is already hosted, but you need to:
1. Apply migrations to production database
2. Set up storage buckets
3. Configure RLS policies

---

## Troubleshooting

### Issue: Node.js Version Incompatible

**Error**: `Unsupported Node.js version`

**Solution**:
```bash
# Install nvm (Node Version Manager)
nvm install 18
nvm use 18
```

### Issue: Supabase Connection Failed

**Error**: `Failed to connect to Supabase`

**Solution**:
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project is active
- Ensure database migrations ran successfully

### Issue: Groq API Key Invalid

**Error**: `Invalid Groq API key`

**Solution**:
- Verify `GROQ_API_KEY` is set correctly
- Check Groq API key is active
- Ensure you have sufficient credits

### Issue: Opik Traces Not Appearing

**Error**: No traces in Opik dashboard

**Solution**:
- Verify `OPIK_API_KEY` is correct
- Check Opik project name matches
- Ensure Opik SDK is initialized correctly

### Issue: Build Fails

**Error**: TypeScript errors

**Solution**:
```bash
# Run type check
npm run typecheck

# Fix linting errors
npm run lint

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Development Workflow

### Run Development Server

```bash
npm run dev
```

### Run Type Checking

```bash
npm run typecheck
```

### Run Linting

```bash
npm run lint
```

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## Advanced Configuration

### Custom Domain

1. Go to Vercel Dashboard
2. Add custom domain
3. Update DNS records
4. Update `NEXT_PUBLIC_APP_URL` in environment variables

### Environment-Specific Config

Create `.env.production` for production-specific values:

```env
NEXT_PUBLIC_APP_URL=https://ascend.fitness
NEXT_PUBLIC_ENVIRONMENT=production
```

### Customizing Opik Tracking

Modify `lib/opik/tracer.ts` to customize:

```typescript
opik.init({
  projectName: 'ascend-fitness-rpg',
  environment: process.env.NODE_ENV,
  enableAutoInstrumentation: true,
  trackErrors: true,
  trackPerformance: true,
});
```

---

## Next Steps

After successful installation:

1. Read [Quick Start Guide](./quick-start.md)
2. Explore [Architecture Documentation](../2-Architecture/system-overview.md)
3. Review [Database Schema](../3-Database/schema.md)
4. Check out [AI Implementation](../7-AI-Implementation/groq-quest-generation.md)

---

## Support

Need help? Visit our [Help Center](../../app/help/page.tsx) or [create an issue](https://github.com/username/ASCEND-RPG-FITNESS-APP/issues).

---

**Installation Complete!** 🎉

You're ready to start building with ASCEND. Run `npm run dev` to begin development.
