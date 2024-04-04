import React, { memo, useMemo, useRef, useState } from 'react';
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
import { LineGraphColors } from '../../../lib/constants';
import styled from 'styled-components';
import Scheduler from '../add-to-schedule/Scheduler';
import DateTimePicker from '../add-to-schedule/DateTimePicker';
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
  Legend
);

export type TSelectedFlasksGraph = {
  graphData: any[];
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

const SelectedFlasksGraph = memo(
  ({ graphData, bookmarkedFlasks }: TSelectedFlasksGraph) => {
    console.log(graphData, 'graphData  in SELECTEDFLASKSGRAPH');
    const chartRef = useRef<any>(null);
    const [clickedXY, setClickedXY] = useState<number[] | null>(null);
    const [selectedFlask, setSelectedFlask] = useState<number | null>(1);
    const dispatch = useDispatch();

    function clickHandler(e) {
      // console.log(e);
      if (chartRef?.current) {
        const chart = chartRef?.current;
        const elements = getElementAtEvent(chart, e);
        if (elements.length > 0) {
          // const firstElementIndex = elements[0].index;
          const datasetIndex = elements[0].datasetIndex;
          const datasetLabel = chart.data.datasets[datasetIndex].label;
          // Assuming the label is in the format "Flask <flask_id>"
          if (datasetLabel) {
            const flaskId = datasetLabel.replace('Flask ', '');

            dispatch(toggleFlaskBookmark(Number(flaskId)));
          }
        }
      }
    }

    const options: any = {
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
            color: '#dadada',
            font: {
              size: 18,
            },
          },
        },
        title: {
          display: true,
          // text: 'Bookmarked Cellbank Graph',
          font: {
            size: 22,
          },
          color: '#dadada',
        },
      },
    };

    const datasets = useMemo(() => {
      // graphData.map(
      //   (bookmarkedCellbank, bookmarkedCellbankId) =>
      return graphData.map((flaskData, i) => {
        // console.log(flaskData, 'flaskData')

        // const info = [
        //   '',
        //   `cell bank id: ${flaskData.cell_bank_id} `,
        //   `project: ${flaskData.project} `,
        //   `target molecule: ${flaskData.target_molecule} `,
        // ];

        const info = [
          '',
          `cell bank id: ${flaskData.cell_bank_id} `,
          `project: ${flaskData.project} `,
          `target molecule: ${flaskData.target_molecule} `,
        ];

        return {
          label: `Flask ${flaskData.flask_id}`,
          data: flaskData.time_since_inoc_hr_values.map((time, index) => ({
            x: time,
            y: flaskData.od600_values[index],
            z: info,
          })),
          borderColor:
            selectedFlask == flaskData.flask_id
              ? 'white'
              : LineGraphColors[i % LineGraphColors.length],
          backgroundColor:
            selectedFlask == flaskData.flask_id
              ? 'white'
              : LineGraphColors[i % LineGraphColors.length],
          tension: 0.1,
        };
      });
      // );
    }, [graphData, selectedFlask]);

    // console.log('bookmarkedCellbankGraphData', bookmarkedCellbankGraphData)
    const data = {
      // labels: datasets.flat().map((e) => ''),
      datasets: datasets.flat(),
    };
    console.log(data, 'CHANGED data in bookmarked cellbank graph');
    console.log(datasets, 'datasets in SELECTEDFLASKSGRAPH');

    return (
      <StyledGraphContainer>
        <h3>
          {clickedXY &&
            `Bookmarked Cellbank Graph
        clicked x: time ${clickedXY[0]?.toFixed(
          2
        )}  y: od600 ${clickedXY[1]?.toFixed(2)}`}
        </h3>
        {/* {JSON.stringify(bookmarkedCellbankGraphData)} */}
        {/* <ChartsTable flasks={datasets}/> */}
        {/* {JSON.stringify(datasets)} */}
        <StyledBookmarkedCellbankGraph>
          <Line
            ref={chartRef}
            options={options}
            data={data}
            onClick={clickHandler}
          />
        </StyledBookmarkedCellbankGraph>
        {/* <ChartsTable flasks={bookmarkedCellbankGraphData.flat()} /> */}
        <Scheduler clickedXY={clickedXY} />
        <DateTimePicker
          clickedXY={clickedXY}
          setClickedXY={setClickedXY}
          bookmarkedFlasks={bookmarkedFlasks}
          // setBookmarkedFlasks={setBookmarkedFlasks}
        />
      </StyledGraphContainer>
    );
  }
);

export default SelectedFlasksGraph;
