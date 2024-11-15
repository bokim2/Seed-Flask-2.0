import React, { useEffect, useState } from 'react';
import {
  ButtonsContainer,
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
  StyledBookmark,
  StyledBookmarkContainer,
} from '../styles/UtilStyles';
import LoaderBar from '../ui/LoaderBar';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import { baseUrl } from '../../configs';
import { flasksInfoArraySchema } from '../features/flasks/flasks-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import TabSelectorContainer from '../ui/TabSelectorContainer';
import { RootState } from '../redux/store';
import {
  clearCellbankBookmark,
  clearFlaskBookmark,
  clearSearchedFlasksList,
} from '../redux/slices/bookmarksSlice';

import BookmarkedFlasksTab from '../features/charts/chart-tabs/BookmarkedFlasksTab';
import BookmarkedCellbanksTab from '../features/charts/chart-tabs/BookmarkedCellbanksTab';
import SearchFlasksTab from '../features/charts/chart-tabs/SearchFlasksTab';
import ScheduleTab from '../features/charts/chart-tabs/ScheduleTab';
import { z } from 'zod';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

export default function ChartsPage() {
  const {
    data: flasksAll,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flasksInfoArraySchema,
  });

  const location = useLocation();
  const dispatch = useDispatch();


  const [selectedTabName, setSelectedTabName] = useState('search');


  const chartsTabNamesAndValues = {
    // all: 'All Flasks',
    search: 'Search Flasks',
    bookmarkedflasks: 'Bookmarked Flasks',
    bookmarkedcellbanks: 'Bookmarked Cellbanks',
    // cellbank: 'Single Cellbank',
    // user: 'User',
    // project: 'Project',
    schedule: 'Schedule List',
  };

  const bookmarkedCellbanks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );

  const bookmarkedFlasks = useSelector(
    (state: RootState) => state.bookmarks.flask_bookmark
  );

  const searchedFlasksList = useSelector(
    (state: RootState) => state.bookmarks.searched_flasks_list
  );

  const [bookmarkedCellbankGraphData, setBookmarkedCellbankGraphData] =
    useState<any[][]>([]);

  const getBookmarkedCellbankGraphData = async (bookmarkedCellbanks) => {
    // console.log('data in graphs page, before fetch');
    const results = await Promise.all(
      bookmarkedCellbanks.map(async (cellbank) => {
        const res = await fetch(`${baseUrl}/api/chart/cellbank/${cellbank}`,  { credentials: 'include' });
        const { data } = await res.json();
        // setBookmarkedCellbankGraphData(prev=> ({...prev, data}));
        console.log('data in getBookmarkedCellbankGraphData page', data);
        return data;
      })
    );
    setBookmarkedCellbankGraphData(results);
    // console.log('results in getBookmarkedCellbankGraphData', results);
    return results;
  };


  const {
    data: allCellbankGraphData,
    // isLoading,
    // error,
    fetchNextPage: fetchNextPageAllCellbanks,
    // hasNextPage,
    // isFetchingNextPage ,
    // isFetching,
  } = useFetchValidatedTableQuery({
    tableName: 'chart/cellbanks',
    zodSchema: z.any(),
  });

  useEffect(() => {
    getBookmarkedCellbankGraphData(bookmarkedCellbanks);
  }, [bookmarkedCellbanks, bookmarkedFlasks]);

  // or... 'Filters'

  useEffect(() => {
    console.log('location.pathname', location.pathname)
    const path = location.pathname.split('/').pop();
    if (path && path in chartsTabNamesAndValues) {
      setSelectedTabName(path);
    }
  }, [location.pathname]);

  console.log('searchedFlasksList', searchedFlasksList);

  return (
    <PageContainer id="ChartsPage">
      <LoaderWrapper>
        {(isLoading || isFetching) && <LoaderBar />}
      </LoaderWrapper>

      <InnerPageContainer id="ChartsPage">
        <TabSelectorContainer
          chartsTabNamesAndValues={chartsTabNamesAndValues}
          selectedTabName={selectedTabName}
          setSelectedTabName={setSelectedTabName}
        >
          <StyledBookmarkContainer>
            <StyledBookmark>
              cellbank bookmarks:{' '}
              {Array.isArray(bookmarkedCellbanks) &&
                bookmarkedCellbanks.join(', ')}
            </StyledBookmark>
            <StyledBookmark>
              flasks bookmarks:{' '}
              {Array.isArray(bookmarkedFlasks) && bookmarkedFlasks.join(', ')}
            </StyledBookmark>
            <StyledBookmark>
              searched flasks list:{' '}
              {Array.isArray(searchedFlasksList) &&
                searchedFlasksList.join(', ')}
            </StyledBookmark>
          </StyledBookmarkContainer>

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

            <Button
              $size="xs"
              onClick={() => dispatch(clearSearchedFlasksList())}
            >
              Clear searched flasks list
            </Button>
          </ButtonsContainer>

          <Routes>
            <Route path="/" element={<Navigate to="search" replace />} />
            <Route
              path="search"
              element={
                <>
                  <SearchFlasksTab
                    flasks={flasksAll}
                    allCellbankGraphData={allCellbankGraphData}
                  />

                  <Button
                    type="button"
                    onClick={() => {
                      fetchNextPage();
                      fetchNextPageAllCellbanks();
                    }}
                  >
                    {!hasNextPage ? 'No More Data' : 'Load More'}
                  </Button>
                </>
              }
            />
            <Route
              path="bookmarkedflasks"
              element={
                <BookmarkedFlasksTab
                  bookmarkedFlasks={bookmarkedFlasks}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              }
            />
            <Route
              path="bookmarkedcellbanks"
              element={
                <BookmarkedCellbanksTab
                  bookmarkedCellbankGraphData={bookmarkedCellbankGraphData}
                  bookmarkedFlasks={bookmarkedFlasks}
                />
              }
            />
            <Route
              path="schedule"
              element={<ScheduleTab flasks={flasksAll} />}
            />
          </Routes>
        </TabSelectorContainer>
      </InnerPageContainer>
    </PageContainer>
  );
}

  // const flasksAll = flasks?.pages.map((page) => page.data).flat() || [];
  // console.log(flasksAll, 'flasksAll');

    // const [singleCellbankGraphData, setSingleCellbankGraphData] = useState<any[]>(
  //   []
  // );

  // useEffect(() => {
  //   // getGraphData();
  //   // getSingleCellbankGraphData(1);

  //   // getAllCellbankGraphData();
  //   getBookmarkedCellbankGraphData(bookmarkedCellbanks);
  //   // getBookmarkedFlasksGraphData(bookmarkedFlasks);
  // }, [bookmarkedCellbanks, bookmarkedFlasks]);


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

    // const getAllCellbankGraphData = async () => {
  //   // console.log('data in graphs page, before fetch');
  //   const res = await fetch(`${baseUrl}/api/chart/cellbanks`);
  //   const { data } = await res.json();
  //   // console.log(data, 'in getallcellbankgraphdata');
  //   setAllCellbankGraphData(data);
  //   return data;
  // };

          {/* {selectedTabName === 'search' && (
            <>
              <SearchFlasksTab
                flasks={flasksAll}
                allCellbankGraphData={allCellbankGraphData}
              />

              <Button
                type="button"
                onClick={() => {
                  fetchNextPage();
                  fetchNextPageAllCellbanks();
                }}
              >
                {!hasNextPage ? 'No More Data' : 'Load More'}
              </Button>
            </>
          )} */}
          {/* 
          {selectedTabName === 'all' && (
            <>
              <AllFlasksTab
                allCellbankGraphData={allCellbankGraphData}
                bookmarkedFlasks={bookmarkedFlasks}
                flasksAll={flasksAll}
              />
              <Button
                type="button"
                onClick={() => {
                  fetchNextPage();
                  fetchNextPageAllCellbanks();
                }}
              >
                {!hasNextPage ? 'No More Data' : 'Load More'}
              </Button>
            </>
          )} */}

          {/* {selectedTabName === 'bookmarkedFlasks' && (
            <BookmarkedFlasksTab
              // allCellbankGraphData={allCellbankGraphData}
              // bookmarkedFlasksGraphData={bookmarkedFlasksGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )} */}

          {/* {selectedTabName === 'bookmarkedCellbanks' && (
            <BookmarkedCellbanksTab
              bookmarkedCellbankGraphData={bookmarkedCellbankGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
            />
          )} */}

          {/* {selectedTabName === 'schedule' && <ScheduleTab flasks={flasksAll} />} */}
