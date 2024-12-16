import React from 'react';
import { Line } from 'react-chartjs-2';
import { lineChartOptions } from '../../utils/chart';

export function UsageStats() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'API Calls',
        data: [3000, 3500, 4200, 4800, 5100, 5600],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Usage Statistics
        </h2>
        <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option>Last 6 months</option>
          <option>Last year</option>
          <option>All time</option>
        </select>
      </div>
      <div className="h-64">
        <Line data={data} options={lineChartOptions} />
      </div>
    </>
  );
}