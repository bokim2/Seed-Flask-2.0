import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFlasks } from '../lib/hooks';

import styled from 'styled-components';
import LoaderBar from '../ui/LoaderBar';
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  margin-top: 10vh;
  width: 100%;
`;

export default function Flask() {
  const [flasks, isLoading] = useFlasks();

  return (
    <PageContainer id="FlaskPageContainer">
      <Wrapper>
        <LoaderBar />
      </Wrapper>
      <InnerPageContainer id="InnerFlaskPageContainer">
        {/* saDSadaSDSAD */}
        {/* <LoaderBar /> */}
        {isLoading ? <LoaderBar /> : <FlasksTable flasks={flasks} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
