import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from 'chart.js';


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title
);

const AreaChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dress Sales ($)',
        data: [3200, 4500, 3800, 6200, 7100, 6900],
        fill: true,
        backgroundColor:'rgb(193, 212, 224)',
        borderColor: 'rgb(108, 171, 212)',       
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly Dress Sales - 2025',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `$${value}`, 
        },
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="card shadow chart-card">
        <div className="card-body">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
