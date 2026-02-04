// Mock Data for Filter Components
// Phase V: Mobile-Specific Improvements

export const mockMobileFilters = {
  postType: 'all',
  rankFilter: 'all',
  timeRange: 'all',
  verifiedOnly: false,
  friendsOnly: false,
};

export const mockFilterOptions = {
  postType: [
    { value: 'all', label: 'All Broadcasts' },
    { value: 'quest_completion', label: 'Quest Completions' },
    { value: 'rank_up', label: 'Rank Ups' },
    { value: 'level_up', label: 'Level Ups' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'tip', label: 'Hunter Tips' },
  ],
  rankFilter: [
    { value: 'all', label: 'All Ranks' },
    { value: 'S', label: 'S-Rank Only' },
    { value: 'A', label: 'A-Rank+' },
    { value: 'B', label: 'B-Rank+' },
    { value: 'C', label: 'C-Rank+' },
    { value: 'D', label: 'D-Rank+' },
    { value: 'E', label: 'E-Rank+' },
  ],
  timeRange: [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ],
};

export const mockLeaderboardFilters = {
  rank: 'all',
  class: 'all',
  status: 'all',
  timeRange: 'week',
};

export const mockLeaderboardFilterChips = {
  rank: [
    { value: 'all', label: 'All Ranks' },
    { value: 'S', label: 'S-Rank' },
    { value: 'A', label: 'A-Rank' },
    { value: 'B', label: 'B-Rank' },
    { value: 'C', label: 'C-Rank' },
    { value: 'D', label: 'D-Rank' },
    { value: 'E', label: 'E-Rank' },
  ],
  class: [
    { value: 'all', label: 'All Classes' },
    { value: 'Novice', label: 'Novice' },
    { value: 'Striker', label: 'Striker' },
    { value: 'Tank', label: 'Tank' },
    { value: 'Assassin', label: 'Assassin' },
    { value: 'Mage', label: 'Mage' },
    { value: 'Healer', label: 'Healer' },
  ],
  status: [
    { value: 'all', label: 'All Status' },
    { value: 'Verified', label: 'Verified' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Flagged', label: 'Flagged' },
  ],
  timeRange: [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ],
};
