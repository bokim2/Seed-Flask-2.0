import React, { useEffect, useState } from 'react';
import {
  ButtonsContainer,
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import LoaderBar from '../ui/LoaderBar';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import { baseUrl } from '../../configs';
import { flasksInfoArraySchema } from '../features/flasks/flasks-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import TabSelectorContainer from '../ui/TabSelectorContainer';
import MainFilter from '../ui/MainFilter';
import { RootState } from '../redux/store';
import {
  clearCellbankBookmark,
  clearFlaskBookmark,
} from '../redux/slices/bookmarksSlice';
import AllFlasks from '../features/charts/chart-tabs/AllFlasks';
import BookmarkedFlasks from '../features/charts/chart-tabs/BookmarkedFlasks';
import BookmarkedCellbanks from '../features/charts/chart-tabs/BookmarkedCellbanks';
import SingleCellbank from '../features/charts/chart-tabs/SingleCellbank';
import FilteredFlasks from '../features/charts/chart-tabs/FilteredFlasks';

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

  const dispatch = useDispatch();
  const flasksAll = flasks?.pages.map((page) => page.data).flat() || [];
  console.log(flasksAll, 'flasksAll');

  const [selectedTabName, setSelectedTabName] = useState('all');

  const [bookmarkedFlasksGraphData, setBookmarkedFlasksGraphData] = useState(
    []
  );

  // const [singleCellbankGraphData, setSingleCellbankGraphData] = useState<any[]>(
  //   []
  // );

  const chartsTabNamesAndValues = {
    all: 'All Flasks',
    bookmarkedFlasks: 'Bookmarked Flasks',
    bookmarkedCellbanks: 'Bookmarked Cellbanks',
    // cellbank: 'Single Cellbank',
    // user: 'User',
    // project: 'Project',
    search: 'Search Flasks',
    schedule: 'Schedule List',
  };

  const bookmarkedCellbanks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );

  const bookmarkedFlasks = useSelector(
    (state: RootState) => state.bookmarks.flask_bookmark
  );

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
    // console.log(data, 'in getallcellbankgraphdata');
    setAllCellbankGraphData(data);
    return data;
  };

  const getBookmarkedFlasksGraphData = async () => {
    try {
      if (bookmarkedFlasks.length === 0) return;
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

  // or... 'Filters'

  return (
    <PageContainer id="ChartsPage">
      <LoaderWrapper>
        {isLoading && <LoaderBar />}
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </LoaderWrapper>
      {/* {JSON.stringify(setChartData)} */}
      <InnerPageContainer id="ChartsPage">
        <TabSelectorContainer
          chartsTabNamesAndValues={chartsTabNamesAndValues}
          selectedTabName={selectedTabName}
          setSelectedTabName={setSelectedTabName}
        >
          {/* <LoaderBar /> */}
          {/* {allCellbankGraphData?.length > 0 && (
          <BookmarkedCellbankGraph
            bookmarkedCellbankGraphData={allCellbankGraphData}
          />
        )} */}
          {/* display cellbank bookmarks and flask bookmarks */}
          <p>selected tab: {chartsTabNamesAndValues?.[selectedTabName]}</p>
          <p>cellbank bookmarks: {JSON.stringify(bookmarkedCellbanks)}</p>
          <p>flasks bookmarks: {JSON.stringify(bookmarkedFlasks)}</p>
          <ButtonsContainer>
            <Button
              $size="xs"
              onClick={() => dispatch(clearCellbankBookmark())}
            >
              Clear Cell bank bookmarks
            </Button>
            <Button $size="xs" onClick={() => dispatch(clearFlaskBookmark())}>
              Clear Flask bookmarks
            </Button>
          </ButtonsContainer>

          {/* bookmarks data
          <p>
            bookmarkedFlasksGraphData:{' '}
            {JSON.stringify(bookmarkedFlasksGraphData)}
          </p>
          <p>
            bookmarkedCellbankGraphData:{' '}
            {JSON.stringify(bookmarkedCellbankGraphData)}
          </p> */}

          {/* main filter - only show if user is logged in */}
          <MainFilter />
          {/* <MainNav /> */}
          {/* ALL flasks */}
          {selectedTabName === 'all' && (
            <AllFlasks
              allCellbankGraphData={allCellbankGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              flasksAll={flasksAll}
            />
          )}
          {/* {allCellbankGraphData?.length && (
            <AllCellbanksGraph
              allCellbankGraphData={allCellbankGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              // setBookmarkedFlasks={setBookmarkedFlasks}
            />
          )}
          <ChartsTable
            chartTitle="All Flasks"
            flasks={flasksAll}
            bookmarkedFlasks={bookmarkedFlasks}
            // setBookmarkedFlasks={setBookmarkedFlasks}
          /> */}
          {/* BOOKMARKED flasks */}
          {selectedTabName === 'bookmarkedFlasks' && (
            <BookmarkedFlasks
              allCellbankGraphData={allCellbankGraphData}
              bookmarkedFlasksGraphData={bookmarkedFlasksGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}

          {/* {allCellbankGraphData?.length && (
            <AllCellbanksGraph
              allCellbankGraphData={bookmarkedFlasksGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              // setBookmarkedFlasks={setBookmarkedFlasks}
            />
          )}
          <ChartsTable
            chartTitle="Bookmarked Flasks"
            flasks={bookmarkedFlasksGraphData}
            bookmarkedFlasks={bookmarkedFlasks}
            // setBookmarkedFlasks={setBookmarkedFlasks}
          />
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {hasNextPage && !isFetchingNextPage && 'Load More'}
            {!hasNextPage && 'No More Data'}
          </Button> */}

          {/* BOOKMARKED Cellbanks */}
          {selectedTabName === 'bookmarkedCellbanks' && (
            <BookmarkedCellbanks
              bookmarkedCellbankGraphData={bookmarkedCellbankGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
            />
          )}
          {/* {bookmarkedCellbankGraphData?.length > 0 && (
            <BookmarkedCellbankGraph
              bookmarkedCellbankGraphData={bookmarkedCellbankGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              // setBookmarkedFlasks={setBookmarkedFlasks}
            />
          )}
          <ChartsTable
            chartTitle="Bookmarked Charts"
            flasks={bookmarkedCellbankGraphData.flat()}
            bookmarkedFlasks={bookmarkedFlasks}
            // setBookmarkedFlasks={setBookmarkedFlasks}
          /> */}

          {/* single cell bank */}
          {selectedTabName === 'cellbank' && <SingleCellbank />}
          {/* <p>{JSON.stringify(singleCellbankGraphData)}</p>
          {singleCellbankGraphData?.length && (
            <SingleCellbankGraph
              singleCellbankGraphData={singleCellbankGraphData}
            />
          )} */}

          {selectedTabName === 'search' && <FilteredFlasks flasks={flasksAll} />}
          {/* <LineGraph chartData={chartData} /> */}
          {/* <TimeLineGraph /> */}
          {/* <FlasksTable flasks={flasks} />*/}
        </TabSelectorContainer>
      </InnerPageContainer>
    </PageContainer>
  );
}
