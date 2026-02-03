// Social Media Feed - Type Definitions
// Hunter Network: Social Media Feed inspired by Solo Leveling/Hunter theme

export type PostType =
  | 'quest_completion'
  | 'rank_up'
  | 'level_up'
  | 'achievement'
  | 'tip'
  | 'guild_announcement';

export type EngagementType = 'kudos' | 'respect' | 'analysis';
export type ProofType = 'Photo' | 'Video' | 'None';

export type HunterRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
export type HunterStatus = 'Normal' | 'Verified' | 'Flagged' | 'Corrupted';

export interface HunterPost {
  id: string;
  author: {
    username: string;
    rank: HunterRank;
    hunter_status: HunterStatus;
    avatar_url: string | null;
  };
  post_type: PostType;
  title: string;
  body: string | null;
  quest_id: string | null;
  quest_data: QuestData | null;
  kudos_count: number;
  respects_count: number;
  analysis_count: number;
  user_kudos: boolean;
  user_respect: boolean;
  proof_media_url: string | null;
  proof_type: ProofType;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface QuestData {
  name: string;
  xp_earned: number;
  duration_min: number;
  exercises_count: number;
}

export interface FeedEngagement {
  id: string;
  feed_post_id: string;
  user_id: string;
  engagement_type: EngagementType;
  created_at: string;
}

export interface FeedFilters {
  postType: PostType | 'all';
  rankFilter: HunterRank | 'all';
  verifiedOnly: boolean;
  friendsOnly: boolean;
  guildFilter: string | null;
  timeRange: 'today' | 'week' | 'month' | 'all';
}

export interface TrendingTag {
  tag: string;
  count: number;
}

export interface CreatePostData {
  post_type: PostType;
  title: string;
  body: string;
  tags: string[];
  proof_media_url: string | null;
  proof_type: ProofType;
  quest_id: string | null;
}
