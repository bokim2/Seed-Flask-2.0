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
import SamplesMultiInputForm from '../features/samples/SamplesMultiInputForm';

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

  const {
    data: samples,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchValidatedTableQuery({
    tableName: 'samples',
    zodSchema: samplesInfoArraySchema,
  });

  const samplesAll = samples?.pages.map(page => page.data).flat()  || [];

  return (
    <PageContainer id="SamplePageContainer">
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>

      <InnerPageContainer id="SampleInnerPageContainer">
        {/* <SamplesMultiInputForm popularOptions={samples?.popularOptions}/> */}
        {error && <ErrorMessage error={error} />}

        {!isLoading && samplesAll && <SamplesTable samples={samplesAll} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
