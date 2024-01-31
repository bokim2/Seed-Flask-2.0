import React, { useEffect, useState } from 'react';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
  Wrapper,
} from '../styles/UtilStyles';
import LoaderBar from '../ui/LoaderBar';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFlask, useFlasks } from '../lib/hooks';
import LineGraph from '../ui/LineGraph';
import { baseUrl } from '../../configs';
import TimeLineGraph from '../ui/TimeLineGraph';

export default function ChartsPage() {
  const [flasks, isLoading, error] = useFlasks();
  const [flask] = useFlask(1);

  const [chartData, setChartData] = useState<any>([]);

  const getGraphData = async () => {
      console.log('data in graphs page, before fetch');
      const res = await fetch(`${baseUrl}/api/graphs`);
      const { data } = await res.json();
      setChartData(data);
      console.log('data in graphs page', data);
    return data;
  };

  useEffect(() => {
    getGraphData();
//   console.log('graphData in sample page', graphData)
  }, []);

  return (
    <PageContainer id="ChartsPage">
      <LoaderWrapper>
        {
        isLoading && 
        <LoaderBar />
        }
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </LoaderWrapper>
      {JSON.stringify(setChartData)}
      <InnerPageContainer id="ChartsPage">
        {/* <LoaderBar /> */}
        <LineGraph chartData={chartData}/>
        <TimeLineGraph />
        {/* <FlasksTable flasks={flasks} /> */}
      </InnerPageContainer>
    </PageContainer>
  );
}
