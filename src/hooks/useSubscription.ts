import { useState } from 'react';
import { useSubscriptionStore } from '../store/subscription.store';
import { useStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';
import { createCheckoutSession, createPortalSession } from '../services/stripe';

export function useSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const { currentSubscription } = useSubscriptionStore();

  const handleSubscribe = async (planId: string, interval: 'month' | 'year') => {
    setIsLoading(true);
    try {
      const plan = useSubscriptionStore.getState().availablePlans.find(p => p.id === planId);
      if (!plan) throw new Error('Invalid plan');
      
      await createCheckoutSession(stripe, plan, interval);
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription process');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      await createPortalSession();
    } catch (error) {
      console.error('Portal error:', error);
      toast.error('Failed to open subscription portal');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentSubscription,
    subscribe: handleSubscribe,
    manageSubscription: handleManageSubscription
  };
}