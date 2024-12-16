import { AITool } from '../types';

export function handleDragStart(e: React.DragEvent, tool: AITool) {
  e.dataTransfer.setData('application/json', JSON.stringify(tool));
  e.dataTransfer.effectAllowed = 'copy';
  
  // Add drag preview
  const preview = document.createElement('div');
  preview.className = 'bg-white p-2 rounded shadow-lg';
  preview.textContent = tool.name;
  document.body.appendChild(preview);
  e.dataTransfer.setDragImage(preview, 0, 0);
  setTimeout(() => preview.remove(), 0);
}

export function handleDragOver(e: React.DragEvent) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
}

export function handleDrop(e: React.DragEvent): AITool | null {
  e.preventDefault();
  const data = e.dataTransfer.getData('application/json');
  try {
    return JSON.parse(data) as AITool;
  } catch {
    return null;
  }
}