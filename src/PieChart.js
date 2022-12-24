import React from 'react';
import {
  Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
//   CategoryScale,
//   LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ dataSet, labelSet, text }) => {
  const labels = labelSet;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: text,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataSet,
        backgroundColor: [
            '#605d8a',
            '#FFC154',
            '#EC6B56'
          ],
      },
    ],
  };
  return <Pie options={options} data={data} />;
};

export default PieChart;