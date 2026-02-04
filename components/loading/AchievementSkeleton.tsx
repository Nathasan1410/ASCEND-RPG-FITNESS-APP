export function AchievementSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}
