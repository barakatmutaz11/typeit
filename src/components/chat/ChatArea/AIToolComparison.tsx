import React from 'react';
import { AITool } from '../../../types';
import { motion } from 'framer-motion';

interface AIToolComparisonProps {
  tools: AITool[];
}

export function AIToolComparison({ tools }: AIToolComparisonProps) {
  if (tools.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Response Comparison
      </h3>
      <div className="space-y-4">
        {tools.map(tool => (
          <div key={tool.id} className="flex items-start gap-3">
            <div className={`p-1.5 rounded-lg ${tool.color}`}>
              <tool.icon size={14} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {tool.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Processing time: {Math.random() * 2 + 0.5}s
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}