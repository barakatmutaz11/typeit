import { SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    interval: 'month',
    features: [
      '100 AI Credits/month',
      'Basic AI Tools',
      'Community Support',
      '1 Project',
      'Standard Response Time'
    ],
    credits: 100,
    maxProjects: 1,
    maxTeamMembers: 1,
    customBranding: false,
    prioritySupport: false
  },
  {
    id: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 29,
    interval: 'month',
    features: [
      '1,000 AI Credits/month',
      'All Basic AI Tools',
      'Email Support',
      '3 Projects',
      'Faster Response Time',
      'Basic Analytics'
    ],
    credits: 1000,
    maxProjects: 3,
    maxTeamMembers: 3,
    customBranding: false,
    prioritySupport: false
  },
  {
    id: 'pro',
    name: 'Pro',
    tier: 'pro',
    price: 79,
    interval: 'month',
    features: [
      '5,000 AI Credits/month',
      'All Pro AI Tools',
      'Priority Support',
      'Unlimited Projects',
      'Advanced Analytics',
      'Custom Branding',
      'API Access'
    ],
    credits: 5000,
    maxProjects: -1,
    maxTeamMembers: 10,
    customBranding: true,
    prioritySupport: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    price: 299,
    interval: 'month',
    features: [
      '25,000 AI Credits/month',
      'All Enterprise AI Tools',
      'Dedicated Support',
      'Unlimited Everything',
      'Custom Integration',
      'SLA Guarantee',
      'On-Premise Deployment'
    ],
    credits: 25000,
    maxProjects: -1,
    maxTeamMembers: -1,
    customBranding: true,
    prioritySupport: true
  }
];