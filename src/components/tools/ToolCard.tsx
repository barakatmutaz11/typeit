import React from 'react';
import { AITool } from '../../types';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import { CreditsDisplay } from '../CreditsDisplay';
import { useToolDrag } from '../../hooks/useToolDrag';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { activeTools, addActiveTools, removeActiveTools } = useStore();
  const { dragHandlers } = useToolDrag();
  const Icon = tool.icon;
  
  const isActive = activeTools.some(t => t.id === tool.id);
  
  const handleToggle = () => {
    if (isActive) {
      removeActiveTools(tool.id);
    } else {
      addActiveTools(tool);
    }
  };
  
  return (
    <div 
      {...dragHandlers}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-move"
      onDragStart={(e) => dragHandlers.onDragStart(e, tool)}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${tool.color}`}>
          <Icon className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 dark:text-white">{tool.name}</h3>
            <Button
              variant={isActive ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleToggle}
              className="min-w-[32px] h-8"
              disabled={tool.credits.available <= 0}
              title={tool.credits.available <= 0 ? 'No credits available' : ''}
            >
              {isActive ? <Minus size={16} /> : <Plus size={16} />}
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {tool.provider}
            </span>
          </div>
          <CreditsDisplay credits={tool.credits} />
        </div>
      </div>
    </div>
  );
}