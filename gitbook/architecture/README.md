# Architecture

> **System Overview & Technical Stack**

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                         │
│  Next.js 14 + React 18 + Tailwind CSS + Framer Motion   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER                             │
│         Server Actions + API Routes                       │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
┌───────────┐  ┌──────────┐  ┌──────────────┐
│ Supabase  │  │ Groq LLM │  │   OPIK AI   │
│  Backend  │  │          │  │   (Judge)    │
│ Database  │  └──────────┘  └──────────────┘
│ Auth      │
│ Storage   │
└───────────┘
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|----------|
| **Next.js 14** | React framework with App Router |
| **React 18+** | UI library |
| **TypeScript 5** | Type safety |
| **Tailwind CSS 3.4** | Styling |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|----------|
| **Supabase** | Database, Auth, Storage |
| **PostgreSQL 15** | Primary database |
| **Edge Functions** | Serverless compute |
| **Row-Level Security** | Data protection |

### AI Services
| Technology | Purpose |
|------------|----------|
| **Groq LLM** | Quest generation (Llama 3.3 70B) |
| **OPIK AI** | Quest evaluation (LLM-as-a-Judge) |
| **OPIK SDK** | Observability & tracing |

---

## System Components

### 1. Database (Supabase/PostgreSQL)
- **Tables**: Users, quests, match_history, social_feed, etc.
- **Relationships**: Foreign keys with cascade rules
- **RLS Policies**: Row-level security for data protection
- **Indexes**: Optimized for query performance

### 2. Authentication (Supabase Auth)
- **Methods**: Email/password, OAuth (GitHub, Google)
- **Session Management**: JWT tokens
- **Protected Routes**: Middleware-based
- **User Profiles**: Additional user data in profiles table

### 3. Storage (Supabase Storage)
- **Buckets**: proof-uploads, avatars, social-images
- **Access Control**: RLS policies on buckets
- **Public URLs**: CDN delivery
- **File Validation**: Type and size limits

### 4. AI Services
- **Groq API**: Fast quest generation
- **OPIK API**: Quest evaluation and tracing
- **Fallback System**: Pre-built quest templates
- **Error Handling**: Graceful degradation

### 5. API Layer
- **Server Actions**: Database mutations
- **API Routes**: External integrations
- **Validation**: Zod schema validation
- **Error Handling**: Centralized error management

---

## Data Flow

### Quest Generation Flow
```
User clicks "Generate Quest"
  ↓
Server Action called
  ↓
Fetch user profile (rank, class, equipment, goals)
  ↓
Build prompt with user data
  ↓
Call Groq LLM API
  ↓
Receive JSON response
  ↓
Validate with Zod schema
  ↓
Save quest to database
  ↓
Return quest to UI
  ↓
Display quest to user
```

### Quest Evaluation Flow
```
User completes quest and uploads proof
  ↓
Server Action called
  ↓
Upload proof to Supabase Storage
  ↓
Fetch quest details
  ↓
Start OPIK AI trace
  ↓
Evaluate form score (40%)
  ↓
Evaluate effort score (30%)
  ↓
Evaluate consistency score (30%)
  ↓
Calculate overall score
  ↓
Determine XP multiplier (0.8x - 1.5x)
  ↓
Calculate final XP
  ↓
Generate feedback and suggestions
  ↓
Update match_history table
  ↓
Update user XP in profiles table
  ↓
End OPIK AI trace
  ↓
Return results to UI
```

---

## Security

### Authentication & Authorization
- **JWT Tokens**: Secure session management
- **Protected Routes**: Middleware guards
- **Role-Based Access**: User permissions
- **Session Expiry**: Automatic logout

### Data Protection
- **RLS Policies**: Users can only see their own data
- **Encrypted Storage**: Passwords hashed
- **Secure API**: API keys in environment variables
- **HTTPS Only**: Encrypted communication

### Anti-Cheat
- **Proof Validation**: Required for XP
- **Time Detection**: Anomaly detection
- **XP Limits**: Maximum XP enforcement
- **Community Reports**: User moderation

---

## Performance Optimization

### Frontend
- **Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports
- **Memoization**: React.useMemo/useCallback

### Backend
- **Database Indexes**: Optimized queries
- **Connection Pooling**: Supabase manages
- **Caching**: Redis for frequently accessed data
- **CDN**: Supabase Storage CDN

---

## Monitoring & Observability

### OPIK AI Tracing
- **Quest Generation**: Trace every generation request
- **Quest Evaluation**: Trace every evaluation
- **Performance Metrics**: Response times, success rates
- **Error Tracking**: All errors traced and logged

### Application Monitoring
- **Error Logging**: Centralized error tracking
- **Performance Metrics**: Page load times
- **User Analytics**: Feature usage tracking
- **Uptime Monitoring**: Service availability

---

## Documentation

- [System Overview](./system-overview.md) - Complete architecture details
- [Backend Architecture](./backend-architecture.md) - Server-side design
- [Frontend Architecture](./frontend-architecture.md) - Client-side design
- [Database Schema](./schema.md) - Tables and relationships
- [Security Implementation](./rls-implementation.md) - RLS policies
- [Performance Optimization](./frontend-optimization.md) - Optimization techniques

---

*Last Updated: February 10, 2026*
