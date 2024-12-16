import React from 'react';

interface APIKeyStatusProps {
  status: 'active' | 'expired' | 'revoked' | 'rate_limited';
}

export function APIKeyStatus({ status }: APIKeyStatusProps) {
  const styles = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    expired: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    revoked: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    rate_limited: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  };

  const labels = {
    active: 'Active',
    expired: 'Expired',
    revoked: 'Revoked',
    rate_limited: 'Rate Limited',
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${styles[status]}
    `}>
      {labels[status]}
    </span>
  );
}