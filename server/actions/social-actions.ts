// @ts-nocheck
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { HunterPost, TrendingTag, FeedFilters, CreatePostData } from "@/types/social";

export async function getFeedPosts(limit: number = 20, offset: number = 0, filters?: Partial<FeedFilters>) {
  const supabase = await createClient();

  let query = supabase
    .from('hunter_feed')
    .select(`
      *,
      author:profiles!hunter_feed_author_fkey (
        username,
        rank_tier,
        hunter_status,
        avatar_url
      )
    `);

  if (filters?.postType && filters.postType !== 'all') {
    query = query.eq('post_type', filters.postType);
  }

  if (filters?.rankFilter && filters.rankFilter !== 'all') {
    query = query.eq('author.rank_tier', filters.rankFilter + '-Rank');
  }

  if (filters?.verifiedOnly) {
    query = query.eq('author.hunter_status', 'Verified');
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
}

export async function getTrendingTags(limit: number = 10) {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('hunter_feed')
    .select('tags')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .not('tags', 'null')
    .limit(100);

  if (!posts) return [];

  const tagCounts = new Map<string, number>();
  posts.forEach((post: any) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });

  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count })) as TrendingTag[];
}

export async function toggleKudos(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from('feed_engagement')
    .select('*')
    .eq('feed_post_id', postId)
    .eq('user_id', user.id)
    .eq('engagement_type', 'kudos')
    .single();

  if (existing) {
    await supabase
      .from('feed_engagement')
      .delete()
      .eq('id', existing.id);

    await supabase.rpc('decrement_kudos_count', { post_id: postId } as any);
  } else {
    await supabase
      .from('feed_engagement')
      .insert({
        feed_post_id: postId,
        user_id: user.id,
        engagement_type: 'kudos'
      });

    await supabase.rpc('increment_kudos_count', { post_id: postId });
  }

  revalidatePath('/feed');
}

export async function toggleRespect(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from('feed_engagement')
    .select('*')
    .eq('feed_post_id', postId)
    .eq('user_id', user.id)
    .eq('engagement_type', 'respect')
    .single();

  if (existing) {
    await supabase
      .from('feed_engagement')
      .delete()
      .eq('id', existing.id);

    await supabase.rpc('decrement_respects_count', { post_id: postId });
  } else {
    await supabase
      .from('feed_engagement')
      .insert({
        feed_post_id: postId,
        user_id: user.id,
        engagement_type: 'respect'
      });

    await supabase.rpc('increment_respects_count', { post_id: postId });
  }

  revalidatePath('/feed');
}

export async function createPost(data: CreatePostData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from('hunter_feed')
    .insert({
      user_id: user.id,
      post_type: data.post_type,
      title: data.title,
      body: data.body,
      tags: data.tags || [],
      proof_media_url: data.proof_media_url,
      proof_type: data.proof_type || 'None',
      quest_id: data.quest_id
    });

  if (error) throw error;

  revalidatePath('/feed');
}

export async function deletePost(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from('hunter_feed')
    .delete()
    .eq('id', postId)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/feed');
}
