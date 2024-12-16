import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PricingCard } from './PricingCard';
import { subscriptionPlans } from '../../data/subscriptionPlans';

export function SubscriptionPlans() {
  const [interval, setInterval] = useState<'month' | 'year'>('month');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Start free and scale as you grow
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
            <button
              onClick={() => setInterval('month')}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${interval === 'month'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              Monthly
            </button>
            <button
              onClick={() => setInterval('year')}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${interval === 'year'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard
                plan={{
                  ...plan,
                  price: interval === 'year' 
                    ? Math.floor(plan.price * 12 * 0.8) 
                    : plan.price
                }}
                isPopular={plan.tier === 'pro'}
                interval={interval}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Need a custom plan? <a href="#" className="text-primary-500 hover:text-primary-600">Contact us</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}