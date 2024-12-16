// AI Tools related types
import { LucideIcon } from 'lucide-react';

export interface AITool {
  id: string;
  name: string;
  description: string;
  provider: string;
  icon: LucideIcon;
  color: string;
  category: string;
  credits: {
    available: number;
    used: number;
    total: number;
  };
  costPerRequest: number;
  isEnabled?: boolean;
  rateLimit?: {
    requests: number;
    period: string;
  };
  stats?: {
    totalRequests: number;
    successRate: number;
    avgResponseTime: number;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  toolId?: string;
  attachments?: Array<{
    type: string;
    content: string;
  }>;
}