import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFetchValidatedTableQuery, useFlask, useFlasks } from '../lib/hooks';

import styled from 'styled-components';
import LoaderBar from '../ui/LoaderBar';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import ErrorMessage from '../ui/ErrorMessage';
import {
  flasksInfoArraySchema,
  flasksInfoSchema,
} from '../features/flasks/flasks-types';
import FlasksMultiInputForm from '../features/flasks/FlasksMultiInputForm';
import Button from '../ui/Button';

export default function FlaskPage() {
  // const [flasks, isLoading, error] = useFlasks();

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
  console.log('flasks in flaskPAGE', flasks);

  // const [flask] = useFlask(1);
  // console.log('flask in flaskPAGE', flask);

  const flasksAll = flasks?.pages.map((page) => page.data).flat();
  console.log(flasksAll, 'flasksAll');
  return (
    <PageContainer id="FlaskPageContainer">
      <LoaderWrapper>
        {/* <LoaderBar /> */}
        {isLoading && <LoaderBar />}
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </LoaderWrapper>
      <InnerPageContainer id="InnerFlaskPageContainer">
        {/* <LoaderBar /> */}
        {/* <FlasksMultiInputForm popularOptions={flasksAlls?.popularOptions}/> */}
        {error && <ErrorMessage error={error} />}
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
