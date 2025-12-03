export type ModuleType = 'CE' | 'CO' | 'EE' | 'EO';

export interface TCFModule {
  id: string;
  name: string;
  code: ModuleType;
  description: string;
  questionCount: number;
  durationMinutes: number;
}

export interface Question {
  id: string;
  text: string;
  moduleId: ModuleType;
  difficulty: number; // 1-6
  type: 'QCM' | 'AUDIO' | 'IMAGE';
  points: 3 | 9 | 15 | 21 | 26 | 33;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'banned';
  subscription: 'free' | 'weekly' | 'monthly' | 'annual';
  lastLogin: string;
  progress: number;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  date: string;
  status: 'success' | 'failed' | 'pending';
  method: 'OM' | 'MOMO' | 'VISA';
}

export interface StatMetric {
  label: string;
  value: string | number;
  trend: number;
  trendLabel: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: 'daily' | 'weekly' | 'monthly' | 'annual';
  features: string[];
  active: boolean;
  highlight?: boolean; // For "Popular" tag in front office
}