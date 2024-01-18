import React from 'react';
import FlasksTable from '../features/flasks/FlasksTable';
import { useFlasks } from '../lib/hooks';

import styled from 'styled-components';
import LoaderBar from '../ui/LoaderBar';
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles';



export default function Flask() {
  const [flasks, isLoading] = useFlasks();

  return (
    <PageContainer id="FlaskPageContainer">
      <LoaderBar />
      <InnerPageContainer id="InnerFlaskPageContainer">
        saDSadaSDSAD
        <LoaderBar />
        <LoaderBar />
        {isLoading ? <LoaderBar /> : <FlasksTable flasks={flasks} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
