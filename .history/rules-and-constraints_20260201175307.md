# ⛔ Global Rules & Execution Constraints (The Iron Laws)

## 1. The Hackathon Protocol (Speed > Perfection)
*We have 7 days. Efficiency is the only metric that matters.*

- **NO Over-Engineering:** Do not implement "Clean Architecture", "Hexagonal", or complex "Repository Patterns". Use direct logic in Server Actions.
- **NO Unit Tests:** We do not have time for Jest/Vitest. Test manually by running the app.
- **NO Complex State:** Do not use Redux, Recoil, or Zustand. Use React Context or URL Search Params (`useSearchParams`) for state.
- **MVP First:** If a feature is "nice to have" but not in the `requirements.md`, **SKIP IT**.

---

## 2. Coding Standards (Next.js & Supabase)

### A. Server Actions over API Routes
- **Rule:** Do NOT create `/app/api/...` routes unless absolutely necessary (e.g., external Webhooks).
- **Implementation:** All database mutations (Create/Update/Delete) MUST be **Server Actions** (`/server/actions/*.ts`).
- **Data Fetching:** Fetch data directly in Server Components using Supabase Server Client.

### B. Strict TypeScript
- **Rule:** `any` type is **FORBIDDEN**.
- **Implementation:**
  - Use `Database` types generated from Supabase.
  - Use `Zod` schemas to validate all Forms and AI JSON outputs.

### C. Client vs Server Components
- **Rule:** Default to Server Components.
- **Implementation:** Add `'use client'` ONLY to leaf components that require interactivity (Buttons, Forms, Hooks). Keep data fetching on the server.

---

## 3. AI Integration Rules (Groq & Opik)

### A. The "Blindness" Prevention
- **Rule:** Never assume the LLM output is perfect.
- **Implementation:** Always wrap `JSON.parse(aiResponse)` in a `try/catch` block. If parsing fails, return a "Fallback Quest" (Hardcoded generic workout) instead of crashing the app.

### B. Observability is Mandatory
- **Rule:** Every single call to Groq MUST be wrapped in `opik.trace`.
- **Reason:** We need to debug prompt performance in real-time. Un-traced calls are invisible and useless for the Judge system.

---

## 4. UI/UX "System" Constraints

### A. No Light Mode
- **Rule:** The app is **Dark Mode ONLY**.
- **Implementation:** Hardcode `class="dark"` in the HTML root or Tailwind config. Do not build a theme toggle switch.

### B. No "Lorem Ipsum"
- **Rule:** Never generate dummy text like "Lorem ipsum dolor sit amet".
- **Implementation:** Use "System Placeholder" text.
  - *Bad:* "Description goes here."
  - *Good:* "Analyzing user biometrics... Waiting for input."

### C. No External Assets
- **Rule:** Do not import PNG/JPG files unless absolutely necessary.
- **Implementation:** Use CSS Gradients, Tailwind Borders, and `lucide-react` icons. This keeps the deployment lightweight.

---

## 5. Security & Safety

### A. RLS (Row Level Security)
- **Rule:** Never deploy a Supabase table without RLS enabled.
- **Constraint:** Users can only view/edit *their own* data. Leaderboards are the only exception (Public Read).

### B. Env Variables
- **Rule:** Never hardcode API keys.
- **Implementation:** Access keys via `process.env.NEXT_PUBLIC_SUPABASE_URL` etc. Verify they exist at app startup; crash if missing.

---

*Adhere to these rules strictly. Any deviation requires explicit user override.*