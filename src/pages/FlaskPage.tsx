import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';

import styled from 'styled-components';
import LoaderBar from '../ui/LoaderBar';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import ErrorMessage from '../ui/ErrorMessage';
import { flasksInfoArraySchema } from '../features/flasks/flasks-types';
import FlasksMultiInputForm from '../features/flasks/FlasksMultiInputForm';
import Button from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFlaskBookmark } from '../redux/slices/bookmarksSlice';
import { RootState } from '../redux/store';

export default function FlaskPage() {
  const {
    data: flasksAll,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flasksInfoArraySchema,
  });

  // const flasksAll = flasks?.pages.map((page) => page.data).flat() || [];
  // console.log(flasksAll, 'flasksAll');

  const flaskBookmarks = useSelector(
    (state: RootState) => state.bookmarks.flask_bookmark
  );

  const cellbankBookmarks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );

  return (
    <PageContainer id="FlaskPageContainer">
      <LoaderWrapper>
        {(isLoading || isFetching) && <LoaderBar />}
      </LoaderWrapper>
      <InnerPageContainer id="InnerFlaskPageContainer">
        {error && <ErrorMessage error={error} />}

        <h3>flask bookmarks: {JSON.stringify(flaskBookmarks)}</h3>
        <h3>cellbank bookmarks: {JSON.stringify(cellbankBookmarks)}</h3>

        <FlasksMultiInputForm />
        {flasksAll && flasksAll.length > 0 && !isLoading && (
          <FlasksTable
            flasks={flasksAll}
            // handleAddBookmark={handleAddBookmark}
          />
        )}
        <Button
          type="button"
          onClick={() => fetchNextPage()}
          // disabled={!hasNextPage || isFetchingNextPage}
        >
          {/* {hasNextPage && !isFetchingNextPage && 'Load More'} */}
          {!hasNextPage ? 'No More Data' : 'Load More'}
        </Button>
      </InnerPageContainer>
    </PageContainer>
  );
}
