import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ dataSet, labelSet, text, color}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: text,
      },
    },
  };
  const labels = labelSet;
  const data = {
    labels,
    datasets: [
      {
        label: 'Pulse Data',
        data: dataSet,
        tension: 0.3,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };
  return (
    <div>
      {console.log(dataSet)}
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;