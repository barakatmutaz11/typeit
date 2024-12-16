import { create } from 'zustand';
import { APIConnection } from '../types';
import { aiTools } from '../data/aiTools';

interface ConnectionsState {
  connections: APIConnection[];
  isLoading: boolean;
  error: string | null;
  testConnection: (connectionId: string) => Promise<boolean>;
  updateConnection: (connectionId: string, data: Partial<APIConnection>) => Promise<void>;
  deleteConnection: (connectionId: string) => Promise<void>;
}

export const useConnectionStore = create<ConnectionsState>((set, get) => ({
  connections: aiTools.map(tool => ({
    id: `conn_${tool.id}`,
    tool,
    status: Math.random() > 0.7 ? 'connected' : Math.random() > 0.5 ? 'failed' : 'pending',
    lastChecked: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    lastError: null,
    config: {
      baseUrl: `https://api.${tool.provider.toLowerCase()}.com/v1`,
      timeout: 30000,
      retries: 3,
    },
    metrics: {
      uptime: Math.random() * 100,
      latency: Math.random() * 1000,
      successRate: Math.random() * 100,
    }
  })),
  isLoading: false,
  error: null,

  testConnection: async (connectionId) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const success = Math.random() > 0.3;
      
      set(state => ({
        connections: state.connections.map(conn =>
          conn.id === connectionId
            ? {
                ...conn,
                status: success ? 'connected' : 'failed',
                lastChecked: new Date(),
                lastError: success ? null : 'Connection timed out',
              }
            : conn
        ),
      }));

      return success;
    } catch (error) {
      set({ error: 'Failed to test connection' });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateConnection: async (connectionId, data) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        connections: state.connections.map(conn =>
          conn.id === connectionId ? { ...conn, ...data } : conn
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update connection' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteConnection: async (connectionId) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set(state => ({
        connections: state.connections.filter(conn => conn.id !== connectionId),
      }));
    } catch (error) {
      set({ error: 'Failed to delete connection' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));