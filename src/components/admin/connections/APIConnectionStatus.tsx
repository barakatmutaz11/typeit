import React from 'react';

interface APIConnectionStatusProps {
  status: 'connected' | 'failed' | 'pending';
}

export function APIConnectionStatus({ status }: APIConnectionStatusProps) {
  const styles = {
    connected: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${styles[status]}
    `}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}