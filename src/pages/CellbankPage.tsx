import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../configs';
import CellbanksTable from '../features/cellbanks/CellbanksTable';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import ErrorMessage from '../ui/ErrorMessage';
import LoaderBar from '../ui/LoaderBar';
import { useDispatch, useSelector } from 'react-redux';
import { addCellbankBookmark } from '../features/ui-state/bookmarksSlice';
import { RootState } from '../lib/store';
import Button from '../ui/Button';
import {  useFetchValidatedTableQuery } from '../lib/hooks';
import { cellbanksArraySchema } from '../features/cellbanks/cellbanks-types';

export default function CellbankPage() {
  const {
    data: cellbanks,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchValidatedTableQuery({
    tableName: 'cellbanks',
    zodSchema: cellbanksArraySchema,
  });
  console.log('cellbanks in cellbanks page', cellbanks);

  const [toggleTextTruncation, settToggleTextTruncation] = useState(true); // cut off details on long cellbank cells

  // bookmarked cellbanks
  const dispatch = useDispatch();
  const handleAddBookmark = (id) => {
    dispatch(addCellbankBookmark(id));
  };

  const cellbankBookmarks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );

  //

  const cellbanksAll = cellbanks?.pages.map((data) => data.data).flat() || [];
  console.log(cellbanksAll, 'cellbanksAll');

  return (
    <PageContainer id="CellbankPageContainer">
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>
      <InnerPageContainer id="CellbankInnerPageContainer">
        {/* {(error) && (<div>Error: {error.message}</div>)} */}
        <Button
          $size={'small'}
          onClick={() => settToggleTextTruncation((prev) => !prev)}
        >
          {!toggleTextTruncation
            ? 'Show Table Cell Details'
            : 'Hide Table Cell Overflow'}
        </Button>

        <h3>{JSON.stringify(cellbankBookmarks)}</h3>

        {/* <CellbanksMultiInputForm popularOptions={cellbanks?.popularOptions}/> */}

        {error?.message && <ErrorMessage error={error} />}
        {!isLoading && cellbanks?.pages && cellbanks?.pages?.length > 0 && (
          <CellbanksTable
            cellbanks={cellbanksAll}
            handleAddBookmark={handleAddBookmark}
            toggleTextTruncation={toggleTextTruncation}
            // tableName={tableName}
          />
        )}
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage && !isFetchingNextPage && 'Load More'}
          {!hasNextPage && 'No More Data'}
        </Button>
        {/* {JSON.stringify(cellbanks)} */}
        {/* <CellbanksSingleInputForm /> */}
      </InnerPageContainer>
    </PageContainer>
  );
}
