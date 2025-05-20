import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { adherenceData } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdherenceChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Persentase Kepatuhan (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Periode',
        },
      },
    },
  };

  // Converting weekly data to percentages for the chart
  const weeklyPercentages = {
    labels: adherenceData.weekly.labels,
    datasets: [
      {
        label: 'Kepatuhan Mingguan (%)',
        data: adherenceData.monthly.datasets[0].data,
        backgroundColor: 'rgba(74, 222, 128, 0.6)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={weeklyPercentages} />;
};

export default AdherenceChart;