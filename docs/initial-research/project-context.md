# 🏛️ PROJECT CONTEXT: "The System: AI Hunter Gym"
> **Version:** 2.0  
> **Last Updated:** Feb 1, 2026  
> **Changelog:** Added Social Audit & Gatekeeper Anti-Cheat System

## 🎯 Vision & Core Concept
**"The System"** is a gamified fitness application inspired by the *Solo Leveling* manhwa. It transforms the mundane task of working out into a high-stakes RPG adventure.
- **Tagline:** "Your Daily Quest to become S-Rank."
- **Goal:** Users perform daily fitness quests to gain XP, level up, and unlock classes based on real-world effort.
- **Unique Selling Point (USP):** Using **Opik AI** as a living **"System Judge"** combined with **Social Verification** to create a cheat-resistant, community-driven fitness platform.

---

## 🧠 The "System" Logic (Opik Integration)
Unlike traditional apps that use static XP (e.g., 1 pushup = 10 XP), **The System** uses **LLM-as-a-Judge** to evaluate performance qualitatively.

### 1. The Judge Agent (Opik)
- **Role:** The "Game Master".
- **Input:** User's Level, Class, Daily Quest Target, and User's Completion Log (Text/Voice).
- **Evaluation Logic:**
    - *Scenario:* User reports "Did 20 pushups, form was shaky at the end."
    - *Evaluation:* "User showed High Effort. Technique Low. Target Met."
    - *Output:* **Dynamic XP** (Base Reward + Effort Bonus).

### 2. The Architect Agent (Planner)
- **Role:** The "Quest Giver".
- **Logic:** Generates workouts based on:
    - **Inventory:** (Gym/Home/Park/No Equipment).
    - **Condition:** (Sore/Fresh/Injured).
    - **Time Investment:** (e.g., "I only have 15 mins").
- **Persona:** Cold, Objective, Authoritative.

---

## 🛡️ The Anti-Cheat System (Three Layers) ← NEW

### Layer 1: Opik Logic Filter (Automated)
**The first line of defense - instant, cheap, always active**

- **Mechanism:** Opik checks data for physical impossibility
- **Example:** User inputs "100 Pushups in 10 seconds"
- **Action:** Opik REJECTS log: "System Error: Human physical limit exceeded. Anomaly detected."
- **Status:** Lightweight, runs on every submission

### Layer 2: Social Audit (Community Pressure)
**The "Valorant Match History" approach**

- **Mechanism:** ALL workout logs are PUBLIC by default
- **Psychology:** "The Shame Factor" - If profile shows skinny user but history claims "Bench 150kg x 10", friends will know
- **Features:**
  - "Report Suspicious Activity" button on profiles
  - Users with 5+ reports become "Corrupted Hunter" (banned from leaderboard)
  - Visual badge system (Normal → Verified → Flagged → Corrupted)

### Layer 3: Gatekeeper (Rank-Up Exams)
**Proof required only at critical checkpoints**

- **Concept:** Daily quests use honor system. RANK PROMOTIONS require video proof.
- **When:** Every rank transition (E→D, D→C, C→B, B→A, A→S)
- **Proof:** 15-30 second timelapse/video with specific "hand sign" to prove freshness
- **MVP:** Auto-approve if proof uploaded (psychological deterrent)
- **Future:** AI video analysis or admin review

---

## 🏅 Hunter Status System ← NEW

| Status | Badge | XP Modifier | Leaderboard | How to Get |
|--------|-------|-------------|-------------|------------|
| Normal | Gray | 1.0x | ✅ | Default |
| Verified | Cyan ✓ | 1.1x | ✅ | 5+ proofs uploaded |
| Flagged | Yellow ⚠️ | 0.8x | ✅ (with warning) | 3+ reports |
| Corrupted | Red ☠️ | 0.0x | ❌ BANNED | 5+ reports |

---

## 🎮 Game Mechanics & Progression

### 1. Class System (The "Build")
Users select a class that dictates their workout style:
- **Novice (Base Builder):** Consistency & Form. XP from streaks.
- **Striker (Intermediate):** Endurance & Speed. High volume.
- **Tank (Bulking):** Strength & Hypertrophy. Heavy loads.
- **Assassin (Cutting):** Fat Loss & Agility. HIIT focus.

### 2. The User Loop
1.  **The Awakening (Onboarding):**
    - User inputs Critical Data (Height, Weight).
    - **Placement Test:** Input max pushups/run capability.
    - **Result:** System assigns Initial Rank (E-Rank to S-Rank).
2.  **Daily Check-In:**
    - User inputs Time Available & Physical Status.
    - System generates a specific **Daily Quest**.
3.  **The Grind (Execution):**
    - User performs the quest.
    - User submits a report (+ optional proof photo/video).
4.  **Judgment:** Opik evaluates report → Awards XP → Updates Stats.
5.  **Level Up:**
    - Exponential XP curve.
    - Level Up may trigger Rank Up → **REQUIRES PROOF VIDEO**.

### 3. The Match History (Social Feature) ← NEW
- **Like Valorant/ML:** Every completed quest appears in public profile
- **Shows:** Quest name, XP earned, duration, proof status
- **Flexing Culture:** Users voluntarily post proofs for social credit
- **Verification Badge:** Proof-backed logs get a checkmark

### 4. Gamification Elements
- **Status Window:** Hexagon chart displaying Strength, Agility, Stamina.
- **Leaderboard:** Excludes "Corrupted" hunters. Shows "Verified" badges.
- **Penalty Zone:** Skipped workouts = Penalty Quest to maintain streak.
- **Verified Hunter:** Blue checkmark for users with 5+ proofs.

---

## 🛠️ Execution Strategy (Hackathon MVP)

### Tech Stack
- **Frontend:** Next.js + Tailwind CSS (Dark Mode, Neon Blue, Glassmorphism).
- **Backend:** Next.js Server Actions + Supabase.
- **AI/Ops:** Groq (Generation) + **Opik SDK** (Evaluation/Tracing).
- **Storage:** Supabase Storage (proof photos/videos).

### Roadmap (Feb 1 - Feb 8)
- **Day 1-2 (Logic Core):**
    - Build Planner Agent (Groq).
    - Implement Dynamic XP Logic (Opik Judge).
    - Setup Database Schema (including anti-cheat tables).
- **Day 3-4 (UI/UX):**
    - "Solo Leveling" Aesthetics (Blue Boxes, Status Window).
    - Class Selection Screen.
    - Match History Profile Page.
- **Day 5 (Integration):**
    - Connect Frontend to Opik Judge.
    - Implement Proof Upload (Supabase Storage).
    - Build Report System UI.
- **Day 6-7 (Social & Polish):**
    - Leaderboard with Hunter Status badges.
    - Rank-Up Exam flow (proof required).
    - Demo preparation.

---

## 📊 Anti-Cheat Implementation Summary

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| Opik Logic Filter | Low | High | P0 (Must) |
| Public Match History | Low | High | P0 (Must) |
| Report Button | Medium | Medium | P1 (Should) |
| Hunter Status System | Medium | High | P1 (Should) |
| Rank-Up Proof Requirement | Medium | Very High | P0 (Must) |
| Verified Hunter Badge | Low | Medium | P2 (Nice) |
| Proof XP Bonus | Low | Medium | P2 (Nice) |

---

*This context defines the soul of the project. All code and logic must align with the "System" persona: Efficient, Gamified, Fair, and Cheat-Resistant.*
