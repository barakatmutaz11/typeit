import React, { useState } from 'react';
import { APIKey } from '../../../types';
import { APIKeyActions } from './APIKeyActions';
import { APIKeyStatus } from './APIKeyStatus';
import { formatDistanceToNow } from '../../../utils/date';
import { formatBytes } from '../../../utils/format';

interface APIKeyRowProps {
  apiKey: APIKey;
}

export function APIKeyRow({ apiKey }: APIKeyRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = apiKey.tool.icon;

  return (
    <>
      <tr 
        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${apiKey.tool.color}`}>
              <Icon className="text-white" size={20} />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {apiKey.tool.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last used {formatDistanceToNow(apiKey.lastUsed)}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
          {apiKey.tool.provider}
        </td>
        <td className="py-3 px-4">
          <APIKeyStatus status={apiKey.status} />
        </td>
        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
          {formatBytes(apiKey.usage.dataProcessed)} processed
        </td>
        <td className="py-3 px-4">
          <APIKeyActions apiKey={apiKey} />
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50 dark:bg-gray-800/50">
          <td colSpan={5} className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Usage Statistics</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Requests: {apiKey.usage.totalRequests.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Data Processed: {formatBytes(apiKey.usage.dataProcessed)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Cost: ${apiKey.usage.cost.toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Details</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Created: {formatDistanceToNow(apiKey.createdAt)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Expires: {apiKey.expiresAt ? formatDistanceToNow(apiKey.expiresAt) : 'Never'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Rate Limit: {apiKey.rateLimit.requests} requests / {apiKey.rateLimit.period}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}