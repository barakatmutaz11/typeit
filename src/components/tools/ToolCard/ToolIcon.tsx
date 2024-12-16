import React from 'react';
import { AITool } from '../../../types';

interface ToolIconProps {
  tool: AITool;
  isHovered: boolean;
}

export function ToolIcon({ tool, isHovered }: ToolIconProps) {
  const Icon = tool.icon;
  
  return (
    <div 
      className={`
        p-2 rounded-lg ${tool.color} 
        transition-transform duration-200 
        ${isHovered ? 'scale-110' : ''}
      `}
    >
      <Icon className="text-white" size={20} />
    </div>
  );
}