import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { doughnutChartOptions } from '../../utils/chart';

export function APIUsage() {
  const data = {
    labels: ['GPT-4', 'DALL-E', 'Claude', 'Midjourney'],
    datasets: [
      {
        data: [40, 25, 20, 15],
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
          API Usage Distribution
        </h2>
      </div>
      <div className="h-64">
        <Doughnut data={data} options={doughnutChartOptions} />
      </div>
    </>
  );
}