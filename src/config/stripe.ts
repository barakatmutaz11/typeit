import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const STRIPE_PRICES = {
  small: {
    id: 'price_small_credits',
    amount: 1000,
    price: 10
  },
  medium: {
    id: 'price_medium_credits',
    amount: 5000,
    price: 45
  },
  large: {
    id: 'price_large_credits',
    amount: 10000,
    price: 80
  }
};