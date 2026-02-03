"use client";

import { useState, useEffect } from "react";
import type { HunterPost, FeedFilters } from "@/types/social";
import { HunterFeedCard, FeedFilterBar, TrendingTags, CreatePostModal } from "@/components/social";
import { getFeedPosts, getTrendingTags } from "@/server/actions/social-actions";

export default function FeedPage() {
  const [posts, setPosts] = useState<HunterPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [filters, setFilters] = useState<FeedFilters>({
    postType: 'all',
    rankFilter: 'all',
    verifiedOnly: false,
    friendsOnly: false,
    timeRange: 'all',
    guildFilter: null,
  });
  const [trendingTags, setTrendingTags] = useState<any[]>([]);

  useEffect(() => {
    loadPosts();
    loadTrendingTags();
  }, [filters]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await getFeedPosts(20, 0, filters);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to load feed:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingTags = async () => {
    try {
      const tags = await getTrendingTags();
      setTrendingTags(tags);
    } catch (error) {
      console.error("Failed to load trending tags:", error);
    }
  };

  const handleFilterChange = (updates: Partial<FeedFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handlePostCreated = () => {
    loadPosts();
    loadTrendingTags();
  };

  return (
    <div className="min-h-screen bg-void-deep pb-20 md:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="hidden lg:block space-y-6">
        <div className="bg-system-panel border border-white/10 rounded-xl p-4 sticky top-20">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <nav className="space-y-2">
            <a
              href="/feed"
              className="block px-3 py-2 text-system-cyan font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              📡 All Broadcasts
            </a>
            <a
              href="/feed/following"
              className="block px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
            >
              🎯 Following
            </a>
            <a
              href="/feed/verified"
              className="block px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
            >
              ✓ Verified Only
            </a>
            <a
              href="/feed/guilds"
              className="block px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
            >
              🏛️ Guilds
            </a>
            <a
              href="/feed/events"
              className="block px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors"
            >
              🏆️ Events
            </a>
          </nav>

          <div className="border-t border-white/10 mt-4 pt-4">
            <TrendingTags tags={trendingTags} />
          </div>
        </div>
      </aside>

      <main className="lg:col-span-2 space-y-4">
        <div className="bg-system-panel border border-white/10 rounded-xl p-4">
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="w-full text-left px-4 py-3 bg-void-deep border border-white/20 rounded-lg text-white/60 hover:border-white/40 transition-colors"
          >
            What's on your mind, Hunter?
          </button>
        </div>

        <FeedFilterBar
          filters={filters}
          onFiltersChange={handleFilterChange}
        />

        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-system-panel border border-white/10 rounded-xl p-4 animate-pulse">
                  <div className="h-8 w-8 bg-void-deep rounded-full mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                    <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <p className="text-lg mb-4">No broadcasts yet.</p>
              <p className="text-sm text-white/60">
                Be first to share your journey with Hunter Network!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <HunterFeedCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <aside className="hidden lg:block space-y-6">
        <div className="bg-system-panel border border-white/10 rounded-xl p-4 sticky top-20">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
            Quick Actions
          </h3>
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="w-full bg-system-cyan text-void-deep px-4 py-3 rounded-lg font-bold hover:bg-system-cyan/90 transition-colors"
          >
            Create Broadcast
          </button>
        </div>
      </aside>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
}
