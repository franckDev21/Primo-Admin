
export type ModuleType = 'CE' | 'CO' | 'EE' | 'EO';

export interface TCFModule {
  id: string;
  name: string;
  code: ModuleType;
  description: string;
  questionCount: number;
  durationMinutes: number;
}

export interface Series {
  id: string;
  moduleId: ModuleType;
  title: string;
  description?: string;
  questionCount: number;
  isPremium: boolean;
  isActive: boolean;
  lastUpdated: string;
}

export interface Question {
  id: string;
  text: string;
  moduleId: ModuleType;
  seriesId: string;
  difficulty: number; // 1-6
  type: 'QCM' | 'AUDIO' | 'IMAGE'; // Primary categorization
  points: 3 | 9 | 15 | 21 | 26 | 33;
  choices?: string[];
  correctAnswer?: number;
  // New Media Fields
  audioUrl?: string;
  imageUrl?: string;
}

export type MediaType = 'image' | 'audio' | 'document';

export interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  size: string;
  date: string;
  dimensions?: string; // Only for images
  duration?: string;   // Only for audio
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
  highlight?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'admin' | 'user';
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'closed';
  messages: ChatMessage[];
}
