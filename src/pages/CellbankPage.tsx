import React, { useState } from 'react';
import CellbanksTable from '../features/cellbanks/CellbanksTable';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import ErrorMessage from '../ui/ErrorMessage';
import LoaderBar from '../ui/LoaderBar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCellbankBookmark } from '../redux/slices/bookmarksSlice';
import { RootState } from '../redux/store';
import Button from '../ui/Button';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import { cellbanksArraySchema } from '../features/cellbanks/cellbanks-types';
import CellbanksMultiInputForm from '../features/cellbanks/CellbanksMultiInputForm';
import { useMultiInputState } from '../hooks/hooks';

export default function CellbankPage() {
  const {
    data: cellbanksAll,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useFetchValidatedTableQuery({
    tableName: 'cellbanks',
    zodSchema: cellbanksArraySchema,
  });
  // console.log('cellbanks in cellbanks page', cellbanks);



  const [toggleTextTruncation, setToggleTextTruncation] = useState(true); // cut off details on long cellbank cells

  // bookmarked cellbanks
  const dispatch = useDispatch();
  const handleAddBookmark = (id) => {
    dispatch(toggleCellbankBookmark(parseInt(id)));
  };

  const cellbankBookmarks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );

  // data from cellbanks table
  // console.log('cellbankspage, cellbanks', cellbanks);
  // const cellbanksAll = cellbanks?.pages.map((data) => data.data).flat() || [];
  // // console.log(cellbanksAll, 'cellbanksAll');

  return (
    <PageContainer id="CellbankPageContainer">
      <LoaderWrapper>
        {(isLoading || isFetching) && <LoaderBar />}
      </LoaderWrapper>
      <InnerPageContainer id="CellbankInnerPageContainer">
        {error && <ErrorMessage error={error} />}
        <Button
          $size={'small'}
          onClick={() => setToggleTextTruncation((prev) => !prev)}
        >
          {!toggleTextTruncation
            ? 'Show Table Cell Details'
            : 'Hide Table Cell Overflow'}
        </Button>

        <h3>{JSON.stringify(cellbankBookmarks)}</h3>

    

        <CellbanksMultiInputForm />

        {/* {error?.message && <ErrorMessage error={error} />} */}
        {cellbanksAll && cellbanksAll?.length > 0 && !isLoading && (
          <CellbanksTable
            cellbanks={cellbanksAll}
            handleAddBookmark={handleAddBookmark}
            toggleTextTruncation={toggleTextTruncation}
            // tableName={tableName}
          />
        )}
        <Button
          type="button"
          onClick={() => {
            console.log('fetchNextPage fired', fetchNextPage, hasNextPage);
            fetchNextPage();
          }}
          // disabled={!hasNextPage || isFetchingNextPage}
        >
          {/* {hasNextPage && !isFetchingNextPage && 'Load More'} */}
          {!hasNextPage ? 'No More Data' : 'Load More'}
        </Button>
        {/* {JSON.stringify(cellbanks)} */}
        {/* <CellbanksSingleInputForm /> */}
      </InnerPageContainer>
    </PageContainer>
  );
}
