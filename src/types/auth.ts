// Authentication related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'banned' | 'pending';
  lastActive: Date;
  stats: {
    totalApiCalls: number;
    creditsUsed: number;
    successRate: number;
    monthlyUsage: number[];
  };
  permissions: string[];
  apiKey: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}