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
import { LineGraphColors } from '../../lib/constants';

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
  animation: false,
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
      text: 'Bookmarked Cellbank Graph',
    },
  },
};

export default function BookmarkedCellbankGraph({ bookmarkedCellbankGraphData }) {
    // console.log(bookmarkedCellbankGraphData, 'bookmarkedCellbankGraphData')

  const datasets = bookmarkedCellbankGraphData.map((bookmarkedCellbank, bookmarkedCellbankId) => (bookmarkedCellbank.map((flaskData) => ({
    label: `Flask ${flaskData.flask_id}`,
    data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
      x: time,
      y: flaskData.od600_values[index],
    })),
    borderColor: LineGraphColors[bookmarkedCellbankId], 
    backgroundColor: LineGraphColors[bookmarkedCellbankId], 
    tension: 0.1,
  }))));

  const data = { datasets: datasets.flat() };
  console.log(data, 'data in bookmarked cellbank graph')

  return (
    <>

      <Line options={options} data={data} />
    </>
  );
}
