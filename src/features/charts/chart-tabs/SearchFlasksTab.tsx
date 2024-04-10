import React, { useState } from 'react';
import FlasksTable from '../../flasks/FlasksTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useFetchBookmarkedFlasksGraphData } from '../chart-hooks';
import FlasksListGraph from '../graphs/FlasksListGraph';
import AllFlasksTab from './AllFlasksTab';
import AllCellbanksGraph from '../graphs/AllCellbanksGraph';

export default function SearchFlasksTab({ flasks, allCellbankGraphData }) {
  // const [searchedFlasksList, setSearchedFlasksList] = useState<number[]>([]);

  const searchedFlasksList = useSelector(
    (state: RootState) => state.bookmarks.searched_flasks_list
  );

  // const {
  //   data: bookmarkedFlasksGraphData,
  //   isLoading,
  //   error,
  //   isFetching,
  //   refetch,
  // } = useFetchBookmarkedFlasksGraphData(searchedFlasksList);
  console.log('flasks in SearchFlasksTab', flasks, 'allcellbanksgraphdata', allCellbankGraphData);

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
      {/* {searchedFlasksList.length == 0 && allCellbankGraphData?.length && (
        <AllCellbanksGraph
          allCellbankGraphData={allCellbankGraphData}
          // bookmarkedFlasks={bookmarkedFlasks}
          // setBookmarkedFlasks={setBookmarkedFlasks}
        />
      )} */}
      {searchedFlasksList.length > 0 && <FlasksListGraph flasks={flasks} />}
      {flasks && flasks.length > 0 && (
        <FlasksTable
          flasks={flasks}
          // setSearchedFlasksList={setSearchedFlasksList}
        />
      )}
    </>
  );
}
