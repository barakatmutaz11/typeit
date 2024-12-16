import React from 'react';
import { Coins } from 'lucide-react';
import { AITool } from '../../../types';
import { CreditsDisplay } from '../../CreditsDisplay';

interface ToolInfoProps {
  tool: AITool;
}

export function ToolInfo({ tool }: ToolInfoProps) {
  return (
    <>
      <h3 className="font-medium text-gray-900 dark:text-white">{tool.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        {tool.description}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {tool.provider}
        </span>
        <span className="text-gray-400 dark:text-gray-500">•</span>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Coins size={14} />
          <span>{tool.costPerRequest} credits/request</span>
        </div>
      </div>
      <CreditsDisplay credits={tool.credits} />
    </>
  );
}