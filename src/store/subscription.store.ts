import { create } from 'zustand';
import { Subscription, SubscriptionPlan } from '../types/subscription';
import { subscriptionPlans } from '../data/subscriptionPlans';

interface SubscriptionState {
  currentSubscription: Subscription | null;
  availablePlans: SubscriptionPlan[];
  isLoading: boolean;
  error: string | null;
  subscribe: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updateSubscription: (planId: string) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  currentSubscription: null,
  availablePlans: subscriptionPlans,
  isLoading: false,
  error: null,

  subscribe: async (planId) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({
        currentSubscription: {
          id: `sub_${Date.now()}`,
          userId: 'current_user',
          planId,
          status: 'active',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          cancelAtPeriodEnd: false,
        },
      });
    } catch (error) {
      set({ error: 'Failed to create subscription' });
    } finally {
      set({ isLoading: false });
    }
  },

  cancelSubscription: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        currentSubscription: state.currentSubscription
          ? { ...state.currentSubscription, cancelAtPeriodEnd: true }
          : null,
      }));
    } catch (error) {
      set({ error: 'Failed to cancel subscription' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateSubscription: async (planId) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        currentSubscription: state.currentSubscription
          ? { ...state.currentSubscription, planId }
          : null,
      }));
    } catch (error) {
      set({ error: 'Failed to update subscription' });
    } finally {
      set({ isLoading: false });
    }
  },
}));