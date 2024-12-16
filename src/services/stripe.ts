import { Stripe } from '@stripe/stripe-js';
import { SubscriptionPlan } from '../types/subscription';
import { STRIPE_PRICES } from '../config/stripe';

export async function createCheckoutSession(
  stripe: Stripe | null,
  plan: SubscriptionPlan,
  interval: 'month' | 'year'
) {
  if (!stripe) throw new Error('Stripe not initialized');

  const priceId = STRIPE_PRICES[plan.tier as keyof typeof STRIPE_PRICES]?.[interval];
  if (!priceId) throw new Error('Invalid plan or interval');

  // Call your backend to create a Checkout Session
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      planId: plan.id,
      interval,
    }),
  });

  const { sessionId } = await response.json();
  
  // Redirect to Stripe Checkout
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function createPortalSession() {
  const response = await fetch('/api/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { url } = await response.json();
  window.location.href = url;
}