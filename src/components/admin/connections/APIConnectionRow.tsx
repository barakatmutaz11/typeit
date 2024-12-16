import React, { useState } from 'react';
import { APIConnection } from '../../../types';
import { APIConnectionActions } from './APIConnectionActions';
import { APIConnectionStatus } from './APIConnectionStatus';
import { formatDistanceToNow } from '../../../utils/date';

interface APIConnectionRowProps {
  connection: APIConnection;
}

export function APIConnectionRow({ connection }: APIConnectionRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = connection.tool.icon;

  return (
    <>
      <tr 
        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${connection.tool.color}`}>
              <Icon className="text-white" size={20} />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {connection.tool.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last checked {formatDistanceToNow(connection.lastChecked)}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <APIConnectionStatus status={connection.status} />
        </td>
        <td className="py-3 px-4">
          <div className="text-sm text-gray-900 dark:text-white">
            {connection.metrics.uptime.toFixed(2)}%
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="text-sm text-gray-900 dark:text-white">
            {connection.metrics.latency.toFixed(0)}ms
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="text-sm text-gray-900 dark:text-white">
            {connection.metrics.successRate.toFixed(2)}%
          </div>
        </td>
        <td className="py-3 px-4">
          <APIConnectionActions connection={connection} />
        </td>
      </tr>
      {isExpanded && connection.lastError && (
        <tr className="bg-red-50 dark:bg-red-900/20">
          <td colSpan={6} className="p-4">
            <div className="text-sm text-red-600 dark:text-red-400">
              <span className="font-medium">Last Error:</span> {connection.lastError}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}