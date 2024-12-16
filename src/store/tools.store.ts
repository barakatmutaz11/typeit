import { create } from 'zustand';
import { AITool } from '../types';
import { aiTools as initialTools } from '../data/aiTools';

interface ToolsState {
  tools: AITool[];
  isLoading: boolean;
  error: string | null;
  addTool: (tool: AITool) => Promise<void>;
  updateTool: (id: string, data: Partial<AITool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  toggleToolStatus: (id: string) => Promise<void>;
}

export const useToolsStore = create<ToolsState>((set, get) => ({
  tools: initialTools.map(tool => ({
    ...tool,
    isEnabled: true,
    rateLimit: {
      requests: 1000,
      period: '1h'
    },
    stats: {
      totalRequests: Math.floor(Math.random() * 10000),
      successRate: Math.floor(Math.random() * 20 + 80),
      avgResponseTime: Math.floor(Math.random() * 500 + 100),
    }
  })),
  isLoading: false,
  error: null,

  addTool: async (tool) => {
    try {
      set((state) => ({
        tools: [...state.tools, { ...tool, isEnabled: true }],
      }));
    } catch (error) {
      set({ error: 'Failed to add tool' });
      throw error;
    }
  },

  updateTool: async (id, data) => {
    try {
      set((state) => ({
        tools: state.tools.map((tool) =>
          tool.id === id ? { ...tool, ...data } : tool
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update tool' });
      throw error;
    }
  },

  deleteTool: async (id) => {
    try {
      set((state) => ({
        tools: state.tools.filter((tool) => tool.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete tool' });
      throw error;
    }
  },

  toggleToolStatus: async (id) => {
    try {
      set((state) => ({
        tools: state.tools.map((tool) =>
          tool.id === id ? { ...tool, isEnabled: !tool.isEnabled } : tool
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to toggle tool status' });
      throw error;
    }
  },
}));