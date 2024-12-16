import { useAdminStore } from '../store/admin.store';

export async function fetchAdminStats() {
  try {
    // Simulated API call
    const stats = {
      totalUsers: 1234,
      apiCalls: 45200,
      totalCost: 3421,
      avgResponseTime: 245,
    };

    useAdminStore.getState().updateStats(stats);
    return stats;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
}