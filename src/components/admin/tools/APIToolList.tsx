import React from 'react';
import { useToolsStore } from '../../../store/tools.store';
import { APIToolRow } from './APIToolRow';
import { Loader2 } from 'lucide-react';

interface APIToolListProps {
  onEdit: (tool: AITool) => void;
}

export function APIToolList({ onEdit }: APIToolListProps) {
  const { tools, isLoading, error } = useToolsStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Tool</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Provider</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Usage</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <APIToolRow key={tool.id} tool={tool} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}