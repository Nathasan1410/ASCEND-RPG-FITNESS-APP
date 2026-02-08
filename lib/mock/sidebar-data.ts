// Mock Data for Sidebar Components
// Phase VII: Sidebar Components

export interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  rank: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  hunterStatus: "Verified" | "Normal";
  class: "Novice" | "Striker" | "Tank" | "Assassin";
  joinDate: string;
  stats: {
    weeklyXP: number;
    questsCompleted: number;
    dayStreak: number;
    totalQuests: number;
    rankUps: number;
    achievements: number;
  };
}

export interface QuickAction {
  href: string;
  icon: any;
  label: string;
}

export interface TrendingTag {
  id: number;
  name: string;
  count: number;
}

export interface SuggestedHunter {
  id: number;
  username: string;
  displayName: string;
  avatar: string;
  rank: string;
  class: "Novice" | "Striker" | "Tank" | "Assassin";
  hunterStatus: "Verified" | "Normal";
  following: boolean;
  xp: number;
}

export interface ActiveChallenge {
  id: number;
  name: string;
  description: string;
  participants: number;
  timeLeft: string;
  prize: string;
  joined: boolean;
}

export const mockUserProfile: UserProfile = {
  username: "HunterShadow_X",
  displayName: "Alex Hunter",
  avatar: "/avatars/hunter-shadow.jpg",
  rank: "S",
  level: 87,
  xp: 124500,
  xpToNextLevel: 165000,
  hunterStatus: "Verified",
  class: "Assassin",
  joinDate: "2025-01-15",
  stats: {
    weeklyXP: 12450,
    questsCompleted: 28,
    dayStreak: 45,
    totalQuests: 342,
    rankUps: 7,
    achievements: 23,
  },
};

export const mockQuickActions: QuickAction[] = [
  { href: "/profile/me", icon: "User", label: "My Profile" },
  { href: "/settings", icon: "Settings", label: "Settings" },
  { href: "/dashboard/leaderboard", icon: "Trophy", label: "Leaderboard" },
  { href: "/dashboard/quests", icon: "Target", label: "Active Quests" },
  { href: "/dashboard/analytics", icon: "TrendingUp", label: "AI Analytics" },
  { href: "/achievements", icon: "Star", label: "Achievements" },
];

export const mockTrendingTags: TrendingTag[] = [
  { id: 1, name: "#RankUp", count: 1243 },
  { id: 2, name: "#LegDay", count: 892 },
  { id: 3, name: "#TankBuild", count: 756 },
  { id: 4, name: "#QuestComplete", count: 634 },
  { id: 5, name: "#MorningGrind", count: 521 },
  { id: 6, name: "#CardioKing", count: 445 },
  { id: 7, name: "#PRDay", count: 389 },
  { id: 8, name: "#S-Rank", count: 312 },
];

export const mockSuggestedHunters: SuggestedHunter[] = [
  {
    id: 1,
    username: "SwiftBlade",
    displayName: "Mike Chen",
    avatar: "/avatars/swift-blade.jpg",
    rank: "S",
    class: "Striker",
    hunterStatus: "Verified",
    following: false,
    xp: 156000,
  },
  {
    id: 2,
    username: "IronFist",
    displayName: "Sarah Johnson",
    avatar: "/avatars/iron-fist.jpg",
    rank: "A",
    class: "Tank",
    hunterStatus: "Verified",
    following: false,
    xp: 89000,
  },
  {
    id: 3,
    username: "NightHunter",
    displayName: "James Wilson",
    avatar: "/avatars/night-hunter.jpg",
    rank: "S",
    class: "Assassin",
    hunterStatus: "Normal",
    following: false,
    xp: 134000,
  },
  {
    id: 4,
    username: "TankMaster",
    displayName: "Emily Davis",
    avatar: "/avatars/tank-master.jpg",
    rank: "A",
    class: "Tank",
    hunterStatus: "Verified",
    following: false,
    xp: 76000,
  },
];

export const mockActiveChallenges: ActiveChallenge[] = [
  {
    id: 1,
    name: "100k XP Weekend",
    description: "Reach 100,000 XP in one weekend",
    participants: 1243,
    timeLeft: "2 days 14 hours",
    prize: "Achievement + XP Bonus",
    joined: false,
  },
  {
    id: 2,
    name: "30-Day Streak Challenge",
    description: "Complete at least one quest daily for 30 days",
    participants: 856,
    timeLeft: "15 days",
    prize: "S-Rank Badge + Title",
    joined: true,
  },
  {
    id: 3,
    name: "Rank Up Rally",
    description: "Complete your next rank-up exam this week",
    participants: 634,
    timeLeft: "5 days",
    prize: "Double XP on Rank Up",
    joined: false,
  },
];
