import React from "react";
// import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
//   TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
//   TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options: any = {
  response: true,
  scales: {
    x: {
      type: "linear",

    },
    y: {
        type: "linear"
    }
  }
};

const values1 = [
  {
    x: 1,
    y: 100.2
  },
  {
    x: 2,
    y: 102.2
  },
  {
    x: 3,
    y: 105.3
  },
  {
    x: 4,
    y: 104.4
  }
];


const values2 = [
    {
      x: 1.5,
      y: 10.2
    },
    {
      x: 2.5,
      y: 12.2
    },
    {
      x: 3.5,
      y: 15.3
    },
    {
      x: 4.5,
      y: 14.4
    }
  ];
export const data: any = {
  datasets: [
    {
        label: "flask1",
      data: values1,
      backgroundColor: "red",
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
        label: "flask2",
      data: values2,
      backgroundColor: "blue",
      borderColor: 'blue',
      tension: 0.1
    }

  ]
};
export default function TimeLineGraph() {
    return <Line options={options} data={data} />;
}
