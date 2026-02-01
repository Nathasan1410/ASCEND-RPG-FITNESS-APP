import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        system: {
          dark: "#0a0a0f",
          panel: "#12121a",
          border: "#2a2a35",
          accent: "#00b8ff",
        },
        rank: {
          e: { DEFAULT: "#8a8a8a", glow: "rgba(138, 138, 138, 0.5)" },
          d: { DEFAULT: "#ffffff", glow: "rgba(255, 255, 255, 0.5)" },
          c: { DEFAULT: "#55ead4", glow: "rgba(85, 234, 212, 0.5)" },
          b: { DEFAULT: "#00b8ff", glow: "rgba(0, 184, 255, 0.6)" },
          a: { DEFAULT: "#bd00ff", glow: "rgba(189, 0, 255, 0.6)" },
          s: { DEFAULT: "#f3e600", glow: "rgba(243, 230, 0, 0.7)" },
        },
        status: {
          success: "#00ff9f",
          warning: "#ffd300",
          error: "#ff003c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "pulse-system": {
          "0%, 100%": { boxShadow: "0 0 5px #00b8ff" },
          "50%": { boxShadow: "0 0 20px #00b8ff" },
        },
      },
      animation: {
        "pulse-system": "pulse-system 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
