import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-5 py-2.5 rounded-xl',
            'border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:border-primary-600 dark:focus:border-primary-500',
            'focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800',
            'focus:ring-opacity-50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-200',
            icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);