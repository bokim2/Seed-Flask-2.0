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
import { StyledGraphContainer } from '../../../styles/UtilStyles';

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
    tooltip: {
      mode: 'nearest',
      intersect: false,
    },
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Single Cellbank Graph',
    },
  },
};

export default function SingleCellbankGraph({ singleCellbankGraphData }) {
  // console.log(singleCellbankGraphData, 'singleCellbankGraphData')

  const datasets = singleCellbankGraphData.map((flaskData) => ({
    label: `Flask ${flaskData.flask_id}`,
    data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
      x: time,
      y: flaskData.od600_values[index],
    })),
    borderColor: 'rgb(85, 75, 192)', // Change as needed
    backgroundColor: 'rgb(85, 75, 192)', // Adjust for visibility
    tension: 0.1,
  }));

  const data = { datasets };

  return (
    <StyledGraphContainer>
      <Line options={options} data={data} />
    </StyledGraphContainer>
  );
}
