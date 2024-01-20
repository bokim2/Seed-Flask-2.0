import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFlask, useFlasks } from '../lib/hooks';

import styled from 'styled-components';
import LoaderBar from '../ui/LoaderBar';
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  margin-top: 10vh;
  width: 100%;
`;

export default function FlaskPage() {
  const [flasks, isLoading, error] = useFlasks();
  const [flask] = useFlask(1);

  return (
    <PageContainer id="FlaskPageContainer">
      <Wrapper>
        {/* <LoaderBar /> */}
        {isLoading && <LoaderBar />}
        {/* "TO TEST SINGLE FLASK: "{ JSON.stringify(flask)} */}
      </Wrapper>
      <InnerPageContainer id="InnerFlaskPageContainer">
        {/* <LoaderBar /> */}
        <FlasksTable flasks={flasks} />
      </InnerPageContainer>
    </PageContainer>
  );
}
