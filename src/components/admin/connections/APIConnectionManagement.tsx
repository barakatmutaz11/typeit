import React from 'react';
import { APIConnectionList } from './APIConnectionList';
import { APIConnectionStats } from './APIConnectionStats';

export function APIConnectionManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        API Connections
      </h2>

      <APIConnectionStats />
      <APIConnectionList />
    </div>
  );
}