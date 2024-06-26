import React from 'react';
import BookmarkedCellbankGraph from '../graphs/BookmarkedCellbankGraph';
import ChartsTable from '../ChartsTable';

export default function BookmarkedCellbanksTab({
  bookmarkedCellbankGraphData,
  bookmarkedFlasks,
  // setBookmarkedFlasks,
}) {
  return (
    <>
      {bookmarkedCellbankGraphData?.length > 0 && (
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
      />
    </>
  );
}
