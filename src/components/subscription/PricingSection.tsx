import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingCard } from './PricingCard';
import { subscriptionPlans } from '../../data/subscriptionPlans';

export function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Choose the perfect plan for your needs
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setBillingInterval('month')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${billingInterval === 'month'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${billingInterval === 'year'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              Yearly
              <span className="ml-1 text-xs text-primary-400">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={{
                ...plan,
                price: billingInterval === 'year' 
                  ? Math.floor(plan.price * 12 * 0.8) 
                  : plan.price
              }}
              isPopular={plan.tier === 'pro'}
              interval={billingInterval}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          All plans include 14-day free trial. No credit card required.
        </div>
      </div>
    </div>
  );
}