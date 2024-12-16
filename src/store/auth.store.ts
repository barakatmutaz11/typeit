import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: string, data: any) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Mock user data with monthly usage stats
const mockUsers = {
  admin: {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const,
    status: 'active' as const,
    lastActive: new Date(),
    stats: {
      totalApiCalls: 1250,
      creditsUsed: 8500,
      successRate: 98.5,
      monthlyUsage: [300, 450, 600, 500, 800, 700]
    },
    permissions: ['view_analytics', 'manage_users', 'manage_api_keys'],
    apiKey: 'sk_test_123',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User'
  },
  user: {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user' as const,
    status: 'active' as const,
    lastActive: new Date(),
    stats: {
      totalApiCalls: 450,
      creditsUsed: 2800,
      successRate: 97.2,
      monthlyUsage: [150, 200, 300, 250, 400, 350]
    },
    permissions: ['view_analytics'],
    apiKey: 'sk_test_456',
    avatar: 'https://ui-avatars.com/api/?name=Regular+User'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'admin@example.com' && password === 'admin') {
          set({
            user: mockUsers.admin,
            isAuthenticated: true
          });
        } else if (email === 'user@example.com' && password === 'user') {
          set({
            user: mockUsers.user,
            isAuthenticated: true
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      socialLogin: async (provider: string, data: any) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: `${provider.toLowerCase()}_${Date.now()}`,
          email: data.email,
          name: data.name,
          role: 'user',
          status: 'active',
          lastActive: new Date(),
          stats: {
            totalApiCalls: 0,
            creditsUsed: 0,
            successRate: 100,
            monthlyUsage: [0, 0, 0, 0, 0, 0]
          },
          permissions: ['view_analytics'],
          apiKey: `sk_${Math.random().toString(36).slice(2)}`,
          avatar: data.avatar
        };

        set({
          user,
          isAuthenticated: true
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      isAdmin: () => get().user?.role === 'admin',
      updateProfile: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);