import React, { useState } from 'react';
import FlasksTable from '../../flasks/FlasksTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useBookmarkedFlasksGraphData } from '../chart-hooks';
import FlasksListGraph from '../graphs/FlasksListGraph';

export default function SearchFlasksTab({ flasks }) {
  // const [searchedFlasksList, setSearchedFlasksList] = useState<number[]>([]);

  // const searchedFlasksList = useSelector((state: RootState)=> state.bookmarks.searched_flasks_list)

  // const {
  //   data: bookmarkedFlasksGraphData,
  //   isLoading,
  //   error,
  //   isFetching,
  //   refetch,
  // } = useBookmarkedFlasksGraphData(searchedFlasksList);

  return (
    <>
      {/* {Array.isArray(bookmarkedFlasksGraphData) && bookmarkedFlasksGraphData?.length && (<>
        <SelectedFlasksGraph
        graphData={bookmarkedFlasksGraphData}
        bookmarkedFlasks={searchedFlasksList}
        // setBookmarkedFlasks={setBookmarkedFlasks}
      />

        </>
      )} */}
      <FlasksListGraph />
      {flasks && flasks.length > 0 && (
        <FlasksTable
          flasks={flasks}
          // setSearchedFlasksList={setSearchedFlasksList}
        />
      )}
    </>
  );
}
