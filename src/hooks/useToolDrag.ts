import { useState } from 'react';
import { AITool } from '../types';

export function useToolDrag() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent, tool: AITool) => {
    e.dataTransfer.setData('application/json', JSON.stringify(tool));
    e.dataTransfer.effectAllowed = 'copy';
    
    // Add drag preview
    const preview = document.createElement('div');
    preview.className = 'bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg';
    preview.textContent = tool.name;
    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, 0, 0);
    setTimeout(() => preview.remove(), 0);
  };

  return {
    isDragging,
    dragHandlers: {
      draggable: true,
      onDragStart: handleDragStart,
    },
  };
}