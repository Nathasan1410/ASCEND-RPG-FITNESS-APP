import type { TrendingTag } from "@/types/social";

interface TrendingTagsProps {
  tags: TrendingTag[];
}

export function TrendingTags({ tags }: TrendingTagsProps) {
  return (
    <div className="bg-system-panel border border-white/10 rounded-xl p-4">
      <h3 className="text-lg font-bold text-system-cyan uppercase tracking-wider mb-4">
        Trending Hunter Tags
      </h3>

      <div className="space-y-3">
        {tags.length === 0 ? (
          <p className="text-white/40 text-sm">No trending tags yet. Share your journey!</p>
        ) : (
          tags.map((tag, index) => (
            <div
              key={tag.tag}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <span className="text-system-cyan font-mono text-lg">
                  #{index + 1}
                </span>
                <span className="text-white">
                  {tag.tag}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60 bg-void-deep px-2 py-1 rounded">
                  {tag.count}
                </span>
              </div>

              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-4 h-4 text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v0m0-3h11a-9 5 3h18a-5 5 12"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-white/10 pt-3">
        <a
          href="/feed/tags"
          className="text-sm text-system-cyan hover:text-white/80 transition-colors"
        >
          View All Tags →
        </a>
      </div>
    </div>
  );
}
