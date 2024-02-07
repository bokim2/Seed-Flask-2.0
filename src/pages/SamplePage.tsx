import React, { useEffect, useState } from 'react';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
  Wrapper,
} from '../styles/UtilStyles';
import { baseUrl } from '../../configs';
import SamplesTable from '../features/samples/SamplesTable';
import { useFetchValidatedTableQuery, useSamples } from '../lib/hooks';
import ErrorMessage from '../ui/ErrorMessage';
import LoaderBar from '../ui/LoaderBar';
import {
  samplesInfoArraySchema,
} from '../lib/types';

export default function SamplePage() {
  // const [samples, setSamples] = useState<any>([]);

  // const getSamples = async () => {
  //   const res = await fetch(`${baseUrl}/api/samples`);
  //   const { data } = await res.json();
  //   console.log('data in sample page', data);
  //   setSamples(data);
  //   return data;
  // };

  // useEffect(() => {
  //   getSamples();

  // }, []);

  // const [samples, isLoading, error] = useSamples();
  // console.log('samples', samples);

  const [samples, isLoading, error] = useFetchValidatedTableQuery({
    tableName: 'samples',
    zodSchema: samplesInfoArraySchema,
  });

  return (
    <PageContainer id="SamplePageContainer">
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>

      <InnerPageContainer id="SampleInnerPageContainer">
        {error && <ErrorMessage error={error} />}

        {!isLoading && <SamplesTable samples={samples} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
