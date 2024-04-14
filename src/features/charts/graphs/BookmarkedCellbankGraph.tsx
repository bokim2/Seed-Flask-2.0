import React, { memo, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
import { GRAPH_AXIS_TEXT_COLOR, GRAPH_LEGEND_TEXT_COLOR, LineGraphColors } from '../../../lib/constants';
import styled from 'styled-components';
import Scheduler from '../add-to-schedule/Scheduler';
import DateTimePicker from '../add-to-schedule/DateTimePicker';
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
  ChartDataLabels
);

export type TBookmarkedCellbankGraph = {
  bookmarkedCellbankGraphData: any[][];
  bookmarkedFlasks: any;
  // setBookmarkedFlasks: any;
};

const StyledBookmarkedCellbankGraph = styled.div`
  width: auto;
  height: auto;

  @media (min-width: 850px) {
    width: 80%;
  }
`;

const BookmarkedCellbankGraph = memo(
  ({
    bookmarkedCellbankGraphData,
    bookmarkedFlasks,
  }: TBookmarkedCellbankGraph) => {
    console.log(bookmarkedCellbankGraphData, 'bookmarkedCellbankGraphData');
    const chartRef = useRef<any>(null);
    const [clickedXY, setClickedXY] = useState<number[] | null>(null);
    const [selectedFlask, setSelectedFlask] = useState<number | null>(null);
    const [toggleGraphDataLabel, setToggleGraphDataLabel] =
      useState<boolean>(false);

    const options: any = {
      responsive: true,
      animation: false,
      // aspectRatio: 1.5,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Time (hours)',
            color: GRAPH_LEGEND_TEXT_COLOR,
            font: {
              size: 20,
            },
          },
          
          ticks: {
            color: GRAPH_AXIS_TEXT_COLOR,
            font: {
              size: 18,
            },
          },
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'OD600',
            color: GRAPH_LEGEND_TEXT_COLOR,
            font: {
              size: 20,
            },
          },
          ticks: {
            color: GRAPH_AXIS_TEXT_COLOR,
            font: {
              size: 20,
            },
          },
        },
      },

      onClick: (event) => {
        console.log('in graph onclick');
        if (!chartRef.current) {
          return;
        }

        const chart = chartRef.current;
        if (!chart) {
          console.log('no chart');
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
        datalabels: {
          display: function (context) {
            if (!toggleGraphDataLabel) return false;
            return context.dataIndex === context.dataset.data.length - 1;
          },
        },

        tooltip: {
          mode: 'nearest',
          intersect: false,
          callbacks: {
            title: function () {
              return '';
            },
            afterBody: function (context) {
              console.log(context[0]);
              // console.log(context[0]);
              const customInfo = context[0].raw.z;
              return [
                `time hr: ${context[0].parsed.x?.toFixed(2)}`,
                `od600: ${context[0].parsed.y}`,
                ...customInfo,
              ];
              // return 'testing'
            },
          },
        },
        legend: {
          
          // position: 'top' as const,
          display: false,
          position: 'top' as const,
          labels: {
            color: 'GRAPH_LEGEND_TEXT_COLOR',
            font: {
              size: 18,
            },
          },
        },
        title: {
          display: true,
          text: 'Bookmarked Cellbank Graph',
          font: {
            size: 22,
          },
          color: '#dadada',
        },
      },
    };

    const datasets = useMemo(() => {
      return bookmarkedCellbankGraphData.map(
        (bookmarkedCellbank, bookmarkedCellbankId) =>
          bookmarkedCellbank.map((flaskData) => {
            // console.log(flaskData, 'flaskData')

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
              borderColor:
                selectedFlask == flaskData.flask_id
                  ? 'white'
                  : LineGraphColors[
                      bookmarkedCellbankId % LineGraphColors.length
                    ],
              backgroundColor:
                selectedFlask == flaskData.flask_id
                  ? 'white'
                  : LineGraphColors[
                      bookmarkedCellbankId % LineGraphColors.length
                    ],
              tension: 0.1,
            };
          })
      );
    }, [bookmarkedCellbankGraphData, selectedFlask]);

    // console.log('bookmarkedCellbankGraphData', bookmarkedCellbankGraphData)
    const data = {
      // labels: datasets.flat().map((e) => ''),
      datasets: datasets.flat(),
    };
    console.log(data, 'CHANGED data in bookmarked cellbank graph');

    return (
      <>
        <Button
          type="button"
          onClick={() => setToggleGraphDataLabel((prev) => !prev)}
          $size={'small'}
        >
         {toggleGraphDataLabel ? 'Hide labels' : 'Show Data Labels'}
        </Button>
          {/* <h3>
          {clickedXY &&
            `Bookmarked Cellbank Graph
            clicked x: time ${clickedXY[0]?.toFixed(
              2
              )}  y: od600 ${clickedXY[1]?.toFixed(2)}`}
            </h3> */}
          {/* {JSON.stringify(bookmarkedCellbankGraphData)} */}
          {/* <ChartsTable flasks={datasets}/> */}
          {/* {JSON.stringify(datasets)} */}
          {/* <StyledBookmarkedCellbankGraph> */}
            <StyledGraphContainer>
            <Line ref={chartRef} options={options} data={data} />
          </StyledGraphContainer>
          {/* </StyledBookmarkedCellbankGraph> */}
          {/* <ChartsTable flasks={bookmarkedCellbankGraphData.flat()} /> */}
          <Scheduler clickedXY={clickedXY} />
          <DateTimePicker
            clickedXY={clickedXY}
            setClickedXY={setClickedXY}
            bookmarkedFlasks={bookmarkedFlasks}
            // setBookmarkedFlasks={setBookmarkedFlasks}
          />
      </>
    );
  }
);

export default BookmarkedCellbankGraph;
