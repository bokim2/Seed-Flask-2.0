import React, { useEffect, useState } from 'react';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
  Wrapper,
} from '../styles/UtilStyles';
import LoaderBar from '../ui/LoaderBar';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFetchValidatedTableQuery, useFlask, useFlasks } from '../lib/hooks';
import LineGraph from '../features/charts/LineGraph';
import { baseUrl } from '../../configs';
import TimeLineGraph from '../ui/TimeLineGraph';
import ChartsTable from '../features/charts/ChartsTable';
import SingleCellbankGraph from '../features/charts/SingleCellbankGraph';
import AllCellbanksGraph from '../features/charts/AllCellbanksGraph';
import BookmarkedCellbankGraph from '../features/charts/BookmarkedCellbankGraph';
import { flasksInfoArraySchema } from '../features/flasks/flasks-types';

export default function ChartsPage() {
  const [flasks, isLoading, error] = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flasksInfoArraySchema,
  });
  // const [flasks, isLoading, error] = useFlasks();
  // const [flask] = useFlask(1);
  const [bookmarkedCellbanks, setBookmarkedCellbanks] = useState<number[]>([
    1, 2, 3, 6,
  ]);

  const [chartData, setChartData] = useState<any>([]);
  const [singleCellbankGraphData, setSingleCellbankGraphData] = useState<any[]>(
    []
  );
  const [allCellbankGraphData, setAllCellbankGraphData] = useState<any[]>([]);
  const [bookmarkedCellbankGraphData, setBookmarkedCellbankGraphData] =
    useState<any[][]>([]);

  const getGraphData = async () => {
    // console.log('data in graphs page, before fetch');
    const res = await fetch(`${baseUrl}/api/graphs`);
    const { data } = await res.json();
    setChartData(data);
    // console.log('data in graphs page', data);
    return data;
  };

  const getSingleCellbankGraphData = async (id) => {
    // console.log('data in graphs page, before fetch');
    const res = await fetch(`${baseUrl}/api/chart/cellbank/${id}`);
    const { data } = await res.json();
    setSingleCellbankGraphData(data);
    // console.log('data in setDataSingleCellbank page', data);
    return data;
  };

  const getBookmarkedCellbankGraphData = async (bookmarkedCellbanks) => {
    // console.log('data in graphs page, before fetch');
    const results = await Promise.all(
      bookmarkedCellbanks.map(async (cellbank) => {
        const res = await fetch(`${baseUrl}/api/chart/cellbank/${cellbank}`);
        const { data } = await res.json();
        // setBookmarkedCellbankGraphData(prev=> ({...prev, data}));
        // console.log('data in setDataSingleCellbank page', data);
        return data;
      })
    );
    setBookmarkedCellbankGraphData(results);
    // console.log('results in getBookmarkedCellbankGraphData', results);
    return results;
  };

  // const getBookmarkedCellbankGraphData = async (bookmarkedCellbanks) => {
  //   const results = await Promise.all(bookmarkedCellbanks.map(async (cellbank) => {
  //     const response = await fetch(`${baseUrl}/api/chart/cellbank/${cellbank}`);
  //     const { data } = await response.json();
  //     setSingleCellbankGraphData(data);
  //     return data;
  //   }));

  //   return results;
  // };

  const getAllCellbankGraphData = async () => {
    // console.log('data in graphs page, before fetch');
    const res = await fetch(`${baseUrl}/api/chart/cellbanks`);
    const { data } = await res.json();
    // console.log(data, 'in getallcellbankgraphdata');
    setAllCellbankGraphData(data);
    return data;
  };

  useEffect(() => {
    // getGraphData();
    getSingleCellbankGraphData(1);
    getAllCellbankGraphData();
    getBookmarkedCellbankGraphData(bookmarkedCellbanks);
  }, [bookmarkedCellbanks]);

  return (
    <PageContainer id="ChartsPage">
      <LoaderWrapper>
        {isLoading && <LoaderBar />}
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </LoaderWrapper>
      {JSON.stringify(setChartData)}
      <InnerPageContainer id="ChartsPage">
        {/* <LoaderBar /> */}
        <ChartsTable />

        {bookmarkedCellbankGraphData?.length > 0 && (
          <BookmarkedCellbankGraph
            bookmarkedCellbankGraphData={bookmarkedCellbankGraphData}
          />
        )}

        {allCellbankGraphData?.length &&(
          <AllCellbanksGraph allCellbankGraphData={allCellbankGraphData} />
        )}
        {singleCellbankGraphData?.length && (
          <SingleCellbankGraph
            singleCellbankGraphData={singleCellbankGraphData}
          />
        )}
        {/* <LineGraph chartData={chartData} /> */}
        <TimeLineGraph />

        {/* <FlasksTable flasks={flasks} /> */}
      </InnerPageContainer>
    </PageContainer>
  );
}
