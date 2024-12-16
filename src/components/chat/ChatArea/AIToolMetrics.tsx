import React from 'react';
import { BarChart2, Zap, Clock } from 'lucide-react';
import { AITool } from '../../../types';

interface AIToolMetricsProps {
  tool: AITool;
  responseTime?: number;
}

export function AIToolMetrics({ tool, responseTime }: AIToolMetricsProps) {
  return (
    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-1">
        <Zap size={12} />
        <span>{tool.costPerRequest} credits</span>
      </div>
      {responseTime && (
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{responseTime}ms</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <BarChart2 size={12} />
        <span>{Math.floor((tool.credits.used / tool.credits.total) * 100)}% used</span>
      </div>
    </div>
  );
}