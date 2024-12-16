import React from 'react';
import { Line } from 'react-chartjs-2';
import { useAuthStore } from '../../store/auth.store';
import { lineChartOptions } from '../../utils/chart';

export function UserUsage() {
  const { user } = useAuthStore();
  if (!user?.stats) return null;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'API Calls',
        data: user.stats.monthlyUsage,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total API Calls
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {user.stats.totalApiCalls.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Credits Used
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {user.stats.creditsUsed.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Success Rate
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {user.stats.successRate}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Usage Over Time
        </h3>
        <div className="h-64">
          <Line data={data} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
}