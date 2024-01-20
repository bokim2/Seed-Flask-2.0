import React, { useEffect, useState } from 'react';
import {
  InnerPageContainer,
  PageContainer,
  Wrapper,
} from '../styles/UtilStyles';
import { baseUrl } from '../../configs';
import SamplesTable from '../features/samples/SamplesTable';

export default function SamplePage() {
  const [samples, setSamples] = useState<any>([]);

  const getSamples = async () => {
    const res = await fetch(`${baseUrl}/api/samples`);
    const { data } = await res.json();
    console.log('data in sample page', data);
    setSamples(data);
    return data;
  };

  useEffect(() => {
    getSamples();
  
  }, []);

  return (
    <PageContainer id="SamplePageContainer">
      <Wrapper></Wrapper>
      <InnerPageContainer id="SampleInnerPageContainer">
        <SamplesTable samples={samples} />
      </InnerPageContainer>
    </PageContainer>
  );
}
