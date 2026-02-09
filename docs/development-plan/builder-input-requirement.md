# Builder Input Requirements

To proceed with **Milestone 3 (Core Loop)** and **Milestone 4 (Judge System)**, I require the following API keys to be configured in the environment:

## 1. Groq API Key
- **Required for:** Milestone 3 (Quest Generation)
- **Env Variable:** `GROQ_API_KEY`
- **Purpose:** To power "The Architect" agent that generates daily workouts.

## 2. Opik API Key
- **Required for:** Milestone 4 (The Judge)
- **Env Variable:** `OPIK_API_KEY`
- **Purpose:** For LLM-as-a-Judge evaluation and tracing.

## 3. Supabase Credentials (If not already set)
- **Required for:** Database access
- **Env Variables:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Please add these to your `.env.local` file locally. I will proceed with implementation using mock/placeholder logic where necessary until these keys are active.

Groq API Key : [REDACTED]

Opik API Key : [REDACTED]

Project URL : https://lwzdgxyhorocyysuvceh.supabase.co
Publishable API Key : sb_publishable_1p5ypVoXBARsJ5-fpo-bbw_v1Wx8N57