"use client";

import { useState, useEffect } from "react";
import { HunterFeedCard } from "@/components/social/HunterFeedCard";
import { FeedFilterBar } from "@/components/social/FeedFilterBar";
import { TrendingTags } from "@/components/social/TrendingTags";
import { CreatePostModal } from "@/components/social/CreatePostModal";
import { SystemButton } from "@/components/ui/SystemButton";
import { Plus } from "lucide-react";
import { 
  getFeedPosts, 
  getTrendingTags, 
  toggleKudos, 
  toggleRespect, 
  createPost 
} from "@/server/actions/social-actions";
import type { HunterPost, TrendingTag, FeedFilters, CreatePostData } from "@/types/social";

export default function DevFeedPage() {
  const [posts, setPosts] = useState<HunterPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [trendingTags, setTrendingTags] = useState<TrendingTag[]>([]);
  const [postCreated, setPostCreated] = useState(0);
  const [filters, setFilters] = useState<FeedFilters>({
    postType: 'all',
    rankFilter: 'all',
    timeRange: 'all',
    verifiedOnly: false,
    friendsOnly: false,
    guildFilter: null
  });

  const [createPostData, setCreatePostData] = useState<CreatePostData>({
    post_type: 'quest_completion',
    title: '',
    body: '',
    tags: [],
    proof_media_url: null,
    proof_type: 'None',
    quest_id: null
  });

  // Load posts and tags on mount
  useEffect(() => {
    loadPosts();
    loadTrendingTags();
  }, []);

  // Reload when filters change
  useEffect(() => {
    loadPosts();
  }, [filters]);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await getFeedPosts(20, 0, filters);
      setPosts(data);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadTrendingTags() {
    try {
      const data = await getTrendingTags(10);
      setTrendingTags(data);
    } catch (error) {
      console.error('Failed to load trending tags:', error);
    }
  }

  function handleFilterChange(newFilters: Partial<FeedFilters>) {
    setFilters({ ...filters, ...newFilters });
  }

  async function handleCreatePost(data: CreatePostData) {
    try {
      await createPost(data);
      setPostCreated(prev => prev + 1);
      setIsCreatePostOpen(false);
      
      // Reset form
      setCreatePostData({
        post_type: 'quest_completion',
        title: '',
        body: '',
        tags: [],
        proof_media_url: null,
        proof_type: 'None',
        quest_id: null
      });
      
      // Reload feed and tags
      await Promise.all([loadPosts(), loadTrendingTags()]);
      
      alert('Post created successfully! (DEV MODE)');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post: ' + (error as Error).message);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Dev Mode Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-bold">
        🔴 DEV MODE: /dev/feed - Testing environment
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            🧪 DEV: Hunter Network
          </h1>
          
          <SystemButton 
            onClick={() => setIsCreatePostOpen(true)}
            glow
          >
            <Plus className="w-4 h-4 mr-2" />
            New Broadcast (DEV)
          </SystemButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Desktop Only */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-system-panel border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-4">Navigation</h3>
              <nav className="space-y-2">
                <a href="/feed" className="block text-gray-400 hover:text-white transition-colors">
                  📡 Production Feed (/feed)
                </a>
                <a href="/dev/feed" className="block text-system-accent font-bold">
                  🧪 Dev Feed (/dev/feed) - Current
                </a>
              </nav>
            </div>
            
            <TrendingTags tags={trendingTags} />
          </aside>

          {/* Center Feed - Posts */}
          <main className="lg:col-span-2 space-y-4">
            <FeedFilterBar 
              filters={filters} 
              onFiltersChange={handleFilterChange} 
            />

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-system-panel border border-white/10 rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
                    <div className="h-3 bg-white/10 rounded w-full mb-2" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-system-panel border border-white/10 rounded-xl p-12 text-center">
                <p className="text-gray-400 text-lg">No posts yet in the Hunter Network.</p>
                <p className="text-gray-500 text-sm mt-2">
                  Be the first to broadcast your training journey!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <HunterFeedCard
                  key={post.id}
                  post={post}
                />
              ))
            )}
          </main>

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-system-panel border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-4">Dev Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Posts:</span>
                  <span className="text-white font-bold">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Posts Created:</span>
                  <span className="text-green-400 font-bold">{postCreated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Filter:</span>
                  <span className="text-system-cyan">{filters.postType}</span>
                </div>
              </div>
            </div>

            <div className="bg-system-panel border border-white/10 rounded-xl p-4">
              <h3 className="font-bold text-white mb-4">Test Checklist</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Load feed works</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Toggle kudos works</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Toggle respects works</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Create post works</span>
                </label>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>No 500 errors</span>
                </label>
              </div>
            </div>
          </aside>
        </div>

        {/* Create Post Modal */}
        {isCreatePostOpen && (
          <CreatePostModal
            isOpen={isCreatePostOpen}
            onClose={() => setIsCreatePostOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
