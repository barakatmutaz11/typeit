import React from 'react';
import { Bar } from 'react-chartjs-2';
import { barChartOptions } from '../../utils/chart';

export function CostAnalysis() {
  const data = {
    labels: ['GPT-4', 'DALL-E', 'Claude', 'Midjourney'],
    datasets: [
      {
        label: 'Cost ($)',
        data: [1200, 800, 600, 400],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(244, 63, 94)',
          'rgb(168, 85, 247)',
          'rgb(59, 130, 246)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Cost Analysis
        </h2>
        <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>
      <div className="h-64">
        <Bar data={data} options={barChartOptions} />
      </div>
    </>
  );
}