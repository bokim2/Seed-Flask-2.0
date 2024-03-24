import React from 'react'
import AllCellbanksGraph from '../AllCellbanksGraph'
import ChartsTable from '../ChartsTable'
import Button from '../../../ui/Button'

export default function BookmarkedFlasks({
    allCellbankGraphData,
    bookmarkedFlasksGraphData,
    bookmarkedFlasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, 

}) {
  return (
    <>
           {allCellbankGraphData?.length && (
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
          </Button>
    </>
  )
}
