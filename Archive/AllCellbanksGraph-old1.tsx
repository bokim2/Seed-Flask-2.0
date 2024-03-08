import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: any = {
  responsive: true,
//   plugins: {
//     tooltip: callbacks: 
//   },
  scales: {
    x: {
      type: 'linear',
    },
    y: {
      type: 'linear',
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'All Cellbanks Graph',
    },
  },
};

export default function AllCellbanksGraph({ allCellbankGraphData }) {
console.log(allCellbankGraphData, 'allCellbankGraphData')
  const datasets = allCellbankGraphData.map(flaskData => ({
    label: `Flask ${flaskData.flask_id}`,
    data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
      x: time,
      y: flaskData.od600_values[index],
    })),
    borderColor: 'rgb(89, 192, 75)', // Change as needed
    backgroundColor: 'rgb(89, 192, 75)', // Adjust for visibility
    tension: 0.1,
  }));

  const data = { datasets };

  return (
    <>

      <Line options={options} data={data} />
    </>
  );
}
