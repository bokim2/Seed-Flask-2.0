import React from 'react'
import BookmarkedCellbankGraph from '../BookmarkedCellbankGraph'
import ChartsTable from '../ChartsTable'

export default function BookmarkedCellbanks({
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
  )
}
