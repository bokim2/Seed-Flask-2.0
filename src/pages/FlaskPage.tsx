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
import { flaskAndCellbankArraySchema } from '../features/flasks/flasks-types';

export default function FlaskPage() {
  // const [flasks, isLoading, error] = useFlasks();

  const [flasks, isLoading, error] = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flaskAndCellbankArraySchema,
  });

  // const [flask] = useFlask(1);

  return (
    <PageContainer id="FlaskPageContainer">
      <LoaderWrapper>
        {/* <LoaderBar /> */}
        {isLoading && <LoaderBar />}
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </LoaderWrapper>
      <InnerPageContainer id="InnerFlaskPageContainer">
        {/* <LoaderBar /> */}
        {!isLoading && <FlasksTable flasks={flasks} />}
        {error && <ErrorMessage error={error} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
