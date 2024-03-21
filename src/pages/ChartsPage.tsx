import React, { useEffect, useState } from 'react';
import {
  InnerPageContainer,
  LoaderWrapper,
  MainFilterSelector,
  PageContainer,
  Wrapper,
} from '../styles/UtilStyles';
import LoaderBar from '../ui/LoaderBar';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import LineGraph from '../features/charts/LineGraph';
import { baseUrl } from '../../configs';
import TimeLineGraph from '../ui/TimeLineGraph';
import ChartsTable from '../features/charts/ChartsTable';
import SingleCellbankGraph from '../features/charts/SingleCellbankGraph';
import AllCellbanksGraph from '../features/charts/AllCellbanksGraph';
import BookmarkedCellbankGraph from '../features/charts/BookmarkedCellbankGraph';
import { flasksInfoArraySchema } from '../features/flasks/flasks-types';
import { useAppSelector } from '../hooks/hooks';
import { useDispatch } from 'react-redux';
import { changePageLimit } from '../features/ui-state/pageSlice';
import PageLimitDropDownSelector from '../ui/table-ui/PageLimitDropDownSelector';
import Button from '../ui/Button';
import MainNav from '../ui/MainFilter';
import TabSelectorContainer from '../ui/TabSelectorContainer';
import MainFilter from '../ui/MainFilter';

export default function ChartsPage() {
  const {
    data: flasks,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flasksInfoArraySchema,
  });

  const flasksAll = flasks?.pages.map((page) => page.data).flat() || [];
  console.log(flasksAll, 'flasksAll');

  // const [flasks, isLoading, error] = useFlasks();
  // const [flask] = useFlask(1);
  const [bookmarkedCellbanks, setBookmarkedCellbanks] = useState<number[]>([
    1, 2, 3, 6,
  ]);

  const [bookmarkedFlasks, setBookmarkedFlasks] = useState<number[]>([42, 41]);
  const [bookmarkedFlasksGraphData, setBookmarkedFlasksGraphData] = useState(
    []
  );

  // const [chartData, setChartData] = useState<any>([]);
  // const [singleCellbankGraphData, setSingleCellbankGraphData] = useState<any[]>(
  //   []
  // );
  const [allCellbankGraphData, setAllCellbankGraphData] = useState<any[]>([]);
  const [bookmarkedCellbankGraphData, setBookmarkedCellbankGraphData] =
    useState<any[][]>([]);

  // const getGraphData = async () => {
  //   // console.log('data in graphs page, before fetch');
  //   const res = await fetch(`${baseUrl}/api/graphs`);
  //   const { data } = await res.json();
  //   setChartData(data);
  //   // console.log('data in graphs page', data);
  //   return data;
  // };

  // const getSingleCellbankGraphData = async (id) => {
  //   // console.log('data in graphs page, before fetch');
  //   const res = await fetch(`${baseUrl}/api/chart/cellbank/${id}`);
  //   const { data } = await res.json();
  //   setSingleCellbankGraphData(data);
  //   // console.log('data in setDataSingleCellbank page', data);
  //   return data;
  // };

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

  const getAllCellbankGraphData = async () => {
    // console.log('data in graphs page, before fetch');
    const res = await fetch(`${baseUrl}/api/chart/cellbanks`);
    const { data } = await res.json();
    console.log(data, 'in getallcellbankgraphdata');
    setAllCellbankGraphData(data);
    return data;
  };

  const getBookmarkedFlasksGraphData = async () => {
    try {
      console.log(bookmarkedFlasks, 'in getBookmarkedFlasksGraphData');
      console.log(bookmarkedFlasks.join(','), bookmarkedFlasks.join(','));
      const response = await fetch(
        `${baseUrl}/api/chart/flasks?flaskIds=${bookmarkedFlasks.join(',')}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const { data } = await response.json();
      console.log(data, 'in getBookmarkedFlasksGraphData');
      setBookmarkedFlasksGraphData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Fetching error:', err.message);
      } else {
        console.log('Unknown error:', err);
      }
      // Handle the error according to your application's needs
    }
  };

  useEffect(() => {
    // getGraphData();
    // getSingleCellbankGraphData(1);
    getAllCellbankGraphData();
    getBookmarkedCellbankGraphData(bookmarkedCellbanks);
    getBookmarkedFlasksGraphData();
  }, [bookmarkedCellbanks, bookmarkedFlasks]);

  return (
    <PageContainer id="ChartsPage">
      <LoaderWrapper>
        {isLoading && <LoaderBar />}
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </LoaderWrapper>
      {/* {JSON.stringify(setChartData)} */}
      <InnerPageContainer id="ChartsPage">
        <TabSelectorContainer>
        {/* <LoaderBar /> */}
        {/* {allCellbankGraphData?.length > 0 && (
          <BookmarkedCellbankGraph
            bookmarkedCellbankGraphData={allCellbankGraphData}
          />
        )} */}

        {/* main filter - only show if user is logged in */}
        <MainFilter />


        {/* <MainNav /> */}

        {/* ALL flasks */}
        {allCellbankGraphData?.length && (
          <AllCellbanksGraph
            allCellbankGraphData={allCellbankGraphData}
            bookmarkedFlasks={bookmarkedFlasks}
            setBookmarkedFlasks={setBookmarkedFlasks}
          />
        )}
        <ChartsTable
          chartTitle="All Flasks"
          flasks={flasksAll}
          bookmarkedFlasks={bookmarkedFlasks}
          setBookmarkedFlasks={setBookmarkedFlasks}
        />

        {/* BOOKMARKED flasks */}
        {allCellbankGraphData?.length && (
          <AllCellbanksGraph
            allCellbankGraphData={bookmarkedFlasksGraphData}
            bookmarkedFlasks={bookmarkedFlasks}
            setBookmarkedFlasks={setBookmarkedFlasks}
          />
        )}
        <ChartsTable
          chartTitle="Bookmarked Flasks"
          flasks={bookmarkedFlasksGraphData}
          bookmarkedFlasks={bookmarkedFlasks}
          setBookmarkedFlasks={setBookmarkedFlasks}
        />

        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage && !isFetchingNextPage && 'Load More'}
          {!hasNextPage && 'No More Data'}
        </Button>

        {/* BOOKMARKED Cellbanks */}
        {bookmarkedCellbankGraphData?.length > 0 && (
          <BookmarkedCellbankGraph
            bookmarkedCellbankGraphData={bookmarkedCellbankGraphData}
            bookmarkedFlasks={bookmarkedFlasks}
            setBookmarkedFlasks={setBookmarkedFlasks}
          />
        )}
        <ChartsTable
          chartTitle="Bookmarked Charts"
          flasks={bookmarkedCellbankGraphData.flat()}
          bookmarkedFlasks={bookmarkedFlasks}
          setBookmarkedFlasks={setBookmarkedFlasks}
        />

        {/* {singleCellbankGraphData?.length && (
          <SingleCellbankGraph
            singleCellbankGraphData={singleCellbankGraphData}
          />
        )} */}
        {/* <LineGraph chartData={chartData} /> */}
        {/* <TimeLineGraph /> */}
        {/* <FlasksTable flasks={flasks} /> */}
        </TabSelectorContainer>
      </InnerPageContainer>
    </PageContainer>
  );
}
