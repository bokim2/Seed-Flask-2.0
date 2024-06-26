import React, { useRef, useState } from 'react';

import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  ChartOptions,
  ChartData,
} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { useDispatch } from 'react-redux';
import { toggleFlaskBookmark } from '../../../redux/slices/bookmarksSlice';
import { StyledGraphContainer } from '../../../styles/UtilStyles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  autocolors,
  // ChartDataLabels,
);

// labeling the x and y of each data point
// ChartJS.defaults.set('plugins.datalabels', {
//   color: '#dadada',
// })

export const options: ChartOptions<'line'> = {
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
  // for padding on the right side
  // layout: {
  //   padding: {
  //     right: 50
  //   }
  // },
  plugins: {
    autocolors: {
      mode: 'data'
    },
    legend: {
      // position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'All Cellbanks Graph',
    },
    tooltip: {
      mode: 'nearest',
      intersect: false,
    },
  },
  
};

export default function AllCellbanksGraph({
  allCellbankGraphData,
  bookmarkedFlasks,
  // setBookmarkedFlasks,
}) {
  const dispatch = useDispatch();

  console.log(allCellbankGraphData, 'allCellbankGraphData');
  const datasets = allCellbankGraphData.map((flaskData) => ({
    label: `Flask ${flaskData.flask_id}`,
    data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
      x: time,
      y: flaskData.od600_values[index],
    })),
    // borderColor: 'rgb(89, 192, 75)', // Change as needed
    // backgroundColor: 'rgb(89, 192, 75)', // Adjust for visibility
    tension: 0.1,
  }));

  const data: ChartData<'line'> = { datasets };
  const lineChartRef = useRef<ChartJS<'line', number[], string>>(null);

  function clickHandler(e) {
    // console.log(e);
    if (lineChartRef?.current) {
      const chart = lineChartRef?.current;
      const elements = getElementAtEvent(chart, e);
      if (elements.length > 0) {
        // const firstElementIndex = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        const datasetLabel = chart.data.datasets[datasetIndex].label;
        // Assuming the label is in the format "Flask <flask_id>"
        if (datasetLabel) {
          const flaskId = datasetLabel.replace('Flask ', '');
          // console.log(`Clicked on flask ID: ${flaskId}`);
          // Now you have the flask ID and can use it as needed
          // console.log('flaskId', flaskId, parseInt(flaskId));
          // setBookmarkedFlasks((prev) => {
          //   if (!prev.includes(parseInt(flaskId))) {
          //    return [...prev, parseInt(flaskId)];
          //   } else {
          //   return prev
          //   }
          // });
          dispatch(toggleFlaskBookmark(Number(flaskId)));
        }
      }
    }
  }
  return (
    <StyledGraphContainer>
      <Line
        options={options}
        data={data}
        onClick={clickHandler}
        ref={lineChartRef}
      />
    </StyledGraphContainer>
  );
}
