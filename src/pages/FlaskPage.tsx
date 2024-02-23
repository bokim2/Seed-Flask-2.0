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

export default function FlaskPage() {
  const {
    data: flasks,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flasksInfoArraySchema,
  });

  const flasksAll = flasks?.pages.map((page) => page.data).flat() || [];
  console.log(flasksAll, 'flasksAll');

  return (
    <PageContainer id="FlaskPageContainer">
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>
      <InnerPageContainer id="InnerFlaskPageContainer">
        {error && <ErrorMessage error={error} />}
        
        <FlasksMultiInputForm />
        {flasksAll && flasksAll.length > 0 && !isLoading && (
          <FlasksTable flasks={flasksAll} />
        )}
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage && !isFetchingNextPage && 'Load More'}
          {!hasNextPage && 'No More Data'}
        </Button>
      </InnerPageContainer>
    </PageContainer>
  );
}
