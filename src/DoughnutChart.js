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
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
//   CategoryScale,
//   LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({ dataSet, labelSet, text }) => {
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
            '#FFC154'
            
          ],
      },
    ],
  };
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;