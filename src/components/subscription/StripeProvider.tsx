import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';

const options = {
  mode: 'payment',
  currency: 'usd',
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#6366f1',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
    },
  },
};

interface StripeProviderProps {
  children: React.ReactNode;
}

export function StripeProvider({ children }: StripeProviderProps) {
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}