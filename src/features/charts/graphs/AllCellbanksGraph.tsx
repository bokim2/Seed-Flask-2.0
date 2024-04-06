import React, { useRef, useState } from 'react';

// import ChartDataLabels from 'chartjs-plugin-datalabels';

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
import Button from '../../../ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  autocolors
  // ChartDataLabels,
);

// labeling the x and y of each data point
// ChartJS.defaults.set('plugins.datalabels', {
//   color: '#dadada',
// })

export default function AllCellbanksGraph({
  allCellbankGraphData,
  bookmarkedFlasks,
  // setBookmarkedFlasks,
}) {
  const dispatch = useDispatch();
  const [toggleGraphDataLabel, setToggleGraphDataLabel] =
    useState<boolean>(false);

  console.log(allCellbankGraphData, 'allCellbankGraphData');
  const datasets = allCellbankGraphData.map((flaskData) => {
    const info = [
      `flask id: ${flaskData.flask_id}`,
      ` cell bank id: ${flaskData.cell_bank_id}`,
      ` project: ${flaskData.project} `,
      ` ${flaskData.target_molecule} `,
    ];
    return {
      label: `Flask ${flaskData.flask_id}`,
      data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
        z: info,
        x: parseFloat(Number(time).toFixed(2)),
        y: flaskData.od600_values[index],
      })),
      tension: 0.1,
      // borderColor: 'rgb(89, 192, 75)', // Change as needed
      // backgroundColor: 'rgb(89, 192, 75)', // Adjust for visibility
    };
  });

  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    // aspectRatio: 1.5,
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
      datalabels: {
        display: function (context) {
          if (!toggleGraphDataLabel) return false;
          return context.dataIndex === context.dataset.data.length - 1;
        },
      },
      autocolors: {
        mode: 'data',
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
    <>
     <Button
          type="button"
          onClick={() => setToggleGraphDataLabel((prev) => !prev)}
          $size={'small'}
        >
         {toggleGraphDataLabel ? 'Hide labels' : 'Show Data Labels'}
        </Button>
      <StyledGraphContainer>
        <Line
          options={options}
          data={data}
          onClick={clickHandler}
          ref={lineChartRef}
        />
      </StyledGraphContainer>
    </>
  );
}
