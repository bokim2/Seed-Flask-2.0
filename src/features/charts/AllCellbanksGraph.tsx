import React, { useRef, useState } from 'react';
import { Line, getElementAtEvent } from 'react-chartjs-2';
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
  animation: false,
  aspectRatio: 1.5,
  scales: {
    x: {
      type: 'linear',
      ticks: {
        font: {
          size: 18,
        },
        color: '#dadada',
      },
    },
    y: {
      type: 'linear',
      ticks: {
        font: {
          size: 20,
        },
        color: '#dadada',
      },
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

export default function AllCellbanksGraph({ allCellbankGraphData, setBookmarkedFlasks }) {
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
  const lineChartRef = useRef<any | null>(null);

  function clickHandler(e) {
    console.log(e)
    if(lineChartRef?.current){
      const chart = lineChartRef?.current;
    const elements = getElementAtEvent(chart, e)
    if (elements.length > 0) {
      const firstElementIndex = elements[0].index;
      const datasetIndex = elements[0].datasetIndex;
      const datasetLabel = chart.data.datasets[datasetIndex].label;
      // Assuming the label is in the format "Flask <flask_id>"
      const flaskId = datasetLabel.replace('Flask ', '');
  
      console.log(`Clicked on flask ID: ${flaskId}`);
      // Now you have the flask ID and can use it as needed
    
    console.log('flaskId', flaskId, parseInt(flaskId))
      setBookmarkedFlasks((prev)=> [...prev, parseInt(flaskId)])
    }
    }

  }
  return (
    <>

      <Line options={options} data={data} onClick={clickHandler} ref={lineChartRef}/>
    </>
  );
}
