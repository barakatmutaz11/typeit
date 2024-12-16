import { useState } from 'react';
import { AITool } from '../../types';
import { handleDragStart, handleDragOver, handleDrop } from '../drag';

export function useToolDrag(onToolDrop: (tool: AITool) => void) {
  const [isDragging, setIsDragging] = useState(false);

  const dragHandlers = {
    onDragOver: (e: React.DragEvent) => {
      handleDragOver(e);
      setIsDragging(true);
    },
    onDragLeave: () => setIsDragging(false),
    onDrop: (e: React.DragEvent) => {
      const tool = handleDrop(e);
      setIsDragging(false);
      if (tool) {
        onToolDrop(tool);
      }
    }
  };

  return {
    isDragging,
    dragHandlers
  };
}