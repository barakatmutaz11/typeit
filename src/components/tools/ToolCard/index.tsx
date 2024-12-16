import React from 'react';
import { AITool } from '../../../types';
import { ToolIcon } from './ToolIcon';
import { ToolInfo } from './ToolInfo';
import { ToolActions } from './ToolActions';
import { useToolCard } from './useToolCard';

interface ToolCardProps {
  tool: AITool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { isHovered, dragHandlers, handleMouseEnter, handleMouseLeave } = useToolCard();

  return (
    <div 
      {...dragHandlers}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group
        bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border 
        transition-all duration-200 ease-in-out
        hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600
        hover:scale-[1.02] hover:-translate-y-1
        active:scale-[0.98] active:translate-y-0
        cursor-move
        relative
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-500/10 
        before:to-primary-700/10 before:opacity-0 before:transition-opacity
        before:rounded-lg group-hover:before:opacity-100
      `}
    >
      <div className="flex items-center gap-3">
        <ToolIcon tool={tool} isHovered={isHovered} />
        <div className="flex-1">
          <ToolInfo tool={tool} />
          <ToolActions tool={tool} isHovered={isHovered} />
        </div>
      </div>
    </div>
  );
}