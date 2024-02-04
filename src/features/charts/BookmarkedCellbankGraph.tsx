import React, { memo, useMemo, useRef, useState } from 'react';
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
import { TBookmarkedCellbankGraph } from '../../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const BookmarkedCellbankGraph = memo(
  ({ bookmarkedCellbankGraphData }: TBookmarkedCellbankGraph) => {
    // console.log(bookmarkedCellbankGraphData, 'bookmarkedCellbankGraphData')
    const chartRef = useRef<any>(null);
    const [clickedXY, setClickedXY] = useState<number[] | null>(null);

     const options: any = {
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
      onClick: (event) => {
        console.log('in graph onclick')
        if (!chartRef.current) {
          return;
        }

        const chart = chartRef.current;
        if (!chart) {
          console.log('no chart'  )
          return;
        }

        const canvasPosition = event.native ? event.native : event;

        // Use the scales to get the data values
        const xScale = chart.scales.x;
        const yScale = chart.scales.y;
        const xValue = xScale.getValueForPixel(canvasPosition.offsetX);
        const yValue = yScale.getValueForPixel(canvasPosition.offsetY);

        console.log(`Clicked on: x=${xValue}, y=${yValue}`);
        setClickedXY([xValue, yValue]);
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

    const datasets = useMemo(() => {
      return bookmarkedCellbankGraphData.map(
        (bookmarkedCellbank, bookmarkedCellbankId) =>
          bookmarkedCellbank.map((flaskData) => ({
            label: `Flask ${flaskData.flask_id}`,
            data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
              x: time,
              y: flaskData.od600_values[index],
            })),
            borderColor:
              LineGraphColors[bookmarkedCellbankId % LineGraphColors.length],
            backgroundColor:
              LineGraphColors[bookmarkedCellbankId % LineGraphColors.length],
            tension: 0.1,
          }))
      );
    }, [bookmarkedCellbankGraphData]);

    const data = { datasets: datasets.flat() };
    console.log(data, 'CHANGED data in bookmarked cellbank graph');

    return (
      <>
      <h1>{clickedXY && `Bookmarked Cellbank Graph
        clicked x: time ${clickedXY[0]}  y: od600 ${clickedXY[1]}`}
      </h1>
        <Line ref={chartRef} options={options} data={data} />
      </>
    );
  }
);

export default BookmarkedCellbankGraph;
