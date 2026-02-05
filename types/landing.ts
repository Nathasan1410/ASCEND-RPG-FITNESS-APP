export interface FeatureCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color?: 'cyan' | 'yellow' | 'purple' | 'blue';
}

export interface ProblemCard {
  title: string;
  statistic: string;
  description: string;
}

export interface SolutionCard extends FeatureCard {}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
  duration: string;
}

export interface Screenshot {
  id: number;
  title: string;
  description: string;
  imagePlaceholder?: boolean;
}

export interface MarketStat {
  title: string;
  value: string;
  description: string;
}

export interface CompetitiveFeature {
  title: string;
  description: string;
}

export interface CompetitorComparison {
  feature: string;
  ascend: string;
  competitor1?: string;
  competitor2?: string;
  competitor3?: string;
}

export interface TechStackItem {
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CTAProps {
  onStartJourney?: () => void;
  onTryDemo?: () => void;
}

export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
