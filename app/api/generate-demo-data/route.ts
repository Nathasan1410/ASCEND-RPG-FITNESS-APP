import { NextResponse } from 'next/server';

interface DemoAccount {
  email: string;
  password: string;
  username: string;
  class: 'Novice' | 'Striker' | 'Tank' | 'Assassin';
  rank_tier: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank';
  level: number;
  current_xp: number;
  total_xp: number;
  stats_strength: number;
  stats_agility: number;
  stats_stamina: number;
}

// Helper functions for randomization
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateUsername = (prefix: string, suffix: string): string => {
  const numbers = Math.floor(Math.random() * 999);
  return `${prefix}${suffix}${numbers}`;
};

const generateEmail = (username: string): string => {
  const domains = ['test.com', 'demo.local'];
  const domain = randomFrom(domains);
  return `${username.toLowerCase()}@${domain}`;
};

// XP calculation based on rank and level
const calculateXP = (rank: string, level: number) => {  const rankMultipliers = {
    'S-Rank': 2500,
    'A-Rank': 2000,
    'B-Rank': 1500,
    'C-Rank': 1000,
    'D-Rank': 600,
    'E-Rank': 300,
  };
  const multiplier = rankMultipliers[rank as keyof typeof rankMultipliers] || 300;
  return level * multiplier;
};

// Stat calculation based on class
const calculateStats = (hunterClass: string, baseStats: number) => {
  const classModifiers = {
    'Novice': { str: 10, agi: 10, sta: 10 },
    'Striker': { str: 8, agi: 10, sta: 7 },
    'Tank': { str: 10, agi: 7, sta: 10 },
    'Assassin': { str: 7, agi: 10, sta: 8 },
  };
  const modifiers = classModifiers[hunterClass as keyof typeof classModifiers] || classModifiers['Novice'];
  
  const levelBonus = Math.floor(baseStats * 0.5);
  
  return {
    stats_strength: baseStats + modifiers.str + Math.floor(Math.random() * 5),
    stats_agility: baseStats + modifiers.agi + Math.floor(Math.random() * 5),
    stats_stamina: baseStats + modifiers.sta + Math.floor(Math.random() * 5),
  };
};

// Generate demo accounts
const generateDemoAccounts = (): DemoAccount[] => {
  const accounts: DemoAccount[] = [];
  const password = 'Demo123!'; // Consistent password for all demo accounts
  
  const prefixes = [
    'Shadow', 'Frost', 'Thunder', 'Blazing', 'Void', 'Swift',
    'Cyber', 'Iron', 'Flame', 'Storm', 'Dread', 'Silver',
    'Night', 'Wolf', 'Dragon', 'Knight', 'Fang', 'Bolt',
    'Heart', 'Strike', 'Soul', 'Shield', 'Claw', 'Paw',
    'Blade', 'Runner', 'Ninja', 'Wolff', 'Fist', 'Light',
    'Moon', 'Star', 'Fire', 'Ice', 'Wind', 'Earth'
  ];
  
  const suffixes = [
    'Hunter', 'Warrior', 'Strike', 'Knight', 'Tank', 'Wolf',
    'Dragon', 'Fang', 'Claw', 'Blade', 'Runner', 'Ninja',
    'Wolf', 'Dragon', 'Fist', 'Knight', 'Storm', 'Rider',
    'Warrior', 'Shield', 'Heart', 'Strike', 'Soul', 'Paw',
    'Master', 'Lord', 'King', 'Queen', 'Prince', 'Legend'
  ];
  
  const classes: ('Novice' | 'Striker' | 'Tank' | 'Assassin')[] = [
    'Novice', 'Striker', 'Tank', 'Assassin'
  ];
  
  const ranks: ('E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank')[] = [
    'E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'
  ];
  
  // S-Rank: 2 users
  accounts.push({
    email: generateEmail('ShadowHunter'),
    password,
    username: 'ShadowHunter',
    class: 'Assassin',
    rank_tier: 'S-Rank',
    level: 95,
    current_xp: 237500,
    total_xp: 237500,
    ...calculateStats('Assassin', 95)
  });
  
  accounts.push({
    email: generateEmail('PhantomBlade'),
    password,
    username: 'PhantomBlade',
    class: 'Striker',
    rank_tier: 'S-Rank',
    level: 92,
    current_xp: 184000,
    total_xp: 184000,
    ...calculateStats('Striker', 92)
  });
  
  // A-Rank: 6 users
  for (let i = 0; i < 6; i++) {
    const username = generateUsername(
      randomFrom(['Thunder', 'Frost', 'Iron', 'Flame', 'Storm', 'Void']),
      randomFrom(['Strike', 'Warrior', 'Tank', 'Knight', 'Rider', 'Walker'])
    );
    
    const hunterClass = randomFrom(['Tank', 'Striker', 'Assassin']) as 'Novice' | 'Striker' | 'Tank' | 'Assassin';
    const level = randomInt(70, 78);
    const xp = calculateXP('A-Rank', level);
    
    accounts.push({
      email: generateEmail(username),
      password,
      username,
      class: hunterClass,
      rank_tier: 'A-Rank',
      level,
      current_xp: xp,
      total_xp: xp,
      ...calculateStats(hunterClass, level)
    });
  }
  
  // B-Rank: 8 users
  for (let i = 0; i < 8; i++) {
    const username = generateUsername(
      randomFrom(['Swift', 'Cyber', 'Blazing', 'Thunder', 'Shadow', 'Frozen', 'Iron', 'Blade']),
      randomFrom(['Wolf', 'Dragon', 'Fist', 'Claw', 'Strike', 'Soul', 'Shield', 'Runner'])
    );
    
    const hunterClass = randomFrom(['Assassin', 'Tank', 'Striker', 'Assassin']) as 'Novice' | 'Striker' | 'Tank' | 'Assassin';
    const level = randomInt(32, 48);
    const xp = calculateXP('B-Rank', level);
    
    accounts.push({
      email: generateEmail(username),
      password,
      username,
      class: hunterClass,
      rank_tier: 'B-Rank',
      level,
      current_xp: xp,
      total_xp: xp,
      ...calculateStats(hunterClass, level)
    });
  }
  
  // C-Rank: 8 users
  for (let i = 0; i < 8; i++) {
    const username = generateUsername(
      randomFrom(['Swift', 'Cyber', 'Dread', 'Silver', 'Thunder', 'Iron', 'Frost', 'Shadow']),
      randomFrom(['Ninja', 'Wolf', 'Knight', 'Fang', 'Bolt', 'Heart', 'Strike', 'Paw'])
    );
    
    const hunterClass = randomFrom(['Assassin', 'Striker', 'Tank']) as 'Novice' | 'Striker' | 'Tank' | 'Assassin';
    const level = randomInt(5, 22);
    const xp = calculateXP('C-Rank', level);
    
    accounts.push({
      email: generateEmail(username),
      password,
      username,
      class: hunterClass,
      rank_tier: 'C-Rank',
      level,
      current_xp: xp,
      total_xp: xp,
      ...calculateStats(hunterClass, level)
    });
  }
  
  return accounts;
};

export async function GET() {
  try {
    const demoAccounts = generateDemoAccounts();
    
    return NextResponse.json({
      success: true,
      count: demoAccounts.length,
      message: 'Generated 24 demo accounts with randomized data',
      accounts: demoAccounts,
      password: 'Demo123!', // Password for all accounts
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating demo accounts:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate demo accounts',
    }, { status: 500 });
  }
}
