import React from 'react';
import ChartsTable from '../ChartsTable';
import Button from '../../../ui/Button';
import { useFetchBookmarkedFlasksGraphData } from '../chart-hooks';
import { LoaderWrapper } from '../../../styles/UtilStyles';
import LoaderBar from '../../../ui/LoaderBar';
import BookmarkedFlasksGraph from '../graphs/BookmarkedFlasksGraph';

export default function BookmarkedFlasksTab({
  // allCellbankGraphData,
  // bookmarkedFlasksGraphData,
  bookmarkedFlasks,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  const {
    data: bookmarkedFlasksGraphData,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useFetchBookmarkedFlasksGraphData({
    bookmarkedFlasks: bookmarkedFlasks || [],
    flasksListRoute: 'chart/flasks',
  });

  console.log(
    'bookmarkedFlasksGraphData in BOOKMARKEDFLASKTAB',
    bookmarkedFlasksGraphData
  );
  return (
    <>
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>

      {Array.isArray(bookmarkedFlasksGraphData) &&
        bookmarkedFlasksGraphData?.length && (
          <>
            <BookmarkedFlasksGraph
              graphData={bookmarkedFlasksGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              // setBookmarkedFlasks={setBookmarkedFlasks}
            />

          </>
        )}
      <ChartsTable
        chartTitle="Bookmarked Flasks"
        flasks={bookmarkedFlasksGraphData}
        bookmarkedFlasks={bookmarkedFlasks}
        // setBookmarkedFlasks={setBookmarkedFlasks}
      />
      {/* <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {hasNextPage && !isFetchingNextPage && 'Load More'}
        {!hasNextPage && 'No More Data'}
      </Button> */}
    </>
  );
}
