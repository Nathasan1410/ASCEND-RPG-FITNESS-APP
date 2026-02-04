// Mock Data for Settings Page
// Phase VI: Settings Page Navigation

export const mockSettings = {
  // Account
  username: "HunterShadow_X",
  email: "hunter@example.com",

  // Profile
  displayName: "Alex Hunter",
  bio: "RPG fitness enthusiast. Always grinding for that next rank. 💪",
  avatar: "/avatars/hunter-shadow.jpg",
  banner: "/banners/hunter-shadow.jpg",

  // Appearance
  badgeStyle: "glow", // glow, minimal, outline
  theme: "dark", // dark, darker
  fontSize: "medium", // small, medium, large

  // Audio
  soundEnabled: true,
  volume: 80,
  musicEnabled: false,

  // Privacy
  publicProfile: true,
  showStats: true,
  allowFriendRequests: true,

  // Equipment
  equipment: ["gym", "home", "outdoor", "running"],

  // Class
  currentClass: "Assassin",
  classChangeAvailable: true,
};

export const mockBadgeStyles = [
  { value: "glow", label: "Glow", description: "Neon glow effect" },
  { value: "minimal", label: "Minimal", description: "Clean, simple look" },
  { value: "outline", label: "Outline", description: "Bordered style" },
];

export const mockThemeOptions = [
  { value: "dark", label: "Dark", description: "Standard dark theme" },
  { value: "darker", label: "Darker", description: "Extra dark theme" },
];

export const mockFontSizes = [
  { value: "small", label: "Small", description: "14px base font" },
  { value: "medium", label: "Medium", description: "16px base font" },
  { value: "large", label: "Large", description: "18px base font" },
];

export const mockEquipmentOptions = [
  { id: "gym", label: "Gym Equipment", checked: true },
  { id: "home", label: "Home Equipment", checked: true },
  { id: "outdoor", label: "Outdoor", checked: false },
  { id: "running", label: "Running", checked: true },
  { id: "swimming", label: "Swimming", checked: false },
  { id: "cycling", label: "Cycling", checked: false },
];

export const mockClassOptions = [
  { value: "Novice", label: "Novice", description: "Consistency Builder - Focus on form and consistency" },
  { value: "Striker", label: "Striker", description: "Endurance - High volume, short rest" },
  { value: "Tank", label: "Tank", description: "Strength - Low reps, heavy load" },
  { value: "Assassin", label: "Assassin", description: "Agility - HIIT, cardio, fat loss" },
];
