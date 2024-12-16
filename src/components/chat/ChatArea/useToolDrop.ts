import { useRef, useState } from 'react';
import { useToolsStore } from '../../../store/tools.store';
import { AITool } from '../../../types';

export function useToolDrop() {
  const [isDropping, setIsDropping] = useState(false);
  const { addActiveTools } = useToolsStore();
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropping(false);
    
    try {
      const tool = JSON.parse(e.dataTransfer.getData('application/json')) as AITool;
      addActiveTools(tool);
    } catch (error) {
      console.error('Invalid tool data');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropping(true);
  };

  const handleDragLeave = () => {
    setIsDropping(false);
  };

  if (dropRef.current) {
    dropRef.current.ondrop = handleDrop;
    dropRef.current.ondragover = handleDragOver;
    dropRef.current.ondragleave = handleDragLeave;
  }

  return {
    dropRef,
    isDropping,
  };
}