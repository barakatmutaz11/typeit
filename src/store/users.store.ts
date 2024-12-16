import { create } from 'zustand';
import { User } from '../types';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, data: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;
  promoteUser: (userId: string) => void;
  demoteUser: (userId: string) => void;
  resetApiKey: (userId: string) => string;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastActive: new Date(),
    stats: {
      totalApiCalls: 150,
      creditsUsed: 1200,
      successRate: 98.5,
      monthlyUsage: [300, 450, 600, 500, 800, 700]
    },
    permissions: ['view_analytics', 'manage_users', 'manage_api_keys'],
    apiKey: 'key_123',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastActive: new Date(),
    stats: {
      totalApiCalls: 75,
      creditsUsed: 600,
      successRate: 97.2,
      monthlyUsage: [150, 200, 300, 250, 400, 350]
    },
    permissions: ['view_analytics'],
    apiKey: 'key_456',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
  }
];

export const useUsersStore = create<UsersState>((set) => ({
  users: mockUsers,
  isLoading: false,
  error: null,
  
  setUsers: (users) => set({ users }),
  
  addUser: (newUser) => 
    set((state) => ({ users: [...state.users, newUser] })),
  
  updateUser: (userId, data) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...data } : user
      ),
    })),
  
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  
  banUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status: 'banned' } : user
      ),
    })),
  
  unbanUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status: 'active' } : user
      ),
    })),
  
  promoteUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, role: 'admin' } : user
      ),
    })),
  
  demoteUser: (userId) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, role: 'user' } : user
      ),
    })),
  
  resetApiKey: (userId) => {
    const newApiKey = `key_${Math.random().toString(36).slice(2)}`;
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, apiKey: newApiKey } : user
      ),
    }));
    return newApiKey;
  },
  
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));