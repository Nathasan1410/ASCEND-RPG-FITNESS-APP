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
    <div className="w-full h-[450px] relative flex flex-col">
      <div className="absolute top-0 left-0 text-xs font-mono text-system-cyan/60 uppercase tracking-widest z-10">
        Status Window
      </div>
      
      {/* Radar Chart Section */}
      <div className="h-[250px] relative">
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
      </div>
      
      {/* Stats Detail Section */}
      <div className="flex-1 px-2 py-3 grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <span className="text-xs font-mono text-white/40 uppercase">STR</span>
          <span className="text-sm font-mono text-system-cyan font-bold">{stats.strength}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <span className="text-xs font-mono text-white/40 uppercase">INT</span>
          <span className="text-sm font-mono text-system-cyan font-bold">{stats.intelligence || 10}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <span className="text-xs font-mono text-white/40 uppercase">AGI</span>
          <span className="text-sm font-mono text-system-cyan font-bold">{stats.agility}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <span className="text-xs font-mono text-white/40 uppercase">STA</span>
          <span className="text-sm font-mono text-system-cyan font-bold">{stats.stamina}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <span className="text-xs font-mono text-white/40 uppercase">VIT</span>
          <span className="text-sm font-mono text-system-cyan font-bold">{stats.vitality || 10}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <span className="text-xs font-mono text-white/40 uppercase">PER</span>
          <span className="text-sm font-mono text-system-cyan font-bold">{stats.perception || 10}</span>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-system-cyan" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-system-cyan" />
    </div>
  );
}
