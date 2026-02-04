export function FriendsSkeleton() {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}
