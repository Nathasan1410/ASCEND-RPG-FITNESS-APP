```markdown
# 🎨 Frontend Architecture & Design System

## 1. Design Philosophy
**"The System Interface"**
- **Aesthetic:** Dark, Holographic, Neon, Minimalist.
- **Background:** Deep Void (`#09090b` or `zinc-950`) with subtle radial gradients.
- **Elements:** Glassmorphism (Frosted Glass), 1px borders, glowing accents.
- **Motion:** Snappy, mechanical entrances. No "bouncy" or playful springs.

---

## 2. Tailwind Configuration (Theme Extension)
*Strictly enforce this palette in `tailwind.config.ts`.*

```typescript
// tailwind.config.ts extension
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))", // #09090b
      foreground: "hsl(var(--foreground))", // #fafafa
      
      // The System Palette
      primary: {
        DEFAULT: "#2563eb", // Neon Blue (System Core)
        foreground: "#ffffff",
        glow: "rgba(37, 99, 235, 0.5)",
      },
      secondary: {
        DEFAULT: "#7c3aed", // Deep Purple (Rank Up / Rare)
        foreground: "#ffffff",
      },
      success: {
        DEFAULT: "#14b8a6", // Teal (Quest Complete)
        glow: "rgba(20, 184, 166, 0.5)",
      },
      destructive: {
        DEFAULT: "#ef4444", // Red (Penalty / Failure)
        glow: "rgba(239, 68, 68, 0.5)",
      },
      rank: {
        e: "#a1a1aa", // Gray
        d: "#facc15", // Yellow
        c: "#fb923c", // Orange
        b: "#4ade80", // Green
        a: "#60a5fa", // Blue
        s: "#c084fc", // Purple (Elite)
      }
    },
    boxShadow: {
      'neon-blue': "0 0 10px rgba(37, 99, 235, 0.5), 0 0 20px rgba(37, 99, 235, 0.3)",
      'neon-red': "0 0 10px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)",
      'glass': "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      mono: ["var(--font-geist-mono)", "monospace"], // For stats/numbers
    }
  }
}

```

---

## 3. UI Primitives (Component Styles)

### A. The "System Card" (Glassmorphism)

Used for Quests, Logs, and Profile.

```tsx
const SystemCard = "bg-zinc-950/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-glass overflow-hidden";

```

### B. The "Accept" Button (Interactive)

```tsx
const ButtonPrimary = "bg-primary text-white hover:bg-primary/90 hover:shadow-neon-blue transition-all duration-300 font-bold tracking-wider uppercase";

```

### C. The Hexagon Chart (Stats)

*Use `Recharts` Radar Chart for the Status Window.*

* **Library:** `recharts`
* **Components:** `<RadarChart>`, `<PolarGrid>`, `<PolarAngleAxis>`, `<Radar>`
* **Style:** - Stroke: `#2563eb`
* Fill: `#2563eb` with `opacity={0.3}`
* Background: Transparent



---

## 4. Animation Strategy (Framer Motion)

### A. "System Notification" (Popup)

*Mechanical slide-in from top or bottom.*

```typescript
export const systemNotificationVariants = {
  hidden: { y: -50, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 } // Snappy
  },
  exit: { y: -20, opacity: 0 }
};

```

### B. "Quest List" (Staggered Entrance)

*Items appear one by one.*

```typescript
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

```

### C. "Level Up" (Flash Effect)

*Flash white, then settle.*

```typescript
export const levelUpVariants = {
  initial: { opacity: 0, scale: 0.5, filter: "brightness(2)" },
  animate: { 
    opacity: 1, 
    scale: 1, 
    filter: "brightness(1)",
    transition: { duration: 0.5 } 
  }
};

```

---

## 5. Asset Constraints

* **Icons:** Use `lucide-react` exclusively.
* **Fonts:** Use `Inter` (Body) and `Geist Mono` (Numbers/Stats).
* **Images:** NO external image assets. All visuals must be generated via CSS/SVG or Tailwind code to keep the app lightweight and fast.

```

***

### 📝 Cara Menambahkan ke Mega Prompt:

Saat kamu mengirim prompt ke Deep Research, tambahkan bagian ini di paling akhir daftar lampiran:

```markdown
### [DRAFT 7: FRONTEND GUIDELINES]
(Paste isi frontend-guidance.md)

```
