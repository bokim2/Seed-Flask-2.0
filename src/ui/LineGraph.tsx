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
  //   const [lineChartData, setLineChartData] = useState<any>(chartData || []);
  //   lineChartData.map((flask) => {});
  const firstChartData = chartData[0];
  // console.log('firstChartData', firstChartData, firstChartData?.time_since_inoc_hr_values, firstChartData?.od600_values);

  //   const data = {
  //     labels: firstChartData?.time_since_inoc_hr_values,
  //     datasets: [
  //       {
  //         label: 'od600',
  //         data: firstChartData?.od600_values,
  //         backgroundColor: 'red',
  //       },
  //     ],
  //   };

//   const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   const labels = [[...chartData].map((data) => data.time_since_inoc_hr_values)];

  // const datasets = [[...chartData].map(data => {

  // return {
  //     label: data.flask_id,
  //     data: data.od600_values,
  //     backgroundColor: 'red',
  // }
  // })]

  const datasets = 
    [...chartData].map((data) => {
      console.log('data in map', data);
      const xy = data.time_since_inoc_hr_values;
      console.log('xy', xy);
      const dataArray: any = [];
      for (let i = 0; i < data.time_since_inoc_hr_values.length; i++) {
        dataArray.push({
          x: data.time_since_inoc_hr_values[i],
          y: data.od600_values[i],
        });
      }
      console.log('dataArray', dataArray);
      return {
        label: ["flask"+data.flask_id, 2,3],
        data: dataArray,
        backgroundColor: 'red',
        borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
      };
    })
  ;

  console.log( 'datasets', datasets);

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
