import { create } from 'zustand';

interface AdminState {
  stats: {
    totalUsers: number;
    apiCalls: number;
    totalCost: number;
    avgResponseTime: number;
  };
  updateStats: (stats: Partial<AdminState['stats']>) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: {
    totalUsers: 0,
    apiCalls: 0,
    totalCost: 0,
    avgResponseTime: 0,
  },
  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
}));