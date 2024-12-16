import React from 'react';
import { Credits } from '../types';

interface CreditsDisplayProps {
  credits: Credits;
}

export function CreditsDisplay({ credits }: CreditsDisplayProps) {
  const percentage = (credits.available / credits.total) * 100;
  
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-primary-600 dark:text-primary-400">
          {credits.available} credits available
        </span>
        <span className="text-primary-500 dark:text-primary-500">
          {credits.used}/{credits.total} used
        </span>
      </div>
      <div className="h-1.5 bg-primary-100 dark:bg-primary-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}