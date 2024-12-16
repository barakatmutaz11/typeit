export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  credits: number;
  maxProjects: number;
  maxTeamMembers: number;
  customBranding: boolean;
  prioritySupport: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}