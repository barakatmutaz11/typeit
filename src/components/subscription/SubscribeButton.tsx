import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '../ui/Button';
import { SubscriptionPlan } from '../../types/subscription';
import { createCheckoutSession } from '../../services/stripe';
import { toast } from 'react-hot-toast';

interface SubscribeButtonProps {
  plan: SubscriptionPlan;
  interval: 'month' | 'year';
  variant?: 'primary' | 'secondary';
}

export function SubscribeButton({ plan, interval, variant = 'primary' }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubscribe = async () => {
    if (!stripe || !elements) {
      toast.error('Stripe has not been initialized');
      return;
    }

    setIsLoading(true);
    try {
      await createCheckoutSession(stripe, plan, interval);
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription process');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      isLoading={isLoading}
      variant={variant}
      className="w-full"
    >
      {plan.tier === 'free' ? 'Get Started' : 'Subscribe Now'}
    </Button>
  );
}