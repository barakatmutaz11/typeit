import { useState } from 'react';
import { AITool } from '../../../types';

export function useToolCard() {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e: React.DragEvent, tool: AITool) => {
    e.dataTransfer.setData('application/json', JSON.stringify(tool));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return {
    isHovered,
    handleMouseEnter: () => setIsHovered(true),
    handleMouseLeave: () => setIsHovered(false),
    dragHandlers: {
      draggable: true,
      onDragStart: handleDragStart,
    },
  };
}