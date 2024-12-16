import React, { useState } from 'react';
import { AITool } from '../../../types';
import { APIToolActions } from './APIToolActions';
import { CreditsDisplay } from '../../CreditsDisplay';

interface APIToolRowProps {
  tool: AITool;
  onEdit: (tool: AITool) => void;
}

export function APIToolRow({ tool, onEdit }: APIToolRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = tool.icon;

  return (
    <>
      <tr 
        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${tool.color}`}>
              <Icon className="text-white" size={20} />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {tool.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {tool.description}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
          {tool.provider}
        </td>
        <td className="py-3 px-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            {tool.category}
          </span>
        </td>
        <td className="py-3 px-4">
          <CreditsDisplay credits={tool.credits} />
        </td>
        <td className="py-3 px-4">
          <APIToolActions tool={tool} onEdit={onEdit} />
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50 dark:bg-gray-800/50">
          <td colSpan={5} className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Configuration</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Cost per Request: {tool.costPerRequest} credits
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Rate Limit: {tool.rateLimit?.requests || 'Unlimited'} requests / {tool.rateLimit?.period || 'N/A'}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Usage Statistics</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Requests: {tool.stats?.totalRequests.toLocaleString() || 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Success Rate: {tool.stats?.successRate || 0}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Average Response Time: {tool.stats?.avgResponseTime || 0}ms
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