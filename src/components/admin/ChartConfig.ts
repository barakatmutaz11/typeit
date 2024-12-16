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
  ChartOptions,
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
  Legend
);

// Common chart options
export const commonOptions: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      },
    },
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      },
    },
  },
};