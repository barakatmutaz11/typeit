import { create } from 'zustand';
import { AITool, Message } from '../types';

interface Store {
  // Messages
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  
  // Tools
  activeTools: AITool[];
  addActiveTools: (tool: AITool) => void;
  removeActiveTools: (toolId: string) => void;
  clearActiveTools: () => void;
}

export const useStore = create<Store>((set) => ({
  // Messages state
  messages: [],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  clearMessages: () => set({ messages: [] }),
  
  // Tools state
  activeTools: [],
  addActiveTools: (tool) => set((state) => ({
    activeTools: [...state.activeTools, tool]
  })),
  removeActiveTools: (toolId) => set((state) => ({
    activeTools: state.activeTools.filter((t) => t.id !== toolId)
  })),
  clearActiveTools: () => set({ activeTools: [] })
}));