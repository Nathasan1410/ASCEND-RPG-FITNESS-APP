"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface StatusWindowProps {
  stats: {
    strength: number;
    agility: number;
    stamina: number;
    intelligence?: number;
    vitality?: number;
    perception?: number;
  };
}

export function StatusWindow({ stats }: StatusWindowProps) {
  const data = [
    { subject: "STR", A: stats.strength, fullMark: 100 },
    { subject: "AGI", A: stats.agility, fullMark: 100 },
    { subject: "STA", A: stats.stamina, fullMark: 100 },
    { subject: "INT", A: stats.intelligence || 10, fullMark: 100 },
    { subject: "VIT", A: stats.vitality || 10, fullMark: 100 },
    { subject: "PER", A: stats.perception || 10, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[300px] relative">
      <div className="absolute top-0 left-0 text-xs font-mono text-system-cyan/60 uppercase tracking-widest">
        Status Window
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#1a1a24" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "var(--font-geist-mono)" }}
          />
          <Radar
            name="Hunter"
            dataKey="A"
            stroke="#00FFFF"
            strokeWidth={2}
            fill="#00FFFF"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-system-cyan" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-system-cyan" />
    </div>
  );
}
