import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'bottom' as const,
      labels: {
        color: 'rgb(156, 163, 175)',
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgb(17, 24, 39)',
      titleColor: 'rgb(243, 244, 246)',
      bodyColor: 'rgb(243, 244, 246)',
      borderColor: 'rgb(75, 85, 99)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hitRadius: 8,
      hoverRadius: 6,
    },
  },
};

export const lineChartOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    legend: {
      display: false,
    },
  },
};

export const barChartOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    legend: {
      display: false,
    },
  },
};

export const doughnutChartOptions = {
  ...commonOptions,
  cutout: '60%',
  plugins: {
    ...commonOptions.plugins,
    legend: {
      display: true,
      position: 'bottom' as const,
    },
  },
};