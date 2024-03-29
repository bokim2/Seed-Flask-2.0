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
import { flasksInfoArraySchema, flasksInfoSchema } from '../features/flasks/flasks-types'
import FlasksMultiInputForm from '../features/flasks/FlasksMultiInputForm';

export default function FlaskPage() {
  // const [flasks, isLoading, error] = useFlasks();

  const {data: flasks, isLoading, error} = useFetchValidatedTableQuery({
    tableName: 'flasks',
    zodSchema: flasksInfoArraySchema,
  });
  console.log('flasks in flaskPAGE', flasks);

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
        <FlasksMultiInputForm popularOptions={flasks?.popularOptions}/>
        {!isLoading && <FlasksTable flasks={flasks?.data} />}
        {error && <ErrorMessage error={error} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
