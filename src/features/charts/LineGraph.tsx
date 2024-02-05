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
      text: 'Chart.js Line Chart',
    },
  },
};

export default function LineGraph({ chartData }) {


  const datasets = 
    [...chartData].map((data) => {
      // console.log('data in map', data);
      // const xy = data.time_since_inoc_hr_values;
      // console.log('xy', xy);
      const dataArray: any = [];
      for (let i = 0; i < data.time_since_inoc_hr_values.length; i++) {
        dataArray.push({
          x: data.time_since_inoc_hr_values[i],
          y: data.od600_values[i],
        });
      }
      // console.log('dataArray', dataArray);
      return {
        label: ["flask"+data.flask_id, 2,3],
        data: dataArray,
        backgroundColor: 'rgb(131, 170, 40)',
        borderColor: 'rgb(131, 170, 40)',
      tension: 0.1
      };
    })
  ;

  // console.log( 'datasets', datasets);

  const data: any = {
    // labels,
    datasets,
  };

  return (
    <>
      {/* <Line options={options} data={data} /> */}
      <Line options={options} data={data} />
    </>
  );
}
