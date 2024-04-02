import React, { useState } from 'react';
import { baseUrl } from '../../../../configs';
import AllCellbanksGraph from '../AllCellbanksGraph';
import ChartsTable from '../ChartsTable';
import FlasksTable from '../../flasks/FlasksTable';

export default function AllFlasksTab({
  allCellbankGraphData,
  bookmarkedFlasks,
  flasksAll,
}) {
  return (
    <>
      {allCellbankGraphData?.length && (
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
      />

      {/* <FlasksTable flasks={flasksAll} /> */}
    </>
  );
}
