import React from 'react';

interface UserStatusProps {
  status: 'active' | 'inactive' | 'banned' | 'pending';
}

export function UserStatus({ status }: UserStatusProps) {
  const styles = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    banned: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
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