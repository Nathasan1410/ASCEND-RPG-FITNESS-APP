export interface FeatureDetail {
  id: string;
  name: string;
  status: 'Implemented' | 'In Progress' | 'Planned' | 'Not Started';
  priority: 'High' | 'Medium' | 'Low';
  category: 'Core' | 'Social' | 'AI' | 'Monetization' | 'Innovation';
  progress: number;
  lastUpdated: string;

  description: {
    userFacing: string;
    technical: string;
    problemStatement: string;
    currentLimitations: string[];
    solution: string;
    userBenefits: string[];
    businessValue: string;
  };

  timeline: {
    targetDate: string;
    quarter: string;
    phases: TimelinePhase[];
    dependencies: string[];
  };

  milestones: {
    completed: Milestone[];
    upcoming: Milestone[];
    total: number;
    completedCount: number;
    percentage: number;
    nextMilestone?: Milestone;
  };

  implementation: {
    overallProgress: number;
    estimatedCompletion: string;
    status: 'On Track' | 'Delayed' | 'Ahead';
    phases: ImplementationPhase[];
    tasks: ImplementationTask[];
    technical: {
      technologies: string[];
      apiEndpoints: string[];
      databaseChanges: string[];
      documentation: string[];
    };
    demo?: {
      available: boolean;
      liveDemo?: string;
      screenshots?: string[];
      video?: string;
      testAccount?: TestAccount;
    };
  };
}

export interface TimelinePhase {
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  date: string;
  description?: string;
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  description: string;
  link?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface ImplementationPhase {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  progress: number;
  completedDate?: string;
}

export interface ImplementationTask {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  assignee?: string;
  dueDate?: string;
  estimatedHours?: number;
}

export interface TestAccount {
  email: string;
  password: string;
  description: string;
}

export const featureDetails: FeatureDetail[] = [
  {
    id: 'authentication',
    name: 'User Authentication',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-01-20',
    description: {
      userFacing: 'Secure login system that lets you create an account and access all ASCEND features using email/password or social login options.',
      technical: 'Authentication system built on Supabase Auth with OAuth providers (Google, GitHub). Includes JWT token management, session persistence, and role-based access control.',
      problemStatement: 'Users need a secure way to identify themselves and protect their personal data, workout progress, and achievements.',
      currentLimitations: [],
      solution: 'Implemented Supabase Auth with multiple authentication providers, secure session management, and protected routes.',
      userBenefits: [
        'Secure access to your personal data',
        'Sync progress across devices',
        'Social login with Google and GitHub',
        'Password reset functionality',
        'Persistent sessions'
      ],
      businessValue: 'Essential foundation for all user-facing features, enables personalized experiences and data protection.'
    },
    timeline: {
      targetDate: 'December 2025',
      quarter: 'Q4 2025',
      phases: [
        { name: 'Planning', status: 'completed', date: 'Nov 2025' },
        { name: 'Setup Supabase', status: 'completed', date: 'Nov 2025' },
        { name: 'Implement Auth', status: 'completed', date: 'Dec 2025' },
        { name: 'OAuth Integration', status: 'completed', date: 'Dec 2025' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [
        { id: '1', name: 'Supabase Project Setup', date: '2025-11-15', description: 'Created Supabase project and configured authentication settings' },
        { id: '2', name: 'Email/Password Auth', date: '2025-12-01', description: 'Implemented email and password authentication flow' },
        { id: '3', name: 'Google OAuth', date: '2025-12-05', description: 'Integrated Google OAuth provider' },
        { id: '4', name: 'GitHub OAuth', date: '2025-12-08', description: 'Integrated GitHub OAuth provider' },
        { id: '5', name: 'Session Management', date: '2025-12-10', description: 'Implemented secure session handling and JWT tokens' },
        { id: '6', name: 'Protected Routes', date: '2025-12-15', description: 'Added route protection middleware' },
        { id: '7', name: 'Password Reset', date: '2025-12-18', description: 'Implemented password reset functionality' }
      ],
      upcoming: [],
      total: 7,
      completedCount: 7,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'December 2025',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Infrastructure Setup', status: 'completed', progress: 100, completedDate: '2025-11-15' },
        { id: '2', name: 'Core Authentication', status: 'completed', progress: 100, completedDate: '2025-12-01' },
        { id: '3', name: 'OAuth Integration', status: 'completed', progress: 100, completedDate: '2025-12-08' },
        { id: '4', name: 'Security & UX', status: 'completed', progress: 100, completedDate: '2025-12-15' }
      ],
      tasks: [
        { id: '1', name: 'Setup Supabase project', status: 'completed', assignee: 'Developer', estimatedHours: 4 },
        { id: '2', name: 'Configure auth providers', status: 'completed', assignee: 'Developer', estimatedHours: 3 },
        { id: '3', name: 'Build auth UI components', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '4', name: 'Implement session management', status: 'completed', assignee: 'Developer', estimatedHours: 6 },
        { id: '5', name: 'Add protected routes', status: 'completed', assignee: 'Developer', estimatedHours: 4 },
        { id: '6', name: 'Test authentication flow', status: 'completed', assignee: 'QA', estimatedHours: 4 }
      ],
      technical: {
        technologies: ['Supabase Auth', 'Next.js', 'TypeScript', 'React Context', 'JWT'],
        apiEndpoints: ['/api/auth/login', '/api/auth/register', '/api/auth/reset-password'],
        databaseChanges: ['Created users table', 'Added auth provider configurations', 'Setup session storage'],
        documentation: ['Supabase Auth docs', 'Internal auth implementation guide']
      },
      demo: {
        available: true,
        screenshots: [],
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Demo account with full access to all features'
        }
      }
    }
  },
  {
    id: 'quest-generation',
    name: 'AI Quest Generation',
    status: 'Implemented',
    priority: 'High',
    category: 'AI',
    progress: 100,
    lastUpdated: '2026-01-25',
    description: {
      userFacing: 'The system creates personalized workout quests for you based on your fitness level, goals, and preferences using advanced AI.',
      technical: 'Uses Groq LLM API with structured prompts to generate workout plans. Includes prompt engineering for consistency, response validation, and caching for performance.',
      problemStatement: 'Users need personalized workout recommendations but lack the expertise to design effective routines for their specific goals and fitness level.',
      currentLimitations: [],
      solution: 'AI-powered quest generation that analyzes user profile, goals, and preferences to create personalized workout quests.',
      userBenefits: [
        'Personalized workout plans tailored to you',
        'Adaptive difficulty based on your progress',
        'Variety of exercises to prevent boredom',
        'Goals-aligned quest suggestions',
        'Time-efficient workout planning'
      ],
      businessValue: 'Core differentiator that provides value immediately after signup, increases user engagement and retention.'
    },
    timeline: {
      targetDate: 'January 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Research', status: 'completed', date: 'Jan 2026' },
        { name: 'API Integration', status: 'completed', date: 'Jan 2026' },
        { name: 'Prompt Engineering', status: 'completed', date: 'Jan 2026' },
        { name: 'UI Integration', status: 'completed', date: 'Jan 2026' }
      ],
      dependencies: ['authentication', 'xp-leveling-system']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Groq API Integration', date: '2026-01-10', description: 'Integrated Groq LLM API for quest generation' },
        { id: '2', name: 'Prompt Engineering', date: '2026-01-15', description: 'Developed and optimized prompts for consistent quest generation' },
        { id: '3', name: 'User Profile Integration', date: '2026-01-18', description: 'Connected quest generation with user profile data' },
        { id: '4', name: 'Response Parsing', date: '2026-01-20', description: 'Implemented structured response parsing and validation' },
        { id: '5', name: 'UI Components', date: '2026-01-22', description: 'Built quest display and acceptance UI' },
        { id: '6', name: 'Caching System', date: '2026-01-25', description: 'Added caching to improve performance and reduce API calls' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'January 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Research & Planning', status: 'completed', progress: 100, completedDate: '2026-01-05' },
        { id: '2', name: 'API Integration', status: 'completed', progress: 100, completedDate: '2026-01-10' },
        { id: '3', name: 'Prompt Development', status: 'completed', progress: 100, completedDate: '2026-01-18' },
        { id: '4', name: 'UI & UX', status: 'completed', progress: 100, completedDate: '2026-01-25' }
      ],
      tasks: [
        { id: '1', name: 'Research LLM options', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '2', name: 'Integrate Groq API', status: 'completed', assignee: 'Developer', estimatedHours: 6 },
        { id: '3', name: 'Develop prompt templates', status: 'completed', assignee: 'AI Engineer', estimatedHours: 12 },
        { id: '4', name: 'Build response parser', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '5', name: 'Create quest UI', status: 'completed', assignee: 'Developer', estimatedHours: 10 },
        { id: '6', name: 'Add caching layer', status: 'completed', assignee: 'Developer', estimatedHours: 4 }
      ],
      technical: {
        technologies: ['Groq LLM API', 'Next.js API Routes', 'TypeScript', 'Redis/Cache', 'React Query'],
        apiEndpoints: ['/api/quests/generate', '/api/quests/accept', '/api/quests/reject'],
        databaseChanges: ['Created quests table', 'Added quest templates', 'Cached quest responses'],
        documentation: ['Groq API docs', 'Quest generation guide', 'Prompt engineering guidelines']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Try generating AI quests from the dashboard'
        }
      }
    }
  },
  {
    id: 'ai-judge',
    name: 'AI Judge Evaluation',
    status: 'Implemented',
    priority: 'High',
    category: 'AI',
    progress: 100,
    lastUpdated: '2026-01-28',
    description: {
      userFacing: 'The AI Judge evaluates your completed workouts to award XP fairly based on effort, technique, and achievements.',
      technical: 'Uses Opik AI Judge framework with Groq LLM for multi-factor evaluation. Evaluates workout photos, descriptions, user effort, and achievement of quest goals. Includes transparency in scoring.',
      problemStatement: 'Users need objective feedback on their workouts and fair XP rewards to stay motivated and track progress accurately.',
      currentLimitations: [],
      solution: 'AI-powered evaluation that considers multiple factors to provide fair XP rewards and constructive feedback.',
      userBenefits: [
        'Fair and objective XP calculation',
        'Constructive feedback on workouts',
        'Transparent scoring criteria',
        'Motivation through recognition',
        'Progress tracking with detailed metrics'
      ],
      businessValue: 'Core gamification element that provides immediate feedback and keeps users engaged through fair rewards.'
    },
    timeline: {
      targetDate: 'January 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Opik Integration', status: 'completed', date: 'Jan 2026' },
        { name: 'Evaluation Logic', status: 'completed', date: 'Jan 2026' },
        { name: 'Testing', status: 'completed', date: 'Jan 2026' },
        { name: 'Transparency UI', status: 'completed', date: 'Jan 2026' }
      ],
      dependencies: ['opik-integration', 'quest-generation', 'proof-upload']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Opik SDK Integration', date: '2026-01-15', description: 'Integrated Opik SDK for AI evaluation' },
        { id: '2', name: 'Evaluation Prompts', date: '2026-01-18', description: 'Developed evaluation criteria and prompts' },
        { id: '3', name: 'Multi-factor Scoring', date: '2026-01-20', description: 'Implemented multi-factor evaluation system' },
        { id: '4', name: 'XP Calculation', date: '2026-01-22', description: 'Connected evaluation to XP calculation' },
        { id: '5', name: 'Transparency Dashboard', date: '2026-01-25', description: 'Built transparency UI showing evaluation details' },
        { id: '6', name: 'Feedback System', date: '2026-01-28', description: 'Added detailed feedback for users' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'January 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Infrastructure', status: 'completed', progress: 100, completedDate: '2026-01-15' },
        { id: '2', name: 'Evaluation Logic', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '3', name: 'Integration', status: 'completed', progress: 100, completedDate: '2026-01-25' },
        { id: '4', name: 'UI & Transparency', status: 'completed', progress: 100, completedDate: '2026-01-28' }
      ],
      tasks: [
        { id: '1', name: 'Setup Opik project', status: 'completed', assignee: 'AI Engineer', estimatedHours: 6 },
        { id: '2', name: 'Define evaluation criteria', status: 'completed', assignee: 'Product Manager', estimatedHours: 4 },
        { id: '3', name: 'Build evaluation pipeline', status: 'completed', assignee: 'AI Engineer', estimatedHours: 12 },
        { id: '4', name: 'Integrate with quest system', status: 'completed', assignee: 'Developer', estimatedHours: 6 },
        { id: '5', name: 'Create transparency UI', status: 'completed', assignee: 'Developer', estimatedHours: 10 },
        { id: '6', name: 'Test with various inputs', status: 'completed', assignee: 'QA', estimatedHours: 8 }
      ],
      technical: {
        technologies: ['Opik SDK', 'Groq LLM', 'Next.js', 'TypeScript', 'React Query'],
        apiEndpoints: ['/api/evaluate', '/api/quests/complete', '/api/evaluation/details'],
        databaseChanges: ['Created evaluations table', 'Added evaluation criteria storage'],
        documentation: ['Opik documentation', 'Evaluation criteria guide', 'API documentation']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Complete a quest and see AI judge evaluation'
        }
      }
    }
  },
  {
    id: 'xp-leveling-system',
    name: 'XP and Leveling System',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-01-20',
    description: {
      userFacing: 'Earn XP from completing quests and level up through hunter ranks (E through S) and unlock special classes with unique abilities.',
      technical: 'Gamification system with XP calculation, level progression, rank advancement (E to S), and class selection. Includes XP history tracking, achievements, and visual progress indicators.',
      problemStatement: 'Users need motivation and a sense of progression to stay engaged with their fitness journey long-term.',
      currentLimitations: [],
      solution: 'Comprehensive leveling system inspired by gaming, with ranks, classes, and visual progression.',
      userBenefits: [
        'Clear progression and goals',
        'Sense of achievement',
        'Motivation to workout consistently',
        'Class-specific abilities and bonuses',
        'Social comparison and competition'
      ],
      businessValue: 'Core retention mechanic that gamifies fitness and encourages long-term engagement.'
    },
    timeline: {
      targetDate: 'December 2025',
      quarter: 'Q4 2025',
      phases: [
        { name: 'System Design', status: 'completed', date: 'Nov 2025' },
        { name: 'XP Calculation', status: 'completed', date: 'Dec 2025' },
        { name: 'Rank System', status: 'completed', date: 'Dec 2025' },
        { name: 'Class System', status: 'completed', date: 'Dec 2025' }
      ],
      dependencies: ['authentication']
    },
    milestones: {
      completed: [
        { id: '1', name: 'XP Calculation Logic', date: '2025-12-01', description: 'Implemented XP calculation formulas' },
        { id: '2', name: 'Level Progression', date: '2025-12-05', description: 'Built level-up system' },
        { id: '3', name: 'Rank System (E-S)', date: '2025-12-10', description: 'Implemented hunter rank progression' },
        { id: '4', name: 'Class Selection', date: '2025-12-12', description: 'Added class selection and abilities' },
        { id: '5', name: 'Progress Visualization', date: '2025-12-15', description: 'Created visual progress bars and indicators' },
        { id: '6', name: 'XP History', date: '2025-12-18', description: 'Implemented XP history tracking' },
        { id: '7', name: 'Achievements', date: '2025-12-20', description: 'Added achievement system' }
      ],
      upcoming: [],
      total: 7,
      completedCount: 7,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'December 2025',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Design', status: 'completed', progress: 100, completedDate: '2025-11-25' },
        { id: '2', name: 'Core Systems', status: 'completed', progress: 100, completedDate: '2025-12-10' },
        { id: '3', name: 'Features', status: 'completed', progress: 100, completedDate: '2025-12-18' },
        { id: '4', name: 'Polish', status: 'completed', progress: 100, completedDate: '2025-12-20' }
      ],
      tasks: [
        { id: '1', name: 'Design XP and rank system', status: 'completed', assignee: 'Product Manager', estimatedHours: 8 },
        { id: '2', name: 'Implement XP calculation', status: 'completed', assignee: 'Developer', estimatedHours: 10 },
        { id: '3', name: 'Build rank progression', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '4', name: 'Create class system', status: 'completed', assignee: 'Developer', estimatedHours: 12 },
        { id: '5', name: 'Add achievements', status: 'completed', assignee: 'Developer', estimatedHours: 10 },
        { id: '6', name: 'Build UI components', status: 'completed', assignee: 'Developer', estimatedHours: 12 }
      ],
      technical: {
        technologies: ['Next.js', 'TypeScript', 'Supabase', 'React Context', 'Framer Motion'],
        apiEndpoints: ['/api/xp/award', '/api/user/level-up', '/api/user/select-class'],
        databaseChanges: ['Created xp_history table', 'Added user_levels table', 'Created achievements table'],
        documentation: ['XP calculation guide', 'Rank progression docs', 'Class abilities reference']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Try different demo accounts at various levels'
        }
      }
    }
  },
  {
    id: 'hunter-network',
    name: 'Hunter Network',
    status: 'Implemented',
    priority: 'High',
    category: 'Social',
    progress: 95,
    lastUpdated: '2026-02-04',
    description: {
      userFacing: 'Connect with other hunters, share your workouts, give kudos, and build your fitness community.',
      technical: 'Social feed system with post creation, reactions (kudos, respects), following system, and activity notifications. Real-time updates and optimized performance.',
      problemStatement: 'Fitness is more fun and motivating when shared with others. Users need social connections and community support.',
      currentLimitations: ['Direct messaging not yet implemented', 'Limited commenting options'],
      solution: 'Social network features including feed, posts, reactions, following, and community building.',
      userBenefits: [
        'Connect with like-minded hunters',
        'Share achievements and workouts',
        'Get support and motivation',
        'Discover new workout ideas',
        'Build fitness community'
      ],
      businessValue: 'Increases engagement through social features, creates network effects, and improves retention.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Core Feed', status: 'completed', date: 'Jan 2026' },
        { name: 'Social Interactions', status: 'completed', date: 'Jan 2026' },
        { name: 'Following System', status: 'completed', date: 'Feb 2026' },
        { name: 'Enhancements', status: 'in_progress', date: 'Feb 2026' }
      ],
      dependencies: ['authentication', 'xp-leveling-system', 'proof-upload']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Feed Infrastructure', date: '2026-01-15', description: 'Built core feed architecture' },
        { id: '2', name: 'Post Creation', date: '2026-01-18', description: 'Implemented post creation with media' },
        { id: '3', name: 'Kudos System', date: '2026-01-20', description: 'Added kudos (like) functionality' },
        { id: '4', name: 'Respects System', date: '2026-01-22', description: 'Implemented respects feature' },
        { id: '5', name: 'Following', date: '2026-01-25', description: 'Added follow/unfollow users' },
        { id: '6', name: 'Notifications', date: '2026-01-28', description: 'Built notification system' },
        { id: '7', name: 'Feed Optimization', date: '2026-02-01', description: 'Optimized feed performance' }
      ],
      upcoming: [
        { id: '8', name: 'Comments Enhancement', date: '2026-02-10', description: 'Enhanced commenting system', priority: 'High' },
        { id: '9', name: 'Direct Messaging', date: '2026-03-01', description: 'Private messaging between users', priority: 'Medium' }
      ],
      total: 9,
      completedCount: 7,
      percentage: 78,
      nextMilestone: { id: '8', name: 'Comments Enhancement', date: '2026-02-10', description: 'Enhanced commenting system', priority: 'High' }
    },
    implementation: {
      overallProgress: 95,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Infrastructure', status: 'completed', progress: 100, completedDate: '2026-01-15' },
        { id: '2', name: 'Core Features', status: 'completed', progress: 100, completedDate: '2026-01-25' },
        { id: '3', name: 'Social Interactions', status: 'completed', progress: 100, completedDate: '2026-01-30' },
        { id: '4', name: 'Polish & Optimization', status: 'in_progress', progress: 75 }
      ],
      tasks: [
        { id: '1', name: 'Design feed architecture', status: 'completed', assignee: 'Backend Developer', estimatedHours: 10 },
        { id: '2', name: 'Build post creation', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 12 },
        { id: '3', name: 'Implement reactions', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '4', name: 'Add following system', status: 'completed', assignee: 'Developer', estimatedHours: 10 },
        { id: '5', name: 'Build notifications', status: 'completed', assignee: 'Developer', estimatedHours: 12 },
        { id: '6', name: 'Optimize feed queries', status: 'completed', assignee: 'Backend Developer', estimatedHours: 8 },
        { id: '7', name: 'Enhance comments', status: 'in_progress', assignee: 'Developer', estimatedHours: 6 }
      ],
      technical: {
        technologies: ['Next.js', 'Supabase', 'React Query', 'Real-time subscriptions', 'TypeScript'],
        apiEndpoints: ['/api/feed', '/api/posts', '/api/posts/react', '/api/users/follow'],
        databaseChanges: ['Created posts table', 'Added reactions table', 'Created follows table'],
        documentation: ['Feed architecture docs', 'Social features API', 'Real-time updates guide']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Post workouts, give kudos, and follow others'
        }
      }
    }
  },
  {
    id: 'leaderboard',
    name: 'Leaderboard',
    status: 'Implemented',
    priority: 'High',
    category: 'Social',
    progress: 100,
    lastUpdated: '2026-01-25',
    description: {
      userFacing: 'See how you rank against other hunters globally, filter by rank and class, and compete for top positions.',
      technical: 'Ranking system with global leaderboards, filtering by hunter rank (E-S) and class, real-time updates, and caching for performance. Pagination and optimized queries.',
      problemStatement: 'Users want to compare their progress with others and compete for top positions to stay motivated.',
      currentLimitations: ['Limited to global leaderboard only', 'No time-based filtering yet'],
      solution: 'Comprehensive leaderboard with multiple filters and real-time updates.',
      userBenefits: [
        'See your global ranking',
        'Compete with others',
        'Filter by rank and class',
        'Track progress over time',
        'Motivation through competition'
      ],
      businessValue: 'Encourages competition and engagement, creates social proof, and motivates users to improve.'
    },
    timeline: {
      targetDate: 'January 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Data Structure', status: 'completed', date: 'Jan 2026' },
        { name: 'Leaderboard API', status: 'completed', date: 'Jan 2026' },
        { name: 'UI Components', status: 'completed', date: 'Jan 2026' },
        { name: 'Performance', status: 'completed', date: 'Jan 2026' }
      ],
      dependencies: ['xp-leveling-system']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Ranking Algorithm', date: '2026-01-10', description: 'Implemented XP-based ranking' },
        { id: '2', name: 'Global Leaderboard', date: '2026-01-15', description: 'Created global ranking view' },
        { id: '3', name: 'Rank Filtering', date: '2026-01-18', description: 'Added filter by hunter rank' },
        { id: '4', name: 'Class Filtering', date: '2026-01-20', description: 'Added filter by class' },
        { id: '5', name: 'Pagination', date: '2026-01-22', description: 'Implemented pagination' },
        { id: '6', name: 'Caching', date: '2026-01-25', description: 'Added caching for performance' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'January 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Design', status: 'completed', progress: 100, completedDate: '2026-01-05' },
        { id: '2', name: 'Backend', status: 'completed', progress: 100, completedDate: '2026-01-18' },
        { id: '3', name: 'Frontend', status: 'completed', progress: 100, completedDate: '2026-01-22' },
        { id: '4', name: 'Optimization', status: 'completed', progress: 100, completedDate: '2026-01-25' }
      ],
      tasks: [
        { id: '1', name: 'Design ranking system', status: 'completed', assignee: 'Product Manager', estimatedHours: 4 },
        { id: '2', name: 'Build leaderboard API', status: 'completed', assignee: 'Backend Developer', estimatedHours: 8 },
        { id: '3', name: 'Implement filtering', status: 'completed', assignee: 'Developer', estimatedHours: 6 },
        { id: '4', name: 'Create UI components', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 10 },
        { id: '5', name: 'Add pagination', status: 'completed', assignee: 'Developer', estimatedHours: 4 },
        { id: '6', name: 'Implement caching', status: 'completed', assignee: 'Backend Developer', estimatedHours: 4 }
      ],
      technical: {
        technologies: ['Next.js', 'Supabase', 'Redis/Cache', 'TypeScript', 'React Query'],
        apiEndpoints: ['/api/leaderboard', '/api/leaderboard/filter'],
        databaseChanges: ['Created leaderboard cache', 'Optimized user XP queries'],
        documentation: ['Leaderboard API docs', 'Ranking algorithm explanation']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'View global rankings and filter by rank/class'
        }
      }
    }
  },
  {
    id: 'proof-upload',
    name: 'Proof Upload System',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-01-20',
    description: {
      userFacing: 'Upload photos or videos as proof of completing your quests to earn XP and get AI evaluation.',
      technical: 'File upload system with image and video support, storage optimization, compression, and secure storage. Includes preview, validation, and integration with AI judge.',
      problemStatement: 'Users need to provide evidence of workout completion to receive XP rewards and fair evaluation.',
      currentLimitations: [],
      solution: 'Comprehensive proof upload system supporting multiple media types with optimization.',
      userBenefits: [
        'Easy proof submission',
        'Support for photos and videos',
        'Automatic image optimization',
        'Secure storage',
        'Integration with AI evaluation'
      ],
      businessValue: 'Enables fair XP distribution and AI evaluation, critical for gamification integrity.'
    },
    timeline: {
      targetDate: 'December 2025',
      quarter: 'Q4 2025',
      phases: [
        { name: 'Storage Setup', status: 'completed', date: 'Dec 2025' },
        { name: 'Upload Functionality', status: 'completed', date: 'Dec 2025' },
        { name: 'Optimization', status: 'completed', date: 'Dec 2025' },
        { name: 'Integration', status: 'completed', date: 'Dec 2025' }
      ],
      dependencies: ['authentication']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Storage Configuration', date: '2025-12-01', description: 'Configured Supabase Storage' },
        { id: '2', name: 'Image Upload', date: '2025-12-05', description: 'Implemented photo upload' },
        { id: '3', name: 'Video Upload', date: '2025-12-08', description: 'Added video upload support' },
        { id: '4', name: 'Image Compression', date: '2025-12-10', description: 'Added automatic compression' },
        { id: '5', name: 'Preview System', date: '2025-12-12', description: 'Built preview functionality' },
        { id: '6', name: 'AI Integration', date: '2025-12-15', description: 'Connected to AI judge' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'December 2025',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Infrastructure', status: 'completed', progress: 100, completedDate: '2025-12-01' },
        { id: '2', name: 'Upload System', status: 'completed', progress: 100, completedDate: '2025-12-10' },
        { id: '3', name: 'Optimization', status: 'completed', progress: 100, completedDate: '2025-12-12' },
        { id: '4', name: 'Integration', status: 'completed', progress: 100, completedDate: '2025-12-15' }
      ],
      tasks: [
        { id: '1', name: 'Setup storage bucket', status: 'completed', assignee: 'DevOps', estimatedHours: 4 },
        { id: '2', name: 'Build upload API', status: 'completed', assignee: 'Backend Developer', estimatedHours: 8 },
        { id: '3', name: 'Create upload UI', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 10 },
        { id: '4', name: 'Add compression', status: 'completed', assignee: 'Developer', estimatedHours: 6 },
        { id: '5', name: 'Build preview', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 6 },
        { id: '6', name: 'Integrate with AI', status: 'completed', assignee: 'Developer', estimatedHours: 4 }
      ],
      technical: {
        technologies: ['Supabase Storage', 'Next.js', 'TypeScript', 'Sharp (image)', 'FFmpeg (video)'],
        apiEndpoints: ['/api/upload', '/api/upload/validate'],
        databaseChanges: ['Created uploads table', 'Added storage policies'],
        documentation: ['Storage configuration guide', 'Upload API docs']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Upload proof when completing a quest'
        }
      }
    }
  },
  {
    id: 'profile-management',
    name: 'Profile Management',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-01-20',
    description: {
      userFacing: 'Customize your hunter profile with stats, achievements, settings, and personal information.',
      technical: 'User profile system with personal info, stats display, achievements showcase, settings management, and avatar/profile picture. Responsive design and real-time updates.',
      problemStatement: 'Users need a way to view their progress, manage their account, and customize their experience.',
      currentLimitations: [],
      solution: 'Comprehensive profile management with stats, achievements, and settings.',
      userBenefits: [
        'View detailed stats',
        'Showcase achievements',
        'Manage account settings',
        'Customize profile',
        'Track progress over time'
      ],
      businessValue: 'Essential for user identity and personalization, drives engagement through achievements showcase.'
    },
    timeline: {
      targetDate: 'December 2025',
      quarter: 'Q4 2025',
      phases: [
        { name: 'Profile Structure', status: 'completed', date: 'Dec 2025' },
        { name: 'Stats Display', status: 'completed', date: 'Dec 2025' },
        { name: 'Achievements', status: 'completed', date: 'Dec 2025' },
        { name: 'Settings', status: 'completed', date: 'Dec 2025' }
      ],
      dependencies: ['authentication', 'xp-leveling-system']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Profile Database', date: '2025-12-01', description: 'Created user profiles table' },
        { id: '2', name: 'Stats Display', date: '2025-12-05', description: 'Built stats visualization' },
        { id: '3', name: 'Achievements Display', date: '2025-12-08', description: 'Added achievements showcase' },
        { id: '4', name: 'Profile Picture', date: '2025-12-10', description: 'Implemented avatar upload' },
        { id: '5', name: 'Settings Page', date: '2025-12-12', description: 'Created settings management' },
        { id: '6', name: 'Profile Editing', date: '2025-12-15', description: 'Added profile editing functionality' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'December 2025',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Database', status: 'completed', progress: 100, completedDate: '2025-12-01' },
        { id: '2', name: 'Backend', status: 'completed', progress: 100, completedDate: '2025-12-08' },
        { id: '3', name: 'Frontend', status: 'completed', progress: 100, completedDate: '2025-12-12' },
        { id: '4', name: 'Polish', status: 'completed', progress: 100, completedDate: '2025-12-15' }
      ],
      tasks: [
        { id: '1', name: 'Design profile schema', status: 'completed', assignee: 'Backend Developer', estimatedHours: 6 },
        { id: '2', name: 'Build profile API', status: 'completed', assignee: 'Backend Developer', estimatedHours: 8 },
        { id: '3', name: 'Create profile UI', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 12 },
        { id: '4', name: 'Add achievements display', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 8 },
        { id: '5', name: 'Build settings page', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '6', name: 'Add profile editing', status: 'completed', assignee: 'Developer', estimatedHours: 6 }
      ],
      technical: {
        technologies: ['Next.js', 'Supabase', 'TypeScript', 'React Query', 'Framer Motion'],
        apiEndpoints: ['/api/profile', '/api/profile/update', '/api/profile/avatar'],
        databaseChanges: ['Created user_profiles table', 'Added settings storage'],
        documentation: ['Profile API docs', 'Settings management guide']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'View and edit your profile'
        }
      }
    }
  },
  {
    id: 'strava-feed',
    name: 'Strava-Style Feed',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'A web and desktop feed layout with sidebars showing your stats, suggested quests, and other hunters activities.',
      technical: 'Responsive feed layout inspired by Strava with left sidebar (user stats, quick actions), center content (feed, posts), and right sidebar (suggested quests, leaderboards). Optimized for desktop and tablet.',
      problemStatement: 'Users need a comprehensive dashboard that shows all relevant information at once - their progress, community activity, and available content.',
      currentLimitations: ['Mobile uses different layout', 'No customizable widgets yet'],
      solution: 'Three-column feed layout with optimized information density and quick access to key features.',
      userBenefits: [
        'See everything at a glance',
        'Quick access to stats',
        'Easy discovery of content',
        'Efficient workflow',
        'Professional layout'
      ],
      businessValue: 'Improves user engagement by providing comprehensive dashboard and increases time on platform.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Layout Design', status: 'completed', date: 'Jan 2026' },
        { name: 'Sidebars', status: 'completed', date: 'Jan 2026' },
        { name: 'Feed Integration', status: 'completed', date: 'Feb 2026' },
        { name: 'Responsiveness', status: 'completed', date: 'Feb 2026' }
      ],
      dependencies: ['hunter-network', 'profile-management']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Layout Architecture', date: '2026-01-20', description: 'Designed three-column layout' },
        { id: '2', name: 'Left Sidebar', date: '2026-01-22', description: 'Built user stats sidebar' },
        { id: '3', name: 'Right Sidebar', date: '2026-01-25', description: 'Built suggested quests sidebar' },
        { id: '4', name: 'Center Feed', date: '2026-01-28', description: 'Integrated hunter network feed' },
        { id: '5', name: 'Responsive Design', date: '2026-02-01', description: 'Made layout responsive' },
        { id: '6', name: 'Optimization', date: '2026-02-05', description: 'Performance optimization and polish' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Design', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '2', name: 'Components', status: 'completed', progress: 100, completedDate: '2026-01-28' },
        { id: '3', name: 'Integration', status: 'completed', progress: 100, completedDate: '2026-02-01' },
        { id: '4', name: 'Polish', status: 'completed', progress: 100, completedDate: '2026-02-05' }
      ],
      tasks: [
        { id: '1', name: 'Design layout structure', status: 'completed', assignee: 'UX Designer', estimatedHours: 8 },
        { id: '2', name: 'Build sidebar components', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 16 },
        { id: '3', name: 'Integrate feed', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '4', name: 'Add responsive behavior', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 10 },
        { id: '5', name: 'Optimize performance', status: 'completed', assignee: 'Developer', estimatedHours: 6 }
      ],
      technical: {
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['Layout design system', 'Component documentation']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'View the full feed layout on desktop'
        }
      }
    }
  },
  {
    id: 'mobile-navigation',
    name: 'Mobile Navigation',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Easy-to-use bottom navigation bar for mobile devices with quick access to all main features.',
      technical: 'Fixed bottom navigation component with 5 main tabs (Home, Feed, Quests, Leaderboard, Profile). Optimized touch targets (44px minimum), active states, and smooth transitions.',
      problemStatement: 'Mobile users need intuitive navigation that works well with one-handed use and provides quick access to all features.',
      currentLimitations: [],
      solution: 'Bottom navigation bar following mobile UX best practices with optimal touch targets.',
      userBenefits: [
        'One-handed navigation',
        'Quick access to features',
        'Clear active state',
        'Smooth transitions',
        'Intuitive icons'
      ],
      businessValue: 'Essential for mobile user experience, increases app usability on mobile devices.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Design', status: 'completed', date: 'Jan 2026' },
        { name: 'Component', status: 'completed', date: 'Jan 2026' },
        { name: 'Integration', status: 'completed', date: 'Feb 2026' },
        { name: 'Polish', status: 'completed', date: 'Feb 2026' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [
        { id: '1', name: 'Navigation Design', date: '2026-01-25', description: 'Designed bottom navigation structure' },
        { id: '2', name: 'Component Creation', date: '2026-01-28', description: 'Built navigation component' },
        { id: '3', name: 'Route Integration', date: '2026-02-01', description: 'Connected to all main routes' },
        { id: '4', name: 'Touch Optimization', date: '2026-02-03', description: 'Optimized touch targets' },
        { id: '5', name: 'Visual Polish', date: '2026-02-05', description: 'Added animations and polish' }
      ],
      upcoming: [],
      total: 5,
      completedCount: 5,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Design', status: 'completed', progress: 100, completedDate: '2026-01-25' },
        { id: '2', name: 'Development', status: 'completed', progress: 100, completedDate: '2026-02-01' },
        { id: '3', name: 'Integration', status: 'completed', progress: 100, completedDate: '2026-02-03' },
        { id: '4', name: 'Polish', status: 'completed', progress: 100, completedDate: '2026-02-05' }
      ],
      tasks: [
        { id: '1', name: 'Design navigation structure', status: 'completed', assignee: 'UX Designer', estimatedHours: 4 },
        { id: '2', name: 'Build component', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 8 },
        { id: '3', name: 'Add icons and labels', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 4 },
        { id: '4', name: 'Connect routes', status: 'completed', assignee: 'Developer', estimatedHours: 4 },
        { id: '5', name: 'Add animations', status: 'completed', assignee: 'Developer', estimatedHours: 4 }
      ],
      technical: {
        technologies: ['Next.js', 'React', 'Lucide Icons', 'Framer Motion', 'Tailwind CSS'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['Navigation component docs']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Try mobile navigation on your phone'
        }
      }
    }
  },
  {
    id: 'opik-integration',
    name: 'Opik Integration',
    status: 'Implemented',
    priority: 'High',
    category: 'AI',
    progress: 100,
    lastUpdated: '2026-01-28',
    description: {
      userFacing: 'Full integration with Opik for transparent AI evaluation, showing you exactly how your workouts are judged and scored.',
      technical: 'Complete Opik SDK integration for AI observability, evaluation, and transparency. Includes experiment tracking, model evaluation, and detailed scoring criteria visualization.',
      problemStatement: 'Users need transparency in AI-driven features to trust the system and understand how decisions are made.',
      currentLimitations: [],
      solution: 'Opik integration providing full observability and transparency for AI features.',
      userBenefits: [
        'Transparent AI decisions',
        'See evaluation criteria',
        'Trust in the system',
        'Understand scoring',
        'Feedback visibility'
      ],
      businessValue: 'Builds trust in AI features, provides competitive advantage through transparency, and enables continuous improvement.'
    },
    timeline: {
      targetDate: 'January 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Setup', status: 'completed', date: 'Jan 2026' },
        { name: 'Evaluation', status: 'completed', date: 'Jan 2026' },
        { name: 'Transparency', status: 'completed', date: 'Jan 2026' },
        { name: 'Documentation', status: 'completed', date: 'Jan 2026' }
      ],
      dependencies: ['ai-judge', 'quest-generation']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Opik Project Setup', date: '2026-01-10', description: 'Created Opik project and configured SDK' },
        { id: '2', name: 'Evaluation Integration', date: '2026-01-15', description: 'Integrated evaluation with Opik' },
        { id: '3', name: 'Experiment Tracking', date: '2026-01-18', description: 'Added experiment tracking' },
        { id: '4', name: 'Transparency Dashboard', date: '2026-01-22', description: 'Built transparency UI' },
        { id: '5', name: 'Scoring Criteria', date: '2026-01-25', description: 'Visualized scoring criteria' },
        { id: '6', name: 'Documentation', date: '2026-01-28', description: 'Documented integration and created transparency hub' }
      ],
      upcoming: [],
      total: 6,
      completedCount: 6,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'January 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Setup', status: 'completed', progress: 100, completedDate: '2026-01-10' },
        { id: '2', name: 'Integration', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '3', name: 'Visualization', status: 'completed', progress: 100, completedDate: '2026-01-25' },
        { id: '4', name: 'Documentation', status: 'completed', progress: 100, completedDate: '2026-01-28' }
      ],
      tasks: [
        { id: '1', name: 'Setup Opik project', status: 'completed', assignee: 'AI Engineer', estimatedHours: 4 },
        { id: '2', name: 'Integrate SDK', status: 'completed', assignee: 'Developer', estimatedHours: 8 },
        { id: '3', name: 'Create evaluation pipeline', status: 'completed', assignee: 'AI Engineer', estimatedHours: 12 },
        { id: '4', name: 'Build transparency UI', status: 'completed', assignee: 'Developer', estimatedHours: 16 },
        { id: '5', name: 'Document integration', status: 'completed', assignee: 'Technical Writer', estimatedHours: 8 }
      ],
      technical: {
        technologies: ['Opik SDK', 'Groq LLM', 'Next.js', 'TypeScript', 'React'],
        apiEndpoints: ['/api/opik/evaluate', '/api/opik/experiments'],
        databaseChanges: ['Created evaluations_log table', 'Added experiment tracking'],
        documentation: ['Opik integration guide', 'Transparency documentation', 'Evaluation criteria']
      },
      demo: {
        available: false
      }
    }
  },
  {
    id: 'help-system',
    name: 'Help System',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 57,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Comprehensive help center with getting started guides, feature documentation, FAQs, and demo accounts.',
      technical: 'Help system with multiple sections: Getting Started, Features, FAQ, Demo Accounts, and Opik Transparency. Responsive design and searchable content.',
      problemStatement: 'New users need guidance to understand and use all features effectively. Existing users need quick access to answers.',
      currentLimitations: ['UI/UX tutorial incomplete', 'Feature documentation not comprehensive', 'FAQ section needs expansion'],
      solution: 'Comprehensive help system with guides, documentation, FAQs, and demo accounts.',
      userBenefits: [
        'Quick onboarding',
        'Feature understanding',
        'Problem solutions',
        'Demo account access',
        'Transparency hub'
      ],
      businessValue: 'Reduces support burden, improves user onboarding, and increases feature adoption.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Foundation', status: 'completed', date: 'Jan 2026' },
        { name: 'Core Content', status: 'completed', date: 'Jan 2026' },
        { name: 'Enhancement', status: 'in_progress', date: 'Feb 2026' },
        { name: 'Completion', status: 'pending', date: 'Feb 2026' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [
        { id: '1', name: 'Help Center Structure', date: '2026-01-20', description: 'Built help center layout' },
        { id: '2', name: 'Getting Started Guide', date: '2026-01-22', description: 'Created onboarding guide' },
        { id: '3', name: 'Demo Accounts Page', date: '2026-01-25', description: 'Added demo accounts documentation' },
        { id: '4', name: 'Opik Transparency Hub', date: '2026-01-28', description: 'Created AI transparency section' },
        { id: '5', name: 'FAQ Foundation', date: '2026-02-01', description: 'Built FAQ structure' }
      ],
      upcoming: [
        { id: '6', name: 'UI/UX Tutorial', date: '2026-02-10', description: 'Complete visual guide to the interface', priority: 'High' },
        { id: '7', name: 'Feature Documentation', date: '2026-02-15', description: 'Comprehensive docs for all features', priority: 'High' },
        { id: '8', name: 'FAQ Expansion', date: '2026-02-20', description: 'Expand FAQ with common questions', priority: 'Medium' }
      ],
      total: 8,
      completedCount: 5,
      percentage: 63,
      nextMilestone: { id: '6', name: 'UI/UX Tutorial', date: '2026-02-10', description: 'Complete visual guide to the interface', priority: 'High' }
    },
    implementation: {
      overallProgress: 57,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Structure', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '2', name: 'Content', status: 'in_progress', progress: 57 },
        { id: '3', name: 'Enhancement', status: 'pending', progress: 0 },
        { id: '4', name: 'Testing', status: 'pending', progress: 0 }
      ],
      tasks: [
        { id: '1', name: 'Design help system', status: 'completed', assignee: 'UX Designer', estimatedHours: 8 },
        { id: '2', name: 'Build help center UI', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 12 },
        { id: '3', name: 'Create getting started', status: 'completed', assignee: 'Technical Writer', estimatedHours: 8 },
        { id: '4', name: 'Write feature docs', status: 'in_progress', assignee: 'Technical Writer', estimatedHours: 20 },
        { id: '5', name: 'Build FAQ section', status: 'in_progress', assignee: 'Technical Writer', estimatedHours: 12 },
        { id: '6', name: 'Create video tutorials', status: 'pending', assignee: 'Content Creator', estimatedHours: 16 }
      ],
      technical: {
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['Help system structure', 'Content guidelines']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Explore the help center'
        }
      }
    }
  },
  {
    id: 'demo-accounts',
    name: 'Demo Accounts',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Try ASCEND with 40 pre-configured demo accounts at different levels and classes to explore all features.',
      technical: 'Demo account system with 40 accounts across all hunter ranks (E-S) and classes. Pre-populated with workout data, achievements, and realistic progress. Easy switching between accounts.',
      problemStatement: 'Users want to see the full ASCEND experience before committing, including advanced features they haven\'t unlocked yet.',
      currentLimitations: [],
      solution: 'Comprehensive demo account system with accounts at all progression levels.',
      userBenefits: [
        'Try all features immediately',
        'See advanced features',
        'Experience different classes',
        'No commitment required',
        'Easy exploration'
      ],
      businessValue: 'Reduces signup friction, allows users to experience value before registering, and increases conversion.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Account Creation', status: 'completed', date: 'Jan 2026' },
        { name: 'Data Population', status: 'completed', date: 'Feb 2026' },
        { name: 'UI Implementation', status: 'completed', date: 'Feb 2026' },
        { name: 'Documentation', status: 'completed', date: 'Feb 2026' }
      ],
      dependencies: ['authentication', 'xp-leveling-system']
    },
    milestones: {
      completed: [
        { id: '1', name: 'Account Schema', date: '2026-01-25', description: 'Designed demo account structure' },
        { id: '2', name: '40 Accounts Created', date: '2026-02-01', description: 'Created accounts for all ranks and classes' },
        { id: '3', name: 'Data Population', date: '2026-02-03', description: 'Populated with realistic workout data' },
        { id: '4', name: 'Demo Switcher', date: '2026-02-04', description: 'Built account switching UI' },
        { id: '5', name: 'Documentation', date: '2026-02-05', description: 'Documented all demo accounts' }
      ],
      upcoming: [],
      total: 5,
      completedCount: 5,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Design', status: 'completed', progress: 100, completedDate: '2026-01-25' },
        { id: '2', name: 'Creation', status: 'completed', progress: 100, completedDate: '2026-02-01' },
        { id: '3', name: 'Population', status: 'completed', progress: 100, completedDate: '2026-02-03' },
        { id: '4', name: 'UI & Docs', status: 'completed', progress: 100, completedDate: '2026-02-05' }
      ],
      tasks: [
        { id: '1', name: 'Design demo accounts', status: 'completed', assignee: 'Product Manager', estimatedHours: 8 },
        { id: '2', name: 'Create 40 accounts', status: 'completed', assignee: 'Developer', estimatedHours: 12 },
        { id: '3', name: 'Populate data', status: 'completed', assignee: 'Developer', estimatedHours: 20 },
        { id: '4', name: 'Build switcher UI', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 8 },
        { id: '5', name: 'Document accounts', status: 'completed', assignee: 'Technical Writer', estimatedHours: 8 }
      ],
      technical: {
        technologies: ['Next.js', 'Supabase', 'TypeScript', 'React'],
        apiEndpoints: ['/api/demo/switch', '/api/demo/accounts'],
        databaseChanges: ['Created demo_accounts table', 'Added demo user data'],
        documentation: ['Demo accounts guide', 'Account switching documentation']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Try any of the 40 demo accounts'
        }
      }
    }
  },
  {
    id: 'glassmorphism-design',
    name: 'Glassmorphism Design',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Modern glassmorphism design system with translucent cards, blur effects, and beautiful gradients throughout the app.',
      technical: 'Design system implementing glassmorphism with backdrop-filter blur, semi-transparent backgrounds, subtle borders, and gradient overlays. Consistent across all components and pages.',
      problemStatement: 'Need a modern, visually appealing design that stands out and provides excellent user experience.',
      currentLimitations: [],
      solution: 'Comprehensive glassmorphism design system with consistent styling.',
      userBenefits: [
        'Beautiful modern design',
        'Excellent readability',
        'Visual hierarchy',
        'Consistent experience',
        'Professional look'
      ],
      businessValue: 'Creates strong brand identity, improves user perception, and differentiates from competitors.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Design System', status: 'completed', date: 'Jan 2026' },
        { name: 'Components', status: 'completed', date: 'Jan 2026' },
        { name: 'Implementation', status: 'completed', date: 'Feb 2026' },
        { name: 'Refinement', status: 'completed', date: 'Feb 2026' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [
        { id: '1', name: 'Design Tokens', date: '2026-01-20', description: 'Defined design system tokens' },
        { id: '2', name: 'Component Library', date: '2026-01-25', description: 'Created base components' },
        { id: '3', name: 'Page Templates', date: '2026-01-28', description: 'Applied to all pages' },
        { id: '4', name: 'Animations', date: '2026-02-01', description: 'Added smooth transitions' },
        { id: '5', name: 'Refinement', date: '2026-02-05', description: 'Polished and optimized' }
      ],
      upcoming: [],
      total: 5,
      completedCount: 5,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'System', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '2', name: 'Components', status: 'completed', progress: 100, completedDate: '2026-01-28' },
        { id: '3', name: 'Pages', status: 'completed', progress: 100, completedDate: '2026-02-01' },
        { id: '4', name: 'Polish', status: 'completed', progress: 100, completedDate: '2026-02-05' }
      ],
      tasks: [
        { id: '1', name: 'Define design system', status: 'completed', assignee: 'UI Designer', estimatedHours: 16 },
        { id: '2', name: 'Create components', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 24 },
        { id: '3', name: 'Apply to pages', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 20 },
        { id: '4', name: 'Add animations', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 8 },
        { id: '5', name: 'Optimize performance', status: 'completed', assignee: 'Developer', estimatedHours: 6 }
      ],
      technical: {
        technologies: ['Tailwind CSS', 'Framer Motion', 'React', 'TypeScript'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['Design system documentation', 'Component library', 'Style guide']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Experience the glassmorphism design throughout the app'
        }
      }
    }
  },
  {
    id: 'mobile-responsive',
    name: 'Mobile-Responsive Design',
    status: 'Implemented',
    priority: 'High',
    category: 'Core',
    progress: 100,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Fully responsive design that works perfectly on mobile, tablet, and desktop devices.',
      technical: 'Responsive design implementation with mobile-first approach, breakpoint system, touch-optimized interactions, and adaptive layouts. Tested across all device sizes.',
      problemStatement: 'Users access the app from various devices. Need a consistent experience across all screen sizes.',
      currentLimitations: [],
      solution: 'Comprehensive responsive design with optimized layouts for all devices.',
      userBenefits: [
        'Works on any device',
        'Touch-optimized',
        'Consistent experience',
        'Fast on mobile',
        'Easy to use'
      ],
      businessValue: 'Expands user base to mobile users, provides seamless experience across devices, and improves accessibility.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Breakpoint System', status: 'completed', date: 'Jan 2026' },
        { name: 'Mobile Layouts', status: 'completed', date: 'Jan 2026' },
        { name: 'Tablet Layouts', status: 'completed', date: 'Feb 2026' },
        { name: 'Testing', status: 'completed', date: 'Feb 2026' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [
        { id: '1', name: 'Breakpoint Definition', date: '2026-01-20', description: 'Defined responsive breakpoints' },
        { id: '2', name: 'Mobile Optimization', date: '2026-01-25', description: 'Optimized for mobile (<768px)' },
        { id: '3', name: 'Tablet Optimization', date: '2026-01-28', description: 'Optimized for tablet (768-1024px)' },
        { id: '4', name: 'Desktop Polish', date: '2026-02-01', description: 'Polished desktop experience' },
        { id: '5', name: 'Cross-device Testing', date: '2026-02-05', description: 'Tested on all devices' }
      ],
      upcoming: [],
      total: 5,
      completedCount: 5,
      percentage: 100
    },
    implementation: {
      overallProgress: 100,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Planning', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '2', name: 'Mobile', status: 'completed', progress: 100, completedDate: '2026-01-25' },
        { id: '3', name: 'Tablet', status: 'completed', progress: 100, completedDate: '2026-01-30' },
        { id: '4', name: 'Polish', status: 'completed', progress: 100, completedDate: '2026-02-05' }
      ],
      tasks: [
        { id: '1', name: 'Define breakpoints', status: 'completed', assignee: 'UX Designer', estimatedHours: 4 },
        { id: '2', name: 'Make mobile responsive', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 24 },
        { id: '3', name: 'Make tablet responsive', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 16 },
        { id: '4', name: 'Polish desktop', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 8 },
        { id: '5', name: 'Test on devices', status: 'completed', assignee: 'QA', estimatedHours: 12 }
      ],
      technical: {
        technologies: ['Tailwind CSS', 'React', 'TypeScript'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['Responsive design guide', 'Breakpoint system docs']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Try on different devices to see responsive design'
        }
      }
    }
  },
  {
    id: 'gitbook-documentation',
    name: 'GitBook Documentation',
    status: 'In Progress',
    priority: 'High',
    category: 'Core',
    progress: 80,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Comprehensive technical documentation hosted on GitBook with detailed API references, architecture guides, and Opik integration evidence.',
      technical: 'GitBook documentation site with auto-generated API docs, architecture diagrams, code examples, and transparency hub for AI features. Integrated with GitHub for auto-deployment.',
      problemStatement: 'Developers and users need comprehensive, searchable documentation to understand and use ASCEND\'s features, especially AI transparency.',
      currentLimitations: ['Documentation not yet published', 'API docs incomplete', 'Transparency hub needs more details'],
      solution: 'Create comprehensive GitBook documentation with all necessary information for users and developers.',
      userBenefits: [
        'Easy access to documentation',
        'Searchable knowledge base',
        'Comprehensive API reference',
        'Architecture transparency',
        'Developer guides and tutorials'
      ],
      businessValue: 'Reduces support burden, attracts developers, and provides transparency that builds trust in AI features.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Setup', status: 'completed', date: 'Jan 2026' },
        { name: 'Core Content', status: 'completed', date: 'Jan 2026' },
        { name: 'API Documentation', status: 'in_progress', date: 'Feb 2026' },
        { name: 'Publish', status: 'pending', date: 'Feb 2026' }
      ],
      dependencies: ['opik-integration']
    },
    milestones: {
      completed: [
        { id: '1', name: 'GitBook Setup', date: '2026-01-20', description: 'Created GitBook project' },
        { id: '2', name: 'Structure Design', date: '2026-01-22', description: 'Designed documentation structure' },
        { id: '3', name: 'Getting Started', date: '2026-01-25', description: 'Wrote getting started guide' },
        { id: '4', name: 'Architecture Docs', date: '2026-01-28', description: 'Created architecture documentation' },
        { id: '5', name: 'Feature Documentation', date: '2026-02-01', description: 'Documented core features' }
      ],
      upcoming: [
        { id: '6', name: 'API Reference', date: '2026-02-10', description: 'Complete API documentation', priority: 'High' },
        { id: '7', name: 'Opik Integration Docs', date: '2026-02-15', description: 'Document Opik integration evidence', priority: 'High' },
        { id: '8', name: 'Publish to Production', date: '2026-02-20', description: 'Deploy documentation site', priority: 'High' }
      ],
      total: 8,
      completedCount: 5,
      percentage: 63,
      nextMilestone: { id: '6', name: 'API Reference', date: '2026-02-10', description: 'Complete API documentation', priority: 'High' }
    },
    implementation: {
      overallProgress: 80,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Infrastructure', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '2', name: 'Content Creation', status: 'in_progress', progress: 75 },
        { id: '3', name: 'API Docs', status: 'in_progress', progress: 60 },
        { id: '4', name: 'Deployment', status: 'pending', progress: 0 }
      ],
      tasks: [
        { id: '1', name: 'Setup GitBook project', status: 'completed', assignee: 'Technical Writer', estimatedHours: 4 },
        { id: '2', name: 'Design documentation structure', status: 'completed', assignee: 'Technical Writer', estimatedHours: 6 },
        { id: '3', name: 'Write getting started', status: 'completed', assignee: 'Technical Writer', estimatedHours: 8 },
        { id: '4', name: 'Create architecture docs', status: 'completed', assignee: 'Technical Writer', estimatedHours: 10 },
        { id: '5', name: 'Document features', status: 'completed', assignee: 'Technical Writer', estimatedHours: 16 },
        { id: '6', name: 'Write API reference', status: 'in_progress', assignee: 'Technical Writer', estimatedHours: 20 },
        { id: '7', name: 'Document Opik integration', status: 'in_progress', assignee: 'AI Engineer', estimatedHours: 12 },
        { id: '8', name: 'Setup auto-deployment', status: 'pending', assignee: 'DevOps', estimatedHours: 6 }
      ],
      technical: {
        technologies: ['GitBook', 'GitHub', 'TypeDoc', 'Swagger', 'Markdown'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['GitBook project URL (coming soon)', 'API documentation (coming soon)']
      },
      demo: {
        available: false
      }
    }
  },
  {
    id: 'help-system-completion',
    name: 'Help System Completion',
    status: 'In Progress',
    priority: 'High',
    category: 'Core',
    progress: 57,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Complete help center with comprehensive UI/UX tutorials, detailed feature documentation, and expanded FAQ section.',
      technical: 'Enhanced help system with visual tutorials, feature deep-dives, troubleshooting guides, and searchable FAQ. Video tutorials and interactive guides.',
      problemStatement: 'Users need more comprehensive help content, especially visual tutorials for the UI/UX and detailed explanations of complex features.',
      currentLimitations: ['UI/UX tutorial incomplete', 'Feature documentation not comprehensive', 'FAQ section needs expansion', 'No video tutorials'],
      solution: 'Complete help system with all necessary content to help users understand and use all features.',
      userBenefits: [
        'Complete onboarding experience',
        'Visual UI/UX tutorials',
        'Comprehensive feature guides',
        'Detailed FAQ section',
        'Video tutorials'
      ],
      businessValue: 'Reduces support burden, improves user onboarding, increases feature adoption, and provides self-service support.'
    },
    timeline: {
      targetDate: 'February 2026',
      quarter: 'Q1 2026',
      phases: [
        { name: 'Planning', status: 'completed', date: 'Jan 2026' },
        { name: 'UI/UX Tutorial', status: 'in_progress', date: 'Feb 2026' },
        { name: 'Feature Docs', status: 'pending', date: 'Feb 2026' },
        { name: 'FAQ Expansion', status: 'pending', date: 'Feb 2026' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [
        { id: '1', name: 'Help Center Structure', date: '2026-01-20', description: 'Built help center layout' },
        { id: '2', name: 'Getting Started Guide', date: '2026-01-22', description: 'Created onboarding guide' },
        { id: '3', name: 'Demo Accounts Page', date: '2026-01-25', description: 'Added demo accounts documentation' },
        { id: '4', name: 'Opik Transparency Hub', date: '2026-01-28', description: 'Created AI transparency section' },
        { id: '5', name: 'FAQ Foundation', date: '2026-02-01', description: 'Built FAQ structure' }
      ],
      upcoming: [
        { id: '6', name: 'UI/UX Tutorial', date: '2026-02-10', description: 'Complete visual guide to the interface', priority: 'High' },
        { id: '7', name: 'Feature Documentation', date: '2026-02-15', description: 'Comprehensive docs for all features', priority: 'High' },
        { id: '8', name: 'FAQ Expansion', date: '2026-02-20', description: 'Expand FAQ with common questions', priority: 'Medium' },
        { id: '9', name: 'Video Tutorials', date: '2026-02-25', description: 'Create video walkthroughs', priority: 'Medium' }
      ],
      total: 9,
      completedCount: 5,
      percentage: 56,
      nextMilestone: { id: '6', name: 'UI/UX Tutorial', date: '2026-02-10', description: 'Complete visual guide to the interface', priority: 'High' }
    },
    implementation: {
      overallProgress: 57,
      estimatedCompletion: 'February 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Foundation', status: 'completed', progress: 100, completedDate: '2026-01-20' },
        { id: '2', name: 'Content', status: 'in_progress', progress: 57 },
        { id: '3', name: 'Enhancement', status: 'pending', progress: 0 },
        { id: '4', name: 'Testing', status: 'pending', progress: 0 }
      ],
      tasks: [
        { id: '1', name: 'Design help system', status: 'completed', assignee: 'UX Designer', estimatedHours: 8 },
        { id: '2', name: 'Build help center UI', status: 'completed', assignee: 'Frontend Developer', estimatedHours: 12 },
        { id: '3', name: 'Create getting started', status: 'completed', assignee: 'Technical Writer', estimatedHours: 8 },
        { id: '4', name: 'Write feature docs', status: 'in_progress', assignee: 'Technical Writer', estimatedHours: 20 },
        { id: '5', name: 'Build FAQ section', status: 'in_progress', assignee: 'Technical Writer', estimatedHours: 12 },
        { id: '6', name: 'Create UI/UX tutorial', status: 'in_progress', assignee: 'Content Creator', estimatedHours: 16 },
        { id: '7', name: 'Record video tutorials', status: 'pending', assignee: 'Content Creator', estimatedHours: 20 }
      ],
      technical: {
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        apiEndpoints: [],
        databaseChanges: [],
        documentation: ['Help system structure', 'Content guidelines']
      },
      demo: {
        available: true,
        testAccount: {
          email: 'demo@ascend.gg',
          password: 'DemoAccount123!',
          description: 'Explore the help center'
        }
      }
    }
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    status: 'Planned',
    priority: 'High',
    category: 'AI',
    progress: 0,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Interactive AI chatbot that provides exercise explanations, form corrections, and personalized workout guidance in real-time.',
      technical: 'Chatbot using Groq LLM with conversation history, exercise database integration, real-time form analysis from photos/videos, and context-aware recommendations.',
      problemStatement: 'Users need immediate answers to questions about exercises, form corrections, and personalized guidance during workouts.',
      currentLimitations: ['No real-time assistance', 'Limited exercise explanations', 'No form correction feedback'],
      solution: 'AI-powered chatbot that understands fitness context, provides accurate exercise guidance, and analyzes form from photos.',
      userBenefits: [
        'Real-time workout guidance',
        'Instant exercise explanations',
        'Form correction feedback',
        'Personalized recommendations',
        '24/7 availability'
      ],
      businessValue: 'Major competitive advantage, increases user engagement, and provides significant value through AI-powered assistance.'
    },
    timeline: {
      targetDate: 'September 2026',
      quarter: 'Q3 2026',
      phases: [
        { name: 'Research', status: 'pending', date: 'Jun 2026' },
        { name: 'Chat Engine', status: 'pending', date: 'Jul 2026' },
        { name: 'Form Analysis', status: 'pending', date: 'Aug 2026' },
        { name: 'Launch', status: 'pending', date: 'Sep 2026' }
      ],
      dependencies: ['quest-generation', 'ai-judge']
    },
    milestones: {
      completed: [],
      upcoming: [
        { id: '1', name: 'Chatbot Architecture', date: '2026-06-01', description: 'Design chatbot system', priority: 'High' },
        { id: '2', name: 'LLM Integration', date: '2026-06-15', description: 'Integrate conversation engine', priority: 'High' },
        { id: '3', name: 'Exercise Database', date: '2026-07-01', description: 'Build exercise knowledge base', priority: 'High' },
        { id: '4', name: 'Form Analysis Model', date: '2026-07-15', description: 'Train form correction model', priority: 'High' },
        { id: '5', name: 'Photo/Video Upload', date: '2026-08-01', description: 'Add media analysis', priority: 'High' },
        { id: '6', name: 'Chat UI', date: '2026-08-15', description: 'Build chat interface', priority: 'Medium' },
        { id: '7', name: 'Testing', date: '2026-08-30', description: 'Comprehensive testing', priority: 'High' },
        { id: '8', name: 'Beta Launch', date: '2026-09-01', description: 'Release to beta users', priority: 'High' }
      ],
      total: 8,
      completedCount: 0,
      percentage: 0,
      nextMilestone: { id: '1', name: 'Chatbot Architecture', date: '2026-06-01', description: 'Design chatbot system', priority: 'High' }
    },
    implementation: {
      overallProgress: 0,
      estimatedCompletion: 'September 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Planning', status: 'pending', progress: 0 },
        { id: '2', name: 'Development', status: 'pending', progress: 0 },
        { id: '3', name: 'AI Training', status: 'pending', progress: 0 },
        { id: '4', name: 'Testing', status: 'pending', progress: 0 }
      ],
      tasks: [
        { id: '1', name: 'Research chatbot solutions', status: 'pending', assignee: 'AI Engineer', estimatedHours: 16 },
        { id: '2', name: 'Design architecture', status: 'pending', assignee: 'AI Engineer', estimatedHours: 12 },
        { id: '3', name: 'Build conversation engine', status: 'pending', assignee: 'Developer', estimatedHours: 24 },
        { id: '4', name: 'Create exercise database', status: 'pending', assignee: 'Backend Developer', estimatedHours: 20 },
        { id: '5', name: 'Train form analysis model', status: 'pending', assignee: 'AI Engineer', estimatedHours: 40 },
        { id: '6', name: 'Build chat UI', status: 'pending', assignee: 'Frontend Developer', estimatedHours: 16 },
        { id: '7', name: 'Test and iterate', status: 'pending', assignee: 'QA', estimatedHours: 20 }
      ],
      technical: {
        technologies: ['Groq LLM', 'Next.js', 'Supabase', 'React', 'TypeScript', 'Computer Vision'],
        apiEndpoints: ['/api/chat', '/api/chat/analyze-form', '/api/exercises'],
        databaseChanges: ['Create conversations table', 'Create exercise_knowledge table', 'Add form_analysis storage'],
        documentation: ['Chatbot architecture', 'LLM integration guide', 'Form analysis model docs']
      },
      demo: {
        available: false
      }
    }
  },
  {
    id: 'nutrition-tracking',
    name: 'Nutrition Tracking',
    status: 'Planned',
    priority: 'Medium',
    category: 'Core',
    progress: 0,
    lastUpdated: '2026-02-05',
    description: {
      userFacing: 'Track your meals, macros, and calories with AI-powered macro estimation from food photos for easy logging.',
      technical: 'Nutrition tracking with food database integration, AI-powered image recognition for food identification and macro estimation, meal logging, and nutrition goals tracking.',
      problemStatement: 'Nutrition is 80% of fitness results. Users need an easy way to track food intake without tedious manual logging.',
      currentLimitations: ['No nutrition tracking', 'Manual macro logging is tedious', 'No food database integration'],
      solution: 'AI-powered nutrition tracking that makes logging meals as easy as taking a photo.',
      userBenefits: [
        'Easy meal logging',
        'AI macro estimation',
        'Comprehensive food database',
        'Nutrition goals tracking',
        'Progress visualization'
      ],
      businessValue: 'Addresses a major fitness need, provides comprehensive solution, and increases user engagement.'
    },
    timeline: {
      targetDate: 'September 2026',
      quarter: 'Q3 2026',
      phases: [
        { name: 'Database', status: 'pending', date: 'Jun 2026' },
        { name: 'Core Features', status: 'pending', date: 'Jul 2026' },
        { name: 'AI Integration', status: 'pending', date: 'Aug 2026' },
        { name: 'Launch', status: 'pending', date: 'Sep 2026' }
      ],
      dependencies: []
    },
    milestones: {
      completed: [],
      upcoming: [
        { id: '1', name: 'Food Database', date: '2026-06-01', description: 'Integrate food nutrition database', priority: 'High' },
        { id: '2', name: 'Meal Logging', date: '2026-06-15', description: 'Build meal logging interface', priority: 'High' },
        { id: '3', name: 'Macro Calculation', date: '2026-07-01', description: 'Implement macro tracking', priority: 'High' },
        { id: '4', name: 'Nutrition Goals', date: '2026-07-15', description: 'Add goal setting and tracking', priority: 'High' },
        { id: '5', name: 'Food Recognition AI', date: '2026-08-01', description: 'Train food ID model', priority: 'High' },
        { id: '6', name: 'Photo Analysis', date: '2026-08-15', description: 'Implement photo upload and analysis', priority: 'High' },
        { id: '7', name: 'UI Polish', date: '2026-08-30', description: 'Refine user interface', priority: 'Medium' },
        { id: '8', name: 'Testing', date: '2026-09-01', description: 'Test all features', priority: 'High' }
      ],
      total: 8,
      completedCount: 0,
      percentage: 0,
      nextMilestone: { id: '1', name: 'Food Database', date: '2026-06-01', description: 'Integrate food nutrition database', priority: 'High' }
    },
    implementation: {
      overallProgress: 0,
      estimatedCompletion: 'September 2026',
      status: 'On Track',
      phases: [
        { id: '1', name: 'Planning', status: 'pending', progress: 0 },
        { id: '2', name: 'Development', status: 'pending', progress: 0 },
        { id: '3', name: 'AI Training', status: 'pending', progress: 0 },
        { id: '4', name: 'Testing', status: 'pending', progress: 0 }
      ],
      tasks: [
        { id: '1', name: 'Research food databases', status: 'pending', assignee: 'Backend Developer', estimatedHours: 8 },
        { id: '2', name: 'Integrate nutrition API', status: 'pending', assignee: 'Backend Developer', estimatedHours: 16 },
        { id: '3', name: 'Build meal logging', status: 'pending', assignee: 'Developer', estimatedHours: 20 },
        { id: '4', name: 'Implement macro tracking', status: 'pending', assignee: 'Developer', estimatedHours: 16 },
        { id: '5', name: 'Train food recognition', status: 'pending', assignee: 'AI Engineer', estimatedHours: 40 },
        { id: '6', name: 'Build photo analysis', status: 'pending', assignee: 'Developer', estimatedHours: 12 },
        { id: '7', name: 'Create nutrition UI', status: 'pending', assignee: 'Frontend Developer', estimatedHours: 24 },
        { id: '8', name: 'Test all features', status: 'pending', assignee: 'QA', estimatedHours: 16 }
      ],
      technical: {
        technologies: ['Next.js', 'Supabase', 'Nutrition API', 'Computer Vision', 'Groq LLM', 'React'],
        apiEndpoints: ['/api/nutrition/food', '/api/nutrition/meals', '/api/nutrition/analyze-photo'],
        databaseChanges: ['Create meals table', 'Create nutrition_logs table', 'Add food database integration'],
        documentation: ['Nutrition tracking guide', 'Food database API docs', 'Food recognition model docs']
      },
      demo: {
        available: false
      }
    }
  }
];
