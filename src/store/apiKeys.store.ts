import { create } from 'zustand';
import { APIKey } from '../types';
import { aiTools } from '../data/aiTools';

interface APIKeysState {
  apiKeys: APIKey[];
  isLoading: boolean;
  error: string | null;
  rotateKey: (keyId: string) => Promise<string>;
  revokeKey: (keyId: string) => Promise<void>;
  deleteKey: (keyId: string) => Promise<void>;
}

export const useApiKeysStore = create<APIKeysState>((set, get) => ({
  apiKeys: aiTools.map(tool => ({
    id: `key_${tool.id}`,
    tool,
    key: `sk_${Math.random().toString(36).slice(2)}`,
    status: 'active' as const,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    usage: {
      totalRequests: Math.floor(Math.random() * 10000),
      dataProcessed: Math.floor(Math.random() * 1024 * 1024 * 1024),
      cost: Math.random() * 1000,
    },
    rateLimit: {
      requests: 1000,
      period: '1m',
    },
  })),
  isLoading: false,
  error: null,

  rotateKey: async (keyId: string) => {
    const newKey = `sk_${Math.random().toString(36).slice(2)}`;
    set(state => ({
      apiKeys: state.apiKeys.map(key =>
        key.id === keyId
          ? { ...key, key: newKey, createdAt: new Date() }
          : key
      ),
    }));
    return newKey;
  },

  revokeKey: async (keyId: string) => {
    set(state => ({
      apiKeys: state.apiKeys.map(key =>
        key.id === keyId
          ? { ...key, status: key.status === 'revoked' ? 'active' : 'revoked' }
          : key
      ),
    }));
  },

  deleteKey: async (keyId: string) => {
    set(state => ({
      apiKeys: state.apiKeys.filter(key => key.id !== keyId),
    }));
  },
}));