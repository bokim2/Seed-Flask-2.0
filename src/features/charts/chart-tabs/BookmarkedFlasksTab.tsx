import React from 'react';
import AllCellbanksGraph from '../graphs/AllCellbanksGraph';
import ChartsTable from '../ChartsTable';
import Button from '../../../ui/Button';
import { useBookmarkedFlasksGraphData } from '../chart-hooks';
import BookmarkedCellbankGraph from '../graphs/BookmarkedCellbankGraph';
import SelectedFlasksGraph from '../graphs/SelectedFlasksGraph';
import { LoaderWrapper } from '../../../styles/UtilStyles';
import LoaderBar from '../../../ui/LoaderBar';

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
  } = useBookmarkedFlasksGraphData(bookmarkedFlasks);

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
            <SelectedFlasksGraph
              graphData={bookmarkedFlasksGraphData}
              bookmarkedFlasks={bookmarkedFlasks}
              // setBookmarkedFlasks={setBookmarkedFlasks}
            />
            {/* <AllCellbanksGraph
          allCellbankGraphData={bookmarkedFlasksGraphData}
          bookmarkedFlasks={bookmarkedFlasks}
          // setBookmarkedFlasks={setBookmarkedFlasks}
        /> */}
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
