import { create } from 'zustand';
import { AITool } from '../../types';

interface ToolsState {
  tools: AITool[];
  activeTools: AITool[];
  addTool: (tool: AITool) => void;
  removeTool: (toolId: string) => void;
  addActiveTools: (tool: AITool) => void;
  removeActiveTools: (toolId: string) => void;
}

export const useToolsStore = create<ToolsState>((set) => ({
  tools: [],
  activeTools: [],
  addTool: (tool) => set((state) => ({ tools: [...state.tools, tool] })),
  removeTool: (toolId) => set((state) => ({
    tools: state.tools.filter((t) => t.id !== toolId),
  })),
  addActiveTools: (tool) => set((state) => ({
    activeTools: [...state.activeTools, tool],
  })),
  removeActiveTools: (toolId) => set((state) => ({
    activeTools: state.activeTools.filter((t) => t.id !== toolId),
  })),
}));