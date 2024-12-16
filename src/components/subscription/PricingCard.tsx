import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { SubscribeButton } from './SubscribeButton';
import { SubscriptionPlan } from '../../types/subscription';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  interval: 'month' | 'year';
}

export function PricingCard({ plan, isPopular, interval }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative bg-white dark:bg-gray-800 rounded-2xl p-6
        border ${isPopular ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'}
        shadow-lg hover:shadow-xl transition-all duration-300
        ${isPopular ? 'scale-105' : 'hover:scale-[1.02]'}
      `}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            ${plan.price}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li 
            key={index}
            className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
          >
            <Check className="w-5 h-5 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>

      <SubscribeButton
        plan={plan}
        interval={interval}
        variant={isPopular ? 'primary' : 'secondary'}
      />
    </motion.div>
  );
}